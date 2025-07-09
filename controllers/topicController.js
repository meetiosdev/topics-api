const Topic = require('../models/Topic');
const Post = require('../models/Post');

// Get paginated list of topics
const getTopics = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get topics with pagination (include id field)
    const topics = await Topic.find()
      .select('id name description color')
      .skip(skip)
      .limit(limit)
      .sort({ id: 1 });

    // Get total count for pagination info
    const totalTopics = await Topic.countDocuments();
    const totalPages = Math.ceil(totalTopics / limit);

    res.status(200).json({
      success: true,
      data: {
        topics,
        pagination: {
          currentPage: page,
          totalPages,
          totalTopics,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching topics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch topics',
      message: error.message
    });
  }
};

// Get posts for a specific topic
const getTopicPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findOne({ id: id }).populate('posts');
    if (!topic) {
      return res.status(404).json({
        success: false,
        error: 'Topic not found',
        message: `Topic with ID ${id} does not exist`
      });
    }
    res.status(200).json({
      success: true,
      data: {
        topic: {
          id: topic.id,
          name: topic.name,
          description: topic.description,
          color: topic.color
        },
        posts: topic.posts,
        postCount: topic.posts.length
      }
    });
  } catch (error) {
    console.error('Error fetching topic posts:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch topic posts',
      message: error.message
    });
  }
};

// Get a single topic by ID
const getTopicById = async (req, res) => {
  try {
    const { id } = req.params;
    const topic = await Topic.findOne({ id: id }).select('id name description color');
    if (!topic) {
      return res.status(404).json({
        success: false,
        error: 'Topic not found',
        message: `Topic with ID ${id} does not exist`
      });
    }
    res.status(200).json({
      success: true,
      data: topic
    });
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch topic',
      message: error.message
    });
  }
};

module.exports = {
  getTopics,
  getTopicPosts,
  getTopicById
}; 