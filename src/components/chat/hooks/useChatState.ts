// app/components/chat/hooks/useChatState.ts
"use client";
import { useState, useCallback } from "react";

type ChatStep = "welcome" | "message" | "email" | "complete";

interface Message {
  text: string;
  isBot: boolean;
}

export function useChatState() {
  // State
  const [step, setStep] = useState<ChatStep>("welcome");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hi! I'm Mike from World Canine Union. How can I help you today?",
      isBot: true,
    },
  ]);

  // Email validation
  const validateEmail = useCallback((email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }, []);

  // Handle message submission
  const handleMessageSubmit = useCallback(() => {
    if (!message.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { text: message, isBot: false }]);

    // Bot response (simulated delay)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "📧 Got it! What's the best email to reach you?",
          isBot: true,
        },
      ]);
      setStep("email");
    }, 500);

    setMessage("");
  }, [message]);

  // Handle email submission
  const handleEmailSubmit = useCallback(async () => {
    if (!email.trim() || !validateEmail(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      // Send to API
      const response = await fetch("/api/chat/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messages.find((m) => !m.isBot)?.text || message,
          email,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      // Add email to messages
      setMessages((prev) => [...prev, { text: email, isBot: false }]);

      // Success message
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "✅ Thanks! I'll review your message and respond within 24 hours.",
            isBot: true,
          },
        ]);
        setStep("complete");
      }, 500);
    } catch (error) {
      console.error("Chat submission error:", error);
      alert(
        "Something went wrong. Please try again or email mike@worldcanineunion.org"
      );
      setMessages((prev) => [
        ...prev,
        {
          text: "❌ Sorry, there was an error. Please email mike@worldcanineunion.org directly.",
          isBot: true,
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }, [email, validateEmail, messages, message]);

  // Reset chat
  const resetChat = useCallback(() => {
    setStep("welcome");
    setMessage("");
    setEmail("");
    setIsSubmitting(false);
    setMessages([
      {
        text: "👋 Hi! I'm Mike from World Canine Union. How can I help you today?",
        isBot: true,
      },
    ]);
  }, []);

  return {
    state: {
      step,
      message,
      email,
      isSubmitting,
      messages,
    },
    handlers: {
      setStep,
      setMessage,
      setEmail,
      setIsSubmitting,
      setMessages,
      handleMessageSubmit,
      handleEmailSubmit,
    },
    resetChat,
    validateEmail,
  };
}
