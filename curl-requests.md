# Curl Requests for Postman Testing

Copy and paste these requests into Postman or use them directly with curl.

## Base URL

```
http://localhost:3000
```

---

## 1. Health Check

```bash
curl -X GET "http://localhost:3000/health"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/health`

---

## 2. Get Paginated Topics (Page 1, 5 topics)

```bash
curl -X GET "http://localhost:3000/topics?page=1&limit=5"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics`
- Query Params:
  - `page`: 1
  - `limit`: 5

---

## 3. Get Paginated Topics (Page 2, 10 topics)

```bash
curl -X GET "http://localhost:3000/topics?page=2&limit=10"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics`
- Query Params:
  - `page`: 2
  - `limit`: 10

---

## 4. Get Topic by ID (Topic ID: 1)

```bash
curl -X GET "http://localhost:3000/topics/1"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/1`

---

## 5. Get Topic by ID (Topic ID: 2)

```bash
curl -X GET "http://localhost:3000/topics/2"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/2`

---

## 6. Get Posts for Topic (Topic ID: 1)

```bash
curl -X GET "http://localhost:3000/topics/1/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/1/posts`

---

## 7. Get Posts for Topic (Topic ID: 2)

```bash
curl -X GET "http://localhost:3000/topics/2/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/2/posts`

---

## 8. Get Posts for Topic (Topic ID: 3 - Gaming)

```bash
curl -X GET "http://localhost:3000/topics/3/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/3/posts`

---

## 9. Get Posts for Topic (Topic ID: 4 - Gaming)

```bash
curl -X GET "http://localhost:3000/topics/4/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/4/posts`

---

## 10. Get Posts for Topic (Topic ID: 5 - Aww)

```bash
curl -X GET "http://localhost:3000/topics/5/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/5/posts`

---

## 11. Error Test - Non-existent Topic (ID: 999)

```bash
curl -X GET "http://localhost:3000/topics/999/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/999/posts`
- Expected: 404 Error

---

## 12. Error Test - Non-existent Topic (ID: 999)

```bash
curl -X GET "http://localhost:3000/topics/999"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/999`
- Expected: 404 Error

---

## 13. Get All Topics (Default pagination)

```bash
curl -X GET "http://localhost:3000/topics"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics`

---

## 14. Get Large Page of Topics (Page 1, 20 topics)

```bash
curl -X GET "http://localhost:3000/topics?page=1&limit=20"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics`
- Query Params:
  - `page`: 1
  - `limit`: 20

---

## 15. Get Last Page of Topics

```bash
curl -X GET "http://localhost:3000/topics?page=40&limit=5"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics`
- Query Params:
  - `page`: 40
  - `limit`: 5

---

## 16. Test Different Topic IDs (Food - ID: 21)

```bash
curl -X GET "http://localhost:3000/topics/21/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/21/posts`

---

## 17. Test Different Topic IDs (Art - ID: 22)

```bash
curl -X GET "http://localhost:3000/topics/22/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/22/posts`

---

## 18. Test Different Topic IDs (Fitness - ID: 25)

```bash
curl -X GET "http://localhost:3000/topics/25/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/25/posts`

---

## 19. Test Different Topic IDs (History - ID: 26)

```bash
curl -X GET "http://localhost:3000/topics/26/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/26/posts`

---

## 20. Test Different Topic IDs (Music - ID: 39)

```bash
curl -X GET "http://localhost:3000/topics/39/posts"
```

**Postman Setup:**

- Method: GET
- URL: `http://localhost:3000/topics/39/posts`

---

## Quick Test Script

You can also run this bash script to test all endpoints:

```bash
#!/bin/bash

echo "Testing Topics API..."

echo "1. Health Check:"
curl -s "http://localhost:3000/health" | jq '.'

echo -e "\n2. Get Topics (Page 1, 3 topics):"
curl -s "http://localhost:3000/topics?page=1&limit=3" | jq '.data.pagination'

echo -e "\n3. Get Topic Posts (ID: 1):"
curl -s "http://localhost:3000/topics/1/posts" | jq '.data.topic'

echo -e "\n4. Error Test (ID: 999):"
curl -s "http://localhost:3000/topics/999/posts" | jq '.'

echo -e "\nTesting complete!"
```

---

## Expected Responses

### Successful Topic Response:

```json
{
  "success": true,
  "data": {
    "topics": [
      {
        "_id": "...",
        "id": 1,
        "name": "All",
        "description": "A general community for all types of discussions and content",
        "color": "#4A7B9D",
        "posts": [...]
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 40,
      "totalTopics": 200,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

### Successful Posts Response:

```json
{
  "success": true,
  "data": {
    "topic": {
      "id": 1,
      "name": "All",
      "description": "A general community for all types of discussions and content",
      "color": "#4A7B9D"
    },
    "posts": [
      {
        "_id": "...",
        "id": "post_001",
        "name": "Alice Johnson",
        "likes": 125,
        "content": "Just came back from a wonderful trip to the mountains! 🏞️",
        "date": "2025-06-20T15:34:00.000Z"
      }
    ],
    "postCount": 20
  }
}
```

### Error Response:

```json
{
  "success": false,
  "error": "Topic not found",
  "message": "Topic with ID 999 does not exist"
}
```
