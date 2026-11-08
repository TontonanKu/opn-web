import React, { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Award
} from 'lucide-react';
import {
  STORE_CONFIG,
  TESTIMONIALS,
  TESTIMONIAL_STATS
} from '../data/catalog';
import { BrandIcon } from '../components/BrandIcon';

interface TestimonialPageProps {
  groupKey?: string | null;
  onNavigate: (route: string) => void;
}

interface TestiGroupMeta {
  key: 'wuwa' | 'roblox' | 'discord' | 'mm';
  iconId: string;
  name: string;
  tag: string;
  short: string;
}

const TESTI_GROUPS: TestiGroupMeta[] = [
  {
    key: 'wuwa',
    iconId: 'wuwa',
    name: 'Testimoni Wuthering Waves',
    tag: '100% HANDPLAY MANUAL',
    short: 'Bukti selesainya order Farm Astrites, Rawat Akun, Exploration 100%, dan Joki Quest.'
  },
  {
    key: 'roblox',
    iconId: 'roblox',
    name: 'Testimoni Joki & Trade Roblox',
    tag: 'PROSES CEPAT & AMAN',
    short: 'Bukti transaksi Joki Roblox, Trade Item/Pet via Private Server, dan Top Up.'
  },
  {
    key: 'discord',
    iconId: 'discord',
    name: 'Testimoni Discord & Produk Digital',
    tag: 'FULL AKSES & BERGARANSI',
    short: 'Bukti transaksi layanan Discord, Server Boost, dan Produk Digital Resmi.'
  },
  {
    key: 'mm',
    iconId: 'mm',
    name: 'Testimoni Jasa Middleman (MM)',
    tag: 'REKBER RESMI OWNER',
    short: 'Bukti transaksi jual-beli aman menggunakan Jasa Middleman / Rekber Resmi Toko Kazura.'
  }
];

