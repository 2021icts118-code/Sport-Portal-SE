require('dotenv').config();
const mongoose = require('mongoose');
const Sport = require('./models/Sport');
const Club = require('./models/Club');

const sportsPortalData = [
    {
        id: 1,
        name: "Team Sports",
        description: "Competitive team-based sports activities",
        icon: "🏆",
        sports: [
            {
                name: "Cricket",
                type: "Team",
                description: "University cricket team and club activities",
                clubs: ["UoV Cricket Club", "Men's Cricket Team", "Women's Cricket Team", "Cricket Academy"],
                achievements: ["Inter-University Champions 2023", "5 District Level Titles"],
                players: 85,
                rating: 4.8,
                contact: "sports.cricket@uov.ac.lk"
            },
            {
                name: "Football",
                type: "Team",
                description: "Soccer team and recreational football",
                clubs: ["UoV Football Club", "Men's Football Team", "Women's Football Team", "Football Academy"],
                achievements: ["Inter-Faculty Champions 2024", "3 Tournament Wins"],
                players: 120,
                rating: 4.7,
                contact: "sports.football@uov.ac.lk"
            },
            {
                name: "Volleyball",
                type: "Team",
                description: "Indoor and beach volleyball activities",
                clubs: ["UoV Volleyball Club", "Men's Volleyball Team", "Women's Volleyball Team"],
                achievements: ["National University Games Participants"],
                players: 65,
                rating: 4.5,
                contact: "sports.volleyball@uov.ac.lk"
            },
            {
                name: "Basketball",
                type: "Team",
                description: "University basketball team and tournaments",
                clubs: ["UoV Basketball Club", "Men's Basketball Team", "Women's Basketball Team"],
                achievements: ["District Level Runners-up"],
                players: 45,
                rating: 4.4,
                contact: "sports.basketball@uov.ac.lk"
            },
            {
                name: "Rugby",
                type: "Team",
                description: "University rugby team and matches",
                clubs: ["UoV Rugby Club", "Men's Rugby Team"],
                achievements: ["Inter-University Tournament Participants"],
                players: 55,
                rating: 4.6,
                contact: "sports.rugby@uov.ac.lk"
            },
            {
                name: "Elle",
                type: "Team",
                description: "Traditional Sri Lankan sport elle",
                clubs: ["UoV Elle Club", "Elle Team"],
                achievements: ["Traditional Sports Champions"],
                players: 40,
                rating: 4.3,
                contact: "sports.elle@uov.ac.lk"
            },
            {
                name: "Netball",
                type: "Team",
                description: "Netball team and competitions",
                clubs: ["UoV Netball Club", "Women's Netball Team"],
                achievements: ["District Level Participants"],
                players: 50,
                rating: 4.4,
                contact: "sports.netball@uov.ac.lk"
            }
        ]
    },
    {
        id: 2,
        name: "Individual Sports",
        description: "Personal achievement based sports",
        icon: "⭐",
        sports: [
            {
                name: "Athletics",
                type: "Individual",
                description: "Track and field events",
                clubs: ["UoV Athletics Club", "Track Team", "Field Team"],
                achievements: ["5 Gold Medals in University Games", "National Level Champions"],
                players: 95,
                rating: 4.9,
                contact: "sports.athletics@uov.ac.lk"
            },
            {
                name: "Badminton",
                type: "Individual",
                description: "Indoor court badminton",
                clubs: ["UoV Badminton Club", "Men's Team", "Women's Team"],
                achievements: ["Inter-University Champions 2022"],
                players: 40,
                rating: 4.6,
                contact: "sports.badminton@uov.ac.lk"
            },
            {
                name: "Table Tennis",
                type: "Individual",
                description: "Indoor table tennis activities",
                clubs: ["UoV Table Tennis Club"],
                achievements: ["University Games Participants"],
                players: 35,
                rating: 4.3,
                contact: "sports.tabletennis@uov.ac.lk"
            },
            {
                name: "Chess",
                type: "Individual",
                description: "Strategic board game competitions",
                clubs: ["UoV Chess Club"],
                achievements: ["2 National Level Awards"],
                players: 25,
                rating: 4.8,
                contact: "sports.chess@uov.ac.lk"
            },
            {
                name: "Carrom",
                type: "Individual",
                description: "Traditional board game",
                clubs: ["UoV Carrom Club"],
                achievements: ["Inter-University Tournament"],
                players: 30,
                rating: 4.2,
                contact: "sports.carrom@uov.ac.lk"
            },
            {
                name: "Swimming",
                type: "Individual",
                description: "Swimming and water sports activities",
                clubs: ["UoV Swimming Club", "Aquatics Team"],
                achievements: ["University Swimming Champions"],
                players: 45,
                rating: 4.5,
                contact: "sports.swimming@uov.ac.lk"
            }
        ]
    },
    {
        id: 3,
        name: "University Teams",
        description: "Official university representative teams",
        icon: "🎓",
        sports: [
            {
                name: "Men's Sports Team",
                type: "Team",
                description: "University men's combined sports team",
                clubs: ["Men's Cricket", "Men's Football", "Men's Athletics"],
                achievements: ["Overall University Champions 2023"],
                players: 250,
                rating: 4.9,
                contact: "sports.mens@uov.ac.lk"
            },
            {
                name: "Women's Sports Team",
                type: "Team",
                description: "University women's combined sports team",
                clubs: ["Women's Cricket", "Women's Football", "Women's Athletics"],
                achievements: ["Women's Sports Festival Champions"],
                players: 180,
                rating: 4.8,
                contact: "sports.womens@uov.ac.lk"
            },
            {
                name: "Mixed Teams",
                type: "Team",
                description: "Co-ed sports activities",
                clubs: ["Mixed Badminton", "Mixed Table Tennis"],
                achievements: ["University Games Participants"],
                players: 95,
                rating: 4.5,
                contact: "sports.mixed@uov.ac.lk"
            },
            {
                name: "Development Squad",
                type: "Development",
                description: "Junior development program",
                clubs: ["Junior Academy", "Development Team"],
                achievements: ["Future Champions Program"],
                players: 120,
                rating: 4.7,
                contact: "sports.development@uov.ac.lk"
            }
        ]
    }
];

