import { connectToDatabase } from "@/lib/db/connect";
import Course from "@/models/Course";

const DEFAULT_COURSES = [
    {
        courseName: "Allied Health",
        description: "Patient care, clinical practice, and health sciences.",
        image: "https://picsum.photos/seed/allied-health/800/480",
        duration: "3-4 Years",
        fees: "$12,000 / Year",
        category: "Undergraduate",
        overview: "Allied Health sciences encompass a broad range of health professions that are distinct from medicine and nursing. Professionals in this field work in patient care, clinical practice, diagnostics, and therapy. This program provides students with the critical skills required to support healthcare systems and improve patient outcomes.",
        requirements: "High school diploma or equivalent with minimum 60% grade. Core subjects in Biology and Chemistry recommended.",
        opportunities: "Healthcare Assistant, Clinical Lab Technician, Physical Therapy Aide, Health Educator, Diagnostic Specialist.",
        subjects: ["Human Anatomy", "Physiology", "Clinical Biochemistry", "Healthcare Ethics", "Pathology"],
        subCourses: [
            {
                name: "Nursing",
                duration: "4 Years",
                fees: "$12,000 / Year",
                overview: "A comprehensive course focusing on nursing ethics, clinical practice, pharmacology, and critical patient care.",
                careerOutcomes: "Registered Nurse, Nurse Administrator, Critical Care Specialist"
            },
            {
                name: "Physiotherapy",
                duration: "4.5 Years",
                fees: "$13,000 / Year",
                overview: "Covers rehabilitation techniques, muscle anatomy, sports physiology, and physical exercises.",
                careerOutcomes: "Physiotherapist, Sports Injury Consultant, Rehabilitation Specialist"
            },
            {
                name: "Medical Laboratory Technology",
                duration: "3 Years",
                fees: "$10,500 / Year",
                overview: "Training in diagnostic testing, clinical chemistry, hematology, and microscopic analysis of specimens.",
                careerOutcomes: "Lab Technician, Pathologist Assistant, Quality Control Officer"
            }
        ],
        status: true
    },
    {
        courseName: "Commerce",
        description: "Business, trade, accounting, and finance fundamentals.",
        image: "https://picsum.photos/seed/commerce-finance/800/480",
        duration: "3 Years",
        fees: "$10,000 / Year",
        category: "Undergraduate",
        overview: "The Commerce program is designed to provide a comprehensive understanding of business operations, financial accounting, commerce laws, trade principles, and economics. Students learn to analyze business trends, manage financial books, and develop strategic plans for business growth in local and global markets.",
        requirements: "High school completion with mathematics/business studies background preferred.",
        opportunities: "Accountant, Financial Analyst, Auditor, Business Developer, Tax Consultant.",
        subjects: ["Financial Accounting", "Micro & Macro Economics", "Business Law", "Auditing", "Corporate Finance"],
        subCourses: [
            {
                name: "B.Com in Accounting & Finance",
                duration: "3 Years",
                fees: "$10,000 / Year",
                overview: "Specialization in auditing standards, financial statements reporting, taxation laws, and risk assessment.",
                careerOutcomes: "Chartered Accountant (CA) aspirant, Auditor, Tax Consultant"
            },
            {
                name: "B.Com in Banking & Insurance",
                duration: "3 Years",
                fees: "$9,500 / Year",
                overview: "Covers commercial banking, loan management, underwriting standards, and actuarial basics.",
                careerOutcomes: "Credit Officer, Insurance Broker, Investment Advisor"
            }
        ],
        status: true
    },
    {
        courseName: "Engineering",
        description: "Design, innovation, and real-world problem solving.",
        image: "https://picsum.photos/seed/engineering-tech/800/480",
        duration: "4 Years",
        fees: "$15,000 / Year",
        category: "Undergraduate",
        overview: "Engineering focuses on applying scientific and mathematical principles to design, manufacture, and maintain complex structures, machines, devices, systems, and processes. It is a highly analytical and creative field that drives technological advancement and solves real-world challenges.",
        requirements: "High school completion with strong performance in Physics, Chemistry, and Advanced Mathematics.",
        opportunities: "Software Engineer, Civil Engineer, Mechanical Engineer, Project Manager, Research Scientist.",
        subjects: ["Engineering Mathematics", "Applied Physics", "Systems Design", "Thermodynamics", "Computer Programming"],
        subCourses: [
            {
                name: "Computer Science Engineering",
                duration: "4 Years",
                fees: "$16,500 / Year",
                overview: "Focuses on software engineering, computer networks, algorithms, databases, web technologies, and artificial intelligence.",
                careerOutcomes: "Software Architect, Cloud Engineer, Full Stack Developer, Systems Analyst"
            },
            {
                name: "Mechanical Engineering",
                duration: "4 Years",
                fees: "$14,500 / Year",
                overview: "Specialization in computer-aided design (CAD), fluid dynamics, manufacturing engineering, and robotics.",
                careerOutcomes: "Robotics Engineer, Automotive Designer, Aerospace Technician"
            },
            {
                name: "Civil Engineering",
                duration: "4 Years",
                fees: "$14,000 / Year",
                overview: "Covers highway engineering, structural analysis, geology, building designs, and environmental safety.",
                careerOutcomes: "Structural Engineer, Site Manager, Urban Planner"
            }
        ],
        status: true
    },
    {
        courseName: "Management",
        description: "Strategy, operations, and data-driven decision making.",
        image: "https://picsum.photos/seed/management-biz/800/480",
        duration: "2-3 Years",
        fees: "$14,000 / Year",
        category: "Postgraduate",
        overview: "The Management program focuses on leadership development, strategic planning, operations management, and data-driven decision making. It prepares students for managerial and executive roles in corporate, non-profit, and public organizations by building skills in negotiation, project coordination, and team building.",
        requirements: "Bachelor's degree in any discipline with a minimum GPA of 2.8. GMAT/GRE scores optional but preferred.",
        opportunities: "Operations Manager, Management Consultant, HR Specialist, Business Strategist, Product Manager.",
        subjects: ["Organizational Behavior", "Strategic Management", "Marketing Operations", "Data Analytics", "Human Resource Management"],
        subCourses: [
            {
                name: "Business Management (MBA)",
                duration: "2 Years",
                fees: "$14,000 / Year",
                overview: "Covers entrepreneurship, digital marketing, supply chain management, and advanced leadership skills.",
                careerOutcomes: "Operations Manager, Management Consultant, Product Owner"
            },
            {
                name: "Hotel & Hospitality Management",
                duration: "3 Years",
                fees: "$12,500 / Year",
                overview: "Focuses on guest relations, food and beverage operations, resort management, and events organization.",
                careerOutcomes: "Hotel General Manager, Event Manager, Guest Relations Director"
            },
            {
                name: "Hospital & Healthcare Management",
                duration: "2 Years",
                fees: "$13,000 / Year",
                overview: "Deals with hospital operations, health insurance policies, medical record systems, and health law compliance.",
                careerOutcomes: "Hospital Administrator, Health Program Coordinator, Clinic Operations Lead"
            }
        ],
        status: true
    },
    {
        courseName: "Medicine",
        description: "Clinical science, diagnosis, and patient care.",
        image: "https://picsum.photos/seed/medicine-health/800/480",
        duration: "5-6 Years",
        fees: "$25,000 / Year",
        category: "Undergraduate",
        overview: "Medicine is a rigorous professional program that covers clinical science, pathology, pharmacology, and patient diagnosis. Students receive intensive hands-on clinical training, enabling them to diagnose illnesses, prescribe treatments, and perform medical procedures to ensure human health and well-being.",
        requirements: "Excellent academic scores in Biology, Chemistry, and Physics. Medical entrance test clearance.",
        opportunities: "General Practitioner, Resident Doctor, Medical Researcher, Hospital Administrator, Healthcare Consultant.",
        subjects: ["Anatomy & Histology", "Medical Biochemistry", "Pharmacology", "General Pathology", "Clinical Medicine"],
        subCourses: [
            {
                name: "General Medicine (MBBS)",
                duration: "5.5 Years",
                fees: "$26,000 / Year",
                overview: "Complete study of human anatomy, clinical diagnosis, pathology, obstetrics, and medical therapeutics.",
                careerOutcomes: "General Practitioner, Resident Medical Officer, Clinical Researcher"
            },
            {
                name: "Dental Surgery (BDS)",
                duration: "4 Years",
                fees: "$22,000 / Year",
                overview: "Specialized training in oral medicine, orthodontics, oral pathology, dental implants, and hygiene.",
                careerOutcomes: "Dentist, Dental Surgeon, Orthodontist Practitioner"
            }
        ],
        status: true
    },
    {
        courseName: "Science",
        description: "Core scientific principles, research, and discovery.",
        image: "https://picsum.photos/seed/science-lab/800/480",
        duration: "3 Years",
        fees: "$9,000 / Year",
        category: "Undergraduate",
        overview: "The Science program offers a comprehensive study of fundamental sciences, fostering critical thinking, research skills, and scientific discovery. Students can choose to specialize in Biology, Chemistry, Physics, or Mathematics, conducting laboratory work and field research to expand theoretical and practical knowledge.",
        requirements: "High school completion with science subjects (Physics, Chemistry, Biology/Maths).",
        opportunities: "Research Analyst, Laboratory Manager, Quality Controller, Scientific Writer, Academician.",
        subjects: ["Scientific Method", "Applied Statistics", "Laboratory Practices", "Advanced Specialization Core", "Environmental Science"],
        subCourses: [
            {
                name: "B.Sc in Biotechnology",
                duration: "3 Years",
                fees: "$9,500 / Year",
                overview: "Study of molecular biology, genetics, immunology, industrial biotechnology, and chemical engineering processes.",
                careerOutcomes: "Research Assistant, Biochemist, Quality Assurance Officer"
            },
            {
                name: "B.Sc in Computer Science",
                duration: "3 Years",
                fees: "$9,000 / Year",
                overview: "Focuses on mathematical modeling, system theory, programming, cybersecurity, and cloud structures.",
                careerOutcomes: "Network Analyst, IT Consultant, Systems Manager"
            }
        ],
        status: true
    }
];

