# HabitVault Backend

This is the backend server for the HabitVault application.

## Environment Variables

Create a `.env` file in the root of the backend directory with the following variables:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/habitvault
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

- `PORT`: The port number on which the server will run
- `MONGODB_URI`: The MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `NODE_ENV`: Environment mode (development/production)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the required environment variables

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Habits
- GET `/api/habits` - Get all habits for the authenticated user
- POST `/api/habits` - Create a new habit
- PUT `/api/habits/:id/complete` - Update habit completion status
- DELETE `/api/habits/:id` - Delete a habit 