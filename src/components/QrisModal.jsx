import React, { useEffect } from 'react';
import { X, Download, Heart, ShieldCheck, Smartphone } from 'lucide-react';

export default function QrisModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-md bg-[#FAF4E8] rounded-2xl border-3 border-[#9E1B28] shadow-[8px_8px_0px_#9E1B28] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#9E1B28] text-white p-4 sm:p-5 flex items-center justify-between border-b-2 border-[#7A111C]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF4E8] text-[#9E1B28] flex items-center justify-center font-black shadow-xs">
              <Heart className="w-5 h-5 fill-[#9E1B28] text-[#9E1B28]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-base sm:text-lg text-white tracking-tight">
                  Support & Tip (QRIS)
                </h3>
                <span className="text-[10px] bg-[#E58327] text-white px-1.5 py-0.5 rounded font-black uppercase tracking-wider">
                  Official
                </span>
              </div>
              <p className="text-[11px] text-[#FAF4E8]/80 font-medium">
                KAZURA STORE • All E-Wallet & M-Banking
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-black/20 hover:bg-black/40 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-3.5 max-h-[85vh] overflow-y-auto">
          {/* Support Greeting */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-[#5A464A] font-medium leading-relaxed">
              Dukungan atau tip donasi Anda sangat berarti untuk membiayai server, pengembangan project AI, dan kopi harian ☕
            </p>
          </div>

          {/* QR Code Container - Pas dengan ukuran gambar tanpa spasi kosong berlebih */}
          <div className="flex justify-center">
            <div className="w-full max-w-[310px] bg-white rounded-2xl overflow-hidden border-2 border-[#9E1B28] shadow-[4px_4px_0px_#9E1B28] p-1.5">
              <img
                src="/qris.png"
                alt="QRIS KAZURA STORE"
                className="w-full h-auto object-contain rounded-xl block"
              />
            </div>
          </div>

          {/* Supported Methods */}
          <div className="bg-[#F3ECE0] rounded-xl p-2.5 border border-[#E4D9C8] text-center">
            <p className="text-[11px] font-bold text-[#6B5B5E] mb-1 flex items-center justify-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#E58327]" />
              Mendukung Semua Metode Pembayaran QRIS:
            </p>
            <p className="text-[11px] text-[#2B1618] font-bold">
              BCA • Mandiri • BRI • BNI • Seabank • GoPay • OVO • DANA • ShopeePay • LinkAja
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2.5 pt-1">
            <a
              href="/qris.png"
              download="QRIS-KAZURA-STORE.png"
              className="flex-1 flex items-center justify-center gap-2 bg-[#FAF4E8] hover:bg-[#F3ECE0] text-[#9E1B28] border-2 border-[#9E1B28] font-bold text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-all shadow-xs active:translate-y-0.5 cursor-pointer text-center"
            >
              <Download className="w-4 h-4" />
              <span>Simpan Gambar</span>
            </a>
            <button
              onClick={onClose}
              className="flex-1 bg-[#9E1B28] hover:bg-[#80141F] text-white font-black text-xs sm:text-sm py-2.5 px-3 rounded-xl transition-all shadow-xs active:translate-y-0.5 cursor-pointer text-center border border-[#7A111C]"
            >
              Selesai / Tutup
            </button>
          </div>

          <div className="text-center">
            <p className="text-[10px] text-gray-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-green-600" />
              Verifikasi Resmi Bank Indonesia & ASPI
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
