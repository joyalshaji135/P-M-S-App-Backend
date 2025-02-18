// src/server.ts
import express, { Application } from 'express';
import { config } from './src/config/config'; // Import configuration
import { connectToDatabase } from './src/config/database'; // Import database connection
import routes from './src/routes/index'; // Import routes


const app: Application = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

app.use('/api', routes);


// Default Admin Creating Function

// Connect to MongoDB
connectToDatabase();

export default app;
