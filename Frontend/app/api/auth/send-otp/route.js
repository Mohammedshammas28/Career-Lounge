import { otpService } from "@/backend/services/otpService";
import { emailService } from "@/backend/services/emailService";
import { emailValidator } from "@/backend/utils/emailValidator";
import { checkOTPRateLimit } from "@/backend/middleware/emailRateLimiter";
import User from "@/models/User";
import { connectToDatabase } from "@/lib/db/connect";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, name } = await request.json();

    if (!email || !name) {
      return Response.json({ error: "Name and email address are required." }, { status: 400 });
    }

    // 1. Email format check
    if (!emailValidator.isValidEmail(email)) {
      return Response.json({ error: "Invalid email format." }, { status: 400 });
    }

    // 2. Disposable check
    if (emailValidator.isDisposableEmail(email)) {
      return Response.json({ error: "Disposable email addresses are not permitted." }, { status: 400 });
    }

    // 3. User existence check
    const userExists = await User.findOne({ email: email.trim().toLowerCase() });
    if (userExists) {
      return Response.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    // 4. Rate limiting check
    const rateLimit = await checkOTPRateLimit(email);
    if (!rateLimit.allowed) {
      return Response.json({ error: rateLimit.message }, { status: 429 });
    }

    // 5. Generate OTP
    const otp = otpService.generateOTP();

    // 6. Save OTP in DB
    await otpService.saveOTP({ identifier: email, otp });

    // 7. Send OTP Email
    await emailService.sendOTPEmail({ to: email, otp });

    return Response.json({ success: true, message: "Verification code sent to your email." }, { status: 200 });
  } catch (error) {
    console.error("auth send-otp error:", error);
    return Response.json({ error: error.message || "Failed to send verification code." }, { status: 500 });
  }
}
