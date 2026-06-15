import { otpService } from "@/backend/services/otpService";

export async function POST(request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return Response.json({ error: "Phone number and verification code are required." }, { status: 400 });
    }

    // Verify OTP
    const verification = await otpService.verifyOTP({ identifier: phone, otp });

    if (!verification.success) {
      return Response.json({ error: verification.message }, { status: 400 });
    }

    return Response.json({ success: true, message: "Phone number verified successfully." }, { status: 200 });
  } catch (error) {
    console.error("verify-phone-otp error:", error);
    return Response.json({ error: error.message || "Failed to verify phone OTP." }, { status: 500 });
  }
}
