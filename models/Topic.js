const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Topic name is required'],
      trim: true,
      maxlength: [100, 'Topic name cannot exceed 100 characters'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Topic description is required'],
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    color: {
      type: String,
      required: [true, 'Topic color is required'],
      match: [/^#[0-9A-F]{6}$/i, 'Color must be a valid hex color'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for posts count
topicSchema.virtual('postsCount', {
  ref: 'Post',
  localField: 'id',
  foreignField: 'topicId',
  count: true,
});

// Index for better query performance
topicSchema.index({ name: 'text', description: 'text' });
topicSchema.index({ createdAt: -1 });

// Static method to get topics with pagination
topicSchema.statics.getTopicsWithPagination = async function (
  page = 1,
  limit = 10
) {
  const skip = (page - 1) * limit;

  const [topics, total] = await Promise.all([
    this.find({})
      .select('id name description color')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    this.countDocuments(),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    topics,
    pagination: {
      currentPage: page,
      totalPages,
      totalTopics: total,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

// Static method to find topic by ID
topicSchema.statics.findByTopicId = async function (topicId) {
  return this.findOne({ id: topicId }).lean();
};

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
