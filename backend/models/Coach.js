const mongoose = require('mongoose');

const coachSchema = new mongoose.Schema({
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
  specialization: String,
  certification: String,
  experience: String,
  qualifications: [String],
  athletes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Athlete'
  }],
  athleteCount: {
    type: Number,
    default: 0
  },
  trainingPrograms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TrainingProgram'
  }],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: [{
    reviewer: mongoose.Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    date: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Coach', coachSchema);
