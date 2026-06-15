import { otpService } from "@/backend/services/otpService";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return Response.json({ error: "Email and verification code are required." }, { status: 400 });
    }

    // Verify OTP
    const verification = await otpService.verifyOTP({ identifier: email, otp });

    if (!verification.success) {
      return Response.json({ error: verification.message }, { status: 400 });
    }

    return Response.json({ success: true, message: "Email verified successfully." }, { status: 200 });
  } catch (error) {
    console.error("verify-email-otp error:", error);
    return Response.json({ error: error.message || "Failed to verify email OTP." }, { status: 500 });
  }
}
