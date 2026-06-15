import { otpService } from "@/backend/services/otpService";
import { emailService } from "@/backend/services/emailService";
import { emailValidator } from "@/backend/utils/emailValidator";
import { checkOTPRateLimit } from "@/backend/middleware/emailRateLimiter";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: "Email address is required." }, { status: 400 });
    }

    // 1. Email format check
    if (!emailValidator.isValidEmail(email)) {
      return Response.json({ error: "Invalid email format." }, { status: 400 });
    }

    // 2. Disposable check
    if (emailValidator.isDisposableEmail(email)) {
      return Response.json({ error: "Disposable email addresses are not permitted." }, { status: 400 });
    }

    // 3. Rate limiting check
    const rateLimit = await checkOTPRateLimit(email);
    if (!rateLimit.allowed) {
      return Response.json({ error: rateLimit.message }, { status: 429 });
    }

    // 4. Generate OTP
    const otp = otpService.generateOTP();

    // 5. Save OTP in DB
    await otpService.saveOTP({ identifier: email, otp });

    // 6. Send OTP Email
    await emailService.sendOTPEmail({ to: email, otp });

    return Response.json({ success: true, message: "Verification code sent to your email." }, { status: 200 });
  } catch (error) {
    console.error("send-email-otp error:", error);
    return Response.json({ error: error.message || "Failed to send email OTP." }, { status: 500 });
  }
}
