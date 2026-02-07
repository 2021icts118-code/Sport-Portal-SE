"use client";

import { useState, useEffect } from "react";
import {
    Users,
    Trophy,
    Check,
    X,
    Shield,
    Search,
    Filter,
    MoreVertical,
    Mail,
    UserPlus,
    ArrowRight,
    TrendingUp,
    AlertCircle,
    LayoutDashboard,
    Bell,
    ChevronRight,
    LogOut,
    Menu,
    Plus,
    Activity,
    BarChart3,
    Award,
    Calendar,
    Image as ImageIcon,
    Trash2,
    Pencil
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("overview");
    const [users, setUsers] = useState([]);
    const [clubs, setClubs] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [schedules, setSchedules] = useState([]);
    const [results, setResults] = useState([]);
    const [galleries, setGalleries] = useState([]);
    const [sports, setSports] = useState([]);
    const [trainingPrograms, setTrainingPrograms] = useState([]);
    const [coaches, setCoaches] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [notification, setNotification] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [modalData, setModalData] = useState(null); // For Add/Edit modals
    const router = useRouter();

    useEffect(() => {
        // Check for admin role
        const savedUser = localStorage.getItem("user");
        if (!savedUser) {
            router.push("/login");
            return;
        }
        const userObj = JSON.parse(savedUser);
        if (userObj.role !== "admin") {
            router.push("/");
            return;
        }

        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            const savedUser = localStorage.getItem("user");
            if (!savedUser) return;
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

            // Helper to fetch and set state with error handling
            const safeFetch = async (endpoint, setter, headers = {}) => {
                try {
                    const res = await fetch(`${API_URL}/api/${endpoint}`, { headers });
                    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
                    const data = await res.json();
                    setter(Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []));
                } catch (err) {
                    console.error(`Error fetching ${endpoint}:`, err);
                }
            };

            await safeFetch('admin/users', setUsers, { 'Authorization': `Bearer ${token}` });

            // Special handling for pending requests as it needs flattening
            try {
                const requestsRes = await fetch(`${API_URL}/api/admin/clubs/pending-requests`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (requestsRes.ok) {
                    const requestsData = await requestsRes.json();
                    const flatRequests = [];
                    if (Array.isArray(requestsData)) {
                        requestsData.forEach(club => {
                            if (club.pendingMembers) {
                                club.pendingMembers.forEach(user => {
                                    flatRequests.push({
                                        id: `${club._id}-${user._id}`,
                                        clubId: club._id,
                                        userId: user._id,
                                        userName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
                                        userEmail: user.email,
                                        clubName: club.name,
                                        date: new Date().toLocaleDateString()
                                    });
                                });
                            }
                        });
                    }
                    setPendingRequests(flatRequests);
                }
            } catch (err) { console.error("Error fetching pending requests:", err); }

            await safeFetch('admin/clubs', setClubs, { 'Authorization': `Bearer ${token}` });
            await safeFetch('tournaments', setTournaments);
            await safeFetch('schedules', setSchedules);
            await safeFetch('results', setResults);
            await safeFetch('gallery', setGalleries);
            await safeFetch('sports', setSports);
            await safeFetch('training-programs', setTrainingPrograms);
            await safeFetch('coaches', setCoaches);

        } catch (error) {
            console.error("Dashboard Global Error:", error);
            showNotification("Some dashboard data failed to load", "error");
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message, type = "success") => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleApprove = async (requestId, clubId, userId) => {
        try {
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
            const res = await fetch(`${API_URL}/api/admin/clubs/${clubId}/approve/${userId}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setPendingRequests(prev => prev.filter(req => req.id !== requestId));
                showNotification("Request approved");
            }
        } catch (error) { showNotification("Error", "error"); }
    };

    const handleReject = async (requestId, clubId, userId) => {
        try {
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
            const res = await fetch(`${API_URL}/api/admin/clubs/${clubId}/reject/${userId}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setPendingRequests(prev => prev.filter(req => req.id !== requestId));
                showNotification("Request rejected", "info");
            }
        } catch (error) { showNotification("Error", "error"); }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
            const res = await fetch(`${API_URL}/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) {
                setUsers(prev => prev.map(u => u._id === userId ? { ...u, role: newRole } : u));
                showNotification(`Role updated to ${newRole}`);
            }
        } catch (error) { showNotification("Error", "error"); }
    };

    const handleStatusChange = async (userId, newStatus) => {
        try {
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
            const res = await fetch(`${API_URL}/api/admin/users/${userId}/status`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setUsers(prev => prev.map(u => u._id === userId ? { ...u, status: newStatus } : u));
                showNotification(`Status updated to ${newStatus}`);
            }
        } catch (error) { showNotification("Error", "error"); }
    };

    const handleDelete = async (endpoint, id, setter) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
            const res = await fetch(`${API_URL}/api/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                setter(prev => prev.filter(item => item._id !== id));
                showNotification("Item deleted successfully");
            }
        } catch (error) { showNotification("Failed to delete", "error"); }
    };

    const handleSave = async (endpoint, data, setter, isEdit = false) => {
        try {
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
            const url = isEdit ? `${API_URL}/api/${endpoint}/${data._id}` : `${API_URL}/api/${endpoint}`;
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                const savedItem = await res.json();
                if (isEdit) {
                    setter(prev => prev.map(item => item._id === savedItem._id ? savedItem : item));
                } else {
                    setter(prev => [...prev, savedItem]);
                }
                setModalData(null);
                showNotification(`Item ${isEdit ? 'updated' : 'created'} successfully`);
            }
        } catch (error) { showNotification("Failed to save item", "error"); }
    };

    const statsOverview = [
        { label: "Active Users", value: users.length, icon: <Users size={20} />, color: "from-blue-600 to-blue-400", trend: "+12%", iconColor: "text-blue-600", bgColor: "bg-blue-50" },
        { label: "New Requests", value: pendingRequests.length, icon: <UserPlus size={20} />, color: "from-amber-500 to-amber-300", trend: "+5%", iconColor: "text-amber-600", bgColor: "bg-amber-50" },
        { label: "Clubs Managed", value: clubs.length, icon: <Trophy size={20} />, color: "from-emerald-600 to-emerald-400", trend: "0%", iconColor: "text-emerald-600", bgColor: "bg-emerald-50" },
        { label: "Active Admins", value: users.filter(u => u.role === 'admin').length, icon: <Shield size={20} />, color: "from-purple-600 to-purple-400", trend: "+1", iconColor: "text-purple-600", bgColor: "bg-purple-50" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50/50">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-sm font-bold text-gray-500 tracking-widest uppercase animate-pulse">Initializing Portal</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] bg-[#F8FAFC] flex overflow-hidden">
            {/* Standard Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: sidebarOpen ? "280px" : "80px" }}
                className="bg-white border-r border-slate-200 flex flex-col relative z-20 shadow-sm"
            >
                {/* Sidebar Header */}
                <div className="p-6 flex items-center justify-between overflow-hidden">
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-3 transition-all"
                        >
                            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <Activity size={20} />
                            </div>
                            <div>
                                <h2 className="font-black text-slate-800 tracking-tight">PORTAL</h2>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">Management</p>
                            </div>
                        </motion.div>
                    )}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 transition-colors"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    {[
                        { id: "overview", label: "Overview", icon: <BarChart3 size={20} />, active: activeTab === "overview" },
                        { id: "users", label: "User Directory", icon: <Users size={20} />, active: activeTab === "users" },
                        { id: "requests", label: "Join Requests", icon: <UserPlus size={20} />, active: activeTab === "requests", badge: pendingRequests.length },
                        { id: "clubs", label: "Sports Clubs", icon: <Trophy size={20} />, active: activeTab === "clubs" },
                        { id: "tournaments", label: "Tournaments", icon: <Award size={20} />, active: activeTab === "tournaments" },
                        { id: "schedules", label: "Schedules", icon: <Calendar size={20} />, active: activeTab === "schedules" },
                        { id: "results", label: "Results", icon: <BarChart3 size={20} />, active: activeTab === "results" },
                        { id: "training", label: "Training Programs", icon: <Activity size={20} />, active: activeTab === "training" },
                        { id: "gallery", label: "Gallery", icon: <ImageIcon size={20} />, active: activeTab === "gallery" },
                        { id: "sports", label: "Sports Configuration", icon: <Activity size={20} />, active: activeTab === "sports" },

                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative ${item.active
                                ? "bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <div className={`${item.active ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`}>
                                {item.icon}
                            </div>
                            {sidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-sm whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {item.badge > 0 && sidebarOpen && (
                                <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${item.active ? "bg-white text-blue-600" : "bg-red-500 text-white"}`}>
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Footer Section in Sidebar */}
                <div className="p-4 border-t border-slate-100">
                    <button
                        onClick={() => router.push("/")}
                        className="w-full flex items-center gap-4 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all group"
                    >
                        <div className="text-slate-400 group-hover:text-red-500">
                            <LogOut size={20} />
                        </div>
                        {sidebarOpen && <span className="text-sm font-semibold">Exit Portal</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col h-full bg-[#F8FAFC]">
                {/* Standard Page Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-5 flex items-center justify-between sticky top-0 z-10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                            <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-100 rounded-lg">
                                <Menu size={20} />
                            </button>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                <span>Dashboard</span>
                                <ChevronRight size={12} />
                                <span className="text-blue-600">{activeTab}</span>
                            </div>
                            <h1 className="text-2xl font-black text-slate-900 capitalize">
                                {activeTab.replace("-", " ")}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden lg:flex items-center bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 w-72 transition-all focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white focus-within:border-blue-400 group">
                            <Search className="text-slate-400 group-focus-within:text-blue-500" size={16} />
                            <input
                                type="text"
                                placeholder="Universal search..."
                                className="bg-transparent border-none text-sm px-3 focus:ring-0 w-full text-slate-700 font-medium"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            {["tournaments", "schedules", "results", "gallery", "sports"].includes(activeTab) && (
                                <button
                                    onClick={() => setModalData({ type: activeTab, data: {} })}
                                    className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95 uppercase tracking-widest"
                                >
                                    <Plus size={16} /> Add New
                                </button>
                            )}
                            <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-all shadow-sm group">
                                <Bell size={18} className="group-hover:animate-bounce" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Page Canvas */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    {/* Animated Notification */}
                    <AnimatePresence>
                        {notification && (
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`mb-6 p-4 rounded-2xl flex items-center gap-4 shadow-xl border ${notification.type === 'error'
                                    ? 'bg-red-50 text-red-700 border-red-200'
                                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    }`}
                            >
                                <div className={`p-2 rounded-lg ${notification.type === 'error' ? 'bg-red-200/50' : 'bg-emerald-200/50'}`}>
                                    <Bell size={20} />
                                </div>
                                <p className="text-sm font-bold tracking-tight">{notification.message}</p>
                                <button onClick={() => setNotification(null)} className="ml-auto p-1.5 hover:bg-black/5 rounded-lg">
                                    <X size={16} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Dashboard Contents by Tab */}
                    {activeTab === "overview" && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Metrics Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {statsOverview.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ y: -5 }}
                                        className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`h-12 w-12 rounded-2xl ${stat.bgColor} flex items-center justify-center ${stat.iconColor} group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm`}>
                                                {stat.icon}
                                            </div>
                                            <span className={`text-xs font-black px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                                                {stat.trend}
                                            </span>
                                        </div>
                                        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                                            <div className="h-1 w-12 bg-slate-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 w-2/3"></div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Centerpieces */}
                            <div className="grid lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-200 shadow-sm p-8 overflow-hidden relative">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-xl font-black text-slate-900 leading-none">System Activity</h3>
                                            <p className="text-sm text-slate-400 mt-1">Real-time engagement metrics</p>
                                        </div>
                                        <select className="bg-slate-50 border-none rounded-xl text-xs font-bold px-4 py-2 text-slate-600 focus:ring-2 focus:ring-blue-500">
                                            <option>Last 7 Days</option>
                                            <option>Last 30 Days</option>
                                        </select>
                                    </div>
                                    <div className="h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-200 flex items-end justify-center p-8 gap-8 group">
                                        {[
                                            { label: 'Users', value: users.length, color: 'bg-blue-500', height: `${Math.min(users.length * 10 || 10, 100)}%` },
                                            { label: 'Clubs', value: clubs.length, color: 'bg-emerald-500', height: `${Math.min(clubs.length * 20 || 10, 100)}%` },
                                            { label: 'Tournaments', value: tournaments.length, color: 'bg-amber-500', height: `${Math.min(tournaments.length * 20 || 10, 100)}%` },
                                            { label: 'Results', value: results.length, color: 'bg-purple-500', height: `${Math.min(results.length * 20 || 10, 100)}%` }
                                        ].map((item, i) => (
                                            <div key={i} className="flex flex-col items-center gap-2 h-full justify-end group/bar">
                                                <div className="relative w-16 bg-slate-200 rounded-t-xl overflow-hidden h-full flex items-end">
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: item.height }}
                                                        className={`w-full ${item.color} opacity-80 group-hover/bar:opacity-100 transition-all duration-500 rounded-t-xl relative`}
                                                    >
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-opacity">
                                                            {item.value}
                                                        </div>
                                                    </motion.div>
                                                </div>
                                                <span className="text-[10px] font-black uppercase text-slate-400">{item.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>


                            </div>
                        </div>
                    )}

                    {/* Management Sections (Users, Clubs, Requests) */}
                    {(activeTab === "users" || activeTab === "clubs" || activeTab === "requests") && (
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            {/* Inner Header for Tables */}
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    {activeTab === "users" && <><Users size={18} className="text-blue-600" /> All Registered Users</>}
                                    {activeTab === "clubs" && <><Trophy size={18} className="text-emerald-600" /> Certified Sports Clubs</>}
                                    {activeTab === "requests" && <><UserPlus size={18} className="text-amber-600" /> Pending Approvals</>}
                                </h3>
                                {activeTab === "clubs" && (
                                    <button
                                        onClick={() => setModalData({ type: 'clubs', data: {} })}
                                        className="px-4 py-2 bg-blue-600 text-white text-[10px] font-black rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 flex items-center gap-2 uppercase tracking-widest transition-all"
                                    >
                                        <Plus size={14} /> New Club
                                    </button>
                                )}
                            </div>

                            {/* Tables Content */}
                            <div className="overflow-x-auto">
                                {activeTab === "users" && (
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                                <th className="px-8 py-5">Profile</th>
                                                <th className="px-8 py-5">System Role</th>
                                                <th className="px-8 py-5">Account Status</th>
                                                <th className="px-8 py-5">Join Date</th>
                                                <th className="px-8 py-5 text-right">Settings</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {users.filter(u => `${u.firstName || ''} ${u.lastName || ''} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
                                                <tr key={user._id} className="hover:bg-blue-50/30 transition-all group">
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-4">
                                                            <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-700 font-black text-xs">
                                                                {(user.firstName || 'U')[0]}{(user.lastName || '')[0] || ''}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-slate-900 capitalize">{user.firstName} {user.lastName}</p>
                                                                <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <select
                                                            value={user.role}
                                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                            className="text-[10px] font-black bg-white border border-slate-200 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 cursor-pointer text-slate-600 shadow-sm"
                                                        >
                                                            <option value="student">STUDENT</option>
                                                            <option value="coach">COACH</option>
                                                            <option value="admin">ADMIN</option>
                                                            <option value="organizer">ORGANIZER</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <button
                                                            onClick={() => handleStatusChange(user._id, user.status === 'active' ? 'inactive' : 'active')}
                                                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest transition-all border ${user.status === 'active'
                                                                ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                                                                : 'bg-slate-50 text-slate-500 border-slate-200'
                                                                }`}
                                                        >
                                                            <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                                            {(user.status || 'active').toUpperCase()}
                                                        </button>
                                                    </td>
                                                    <td className="px-8 py-5 text-xs text-slate-500 font-bold uppercase tracking-tight">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</td>
                                                    <td className="px-8 py-5 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => setModalData({ type: 'users', data: user, edit: true })}
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-blue-100"
                                                                title="Edit User"
                                                            >
                                                                <Pencil size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete('admin/users', user._id, setUsers)}
                                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all shadow-sm"
                                                                title="Delete User"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                {activeTab === "clubs" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8 bg-slate-50/50">
                                        {clubs.map((club, idx) => (
                                            <motion.div
                                                key={club._id || idx}
                                                whileHover={{ scale: 1.02 }}
                                                className="bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col group"
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 ring-4 ring-white shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                                        <Trophy size={28} />
                                                    </div>
                                                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${club.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                                                        {club.status || 'active'}
                                                    </span>
                                                </div>
                                                <h4 className="text-xl font-black text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{club.name}</h4>
                                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                                                    <span>{(club.sport?.name || 'SPORT')}</span>
                                                    <span className="h-1 w-1 bg-slate-300 rounded-full" />
                                                    <span>{club.memberCount || 0} Members</span>
                                                </div>
                                                <div className="mt-auto grid grid-cols-2 gap-3">
                                                    <button
                                                        onClick={() => handleDelete('clubs', club._id, setClubs)}
                                                        className="py-3 bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-200"
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        onClick={() => setModalData({ type: 'clubs', data: club, edit: true })}
                                                        className="py-3 bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-100"
                                                    >
                                                        Manage
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "requests" && (
                                    <div className="bg-white">
                                        {pendingRequests.length === 0 ? (
                                            <div className="text-center py-20">
                                                <div className="h-20 w-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                                    <Check size={40} className="text-emerald-500" />
                                                </div>
                                                <h3 className="text-xl font-black text-slate-900 mb-2">Workspace Cleared</h3>
                                                <p className="text-slate-400 font-medium">No pending membership applications found.</p>
                                            </div>
                                        ) : (
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                                        <th className="px-8 py-5">Applicant</th>
                                                        <th className="px-8 py-5">Target Club</th>
                                                        <th className="px-8 py-5">Request Date</th>
                                                        <th className="px-8 py-5 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-100">
                                                    {pendingRequests.map(request => (
                                                        <tr key={request.id} className="hover:bg-blue-50/30 transition-all group">
                                                            <td className="px-8 py-5">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
                                                                        <UserPlus size={18} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-black text-slate-900">{request.userName}</p>
                                                                        <p className="text-xs text-slate-400 font-medium">{request.userEmail}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-8 py-5">
                                                                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100">
                                                                    {request.clubName}
                                                                </span>
                                                            </td>
                                                            <td className="px-8 py-5 text-xs text-slate-500 font-bold uppercase tracking-tight">
                                                                {request.date}
                                                            </td>
                                                            <td className="px-8 py-5 text-right">
                                                                <div className="flex items-center justify-end gap-2">
                                                                    <button
                                                                        onClick={() => handleApprove(request.id, request.clubId, request.userId)}
                                                                        className="p-2 bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                                                                        title="Approve"
                                                                    >
                                                                        <Check size={16} />
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleReject(request.id, request.clubId, request.userId)}
                                                                        className="p-2 bg-white text-slate-400 border border-slate-200 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm"
                                                                        title="Reject"
                                                                    >
                                                                        <X size={16} />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Tournaments Management */}
                    {activeTab === "tournaments" && (
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <Award size={18} className="text-blue-600" /> Active Tournaments
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                            <th className="px-8 py-5">Tournament</th>
                                            <th className="px-8 py-5">Sport</th>
                                            <th className="px-8 py-5">Dates</th>
                                            <th className="px-8 py-5">Status</th>
                                            <th className="px-8 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {tournaments.map(t => (
                                            <tr key={t._id} className="hover:bg-blue-50/30 transition-all group">
                                                <td className="px-8 py-5 text-sm font-black text-slate-900">{t.title}</td>
                                                <td className="px-8 py-5 text-xs font-bold text-slate-500">{t.sport?.name || 'All'}</td>
                                                <td className="px-8 py-5 text-xs text-slate-500 font-bold uppercase tracking-tight">
                                                    {new Date(t.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest ${t.status === 'upcoming' ? 'bg-blue-50 text-blue-700' : 'bg-green-50 text-green-700'}`}>
                                                        {t.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setModalData({ type: 'tournaments', data: t, edit: true })}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-blue-100"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete('tournaments', t._id, setTournaments)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-red-100"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Schedules Management */}
                    {activeTab === "schedules" && (
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <Calendar size={18} className="text-blue-600" /> Event Schedules
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                            <th className="px-8 py-5">Event</th>
                                            <th className="px-8 py-5">Sport / Club</th>
                                            <th className="px-8 py-5">Date & Time</th>
                                            <th className="px-8 py-5">Location</th>
                                            <th className="px-8 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {schedules.map(s => (
                                            <tr key={s._id} className="hover:bg-blue-50/30 transition-all group">
                                                <td className="px-8 py-5">
                                                    <p className="text-sm font-black text-slate-900">{s.title}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase">{s.eventType}</p>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <p className="text-xs font-bold text-slate-500">{s.sport?.name}</p>
                                                    <p className="text-[10px] text-slate-400">{s.club?.name || 'All Clubs'}</p>
                                                </td>
                                                <td className="px-8 py-5 text-xs text-slate-500 font-bold">
                                                    {new Date(s.date).toLocaleDateString()} @ {s.startTime}
                                                </td>
                                                <td className="px-8 py-5 text-xs text-slate-500">{s.location}</td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setModalData({ type: 'schedules', data: s, edit: true })}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-blue-100"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete('schedules', s._id, setSchedules)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-red-100"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Results Management */}
                    {activeTab === "results" && (
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
                                <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <BarChart3 size={18} className="text-blue-600" /> Match Results
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                            <th className="px-8 py-5">Tournament & Sport</th>
                                            <th className="px-8 py-5">Participants</th>
                                            <th className="px-8 py-5">Final Score</th>
                                            <th className="px-8 py-5">Date & Status</th>
                                            <th className="px-8 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {results.map(r => (
                                            <tr key={r._id} className="hover:bg-blue-50/30 transition-all group">
                                                <td className="px-8 py-5">
                                                    <p className="text-sm font-black text-slate-900">{r.tournament?.title || r.tournament?.name}</p>
                                                    <p className="text-[10px] text-blue-500 font-bold uppercase">{r.sport?.name}</p>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <p className="text-xs font-bold text-slate-700">
                                                        {r.winnerName ? `${r.winnerName} vs ${r.runnerUpName || '?'}` : (r.team1 ? `${r.team1.name} vs ${r.team2?.name || '?'}` : "N/A")}
                                                    </p>
                                                    <p className="text-[10px] text-slate-400 font-medium">{r.event?.name || `Round ${r.round || 'N/A'}`}</p>
                                                </td>
                                                <td className="px-8 py-5 text-sm font-black text-blue-600">
                                                    {r.score || (r.score1 !== undefined ? `${r.score1} - ${r.score2}` : "N/A")}
                                                </td>
                                                <td className="px-8 py-5">
                                                    <p className="text-[10px] text-slate-400 font-bold mb-1">{new Date(r.date).toLocaleDateString()}</p>
                                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${r.status === 'completed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                                        {r.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setModalData({ type: 'results', data: r, edit: true })}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-blue-100"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete('results', r._id, setResults)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-red-100"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Training Programs Management */}
                    {activeTab === "training" && (
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                                <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <Activity size={18} className="text-blue-600" /> Training Programs
                                </h3>
                                <button onClick={() => setModalData({ type: 'training-programs', data: {}, edit: false })} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                                    <Plus size={14} /> Add Program
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                            <th className="px-8 py-5">Program Name & Sport</th>
                                            <th className="px-8 py-5">Coach</th>
                                            <th className="px-8 py-5">Duration & Level</th>
                                            <th className="px-8 py-5">Schedule</th>
                                            <th className="px-8 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {trainingPrograms.map(p => (
                                            <tr key={p._id} className="hover:bg-blue-50/30 transition-all group">
                                                <td className="px-8 py-5">
                                                    <p className="text-sm font-black text-slate-900">{p.name}</p>
                                                    <p className="text-[10px] text-blue-500 font-bold uppercase">{p.sport?.name}</p>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <p className="text-xs font-bold text-slate-700">{p.coach?.user?.firstName} {p.coach?.user?.lastName}</p>
                                                    <p className="text-[10px] text-slate-400">Head Coach</p>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <p className="text-xs font-bold text-slate-600">{p.duration}</p>
                                                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase ${p.level === 'Elite' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                                                        {p.level}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <p className="text-xs font-bold text-slate-500">{p.schedule?.time}</p>
                                                    <p className="text-[10px] text-slate-400">{p.schedule?.day?.join(', ')}</p>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setModalData({ type: 'training-programs', data: p, edit: true })}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-blue-100"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete('training-programs', p._id, setTrainingPrograms)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-red-100"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Gallery Management */}
                    {activeTab === "gallery" && (
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
                                <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <ImageIcon size={18} className="text-blue-600" /> Media Gallery
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
                                {galleries.map(item => (
                                    <div key={item._id} className="group relative bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                                        <div className="aspect-video bg-slate-200 relative">
                                            {item.images?.[0] ? (
                                                <img src={item.images[0].url} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-400"><ImageIcon size={32} /></div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button onClick={() => setModalData({ type: 'gallery', data: item, edit: true })} className="p-2 bg-white rounded-lg text-blue-600"><Plus size={16} /></button>
                                                <button onClick={() => handleDelete('gallery', item._id, setGalleries)} className="p-2 bg-white rounded-lg text-red-600"><X size={16} /></button>
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="text-sm font-black text-slate-900 truncate">{item.title}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">{item.category}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Sports Management */}
                    {activeTab === "sports" && (
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/30">
                                <h3 className="font-black text-slate-800 tracking-tight flex items-center gap-2">
                                    <Activity size={18} className="text-blue-600" /> Sports Configuration
                                </h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                                            <th className="px-8 py-5">Sport</th>
                                            <th className="px-8 py-5">Category</th>
                                            <th className="px-8 py-5">Popularity</th>
                                            <th className="px-8 py-5">Players</th>
                                            <th className="px-8 py-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {sports.map(s => (
                                            <tr key={s._id} className="hover:bg-blue-50/30 transition-all group">
                                                <td className="px-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-sm ${s.color || 'bg-blue-100 text-blue-600'}`}>{s.icon || '🏆'}</div>
                                                        <span className="text-sm font-black text-slate-900">{s.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-[10px] font-black uppercase text-slate-500">{s.category}</td>
                                                <td className="px-8 py-5">
                                                    <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-lg">{s.popularity}</span>
                                                </td>
                                                <td className="px-8 py-5 text-sm font-black text-slate-900">{s.players}</td>
                                                <td className="px-8 py-5 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setModalData({ type: 'sports', data: s, edit: true })}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-blue-100"
                                                            title="Edit"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete('sports', s._id, setSports)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors shadow-sm border border-transparent hover:border-red-100"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}


                </div>
            </main>

            {/* Dynamic Management Modal */}
            <AnimatePresence>
                {modalData && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setModalData(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="text-xl font-black text-slate-900 capitalize">
                                    {modalData.edit ? 'Edit' : 'Add New'} {modalData.type}
                                </h3>
                                <button onClick={() => setModalData(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const data = Object.fromEntries(formData.entries());
                                // Handle endpoint mapping
                                let endpoint = modalData.type;
                                let setter = null;
                                if (endpoint === 'tournaments') setter = setTournaments;
                                if (endpoint === 'schedules') setter = setSchedules;
                                if (endpoint === 'results') setter = setResults;
                                if (endpoint === 'gallery') setter = setGalleries;
                                if (endpoint === 'sports') setter = setSports;
                                if (endpoint === 'clubs') setter = setClubs;
                                if (endpoint === 'training-programs') setter = setTrainingPrograms;
                                if (endpoint === 'users') {
                                    endpoint = 'admin/users';
                                    setter = setUsers;
                                }

                                handleSave(endpoint, { ...modalData.data, ...data }, setter, !!modalData.edit);
                            }} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                {modalData.type === 'users' && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">First Name</label>
                                                <input name="firstName" defaultValue={modalData.data.firstName} required placeholder="e.g. Kamal" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Last Name</label>
                                                <input name="lastName" defaultValue={modalData.data.lastName} required placeholder="e.g. Perera" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Email Address</label>
                                            <input name="email" type="email" defaultValue={modalData.data.email} required placeholder="e.g. kamal@uov.ac.lk" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Role</label>
                                            <select name="role" defaultValue={modalData.data.role || 'student'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                <option value="student">Student</option>
                                                <option value="admin">Admin</option>
                                                <option value="coach">Coach</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {modalData.type === 'tournaments' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Tournament Title</label>
                                            <input name="title" defaultValue={modalData.data.title} required placeholder="e.g. UOV Inter-Faculty Cricket / වවුනියා විශ්ව විද්‍යාලයීය ක්‍රිකට්" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Date</label>
                                            <input type="date" name="date" defaultValue={modalData.data.date?.split('T')[0]} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Status</label>
                                            <select name="status" defaultValue={modalData.data.status || 'upcoming'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                <option value="upcoming">Upcoming</option>
                                                <option value="ongoing">Ongoing</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {modalData.type === 'schedules' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Event Title</label>
                                            <input name="title" defaultValue={modalData.data.title} required placeholder="e.g. Finals - Science vs Tech / අවසන් මහා තරඟය" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Type</label>
                                                <select name="eventType" defaultValue={modalData.data.eventType || 'Match'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                    <option>Match</option>
                                                    <option>Training</option>
                                                    <option>Tournament</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Date</label>
                                                <input type="date" name="date" defaultValue={modalData.data.date?.split('T')[0]} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Sport</label>
                                                <select name="sport" defaultValue={modalData.data.sport?._id || modalData.data.sport} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                    <option value="">Select Sport</option>
                                                    {sports.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Club (Optional)</label>
                                                <select name="club" defaultValue={modalData.data.club?._id || modalData.data.club} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                    <option value="">Select Club</option>
                                                    {clubs.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Location</label>
                                            <input name="location" defaultValue={modalData.data.location} placeholder="e.g. University Ground / විශ්ව විද්‍යාල ක්‍රීඩාංගණය" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                    </>
                                )}

                                {modalData.type === 'results' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Winner Name</label>
                                            <input name="winnerName" defaultValue={modalData.data.winnerName} placeholder="e.g. Faculty of Science / විද්‍යා පීඨය" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Runner Up Name</label>
                                            <input name="runnerUpName" defaultValue={modalData.data.runnerUpName} placeholder="e.g. Faculty of Technology / තාක්ෂණ පීඨය" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Score (Text)</label>
                                            <input name="score" defaultValue={modalData.data.score} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Score Team 1 (Numeric)</label>
                                                <input type="number" name="score1" defaultValue={modalData.data.score1} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Score Team 2 (Numeric)</label>
                                                <input type="number" name="score2" defaultValue={modalData.data.score2} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Status</label>
                                            <select name="status" defaultValue={modalData.data.status || 'completed'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                <option value="pending">pending</option>
                                                <option value="completed">completed</option>
                                                <option value="disputed">disputed</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {modalData.type === 'sports' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Sport Name</label>
                                            <input name="name" defaultValue={modalData.data.name} required placeholder="e.g. Cricket / ක්‍රිකට්" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                                            <select name="category" defaultValue={modalData.data.category || 'team'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                <option value="team">Team</option>
                                                <option value="individual">Individual</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {modalData.type === 'clubs' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Club Name</label>
                                            <input name="name" defaultValue={modalData.data.name} required placeholder="e.g. UOV Elle Club / වවුනියා විශ්ව විද්‍යාලයීය එල්ලේ සංගමය" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Description</label>
                                            <textarea name="description" defaultValue={modalData.data.description} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-24" />
                                        </div>
                                    </>
                                )}

                                {modalData.type === 'training-programs' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Program Name</label>
                                            <input name="name" defaultValue={modalData.data.name} required placeholder="e.g. Beginner Swimming / පිහිනුම් පුහුණුව" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Sport</label>
                                                <select name="sport" defaultValue={modalData.data.sport?._id || modalData.data.sport} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                    <option value="">Select Sport</option>
                                                    {sports.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400">Level</label>
                                                <select name="level" defaultValue={modalData.data.level || 'Beginner'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                    <option value="Beginner">Beginner</option>
                                                    <option value="Intermediate">Intermediate</option>
                                                    <option value="Advanced">Advanced</option>
                                                    <option value="Elite">Elite</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Duration</label>
                                            <input name="duration" defaultValue={modalData.data.duration} placeholder="e.g. 12 weeks / සති 12" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Schedule Time</label>
                                            <input name="schedule.time" defaultValue={modalData.data.schedule?.time} placeholder="e.g. Mon 4PM / සඳුදා සවස 4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Description</label>
                                            <textarea name="description" defaultValue={modalData.data.description} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-24" />
                                        </div>
                                    </>
                                )}

                                {modalData.type === 'gallery' && (
                                    <>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Title</label>
                                            <input name="title" defaultValue={modalData.data.title} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                                            <select name="category" defaultValue={modalData.data.category || 'Event'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm">
                                                <option>Event</option>
                                                <option>Tournament</option>
                                                <option>Training</option>
                                                <option>Achievement</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400">Image URL</label>
                                            <input name="imageUrl" defaultValue={modalData.data.images?.[0]?.url} placeholder="https://..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" />
                                        </div>
                                    </>
                                )}

                                {modalData.type === 'audit-logs' && (
                                    <div className="space-y-4">
                                        {(!modalData.data || modalData.data.length === 0) ? (
                                            <p className="text-center text-slate-400 text-sm font-bold p-8">No logs found.</p>
                                        ) : (
                                            <div className="space-y-2">
                                                {modalData.data.map((log, i) => (
                                                    <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col gap-2">
                                                        <div className="flex justify-between items-start">
                                                            <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100">{log.action}</span>
                                                            <span className="text-[10px] text-slate-400 font-bold">{new Date(log.createdAt).toLocaleString()}</span>
                                                        </div>
                                                        <p className="text-xs font-bold text-slate-700">{log.target}</p>
                                                        <div className="flex items-center gap-2">
                                                            <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-black text-slate-500">
                                                                {(log.admin?.firstName || 'A')[0]}
                                                            </div>
                                                            <span className="text-[10px] text-slate-500 font-bold">{log.admin?.firstName} {log.admin?.lastName}</span>
                                                        </div>
                                                        {log.details && (
                                                            <pre className="text-[10px] text-slate-400 bg-white p-2 rounded-lg border border-slate-100 overflow-x-auto">
                                                                {JSON.stringify(log.details, null, 2)}
                                                            </pre>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {modalData.type !== 'audit-logs' && (
                                    <div className="pt-6 flex gap-3">
                                        <button type="button" onClick={() => setModalData(null)} className="flex-1 py-4 bg-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-200 transition-all uppercase tracking-widest text-[10px]">Cancel</button>
                                        <button type="submit" className="flex-2 py-4 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all uppercase tracking-widest text-[10px] px-12">
                                            Save Changes
                                        </button>
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E2E8F0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #CBD5E1;
                }
            `}</style>
        </div>
    );
}
