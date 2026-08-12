import OTPRequest from "@/models/OTPRequest";
import { connectToDatabase } from "@/lib/db/connect";

/**
 * Checks if the identifier (email or phone) has exceeded the OTP rate limit.
 * Maximum: 3 requests per 10 minutes.
 */
export const checkOTPRateLimit = async (identifier) => {
  await connectToDatabase();
  const cleanIdentifier = identifier.trim().toLowerCase();
  
  // Calculate threshold (10 minutes ago)
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
  
  // Count requests in last 10 minutes
  const count = await OTPRequest.countDocuments({
    email: cleanIdentifier, // Storing either email or phone in the 'email' field
    requestedAt: { $gte: tenMinutesAgo }
  });
  
  if (count >= 3) {
    return {
      allowed: false,
      message: "Too Many Requests. Maximum 3 verification codes allowed within 10 minutes."
    };
  }
  
  // Record the new request
  const request = new OTPRequest({
    email: cleanIdentifier,
    requestedAt: new Date()
  });
  await request.save();
  
  return { allowed: true };
};
