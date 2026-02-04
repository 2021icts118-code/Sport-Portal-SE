const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport'
  },
  images: [{
    url: String,
    caption: String,
    uploadedBy: mongoose.Schema.Types.ObjectId,
    uploadDate: Date
  }],
  videos: [{
    url: String,
    caption: String,
    duration: String,
    uploadedBy: mongoose.Schema.Types.ObjectId,
    uploadDate: Date
  }],
  category: {
    type: String,
    enum: ['Tournament', 'Training', 'Match', 'Event', 'Achievement'],
    default: 'Event'
  },
  date: Date,
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: mongoose.Schema.Types.ObjectId,
    text: String,
    date: Date
  }],
  isPublished: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);
