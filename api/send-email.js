import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { projectBrief, conversationHistory } = req.body;

    if (!projectBrief) {
      return res.status(400).json({ error: "Project brief is required" });
    }

    // Format the project brief email for Bilal
    const bilalEmailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">📋 New Project Brief</h2>
        
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">Client Information</h3>
          <p><strong>Name:</strong> ${projectBrief.contactInfo?.name || "Not provided"}</p>
          <p><strong>Email:</strong> ${projectBrief.contactInfo?.email || "Not provided"}</p>
          <p><strong>Client Type:</strong> ${projectBrief.clientType || "Unknown"}</p>
          <p><strong>Submitted:</strong> ${new Date(projectBrief.timestamp).toLocaleString()}</p>
        </div>

        <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">🎯 Project Details</h3>
          <p><strong>Project Type:</strong> ${projectBrief.projectDetails?.type || "Not specified"}</p>
          <p><strong>Description:</strong> ${projectBrief.projectDetails?.description || "Not provided"}</p>
          <p><strong>Timeline:</strong> ${projectBrief.projectDetails?.timeline || "Not specified"}</p>
          <p><strong>Budget:</strong> ${projectBrief.projectDetails?.budget || "Not specified"}</p>
        </div>

        <div style="background: #fff3cd; padding: 15px; border-radius: 8px;">
          <h3 style="margin-top: 0;">💰 Budget Analysis</h3>
          <p><strong>Budget is Reasonable:</strong> ${projectBrief.budgetAnalysis?.isReasonable ? "✅ Yes" : "⚠️ No"}</p>
          <p><strong>Feedback:</strong> ${projectBrief.budgetAnalysis?.feedback || "No feedback"}</p>
        </div>
      </div>
    `;

    // Format the conversation transcript for the customer
    let conversationHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">✅ Your Project Brief - Conversation Summary</h2>
        <p>Hi ${projectBrief.contactInfo?.name || "there"},</p>
        <p>Thank you for chatting with Bilal's AI assistant! Here's a summary of our conversation and your project details:</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5ce1e6;">
          <h3 style="margin-top: 0; color: #333;">📝 Our Conversation</h3>
    `;

    // Add conversation messages
    if (conversationHistory && Array.isArray(conversationHistory)) {
      conversationHistory.forEach((msg, index) => {
        const isUser = msg.role === "user";
        const bgColor = isUser ? "#e3f2fd" : "#f5f5f5";
        const label = isUser ? "You" : "Bilal's Assistant";
        conversationHTML += `
          <div style="background: ${bgColor}; padding: 10px; margin: 10px 0; border-radius: 5px;">
            <strong>${label}:</strong> ${msg.content}
          </div>
        `;
      });
    }

    conversationHTML += `
        </div>

        <div style="background: #e8f4f8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="margin-top: 0;">🎯 Your Project Details</h3>
          <p><strong>Project Type:</strong> ${projectBrief.projectDetails?.type || "Not specified"}</p>
          <p><strong>Description:</strong> ${projectBrief.projectDetails?.description || "Not provided"}</p>
          <p><strong>Timeline:</strong> ${projectBrief.projectDetails?.timeline || "Not specified"}</p>
          <p><strong>Budget:</strong> ${projectBrief.projectDetails?.budget || "Not specified"}</p>
        </div>

        <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <p><strong>📧 Contact Email:</strong> ${projectBrief.contactInfo?.email}</p>
          <p><strong>📅 Submission Date:</strong> ${new Date(projectBrief.timestamp).toLocaleString()}</p>
        </div>

        <p style="color: #666; font-size: 14px;">Bilal will review your project brief and get in touch within 24 hours. Thank you for your interest!</p>
      </div>
    `;

    // Send email to Bilal
    // NOTE: Using onboarding@resend.dev may go to spam. 
    // To fix: Verify your own domain in Resend settings and update the 'from' address
    const bilalEmailResponse = await resend.emails.send({
      from: 'Bilal Portfolio Bot <onboarding@resend.dev>',
      to: 'essakinibilal14@gmail.com',
      replyTo: projectBrief.contactInfo?.email || 'noreply@portfolio.com',
      subject: `🚀 New Project Lead: ${projectBrief.contactInfo?.name || 'Interested Client'}`,
      html: bilalEmailHTML
    });

    console.log("✅ Email sent to Bilal:", bilalEmailResponse);

    // Send conversation copy to customer
    const customerEmailResponse = await resend.emails.send({
      from: 'Bilal - Web Developer <onboarding@resend.dev>',
      to: projectBrief.contactInfo?.email,
      replyTo: 'essakinibilal14@gmail.com',
      subject: `✅ Thanks for Reaching Out - Your Project Brief Summary`,
      html: conversationHTML
    });

    console.log("✅ Email sent to customer:", customerEmailResponse);

    res.status(200).json({
      success: true,
      message: "Project brief and conversation copy sent successfully!",
      bilalEmailId: bilalEmailResponse.id,
      customerEmailId: customerEmailResponse.id
    });
  } catch (error) {
    console.error("❌ Email sending error:", error);
    res.status(500).json({
      error: error.message || "Failed to send email",
    });
  }
}
