const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Result = require('./models/Result');
const Sport = require('./models/Sport');
const Tournament = require('./models/Tournament');
const Event = require('./models/Event');
require('dotenv').config();

const verifyResults = async () => {
    try {
        await connectDB();
        console.log('Database connected...');

        const results = await Result.find().populate('sport tournament event');
        console.log(`\n=== RESULTS IN DATABASE: ${results.length} ===`);

        results.forEach(r => {
            console.log(`\nTournament: ${r.tournament?.title || 'Unknown'}`);
            console.log(`Sport: ${r.sport?.name || 'Unknown'}`);
            console.log(`Event: ${r.event?.name || 'Unknown (Missing link to Event table)'}`);
            console.log(`- Winner: ${r.winnerName || 'N/A'}`);
            console.log(`- Runner Up: ${r.runnerUpName || 'N/A'}`);
            console.log(`- Score: ${r.score || 'N/A'}`);
            console.log(`- Highlights: ${r.highlights?.join(', ') || 'None'}`);
        });

        const events = await Event.find({ status: 'completed' });
        console.log(`\n=== COMPLETED EVENTS IN DATABASE: ${events.length} ===`);
        events.forEach(e => {
            console.log(`- ${e.name} (Status: ${e.status})`);
        });

        if (results.length >= 5 && events.length >= 5) {
            console.log("\n✅ SUCCESS: Results and Events verified.");
        } else {
            console.log("\n⚠️ WARNING: Missing data in either Result or Event table.");
        }

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

verifyResults();
