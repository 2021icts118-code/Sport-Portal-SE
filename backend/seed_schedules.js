const mongoose = require('mongoose');
const Schedule = require('./models/Schedule');
const Sport = require('./models/Sport');
const Club = require('./models/Club');
require('dotenv').config();

async function seedSchedules() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Clear existing schedules
        await Schedule.deleteMany({});
        console.log('Cleared existing schedules');

        const cricket = await Sport.findOne({ name: 'Cricket' });
        const football = await Sport.findOne({ name: 'Football' });
        const basketball = await Sport.findOne({ name: 'Basketball' });

        const cricketClub = await Club.findOne({ name: /Cricket/i });
        const footballClub = await Club.findOne({ name: /Football/i });

        const schedules = [
            {
                title: 'Morning Cricket Training',
                eventType: 'Training',
                sport: cricket._id,
                club: cricketClub?._id,
                date: new Date('2026-02-10'),
                startTime: '07:30',
                endTime: '09:30',
                location: 'University Cricket Grounds',
                description: 'Regular morning practice session for the university team.',
                status: 'upcoming'
            },
            {
                title: 'Inter-Faculty Football Match',
                eventType: 'Match',
                sport: football._id,
                club: footballClub?._id,
                date: new Date('2026-02-12'),
                startTime: '15:00',
                endTime: '17:00',
                location: 'Main Football Field',
                description: 'Engineering vs Science faculty friendly match.',
                status: 'upcoming'
            },
            {
                title: 'Basketball Weekly Drill',
                eventType: 'Practice',
                sport: basketball._id,
                date: new Date('2026-02-15'),
                startTime: '16:30',
                endTime: '18:30',
                location: 'Indoor Sports Complex',
                description: 'Fundamentals and shooting drills.',
                status: 'upcoming'
            }
        ];

        await Schedule.insertMany(schedules);
        console.log('Successfully seeded 3 schedules');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding schedules:', error);
        process.exit(1);
    }
}

seedSchedules();
