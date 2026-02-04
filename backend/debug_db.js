const mongoose = require('mongoose');
const connectDB = require('./config/database');
const Event = require('./models/Event');
require('dotenv').config();

const debugDB = async () => {
    try {
        await connectDB();
        console.log(`Connected to Database. Host: ${mongoose.connection.host}`);
        console.log(`Database Name: ${mongoose.connection.name}`);

        const totalEvents = await Event.countDocuments();
        console.log(`\nTotal Events in DB: ${totalEvents}`);

        const results = await Event.find({ status: 'completed' });
        console.log(`Total Completed Events (Results): ${results.length}`);

        if (results.length > 0) {
            console.log("Sample Result:");
            console.log(JSON.stringify(results[0].results, null, 2));
            console.log(`Highlights: ${results[0].highlights}`);
        } else {
            console.log("No completed events found.");
        }

        const recent = await Event.find().sort({ createdAt: -1 }).limit(3);
        console.log("\nMost Recently Created Events:");
        recent.forEach(e => console.log(`- ${e.name} (Created: ${e.createdAt})`));

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debugDB();
