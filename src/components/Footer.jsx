import React from 'react';
import { Phone, Mail, Gamepad2, Sparkles, Heart, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Footer({ onSelectTab }) {
  const { t, lang, setLang } = useLanguage();

  const waUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
    t.wa.chatPrompt
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
              {t.footer.bio}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#9E1B28] text-white">
                {t.footer.pill1}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#E58327] text-white">
                {t.footer.pill2}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-white border border-[#9E1B28] text-[#9E1B28]">
                {t.footer.pill3}
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit'] mb-3">
              {t.footer.pagesTitle}
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm font-bold text-[#3D2527]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('ai-projects')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  {t.nav.projects}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('joki-game')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  {t.nav.joki}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('testimoni')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  {t.nav.testimoni}
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('faq')} className="hover:text-[#9E1B28] transition-colors cursor-pointer">
                  {t.nav.faq}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Orders */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit'] mb-3">
              {t.footer.contactTitle}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-semibold text-[#5A4548]">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#9E1B28] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-green-600 text-white flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+{personalInfo.whatsappNumber}</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 hover:text-[#9E1B28] transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">{personalInfo.email}</span>
              </a>
            </div>

            {/* Language Switcher Button (Moved from Navbar to Footer) */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-[#6B5B5E] block mb-1.5 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#E58327]" />
                <span>{lang === 'id' ? 'Bahasa / Language' : 'Language'}</span>
              </span>
              <div className="inline-flex p-1 bg-white border-2 border-[#9E1B28] rounded-xl shadow-xs gap-1">
                <button
                  type="button"
                  onClick={() => setLang('id')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    lang === 'id'
                      ? 'bg-[#9E1B28] text-white shadow-2xs'
                      : 'text-[#2B1618] hover:bg-[#FAF4E8]'
                  }`}
                >
                  <span>🇮🇩</span>
                  <span>Indonesia</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                    lang === 'en'
                      ? 'bg-[#9E1B28] text-white shadow-2xs'
                      : 'text-[#2B1618] hover:bg-[#FAF4E8]'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#6B5B5E]">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <p className="flex items-center gap-1">
            {t.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
