import { connectToDatabase } from "@/lib/db/connect";
import Job from "@/models/Job";

export async function GET(req, { params }) {
    try {
        await connectToDatabase();

        const { slug } = await params;

        const job = await Job.findOne({ slug });

        if (!job) {
            return Response.json(
                {
                    success: false,
                    error: "Job not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: job,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching job:", error);
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

        // If title or company name changes, generate new slug (unless overridden or updating status)
        let normalizedBody = { ...body };
        if ((body.title || body.company) && !body.slug) {
            // Fetch current job to get fallbacks
            const currentJob = await Job.findOne({ slug });
            if (currentJob) {
                const title = body.title || currentJob.title;
                const company = body.company || currentJob.company;
                normalizedBody.slug = (title + "-" + company)
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "");
            }
        }

        const job = await Job.findOneAndUpdate({ slug }, normalizedBody, {
            new: true,
            runValidators: true,
        });

        if (!job) {
            return Response.json(
                {
                    success: false,
                    error: "Job not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: job,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating job:", error);
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

        const job = await Job.findOneAndDelete({ slug });

        if (!job) {
            return Response.json(
                {
                    success: false,
                    error: "Job not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Job deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting job:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
