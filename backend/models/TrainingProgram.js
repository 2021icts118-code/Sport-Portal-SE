const mongoose = require('mongoose');

const trainingProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    required: true
  },
  description: String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Elite'],
    default: 'Beginner'
  },
  duration: String,
  schedule: {
    day: [String],
    time: String,
    frequency: String
  },
  location: String,
  capacity: Number,
  enrolledAthletes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Athlete'
  }],
  sessions: [{
    sessionNumber: Number,
    date: Date,
    startTime: String,
    endTime: String,
    activities: [String],
    attendance: [mongoose.Schema.Types.ObjectId]
  }],
  focus: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TrainingProgram', trainingProgramSchema);
