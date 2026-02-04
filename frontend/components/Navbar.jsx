"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, ChevronDown, Calendar, ChevronRight, LayoutDashboard, Shield } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [mobileSportsOpen, setMobileSportsOpen] = useState(false);

  const [user, setUser] = useState(null);

  // Fix: Set isMounted once on client-side only
  useEffect(() => {
    setIsMounted(true);
    // Check for user in localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  // Fix: Handle scroll effect separately
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", handleScroll);
    // Set initial value
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Removed isMounted dependency

  /* =======================
     Sports Club Categories
     ======================= */
  const sportsByCategory = {
    "Team Sports": [
      { name: "Cricket", path: "/sports/Cricket" },
      { name: "Football", path: "/sports/Football" },
      { name: "Volleyball", path: "/sports/Volleyball" },
      { name: "Basketball", path: "/sports/Basketball" },
      { name: "Rugby", path: "/sports/Rugby" },
      { name: "Elle", path: "/sports/Elle" },
      { name: "Netball", path: "/sports/Netball" },
    ],
    "Individual Sports": [
      { name: "Athletics", path: "/sports/Athletics" },
      { name: "Badminton", path: "/sports/Badminton" },
      { name: "Table Tennis", path: "/sports/Table Tennis" },
      { name: "Chess", path: "/sports/Chess" },
      { name: "Carrom", path: "/sports/Carrom" },
      { name: "Swimming", path: "/sports/Swimming" },
    ],
    "University Teams": [
      { name: "Men's Sports Team", path: "/clubs?search=Men's" },
      { name: "Women's Sports Team", path: "/clubs?search=Women's" },
      { name: "Mixed Teams", path: "/clubs?search=Mixed" },
    ]
  };

  // Fix: Simplified header class logic
  const headerClass = `fixed top-0 z-50 w-full transition-all duration-300 ${scrolled
    ? "bg-white/95 backdrop-blur-md shadow-md"
    : "bg-white shadow-sm"
    }`;

  return (
    <header className={headerClass}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Logo - Custom Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
          onClick={() => setLogoModalOpen(true)}
        >
          <img
            src="/images/logo.png"
            alt="UoV Sports Logo"
            width={50}
            height={50}
            className="rounded-full border border-blue-500 bg-white p-1"
            style={{ width: '50px', height: '50px' }}
          />
          <div>
            <span className="text-xl font-bold text-gray-900">
              UoV<span className="text-blue-600">Sports</span>
            </span>
            <div className="text-xs text-gray-500">University of Vavuniya</div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-5">
          {/* Main Navigation Links */}
          {["Home", "Tournaments", "Clubs", "Schedule", "Results", "Gallery"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative text-sm font-medium text-gray-700 hover:text-blue-600 transition px-1.5 py-1 group"
            >
              {item}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {/* Sports Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSportsOpen(!sportsOpen)}
              onBlur={() => setTimeout(() => setSportsOpen(false), 100)}
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-gray-100"
            >
              Sports
              <ChevronDown
                size={14}
                className={`transition-transform ${sportsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {sportsOpen && (
              <div className="absolute top-full -left-20 mt-2 w-[480px] rounded-3xl bg-white shadow-2xl border border-slate-100 z-50 p-6 animate-in fade-in zoom-in-95 duration-200">
                <div className="grid grid-cols-2 gap-8">
                  {Object.entries(sportsByCategory).map(
                    ([category, sports]) => (
                      <div key={category} className={category === "University Teams" ? "col-span-2 border-t border-slate-50 pt-4" : ""}>
                        <div className="px-3 py-2 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                          {category}
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          {sports.map((sport) => (
                            <Link
                              key={sport.name}
                              href={sport.path}
                              className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50/50 rounded-xl transition-all group"
                              onClick={() => setSportsOpen(false)}
                            >
                              <span className="font-bold tracking-tight">{sport.name}</span>
                              <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {user ? (
            <>
              {/* Admin Dashboard */}
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <LayoutDashboard size={16} />
                  Admin Dashboard
                </Link>
              )}

              {/* Profile Link */}
              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold px-2 py-1 rounded-md hover:bg-blue-50"
              >
                <User size={16} /> {user.name}
              </Link>
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <Link
                href="/login"
                className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-blue-600 px-2 py-1 rounded-md hover:bg-gray-100"
              >
                <User size={16} /> Login
              </Link>

              {/* Sign Up (Student Registration) */}
              <Link
                href="/signup"
                className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </>
          )}

        </nav>

        {/* Mobile Buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            className="p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {/* Mobile Navigation Links */}
            {["Home", "Tournaments", "Clubs", "Schedule", "Results", "Gallery"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 rounded-md hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}

            {/* Mobile Sports Dropdown */}
            <div className="py-1">
              <button
                onClick={() => setMobileSportsOpen(!mobileSportsOpen)}
                className="flex items-center justify-between w-full text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 rounded-md hover:bg-gray-50"
              >
                <span>Sports</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${mobileSportsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileSportsOpen && (
                <div className="mt-2 ml-4 max-h-64 overflow-y-auto border-l-2 border-gray-100 pl-4">
                  {Object.entries(sportsByCategory).map(
                    ([category, sports]) => (
                      <div key={category} className="mb-4">
                        <div className="px-2 py-1 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 mb-2">
                          <div className="w-1 h-1 bg-blue-600 rounded-full" />
                          {category}
                        </div>
                        {sports.map((sport) => (
                          <Link
                            key={sport.name}
                            href={sport.path}
                            className="flex items-center justify-between px-3 py-2 text-sm text-slate-600 font-bold hover:text-blue-600 transition"
                            onClick={() => {
                              setIsOpen(false);
                              setMobileSportsOpen(false);
                            }}
                          >
                            {sport.name}
                            <ChevronRight size={14} className="text-slate-300" />
                          </Link>
                        ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 space-y-3 border-t mt-3">
              {user ? (
                <>
                  {/* Admin Dashboard */}
                  {user.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-3 text-base font-bold text-blue-600 bg-blue-50 py-3 px-4 rounded-xl transition-all border border-blue-100 shadow-sm mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <LayoutDashboard size={20} /> Admin Dashboard
                    </Link>
                  )}

                  <Link
                    href="/profile"
                    className="flex items-center gap-3 text-base font-medium text-blue-600 py-3 px-2 rounded-md hover:bg-blue-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} /> {user.name}
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left flex items-center gap-3 text-base font-medium text-red-600 py-3 px-2 rounded-md hover:bg-red-50"
                  >
                    <X size={18} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-blue-600 py-3 px-2 rounded-md hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    <User size={18} /> Login
                  </Link>

                  <Link
                    href="/signup"
                    className="block rounded-full bg-blue-500 px-4 py-3 text-center font-semibold text-white hover:bg-blue-600 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Logo Modal */}
      {logoModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setLogoModalOpen(false)}
        >
          <div className="max-w-[80vw] max-h-[80vh] p-8 bg-white rounded-2xl shadow-2xl">
            <div className="w-64 h-64 rounded-full border-8 border-blue-500 bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
              <span className="text-5xl font-bold text-blue-600">UoV Sports</span>
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900">UoV Sports Portal</h2>
              <p className="text-gray-600 mt-2">University of Vavuniya</p>
              <p className="text-sm text-gray-500 mt-1">Sports Club Networking & Management System</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}