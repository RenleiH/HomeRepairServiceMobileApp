const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userType: {
    type: String,
    required: true,
    enum: ['homeowner', 'service_provider']
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'userType'
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Feedback', feedbackSchema); 