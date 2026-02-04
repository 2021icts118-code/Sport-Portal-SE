"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Users,
  Trophy,
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  UserPlus,
  Crown,
  Target,
  CheckCircle,
  AlertCircle,
  X,
  Award
} from "lucide-react";

export default function ClubsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ClubsContent />
    </Suspense>
  );
}

function ClubsContent() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [joinRequests, setJoinRequests] = useState(new Set());
  const [joinedClubs, setJoinedClubs] = useState(new Set());
  const [loadingClub, setLoadingClub] = useState(null);
  const [notification, setNotification] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const clubs = [
    {
      id: 1,
      name: "Cricket Club",
      category: "team",
      members: 45,
      captain: "John Smith",
      achievements: ["University Champions 2025", "Regional Winners"],
      description: "Premier cricket club with a rich history of excellence",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Basketball Club",
      category: "team",
      members: 32,
      captain: "Sarah Johnson",
      achievements: ["League Champions 2024", "MVP Awards"],
      description: "Dynamic basketball team known for speed and agility",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 3,
      name: "Football Club",
      category: "team",
      members: 52,
      captain: "Mike Davis",
      achievements: ["Cup Winners 2025", "Best Defense"],
      description: "Passionate football club with dedicated players",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      name: "Swimming Club",
      category: "individual",
      members: 28,
      captain: "Emma Wilson",
      achievements: ["Multiple Gold Medals", "Record Holders"],
      description: "Elite swimming program for competitive athletes",
      color: "from-cyan-500 to-blue-500"
    },
    {
      id: 5,
      name: "Athletics Club",
      category: "individual",
      members: 38,
      captain: "David Brown",
      achievements: ["National Qualifiers", "Track Records"],
      description: "Comprehensive athletics training for all events",
      color: "from-purple-500 to-pink-500",
      activities: [
        "100m Sprint",
        "200m Sprint",
        "400m Run",
        "800m Run",
        "1500m Run",
        "5000m Run",
        "10000m Run",
        "110m Hurdles",
        "400m Hurdles",
        "High Jump",
        "Long Jump",
        "Triple Jump",
        "Pole Vault",
        "Shot Put",
        "Discus Throw",
        "Javelin Throw",
        "Hammer Throw",
        "4x100m Relay",
        "4x400m Relay",
        "Marathon Training",
        "Cross Country",
        "Race Walking"
      ]
    },
    {
      id: 6,
      name: "Elle Club",
      category: "team",
      members: 24,
      captain: "Lisa Chen",
      achievements: ["Rising Stars", "Team Spirit Award"],
      description: "Graceful and strategic elle team showcasing elegance in motion",
      color: "from-pink-500 to-rose-500"
    },
    {
      id: 7,
      name: "Netball Club",
      category: "team",
      members: 30,
      captain: "Rachel Green",
      achievements: ["Division Winners", "Sportsmanship Award"],
      description: "Skilled netball team combining strategy and athletic excellence",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 8,
      name: "Volleyball Club",
      category: "team",
      members: 24,
      captain: "Alex Turner",
      achievements: ["League Champions", "Team Excellence"],
      description: "Dynamic volleyball team with exceptional athletic performance",
      color: "from-yellow-500 to-orange-500"
    },
    {
      id: 12,
      name: "Rugby Club",
      category: "team",
      members: 30,
      captain: "Jake Thompson",
      achievements: ["National Champions", "Rugby Excellence"],
      description: "Powerful rugby team showcasing strength and team spirit",
      color: "from-red-500 to-orange-500"
    },
    {
      id: 9,
      name: "Badminton Club",
      category: "individual",
      members: 18,
      captain: "Jordan Lee",
      achievements: ["Tournament Winners", "Skill Awards"],
      description: "Elite badminton players showcasing speed and precision",
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 10,
      name: "Carrom Club",
      category: "individual",
      members: 12,
      captain: "Sam Patel",
      achievements: ["Board Champions", "Strategy Masters"],
      description: "Strategic carrom players with exceptional precision",
      color: "from-orange-500 to-red-500"
    },
    {
      id: 11,
      name: "Chess Club",
      category: "individual",
      members: 15,
      captain: "Maria Garcia",
      achievements: ["Regional Champions", "Grandmaster Candidates"],
      description: "Tactical chess players with strategic brilliance",
      color: "from-amber-500 to-yellow-500"
    }
  ];

  useEffect(() => {
    const sportParam = searchParams.get("sport");
    const searchParam = searchParams.get("search");
    if (sportParam) {
      setSearchQuery(sportParam);
    } else if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const filteredClubs = clubs.filter(club => {
    const matchesCategory = activeCategory === "all" || club.category === activeCategory;
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle join club
  const handleJoinClub = async (clubId, clubName) => {
    // Check if user is authenticated
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!user) {
      showNotification("Please login to join a club", "error");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      return;
    }

    if (joinedClubs.has(clubId)) {
      showNotification(`You are already a member of ${clubName}`, "info");
      return;
    }

    if (joinRequests.has(clubId)) {
      showNotification("Join request already sent", "info");
      return;
    }

    setLoadingClub(clubId);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      setJoinRequests(prev => new Set([...prev, clubId]));
      showNotification(`Join request sent to ${clubName}. Waiting for approval.`, "info");
    } catch (error) {
      console.error("Join club error:", error);
      showNotification("Failed to join club. Please try again.", "error");
    } finally {
      setLoadingClub(null);
    }
  };

  // Handle view club details
  const handleViewDetails = (clubId) => {
    const club = clubs.find(c => c.id === clubId);
    setSelectedClub(club);
    setShowModal(true);
  };

  // Get button text and state for a club
  const getButtonState = (clubId) => {
    if (joinedClubs.has(clubId)) {
      return { text: "Joined", disabled: true, className: "bg-green-600 cursor-not-allowed" };
    }
    if (joinRequests.has(clubId)) {
      return { text: "Pending", disabled: true, className: "bg-yellow-600 cursor-not-allowed" };
    }
    if (loadingClub === clubId) {
      return { text: "Joining...", disabled: true, className: "bg-green-600 cursor-not-allowed" };
    }
    return { text: "Join", disabled: false, className: "bg-green-600 hover:bg-green-700" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 max-w-sm">
          <div className={`p-4 rounded-lg shadow-lg border backdrop-blur-sm ${notification.type === "success"
            ? "bg-green-900/90 border-green-500 text-green-100"
            : notification.type === "error"
              ? "bg-red-900/90 border-red-500 text-red-100"
              : "bg-blue-900/90 border-blue-500 text-blue-100"
            }`}>
            <div className="flex items-center gap-2">
              {notification.type === "success" && <CheckCircle className="h-5 w-5" />}
              {notification.type === "error" && <AlertCircle className="h-5 w-5" />}
              {notification.type === "info" && <AlertCircle className="h-5 w-5" />}
              <p className="text-sm font-medium">{notification.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Sports Clubs
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Join passionate communities and excel in your favorite sports
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category & Search Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeCategory === "all"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
                }`}
            >
              All Clubs
            </button>
            <button
              onClick={() => setActiveCategory("team")}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeCategory === "team"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
                }`}
            >
              Team Sports
            </button>
            <button
              onClick={() => setActiveCategory("individual")}
              className={`px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${activeCategory === "individual"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
                }`}
            >
              Individual
            </button>
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search clubs by sport..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-slate-900 shadow-sm"
            />
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-200 hover:border-blue-500 transition-all duration-300 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {club.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Users className="h-4 w-4" />
                    <span>{club.members} members</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${club.color} flex items-center justify-center`}>
                  <Trophy className="h-6 w-6 text-white" />
                </div>
              </div>

              <p className="text-gray-700 mb-4">{club.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-700">
                  <Crown className="h-4 w-4" />
                  <span>Captain: {club.captain}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="h-4 w-4" />
                  <span>Achievements: {club.achievements.length}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/sports/${encodeURIComponent(club.name.replace(" Club", ""))}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Link>
                {(() => {
                  const buttonState = getButtonState(club.id);
                  return (
                    <button
                      onClick={() => handleJoinClub(club.id, club.name)}
                      disabled={buttonState.disabled}
                      className={`${buttonState.className} text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${buttonState.disabled ? "" : "hover:opacity-90"
                        }`}
                    >
                      {loadingClub === club.id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          {joinedClubs.has(club.id) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : joinRequests.has(club.id) ? (
                            <AlertCircle className="h-4 w-4" />
                          ) : (
                            <UserPlus className="h-4 w-4" />
                          )}
                          {buttonState.text}
                        </>
                      )}
                    </button>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Club Details Modal */}
      {showModal && selectedClub && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">{selectedClub.name}</h2>
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
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${selectedClub.color} flex items-center justify-center`}>
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-gray-900 capitalize">{selectedClub.category} Sports</p>
                  <p className="text-gray-600">{selectedClub.members} active members</p>
                </div>
              </div>

              <p className="text-gray-700">{selectedClub.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Crown className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Captain</p>
                      <p className="text-gray-600">{selectedClub.captain}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Members</p>
                      <p className="text-gray-600">{selectedClub.members} members</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Achievements</p>
                      <p className="text-gray-600">{selectedClub.achievements.length} major wins</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Category</p>
                      <p className="text-gray-600 capitalize">{selectedClub.category}</p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedClub.achievements.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Recent Achievements</h3>
                  <div className="space-y-2">
                    {selectedClub.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedClub.activities && selectedClub.activities.length > 0 && (
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Available Activities After Joining</h3>
                  <p className="text-sm text-gray-600 mb-3">Members can participate in the following athletics events:</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectedClub.activities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm text-gray-700">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                {(() => {
                  const buttonState = getButtonState(selectedClub.id);
                  return (
                    <button
                      onClick={() => handleJoinClub(selectedClub.id, selectedClub.name)}
                      disabled={buttonState.disabled}
                      className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${buttonState.disabled
                        ? buttonState.className
                        : buttonState.className + " hover:opacity-90"
                        }`}
                    >
                      {loadingClub === selectedClub.id ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          {joinedClubs.has(selectedClub.id) ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : joinRequests.has(selectedClub.id) ? (
                            <AlertCircle className="h-5 w-5" />
                          ) : (
                            <UserPlus className="h-5 w-5" />
                          )}
                          {buttonState.text}
                        </>
                      )}
                    </button>
                  );
                })()}
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
}