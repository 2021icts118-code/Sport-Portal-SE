const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Club = require('../models/Club');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const bcrypt = require('bcryptjs');


// All routes here require admin access
router.use(authMiddleware);
router.use(adminMiddleware);

// --- User Management ---

// --- User Management ---

// Create user
// Create user
router.post('/users', async (req, res) => {
    console.log("=== POST /api/admin/users HIT ===");
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    try {
        const { firstName, lastName, email, role, password, studentId, faculty } = req.body;

        // Basic validation
        if (!email || !password) {
            console.log("Missing fields:", { email: !!email, password: !!password });
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if user exists
        console.log("Checking if user exists:", email);
        const existing = await User.findOne({ email });
        if (existing) {
            console.log("User already exists. Sending 400:", { message: 'User already exists' });
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        console.log("Hashing password...");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate username if not provided (simple fallback)
        const username = req.body.username || email.split('@')[0];

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role: role || 'student',
            studentId,
            faculty
        });

        console.log("Saving user...");
        await newUser.save();
        console.log("User saved successfully");

        // Return without password
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json(userResponse);

    } catch (error) {
        console.error("ERROR in POST /api/admin/users:", error);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message || error.toString(),
            details: error
        });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user role
router.put('/users/:id/role', async (req, res) => {
    try {
        const { role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user status
router.put('/users/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { status }, { new: true }).select('-password');

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user details (General)
router.put('/users/:id', async (req, res) => {
    try {
        const { firstName, lastName, email, role, status } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, role, status },
            { new: true, runValidators: true }
        ).select('-password');
        res.json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// --- Club Management ---

// Get all pending join requests across all clubs
router.get('/clubs/pending-requests', async (req, res) => {
    try {
        const clubs = await Club.find({ 'pendingMembers.0': { $exists: true } })
            .populate('pendingMembers', 'username email firstName lastName')
            .select('name pendingMembers');
        res.json(clubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Approve join request
router.post('/clubs/:clubId/approve/:userId', async (req, res) => {
    try {
        const { clubId, userId } = req.params;

        // Remove from pending, add to members
        const club = await Club.findByIdAndUpdate(clubId, {
            $pull: { pendingMembers: userId },
            $addToSet: { members: userId },
            $inc: { memberCount: 1 }
        }, { new: true });

        // Also update User profile
        await User.findByIdAndUpdate(userId, {
            $addToSet: { joinedClubs: clubId }
        });



        res.json({ success: true, club });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Reject join request
router.post('/clubs/:clubId/reject/:userId', async (req, res) => {
    try {
        const { clubId, userId } = req.params;

        const club = await Club.findByIdAndUpdate(clubId, {
            $pull: { pendingMembers: userId }
        }, { new: true });



        res.json({ success: true, club });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all clubs
router.get('/clubs', async (req, res) => {
    try {
        const clubs = await Club.find().populate('sport', 'name');
        res.json(clubs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update club status
router.put('/clubs/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const club = await Club.findByIdAndUpdate(req.params.id, { status }, { new: true });

        res.json(club);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

