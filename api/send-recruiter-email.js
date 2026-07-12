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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY not found in environment');
    return res.status(500).json({ error: 'Email service not configured on server' });
  }

  const contactEmail = process.env.CONTACT_EMAIL;
  if (!contactEmail) {
    console.error('CONTACT_EMAIL not found in environment');
    return res.status(500).json({ error: 'Contact email not configured on server' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, message, timestamp } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: 'name, email, and message are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const formattedDate = timestamp
      ? new Date(timestamp).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })
      : new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' });

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message);

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Connection <onboarding@resend.dev>',
      to: contactEmail,
      subject: `Portfolio Connection Request from ${safeName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                font-weight: 600;
                color: #667eea;
                margin-bottom: 5px;
              }
              .value {
                background: white;
                padding: 12px;
                border-radius: 5px;
                border-left: 4px solid #667eea;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 5px;
                border-left: 4px solid #667eea;
                white-space: pre-wrap;
                line-height: 1.8;
              }
              .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
                font-size: 12px;
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">Portfolio Connection Request</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">New connection request from your portfolio</p>
            </div>

            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${safeName}</div>
              </div>

              <div class="field">
                <div class="label">Email:</div>
                <div class="value">
                  <a href="mailto:${safeEmail}" style="color: #667eea; text-decoration: none;">
                    ${safeEmail}
                  </a>
                </div>
              </div>

              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${safeMessage}</div>
              </div>

              <div class="footer">
                <strong>Received:</strong> ${escapeHtml(formattedDate)}<br>
                <strong>Type:</strong> Portfolio Connection<br>
                <strong>Source:</strong> Portfolio Contact Form
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Portfolio connection email error:', error);
      return res.status(500).json({
        error: 'Failed to send email',
        details: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
      emailId: data.id
    });

  } catch (error) {
    console.error('Portfolio connection email error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      details: error.message
    });
  }
}
