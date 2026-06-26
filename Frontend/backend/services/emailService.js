import { resend } from "../config/resendConfig";
import { getOTPTemplate } from "../templates/otpTemplate";
import { getWelcomeTemplate } from "../templates/welcomeTemplate";
import { getContactAdminTemplate, getContactUserTemplate } from "../templates/contactTemplate";
import { getApplicationUserTemplate, getApplicationAdminTemplate } from "../templates/applicationTemplate";
import { getCounsellingUserTemplate, getCounsellingAdminTemplate } from "../templates/counsellingTemplate";
import { getPasswordResetOTPTemplate, getPasswordResetConfirmationTemplate } from "../templates/passwordResetTemplate";

// Environment variables with fallback
const EMAIL_FROM = process.env.EMAIL_FROM || "Career Lounge <info@career-lounge.in>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "info@career-lounge.in";
const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || "support@career-lounge.in";
const APPLICATION_EMAIL = process.env.APPLICATION_EMAIL || "applications@career-lounge.in";
const ADMISSIONS_EMAIL = process.env.ADMISSIONS_EMAIL || "admissions@career-lounge.in";

// Helper helper function to send email with Resend
const sendEmail = async ({ to, subject, html, text }) => {
  const cleanTo = Array.isArray(to) ? to.map(e => e.trim()) : to.trim();

  if (!resend) {
    console.warn(`[MOCK EMAIL] To: ${cleanTo} | Subject: ${subject}`);
    return { id: "mock-id-" + Math.random().toString(36).substring(7), mock: true };
  }

  try {
    const response = await resend.emails.send({
      from: EMAIL_FROM,
      to: cleanTo,
      subject,
      html,
      text: text || "This email requires an HTML compatible viewer.",
    });

    if (response.error) {
      console.error("Resend API Error details:", response.error);
      throw new Error(`Resend failed: ${response.error.message}`);
    }

    console.log(`[Email Service] Email sent successfully to ${cleanTo}. ID: ${response.data?.id}`);
    return response.data;
  } catch (error) {
    console.error(`[Email Service Error] Failed to send email to ${cleanTo}:`, error);
    throw error;
  }
};

