import { connectToDatabase } from "@/lib/db/connect";
import University from "@/models/University";

const normalizeRanking = (value) => (value || "").toString().replace(/\D/g, "").slice(0, 4);

const normalizeCourseLevel = (level) => {
    const l = (level || "").toLowerCase().trim();
    if (
        l.includes("post") ||
        l.includes("master") ||
        l.includes("mba") ||
        l.includes("msc") ||
        l === "ma" ||
        l.includes("phd") ||
        l.includes("doctor") ||
        l.includes("pg")
    ) {
        return "Postgraduate";
    }
    return "Undergraduate";
};

const sanitizeUniversity = (body) => {
    const sanitized = {
        ...body,
        ranking: normalizeRanking(body.ranking),
        coursesOffered: Array.isArray(body.coursesOffered) ? body.coursesOffered : [],
    };
    if (Array.isArray(body.courses)) {
        sanitized.courses = body.courses
            .filter((c) => c && c.courseName && c.courseName.trim())
            .map((c) => ({
                ...c,
                courseName: c.courseName.trim(),
                level: normalizeCourseLevel(c.level),
                duration: c.duration || "",
                fees: c.fees || "",
                description: c.description || "",
                overview: c.overview || "",
                careerOutcomes: c.careerOutcomes || "",
                subCourses: Array.isArray(c.subCourses)
                    ? c.subCourses.map((sub) => ({
                        name: (sub.name || "").trim(),
                        duration: sub.duration || "",
                        fees: sub.fees || "",
                        overview: sub.overview || "",
                        careerOutcomes: sub.careerOutcomes || "",
                    }))
                    : [],
            }));
    }
    return sanitized;
};

export async function GET(req, { params }) {
    try {
        await connectToDatabase();

        const { slug } = await params;

        const university = await University.findOne({ slug });

        if (!university) {
            return Response.json(
                {
                    success: false,
                    error: "University not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: university,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching university:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    try {
        await connectToDatabase();

        const { slug } = await params;
        const body = await req.json();
        const sanitized = sanitizeUniversity(body);

        const university = await University.findOneAndUpdate({ slug }, sanitized, {
            new: true,
            runValidators: true,
        });

        if (!university) {
            return Response.json(
                {
                    success: false,
                    error: "University not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: university,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating university:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();

        const { slug } = await params;

        const university = await University.findOneAndDelete({ slug });

        if (!university) {
            return Response.json(
                {
                    success: false,
                    error: "University not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "University deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting university:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
