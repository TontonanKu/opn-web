import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS, ADMIN_CONFIG } from '../data/initialData';
import { ProjectPortfolio } from '../types';
import { 
  Palette, 
  Sparkles, 
  Eye, 
  Terminal, 
  Layers, 
  X, 
  ExternalLink,
  MessageCircle,
  Wand2,
  ArrowRight,
  ArrowUpRight,
  Check
} from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'manual'>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectPortfolio | null>(null);

  const filteredProjects = activeFilter === 'all' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.type === activeFilter);

  const handleOrderCustomDesign = (proj: ProjectPortfolio) => {
    const phone = ADMIN_CONFIG.whatsappNumber;
    const msg = `Halo Admin zura-w! 👋\nSaya melihat portfolio Anda "${proj.title}" (${proj.category}).\nSaya tertarik ingin konsultasi / memesan project serupa!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="portfolio" className="py-16 bg-[#FAF8F2] border-b-[3px] border-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#121212] text-[#FFC700] px-3 py-1 font-mono text-xs font-bold uppercase mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>SHOWCASE KARYA & PROJECT zura-w</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-[#121212]">
              PROJECT AI & GAME ASSETS
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl mt-1">
              Spesialisasi generative game assets, game web interaktif berbasis AI bot, dan aset 2D manual tanpa generative AI.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-2 border-2 border-black font-mono text-xs font-black uppercase transition-all ${
                activeFilter === 'all' ? 'bg-[#FFC700] shadow-[2px_2px_0px_#000]' : 'bg-white hover:bg-neutral-100'
              }`}
            >
              Semua ({PORTFOLIO_PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('ai')}
              className={`px-3.5 py-2 border-2 border-black font-mono text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
                activeFilter === 'ai' ? 'bg-[#FF5900] text-white shadow-[2px_2px_0px_#000]' : 'bg-white hover:bg-neutral-100'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5" />
              AI Powered ({PORTFOLIO_PROJECTS.filter(p => p.type === 'ai').length})
            </button>
            <button
              onClick={() => setActiveFilter('manual')}
              className={`px-3.5 py-2 border-2 border-black font-mono text-xs font-black uppercase transition-all flex items-center gap-1.5 ${
                activeFilter === 'manual' ? 'bg-[#FFC700] text-black shadow-[2px_2px_0px_#000]' : 'bg-white hover:bg-neutral-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-black" />
              Non-AI / Handcrafted ({PORTFOLIO_PROJECTS.filter(p => p.type === 'manual').length})
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className="brutal-card bg-white flex flex-col justify-between overflow-hidden group hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image Preview with badge overlay */}
              <div className="relative aspect-video overflow-hidden border-b-[3px] border-[#121212] bg-neutral-900">
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  onError={(e) => {
                    // Fallback to placeholder if asset image fails
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                
                {/* Type Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                  <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 border-2 border-black shadow-[2px_2px_0px_#000] ${
                    project.type === 'ai' 
                      ? 'bg-[#FF5900] text-white' 
                      : 'bg-[#FFC700] text-black'
                  }`}>
                    {project.aiLabel || (project.type === 'ai' ? 'AI POWERED' : 'HANDCRAFTED')}
                  </span>
                  {project.price && (
                    <span className="bg-emerald-400 text-black text-[10px] font-mono font-black px-2 py-0.5 border-2 border-black shadow-[1px_1px_0px_#000]">
                      {project.price}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3 bg-black text-white p-1.5 border border-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4" />
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono font-bold text-neutral-500 uppercase">
                      {project.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#FF5900] bg-orange-50 px-1.5 py-0.5 border border-orange-200">
                      {project.tags[0]}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-lg text-[#121212] group-hover:text-[#FF5900] transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-medium line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {/* Tool Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.toolsUsed.slice(0, 3).map((tool, tidx) => (
                      <span key={tidx} className="bg-[#FAF8F2] border border-black text-[10px] font-mono font-semibold px-2 py-0.5">
                        {tool}
                      </span>
                    ))}
                    {project.toolsUsed.length > 3 && (
                      <span className="bg-neutral-100 border border-neutral-400 text-[10px] font-mono font-semibold px-1.5 py-0.5">
                        +{project.toolsUsed.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="border-t border-neutral-200 pt-3 flex items-center justify-between text-xs font-mono font-bold text-neutral-700">
                    <span className="flex items-center gap-1 group-hover:underline">
                      <span>Detail & Demo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    {project.demoUrl && (
                      <span className="text-[10px] bg-black text-[#FFC700] px-2 py-0.5 uppercase flex items-center gap-1">
                        <span>Live</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          <div className="brutal-card bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            
            {/* Close button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1.5 border-2 border-black bg-[#FFC700] hover:bg-[#FF5900] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-4 pr-10">
              <div className="flex items-center gap-2 mb-2">
                <span className={`inline-block text-xs font-mono font-black uppercase px-2 py-0.5 border border-black ${
                  selectedProject.type === 'ai' ? 'bg-[#FF5900] text-white' : 'bg-[#FFC700] text-black'
                }`}>
                  {selectedProject.aiLabel || selectedProject.type.toUpperCase()}
                </span>
                {selectedProject.price && (
                  <span className="bg-emerald-400 text-black text-xs font-mono font-black px-2 py-0.5 border border-black">
                    {selectedProject.price}
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-[#121212]">
                {selectedProject.title}
              </h2>
              <span className="text-xs font-mono text-neutral-500 font-bold block mt-1">
                Kategori: {selectedProject.category}
              </span>
            </div>

            {/* Image Preview */}
            <div className="border-[3px] border-black mb-4 overflow-hidden bg-black max-h-[350px]">
              <img 
                src={selectedProject.imageUrl} 
                alt={selectedProject.title}
                className="w-full h-full object-contain" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

            {/* Description */}
            <p className="text-sm font-medium text-neutral-700 mb-4 leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Features list if available */}
            {selectedProject.features && selectedProject.features.length > 0 && (
              <div className="mb-4 bg-[#FAF8F2] border-2 border-black p-4">
                <span className="text-xs font-mono font-black uppercase text-[#121212] block mb-2">
                  Fitur Utama & Spesifikasi:
                </span>
                <ul className="space-y-1.5 text-xs text-neutral-800">
                  {selectedProject.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 stroke-[3] text-[#FF5900] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tools Used */}
            <div className="mb-6">
              <span className="text-xs font-mono font-bold uppercase text-neutral-500 block mb-2">
                Tech Stack / Software:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.toolsUsed.map((tool, idx) => (
                  <span key={idx} className="bg-[#FFC700] border-2 border-black font-mono font-bold text-xs px-2.5 py-1 shadow-[2px_2px_0px_#000]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-3 border-t-2 border-neutral-200">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 brutal-btn-yellow py-3 px-4 flex items-center justify-center gap-2 text-xs font-mono font-black uppercase text-center"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{selectedProject.actionText || 'Buka Demo Live ↗'}</span>
                </a>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="brutal-btn-white py-3 px-4 flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase"
                >
                  <span>GitHub ↗</span>
                </a>
              )}

              <button
                onClick={() => handleOrderCustomDesign(selectedProject)}
                className="brutal-btn-orange py-3 px-4 flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Konsultasi WA</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
