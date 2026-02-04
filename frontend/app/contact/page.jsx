import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Sports Unit</h1>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Get in touch with the University of Vavuniya Sports Unit for inquiries about clubs, tournaments, or facilities.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="p-6 bg-blue-50 rounded-xl">
                            <h3 className="font-semibold text-gray-900 mb-2">Visit Us</h3>
                            <p className="text-gray-600">Physical Education Unit<br />University of Vavuniya</p>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-xl">
                            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                            <p className="text-gray-600">sports@univ.vavuniya.lk<br />director.pe@univ.vavuniya.lk</p>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-xl">
                            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                            <p className="text-gray-600">+94 24 222 2222<br />Mon-Fri, 8:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
