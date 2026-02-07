"use client";

import { useState, useRef, useEffect } from "react";
import {
  Trophy,
  Users,
  Calendar,
  Target,
  ArrowRight,
  Star,
  Clock,
  Sparkles,
  BarChart3,
  Shield,
  TrendingUp,
  Award,
  Loader2
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

// Icon mapping helper
const getIcon = (iconName) => {
  const icons = {
    Trophy,
    Users,
    Calendar,
    Target,
    BarChart3,
    Shield,
    TrendingUp,
    Star,
    Clock,
    Award
  };
  return icons[iconName] || Trophy; // Default fallback
};

export default function ExploreCategory() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const [categoriesRes, statsRes] = await Promise.all([
          fetch(`${API_URL}/api/categories?t=${new Date().getTime()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
            cache: 'no-store'
          }),
          fetch(`${API_URL}/api/stats?t=${new Date().getTime()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' },
            cache: 'no-store'
          })
        ]);

        if (!categoriesRes.ok || !statsRes.ok) {
          console.warn('API not available, using fallback data');
          throw new Error('Failed to fetch data');
        }

        const categoriesData = await categoriesRes.json();
        const statsData = await statsRes.json();

        setCategories(categoriesData);
        setStats(statsData);
        setLoading(false);
      } catch (err) {
        console.warn("API not available, using fallback data. Error:", err.message);
        // Fallback data when API is not available
        setCategories([
          {
            icon: "Trophy",
            title: "Sports Clubs",
            description: "Join officially registered university sports clubs and teams.",
            link: "/clubs",
            gradient: "from-blue-600 to-blue-400",
            stats: "50+ Clubs",
            rating: 4.8,
            tags: ["Cricket", "Football", "Basketball", "Volleyball"],
            color: "bg-blue-500",
            highlight: "Official Registration"
          },
          {
            icon: "Calendar",
            title: "Tournaments",
            description: "Participate in inter-faculty and university-level tournaments.",
            link: "/tournaments",
            gradient: "from-emerald-600 to-emerald-400",
            stats: "100+ Events",
            rating: 4.9,
            tags: ["Annual Meet", "League", "Cup", "Championship"],
            color: "bg-emerald-500",
            highlight: "Live Updates"
          },
          {
            icon: "Target",
            title: "Training Programs",
            description: "Access professional coaching and skill development sessions.",
            link: "/training",
            gradient: "from-amber-600 to-amber-400",
            stats: "Weekly Sessions",
            rating: 4.7,
            tags: ["Coaching", "Fitness", "Skill Drills", "Workshops"],
            color: "bg-amber-500",
            highlight: "Expert Coaches"
          },
          {
            icon: "BarChart3",
            title: "Player Analytics",
            description: "Track performance statistics and progress analytics.",
            link: "/analytics",
            gradient: "from-rose-600 to-rose-400",
            stats: "1000+ Players",
            rating: 4.8,
            tags: ["Stats", "Progress", "Rankings", "Achievements"],
            color: "bg-rose-500",
            highlight: "Real-time Tracking"
          }
        ]);
        setStats([
          { icon: "Users", value: "50+", label: "Active Clubs" },
          { icon: "Star", value: "4.8★", label: "Avg Rating" },
          { icon: "Clock", value: "24/7", label: "Portal Access" },
          { icon: "TrendingUp", value: "1000+", label: "Athletes" }
        ]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-50 rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(180deg,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <span className="ml-2 text-gray-600">Loading contents...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded text-blue-600">Retry</button>
          </div>
        ) : (
          <>
            {/* Header Section */}
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full border border-blue-200 shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium text-blue-700">
                  🏆 University Sports Portal
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl"
              >
                Explore Our{" "}
                <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                  Sports Ecosystem
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mx-auto max-w-2xl text-lg text-gray-600 mb-10"
              >
                Discover all the features and opportunities available through the University of Vavuniya Sports Portal.
              </motion.p>

              {/* Sports Statistics */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="inline-flex flex-wrap justify-center gap-6 px-8 py-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg"
              >
                {stats.map((stat, i) => {
                  const Icon = getIcon(stat.icon);
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-2.5 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border border-gray-100">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Category Cards Grid */}
            <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat, i) => {
                const Icon = getIcon(cat.icon);
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    whileHover={{ y: -8 }}
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="group relative"
                  >
                    {/* Gradient border effect */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${cat.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500`} />

                    <div className="relative h-full bg-white rounded-2xl border border-gray-200 p-6 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Top accent bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 ${cat.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />

                      {/* Icon section */}
                      <div className="relative mb-6">
                        <div className={`w-16 h-16 rounded-xl ${cat.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="h-8 w-8 text-white" />
                        </div>

                        {/* Highlight badge */}
                        <div className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full border border-gray-200">
                          {cat.highlight}
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                        {cat.title}
                      </h3>

                      <p className="text-gray-600 mb-5 text-sm leading-relaxed">
                        {cat.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        {cat.tags.map((t, idx) => (
                          <Link
                            key={idx}
                            href={`/sports/${encodeURIComponent(t)}`}
                            className="px-3 py-1 text-xs bg-gray-50 text-gray-700 rounded-lg border border-gray-200 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-colors"
                          >
                            {t}
                          </Link>
                        ))}
                      </div>

                      {/* Stats and Rating */}
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                          <span className="font-medium">{cat.rating}</span>
                        </div>
                        <div className="font-medium">{cat.stats}</div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        href={cat.link}
                        className={`group/btn flex items-center justify-between px-5 py-3.5 rounded-xl bg-gradient-to-r ${cat.gradient} text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300`}
                      >
                        <span>Explore Now</span>
                        <ArrowRight className="h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      {/* Hover glow effect */}
                      <div className={`absolute -inset-1 bg-gradient-to-r ${cat.gradient} rounded-2xl blur-md opacity-0 group-hover:opacity-10 transition duration-500 -z-10`} />
                    </div>
                  </motion.div>
                )
              }
              )}
            </div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.6 }}
              className="mt-20 text-center"
            >
              <div className="relative bg-gradient-to-r from-blue-50 via-white to-emerald-50 rounded-2xl p-8 border border-blue-200 shadow-lg overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-400 rounded-full translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-semibold text-blue-700">
                      Official University Platform
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Ready to Join the Sports Community?
                  </h3>

                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Register now to access all features, join clubs, participate in tournaments, and track your sports journey.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/signup"
                      className="group inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <span>Register Now</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                      href="/contact"
                      className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                      <span>Contact Sports Unit</span>
                      <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </Link>
                  </div>

                  <p className="mt-4 text-sm text-gray-500">
                    Free for all University of Vavuniya students and staff
                  </p>
                </div>
              </div>
            </motion.div>

          </>
        )}
      </div>
    </section>
  );
}