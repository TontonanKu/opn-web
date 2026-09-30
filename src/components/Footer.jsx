import React from 'react';
import { Phone, Mail, Gamepad2, Sparkles, Heart } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ onSelectTab }) {
  const waUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
    'Halo Reihan (zura-w)! Mau tanya info joki game / project AI.'
  )}`;

  const handleNav = (tabId) => {
    if (onSelectTab) {
      onSelectTab(tabId);
    }
  };

  return (
    <footer className="bg-[#FAF4E8] border-t-3 border-[#9E1B28] text-[#2B1618] pt-12 pb-8 px-4 md:px-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b-2 border-[#9E1B28]/20">
          
          {/* Brand & Bio */}
          <div className="md:col-span-6 space-y-3">
            <button 
              onClick={() => handleNav('home')} 
              className="flex items-center gap-2 text-left cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center font-black text-xl border border-[#7A111C]">
                Z
              </div>
              <span className="text-2xl font-black tracking-tight text-[#9E1B28] font-['Outfit']">
                zura-w.my.id
              </span>
            </button>

            <p className="text-xs sm:text-sm text-[#5A4548] leading-relaxed max-w-md font-medium">
              Portfolio resmi dan pusat layanan joki game terpercaya & AI development oleh{' '}
              <strong className="text-[#9E1B28]">Reihan Fahreza</strong> — Mahasiswa D4 Teknik Informatika (Game Technology) Politeknik Negeri Batam.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#9E1B28] text-white">
                Game Tech Polibatam
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E58327] text-white">
                Practical AI
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#9E1B28] text-[#9E1B28]">
                Pro Joki Handplay
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit'] mb-3">
              Halaman
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-[#3D2527]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai-projects')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  Showcase Project AI
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('joki-game')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  Layanan Joki & Kalkulator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('testimoni')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  Testimoni Klien
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  Tanya Jawab (FAQ) & Kontak
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit'] mb-3">
              Kontak Langsung
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-semibold">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#9E1B28]/20 hover:border-[#9E1B28] transition-colors text-[#2B1618]"
              >
                <div className="w-7 h-7 rounded-full bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{personalInfo.phone} (WhatsApp)</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-[#9E1B28]/20 hover:border-[#9E1B28] transition-colors text-[#2B1618]"
              >
                <div className="w-7 h-7 rounded-full bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{personalInfo.email}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#6B5B5E]">
          <p>© {new Date().getFullYear()} Reihan Fahreza (zura-w). All rights reserved.</p>
          <p className="flex items-center gap-1">
            Politeknik Negeri Batam • Game Technology
          </p>
        </div>
      </div>
    </footer>
  );
}
