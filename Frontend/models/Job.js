import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        company: {
            type: String,
            required: true,
            trim: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String, // Full-time, Part-time, Contract, Remote, etc.
            required: true,
            default: "Full-time",
        },
        salary: {
            type: String,
            required: true,
            trim: true,
        },
        experience: {
            type: String, // e.g., "3+ Years", "Freshers"
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: {
            type: [String],
            default: [],
        },
        responsibilities: {
            type: [String],
            default: [],
        },
        logo: {
            type: String, // Company logo image URL
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Add text indexes for search functionality
jobSchema.index({
    title: "text",
    company: "text",
    location: "text",
});

export default mongoose.models.Job || mongoose.model("Job", jobSchema);
