/**
 * SMS Service for mobile OTP delivery.
 * Supports MSG91 (preferred) and Twilio (fallback/alternative).
 * Automatically handles mock mode if credentials are missing.
 */

export const smsService = {
  sendOTP: async ({ phone, otp }) => {
    const cleanPhone = phone.trim();
    
    // Choose provider based on config
    const provider = process.env.SMS_PROVIDER || "msg91";

    console.log(`[SMS Service] Sending OTP to ${cleanPhone} using ${provider}...`);

    if (provider === "msg91") {
      const authKey = process.env.MSG91_AUTH_KEY;
      const templateId = process.env.MSG91_TEMPLATE_ID;

      if (!authKey || !templateId) {
        console.warn(`⚠️ MSG91_AUTH_KEY or MSG91_TEMPLATE_ID missing. SMS OTP sent to ${cleanPhone} in MOCK MODE: ${otp}`);
        return { success: true, mock: true, provider: "msg91" };
      }

      try {
        const response = await fetch("https://api.msg91.com/api/v5/otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authkey": authKey
          },
          body: JSON.stringify({
            template_id: templateId,
            mobile: cleanPhone,
            otp: otp,
            otp_expiry: "10" // Expiry in 10 minutes
          })
        });

        const result = await response.json();
        if (result.type === "success") {
          return { success: true, provider: "msg91", data: result };
        } else {
          throw new Error(result.message || "MSG91 sending failed");
        }
      } catch (error) {
        console.error("MSG91 Error:", error);
        throw error;
      }
    } else if (provider === "twilio") {
      const accountSid = process.env.TWILIO_ACCOUNT_SID;
      const authToken = process.env.TWILIO_AUTH_TOKEN;
      const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

      if (!accountSid || !authToken || !twilioPhone) {
        console.warn(`⚠️ Twilio credentials missing. SMS OTP sent to ${cleanPhone} in MOCK MODE: ${otp}`);
        return { success: true, mock: true, provider: "twilio" };
      }

      try {
        const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
        const bodyParams = new URLSearchParams({
          To: cleanPhone,
          From: twilioPhone,
          Body: `Your Career Lounge mobile verification security code is: ${otp}. This code is valid for 10 minutes.`
        });

        const response = await fetch(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
          {
            method: "POST",
            headers: {
              "Authorization": `Basic ${basicAuth}`,
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: bodyParams.toString()
          }
        );

        const result = await response.json();
        if (response.ok) {
          return { success: true, provider: "twilio", data: result };
        } else {
          throw new Error(result.message || "Twilio sending failed");
        }
      } catch (error) {
        console.error("Twilio Error:", error);
        throw error;
      }
    } else {
      console.warn(`⚠️ Unknown SMS provider: ${provider}. Running in MOCK MODE for ${cleanPhone}: ${otp}`);
      return { success: true, mock: true, provider: "mock" };
    }
  }
};
