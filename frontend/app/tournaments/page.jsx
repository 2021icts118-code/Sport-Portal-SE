"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Filter,
  Search,
  Award,
  Target,
  Zap,
  X,
  Medal,
  Crown
} from "lucide-react";

export default function TournamentsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const tournaments = [
    {
      id: 1,
      title: "Inter-University Cricket Championship",
      sport: "cricket",
      date: "2026-02-15",
      location: "University Grounds",
      status: "upcoming",
      participants: 8,
      prize: "$5000",
      description: "Annual cricket championship featuring top university teams",
      organizer: "Sports Council",
      format: "Knockout"
    },
    {
      id: 2,
      title: "Basketball League Finals",
      sport: "basketball",
      date: "2026-01-28",
      location: "Sports Complex",
      status: "ongoing",
      participants: 12,
      prize: "$3000",
      description: "Season finale for university basketball league",
      organizer: "Basketball Club",
      format: "League"
    },
    {
      id: 3,
      title: "Football Cup 2026",
      sport: "football",
      date: "2026-03-10",
      location: "Main Stadium",
      status: "upcoming",
      participants: 16,
      prize: "$7500",
      description: "Premier football tournament of the year",
      organizer: "Football Association",
      format: "Cup"
    },
    {
      id: 4,
      title: "Volleyball Inter-Faculty Tournament",
      sport: "volleyball",
      date: "2026-02-05",
      location: "Indoor Court A",
      status: "upcoming",
      participants: 10,
      prize: "$2500",
      description: "Faculty-wise volleyball competition",
      organizer: "Volleyball Club",
      format: "Round Robin"
    },
    {
      id: 5,
      title: "Elle Traditional Championship",
      sport: "elle",
      date: "2026-01-30",
      location: "Sports Hall",
      status: "upcoming",
      participants: 6,
      prize: "$1500",
      description: "Traditional Sri Lankan sport championship",
      organizer: "Cultural Sports Unit",
      format: "Knockout"
    },
    {
      id: 6,
      title: "Badminton Open Tournament",
      sport: "badminton",
      date: "2026-02-20",
      location: "Badminton Courts",
      status: "upcoming",
      participants: 24,
      prize: "$2000",
      description: "Open badminton tournament for all skill levels",
      organizer: "Badminton Club",
      format: "Single Elimination"
    },
    {
      id: 7,
      title: "Carrom Championship 2026",
      sport: "carrom",
      date: "2026-03-05",
      location: "Recreation Hall",
      status: "upcoming",
      participants: 16,
      prize: "$1000",
      description: "Strategic board game tournament",
      organizer: "Carrom Club",
      format: "League"
    },
    {
      id: 8,
      title: "Chess Masters Tournament",
      sport: "chess",
      date: "2026-02-25",
      location: "Library Auditorium",
      status: "upcoming",
      participants: 32,
      prize: "$1500",
      description: "Strategic chess competition",
      organizer: "Chess Club",
      format: "Swiss System"
    },
    {
      id: 9,
      title: "Rugby Sevens Championship",
      sport: "rugby",
      date: "2026-03-15",
      location: "Rugby Field",
      status: "upcoming",
      participants: 8,
      prize: "$4000",
      description: "Fast-paced rugby sevens tournament",
      organizer: "Rugby Club",
      format: "Pool Play + Knockout"
    },
    {
      id: 10,
      title: "Netball Inter-University Cup",
      sport: "netball",
      date: "2026-02-10",
      location: "Netball Court",
      status: "upcoming",
      participants: 12,
      prize: "$2000",
      description: "Netball competition between universities",
      organizer: "Netball Club",
      format: "Round Robin"
    }
  ];

  const filteredTournaments = activeFilter === "all"
    ? tournaments
    : tournaments.filter(t => t.sport.toLowerCase() === activeFilter);

  const handleViewDetails = (tournamentId) => {
    const tournament = tournaments.find(t => t.id === tournamentId);
    setSelectedTournament(tournament);
    setShowModal(true);
  };

  const handleRegister = (tournamentId) => {
    // For now, just show an alert. In a real app, this would open a registration form
    alert(`Registration for tournament ID: ${tournamentId} - Feature coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gray-900 min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1575361204480-aadea25e6e68?q=80&w=2000&auto=format&fit=crop"
            alt="Football Stadium"
            className="h-full w-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
            University Tournaments
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow">
            Compete in exciting sporting events and showcase your athletic excellence
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-20 relative z-10">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-xl text-center transform hover:-translate-y-1 transition-transform">
            <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">10+</div>
            <div className="text-gray-600 text-sm font-semibold">Active Tournaments</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-xl text-center transform hover:-translate-y-1 transition-transform">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">200+</div>
            <div className="text-gray-600 text-sm font-semibold">Participants</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-xl text-center transform hover:-translate-y-1 transition-transform">
            <Award className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">$25K+</div>
            <div className="text-gray-600 text-sm font-semibold">Total Prize Pool</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-xl text-center transform hover:-translate-y-1 transition-transform">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-black text-gray-900">9</div>
            <div className="text-gray-600 text-sm font-semibold">Sports Categories</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-6 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${activeFilter === "all"
              ? "bg-blue-600 text-white shadow-lg scale-105"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            <Trophy className="h-4 w-4" />
            All
          </button>
          {[
            { id: "cricket", label: "Cricket", icon: "🏏" },
            { id: "basketball", label: "Basketball", icon: "🏀" },
            { id: "football", label: "Football", icon: "⚽" },
            { id: "volleyball", label: "Volleyball", icon: "🏐" },
            { id: "elle", label: "Elle", icon: "🎯" },
            { id: "badminton", label: "Badminton", icon: "🏸" },
            { id: "carrom", label: "Carrom", icon: "🎱" },
            { id: "chess", label: "Chess", icon: "♟️" },
            { id: "rugby", label: "Rugby", icon: "🏉" },
            { id: "netball", label: "Netball", icon: "🏐" },
          ].map((sport) => (
            <button
              key={sport.id}
              onClick={() => setActiveFilter(sport.id)}
              className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${activeFilter === sport.id
                ? "bg-blue-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
            >
              <span>{sport.icon}</span> {sport.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTournaments.length > 0 ? (
            filteredTournaments.map((tournament) => (
              <div
                key={tournament.id}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-blue-200 hover:border-blue-500 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {tournament.title}
                    </h3>
                    <Link
                      href={`/sports?sport=${encodeURIComponent(tournament.sport.charAt(0).toUpperCase() + tournament.sport.slice(1))}`}
                      className="flex items-center gap-2 text-gray-600 mb-2 hover:text-blue-600 transition-colors"
                    >
                      <Trophy className="h-4 w-4" />
                      <span className="capitalize">{tournament.sport}</span>
                    </Link>
                    <p className="text-gray-700 text-sm mb-3">{tournament.description}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${tournament.status === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : tournament.status === "ongoing"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                    }`}>
                    {tournament.status}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(tournament.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin className="h-4 w-4" />
                    <span>{tournament.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="h-4 w-4" />
                    <span>{tournament.participants} teams</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Award className="h-4 w-4" />
                    <span>Prize: {tournament.prize}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Target className="h-4 w-4" />
                    <span>Format: {tournament.format}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleViewDetails(tournament.id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ChevronRight className="h-4 w-4" />
                    View Details
                  </button>
                  <button
                    onClick={() => handleRegister(tournament.id)}
                    className={`flex-1 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${tournament.status === "upcoming"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      }`}
                    disabled={tournament.status !== "upcoming"}
                  >
                    <Users className="h-4 w-4" />
                    {tournament.status === "upcoming" ? "Register" : "Closed"}
                  </button>
                </div>
              </div>

            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Trophy className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Tournaments Found</h3>
              <p className="text-gray-600">Try selecting a different sport filter or check back later for new tournaments.</p>
            </div>
          )}
        </div>
      </div>

      {/* Tournament Details Modal */}
      {
        showModal && selectedTournament && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTournament.title}</h2>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/sports?sport=${encodeURIComponent(selectedTournament.sport.charAt(0).toUpperCase() + selectedTournament.sport.slice(1))}`}
                    className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  >
                    <Trophy className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900 capitalize">{selectedTournament.sport}</span>
                  </Link>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedTournament.status === "upcoming"
                    ? "bg-blue-100 text-blue-800"
                    : selectedTournament.status === "ongoing"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-red-100 text-red-800"
                    }`}>
                    {selectedTournament.status}
                  </span>
                </div>

                <p className="text-gray-700">{selectedTournament.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Date</p>
                        <p className="text-gray-600">{new Date(selectedTournament.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Location</p>
                        <p className="text-gray-600">{selectedTournament.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Users className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Participants</p>
                        <p className="text-gray-600">{selectedTournament.participants} teams</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">Prize Pool</p>
                        <p className="text-gray-600">{selectedTournament.prize}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Target className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Format</p>
                      <p className="text-gray-600">{selectedTournament.format}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Crown className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Organizer</p>
                      <p className="text-gray-600">{selectedTournament.organizer}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => handleRegister(selectedTournament.id)}
                    className={`flex-1 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${selectedTournament.status === "upcoming"
                      ? "bg-green-600 hover:bg-green-700 text-white"
                      : "bg-gray-400 text-gray-600 cursor-not-allowed"
                      }`}
                    disabled={selectedTournament.status !== "upcoming"}
                  >
                    <Users className="h-5 w-5" />
                    {selectedTournament.status === "upcoming" ? "Register Now" : "Registration Closed"}
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
        )
      }
    </div >
  );
}