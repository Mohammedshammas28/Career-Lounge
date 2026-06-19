const mongoose = require("mongoose");

const mongoUri = "mongodb+srv://info_db_user:Career-Lounge9291@careerlounge-cluster.bc1mhmr.mongodb.net/CareerLounge?appName=careerlounge-cluster";

async function run() {
    try {
        console.log("Connecting to MongoDB Atlas...");
        await mongoose.connect(mongoUri);
        console.log("✓ Connected!");

        // Dynamic models with strict: false to read/write any fields
        const Course = mongoose.model("Course", new mongoose.Schema({}, { strict: false }));
        const University = mongoose.model("University", new mongoose.Schema({}, { strict: false }));

        // 1. Migrate Course collection
        console.log("\n--- MIGRATING COURSES COLLECTION ---");
        const courses = await Course.find({});
        console.log(`Found ${courses.length} courses to inspect.`);
        
        for (const c of courses) {
            const doc = c.toObject();
            const updates = {};
            
            // Map title to courseName
            if (doc.title !== undefined && doc.courseName === undefined) {
                updates.courseName = doc.title;
                updates.title = undefined; // unset old
            }
            
            // Map desc to description
            if (doc.desc !== undefined && doc.description === undefined) {
                updates.description = doc.desc;
                updates.desc = undefined;
            }
            
            // Map img to image
            if (doc.img !== undefined && doc.image === undefined) {
                updates.image = doc.img;
                updates.img = undefined;
            }
            
            // Map isActive to status
            if (doc.isActive !== undefined && doc.status === undefined) {
                updates.status = doc.isActive;
                updates.isActive = undefined;
            }
            
            // Map level to category
            if (doc.level !== undefined && doc.category === undefined) {
                updates.category = doc.level;
                updates.level = undefined;
            }

            if (Object.keys(updates).length > 0) {
                const updateQuery = { $set: {}, $unset: {} };
                for (const [key, value] of Object.entries(updates)) {
                    if (value === undefined) {
                        updateQuery.$unset[key] = "";
                    } else {
                        updateQuery.$set[key] = value;
                    }
                }
                if (Object.keys(updateQuery.$set).length === 0) delete updateQuery.$set;
                if (Object.keys(updateQuery.$unset).length === 0) delete updateQuery.$unset;

                await Course.updateOne({ _id: c._id }, updateQuery);
                console.log(`✓ Migrated Course: ${doc.title || doc.courseName}`);
            } else {
                console.log(`- Course already migrated: ${doc.courseName}`);
            }
        }

        // 2. Migrate University collection
        console.log("\n--- MIGRATING UNIVERSITIES COLLECTION ---");
        const universities = await University.find({});
        console.log(`Found ${universities.length} universities to inspect.`);

        // Mapping function for courses
        const mapCourseToCategory = (name) => {
            const n = (name || "").toLowerCase();
            if (n.includes("mba") || n.includes("business") || n.includes("management") || n.includes("hotel") || n.includes("hospitality") || n.includes("hospital")) {
                return "Management";
            }
            if (n.includes("accounting") || n.includes("finance") || n.includes("banking") || n.includes("insurance") || n.includes("commerce")) {
                return "Commerce";
            }
            if (n.includes("software") || n.includes("engineering") || n.includes("mechanical") || n.includes("civil")) {
                return "Engineering";
            }
            if (n.includes("computer") || n.includes("data") || n.includes("cyber") || n.includes("science") || n.includes("information technology") || n.includes("it") || n.includes("artificial") || n.includes("biotechnology")) {
                return "Science";
            }
            if (n.includes("medicine") || n.includes("surgery") || n.includes("dental") || n.includes("mbbs") || n.includes("bds")) {
                return "Medicine";
            }
            if (n.includes("nursing") || n.includes("physiotherapy") || n.includes("laboratory") || n.includes("health") || n.includes("therapy") || n.includes("allied")) {
                return "Allied Health";
            }
            return null;
        };

        for (const uni of universities) {
            const doc = uni.toObject();
            const updates = {};

            // Determine category (Domestic vs Overseas) based on country
            const country = (doc.country || "").trim().toLowerCase();
            const oldCategory = doc.category;
            const newCategory = (country === "india" || country === "in") ? "Domestic" : "Overseas";
            
            if (oldCategory !== newCategory) {
                updates.category = newCategory;
            }

            // Determine coursesOffered list based on detailed courses array
            const coursesOfferedSet = new Set(doc.coursesOffered || []);
            
            if (doc.courses && Array.isArray(doc.courses)) {
                for (const course of doc.courses) {
                    const category = mapCourseToCategory(course.courseName);
                    if (category) {
                        coursesOfferedSet.add(category);
                    }
                }
            }

            const newCoursesOffered = Array.from(coursesOfferedSet);
            // If they differ, update coursesOffered
            const hasOfferedChanged = JSON.stringify(doc.coursesOffered) !== JSON.stringify(newCoursesOffered);
            if (hasOfferedChanged) {
                updates.coursesOffered = newCoursesOffered;
            }

            if (Object.keys(updates).length > 0) {
                await University.updateOne({ _id: uni._id }, { $set: updates });
                console.log(`✓ Updated University "${doc.universityName}": Category = ${updates.category || oldCategory || "Domestic"}, CoursesOffered = [${(updates.coursesOffered || doc.coursesOffered || []).join(", ")}]`);
            } else {
                console.log(`- University already up-to-date: "${doc.universityName}" (Category: ${doc.category || "Domestic"}, CoursesOffered: [${(doc.coursesOffered || []).join(", ")}])`);
            }
        }

        await mongoose.connection.close();
        console.log("\n✓ Database Migration Completed Successfully!");
    } catch (err) {
        console.error("Migration Error:", err);
    }
}

run();
