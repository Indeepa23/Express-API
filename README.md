# Express API

This API provides secure user authentication, authorization, and product management features.
It is designed as a modular backend foundation for scalable retail or inventory management systems, supporting modern best practices such as token-based authentication (JWT), input validation, and structured database access through Prisma.

## Features

- **User Management**
  - User registration with encrypted passwords
  - User login with JWT authentication
  - Get all users (protected route)

- **Product Management**
  - Create products (protected route)
  - Get all products (protected route)
  - Update products (protected route)

- **Security**
  - Password hashing with bcrypt
  - JWT-based authentication
  - Protected routes with authentication middleware

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: SQLite
- **ORM**: Prisma v6.17.1
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **Validation**: express-validator

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Express-API
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up the database

Create a `.env` file in the root directory and add your database URL:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev
```

This will create the SQLite database and apply the schema.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Start the server

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### User Routes

#### 1. Register a new user
- **URL**: `POST /user/register`
- **Authentication**: Not required
- **Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "yourpassword123"
}
```
- **Success Response**: `201 Created`
```json
{
  "message": "User registered successfully"
}
```
- **Error Responses**:
  - `422 Unprocessable Entity`: Missing required fields
  - `400 Bad Request`: Email already registered
  - `500 Internal Server Error`: Server error

#### 2. Login
- **URL**: `POST /user/loggin`
- **Authentication**: Not required
- **Request Body**:
```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword123"
}
```
- **Success Response**: `201 Created`
```json
{
  "message": "Logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
- **Error Responses**:
  - `422 Unprocessable Entity`: Missing required fields
  - `400 Bad Request`: Invalid credentials
  - `500 Internal Server Error`: Server error

#### 3. Get all users
- **URL**: `GET /user/`
- **Authentication**: Required (Bearer Token)
- **Headers**:
```
Authorization: Bearer <your-jwt-token>
```
- **Success Response**: `201 Created`
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "$2b$10$...",
    "createdAt": "2025-10-19T10:30:20.000Z"
  }
]
```
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing token
  - `500 Internal Server Error`: Server error

### Product Routes

#### 1. Create a product
- **URL**: `POST /product/create`
- **Authentication**: Required (Bearer Token)
- **Headers**:
```
Authorization: Bearer <your-jwt-token>
```
- **Request Body**:
```json
{
  "title": "Product Name",
  "description": "Product description",
  "price": 29.99
}
```
- **Success Response**: `201 Created`
```json
{
  "message": "Product Name is create successful"
}
```
- **Error Responses**:
  - `422 Unprocessable Entity`: Missing required fields
  - `401 Unauthorized`: Invalid or missing token
  - `500 Internal Server Error`: Server error

#### 2. Get all products
- **URL**: `GET /product/`
- **Authentication**: Required (Bearer Token)
- **Headers**:
```
Authorization: Bearer <your-jwt-token>
```
- **Success Response**: `201 Created`
```json
[
  {
    "id": 1,
    "title": "Product Name",
    "description": "Product description",
    "price": 29.99,
    "createdAt": "2025-10-19T10:30:20.000Z"
  }
]
```
- **Error Responses**:
  - `401 Unauthorized`: Invalid or missing token
  - `500 Internal Server Error`: Server error

#### 3. Update a product
- **URL**: `POST /product/:id`
- **Authentication**: Required (Bearer Token)
- **Headers**:
```
Authorization: Bearer <your-jwt-token>
```
- **Request Body** (all fields optional):
```json
{
  "title": "Updated Product Name",
  "description": "Updated description",
  "price": 39.99
}
```
- **Success Response**: `200 OK`
```json
{
  "message": "update successfule",
  "updated": {
    "id": 1,
    "title": "Updated Product Name",
    "description": "Updated description",
    "price": 39.99,
    "createdAt": "2025-10-19T10:30:20.000Z"
  }
}
```
- **Error Responses**:
  - `404 Not Found`: Product not found
  - `401 Unauthorized`: Invalid or missing token
  - `500 Internal Server Error`: Server error

## Testing with cURL

### Register a user
```bash
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d "{\"firstName\":\"John\",\"lastName\":\"Doe\",\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

### Login
```bash
curl -X POST http://localhost:3000/user/loggin \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

### Create a product (replace TOKEN with your JWT)
```bash
curl -X POST http://localhost:3000/product/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d "{\"title\":\"Laptop\",\"description\":\"Gaming laptop\",\"price\":999.99}"
```

### Get all products
```bash
curl -X GET http://localhost:3000/product/ \
  -H "Authorization: Bearer TOKEN"
```

## Testing with Postman

1. **Register a user**: Send a POST request to `http://localhost:3000/user/register` with the registration data
2. **Login**: Send a POST request to `http://localhost:3000/user/loggin` and copy the token from the response
3. **Set Authorization**: For protected routes, go to the "Authorization" tab, select "Bearer Token", and paste your JWT token
4. **Test other endpoints**: Use the token to access protected routes

## Database Schema

### User Model
```prisma
model User {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
}
```

### Product Model
```prisma
model Product {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  price       Float
  createdAt   DateTime @default(now())
}
```

## Project Structure

```
express-api/
├── controllers/
│   ├── productController.js    # Product CRUD operations
│   └── userController.js        # User authentication & management
├── middleware/
│   └── auth.js                  # JWT authentication middleware
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── routes/
│   ├── productRoute.js          # Product routes
│   └── userRoute.js             # User routes
├── server.js                    # Application entry point
├── package.json                 # Dependencies and scripts
└── README.md                    # Project documentation
```

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="file:./dev.db"
```

## Development

To run the server in development mode with auto-reload:

```bash
npm start
```

This uses nodemon to automatically restart the server when file changes are detected.

## Prisma Studio

To view and edit your database with a visual interface:

```bash
npx prisma studio
```

This will open Prisma Studio in your browser at `http://localhost:5555`

## Security Notes

⚠️ **Important**: This is a development/learning project. For production use:

1. Store the JWT secret in environment variables (not hardcoded)
2. Use HTTPS in production
3. Implement rate limiting
4. Add input validation and sanitization
5. Use stronger JWT secrets
6. Implement refresh tokens
7. Add proper error logging
8. Use production-grade database (PostgreSQL, MySQL, etc.)

## License

ISC

## Author

Your Name

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Troubleshooting

### Database connection issues
- Make sure the `.env` file exists with the correct `DATABASE_URL`
- Run `npx prisma generate` to regenerate the Prisma Client

### Authentication errors
- Verify the JWT token is included in the Authorization header
- Check that the token hasn't expired (tokens expire after 1 hour)

### Port already in use
- Change the port in `server.js` or kill the process using port 3000
