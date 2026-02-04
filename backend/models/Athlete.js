const mongoose = require('mongoose');

const athleteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
  age: Number,
  height: String,
  weight: String,
  medicalInfo: String,
  trainingLevel: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Elite'],
    default: 'Beginner'
  },
  achievements: [String],
  statistics: {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    points: { type: Number, default: 0 },
    ranking: Number
  },
  performanceMetrics: {
    events: [String],
    bestDistances: mongoose.Schema.Types.Mixed,
    bestHeights: mongoose.Schema.Types.Mixed,
    personalBests: mongoose.Schema.Types.Mixed
  },
  injuries: [{
    type: String,
    date: Date,
    status: String
  }],
  registeredEvents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Athlete', athleteSchema);
