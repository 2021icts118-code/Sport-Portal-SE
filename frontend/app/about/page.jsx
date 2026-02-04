"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  CheckCircle, 
  Globe, 
  Users, 
  Shield, 
  Star, 
  MapPin,
  Award,
  Heart,
  Clock,
  ChevronRight,
  Sparkles,
  TrendingUp,
  ThumbsUp,
  Navigation,
  Mail,
  Phone,
  Map,
  MessageSquare,
  Send,
  X,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Copy,
  Check,
  Leaf,
  Mountain,
  Compass,
  Trophy,
  Globe2,
  Map as MapIcon,
  PhoneCall
} from "lucide-react";

export default function AboutPage() {
  const [activeStat, setActiveStat] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  
  const modalRef = useRef(null);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setContactModalOpen(false);
      }
    };

    if (contactModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [contactModalOpen]);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } else {
      setPhoneCopied(true);
      setTimeout(() => setPhoneCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitting(false);
    setSubmitSuccess(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Content arrays with enhanced data
  const features = [
    { 
      icon: <Users className="w-8 h-8" />, 
      title: "Local Experts", 
      description: "Connect with certified local guides who know hidden gems",
      gradient: "from-emerald-500 to-green-600",
      bg: "bg-gradient-to-br from-emerald-50 to-green-50"
    },
    { 
      icon: <Shield className="w-8 h-8" />, 
      title: "Verified & Safe", 
      description: "All guides and drivers are thoroughly vetted",
      gradient: "from-green-500 to-emerald-600",
      bg: "bg-gradient-to-br from-green-50 to-emerald-50"
    },
    { 
      icon: <Globe2 className="w-8 h-8" />, 
      title: "Island Coverage", 
      description: "Service available across all 9 provinces of Sri Lanka",
      gradient: "from-teal-500 to-emerald-600",
      bg: "bg-gradient-to-br from-teal-50 to-emerald-50"
    },
    { 
      icon: <Trophy className="w-8 h-8" />, 
      title: "5-Star Service", 
      description: "Rated excellent by thousands of travelers",
      gradient: "from-lime-500 to-green-600",
      bg: "bg-gradient-to-br from-lime-50 to-green-50"
    }
  ];

  const team = [
    { 
      name: "Kasun Perera", 
      role: "Founder & CEO", 
      bio: "Tourism industry veteran with 15+ years experience", 
      image: "/images/team/kasun.jpg",
      gradient: "from-emerald-500 to-green-600"
    },
    { 
      name: "Nimali Fernando", 
      role: "Head of Operations", 
      bio: "Former hotel manager turned tourism entrepreneur", 
      image: "/images/team/nimali.jpg",
      gradient: "from-green-500 to-teal-600"
    },
    { 
      name: "Chamara Silva", 
      role: "Guide Relations", 
      bio: "Connects travelers with the best local experts", 
      image: "/images/team/chamara.jpg",
      gradient: "from-teal-500 to-emerald-600"
    }
  ];

  const stats = [
    { value: "500+", label: "Certified Guides", icon: <Users className="w-6 h-6" />, color: "text-emerald-500", bg: "bg-emerald-50" },
    { value: "10,000+", label: "Happy Travelers", icon: <ThumbsUp className="w-6 h-6" />, color: "text-green-500", bg: "bg-green-50" },
    { value: "25+", label: "Destinations", icon: <MapPin className="w-6 h-6" />, color: "text-teal-500", bg: "bg-teal-50" },
    { value: "4.9", label: "Average Rating", icon: <Star className="w-6 h-6" />, color: "text-lime-500", bg: "bg-lime-50" }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email",
      details: ["info@serendibguide.com", "support@serendibguide.com"],
      action: "Send us an email",
      copyText: "info@serendibguide.com",
      gradient: "from-emerald-500 to-green-600"
    },
    {
      icon: <PhoneCall className="w-8 h-8" />,
      title: "Phone",
      details: ["+94 11 234 5678", "+94 76 789 1234 (24/7)"],
      action: "Call us anytime",
      copyText: "+94112345678",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: <MapIcon className="w-8 h-8" />,
      title: "Office",
      details: ["123 Galle Road, Colombo 03", "Sri Lanka"],
      action: "Visit our office",
      copyText: "123 Galle Road, Colombo 03, Sri Lanka",
      gradient: "from-teal-500 to-emerald-600"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM", icon: "🌅" },
    { day: "Saturday", time: "10:00 AM - 4:00 PM", icon: "🌞" },
    { day: "Sunday", time: "Emergency support only", icon: "🌙" }
  ];

  const coreValues = [
    { name: "Authenticity", icon: "✨", description: "Genuine local experiences" },
    { name: "Sustainability", icon: "🌱", description: "Eco-friendly tourism" },
    { name: "Community", icon: "🤝", description: "Supporting local livelihoods" },
    { name: "Excellence", icon: "🏆", description: "Premium service quality" },
    { name: "Safety", icon: "🛡️", description: "Your security is our priority" },
    { name: "Innovation", icon: "💡", description: "Modern travel solutions" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 via-white to-green-50/20">
      {/* Enhanced Contact Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Animated Backdrop */}
            <div className="fixed inset-0 bg-gradient-to-br from-emerald-900/90 to-teal-900/90 backdrop-blur-md transition-opacity animate-fadeIn" />
            
            {/* Enhanced Modal Content */}
            <div 
              ref={modalRef}
              className="relative transform overflow-hidden rounded-3xl bg-gradient-to-br from-white via-emerald-50/50 to-green-50 text-left shadow-2xl transition-all w-full max-w-5xl my-8 animate-slideUp"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 p-[2px] rounded-3xl">
                <div className="absolute inset-0 bg-white rounded-3xl" />
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setContactModalOpen(false)}
                className="absolute top-6 right-6 z-10 p-3 bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-600 hover:text-emerald-700 transition-all duration-300 rounded-full hover:scale-110 hover:shadow-lg shadow-emerald-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col lg:flex-row relative">
                {/* Enhanced Left Side - Contact Info */}
                <div className="lg:w-2/5 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 text-white p-10 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white/20 blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white/20 blur-3xl" />
                  </div>
                  
                  <div className="relative mb-10">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                      Get in Touch
                    </h2>
                    <p className="text-emerald-100/90 text-lg leading-relaxed">
                      We'd love to hear from you. Contact us for inquiries, support, or partnership opportunities.
                    </p>
                  </div>

                  {/* Enhanced Contact Information */}
                  <div className="space-y-8 mb-10 relative">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="group relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                        <div className="relative flex items-start gap-4 p-4">
                          <div className="p-4 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            {info.icon}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-xl mb-3 text-white">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-emerald-100/90 mb-1">{detail}</p>
                            ))}
                            <button
                              onClick={() => handleCopy(info.copyText, info.title.toLowerCase())}
                              className="mt-3 inline-flex items-center gap-2 text-sm bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                              {info.title.toLowerCase() === "email" ? 
                                (emailCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />) :
                                (phoneCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />)
                              }
                              {info.title.toLowerCase() === "email" && emailCopied ? "Copied!" : 
                               info.title.toLowerCase() === "phone" && phoneCopied ? "Copied!" : info.action}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Business Hours */}
                  <div className="mb-10 relative">
                    <h3 className="font-bold text-2xl mb-6 flex items-center gap-3 text-white">
                      <Clock className="w-6 h-6" />
                      Business Hours
                    </h3>
                    <div className="space-y-3">
                      {businessHours.map((hour, index) => (
                        <div key={index} className="flex justify-between items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 group">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{hour.icon}</span>
                            <span className="font-medium">{hour.day}</span>
                          </div>
                          <span className="text-emerald-100/90 font-medium">{hour.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Social Media */}
                  <div className="relative">
                    <h3 className="font-bold text-2xl mb-6 text-white">Follow Our Journey</h3>
                    <div className="flex gap-4">
                      {[
                        { icon: Facebook, label: "Facebook", color: "hover:bg-emerald-500" },
                        { icon: Twitter, label: "Twitter", color: "hover:bg-green-500" },
                        { icon: Instagram, label: "Instagram", color: "hover:bg-teal-500" },
                        { icon: Linkedin, label: "LinkedIn", color: "hover:bg-emerald-600" }
                      ].map((social, index) => (
                        <a
                          key={index}
                          href="#"
                          className={`p-4 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-xl backdrop-blur-sm`}
                          aria-label={social.label}
                        >
                          <social.icon className="w-6 h-6" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Right Side - Contact Form */}
                <div className="lg:w-3/5 p-10">
                  <div className="mb-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-4xl font-bold text-gray-900">Send us a Message</h2>
                    </div>
                    <p className="text-gray-600 text-lg">Fill out the form below and we'll get back to you within 24 hours.</p>
                  </div>

                  {submitSuccess ? (
                    <div className="text-center py-16">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full mb-8">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">Message Sent Successfully!</h3>
                      <p className="text-gray-600 mb-10 text-lg">Thank you for contacting us. We'll get back to you shortly.</p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Full Name *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full px-5 py-4 rounded-xl border-2 border-emerald-100 bg-white/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none placeholder-gray-400"
                              placeholder="Enter your name"
                            />
                            <div className="absolute inset-0 border-2 border-transparent rounded-xl group-hover:border-emerald-300 transition-colors" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Email Address *
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full px-5 py-4 rounded-xl border-2 border-emerald-100 bg-white/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none placeholder-gray-400"
                              placeholder="your@email.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Phone Number
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full px-5 py-4 rounded-xl border-2 border-emerald-100 bg-white/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none placeholder-gray-400"
                              placeholder="+94 XXX XXX XXX"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Subject *
                          </label>
                          <div className="relative">
                            <select
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-5 py-4 rounded-xl border-2 border-emerald-100 bg-white/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none appearance-none"
                            >
                              <option value="">Select a subject</option>
                              <option value="general">General Inquiry</option>
                              <option value="booking">Booking Assistance</option>
                              <option value="guide">Become a Guide</option>
                              <option value="partnership">Partnership</option>
                              <option value="support">Technical Support</option>
                            </select>
                            <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Message *
                        </label>
                        <div className="relative">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows="6"
                            className="w-full px-5 py-4 rounded-xl border-2 border-emerald-100 bg-white/50 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-300 outline-none resize-none placeholder-gray-400"
                            placeholder="Tell us about your inquiry or how we can help you..."
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <button
                          type="submit"
                          disabled={submitting}
                          className={`relative overflow-hidden group flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 ${
                            submitting
                              ? 'bg-gray-300 cursor-not-allowed'
                              : 'bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white hover:shadow-2xl hover:scale-105'
                          }`}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {submitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span className="relative">Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 relative" />
                              <span className="relative">Send Message</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setContactModalOpen(false)}
                          className="px-8 py-5 rounded-xl border-2 border-emerald-200 text-gray-700 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 font-semibold"
                        >
                          Cancel
                        </button>
                      </div>

                      <p className="text-sm text-gray-500 pt-6 border-t border-emerald-100">
                        By submitting this form, you agree to our Privacy Policy and Terms of Service.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-green-50/30 to-teal-50/20" />
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-emerald-600/10 to-transparent" />
        
        {/* Animated Background Shapes */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-gradient-to-r from-emerald-300/20 to-green-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-r from-teal-300/20 to-emerald-300/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-300/10 to-teal-300/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        <div className="relative max-w-7xl mx-auto z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-emerald-200/50 rounded-full">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-base">Trusted by Travelers Worldwide</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
              <span className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 blur-xl opacity-30 rounded-lg" />
                <span className="relative bg-gradient-to-r from-emerald-700 via-green-600 to-teal-600 bg-clip-text text-transparent">
                  About
                </span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-500 bg-clip-text text-transparent">
                SerendibGuide
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Your trusted partner in exploring the beautiful island of Sri Lanka. 
              We connect travelers with authentic local experiences.
            </p>
            
            {/* Decorative Elements */}
            <div className="flex justify-center gap-4 mt-12">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-bounce" />
              <div className="w-3 h-3 rounded-full bg-green-400 animate-bounce delay-100" />
              <div className="w-3 h-3 rounded-full bg-teal-400 animate-bounce delay-200" />
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`relative group overflow-hidden rounded-2xl transition-all duration-500 ${
                  activeStat === index 
                    ? 'transform scale-105 shadow-2xl' 
                    : 'shadow-xl hover:shadow-2xl'
                }`}
                onMouseEnter={() => setActiveStat(index)}
                onMouseLeave={() => setActiveStat(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.bg} opacity-100 group-hover:opacity-0 transition-opacity duration-500`} />
                <div className={`absolute inset-0 bg-gradient-to-br from-emerald-100 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative p-8 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-2xl ${stat.bg} group-hover:bg-gradient-to-br from-emerald-200 to-green-200 transition-all duration-500`}>
                      <div className={stat.color}>{stat.icon}</div>
                    </div>
                    <TrendingUp className={`w-6 h-6 ${stat.color} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
                  </div>
                  
                  <div className="text-4xl font-bold mb-2">
                    <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                      {stat.value}
                    </span>
                  </div>
                  
                  <div className="text-gray-600 font-semibold text-base">{stat.label}</div>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mission & Vision */}
      <section className="py-24 px-6 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50/30 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Mission Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-white to-emerald-50/50 rounded-3xl p-12 border-2 border-emerald-100/50 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-6 mb-10">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full blur-xl opacity-30" />
                    <div className="relative p-5 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-2xl">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
                      Our Mission
                    </h2>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full" />
                      <div className="w-10 h-1.5 bg-gradient-to-r from-green-400 to-teal-400 rounded-full" />
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-12 leading-relaxed font-medium">
                  To revolutionize travel in Sri Lanka by creating meaningful connections 
                  between travelers and local communities while promoting sustainable 
                  tourism practices.
                </p>
                
                <div className="space-y-4">
                  {[
                    { text: "Promote cultural exchange", icon: "🌍" },
                    { text: "Support local economies", icon: "💰" },
                    { text: "Ensure authentic experiences", icon: "⭐" },
                    { text: "Maintain highest safety standards", icon: "🛡️" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-white to-emerald-50 rounded-xl border border-emerald-100 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group/item">
                      <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl group-hover/item:scale-110 transition-transform duration-300">
                        <span className="text-xl">{item.icon}</span>
                      </div>
                      <span className="text-gray-800 font-semibold text-base">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vision Card */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-green-400 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-white to-teal-50/50 rounded-3xl p-12 border-2 border-teal-100/50 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center gap-6 mb-10">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full blur-xl opacity-30" />
                    <div className="relative p-5 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl shadow-2xl">
                      <Heart className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-700 to-emerald-600 bg-clip-text text-transparent">
                      Our Vision
                    </h2>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-20 h-1.5 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full" />
                      <div className="w-10 h-1.5 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full" />
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 text-lg mb-12 leading-relaxed font-medium">
                  To be Sri Lanka's most trusted travel platform, recognized globally 
                  for authentic experiences and positive impact on local communities.
                </p>
                
                <div>
                  <h3 className="font-bold text-gray-800 text-xl mb-8">Core Values</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {coreValues.map((value, index) => (
                      <div 
                        key={index}
                        className="group/value relative p-5 bg-gradient-to-br from-white to-emerald-50 rounded-2xl border border-emerald-100 hover:border-emerald-300 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{value.icon}</span>
                          <div>
                            <div className="font-bold text-gray-900 text-base">{value.name}</div>
                            <div className="text-sm text-gray-600">{value.description}</div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-400 transform scale-x-0 group-hover/value:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-green-500/10 backdrop-blur-sm border border-emerald-200/50 rounded-full">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700 font-semibold text-base">WHY CHOOSE US</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              The SerendibGuide{' '}
              <span className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 blur-xl opacity-30 rounded-lg" />
                <span className="relative bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  Difference
                </span>
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              We combine local expertise with modern technology to deliver 
              unforgettable travel experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl`} />
                
                <div className={`relative p-10 rounded-3xl border-2 border-emerald-100/50 ${feature.bg} backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
                  hoveredFeature === index ? 'transform scale-105' : ''
                }`}>
                  <div className="relative mb-8">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                    <div className={`relative p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl w-fit transform group-hover:scale-110 transition-transform duration-500`}>
                      <div className="text-white">{feature.icon}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-700 mb-8 leading-relaxed text-base">
                    {feature.description}
                  </p>
                  
                  <div className="flex items-center text-emerald-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                    <span>Discover more</span>
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                  
                  {/* Corner decoration */}
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-300 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-300 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How It Works */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-emerald-50/20 to-white" />
        <div className="absolute top-1/2 left-0 right-0 h-64 bg-gradient-to-r from-emerald-500/5 via-green-500/5 to-teal-500/5 blur-3xl" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              How It{' '}
              <span className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 blur-xl opacity-30 rounded-lg" />
                <span className="relative bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  Works
                </span>
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              Your journey to discovering Sri Lanka starts here
            </p>
          </div>
          
          <div className="relative">
            {/* Enhanced Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-300 via-green-300 to-teal-300 rounded-full shadow-lg" />
            
            <div className="grid lg:grid-cols-3 gap-16 lg:gap-8">
              {[
                { 
                  step: "1", 
                  title: "Browse & Select", 
                  desc: "Explore guides, drivers, and accommodation options based on your preferences", 
                  icon: "🔍",
                  gradient: "from-emerald-400 to-green-500"
                },
                { 
                  step: "2", 
                  title: "Book & Connect", 
                  desc: "Secure your booking and connect directly with your local expert", 
                  icon: "🤝",
                  gradient: "from-green-500 to-teal-500"
                },
                { 
                  step: "3", 
                  title: "Explore & Enjoy", 
                  desc: "Experience Sri Lanka like a local with personalized guidance", 
                  icon: "🌴",
                  gradient: "from-teal-500 to-emerald-500"
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className={`flex flex-col items-center text-center ${
                    index % 2 === 0 ? 'lg:items-end lg:text-right' : 'lg:items-start lg:text-left'
                  }`}>
                    {/* Step Number */}
                    <div className="relative mb-10">
                      <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full blur-xl opacity-20" />
                      <div className="relative w-32 h-32 bg-gradient-to-br from-white to-emerald-50 rounded-3xl flex items-center justify-center shadow-2xl border-2 border-emerald-100">
                        <span className="text-5xl">{item.icon}</span>
                      </div>
                      <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform group-hover:scale-110 transition-transform duration-500`}>
                        {item.step}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{item.title}</h3>
                    <p className="text-gray-700 text-base max-w-xs leading-relaxed">{item.desc}</p>
                    
                    {/* Arrow connector */}
                    {index < 2 && (
                      <div className="hidden lg:block absolute top-16 right-0 w-20 transform rotate-90 opacity-50">
                        <Navigation className="w-20 h-20 text-emerald-300" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Team Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-emerald-50/30 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Meet Our{' '}
              <span className="relative">
                <span className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 blur-xl opacity-30 rounded-lg" />
                <span className="relative bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
                  Team
                </span>
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed font-medium">
              The passionate individuals behind your unforgettable Sri Lankan journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {team.map((member, index) => (
              <div key={index} className="group relative">
                {/* Background Glow */}
                <div className={`absolute -inset-4 bg-gradient-to-br ${member.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white to-emerald-50/50 border-2 border-emerald-100/50 shadow-2xl backdrop-blur-sm p-10 transition-all duration-500 group-hover:shadow-3xl">
                  {/* Top Gradient Bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative mb-10">
                      <div className="absolute -inset-6 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                      <div className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                        <div className={`w-full h-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-6xl font-bold`}>
                          {member.name.charAt(0)}
                        </div>
                      </div>
                      <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-500">
                        <Users className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 font-bold rounded-full mb-6 text-base">
                      {member.role}
                    </div>
                    <p className="text-gray-700 text-base mb-10">{member.bio}</p>
                    
                    {/* Stats */}
                    <div className="w-full pt-10 border-t border-emerald-100">
                      <div className="grid grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">15+</div>
                          <div className="text-sm text-gray-600 font-medium">Years Exp</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">1000+</div>
                          <div className="text-sm text-gray-600 font-medium">Tours Led</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">98%</div>
                          <div className="text-sm text-gray-600 font-medium">Rating</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600" />
        <div className="absolute inset-0 bg-[url('/api/placeholder/2000/1000')] opacity-10 mix-blend-overlay" />
        
        {/* Animated Elements */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/20 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="relative max-w-6xl mx-auto text-center z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-4 mb-10 px-8 py-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm border border-white/30 rounded-full">
            <Sparkles className="w-6 h-6 text-white" />
            <span className="text-white font-bold text-base">Limited Time Special Offers</span>
          </div>
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">
            <span className="text-white">Ready to Explore </span>
            <span className="relative">
              <span className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-amber-400 blur-xl opacity-50 rounded-lg" />
              <span className="relative text-yellow-300 drop-shadow-lg">Sri Lanka</span>
            </span>
            <span className="text-white">?</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-xl text-emerald-100 mb-16 max-w-3xl mx-auto leading-relaxed font-medium">
            Join thousands of travelers who have discovered the real Sri Lanka with us
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-20">
            <Link
              href="/guides"
              className="group relative px-14 py-6 bg-gradient-to-r from-white to-emerald-50 text-emerald-600 rounded-2xl font-bold text-xl transition-all duration-500 hover:shadow-3xl hover:scale-105 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative flex items-center justify-center gap-4">
                Find a Guide
                <ChevronRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-300" />
              </span>
            </Link>
            
            <button
              onClick={() => setContactModalOpen(true)}
              className="group relative px-14 py-6 bg-transparent border-3 border-white text-white rounded-2xl font-bold text-xl transition-all duration-500 hover:bg-white/10 hover:scale-105 hover:shadow-3xl backdrop-blur-sm"
            >
              <span className="relative flex items-center justify-center gap-4">
                <MessageSquare className="w-6 h-6" />
                Contact Us
              </span>
            </button>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-12 pt-20 border-t border-white/30">
            {[
              { icon: Clock, label: "24/7 Support", desc: "Always here to help", color: "text-emerald-200" },
              { icon: Shield, label: "Secure Booking", desc: "SSL encrypted payments", color: "text-green-200" },
              { icon: MapPin, label: "Island-wide Coverage", desc: "All 9 provinces", color: "text-teal-200" }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-5 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className={`w-10 h-10 ${item.color}`} />
                </div>
                <div className="text-white font-bold text-xl mb-3">{item.label}</div>
                <div className="text-emerald-100/90 text-base">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}