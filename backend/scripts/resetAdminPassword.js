const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const resetPassword = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uov-sports');
        console.log('Connected to MongoDB...');

        const email = 'admin@uov.ac.lk';
        const newPassword = 'password123';

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true }
        );

        if (user) {
            console.log(`Password for ${email} reset to '${newPassword}'`);
        } else {
            console.log(`User ${email} not found. Creating it...`);
            // Create if not exists (fallback)
            const newUser = new User({
                username: 'admin',
                email,
                password: hashedPassword,
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin'
            });
            await newUser.save();
            console.log(`User ${email} created with password '${newPassword}'`);
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

resetPassword();
