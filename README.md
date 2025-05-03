# HabitVault

A modern habit tracking application that helps users build and maintain positive habits.

## Project Structure

```
habitvault/
├── backend/               # Express.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── server.js        # Express server
│   └── package.json     # Backend dependencies
│
├── client/               # React frontend
│   ├── public/          # Static files
│   ├── src/             # React source code
│   │   ├── components/  # React components
│   │   ├── context/    # Context providers
│   │   └── App.js      # Main App component
│   └── package.json    # Frontend dependencies
│
└── README.md            # Project documentation
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the required environment variables (see backend/README.md)

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Deployment

The frontend and backend can be deployed separately:

### Backend Deployment
- Deploy the backend to a Node.js hosting service (e.g., Heroku, DigitalOcean)
- Set up environment variables in the hosting platform
- Configure MongoDB connection

### Frontend Deployment
- Build the React application:
```bash
cd client
npm run build
```
- Deploy the build folder to a static hosting service (e.g., Netlify, Vercel)
- Configure the API endpoint in the frontend environment variables

## API Documentation

See [backend/README.md](backend/README.md) for detailed API documentation. 