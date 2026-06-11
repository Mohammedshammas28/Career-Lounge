import { connectToDatabase } from "@/lib/db/connect";
import HomePageCard from "@/models/HomePageCard";

export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        const card = await HomePageCard.findById(id);

        if (!card) {
            return Response.json(
                {
                    success: false,
                    error: "Card not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: card,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching card:", error);
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
        const { id } = await params;
        const body = await req.json();

        const updatedCard = await HomePageCard.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedCard) {
            return Response.json(
                {
                    success: false,
                    error: "Card not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                data: updatedCard,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating card:", error);
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
        const { id } = await params;

        const deletedCard = await HomePageCard.findByIdAndDelete(id);

        if (!deletedCard) {
            return Response.json(
                {
                    success: false,
                    error: "Card not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                message: "Card deleted successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting card:", error);
        return Response.json(
            {
                success: false,
                error: error.message,
            },
            { status: 500 }
        );
    }
}
