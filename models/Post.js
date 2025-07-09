const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4
  },
  name: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true,
    default: 0
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
postSchema.index({ id: 1 });
postSchema.index({ date: -1 });

module.exports = mongoose.model('Post', postSchema); 