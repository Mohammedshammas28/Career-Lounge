import { otpService } from "@/backend/services/otpService";
import { memoryVerifyPhoneOTP } from "@/app/api/contact/send-phone-otp/route";

export async function POST(request) {
  try {
    const { phone, otp } = await request.json();

    if (!phone || !otp) {
      return Response.json({ error: "Phone number and verification code are required." }, { status: 400 });
    }

    // Try DB-backed OTP verification first, fall back to in-memory
    let verification;
    try {
      verification = await otpService.verifyOTP({ identifier: phone, otp });
    } catch (dbError) {
      console.warn("[Verify Phone OTP] DB unavailable, trying in-memory fallback:", dbError.message);
      verification = memoryVerifyPhoneOTP(phone, otp);
    }

    // If DB returned not found, also try the memory store (covers cases where OTP was sent in memory-fallback mode)
    if (!verification.success && verification.message?.includes("not found")) {
      const memResult = memoryVerifyPhoneOTP(phone, otp);
      if (memResult.success) verification = memResult;
    }

    if (!verification.success) {
      return Response.json({ error: verification.message }, { status: 400 });
    }

    return Response.json({ success: true, message: "Phone number verified successfully." }, { status: 200 });
  } catch (error) {
    console.error("verify-phone-otp error:", error);
    return Response.json({ error: error.message || "Failed to verify phone OTP." }, { status: 500 });
  }
}
