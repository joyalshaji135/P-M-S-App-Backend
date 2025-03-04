// src/server.ts
import express, { Application } from 'express';
import { config } from './src/config/config'; // Import configuration
import { connectToDatabase } from './src/config/database'; // Import database connection
import routes from './src/routes/index'; // Import routes
import http from 'http';
import expressApp from './app.config';

const app = http.createServer(expressApp);

// Default Admin Creating Function

// Connect to MongoDB
connectToDatabase();

export default app;

