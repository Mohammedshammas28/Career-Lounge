import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    identifier: {
      type: String, // Can be email or mobile phone number
      required: true,
      trim: true,
      lowercase: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // Document expires at this exact date
    },
    verified: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// Indexes
otpSchema.index({ identifier: 1 });

export default mongoose.models.OTP || mongoose.model("OTP", otpSchema);
