"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import {
  ChevronDown,
  Trophy,
  Users,
  Calendar,
  Target,
  Sparkles,
  TrendingUp,

  Home,
  CalendarDays,
  PlayCircle,
  Award
} from "lucide-react";

export default function Hero() {
  const controls = useAnimation();
  const statsControls = useAnimation();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("clubs");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true, amount: 0.5 });

  // ✅ Ensure client-only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  // Main animation sequence
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0 });

      // Subtle breathing animation
      await controls.start({
        scale: [1, 1.005, 1],
        transition: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        },
      });
    };
    sequence();
  }, [controls]);

  // Stats animation when in view
  useEffect(() => {
    if (isStatsInView) {
      statsControls.start({
        scale: 1,
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1
        }
      });
    }
  }, [isStatsInView, statsControls]);

  const scrollToContent = () => {
    const contentSection = document.getElementById("features-section");
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };



  // Sports statistics data
  const stats = [
    {
      icon: <Users className="h-7 w-7" />,
      value: "50+",
      label: "Active Sports Clubs",
      description: "University recognized clubs",
      color: "text-blue-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      delay: 0.1,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Trophy className="h-7 w-7" />,
      value: "100+",
      label: "Annual Tournaments",
      description: "Competitive events",
      color: "text-amber-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
      delay: 0.2,
      gradient: "from-amber-500 to-amber-600"
    },
    {
      icon: <Calendar className="h-7 w-7" />,
      value: "24/7",
      label: "Live Updates",
      description: "Real-time notifications",
      color: "text-emerald-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      borderColor: "border-emerald-200",
      delay: 0.3,
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Target className="h-7 w-7" />,
      value: "1000+",
      label: "Student Athletes",
      description: "Registered players",
      color: "text-rose-500",
      bgColor: "bg-gradient-to-br from-rose-50 to-rose-100",
      borderColor: "border-rose-200",
      delay: 0.4,
      gradient: "from-rose-500 to-rose-600"
    },
  ];

  // Quick features for tabs
  const features = {
    clubs: {
      title: "Sports Clubs",
      items: ["Cricket Club", "Football Team", "Basketball Squad", "Athletics", "Volleyball", "Badminton", "Table Tennis", "Elle Club", "Netball Club", "Carrom Club", "Chess Club", "Rugby Club"],
      icon: <Users className="h-5 w-5" />,
      color: "bg-blue-100",
      textColor: "text-blue-700",
      borderColor: "border-blue-200"
    },
    tournaments: {
      title: "Tournaments",
      items: ["Inter-Faculty Cup", "Annual Sports Meet", "Champions League", "Friendly Matches", "University Games", "Championship Series"],
      icon: <Trophy className="h-5 w-5" />,
      color: "bg-amber-100",
      textColor: "text-amber-700",
      borderColor: "border-amber-200"
    },
    schedule: {
      title: "Live Schedule",
      items: ["Daily Matches", "Weekend Events", "Training Sessions", "Upcoming Tryouts", "Tournament Finals", "Practice Matches"],
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-emerald-100",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200"
    }
  };



  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Enhanced Background with Sports Image and Gradient Overlay */}
      <div className="absolute inset-0">
        {/* Main sports background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2830&q=80')"
          }}
        />

        {/* Gradient overlay with multiple layers for better readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-blue-900/60 to-cyan-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/50 to-transparent" />

        {/* Animated gradient mesh for depth */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tr from-cyan-600/30 to-blue-600/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        </div>

        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-tr from-cyan-500/20 to-emerald-500/20 rounded-full blur-2xl" />
        </div>

        {/* Dynamic particles effect */}
        {mounted && (
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </div>



      {/* Main Content Area */}
      <div className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={controls}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-7xl w-full text-center"
        >
          {/* University Badge - Professional Design */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-3 mb-10 px-6 py-3 rounded-2xl bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-xl"
          >
            <div className="relative">
              <Award className="h-6 w-6 text-transparent bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text" />
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-amber-400 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                🏆 University of Vavuniya Official Portal
              </p>
              <p className="text-xs text-gray-400">Sports Management System</p>
            </div>
          </motion.div>

          {/* Main Title Section */}
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block text-white">
                UoV Sports Portal
              </span>
              <motion.span
                className="block text-2xl sm:text-3xl md:text-4xl font-semibold mt-4"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  backgroundSize: "300% 300%",
                  backgroundImage: "linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4, #10b981, #f59e0b, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Connect • Compete • Achieve
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-gray-200 sm:text-xl leading-relaxed"
            >
              The official digital platform for University of Vavuniya sports activities.
              Join clubs, register for tournaments, track live results, and stay updated with real-time sports news.
            </motion.p>

            {/* Video Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              onClick={() => setVideoModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 cursor-pointer hover:bg-white/20 transition-all hover:shadow-lg"
            >
              <PlayCircle className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-white">
                Watch University Sports Intro
              </span>
            </motion.div>
          </div>

          {/* Interactive Feature Tabs - Modern Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-16 max-w-3xl mx-auto"
          >
            <div className="flex justify-center gap-3 mb-8">
              {Object.keys(features).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-3.5 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${activeTab === key
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-900/30'
                    : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-white/20 border border-white/20 hover:border-blue-400/50 shadow-sm'
                    }`}
                >
                  <div className={`p-2 rounded-lg ${activeTab === key ? 'bg-white/20' : features[key].color}`}>
                    {features[key].icon}
                  </div>
                  {features[key].title}
                </button>
              ))}
            </div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-7 border border-gray-700/50 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-xl ${features[activeTab].color} border ${features[activeTab].borderColor}`}>
                  <div className={features[activeTab].textColor}>
                    {features[activeTab].icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{features[activeTab].title}</h3>
                  <p className="text-sm text-gray-400">Explore university {features[activeTab].title.toLowerCase()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {features[activeTab].items.map((item, idx) => {
                  const sportName = item.replace(" Club", "").replace(" Team", "").replace(" Squad", "");
                  const href = activeTab === 'clubs' ? `/clubs?search=${encodeURIComponent(sportName)}` : (activeTab === 'tournaments' ? '/tournaments' : '/schedule');

                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.03 }}
                      className={`cursor-pointer overflow-hidden`}
                    >
                      <Link
                        href={href}
                        className={`block px-4 py-3 rounded-lg ${features[activeTab].color} border ${features[activeTab].borderColor} ${features[activeTab].textColor} text-sm font-medium hover:shadow-md transition-all h-full`}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Statistics Grid - Clean Cards */}
          <div ref={statsRef} className="mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={statsControls}
              className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={isStatsInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: stat.delay, type: "spring" }}
                  whileHover={{
                    scale: 1.05,
                    y: -8,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="relative group"
                >
                  <div className={`rounded-2xl p-6 ${stat.bgColor} border ${stat.borderColor} hover:shadow-2xl transition-all duration-300 h-full shadow-lg backdrop-blur-sm`}>
                    <div className="flex flex-col items-center text-center">
                      <div className={`p-4 rounded-2xl mb-5 bg-gradient-to-br ${stat.gradient} shadow-md`}>
                        <div className="text-white">
                          {stat.icon}
                        </div>
                      </div>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isStatsInView ? { scale: 1 } : {}}
                        transition={{ delay: stat.delay + 0.2, type: "spring" }}
                        className="text-3xl font-bold text-gray-900 mb-2"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-gray-800 font-semibold mb-2 text-lg">{stat.label}</div>
                      <div className="text-gray-600 text-sm">{stat.description}</div>
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* CTA Buttons - Professional Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/clubs"
                className="group relative inline-flex items-center gap-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-10 py-5 text-base font-semibold text-white shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Explore Sports Clubs</span>
                <TrendingUp className="h-6 w-6 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/signup"
                className="group relative inline-flex items-center gap-4 rounded-2xl border-2 border-white/30 bg-white/10 backdrop-blur-sm px-10 py-5 text-base font-semibold text-white hover:bg-white/20 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              >
                <Users className="h-6 w-6" />
                <span>Register Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Clean Design */}
        <motion.button
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 group"
          aria-label="Scroll to explore"
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            y: [0, 10, 0]
          }}
          transition={{
            delay: 1.5,
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          whileHover={{ scale: 1.2 }}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-sm text-gray-300 font-medium group-hover:text-white transition">
              Discover More Features
            </div>
            <div className="relative">
              <ChevronDown className="h-8 w-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <div className="absolute inset-0 animate-ping opacity-30">
                <ChevronDown className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </div>
        </motion.button>
      </div>



      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none" />

      {/* Video Modal */}
      {videoModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setVideoModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl w-full mx-4 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">University Sports Introduction</h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video Content */}
            <div className="relative bg-black">
              <div className="aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                  <h4 className="text-lg font-semibold mb-2">Video Coming Soon</h4>
                  <p className="text-gray-400 max-w-md">
                    We're working on an exciting introduction video for University of Vavuniya Sports.
                    Check back soon for updates!
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={() => setVideoModalOpen(false)}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}