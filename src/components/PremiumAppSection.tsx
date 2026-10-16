import React from 'react';
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
  Clock
} from 'lucide-react';

export const PremiumAppSection: React.FC = () => {
  const { openCheckout } = useApp();

  // Otomatis filter/hapus produk yang masa aktif tayangnya sudah lewat tanggal kadaluarsa
  const visibleApps = PREMIUM_APPS.filter((app) => {
    if (!app.expiresAt) return true;
    return new Date() <= new Date(app.expiresAt);
  });

  const handleBuyApp = (app: PremiumApp) => {
    const orderItem = {
      appId: app.id,
      title: app.name,
      badge: app.badge,
      price: app.price,
      selectedVariant: {
        duration: app.duration,
        type: app.badge,
        price: app.price,
      },
      description: `${app.name} (${app.duration}) - ${app.badge}`
    };

    openCheckout(orderItem, 'app_premium');
  };

  return (
    <section id="aplikasi" className="py-16 bg-white border-b-[3px] border-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Neo-Brutalist Taxi Aesthetic */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
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

        {/* Product Cards Grid - Neo-Brutalist Taxi Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleApps.map((app) => (
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
                    LIMITED
                  </span>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 border-b-2 border-neutral-300">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono font-black uppercase bg-white border border-black px-2 py-0.5">
                    {app.category}
                  </span>
                  <span className={`text-xs font-mono font-extrabold px-2.5 py-0.5 uppercase border border-black shadow-[2px_2px_0px_#000] ${
                    app.expiresAt ? 'bg-[#FF5900] text-white' : 'bg-[#121212] text-[#FFC700]'
                  }`}>
                    {app.badge}
                  </span>
                </div>

                <h3 className="font-display font-black text-xl text-[#121212] uppercase leading-tight mb-2">
                  {app.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-baseline gap-2 mb-2">
                  <div className="font-display font-black text-3xl text-[#121212] leading-none">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(app.price)}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#FF5900]">
                    {app.duration}
                  </span>
                </div>

                <p className="text-xs text-neutral-600 font-medium leading-relaxed">
                  {app.description}
                </p>
              </div>

              {/* Note Seller Box (Brutalist Sticky Note) */}
              <div className="p-6 bg-white flex-1 flex flex-col justify-between border-b-2 border-neutral-300">
                <div>
                  {app.noteSeller && (
                    <div className="bg-[#FFF9E6] border-2 border-black p-3 mb-4 shadow-[2px_2px_0px_#000]">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-black text-[#FF5900] uppercase mb-1">
                        <Pin className="w-3.5 h-3.5 fill-[#FF5900]" />
                        <span>NOTE SELLER:</span>
                      </div>
                      <p className="font-mono text-[11px] text-neutral-800 leading-relaxed font-semibold">
                        {app.noteSeller}
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

              {/* Card Action Button */}
              <div className="p-5 bg-[#FAF8F2]">
                <button
                  onClick={() => handleBuyApp(app)}
                  className="w-full brutal-btn-yellow py-3.5 px-4 flex items-center justify-center gap-2 group text-xs uppercase font-display font-black"
                >
                  <span>ORDER SEKARANG</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
