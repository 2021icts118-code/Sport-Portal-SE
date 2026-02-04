const mongoose = require('mongoose');
require('dotenv').config();
const TrainingProgram = require('./models/TrainingProgram');
const Sport = require('./models/Sport');
const Coach = require('./models/Coach');
const User = require('./models/User');

async function seedTraining() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing
        await TrainingProgram.deleteMany({});

        const sports = await Sport.find();
        const coaches = await Coach.find().populate('user');

        if (sports.length === 0 || coaches.length === 0) {
            console.log('Missing sports or coaches. Please seed them first.');
            process.exit();
        }

        const programs = [
            {
                name: 'Cricket Elite Batting Clinic',
                sport: sports.find(s => s.name === 'Cricket')?._id,
                coach: coaches.find(c => c.sport.toString() === sports.find(s => s.name === 'Cricket')?._id.toString())?._id || coaches[0]._id,
                description: 'Advanced batting techniques and shot selection for the university first team.',
                level: 'Elite',
                duration: '8 Weeks',
                schedule: {
                    day: ['Monday', 'Wednesday', 'Friday'],
                    time: '06:30 AM - 08:30 AM',
                    frequency: '3 times a week'
                },
                location: 'Indoor Cricket Nets',
                capacity: 15,
                focus: ['Power Hitting', 'Footwork', 'Spin Play']
            },
            {
                name: 'Basketball Fundamentals for Beginners',
                sport: sports.find(s => s.name === 'Basketball')?._id,
                coach: coaches.find(c => c.sport.toString() === sports.find(s => s.name === 'Basketball')?._id.toString())?._id || coaches[0]._id,
                description: 'Focus on dribbling, passing, and basic shooting mechanics.',
                level: 'Beginner',
                duration: '12 Weeks',
                schedule: {
                    day: ['Tuesday', 'Thursday'],
                    time: '04:00 PM - 06:00 PM',
                    frequency: 'Twice a week'
                },
                location: 'Outdoor Basketball Court',
                capacity: 25,
                focus: ['Ball Handling', 'Layups', 'Basic Defense']
            },
            {
                name: 'Football Tactical Awareness',
                sport: sports.find(s => s.name === 'Football')?._id,
                coach: coaches.find(c => c.sport.toString() === sports.find(s => s.name === 'Football')?._id.toString())?._id || coaches[0]._id,
                description: 'Strategic positioning and team coordination drills.',
                level: 'Intermediate',
                duration: '6 Weeks',
                schedule: {
                    day: ['Saturday'],
                    time: '08:00 AM - 11:00 AM',
                    frequency: 'Once a week'
                },
                location: 'Main Stadium',
                capacity: 30,
                focus: ['Zonal Marking', 'Counter-Attacking', 'Set Pieces']
            }
        ];

        await TrainingProgram.insertMany(programs);
        console.log('Seeded 3 training programs successfully.');
        process.exit();
    } catch (error) {
        console.error('Error seeding training programs:', error);
        process.exit(1);
    }
}

seedTraining();
