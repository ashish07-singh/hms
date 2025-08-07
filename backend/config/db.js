// db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017';
    const dbName = process.env.DB_NAME || 'hms';
    
    await mongoose.connect(`${mongoURI}/${dbName}`);
    console.log('✅ MongoDB connected to database:', dbName);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectDB;
