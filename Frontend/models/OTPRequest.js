import mongoose from "mongoose";

const otpRequestSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        requestedAt: {
            type: Date,
            default: Date.now,
            expires: 600, // 10 minutes (600 seconds) TTL index
        },
    },
    {
        timestamps: false,
    }
);

// Index to search by email efficiently
otpRequestSchema.index({ email: 1 });

export default mongoose.models.OTPRequest || mongoose.model("OTPRequest", otpRequestSchema);
