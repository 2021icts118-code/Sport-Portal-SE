"use client";

import { Trophy, Target, Users, Clock, ChevronRight, Sparkles, BarChart3, Shield } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";

export default function WhyChoose() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      icon: Shield,
      title: "Verified Sports Clubs",
      description: "All sports clubs are officially registered and verified by University Sports Unit for safety and authenticity.",
      highlight: "University Approved",
      gradient: "from-blue-600 to-blue-400",
      stats: "50+ Verified Clubs",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Trophy,
      title: "Tournament Management",
      description: "Comprehensive tournament system with automated scheduling, results tracking, and leaderboards.",
      highlight: "Automated Scheduling",
      gradient: "from-emerald-600 to-emerald-400",
      stats: "100+ Tournaments",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Target,
      title: "Player Performance Tracking",
      description: "Track individual and team performance with detailed statistics and progress analytics.",
      highlight: "Real-time Stats",
      gradient: "from-amber-600 to-amber-400",
      stats: "1000+ Players Tracked",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: BarChart3,
      title: "Live Match Updates",
      description: "Get real-time scores, match statistics, and instant notifications for all university sports events.",
      highlight: "24/7 Updates",
      gradient: "from-rose-600 to-rose-400",
      stats: "Live Score Updates",
      color: "text-rose-600",
      bgColor: "bg-rose-50"
    }
  ];

  return (
    <section
      id="features-section"
      ref={sectionRef}
      className="relative bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />

      <div className="relative mx-auto max-w-7xl">
        {/* Header with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-full border border-blue-200">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">
              🏆 University of Vavuniya Official Platform
            </span>
          </div>

          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              UoV Sports Portal?
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-8">
            The official digital platform for University of Vavuniya sports management.
            Connect, compete, and achieve with our comprehensive sports ecosystem.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-700">Official University Platform</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-gray-700">Secure & Verified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-sm text-gray-700">Real-time Updates</span>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 12
                }}
                whileHover={{
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative"
              >
                {/* Card background with gradient border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500`} />

                <div className="relative h-full bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Top corner accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />

                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`relative inline-flex items-center justify-center w-16 h-16 rounded-xl ${item.bgColor} p-4 mb-4 border ${item.color.replace('text', 'border')}/20`}>
                      <Icon className={`h-8 w-8 ${item.color}`} />
                    </div>

                    {/* Highlight badge */}
                    <div className="inline-block px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full border border-gray-200">
                      {item.highlight}
                    </div>
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                    {item.title}
                    <ChevronRight className="inline-block ml-2 h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                    {item.description}
                  </p>

                  {/* Stats section */}
                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-700">
                      {item.stats}
                    </p>
                  </div>

                  {/* Hover glow effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${item.gradient} rounded-2xl blur-md opacity-0 group-hover:opacity-10 transition duration-500 -z-10`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Sports Platform Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 pt-12 border-t border-gray-200"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8★</div>
              <p className="text-sm text-gray-600">User Satisfaction</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <p className="text-sm text-gray-600">Active Clubs</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <p className="text-sm text-gray-600">Student Athletes</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <p className="text-sm text-gray-600">Uptime Reliability</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join the Sports Community?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Register now to access all features, join clubs, and participate in tournaments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
                <span>Join Sports Portal</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/clubs" className="group inline-flex items-center gap-2 px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-xl border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
                <span>Explore Clubs</span>
                <Users className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Free registration for all University of Vavuniya students
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}