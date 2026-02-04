import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Calendar, Users, Trophy } from "lucide-react";

export default function TrainingPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Training Programs</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Professional coaching and skill development sessions for university athletes.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                            <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Team Practice</h3>
                        <p className="text-gray-600 mb-6">
                            Regular training sessions for university teams including Cricket, Football, and Rugby.
                        </p>
                        <span className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold">
                            Daily Sessions
                        </span>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                            <Calendar className="w-6 h-6 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Fitness Camps</h3>
                        <p className="text-gray-600 mb-6">
                            Intensive fitness and conditioning programs designed for athlete development.
                        </p>
                        <span className="inline-block px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-semibold">
                            Weekly Schedule
                        </span>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                            <Trophy className="w-6 h-6 text-amber-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Skill Workshops</h3>
                        <p className="text-gray-600 mb-6">
                            Specialized workshops with professional coaches and guest trainers.
                        </p>
                        <span className="inline-block px-4 py-2 bg-amber-50 text-amber-700 rounded-lg text-sm font-semibold">
                            Monthly Events
                        </span>
                    </div>
                </div>

                <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
                    <h2 className="text-2xl font-bold mb-4">Join a Training Program</h2>
                    <p className="mb-8 max-w-xl mx-auto text-blue-100">
                        Contact the Physical Education Unit to register for upcoming training sessions.
                    </p>
                    <a href="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                        Contact Us
                    </a>
                </div>
            </div>
            <Footer />
        </main>
    );
}
