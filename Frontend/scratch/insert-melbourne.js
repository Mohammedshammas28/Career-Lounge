const mongoose = require("mongoose");

const mongoUri = "mongodb://info_db_user:Career-Lounge9291@ac-ddp43je-shard-00-00.bc1mhmr.mongodb.net:27017,ac-ddp43je-shard-00-01.bc1mhmr.mongodb.net:27017,ac-ddp43je-shard-00-02.bc1mhmr.mongodb.net:27017/CareerLounge?replicaSet=atlas-lbay9v-shard-0&ssl=true&authSource=admin";

async function run() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoUri);
        console.log("✓ Connected successfully!");

        const universitySchema = new mongoose.Schema({
            universityName: { type: String, required: true },
            slug: { type: String, unique: true },
            country: String,
            city: String,
            overview: String,
            logo: String,
            bannerImage: String,
            universityImages: [String],
            ranking: String,
            website: String,
            intakes: [
                {
                    intakeName: String,
                    startDate: Date,
                    endDate: Date,
                    applyDeadline: Date,
                },
            ],
            courses: [
                {
                    courseName: String,
                    level: String,
                    duration: String,
                    fees: String,
                },
            ],
            studentsEnrolled: String,
            visaSuccessRate: String,
            establishedYear: String,
            universityType: String,
            popularPrograms: [String],
            tuitionFees: {
                undergraduate: String,
                postgraduate: String,
            },
            accommodation: {
                available: Boolean,
                startingPrice: String,
            },
            languageRequirements: {
                ielts: String,
                toefl: String,
                pte: String,
            },
            scholarships: [
                {
                    title: String,
                    amount: String,
                },
            ],
            admissions: String,
            placements: String,
            campusFacilities: [String],
            faqs: [
                {
                    question: String,
                    answer: String,
                },
            ],
            coursesOffered: {
                type: [String],
                default: [],
            },
            category: {
                type: String,
                enum: ["Domestic", "Overseas"],
                default: "Domestic",
            },
        }, { timestamps: true });

        const University = mongoose.models.University || mongoose.model("University", universitySchema);

        const melbourneData = {
            universityName: "University of Melbourne",
            slug: "university-of-melbourne",
            country: "Australia",
            city: "Melbourne",
            overview: "The University of Melbourne is one of Australia's leading research-intensive universities and is internationally recognized for academic excellence, innovation, and graduate employability. Established in 1853, it consistently ranks among the world's top universities and attracts students from over 150 countries.",
            ranking: "#13 QS World University Rankings 2026",
            establishedYear: "1853",
            universityType: "Public University",
            studentsEnrolled: "54000+",
            intakes: [
                { intakeName: "February" },
                { intakeName: "July" }
            ],
            tuitionFees: {
                undergraduate: "AUD 35,000 - 50,000 per year",
                postgraduate: "AUD 40,000 - 60,000 per year"
            },
            scholarships: [
                { title: "Melbourne International Undergraduate Scholarship" },
                { title: "Graduate Research Scholarship" },
                { title: "Melbourne Chancellor's Scholarship" }
            ],
            coursesOffered: [
                "Engineering",
                "Business",
                "Medicine",
                "Law",
                "Arts",
                "Science",
                "Information Technology"
            ],
            courses: [
                { courseName: "Bachelor of Computer Science" },
                { courseName: "Bachelor of Engineering" },
                { courseName: "Master of Data Science" },
                { courseName: "Master of Business Analytics" },
                { courseName: "MBA" },
                { courseName: "Master of Information Technology" }
            ],
            website: "https://www.unimelb.edu.au",
            bannerImage: "https://images.unsplash.com/photo-1562774053-701939374585",
            category: "Overseas"
        };

        console.log("Upserting University of Melbourne...");
        const result = await University.findOneAndUpdate(
            { slug: melbourneData.slug },
            melbourneData,
            { new: true, upsert: true }
        );
        console.log("✓ Success! Saved:", result.universityName, "ID:", result._id);

        await mongoose.connection.close();
        console.log("✓ Done!");
    } catch (err) {
        console.error("❌ Error inserting data:", err);
    }
}

run();
