/**
 * Script to upload University of Melbourne data to MongoDB via API
 * Run with: node upload-university.js
 */

const universityData = [
    {
        universityName: "University of Melbourne",
        slug: "university-of-melbourne",
        country: "Australia",
        city: "Melbourne",

        overview:
            "The University of Melbourne is one of Australia's leading public research universities known for academic excellence, innovation, global rankings, and strong industry connections.",

        logo: "/melbourne-logo.jpg",
        bannerImage: "/melbourne-banner.webp",
        universityImages: [
            "https://example.com/gallery/melbourne-1.jpg",
            "https://example.com/gallery/melbourne-2.jpg",
            "https://example.com/gallery/melbourne-3.jpg",
        ],

        website: "https://www.unimelb.edu.au",

        ranking: "#13 QS World Ranking",

        studentsEnrolled: "65,000+",

        visaSuccessRate: "98%",

        establishedYear: "1853",

        universityType: "Public Research University",

        popularPrograms: [
            "MBA",
            "Data Science",
            "Engineering",
            "Computer Science",
            "Medicine",
        ],

        tuitionFees: {
            undergraduate: "$45,000 AUD",
            postgraduate: "$52,000 AUD",
        },

        accommodation: {
            available: true,
            startingPrice: "$12,000 AUD/year",
        },

        languageRequirements: {
            ielts: "6.5",
            toefl: "79+",
            pte: "58+",
        },

        intakes: [
            {
                intakeName: "July 2025",
                startDate: "2025-07-10",
                endDate: "2025-11-25",
                applyDeadline: "2025-06-06",
            },

            {
                intakeName: "February 2026",
                startDate: "2026-02-15",
                endDate: "2026-06-30",
                applyDeadline: "2025-12-15",
            },
        ],

        courses: [
            {
                courseName: "Master of Business Administration (MBA)",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "$52,000 AUD",
            },

            {
                courseName: "Master of Data Science",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "$48,000 AUD",
            },

            {
                courseName: "Bachelor of Computer Science",
                level: "Undergraduate",
                duration: "3 Years",
                fees: "$45,000 AUD",
            },
        ],

        scholarships: [
            {
                title: "International Merit Scholarship",
                amount: "50% Tuition Fee Waiver",
            },

            {
                title: "Global Excellence Scholarship",
                amount: "$10,000 AUD",
            },
        ],

        admissions:
            "Students must submit academic transcripts, IELTS/PTE/TOEFL scores, SOP, LORs, and passport copy.",

        placements:
            "Top recruiters include Google, Deloitte, Microsoft, Amazon, and PwC.",

        campusFacilities: [
            "Modern Libraries",
            "Research Labs",
            "Sports Complex",
            "Student Clubs",
            "Innovation Centers",
        ],

        faqs: [
            {
                question: "What is the IELTS requirement?",
                answer:
                    "Minimum IELTS overall score of 6.5 with no band less than 6.0.",
            },

            {
                question: "Does the university offer scholarships?",
                answer:
                    "Yes, multiple merit-based and international scholarships are available.",
            },
        ],
    },

    {
        universityName: "University of Birmingham",

        slug: "university-of-birmingham",

        country: "United Kingdom",

        city: "Birmingham",

        overview:
            "A prestigious UK university offering high-quality education with strong industry partnerships.",

        logo: "https://example.com/logos/birmingham.png",

        bannerImage: "https://example.com/banners/birmingham.jpg",

        universityImages: [
            "https://example.com/gallery/birmingham-1.jpg",
            "https://example.com/gallery/birmingham-2.jpg",
        ],

        website: "https://www.birmingham.ac.uk",

        ranking: "#84 QS World Ranking",

        studentsEnrolled: "38,000+",

        visaSuccessRate: "97%",

        establishedYear: "1900",

        universityType: "Public University",

        popularPrograms: [
            "Business",
            "Cyber Security",
            "Law",
            "Medicine",
        ],

        tuitionFees: {
            undergraduate: "£24,000",
            postgraduate: "£28,000",
        },

        accommodation: {
            available: true,
            startingPrice: "£9,000/year",
        },

        languageRequirements: {
            ielts: "6.0",
            toefl: "80+",
            pte: "64+",
        },

        intakes: [
            {
                intakeName: "September 2025",
                startDate: "2025-09-10",
                endDate: "2026-05-20",
                applyDeadline: "2025-08-01",
            },
        ],

        courses: [
            {
                courseName: "Business Management",
                level: "Undergraduate",
                duration: "3 Years",
                fees: "£24,000",
            },

            {
                courseName: "Cyber Security",
                level: "Postgraduate",
                duration: "1 Year",
                fees: "£28,000",
            },
        ],

        scholarships: [
            {
                title: "Global Masters Scholarship",
                amount: "£5,000",
            },
        ],

        admissions:
            "Applicants need academic transcripts, SOP, recommendation letters, and English proficiency proof.",

        placements:
            "Graduates are hired by HSBC, EY, KPMG, IBM, and Accenture.",

        campusFacilities: [
            "Libraries",
            "Research Centers",
            "Sports Arena",
            "Career Support",
        ],

        faqs: [
            {
                question: "Is accommodation available?",
                answer: "Yes, university accommodation is available for international students.",
            },
        ],
    },

    {
        universityName: "Arizona State University",

        slug: "arizona-state-university",

        country: "USA",

        city: "Arizona",

        overview:
            "A highly innovative US university known for technology, entrepreneurship, and global student support.",

        logo: "https://example.com/logos/asu.png",

        bannerImage: "https://example.com/banners/asu.jpg",

        universityImages: [
            "https://example.com/gallery/asu-1.jpg",
            "https://example.com/gallery/asu-2.jpg",
        ],

        website: "https://www.asu.edu",

        ranking: "#1 Innovation University in USA",

        studentsEnrolled: "140,000+",

        visaSuccessRate: "95%",

        establishedYear: "1885",

        universityType: "Public Research University",

        popularPrograms: [
            "Software Engineering",
            "Artificial Intelligence",
            "IT",
            "Business Analytics",
        ],

        tuitionFees: {
            undergraduate: "$34,000 USD",
            postgraduate: "$30,000 USD",
        },

        accommodation: {
            available: true,
            startingPrice: "$11,000 USD/year",
        },

        languageRequirements: {
            ielts: "6.5",
            toefl: "80+",
            pte: "60+",
        },

        intakes: [
            {
                intakeName: "Fall 2025",
                startDate: "2025-08-15",
                endDate: "2026-05-10",
                applyDeadline: "2025-06-30",
            },
        ],

        courses: [
            {
                courseName: "Software Engineering",
                level: "Undergraduate",
                duration: "4 Years",
                fees: "$34,000 USD",
            },

            {
                courseName: "Information Technology",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "$30,000 USD",
            },
        ],

        scholarships: [
            {
                title: "New American University Scholarship",
                amount: "$10,000 USD",
            },
        ],

        admissions:
            "International students need transcripts, SOP, English test scores, and financial proof.",

        placements:
            "Top recruiters include Intel, Amazon, Microsoft, Tesla, and Cisco.",

        campusFacilities: [
            "Innovation Labs",
            "Startup Incubators",
            "Sports Centers",
            "Libraries",
        ],

        faqs: [
            {
                question: "Does ASU offer internships?",
                answer:
                    "Yes, ASU provides strong internship and career opportunities.",
            },
        ],
    },
];

async function uploadUniversities() {
    const apiUrl = process.env.API_URL || "http://localhost:3000";
    console.log(`🚀 Starting upload of ${universityData.length} universities...`);

    for (const university of universityData) {
        try {
            console.log(`📡 Uploading: ${university.universityName}...`);

            const response = await fetch(`${apiUrl}/api/universities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(university),
            });

            const result = await response.json();

            if (result.success) {
                console.log(`✅ Success: ${university.universityName} (ID: ${result.data._id})`);
            } else {
                console.error(`❌ Failed: ${university.universityName} - ${result.error}`);
            }
        } catch (error) {
            console.error(`❌ Error uploading ${university.universityName}: ${error.message}`);
        }
    }

    console.log("\n✨ All done!");
}

uploadUniversities();
