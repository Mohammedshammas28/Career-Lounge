import { wrapEmailLayout } from "./layout";

/**
 * HTML Template for Admin Notifications when a contact form is submitted.
 */
export const getContactAdminTemplate = ({ fullName, email, phone, country, service, message, submissionTime }) => {
  const title = "🔔 New Contact Form Submission";
  const bodyContent = `
    <h1>New Contact Form Submission</h1>
    <p>A user has successfully submitted the premium contact form after verifying both email and phone number.</p>
    
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background-color: #f8fafc; margin-bottom: 24px;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9; width: 140px;">Name</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 700; border-bottom: 1px solid #f1f5f9;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Email</td>
          <td style="padding: 8px 0; color: #4f46e5; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Phone</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Country</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${country}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Service</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${service}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Submitted At</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${submissionTime || new Date().toLocaleString()}</td>
        </tr>
      </table>
    </div>
    
    <div>
      <h3 style="font-size: 15px; color: #0f172a; margin-bottom: 10px;">User Message:</h3>
      <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; font-size: 14px; color: #334155; white-space: pre-wrap; line-height: 1.6;">${message}</div>
    </div>
  `;

  return wrapEmailLayout(title, bodyContent);
};

/**
 * HTML Template for User Auto Reply confirmation.
 */
export const getContactUserTemplate = ({ fullName, service }) => {
  const title = "Thank You For Contacting Career Lounge";
  const bodyContent = `
    <h1>Thank You for Contacting Us</h1>
    <p>Dear ${fullName},</p>
    <p>Thank you for contacting Career Lounge. We have received your enquiry regarding:</p>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; border-radius: 0 12px 12px 0; padding: 16px 20px; margin: 24px 0;">
      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1e1b4b;">${service}</p>
    </div>
    
    <p>Our expert team is reviewing your request and will contact you shortly to guide you on the next steps.</p>
    
    <p>In the meantime, feel free to explore our website and learn more about our courses and admission advisory systems.</p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://career-lounge.in" class="btn">Explore Career Lounge</a>
    </div>
    
    <p style="margin-bottom: 0;">Best Regards,<br><strong>The Career Lounge Team</strong></p>
  `;

  return wrapEmailLayout(title, bodyContent);
};
