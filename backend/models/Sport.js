const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['team', 'individual'],
    required: true
  },
  description: String,
  icon: String,
  facilities: [String],
  participants: String,
  popularity: {
    type: String,
    enum: ['Very High', 'High', 'Medium', 'Low']
  },
  color: String,
  clubs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  }],
  tournaments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tournament'
  }],
  players: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  achievements: [String],
  contact: String,
  programs: [{
    id: Number,
    name: String,
    icon: String,
    description: String,
    events: [String],
    details: {
      overview: String,
      facilities: [String],
      training: [String],
      competitions: [String]
    }
  }],
  rules: [{
    category: String,
    items: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sport', sportSchema);
