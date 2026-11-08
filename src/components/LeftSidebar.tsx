import React from 'react';
import {
  ShieldCheck,
  Clock,
  QrCode,
  CheckCircle2,
  ExternalLink,
  Home,
  HelpCircle
} from 'lucide-react';
import { STORE_CONFIG, buildWhatsAppOrderUrl, isWithinStoreHours } from '../data/catalog';

interface LeftSidebarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentRoute, onNavigate }) => {
  const isOpen = isWithinStoreHours();

  return (
    <aside className="w-full lg:w-[380px] xl:w-[410px] shrink-0">
      <div className="lg:sticky lg:top-6 space-y-4">
        {/* Main Profile & Banner Card (Pure White & Crimson Red) */}
        <div className="bg-white rounded-3xl border-2 border-neutral-200 shadow-sm overflow-hidden">
          {/* Top Crimson Banner Image */}
          <div className="kazura-banner-frame relative border-b-2 border-[#7A0B0B]">
            <img
              src={STORE_CONFIG.bannerUrl}
              alt="Banner Resmi Toko Kazura"
              className="w-full h-auto object-cover block"
            />
            {/* Status Jam Operasional Badge Overlay */}
            <div className="absolute top-3 right-3">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide shadow-md bg-white border ${
                  isOpen
                    ? 'text-[#15803D] border-emerald-300'
                    : 'text-[#991B1B] border-neutral-300'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-[#DC2626]'
                  }`}
                />
                <span>{isOpen ? 'TOKO BUKA' : 'ANTREAN 24 JAM'}</span>
              </div>
            </div>
          </div>

          {/* Store Identity & Short Explanation */}
          <div className="p-5 sm:p-6 space-y-5">
            {/* Official Store Avatar Logo + Title & Verified Badge */}
            <div className="space-y-3">
              <div className="flex items-center gap-3.5">
                <img
                  src={STORE_CONFIG.logoUrl}
                  alt="Logo Resmi Toko Kazura"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-[#7A0B0B] shadow-sm shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" />
                      OFFICIAL ZURA STORE
                    </span>
                  </div>
                  <h1 className="font-display font-black text-xl sm:text-2xl tracking-tight text-neutral-900 mt-1 truncate">
                    {STORE_CONFIG.storeName}
                  </h1>
                  <span className="text-[11px] font-mono font-semibold text-neutral-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3 text-[#991B1B]" />
                    Jam Buka: {STORE_CONFIG.storeHours.label}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                {STORE_CONFIG.shortBio}
              </p>
            </div>

            {/* Key Value Pills (Pure White & Neutral Gray with Crimson text) */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-center">
                <p className="text-[11px] font-extrabold text-[#7A0B0B] leading-tight">100% Manual</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">Handplay Aman</p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-center">
                <p className="text-[11px] font-extrabold text-[#7A0B0B] leading-tight">Full Garansi</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">Akun Private</p>
              </div>
              <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-center">
                <p className="text-[11px] font-extrabold text-[#7A0B0B] leading-tight">QRIS Resmi</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">All E-Wallet</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200" />

            {/* Direct Order Section: WhatsApp & Discord */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-800">
                  Order & Konsultasi Langsung
                </span>
                <span className="text-[11px] text-neutral-500 font-medium">Tanpa Login</span>
              </div>

              {/* WhatsApp Order Button */}
              <a
                href={buildWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white font-bold shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.126.556 4.124 1.535 5.86l-1.535 5.605 5.764-1.512c1.693.925 3.633 1.447 5.696 1.447 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
                    </svg>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-extrabold leading-tight">Order via WhatsApp</p>
                    <p className="text-[11px] text-emerald-100 truncate">
                      Admin Zura ({STORE_CONFIG.whatsappDisplay})
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Discord Order Button */}
              <a
                href={STORE_CONFIG.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl bg-[#7A0B0B] hover:bg-[#5C0808] text-white font-bold shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                    </svg>
                  </div>
                  <div className="text-left min-w-0">
                    <p className="text-sm font-extrabold leading-tight">Order via Discord</p>
                    <p className="text-[11px] text-red-100 truncate">
                      Buka Ticket Otomatis di Server Zura Store
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 shrink-0 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* Quick Page Switcher (Menu Utama vs Panduan Order & QRIS) */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('/')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  currentRoute === '/'
                    ? 'bg-[#7A0B0B] text-white border-[#7A0B0B]'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#991B1B] hover:text-[#991B1B]'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Menu Utama</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('/cara-order')}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  currentRoute === '/cara-order'
                    ? 'bg-[#7A0B0B] text-white border-[#7A0B0B]'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-[#991B1B] hover:text-[#991B1B]'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QRIS & Cara Order</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Info Card: Payment & Security Info */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#7A0B0B] flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold text-neutral-900 truncate">
                QRIS Resmi: {STORE_CONFIG.paymentInfo.merchant}
              </p>
              <p className="text-[11px] text-neutral-500 truncate">
                NMID: {STORE_CONFIG.paymentInfo.nmid}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('/cara-order')}
            className="px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#7A0B0B] text-neutral-800 hover:text-white font-bold text-xs shrink-0 transition cursor-pointer flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Cek</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
