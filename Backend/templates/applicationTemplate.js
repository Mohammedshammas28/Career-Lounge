import { wrapEmailLayout } from "./layout";

/**
 * HTML Template for University Application confirmation to the Candidate.
 */
export const getApplicationUserTemplate = ({ studentName, university, course, intake }) => {
  const title = "Application Submitted Successfully - Career Lounge";
  const bodyContent = `
    <h1>Application Submitted Successfully</h1>
    <p>Dear ${studentName},</p>
    <p>Thank you for submitting your university application through Career Lounge. We are pleased to confirm that we have successfully received your details for:</p>
    
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background-color: #f8fafc; margin: 24px 0;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600; width: 120px;">University</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${university}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Course</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${course}</td>
        </tr>
        <tr>
          <td style="padding: 6px 0; color: #64748b; font-weight: 600;">Intake</td>
          <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${intake}</td>
        </tr>
      </table>
    </div>
    
    <p>Our dedicated admissions advisory team will check your documents and submission details to ensure compliance with the university requirements and follow up with you within 24-48 business hours.</p>
    
    <p style="margin-bottom: 0;">Best Regards,<br><strong>Admissions Team, Career Lounge</strong></p>
  `;

  return wrapEmailLayout(title, bodyContent);
};

/**
 * HTML Template for University Application notification to the Admin/Admissions Team.
 */
export const getApplicationAdminTemplate = ({ studentName, email, phone, country, university, course, intake, submissionTime }) => {
  const title = "🎓 New University Application Submission";
  const bodyContent = `
    <h1>New University Application</h1>
    <p>A student has submitted an application for admission through Career Lounge.</p>
    
    <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; background-color: #f8fafc;">
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9; width: 140px;">Student Name</td>
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
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Country</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${country}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">University</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9; font-weight: 700;">${university}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Course</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${course}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Intake</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${intake}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9;">Submitted At</td>
          <td style="padding: 8px 0; color: #0f172a; border-bottom: 1px solid #f1f5f9;">${submissionTime || new Date().toLocaleString()}</td>
        </tr>
      </table>
    </div>
  `;

  return wrapEmailLayout(title, bodyContent);
};
