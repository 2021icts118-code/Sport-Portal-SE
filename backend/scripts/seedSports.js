const mongoose = require('mongoose');
const Sport = require('../models/Sport');
// require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb+srv://yashodakulathunga2000_db_user:OiccDC9QuAtQPGeM@cluster0.hmb2pyh.mongodb.net/?appName=Cluster0')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const sportsData = [
    // Team Sports
    {
        name: 'Cricket',
        category: 'team',
        description: 'A bat-and-ball game played between two teams of eleven players on a field at the centre of which is a 22-yard pitch.',
        icon: '🏏',
        popularity: 'Very High',
        participants: '50+',
        programs: [
            {
                id: 1,
                name: 'Varsity Team',
                icon: '🏆',
                description: 'Competitive university representation in inter-university tournaments.',
                details: {
                    overview: 'The Varsity Cricket team represents the university in national level tournaments. Training involves rigorous fitness sessions, net practices, and practice matches.',
                    facilities: ['Main Ground', 'Indoor Nets'],
                    competitions: ['Inter-University Games', 'Freshers Tournament']
                },
                events: ['Selection Trials', 'Practice Matches']
            },
            {
                id: 2,
                name: 'Intramural League',
                icon: '🤝',
                description: 'Friendly department-level tournaments for all students.',
                details: {
                    overview: 'A fun and competitive league for students to play casually with their batchmates.',
                    facilities: ['Main Ground'],
                    competitions: ['Faculty Cup']
                },
                events: ['Weekend Matches']
            }
        ],
        rules: [
            { category: 'General', items: ['Two teams of 11 players.', '20 overs per side for T20 matches.'] },
            { category: 'Equipment', items: ['Helmet mandatory for batsmen.', 'White clothing for test matches, colored for limited overs.'] }
        ]
    },
    {
        name: 'Football',
        category: 'team',
        description: 'A team sport played with a spherical ball between two teams of 11 players.',
        icon: '⚽',
        popularity: 'High',
        participants: '40+',
        programs: [
            {
                id: 1,
                name: 'University Squad',
                icon: '👟',
                description: 'Elite football training for the university team.',
                details: {
                    overview: 'Focuses on tactical discipline, stamina, and ball control.',
                    facilities: ['Football Field', 'Gymnasium'],
                    competitions: ['SLilg', 'Division Matches']
                },
                events: ['Fitness Test', 'Tactical Drills']
            }
        ],
        rules: [
            { category: 'Gameplay', items: ['90 minutes match duration.', 'No hands allowed except goalkeeper inside box.'] }
        ]
    },
    {
        name: 'Volleyball',
        category: 'team',
        description: 'A team sport in which two teams of six players are separated by a net.',
        icon: '🏐',
        popularity: 'High',
        participants: '30+',
        programs: [
            {
                id: 1,
                name: 'Men\'s Team',
                icon: '🥇',
                description: 'Men\'s varsity volleyball team.',
                details: { overview: 'High intensity training.', facilities: ['Indoor Court'], competitions: ['Inter-Uni'] }
            },
            {
                id: 2,
                name: 'Women\'s Team',
                icon: '🥇',
                description: 'Women\'s varsity volleyball team.',
                details: { overview: 'Skill development and teamwork.', facilities: ['Indoor Court'], competitions: ['Inter-Uni'] }
            }
        ],
        rules: [
            { category: 'Scoring', items: ['Rally scoring system.', 'Best of 5 sets.'] }
        ]
    },
    {
        name: 'Basketball',
        category: 'team',
        description: 'A game played between two teams of five players each on a rectangular court.',
        icon: '🏀',
        popularity: 'Medium',
        participants: '20+',
        programs: [
            { id: 1, name: 'Varsity Basketball', icon: '⛹️', description: 'University basketball team.', details: { overview: 'Fast paced game.', facilities: ['Basketball Court'], competitions: ['Uni League'] } }
        ],
        rules: [{ category: 'Game', items: ['4 Quarters of 10 minutes.', 'Shot clock 24 seconds.'] }]
    },
    {
        name: 'Rugby',
        category: 'team',
        description: 'A team sport that is widely popular, played with an oval ball that may be kicked, carried, and passed.',
        icon: '🏉',
        popularity: 'High',
        participants: '30+',
        programs: [{ id: 1, name: 'Rugby XV', icon: '⚔️', description: '15-a-side rugby team.', details: { overview: 'Physical endurance training.', facilities: ['Rugby Pitch'], competitions: ['Rugby Championship'] } }],
        rules: [{ category: 'Match', items: ['80 minutes duration.', 'Forward passes not allowed.'] }]
    },
    {
        name: 'Elle',
        category: 'team',
        description: 'A traditional Sri Lankan bat-and-ball game.',
        icon: '🏏',
        popularity: 'High',
        participants: '40+',
        programs: [{ id: 1, name: 'Elle Team', icon: '🇱🇰', description: 'Traditional sport team.', details: { overview: 'Focus on speed and hitting.', facilities: ['Open Ground'], competitions: ['National Elle Championship'] } }],
        rules: [{ category: 'General', items: ['Defending team tries to eliminate runners.', 'Stops at bases.'] }]
    },
    {
        name: 'Netball',
        category: 'team',
        description: 'A ball sport played by two teams of seven players.',
        icon: '🏐',
        popularity: 'Medium',
        participants: '20+',
        programs: [{ id: 1, name: 'Netball Team', icon: '👗', description: 'Women\'s netball team.', details: { overview: 'Agility and shooting practice.', facilities: ['Netball Court'], competitions: ['Inter-Uni'] } }],
        rules: [{ category: 'Gameplay', items: ['No running with the ball.', '3 seconds possession limit.'] }]
    },

    // Individual Sports
    {
        name: 'Athletics',
        category: 'individual',
        description: 'A collection of sporting events that involve competitive running, jumping, throwing, and walking.',
        icon: '🏃',
        popularity: 'Very High',
        participants: '100+',
        programs: [
            { id: 1, name: 'Track Events', icon: '💨', description: 'Sprints, relay, and long distance.', details: { overview: 'Speed and endurance.', facilities: ['Track'], competitions: ['Inter-Uni'] } },
            { id: 2, name: 'Field Events', icon: '💪', description: 'Jumps and throws.', details: { overview: 'Strength and technique.', facilities: ['Field'], competitions: ['Inter-Uni'] } }
        ],
        rules: [{ category: 'Track', items: ['False start entails disqualification.', 'Must stay in lane for sprints.'] }]
    },
    {
        name: 'Badminton',
        category: 'individual',
        description: 'A racquet sport played using racquets to hit a shuttlecock across a net.',
        icon: '🏸',
        popularity: 'High',
        participants: '30+',
        programs: [{ id: 1, name: 'Badminton Squad', icon: '🏸', description: 'University Badminton Team', details: { overview: 'Reflexes and agility.', facilities: ['Indoor Court'], competitions: ['Inter-Uni'] } }],
        rules: [{ category: 'Scoring', items: ['21 points per game.', 'Best of 3 games.'] }]
    },
    {
        name: 'Table Tennis',
        category: 'individual',
        description: 'A sport in which two or four players hit a lightweight ball back and forth across a table using small rackets.',
        icon: '🏓',
        popularity: 'Medium',
        participants: '20+',
        programs: [{ id: 1, name: 'TT Squad', icon: '🏓', description: 'Table Tennis Team', details: { overview: 'Quick reactions.', facilities: ['Indoor Hall'], competitions: ['Inter-Uni'] } }],
        rules: [{ category: 'Service', items: ['Ball must be tossed 6 inches high.', 'Must bounce on both sides.'] }]
    },
    {
        name: 'Chess',
        category: 'individual',
        description: 'A board game played between two players.',
        icon: '♟️',
        popularity: 'Medium',
        participants: '20+',
        programs: [{ id: 1, name: 'Chess Club', icon: '🧠', description: 'Competitive chess team.', details: { overview: 'Strategy and tactics.', facilities: ['Study Hall'], competitions: ['Inter-Uni'] } }],
        rules: [{ category: 'Time', items: ['Touch move rule applies.', 'Specific time controls.'] }]
    },
    {
        name: 'Carrom',
        category: 'individual',
        description: 'A tabletop game of Indian origin.',
        icon: '🎯',
        popularity: 'High',
        participants: '40+',
        programs: [{ id: 1, name: 'Carrom Team', icon: '👌', description: 'Carrom players squad.', details: { overview: 'Precision striking.', facilities: ['Common Room'], competitions: ['Inter-Uni'] } }],
        rules: [{ category: 'Game', items: ['Queen must be covered.', 'Foul if striker goes in pocket.'] }]
    },
    {
        name: 'Swimming',
        category: 'individual',
        description: 'An individual or team racing sport that requires the use of one\'s entire body to move through water.',
        icon: '🏊',
        popularity: 'Medium',
        participants: '15+',
        programs: [{ id: 1, name: 'Swim Team', icon: '🌊', description: 'Competitive swimming team.', details: { overview: 'Laps and technique.', facilities: ['Swimming Pool'], competitions: ['Inter-Uni'] } }],
        rules: [{ category: 'Strokes', items: ['Specific rules for Breaststroke, Butterfly etc.', 'Touch rules at wall.'] }]
    }
];

const seedDB = async () => {
    try {
        // We will update existing or insert new, based on name
        for (const sport of sportsData) {
            await Sport.findOneAndUpdate(
                { name: sport.name },
                { $set: sport },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            console.log(`Seeded: ${sport.name}`);
        }
        console.log('Seeding Completed!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
