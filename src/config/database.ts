// src/config/database.ts
import mongoose from 'mongoose';
import { config } from './config'; // Import configuration

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};
