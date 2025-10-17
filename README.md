# Project Management System - Backend

A robust backend API for a project management system built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

- RESTful API architecture
- JWT-based authentication
- MongoDB database integration
- Secure environment configuration
- CORS enabled for client communication

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Git

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **dotenv** - Environment variable management

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-management-system/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   APP_NAME=project-management-system
   NODE_ENV=dev
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.7stuzzk.mongodb.net/
   DB_NAME=project-management-system
   JWT_SECRET=<your-secure-jwt-secret>
   API_KEY=<your-secure-api-key>
   CLIENT_API=http://localhost:5173
   ```

   **Important:** Replace the placeholder values with your actual credentials.

4. **Start the server**
   
   Development mode:
   ```bash
   npm run dev
   ```
   
   Production mode:
   ```bash
   npm start
   ```

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js  # Authentication logic
│   ├── projectController.js
│   └── userController.js
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
├── routes/
│   ├── authRoutes.js
│   ├── projectRoutes.js
│   └── userRoutes.js
├── middleware/
│   ├── auth.js            # JWT verification
│   └── errorHandler.js
├── utils/
│   └── helpers.js
├── .env                   # Environment variables
├── .gitignore
├── server.js              # Entry point
└── package.json
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register  - Register new user
POST   /api/auth/login     - Login user
GET    /api/auth/me        - Get current user
```

### Projects
```
GET    /api/projects       - Get all projects
POST   /api/projects       - Create new project
GET    /api/projects/:id   - Get project by ID
PUT    /api/projects/:id   - Update project
DELETE /api/projects/:id   - Delete project
```

### Tasks
```
GET    /api/tasks          - Get all tasks
POST   /api/tasks          - Create new task
GET    /api/tasks/:id      - Get task by ID
PUT    /api/tasks/:id      - Update task
DELETE /api/tasks/:id      - Delete task
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `APP_NAME` | Application name | project-management-system |
| `NODE_ENV` | Environment mode | dev/production |
| `PORT` | Server port | 3000 |
| `MONGO_URI` | MongoDB connection string | mongodb+srv://... |
| `DB_NAME` | Database name | project-management-system |
| `JWT_SECRET` | Secret key for JWT | your-secret-key |
| `API_KEY` | API authentication key | your-api-key |
| `CLIENT_API` | Frontend URL | http://localhost:5173 |

## 🧪 Testing

Run tests with:
```bash
npm test
```

## 📦 Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "jsonwebtoken": "^9.0.0",
    "bcryptjs": "^2.4.3",
    "dotenv": "^16.0.3",
    "cors": "^2.8.5",
    "express-validator": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```

## 🚦 Running Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint
```

## 🔒 Security Notes

- Never commit `.env` file to version control
- Always use strong JWT secrets and API keys
- Implement rate limiting for production
- Use HTTPS in production
- Regularly update dependencies

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB documentation
- JWT.io
- All contributors who helped with the project
