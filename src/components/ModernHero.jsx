import React from 'react';
import { Sparkles, Gamepad2, ShieldCheck, ArrowRight, MessageCircle, Star, Zap, CheckCircle } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function ModernHero({ onNavigate }) {
  const { t } = useLanguage();

  const waUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
    t.wa.chatPrompt
  )}`;

  return (
    <div className="pt-8 pb-16 px-3 sm:px-6 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Status Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF4E8] border-2 border-[#9E1B28] shadow-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs sm:text-sm font-extrabold text-[#9E1B28] tracking-wide">
              {t.hero.statusBadge}
            </span>
          </div>
        </div>

        {/* Hero Title & Description */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#FAF4E8] font-['Outfit'] leading-tight">
            {t.hero.headlinePrefix} <span className="text-[#C02C3C]">{t.hero.headlineAi}</span> <span className="text-[#FAF4E8]">{t.hero.headlineAnd}</span>{' '}
            <span className="text-[#E58327]">{t.hero.headlineJoki}</span> {t.hero.headlineSuffix}
          </h1>
          
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#FAF4E8]/85 font-medium max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => onNavigate('joki-game')}
              className="flex items-center gap-2 bg-[#9E1B28] hover:bg-[#80141F] text-white font-black text-xs sm:text-sm md:text-base px-6 py-3.5 rounded-2xl border-2 border-white shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-[#FDE047]" />
              <span>{t.hero.btnJoki}</span>
            </button>

            <button
              onClick={() => onNavigate('ai-projects')}
              className="flex items-center gap-2 bg-[#FAF4E8] hover:bg-[#F3ECE0] text-[#9E1B28] font-black text-xs sm:text-sm md:text-base px-6 py-3.5 rounded-2xl border-2 border-[#9E1B28] shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#E58327]" />
              <span>{t.hero.btnProjects}</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#E58327] hover:bg-[#D4741B] text-white font-black text-xs sm:text-sm md:text-base px-6 py-3.5 rounded-2xl border-2 border-[#C26B18] shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>{t.hero.btnConsult}</span>
            </a>
          </div>
        </div>

        {/* 3 Quick Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          
          {/* Card 1: Joki Game */}
          <div 
            onClick={() => onNavigate('joki-game')}
            className="group bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-[24px] p-6 shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center mb-4 border border-[#7A111C] shadow-2xs group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-6 h-6 text-[#FDE047]" />
              </div>
              <h3 className="text-xl font-black text-[#9E1B28] font-['Outfit'] mb-2">
                {t.hero.cardJokiTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#3D2527] font-medium leading-relaxed mb-4">
                {t.hero.cardJokiDesc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-[#9E1B28] group-hover:underline pt-3 border-t border-[#9E1B28]/20">
              <span>{t.hero.cardJokiAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Projects & Assets */}
          <div 
            onClick={() => onNavigate('ai-projects')}
            className="group bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-[24px] p-6 shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E58327] text-white flex items-center justify-center mb-4 border border-[#B86214] shadow-2xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-black text-[#9E1B28] font-['Outfit'] mb-2">
                {t.hero.cardProjectsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#3D2527] font-medium leading-relaxed mb-4">
                {t.hero.cardProjectsDesc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-[#9E1B28] group-hover:underline pt-3 border-t border-[#9E1B28]/20">
              <span>{t.hero.cardProjectsAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Testimonials */}
          <div 
            onClick={() => onNavigate('testimoni')}
            className="group bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-[24px] p-6 shadow-xl hover:-translate-y-1.5 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#2B1618] text-white flex items-center justify-center mb-4 border border-black shadow-2xs group-hover:scale-105 transition-transform">
                <Star className="w-6 h-6 text-[#FDE047] fill-[#FDE047]" />
              </div>
              <h3 className="text-xl font-black text-[#9E1B28] font-['Outfit'] mb-2">
                {t.hero.cardTestiTitle}
              </h3>
              <p className="text-xs sm:text-sm text-[#3D2527] font-medium leading-relaxed mb-4">
                {t.hero.cardTestiDesc}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-black text-[#2B1618] group-hover:underline pt-3 border-t border-[#9E1B28]/20">
              <span>{t.hero.cardTestiAction}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>

        {/* 4 Trust Pillars */}
        <div className="mt-12 bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-2xl p-6 sm:p-8 shadow-xl">
          <h4 className="text-center text-sm font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit'] mb-6">
            {t.hero.trustTitle}
          </h4>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-[#2B1618]">{t.hero.pillar1Title}</h5>
                <p className="text-[11px] text-[#6B5B5E]">{t.hero.pillar1Desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-[#2B1618]">{t.hero.pillar2Title}</h5>
                <p className="text-[11px] text-[#6B5B5E]">{t.hero.pillar2Desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-[#2B1618]">{t.hero.pillar3Title}</h5>
                <p className="text-[11px] text-[#6B5B5E]">{t.hero.pillar3Desc}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                <CheckCircle className="w-5 h-5 text-[#FDE047]" />
              </div>
              <div>
                <h5 className="font-extrabold text-xs sm:text-sm text-[#2B1618]">{t.hero.pillar4Title}</h5>
                <p className="text-[11px] text-[#6B5B5E]">{t.hero.pillar4Desc}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
