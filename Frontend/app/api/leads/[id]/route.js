import { connectToDatabase } from "@/lib/db/connect";
import Lead from "@/models/Lead";

export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;
        const { status } = await request.json();

        if (!status) {
            return Response.json({ error: "Status is required" }, { status: 400 });
        }

        const updatedLead = await Lead.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedLead) {
            return Response.json({ error: "Lead not found" }, { status: 404 });
        }

        return Response.json({ success: true, lead: updatedLead }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to update lead: " + error.message }, { status: 500 });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectToDatabase();
        const { id } = params;

        const deletedLead = await Lead.findByIdAndDelete(id);

        if (!deletedLead) {
            return Response.json({ error: "Lead not found" }, { status: 404 });
        }

        return Response.json({ success: true, message: "Lead deleted successfully" }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Failed to delete lead: " + error.message }, { status: 500 });
    }
}
