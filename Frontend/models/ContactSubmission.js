import mongoose from "mongoose";

const contactSubmissionSchema = new mongoose.Schema(
  {
    fullName: {
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
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Follow Up", "Converted", "Closed"],
      default: "New",
    }
  },
  {
    timestamps: true,
  }
);

// Indexes
contactSubmissionSchema.index({ email: 1 });
contactSubmissionSchema.index({ status: 1 });
contactSubmissionSchema.index({ createdAt: -1 });

export default mongoose.models.ContactSubmission || mongoose.model("ContactSubmission", contactSubmissionSchema);
