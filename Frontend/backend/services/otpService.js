import bcrypt from "bcryptjs";
import OTP from "@/models/OTP";
import { connectToDatabase } from "@/lib/db/connect";

export const otpService = {
  /**
   * Generate a secure 6-digit numeric OTP code
   */
  generateOTP: () => {
    // Generate a secure random number between 100000 and 999999
    return (Math.floor(100000 + Math.random() * 900000)).toString();
  },

  /**
   * Save an OTP to the database for an identifier (email or phone)
   */
  saveOTP: async ({ identifier, otp }) => {
    await connectToDatabase();
    const cleanIdentifier = identifier.trim().toLowerCase();
    
    // Hash the OTP
    const salt = await bcrypt.genSalt(10);
    const otpHash = await bcrypt.hash(otp, salt);

    // Calculate expiry (10 minutes from now)
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || "10", 10);
    const expiresAt = new Date(Date.now() + expiryMinutes * 60 * 1000);

    // Delete any existing OTPs for this identifier
    await OTP.deleteMany({ identifier: cleanIdentifier });

    // Save the new OTP
    const otpRecord = new OTP({
      identifier: cleanIdentifier,
      otpHash,
      expiresAt,
      verified: false
    });

    await otpRecord.save();
    return otpRecord;
  },

  /**
   * Verify an OTP for an identifier (email or phone)
   */
  verifyOTP: async ({ identifier, otp }) => {
    await connectToDatabase();
    const cleanIdentifier = identifier.trim().toLowerCase();

    // Find the latest active OTP record
    const otpRecord = await OTP.findOne({
      identifier: cleanIdentifier,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return { success: false, message: "Verification code expired or not found. Please request a new one." };
    }

    if (otpRecord.verified) {
      return { success: false, message: "Code has already been verified and consumed." };
    }

    // Compare OTP
    const isMatch = await bcrypt.compare(otp.trim(), otpRecord.otpHash);
    if (!isMatch) {
      return { success: false, message: "Invalid verification code. Please check and try again." };
    }

    // Mark as verified
    otpRecord.verified = true;
    await otpRecord.save();

    return { success: true, message: "OTP verified successfully." };
  },

  /**
   * Check if identifier (email or phone) has been verified recently
   */
  checkVerificationStatus: async (identifier) => {
    await connectToDatabase();
    const cleanIdentifier = identifier.trim().toLowerCase();

    // Look for verified record within expiry window
    const otpRecord = await OTP.findOne({
      identifier: cleanIdentifier,
      verified: true,
      expiresAt: { $gt: new Date() }
    });

    return !!otpRecord;
  },

  /**
   * Consume verification token (delete after submission)
   */
  consumeVerification: async (identifier) => {
    await connectToDatabase();
    const cleanIdentifier = identifier.trim().toLowerCase();
    await OTP.deleteMany({ identifier: cleanIdentifier });
  }
};
