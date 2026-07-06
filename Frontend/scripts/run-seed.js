const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// 1. Load MONGODB_URI from .env.local
const envPath = path.join(__dirname, '../.env.local');
let mongoUri = '';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    if (line.trim().startsWith('MONGODB_URI=')) {
      mongoUri = line.split('MONGODB_URI=')[1].trim();
      // Remove surrounding quotes if any
      if (mongoUri.startsWith('"') && mongoUri.endsWith('"')) {
        mongoUri = mongoUri.slice(1, -1);
      }
      if (mongoUri.startsWith("'") && mongoUri.endsWith("'")) {
        mongoUri = mongoUri.slice(1, -1);
      }
      break;
    }
  }
}

if (!mongoUri) {
  console.error("❌ MONGODB_URI not found in .env.local!");
  process.exit(1);
}

// 2. Read and parse upload-university.js
const uploadScriptPath = path.join(__dirname, '../upload-university.js');
if (!fs.existsSync(uploadScriptPath)) {
  console.error("❌ upload-university.js not found!");
  process.exit(1);
}

const fileContent = fs.readFileSync(uploadScriptPath, 'utf8');

// Extract the universityData array definition
const startIndex = fileContent.indexOf('const universityData =');
if (startIndex === -1) {
  console.error("❌ Could not find 'const universityData =' in upload-university.js!");
  process.exit(1);
}

// Find where the array ends (matching bracket/semicolon before uploadUniversities function)
const uploadFuncIndex = fileContent.indexOf('async function uploadUniversities()');
let dataContent = '';
if (uploadFuncIndex !== -1) {
  dataContent = fileContent.slice(startIndex, uploadFuncIndex).trim();
} else {
  dataContent = fileContent.slice(startIndex).trim();
}

// Create a temporary file that exports the universityData array
const tempFilePath = path.join(__dirname, 'temp-uni-data.js');
const tempFileContent = `
${dataContent}
module.exports = universityData;
`;

fs.writeFileSync(tempFilePath, tempFileContent);

// Load the data
let universities = [];
try {
  universities = require(tempFilePath);
} catch (err) {
  console.error("❌ Error parsing university data:", err);
  // Clean up
  try { fs.unlinkSync(tempFilePath); } catch (e) {}
  process.exit(1);
}

// Clean up temp file
try { fs.unlinkSync(tempFilePath); } catch (e) {}

if (!Array.isArray(universities) || universities.length === 0) {
  console.error("❌ No universities found in the array!");
  process.exit(1);
}

console.log(`📋 Loaded ${universities.length} universities from upload-university.js.`);

// 3. Connect to MongoDB and Seed
async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log("✓ Connected successfully!");

    // Load University Model
    const University = require('../models/University').default || require('../models/University');

    for (const uni of universities) {
      // Normalize ranking
      const rawRanking = uni.ranking || "";
      const rankingDigits = rawRanking.toString().replace(/\D/g, "").slice(0, 4);

      // Generate slug if missing
      const slug = uni.slug || uni.universityName
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

      // Default category to Overseas if not specified, since these are international partner universities
      const category = uni.category || "Overseas";

      const mappedData = {
        ...uni,
        slug,
        ranking: rankingDigits,
        category,
      };

      console.log(`Seeding ${mappedData.universityName} (${mappedData.country})...`);
      
      const doc = await University.findOneAndUpdate(
        { slug: mappedData.slug },
        mappedData,
        { upsert: true, new: true, runValidators: true }
      );
      
      console.log(`✅ Success: ${doc.universityName} (ID: ${doc._id})`);
    }

    console.log("\n✨ All universities uploaded and are now editable in the Admin Panel!");
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ DB seeding failed:", err);
    process.exit(1);
  }
}

run();
