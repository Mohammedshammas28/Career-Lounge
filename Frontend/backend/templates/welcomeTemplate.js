import { wrapEmailLayout } from "./layout";

export const getWelcomeTemplate = (name) => {
  const title = "Welcome to Career Lounge";
  const bodyContent = `
    <h1>Welcome to Career Lounge, ${name}!</h1>
    <p>We are thrilled to welcome you to our professional and educational platform. Career Lounge is designed to help you unlock global opportunities, access world-class admissions consulting, build your professional profile, and find industry-focused career pathways.</p>
    
    <div style="background: linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%); border-radius: 16px; padding: 24px; margin: 30px 0; border: 1px solid rgba(99, 102, 241, 0.1);">
      <h3 style="margin-top: 0; color: #1e1b4b; font-size: 16px;">What you can do next:</h3>
      <ul style="padding-left: 20px; color: #475569; font-size: 14px; margin-bottom: 0; line-height: 1.6;">
        <li style="margin-bottom: 8px;"><b>Study Abroad consultation</b>: Discover top universities.</li>
        <li style="margin-bottom: 8px;"><b>Career Counselling</b>: Speak with expert mentors.</li>
        <li style="margin-bottom: 8px;"><b>University Admissions & Visas</b>: Get hand-held guidance.</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 35px 0;">
      <a href="https://career-lounge.in" class="btn">Explore Services</a>
    </div>
    
    <p>If you have any questions, feel free to reply to this email. We're here to help you succeed.</p>
  `;

  return wrapEmailLayout(title, bodyContent);
};
