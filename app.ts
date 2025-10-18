// src/server.ts
import express, { Application } from 'express';
import { config } from './src/config/config'; // Import configuration
import { connectToDatabase } from './src/config/database'; // Import database connection
import routes from './src/routes/index'; // Import routes
import http from 'http';
import expressApp from './app.config';
import { defaultAdminServices } from '@src/service/defaultAdminCreation';

const app = http.createServer(expressApp);

// Default Admin Creating Function

// Connect to MongoDB
const startApp = async () => {
  try {
    await connectToDatabase();
    console.log('✅ Database connection established successfully.');

    // Create default admin if not exists
    await defaultAdminServices();
    console.log('✅ Default admin check/creation completed.');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Exit the process if the connection fails
  }
};

startApp();

export default app;
