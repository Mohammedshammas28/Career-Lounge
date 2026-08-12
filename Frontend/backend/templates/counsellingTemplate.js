import { wrapEmailLayout } from "./layout";

/**
 * HTML Template for Career Counselling Booking confirmation to the Student.
 */
export const getCounsellingUserTemplate = ({ studentName, date, time, counsellingType }) => {
  const title = "Counselling Booking Confirmed - Career Lounge";
  const bodyContent = `
    <h1>Counselling Booking Confirmed</h1>
    <p>Dear ${studentName},</p>
    <p>Your career counselling session with our expert advisor has been successfully booked. Please find the details below:</p>
    
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background-color: #f8fafc; margin: 24px 0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 140px;">Counselling Type</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${counsellingType}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Date</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Time Slot</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${time}</td>
        </tr>
      </table>
    </div>
    
    <p>A calendar invite and consultation link (e.g. Google Meet or Zoom) will be sent to you shortly before the scheduled time slot. Please ensure you are in a quiet environment with a working webcam and microphone.</p>
    
    <p style="margin-bottom: 0;">Best Regards,<br><strong>Counselling Support Team, Career Lounge</strong></p>
  `;

  return wrapEmailLayout(title, bodyContent);
};

/**
 * HTML Template for Career Counselling notification to the Admin/Support Team.
 */
export const getCounsellingAdminTemplate = ({ studentName, email, phone, date, time, counsellingType }) => {
  const title = "🗓️ New Counselling Session Booked";
  const bodyContent = `
    <h1>New Counselling Booking</h1>
    <p>A student has booked a career counselling session through the online system.</p>
    
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background-color: #f8fafc;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9; width: 140px;">Name</td>
          <td style="padding: 8px 0; color: #0f172a; font-weight: 700; border-bottom: 1px solid #f1f5f9;">${studentName}</td>
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
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Counselling Type</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: 600;">${counsellingType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Booking Date</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${date}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Booking Time Slot</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${time}</td>
        </tr>
      </table>
    </div>
  `;

  return wrapEmailLayout(title, bodyContent);
};
