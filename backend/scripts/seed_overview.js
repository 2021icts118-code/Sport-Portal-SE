const mongoose = require('mongoose');
const User = require('../models/User');
const Club = require('../models/Club');
const Tournament = require('../models/Tournament');
const Sport = require('../models/Sport');
const Result = require('../models/Result');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const MONGO_URI = "mongodb://localhost:27017/uov-sports";

const seedData = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        // 1. Create Sports
        const cricket = await Sport.findOneAndUpdate({ name: 'Cricket' }, { name: 'Cricket', category: 'team', icon: '🏏' }, { upsert: true, new: true });
        const badminton = await Sport.findOneAndUpdate({ name: 'Badminton' }, { name: 'Badminton', category: 'individual', icon: '🏸' }, { upsert: true, new: true });
        const swimming = await Sport.findOneAndUpdate({ name: 'Swimming' }, { name: 'Swimming', category: 'individual', icon: '🏊' }, { upsert: true, new: true });

        // 2. Create Users (Admin, Students, Coaches)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        const users = [
            { firstName: 'Admin', lastName: 'User', email: 'admin@uov.ac.lk', username: 'admin', role: 'admin', password: hashedPassword, status: 'active' },
            { firstName: 'Kasun', lastName: 'Perera', email: 'kasun@uov.ac.lk', username: 'kasun', role: 'student', password: hashedPassword, status: 'active' },
            { firstName: 'Amal', lastName: 'Silva', email: 'amal@uov.ac.lk', username: 'amal', role: 'student', password: hashedPassword, status: 'active' },
            { firstName: 'Nimal', lastName: 'Fernando', email: 'nimal@uov.ac.lk', username: 'nimal', role: 'coach', password: hashedPassword, status: 'active' },
            { firstName: 'Ruwan', lastName: 'Jayasinghe', email: 'ruwan@uov.ac.lk', username: 'ruwan', role: 'student', password: hashedPassword, status: 'inactive' }, // For variety
            { firstName: 'Saman', lastName: 'Kumara', email: 'saman@uov.ac.lk', username: 'saman', role: 'student', password: hashedPassword, status: 'active' } // For pending request
        ];

        let dbUsers = [];
        for (const u of users) {
            // Check if user exists to verify if we need to update password or just fields
            // Actually findOneAndUpdate with upsert will overwrite. Ideally we want to ensure password is set.
            const user = await User.findOneAndUpdate({ email: u.email }, u, { upsert: true, new: true });
            dbUsers.push(user);
        }

        // 3. Create Clubs
        const clubs = [
            { name: 'UOV Cricket Eleven', sport: cricket._id, description: 'Official Cricket Team', status: 'active', members: [dbUsers[1]._id], memberCount: 15 },
            { name: 'Shuttle Masters', sport: badminton._id, description: 'Badminton Club', status: 'active', members: [dbUsers[2]._id], memberCount: 8, pendingMembers: [dbUsers[5]._id] }, // Has pending request
            { name: 'Blue Sharks Swimming', sport: swimming._id, description: 'Swimming Squad', status: 'active', members: [], memberCount: 5 }
        ];

        let dbClubs = [];
        for (const c of clubs) {
            const club = await Club.findOneAndUpdate({ name: c.name }, c, { upsert: true, new: true });
            dbClubs.push(club);
        }

        // 4. Create Tournaments (Fixing the Title issue)
        const tournaments = [
            {
                title: 'Inter-Faculty Cricket Championship 2025', // EXPLICIT TITLE
                sport: cricket._id,
                date: new Date('2025-03-15'),
                startDate: new Date('2025-03-15'),
                endDate: new Date('2025-03-20'),
                status: 'upcoming',
                description: 'The biggest cricket event of the year.'
            },
            {
                title: 'University Badminton Open', // EXPLICIT TITLE
                sport: badminton._id,
                date: new Date('2024-12-10'),
                startDate: new Date('2024-12-10'),
                endDate: new Date('2024-12-12'),
                status: 'completed',
                description: 'Open badminton tournament for all students.'
            }
        ];

        let dbTournaments = [];
        for (const t of tournaments) {
            // Using findOneAndUpdate to avoid duplicates, keyed by title
            const tour = await Tournament.findOneAndUpdate({ title: t.title }, t, { upsert: true, new: true });
            dbTournaments.push(tour);
        }

        // 5. Create Results (Explicitly linking to Tournaments)
        const results = [
            {
                tournament: dbTournaments[1]._id, // Badminton Open
                sport: badminton._id,
                date: new Date('2024-12-12'),
                winnerName: 'Kasun Perera',
                runnerUpName: 'Amal Silva',
                score: '2-1 (21-18, 15-21, 21-19)',
                status: 'completed',
                highlights: ['Intense final set', 'Record rally duration']
            },
            {
                tournament: dbTournaments[0]._id, // Cricket (Upcoming, but maybe we have a past result/match record)
                // Actually, let's create a "Past Cricket Match" result even if the big tourney is upcoming, or assume it's from last year
                sport: cricket._id,
                date: new Date('2024-03-15'),
                team1: dbClubs[0]._id,
                team2: dbClubs[0]._id, // Playing against themselves? :D Let's just use team names for simplicity if model allows, but schema refs Club. 
                // Wait, Result schema has team1/team2 as Ref to Club OR winnerName/runnerUpName string.
                // Let's use winnerName/runnerUpName specifically because the bug report table uses `winnerName || team1?.name`.
                winnerName: 'Science Faculty',
                runnerUpName: 'Technology Faculty',
                score: 'Won by 5 wickets',
                score1: 150,
                score2: 148,
                status: 'completed',
                highlights: ['Century by Nimal']
            }
        ];

        // Clear existing results to ensure we don't have broken refs messing up the table
        await Result.deleteMany({});

        for (const r of results) {
            await Result.create(r);
        }

        console.log('--- Seeding Completed Successfully ---');
        console.log(`Users: ${dbUsers.length}`);
        console.log(`Clubs: ${dbClubs.length}`);
        console.log(`Tournaments: ${dbTournaments.length}`);
        console.log(`Results: ${results.length}`);

    } catch (error) {
        console.error('Seeding Error:', error);
    } finally {
        mongoose.disconnect();
    }
};

seedData();
