// src/config/database.ts
import mongoose from 'mongoose';
import { config } from './config'; // Import configuration

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};
