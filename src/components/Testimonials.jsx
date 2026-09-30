import React, { useState, useEffect } from 'react';
import { 
  Star, MessageSquareQuote, CheckCircle, Eye, 
  ChevronLeft, ChevronRight, X, ShieldCheck, Award
} from 'lucide-react';
import { imageTestimonials } from '../data/portfolioData';

export default function Testimonials() {
  // Image gallery filter ('all' | 'wuwa' | 'roblox')
  const [galleryFilter, setGalleryFilter] = useState('all');
  
  // Lightbox modal state (active index in filtered list)
  const [activeImageIndex, setActiveImageIndex] = useState(null);

  // Filtered image list
  const filteredImages = galleryFilter === 'all'
    ? imageTestimonials
    : imageTestimonials.filter(img => img.gameCategory === galleryFilter);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'ArrowLeft') handlePrevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredImages]);

  const handleNextImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const handlePrevImage = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <section id="testimoni" className="py-12 md:py-20 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E8] border border-[#9E1B28] text-[#9E1B28] font-black text-xs uppercase tracking-wider mb-3 shadow-2xs">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Reputasi & Bukti Nyata Pelanggan</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#C02C3C] tracking-tight font-['Outfit']">
            BUKTI TESTIMONI
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#FAF4E8]/90 font-medium">
            Arsip tangkapan layar asli hasil pengerjaan joki 100% handplay dan bukti transaksi pembayaran dari pelanggan setia Kazura (zura-w).
          </p>

          {/* Rating & Trust Banner */}
          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 bg-[#FAF4E8] border-2 border-[#9E1B28] px-6 py-3 rounded-full shadow-lg">
            <div className="flex items-center gap-1 text-[#E58327]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-black text-base text-[#9E1B28]">
              5.0 / 5.0
            </span>
            <span className="text-xs text-[#6B5B5E] font-bold border-l-2 border-[#9E1B28]/20 pl-3 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              100% Transaksi Asli & Terverifikasi
            </span>
          </div>
        </div>

        {/* Gallery Card Container */}
        <div className="bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-[28px] p-5 sm:p-8 shadow-2xl space-y-6">
          
          {/* Gallery Header & Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#9E1B28]/20">
            <div>
              <h3 className="font-black text-base sm:text-lg text-[#9E1B28] font-['Outfit'] flex items-center gap-2">
                <Award className="w-5 h-5 text-[#E58327]" />
                <span>Galeri Bukti Selesai & Transaksi</span>
              </h3>
              <p className="text-xs text-[#6B5B5E] font-medium mt-0.5">
                Klik gambar mana pun untuk melihat ukuran penuh dan detail chat transaksi
              </p>
            </div>

            {/* Game Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: `Semua Bukti (${imageTestimonials.length})` },
                { id: 'wuwa', label: `✦ Wuthering Waves (5)` },
                { id: 'roblox', label: `⚔️ Roblox (11)` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setGalleryFilter(tab.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    galleryFilter === tab.id
                      ? 'bg-[#9E1B28] text-white shadow-xs -translate-y-0.5'
                      : 'bg-white text-[#2B1618] border border-[#9E1B28]/30 hover:border-[#9E1B28]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Grid (Full Width, 3 or 4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setActiveImageIndex(idx)}
                className="group relative bg-white border-2 border-[#9E1B28]/30 hover:border-[#9E1B28] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer aspect-4/3 flex flex-col justify-end"
              >
                <img
                  src={img.image}
                  alt={img.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-300"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                {/* Floating Game Category Tag */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#9E1B28] text-white border border-[#FDE047]/40 shadow-xs">
                    {img.game}
                  </span>
                </div>

                {/* Hover Eye Action Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-[#FAF4E8] text-[#9E1B28] flex items-center justify-center shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5 text-[#9E1B28]" />
                  </div>
                </div>

                {/* Bottom Information */}
                <div className="relative z-10 p-3 text-white">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-black truncate drop-shadow-sm">
                      {img.title}
                    </p>
                    <span className="text-[10px] text-[#FDE047] font-bold shrink-0">
                      Lihat Bukti ↗
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="pt-3 border-t border-[#9E1B28]/20 flex flex-wrap items-center justify-between gap-2 text-xs text-[#6B5B5E]">
            <span className="flex items-center gap-1.5 font-bold">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Seluruh bukti testimoni di atas merupakan arsip asli tangkapan layar pengerjaan & transaksi.
            </span>
            <span className="font-extrabold text-[#9E1B28]">
              Kazura Official Portfolio
            </span>
          </div>

        </div>

      </div>

      {/* Lightbox / Modal Zoom for Full-Resolution Image Testimonials */}
      {activeImageIndex !== null && filteredImages[activeImageIndex] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Info and Close */}
            <div className="w-full flex items-center justify-between mb-3 px-2 text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full bg-[#9E1B28] text-white">
                  {filteredImages[activeImageIndex].game}
                </span>
                <span className="text-sm font-bold">
                  {filteredImages[activeImageIndex].title} ({activeImageIndex + 1} / {filteredImages.length})
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveImageIndex(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-[#9E1B28] text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Zoomed Image Container */}
            <div className="relative bg-[#1A1A1A] rounded-2xl overflow-hidden border-2 border-[#9E1B28] shadow-2xl flex items-center justify-center max-h-[75vh]">
              <img
                src={filteredImages[activeImageIndex].image}
                alt={filteredImages[activeImageIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain"
              />

              {/* Prev Button */}
              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#9E1B28] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                  title="Sebelumnya (Panah Kiri)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next Button */}
              {filteredImages.length > 1 && (
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-[#9E1B28] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                  title="Berikutnya (Panah Kanan)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption */}
            <p className="mt-3 text-xs text-white/70 text-center">
              Gunakan tombol panah ◄ ► atau tombol panah keyboard untuk menelusuri bukti transaksi lainnya.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
