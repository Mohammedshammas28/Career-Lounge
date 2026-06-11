import { connectToDatabase } from "@/lib/db/connect";
import Lead from "@/models/Lead";

export async function GET(request) {
    try {
        await connectToDatabase();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || "";
        const serviceType = searchParams.get("serviceType") || "All";
        const status = searchParams.get("status") || "All";

        let query = {};

        if (search) {
            query.$or = [
                { firstName: { $regex: search, $options: "i" } },
                { lastName: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        if (serviceType && serviceType !== "All") {
            query.serviceType = serviceType;
        }

        if (status && status !== "All") {
            query.status = status;
        }

        const leads = await Lead.find(query).sort({ createdAt: -1 });

        return Response.json(leads, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to fetch leads: " + error.message }, { status: 500 });
    }
}
