import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false, // Made optional
    },
    // Chat-related fields
    chatSessionId: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: Date,
      default: null,
    },
    unreadMessages: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
