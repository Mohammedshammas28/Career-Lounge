import { connectToDatabase } from "@/lib/db/connect";
import ContactSubmission from "@/models/ContactSubmission";
import Lead from "@/models/Lead";
import { otpService } from "@/backend/services/otpService";
import { emailService } from "@/backend/services/emailService";
import { emailValidator } from "@/backend/utils/emailValidator";

import { memoryCheckVerification, memoryConsumeVerification } from "@/app/api/contact/send-email-otp/route";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { fullName, email, phone, country, service, message } = body;

    // 1. Validate all fields are required
    if (!fullName || !email || !phone || !country || !service || !message) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    // 2. Validate email and phone formats
    if (!emailValidator.isValidEmail(email)) {
      return Response.json({ error: "Invalid email format." }, { status: 400 });
    }
    if (!emailValidator.isValidPhone(phone)) {
      return Response.json({ error: "Invalid phone number format." }, { status: 400 });
    }

    // 3. Duplicate submission prevention (last 5 minutes)
    const isDuplicate = await emailValidator.isDuplicateSubmission({ email, service });
    if (isDuplicate) {
      return Response.json({ error: "A duplicate submission for this service was detected in the last 5 minutes." }, { status: 400 });
    }

    // 4. Verify OTP Statuses
    let isEmailVerified = false;
    try {
      isEmailVerified = await otpService.checkVerificationStatus(email);
    } catch (dbError) {
      console.warn("[Submit Form] DB unavailable, trying in-memory status:", dbError.message);
    }

    if (!isEmailVerified) {
      isEmailVerified = memoryCheckVerification(email);
    }

    if (!isEmailVerified) {
      return Response.json({
        error: "Verification failed. Email OTP must be successfully verified before submitting."
      }, { status: 400 });
    }

    // 5. Save to ContactSubmission database
    const submission = new ContactSubmission({
      fullName,
      email,
      phone,
      country,
      service,
      message,
      emailVerified: true,
      phoneVerified: false,
      status: "New"
    });
    await submission.save();

    // 6. Save to Lead (CRM) database for admin dashboard integration
    // Split fullName into firstName and lastName
    const nameParts = fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "User";
    const lastName = nameParts.slice(1).join(" ") || "Lounge";

    const newLead = new Lead({
      firstName,
      lastName,
      email,
      phone,
      message,
      serviceType: service,
      status: "New",
      contextData: { source: "Premium Contact Form" }
    });
    await newLead.save();

    // 7. Send notification emails
    const submissionTime = new Date().toLocaleString();
    
    // Admin notification
    await emailService.sendContactFormNotification({
      fullName,
      email,
      phone,
      country,
      service,
      message,
      submissionTime
    });

    // User auto-reply
    await emailService.sendContactAutoReply({
      to: email,
      fullName,
      service
    });

    // 8. Consume verification tokens so they can't be reused
    try {
      await otpService.consumeVerification(email);
    } catch (dbError) {
      console.warn("[Submit Form] DB error during consume:", dbError.message);
    }
    memoryConsumeVerification(email);

    return Response.json({
      success: true,
      message: "Contact form submitted successfully and notifications sent."
    }, { status: 200 });

  } catch (error) {
    console.error("contact submit error:", error);
    return Response.json({ error: error.message || "Failed to process contact submission." }, { status: 500 });
  }
}
