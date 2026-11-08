import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  Gamepad2,
  Package,
  X,
  ArrowLeft,
  Award,
  Star
} from 'lucide-react';
import {
  CATEGORIES,
  STORE_CONFIG,
  TESTIMONIALS,
  TESTIMONIAL_STATS,
  formatRupiah,
  formatItemPrice,
  getCategoryMinPrice,
  getCategoryItemCount
} from '../data/catalog';
import { BrandIcon } from '../components/BrandIcon';

interface HomePageProps {
  mode?: 'root' | 'joki' | 'produk';
  onNavigate: (route: string) => void;
}

function parseBudgetInput(text: string): number {
  const clean = String(text || '')
    .toLowerCase()
    .replace(/rp\.?/g, '')
    .replace(/\s+/g, '');
  const match = clean.match(/^(\d+(?:[.,]\d+)*)(k|rb|ribu|jt|juta)?$/);
  if (!match) return 0;
  const [, digits, suffix] = match;
  if (suffix) {
    return Math.round(
      Number(digits.replace(',', '.')) * (suffix === 'jt' || suffix === 'juta' ? 1000000 : 1000)
    );
  }
  const value = Number(digits.replace(/[.,]/g, ''));
  return value > 0 && value < 1000 ? value * 1000 : value;
}

export const HomePage: React.FC<HomePageProps> = ({ mode = 'root', onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const jokiCategories = useMemo(
    () => CATEGORIES.filter(c => c.type === 'joki'),
    []
  );
  const produkCategories = useMemo(
    () => CATEGORIES.filter(c => c.type === 'produk'),
    []
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const budget = parseBudgetInput(q);
    const words = budget ? [] : q.split(/\s+/).filter(Boolean);

    const allRows = CATEGORIES.flatMap(category =>
      category.sections.flatMap(section =>
        section.items.map(item => ({
          category,
          section,
          item,
          priceText: formatItemPrice(item),
          haystack: [
            category.key,
            category.name,
            category.title,
            section.title,
            section.via || '',
            item.label,
            item.name || '',
            ...(item.aliases || [])
          ]
            .join(' ')
            .toLowerCase()
        }))
      )
    );

    return allRows
      .filter(r => (budget ? r.item.price <= budget : words.every(w => r.haystack.includes(w))))
      .sort((a, b) => (budget ? b.item.price - a.item.price : a.item.price - b.item.price))
      .slice(0, 16);
  }, [searchQuery]);

  // =========================================================================
  // HALAMAN SUB-MENU: #/joki-game ATAU #/produk (Setelah salah satu diklik)
  // =========================================================================
  if (mode === 'joki' || mode === 'produk') {
    const isJoki = mode === 'joki';
    const list = isJoki ? jokiCategories : produkCategories;

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
            <span className="font-extrabold text-[#7A0B0B]">
              {isJoki ? 'Joki Game' : 'Produk Digital'}
            </span>
          </div>
        </div>

        {/* Page Title Banner (Crimson Red & Pure White) */}
        <div className="bg-gradient-to-r from-[#7A0B0B] via-[#8B1111] to-[#5C0808] rounded-3xl p-6 sm:p-7 text-white shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
              {isJoki ? <Gamepad2 className="w-6 h-6 text-white" /> : <Package className="w-6 h-6 text-white" />}
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-200">
                {isJoki ? 'Daftar Game yang Tersedia' : 'Daftar Produk & Layanan Resmi'}
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
                {isJoki ? 'Pilih Joki Game' : 'Pilih Kategori Produk'}
              </h2>
              <p className="text-xs sm:text-sm text-red-100 mt-0.5">
                {isJoki
                  ? 'Klik game di bawah untuk membuka halaman Pricelist lengkapnya'
                  : 'Klik produk di bawah untuk membuka halaman Pricelist lengkapnya'}
              </p>
            </div>
          </div>
        </div>

        {/* Linktree Cards for Each Game or Product Category */}
        <div className="space-y-3.5">
          {list.map(category => {
            const minPrice = getCategoryMinPrice(category);
            const totalPackages = getCategoryItemCount(category);

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => onNavigate(`/kategori/${category.key}`)}
                className="w-full bg-white hover:bg-neutral-50 rounded-3xl border-2 border-neutral-200 hover:border-[#991B1B] p-5 sm:p-6 text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <BrandIcon
                    id={category.key}
                    imageUrl={category.iconImage}
                    fallbackEmoji={category.icon}
                    size="lg"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                        {category.tag}
                      </span>
                      <span className="text-xs font-semibold text-neutral-500">
                        {category.sections.length} {category.menuNoun} • {totalPackages} Paket
                      </span>
                    </div>
                    <h3 className="font-display font-black text-xl text-neutral-900 group-hover:text-[#991B1B] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600">{category.short}</p>
                    {/* Preview Mini Icons for Sections inside Category */}
                    <div className="flex items-center flex-wrap gap-1.5 pt-1.5">
                      {(category.groups && category.groups.length > 0
                        ? category.groups
                        : category.sections
                      ).map(sub => (
                        <span
                          key={sub.id}
                          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-[11px] font-bold text-neutral-700"
                        >
                          <BrandIcon
                            id={sub.id}
                            imageUrl={sub.iconImage}
                            fallbackEmoji={sub.icon}
                            size="xs"
                          />
                          <span>{sub.title}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
                  <div className="text-left sm:text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                      {category.priceWord ? category.priceWord : 'Harga Mulai'}
                    </p>
                    <p className="font-mono font-extrabold text-base sm:text-lg text-[#991B1B]">
                      {formatRupiah(minPrice)}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#7A0B0B] group-hover:bg-[#991B1B] text-white font-extrabold text-xs transition">
                    <span>Lihat Pricelist</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // =========================================================================
  // TAMPILAN AWAL (ROOT #/): HANYA MUNCUL 2 KATEGORI UTAMA (JOKI GAME & PRODUK)
  // =========================================================================
  const totalJokiPackages = jokiCategories.reduce((sum, c) => sum + getCategoryItemCount(c), 0);
  const minJokiPrice = Math.min(...jokiCategories.map(c => getCategoryMinPrice(c)));

  const totalProdukPackages = produkCategories.reduce((sum, c) => sum + getCategoryItemCount(c), 0);
  const minProdukPrice = Math.min(...produkCategories.map(c => getCategoryMinPrice(c)));

  return (
    <div className="space-y-5">
      {/* Header & Search Box (Pure White & Crimson Red) */}
      <div className="bg-white rounded-3xl border-2 border-neutral-200 p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3.5">
          <img
            src={STORE_CONFIG.logoUrl}
            alt={STORE_CONFIG.storeName}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-[#7A0B0B] shadow-sm shrink-0"
          />
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
              KATALOG RESMI TOKO KAZURA
            </span>
            <h2 className="font-display font-black text-xl sm:text-2xl text-neutral-900 mt-1">
              Pilih Kategori Layanan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500">
              Klik salah satu kategori di bawah untuk melihat daftar game atau produk yang tersedia.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Cari cepat paket joki / aplikasi / ketik budget (misal: 50rb)..."
            className="w-full pl-11 pr-10 py-3 rounded-2xl bg-neutral-50 border border-neutral-200 focus:border-[#991B1B] focus:bg-white text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#991B1B] p-1 cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Live Search Results (If user types in search box) */}
      {searchQuery.trim() !== '' && (
        <div className="bg-white rounded-3xl border-2 border-[#991B1B] p-5 sm:p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-black text-base sm:text-lg text-neutral-900">
                🔎 Hasil Pencarian Katalog
              </h3>
              <p className="text-xs text-neutral-500">
                {parseBudgetInput(searchQuery) > 0
                  ? `Menampilkan paket dengan harga maksimal ${formatRupiah(parseBudgetInput(searchQuery))}`
                  : `Kata kunci "${searchQuery}" (${searchResults.length} paket ditemukan)`}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-[#991B1B] hover:underline cursor-pointer"
            >
              Tutup
            </button>
          </div>

          {searchResults.length === 0 ? (
            <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-1">
              <p className="text-sm font-bold text-neutral-900">Paket tidak ditemukan</p>
              <p className="text-xs text-neutral-500">
                Coba kata kunci lain atau tanyakan langsung ke Admin via WhatsApp / Discord di samping.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-2.5">
              {searchResults.map(({ category, section, item, priceText }) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onNavigate(`/layanan/${category.key}/${section.id}?paket=${item.id}`)}
                  className="kazura-card kazura-card-interactive p-3.5 rounded-2xl text-left flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <BrandIcon
                      id={section.id}
                      imageUrl={section.iconImage || category.iconImage}
                      fallbackEmoji={section.icon}
                      size="sm"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-neutral-900 truncate">
                        {item.label} {item.badge && <span>{item.badge}</span>}
                      </p>
                      <p className="text-[11px] text-neutral-500 truncate">
                        {category.name} • {section.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-[#991B1B] font-mono font-extrabold text-xs">
                      {priceText}
                    </span>
                    <ChevronRight className="w-4 h-4 text-[#991B1B]" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ============================================================
          2 KATEGORI UTAMA LINKTREE: 1. JOKI GAME  |  2. PRODUK
         ============================================================ */}
      <div className="space-y-4">
        {/* KATEGORI 1: JOKI GAME */}
        <button
          type="button"
          onClick={() => onNavigate('/joki-game')}
          className="w-full bg-white hover:bg-neutral-50 rounded-3xl border-2 border-neutral-200 hover:border-[#991B1B] p-6 sm:p-7 text-left transition-all shadow-sm hover:shadow-md cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#7A0B0B] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Gamepad2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    100% HANDPLAY MANUAL
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    {jokiCategories.length} Game • {totalJokiPackages} Paket
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 group-hover:text-[#991B1B] transition-colors">
                  Joki Game
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl">
                  Pricelist Joki <strong>Wuthering Waves</strong> (Farm Astrites, Rawat Akun, Explore 100%, Quest) & <strong>Roblox</strong> (Anime Adventures & Anime Vanguards).
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {jokiCategories.map(c => (
                    <span
                      key={c.key}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-bold"
                    >
                      <BrandIcon id={c.key} imageUrl={c.iconImage} fallbackEmoji={c.icon} size="xs" />
                      <span>{c.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Mulai Dari
                </p>
                <p className="font-mono font-black text-lg sm:text-xl text-[#991B1B]">
                  {formatRupiah(minJokiPrice)}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7A0B0B] group-hover:bg-[#991B1B] text-white font-extrabold text-xs sm:text-sm transition">
                <span>Buka Joki Game</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </button>

        {/* KATEGORI 2: PRODUK & LAYANAN DIGITAL */}
        <button
          type="button"
          onClick={() => onNavigate('/produk')}
          className="w-full bg-white hover:bg-neutral-50 rounded-3xl border-2 border-neutral-200 hover:border-[#991B1B] p-6 sm:p-7 text-left transition-all shadow-sm hover:shadow-md cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#7A0B0B] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Package className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    PRIVATE & BERGARANSI
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    {produkCategories.length} Kategori • {totalProdukPackages} Paket
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 group-hover:text-[#991B1B] transition-colors">
                  Produk Digital
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl">
                  Pricelist <strong>Aplikasi Premium</strong> (Netflix, Spotify, YouTube, Canva, CapCut, Adobe, Duolingo, iLovePDF), <strong>Kebutuhan Discord</strong> (Acc Old & Boost), dan <strong>Jasa Middleman / Rekber</strong>.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {produkCategories.map(c => (
                    <span
                      key={c.key}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-bold"
                    >
                      <BrandIcon id={c.key} imageUrl={c.iconImage} fallbackEmoji={c.icon} size="xs" />
                      <span>{c.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Mulai Dari
                </p>
                <p className="font-mono font-black text-lg sm:text-xl text-[#991B1B]">
                  {formatRupiah(minProdukPrice)}
                </p>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7A0B0B] group-hover:bg-[#991B1B] text-white font-extrabold text-xs sm:text-sm transition">
                <span>Buka Produk</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </button>

        {/* KATEGORI 3: BUKTI TESTIMONI PEMBELI (MODEL LINKTREE SAMA SEPERTI JOKI GAME & PRODUK DIGITAL) */}
        <button
          type="button"
          onClick={() => onNavigate('/testimoni')}
          className="w-full bg-white hover:bg-neutral-50 rounded-3xl border-2 border-neutral-200 hover:border-[#991B1B] p-6 sm:p-7 text-left transition-all shadow-sm hover:shadow-md cursor-pointer group"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#7A0B0B] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                    100% REAL TESTIMONI & QRIS
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    {TESTIMONIAL_STATS.totalDiscordTx}+ Transaksi • {TESTIMONIALS.length} Bukti Screenshot
                  </span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 group-hover:text-[#991B1B] transition-colors">
                  Testimoni Pembeli
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xl">
                  Cek kumpulan bukti <em>screenshot</em> chat & pembayaran QRIS asli pelanggan untuk <strong>Joki Wuthering Waves</strong>, <strong>Joki & Trade Roblox</strong>, <strong>Layanan Discord</strong>, dan <strong>Jasa Middleman</strong>.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { id: 'wuwa', label: 'Testimoni WuWa' },
                    { id: 'roblox', label: 'Testimoni Roblox' },
                    { id: 'discord', label: 'Testimoni Discord' },
                    { id: 'mm', label: 'Testimoni Middleman' }
                  ].map(pill => (
                    <span
                      key={pill.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-800 text-xs font-bold"
                    >
                      <BrandIcon id={pill.id} size="xs" />
                      <span>{pill.label}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-neutral-100 shrink-0">
              <div className="text-left sm:text-right">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Rating Kepuasan
                </p>
                <p className="font-mono font-black text-lg sm:text-xl text-[#991B1B] inline-flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{TESTIMONIAL_STATS.averageRating}</span>
                </p>
              </div>

              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#7A0B0B] group-hover:bg-[#991B1B] text-white font-extrabold text-xs sm:text-sm transition">
                <span>Buka Testimoni</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
