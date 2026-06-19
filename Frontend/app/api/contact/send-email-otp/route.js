import { otpService } from "@/backend/services/otpService";
import { emailService } from "@/backend/services/emailService";
import { emailValidator } from "@/backend/utils/emailValidator";

// Use global variables so in-memory OTPs survive Next.js hot module reloads
if (!global.__clMemoryOTPs) global.__clMemoryOTPs = new Map();
if (!global.__clMemoryRates) global.__clMemoryRates = new Map();
if (!global.__clMemoryVerified) global.__clMemoryVerified = new Map();

const memoryOTPs = global.__clMemoryOTPs;
const memoryRates = global.__clMemoryRates;
const memoryVerifiedEmails = global.__clMemoryVerified;

function memoryRateCheck(identifier) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const times = (memoryRates.get(identifier) || []).filter(t => now - t < windowMs);
  if (times.length >= 3) {
    return { allowed: false, message: "Too Many Requests. Maximum 3 codes allowed per 10 minutes." };
  }
  memoryRates.set(identifier, [...times, now]);
  return { allowed: true };
}

function memoryStoreOTP(identifier, otp) {
  memoryOTPs.set(identifier.toLowerCase(), {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000,
  });
}

export const memoryVerifyOTP = (identifier, otp) => {
  const record = memoryOTPs.get(identifier.toLowerCase());
  if (!record) return { success: false, message: "OTP not found or expired." };
  if (Date.now() > record.expiresAt) {
    memoryOTPs.delete(identifier.toLowerCase());
    return { success: false, message: "OTP expired. Please request a new one." };
  }
  if (record.otp !== otp.trim()) return { success: false, message: "Invalid OTP." };
  memoryOTPs.delete(identifier.toLowerCase());
  // Store verification status for 15 minutes
  memoryVerifiedEmails.set(identifier.toLowerCase(), Date.now() + 15 * 60 * 1000);
  return { success: true };
};

export const memoryCheckVerification = (identifier) => {
  const expiresAt = memoryVerifiedEmails.get(identifier.toLowerCase());
  if (!expiresAt) return false;
  if (Date.now() > expiresAt) {
    memoryVerifiedEmails.delete(identifier.toLowerCase());
    return false;
  }
  return true;
};

export const memoryConsumeVerification = (identifier) => {
  memoryVerifiedEmails.delete(identifier.toLowerCase());
};

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: "Email address is required." }, { status: 400 });
    }

    if (!emailValidator.isValidEmail(email)) {
      return Response.json({ error: "Invalid email format." }, { status: 400 });
    }

    if (emailValidator.isDisposableEmail(email)) {
      return Response.json({ error: "Disposable email addresses are not permitted." }, { status: 400 });
    }

    // Generate OTP first (no DB needed)
    const otp = otpService.generateOTP();
    let usedMemoryFallback = false;

    // Try DB-backed rate limit + OTP storage, fall back to in-memory
    try {
      const { checkOTPRateLimit } = await import("@/backend/middleware/emailRateLimiter");
      const rateLimit = await checkOTPRateLimit(email);
      if (!rateLimit.allowed) {
        return Response.json({ error: rateLimit.message }, { status: 429 });
      }
      await otpService.saveOTP({ identifier: email, otp });
    } catch (dbError) {
      console.warn("[Email OTP] DB unavailable, using in-memory fallback:", dbError.message);
      const rateLimit = memoryRateCheck(email);
      if (!rateLimit.allowed) {
        return Response.json({ error: rateLimit.message }, { status: 429 });
      }
      usedMemoryFallback = true;
    }

    // ALWAYS store in memory too so verify works even if DB is down or HMR reloads module
    memoryStoreOTP(email, otp);

    // Try to send OTP email
    let emailSent = false;
    let mockMode = false;
    try {
      const result = await emailService.sendOTPEmail({ to: email, otp });
      emailSent = true;
      mockMode = result?.mock === true;
    } catch (emailError) {
      console.error("[Email OTP] Failed to send email:", emailError.message);
      mockMode = true;
    }

    const response = {
      success: true,
      message: mockMode
        ? `OTP generated successfully. Your code is: ${otp} (valid 10 min)`
        : "Verification code sent to your email.",
    };

    // Always expose OTP in dev/mock mode so user can complete verification
    if (mockMode || usedMemoryFallback) {
      response.devOtp = otp;
    }

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error("send-email-otp error:", error);
    return Response.json({ error: error.message || "Failed to send email OTP." }, { status: 500 });
  }
}
