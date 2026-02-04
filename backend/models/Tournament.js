const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  location: String,
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  }],
  participantCount: {
    type: Number,
    default: 0
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  prize: String,
  format: String,
  rounds: [{
    roundNumber: Number,
    startDate: Date,
    endDate: Date,
    matches: [{
      team1: mongoose.Schema.Types.ObjectId,
      team2: mongoose.Schema.Types.ObjectId,
      score1: Number,
      score2: Number,
      winner: mongoose.Schema.Types.ObjectId,
      scheduledDate: Date
    }]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Tournament', tournamentSchema);
