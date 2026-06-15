/**
 * Premium layout wrapper for Career Lounge branding.
 * Brand colors: Deep Royal Indigo (#1e1b4b, #312e81), gradient accents (#6366f1, #a855f7).
 */
export const wrapEmailLayout = (title, bodyContent) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #f8fafc;
      color: #1e293b;
      -webkit-font-smoothing: antialiased;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(79, 70, 229, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
      border: 1px solid #f1f5f9;
    }
    .header {
      background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
      padding: 35px 40px;
      text-align: center;
    }
    .logo-text {
      color: #ffffff;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin: 0;
      text-decoration: none;
      display: inline-block;
    }
    .logo-text span {
      color: #6366f1;
    }
    .content {
      padding: 40px;
    }
    h1 {
      font-size: 22px;
      font-weight: 700;
      color: #0f172a;
      margin-top: 0;
      margin-bottom: 20px;
      letter-spacing: -0.3px;
    }
    p {
      font-size: 15px;
      line-height: 1.6;
      color: #475569;
      margin-top: 0;
      margin-bottom: 24px;
    }
    .btn {
      display: inline-block;
      background: linear-gradient(135deg, #4f46e5 0%, #4338ca 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 30px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
      text-align: center;
      border: none;
    }
    .footer {
      background-color: #f8fafc;
      padding: 30px 40px;
      text-align: center;
      border-top: 1px solid #f1f5f9;
    }
    .footer-links {
      margin-bottom: 15px;
    }
    .footer-links a {
      color: #64748b;
      font-size: 13px;
      text-decoration: none;
      margin: 0 12px;
      font-weight: 500;
    }
    .footer-text {
      color: #94a3b8;
      font-size: 12px;
      line-height: 1.5;
      margin: 0;
    }
    @media only screen and (max-width: 600px) {
      .email-container {
        margin: 20px 10px;
        border-radius: 16px;
      }
      .content {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <div class="logo-text">Career<span>Lounge</span></div>
    </div>
    <div class="content">
      ${bodyContent}
    </div>
    <div class="footer">
      <div class="footer-links">
        <a href="https://career-lounge.in">Website</a>
        <a href="https://career-lounge.in/services">Services</a>
        <a href="https://career-lounge.in/about">About Us</a>
      </div>
      <p class="footer-text">
        © ${new Date().getFullYear()} Career Lounge. All rights reserved.<br>
        Elevating professional and educational journeys worldwide.
      </p>
    </div>
  </div>
</body>
</html>
`;
