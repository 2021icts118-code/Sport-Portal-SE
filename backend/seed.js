require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Sport = require('./models/Sport');
const Club = require('./models/Club');
const Tournament = require('./models/Tournament');
const Athlete = require('./models/Athlete');
const Coach = require('./models/Coach');
const TrainingProgram = require('./models/TrainingProgram');
const Event = require('./models/Event');
const Facility = require('./models/Facility');
const Schedule = require('./models/Schedule');
const Result = require('./models/Result');
const Gallery = require('./models/Gallery');

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uov-sports');
  console.log('Connected to DB for seeding');

  // Clear collections
  const models = [User, Sport, Club, Tournament, Athlete, Coach, TrainingProgram, Event, Facility, Schedule, Result, Gallery];
  for (const m of models) {
    try { await m.deleteMany({}); } catch (e) { /* ignore */ }
  }

  // Create users
  const pass = await bcrypt.hash('password123', 10);
  const admin = await User.create({ username: 'admin', email: 'admin@uov.test', password: pass, role: 'admin', firstName: 'Admin' });
  const coachUser = await User.create({ username: 'coach1', email: 'coach1@uov.test', password: pass, role: 'coach', firstName: 'Coach' });
  const student = await User.create({ username: 'student1', email: 'student1@uov.test', password: pass, role: 'student', firstName: 'Student' });

  // Sports
  const cricket = await Sport.create({ name: 'Cricket', category: 'team', description: 'Cricket', popularity: 'High' });
  const athletics = await Sport.create({ name: 'Athletics', category: 'individual', description: 'Athletics', popularity: 'Medium' });

  // Clubs
  const cricketClub = await Club.create({ name: "UoV Cricket Club", sport: cricket._id, category: 'team', captain: student._id, members: [student._id], memberCount: 1, description: 'University cricket club' });

  // Coach & Athlete
  const coach = await Coach.create({ user: coachUser._id, sport: athletics._id, specialization: 'Sprints', experience: '10 years' });
  const athlete = await Athlete.create({ user: student._id, sport: athletics._id, club: cricketClub._id, age: 21, trainingLevel: 'Intermediate' });

  // Tournament
  const tour = await Tournament.create({ title: 'Inter-University Cup', sport: cricket._id, description: 'Annual cup', date: new Date(Date.now()+1000*60*60*24*30), location: 'Main Stadium', status: 'upcoming', participants: [cricketClub._id], participantCount:1, organizer: admin._id });

  // Training program
  const tp = await TrainingProgram.create({ name: 'Sprint Basics', sport: athletics._id, coach: coach._id, description: 'Intro to sprints', level: 'Beginner', capacity: 30 });

  // Event
  const ev = await Event.create({ name: '100m Final', sport: athletics._id, tournament: tour._id, eventType: 'Track', date: new Date() });

  // Facility
  const fac = await Facility.create({ name: 'Main Athletics Stadium', type: 'Competition Venue', sports: [athletics._id], capacity: 5000, features: ['8-lane track'] });

  // Schedule
  const sch = await Schedule.create({ title: 'Sprint Training', eventType: 'Training', sport: athletics._id, date: new Date(), startTime: '08:00', endTime: '10:00', location: 'Main Track' });

  // Result
  const resu = await Result.create({ tournament: tour._id, event: ev._id, sport: cricket._id, date: new Date(), team1: cricketClub._id, team2: cricketClub._id, winner: cricketClub._id, score1: 100, score2: 80, status: 'completed' });

  // Gallery
  const gal = await Gallery.create({ title: 'Opening Ceremony', description: 'Photos', images: [{ url: '/images/sample.jpg', caption: 'Opening' }], date: new Date(), uploadedBy: admin._id });

  console.log('Seeding complete');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
