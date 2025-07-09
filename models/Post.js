const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Post author name is required'],
      trim: true,
      maxlength: [100, 'Author name cannot exceed 100 characters'],
    },
    likes: {
      type: Number,
      required: [true, 'Likes count is required'],
      min: [0, 'Likes cannot be negative'],
      default: 0,
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      trim: true,
      maxlength: [1000, 'Post content cannot exceed 1000 characters'],
    },
    date: {
      type: Date,
      required: [true, 'Post date is required'],
      default: Date.now,
    },
    topicId: {
      type: String,
      required: [true, 'Topic ID is required'],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index for better query performance
postSchema.index({ topicId: 1, createdAt: -1 });
postSchema.index({ likes: -1 });
postSchema.index({ date: -1 });

// Static method to get posts by topic ID
postSchema.statics.getPostsByTopicId = async function (topicId) {
  return this.find({ topicId })
    .select('id name likes content date')
    .sort({ date: -1 })
    .lean();
};

// Static method to get posts count by topic ID
postSchema.statics.getPostsCountByTopicId = async function (topicId) {
  return this.countDocuments({ topicId });
};

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
