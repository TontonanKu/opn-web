import React, { useState } from 'react';
import { X, Sparkles, Terminal, Code2, ExternalLink, MessageCircle, Play, CheckCircle2 } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  // Interactive sandbox state
  const [promptInput, setPromptInput] = useState(project.liveSimulation?.samplePrompt || '');
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState(null);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
      if (project.liveSimulation.type === 'chess') {
        setSimResult({
          type: 'chess',
          text: `[Chess Bot Engine v2]: Analisis posisi selesai (Depth 8). Langkah optimal: e2-e4 (King's Pawn). Kontrol petak tengah d5 & f5 kuat. Keuntungan evaluasi: +0.35 centipawn. Skakmat terdekat: 14 langkah.`
        });
      } else if (project.liveSimulation.type === 'schedule') {
        setSimResult({
          type: 'schedule',
          text: `[Ngampus Schedule Sync]: Jadwal Game Technology berhasil disinkronisasi. Hari Aktif: Senin. Mata Kuliah: Pemrograman Game Lanjut (08:00 - 11:30 WIB) di Lab 302 Polibatam. Model 3D WebGL aktif 60 FPS.`
        });
      } else if (project.liveSimulation.type === 'downloader') {
        setSimResult({
          type: 'downloader',
          text: `[ZuraDown API Parser]: Link terverifikasi! Video TikTok HD tanpa watermark berhasil diekstrak (1920x1080, Ukuran: 18.4 MB, Format: MP4). Siap diunduh secara instan.`
        });
      } else {
        setSimResult({
          type: 'general',
          text: `Hasil simulasi untuk: "${promptInput}". Status: 200 OK, eksekusi selesai dalam 0.4 detik.`
        });
      }
    }, 1000);
  };

  const waProjectUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
    `Halo Reihan! Saya tertarik dengan web project kamu: "${project.title}" (${project.demoUrl}). Mau tanya kolaborasi / pembuatan web serupa.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#FAF4E8] border-3 border-[#9E1B28] rounded-[28px] shadow-2xl p-6 sm:p-8 text-[#2B1618]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#9E1B28] text-white flex items-center justify-center font-black hover:rotate-90 transition-transform shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Tag & Category */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-black bg-[#9E1B28] text-white">
            {project.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#E58327] text-white">
            {project.tag}
          </span>
          <span className="text-xs font-bold text-green-700 bg-green-100 px-2.5 py-0.5 rounded-full">
            ● {project.date}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#9E1B28] tracking-tight mb-3 font-['Outfit']">
          {project.title}
        </h2>

        {/* Project Visual / Header Banner */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-[#9E1B28] mb-6 aspect-video max-h-60 w-full bg-[#1E1113]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
            <p className="text-white text-xs sm:text-sm font-medium drop-shadow-md">
              {project.shortDesc}
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h3 className="text-sm font-black text-[#9E1B28] uppercase tracking-wider mb-2 font-['Outfit']">
            Teknologi & Engine:
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-xl bg-white border border-[#9E1B28]/30 font-black text-xs text-[#2B1618] shadow-2xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mb-6">
          <h3 className="text-sm font-black text-[#9E1B28] uppercase tracking-wider mb-2 font-['Outfit']">
            Fitur Utama:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2 bg-white/70 border border-[#9E1B28]/20 p-2.5 rounded-xl text-xs sm:text-sm font-semibold"
              >
                <CheckCircle2 className="w-4 h-4 text-[#9E1B28] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Simulation Sandbox */}
        <div className="mb-6 bg-[#2B1618] text-white rounded-2xl p-4 sm:p-5 border-2 border-[#9E1B28] shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FDE047]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#FDE047] font-['Outfit']">
                Live Simulator Sandbox
              </span>
            </div>
            <span className="text-[11px] text-white/60 font-mono">
              Mode: {project.liveSimulation?.type || 'interactive'}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Masukkan prompt atau input..."
                className="flex-1 bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white font-mono focus:outline-hidden focus:border-[#E58327]"
              />
              <button
                onClick={handleSimulate}
                disabled={simulating}
                className="flex items-center justify-center gap-1.5 px-4 py-2 bg-[#E58327] hover:bg-[#D4741B] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                {simulating ? (
                  <span className="animate-pulse">Processing...</span>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Simulation</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulation output area */}
            <div className="bg-black/60 rounded-xl p-3 border border-white/10 font-mono text-xs text-green-400 min-h-[64px] flex items-center">
              {simulating ? (
                <div className="flex items-center gap-2 text-[#FDE047]">
                  <span className="w-2 h-2 rounded-full bg-[#FDE047] animate-ping"></span>
                  <span>Mengeksekusi simulasi inferensi pipeline {project.title}...</span>
                </div>
              ) : simResult ? (
                <p className="leading-relaxed">{simResult.text}</p>
              ) : (
                <p className="text-white/40 italic">
                  Klik "Run Simulation" untuk menguji simulasi respon dari pipeline {project.title}.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer actions with direct live app link */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#9E1B28]/20">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E58327] hover:bg-[#D4741B] text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Kunjungi Web App Asli ↗</span>
          </a>

          <a
            href={waProjectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#9E1B28] hover:bg-[#80141F] text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4 text-[#FDE047]" />
            <span>Diskusi via WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
