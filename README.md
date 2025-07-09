# Topics API

A Node.js + MongoDB backend API for managing topics and posts. This API provides endpoints to retrieve paginated topics and posts for specific topics.

## Features

- **RESTful API** with Express.js
- **MongoDB** database with Mongoose ODM
- **Pagination** support for topics
- **Data seeding** from JSON files
- **Error handling** and validation
- **Security** with Helmet middleware
- **CORS** enabled for cross-origin requests

## API Endpoints

### 1. Get Paginated Topics
```
GET /topics?page=1&limit=10
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of topics per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "topics": [
      {
        "_id": "...",
        "id": 1,
        "name": "All",
        "description": "A general community for all types of discussions",
        "color": "#4A7B9D",
        "posts": [...]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalTopics": 50,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### 2. Get Topic Posts
```
GET /topics/:id/posts
```

**Response:**
```json
{
  "success": true,
  "data": {
    "topic": {
      "id": 1,
      "name": "All",
      "description": "A general community for all types of discussions",
      "color": "#4A7B9D"
    },
    "posts": [
      {
        "_id": "...",
        "id": "post_001",
        "name": "Alice Johnson",
        "likes": 125,
        "content": "Just came back from a wonderful trip to the mountains! 🏞️",
        "date": "2025-06-20T15:34:00Z"
      }
    ],
    "postCount": 20
  }
}
```

### 3. Get Topic by ID
```
GET /topics/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "id": 1,
    "name": "All",
    "description": "A general community for all types of discussions",
    "color": "#4A7B9D",
    "posts": [...]
  }
}
```

### 4. Health Check
```
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "Topics API is running",
  "timestamp": "2025-01-20T10:30:00.000Z"
}
```

## Database Schema

### Topic Schema
```javascript
{
  id: Number,           // Unique topic ID
  name: String,         // Topic name
  description: String,  // Topic description
  color: String,        // Topic color (hex)
  posts: [ObjectId]     // Array of Post references
}
```

### Post Schema
```javascript
{
  id: String,           // Unique post ID
  name: String,         // Author name
  likes: Number,        // Number of likes
  content: String,      // Post content
  date: Date           // Post date
}
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd topicsApi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   The MongoDB connection string is already configured in the code. If you need to use a different database, update the `MONGODB_URI` in `app.js` and `seed/seedData.js`.

4. **Seed the database**
   ```bash
   npm run seed
   ```
   This will read all JSON files from the `Topics/` directory and populate the database with topics and posts.

5. **Start the server**
   ```bash
   # Development mode (with nodemon)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## Project Structure

```
topicsApi/
├── app.js                 # Main application file
├── package.json           # Dependencies and scripts
├── README.md             # This file
├── Topics/               # JSON data files
│   ├── topic-page-1.json
│   ├── topic-page-2.json
│   └── ...
├── models/               # Mongoose models
│   ├── Topic.js
│   └── Post.js
├── controllers/          # Route controllers
│   └── topicController.js
├── routes/              # Express routes
│   └── topicRoutes.js
└── seed/                # Database seeding
    └── seedData.js
```

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with nodemon
- `npm run seed` - Seed the database with topics and posts

## Data Source

The API uses data from JSON files in the `Topics/` directory. Each file contains multiple topics with their associated posts. The seeding script reads all these files and populates the MongoDB database.

## Error Handling

The API includes comprehensive error handling:
- 404 errors for non-existent routes
- 500 errors for server issues
- Proper error messages and status codes
- Validation for required fields

## Security Features

- **Helmet.js** for security headers
- **CORS** enabled for cross-origin requests
- **Input validation** and sanitization
- **Error handling** to prevent information leakage

## Testing the API

You can test the API using curl, Postman, or any HTTP client:

```bash
# Get paginated topics
curl http://localhost:3000/topics?page=1&limit=5

# Get posts for a specific topic
curl http://localhost:3000/topics/1/posts

# Health check
curl http://localhost:3000/health
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details 