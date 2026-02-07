"use client";

import { useEffect, useState } from "react";
import { User, Mail, Shield, Calendar, MapPin, Award } from "lucide-react";

export default function ProfilePage() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const handleEdit = () => {
        setFormData({
            firstName: user.firstName || user.name?.split(' ')[0] || '',
            lastName: user.lastName || user.name?.split(' ')[1] || '',
            phone: user.phone || '',
            faculty: user.faculty || '',
            studentId: user.studentId || ''
        });
        setIsEditing(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

            const res = await fetch(`${API_URL}/api/users/${user._id || user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                const updatedUser = await res.json();
                // Merge updated fields into current user object (preserving role, etc.)
                const newUser = { ...user, ...updatedUser, name: `${updatedUser.firstName || ''} ${updatedUser.lastName || ''}`.trim() || updatedUser.username };

                setUser(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));
                setIsEditing(false);
                alert("Profile updated successfully!");
            } else {
                const err = await res.json();
                alert(err.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert("An error occurred");
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800">Please Login to View Profile</h1>
                    <a href="/login" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg">Login</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    {/* Header/Cover */}
                    <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                        <div className="absolute -bottom-16 left-10">
                            <div className="h-32 w-32 rounded-3xl bg-white p-2 shadow-2xl">
                                <div className="h-full w-full rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                                    <User size={64} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 pb-10 px-10">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <h1 className="text-4xl font-black text-gray-900 capitalize">{user.name || user.username}</h1>
                                <p className="text-lg text-blue-600 font-bold mt-1 tracking-wide uppercase">{user.role}</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleEdit}
                                    className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-200 transition-all hover:scale-105 active:scale-95"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mt-12 pt-10 border-t border-gray-100">
                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Shield className="text-blue-500" size={20} />
                                    Account Information
                                </h2>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                        <div className="p-2 bg-white rounded-lg text-gray-400 shadow-sm">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Address</p>
                                            <p className="text-gray-700 font-medium">{user.email || "Not provided"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                        <div className="p-2 bg-white rounded-lg text-gray-400 shadow-sm">
                                            <Award size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">User ID</p>
                                            <p className="text-gray-700 font-mono text-xs">{user._id || user.id || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                                        <div className="p-2 bg-white rounded-lg text-gray-400 shadow-sm">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Faculty</p>
                                            <p className="text-gray-700 font-medium">{user.faculty || "Not provided"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Calendar className="text-emerald-500" size={20} />
                                    Portal Activity
                                </h2>
                                <div className="p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-3xl">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-sm font-medium text-gray-500">Member Since</span>
                                        <span className="text-sm font-bold text-gray-900">January 2026</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-500">Primary Sport</span>
                                        <span className="text-sm font-bold text-blue-600">Athletics</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black text-slate-800">Edit Profile</h2>
                            <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition">✕</button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">First Name</label>
                                    <input
                                        value={formData.firstName}
                                        onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Last Name</label>
                                    <input
                                        value={formData.lastName}
                                        onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone</label>
                                <input
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Faculty</label>
                                <input
                                    value={formData.faculty}
                                    onChange={e => setFormData({ ...formData, faculty: e.target.value })}
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="pt-6 flex gap-3">
                                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