export const emailService = {
  /**
   * Sends an OTP for Email verification during registration/contact verification
   */
  sendOTPEmail: async ({ to, otp }) => {
    const subject = "Verify Your Career Lounge Account";
    const html = getOTPTemplate(otp, "verification");
    return sendEmail({
      to,
      subject,
      html,
      text: `Your Career Lounge verification code is: ${otp}. Valid for 10 minutes.`
    });
  },

  /**
   * Sends a welcome email upon registration
   */
  sendWelcomeEmail: async ({ to, name }) => {
    const subject = "Welcome to Career Lounge!";
    const html = getWelcomeTemplate(name);
    return sendEmail({
      to,
      subject,
      html,
      text: `Welcome to Career Lounge, ${name}! We are excited to support you on your career journey.`
    });
  },

  /**
   * Sends an OTP for Password Reset
   */
  sendPasswordResetOTP: async ({ to, otp }) => {
    const subject = "Reset Your Career Lounge Password";
    const html = getPasswordResetOTPTemplate(otp);
    return sendEmail({
      to,
      subject,
      html,
      text: `Your password reset code is: ${otp}. Valid for 10 minutes.`
    });
  },

  /**
   * Sends password reset confirmation
   */
  sendPasswordResetConfirmation: async ({ to, name }) => {
    const subject = "Password Reset Successful - Career Lounge";
    const html = getPasswordResetConfirmationTemplate(name);
    return sendEmail({
      to,
      subject,
      html,
      text: `Hello ${name}, your Career Lounge account password has been successfully reset.`
    });
  },

  /**
   * Sends a verification success email
   */
  sendEmailVerificationSuccess: async ({ to, name }) => {
    const subject = "Email Verified Successfully - Career Lounge";
    const html = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Email Verified Successfully</h2>
        <p>Hi ${name || "there"},</p>
        <p>Your email address has been successfully verified for your Career Lounge account.</p>
        <p>You can now access all features of our portal.</p>
        <p>Best Regards,<br><strong>Career Lounge Team</strong></p>
      </div>
    `;
    return sendEmail({
      to,
      subject,
      html,
      text: `Hi ${name || "there"}, your email address has been successfully verified.`
    });
  },

  /**
   * Sends Contact Form Submission details to Admin
   */
  sendContactFormNotification: async ({ fullName, email, phone, country, service, message, submissionTime }) => {
    const subject = "🔔 New Contact Form Submission";
    const html = getContactAdminTemplate({ fullName, email, phone, country, service, message, submissionTime });
    
    // Send to both info and support
    return sendEmail({
      to: [ADMIN_EMAIL, SUPPORT_EMAIL],
      subject,
      html,
      text: `New contact form submission from ${fullName} for service: ${service}`
    });
  },

  /**
   * Sends Auto-Reply to the user after submitting the Contact Form
   */
  sendContactAutoReply: async ({ to, fullName, service }) => {
    const subject = "Thank You For Contacting Career Lounge";
    const html = getContactUserTemplate({ fullName, service });
    return sendEmail({
      to,
      subject,
      html,
      text: `Thank you for contacting Career Lounge. We have received your query for ${service}.`
    });
  },

  /**
   * Sends university application confirmation to the student
   */
  sendApplicationConfirmation: async ({ to, studentName, university, course, intake }) => {
    const subject = "Application Confirmed: Study Abroad - Career Lounge";
    const html = getApplicationUserTemplate({ studentName, university, course, intake });
    return sendEmail({
      to,
      subject,
      html,
      text: `Hi ${studentName}, your application for ${course} at ${university} has been successfully recorded.`
    });
  },

  /**
   * Sends university application notification to the admissions team
   */
  sendAdminApplicationNotification: async ({ studentName, email, phone, country, university, course, intake, submissionTime }) => {
    const subject = "🎓 New University Application Submission";
    const html = getApplicationAdminTemplate({ studentName, email, phone, country, university, course, intake, submissionTime });
    return sendEmail({
      to: [ADMISSIONS_EMAIL, APPLICATION_EMAIL],
      subject,
      html,
      text: `New university application from student ${studentName} for university ${university}`
    });
  },

  /**
   * Sends career counselling confirmation to student
   */
  sendCounsellingConfirmation: async ({ to, studentName, date, time, counsellingType }) => {
    const subject = "Counselling Booking Confirmed - Career Lounge";
    const html = getCounsellingUserTemplate({ studentName, date, time, counsellingType });
    return sendEmail({
      to,
      subject,
      html,
      text: `Hi ${studentName}, your counselling booking on ${date} at ${time} is confirmed.`
    });
  },

  /**
   * Sends counselling session booking notification to support
   */
  sendAdminCounsellingNotification: async ({ studentName, email, phone, date, time, counsellingType }) => {
    const subject = "🗓️ New Counselling Session Booked";
    const html = getCounsellingAdminTemplate({ studentName, email, phone, date, time, counsellingType });
    return sendEmail({
      to: SUPPORT_EMAIL,
      subject,
      html,
      text: `New counselling booking by ${studentName} on ${date} at ${time}.`
    });
  },

  /**
   * Sends university inquiry notification to the admin/support team
   */
  sendAdminUniversityInquiryNotification: async ({ fullName, email, phone, city, preferredDestination, universityName, submissionTime }) => {
    const subject = `🏫 New University Inquiry: ${universityName} - ${fullName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #4f46e5; margin-bottom: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New University Inquiry</h2>
        <p style="font-size: 16px; color: #334155;">A user has submitted an inquiry form on the university details page.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b; width: 180px;">Student Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a; font-weight: bold;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">University Name</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #4f46e5; font-weight: bold; font-size: 16px;">${universityName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Email Address</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Mobile Number</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${phone}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">City</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${city}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Preferred Destination</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${preferredDestination}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #64748b;">Submitted At</td>
            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #0f172a;">${submissionTime || new Date().toLocaleString()}</td>
          </tr>
        </table>
        
        <p style="font-size: 12px; color: #94a3b8; text-align: center; margin-top: 30px; border-top: 1px solid #f1f5f9; padding-top: 15px;">
          This is an automated notification from the Career Lounge platform.
        </p>
      </div>
    `;
    return sendEmail({
      to: [ADMIN_EMAIL, SUPPORT_EMAIL],
      subject,
      html,
      text: `New university inquiry from ${fullName} for ${universityName}.`
    });
  },

  /**
   * Sends auto-reply confirmation to the student after university inquiry
   */
  sendUserUniversityInquiryConfirmation: async ({ to, fullName, universityName }) => {
    const subject = `Inquiry Received: Study at ${universityName} - Career Lounge`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
        <h2 style="color: #4f46e5; margin-bottom: 20px; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">Inquiry Confirmed</h2>
        <p style="font-size: 16px; color: #334155; line-height: 1.5;">Dear ${fullName},</p>
        <p style="font-size: 14px; color: #334155; line-height: 1.6;">
          Thank you for reaching out to Career Lounge. We have successfully received your inquiry about studying at <strong>${universityName}</strong>.
        </p>
        
        <div style="background-color: #f8fafc; border-left: 4px solid #4f46e5; border-radius: 0 8px 8px 0; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; font-size: 15px; font-weight: bold; color: #1e1b4b;">Enquiry: Study at ${universityName}</p>
        </div>
        
        <p style="font-size: 14px; color: #334155; line-height: 1.6;">
          One of our certified study abroad counselors will review your profile details and contact you within the next 24 business hours to guide you on the admission criteria, scholarships, and visa process.
        </p>
        
        <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 0;">
          Best Regards,<br>
          <strong>Admissions Advisory Team, Career Lounge</strong>
        </p>
      </div>
    `;
    return sendEmail({
      to,
      subject,
      html,
      text: `Dear ${fullName}, thank you for your inquiry about studying at ${universityName}. Our advisors will get in touch with you shortly.`
    });
  },

  /**
   * Legacy wrapper for old contact route handler compatibility.
   */
  sendContactFormEmail: async ({ firstName, lastName, email, phone, serviceType, message, contextData }) => {
    const fullName = `${firstName} ${lastName}`;
    const submissionTime = new Date().toLocaleString();
    
    const userPromise = emailService.sendContactAutoReply({
      to: email,
      fullName,
      service: serviceType || "General Inquiry"
    });

    const adminPromise = emailService.sendContactFormNotification({
      fullName,
      email,
      phone: phone || "Not provided",
      country: contextData?.country || "Not specified",
      service: serviceType || "General Inquiry",
      message,
      submissionTime
    });

    const [userResult, adminResult] = await Promise.all([userPromise, adminPromise]);
    return { userResult, adminResult };
  },

  /**
   * Legacy wrapper for old job application handler compatibility.
   */
  sendApplicationConfirmationEmail: async ({ to, name, jobTitle, company, messageSummary }) => {
    const userPromise = sendEmail({
      to,
      subject: `Application Submitted: ${jobTitle} - Career Lounge`,
      html: getApplicationUserTemplate({
        studentName: name,
        university: company,
        course: jobTitle,
        intake: "N/A"
      }),
      text: `Hi ${name}, your application for ${jobTitle} at ${company} was received successfully.`
    });

    const adminPromise = sendEmail({
      to: [APPLICATION_EMAIL, ADMISSIONS_EMAIL],
      subject: `[New Job Application] ${jobTitle} at ${company} - ${name}`,
      html: getApplicationAdminTemplate({
        studentName: name,
        email: to,
        phone: "N/A",
        country: "N/A",
        university: company,
        course: jobTitle,
        intake: "N/A",
        submissionTime: new Date().toLocaleString()
      }),
      text: `New job application received for ${jobTitle} at ${company} from ${name}. Message: ${messageSummary}`
    });

    const [candidateResult, adminResult] = await Promise.all([userPromise, adminPromise]);
    return { candidateResult, adminResult };
  }
};
