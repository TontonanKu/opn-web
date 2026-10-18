import React, { useState } from 'react';
import { PREMIUM_APPS } from '../data/initialData';
import { PremiumApp } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Check, 
  ArrowRight, 
  Zap, 
  Pin, 
  Tag, 
  ShieldCheck, 
  Clock, 
  Search, 
  MessageSquare, 
  Sparkles,
  ArrowLeft,
  X
} from 'lucide-react';
import { ADMIN_CONFIG } from '../data/initialData';

interface PremiumAppSectionProps {
  onBackToHome?: () => void;
}

export const PremiumAppSection: React.FC<PremiumAppSectionProps> = ({ onBackToHome }) => {
  const { openCheckout } = useApp();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'Semua' | 'Musik' | 'Streaming' | 'Desain' | 'Edukasi'>('Semua');

  // Filter apps by expiry
  const visibleApps = PREMIUM_APPS.filter((app) => {
    if (!app.expiresAt) return true;
    return new Date() <= new Date(app.expiresAt);
  });

  // Filter apps by category & search query
  const filteredApps = visibleApps.filter((app) => {
    // 1. Search filter
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      (app.category && app.category.toLowerCase().includes(searchQuery.toLowerCase().trim()));

    if (!matchesSearch) return false;

    // 2. Category filter
    if (activeCategory === 'Semua') return true;
    if (activeCategory === 'Musik') {
      return app.category.toLowerCase().includes('music') || app.name.toLowerCase().includes('spotify');
    }
    if (activeCategory === 'Streaming') {
      return app.category.toLowerCase().includes('streaming') || app.category.toLowerCase().includes('video') || app.name.toLowerCase().includes('netflix') || app.name.toLowerCase().includes('youtube');
    }
    if (activeCategory === 'Desain') {
      return app.category.toLowerCase().includes('design') || app.category.toLowerCase().includes('creative') || app.name.toLowerCase().includes('canva') || app.name.toLowerCase().includes('capcut');
    }
    if (activeCategory === 'Edukasi') {
      return app.category.toLowerCase().includes('education') || app.category.toLowerCase().includes('language') || app.name.toLowerCase().includes('duolingo');
    }
    return true;
  });

  const handleBuyApp = (app: PremiumApp) => {
    const currentVariant = app.variants?.find(
      v => v.id === (selectedVariants[app.id] || app.variants?.[0]?.id)
    );
    const effectivePrice = currentVariant ? currentVariant.price : app.price;
    const effectiveDuration = currentVariant ? currentVariant.duration : app.duration;
    const effectiveDescription = currentVariant 
      ? `${app.name} (${currentVariant.duration}) - ${app.badge}`
      : `${app.name} (${app.duration}) - ${app.badge}`;

    const orderItem = {
      appId: app.id,
      title: app.name,
      badge: app.badge,
      price: effectivePrice,
      selectedVariant: {
        duration: effectiveDuration,
        type: app.badge,
        price: effectivePrice,
      },
      description: effectiveDescription
    };

    openCheckout(orderItem, 'app_premium');
  };

  const generateDirectWALink = (app: PremiumApp) => {
    const currentVariant = app.variants?.find(
      v => v.id === (selectedVariants[app.id] || app.variants?.[0]?.id)
    );
    const effectivePrice = currentVariant ? currentVariant.price : app.price;
    const effectiveDuration = currentVariant ? currentVariant.duration : app.duration;
    
    const formattedPrice = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(effectivePrice);

    const message = `Halo Admin Zura Store! Saya mau order cepat:\n\n*Produk:* ${app.name}\n*Varian/Durasi:* ${effectiveDuration}\n*Harga:* ${formattedPrice}\n\nApakah stok akun saat ini tersedia?`;
    return `https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="aplikasi" className="py-12 bg-white border-b-[3px] border-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb Navigation */}
        {onBackToHome && (
          <div className="mb-6 flex items-center justify-between border-b-2 border-dashed border-neutral-300 pb-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-neutral-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#FF5900]" />
              <span>← Kembali ke Beranda</span>
            </button>
            <span className="font-mono text-[11px] text-neutral-400 font-bold hidden sm:inline">
              Beranda &gt; Katalog Aplikasi Premium
            </span>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF5900] text-white px-3 py-1 font-mono text-xs font-bold uppercase mb-2 border border-black shadow-[2px_2px_0px_#000]">
              <Zap className="w-3.5 h-3.5" />
              <span>AKUN RESMI & FULL GARANSI</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-[#121212] uppercase">
              APLIKASI PREMIUM
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl mt-1">
              Langganan aplikasi premium legal dengan aktivasi instan, harga terjangkau, dan garansi penuh dari Zura Store.
            </p>
          </div>

          <div className="bg-[#FFC700] border-2 border-black px-4 py-2 text-xs font-mono font-bold shadow-brutal-sm flex items-center gap-2">
            <Tag className="w-4 h-4 text-black" />
            <span>KODE REDEEM • INVITE EMAIL • LINK PRIVAT</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[#FAF8F2] border-[2.5px] border-black p-4 mb-8 shadow-brutal flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Realtime Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari aplikasi (Spotify, Canva, CapCut, YouTube...)"
              className="w-full bg-white border-2 border-black pl-9 pr-8 py-2 text-xs font-mono font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC700]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs font-bold">
            {(['Semua', 'Streaming', 'Musik', 'Desain', 'Edukasi'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 border-2 border-black uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-black text-[#FFC700] shadow-[2px_2px_0px_#FFC700]'
                    : 'bg-white text-black hover:bg-[#FFC700]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Empty State */}
        {filteredApps.length === 0 && (
          <div className="bg-[#FAF8F2] border-2 border-black p-10 text-center shadow-brutal max-w-lg mx-auto">
            <Search className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h4 className="font-display font-black text-lg uppercase text-[#121212]">
              Aplikasi Tidak Ditemukan
            </h4>
            <p className="text-xs font-mono text-neutral-600 mt-1 mb-4">
              Tidak ada produk yang cocok dengan pencarian "{searchQuery}".
            </p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
              className="brutal-btn-yellow py-2 px-4 text-xs uppercase font-mono font-bold"
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}

        {/* Product Cards Grid - Neo-Brutalist Taxi Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => {
            const currentVariant = app.variants?.find(
              v => v.id === (selectedVariants[app.id] || app.variants?.[0]?.id)
            );
            const displayPrice = currentVariant ? currentVariant.price : app.price;
            const displayDuration = currentVariant ? currentVariant.duration : app.duration;
            const displayNote = currentVariant?.noteSeller || app.noteSeller;

            return (
              <div 
                key={app.id}
                className={`brutal-card flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all relative overflow-hidden ${
                  app.expiresAt ? 'bg-[#FFFDF0] ring-2 ring-[#FF5900]' : 'bg-[#FAF8F2]'
                }`}
              >
                {/* Limited Time Expiry Banner if product has expiry */}
                {app.expiryNotice && (
                  <div className="bg-[#FF5900] text-white px-3.5 py-1.5 flex items-center justify-between border-b-2 border-black font-mono text-[11px] font-black uppercase tracking-wider">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{app.expiryNotice}</span>
                    </div>
                    <span className="bg-[#121212] text-[#FFC700] text-[9px] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#fff]">
                      KILAT
                    </span>
                  </div>
                )}

                {/* Card Header */}
                <div className="p-6 border-b-2 border-black">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 px-2 py-0.5 border border-neutral-300">
                      {app.category}
                    </span>
                    <span className="bg-[#FFC700] text-black border border-black px-2 py-0.5 text-[10px] font-mono font-black uppercase shadow-[1px_1px_0px_#000]">
                      {app.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-display font-black text-[#121212] mb-1">
                    {app.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mb-4 line-clamp-2">
                    {app.description}
                  </p>

                  {/* Price Tag Box */}
                  <div className="bg-white border-2 border-black p-3 shadow-[2px_2px_0px_#000] mb-4">
                    <span className="text-[10px] font-mono font-bold text-neutral-500 block uppercase">
                      Harga Spesial Zura:
                    </span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl font-display font-black text-[#121212]">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(displayPrice)}
                      </span>
                      <span className="text-xs font-mono font-bold text-neutral-500">
                        {displayDuration}
                      </span>
                    </div>
                  </div>

                  {/* Multi-Variant Selector (Misal Spotify 2 versi: 26-31 Hari vs 50-60 Hari) */}
                  {app.variants && app.variants.length > 1 && (
                    <div className="mt-2 pt-3 border-t-2 border-dashed border-neutral-300">
                      <span className="text-[10px] font-mono font-black uppercase text-neutral-700 block mb-1.5">
                        Pilih Opsi Varian Durasi:
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {app.variants.map((v) => {
                          const isSelected = (selectedVariants[app.id] || app.variants?.[0]?.id) === v.id;
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => setSelectedVariants(prev => ({ ...prev, [app.id]: v.id }))}
                              className={`p-2 text-left font-mono border-2 border-black transition-all text-xs ${
                                isSelected 
                                  ? 'bg-[#FFC700] text-black font-black shadow-[2px_2px_0px_#000]' 
                                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[11px] leading-tight font-bold">
                                <span>{v.duration}</span>
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <div className="text-[10px] text-neutral-600 font-extrabold mt-0.5">
                                Rp {v.price.toLocaleString('id-ID')}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* Note Seller Box (Brutalist Sticky Note) */}
                <div className="p-6 bg-white flex-1 flex flex-col justify-between border-b-2 border-neutral-300">
                  <div>
                    {displayNote && (
                      <div className="bg-[#FFF9E6] border-2 border-black p-3 mb-4 shadow-[2px_2px_0px_#000]">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#FF5900] uppercase mb-1">
                          <Pin className="w-3.5 h-3.5 fill-[#FF5900]" />
                          <span>NOTE SELLER:</span>
                        </div>
                        <p className="font-mono text-[11px] text-neutral-800 leading-relaxed font-semibold">
                          {displayNote}
                        </p>
                      </div>
                    )}

                    {/* Feature checkmarks */}
                    <div className="space-y-2 mb-4">
                      {app.features.map((feat, fidx) => (
                        <div key={fidx} className="flex items-start gap-2 text-xs font-semibold text-neutral-800">
                          <div className="w-4 h-4 bg-[#FFC700] border border-black flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-black stroke-[3]" />
                          </div>
                          <span className="leading-tight">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (Dual Checkout: Web & Direct WhatsApp) */}
                <div className="p-4 bg-[#FAF8F2] flex flex-col gap-2">
                  <button
                    onClick={() => handleBuyApp(app)}
                    className="w-full brutal-btn-yellow py-3 px-4 flex items-center justify-center gap-2 group text-xs uppercase font-display font-black shadow-brutal-sm"
                  >
                    <span>ORDER DI WEB (QRIS / DANA)</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <a
                    href={generateDirectWALink(app)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white border-2 border-black py-2.5 px-4 flex items-center justify-center gap-1.5 text-xs font-mono font-bold uppercase transition-all shadow-[2px_2px_0px_#000]"
                  >
                    <MessageSquare className="w-4 h-4 text-white fill-white" />
                    <span>⚡ Order Cepat via WhatsApp</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
