const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament',
    required: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  team1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  },
  team2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  },
  athlete: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Athlete'
  },
  winner: mongoose.Schema.Types.ObjectId,
  winnerName: String,
  runnerUpName: String,
  loser: mongoose.Schema.Types.ObjectId,
  score: String,
  score1: Number,
  score2: Number,
  points: {
    team1: Number,
    team2: Number
  },
  performance: {
    time: String,
    distance: String,
    height: String,
    custom: mongoose.Schema.Types.Mixed
  },
  highlights: [String],
  round: Number,
  status: {
    type: String,
    enum: ['pending', 'completed', 'disputed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', resultSchema);
