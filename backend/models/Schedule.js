const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    enum: ['Training', 'Tournament', 'Match', 'Practice', 'Event'],
    required: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  },
  date: {
    type: Date,
    required: true
  },
  startTime: String,
  endTime: String,
  location: String,
  description: String,
  participants: [{
    athlete: mongoose.Schema.Types.ObjectId,
    status: {
      type: String,
      enum: ['confirmed', 'pending', 'declined'],
      default: 'pending'
    }
  }],
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach'
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Schedule', scheduleSchema);
