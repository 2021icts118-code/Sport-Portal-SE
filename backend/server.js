require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// Database Connection
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const sportsRouter = require('./routes/sports');
const clubsRouter = require('./routes/clubs');
const tournamentsRouter = require('./routes/tournaments');
const athletesRouter = require('./routes/athletes');
const coachesRouter = require('./routes/coaches');
const trainingProgramsRouter = require('./routes/trainingPrograms');
const eventsRouter = require('./routes/events');
const facilitiesRouter = require('./routes/facilities');
const schedulesRouter = require('./routes/schedules');
const resultsRouter = require('./routes/results');
const galleryRouter = require('./routes/gallery');
const adminRouter = require('./routes/admin');

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/sports', sportsRouter);
app.use('/api/clubs', clubsRouter);
app.use('/api/tournaments', tournamentsRouter);
app.use('/api/athletes', athletesRouter);
app.use('/api/coaches', coachesRouter);
app.use('/api/training-programs', trainingProgramsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/facilities', facilitiesRouter);
app.use('/api/schedules', schedulesRouter);
app.use('/api/results', resultsRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/admin', adminRouter);
// Data for ExploreCategory
const categories = [
  {
    icon: "Trophy",
    title: "Sports Clubs",
    description: "Join officially registered university sports clubs and teams.",
    link: "/clubs",
    gradient: "from-blue-600 to-blue-400",
    stats: "50+ Clubs",
    rating: 4.8,
    tags: ["Cricket", "Football", "Basketball", "Volleyball"],
    color: "bg-blue-500",
    highlight: "Official Registration"
  },
  {
    icon: "Calendar",
    title: "Tournaments",
    description: "Participate in inter-faculty and university-level tournaments.",
    link: "/tournaments",
    gradient: "from-emerald-600 to-emerald-400",
    stats: "100+ Events",
    rating: 4.9,
    tags: ["Annual Meet", "League", "Cup", "Championship"],
    color: "bg-emerald-500",
    highlight: "Live Updates"
  },
  {
    icon: "Target",
    title: "Training Programs",
    description: "Access professional coaching and skill development sessions.",
    link: "/training",
    gradient: "from-amber-600 to-amber-400",
    stats: "Weekly Sessions",
    rating: 4.7,
    tags: ["Coaching", "Fitness", "Skill Drills", "Workshops"],
    color: "bg-amber-500",
    highlight: "Expert Coaches"
  },
  {
    icon: "BarChart3",
    title: "Player Analytics",
    description: "Track performance statistics and progress analytics.",
    link: "/analytics",
    gradient: "from-rose-600 to-rose-400",
    stats: "1000+ Players",
    rating: 4.8,
    tags: ["Stats", "Progress", "Rankings", "Achievements"],
    color: "bg-rose-500",
    highlight: "Real-time Tracking"
  }
];

const sportsStats = [
  { icon: "Users", value: "50+", label: "Active Clubs" },
  { icon: "Star", value: "4.8★", label: "Avg Rating" },
  { icon: "Clock", value: "24/7", label: "Portal Access" },
  { icon: "TrendingUp", value: "1000+", label: "Athletes" }
];

// Data for Province/Sports Portal
// Data for Province/Sports Portal (Migrated to MongoDB)
const Sport = require('./models/Sport');
const Club = require('./models/Club');

// Routes
app.get('/', (req, res) => {
  res.send('University Sports Portal API is running');
});

app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/stats', (req, res) => {
  res.json(sportsStats);
});

app.get('/api/portal-data', async (req, res) => {
  try {
    const sports = await Sport.find().populate('clubs');

    const teamSports = sports.filter(s => s.category === 'team').map(s => {
      const sportObj = s.toObject();
      return {
        ...sportObj,
        id: sportObj._id,
        type: 'Team',
        clubs: sportObj.clubs.map(c => c.name || c)
      };
    });

    const individualSports = sports.filter(s => s.category === 'individual').map(s => {
      const sportObj = s.toObject();
      return {
        ...sportObj,
        id: sportObj._id,
        type: 'Individual',
        clubs: sportObj.clubs.map(c => c.name || c)
      };
    });

    const grouped = [
      {
        id: 1,
        name: "Team Sports",
        icon: "🏆",
        description: "Competitive team-based sports activities",
        sports: teamSports
      },
      {
        id: 2,
        name: "Individual Sports",
        icon: "⭐",
        description: "Personal achievement based sports",
        sports: individualSports
      }
    ];

    res.json(grouped);
  } catch (err) {
    console.error('API Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Error handling middleware
app.use(errorHandler);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ Server is running on http://localhost:${PORT}`);
});

// Forced restart for route update debug-v3
