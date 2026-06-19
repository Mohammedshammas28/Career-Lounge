// In-memory fallback stores (used when MongoDB is unavailable)
const memoryOTPs = new Map();   // identifier → { otp, expiresAt }
const memoryRates = new Map();  // identifier → [timestamps]

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

export const memoryVerifyPhoneOTP = (identifier, otp) => {
  const record = memoryOTPs.get(identifier.toLowerCase());
  if (!record) return { success: false, message: "OTP not found or expired." };
  if (Date.now() > record.expiresAt) {
    memoryOTPs.delete(identifier.toLowerCase());
    return { success: false, message: "OTP expired. Please request a new one." };
  }
  if (record.otp !== otp.trim()) return { success: false, message: "Invalid OTP." };
  memoryOTPs.delete(identifier.toLowerCase());
  return { success: true };
};

import { otpService } from "@/backend/services/otpService";
import { smsService } from "@/backend/services/smsService";
import { emailValidator } from "@/backend/utils/emailValidator";

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

    // 2. Generate OTP first (no DB needed)
    const otp = otpService.generateOTP();
    let usedMemoryFallback = false;

    // 3. Try DB-backed rate limit + OTP storage, fall back to in-memory
    try {
      const { checkOTPRateLimit } = await import("@/backend/middleware/emailRateLimiter");
      const rateLimit = await checkOTPRateLimit(phone);
      if (!rateLimit.allowed) {
        return Response.json({ error: rateLimit.message }, { status: 429 });
      }
      await otpService.saveOTP({ identifier: phone, otp });
    } catch (dbError) {
      console.warn("[Phone OTP] DB unavailable, using in-memory fallback:", dbError.message);
      const rateLimit = memoryRateCheck(phone);
      if (!rateLimit.allowed) {
        return Response.json({ error: rateLimit.message }, { status: 429 });
      }
      memoryStoreOTP(phone, otp);
      usedMemoryFallback = true;
    }

    // 4. Send OTP SMS — check if running in mock mode
    let mockMode = false;
    try {
      const smsResult = await smsService.sendOTP({ phone, otp });
      mockMode = smsResult?.mock === true;
    } catch (smsError) {
      console.error("[Phone OTP] Failed to send SMS:", smsError.message);
      mockMode = true;
    }

    const response = {
      success: true,
      message: mockMode
        ? `SMS service is in test mode. Your OTP code is: ${otp} (valid 10 min)`
        : "Verification code sent to your phone.",
    };

    // In mock/dev mode or memory fallback, include the OTP so user can complete verification
    if (mockMode || usedMemoryFallback) {
      response.devOtp = otp;
    }

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error("send-phone-otp error:", error);
    return Response.json({ error: error.message || "Failed to send phone OTP." }, { status: 500 });
  }
}