async function seedData() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/uov-sports');
        console.log('Connected to MongoDB...');

        for (const group of sportsPortalData) {
            console.log(`Processing group: ${group.name}`);

            for (const sportData of group.sports) {
                // Map category type
                let category = sportData.type.toLowerCase();
                if (category === 'development') category = 'team'; // Fallback to team

                // Create or Update Sport
                const sport = await Sport.findOneAndUpdate(
                    { name: sportData.name },
                    {
                        category,
                        description: sportData.description,
                        icon: group.icon, // Using group icon as default
                        players: sportData.players,
                        rating: sportData.rating,
                        achievements: sportData.achievements,
                        contact: sportData.contact,
                        popularity: sportData.rating > 4.6 ? 'Very High' : (sportData.rating > 4.4 ? 'High' : 'Medium')
                    },
                    { upsert: true, new: true }
                );

                console.log(`- Sport: ${sport.name} (${sport._id})`);

                // Create Clubs
                for (const clubName of sportData.clubs) {
                    const club = await Club.findOneAndUpdate(
                        { name: clubName },
                        {
                            sport: sport._id,
                            category: category,
                            description: `Official ${clubName} of University of Vavuniya.`,
                            achievements: sportData.achievements,
                            contact: sportData.contact,
                            memberCount: Math.floor(sportData.players / sportData.clubs.length)
                        },
                        { upsert: true, new: true }
                    );

                    // Update Sport with club reference if not already there
                    if (!sport.clubs.includes(club._id)) {
                        sport.clubs.push(club._id);
                        await sport.save();
                    }

                    console.log(`  * Club: ${clubName}`);
                }
            }
        }

        console.log('Database seeding completed successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

seedData();
