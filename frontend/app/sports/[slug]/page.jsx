"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

export default function SportDetailPage() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug;
    const decodedSportName = decodeURIComponent(slug);

    const [activeSection, setActiveSection] = useState("overview");
    const [activeSubSection, setActiveSubSection] = useState(null);

    // State for dynamic data
    const [sportData, setSportData] = useState(null);
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

                // Fetch the specific sport by name
                const sportRes = await fetch(`${API_URL}/api/sports/name/${slug}`);
                if (!sportRes.ok) {
                    throw new Error("Sport not found");
                }
                const sport = await sportRes.json();
                setSportData(sport);
                setAthleticPrograms(sport.programs || []);
                setRulesAndRegulations(sport.rules?.map(r => ({
                    category: r.category,
                    rules: r.items
                })) || []);

                // Parallel fetches for related data
                const [athletesRes, coachesRes, facilitiesRes] = await Promise.all([
                    fetch(`${API_URL}/api/athletes`),
                    fetch(`${API_URL}/api/coaches`),
                    fetch(`${API_URL}/api/facilities`)
                ]);

                const athletesData = await athletesRes.json();
                const coachesData = await coachesRes.json();
                const facilitiesData = await facilitiesRes.json();

                // Helper to check if item relates to this sport
                const matchesSport = (item) => {
                    if (item.sport?.name === sport.name) return true;
                    if (item.sport?._id === sport._id) return true;
                    if (item.sports?.some(s => s.name === sport.name || s._id === sport._id || s === sport._id)) return true;
                    return false;
                };

                // Filter and transform Athletes
                const filteredAthletes = athletesData.filter(matchesSport).map(a => ({
                    id: a._id,
                    name: `${a.user?.firstName || ''} ${a.user?.lastName || ''}`.trim() || a.user?.username || "Unknown",
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
                const filteredCoaches = coachesData.filter(matchesSport).map(c => ({
                    id: c._id,
                    name: `${c.user?.firstName || ''} ${c.user?.lastName || ''}`.trim() || c.user?.username || "Unknown",
                    role: c.certification || "Coach",
                    specialization: c.specialization,
                    certification: "Certified",
                    experience: c.experience,
                    athletes: c.athleteCount || 0
                }));
                setCoachingStaff(filteredCoaches);

                // Filter and transform Facilities
                const filteredFacilities = facilitiesData.filter(matchesSport).map(f => ({
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
                console.error("Failed to fetch sport data:", err);
            } finally {
                setLoading(false);
            }
        };
        if (slug) fetchData();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!sportData) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Sport Not Found</h1>
                <p className="text-gray-600 mb-6">We couldn't find the sport you're looking for.</p>
                <Link href="/sports" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium">
                    Back to All Sports
                </Link>
            </div>
        );
    }

    const renderSection = () => {
        // If a sub-section is active, show program details
        if (activeSubSection) {
            const selectedProgram = athleticPrograms.find(p => p.id === activeSubSection || p._id === activeSubSection);
            if (!selectedProgram) return null;

            return (
                <div className="space-y-8">
                    <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-6 mb-8">
                            <button
                                onClick={() => setActiveSubSection(null)}
                                className="p-3 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all"
                            >
                                <ChevronRight className="h-5 w-5 text-slate-600 rotate-180" />
                            </button>
                            <div className="text-5xl">{selectedProgram.icon || '🏆'}</div>
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedProgram.name}</h2>
                                <p className="text-slate-500 font-medium">{selectedProgram.description}</p>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                    <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <BookOpen className="h-5 w-5 text-blue-600" />
                                        Overview
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed font-medium">{selectedProgram.details?.overview || "No overview available."}</p>
                                </div>

                                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                    <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <Target className="h-5 w-5 text-emerald-600" />
                                        Available Events
                                    </h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        {selectedProgram.events?.map((event, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-slate-200/50 shadow-sm">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full shadow-lg shadow-blue-200"></div>
                                                <span className="text-slate-700 text-sm font-black">{event}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                    <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-purple-600" />
                                        Facilities
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProgram.details?.facilities?.map((facility, index) => (
                                            <span key={index} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-bold text-slate-600">
                                                {facility}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                                    <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                                        <Award className="h-5 w-5 text-amber-600" />
                                        Competitions
                                    </h3>
                                    <div className="space-y-2">
                                        {selectedProgram.details?.competitions?.map((competition, index) => (
                                            <div key={index} className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                                                {competition}
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
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                                Programs & Disciplines
                            </h2>

                            {athleticPrograms.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {athleticPrograms.map((program) => (
                                        <button
                                            key={program.id || program._id}
                                            onClick={() => setActiveSubSection(program.id || program._id)}
                                            className="group bg-slate-50 rounded-[32px] p-6 border border-slate-100 hover:border-blue-500 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500 text-left"
                                        >
                                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                                {program.icon || '🏆'}
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {program.name}
                                            </h3>
                                            <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-2">
                                                {program.description}
                                            </p>
                                            <div className="flex items-center text-xs font-black text-blue-600 uppercase tracking-widest">
                                                Explore Program
                                                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No programs configured yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case "participants":
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                Top Athletes
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {participantProfiles.length > 0 ? participantProfiles.map((participant) => (
                                    <div key={participant.id} className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 hover:shadow-lg transition-all group">
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <div className="h-14 w-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-200">
                                                    {participant.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-900">{participant.name}</h3>
                                                    <p className="text-xs text-blue-600 font-black uppercase tracking-widest">Ranked Athlete</p>
                                                </div>
                                            </div>
                                            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                {participant.training}
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Primary Events</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {participant.events.map((event, index) => (
                                                        <span key={index} className="px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600">
                                                            {event}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-6 border-t border-slate-200">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                                        <div className="flex items-center gap-2">
                                                            <Heart className="h-4 w-4 text-red-500" />
                                                            <span className="text-xs font-bold text-slate-600">{participant.medical}</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Age</p>
                                                        <span className="text-sm font-black text-slate-900">{participant.age} yrs</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full text-center py-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No athletes found for this sport</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case "facilities":
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                Sport Facilities
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {facilities.length > 0 ? facilities.map((facility) => (
                                    <div key={facility.id} className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 hover:shadow-lg transition-all">
                                        <div className="flex items-start justify-between mb-6">
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 mb-1">{facility.name}</h3>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">{facility.type}</p>
                                            </div>
                                            <div className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${facility.status === 'Excellent' || facility.status === 'active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                'bg-amber-50 text-amber-600 border border-amber-100'
                                                }`}>
                                                {facility.status}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6 mb-6">
                                            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Capacity</p>
                                                <p className="text-sm font-black text-slate-800">{facility.capacity}</p>
                                            </div>
                                            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                                                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Last Inspection</p>
                                                <p className="text-sm font-black text-slate-800">{facility.lastMaintenance}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Key Features</p>
                                            <div className="flex flex-wrap gap-2">
                                                {facility.features.map((feature, index) => (
                                                    <span key={index} className="flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 leading-none">
                                                        <CheckCircle className="h-3 w-3 text-emerald-500" />
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full text-center py-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No facilities matched this sport</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case "coaching":
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                Coaching Experts
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {coachingStaff.length > 0 ? coachingStaff.map((coach) => (
                                    <div key={coach.id} className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 hover:shadow-lg transition-all group">
                                        <div className="flex items-start justify-between mb-8">
                                            <div className="flex items-center gap-5">
                                                <div className="h-16 w-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white text-2xl group-hover:bg-blue-600 transition-colors duration-500">
                                                    <GraduationCap />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-900">{coach.name}</h3>
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{coach.role}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group-hover:border-blue-200 transition-colors">
                                                <div className="absolute right-0 top-0 h-full w-1.5 bg-blue-600"></div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Specialization</p>
                                                <p className="text-sm font-bold text-slate-700">{coach.specialization}</p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center gap-4 px-5 py-4 bg-white rounded-3xl border border-slate-200">
                                                    <Clock className="h-5 w-5 text-blue-600" />
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase">Exp</p>
                                                        <p className="text-xs font-black text-slate-800">{coach.experience}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 px-5 py-4 bg-white rounded-3xl border border-slate-200">
                                                    <Users className="h-5 w-5 text-emerald-600" />
                                                    <div>
                                                        <p className="text-[10px] font-black text-slate-400 uppercase">Dept</p>
                                                        <p className="text-xs font-black text-slate-800">{coach.athletes} athletes</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="col-span-full text-center py-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No coaches found for this sport</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            case "rules":
                return (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                                Sport Regulations
                            </h2>

                            <div className="grid gap-6">
                                {rulesAndRegulations.length > 0 ? rulesAndRegulations.map((category, index) => (
                                    <div key={index} className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
                                        <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                            <Shield className="h-6 w-6 text-blue-600" />
                                            {category.category}
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            {category.rules.map((rule, ruleIndex) => (
                                                <div key={ruleIndex} className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm">
                                                        {ruleIndex + 1}
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-600 leading-relaxed">{rule}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-12 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No regulations documented</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden bg-slate-900">
                <div className="absolute inset-0 z-0 h-full w-full opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 mix-blend-multiply" />
                    <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center text-center"
                    >
                        <div className="text-7xl mb-6 bg-white/10 backdrop-blur-md h-24 w-24 rounded-3xl flex items-center justify-center border border-white/20 shadow-2xl">
                            {sportData.icon || '🏆'}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4 uppercase">
                            {sportData.name}
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl font-medium tracking-tight">
                            {sportData.description || "The pursuit of excellence and teamwork."}
                        </p>

                        <div className="mt-10 flex flex-wrap gap-4 justify-center">
                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                <Trophy className="text-amber-400" size={20} />
                                <span className="text-white font-bold text-sm tracking-wide uppercase">{sportData.popularity} Interest</span>
                            </div>
                            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                <Users className="text-blue-400" size={20} />
                                <span className="text-white font-bold text-sm tracking-wide uppercase">{sportData.participants}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-20">
                {/* Navigation Tabs */}
                <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 p-3 border border-slate-200 mb-12">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {[
                            { id: "overview", label: "Program Overview", icon: BookOpen },
                            { id: "participants", label: "Athlete Roster", icon: UserCheck },
                            { id: "facilities", label: "Infrastructure", icon: MapPin },
                            { id: "coaching", label: "Expert Coaches", icon: GraduationCap },
                            { id: "rules", label: "Regulations", icon: FileText }
                        ].map((section) => (
                            <button
                                key={section.id}
                                onClick={() => {
                                    setActiveSection(section.id);
                                    setActiveSubSection(null);
                                }}
                                disabled={activeSubSection !== null}
                                className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 ${activeSection === section.id && !activeSubSection
                                    ? "bg-blue-600 text-white shadow-xl shadow-blue-200"
                                    : activeSubSection
                                        ? "opacity-50 cursor-not-allowed bg-slate-50 text-slate-300"
                                        : "bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                <section.icon size={18} />
                                {section.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[400px]">
                    {renderSection()}
                </div>

                {/* Action Footer */}
                <div className="mt-20 text-center">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[48px] p-16 shadow-2xl shadow-blue-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150">
                            <Trophy size={200} text="white" />
                        </div>
                        <h2 className="text-4xl font-black text-white mb-6 relative z-10">Start Your Journey in {sportData.name}</h2>
                        <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto font-bold relative z-10">
                            Join the university's premier sports community and train with experts to reach your peak performance.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center relative z-10">
                            <Link href={`/clubs?search=${encodeURIComponent(sportData.name)}`} className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                                Join {sportData.name} Club
                            </Link>
                            <Link href="/contact" className="px-10 py-5 bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest border border-blue-400 hover:bg-blue-600 transition-all">
                                Inquire Now
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
