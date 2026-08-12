import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("⚠️ RESEND_API_KEY environment variable is not configured. Resend email service will run in mock mode.");
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;
