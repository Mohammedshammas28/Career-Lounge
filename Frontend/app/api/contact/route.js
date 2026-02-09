import nodemailer from "nodemailer";

const createTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPassword = process.env.EMAIL_PASSWORD;

  if (!emailUser || !emailPassword) {
    console.error("Email environment variables not configured");
    return null;
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });
};

export async function POST(request) {
  try {
    const { firstName, lastName, email, serviceType, message } = await request.json();

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    if (!transporter) {
      return Response.json(
        { error: "Email service not configured. Please contact the administrator." },
        { status: 503 }
      );
    }

    // Email content for owner
    const ownerEmailContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service Type:</strong> ${serviceType || "Not provided"}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `;

    // Email content for user (confirmation)
    const userEmailContent = `
      <h2>Thank you for contacting us!</h2>
      <p>Hi ${firstName},</p>
      <p>We've received your message and will get back to you as soon as possible.</p>
      <h3>Your submitted information:</h3>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Service Type:</strong> ${serviceType || "Not provided"}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p>Best regards,<br/>The Team</p>
    `;

    // Send email to owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL || "m.shammas2k6@gmail.com",
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: ownerEmailContent,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "We received your message",
      html: userEmailContent,
    });

    return Response.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    return Response.json(
      { error: "Failed to send email: " + error.message },
      { status: 500 }
    );
  }
}
