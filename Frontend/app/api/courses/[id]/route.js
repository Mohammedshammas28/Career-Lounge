import { connectToDatabase } from "@/lib/db/connect";
import Course from "@/models/Course";
import mongoose from "mongoose";

export async function GET(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        let course;
        if (mongoose.isValidObjectId(id)) {
            course = await Course.findById(id);
        } else {
            // If it's not a valid ObjectId, search by slug
            course = await Course.findOne({ slug: id });
        }

        if (!course) {
            return Response.json(
                { success: false, error: "Course not found" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, data: course },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching course:", error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function PATCH(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;
        const body = await req.json();

        if (!mongoose.isValidObjectId(id)) {
            return Response.json(
                { success: false, error: "Invalid course ID" },
                { status: 400 }
            );
        }

        // Generate slug from courseName if courseName is updated
        if (body.courseName && !body.slug) {
            body.slug = body.courseName
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^\w-]/g, "");
        }

        const course = await Course.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        if (!course) {
            return Response.json(
                { success: false, error: "Course not found" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, data: course },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating course:", error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectToDatabase();
        const { id } = await params;

        if (!mongoose.isValidObjectId(id)) {
            return Response.json(
                { success: false, error: "Invalid course ID" },
                { status: 400 }
            );
        }

        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return Response.json(
                { success: false, error: "Course not found" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, message: "Course deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting course:", error);
        return Response.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
