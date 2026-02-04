const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Sport = require('./models/Sport');
const Event = require('./models/Event');
const Result = require('./models/Result');
const Tournament = require('./models/Tournament');
const User = require('./models/User');
require('dotenv').config();

const resultsData = [
    {
        tournament: "Inter-University Cricket Championship 2025",
        event: "Final Match",
        sportName: "Cricket",
        date: "2025-12-15",
        winnerName: "University of Colombo",
        runnerUpName: "University of Peradeniya",
        score: "245/8 vs 198/10",
        highlights: ["Man of the Match: John Smith", "Best Bowler: Mike Johnson"]
    },
    {
        tournament: "Basketball League Finals 2025",
        event: "Championship Round",
        sportName: "Basketball",
        date: "2025-11-28",
        winnerName: "Engineering Faculty",
        runnerUpName: "Medical Faculty",
        score: "89-76",
        highlights: ["MVP: Sarah Wilson", "Finals MVP: David Brown"]
    },
    {
        tournament: "Football Cup 2025",
        event: "Cup Final",
        sportName: "Football",
        date: "2025-10-20",
        winnerName: "Arts Faculty",
        runnerUpName: "Science Faculty",
        score: "3-1",
        highlights: ["Golden Goal", "Clean Sheet"]
    },
    {
        tournament: "Swimming Championship 2025",
        event: "100m Freestyle Final",
        sportName: "Swimming",
        date: "2025-09-15",
        winnerName: "Emma Wilson",
        runnerUpName: "Lisa Chen",
        score: "52.4s",
        highlights: ["4 Gold Medals", "2 Records Broken"]
    },
    {
        tournament: "Athletics Meet 2025",
        event: "100m Sprint Final",
        sportName: "Athletics",
        date: "2025-08-30",
        winnerName: "Various",
        runnerUpName: "Various",
        score: "Multiple Events",
        highlights: ["5 New Records", "Team Gold"]
    }
];

const seedResults = async () => {
    try {
        await connectDB();
        console.log('Database connected...');

        // Get an admin user for tournament organizer
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            // Create a dummy admin if not found
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);

            admin = await User.create({
                username: 'admin_seed',
                email: 'admin_seed@uov.test',
                password: hashedPassword,
                role: 'admin',
                firstName: 'Admin',
                lastName: 'Seed'
            });
        }

        // Clear existing results and events to avoid duplicates
        await Result.deleteMany({});
        await Event.deleteMany({ status: 'completed' }); // Only clear completed ones as we might have scheduled ones
        console.log('Cleared existing results and completed events.');

        for (const res of resultsData) {
            // 1. Find or Create Sport
            let sport = await Sport.findOne({ name: res.sportName });
            if (!sport) {
                sport = await Sport.create({
                    name: res.sportName,
                    category: (['Football', 'Cricket', 'Basketball'].includes(res.sportName)) ? 'team' : 'individual',
                    description: `${res.sportName} sports`,
                    popularity: 'Medium'
                });
                console.log(`Created Sport: ${res.sportName}`);
            }

            // 2. Find or Create Tournament
            let tournament = await Tournament.findOne({ title: res.tournament });
            if (!tournament) {
                tournament = await Tournament.create({
                    title: res.tournament,
                    sport: sport._id,
                    description: `Annual ${res.tournament}`,
                    date: new Date(res.date),
                    location: "University Sports Complex",
                    status: "completed",
                    organizer: admin._id
                });
                console.log(`Created Tournament: ${res.tournament}`);
            }

            // 3. Create Event (Completed)
            const eventName = `${res.event} - ${res.tournament}`;
            const eventType = (['Football', 'Cricket', 'Basketball'].includes(res.sportName)) ? 'Team Match' : 'Individual Match';

            const event = await Event.create({
                name: eventName,
                sport: sport._id,
                tournament: tournament._id,
                eventType: eventType,
                description: `Result from ${res.tournament}`,
                date: new Date(res.date),
                location: "University Sports Complex",
                status: "completed",
                results: {
                    score: res.score,
                    winnerName: res.winnerName,
                    runnerUpName: res.runnerUpName
                },
                highlights: res.highlights
            });
            console.log(`Created Event: ${eventName}`);

            // 4. Create Result (Linked to Event)
            await Result.create({
                tournament: tournament._id,
                event: event._id,
                sport: sport._id,
                date: new Date(res.date),
                winnerName: res.winnerName,
                runnerUpName: res.runnerUpName,
                score: res.score,
                highlights: res.highlights,
                status: "completed"
            });
            console.log(`Seeded Result: ${res.tournament}`);
        }

        console.log(`\nSuccessfully seeded ${resultsData.length} events and results!`);
        process.exit();
    } catch (err) {
        console.error('Error seeding results:', err);
        process.exit(1);
    }
};

seedResults();
