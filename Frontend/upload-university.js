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

        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/University_of_Melbourne_logo.svg/200px-University_of_Melbourne_logo.svg.png",
        bannerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/University_of_Melbourne_main_entrance.jpg/1280px-University_of_Melbourne_main_entrance.jpg",
        universityImages: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/University_of_Melbourne_main_entrance.jpg/1280px-University_of_Melbourne_main_entrance.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Old_Arts_Building%2C_University_of_Melbourne.jpg/1280px-Old_Arts_Building%2C_University_of_Melbourne.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Melbourne_CBD_from_Eureka_Tower.jpg/1280px-Melbourne_CBD_from_Eureka_Tower.jpg",
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
            "The University of Birmingham is one of the UK's leading research-intensive universities and a proud member of the Russell Group. It is known for academic excellence, innovative research, and strong graduate employability. The university welcomes over 38,000 students from more than 150 countries.",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/University_of_Birmingham_logo.svg/200px-University_of_Birmingham_logo.svg.png",
        bannerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/University_of_Birmingham_main_building.jpg/1280px-University_of_Birmingham_main_building.jpg",
        universityImages: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/University_of_Birmingham_main_building.jpg/1280px-University_of_Birmingham_main_building.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/University_of_Birmingham_Clock_Tower.jpg/800px-University_of_Birmingham_Clock_Tower.jpg",
        ],
        website: "https://www.birmingham.ac.uk",
        ranking: "#76 QS World University Rankings 2026",
        studentsEnrolled: "38,000+",
        visaSuccessRate: "97%",
        establishedYear: "1900",
        universityType: "Public University",
        popularPrograms: [
            "Computer Science",
            "Artificial Intelligence",
            "Business Management",
            "Mechanical Engineering",
            "Medicine",
            "Law",
        ],
        tuitionFees: {
            undergraduate: "GBP 21,000 - 30,000/year",
            postgraduate: "GBP 23,000 - 35,000/year",
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
            {
                intakeName: "January 2026",
                startDate: "2026-01-10",
                endDate: "2026-05-20",
                applyDeadline: "2025-11-30",
            },
        ],
        courses: [
            {
                courseName: "BSc Computer Science",
                level: "Undergraduate",
                duration: "3 Years",
                fees: "GBP 24,000/year",
            },
            {
                courseName: "MSc Artificial Intelligence",
                level: "Postgraduate",
                duration: "1 Year",
                fees: "GBP 28,000/year",
            },
            {
                courseName: "LLB Law",
                level: "Undergraduate",
                duration: "3 Years",
                fees: "GBP 22,000/year",
            },
            {
                courseName: "MSc Business Management",
                level: "Postgraduate",
                duration: "1 Year",
                fees: "GBP 26,000/year",
            },
        ],
        scholarships: [
            {
                title: "Global Masters Scholarship",
                amount: "£5,000",
            },
            {
                title: "International Excellence Scholarship",
                amount: "Up to £10,000",
            },
            {
                title: "Commonwealth Scholarships",
                amount: "Full Tuition",
            },
        ],
        admissions:
            "Applicants need academic transcripts, SOP, recommendation letters, and English proficiency proof (IELTS/TOEFL/PTE).",
        placements:
            "Graduates are hired by HSBC, EY, KPMG, IBM, Accenture, and top UK firms.",
        campusFacilities: [
            "Modern Libraries",
            "Research Centers",
            "Sports Arena",
            "Career Support",
            "Student Clubs",
        ],
        faqs: [
            {
                question: "What is the IELTS requirement?",
                answer: "Minimum IELTS score of 6.0 overall.",
            },
            {
                question: "Is accommodation available?",
                answer: "Yes, university accommodation is available for international students.",
            },
        ],
        category: "Overseas",
    },

    {
        universityName: "Monash University",
        slug: "monash-university",
        country: "Australia",
        city: "Melbourne",
        overview:
            "Monash University is one of Australia's prestigious Group of Eight universities, renowned for its world-class teaching, research excellence, and strong global partnerships. It has campuses across Australia and international locations including Malaysia and Indonesia.",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Monash_University_logo.svg/200px-Monash_University_logo.svg.png",
        bannerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Monash_University_Sir_Louis_Matheson_Library.jpg/1280px-Monash_University_Sir_Louis_Matheson_Library.jpg",
        universityImages: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Monash_University_Sir_Louis_Matheson_Library.jpg/1280px-Monash_University_Sir_Louis_Matheson_Library.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Melbourne_CBD_from_Eureka_Tower.jpg/1280px-Melbourne_CBD_from_Eureka_Tower.jpg",
        ],
        website: "https://www.monash.edu",
        ranking: "#36 QS World University Rankings 2026",
        studentsEnrolled: "86,000+",
        visaSuccessRate: "96%",
        establishedYear: "1958",
        universityType: "Public University",
        popularPrograms: [
            "Computer Science",
            "Data Science",
            "MBA",
            "Civil Engineering",
            "Medicine",
            "Pharmacy",
        ],
        tuitionFees: {
            undergraduate: "AUD 34,000 - 48,000/year",
            postgraduate: "AUD 36,000 - 52,000/year",
        },
        accommodation: {
            available: true,
            startingPrice: "AUD 12,000/year",
        },
        languageRequirements: {
            ielts: "6.5",
            toefl: "79+",
            pte: "58+",
        },
        intakes: [
            {
                intakeName: "February 2026",
                startDate: "2026-02-23",
                endDate: "2026-06-20",
                applyDeadline: "2025-12-15",
            },
            {
                intakeName: "July 2026",
                startDate: "2026-07-20",
                endDate: "2026-11-15",
                applyDeadline: "2026-05-31",
            },
        ],
        courses: [
            {
                courseName: "Bachelor of Computer Science",
                level: "Undergraduate",
                duration: "3 Years",
                fees: "AUD 40,000/year",
            },
            {
                courseName: "Master of Data Science",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "AUD 46,000/year",
            },
            {
                courseName: "Master of Business Administration (MBA)",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "AUD 52,000/year",
            },
            {
                courseName: "Bachelor of Civil Engineering",
                level: "Undergraduate",
                duration: "4 Years",
                fees: "AUD 45,000/year",
            },
        ],
        scholarships: [
            {
                title: "Monash International Merit Scholarship",
                amount: "AUD 10,000/year",
            },
            {
                title: "Engineering Excellence Scholarship",
                amount: "AUD 5,000",
            },
            {
                title: "Research Training Program",
                amount: "Full Tuition + Stipend",
            },
        ],
        admissions:
            "Applicants must provide academic transcripts, IELTS/PTE/TOEFL scores, SOP, LORs, and a valid passport.",
        placements:
            "Top recruiters include Google, PwC, Deloitte, BHP, and major Australian corporations.",
        campusFacilities: [
            "World-class Research Labs",
            "Sports Complex",
            "Library",
            "Student Clubs",
            "Innovation Hub",
        ],
        faqs: [
            {
                question: "Does Monash have campuses outside Australia?",
                answer: "Yes, Monash has international campuses in Malaysia and Indonesia.",
            },
            {
                question: "What is the acceptance rate?",
                answer: "The acceptance rate is approximately 40%.",
            },
        ],
        category: "Overseas",
    },

    {
        universityName: "University of Toronto",
        slug: "university-of-toronto",
        country: "Canada",
        city: "Toronto",
        overview:
            "The University of Toronto is Canada's top-ranked university and one of the world's leading research institutions. It is internationally recognized for innovation, entrepreneurship, and academic excellence across various disciplines.",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_coa.svg/200px-Utoronto_coa.svg.png",
        bannerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoodHall_uoft.jpg/1280px-GoodHall_uoft.jpg",
        universityImages: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoodHall_uoft.jpg/1280px-GoodHall_uoft.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Toronto_Skyline_from_CN_Tower.jpg/1280px-Toronto_Skyline_from_CN_Tower.jpg",
        ],
        website: "https://www.utoronto.ca",
        ranking: "#29 QS World University Rankings 2026",
        studentsEnrolled: "97,000+",
        visaSuccessRate: "96%",
        establishedYear: "1827",
        universityType: "Public University",
        popularPrograms: [
            "Computer Science",
            "Artificial Intelligence",
            "Business",
            "Medicine",
            "Law",
            "Engineering",
        ],
        tuitionFees: {
            undergraduate: "CAD 45,000 - 65,000/year",
            postgraduate: "CAD 30,000 - 55,000/year",
        },
        accommodation: {
            available: true,
            startingPrice: "CAD 12,000/year",
        },
        languageRequirements: {
            ielts: "6.5",
            toefl: "89+",
            pte: "60+",
        },
        intakes: [
            {
                intakeName: "September 2025",
                startDate: "2025-09-08",
                endDate: "2026-04-30",
                applyDeadline: "2025-03-01",
            },
            {
                intakeName: "January 2026",
                startDate: "2026-01-12",
                endDate: "2026-04-30",
                applyDeadline: "2025-11-01",
            },
        ],
        courses: [
            {
                courseName: "Bachelor of Computer Science",
                level: "Undergraduate",
                duration: "4 Years",
                fees: "CAD 58,000/year",
            },
            {
                courseName: "Master of Artificial Intelligence",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "CAD 48,000/year",
            },
            {
                courseName: "Juris Doctor (JD) - Law",
                level: "Postgraduate",
                duration: "3 Years",
                fees: "CAD 35,000/year",
            },
            {
                courseName: "MBA",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "CAD 52,000/year",
            },
        ],
        scholarships: [
            {
                title: "Lester B. Pearson Scholarship",
                amount: "Full Tuition + Living Expenses",
            },
            {
                title: "International Scholar Award",
                amount: "CAD 10,000/year",
            },
            {
                title: "Graduate Funding Program",
                amount: "CAD 15,000/year",
            },
        ],
        admissions:
            "Applicants need academic transcripts, SOP, reference letters, IELTS/TOEFL scores, and a copy of passport.",
        placements:
            "Top recruiters include Google, Microsoft, Amazon, RBC, and TD Bank.",
        campusFacilities: [
            "Research Libraries",
            "Innovation Hub",
            "Sports Complex",
            "Student Residences",
            "Career Center",
        ],
        faqs: [
            {
                question: "What is the Lester B. Pearson Scholarship?",
                answer:
                    "It is one of Canada's most prestigious scholarships covering full tuition and living expenses for international students.",
            },
            {
                question: "What are the intakes available?",
                answer: "University of Toronto primarily offers September and January intakes.",
            },
        ],
        category: "Overseas",
    },

    {
        universityName: "Arizona State University",
        slug: "arizona-state-university",
        country: "United States",
        city: "Tempe, Arizona",
        overview:
            "Arizona State University is one of the largest public universities in the United States and has been recognized multiple times as the most innovative university in the country. It offers excellent academic programs with a strong focus on research and entrepreneurship.",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/ASU_sun_devil_logo.svg/200px-ASU_sun_devil_logo.svg.png",
        bannerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/ASU_Old_Main.jpg/1280px-ASU_Old_Main.jpg",
        universityImages: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/ASU_Old_Main.jpg/1280px-ASU_Old_Main.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Tempe%2C_Arizona_aerial_view.jpg/1280px-Tempe%2C_Arizona_aerial_view.jpg",
        ],
        website: "https://www.asu.edu",
        ranking: "#200 QS World University Rankings 2026",
        studentsEnrolled: "145,000+",
        visaSuccessRate: "95%",
        establishedYear: "1885",
        universityType: "Public University",
        popularPrograms: [
            "Computer Science",
            "Business Analytics",
            "Information Technology",
            "Mechanical Engineering",
            "Finance",
            "Psychology",
        ],
        tuitionFees: {
            undergraduate: "USD 30,000 - 35,000/year",
            postgraduate: "USD 28,000 - 40,000/year",
        },
        accommodation: {
            available: true,
            startingPrice: "USD 11,000/year",
        },
        languageRequirements: {
            ielts: "6.5",
            toefl: "80+",
            pte: "60+",
        },
        intakes: [
            {
                intakeName: "August 2025",
                startDate: "2025-08-15",
                endDate: "2026-05-10",
                applyDeadline: "2025-06-30",
            },
            {
                intakeName: "January 2026",
                startDate: "2026-01-12",
                endDate: "2026-05-10",
                applyDeadline: "2025-11-01",
            },
        ],
        courses: [
            {
                courseName: "BSc Computer Science",
                level: "Undergraduate",
                duration: "4 Years",
                fees: "USD 33,000/year",
            },
            {
                courseName: "MSc Business Analytics",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "USD 35,000/year",
            },
            {
                courseName: "MSc Information Technology",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "USD 30,000/year",
            },
            {
                courseName: "BSc Mechanical Engineering",
                level: "Undergraduate",
                duration: "4 Years",
                fees: "USD 32,000/year",
            },
        ],
        scholarships: [
            {
                title: "New American University Scholarship",
                amount: "USD 10,000",
            },
            {
                title: "Global Education Scholarship",
                amount: "Up to USD 8,000",
            },
            {
                title: "Graduate Assistantships",
                amount: "Tuition + Stipend",
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
            "Modern Libraries",
            "Career Services",
        ],
        faqs: [
            {
                question: "Does ASU offer internships?",
                answer: "Yes, ASU provides strong internship and career opportunities through its career center.",
            },
            {
                question: "What is the acceptance rate?",
                answer: "ASU has an acceptance rate of approximately 88%, making it accessible for international students.",
            },
        ],
        category: "Overseas",
    },

    {
        universityName: "University of Auckland",
        slug: "university-of-auckland",
        country: "New Zealand",
        city: "Auckland",
        overview:
            "The University of Auckland is New Zealand's highest-ranked university, offering internationally recognized education and world-leading research. It is home to students from over 120 countries and provides excellent career opportunities after graduation.",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/University_of_Auckland_logo.svg/200px-University_of_Auckland_logo.svg.png",
        bannerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Auckland_University_Clock_Tower.jpg/1280px-Auckland_University_Clock_Tower.jpg",
        universityImages: [
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Auckland_University_Clock_Tower.jpg/1280px-Auckland_University_Clock_Tower.jpg",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Auckland_from_the_air_2013.jpg/1280px-Auckland_from_the_air_2013.jpg",
        ],
        website: "https://www.auckland.ac.nz",
        ranking: "#65 QS World University Rankings 2026",
        studentsEnrolled: "46,000+",
        visaSuccessRate: "95%",
        establishedYear: "1883",
        universityType: "Public University",
        popularPrograms: [
            "Computer Science",
            "Business",
            "Engineering",
            "Health Sciences",
            "Education",
            "Architecture",
        ],
        tuitionFees: {
            undergraduate: "NZD 32,000 - 42,000/year",
            postgraduate: "NZD 34,000 - 48,000/year",
        },
        accommodation: {
            available: true,
            startingPrice: "NZD 10,000/year",
        },
        languageRequirements: {
            ielts: "6.0",
            toefl: "90+",
            pte: "58+",
        },
        intakes: [
            {
                intakeName: "February 2026",
                startDate: "2026-02-23",
                endDate: "2026-06-20",
                applyDeadline: "2025-12-01",
            },
            {
                intakeName: "July 2026",
                startDate: "2026-07-20",
                endDate: "2026-11-15",
                applyDeadline: "2026-05-15",
            },
        ],
        courses: [
            {
                courseName: "Bachelor of Computer Science",
                level: "Undergraduate",
                duration: "3 Years",
                fees: "NZD 38,000/year",
            },
            {
                courseName: "Master of Business Administration",
                level: "Postgraduate",
                duration: "1.5 Years",
                fees: "NZD 46,000/year",
            },
            {
                courseName: "BE Engineering",
                level: "Undergraduate",
                duration: "4 Years",
                fees: "NZD 42,000/year",
            },
            {
                courseName: "Master of Health Sciences",
                level: "Postgraduate",
                duration: "2 Years",
                fees: "NZD 44,000/year",
            },
        ],
        scholarships: [
            {
                title: "International Student Excellence Scholarship",
                amount: "NZD 10,000",
            },
            {
                title: "Vice Chancellor's Scholarship",
                amount: "Up to NZD 20,000",
            },
            {
                title: "Research Scholarships",
                amount: "Full Tuition + Stipend",
            },
        ],
        admissions:
            "Applicants must provide academic transcripts, English proficiency scores, SOP, and reference letters.",
        placements:
            "Top recruiters include Fonterra, Air New Zealand, Deloitte, PwC, and Fisher & Paykel.",
        campusFacilities: [
            "Research Libraries",
            "Innovation Centre",
            "Sports Facilities",
            "Student Accommodation",
            "Career Hub",
        ],
        faqs: [
            {
                question: "Is New Zealand a good destination for international students?",
                answer:
                    "Yes, New Zealand offers post-study work visas, safe environment, and globally recognized degrees.",
            },
            {
                question: "What English score is required?",
                answer: "Minimum IELTS of 6.0 overall is required for most programs.",
            },
        ],
        category: "Overseas",
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
