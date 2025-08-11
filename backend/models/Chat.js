import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    enum: ['user', 'admin', 'bot']
  },
  text: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  email: {
    type: String,
    required: false
  }
});

const chatSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  userEmail: {
    type: String,
    required: false
  },
  messages: [messageSchema],
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'archived'],
    default: 'new'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastMessage: {
    type: Date,
    default: Date.now
  },
  assignedAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [{
    type: String
  }],
  unreadCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export default mongoose.model("Chat", chatSchema); 