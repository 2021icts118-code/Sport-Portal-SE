const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Competition Venue', 'Practice Facility', 'Specialized Training', 'Gym', 'Other'],
    required: true
  },
  sports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport'
  }],
  capacity: Number,
  features: [String],
  status: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Needs Maintenance'],
    default: 'Good'
  },
  lastMaintenance: Date,
  nextMaintenance: Date,
  address: String,
  contact: String,
  availability: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String
  },
  bookings: [{
    user: mongoose.Schema.Types.ObjectId,
    date: Date,
    timeSlot: String,
    sport: mongoose.Schema.Types.ObjectId,
    status: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Facility', facilitySchema);
