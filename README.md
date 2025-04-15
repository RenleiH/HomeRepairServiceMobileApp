# Home Repair Service Platform

A modern platform connecting homeowners with repair service providers. Built with a client-server architecture, providing an intuitive user interface and smart customer service features.

## Features

### User Features 🏠

- Create repair service requests
- Real-time order tracking
- View order history
- Rating and feedback system
- AI Smart Assistant
  - 24/7 automated responses
  - Smart problem diagnosis
  - Repair suggestions
  - Service booking guidance

### Technical Features

- Client-server architecture
- Local data persistence
- AI chat integration
- RESTful API design
- Responsive UI design

## Project Structure

```
.
├── frontend/          # React frontend application
│   ├── public/       # Static assets
│   ├── src/         
│   │   ├── components/  # React components
│   │   ├── services/   # API services
│   │   └── styles/     # Style files
│   └── package.json
│
└── backend/           # Node.js backend application
    ├── src/
    │   ├── routes/     # API routes
    │   ├── services/   # Business services
    │   └── index.js    # Entry point
    ├── data/          # Local data storage
    └── package.json
```

## Quick Start

### Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0

### Installation and Running

1. Clone the project
   ```bash
   git clone [repository-url]
   cd HomeRepairServiceMobileApp
   ```

2. Install dependencies and start
   ```bash
   # Using start script
   chmod +x start.sh
   ./start.sh
   ```

   Or manually:

   ```bash
   # Backend
   cd backend
   npm install
   npm run dev

   # New terminal, start frontend
   cd frontend
   npm install
   npm start
   ```

### Configuration

1. Backend configuration (backend/.env)
   ```
   PORT=5001
   DEEPSEEK_API_KEY=your_api_key
   ```

2. Frontend configuration (frontend/.env)
   ```
   REACT_APP_API_BASE_URL=http://localhost:5001/api
   ```

## API Documentation

### AI Assistant Endpoints

- Send message
  ```
  POST /api/ai/chat
  Body: { "message": "question description" }
  ```

### Feedback Endpoints

- Submit feedback
  ```
  POST /api/feedback
  Body: {
    "userType": "homeowner",
    "userId": "user_id",
    "content": "feedback content",
    "rating": 5
  }
  ```

- Get user feedback
  ```
  GET /api/feedback/user/:userType/:userId
  ```

- Get all feedback
  ```
  GET /api/feedback
  ```

## Data Storage

The project uses local file system for data storage:

- Feedback data: `backend/data/feedback.json`
- Example format:
  ```json
  [
    {
      "id": "1234567890",
      "userType": "homeowner",
      "userId": "user123",
      "content": "Great service!",
      "rating": 5,
      "createdAt": "2024-03-20T12:00:00.000Z"
    }
  ]
  ```

## Development Guide

### Adding New Features

1. Add new service in `backend/src/services`
2. Add corresponding route in `backend/src/routes`
3. Add API call in `frontend/src/services`
4. Add UI component in `frontend/src/components`

### Debugging

- Frontend dev server: http://localhost:3000
- Backend API server: http://localhost:5001
- API testing: Use Postman or browser dev tools

## Important Notes

1. Ensure correct configuration in `.env` files
2. Local data is stored in `backend/data` directory
3. AI service requires valid API key

## Contributing

1. Fork the project
2. Create feature branch
3. Commit changes
4. Submit Pull Request

## License

MIT License - See LICENSE file for details
