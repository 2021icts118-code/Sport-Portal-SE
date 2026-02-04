"use client";

import Link from "next/link";
import { Trophy, Users, Calendar, Target, MapPin, Award, Filter, Search, ChevronRight, Sparkles, BarChart3, Shield, TrendingUp, Star, Clock, Loader2, X } from "lucide-react";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';

const UoVSportsPortal = () => {
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedSport, setSelectedSport] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedSportDetails, setSelectedSportDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  // Set isClient and mounted only on the client side
  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  // Data state
  const [sportsData, setSportsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const response = await fetch(`${API_URL}/api/portal-data`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
          console.warn(`API returned ${response.status}, using fallback data`);
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setSportsData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sports data:", err);
        // Set fallback data with elle and netball included
        setSportsData([
          {
            id: 1,
            name: "Team Sports",
            icon: "🏆",
            description: "Competitive team-based sports that build camaraderie and teamwork",
            sports: [
              {
                id: 1,
                name: "Cricket",
                type: "Team",
                players: 45,
                rating: 4.8,
                description: "The gentleman's game with strategic depth and athletic excellence",
                clubs: ["Cricket Club"],
                facilities: ["Cricket Ground", "Practice Nets"],
                achievements: ["University Champions 2025", "Regional Winners"],
                contact: "cricket@univ.vavuniya.lk"
              },
              {
                id: 2,
                name: "Basketball",
                type: "Team",
                players: 32,
                rating: 4.6,
                description: "Fast-paced game combining athleticism, strategy, and teamwork",
                clubs: ["Basketball Squad"],
                facilities: ["Indoor Court", "Outdoor Court"],
                achievements: ["League Champions 2024", "MVP Awards"],
                contact: "basketball@univ.vavuniya.lk"
              },
              {
                id: 3,
                name: "Football",
                type: "Team",
                players: 52,
                rating: 4.7,
                description: "The beautiful game that unites people across the globe",
                clubs: ["Football Team"],
                facilities: ["Main Field", "Training Ground"],
                achievements: ["Cup Winners 2025", "Best Defense"],
                contact: "football@univ.vavuniya.lk"
              },
              {
                id: 4,
                name: "Elle",
                type: "Team",
                players: 24,
                rating: 4.5,
                description: "Graceful and strategic team sport showcasing elegance in motion",
                clubs: ["Elle Club"],
                facilities: ["Sports Hall", "Training Area"],
                achievements: ["Rising Stars Award", "Team Spirit Champion"],
                contact: "elle@univ.vavuniya.lk"
              },
              {
                id: 5,
                name: "Netball",
                type: "Team",
                players: 30,
                rating: 4.4,
                description: "Skilled team sport combining strategy and athletic excellence",
                clubs: ["Netball Club"],
                facilities: ["Netball Court", "Practice Court"],
                achievements: ["Division Winners", "Sportsmanship Award"],
                contact: "netball@univ.vavuniya.lk"
              },
              {
                id: 6,
                name: "Volleyball",
                type: "Team",
                players: 24,
                rating: 4.3,
                description: "Dynamic team sport combining strategy and athletic performance",
                clubs: ["Volleyball Club"],
                facilities: ["Indoor Court", "Beach Volleyball Area"],
                achievements: ["League Champions", "Team Excellence"],
                contact: "volleyball@univ.vavuniya.lk"
              },
              {
                id: 10,
                name: "Rugby",
                type: "Team",
                players: 30,
                rating: 4.6,
                description: "Full-contact team sport requiring strength, speed, and strategy",
                clubs: ["Rugby Club"],
                facilities: ["Rugby Field", "Training Ground"],
                achievements: ["National Champions", "Rugby Excellence"],
                contact: "rugby@univ.vavuniya.lk"
              }
            ]
          },
          {
            id: 2,
            name: "Individual Sports",
            icon: "🏃",
            description: "Personal athletic pursuits that develop individual strength and skill",
            sports: [
              {
                id: 6,
                name: "Swimming",
                type: "Individual",
                players: 28,
                rating: 4.5,
                description: "Elite swimming program for competitive athletes",
                clubs: ["Swimming Club"],
                facilities: ["Swimming Pool", "Training Pool"],
                achievements: ["Multiple Gold Medals", "Record Holders"],
                contact: "swimming@univ.vavuniya.lk"
              },
              {
                id: 7,
                name: "Athletics",
                type: "Individual",
                players: 38,
                rating: 4.6,
                description: "Comprehensive athletics training for all events",
                clubs: ["Athletics Club"],
                facilities: ["Track Field", "Training Facilities"],
                achievements: ["National Qualifiers", "Track Records"],
                contact: "athletics@univ.vavuniya.lk"
              },
              {
                id: 8,
                name: "Badminton",
                type: "Individual",
                players: 18,
                rating: 4.2,
                description: "Racquet sport requiring agility, speed, and precision",
                clubs: ["Badminton Club"],
                facilities: ["Indoor Courts", "Equipment Rental"],
                achievements: ["Tournament Winners", "Skill Awards"],
                contact: "badminton@univ.vavuniya.lk"
              },
              {
                id: 9,
                name: "Carrom",
                type: "Individual",
                players: 12,
                rating: 4.1,
                description: "Strategic board game requiring precision and strategy",
                clubs: ["Carrom Club"],
                facilities: ["Indoor Tables", "Training Area"],
                achievements: ["Board Champions", "Strategy Masters"],
                contact: "carrom@univ.vavuniya.lk"
              },
              {
                id: 10,
                name: "Chess",
                type: "Individual",
                players: 15,
                rating: 4.5,
                description: "Strategic mind sport requiring tactical thinking and planning",
                clubs: ["Chess Club"],
                facilities: ["Indoor Hall", "Training Room"],
                achievements: ["Regional Champions", "Grandmaster Candidates"],
                contact: "chess@univ.vavuniya.lk"
              }
            ]
          }
        ]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Type color mapping
  const typeColors = {
    Team: "bg-blue-100 text-blue-800",
    Individual: "bg-emerald-100 text-emerald-800",
    Development: "bg-amber-100 text-amber-800",
    All: "bg-gray-100 text-gray-800"
  };

  // Handle view sport details
  const handleViewDetails = (sport) => {
    router.push(`/sports/${encodeURIComponent(sport.name)}`);
  };

  // Handle join club action with auth check
  const handleJoinClubAction = (e) => {
    if (e) e.preventDefault();
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!user) {
      router.push('/login');
    } else {
      router.push('/clubs');
    }
  };

  // Filter sports based on search term and type
  const activeCategory = sportsData[selectedCategory];
  const filteredSports = activeCategory ? activeCategory.sports.filter(sport => {
    const matchesSearch = sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sport.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sport.clubs.some(club => club.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "All" || sport.type === filterType;
    return matchesSearch && matchesType;
  }) : [];

  // Get all unique sport types for filter
  const sportTypes = ["All", ...new Set(
    sportsData.flatMap(category =>
      category.sports.map(sport => sport.type)
    )
  )];

  // Statistics data
  const statistics = [
    { icon: <Trophy className="h-5 w-5" />, value: "50+", label: "Sports Clubs", color: "text-blue-500" },
    { icon: <Users className="h-5 w-5" />, value: "1000+", label: "Student Athletes", color: "text-emerald-500" },
    { icon: <Calendar className="h-5 w-5" />, value: "100+", label: "Annual Tournaments", color: "text-amber-500" },
    { icon: <Star className="h-5 w-5" />, value: "4.7★", label: "Avg. Rating", color: "text-rose-500" }
  ];

  // Don't render until client-side to prevent hydration mismatch
  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 md:p-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading UoV Sports Portal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl font-bold mb-2">Error</p>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full border border-blue-200">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">
              🏆 University of Vavuniya Official Portal
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            UoV Sports Clubs & Teams
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all sports activities, clubs, and teams at University of Vavuniya
          </p>
        </motion.header>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Sports Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="lg:w-1/4"
          >
            <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-200 h-fit sticky top-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <Trophy className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  Sports Categories
                </h2>
              </div>

              <div className="space-y-3 mb-8">
                {sportsData.map((category, index) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${selectedCategory === index
                      ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{category.icon}</span>
                        <span className="font-semibold">{category.name}</span>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded-full ${selectedCategory === index
                        ? 'bg-white/20'
                        : 'bg-gray-200'
                        }`}>
                        {category.sports.length} sports
                      </span>
                    </div>
                    <p className="text-sm mt-2 opacity-90">
                      {category.description}
                    </p>
                  </motion.button>
                ))}
              </div>

              {/* Selected Category Details */}
              <div className="bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl p-5 border border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{sportsData[selectedCategory].icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {sportsData[selectedCategory].name}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {sportsData[selectedCategory].description}
                </p>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-blue-200">
                    <span className="font-medium text-gray-700">Total Sports:</span>
                    <span className="font-semibold text-blue-600">{sportsData[selectedCategory].sports.length}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-blue-200">
                    <span className="font-medium text-gray-700">Active Players:</span>
                    <span className="font-semibold text-emerald-600">
                      {sportsData[selectedCategory].sports.reduce((total, sport) => total + sport.players, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="font-medium text-gray-700">Avg. Rating:</span>
                    <span className="font-semibold text-amber-600">
                      {(sportsData[selectedCategory].sports.reduce((total, sport) => total + sport.rating, 0) / sportsData[selectedCategory].sports.length).toFixed(1)}★
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="lg:w-3/4"
          >
            <div className="bg-white rounded-2xl shadow-lg p-5 md:p-7 border border-gray-200 mb-6">
              {/* Category Header */}
              <div className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Sports in <span className="text-blue-600">{sportsData[selectedCategory].name}</span>
                    </h2>
                    <p className="text-gray-600">
                      Discover all {sportsData[selectedCategory].name.toLowerCase()} activities and clubs
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleJoinClubAction}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                    >
                      <Users className="h-4 w-4" />
                      Join Club
                    </button>
                    <Link
                      href="/schedule"
                      className="px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      View Schedule
                    </Link>
                  </div>
                </div>

                {/* Search and Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  {/* Search Box */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Search sports, clubs, or activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 font-medium"
                    />
                  </div>

                  {/* Filter Dropdown */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center text-gray-700 font-medium">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sportTypes.map(type => (
                        <button
                          key={type}
                          onClick={() => setFilterType(type)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${filterType === type
                            ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sports Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedCategory}-${filterType}-${searchTerm}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredSports.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {filteredSports.map((sport, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedSport(index)}
                            className={`bg-gradient-to-br from-white to-gray-50 border rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-xl ${selectedSport === index
                              ? 'border-blue-400 shadow-lg'
                              : 'border-gray-200 hover:border-blue-300'
                              }`}
                          >
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {sport.name}
                                </h3>
                                <div className="flex items-center gap-2 mb-3">
                                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${typeColors[sport.type] || 'bg-gray-100 text-gray-800'
                                    }`}>
                                    {sport.type}
                                  </span>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Star className="h-3 w-3 text-amber-500 fill-amber-500 mr-1" />
                                    {sport.rating}
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                                  <Users className="h-4 w-4" />
                                  <span className="font-semibold">{sport.players}</span>
                                </div>
                                <span className="text-xs text-gray-500">players</span>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-5 line-clamp-2">
                              {sport.description}
                            </p>

                            {/* Clubs */}
                            <div className="mb-5">
                              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                <span>🏢</span>
                                Associated Clubs:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {sport.clubs.slice(0, 3).map((club, idx) => (
                                  <Link
                                    key={idx}
                                    href={`/clubs?search=${encodeURIComponent(club)}`}
                                    className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-200 hover:bg-blue-600 hover:text-white transition-all"
                                  >
                                    {club}
                                  </Link>
                                ))}
                                {sport.clubs.length > 3 && (
                                  <Link href="/clubs" className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg hover:bg-gray-200">
                                    +{sport.clubs.length - 3} more
                                  </Link>
                                )}
                              </div>
                            </div>

                            {/* Achievements */}
                            <div className="mb-6">
                              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                <Award className="h-4 w-4 text-amber-500" />
                                Recent Achievements:
                              </div>
                              <div className="space-y-2">
                                {sport.achievements.map((achievement, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                                    <span className="text-sm text-gray-600">{achievement}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                              <div className="text-sm text-gray-600">
                                Contact: <span className="font-medium text-blue-600">{sport.contact}</span>
                              </div>
                              <button
                                onClick={() => handleViewDetails(sport)}
                                className="flex items-center gap-1 text-blue-600 font-medium hover:text-blue-700 transition-colors"
                              >
                                View Details
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-2xl border border-blue-200"
                      >
                        <div className="text-gray-400 text-6xl mb-6">🏀</div>
                        <h3 className="text-xl font-bold text-gray-700 mb-4">
                          No sports found matching your criteria
                        </h3>
                        <p className="text-gray-600 mb-8 max-w-md mx-auto">
                          Try adjusting your search or filter to find sports activities
                        </p>
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setFilterType("All");
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
                        >
                          Clear Filters
                        </button>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Quick Stats Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl shadow-xl p-7"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {sportsData.length}
                  </div>
                  <div className="text-white/90 font-medium">Sports Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {sportsData.reduce((total, category) => total + category.sports.length, 0)}
                  </div>
                  <div className="text-white/90 font-medium">Active Sports</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {sportsData.reduce((total, category) =>
                      total + category.sports.reduce((sportTotal, sport) =>
                        sportTotal + sport.players, 0
                      ), 0
                    )}
                  </div>
                  <div className="text-white/90 font-medium">Student Athletes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    24/7
                  </div>
                  <div className="text-white/90 font-medium">Portal Access</div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Ready to Join a Sports Club?
                    </h3>
                    <p className="text-white/80">
                      Register now and start your sports journey at UoV
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => router.push('/signup')}
                      className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      Register Now
                    </button>
                    <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors">
                      Contact Sports Unit
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Sport Details Modal */}
      {showModal && selectedSportDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedSportDetails.name}</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900">{selectedSportDetails.type} Sport</p>
                  <p className="text-gray-600">{selectedSportDetails.players} active players</p>
                </div>
              </div>

              <p className="text-gray-700">{selectedSportDetails.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Players</p>
                      <p className="text-gray-600">{selectedSportDetails.players} registered</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Rating</p>
                      <p className="text-gray-600">{selectedSportDetails.rating}/5.0</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Clubs</p>
                      <p className="text-gray-600">{selectedSportDetails.clubs.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Contact</p>
                      <p className="text-gray-600">{selectedSportDetails.contact}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSportDetails.facilities && selectedSportDetails.facilities.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedSportDetails.facilities.map((facility, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedSportDetails.achievements && selectedSportDetails.achievements.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Achievements</h3>
                  <div className="space-y-2">
                    {selectedSportDetails.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleJoinClubAction}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Users className="h-5 w-5" />
                  Join Club
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UoVSportsPortal;