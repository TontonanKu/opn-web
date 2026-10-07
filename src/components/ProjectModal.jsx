import React from 'react';
import { X, ExternalLink, MessageCircle, CheckCircle2, Sparkles, Palette } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const { t, lang } = useLanguage();

  const waProjectUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
    lang === 'en'
      ? `Hello zura-w! I am interested in your project: "${project.title}" (${project.demoUrl}). Could you provide more details?`
      : `Halo zura-w! Saya tertarik dengan project kamu: "${project.title}" (${project.demoUrl}). Mau tanya info lebih lanjut.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FAF4E8] border-3 border-[#9E1B28] rounded-[28px] shadow-2xl p-6 sm:p-8 text-[#2B1618]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#9E1B28] text-white flex items-center justify-center font-black hover:rotate-90 transition-transform shadow-sm cursor-pointer"
          title={lang === 'en' ? 'Close (Esc)' : 'Tutup (Esc)'}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Tag & AI/Non-AI Label */}
        <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black text-white shadow-xs ${
            project.isAi 
              ? 'bg-linear-to-r from-purple-600 to-indigo-600 border border-purple-400/50' 
              : 'bg-linear-to-r from-emerald-600 to-teal-600 border border-emerald-400/50'
          }`}>
            {project.isAi ? (
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse shrink-0" />
            ) : (
              <Palette className="w-3.5 h-3.5 text-emerald-200 shrink-0" />
            )}
            <span>{project.aiLabel}</span>
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-black bg-[#9E1B28] text-white">
            {project.category}
          </span>
          <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#E58327] text-white">
            {project.tag}
          </span>
          {project.price && (
            <span className="px-2.5 py-0.5 rounded-md text-xs font-extrabold bg-[#2B1618] text-[#FDE047]">
              {project.price}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#9E1B28] tracking-tight mb-3 font-['Outfit']">
          {project.title}
        </h2>

        {/* Project Visual / Header Banner */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#9E1B28] mb-5 aspect-video max-h-64 w-full bg-[#1E1113]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <p className="text-white text-xs sm:text-sm font-medium drop-shadow-md">
              {project.shortDesc}
            </p>
          </div>
        </div>

        {/* Tech Stack / Specs */}
        <div className="mb-5">
          <h3 className="text-xs font-black text-[#9E1B28] uppercase tracking-wider mb-2 font-['Outfit']">
            {t.projects.modalSpecs}
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-lg bg-white border border-[#9E1B28]/30 font-bold text-xs text-[#2B1618] shadow-2xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-xs font-black text-[#9E1B28] uppercase tracking-wider mb-2 font-['Outfit']">
            {t.projects.modalFeatures}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 bg-white/80 border border-[#9E1B28]/20 p-2.5 rounded-xl text-xs font-semibold leading-relaxed"
              >
                <CheckCircle2 className="w-4 h-4 text-[#9E1B28] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#9E1B28]/20">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#9E1B28] hover:bg-[#80141F] text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <ExternalLink className="w-4 h-4 text-[#FDE047]" />
            <span>{project.actionText || t.projects.modalVisit}</span>
          </a>

          <a
            href={waProjectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border-2 border-[#25D366] text-[#128C7E] hover:bg-green-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <span>{t.projects.modalAskWa}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
