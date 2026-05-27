const mongoose = require("mongoose");

const mongoUri = "mongodb://mohammedshammasuddins81:Shammas_28@cluster0-shard-00-00.xm21m.mongodb.net:27017,cluster0-shard-00-01.xm21m.mongodb.net:27017,cluster0-shard-00-02.xm21m.mongodb.net:27017/Career-Lounge?ssl=true&replicaSet=atlas-90e3ig-shard-0&authSource=admin&retryWrites=true&w=majority";

const universitiesData = [
    {
        universityName: "University of Melbourne",
        slug: "university-of-melbourne",
        country: "Australia",
        city: "Melbourne",
        overview: "The University of Melbourne is one of Australia's leading public research universities known for academic excellence, innovation, global rankings, and strong industry connections. It offers world-class education across business, engineering, medicine, IT, and arts programs.",
        logo: "https://example.com/logos/melbourne-logo.png",
        bannerImage: "https://example.com/images/melbourne-banner.jpg",
        universityImages: [
            "https://example.com/gallery/melbourne-1.jpg",
            "https://example.com/gallery/melbourne-2.jpg",
            "https://example.com/gallery/melbourne-3.jpg"
        ],
        website: "https://www.unimelb.edu.au",
        ranking: "#1 Australia, #13 QS World",
        studentsEnrolled: "65,000+",
        visaSuccessRate: "98%",
        intakes: [
            {
                intakeName: "July 2025",
                startDate: new Date("2025-07-10"),
                endDate: new Date("2025-11-25"),
                applyDeadline: new Date("2025-06-06")
            },
            {
                intakeName: "February 2026",
                startDate: new Date("2026-02-15"),
                endDate: new Date("2026-06-30"),
                applyDeadline: new Date("2025-12-15")
            }
        ],
        courses: [
            {
                courseName: "Master of Business Administration (MBA)",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "$52,000 AUD"
            },
            {
                courseName: "Master of Data Science",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "$48,000 AUD"
            },
            {
                courseName: "Bachelor of Computer Science",
                level: "Undergraduate",
                duration: "3 Years",
                fees: "$45,000 AUD"
            },
            {
                courseName: "Master of Engineering",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "$50,000 AUD"
            }
        ],
        scholarships: [
            "International Merit Scholarship: 50% Tuition Fee Waiver",
            "Global Excellence Scholarship: $10,000 AUD"
        ],
        admissions: "Students must submit academic transcripts, English proficiency scores (IELTS/PTE/TOEFL), SOP, LORs, and passport copy during admission process.",
        placements: "Graduates from the University of Melbourne are recruited by top global companies including Google, Deloitte, Microsoft, Amazon, and PwC.",
        faqs: [
            {
                question: "What is the IELTS requirement?",
                answer: "Minimum IELTS overall score of 6.5 with no band less than 6.0."
            },
            {
                question: "Does the university offer scholarships?",
                answer: "Yes, multiple merit-based and international scholarships are available."
            },
            {
                question: "Can international students work while studying?",
                answer: "Yes, students can work part-time according to Australian student visa regulations."
            }
        ]
    },
    {
        universityName: "University of Birmingham",
        slug: "university-of-birmingham",
        country: "United Kingdom",
        city: "Birmingham",
        overview: "A prestigious UK university offering high-quality education with strong industry partnerships.",
        logo: "https://example.com/logos/birmingham.png",
        bannerImage: "https://example.com/banners/birmingham.jpg",
        website: "https://www.birmingham.ac.uk",
        studentsEnrolled: "38,000+",
        visaSuccessRate: "97%",
        ranking: "#84 QS World Ranking",
        intakes: [
            {
                intakeName: "September 2025",
                applyDeadline: new Date("2025-08-01")
            }
        ],
        courses: [
            {
                courseName: "Business Management",
                level: "Undergraduate",
                duration: "3 Years",
                fees: "£24,000"
            },
            {
                courseName: "Cyber Security",
                level: "Postgraduate",
                duration: "1 Year",
                fees: "£28,000"
            }
        ],
        scholarships: [],
        admissions: "Standard admission process requires undergraduate/high school qualifications, English proficiency scores, personal statement, and letters of recommendation.",
        faqs: []
    },
    {
        universityName: "Arizona State University",
        slug: "arizona-state-university",
        country: "USA",
        city: "Arizona",
        overview: "A highly innovative US university known for technology, entrepreneurship, and global student support.",
        logo: "https://example.com/logos/asu.png",
        bannerImage: "https://example.com/banners/asu.jpg",
        website: "https://www.asu.edu",
        studentsEnrolled: "140,000+",
        visaSuccessRate: "95%",
        ranking: "#1 in USA Innovation",
        intakes: [
            {
                intakeName: "Fall 2025",
                applyDeadline: new Date("2025-06-30")
            }
        ],
        courses: [
            {
                courseName: "Software Engineering",
                level: "Undergraduate",
                duration: "4 Years",
                fees: "$34,000 USD"
            },
            {
                courseName: "Information Technology",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "$30,000 USD"
            }
        ],
        scholarships: [],
        admissions: "Admissions require high school or bachelor transcripts, SAT/ACT (optional), English proficiency test scores (TOEFL/IELTS/PTE), and financial documentation.",
        faqs: []
    }
];

async function run() {
    try {
        console.log("Connecting directly to MongoDB...");
        await mongoose.connect(mongoUri);
        console.log("✓ Connected successfully!");

        // Define model schema (making sure it matches University.js schema)
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
            scholarships: [String],
            admissions: String,
            faqs: [
                {
                    question: String,
                    answer: String,
                },
            ],
        }, { timestamps: true });

        const University = mongoose.models.University || mongoose.model("University", universitySchema);

        console.log("Seeding universities...");
        for (const uniData of universitiesData) {
            console.log(`Checking if ${uniData.universityName} already exists...`);
            const existing = await University.findOne({ slug: uniData.slug });
            if (existing) {
                console.log(`University ${uniData.universityName} already exists. Updating it...`);
                Object.assign(existing, uniData);
                await existing.save();
                console.log(`✓ Updated ${uniData.universityName} successfully!`);
            } else {
                console.log(`Creating new record for ${uniData.universityName}...`);
                const created = new University(uniData);
                await created.save();
                console.log(`✓ Created ${uniData.universityName} successfully!`);
            }
        }

        await mongoose.connection.close();
        console.log("✓ Done!");
    } catch (err) {
        console.error("❌ Error seeding database:", err);
    }
}

run();
