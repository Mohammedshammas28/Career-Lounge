import { otpService } from "@/backend/services/otpService";
import { memoryVerifyOTP } from "@/app/api/contact/send-email-otp/route";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return Response.json({ error: "Email and verification code are required." }, { status: 400 });
    }

    // Try DB-backed OTP verification first, fall back to in-memory
    let verification;
    try {
      verification = await otpService.verifyOTP({ identifier: email, otp });
    } catch (dbError) {
      console.warn("[Verify Email OTP] DB unavailable, trying in-memory fallback:", dbError.message);
      verification = memoryVerifyOTP(email, otp);
    }

    // If DB returned not found, also try the memory store (covers cases where OTP was sent in memory-fallback mode)
    if (!verification.success && verification.message?.includes("not found")) {
      const memResult = memoryVerifyOTP(email, otp);
      if (memResult.success) verification = memResult;
    }

    if (!verification.success) {
      return Response.json({ error: verification.message }, { status: 400 });
    }

    return Response.json({ success: true, message: "Email verified successfully." }, { status: 200 });
  } catch (error) {
    console.error("verify-email-otp error:", error);
    return Response.json({ error: error.message || "Failed to verify email OTP." }, { status: 500 });
  }
}
