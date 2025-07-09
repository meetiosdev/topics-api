const topicService = require('../services/topicService');

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
 *       500:
 *         description: Internal server error
 */
const getTopics = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate pagination parameters
    if (page < 1 || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        error: 'Invalid pagination parameters',
      });
    }

    const result = await topicService.getTopics(page, limit);

    res.status(200).json({
      success: true,
      data: result.topics,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

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
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal server error
 */
const getTopicById = async (req, res, next) => {
  try {
    const { topicId } = req.params;

    const topic = await topicService.getTopicById(topicId);

    if (!topic) {
      return res.status(404).json({
        success: false,
        error: 'Topic not found',
      });
    }

    res.status(200).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    next(error);
  }
};

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
 *       404:
 *         description: Topic not found
 *       500:
 *         description: Internal server error
 */
const getTopicPosts = async (req, res, next) => {
  try {
    const { topicId } = req.params;

    const result = await topicService.getTopicPosts(topicId);

    if (!result) {
      return res.status(404).json({
        success: false,
        error: 'Topic not found',
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/seed:
 *   post:
 *     summary: Seed the database with topics and posts
 *     tags: [System]
 *     responses:
 *       200:
 *         description: Database seeded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       500:
 *         description: Internal server error
 */
const seedDatabase = async (req, res, next) => {
  try {
    const result = await topicService.seedDatabase();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTopics,
  getTopicById,
  getTopicPosts,
  seedDatabase,
};
