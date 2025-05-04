# HabitVault 🚀

A modern, full-stack habit tracking application that helps users build and maintain positive habits through daily tracking, streaks, and progress visualization.

![HabitVault Logo](https://img.icons8.com/color/48/000000/checklist.png)

## 🌟 Features

- **User Authentication**
  - Secure login and registration
  - JWT-based authentication
  - Protected routes

- **Habit Management**
  - Create and customize habits
  - Set target days for each habit
  - Track daily progress
  - View completion history
  - Calculate streaks and statistics

- **User Experience**
  - Clean and intuitive interface
  - Real-time updates
  - Responsive design
  - Loading states and error handling
  - Smooth navigation

## 🛠 Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API calls
- Bootstrap for UI components
- Font Awesome for icons

### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication
- RESTful API architecture

## 📦 Project Structure

```
habitvault/
├── client/               # React frontend
│   ├── public/          # Static files
│   ├── src/            
│   │   ├── components/  # React components
│   │   │   ├── auth/    # Authentication components
│   │   │   ├── dashboard/ # Dashboard components
│   │   │   ├── layout/  # Layout components
│   │   │   └── common/  # Shared components
│   │   ├── context/    # Context providers
│   │   ├── config/     # Configuration files
│   │   └── App.js      # Main App component
│   └── package.json    # Frontend dependencies
│
├── backend/             # Express.js backend
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── server.js      # Express server
│   └── package.json   # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/habitvault.git
cd habitvault
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Install frontend dependencies:
```bash
cd ../client
npm install
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd client
npm start
```

The application will be available at `http://localhost:3000`

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Starts server with nodemon for auto-reload
```

### Frontend Development
```bash
cd client
npm start    # Starts development server
```

## 📝 API Documentation

The backend API provides the following endpoints:

- **Authentication**
  - POST `/api/auth/register` - Register a new user
  - POST `/api/auth/login` - Login user
  - POST `/api/auth/logout` - Logout user

- **Habits**
  - GET `/api/habits` - Get all habits
  - POST `/api/habits` - Create a new habit
  - PUT `/api/habits/:id` - Update a habit
  - DELETE `/api/habits/:id` - Delete a habit
  - PUT `/api/habits/:id/complete` - Mark habit as completed/missed

## 🚀 Deployment

### Backend Deployment
1. Build the application:
```bash
cd backend
npm run build
```

2. Deploy to your preferred hosting service (e.g., Heroku, DigitalOcean)

### Frontend Deployment
1. Build the React application:
```bash
cd client
npm run build
```

2. Deploy the `build` folder to a static hosting service (e.g., Netlify, Vercel)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) for UI components
- [Font Awesome](https://fontawesome.com/) for icons
- [React](https://reactjs.org/) for the frontend framework
- [Express](https://expressjs.com/) for the backend framework 