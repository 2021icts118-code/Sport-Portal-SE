# University Sports Portal

A comprehensive web application for managing university sports activities, including clubs, tournaments, athletes, coaches, and training programs. This portal provides a platform for students to explore sports, join clubs, and stay updated with the latest events and results.

## 🚀 Features

- **User Authentication**: Secure login and registration for students, admins, and staff.
- **Sports Management**: detailed information about various sports (Team & Individual).
- **Club Management**: Join and manage university sports clubs.
- **Tournament & Events**: View upcoming tournaments, matches, and results.
- **Athlete & Coach Profiles**: Dedicated profiles for tracking performance and details.
- **Training Programs**: Scheduling and management of training sessions.
- **Admin Dashboard**: Comprehensive control panel for administrators to manage all aspects of the system.
- **Responsive Design**: Modern and responsive UI built with Next.js and Tailwind CSS.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (with Mongoose)
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt

## 📋 Prerequisites

Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository_url>
cd <repository_folder>
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies.
```bash
cd backend
npm install
```

**Environment Variables:**
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
```

**Database Seeding (Optional):**
To populate the database with initial data:
```bash
npm run seed
```

**Start the Server:**
```bash
# Development mode (with nodemon)
npm run dev

# Production start
npm start
```
The backend server will run on `http://localhost:4000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies.
```bash
cd frontend
npm install
```

**Environment Variables:**
Create a `.env.local` file in the `frontend` directory if needed (e.g., for API base URL):
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

**Start the Application:**
```bash
npm run dev
```
The frontend application will run on `http://localhost:3000`.

## 📂 Project Structure

```
├── backend/                # Node.js/Express Backend
│   ├── config/             # Database configuration
│   ├── middleware/         # Custom middleware (Auth, Error handling)
│   ├── models/             # Mongoose models (User, Sport, Club, etc.)
│   ├── routes/             # API routes
│   ├── scripts/            # Helper scripts
│   ├── server.js           # Entry point
│   └── ...
│
├── frontend/               # Next.js Frontend
│   ├── app/                # Next.js App Router pages
│   ├── components/         # Reusable React components
│   ├── lib/                # Utility functions
│   ├── public/             # Static assets
│   ├── sections/           # Page sections (Hero, Features, etc.)
│   └── ...
│
└── README.md               # Project Documentation
```

## 🤝 Contributing
Contributions are welcome! Please fork the repository and create a pull request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the ISC License.
