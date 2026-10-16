import React from 'react';
import { 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Gamepad2, 
  Smartphone, 
  Sparkles,
  Receipt,
  Check,
  CreditCard,
  MessageSquare
} from 'lucide-react';
import { ADMIN_CONFIG } from '../data/initialData';
import { useApp } from '../context/AppContext';

export const HeroBanner: React.FC = () => {
  const { adminStatus } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 border-b-[3px] border-[#121212] bg-[#FAF8F2]">
      
      {/* Decorative dot matrix background in corners */}
      <div className="absolute top-4 left-4 w-32 h-32 bg-dots opacity-40 pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-4 right-4 w-40 h-40 bg-dots opacity-40 pointer-events-none hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Checkerboard Tape Banner */}
        <div className="mb-6 inline-flex items-center gap-2 border-[3px] border-[#121212] bg-white px-3 py-1.5 shadow-brutal-sm">
          <span className="w-8 h-4 bg-checker-yellow border border-black"></span>
          <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#121212]">
            ON TIME. EVERY TIME. ORDER TANPA RIBET.
          </span>
          <span className="w-8 h-4 bg-checker-yellow border border-black"></span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Bold Neo-Brutalist Headlines */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            
            <div className="flex flex-wrap gap-2">
              <span className="bg-[#FF5900] text-white border-2 border-black font-extrabold text-xs px-2.5 py-1 uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-white text-white" />
                <span>FAST RESPONSE GUARANTEE</span>
              </span>
              <span className="bg-[#FFC700] text-black border-2 border-black font-extrabold text-xs px-2.5 py-1 uppercase shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${adminStatus === 'online' ? 'bg-emerald-600 animate-pulse' : 'bg-red-600'}`}></span>
                <span>{adminStatus === 'online' ? 'ADMIN ONLINE' : 'ADMIN OFFLINE (FALLBACK WA)'}</span>
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-black leading-none text-[#121212]">
              JOKI GAME & <br />
              <span className="bg-[#FFC700] px-3 py-1 border-[3px] border-[#121212] inline-block shadow-brutal my-1">
                APP PREMIUM
              </span> <br />
              JUST A TAP AWAY!
            </h1>

            <p className="text-base sm:text-lg font-medium text-neutral-700 max-w-xl leading-relaxed">
              Platform layanan digital serba cepat. Order langsung tanpa payment gateway ribet. Pilih bayar di Web atau via WhatsApp. <br />
              <span className="bg-[#FFC700] px-1.5 font-bold text-black border border-black">
                Jika admin tidak merespon dalam 10 menit
              </span>, langsung chat WhatsApp dengan kode checkout otomatis!
            </p>

            {/* Checkered badge banner like the taxi graphic */}
            <div className="inline-flex items-center gap-3 bg-[#121212] text-white p-2.5 border-[3px] border-[#121212] shadow-brutal w-fit">
              <div className="w-6 h-6 bg-checker"></div>
              <span className="font-mono font-black text-xs sm:text-sm tracking-wider uppercase text-[#FFC700]">
                ORDER. VERIFIKASI. SELESAI. STRUK RESMI.
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#joki"
                className="brutal-btn-yellow text-sm sm:text-base py-3.5 px-6 flex items-center gap-2 group"
              >
                <span>ORDER JOKI SEKARANG</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a 
                href="#aplikasi"
                className="brutal-btn-orange text-sm sm:text-base py-3.5 px-6 flex items-center gap-2"
              >
                <Smartphone className="w-5 h-5" />
                <span>BELI APP PREMIUM</span>
              </a>

              <a 
                href="#testimoni"
                className="brutal-btn-white text-sm py-3.5 px-5 flex items-center gap-2"
              >
                <Receipt className="w-4 h-4 text-[#FF5900]" />
                <span>LIHAT STRUK TESTI</span>
              </a>
            </div>

            {/* Features check */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t-2 border-dashed border-neutral-300">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#FFC700] border-2 border-black flex items-center justify-center font-bold text-xs text-black shadow-[1px_1px_0px_#000]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold font-mono">Batas Respon 10 Menit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#FFC700] border-2 border-black flex items-center justify-center font-bold text-xs text-black shadow-[1px_1px_0px_#000]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold font-mono">Struk Web / Bukti WA</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <div className="w-6 h-6 bg-[#FFC700] border-2 border-black flex items-center justify-center font-bold text-xs text-black shadow-[1px_1px_0px_#000]">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span className="text-xs font-bold font-mono">100% Anti Hack-Back</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Card Mockup inspired by the Taxi Graphic image */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Outer decorative brutalist card */}
              <div className="brutal-card p-6 bg-[#FFC700] relative">
                
                {/* Top Corner Taxi Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="w-8 h-8 bg-checker border-2 border-black"></div>
                  <span className="bg-[#121212] text-[#FFC700] font-mono font-extrabold text-xs px-2 py-1 uppercase border border-black">
                    ZURA FAST PASS
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-2xl font-display font-black text-[#121212] uppercase mb-1">
                  EXPRESS ORDER HUB
                </h3>
                <p className="text-xs font-semibold text-neutral-800 mb-4">
                  Sistem checkout otomatis dengan timer respon & bukti transaksi digital
                </p>

                {/* Inner White Display Box */}
                <div className="bg-white border-[3px] border-[#121212] p-4 mb-4 shadow-[4px_4px_0px_#121212]">
                  
                  {/* Status row */}
                  <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-2 mb-3">
                    <span className="text-xs font-mono font-bold text-neutral-500 uppercase">Status CS Admin</span>
                    <span className={`text-xs font-extrabold font-mono uppercase px-2 py-0.5 border border-black ${
                      adminStatus === 'online' ? 'bg-green-300 text-green-950' : 'bg-red-300 text-red-950'
                    }`}>
                      {adminStatus === 'online' ? 'ONLINE (READY)' : 'OFFLINE (WA STANDBY)'}
                    </span>
                  </div>

                  {/* 10 Minute Guarantee Box */}
                  <div className="bg-[#FAF8F2] border-2 border-[#121212] p-3 mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-[#FF5900]" />
                      <span className="text-xs font-bold uppercase font-mono">Mekanisme Waktu 10 Menit</span>
                    </div>
                    <div className="w-full bg-neutral-200 h-2 border border-black mb-2 overflow-hidden">
                      <div className="bg-[#FF5900] h-full w-3/4 animate-pulse"></div>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-snug">
                      Setelah checkout, sistem menghitung mundur 10 menit. Jika admin belum memproses di web, tombol chat WhatsApp langsung aktif dengan <strong>Kode Checkout Anda</strong>.
                    </p>
                  </div>

                  {/* Dual payment preview */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs font-bold">
                    <div className="border-2 border-black p-2 bg-[#FFF3B0] flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1.5 font-black text-neutral-900">
                        <CreditCard className="w-3.5 h-3.5 text-neutral-800" />
                        <span>Bayar di Web</span>
                      </div>
                      <span className="block text-[10px] font-normal text-neutral-600 mt-0.5">Transfer / QRIS</span>
                    </div>
                    <div className="border-2 border-black p-2 bg-emerald-100 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-1.5 font-black text-emerald-950">
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Bayar via WA</span>
                      </div>
                      <span className="block text-[10px] font-normal text-neutral-600 mt-0.5">Kirim Kode Order</span>
                    </div>
                  </div>

                </div>

                {/* Bottom Hazard Stripe Bar */}
                <div className="h-6 w-full bg-hazard-stripes border-[2px] border-[#121212]"></div>

                {/* Bottom caption */}
                <div className="mt-3 flex items-center justify-between text-xs font-mono font-black uppercase">
                  <span>SMART SYSTEM</span>
                  <span>100% VERIFIED</span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
