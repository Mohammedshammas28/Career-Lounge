const mongoose = require("mongoose");

const mongoUri = "mongodb+srv://info_db_user:Career-Lounge9291@careerlounge-cluster.bc1mhmr.mongodb.net/CareerLounge?appName=careerlounge-cluster";

const universitiesData = [
    {
        universityName: "University of Connecticut (UConn)",
        slug: "uconn",
        country: "USA",
        city: "Storrs",
        overview: "The University of Connecticut is a top-ranked public research university in the United States, known for its academic excellence, pioneering research, and vibrant campus life.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b0/University_of_Connecticut_logo.svg",
        website: "https://uconn.edu/",
        ranking: "#58 National Universities",
        studentsEnrolled: "32,000+",
        visaSuccessRate: "96%",
        universityType: "Public Research University"
    },
    {
        universityName: "University of Bristol",
        slug: "university-of-bristol",
        country: "United Kingdom",
        city: "Bristol",
        overview: "A world-class UK university with a reputation for academic excellence and high-impact research.",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/University_of_Bristol_logo.svg/1200px-University_of_Bristol_logo.svg.png",
        website: "https://www.bristol.ac.uk/",
        ranking: "#55 QS World Ranking",
        studentsEnrolled: "27,000+",
        visaSuccessRate: "97%",
        universityType: "Russell Group University"
    },
    {
        universityName: "UNSW Sydney",
        slug: "unsw-sydney",
        country: "Australia",
        city: "Sydney",
        overview: "The University of New South Wales (UNSW) is a world-leading university in Sydney, known for innovation and global impact.",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/UNSW_Sydney_logo.svg/1200px-UNSW_Sydney_logo.svg.png",
        website: "https://www.unsw.edu.au/",
        ranking: "#19 QS World Ranking",
        studentsEnrolled: "62,000+",
        visaSuccessRate: "98%",
        universityType: "Go8 University"
    },
    {
        universityName: "Trinity College Dublin",
        slug: "trinity-college-dublin",
        country: "Ireland",
        city: "Dublin",
        overview: "Ireland's leading university, Trinity College Dublin maintains a global reputation for academic excellence and innovation.",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Trinity_College_Dublin_logo.svg/1200px-Trinity_College_Dublin_logo.svg.png",
        website: "https://www.tcd.ie/",
        ranking: "#81 QS World Ranking",
        studentsEnrolled: "18,000+",
        visaSuccessRate: "97%",
        universityType: "Public University"
    },
    {
        universityName: "Constructor University",
        slug: "constructor-university",
        country: "Germany",
        city: "Bremen",
        overview: "Constructor University is a private, English-language research university in Bremen, Germany, known for its international atmosphere and interdisciplinary programs.",
        logo: "https://constructor.university/sites/default/files/constructor_university_logo_0.png",
        website: "https://constructor.university/",
        ranking: "#1 Private University in Germany",
        studentsEnrolled: "1,600+",
        visaSuccessRate: "94%",
        universityType: "Private Research University"
    },
    {
        universityName: "Linnaeus University",
        slug: "linnaeus-university",
        country: "Sweden",
        city: "Växjö/Kalmar",
        overview: "A modern university in southeastern Sweden with a strong international profile and high-quality education.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Linnaeus_University_logo.svg/1200px-Linnaeus_University_logo.svg.png",
        website: "https://lnu.se/",
        ranking: "Top 5% Globally",
        studentsEnrolled: "34,000+",
        visaSuccessRate: "95%",
        universityType: "Public University"
    },
    {
        universityName: "Aalto University",
        slug: "aalto-university",
        country: "Finland",
        city: "Espoo",
        overview: "Aalto University is a multidisciplinary community of bold thinkers where science and art meet technology and business.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Aalto_University_logo.svg/1200px-Aalto_University_logo.svg.png",
        website: "https://www.aalto.fi/",
        ranking: "#109 QS World Ranking",
        studentsEnrolled: "12,000+",
        visaSuccessRate: "98%",
        universityType: "Public University"
    },
    {
        universityName: "University of Birmingham Dubai",
        slug: "university-of-birmingham-dubais",
        country: "UAE",
        city: "Dubai",
        overview: "The University of Birmingham Dubai offers a global education from a top 100 world university in the heart of Dubai's international community.",
        logo: "https://www.birmingham.ac.uk/Images/News/Dubai/Dubai-logo-white-background.png",
        website: "https://www.birmingham.ac.uk/dubai",
        ranking: "Global Top 100 University",
        studentsEnrolled: "2,000+",
        visaSuccessRate: "99%",
        universityType: "International Campus"
    }
];

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoUri);
        console.log("✓ Connected!");

        const universitySchema = new mongoose.Schema({
            universityName: { type: String, required: true },
            slug: { type: String, unique: true },
            country: String,
            city: String,
            overview: String,
            logo: String,
            bannerImage: String,
            ranking: String,
            website: String,
            studentsEnrolled: String,
            visaSuccessRate: String,
            universityType: String,
        }, { timestamps: true });

        const University = mongoose.models.University || mongoose.model("University", universitySchema);

        for (const data of universitiesData) {
            console.log(`Seeding ${data.universityName}...`);
            await University.findOneAndUpdate(
                { slug: data.slug },
                data,
                { upsert: true, new: true }
            );
        }

        console.log("✓ All universities seeded successfully!");
        mongoose.connection.close();
    } catch (err) {
        console.error("❌ Seed error:", err);
    }
}

seed();