export const TestimonialPage: React.FC<TestimonialPageProps> = ({ groupKey, onNavigate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const selectedGroupMeta = groupKey
    ? TESTI_GROUPS.find(g => g.key === groupKey.toLowerCase()) || null
    : null;

  // =========================================================================
  // HALAMAN DETAIL BUKTI PER KATEGORI: #/testimoni/wuwa, #/testimoni/roblox, dll
  // =========================================================================
  if (selectedGroupMeta) {
    const items = TESTIMONIALS.filter(t => t.filterGroup === selectedGroupMeta.key);
    const currentIdx = TESTI_GROUPS.findIndex(g => g.key === selectedGroupMeta.key);
    const prevGroup = currentIdx > 0 ? TESTI_GROUPS[currentIdx - 1] : null;
    const nextGroup = currentIdx < TESTI_GROUPS.length - 1 ? TESTI_GROUPS[currentIdx + 1] : null;

    return (
      <div className="space-y-5">
        {/* Top Back & Breadcrumb Bar */}
        <div className="bg-white rounded-2xl border border-neutral-200 px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onNavigate('/testimoni')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-[#7A0B0B] text-neutral-800 hover:text-white font-extrabold text-xs transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Testimoni</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 overflow-x-auto">
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="hover:text-[#991B1B] cursor-pointer"
            >
              Menu Utama
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <button
              type="button"
              onClick={() => onNavigate('/testimoni')}
              className="hover:text-[#991B1B] cursor-pointer"
            >
              Testimoni
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="font-extrabold text-[#7A0B0B] truncate">
              {selectedGroupMeta.name}
            </span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-[#7A0B0B] via-[#8B1111] to-[#5C0808] rounded-3xl p-6 sm:p-7 text-white shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <BrandIcon
                id={selectedGroupMeta.iconId}
                size="xl"
                className="border-white/25 bg-white/10"
              />
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 text-red-100 text-[11px] font-extrabold uppercase tracking-wider">
                  <span>{selectedGroupMeta.tag}</span>
                  <span>•</span>
                  <span>{items.length} Bukti Screenshot</span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {selectedGroupMeta.name}
                </h1>
                <p className="text-xs sm:text-sm text-red-100/90">{selectedGroupMeta.short}</p>
              </div>
            </div>

            <a
              href={STORE_CONFIG.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-2xl bg-white text-[#7A0B0B] hover:bg-neutral-100 font-extrabold text-xs inline-flex items-center gap-1.5 shrink-0 w-fit transition shadow-sm"
            >
              <span>Cek #testimoni Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Proof Cards Grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map(item => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-3xl border-2 border-neutral-200 hover:border-[#991B1B] bg-white overflow-hidden flex flex-col justify-between transition shadow-sm"
              >
                <div>
                  {/* Screenshot Proof Frame */}
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    className="relative bg-neutral-900 border-b border-neutral-200 cursor-pointer group overflow-hidden"
                  >
                    <img
                      src={item.screenshotUrl}
                      alt={`Bukti Testimoni ${item.customerName}`}
                      loading="lazy"
                      className={`w-full transition-all duration-300 ${
                        isExpanded
                          ? 'max-h-[560px] object-contain bg-neutral-950'
                          : 'h-52 object-cover object-top group-hover:scale-[1.02]'
                      }`}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                        {item.serviceCategory}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-white/95 text-[#7A0B0B] font-mono font-extrabold text-xs shadow">
                        {item.amount}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 text-white text-[10px] font-bold">
                        <ImageIcon className="w-3 h-3" />
                        <span>{isExpanded ? 'Kecilkan Gambar' : 'Klik Perbesar Bukti'}</span>
                      </span>
                    </div>
                  </div>

                  {/* Customer Info & Chat Quote */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                        <p className="font-display font-black text-sm sm:text-base text-neutral-900 truncate">
                          {item.customerName}
                        </p>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs font-bold text-[#7A0B0B] bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2.5 italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>

                    <p className="text-xs text-neutral-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500 font-mono">
                  <span>#{item.orderCode}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Prev / Next Navigation */}
        <div className="grid sm:grid-cols-2 gap-3 pt-1">
          {prevGroup ? (
            <button
              type="button"
              onClick={() => onNavigate(`/testimoni/${prevGroup.key}`)}
              className="bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-[#991B1B] rounded-2xl p-4 text-left flex items-center gap-3 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-[#991B1B] shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Sebelumnya
                </p>
                <p className="font-display font-black text-sm text-neutral-900">{prevGroup.name}</p>
              </div>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('/testimoni')}
              className="bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-[#991B1B] rounded-2xl p-4 text-left flex items-center gap-3 transition cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-[#991B1B] shrink-0" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Kembali ke Daftar
                </p>
                <p className="font-display font-black text-sm text-neutral-900">
                  Semua Kategori Testimoni
                </p>
              </div>
            </button>
          )}

          {nextGroup && (
            <button
              type="button"
              onClick={() => onNavigate(`/testimoni/${nextGroup.key}`)}
              className="bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-[#991B1B] rounded-2xl p-4 text-right flex items-center justify-end gap-3 transition cursor-pointer"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Berikutnya
                </p>
                <p className="font-display font-black text-sm text-neutral-900">{nextGroup.name}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-[#991B1B] shrink-0" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // HALAMAN SUB-MENU #/testimoni (SAMA PERSIS SEPERTI #/joki-game & #/produk)
  // =========================================================================
  return (
    <div className="space-y-5">
      {/* Top Back Navigation Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 px-4 py-3 shadow-sm flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-[#7A0B0B] text-neutral-800 hover:text-white font-extrabold text-xs transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Menu Utama</span>
        </button>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="hover:text-[#991B1B] cursor-pointer"
          >
            Menu Utama
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="font-extrabold text-[#7A0B0B]">Testimoni Pembeli</span>
        </div>
      </div>

      {/* Page Title Banner (Crimson Red & Pure White) */}
      <div className="bg-gradient-to-r from-[#7A0B0B] via-[#8B1111] to-[#5C0808] rounded-3xl p-6 sm:p-7 text-white shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-200">
                {TESTIMONIAL_STATS.totalDiscordTx}+ TRANSAKSI TERVERIFIKASI • RATING {TESTIMONIAL_STATS.averageRating}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                Pilih Kategori Testimoni
              </h2>
              <p className="text-xs sm:text-sm text-red-100 mt-0.5">
                Klik salah satu kategori di bawah untuk melihat halaman bukti screenshot transaksi asli
              </p>
            </div>
          </div>

          <a
            href={STORE_CONFIG.discordInviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-2xl bg-white text-[#7A0B0B] hover:bg-neutral-100 font-extrabold text-xs inline-flex items-center gap-1.5 shrink-0 w-fit transition shadow-sm"
          >
            <span>Cek #testimoni Discord</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Linktree Cards for Each Testimonial Category (Matching #/joki-game & #/produk) */}
      <div className="space-y-3.5">
        {TESTI_GROUPS.map(group => {
          const items = TESTIMONIALS.filter(t => t.filterGroup === group.key);
          return (
            <button
              key={group.key}
              type="button"
              onClick={() => onNavigate(`/testimoni/${group.key}`)}
              className="w-full bg-white hover:bg-neutral-50 rounded-3xl border-2 border-neutral-200 hover:border-[#991B1B] p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md cursor-pointer group"
            >
              <div className="flex items-start sm:items-center gap-4">
                <BrandIcon id={group.iconId} size="lg" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                      {group.tag}
                    </span>
                    <span className="text-xs font-semibold text-neutral-500">
                      {items.length} Bukti Screenshot • ⭐ 5.0
                    </span>
                  </div>
                  <h3 className="font-display font-black text-xl text-neutral-900 group-hover:text-[#991B1B] transition-colors">
                    {group.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600">{group.short}</p>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
                <div className="text-left sm:text-right">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Status Bukti
                  </p>
                  <p className="font-mono font-extrabold text-sm sm:text-base text-[#16A34A] flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>100% Real QRIS</span>
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A0B0B] group-hover:bg-[#991B1B] text-white font-extrabold text-xs transition">
                  <span>Lihat Bukti</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
