const express = require('express');
const router = express.Router();
const { 
  getTopics, 
  getTopicPosts, 
  getTopicById 
} = require('../controllers/topicController');

// GET /topics - Get paginated list of topics
router.get('/', getTopics);

// GET /topics/:id - Get a specific topic by ID
router.get('/:id', getTopicById);

// GET /topics/:id/posts - Get posts for a specific topic
router.get('/:id/posts', getTopicPosts);

module.exports = router; 