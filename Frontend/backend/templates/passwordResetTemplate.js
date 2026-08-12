import { wrapEmailLayout } from "./layout";

/**
 * HTML Template for Password Reset OTP / Code verification.
 */
export const getPasswordResetOTPTemplate = (otp) => {
  const title = "Reset Your Career Lounge Password";
  const bodyContent = `
    <h1>Password Reset Request</h1>
    <p>Hi there,</p>
    <p>We received a request to reset the password for your Career Lounge account. Please use the 6-digit security code below to authorize this request. This code is valid for 10 minutes.</p>
    
    <div style="background-color: #f1f5f9; border-radius: 16px; padding: 24px; text-align: center; margin: 30px 0; border: 1px dashed #cbd5e1;">
      <span style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 6px; color: #1e1b4b; display: block;">${otp}</span>
    </div>
    
    <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 0;">
      If you did not make this request, you can safely ignore this email. Your password will remain unchanged and your account secure.
    </p>
  `;

  return wrapEmailLayout(title, bodyContent);
};

/**
 * HTML Template for confirming password has been reset successfully.
 */
export const getPasswordResetConfirmationTemplate = (name) => {
  const title = "Password Reset Successful - Career Lounge";
  const bodyContent = `
    <h1>Password Reset Successful</h1>
    <p>Hi ${name || "there"},</p>
    <p>This is a security notification to confirm that the password for your Career Lounge account has been successfully updated.</p>
    
    <div style="background-color: rgba(34, 197, 94, 0.05); border-left: 4px solid #22c55e; border-radius: 0 12px 12px 0; padding: 16px 20px; margin: 24px 0;">
      <p style="margin: 0; font-size: 14px; font-weight: 600; color: #15803d;">Your password was changed successfully.</p>
    </div>
    
    <p>If you authorized this change, you do not need to take any action. You can now log in using your new credentials.</p>
    
    <p style="font-weight: 600; color: #dc2626;">If you did NOT request this change, please contact our support team immediately at <a href="mailto:support@career-lounge.in" style="color: #dc2626; text-decoration: underline;">support@career-lounge.in</a> to secure your account.</p>
  `;

  return wrapEmailLayout(title, bodyContent);
};
