const mongoose = require('mongoose');
const User = require('../models/User');
const fs = require('fs');
require('dotenv').config();

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uov-sports');
        console.log('Connected to MongoDB...');

        const users = await User.find({}, 'email role firstName lastName');
        let output = `Users found: ${users.length}\n`;
        users.forEach(u => {
            output += `- ${u.email} (${u.role}) - ${u.firstName} ${u.lastName}\n`;
        });
        fs.writeFileSync('users_list.txt', output);
        console.log('User list written to users_list.txt');

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

listUsers();
