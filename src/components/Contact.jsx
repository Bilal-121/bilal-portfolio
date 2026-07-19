import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { useClipReveal } from "../lib/motion";
import { trackEvent } from "../lib/analytics";
import { siteConfig } from "../lib/siteConfig";

export default function Contact() {
  const reveal = useClipReveal();

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm Bilal's AI assistant. Want to build something great? Tell me about your project.",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [projectData, setProjectData] = useState({
    name: "",
    email: "",
    projectType: "",
    description: "",
    timeline: "",
    budget: "",
    isNewClient: null,
  });
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1 && chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages]);

  const mergeExtractedData = (newData) => {
    if (!newData) return;
    setProjectData((prev) => ({
      ...prev,
      ...(newData.clientName && { name: newData.clientName }),
      ...(newData.clientEmail && { email: newData.clientEmail }),
      ...(newData.projectType && { projectType: newData.projectType }),
      ...(newData.projectDescription && { description: newData.projectDescription }),
      ...(newData.timeline && { timeline: newData.timeline }),
      ...(newData.budget && { budget: newData.budget }),
    }));
  };

  const validateBudget = (budget, projectType) => {
    const budgetNum = parseFloat(budget.replace(/[^0-9.]/g, ""));
    const marketRates = {
      landing: { min: 500, max: 2000 },
      "e-commerce": { min: 2500, max: 10000 },
      "web app": { min: 5000, max: 25000 },
      mobile: { min: 8000, max: 40000 },
      "full stack": { min: 10000, max: 50000 },
      default: { min: 1000, max: 15000 },
    };

    const type =
      Object.keys(marketRates).find((key) => projectType.toLowerCase().includes(key)) ||
      "default";

    const rates = marketRates[type];

    if (budgetNum < rates.min) {
      return {
        isReasonable: false,
        feedback: `For a ${type} project, the typical budget starts around $${rates.min}. Your budget might be below market rates, but let's discuss what we can do!`,
      };
    } else if (budgetNum > rates.max) {
      return {
        isReasonable: true,
        feedback: `Great! Your budget of $${budgetNum} is well within market range for a ${type} project.`,
      };
    } else {
      return {
        isReasonable: true,
        feedback: `Perfect! Your budget aligns well with typical ${type} project rates ($${rates.min}-$${rates.max}).`,
      };
    }
  };

  const sendProjectBrief = async (data, fullConversation) => {
    const brief = {
      type: "PROJECT_BRIEF",
      clientType: "New Client",
      contactInfo: { name: data.name, email: data.email },
      projectDetails: {
        type: data.projectType,
        description: data.description,
        timeline: data.timeline,
        budget: data.budget,
      },
      budgetAnalysis: validateBudget(data.budget, data.projectType),
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectBrief: brief,
          conversationHistory: fullConversation || messages,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send project brief");
      }

      return brief;
    } catch (error) {
      console.error("Error sending brief:", error);
      const errorMessage = {
        id: messages.length + 1,
        role: "assistant",
        content:
          "I had trouble sending your project brief. No worries! Please try again, or use the connection form to manually share your project details with Bilal.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      throw error;
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: userInput,
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    try {
      const conversationHistory = [...messages, userMessage];

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data = null;
      let rawText = "";

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        rawText = await response.text();
      }

      if (!response.ok) {
        const apiError = data?.error || rawText || "Failed to get AI response";
        throw new Error(apiError);
      }

      if (data.extractedData) {
        mergeExtractedData(data.extractedData);
      }

      const assistantMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: data?.message || rawText || "Thanks! Tell me a bit more about your project.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setChatStep((prev) => prev + 1);

      if (data.extractedData?.readyToSend === true) {
        trackEvent("project_brief_sent", { type: "customer" });
        const completeProjectData = {
          name: data.extractedData.clientName || projectData.name,
          email: data.extractedData.clientEmail || projectData.email,
          projectType: data.extractedData.projectType || projectData.projectType,
          description: data.extractedData.projectDescription || projectData.description,
          timeline: data.extractedData.timeline || projectData.timeline,
          budget: data.extractedData.budget || projectData.budget,
        };

        sendProjectBrief(completeProjectData, [...conversationHistory, assistantMessage]);
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: messages.length + 2,
        role: "assistant",
        content:
          "Our chat service is temporarily unavailable. Please try again in a moment, or refresh the page if the issue persists.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section id="contact" className="section relative">
      <div className="container-g">
        <span className="label block mb-6">04 / Contact</span>

        <motion.h2
          ref={reveal.ref}
          style={reveal.style}
          className="text-display text-text-primary mb-16 max-w-[16ch]"
        >
          Let's talk
        </motion.h2>

        <div className="grid tablet:grid-cols-2 gap-6">
          {/* Hiring? — CV + mailto only, no chat, no friction */}
          <div className="surface p-8 tablet:p-10 flex flex-col">
            <span className="label mb-4">Hiring?</span>
            <p className="text-body text-text-secondary mb-8">
              Take a look at my resume, or reach out directly — I'm always open
              to discussing new opportunities.
            </p>
            <div className="mt-auto flex flex-wrap gap-4">
              <a
                href={siteConfig.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("resume_download", { method: "contact" })}
                className="btn-pill-filled"
              >
                Download CV
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                onClick={() => trackEvent("contact_click", { type: "mailto" })}
                className="btn-pill"
              >
                Email me
              </a>
            </div>
          </div>

          {/* Have a project? — AI assistant chat */}
          <div className="surface p-6 tablet:p-8 flex flex-col">
            <span className="label mb-4">Have a project?</span>
            <p className="text-body text-text-secondary mb-4">
              Chat with my AI assistant to generate a project brief instantly.
            </p>

            <div
              ref={chatContainerRef}
              role="log"
              aria-live="polite"
              className="h-[320px] overflow-y-auto mb-4 space-y-4 pr-2 chat-scrollbar"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      message.role === "user"
                        ? "bg-accent text-bg"
                        : "bg-bg-raised border border-border text-text-secondary"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-bg-raised border border-border px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <span
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-accent rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleChatSubmit} className="flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Tell me about your project..."
                disabled={isTyping}
                className="flex-1 bg-bg-raised border border-border rounded-xl px-4 py-3 text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!userInput.trim() || isTyping}
                aria-label="Send message"
                className="bg-accent hover:opacity-85 text-bg p-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
