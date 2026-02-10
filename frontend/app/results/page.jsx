"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Medal,
  Award,
  Calendar,
  Users,
  ChevronRight,
  Filter,
  Search,
  Star,
  Loader2,
  List,
  LayoutGrid,
  X,
  Target,
  FileText
} from "lucide-react";

export default function ResultsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("cards"); // 'cards' or 'table'
  const [selectedResult, setSelectedResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${API_URL}/api/results`);
        if (!res.ok) throw new Error('Failed to fetch results');
        const data = await res.json();
        setResults(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching results:", error);
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  const filteredResults = activeFilter === "all"
    ? results
    : results.filter(result => (result.sport?.name || "").toLowerCase() === activeFilter.toLowerCase());

  const handleViewDetails = (result) => {
    setSelectedResult(result);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading results...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      {/* Header */}
      <div className="relative overflow-hidden bg-gray-900 min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop"
            alt="Cricket Stadium"
            className="h-full w-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-lg">
            Championship Results
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto font-medium drop-shadow">
            Tracking excellence across all university sports and tournaments
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {["all", "cricket", "basketball", "football", "elle", "netball", "volleyball", "badminton", "chess"].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all capitalize border-2 ${activeFilter === filter
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                  : "bg-white text-gray-600 border-transparent hover:border-blue-200"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* View Toggles */}
          <div className="flex bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-blue-100">
            <button
              onClick={() => setViewMode("cards")}
              className={`p-2.5 rounded-xl transition-all ${viewMode === "cards" ? "bg-blue-500 text-white shadow-md" : "text-gray-400 hover:text-blue-500"}`}
            >
              <LayoutGrid size={20} />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-2.5 rounded-xl transition-all ${viewMode === "table" ? "bg-blue-500 text-white shadow-md" : "text-gray-400 hover:text-blue-500"}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>

        {filteredResults.length > 0 ? (
          viewMode === "cards" ? (
            /* Card View */
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((result) => (
                <div
                  key={result._id}
                  className="group bg-white rounded-[32px] overflow-hidden border border-blue-100/50 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(59,130,246,0.1)] relative"
                >
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Trophy size={24} />
                      </div>
                      <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-100">
                        {result.status || 'Final'}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {result.tournament?.title || result.tournament?.name || "Tournament Match"}
                    </h3>

                    <div className="flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-wider mb-6">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-400" />
                        {new Date(result.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <Link
                        href={`/sports?sport=${encodeURIComponent(result.sport?.name)}`}
                        className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                      >
                        <Target size={14} className="text-blue-400" />
                        {result.sport?.name}
                      </Link>
                    </div>

                    <div className="space-y-3 mb-8">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-all">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Champions</span>
                          <span className="text-sm font-black text-slate-900">{result.winnerName || result.team1?.name || "N/A"}</span>
                        </div>
                        <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                          <Medal size={20} className="text-yellow-500" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 group-hover:border-blue-100 transition-all">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Final Score</span>
                          <span className="text-lg font-black text-blue-600">{result.score || (result.score1 !== undefined ? `${result.score1} - ${result.score2}` : "N/A")}</span>
                        </div>
                        <div className="h-10 w-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50">
                          <Star size={20} className="text-blue-400" />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(result)}
                      className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2"
                    >
                      Match Details
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Table View */
            <div className="bg-white rounded-[32px] border border-blue-100 overflow-hidden shadow-xl shadow-blue-900/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-blue-100">
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tournament & Sport</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Champion</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Runner-Up</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Final Score</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredResults.map((result) => (
                      <tr key={result._id} className="hover:bg-blue-50/30 transition-all group">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-slate-900">{result.tournament?.title || result.tournament?.name}</span>
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-0.5">
                              <Link href={`/sports?sport=${encodeURIComponent(result.sport?.name)}`} className="hover:underline">{result.sport?.name}</Link> • {new Date(result.date).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 border border-yellow-100">
                              <Trophy size={14} />
                            </div>
                            <span className="text-xs font-black text-slate-700">{result.winnerName || result.team1?.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-xs text-slate-500 font-bold">{result.runnerUpName || result.team2?.name || "N/A"}</td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg border border-blue-100">
                            {result.score || `${result.score1} - ${result.score2}`}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            onClick={() => handleViewDetails(result)}
                            className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          >
                            <ChevronRight size={20} />
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
          <div className="text-center py-20 bg-white/50 rounded-[40px] border border-dashed border-blue-200">
            <div className="h-20 w-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="text-blue-300" size={40} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">No Results Found</h3>
            <p className="text-slate-500 font-bold max-w-sm mx-auto">We couldn't find any results matching your current filter. Try selecting a different category.</p>
          </div>
        )}
      </div>

      {/* Result Details Modal */}
      {showModal && selectedResult && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[40px] max-w-2xl w-full shadow-2xl relative overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Modal Glow */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500" />

            <div className="p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Match Recap</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{new Date(selectedResult.date).toLocaleDateString()}</span>
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">{selectedResult.tournament?.title || selectedResult.tournament?.name}</h2>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-3 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all border border-slate-100"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-yellow-100 text-yellow-600 rounded-3xl flex items-center justify-center mb-4 shadow-inner">
                    <Trophy size={32} />
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Champion</span>
                  <p className="text-xl font-black text-slate-900 leading-tight">{selectedResult.winnerName || selectedResult.team1?.name}</p>
                </div>

                <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 flex flex-col items-center text-center">
                  <div className="h-16 w-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
                    <span className="text-xl font-black">{selectedResult.score || `${selectedResult.score1}-${selectedResult.score2}`}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Final Score</span>
                  <p className="text-xs font-bold text-slate-600">Verified Result</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Competition Details</h4>
                    <p className="text-sm text-slate-500 font-medium">Played in {selectedResult.location || 'University Sports Complex'} under the <Link href={`/sports?sport=${encodeURIComponent(selectedResult.sport?.name)}`} className="text-blue-600 hover:underline">{selectedResult.sport?.name}</Link> championship guidelines.</p>
                  </div>
                </div>

                {selectedResult.highlights && selectedResult.highlights.length > 0 && (
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Key Highlights</h4>
                      <div className="space-y-2">
                        {selectedResult.highlights.map((h, i) => (
                          <div key={i} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="h-2 w-2 bg-blue-500 rounded-full mt-1.5" />
                            <span className="text-xs font-bold text-slate-700">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-12 flex gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-slate-200"
                >
                  Close Recap
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}