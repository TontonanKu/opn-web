import React, { useState } from 'react';
import { Gamepad2, Sparkles, Menu, X, Heart, Home, MessageSquareQuote, HelpCircle, Globe } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar({ activeTab = 'home', onSelectTab, onOpenDonate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { id: 'home', name: t.nav.home, icon: Home },
    { id: 'ai-projects', name: t.nav.projects, icon: Sparkles },
    { id: 'joki-game', name: t.nav.joki, icon: Gamepad2 },
    { id: 'testimoni', name: t.nav.testimoni, icon: MessageSquareQuote },
    { id: 'faq', name: t.nav.faq, icon: HelpCircle },
  ];

  const handleTabClick = (id) => {
    onSelectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#FAF4E8]/95 backdrop-blur-md border-b-2 border-[#9E1B28] px-4 md:px-8 py-3 shadow-md transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand */}
          <button 
            onClick={() => handleTabClick('home')} 
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-[#9E1B28] flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:scale-105 transition-transform border border-[#7A111C]">
              Z
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-[#9E1B28] tracking-tight font-['Outfit']">
                  zura-w
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#E58327] text-white">
                  {t.nav.tagline}
                </span>
              </div>
              <p className="text-[11px] text-[#6B5B5E] font-medium hidden sm:block">
                {t.nav.subTagline}
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs md:text-sm font-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#9E1B28] text-white shadow-sm border border-[#7A111C] -translate-y-0.5'
                      : 'text-[#2B1618] hover:bg-[#F3ECE0] hover:text-[#9E1B28]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FDE047]' : 'text-[#9E1B28]'}`} />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Action & Language Toggle (Desktop) */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border-2 border-[#9E1B28] text-xs font-black text-[#9E1B28] hover:bg-[#FAF4E8] shadow-xs transition-all active:scale-95 cursor-pointer"
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Globe className="w-3.5 h-3.5 text-[#E58327]" />
              <span>{lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
            </button>

            {/* Donate Button */}
            <button
              onClick={onOpenDonate}
              className="flex items-center gap-1.5 bg-[#9E1B28] hover:bg-[#80141F] text-white text-xs md:text-sm font-extrabold px-4 py-2 rounded-full border border-[#7A111C] shadow-sm hover:shadow-md transition-all active:translate-y-0.5 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-[#FDE047] text-[#FDE047]" />
              <span>{t.nav.donate}</span>
            </button>
          </div>

          {/* Mobile Right Controls: Lang + Hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border-2 border-[#9E1B28] text-[11px] font-black text-[#9E1B28] shadow-xs"
            >
              <span>{lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#9E1B28] hover:bg-[#F3ECE0] transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-[#9E1B28]/20 pb-4 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleTabClick(link.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-black text-sm text-left transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#9E1B28] text-white'
                      : 'text-[#2B1618] hover:bg-[#F3ECE0]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#FDE047]' : 'text-[#9E1B28]'}`} />
                  <span>{link.name}</span>
                </button>
              );
            })}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonate();
              }}
              className="mt-2 flex items-center justify-center gap-2 bg-[#9E1B28] text-white font-extrabold py-2.5 rounded-xl text-sm cursor-pointer shadow-sm"
            >
              <Heart className="w-4 h-4 fill-[#FDE047] text-[#FDE047]" />
              <span>{t.nav.donateViaQris}</span>
            </button>
          </div>
        )}
      </header>

      {/* Spacer so the page content never gets covered by the fixed navbar */}
      <div className="h-[68px] sm:h-[72px] w-full shrink-0" aria-hidden="true" />
    </>
  );
}
