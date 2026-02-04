# University Sports Portal - Backend API

## Project Structure
```
backend/
├── models/           # Mongoose schemas (User, Sport, Club, Tournament, etc.)
├── routes/           # API endpoints (auth, sports, clubs, tournaments, etc.)
├── middleware/       # Authentication & error handling middleware
├── config/           # Database configuration
├── seed.js          # Seed database with sample data
├── server.js        # Express server entry point
├── .env             # Environment variables
└── package.json     # Dependencies & scripts
```

## Prerequisites
- **Node.js** v16+ ([download](https://nodejs.org))
- **MongoDB** Community Edition ([download](https://www.mongodb.com/try/download/community))

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Start MongoDB Server** (keep running):
```bash
mongod
```

3. **Seed the database** (in new terminal):
```bash
npm run seed
```

4. **Start development server:**
```bash
npm run dev
```

Server runs on `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Sports Management
- `GET /api/sports` - Get all sports
- `POST /api/sports` - Create sport
- `GET /api/sports/:id` - Get sport details
- `PUT /api/sports/:id` - Update sport
- `DELETE /api/sports/:id` - Delete sport

### Clubs
- `GET /api/clubs` - Get all clubs
- `POST /api/clubs` - Create club
- `GET /api/clubs/:id` - Get club details

### Tournaments
- `GET /api/tournaments` - Get all tournaments
- `POST /api/tournaments` - Create tournament
- `GET /api/tournaments/:id` - Get tournament details

### Athletes
- `GET /api/athletes` - Get all athletes
- `POST /api/athletes` - Register athlete
- `GET /api/athletes/:id` - Get athlete profile

### Coaches
- `GET /api/coaches` - Get all coaches
- `POST /api/coaches` - Add coach
- `GET /api/coaches/:id` - Get coach details

### Training Programs
- `GET /api/training-programs` - Get all programs
- `POST /api/training-programs` - Create program

### Events, Schedules, Results, Facilities, Gallery
- Similar CRUD operations for each resource

## Sample Test Credentials
After seeding, use these to login:

**Admin:**
- Email: `admin@uov.test`
- Password: `password123`

**Coach:**
- Email: `coach1@uov.test`
- Password: `password123`

**Student:**
- Email: `student1@uov.test`
- Password: `password123`

## Environment Variables (.env)
```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/uov-sports
JWT_SECRET=your_secret_key_here
CORS_ORIGIN=http://localhost:3000
```

## Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run seed` - Populate database with sample data
- `npm start` - Start production server

## Database Collections
1. **Users** - User accounts & roles
2. **Sports** - Sport types (Cricket, Football, etc.)
3. **Clubs** - Sports clubs
4. **Tournaments** - Competition events
5. **Athletes** - Athlete profiles & stats
6. **Coaches** - Coach information
7. **TrainingPrograms** - Training sessions
8. **Events** - Tournament events
9. **Facilities** - Sports facilities
10. **Schedules** - Match/training schedules
11. **Results** - Match results
12. **Gallery** - Photos & videos

## Authentication
Protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

## Troubleshooting

**MongoDB connection error:**
- Ensure MongoDB is running: `mongod`
- Check `.env` has correct `MONGODB_URI`

**Seed script fails:**
- Make sure MongoDB is running
- Delete collections manually if needed: `db.dropDatabase()`

**Port already in use:**
- Change `PORT` in `.env` file

## Technology Stack
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
