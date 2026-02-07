import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Award } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">

          {/* University Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">

              <img
                src="/images/logo.png"
                alt="UoV Sports Logo"
                width={50}
                height={50}
                className="rounded-full border border-blue-500 bg-white p-1"
                style={{ width: '50px', height: '50px' }}
              />

              <div>
                <h3 className="text-2xl font-bold text-white">
                  UoV Sports Portal
                </h3>
                <p className="text-sm text-blue-300 font-medium">
                  University of Vavuniya
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Official digital platform for University of Vavuniya sports management.
              Connect, compete, and achieve with our comprehensive sports ecosystem.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 pt-4">
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-blue-600 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-blue-500 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-pink-600 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-red-600 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-6 font-bold text-white text-lg flex items-center gap-2">
              <span className="h-1 w-6 bg-blue-500 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/clubs"
                  className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 group-hover:scale-125 transition-transform"></span>
                  Sports Clubs
                </Link>
              </li>
              <li>
                <Link
                  href="/tournaments"
                  className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 group-hover:scale-125 transition-transform"></span>
                  Tournaments
                </Link>
              </li>
              <li>
                <Link
                  href="/schedule"
                  className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 group-hover:scale-125 transition-transform"></span>
                  Match Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500 group-hover:scale-125 transition-transform"></span>
                  Live Results
                </Link>
              </li>
              <li>
                <Link
                  href="/results"
                  className="flex items-center gap-2 text-sm hover:text-blue-300 transition-colors group"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-purple-500 group-hover:scale-125 transition-transform"></span>
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* University Info */}
          <div>
            <h4 className="mb-6 font-bold text-white text-lg flex items-center gap-2">
              <span className="h-1 w-6 bg-emerald-500 rounded-full"></span>
              University Info
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <Award className="h-4 w-4 text-emerald-400" />
                  About UoV Sports
                </Link>
              </li>
              <li>
                <Link
                  href="/sports/Athletics"
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <span className="h-4 w-4 flex items-center justify-center">🏃‍♂️</span>
                  Sports Unit
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <span className="h-4 w-4 flex items-center justify-center">👨‍🏫</span>
                  Coaches & Staff
                </Link>
              </li>
              <li>
                <Link
                  href="/sports/Athletics"
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <span className="h-4 w-4 flex items-center justify-center">🏆</span>
                  Achievements
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="flex items-center gap-2 hover:text-emerald-300 transition-colors"
                >
                  <span className="h-4 w-4 flex items-center justify-center">📸</span>
                  Photo Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="mb-6 font-bold text-white text-lg flex items-center gap-2">
              <span className="h-1 w-6 bg-amber-500 rounded-full"></span>
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-800">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Email</p>
                  <p className="text-sm text-gray-400">sports@uov.ac.lk</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-800">
                  <Phone className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Phone</p>
                  <p className="text-sm text-gray-400">+94 24 222 2265</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gray-800">
                  <MapPin className="h-4 w-4 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium text-white text-sm">Address</p>
                  <p className="text-sm text-gray-400">
                    University of Vavuniya<br />
                    Sports Complex<br />
                    Vavuniya, Sri Lanka
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="mt-4 pt-4 border-t border-gray-800">
                <p className="text-sm font-medium text-white">Office Hours</p>
                <p className="text-sm text-gray-400">Mon-Fri: 8:30 AM - 4:30 PM</p>
                <p className="text-sm text-gray-400">Weekends: By Appointment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* University Badge */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-900/50 to-emerald-900/50 border border-blue-800/30">
                <span className="text-xl">🏛️</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">University of Vavuniya</p>
                <p className="text-xs text-gray-500">Official Sports Portal</p>
              </div>
            </div>

            {/* Quick Policies */}
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-blue-300 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-blue-300 transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="hover:text-blue-300 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} University of Vavuniya Sports Portal.
            <span className="mx-2">•</span>
            All rights reserved.
          </p>
          <p className="mt-2 text-xs text-gray-600">
            This is an official platform of University of Vavuniya for sports management and student engagement.
          </p>
        </div>
      </div>
    </footer >
  );
}