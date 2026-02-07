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

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const res = await fetch(`${API_URL}/api/clubs?t=${new Date().getTime()}`, {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const data = await res.json();

        const clubsArray = Array.isArray(data) ? data : [];

        // Parse logged-in user to check membership status
        let userId = null;
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("user");
          if (userData) {
            try {
              const parsed = JSON.parse(userData);
              userId = parsed.id || parsed._id; // Handle different ID formats
            } catch (e) { console.error("Error parsing user data", e); }
          }
        }

        const joined = new Set();
        const pending = new Set();

        const formattedClubs = clubsArray.map(club => {
          // Check membership if user is logged in
          if (userId) {
            // Check if user is in members array (handles both array of strings and array of objects)
            const isMember = club.members?.some(m => m === userId || m._id === userId);
            if (isMember) joined.add(club._id);

            // Check if user is in pendingMembers array
            const isPending = club.pendingMembers?.some(m => m === userId || m._id === userId);
            if (isPending) pending.add(club._id);
          }

          return {
            ...club,
            id: club._id,
            members: club.memberCount || club.members?.length || 0,
            captain: club.captain?.firstName ? `${club.captain.firstName} ${club.captain.lastName}` : " ",
            achievements: club.achievements || [],
            description: club.description || "Join this club to participate in events.",
            color: club.color || "from-blue-500 to-blue-600",
            activities: club.activities || []
          };
        });

        setJoinedClubs(joined);
        setJoinRequests(pending);
        setClubs(formattedClubs);
      }
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
      showNotification("Failed to load clubs", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

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
    const savedUser = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (!savedUser) {
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
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

      const res = await fetch(`${API_URL}/api/clubs/${clubId}/join`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await res.json();

      if (res.ok) {
        setJoinRequests(prev => new Set([...prev, clubId]));
        showNotification(`Join request sent to ${clubName}. Waiting for approval.`, "success");
      } else {
        throw new Error(data.message || "Failed to join");
      }
    } catch (error) {
      console.error("Join club error:", error);
      showNotification(error.message || "Failed to join club. Please try again.", "error");
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
      <div className="relative overflow-hidden bg-gray-900 min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1570498839593-e565b39455fc?q=80&w=2000&auto=format&fit=crop"
            alt="Sports Stadium"
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
            Sports Clubs
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow">
            Join passionate communities and excel in your favorite sports
          </p>
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
                <button
                  onClick={() => handleViewDetails(club.id)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </button>
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
      {/* Club Details Modal */}
      {showModal && selectedClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] shadow-2xl animate-in zoom-in-95 duration-300 relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
              className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-all z-10"
            >
              <X className="h-6 w-6 text-slate-500" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Left Side: Visuals */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-10 flex flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 opacity-10 transform translate-x-1/2 -translate-y-1/2">
                  <Star size={300} fill="white" />
                </div>

                <div>
                  <div className="h-24 w-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-6xl shadow-xl border border-white/20 mb-8">
                    {selectedClub.logo || (selectedClub.sport?.icon || '🏆')}
                  </div>
                  <h2 className="text-4xl font-black leading-tight mb-4">{selectedClub.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider">{selectedClub.category} Sport</span>
                    <span className="px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300">Active Season</span>
                  </div>
                </div>

                <div className="mt-12">
                  <p className="font-medium text-blue-100/90 leading-relaxed mb-8">
                    {selectedClub.description || "Join this club to be part of a thriving community of athletes striving for excellence."}
                  </p>
                  {(() => {
                    const buttonState = getButtonState(selectedClub.id);
                    return (
                      <button
                        onClick={() => handleJoinClub(selectedClub.id, selectedClub.name)}
                        disabled={buttonState.disabled}
                        className={`w-full py-4 font-black rounded-2xl shadow-xl flex items-center justify-center gap-2 group transition-all ${buttonState.disabled
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-white text-blue-900 hover:bg-blue-50"
                          }`}
                      >
                        {loadingClub === selectedClub.id ? (
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            {joinedClubs.has(selectedClub.id) ? (
                              <CheckCircle className="h-5 w-5" />
                            ) : joinRequests.has(selectedClub.id) ? (
                              <AlertCircle className="h-5 w-5" />
                            ) : (
                              <span>Request to Join</span>
                            )}
                            {joinedClubs.has(selectedClub.id) ? "Already a Member" : joinRequests.has(selectedClub.id) ? "Request Pending" : ""}
                            {!buttonState.disabled && (
                              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            )}
                          </>
                        )}
                      </button>
                    );
                  })()}
                </div>
              </div>

              {/* Right Side: Details */}
              <div className="p-10 bg-slate-50">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Users className="text-blue-500" /> Club Leadership
                </h3>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-8 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-400 text-lg">
                    {selectedClub.captain?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Captain</p>
                    <p className="text-lg font-black text-slate-800">
                      {selectedClub.captain || "TBA"}
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Trophy className="text-amber-500" /> Achievements
                </h3>

                <div className="space-y-3 mb-8">
                  {selectedClub.achievements && selectedClub.achievements.length > 0 ? (
                    selectedClub.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-600 bg-white p-3 rounded-xl border border-slate-100">
                        <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                        {achievement}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-sm font-medium italic">No major achievements listed yet.</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Members</p>
                    <p className="text-2xl font-black text-slate-800">{selectedClub.members || 0}</p>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Status</p>
                    <p className="text-2xl font-black text-emerald-600">Active</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}