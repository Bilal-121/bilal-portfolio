import { motion } from "framer-motion";
import { fadeInUp } from "../lib/motion";
import SectionPill from "./SectionPill";
import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Sanitize input to prevent XSS attacks
  const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input
      .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, ''); // Remove event handlers like onclick=
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
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
    
    // Sanitize data before submission
    const sanitizedData = {
      firstName: sanitizeInput(formData.firstName.trim()),
      email: formData.email.trim().toLowerCase(),
      message: sanitizeInput(formData.message.trim())
    };
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', sanitizedData);
      setSent(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>

      <section className="section relative overflow-hidden">

        <SectionPill id="contact" title="Get In Touch" />
        
        {/* Soft ambient gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet/10 via-transparent to-glow/10 opacity-0 blur-3xl pointer-events-none" />

        <div className="container-g relative z-10 max-w-xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120 }}
            className="panel p-10 md:p-14 rounded-2xl hover-glow relative z-20"
          >
            <motion.h3
              className="text-3xl md:text-4xl font-heading mb-4 gradient-text"
              variants={fadeInUp}
            >
              Dream It. Build It. Launch It.
            </motion.h3>

            <motion.p
              variants={fadeInUp}
              className="text-text/80 mb-10 leading-relaxed"
            >
              Whether it's a new project, a collaboration, or just a friendly chat
              I'm always open to meaningful conversations. Drop me a message below or
              connect via email.
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
                    autoComplete="given-name"
                    aria-label="Your Name"
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                    className={`w-full bg-surface border ${
                      errors.firstName ? 'border-red-500' : 'border-border'
                    } rounded-lg p-3 text-text placeholder:text-text/40 focus:border-glow focus:ring-1 focus:ring-glow focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed relative z-10 cursor-pointer`}
                  />
                  {errors.firstName && (
                    <span id="firstName-error" className="text-red-500 text-sm mt-1 block" role="alert">
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
                    autoComplete="email"
                    aria-label="Your Email"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`w-full bg-surface border ${
                      errors.email ? 'border-red-500' : 'border-border'
                    } rounded-lg p-3 text-text placeholder:text-text/40 focus:border-glow focus:ring-1 focus:ring-glow focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed relative z-10 cursor-pointer`}
                  />
                  {errors.email && (
                    <span id="email-error" className="text-red-500 text-sm mt-1 block" role="alert">
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
                    placeholder="Your Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    maxLength={1000}
                    aria-label="Your Message"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full bg-surface border ${
                      errors.message ? 'border-red-500' : 'border-border'
                    } rounded-lg p-3 text-text placeholder:text-text/40 focus:border-glow focus:ring-1 focus:ring-glow focus:outline-none transition resize-none disabled:opacity-50 disabled:cursor-not-allowed relative z-10 cursor-pointer`}
                  />
                  {errors.message && (
                    <span id="message-error" className="text-red-500 text-sm mt-1 block" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>

                {errors.submit && (
                  <div className="text-red-500 text-sm text-center" role="alert">
                    {errors.submit}
                  </div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  onHoverStart={() => !isSubmitting && setHovered(true)}
                  onHoverEnd={() => setHovered(false)}
                  aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
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
        </div>
      </section>
    </>
  );
}
