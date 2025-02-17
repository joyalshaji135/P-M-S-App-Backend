// src/server.ts
import express from 'express';
import { config } from './config/config'; // Import configuration
import { connectToDatabase } from './config/database'; // Import database connection
import routes from './routes/index'; // Import routes

const app = express();
const PORT = config.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})

.on("error", (err: Error) => {
    // Specify the type for the error parameter
    console.error("Error starting server:", err);
});

// Connect to MongoDB
connectToDatabase();