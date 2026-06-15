import { otpService } from "@/backend/services/otpService";
import { smsService } from "@/backend/services/smsService";
import { emailValidator } from "@/backend/utils/emailValidator";
import { checkOTPRateLimit } from "@/backend/middleware/emailRateLimiter";

export async function POST(request) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return Response.json({ error: "Phone number is required." }, { status: 400 });
    }

    // 1. Phone validation check
    if (!emailValidator.isValidPhone(phone)) {
      return Response.json({ error: "Invalid phone number format." }, { status: 400 });
    }

    // 2. Rate limiting check
    const rateLimit = await checkOTPRateLimit(phone);
    if (!rateLimit.allowed) {
      return Response.json({ error: rateLimit.message }, { status: 429 });
    }

    // 3. Generate OTP
    const otp = otpService.generateOTP();

    // 4. Save OTP in DB
    await otpService.saveOTP({ identifier: phone, otp });

    // 5. Send OTP SMS
    await smsService.sendOTP({ phone, otp });

    return Response.json({ success: true, message: "Verification code sent to your phone." }, { status: 200 });
  } catch (error) {
    console.error("send-phone-otp error:", error);
    return Response.json({ error: error.message || "Failed to send phone OTP." }, { status: 500 });
  }
}
