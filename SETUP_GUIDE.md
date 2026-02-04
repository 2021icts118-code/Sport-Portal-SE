# Full Stack Setup Guide

## Prerequisites
- Node.js v16+ 
- MongoDB Community Edition
- npm or yarn

## Complete Setup Process

### Step 1: Start MongoDB Server

**Windows:**
```powershell
mongod
```

**Mac/Linux:**
```bash
mongod
```

Keep this terminal open. You should see: `"waiting for connections"`

---

### Step 2: Setup & Start Backend

**In a new terminal:**

```bash
# Navigate to backend folder
cd "backend"

# Install dependencies
npm install

# Run seed to populate database with sample data
npm run seed

# Start development server
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Server is running on http://localhost:4000
```

**Backend is now running on:** `http://localhost:4000`

---

### Step 3: Setup & Start Frontend

**In another new terminal:**

```bash
# Navigate to frontend folder
cd "frontend"

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

Frontend will be available at: `http://localhost:3000`

---

## Testing the API

### Health Check Endpoint
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{"status":"OK","message":"API is running"}
```

### Login Example
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student1@uov.test",
    "password": "password123"
  }'
```

### Get All Sports
```bash
curl http://localhost:4000/api/sports
```

---

## Default Test Credentials

After seeding, use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@uov.test | password123 |
| Coach | coach1@uov.test | password123 |
| Student | student1@uov.test | password123 |

---

## Environment Variables

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend (.env)
```
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/uov-sports
JWT_SECRET=your_super_secret_jwt_key_change_in_production_2024
CORS_ORIGIN=http://localhost:3000
```

---

## Common Issues & Solutions

### ❌ "Failed to fetch" Error
**Problem:** Frontend can't reach backend
**Solution:** 
1. Ensure backend is running: `npm run dev` in backend folder
2. Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
3. Ensure MongoDB is running: `mongod`

### ❌ "MongoDB connection error"
**Problem:** Backend can't connect to database
**Solution:**
1. Start MongoDB: `mongod`
2. Check `MONGODB_URI` in backend `.env`
3. Ensure it's `mongodb://localhost:27017/uov-sports`

### ❌ Port 4000 already in use
**Solution:**
1. Kill the process: `lsof -ti:4000 | xargs kill -9` (Mac/Linux)
2. Or change `PORT` in backend `.env`

### ❌ Port 3000 already in use
**Solution:** Change port: `npm run dev -- -p 3001`

---

## Project Structure

```
project/
├── backend/
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & error handling
│   ├── config/        # Database config
│   ├── .env          # Backend environment variables
│   ├── server.js     # Express server
│   └── seed.js       # Sample data
├── frontend/
│   ├── app/          # Next.js pages
│   ├── components/   # React components
│   ├── sections/     # Page sections
│   ├── lib/          # Utilities & API client
│   ├── .env.local    # Frontend environment variables
│   └── next.config.js
```

---

## API Routes

### Auth
- `POST /api/auth/signup` - Register
- `POST /api/auth/login` - Login

### Resources (All with GET, POST, PUT, DELETE)
- `/api/sports`
- `/api/clubs`
- `/api/tournaments`
- `/api/athletes`
- `/api/coaches`
- `/api/training-programs`
- `/api/events`
- `/api/facilities`
- `/api/schedules`
- `/api/results`
- `/api/gallery`
- `/api/users`

---

## Next Steps

1. ✅ Both servers running
2. 📱 Visit `http://localhost:3000`
3. 🔐 Test login with credentials above
4. 📊 Explore the application
5. 🚀 Build your features!

---

## Need Help?

Check logs in:
- **Backend:** Terminal where `npm run dev` is running
- **Frontend:** Terminal where `npm run dev` is running
- **Database:** Terminal where `mongod` is running
