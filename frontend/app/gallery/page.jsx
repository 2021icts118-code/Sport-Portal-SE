'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${API_URL}/api/gallery`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        // Transform backend data to frontend structure
        // Backend: [{ category: 'Cricket', images: [{ url, caption }] }]
        // We group by category if the backend returns flat events, 
        // or just map if the backend structure matches.
        // Assuming backend returns a list of Albums/Events with a category field.

        const grouped = data.reduce((acc, item) => {
          const cat = item.category || 'Dimensions';
          if (!acc[cat]) acc[cat] = [];

          if (item.images && item.images.length > 0) {
            const mappedImages = item.images.map(img => ({
              src: img.url,
              alt: img.caption || item.title,
              title: item.title,
              category: cat
            }));
            acc[cat].push(...mappedImages);
          }
          return acc;
        }, {});

        // Convert to array format expected by state
        const formattedSports = Object.entries(grouped).map(([category, images]) => ({
          category,
          images
        }));

        setSports(formattedSports);
      } catch (err) {
        console.error("Gallery fetch error:", err);
        setSports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Flatten images for 'All' view
  const allImages = sports.flatMap(s => s.images);
  const displayedImages = activeCategory === 'All'
    ? allImages
    : allImages.filter(img => img.category === activeCategory);

  const categories = ['All', ...sports.map(s => s.category)];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-900 tracking-tight mb-4">
          University of Vavuniya
          <span className="block text-blue-600 mt-2">Sports Gallery</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Celebrating excellence, teamwork, and the vibrant sporting culture of our university community.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto mb-10 overflow-x-auto pb-4 scrollbar-hide">
        <div className="flex justify-start md:justify-center p-1 space-x-2 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ease-in-out
                ${activeCategory === cat
                  ? 'bg-blue-800 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <motion.div
        layout
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {displayedImages.map((image, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={image.src + index}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wider mb-1">
                  {image.category}
                </p>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {displayedImages.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900">No images found</h3>
          <p className="text-gray-500 mt-1">Try selecting a different category.</p>
        </div>
      )}
    </div>
  );
}
