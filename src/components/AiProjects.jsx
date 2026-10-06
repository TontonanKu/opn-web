import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Cpu, Layers, ExternalLink, Info, Palette } from 'lucide-react';
import { aiProjects, personalInfo } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function AiProjects() {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'ai' | 'non-ai'
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects = filterType === 'all'
    ? aiProjects
    : filterType === 'ai'
    ? aiProjects.filter(p => p.isAi)
    : aiProjects.filter(p => !p.isAi);

  const aiCount = aiProjects.filter(p => p.isAi).length;
  const nonAiCount = aiProjects.filter(p => !p.isAi).length;

  const waConsultUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
    'Halo zura-w! Saya mau konsultasi mengenai pembuatan custom AI / web project / game asset.'
  )}`;

  return (
    <section id="ai-projects" className="py-12 md:py-20 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E8] border border-[#9E1B28] text-[#9E1B28] font-black text-xs uppercase tracking-wider mb-3 shadow-2xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>Karya Digital & Game Asset Lab</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-['Outfit']">
            <span className="text-[#C02C3C]">PROJECT &</span> <span className="text-[#E58327]">GAME ASSETS</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#FAF4E8]/90 font-medium">
            Koleksi asset pack original, web tools, dan aplikasi game AI yang dikembangkan oleh zura-w.
          </p>
        </div>

        {/* Filter Badges: AI vs Non-AI vs All */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: `Semua Karya (${aiProjects.length})` },
            { id: 'ai', label: `✨ AI Powered (${aiCount})` },
            { id: 'non-ai', label: `🎨 Non-AI / Handcrafted (${nonAiCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                filterType === tab.id
                  ? 'bg-[#9E1B28] text-white border-2 border-white shadow-md -translate-y-0.5'
                  : 'bg-[#FAF4E8] text-[#2B1618] border-2 border-[#9E1B28] hover:bg-[#F3ECE0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-[24px] p-5 sm:p-6 shadow-xl flex flex-col justify-between hover:-translate-y-1 transition-transform group"
            >
              <div>
                {/* Top Badges (AI / Non-AI Label + Category) */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    {/* Explicit AI vs Non-AI Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-black text-white shadow-xs ${
                      project.isAi 
                        ? 'bg-purple-600 border border-purple-400' 
                        : 'bg-emerald-600 border border-emerald-400'
                    }`}>
                      {project.aiLabel}
                    </span>

                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#E58327] text-white">
                      {project.category}
                    </span>
                  </div>

                  {project.price && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-[#2B1618] text-[#FDE047] border border-[#7A111C]">
                      {project.price}
                    </span>
                  )}
                </div>

                {/* Project Image Banner */}
                <div className="relative rounded-xl overflow-hidden border-2 border-[#9E1B28] mb-4 aspect-video bg-[#1E1113]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded border border-white/20">
                    {project.date}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-black text-[#9E1B28] tracking-tight mb-2 font-['Outfit'] group-hover:text-[#7A111C]">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#3D2527] font-medium leading-relaxed mb-4">
                  {project.shortDesc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md bg-white border border-[#9E1B28]/20 text-[11px] font-bold text-[#2B1618]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Direct Link + Detail Modal (Simulation removed) */}
              <div className="pt-3 border-t border-[#9E1B28]/20 flex items-center gap-2">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-[#9E1B28] hover:bg-[#80141F] text-white font-extrabold text-xs sm:text-sm py-2.5 px-3 rounded-xl shadow-xs transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#FDE047]" />
                  <span>{project.actionText || 'Buka Link ↗'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  className="flex items-center justify-center gap-1.5 bg-white border-2 border-[#9E1B28] hover:bg-[#FAF4E8] text-[#9E1B28] font-black text-xs sm:text-sm py-2.5 px-3.5 rounded-xl transition-colors cursor-pointer shrink-0"
                  title="Lihat Detail & Fitur"
                >
                  <Info className="w-4 h-4 text-[#E58327]" />
                  <span>Detail</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner: Custom Request / Collaboration */}
        <div className="mt-12 bg-gradient-to-r from-[#9E1B28] to-[#7A111C] border-2 border-white rounded-[24px] p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black font-['Outfit'] mb-1">
              Tertarik Kolaborasi Game Asset atau Web App?
            </h3>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl">
              Hubungi zura-w via WhatsApp untuk custom game assets, integrasi AI, atau web tools yang disesuaikan dengan kebutuhan project kamu.
            </p>
          </div>

          <a
            href={waConsultUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#E58327] hover:bg-[#C26B18] text-white font-black text-sm shadow-md transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#FDE047]" />
            <span>Diskusi Project</span>
          </a>
        </div>

      </div>

      {/* Render Project Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
