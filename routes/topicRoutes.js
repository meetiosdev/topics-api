const express = require('express');
const router = express.Router();
const {
  getTopics,
  getTopicPosts,
  getTopicById,
  seedDatabase,
} = require('../controllers/topicController');

// Get all topics with pagination
router.get('/', getTopics);

// Get posts for a specific topic
router.get('/:id/posts', getTopicPosts);

// Get a specific topic by ID
router.get('/:id', getTopicById);

// Seed database endpoint
router.post('/seed', seedDatabase);

module.exports = router;