export async function GET(req) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);
        const includeInactive = searchParams.get("all") === "true";

        let courses = [];
        if (includeInactive) {
            courses = await Course.find().sort({ createdAt: -1 });
        } else {
            courses = await Course.find({ status: true }).sort({ createdAt: -1 });
        }

        // If no courses exist, seed with default courses
        if (courses.length === 0) {
            console.log("🌱 No courses found. Seeding default courses with sub-courses...");
            const seeded = [];
            for (const item of DEFAULT_COURSES) {
                const slug = item.courseName
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "");
                
                const course = new Course({
                    ...item,
                    slug,
                });
                await course.save();
                seeded.push(course);
            }
            courses = seeded;
        }

        // Auto-migrate: fix any courses with broken Unsplash/Pexels image URLs
        const migratePromises = [];
        for (const course of courses) {
            if (course.image && (course.image.includes("images.unsplash.com") || course.image.includes("images.pexels.com"))) {
                const newUrl = `https://picsum.photos/seed/${encodeURIComponent(course.courseName)}/800/480`;
                migratePromises.push(
                    Course.findByIdAndUpdate(course._id, { image: newUrl })
                );
                course.image = newUrl;
            }
        }
        if (migratePromises.length > 0) {
            console.log(`🔄 Migrating ${migratePromises.length} courses with broken image URLs...`);
            await Promise.all(migratePromises);
        }

        return Response.json(
            {
                success: true,
                data: courses,
            },
            { status: 200 }
        );
    } catch (error) {
        console.warn("⚠️ Error fetching courses from database, using fallback:", error.message);
        const fallbackCourses = DEFAULT_COURSES.map((course, idx) => ({
            _id: `fallback-course-${idx}`,
            ...course,
            slug: course.slug || course.courseName.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "")
        }));
        return Response.json(
            {
                success: true,
                data: fallbackCourses,
                isFallback: true,
            },
            { status: 200 }
        );
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json();

        if (!body.courseName) {
            return Response.json(
                { success: false, error: "Course name is required" },
                { status: 400 }
            );
        }

        // Generate slug from courseName
        const slug =
            body.slug ||
            body.courseName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

        // Check if course already exists (case-insensitive)
        const existingCourse = await Course.findOne({
            $or: [
                { slug },
                { courseName: { $regex: new RegExp(`^${body.courseName.trim().replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}$`, "i") } }
            ],
        });

        if (existingCourse) {
            return Response.json(
                {
                    success: false,
                    error: "Course with this name or slug already exists",
                },
                { status: 400 }
            );
        }

        const course = new Course({
            ...body,
            slug,
        });

        await course.save();

        return Response.json(
            {
                success: true,
                data: course,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating course:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
