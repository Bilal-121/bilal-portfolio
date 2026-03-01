import { motion } from "framer-motion";
import { fadeInUp } from "../lib/motion";
import SectionPill from "./SectionPill";
import { useState, useRef, useEffect } from "react";
import { FiSend } from "react-icons/fi";

export default function Contact() {
  const [contactType, setContactType] = useState("customer"); // 'customer' or 'recruiter'
  const [sent, setSent] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Recruiter form data
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Chatbot state
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hi! I'm Bilal's AI assistant. Want to build something great? Tell me about your project."
    }
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
    isNewClient: null
  });
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll chat to bottom (only scroll within chat container, not page)
  useEffect(() => {
    if (messages.length > 1 && chatContainerRef.current) {
      // Scroll only within the chat container, not the entire page
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [messages]);

  // Merge extracted data from AI responses
  const mergeExtractedData = (newData) => {
    if (!newData) return;
    setProjectData(prev => ({
      ...prev,
      // Only update fields that have actual values
      ...(newData.clientName && { name: newData.clientName }),
      ...(newData.clientEmail && { email: newData.clientEmail }),
      ...(newData.projectType && { projectType: newData.projectType }),
      ...(newData.projectDescription && { description: newData.projectDescription }),
      ...(newData.timeline && { timeline: newData.timeline }),
      ...(newData.budget && { budget: newData.budget })
    }));
  };

  // Sanitize input to prevent XSS attacks
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '');
  };

  // Validate budget and check market rates
  const validateBudget = (budget, projectType) => {
    const budgetNum = parseFloat(budget.replace(/[^0-9.]/g, ''));
    const marketRates = {
      "landing": { min: 500, max: 2000 },
      "e-commerce": { min: 2500, max: 10000 },
      "web app": { min: 5000, max: 25000 },
      "mobile": { min: 8000, max: 40000 },
      "full stack": { min: 10000, max: 50000 },
      "default": { min: 1000, max: 15000 }
    };

    const type = Object.keys(marketRates).find(key => 
      projectType.toLowerCase().includes(key)
    ) || "default";
    
    const rates = marketRates[type];
    
    if (budgetNum < rates.min) {
      return {
        isReasonable: false,
        feedback: `For a ${type} project, the typical budget starts around $${rates.min}. Your budget might be below market rates, but let's discuss what we can do!`
      };
    } else if (budgetNum > rates.max) {
      return {
        isReasonable: true,
        feedback: `Great! Your budget of $${budgetNum} is well within market range for a ${type} project.`
      };
    } else {
      return {
        isReasonable: true,
        feedback: `Perfect! Your budget aligns well with typical ${type} project rates ($${rates.min}-$${rates.max}).`
      };
    }
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      role: "user",
      content: userInput
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = userInput;
    setUserInput("");
    setIsTyping(true);

    try {
      // Build conversation history for the API
      const conversationHistory = [...messages, userMessage];

      // Call the Vercel API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: conversationHistory
        })
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
      
      // Merge extracted data from AI
      if (data.extractedData) {
        mergeExtractedData(data.extractedData);
      }

      // Add AI response to messages
      const assistantMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: data?.message || rawText || "Thanks! Tell me a bit more about your project."
      };

      setMessages(prev => [...prev, assistantMessage]);
      setChatStep(prev => prev + 1);

      // Check if conversation is ready to send
      if (data.extractedData?.readyToSend === true) {
        // Build complete project data from extracted data
        const completeProjectData = {
          name: data.extractedData.clientName || projectData.name,
          email: data.extractedData.clientEmail || projectData.email,
          projectType: data.extractedData.projectType || projectData.projectType,
          description: data.extractedData.projectDescription || projectData.description,
          timeline: data.extractedData.timeline || projectData.timeline,
          budget: data.extractedData.budget || projectData.budget
        };
        
        // Send the brief immediately with the complete data
        sendProjectBrief(completeProjectData, [...conversationHistory, assistantMessage]);
      }

    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: messages.length + 2,
        role: "assistant",
        content: `Our chat service is temporarily unavailable. Please try again in a moment, or refresh the page if the issue persists.`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendProjectBrief = async (data, fullConversation) => {
    // Simulate sending email with project brief
    const brief = {
      type: 'PROJECT_BRIEF',
      clientType: 'New Client', // Default to "New Client" (add database tracking later for returning clients)
      contactInfo: {
        name: data.name,
        email: data.email
      },
      projectDetails: {
        type: data.projectType,
        description: data.description,
        timeline: data.timeline,
        budget: data.budget
      },
      budgetAnalysis: validateBudget(data.budget, data.projectType),
      timestamp: new Date().toISOString()
    };
    
    try {
      // Call the serverless function to send email
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          projectBrief: brief,
          conversationHistory: fullConversation || messages
        })
      });

      if (!response.ok) {
        throw new Error("Failed to send project brief");
      }

      const result = await response.json();
      
      console.log("📧 Project Brief sent:", brief);
      console.log("📧 Conversation copy sent to customer");
      return brief;
    } catch (error) {
      console.error("Error sending brief:", error);
      const errorMessage = {
        id: messages.length + 1,
        role: "assistant",
        content: `I had trouble sending your project brief. No worries! Please try again, or use the connection form to manually share your project details with Bilal. 📧`
      };
      setMessages(prev => [...prev, errorMessage]);
      throw error;
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setUserInput(suggestion);
  };

  // Recruiter form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    
    const sanitizedData = {
      type: 'RECRUITER_CONTACT',
      firstName: sanitizeInput(formData.firstName.trim()),
      email: formData.email.trim().toLowerCase(),
      message: sanitizeInput(formData.message.trim()),
      timestamp: new Date().toISOString()
    };
    
    try {
      const response = await fetch('/api/send-recruiter-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      console.log('✅ Recruiter contact form submitted successfully');
      setSent(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to send message. Please try again or refresh the page.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section relative overflow-hidden">
      <SectionPill id="contact" title="Get In Touch" />
      
      <div className="absolute inset-0 bg-gradient-to-b from-violet/10 via-transparent to-glow/10 opacity-0 blur-3xl pointer-events-none" />

      <div className="container-g relative z-10">
        {/* Contact Type Selector */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          <button
            onClick={() => setContactType("customer")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              contactType === "customer"
                ? "bg-glow text-black shadow-lg shadow-glow/50"
                : "bg-surface/50 text-white hover:text-text"
            }`}
          >
            Project in mind?
          </button>
          <button
            onClick={() => setContactType("recruiter")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              contactType === "recruiter"
                ? "bg-glow text-black shadow-lg shadow-glow/50"
                : "bg-surface/50 text-white hover:text-text"
            }`}
          >
            Let's Connect
          </button>
        </motion.div>

        {/* Customer Chatbot View */}
        {contactType === "customer" && (
          <motion.div
            key="customer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-5 gap-8 items-start">
              {/* Left Side - Headline */}
              <div className="md:col-span-2 space-y-6">
                <motion.h2
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-heading leading-tight"
                >
                  Let's build your{" "}
                  <span className="gradient-text">next big thing</span>.
                </motion.h2>
                
                <motion.p
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="text-text/70 text-lg"
                >
                  Skip the formalities. Chat with my AI assistant to generate a project brief instantly.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-sm text-text/60"
                >
                  <span className="text-glow">✓</span>
                  <span>Fast Response</span>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-sm text-text/60"
                >
                  <span className="text-glow">✓</span>
                  <span>Budget Analysis</span>
                </motion.div>
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="flex items-start gap-3 text-sm text-text/60"
                >
                  <span className="text-glow">✓</span>
                  <span>No Commitment</span>
                </motion.div>
              </div>

              {/* Right Side - Chat Interface */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="md:col-span-3 panel p-6 rounded-2xl relative overflow-hidden"
              >
                <div className="panel-gradient" />
                
                {/* Chat Messages */}
                <div
                  ref={chatContainerRef}
                  className="relative z-10 h-[400px] overflow-y-auto mb-4 space-y-4 pr-2 chat-scrollbar"
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-glow text-black ml-auto shadow-lg shadow-glow/20"
                            : "bg-slate-800/90 border border-slate-700/50 text-slate-100"
                        }`}
                      >
                        <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-800/90 border border-slate-700/50 px-4 py-3 rounded-2xl">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-glow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                          <span className="w-2 h-2 bg-glow rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                          <span className="w-2 h-2 bg-glow rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <form onSubmit={handleChatSubmit} className="relative z-10 flex gap-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Tell me about your project..."
                    disabled={isTyping}
                    className="flex-1 bg-surface/50 border border-border rounded-xl px-4 py-3 text-text placeholder:text-text/40 focus:border-glow focus:ring-1 focus:ring-glow focus:outline-none transition disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={!userInput.trim() || isTyping}
                    className="bg-glow hover:bg-glow/90 text-bg p-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSend size={20} />
                  </button>
                </form>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Connect View */}
        {contactType === "recruiter" && (
          <motion.div
            key="recruiter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="max-w-xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="panel p-10 md:p-14 rounded-2xl hover-glow relative z-20"
            >
              <motion.h3
                className="text-3xl md:text-4xl font-heading mb-4 gradient-text"
                variants={fadeInUp}
              >
                Let's Connect
              </motion.h3>

              <motion.p
                variants={fadeInUp}
                className="text-text/80 mb-10 leading-relaxed"
              >
                Interested in working together? I'm always open to discussing new opportunities and collaborations.
              </motion.p>

              {!sent ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 relative z-30"
                  noValidate
                >
                  <div className="text-left relative z-10">
                    <label htmlFor="firstName" className="sr-only">
                      Your Name
                    </label>
                    <input 
                      name="firstName" 
                      id="firstName" 
                      type="text" 
                      placeholder="Your Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      maxLength={100}
                      className={`w-full bg-surface border ${
                        errors.firstName ? 'border-red-500' : 'border-border'
                      } rounded-lg p-3 text-text placeholder:text-text/40 focus:border-glow focus:ring-1 focus:ring-glow focus:outline-none transition disabled:opacity-50`}
                    />
                    {errors.firstName && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  <div className="text-left relative z-10">
                    <label htmlFor="email" className="sr-only">
                      Your Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      id="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      maxLength={150}
                      className={`w-full bg-surface border ${
                        errors.email ? 'border-red-500' : 'border-border'
                      } rounded-lg p-3 text-text placeholder:text-text/40 focus:border-glow focus:ring-1 focus:ring-glow focus:outline-none transition disabled:opacity-50`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="text-left relative z-10">
                    <label htmlFor="message" className="sr-only">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      placeholder="Tell me about the opportunity..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      maxLength={1000}
                      className={`w-full bg-surface border ${
                        errors.message ? 'border-red-500' : 'border-border'
                      } rounded-lg p-3 text-text placeholder:text-text/40 focus:border-glow focus:ring-1 focus:ring-glow focus:outline-none transition resize-none disabled:opacity-50`}
                    />
                    {errors.message && (
                      <span className="text-red-500 text-sm mt-1 block">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {errors.submit && (
                    <div className="text-red-500 text-sm text-center">
                      {errors.submit}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    onHoverStart={() => !isSubmitting && setHovered(true)}
                    onHoverEnd={() => setHovered(false)}
                    className="relative btn-neon font-semibold text-base tracking-wide py-3 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {isSubmitting ? "Sending..." : hovered ? "Send Now!" : "Send Message"}
                    </span>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hovered && !isSubmitting ? 1 : 0 }}
                      className="absolute inset-0 bg-glow/20 blur-md rounded-lg pointer-events-none"
                    />
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center mt-6 text-lg text-glow font-body"
                >
                  Message sent successfully ✨ I'll get back to you soon.
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
