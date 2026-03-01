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
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res
        .status(400)
        .json({ error: "Messages array is required" });
    }

    if (!process.env.GOOGLE_API_KEY) {
      console.error("GOOGLE_API_KEY not found in environment");
      return res
        .status(500)
        .json({ error: "Google API key not configured on server" });
    }

    const apiKey = process.env.GOOGLE_API_KEY;

    // Build the prompt for Gemini
    const systemPrompt = `You are Bilal's AI assistant helping clients discuss web development projects. 

Have a natural, friendly conversation and gradually extract:
- Their name and email
- Project type (landing page, e-commerce, web app, etc.)
- What they want to build (detailed description)
- Timeline/deadline (when they need it)
- Budget (how much they're willing to spend)

Keep responses concise (1-2 sentences max). Be conversational, not robotic.

When you have all the essential info (name, email, project type, timeline, budget), ask ONE final question: "Do you have any additional details you'd like Bilal to know about your project?"

After they respond to that question, end with: "Perfect! Your project brief has been sent to Bilal. He'll review it and get in touch within 24 hours. Looking forward to working with you! 🚀"

Then add this JSON block with ALL the information collected:
===EXTRACT_START===
{"readyToSend": true, "clientName": "John Doe", "clientEmail": "john@example.com", "projectType": "E-commerce", "projectDescription": "A website for selling handmade jewelry with payment integration", "timeline": "2-3 months", "budget": "$5000-$8000"} 
===EXTRACT_END===

IMPORTANT: Always include timeline and budget fields in the JSON when you have that information.

If you just have partial info, include the extracted fields WITHOUT "readyToSend". Only add "readyToSend": true when you have ALL information and the conversation is complete.`;

    // Build conversation history
    let conversationText = `${systemPrompt}\n\n`;
    for (const msg of messages) {
      const role = msg.role === "user" ? "User" : "Assistant";
      conversationText += `${role}: ${msg.content}\n`;
    }
    conversationText += `Assistant:`;

    // Call Google Gemini API via REST
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: conversationText }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API Error:", data);
      return res.status(response.status).json({
        error: data.error?.message || "Failed to get AI response",
      });
    }

    // Extract AI response
    const aiResponse =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help!";

    // Extract JSON if present
    const extractMatch = aiResponse.match(
      /===EXTRACT_START===\n([\s\S]*?)\n===EXTRACT_END===/
    );
    let extractedData = null;

    if (extractMatch) {
      try {
        extractedData = JSON.parse(extractMatch[1]);
      } catch (e) {
        console.log("Could not parse extracted data");
      }
    }

    // Remove extraction block from displayed message
    const displayMessage = aiResponse
      .replace(/===EXTRACT_START===[\s\S]*?===EXTRACT_END===/g, "")
      .trim();

    res.status(200).json({
      message: displayMessage,
      extractedData: extractedData,
    });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({
      error: error.message || "Internal server error",
    });
  }
}
