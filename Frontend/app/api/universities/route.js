import { connectToDatabase } from "@/lib/db/connect";
import University from "@/models/University";

const normalizeRanking = (value) => (value || "").toString().replace(/\D/g, "").slice(0, 4);

export async function GET() {
    try {
        await connectToDatabase();

        const universities = await University.find().sort({ createdAt: -1 });

        return Response.json(
            {
                success: true,
                data: universities,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching universities:", error);
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

        // --- Bulk upload: if body is an array ---
        if (Array.isArray(body)) {
            const results = { inserted: [], skipped: [], errors: [] };
            for (const item of body) {
                try {
                    const normalizedItem = { ...item, ranking: normalizeRanking(item.ranking) };
                    const slug = normalizedItem.slug || normalizedItem.universityName
                        .toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
                    const exists = await University.findOne({
                        $or: [{ slug }, { universityName: normalizedItem.universityName }]
                    });
                    if (exists) {
                        results.skipped.push(normalizedItem.universityName);
                        continue;
                    }
                    const uni = new University({ ...normalizedItem, slug });
                    await uni.save();
                    results.inserted.push(uni.universityName);
                } catch (err) {
                    results.errors.push({ name: item.universityName, error: err.message });
                }
            }
            return Response.json({ success: true, ...results }, { status: 201 });
        }

        // --- Single upload ---
        const normalizedBody = {
            ...body,
            ranking: normalizeRanking(body.ranking),
        };

        const slug =
            normalizedBody.slug ||
            normalizedBody.universityName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");

        const existingUniversity = await University.findOne({
            $or: [{ slug }, { universityName: normalizedBody.universityName }],
        });

        if (existingUniversity) {
            return Response.json(
                { success: false, error: "University already exists" },
                { status: 400 }
            );
        }

        const university = new University({ ...normalizedBody, slug });
        await university.save();

        return Response.json({ success: true, data: university }, { status: 201 });
    } catch (error) {
        console.error("Error creating university:", error);
        return Response.json({ success: false, error: error.message }, { status: 500 });
    }
}
