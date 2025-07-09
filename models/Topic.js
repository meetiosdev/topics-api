const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const topicSchema = new mongoose.Schema({
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
  description: {
    type: String,
    required: true,
    default: 'A community for discussing various topics'
  },
  color: {
    type: String,
    required: true,
    default: '#4A7B9D'
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
});

topicSchema.index({ id: 1 });
topicSchema.index({ name: 1 });

module.exports = mongoose.model('Topic', topicSchema); 