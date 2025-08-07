import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import User from "../models/User.js";

export const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.user = decoded; // You can access user data in route with req.user

    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// Admin authentication middleware
export const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, admin token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    
    // Check if it's an admin token or user token for webarclight.com emails
    if (decoded.adminId && decoded.role === "admin") {
      // Verify admin exists
      const admin = await Admin.findById(decoded.adminId).select("-password");
      if (!admin) {
        return res.status(401).json({ message: "Admin not found" });
      }
      req.admin = admin;
    } else if (decoded.id) {
      // Check if user has webarclight.com email
      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
      
      // Allow access if user has webarclight.com email
      if (user.email && user.email.endsWith('@webarclight.com')) {
        req.admin = {
          _id: user._id,
          username: user.name,
          email: user.email,
          role: 'admin'
        };
      } else {
        return res.status(401).json({ message: "Not authorized, admin access required" });
      }
    } else {
      return res.status(401).json({ message: "Not authorized, admin access required" });
    }

    next();
  } catch (error) {
    console.error("Admin auth error:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid admin token" });
  }
};
