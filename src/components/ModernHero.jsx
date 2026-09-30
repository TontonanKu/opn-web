import React from 'react';
import { Sparkles, Gamepad2, Trophy, ShieldCheck, ArrowRight, MessageCircle, Star, Terminal, Zap, CheckCircle, Code2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ModernHero({ onNavigate }) {
  const waUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
    'Halo Reihan (zura-w)! Saya mau tanya seputar Joki Game / Project AI.'
  )}`;

  return (
    <div className="pt-8 pb-16 px-3 sm:px-6 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Status Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF4E8] border-2 border-[#9E1B28] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-extrabold text-[#9E1B28] tracking-wide">
              {personalInfo.status}
            </span>
          </div>
        </div>

        {/* Hero Title & Description */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#FAF4E8] font-['Outfit'] leading-tight">
            SOLUSI <span className="text-[#C02C3C]">PROJECT AI</span> <span className="text-[#FAF4E8]">&</span>{' '}
            <span className="text-[#E58327]">JOKI GAME</span> TERPERCAYA
          </h1>
          
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#FAF4E8]/85 font-medium max-w-2xl mx-auto leading-relaxed">
            Portfolio resmi <strong className="text-white underline decoration-[#E58327] decoration-2 underline-offset-4">Reihan Fahreza (zura-w)</strong> — Mahasiswa D4 Game Technology Politeknik Negeri Batam.
            Spesialisasi generative game assets, integrasi AI, serta jasa push rank 100% murni handplay.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('joki-game')}
              className="flex items-center gap-2 bg-[#9E1B28] hover:bg-[#80141F] text-white font-black text-xs sm:text-sm md:text-base px-6 py-3.5 rounded-2xl border-2 border-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-[#FDE047]" />
              <span>Pesan Joki Game</span>
            </button>

            <button
              onClick={() => onNavigate('ai-projects')}
              className="flex items-center gap-2 bg-[#FAF4E8] hover:bg-[#F3ECE0] text-[#9E1B28] font-black text-xs sm:text-sm md:text-base px-6 py-3.5 rounded-2xl border-2 border-[#9E1B28] shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#E58327]" />
              <span>Lihat Project AI</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#E58327] hover:bg-[#D4741B] text-white font-black text-xs sm:text-sm md:text-base px-6 py-3.5 rounded-2xl border-2 border-[#C26B18] shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>Chat WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 3 Main Interactive Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-12">
          
          {/* Card 1: Project AI */}
          <div
            onClick={() => onNavigate('ai-projects')}
            className="group bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-2xl p-6 shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center mb-4 border border-[#7A111C] shadow-2xs group-hover:scale-105 transition-transform">
                <Terminal className="w-6 h-6 text-[#FDE047]" />
              </div>
              <h3 className="text-xl font-black text-[#9E1B28] font-['Outfit'] mb-2">
                Project AI & Tools
              </h3>
              <p className="text-xs sm:text-sm text-[#3D2527] font-medium leading-relaxed mb-4">
                Diffusion sprite generator, autonomous LLM NPC brain untuk Unity, dan visual QA glitch detector.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-[#9E1B28] group-hover:underline pt-3 border-t border-[#9E1B28]/20">
              <span>Buka Halaman Project AI</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Joki Game */}
          <div
            onClick={() => onNavigate('joki-game')}
            className="group bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-2xl p-6 shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E58327] text-white flex items-center justify-center mb-4 border border-[#C26B18] shadow-2xs group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#9E1B28] font-['Outfit'] mb-2">
                Joki Game & Apk Premium
              </h3>
              <p className="text-xs sm:text-sm text-[#3D2527] font-medium leading-relaxed mb-4">
                MLBB, Wuthering Waves, Roblox & Lisensi Aplikasi Premium. 100% murni handplay, akun private, dan harga transparan.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-[#E58327] group-hover:underline pt-3 border-t border-[#9E1B28]/20">
              <span>Pilih Game & Hitung Harga</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Testimoni */}
          <div
            onClick={() => onNavigate('testimoni')}
            className="group bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-2xl p-6 shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2B1618] text-white flex items-center justify-center mb-4 border border-black shadow-2xs group-hover:scale-105 transition-transform">
                <Star className="w-6 h-6 text-[#FDE047] fill-[#FDE047]" />
              </div>
              <h3 className="text-xl font-black text-[#9E1B28] font-['Outfit'] mb-2">
                Testimoni & Reputasi
              </h3>
              <p className="text-xs sm:text-sm text-[#3D2527] font-medium leading-relaxed mb-4">
                Rating 4.9/5 dari 80+ customer puas. Garansi akun aman, pengerjaan tepat waktu, dan harga transparan.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-[#2B1618] group-hover:underline pt-3 border-t border-[#9E1B28]/20">
              <span>Baca Semua Ulasan Klien</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* 4 Trust Pillars */}
        <div className="mt-12 bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-2xl p-6 sm:p-8 shadow-xl">
          <h4 className="text-center text-sm font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit'] mb-6">
            Kenapa Memilih Layanan Reihan (zura-w)?
          </h4>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-[#2B1618]">100% Handplay</h5>
                <p className="text-[11px] text-[#6B5B5E]">Bebas cheat & script</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-[#2B1618]">Proses Kilat</h5>
                <p className="text-[11px] text-[#6B5B5E]">Mulai langsung hari ini</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-[#2B1618]">100% Anti Hackback</h5>
                <p className="text-[11px] text-[#6B5B5E]">Garansi akun & data aman</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-[#2B1618]">Privasi & Amanah</h5>
                <p className="text-[11px] text-[#6B5B5E]">CS ramah & fast respon</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
