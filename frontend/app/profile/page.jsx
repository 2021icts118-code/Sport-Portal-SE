"use client";

import { useEffect, useState } from "react";
import { User, Mail, Shield, Calendar, MapPin, Award } from "lucide-react";

export default function ProfilePage() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

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
                                <h1 className="text-4xl font-black text-gray-900 capitalize">{user.name}</h1>
                                <p className="text-lg text-blue-600 font-bold mt-1 tracking-wide uppercase">{user.role}</p>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-200 transition-all">
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
        </div>
    );
}
