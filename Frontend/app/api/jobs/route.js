import { connectToDatabase } from "@/lib/db/connect";
import Job from "@/models/Job";

const DEFAULT_JOBS = [
    {
        title: "Senior Software Engineer",
        company: "TechNova Solutions",
        location: "Dubai, UAE",
        type: "Full-time",
        salary: "AED 18,000 - 25,000 / Month",
        experience: "5+ Years",
        logo: "https://picsum.photos/seed/technova/200/200",
        description: "We are seeking a Senior Software Engineer to lead the development of our cloud platforms and mentor junior developers. In this role, you will collaborate with cross-functional teams to define, design, and ship new features.",
        requirements: [
            "Bachelor's degree in Computer Science or related field",
            "5+ years of experience with React, Node.js, and cloud services (AWS/GCP)",
            "Proven experience building scalable web applications",
            "Strong understanding of database design and system architecture"
        ],
        responsibilities: [
            "Design and implement robust, clean, and maintainable code",
            "Provide technical leadership and mentor junior engineers",
            "Collaborate with product managers and designers to translate requirements into engineering solutions",
            "Participate in code reviews and advocate for code quality standards"
        ],
        isActive: true
    },
    {
        title: "Clinical Nurse Specialist",
        company: "City Care Hospital",
        location: "Abu Dhabi, UAE",
        type: "Full-time",
        salary: "AED 12,000 - 15,000 / Month",
        experience: "3+ Years",
        logo: "https://picsum.photos/seed/citycare/200/200",
        description: "Provide critical nursing care, manage patient rehabilitation programs, and lead hospital shifts. You will work closely with medical doctors and healthcare teams to provide exceptional clinical treatment.",
        requirements: [
            "Bachelor of Science in Nursing (BSN) or equivalent",
            "HAAD/DOH license to practice in Abu Dhabi",
            "3+ years of clinical nurse specialist experience in a hospital setting",
            "Excellent patient communication and critical care skills"
        ],
        responsibilities: [
            "Deliver direct, expert care to patients with complex medical conditions",
            "Develop, implement, and evaluate customized patient care plans",
            "Educate patients and their families on ongoing care procedures and treatment management",
            "Lead and train nursing staff during clinical shifts"
        ],
        isActive: true
    },
    {
        title: "Digital Marketing Manager",
        company: "Apex Media Agency",
        location: "Dubai, UAE (Hybrid)",
        type: "Full-time",
        salary: "AED 10,000 - 14,000 / Month",
        experience: "4+ Years",
        logo: "https://picsum.photos/seed/apexmedia/200/200",
        description: "Develop, implement, track and optimize our digital marketing campaigns across all digital channels. You will lead marketing campaigns from conceptualization to execution, analyzing performance metrics to drive client growth.",
        requirements: [
            "Degree in Marketing, Communications, or related field",
            "4+ years of digital marketing agency or in-house experience",
            "Demonstrated experience with Google Ads, Meta Ads, SEO, and Google Analytics",
            "Strong copywriting skills and creative thinking capabilities"
        ],
        responsibilities: [
            "Plan and execute all digital marketing campaigns including SEO/SEM, email, social media, and advertising",
            "Design, build, and maintain our clients' social media presence",
            "Measure and report performance of all digital marketing campaigns against targets (ROI and KPIs)",
            "Collaborate with internal creative teams to produce highly engaging marketing collateral"
        ],
        isActive: true
    },
    {
        title: "Financial Analyst",
        company: "Global Finance Corp",
        location: "Riyadh, Saudi Arabia",
        type: "Full-time",
        salary: "SAR 15,000 - 20,000 / Month",
        experience: "2+ Years",
        logo: "https://picsum.photos/seed/globalfinance/200/200",
        description: "Conduct financial analysis, build complex financial models, and prepare reports for senior leadership to drive strategic investment choices. You will gather data and identify business trends to optimize corporate budget execution.",
        requirements: [
            "Bachelor's degree in Finance, Economics, Accounting, or related field",
            "CFA level 1 or 2 candidate preferred",
            "2+ years of professional financial modeling or accounting experience",
            "Expert efficiency with MS Excel and database management systems"
        ],
        responsibilities: [
            "Build and analyze detailed financial projection models",
            "Analyze current and past financial data and performance",
            "Prepare monthly/quarterly financial summaries for the executive board",
            "Identify financial trends and provide recommendations for cost optimization"
        ],
        isActive: true
    }
];

export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const includeInactive = searchParams.get("all") === "true";
        const categoryFilter = searchParams.get("category"); // "Domestic" | "Overseas" | null

        let query = {};
        if (!includeInactive) {
            query.isActive = true;
        }
        if (categoryFilter && categoryFilter !== "All") {
            query.category = categoryFilter;
        }

        let jobs = await Job.find(query).sort({ createdAt: -1 });

        // If no jobs exist at all, seed with default jobs
        const totalJobs = await Job.countDocuments();
        if (totalJobs === 0) {
            console.log("🌱 No jobs found. Seeding default jobs...");
            const seeded = [];
            for (const item of DEFAULT_JOBS) {
                const slug = (item.title + "-" + item.company)
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "");
                
                const job = new Job({
                    ...item,
                    slug,
                    category: item.category || "Domestic",
                });
                await job.save();
                seeded.push(job);
            }
            jobs = seeded.filter(j => !categoryFilter || j.category === categoryFilter).sort((a, b) => b.createdAt - a.createdAt);
        }

        return Response.json(
            {
                success: true,
                data: jobs,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json();

        // Generate slug from title + company
        const slug =
            body.slug ||
            (body.title + "-" + body.company)
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

        // Check if job already exists
        const existingJob = await Job.findOne({ slug });

        if (existingJob) {
            return Response.json(
                {
                    success: false,
                    error: "Job with this title and company already exists",
                },
                { status: 400 }
            );
        }

        const job = new Job({
            ...body,
            slug,
        });

        await job.save();

        return Response.json(
            {
                success: true,
                data: job,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating job:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
