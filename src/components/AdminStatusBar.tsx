import React from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CONFIG } from '../data/initialData';
import { ShieldCheck, Clock, MessageSquare, AlertTriangle, CheckCircle2, Zap } from 'lucide-react';

export const AdminStatusBar: React.FC = () => {
  const { adminStatus } = useApp();

  return (
    <div className="border-b-[3px] border-[#121212] bg-[#FFC700] text-[#121212] font-semibold text-xs md:text-sm py-2 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {adminStatus === 'online' ? (
            <span className="flex items-center gap-1.5 bg-[#121212] text-[#FFC700] px-2.5 py-0.5 rounded-none font-bold uppercase text-xs border border-black shadow-[2px_2px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Admin Online
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-0.5 rounded-none font-bold uppercase text-xs border border-black shadow-[2px_2px_0px_#000]">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              Admin Sedang Offline / Istirahat
            </span>
          )}
          <span className="hidden sm:inline font-mono">
            {adminStatus === 'online' ? (
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 fill-black text-black" />
                <span>Respon Cepat &lt; 10 Menit di Web</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neutral-800" />
                <span>Tetap bisa order, lanjut chat WA jika lewat 10 menit</span>
              </span>
            )}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-1 font-mono">
            <Clock className="w-3.5 h-3.5 text-neutral-800" />
            <span>Garansi Respon: <strong>{ADMIN_CONFIG.maxWaitMinutes} Menit</strong></span>
          </div>
          <span className="hidden md:inline">|</span>
          <div className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-800" />
            <span className="hidden md:inline">100% Anti-Banned & Legal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
