import mongoose from "mongoose";

const homePageCardSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["career-counselling", "test-prep", "study-destination", "popular-course"],
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subtitle: {
            type: String,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String, // Icon/Image URL
            trim: true,
        },
        iconName: {
            type: String, // String representation of Lucide icon if applicable, e.g. "UserRoundSearch"
            trim: true,
        },
        buttonText: {
            type: String,
            trim: true,
        },
        buttonLink: {
            type: String,
            trim: true,
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        // Study Destination specific fields
        totalUniversities: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Indexing on type and displayOrder for performance
homePageCardSchema.index({ type: 1, displayOrder: 1 });

export default mongoose.models.HomePageCard || mongoose.model("HomePageCard", homePageCardSchema);
