const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  },
  description: String,
  eventType: {
    type: String,
    enum: ['Track', 'Field', 'Throws', 'Jumps', 'Team Match', 'Individual Match'],
    required: true
  },
  date: Date,
  location: String,
  status: {
    type: String,
    enum: ['scheduled', 'ongoing', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  participants: [{
    athlete: mongoose.Schema.Types.ObjectId,
    club: mongoose.Schema.Types.ObjectId,
    status: String
  }],
  results: {
    winner: mongoose.Schema.Types.ObjectId,
    runnerup: mongoose.Schema.Types.ObjectId,
    thirdplace: mongoose.Schema.Types.ObjectId,
    winnerName: String, // Added for text-based winner listing
    runnerUpName: String, // Added for text-based runner-up listing
    time: String,
    distance: String,
    score: String
  },
  highlights: [String], // Added for event highlights
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);
