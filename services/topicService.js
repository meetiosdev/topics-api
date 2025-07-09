const Topic = require('../models/Topic');
const Post = require('../models/Post');
const logger = require('../config/logger');

class TopicService {
  /**
   * Get topics with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Topics with pagination info
   */
  async getTopics(page = 1, limit = 10) {
    try {
      logger.info(`Fetching topics - page: ${page}, limit: ${limit}`);

      const result = await Topic.getTopicsWithPagination(page, limit);

      logger.info(`Successfully fetched ${result.topics.length} topics`);
      return result;
    } catch (error) {
      logger.error('Error fetching topics:', error);
      throw error;
    }
  }

  /**
   * Get topic by ID with posts
   * @param {string} topicId - Topic UUID
   * @returns {Promise<Object|null>} Topic object with posts or null
   */
  async getTopicById(topicId) {
    try {
      logger.info(`Fetching topic by ID: ${topicId}`);

      const [topic, posts] = await Promise.all([
        Topic.findByTopicId(topicId),
        Post.getPostsByTopicId(topicId),
      ]);

      if (!topic) {
        logger.warn(`Topic not found with ID: ${topicId}`);
        return null;
      }

      logger.info(`Successfully fetched topic: ${topic.name} with ${posts.length} posts`);
      
      return {
        ...topic,
        posts,
      };
    } catch (error) {
      logger.error('Error fetching topic by ID:', error);
      throw error;
    }
  }

  /**
   * Get posts for a specific topic
   * @param {string} topicId - Topic UUID
   * @returns {Promise<Object>} Topic with posts and count
   */
  async getTopicPosts(topicId) {
    try {
      logger.info(`Fetching posts for topic ID: ${topicId}`);

      const [topic, posts, postCount] = await Promise.all([
        Topic.findByTopicId(topicId),
        Post.getPostsByTopicId(topicId),
        Post.getPostsCountByTopicId(topicId),
      ]);

      if (!topic) {
        logger.warn(`Topic not found with ID: ${topicId}`);
        return null;
      }

      logger.info(
        `Successfully fetched ${posts.length} posts for topic: ${topic.name}`
      );

      return {
        topic: {
          id: topic.id,
          name: topic.name,
          description: topic.description,
          color: topic.color,
        },
        posts,
        postCount,
      };
    } catch (error) {
      logger.error('Error fetching topic posts:', error);
      throw error;
    }
  }

  /**
   * Seed database with topics and posts from JSON files
   * @returns {Promise<Object>} Seeding result
   */
  async seedDatabase() {
    try {
      logger.info('Starting database seeding...');

      // Clear existing data
      await Promise.all([Topic.deleteMany({}), Post.deleteMany({})]);

      logger.info('Existing data cleared');

      // Import and run the seed script
      const seedScript = require('../seed/seedData');
      await seedScript();

      logger.info('Database seeding completed successfully');

      return {
        success: true,
        message: 'Database seeded successfully',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Seeding error:', error);
      throw error;
    }
  }
}

module.exports = new TopicService();
