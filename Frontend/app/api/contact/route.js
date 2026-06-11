import nodemailer from "nodemailer";
import { connectToDatabase } from "@/lib/db/connect";
import Lead from "@/models/Lead";

const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = process.env.SMTP_PORT || 465;

  if (!emailUser || !emailPassword) {
    console.error("Email environment variables not configured");
    return null;
  }

  // Use the exact provided SMTP config if available, otherwise fallback to standard gmail
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort == 465, // true for 465, false for other ports
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
};

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { 
      firstName, 
      lastName, 
      email, 
      phone,
      serviceType, 
      message, 
      sourcePage, 
      sourceUrl, 
      referrer,
      contextData 
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 1. Save to Lead Database (CRM)
    const newLead = new Lead({
      firstName,
      lastName,
      email,
      phone,
      message,
      serviceType: serviceType || "General Inquiry",
      sourcePage,
      sourceUrl,
      referrer,
      contextData: contextData || {}
    });

    await newLead.save();

    // 2. Email Delivery System
    const transporter = createTransporter();
    if (!transporter) {
      console.warn("Email service not configured. Lead was saved to DB, but emails were not sent.");
      return Response.json(
        { success: true, message: "Lead saved successfully, but email system is offline." },
        { status: 200 }
      );
    }

    // Format context data nicely for admin email
    let contextHTML = "";
    if (contextData && Object.keys(contextData).length > 0) {
      contextHTML = "<h3>Additional Context:</h3><ul>";
      for (const [key, value] of Object.entries(contextData)) {
        contextHTML += `<li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>`;
      }
      contextHTML += "</ul>";
    }

    // Email content for Admin/Owner
    const ownerEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #4f46e5;">New Career Lounge Lead</h2>
        <p>A new lead has been submitted via the website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb; width: 120px;"><strong>Name</strong></td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${firstName} ${lastName}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Email</strong></td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Phone</strong></td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Service</strong></td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${serviceType || "General Inquiry"}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #e5e7eb; background-color: #f9fafb;"><strong>Source Page</strong></td>
            <td style="padding: 10px; border: 1px solid #e5e7eb;">${sourcePage || "Direct"} (${sourceUrl || ""})</td>
          </tr>
        </table>

        ${contextHTML}

        <h3>Message:</h3>
        <div style="padding: 15px; background-color: #f3f4f6; border-radius: 5px;">
          <p style="white-space: pre-wrap; margin: 0;">${message}</p>
        </div>
        
        <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
          Lead ID: ${newLead._id}<br/>
          Submitted on: ${new Date().toLocaleString()}
        </p>
      </div>
    `;

    // Email content for User (Confirmation)
    const userEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">Career Lounge</h1>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1f2937; margin-top: 0;">Thank you for getting in touch!</h2>
          <p style="color: #4b5563; line-height: 1.6;">Hi ${firstName},</p>
          <p style="color: #4b5563; line-height: 1.6;">We have successfully received your inquiry regarding <strong>${serviceType || "our services"}</strong>. One of our dedicated consultants will review your information and contact you shortly.</p>
          
          <div style="background-color: #f9fafb; border-left: 4px solid #4f46e5; padding: 15px; margin: 25px 0;">
            <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">Your Message Summary:</p>
            <p style="margin: 0; color: #1f2937; font-style: italic;">"${message.length > 100 ? message.substring(0, 100) + '...' : message}"</p>
          </div>
          
          <p style="color: #4b5563; line-height: 1.6;">If you need immediate assistance, please feel free to reply directly to this email.</p>
          
          <p style="color: #4b5563; line-height: 1.6; margin-bottom: 0;">Best regards,<br/><strong>The Career Lounge Team</strong></p>
        </div>
        <div style="background-color: #f9fafb; padding: 15px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">© ${new Date().getFullYear()} Career Lounge. All rights reserved.</p>
        </div>
      </div>
    `;

    const adminEmail = process.env.ADMIN_EMAIL || process.env.OWNER_EMAIL || "m.shammas2k6@gmail.com";
    const fromEmail = process.env.FROM_EMAIL || process.env.EMAIL_USER;

    // Send email to admin
    await transporter.sendMail({
      from: `"Career Lounge System" <${fromEmail}>`,
      to: adminEmail,
      subject: `[New Lead] ${serviceType || "Inquiry"} - ${firstName} ${lastName}`,
      html: ownerEmailContent,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"Career Lounge" <${fromEmail}>`,
      to: email,
      subject: "We've received your message - Career Lounge",
      html: userEmailContent,
    });

    return Response.json(
      { success: true, message: "Message sent and Lead recorded successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Failed to process request: " + error.message },
      { status: 500 }
    );
  }
}

