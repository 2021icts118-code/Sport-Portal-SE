"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Users,
  Target,
  Activity,
  ChevronRight,
  Star,
  Calendar,
  Award,
  Zap,
  BookOpen,
  UserCheck,
  MapPin,
  GraduationCap,
  FileText,
  Shield,
  Clock,
  TrendingUp,
  BarChart3,
  Heart,
  Ruler,
  Weight,
  Eye,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react";

export default function AthleticsPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeSubSection, setActiveSubSection] = useState(null);

  // State for dynamic data
  const [athleticPrograms, setAthleticPrograms] = useState([]);
  const [rulesAndRegulations, setRulesAndRegulations] = useState([]);
  const [participantProfiles, setParticipantProfiles] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [coachingStaff, setCoachingStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

        // Parallel fetches
        const [sportsRes, athletesRes, coachesRes, facilitiesRes] = await Promise.all([
          fetch(`${API_URL}/api/sports`),
          fetch(`${API_URL}/api/athletes`),
          fetch(`${API_URL}/api/coaches`),
          fetch(`${API_URL}/api/facilities`)
        ]);

        const sportsData = await sportsRes.json();
        const athletesData = await athletesRes.json();
        const coachesData = await coachesRes.json();
        const facilitiesData = await facilitiesRes.json();

        // 1. Get Athletics Sport Data (Programs & Rules)
        const athleticsSport = sportsData.find(s => s.name === 'Athletics');
        if (athleticsSport) {
          setAthleticPrograms(athleticsSport.programs || []);
          // Map rules from backend format { category, items } to frontend { category, rules }
          setRulesAndRegulations(athleticsSport.rules?.map(r => ({
            category: r.category,
            rules: r.items
          })) || []);
        }

        // Helper to check if item relates to Athletics
        const isAthletics = (item) => {
          if (item.sport?.name === 'Athletics') return true;
          if (item.sports?.some(s => s.name === 'Athletics')) return true;
          return false;
        };

        // Filter and transform Athletes
        const filteredAthletes = athletesData.filter(isAthletics).map(a => ({
          id: a._id,
          name: `${a.user?.firstName} ${a.user?.lastName}` || "Unknown",
          age: a.age,
          events: a.performanceMetrics?.events || [],
          bestTimes: a.performanceMetrics?.personalBests || {},
          bestDistances: a.performanceMetrics?.bestDistances || {},
          bestHeights: a.performanceMetrics?.bestHeights || {},
          medical: a.medicalInfo || "Clear",
          training: a.trainingLevel,
          achievements: a.achievements || []
        }));
        setParticipantProfiles(filteredAthletes);

        // Filter and transform Coaches
        const filteredCoaches = coachesData.filter(isAthletics).map(c => ({
          id: c._id,
          name: `${c.user?.firstName} ${c.user?.lastName}` || "Unknown",
          role: c.certification || "Coach",
          specialization: c.specialization,
          certification: "Certified",
          experience: c.experience,
          athletes: c.athleteCount
        }));
        setCoachingStaff(filteredCoaches);

        // Filter and transform Facilities
        const filteredFacilities = facilitiesData.filter(isAthletics).map(f => ({
          id: f._id,
          name: f.name,
          type: f.type,
          capacity: `${f.capacity} persons`,
          features: f.features || [],
          status: f.status,
          lastMaintenance: f.lastMaintenance ? new Date(f.lastMaintenance).toLocaleDateString() : "N/A"
        }));
        setFacilities(filteredFacilities);

      } catch (err) {
        console.error("Failed to fetch athletics data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderSection = () => {
    // If a sub-section is active, show program details
    if (activeSubSection) {
      const selectedProgram = athleticPrograms.find(p => p.id === activeSubSection);
      if (!selectedProgram) return null;

      return (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setActiveSubSection(null)}
                className="p-2 hover:bg-white/50 rounded-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 rotate-180" />
              </button>
              <div className="text-4xl">{selectedProgram.icon}</div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{selectedProgram.name}</h2>
                <p className="text-lg text-gray-700">{selectedProgram.description}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Overview
                  </h3>
                  <p className="text-gray-700">{selectedProgram.details.overview}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Available Events
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProgram.events.map((event, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-purple-600" />
                    Facilities & Equipment
                  </h3>
                  <div className="space-y-2">
                    {selectedProgram.details.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-gray-700">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-600" />
                    Training Programs
                  </h3>
                  <div className="space-y-2">
                    {selectedProgram.details.training.map((training, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-700">{training}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-600" />
                    Competitions
                  </h3>
                  <div className="space-y-2">
                    {selectedProgram.details.competitions.map((competition, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-yellow-500" />
                        <span className="text-gray-700">{competition}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Main section content
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Athletic Program Overview</h2>
              <p className="text-lg text-gray-700 mb-6">
                A complete guide to available track and field disciplines at University of Vocational Studies.
                Our comprehensive athletics program offers training and competition opportunities across all major track and field events.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {athleticPrograms.map((program) => (
                  <button
                    key={program.id}
                    onClick={() => setActiveSubSection(program.id)}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-left group"
                  >
                    <div className="text-4xl mb-4">{program.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{program.name}</h3>
                    <p className="text-gray-600 mb-4">{program.description}</p>
                    <div className="space-y-1">
                      {program.events.slice(0, 3).map((event, index) => (
                        <div key={index} className="text-sm text-gray-500 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          {event}
                        </div>
                      ))}
                      {program.events.length > 3 && (
                        <div className="text-sm text-blue-600 font-medium">
                          +{program.events.length - 3} more events
                        </div>
                      )}
                    </div>
                    <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                      <span>View Details</span>
                      <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "participants":
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Athletic Participant Profiles</h2>
              <p className="text-lg text-gray-700 mb-6">
                Comprehensive records of every athlete, including medical and physical stats, performance metrics, and training progress.
              </p>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {participantProfiles.map((participant) => (
                  <div key={participant.id} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{participant.name}</h3>
                        <p className="text-gray-600">Age: {participant.age}</p>
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {participant.training} Level
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Events</h4>
                        <div className="flex flex-wrap gap-2">
                          {participant.events.map((event, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {event}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        {participant.bestTimes && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Best Times</h4>
                            {Object.entries(participant.bestTimes).map(([event, time]) => (
                              <div key={event} className="text-sm text-gray-600">
                                {event}: {time}
                              </div>
                            ))}
                          </div>
                        )}
                        {participant.bestDistances && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Best Distances</h4>
                            {Object.entries(participant.bestDistances).map(([event, distance]) => (
                              <div key={event} className="text-sm text-gray-600">
                                {event}: {distance}
                              </div>
                            ))}
                          </div>
                        )}
                        {participant.bestHeights && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Best Heights</h4>
                            {Object.entries(participant.bestHeights).map(([event, height]) => (
                              <div key={event} className="text-sm text-gray-600">
                                {event}: {height}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Medical Status</h4>
                        <div className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-gray-600">{participant.medical}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Achievements</h4>
                        <div className="space-y-1">
                          {participant.achievements.map((achievement, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-gray-700">{achievement}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "facilities":
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Athletic Facility Records</h2>
              <p className="text-lg text-gray-700 mb-6">
                Information on stadiums, tracks, and training grounds. All facilities are maintained to international standards.
              </p>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {facilities.map((facility) => (
                  <div key={facility.id} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{facility.name}</h3>
                        <p className="text-gray-600">{facility.type}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${facility.status === 'Excellent' ? 'bg-green-100 text-green-800' :
                        facility.status === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                        {facility.status}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <span className="text-gray-700">Capacity: {facility.capacity}</span>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                        <div className="space-y-1">
                          {facility.features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Last Maintenance: {facility.lastMaintenance}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "coaching":
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Athletic Coaching Staff</h2>
              <p className="text-lg text-gray-700 mb-6">
                Details of certified trainers and specialized coaches for each Athletic event. Our coaching team brings decades of experience and expertise.
              </p>

              <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
                {coachingStaff.map((coach) => (
                  <div key={coach.id} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{coach.name}</h3>
                        <p className="text-gray-600">{coach.role}</p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {coach.certification}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Specialization</h4>
                        <p className="text-gray-700">{coach.specialization}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Experience</p>
                            <p className="text-sm text-gray-600">{coach.experience}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">Athletes</p>
                            <p className="text-sm text-gray-600">{coach.athletes} athletes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "rules":
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Athletic Rules & Regulations</h2>
              <p className="text-lg text-gray-700 mb-6">
                The official handbook for all competitive Athletic standards. These rules ensure fair play, safety, and excellence in all athletic activities.
              </p>

              <div className="space-y-6">
                {rulesAndRegulations.map((category, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Shield className="h-6 w-6 text-blue-600" />
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.rules.map((rule, ruleIndex) => (
                        <div key={ruleIndex} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-blue-600">{ruleIndex + 1}</span>
                          </div>
                          <p className="text-gray-700">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden bg-white/80 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-4">🏃‍♂️</div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Athletic Master Data
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Complete documentation of all Athletic activities, events, and performance details in a structured format
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { id: "overview", label: "Program Overview", icon: BookOpen },
              { id: "participants", label: "Participant Profiles", icon: UserCheck },
              { id: "facilities", label: "Facility Records", icon: MapPin },
              { id: "coaching", label: "Coaching Staff", icon: GraduationCap },
              { id: "rules", label: "Rules & Regulations", icon: FileText }
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  setActiveSubSection(null); // Reset sub-section when changing main section
                }}
                disabled={activeSubSection !== null}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${activeSection === section.id && !activeSubSection
                  ? "bg-blue-600 text-white shadow-lg"
                  : activeSubSection
                    ? "bg-gray-50 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                <section.icon className="h-5 w-5" />
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {renderSection()}
      </div>
    </div>
  );
}