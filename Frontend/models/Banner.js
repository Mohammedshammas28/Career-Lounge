import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
    {
        // University Reference - Required
        university: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "University",
            required: true,
        },

        // Editable Text Fields
        heading: {
            type: String,
            default: "Study at Top Ranked University Abroad",
        },

        highlightedHeading: {
            type: String,
            default: "University",
        },

        subHeading: {
            type: String,
            default: "Unlock global opportunities with world-class education, industry-focused courses and amazing offers.",
        },

        tagText: {
            type: String,
            default: "FEATURED UNIVERSITY",
        },

        // Offer Details
        offerPercentage: String,

        offerText: String,

        deadlineText: String,

        // CTA Button
        buttonText: {
            type: String,
            default: "Apply Now",
        },

        // Custom Images
        customBannerImage: String,

        // Banner Status & Display
        featured: {
            type: Boolean,
            default: false,
        },

        active: {
            type: Boolean,
            default: true,
        },

        // Custom Styling
        customBackground: String,

        customGradient: {
            type: String,
            default: "from-purple-900 via-blue-900 to-purple-900",
        },

        // Reordering
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Index for sorting by order and created date
bannerSchema.index({ order: 1, createdAt: -1 });

export default mongoose.models.Banner || mongoose.model("Banner", bannerSchema);
