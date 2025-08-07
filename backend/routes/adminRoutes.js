import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Chat from "../models/Chat.js";
import { adminAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Test route to check if admin routes are working
router.get("/test", (req, res) => {
  res.json({ message: "Admin routes are working!" });
});

// Admin signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ 
      $or: [{ email }, { username }] 
    });

    if (existingAdmin) {
      return res.status(400).json({ 
        error: "Admin with this email or username already exists" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const admin = new Admin({
      username,
      email,
      password: hashedPassword
    });

    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "Admin created successfully",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error("Admin signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Admin login
router.post("/login", async (req, res) => {
  try {
    console.log("Admin login attempt:", req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found for email:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      console.log("Invalid password for admin:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin._id, role: "admin" },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );

    console.log("Admin login successful:", email);
    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get admin profile
router.get("/profile", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    const admin = await Admin.findById(decoded.adminId).select("-password");
    
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json({ admin });
  } catch (err) {
    console.error("Get admin profile error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
});

// Get all chats for admin
router.get("/chats", adminAuth, async (req, res) => {
  try {
    const chats = await Chat.find({})
      .populate('userId', 'name email phone')
      .sort({ lastMessage: -1 });
    
    res.json({ chats });
  } catch (error) {
    console.error('Error getting chats:', error);
    res.status(500).json({ error: 'Failed to get chats' });
  }
});

// Get chat messages for admin
router.get("/chat/:sessionId", adminAuth, async (req, res) => {
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

// Admin send reply
router.post("/reply", adminAuth, async (req, res) => {
  try {
    const { sessionId, reply } = req.body;
    
    if (!sessionId || !reply) {
      return res.status(400).json({ error: "Session ID and reply are required" });
    }

    const chat = await Chat.findOne({ sessionId });
    if (!chat) {
      return res.status(404).json({ error: "Chat session not found" });
    }

    // Add admin message
    const adminMessage = {
      from: "admin",
      text: reply,
      timestamp: new Date()
    };
    
    chat.messages.push(adminMessage);
    chat.lastMessage = new Date();
    await chat.save();

    // Update user's unread count if registered
    if (chat.userId) {
      await User.findByIdAndUpdate(chat.userId, {
        $inc: { unreadMessages: 1 }
      });
    }

    res.json({ 
      success: true, 
      message: "Reply sent successfully"
    });
  } catch (error) {
    console.error('Error sending admin reply:', error);
    res.status(500).json({ error: 'Failed to send reply' });
  }
});

// Get all users for admin
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({}).select('name email phone isOnline lastMessage unreadMessages chatSessionId');
    res.json({ users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

export default router; 