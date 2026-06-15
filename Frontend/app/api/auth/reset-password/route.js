import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db/connect";
import User from "@/models/User";
import { otpService } from "@/backend/services/otpService";
import { emailService } from "@/backend/services/emailService";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, otp, newPassword } = await request.json();

    if (!email || !otp || !newPassword) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Verify User Exists
    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return Response.json({ error: "User not found." }, { status: 404 });
    }

    // 2. Verify OTP
    const verification = await otpService.verifyOTP({ identifier: email, otp });
    if (!verification.success) {
      return Response.json({ error: verification.message }, { status: 400 });
    }

    // 3. Hash New Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 4. Update Password
    user.password = hashedPassword;
    await user.save();

    // 5. Send password reset confirmation email
    try {
      await emailService.sendPasswordResetConfirmation({ to: cleanEmail, name: user.name });
    } catch (emailError) {
      console.error("Non-blocking password reset confirmation email failed:", emailError);
    }

    // 6. Consume OTP token
    await otpService.consumeVerification(email);

    return Response.json({
      success: true,
      message: "Password has been reset successfully. You can now login."
    }, { status: 200 });

  } catch (error) {
    console.error("auth reset-password error:", error);
    return Response.json({ error: error.message || "Failed to reset password." }, { status: 500 });
  }
}
