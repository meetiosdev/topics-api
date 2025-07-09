const express = require('express');
const { param, query } = require('express-validator');
const topicController = require('../controllers/topicController');
const validate = require('../middlewares/validation');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Topics
 *   description: Topic management endpoints
 */

// Validation rules
const topicIdValidation = [
  param('topicId')
    .isUUID(4)
    .withMessage('Topic ID must be a valid UUID'),
  validate,
];

const paginationValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  validate,
];

/**
 * @swagger
 * /api/topics:
 *   get:
 *     summary: Get all topics with pagination
 *     tags: [Topics]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Number of topics per page
 *     responses:
 *       200:
 *         description: List of topics with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Topic'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       400:
 *         description: Invalid pagination parameters
 *       500:
 *         description: Internal server error
 */
router.get('/', paginationValidation, topicController.getTopics);

/**
 * @swagger
 * /api/topics/{topicId}:
 *   get:
 *     summary: Get a specific topic by ID
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Topic UUID
 *     responses:
 *       200:
 *         description: Topic details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Topic'
 *       400:
 *         description: Invalid topic ID format
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal server error
 */
router.get('/:topicId', topicIdValidation, topicController.getTopicById);

/**
 * @swagger
 * /api/topics/{topicId}/posts:
 *   get:
 *     summary: Get all posts for a specific topic
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: topicId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Topic UUID
 *     responses:
 *       200:
 *         description: Topic with posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     topic:
 *                       $ref: '#/components/schemas/Topic'
 *                     posts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Post'
 *                     postCount:
 *                       type: number
 *       400:
 *         description: Invalid topic ID format
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal server error
 */
router.get('/:topicId/posts', topicIdValidation, topicController.getTopicPosts);

module.exports = router; 