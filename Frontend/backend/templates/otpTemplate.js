import { wrapEmailLayout } from "./layout";

export const getOTPTemplate = (otp, type = "verification") => {
  const isVerification = type === "verification";
  const title = isVerification ? "Verify Your Email - Career Lounge" : "Reset Password OTP - Career Lounge";
  const heading = isVerification ? "Verify Your Account" : "Reset Your Password";
  
  const bodyContent = `
    <h1>${heading}</h1>
    <p>Hi there,</p>
    <p>${
      isVerification
        ? "Thank you for choosing Career Lounge. Use the 6-digit verification code below to complete your email verification. This code is valid for 10 minutes."
        : "We received a request to reset your password. Use the 6-digit security code below to authorize this reset. This code is valid for 10 minutes."
    }</p>
    
    <div style="background-color: #f1f5f9; border-radius: 16px; padding: 24px; text-align: center; margin: 30px 0; border: 1px dashed #cbd5e1;">
      <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 6px; color: #1e1b4b; display: block;">${otp}</span>
    </div>
    
    <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 0;">
      If you did not request this OTP, you can safely ignore this email. Your account security remains intact.
    </p>
  `;

  return wrapEmailLayout(title, bodyContent);
};
