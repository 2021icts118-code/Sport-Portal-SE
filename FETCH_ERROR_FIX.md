# Fix "Failed to fetch" Error

## ✅ What I Fixed:
1. Updated `province.jsx` to use environment variable for API URL
2. Added proper error handling with fallback data
3. Ensured frontend `.env.local` is configured

## 🔧 What You Need To Do:

### Step 1: Start MongoDB (if not already running)
```powershell
mongod
```
Keep this terminal open.

### Step 2: Start Backend Server
```powershell
cd "backend"
npm run dev
```

You should see:
```
✓ MongoDB connected successfully
✓ Server is running on http://localhost:4000
```

### Step 3: Restart Frontend Server
```powershell
cd "frontend"
npm run dev
```

Then visit: `http://localhost:3000`

---

## ✅ Verification:

Test the API is working by opening browser console and running:
```javascript
fetch('http://localhost:4000/health')
  .then(r => r.json())
  .then(d => console.log(d))
```

You should see:
```json
{status: "OK", message: "API is running"}
```

---

## 🚨 Still Getting Error?

1. **Check backend is running** - you should see "Server is running" message
2. **Check MongoDB is running** - open new terminal, type `mongod`
3. **Check port 4000 is free** - no other app using it
4. **Check `.env.local` exists** - should have `NEXT_PUBLIC_API_URL=http://localhost:4000`
5. **Restart frontend** - hard refresh browser (Ctrl+Shift+R)

---

All components now use the environment variable, so if you deploy to production, just change `NEXT_PUBLIC_API_URL` to your production server URL!
