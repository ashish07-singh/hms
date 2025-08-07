import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import contactrouter from './routes/contactRoutes.js';
import authroutes from './routes/authRoutes.js';
import chatbotRoutes from "./routes/chatbotRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// ✅ CORS middleware - Allow both ports
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN || 'http://localhost:5173', 'http://localhost:5174'], // Allow both ports
    credentials: true,
  })
);
// ✅ JSON & URL-encoded body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use('/api/auth', authroutes);
app.use('/api/contact', contactrouter);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/admin", adminRoutes);

// Serve admin interface
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get("/", (req, res) => {
  res.send("API Working")
});

// ✅ DB Connection and Server Start
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
