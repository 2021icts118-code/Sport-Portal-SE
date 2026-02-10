"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Trophy,
  ChevronRight,
  Filter,
  Search,
  X,
  Bell,
  Loader2,
  List,
  LayoutGrid,
  Info
} from "lucide-react";

export default function SchedulePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${API_URL}/api/schedules`);
        if (!res.ok) throw new Error('Failed to fetch schedules');
        const data = await res.json();
        setEvents(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching schedules:", error);
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = activeFilter === "all"
    ? events
    : events.filter(event => (event.sport?.name || "").toLowerCase() === activeFilter.toLowerCase());

  const todaysEvents = events.filter(event =>
    new Date(event.date).toISOString().split('T')[0] === selectedDate
  );

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const getEventTypeStyle = (type) => {
    switch (type?.toLowerCase()) {
      case 'match':
        return "bg-red-50 text-red-600 border-red-100";
      case 'tournament':
      case 'competition':
        return "bg-amber-50 text-amber-600 border-amber-100";
      case 'training':
      case 'practice':
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      default:
        return "bg-blue-50 text-blue-600 border-blue-100";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading schedules...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Premium Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-blue-600 font-black text-xs uppercase tracking-[0.3em] mb-4">
                <Calendar size={16} />
                <span>University Sports Calendar</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Event <span className="text-blue-600">Schedule</span>
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed">
                Stay synchronized with all training sessions, competitive matches, and inter-faculty tournaments across campus.
              </p>
            </div>

            {/* Quick Date Snapshot */}
            <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex items-center gap-6">
              <div className="text-center bg-white h-16 w-16 rounded-2xl flex flex-col justify-center border border-slate-200 shadow-sm">
                <span className="text-[10px] font-black text-blue-600 uppercase">{new Date().toLocaleDateString(undefined, { month: 'short' })}</span>
                <span className="text-2xl font-black text-slate-900">{new Date().getDate()}</span>
              </div>
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Active Today</p>
                <p className="text-lg font-black text-slate-900">{events.filter(e => new Date(e.date).toDateString() === new Date().toDateString()).length} Scheduled Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Controls Panel */}
        <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm mb-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* View Switching */}
            <div className="flex items-center gap-6 order-2 lg:order-1">
              <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                <button
                  onClick={() => setViewMode("cards")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "cards" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <LayoutGrid size={14} /> Cards
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${viewMode === "table" ? "bg-white text-blue-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                >
                  <List size={14} /> Table
                </button>
              </div>

              <div className="h-8 w-[1px] bg-slate-200" />

              <div className="flex flex-wrap gap-2">
                {["all", "cricket", "basketball", "football", "badminton", "chess"].map(filter => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeFilter === filter
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Filtering */}
            <div className="flex items-center gap-4 w-full lg:w-auto order-1 lg:order-2">
              <div className="relative flex-1 lg:w-48">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-slate-50 text-slate-900 text-xs font-black uppercase px-5 py-3 rounded-2xl border border-slate-200 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all appearance-none"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Display */}
        {filteredEvents.length > 0 ? (
          viewMode === "cards" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div
                  key={event._id}
                  className="group bg-white rounded-[40px] p-8 border border-slate-200 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(59,130,246,0.15)] flex flex-col"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex flex-col gap-2">
                      <div className={`w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getEventTypeStyle(event.eventType)}`}>
                        {event.eventType}
                      </div>
                      <Link
                        href={`/sports?sport=${encodeURIComponent(event.sport?.name)}`}
                        className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                      >
                        {event.sport?.name}
                      </Link>
                    </div>
                    <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                      <Trophy size={18} />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 mb-6 group-hover:text-blue-600 transition-colors leading-tight">
                    {event.title}
                  </h3>

                  <div className="space-y-4 mb-8 flex-1">
                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all">
                      <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                        <Clock size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time & Date</p>
                        <p className="text-sm font-black text-slate-900">{event.startTime} • {new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all">
                      <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Venue</p>
                        <p className="text-sm font-black text-slate-900 truncate max-w-[180px]">{event.location}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewDetails(event)}
                    className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-200"
                  >
                    View Details
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[40px] border border-slate-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-200">
                      <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Scheduled Event</th>
                      <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                      <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Venue</th>
                      <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timing</th>
                      <th className="px-10 py-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEvents.map((event) => (
                      <tr key={event._id} className="hover:bg-blue-50/30 transition-all group">
                        <td className="px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900">{event.title}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {event._id.slice(-6)}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                              <Trophy size={14} />
                            </div>
                            <Link
                              href={`/sports?sport=${encodeURIComponent(event.sport?.name)}`}
                              className="text-xs font-black text-slate-700 uppercase tracking-tighter hover:text-blue-600"
                            >
                              {event.sport?.name}
                            </Link>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <MapPin size={14} className="text-slate-300" />
                            {event.location}
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-xs font-black text-slate-700">{event.startTime}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <button
                            onClick={() => handleViewDetails(event)}
                            className="bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white p-3 rounded-xl transition-all"
                          >
                            <Info size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-24 bg-white rounded-[40px] border border-dashed border-slate-300">
            <div className="h-24 w-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="text-slate-300" size={48} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No Scheduled Events</h3>
            <p className="text-slate-500 font-bold max-w-sm mx-auto">There are no events found for the selected criteria. Try adjusting your filters or date selection.</p>
          </div>
        )}
      </div>

      {/* Modern Event Details Modal */}
      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600" />

            <div className="p-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className={`px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest border ${getEventTypeStyle(selectedEvent.eventType)}`}>
                    {selectedEvent.eventType}
                  </div>
                  <Link
                    href={`/sports?sport=${encodeURIComponent(selectedEvent.sport?.name)}`}
                    className="px-4 py-1.5 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-blue-100 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    {selectedEvent.sport?.name}
                  </Link>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-900 rounded-2xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight mb-8">
                {selectedEvent.title}
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Meeting Time</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                      <Clock size={20} />
                    </div>
                    <span className="text-sm font-black text-slate-900">{selectedEvent.startTime} {selectedEvent.endTime ? `- ${selectedEvent.endTime}` : ''}</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Event Date</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                      <Calendar size={20} />
                    </div>
                    <span className="text-sm font-black text-slate-900">{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="col-span-2 bg-slate-50 p-6 rounded-[32px] border border-slate-100">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Location & Participating Club</p>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                        <MapPin size={20} />
                      </div>
                      <span className="text-sm font-black text-slate-900">{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                        <Users size={20} />
                      </div>
                      <span className="text-sm font-black text-slate-900">{selectedEvent.club?.name || 'Open to All Athletes'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Event Description</p>
                <div className="bg-blue-50/50 p-8 rounded-[32px] border border-blue-100/50">
                  <p className="text-slate-700 font-medium leading-relaxed italic">
                    "{selectedEvent.description || "This event is part of the regular university sports program. Attendees are expected to arrive 15 minutes prior to the start time."}"
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-200"
                >
                  Set Schedule Alert
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-10 py-5 bg-white hover:bg-slate-50 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all border border-slate-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}