const mongoose = require('mongoose');
const User = require('../models/User');
const Club = require('../models/Club');
const Sport = require('../models/Sport');

// Connect to MongoDB
mongoose.connect('mongodb+srv://yashodakulathunga2000_db_user:OiccDC9QuAtQPGeM@cluster0.hmb2pyh.mongodb.net/?appName=Cluster0')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const sinhalaUsers = [
    { firstName: 'Dimuth', lastName: 'Karunaratne', role: 'student', email: 'dimuth@example.com' },
    { firstName: 'Angelo', lastName: 'Mathews', role: 'student', email: 'angelo@example.com' },
    { firstName: 'Kusal', lastName: 'Mendis', role: 'student', email: 'kusal@example.com' },
    { firstName: 'Wanindu', lastName: 'Hasaranga', role: 'student', email: 'wanindu@example.com' },
    { firstName: 'Lasintha', lastName: 'Jayawardena', role: 'student', email: 'lasintha@example.com' },
    { firstName: 'Tharjini', lastName: 'Sivalingam', role: 'student', email: 'tharjini@example.com' },
    { firstName: 'Chamari', lastName: 'Atapattu', role: 'student', email: 'chamari@example.com' },
    { firstName: 'Dhananjaya', lastName: 'de Silva', role: 'student', email: 'dhananjaya@example.com' },
    { firstName: 'Pathum', lastName: 'Nissanka', role: 'student', email: 'pathum@example.com' },
    { firstName: 'Dasun', lastName: 'Shanaka', role: 'student', email: 'dasun@example.com' }
];

const seedClubs = async () => {
    try {
        console.log('Creating Users...');
        const userIds = {};

        for (const u of sinhalaUsers) {
            const user = await User.findOneAndUpdate(
                { email: u.email },
                {
                    username: u.email.split('@')[0],
                    password: 'hashedpassword123', // Dummy password
                    ...u
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            userIds[u.firstName] = user._id;
            console.log(`User seeded: ${u.firstName} ${u.lastName}`);
        }

        console.log('Seeding Clubs...');

        // Helper to find sport
        const getSport = async (name) => {
            const s = await Sport.findOne({ name });
            if (!s) console.log(`Sport ${name} not found! Run seedSports.js first.`);
            return s?._id;
        };

        const clubsData = [
            {
                name: 'University Cricket Club',
                sportName: 'Cricket',
                captainName: 'Dimuth',
                memberNames: ['Angelo', 'Kusal', 'Wanindu', 'Dhananjaya', 'Pathum'],
                description: 'The premier cricket club of the university, fostering talent for national level competitions.',
                achievements: ['Inter-University Champions 2024', 'District Cup Winners 2023'],
                logo: '🏏'
            },
            {
                name: 'Volleyball Spikers',
                sportName: 'Volleyball',
                captainName: 'Lasintha',
                memberNames: ['Dasun'],
                description: 'A dynamic volleyball community dedicated to excellence and teamwork.',
                achievements: ['Regional Finalists 2024'],
                logo: '🏐'
            },
            {
                name: 'Netball Queens',
                sportName: 'Netball',
                captainName: 'Tharjini',
                memberNames: ['Chamari'], // Mixing names for demo
                description: 'Empowering women through sports and competitive netball.',
                achievements: ['Varsity League Winners'],
                logo: '👗'
            }
        ];

        for (const data of clubsData) {
            const sportId = await getSport(data.sportName);
            if (!sportId) continue;

            const captainId = userIds[data.captainName];
            if (!captainId) {
                console.error(`ERROR: Captain "${data.captainName}" not found in created users!`);
                console.error(`Available Users: ${Object.keys(userIds).join(', ')}`);
                throw new Error(`Captain mismatch for ${data.name}`);
            }
            const memberIds = data.memberNames.map(name => {
                const id = userIds[name];
                if (!id) console.error(`WARNING: Member "${name}" not found!`);
                return id;
            }).filter(id => id);

            await Club.findOneAndUpdate(
                { name: data.name },
                {
                    sport: sportId,
                    category: 'team',
                    captain: captainId,
                    members: memberIds,
                    memberCount: memberIds.length + 1, // Captain + members
                    description: data.description,
                    achievements: data.achievements,
                    status: 'active',
                    logo: data.logo
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`Club seeded: ${data.name} with Captain ID: ${captainId}`);
        }

        console.log('Club Seeding Completed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedClubs();
