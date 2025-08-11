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

// Get all chats for admin with pagination and filtering
router.get("/chats", adminAuth, async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status = 'all', 
      priority = 'all',
      search = '' 
    } = req.query;
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Build filter query
    let filter = {};
    
    // Filter by status
    if (status !== 'all') {
      if (status === 'active') {
        filter.status = { $in: ['new', 'in-progress'] };
      } else {
        filter.status = status;
      }
    }
    
    // Filter by priority
    if (priority !== 'all') {
      filter.priority = priority;
    }
    
    // Search functionality
    if (search) {
      filter.$or = [
        { userEmail: { $regex: search, $options: 'i' } },
        { 'messages.text': { $regex: search, $options: 'i' } }
      ];
    }
    
    const chats = await Chat.find(filter)
      .populate('userId', 'name email phone')
      .populate('assignedAdmin', 'username email')
      .sort({ lastMessage: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Chat.countDocuments(filter);
    
    res.json({ 
      chats,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: total,
        limit: parseInt(limit)
      }
    });
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
      // Mark chat as read when admin views it
      if (chat.unreadCount > 0) {
        chat.unreadCount = 0;
        await chat.save();
      }
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
    
    // Set status to in-progress if it was new
    if (chat.status === 'new') {
      chat.status = 'in-progress';
    }
    
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

// Get all users for admin with pagination
router.get("/users", adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 50, search = '' } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    let filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    const users = await User.find(filter)
      .select('name email phone createdAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await User.countDocuments(filter);
    
    res.json({ 
      users,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / parseInt(limit)),
        count: total,
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Update chat status
router.patch("/chat/:sessionId/status", adminAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { status, priority, assignedAdmin } = req.body;
    
    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;
    if (assignedAdmin) updateData.assignedAdmin = assignedAdmin;
    
    const chat = await Chat.findOneAndUpdate(
      { sessionId },
      updateData,
      { new: true }
    );
    
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    
    res.json({ success: true, chat });
  } catch (error) {
    console.error('Error updating chat:', error);
    res.status(500).json({ error: 'Failed to update chat' });
  }
});

// Archive/Delete chat
router.delete("/chat/:sessionId", adminAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { action = 'archive' } = req.body;
    
    if (action === 'delete') {
      await Chat.findOneAndDelete({ sessionId });
    } else {
      await Chat.findOneAndUpdate(
        { sessionId },
        { status: 'archived', isActive: false }
      );
    }
    
    res.json({ success: true, message: `Chat ${action}d successfully` });
  } catch (error) {
    console.error('Error managing chat:', error);
    res.status(500).json({ error: 'Failed to manage chat' });
  }
});

// Get chat statistics
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const stats = await Promise.all([
      Chat.countDocuments({ status: 'new' }),
      Chat.countDocuments({ status: 'in-progress' }),
      Chat.countDocuments({ status: 'resolved' }),
      Chat.countDocuments({ status: 'archived' }),
      Chat.countDocuments({ priority: 'high' }),
      Chat.countDocuments({ unreadCount: { $gt: 0 } }),
      User.countDocuments({})
    ]);
    
    res.json({
      newChats: stats[0],
      inProgressChats: stats[1],
      resolvedChats: stats[2],
      archivedChats: stats[3],
      highPriorityChats: stats[4],
      unreadChats: stats[5],
      totalUsers: stats[6]
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get stats' });
  }
});

export default router; 