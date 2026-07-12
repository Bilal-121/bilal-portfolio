import { Resend } from 'resend';

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
  const origin = process.env.ALLOWED_ORIGIN || "https://bilalessakini.com";
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not found in environment");
    return res.status(500).json({ error: "Email service not configured on server" });
  }

  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    console.error("CONTACT_EMAIL not found in environment");
    return res.status(500).json({ error: "Contact email not configured on server" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { projectBrief, conversationHistory } = req.body;

    if (!projectBrief) {
      return res.status(400).json({ error: "Project brief is required" });
    }

    const bilalEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Project Brief</h2>

        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">Client Information</h3>
          <p><strong>Name:</strong> ${escapeHtml(projectBrief.contactInfo?.name || "Not provided")}</p>
          <p><strong>Email:</strong> ${escapeHtml(projectBrief.contactInfo?.email || "Not provided")}</p>
          <p><strong>Client Type:</strong> ${escapeHtml(projectBrief.clientType || "Unknown")}</p>
          <p><strong>Submitted:</strong> ${escapeHtml(new Date(projectBrief.timestamp).toLocaleString())}</p>
        </div>

        <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">Project Details</h3>
          <p><strong>Project Type:</strong> ${escapeHtml(projectBrief.projectDetails?.type || "Not specified")}</p>
          <p><strong>Description:</strong> ${escapeHtml(projectBrief.projectDetails?.description || "Not provided")}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(projectBrief.projectDetails?.timeline || "Not specified")}</p>
          <p><strong>Budget:</strong> ${escapeHtml(projectBrief.projectDetails?.budget || "Not specified")}</p>
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 8px;">
          <h3 style="margin-top: 0;">Budget Analysis</h3>
          <p><strong>Budget is Reasonable:</strong> ${projectBrief.budgetAnalysis?.isReasonable ? "Yes" : "No"}</p>
          <p><strong>Feedback:</strong> ${escapeHtml(projectBrief.budgetAnalysis?.feedback || "No feedback")}</p>
        </div>
      </div>
    `;

    let conversationHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Your Project Brief - Conversation Summary</h2>
        <p>Hi ${escapeHtml(projectBrief.contactInfo?.name || "there")},</p>
        <p>Thank you for chatting with Bilal's AI assistant! Here's a summary of our conversation and your project details:</p>

        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5ce1e6;">
          <h3 style="margin-top: 0; color: #333;">Our Conversation</h3>
    `;

    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg) => {
        const isUser = msg.role === "user";
        const bgColor = isUser ? "#e3f2fd" : "#f5f5f5";
        const label = isUser ? "You" : "Bilal's Assistant";
        conversationHTML += `
          <div style="background: ${bgColor}; padding: 10px; margin: 10px 0; border-radius: 5px;">
            <strong>${label}:</strong> ${escapeHtml(msg.content)}
          </div>
        `;
      });
    }

    conversationHTML += `
        </div>

        <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">Your Project Details</h3>
          <p><strong>Project Type:</strong> ${escapeHtml(projectBrief.projectDetails?.type || "Not specified")}</p>
          <p><strong>Description:</strong> ${escapeHtml(projectBrief.projectDetails?.description || "Not provided")}</p>
          <p><strong>Timeline:</strong> ${escapeHtml(projectBrief.projectDetails?.timeline || "Not specified")}</p>
          <p><strong>Budget:</strong> ${escapeHtml(projectBrief.projectDetails?.budget || "Not specified")}</p>
        </div>

        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>Contact Email:</strong> ${escapeHtml(projectBrief.contactInfo?.email)}</p>
          <p><strong>Submission Date:</strong> ${escapeHtml(new Date(projectBrief.timestamp).toLocaleString())}</p>
        </div>

        <p style="color: #666; font-size: 14px;">Bilal will review your project brief and get in touch within 24 hours. Thank you for your interest!</p>
      </div>
    `;

    const bilalEmailResponse = await resend.emails.send({
      from: 'Bilal Portfolio Bot <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: projectBrief.contactInfo?.email || 'noreply@portfolio.com',
      subject: `New Project Lead: ${escapeHtml(projectBrief.contactInfo?.name || 'Interested Client')}`,
      html: bilalEmailHTML
    });

    const customerEmailResponse = await resend.emails.send({
      from: 'Bilal - Web Developer <onboarding@resend.dev>',
      to: projectBrief.contactInfo?.email,
      replyTo: contactEmail,
      subject: 'Thanks for Reaching Out - Your Project Brief Summary',
      html: conversationHTML
    });

    res.status(200).json({
      success: true,
      message: "Project brief and conversation copy sent successfully!",
      bilalEmailId: bilalEmailResponse.id,
      customerEmailId: customerEmailResponse.id
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      error: error.message || "Failed to send email",
    });
  }
}
