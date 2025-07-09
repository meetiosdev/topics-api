# Topics API

A RESTful API for managing topics and posts built with Node.js, Express, and MongoDB. This project follows clean architecture principles, SOLID design patterns, and includes comprehensive documentation.

## 🚀 Features

- **RESTful API** with proper HTTP status codes
- **MongoDB** with Mongoose ODM
- **Layered Architecture** (Controllers, Services, Models)
- **Input Validation** with express-validator
- **API Documentation** with Swagger/OpenAPI
- **Structured Logging** with Winston
- **Error Handling** with global error middleware
- **Rate Limiting** for API protection
- **Security** with Helmet and CORS
- **Code Quality** with ESLint and Prettier
- **Testing** setup with Jest
- **Pagination** support for large datasets
- **UUID** based identifiers

## 📋 Prerequisites

- Node.js >= 18.0.0
- MongoDB Atlas account
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/topics-api.git
   cd topics-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=your_mongodb_atlas_connection_string
   LOG_LEVEL=info
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

Once the server is running, visit:
- **API Documentation**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/api/health

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start with nodemon
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues
npm run format      # Format with Prettier

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode

# Database
npm run seed        # Seed database with sample data

# Documentation
npm run docs        # Generate Swagger docs
```

## 🏗️ Project Structure

```
topicsApi/
├── config/                 # Configuration files
│   ├── database.js        # MongoDB connection
│   ├── logger.js          # Winston logger setup
│   └── swagger.js         # Swagger documentation
├── controllers/           # Request handlers
│   └── topicController.js
├── middlewares/          # Custom middleware
│   ├── errorHandler.js   # Global error handling
│   ├── requestLogger.js  # Request logging
│   └── validation.js     # Input validation
├── models/               # Mongoose models
│   ├── Topic.js
│   └── Post.js
├── routes/               # Express routes
│   ├── topics.js
│   └── system.js
├── services/             # Business logic layer
│   └── topicService.js
├── seed/                 # Database seeding
│   └── seedData.js
├── logs/                 # Log files (auto-created)
├── app.js               # Main application file
└── package.json
```

## 🔌 API Endpoints

### Topics

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/topics` | Get all topics with pagination |
| GET | `/api/topics/:topicId` | Get specific topic |
| GET | `/api/topics/:topicId/posts` | Get posts for a topic |

### System

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/seed` | Seed database |

## 📖 Usage Examples

### Get Topics with Pagination
```bash
curl "http://localhost:3000/api/topics?page=1&limit=10"
```

### Get Specific Topic
```bash
curl "http://localhost:3000/api/topics/123e4567-e89b-12d3-a456-426614174000"
```

### Get Posts for Topic
```bash
curl "http://localhost:3000/api/topics/123e4567-e89b-12d3-a456-426614174000/posts"
```

### Health Check
```bash
curl "http://localhost:3000/api/health"
```

### Seed Database
```bash
curl -X POST "http://localhost:3000/api/seed"
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- topicController.test.js
```

## 🔒 Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API protection
- **Input Validation**: Request sanitization
- **Error Handling**: Secure error responses

## 📊 Logging

The application uses Winston for structured logging:

- **Console**: Colored output for development
- **File**: JSON logs for production
- **Levels**: error, warn, info, debug
- **Request Logging**: All API requests with timing

Log files are stored in the `logs/` directory:
- `combined.log`: All logs
- `error.log`: Error logs only

## 🚀 Deployment

### Render (Recommended)

1. Connect your GitHub repository to Render
2. Set environment variables:
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `PORT=10000`
3. Deploy automatically on push

### Other Platforms

The application is compatible with:
- Heroku
- Railway
- DigitalOcean App Platform
- AWS Elastic Beanstalk

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting: `npm run lint`
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

- **Documentation**: http://localhost:3000/api-docs
- **Issues**: GitHub Issues
- **Email**: support@example.com

## 🔄 Version History

- **v1.0.0**: Initial release with basic CRUD operations
- **v1.1.0**: Added pagination and UUID support
- **v1.2.0**: Refactored with clean architecture and SOLID principles 