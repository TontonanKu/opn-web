import React from 'react';
import { Zap, Sparkles, Palette, ArrowRight, ShieldCheck, Check, Star } from 'lucide-react';

interface FeaturedHighlightsProps {
  onSelectJoki: () => void;
  onSelectApps: () => void;
  onSelectPortfolio: () => void;
}

export const FeaturedHighlights: React.FC<FeaturedHighlightsProps> = ({
  onSelectJoki,
  onSelectApps,
  onSelectPortfolio
}) => {
  return (
    <section className="py-14 bg-white border-b-[3px] border-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFC700] text-black px-3 py-1 font-mono text-xs font-black uppercase mb-2 border border-black shadow-[2px_2px_0px_#000]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LAYANAN UTAMA ZURA STORE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-[#121212] uppercase">
              PILIH KATEGORI LAYANAN
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl mt-1">
              Temukan solusi digital terbaik mulai dari joki rank game pro, akun aplikasi premium bergaransi, hingga studio kreasi AI.
            </p>
          </div>
          <span className="hidden md:block font-mono text-xs text-neutral-500 font-bold">
            Klik kartu untuk buka katalog lengkap
          </span>
        </div>

        {/* 3 Main Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Joki Game */}
          <div 
            onClick={onSelectJoki}
            className="brutal-card bg-[#FFFDF0] p-6 border-[3px] border-black flex flex-col justify-between hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all cursor-pointer group shadow-brutal"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#FF5900] text-white border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  <Zap className="w-6 h-6 fill-white text-white" />
                </div>
                <span className="bg-[#121212] text-[#FFC700] font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                  POPULER
                </span>
              </div>

              <h3 className="font-display font-black text-2xl uppercase text-[#121212] group-hover:text-[#FF5900] transition-colors leading-tight mb-2">
                JASA JOKI GAME PRO
              </h3>
              
              <p className="text-xs font-mono text-neutral-600 mb-4 leading-relaxed">
                Mobile Legends: Bang Bang, Wuthering Waves, Roblox & game populer lainnya. Dikerjakan joki handplay pro, winrate 80-95%, 100% Anti Hack-Back.
              </p>

              <div className="space-y-1.5 font-mono text-xs text-neutral-800 border-t-2 border-dashed border-neutral-300 pt-3 mb-5">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Mulai Rp 3.000 / Bintang</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Bebas Request Hero & Jam Main</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Garansi Respon Cepat &lt; 10 Menit</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full brutal-btn-yellow py-3 px-4 font-mono font-black text-xs uppercase flex items-center justify-between group-hover:bg-[#FFD633] transition-colors"
            >
              <span>BUKA KATALOG JOKI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Aplikasi Premium */}
          <div 
            onClick={onSelectApps}
            className="brutal-card bg-[#FAF8F2] p-6 border-[3px] border-black flex flex-col justify-between hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all cursor-pointer group shadow-brutal"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#FFC700] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#000]">
                  <Sparkles className="w-6 h-6 text-black" />
                </div>
                <span className="bg-[#FF5900] text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                  BEST SELLER
                </span>
              </div>

              <h3 className="font-display font-black text-2xl uppercase text-[#121212] group-hover:text-[#FF5900] transition-colors leading-tight mb-2">
                APLIKASI PREMIUM
              </h3>
              
              <p className="text-xs font-mono text-neutral-600 mb-4 leading-relaxed">
                Spotify Premium (2 varian), Canva Edu, CapCut Pro Team, Netflix 4K, YouTube Premium & Duolingo Super. Akun resmi & bergaransi.
              </p>

              <div className="space-y-1.5 font-mono text-xs text-neutral-800 border-t-2 border-dashed border-neutral-300 pt-3 mb-5">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Spotify Premium mulai Rp 20.000</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Canva Edu Lifetime Rp 12.000</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>CapCut Pro Team Rp 40.000</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full brutal-btn-orange py-3 px-4 font-mono font-black text-xs uppercase flex items-center justify-between group-hover:bg-[#ff6e1f] transition-colors"
            >
              <span>BELI APLIKASI PREMIUM</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: AI Creative Studio & Portofolio */}
          <div 
            onClick={onSelectPortfolio}
            className="brutal-card bg-[#F4F1EA] p-6 border-[3px] border-black flex flex-col justify-between hover:translate-x-[-3px] hover:translate-y-[-3px] transition-all cursor-pointer group shadow-brutal"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-black text-[#FFC700] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_#FFC700]">
                  <Palette className="w-6 h-6 text-[#FFC700]" />
                </div>
                <span className="bg-emerald-200 text-emerald-950 font-mono font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                  CREATIVE HUB
                </span>
              </div>

              <h3 className="font-display font-black text-2xl uppercase text-[#121212] group-hover:text-[#FF5900] transition-colors leading-tight mb-2">
                AI & WEB STUDIO
              </h3>
              
              <p className="text-xs font-mono text-neutral-600 mb-4 leading-relaxed">
                Showcase proyek web kreatif, project AI Outbreak, Zuradown Video Downloader, game Blocky, dan solusi digital interaktif Zura Creative Studio.
              </p>

              <div className="space-y-1.5 font-mono text-xs text-neutral-800 border-t-2 border-dashed border-neutral-300 pt-3 mb-5">
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Outbreak Project (Jobdesk Team AI)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Zuradown All Video Downloader</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Blocky Puzzle & Web Games</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full brutal-btn-white py-3 px-4 font-mono font-black text-xs uppercase flex items-center justify-between group-hover:bg-[#121212] group-hover:text-[#FFC700] transition-colors"
            >
              <span>LIHAT PORTOFOLIO AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
