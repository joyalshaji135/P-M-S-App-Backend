# Project Management System

A full-stack project management application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 📋 Overview

This Project Management System provides a comprehensive solution for managing projects, tasks, team members, and workflows. Built with modern web technologies, it offers a robust and scalable platform for project collaboration.

## 🚀 Features

- **User Authentication & Authorization** - Secure JWT-based authentication
- **Project Management** - Create, update, and manage multiple projects
- **Task Tracking** - Assign and track tasks with status updates
- **Team Collaboration** - Manage team members and roles
- **Dashboard Analytics** - Visual insights into project progress
- **Real-time Updates** - Stay synchronized with project changes

## 🛠️ Tech Stack

### Frontend
- **React** - UI library for building interactive interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB installation
- npm or yarn package manager

### Clone the Repository
```bash
git clone <your-repository-url>
cd project-management-system
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend root directory:
```env
APP_NAME=project-management-system
NODE_ENV=dev
PORT=3000
MONGO_URI=your_mongodb_connection_string
DB_NAME=project-management-system
JWT_SECRET=your_jwt_secret_key
API_KEY=your_api_key
CLIENT_API=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend root directory:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

## 🌐 Environment Variables

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `APP_NAME` | Application name |
| `NODE_ENV` | Environment (dev/production) |
| `PORT` | Backend server port |
| `MONGO_URI` | MongoDB connection string |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Secret key for JWT token generation |
| `API_KEY` | API authentication key |
| `CLIENT_API` | Frontend URL for CORS |

### Frontend (.env)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API base URL |

## 📁 Project Structure

```
project-management-system/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔐 Security Notes

⚠️ **Important**: The current configuration includes sensitive credentials. Before deploying to production:

1. **Remove hardcoded credentials** from version control
2. **Generate new secrets** for JWT and API keys
3. **Use environment-specific** .env files
4. **Enable MongoDB IP whitelist** for production
5. **Implement rate limiting** and input validation
6. **Use HTTPS** in production
7. **Add helmet.js** for security headers

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set all environment variables in your hosting platform
2. Ensure MongoDB Atlas is configured with proper IP whitelist
3. Update `CLIENT_API` to your production frontend URL
4. Deploy the backend directory

### Frontend Deployment (Vercel/Netlify)
1. Update `VITE_API_URL` to your production backend URL
2. Build the production bundle
3. Deploy the `dist` folder

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

Your Name - Your Email

## 🐛 Known Issues

- None currently reported

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

## 🔄 Changelog

### Version 1.0.0
- Initial release
- Basic project and task management functionality
- User authentication and authorization
- Dashboard with analytics
