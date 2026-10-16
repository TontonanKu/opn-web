import React from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CONFIG } from '../data/initialData';
import { 
  Gamepad2, 
  Smartphone, 
  Palette, 
  MessageSquare, 
  ShieldCheck, 
  Clock, 
  ArrowUp,
  Heart,
  Crown
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setViewMode, setActiveModal, user } = useApp();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121212] text-white border-t-[3px] border-black">
      
      {/* Top Hazard Banner Ribbon */}
      <div className="h-6 w-full bg-hazard-stripes border-b-2 border-black"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#FFC700] text-black border-2 border-white flex items-center justify-center font-display font-black text-2xl">
                Z
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                ZURA STORE
              </span>
              <span className="bg-[#FF5900] text-white text-[10px] font-mono font-bold px-1.5 py-0.5 uppercase">
                EST. 2025
              </span>
            </div>

            <p className="text-xs text-neutral-400 font-sans leading-relaxed max-w-sm">
              Platform layanan digital express untuk Jasa Joki Game Rank Pro, Aplikasi Premium Bergaransi, dan Portofolio Kreasi AI & Desain Grafis Manual.
            </p>

            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-6 bg-checker"></div>
              <span className="font-mono text-xs text-[#FFC700] font-bold uppercase tracking-wider">
                SPEED. SECURITY. ZERO PAYMENT GATEWAY FUSS.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-[#FFC700] mb-3">
              Katalog Layanan
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-neutral-300">
              <li>
                <a href="#joki" className="hover:text-[#FFC700] transition-colors flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5 text-[#FF5900]" />
                  Joki Mobile Legends, Valorant & HoK
                </a>
              </li>
              <li>
                <a href="#aplikasi" className="hover:text-[#FFC700] transition-colors flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#FF5900]" />
                  Netflix 4K, Spotify & ChatGPT Plus
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-[#FFC700] transition-colors flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#FF5900]" />
                  Karya AI Prompting & Desain Grafis
                </a>
              </li>
              <li>
                <a href="#testimoni" className="hover:text-[#FFC700] transition-colors flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-[#FF5900]" />
                  Struk Transaksi & Testimoni WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Contact and Rules */}
          <div className="lg:col-span-4">
            <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-[#FFC700] mb-3">
              Informasi Pemesanan
            </h4>
            <div className="bg-neutral-900 border border-neutral-700 p-3 text-xs space-y-2 font-mono">
              <div className="flex items-center gap-2 text-neutral-300">
                <Clock className="w-4 h-4 text-[#FFC700]" />
                <span>Aturan 10 Menit: Hubungi WA jika lewat batas waktu respon web</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-[#FF5900]" />
                <span>Garansi Akun Aman & Privasi Terjaga</span>
              </div>
              <div className="pt-2 border-t border-neutral-800">
                <a
                  href={`https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=Halo%20Admin%20Zura%20Store!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] text-black font-bold py-2 px-3 flex items-center justify-center gap-1.5 hover:bg-[#1EBE5D] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat WhatsApp Resmi (+{ADMIN_CONFIG.whatsappNumber})</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Scroll To Top */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-3 flex-wrap">
            <span>© {new Date().getFullYear()} ZURA STORE (Est. 2025 • Official Web 2026).</span>
            <button
              type="button"
              onClick={() => setActiveModal('terms')}
              className="text-neutral-400 hover:text-[#FFC700] underline"
            >
              Ketentuan Garansi & Privasi
            </button>
            <span className="text-neutral-700">|</span>
            <button
              type="button"
              onClick={() => {
                if (user?.role === 'admin') {
                  setViewMode('admin-dashboard');
                } else {
                  setViewMode('admin-login');
                }
              }}
              className="text-neutral-400 hover:text-[#FFC700] flex items-center gap-1.5 underline transition-colors"
              title="Akses Portal Administrator Toko"
            >
              <Crown className="w-3.5 h-3.5 text-[#FFC700]" />
              <span>{user?.role === 'admin' ? 'Buka Panel Admin' : 'Akses Portal Admin'}</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-[#FFC700] border border-neutral-700 px-3 py-1 font-bold"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
