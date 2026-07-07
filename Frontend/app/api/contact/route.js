import { connectToDatabase } from "@/lib/db/connect";
import Lead from "@/models/Lead";
import { emailService } from "@/backend/services/emailService";

export async function POST(request) {
  try {
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.warn("[Contact Message] DB unavailable during connection, continuing with in-memory fallbacks:", dbError.message);
    }

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
    try {
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
    } catch (dbError) {
      console.warn("[Contact Message] DB unavailable, saving Lead to memory fallback:", dbError.message);
      if (!global.__clMemoryLeads) global.__clMemoryLeads = [];
      global.__clMemoryLeads.push({
        firstName,
        lastName,
        email,
        phone,
        message,
        serviceType: serviceType || "General Inquiry",
        sourcePage,
        sourceUrl,
        referrer,
        contextData: contextData || {},
        createdAt: new Date(),
        status: "New (Memory Fallback)"
      });
    }

    // 2. Email Delivery System
    try {
      const isJobApplication = serviceType && serviceType.startsWith("Job Application:");
      
      if (isJobApplication) {
        // Parse Job Title and Company
        const jobPrefix = "Job Application: ";
        const jobDetails = serviceType.substring(jobPrefix.length);
        const parts = jobDetails.split(" at ");
        const jobTitle = parts[0] || "Job Opening";
        const company = parts.slice(1).join(" at ") || "Partner Company";
        
        await emailService.sendApplicationConfirmationEmail({
          to: email,
          name: `${firstName} ${lastName}`,
          jobTitle,
          company,
          phone: phone || "Not provided",
          messageSummary: message
        });
      } else {
        // Normal contact form or course inquiry
        await emailService.sendContactFormEmail({
          firstName,
          lastName,
          email,
          phone,
          serviceType,
          message,
          contextData
        });
      }
    } catch (emailError) {
      // Log error but do not crash the request or return 500 since lead was already saved in DB
      console.error("Email service error:", emailError);
      return Response.json(
        { 
          success: true, 
          message: "Lead recorded in CRM, but email notifications failed to send.",
          warning: emailError.message 
        },
        { status: 200 }
      );
    }

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
