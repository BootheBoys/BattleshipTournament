# Battleship Tournament API Documentation

## Authentication Endpoints

### POST /api/auth/login
Authenticate a user and receive a JWT token.

// Request
{
  "email": "admiral@example.com",
  "password": "your_password"
}

// Response
{
  "token": "eyJhbGciOiJ...",
  "user": {
    "id": "user_id",
    "email": "admiral@example.com",
    "username": "Admiral"
  }
}

### POST /api/auth/register
Create a new user account.

// Request
{
  "email": "admiral@example.com",
  "password": "your_password",
  "username": "Admiral"
}

// Response
{
  "message": "User created successfully",
  "userId": "user_id"
}

## Profile Management

### GET /api/profile
Get the current user's profile. Requires authentication token.

// Response
{
  "id": "user_id",
  "username": "Admiral",
  "email": "admiral@example.com",
  "stats": {
    "gamesPlayed": 10,
    "gamesWon": 7,
    "winRate": 0.7
  },
  "createdAt": "2024-02-20T..."
}

### PUT /api/profile
Update user profile information. Requires authentication token.

// Request
{
  "username": "Admiral Supreme",
  "avatar": "avatar_url"
}

// Response
{
  "message": "Profile updated successfully",
  "profile": {
    "username": "Admiral Supreme",
    "avatar": "avatar_url"
    // ... other profile fields
  }
}

## Game History

### GET /api/games
Get user's game history. Requires authentication token.

// Response
{
  "games": [
    {
      "id": "game_id",
      "opponent": "OpponentUsername",
      "result": "win",
      "score": 100,
      "playedAt": "2024-02-20T..."
    }
    // ... more games
  ],
  "pagination": {
    "page": 1,
    "totalPages": 5,
    "totalGames": 48
  }
}

## Authentication

All protected endpoints require a JWT token in the Authorization header:

Authorization: Bearer your_jwt_token

## Error Responses

The API returns standard HTTP status codes and JSON error messages:

{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {} // Optional additional error details
}

Common status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Environment Variables

Create a .env file with the following variables:

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=24h

# Database
DATABASE_URL=your_database_url

# Optional: OAuth Providers
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

## Development Setup

1. Install dependencies:
npm install

2. Set up environment variables:
cp .env.example .env
# Edit .env with your values

3. Start the development server:
npm run dev

## Making API Requests

Example using fetch:

// Login
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json();
  return data;
};

// Update Profile (authenticated request)
const updateProfile = async (token, profileData) => {
  const response = await fetch('/api/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  
  const data = await response.json();
  return data;
};

## Rate Limiting

API endpoints are rate-limited to prevent abuse:
- Authentication endpoints: 5 requests per minute
- Profile endpoints: 30 requests per minute
- Game endpoints: 60 requests per minute

## Websocket Events

For real-time game updates, connect to the WebSocket server:

const socket = new WebSocket('ws://your-server/game');

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  // Handle different event types
  switch(data.type) {
    case 'GAME_START':
      // Handle game start
      break;
    case 'MOVE':
      // Handle opponent's move
      break;
    case 'GAME_END':
      // Handle game end
      break;
  }
};
