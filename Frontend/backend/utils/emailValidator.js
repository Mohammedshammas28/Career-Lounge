import validator from "validator";
import ContactSubmission from "@/models/ContactSubmission";
import { connectToDatabase } from "@/lib/db/connect";

// List of common disposable email domains
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "yopmail.com",
  "tempmail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "dispostable.com",
  "getairmail.com",
  "10minutemail.com",
  "trashmail.com",
  "maildrop.cc",
  "temp-mail.org",
  "fakeinbox.com",
  "generator.email"
]);

export const emailValidator = {
  /**
   * Checks if an email is valid
   */
  isValidEmail: (email) => {
    if (!email || typeof email !== "string") return false;
    return validator.isEmail(email.trim());
  },

  /**
   * Checks if the email is from a disposable domain
   */
  isDisposableEmail: (email) => {
    if (!email || typeof email !== "string") return false;
    const domain = email.trim().toLowerCase().split("@")[1];
    return DISPOSABLE_DOMAINS.has(domain);
  },

  /**
   * Validates phone number format
   */
  isValidPhone: (phone) => {
    if (!phone || typeof phone !== "string") return false;
    // Strip spaces and dashes
    const cleanPhone = phone.replace(/[\s\-()]/g, "");
    // Check if it's a valid mobile phone number format
    return validator.isMobilePhone(cleanPhone, "any");
  },

  /**
   * Validates country input
   */
  isValidCountry: (country) => {
    if (!country || typeof country !== "string") return false;
    return country.trim().length >= 2;
  },

  /**
   * Prevents duplicate form submissions within a short window (e.g. 5 minutes)
   */
  isDuplicateSubmission: async ({ email, service }) => {
    await connectToDatabase();
    const cleanEmail = email.trim().toLowerCase();
    const cleanService = service.trim();

    // Check if a submission exists from the same email for the same service in the last 5 minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    const existingSubmission = await ContactSubmission.findOne({
      email: cleanEmail,
      service: cleanService,
      createdAt: { $gte: fiveMinutesAgo }
    });

    return !!existingSubmission;
  }
};
