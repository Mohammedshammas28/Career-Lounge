import { connectToDatabase } from "@/lib/db/connect";
import ContactSubmission from "@/models/ContactSubmission";
import Lead from "@/models/Lead";
import { otpService } from "@/backend/services/otpService";
import { emailService } from "@/backend/services/emailService";
import { emailValidator } from "@/backend/utils/emailValidator";

import { memoryCheckVerification, memoryConsumeVerification } from "@/app/api/contact/send-email-otp/route";

export async function POST(request) {
  try {
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.warn("[Uni Inquiry] DB unavailable, continuing with in-memory fallbacks:", dbError.message);
    }

    const body = await request.json();
    const { name, email, mobile, city, preferredDestination, universityName } = body;

    // 1. Validate required fields
    if (!name || !email || !mobile || !city || !preferredDestination || !universityName) {
      return Response.json({ error: "All fields are required." }, { status: 400 });
    }

    // 2. Validate email and mobile formats
    if (!emailValidator.isValidEmail(email)) {
      return Response.json({ error: "Invalid email format." }, { status: 400 });
    }

    // 3. Duplicate submission check (last 5 minutes)
    const isDuplicate = await emailValidator.isDuplicateSubmission({ 
      email, 
      service: `University Inquiry: ${universityName}` 
    });
    if (isDuplicate) {
      return Response.json({ error: "A duplicate inquiry was detected in the last 5 minutes." }, { status: 400 });
    }

    // 4. Verify OTP Status
    let isEmailVerified = false;
    try {
      isEmailVerified = await otpService.checkVerificationStatus(email);
    } catch (dbError) {
      console.warn("[Uni Inquiry] DB unavailable, checking in-memory status:", dbError.message);
    }

    if (!isEmailVerified) {
      isEmailVerified = memoryCheckVerification(email);
    }

    if (!isEmailVerified) {
      return Response.json({
        error: "Verification failed. Email OTP must be verified before submitting."
      }, { status: 400 });
    }

    // 5. Save to ContactSubmission database
    const mappedPhone = mobile.startsWith("+") ? mobile : `+91${mobile}`;
    const submissionMessage = `Inquiry for ${universityName} from student in ${city}. Preferred destination: ${preferredDestination}.`;

    try {
      const submission = new ContactSubmission({
        fullName: name,
        email,
        phone: mappedPhone,
        country: preferredDestination,
        service: `University Inquiry: ${universityName}`,
        message: submissionMessage,
        emailVerified: true,
        phoneVerified: false,
        status: "New"
      });
      await submission.save();
    } catch (dbError) {
      console.warn("[Uni Inquiry] DB unavailable, saving to memory fallback:", dbError.message);
      if (!global.__clMemorySubmissions) global.__clMemorySubmissions = [];
      global.__clMemorySubmissions.push({
        fullName: name,
        email,
        phone: mappedPhone,
        country: preferredDestination,
        service: `University Inquiry: ${universityName}`,
        message: submissionMessage,
        createdAt: new Date(),
        status: "New (Memory Fallback)"
      });
    }

    // 6. Save to Lead database
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts[0] || "User";
    const lastName = nameParts.slice(1).join(" ") || "Lounge";

    try {
      const newLead = new Lead({
        firstName,
        lastName,
        email,
        phone: mappedPhone,
        message: submissionMessage,
        serviceType: "Educational Consultancy",
        status: "New",
        sourcePage: `University Detail: ${universityName}`,
        contextData: { 
          source: "University Sidebar Form",
          universityName,
          city,
          preferredDestination
        }
      });
      await newLead.save();
    } catch (dbError) {
      console.warn("[Uni Inquiry] DB unavailable, saving Lead to memory fallback:", dbError.message);
      if (!global.__clMemoryLeads) global.__clMemoryLeads = [];
      global.__clMemoryLeads.push({
        firstName,
        lastName,
        email,
        phone: mappedPhone,
        message: submissionMessage,
        serviceType: "Educational Consultancy",
        status: "New (Memory Fallback)",
        sourcePage: `University Detail: ${universityName}`,
        contextData: { 
          source: "University Sidebar Form",
          universityName,
          city,
          preferredDestination
        },
        createdAt: new Date()
      });
    }

    // 7. Send notification emails
    const submissionTime = new Date().toLocaleString();
    
    // Admin notification
    await emailService.sendAdminUniversityInquiryNotification({
      fullName: name,
      email,
      phone: mappedPhone,
      city,
      preferredDestination,
      universityName,
      submissionTime
    });

    // User auto-reply
    await emailService.sendUserUniversityInquiryConfirmation({
      to: email,
      fullName: name,
      universityName
    });

    // 8. Consume verification tokens
    try {
      await otpService.consumeVerification(email);
    } catch (dbError) {
      console.warn("[Uni Inquiry] DB error during consume:", dbError.message);
    }
    memoryConsumeVerification(email);

    return Response.json({
      success: true,
      message: "University inquiry submitted successfully."
    });
  } catch (error) {
    console.error("Error submitting university inquiry:", error);
    return Response.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}
