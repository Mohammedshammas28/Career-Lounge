import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            required: true,
        },
        serviceType: {
            type: String, // e.g., "Domestic Recruitment", "Overseas Education"
            trim: true,
            default: "General Inquiry",
        },
        sourcePage: {
            type: String, // E.g. "University of Melbourne Page"
            trim: true,
        },
        sourceUrl: {
            type: String,
            trim: true,
        },
        referrer: {
            type: String,
            trim: true,
        },
        status: {
            type: String,
            enum: ["New", "Contacted", "Follow Up", "Converted", "Closed"],
            default: "New",
        },
        // Store any specific context like { university: "Harvard", course: "MBA" } or { jobTitle: "Engineer" }
        contextData: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

// Add indexes for efficient admin dashboard querying
leadSchema.index({ email: 1 });
leadSchema.index({ status: 1 });
leadSchema.index({ serviceType: 1 });
leadSchema.index({ createdAt: -1 });

export default mongoose.models.Lead || mongoose.model("Lead", leadSchema);
