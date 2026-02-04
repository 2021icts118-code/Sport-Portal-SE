const mongoose = require('mongoose');
const connectDB = require('./config/database');
const User = require('./models/User');
const Sport = require('./models/Sport');
const Event = require('./models/Event');
const Facility = require('./models/Facility');
const Coach = require('./models/Coach');
const Athlete = require('./models/Athlete');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedAthletics = async () => {
    try {
        await connectDB();
        console.log('Database connected...');

        // 1. Get or Create 'Athletics' Sport
        let athleticsSport = await Sport.findOne({ name: 'Athletics' });
        if (!athleticsSport) {
            athleticsSport = await Sport.create({
                name: 'Athletics',
                category: 'individual',
                description: 'Track and field events.',
                icon: '🏃‍♂️',
                programs: [
                    {
                        id: 1,
                        name: "Track Events",
                        events: ["100m Sprint", "200m Sprint", "400m Run", "800m Run", "1500m Run", "5000m Run", "10000m Run", "Marathon"],
                        description: "Speed and endurance-based running competitions",
                        icon: "🏃‍♂️",
                        details: {
                            overview: "Track events form the foundation of athletics, testing speed, endurance, and tactical racing skills. Our program covers all major running distances from short sprints to long-distance running.",
                            facilities: ["8-lane running track", "Electronic timing system", "Starting blocks", "Photo finish camera"],
                            training: ["Interval training", "Pace work", "Hill repeats", "Recovery sessions"],
                            competitions: ["University Championships", "National Qualifiers", "Inter-university meets"]
                        }
                    },
                    {
                        id: 2,
                        name: "Field Events",
                        events: ["High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Shot Put", "Discus Throw", "Javelin Throw", "Hammer Throw"],
                        description: "Strength and technique-based competitions",
                        icon: "🤾‍♂️",
                        details: {
                            overview: "Field events combine strength, technique, and precision. Our comprehensive program develops both throwing and jumping disciplines with world-class coaching and facilities.",
                            facilities: ["Shot put circle", "Discus cage", "Javelin runway", "High jump mats", "Pole vault runway", "Landing pits"],
                            training: ["Technical drills", "Strength training", "Coordination exercises", "Competition simulation"],
                            competitions: ["Field events championships", "Combined events", "Specialty meets"]
                        }
                    },
                    {
                        id: 3,
                        name: "Hurdles & Relays",
                        events: ["110m Hurdles", "400m Hurdles", "4x100m Relay", "4x400m Relay"],
                        description: "Technical running with obstacles and team coordination",
                        icon: "🏃‍♂️‍➡️",
                        details: {
                            overview: "Hurdles and relays require perfect technique, timing, and teamwork. Our specialized training develops the unique skills needed for these challenging events.",
                            facilities: ["Hurdle tracks", "Relay zones", "Exchange zones", "Timing systems"],
                            training: ["Hurdle drills", "Relay exchanges", "Start techniques", "Team coordination"],
                            competitions: ["Hurdles championships", "Relay competitions", "Combined events"]
                        }
                    },
                    {
                        id: 4,
                        name: "Cross Country & Race Walking",
                        events: ["Cross Country", "Race Walking", "Mountain Running"],
                        description: "Long-distance running in varied terrain",
                        icon: "🥇",
                        details: {
                            overview: "Cross country and race walking build endurance and mental toughness. These events test athletes in varied terrain and weather conditions.",
                            facilities: ["Cross country trails", "Race walking tracks", "Mountain paths", "Weather stations"],
                            training: ["Long runs", "Hill training", "Terrain adaptation", "Mental preparation"],
                            competitions: ["Cross country championships", "Race walking meets", "Mountain running events"]
                        }
                    }
                ],
                rules: [
                    {
                        category: "Competition Rules",
                        items: [
                            "All athletes must be registered university students",
                            "Medical clearance required for participation",
                            "Anti-doping policy strictly enforced",
                            "Minimum training attendance: 80% for competitions"
                        ]
                    },
                    {
                        category: "Training Guidelines",
                        items: [
                            "Mandatory warm-up and cool-down routines",
                            "Equipment must be used properly and safely",
                            "Training sessions: Monday-Friday, 6:00-8:00 AM",
                            "Rest days must be observed to prevent injury"
                        ]
                    },
                    {
                        category: "Safety Protocols",
                        items: [
                            "Emergency contact information must be updated",
                            "First aid kits available at all training sites",
                            "Weather conditions monitored for outdoor activities",
                            "Injury reporting within 24 hours mandatory"
                        ]
                    }
                ]
            });
            console.log('Created Athletics sport');
        } else {
            // Update existing sport if it exists but lacks programs/rules
            athleticsSport.programs = [
                {
                    id: 1,
                    name: "Track Events",
                    events: ["100m Sprint", "200m Sprint", "400m Run", "800m Run", "1500m Run", "5000m Run", "10000m Run", "Marathon"],
                    description: "Speed and endurance-based running competitions",
                    icon: "🏃‍♂️",
                    details: {
                        overview: "Track events form the foundation of athletics, testing speed, endurance, and tactical racing skills. Our program covers all major running distances from short sprints to long-distance running.",
                        facilities: ["8-lane running track", "Electronic timing system", "Starting blocks", "Photo finish camera"],
                        training: ["Interval training", "Pace work", "Hill repeats", "Recovery sessions"],
                        competitions: ["University Championships", "National Qualifiers", "Inter-university meets"]
                    }
                },
                {
                    id: 2,
                    name: "Field Events",
                    events: ["High Jump", "Long Jump", "Triple Jump", "Pole Vault", "Shot Put", "Discus Throw", "Javelin Throw", "Hammer Throw"],
                    description: "Strength and technique-based competitions",
                    icon: "🤾‍♂️",
                    details: {
                        overview: "Field events combine strength, technique, and precision. Our comprehensive program develops both throwing and jumping disciplines with world-class coaching and facilities.",
                        facilities: ["Shot put circle", "Discus cage", "Javelin runway", "High jump mats", "Pole vault runway", "Landing pits"],
                        training: ["Technical drills", "Strength training", "Coordination exercises", "Competition simulation"],
                        competitions: ["Field events championships", "Combined events", "Specialty meets"]
                    }
                },
                {
                    id: 3,
                    name: "Hurdles & Relays",
                    events: ["110m Hurdles", "400m Hurdles", "4x100m Relay", "4x400m Relay"],
                    description: "Technical running with obstacles and team coordination",
                    icon: "🏃‍♂️‍➡️",
                    details: {
                        overview: "Hurdles and relays require perfect technique, timing, and teamwork. Our specialized training develops the unique skills needed for these challenging events.",
                        facilities: ["Hurdle tracks", "Relay zones", "Exchange zones", "Timing systems"],
                        training: ["Hurdle drills", "Relay exchanges", "Start techniques", "Team coordination"],
                        competitions: ["Hurdles championships", "Relay competitions", "Combined events"]
                    }
                },
                {
                    id: 4,
                    name: "Cross Country & Race Walking",
                    events: ["Cross Country", "Race Walking", "Mountain Running"],
                    description: "Long-distance running in varied terrain",
                    icon: "🥇",
                    details: {
                        overview: "Cross country and race walking build endurance and mental toughness. These events test athletes in varied terrain and weather conditions.",
                        facilities: ["Cross country trails", "Race walking tracks", "Mountain paths", "Weather stations"],
                        training: ["Long runs", "Hill training", "Terrain adaptation", "Mental preparation"],
                        competitions: ["Cross country championships", "Race walking meets", "Mountain running events"]
                    }
                }
            ];
            athleticsSport.rules = [
                {
                    category: "Competition Rules",
                    items: [
                        "All athletes must be registered university students",
                        "Medical clearance required for participation",
                        "Anti-doping policy strictly enforced",
                        "Minimum training attendance: 80% for competitions"
                    ]
                },
                {
                    category: "Training Guidelines",
                    items: [
                        "Mandatory warm-up and cool-down routines",
                        "Equipment must be used properly and safely",
                        "Training sessions: Monday-Friday, 6:00-8:00 AM",
                        "Rest days must be observed to prevent injury"
                    ]
                },
                {
                    category: "Safety Protocols",
                    items: [
                        "Emergency contact information must be updated",
                        "First aid kits available at all training sites",
                        "Weather conditions monitored for outdoor activities",
                        "Injury reporting within 24 hours mandatory"
                    ]
                }
            ];
            await athleticsSport.save();
            console.log('Updated Athletics sport with programs and rules');
        }

        // 2. Seed Facilities
        const facilitiesData = [
            {
                name: "Main Athletics Stadium",
                type: "Competition Venue",
                capacity: 5000,
                features: ["8-lane running track", "Field events area", "Electronic timing", "Floodlights"],
                status: "Excellent",
                lastMaintenance: new Date("2025-12-15"),
                sports: [athleticsSport._id]
            },
            {
                name: "Training Track",
                type: "Practice Facility",
                capacity: 200,
                features: ["6-lane synthetic track", "Warm-up area", "Equipment storage"],
                status: "Good",
                lastMaintenance: new Date("2025-11-20"),
                sports: [athleticsSport._id]
            },
            {
                name: "Field Events Complex",
                type: "Specialized Training",
                capacity: 100,
                features: ["Shot put circle", "Discus cage", "Javelin runway", "High jump mats"],
                status: "Excellent",
                lastMaintenance: new Date("2025-12-01"),
                sports: [athleticsSport._id]
            }
        ];

        await Facility.deleteMany({ sports: athleticsSport._id }); // Clear existing
        await Facility.insertMany(facilitiesData);
        console.log('Seeded Facilities');

        // 3. Seed Coaches (Need Users first)
        const coachUsers = [
            { name: "Coach David Brown", role: "Head Athletics Coach", specialization: "Sprints & Relays", email: "david.brown@uov.lk" },
            { name: "Coach Maria Garcia", role: "Field Events Coach", specialization: "Throws & Jumps", email: "maria.garcia@uov.lk" },
            { name: "Coach James Wilson", role: "Distance Running Coach", specialization: "Middle & Long Distance", email: "james.wilson@uov.lk" },
            { name: "Dr. Sarah Chen", role: "Sports Medicine Specialist", specialization: "Injury Prevention & Recovery", email: "sarah.chen@uov.lk" }
        ];

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt);

        await Coach.deleteMany({ sport: athleticsSport._id });

        for (const c of coachUsers) {
            let user = await User.findOne({ email: c.email });
            if (!user) {
                const [firstName, lastName] = c.name.split(' ').length > 2 ? [c.name.split(' ')[0] + ' ' + c.name.split(' ')[1], c.name.split(' ')[2]] : c.name.split(' ');
                user = await User.create({
                    username: c.email.split('@')[0],
                    email: c.email,
                    password,
                    firstName,
                    lastName: lastName || '',
                    role: 'coach',
                    status: 'active'
                });
            }

            await Coach.create({
                user: user._id,
                sport: athleticsSport._id,
                specialization: c.specialization,
                certification: c.role, // Mapping role to certification for simplicity or create separate field
                experience: "10+ years",
                athleteCount: Math.floor(Math.random() * 50) + 10
            });
        }
        console.log('Seeded Coaches');

        // 4. Seed Athletes (Need Users first)
        const athleteProfiles = [
            {
                name: "Sarah Johnson",
                age: 21,
                events: ["100m Sprint", "200m Sprint", "4x100m Relay"],
                email: "sarah.j@stu.uov.lk",
                training: "Advanced",
                medical: "No restrictions",
                achievements: ["University Champion 2025", "National Qualifier"],
                metrics: {
                    personalBests: { "100m": "11.8s", "200m": "24.2s" }
                }
            },
            {
                name: "Mike Davis",
                age: 22,
                events: ["Long Jump", "Triple Jump"],
                email: "mike.d@stu.uov.lk",
                training: "Elite",
                medical: "Mild asthma - monitored",
                achievements: ["Record Holder", "International Competitor"],
                metrics: {
                    bestDistances: { "Long Jump": "7.85m", "Triple Jump": "15.2m" }
                }
            },
            {
                name: "Emma Wilson",
                age: 20,
                events: ["High Jump", "Pole Vault"],
                email: "emma.w@stu.uov.lk",
                training: "Advanced",
                medical: "Excellent health",
                achievements: ["Youth Champion", "Scholar Athlete"],
                metrics: {
                    bestHeights: { "High Jump": "1.85m", "Pole Vault": "4.2m" }
                }
            }
        ];

        await Athlete.deleteMany({ sport: athleticsSport._id });

        for (const a of athleteProfiles) {
            let user = await User.findOne({ email: a.email });
            if (!user) {
                const [firstName, lastName] = a.name.split(' ');
                user = await User.create({
                    username: a.email.split('@')[0],
                    email: a.email,
                    password,
                    firstName,
                    lastName,
                    role: 'student',
                    status: 'active'
                });
            }

            await Athlete.create({
                user: user._id,
                sport: athleticsSport._id,
                age: a.age,
                trainingLevel: a.training,
                medicalInfo: a.medical,
                achievements: a.achievements,
                performanceMetrics: {
                    events: a.events,
                    personalBests: a.metrics.personalBests || {},
                    bestDistances: a.metrics.bestDistances || {},
                    bestHeights: a.metrics.bestHeights || {}
                }
            });
        }
        console.log('Seeded Athletes');

        // 5. Seed Events (Specific disciplines as scheduled events for demo)
        const eventTypesMap = {
            "Track Events": "Track",
            "Field Events": "Field",
            "Hurdles & Relays": "Track",
            "Cross Country & Race Walking": "Track"
        };

        // Refine Field types if possible, else default to Field if enum requires
        // Enum: ['Track', 'Field', 'Throws', 'Jumps', 'Team Match', 'Individual Match']

        const eventsToSeed = [];
        athleticsSport.programs.forEach(prog => {
            const type = eventTypesMap[prog.name] || "Track";
            prog.events.forEach(eventName => {
                // Determine more specific type for Field events
                let specificType = type;
                if (prog.name === "Field Events") {
                    if (eventName.includes("Jump") || eventName.includes("Vault")) specificType = "Jumps";
                    if (eventName.includes("Throw") || eventName.includes("Put")) specificType = "Throws";
                }

                eventsToSeed.push({
                    name: eventName,
                    sport: athleticsSport._id,
                    eventType: specificType,
                    description: `University ${eventName} Competition`,
                    date: new Date(new Date().setDate(new Date().getDate() + Math.random() * 30)), // Next 30 days
                    location: "Main Athletics Stadium",
                    status: "scheduled"
                });
            });
        });

        await Event.deleteMany({ sport: athleticsSport._id });
        await Event.insertMany(eventsToSeed);
        console.log(`Seeded ${eventsToSeed.length} Events`);

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedAthletics();
