import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const waUrl = `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(
    'Halo zura-w! Saya ingin tanya seputar Joki Game / Project.'
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Tooltip Popup */}
      {showTooltip && (
        <div className="relative mb-2 bg-[#FAF4E8] text-[#2B1618] border-2 border-[#9E1B28] px-3.5 py-2 rounded-2xl shadow-xl text-xs font-bold flex items-center gap-2 max-w-[220px] animate-bounce">
          <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
          <span>Ada pertanyaan? Chat zura-w di sini!</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-[#6B5B5E] hover:text-[#9E1B28] p-0.5 ml-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#9E1B28] hover:bg-[#80141F] text-white border-2 border-white shadow-2xl transition-all hover:scale-110 active:scale-95"
        title="Chat WhatsApp zura-w"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        <MessageCircle className="w-7 h-7 text-[#FDE047] group-hover:rotate-12 transition-transform" />
      </a>
    </div>
  );
}
