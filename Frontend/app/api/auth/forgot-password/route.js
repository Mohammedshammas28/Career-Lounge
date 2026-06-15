import { connectToDatabase } from "@/lib/db/connect";
import User from "@/models/User";
import { otpService } from "@/backend/services/otpService";
import { emailService } from "@/backend/services/emailService";
import { checkOTPRateLimit } from "@/backend/middleware/emailRateLimiter";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: "Email address is required." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Verify User Exists
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      // Return 200 for security reasons (avoid enumeration), but do not send email
      return Response.json({
        success: true,
        message: "If an account exists, a password reset code has been sent."
      }, { status: 200 });
    }

    // 2. Check Rate Limit
    const rateLimit = await checkOTPRateLimit(email);
    if (!rateLimit.allowed) {
      return Response.json({ error: rateLimit.message }, { status: 429 });
    }

    // 3. Generate OTP
    const otp = otpService.generateOTP();

    // 4. Save OTP in DB
    await otpService.saveOTP({ identifier: email, otp });

    // 5. Send Password Reset OTP Email
    await emailService.sendPasswordResetOTP({ to: email, otp });

    return Response.json({
      success: true,
      message: "If an account exists, a password reset code has been sent."
    }, { status: 200 });

  } catch (error) {
    console.error("auth forgot-password error:", error);
    return Response.json({ error: error.message || "Failed to process forgot password request." }, { status: 500 });
  }
}
