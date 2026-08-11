import { connectToDatabase } from "@/lib/db/connect";
import University from "@/models/University";

const normalizeRanking = (value) => (value || "").toString().replace(/\D/g, "").slice(0, 4);

/**
 * Normalize a course level string to the accepted enum values:
 *   "Undergraduate" | "Postgraduate"
 */
const normalizeCourseLevel = (level) => {
    const l = (level || "").toLowerCase().trim();
    if (
        l.includes("post") ||
        l.includes("master") ||
        l.includes("mba") ||
        l.includes("msc") ||
        l.includes("ma ") ||
        l === "ma" ||
        l.includes("phd") ||
        l.includes("doctor") ||
        l.includes("pg")
    ) {
        return "Postgraduate";
    }
    return "Undergraduate";
};

/**
 * Sanitize a single university item before saving:
 * - Normalize ranking
 * - Normalize each course level to the enum value
 * - Ensure coursesOffered is an array
 */
const sanitizeUniversity = (item) => {
    const normalized = {
        ...item,
        ranking: normalizeRanking(item.ranking),
        coursesOffered: Array.isArray(item.coursesOffered) ? item.coursesOffered : [],
    };

    if (Array.isArray(item.courses)) {
        normalized.courses = item.courses
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
    } else {
        normalized.courses = [];
    }

    return normalized;
};

export async function GET() {
    try {
        await connectToDatabase();
        const universities = await University.find().sort({ createdAt: -1 });
        return Response.json({ success: true, data: universities }, { status: 200 });
    } catch (error) {
        console.error("Error fetching universities:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectToDatabase();

        const body = await req.json();

        // --- Bulk upload: if body is an array ---
        if (Array.isArray(body)) {
            if (body.length === 0) {
                return Response.json(
                    { success: false, error: "Empty array provided. At least one university is required." },
                    { status: 400 }
                );
            }

            const results = { inserted: [], skipped: [], errors: [] };

            for (const item of body) {
                try {
                    if (!item.universityName || !item.universityName.trim()) {
                        results.errors.push({ name: "Unknown", error: "universityName is required" });
                        continue;
                    }

                    const sanitized = sanitizeUniversity(item);
                    const slug =
                        sanitized.slug ||
                        sanitized.universityName
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                            .replace(/[^\w-]/g, "");

                    const exists = await University.findOne({
                        $or: [{ slug }, { universityName: sanitized.universityName }],
                    });

                    if (exists) {
                        results.skipped.push(sanitized.universityName);
                        continue;
                    }

                    const uni = new University({ ...sanitized, slug });
                    await uni.save();
                    results.inserted.push(uni.universityName);
                } catch (err) {
                    results.errors.push({ name: item?.universityName || "Unknown", error: err.message });
                }
            }

            return Response.json({ success: true, ...results }, { status: 201 });
        }

        // --- Single upload ---
        if (!body.universityName || !body.universityName.trim()) {
            return Response.json(
                { success: false, error: "universityName is required" },
                { status: 400 }
            );
        }

        const sanitized = sanitizeUniversity(body);
        const slug =
            sanitized.slug ||
            sanitized.universityName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

        const existingUniversity = await University.findOne({
            $or: [{ slug }, { universityName: sanitized.universityName }],
        });

        if (existingUniversity) {
            return Response.json(
                { success: false, error: "University with this name already exists." },
                { status: 400 }
            );
        }

        const university = new University({ ...sanitized, slug });
        await university.save();

        return Response.json({ success: true, data: university }, { status: 201 });
    } catch (error) {
        console.error("Error creating university:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
