"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Trophy,
  Users,
  Target,
  Activity,
  ChevronRight,
  Star,
  Calendar,
  Award,
  Zap
} from "lucide-react";

export default function SportsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const router = useRouter();

  const handleJoinClubAction = (sportName) => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!user) {
      router.push('/login');
    } else {
      router.push(`/clubs?search=${encodeURIComponent(sportName)}`);
    }
  };

  const sports = [
    {
      id: 1,
      name: "Cricket",
      category: "team",
      description: "The gentleman's game with strategic depth and athletic excellence",
      participants: "11 players per team",
      facilities: ["Cricket Ground", "Practice Nets", "Equipment"],
      popularity: "High",
      icon: "🏏",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Basketball",
      category: "team",
      description: "Fast-paced game combining athleticism, strategy, and teamwork",
      participants: "5 players per team",
      facilities: ["Indoor Court", "Outdoor Court", "Training Equipment"],
      popularity: "High",
      icon: "🏀",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      name: "Football",
      category: "team",
      description: "The beautiful game that unites people across the globe",
      participants: "11 players per team",
      facilities: ["Main Field", "Training Ground", "Gym"],
      popularity: "Very High",
      icon: "⚽",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Swimming",
      category: "individual",
      description: "Graceful and powerful water sport for fitness and competition",
      participants: "Individual or relay teams",
      facilities: ["Olympic Pool", "Training Pool", "Changing Rooms"],
      popularity: "Medium",
      icon: "🏊",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 5,
      name: "Athletics",
      category: "individual",
      description: "Track and field events testing speed, strength, and endurance",
      participants: "Individual competitors",
      facilities: ["Running Track", "Field Events Area", "Training Facilities"],
      popularity: "Medium",
      icon: "🏃",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 6,
      name: "Volleyball",
      category: "team",
      description: "Dynamic team sport combining strategy and athletic performance",
      participants: "6 players per team",
      facilities: ["Indoor Court", "Beach Volleyball Area"],
      popularity: "Medium",
      icon: "🏐",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 13,
      name: "Rugby",
      category: "team",
      description: "Full-contact team sport requiring strength, speed, and strategy",
      participants: "15 players per team",
      facilities: ["Rugby Field", "Training Ground", "Gym"],
      popularity: "High",
      icon: "🏉",
      color: "from-red-500 to-orange-500"
    },
    {
      id: 7,
      name: "Elle",
      category: "team",
      description: "Traditional team sport emphasizing strategy and physical coordination",
      participants: "7 players per team",
      facilities: ["Sports Field", "Training Area", "Equipment"],
      popularity: "Medium",
      icon: "⚾",
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 8,
      name: "Netball",
      category: "team",
      description: "Fast-paced team sport requiring agility, accuracy, and teamwork",
      participants: "7 players per team",
      facilities: ["Indoor Court", "Outdoor Court", "Training Facilities"],
      popularity: "Medium",
      icon: "🏀",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 9,
      name: "Badminton",
      category: "individual",
      description: "Racquet sport requiring agility, speed, and precision",
      participants: "Singles or doubles",
      facilities: ["Indoor Courts", "Equipment Rental"],
      popularity: "Medium",
      icon: "🏸",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 10,
      name: "Table Tennis",
      category: "individual",
      description: "Fast-paced indoor sport demanding quick reflexes and strategy",
      participants: "Singles or doubles",
      facilities: ["Indoor Tables", "Training Area"],
      popularity: "Low",
      icon: "🏓",
      color: "from-gray-500 to-slate-500"
    },
    {
      id: 11,
      name: "Carrom",
      category: "individual",
      description: "Strategic board game requiring precision and strategy",
      participants: "Singles or doubles",
      facilities: ["Indoor Tables", "Training Area"],
      popularity: "Low",
      icon: "🎯",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 12,
      name: "Chess",
      category: "individual",
      description: "Strategic mind sport requiring tactical thinking and planning",
      participants: "Individual matches",
      facilities: ["Indoor Hall", "Training Room"],
      popularity: "Medium",
      icon: "♟️",
      color: "from-amber-500 to-yellow-500"
    }
  ];

  const filteredSports = activeCategory === "all"
    ? sports
    : sports.filter(sport => sport.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}
      <div className="relative overflow-hidden bg-gray-900/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Sports
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover and participate in a variety of sports activities
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === "all"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            All Sports
          </button>
          <button
            onClick={() => setActiveCategory("team")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === "team"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            Team Sports
          </button>
          <button
            onClick={() => setActiveCategory("individual")}
            className={`px-6 py-2 rounded-full font-medium transition-all ${activeCategory === "individual"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
          >
            Individual Sports
          </button>
        </div>

        {/* Sports Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSports.map((sport) => (
            <div
              key={sport.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <Link href={`/sports/${encodeURIComponent(sport.name)}`} className="flex items-center gap-3 mb-2 hover:opacity-80 transition-opacity">
                    <span className="text-3xl">{sport.icon}</span>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{sport.name}</h3>
                  </Link>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${sport.category === "team"
                    ? "bg-blue-500/20 text-blue-400"
                    : "bg-green-500/20 text-green-400"
                    }`}>
                    {sport.category}
                  </span>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${sport.color} flex items-center justify-center`}>
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>

              <p className="text-gray-300 text-sm mb-4">{sport.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{sport.participants}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Star className="h-4 w-4" />
                  <span>Popularity: {sport.popularity}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-medium text-sm mb-2">Facilities:</h4>
                <div className="flex flex-wrap gap-1">
                  {sport.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleJoinClubAction(sport.name)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    Join Club
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <button className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </button>
                </div>
                <Link
                  href={`/sports/${encodeURIComponent(sport.name)}`}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our sports community and discover your passion. Whether you're a beginner or an experienced athlete,
              we have something for everyone.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => handleJoinClubAction("")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg"
              >
                Join a Club
              </button>
              <Link
                href="/tournaments"
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors"
              >
                View Tournaments
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}