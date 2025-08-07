import express from "express";
import User from "../models/User.js";
import Chat from "../models/Chat.js";

const router = express.Router();

// Simple auto-responses for common queries
const autoResponses = {
  "appointment": "I can help you book an appointment. What type of appointment do you need?",
  "billing": "I can assist with billing questions. What specific billing issue do you have?",
  "emergency": "For emergencies, please call 911 immediately or visit our emergency department.",
  "hours": "Our visiting hours are 10 AM to 8 PM. Emergency services are 24/7.",
  "contact": "You can reach us at +1-555-0123 or email info@hospital.com",
  "insurance": "We accept most major insurance providers. Please bring your insurance card.",
  "pharmacy": "Our pharmacy is open Monday to Friday, 8 AM to 8 PM.",
  "lab": "Lab services are available Monday to Friday, 7 AM to 6 PM.",
  "covid": "COVID-19 testing is available. Please call 9876543210 to schedule.",
  "services": "We offer a wide range of services including general medicine, surgery, pediatrics, gynecology, orthopedics, neurology, emergency care, laboratory services, and pharmacy. What specific service are you interested in?",
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
    
    if (lowerMessage.includes("what are your services") || lowerMessage.includes("services")) {
      reply = autoResponses.services;
    } else if (lowerMessage.includes("appointment") || lowerMessage.includes("book")) {
      reply = autoResponses.appointment;
    } else if (lowerMessage.includes("billing") || lowerMessage.includes("payment")) {
      reply = autoResponses.billing;
    } else if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent")) {
      reply = autoResponses.emergency;
    } else if (lowerMessage.includes("hours") || lowerMessage.includes("visit")) {
      reply = autoResponses.hours;
    } else if (lowerMessage.includes("contact") || lowerMessage.includes("phone")) {
      reply = autoResponses.contact;
    } else if (lowerMessage.includes("insurance")) {
      reply = autoResponses.insurance;
    } else if (lowerMessage.includes("pharmacy") || lowerMessage.includes("medicine")) {
      reply = autoResponses.pharmacy;
    } else if (lowerMessage.includes("lab") || lowerMessage.includes("test")) {
      reply = autoResponses.lab;
    } else if (lowerMessage.includes("covid")) {
      reply = autoResponses.covid;
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