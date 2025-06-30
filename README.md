# Simple API

A lightweight, TypeScript-based RESTful API with user authentication and management capabilities.

## Description

Simple API is a backend service built with modern TypeScript and Express.js, featuring a clean architecture with dependency injection. It provides user registration, authentication, and profile management functionality with JWT-based security.

## Technologies Used

- **TypeScript**: Strongly-typed JavaScript for better developer experience and code quality
- **Express.js**: Web framework for handling HTTP requests
- **Prisma ORM**: Next-generation ORM for database access with type safety
- **SQLite**: Lightweight database for development (can be replaced with other databases in production)
- **Inversify**: Dependency injection container for TypeScript
- **JWT (JSON Web Tokens)**: For secure authentication
- **class-validator & class-transformer**: For request validation
- **bcryptjs**: For password hashing
- **tslog**: For structured logging
- **dotenv**: For environment variable management

## Project Structure

```
simple-api/
├── prisma/                  # Database schema and migrations
├── src/
│   ├── common/              # Shared utilities and middleware
│   ├── config/              # Application configuration
│   ├── database/            # Database connection and services
│   ├── errors/              # Error handling
│   ├── generated/           # Auto-generated files (Prisma)
│   ├── logger/              # Logging functionality
│   ├── types/               # TypeScript type definitions
│   ├── users/               # User-related functionality
│   ├── app.ts               # Express application setup
│   ├── main.ts              # Application entry point
│   └── types.ts             # Dependency injection types
├── package.json             # Project dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## Features

- **User Management**:
  - User registration with validation
  - User authentication with JWT
  - Protected user profile access
- **Security**:
  - Password hashing
  - JWT-based authentication
  - Request validation
- **Architecture**:
  - Clean architecture with separation of concerns
  - Dependency injection for better testability
  - Interface-based design for flexibility
- **Developer Experience**:
  - TypeScript for type safety
  - ESLint and Prettier for code quality
  - Nodemon for development hot-reloading

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/simple-api.git
   cd simple-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Generate Prisma client:
   ```bash
   npm run generate
   ```

4. Create a `.env` file in the root directory with the following content:
   ```
   SECRET=your_jwt_secret_key
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Management

- **POST /users/register**
  - Register a new user
  - Request body: `{ "email": "user@example.com", "password": "password", "name": "User Name" }`
  - Response: `{ "email": "user@example.com", "id": 1 }`

- **POST /users/login**
  - Authenticate a user
  - Request body: `{ "email": "user@example.com", "password": "password" }`
  - Response: `{ "jwt": "token" }`

- **GET /users/info**
  - Get user information (requires authentication)
  - Headers: `Authorization: Bearer token`
  - Response: `{ "email": "user@example.com", "id": "User Name" }`

## Configuration

The application uses environment variables for configuration:
- `SECRET`: JWT secret key for token signing and verification

## Scripts

- `npm start`: Start the production server
- `npm run dev`: Start the development server with hot-reloading
- `npm run build`: Build the TypeScript code
- `npm run lint`: Run ESLint
- `npm run lint:fix`: Run ESLint with auto-fix
- `npm run generate`: Generate Prisma client

## License

[MIT](https://choosealicense.com/licenses/mit/)