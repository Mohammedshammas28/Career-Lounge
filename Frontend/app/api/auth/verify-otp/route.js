import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/db/connect";
import User from "@/models/User";
import { otpService } from "@/backend/services/otpService";
import { emailService } from "@/backend/services/emailService";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, name, password, phone, otp } = await request.json();

    if (!email || !name || !password || !otp) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. User existence double check
    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return Response.json({ error: "An account with this email already exists." }, { status: 400 });
    }

    // 2. Verify OTP
    const verification = await otpService.verifyOTP({ identifier: email, otp });
    if (!verification.success) {
      return Response.json({ error: verification.message }, { status: 400 });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create User
    const newUser = new User({
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : "",
      password: hashedPassword,
      isVerified: true
    });
    await newUser.save();

    // 5. Generate JWT Token
    const jwtSecret = process.env.JWT_SECRET || "fallback-secret-for-development-only";
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // 6. Send welcome email and verification success email asynchronously
    try {
      await emailService.sendWelcomeEmail({ to: cleanEmail, name: newUser.name });
      await emailService.sendEmailVerificationSuccess({ to: cleanEmail, name: newUser.name });
    } catch (emailError) {
      console.error("Non-blocking registration emails failed:", emailError);
    }

    // 7. Consume OTP token
    await otpService.consumeVerification(email);

    return Response.json({
      success: true,
      message: "User registered successfully.",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    }, { status: 200 });

  } catch (error) {
    console.error("auth verify-otp error:", error);
    return Response.json({ error: error.message || "Failed to verify registration code." }, { status: 500 });
  }
}
