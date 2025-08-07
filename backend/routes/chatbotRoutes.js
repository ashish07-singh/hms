import express from "express";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

const router = express.Router();

// Simple auto-responses for common queries
const autoResponses = {
  "modules": "TAJPE offers 42+ comprehensive modules including Front Office Management, Clinical Management, In-Patient Management, Diagnosis Management, General Management, Administration, and more. Which module are you interested in?",
  "demo": "I'd be happy to arrange a demo of TAJPE Hospital Management System. Please contact our sales team at sales@tajpe.com or call +91 9048767111 to schedule a personalized demonstration.",
  "pricing": "TAJPE offers 4 scalable versions: Clinic (Basic), Pro (up to 50 beds), Prime (up to 100 beds), and Premium (200+ beds). Contact us for detailed pricing information.",
  "contact": "You can reach TAJPE at +91 9048767111 (INDIA) or +971 56 690 7222 (UAE). Email us at sales@tajpe.com for more information.",
  "features": "TAJPE includes Patient Portal, Mobile App, WhatsApp Integration, Teleconsultation, Business Intelligence, and more. What specific feature interests you?",
  "implementation": "Our expert team provides complete implementation support including training, data migration, and ongoing support. We ensure smooth transition to TAJPE.",
  "support": "We provide 24/7 technical support. Contact our support team at support@tajpe.com or call +91 9048767111 for immediate assistance.",
  "integration": "TAJPE integrates with lab equipment, third-party applications, and existing hospital systems. We've interfaced with 200+ models of medical equipment.",
  "portal": "Our Patient Portal allows online appointment booking, medical record access, test results viewing, and family member management. It transforms your hospital website into a comprehensive patient platform.",
  "mobile": "Our Mobile App enables appointment booking, video consultations, secure payments, and lab results access. It can be customized for your hospital branding and launched on app stores.",
  "whatsapp": "WhatsApp Integration provides appointment scheduling, lab result access, invoice sharing, and automated messaging including welcome messages, confirmations, and reminders.",
  "teleconsultation": "Vconsult Teleconsultation offers one-to-one video interaction, low bandwidth HD video, seamless EMR integration, payment gateway integration, and automated e-prescription facility.",
  "default": "Thank you for your message. Our support team will respond shortly."
};

// Send message from user
router.post("/", async (req, res) => {
  try {
    const { message, sessionId, email, userId } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        reply: "Please enter a message." 
      });
    }

    // Generate or use existing session ID
    const currentSessionId = sessionId || Math.random().toString(36).substring(2, 15);
    
    // Find or create chat session
    let chat = await Chat.findOne({ sessionId: currentSessionId });
    
    if (!chat) {
      chat = new Chat({
        sessionId: currentSessionId,
        userId: userId,
        userEmail: email,
        messages: []
      });
    }

    // Add user message
    const userMessage = {
      from: "user",
      text: message,
      timestamp: new Date(),
      userId: userId,
      email: email
    };
    
    chat.messages.push(userMessage);
    chat.lastMessage = new Date();
    await chat.save();

    // Update user's chat session if registered
    if (userId) {
      await User.findByIdAndUpdate(userId, {
        chatSessionId: currentSessionId,
        isOnline: true,
        lastMessage: new Date()
      });
    }

    // Check for specific questions first
    const lowerMessage = message.toLowerCase();
    let reply = "";
    
    if (lowerMessage.includes("modules") || lowerMessage.includes("what are your modules") || lowerMessage.includes("services")) {
      reply = autoResponses.modules;
    } else if (lowerMessage.includes("demo") || lowerMessage.includes("demonstration") || lowerMessage.includes("show me")) {
      reply = autoResponses.demo;
    } else if (lowerMessage.includes("pricing") || lowerMessage.includes("cost") || lowerMessage.includes("price") || lowerMessage.includes("how much")) {
      reply = autoResponses.pricing;
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("email") || lowerMessage.includes("reach")) {
      reply = autoResponses.contact;
    } else if (lowerMessage.includes("features") || lowerMessage.includes("what features") || lowerMessage.includes("capabilities")) {
      reply = autoResponses.features;
    } else if (lowerMessage.includes("implementation") || lowerMessage.includes("setup") || lowerMessage.includes("installation")) {
      reply = autoResponses.implementation;
    } else if (lowerMessage.includes("support") || lowerMessage.includes("help") || lowerMessage.includes("technical")) {
      reply = autoResponses.support;
    } else if (lowerMessage.includes("integration") || lowerMessage.includes("integrate") || lowerMessage.includes("equipment")) {
      reply = autoResponses.integration;
    } else if (lowerMessage.includes("portal") || lowerMessage.includes("patient portal")) {
      reply = autoResponses.portal;
    } else if (lowerMessage.includes("mobile") || lowerMessage.includes("app") || lowerMessage.includes("application")) {
      reply = autoResponses.mobile;
    } else if (lowerMessage.includes("whatsapp") || lowerMessage.includes("whats app")) {
      reply = autoResponses.whatsapp;
    } else if (lowerMessage.includes("teleconsultation") || lowerMessage.includes("video") || lowerMessage.includes("consultation")) {
      reply = autoResponses.teleconsultation;
    } else {
      // Check if default message was already sent in this session
      const hasDefaultMessage = chat.messages.some(msg => 
        msg.from === "bot" && msg.text === autoResponses.default
      );
      
      // Only send the default message if it hasn't been sent yet in this session
      if (!hasDefaultMessage) {
        reply = autoResponses.default;
      }
    }

    // Add bot response if there is one
    if (reply) {
      const botMessage = {
        from: "bot",
        text: reply,
        timestamp: new Date()
      };
      
      chat.messages.push(botMessage);
      await chat.save();
    }

    res.json({ 
      reply,
      sessionId: currentSessionId,
      email: email,
      userId: userId
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get chat messages for a session
router.get("/chat/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const chat = await Chat.findOne({ sessionId });
    if (chat) {
      res.json({ messages: chat.messages });
    } else {
      res.json({ messages: [] });
    }
  } catch (error) {
    console.error('Error getting chat:', error);
    res.status(500).json({ error: 'Failed to get chat' });
  }
});



export default router;