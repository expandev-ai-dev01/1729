# NoteBox Backend API

Backend API for NoteBox - A lightweight application for quick note-taking with search and tag categorization.

## Features

- RESTful API architecture
- TypeScript for type safety
- Express.js framework
- Multi-tenancy support
- Comprehensive error handling
- API versioning

## Prerequisites

- Node.js 18+ 
- SQL Server database
- npm or yarn

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Configure your .env file with database credentials
```

## Development

```bash
# Run in development mode with hot reload
npm run dev
```

## Build

```bash
# Build for production
npm run build
```

## Production

```bash
# Start production server
npm start
```

## Project Structure

```
src/
├── api/              # API controllers
├── routes/           # Route definitions
├── middleware/       # Express middleware
├── services/         # Business logic
├── utils/            # Utility functions
├── config/           # Configuration
└── server.ts         # Application entry point
```

## API Endpoints

API endpoints will be available at:
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.yourdomain.com/api/v1`

### Health Check
- `GET /health` - API health status

## Environment Variables

See `.env.example` for all available configuration options.

## License

ISC
