import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  ClipboardList,
  ArrowRight,
  Search,
  X,
  Sparkles
} from 'lucide-react';
import {
  CATEGORIES,
  CatalogCategory,
  CatalogItem,
  CatalogSection,
  STORE_CONFIG,
  formatRupiah,
  formatItemPrice,
  getCategoryMinPrice,
  getCategoryItemCount,
  buildWhatsAppOrderUrl
} from '../data/catalog';
import { BrandIcon } from '../components/BrandIcon';

interface CategoryPageProps {
  category: CatalogCategory;
  onNavigate: (route: string) => void;
}

const SEARCH_PLACEHOLDERS: Record<string, string> = {
  roblox: 'Cari paket / unit di Joki Roblox (contoh: hero, summer, afk, gems, rukia)...',
  wuwa: 'Cari layanan di Wuthering Waves (contoh: astrites, rawat, rinascita, quest)...',
  apps: 'Cari aplikasi premium (contoh: netflix, gacha, spotify, canva, capcut)...',
  discord: 'Cari layanan Discord (contoh: 2017, 2020, boost 14x, level 3)...',
  mm: 'Cari nominal transaksi rekber...'
};

export const CategoryPage: React.FC<CategoryPageProps> = ({ category, onNavigate }) => {
  const [selectedGroup, setSelectedGroup] = useState<string>(
    category.groups && category.groups.length > 0 ? category.groups[0].id : 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMatchItemId, setActiveMatchItemId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedGroup(category.groups && category.groups.length > 0 ? category.groups[0].id : 'all');
    setSearchQuery('');
    setActiveMatchItemId(null);
  }, [category.key]);

  const sectionsForGroup = useMemo(
    () =>
      category.groups
        ? category.sections.filter(s => s.group === selectedGroup)
        : category.sections,
    [category, selectedGroup]
  );

  // Compute all matches inside this category/group for quick-scroll & highlighting
  const matchedEntries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const words = q.split(/\s+/).filter(Boolean);

    const results: {
      section: CatalogSection;
      item: CatalogItem;
    }[] = [];

    for (const section of sectionsForGroup) {
      for (const item of section.items) {
        const haystack = [
          section.title,
          section.productName,
          section.via || '',
          item.label,
          item.name || '',
          ...(item.aliases || [])
        ]
          .join(' ')
          .toLowerCase();

        if (words.every(w => haystack.includes(w))) {
          results.push({ section, item });
        }
      }
    }

    return results;
  }, [searchQuery, sectionsForGroup]);

  const matchedItemIdSet = useMemo(
    () => new Set(matchedEntries.map(m => m.item.id)),
    [matchedEntries]
  );

  const scrollToItem = useCallback((itemId: string, sectionId?: string) => {
    setActiveMatchItemId(itemId);
    const itemEl = document.getElementById(`cat-item-${itemId}`);
    if (itemEl) {
      itemEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (sectionId) {
      const secEl = document.getElementById(`cat-section-${sectionId}`);
      if (secEl) {
        secEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, []);

  // Automatically scroll to the first matched item when the user types a search query
  useEffect(() => {
    if (matchedEntries.length === 0) {
      setActiveMatchItemId(null);
      return;
    }
    const first = matchedEntries[0];
    const timer = window.setTimeout(() => {
      scrollToItem(first.item.id, first.section.id);
    }, 240);
    return () => window.clearTimeout(timer);
  }, [matchedEntries, scrollToItem]);

  const parentRoute = category.type === 'joki' ? '/joki-game' : '/produk';
  const parentLabel = category.type === 'joki' ? 'Joki Game' : 'Produk Digital';

  const sameTypeCategories = CATEGORIES.filter(c => c.type === category.type);
  const currentIdx = sameTypeCategories.findIndex(c => c.key === category.key);
  const prevCat = currentIdx > 0 ? sameTypeCategories[currentIdx - 1] : null;
  const nextCat = currentIdx < sameTypeCategories.length - 1 ? sameTypeCategories[currentIdx + 1] : null;

  return (
    <div className="space-y-5">
      {/* Top Breadcrumb & Back Navigation Bar */}
      <div className="bg-white rounded-2xl border border-neutral-200 px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate(parentRoute)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-[#7A0B0B] text-neutral-800 hover:text-white font-extrabold text-xs transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke {parentLabel}</span>
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
            onClick={() => onNavigate(parentRoute)}
            className="hover:text-[#991B1B] cursor-pointer"
          >
            {parentLabel}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="font-extrabold text-[#7A0B0B] truncate">{category.name}</span>
        </div>
      </div>

      {/* Category Hero Header (Crimson Red & Pure White) */}
      <div className="bg-white rounded-3xl border-2 border-neutral-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#7A0B0B] via-[#8B1111] to-[#5C0808] p-6 sm:p-7 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <BrandIcon
                id={category.key}
                imageUrl={category.iconImage}
                fallbackEmoji={category.icon}
                size="xl"
                className="border-white/25 bg-white/10"
              />
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/15 text-red-100 text-[11px] font-extrabold uppercase tracking-wider">
                  <span>{category.tag}</span>
                  <span>•</span>
                  <span>{getCategoryItemCount(category)} Paket Tersedia</span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white">
                  {category.name}
                </h1>
                <p className="text-xs sm:text-sm text-red-100/90">{category.tagline}</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-left sm:text-right shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-200">
                {category.priceWord ? category.priceWord : 'Harga Mulai'}
              </p>
              <p className="font-mono font-black text-xl sm:text-2xl text-white">
                {formatRupiah(getCategoryMinPrice(category))}
              </p>
            </div>
          </div>
        </div>

        {/* Group Switcher (For Roblox: Anime Adventures vs Anime Vanguards) */}
        {category.groups && category.groups.length > 0 && (
          <div className="px-5 pt-4 pb-3 bg-neutral-50 border-t border-neutral-200">
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-700 mb-2">
              Pilih Game {category.name}:
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5">
              {category.groups.map(group => {
                const count = category.sections.filter(s => s.group === group.id).length;
                const isSelected = selectedGroup === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => {
                      setSelectedGroup(group.id);
                      setSearchQuery('');
                      setActiveMatchItemId(null);
                    }}
                    className={`p-3.5 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#991B1B] shadow-sm'
                        : 'bg-white border-neutral-200 hover:border-[#991B1B]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <BrandIcon
                        id={group.id}
                        imageUrl={group.iconImage}
                        fallbackEmoji={group.icon}
                        size="sm"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-extrabold text-neutral-900 truncate">
                          {group.title}
                        </p>
                        <p className="text-[11px] text-neutral-500 truncate">
                          {count > 0 ? `${count} Kategori Layanan` : 'Segera Hadir / Tanya Admin'}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold ${
                        isSelected ? 'bg-[#7A0B0B] text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {isSelected ? 'Aktif' : 'Pilih'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Search & Auto-Scroll Bar (Replaces horizontal pill bar) */}
      {sectionsForGroup.length > 0 && (
        <div className="sticky top-14 lg:top-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-neutral-200 p-3.5 sm:p-4 shadow-sm space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-[#991B1B] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && matchedEntries.length > 0) {
                  scrollToItem(matchedEntries[0].item.id, matchedEntries[0].section.id);
                }
              }}
              placeholder={
                SEARCH_PLACEHOLDERS[category.key] ||
                `Cari paket / layanan di ${category.name} (langsung auto-scroll ke produk)...`
              }
              className="w-full pl-11 pr-10 py-2.5 sm:py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:border-[#991B1B] focus:bg-white text-xs sm:text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveMatchItemId(null);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#991B1B] p-1 cursor-pointer"
                title="Hapus pencarian"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Jump Results Bar when user types */}
          {searchQuery.trim() !== '' && (
            <div className="pt-1">
              {matchedEntries.length === 0 ? (
                <p className="text-xs text-[#991B1B] font-semibold px-1">
                  Produk &ldquo;{searchQuery}&rdquo; tidak ditemukan di halaman ini.
                </p>
              ) : (
                <div className="space-y-1.5">
                  <p className="text-[11px] font-bold text-neutral-500 px-1">
                    Ditemukan <span className="text-[#991B1B]">{matchedEntries.length} paket</span> — klik untuk langsung lompat ke posisi produk:
                  </p>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {matchedEntries.map(({ section, item }) => {
                      const isTarget = activeMatchItemId === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToItem(item.id, section.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                            isTarget
                              ? 'bg-[#7A0B0B] text-white border-[#7A0B0B]'
                              : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border-neutral-200 hover:border-[#991B1B]'
                          }`}
                        >
                          <span>{item.label}</span>
                          <span
                            className={`font-mono text-[11px] ${
                              isTarget ? 'text-red-200' : 'text-[#991B1B]'
                            }`}
                          >
                            ({formatItemPrice(item)})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Empty Group State (e.g., Anime Vanguards) */}
      {sectionsForGroup.length === 0 ? (
        <div className="bg-white rounded-3xl border-2 border-neutral-200 p-8 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 text-[#991B1B] flex items-center justify-center mx-auto text-2xl">
            🚧
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="font-display font-black text-xl text-neutral-900">
              Pricelist Sedang Disiapkan
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Daftar harga untuk game ini sedang disiapkan. Mau tanya atau request joki lebih dulu? Langsung hubungi Admin Zura via WhatsApp atau buka Ticket di Discord!
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={buildWhatsAppOrderUrl({
                categoryName: category.name,
                sectionTitle: 'Anime Vanguards (Request Harga)'
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs flex items-center gap-2 transition"
            >
              <span>Tanya via WhatsApp</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href={STORE_CONFIG.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#7A0B0B] hover:bg-[#5C0808] text-white font-extrabold text-xs flex items-center gap-2 transition"
            >
              <span>Buka Ticket Discord</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      ) : (
        /* Sections & Pricelist Cards */
        <div className="space-y-5">
          {sectionsForGroup.map(section => {
            const hasMatchedItemInSection = section.items.some(i => matchedItemIdSet.has(i.id));

            return (
              <div
                key={section.id}
                id={`cat-section-${section.id}`}
                className={`bg-white rounded-3xl border-2 shadow-sm overflow-hidden transition-all scroll-mt-36 ${
                  hasMatchedItemInSection
                    ? 'border-[#991B1B] ring-2 ring-[#991B1B]/15'
                    : 'border-neutral-200'
                }`}
              >
                {/* Section Header */}
                <div className="p-5 sm:p-6 bg-neutral-50 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <BrandIcon
                      id={section.id}
                      imageUrl={section.iconImage || category.iconImage}
                      fallbackEmoji={section.icon}
                      size="md"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="font-display font-black text-lg sm:text-xl text-neutral-900">
                          {section.title}
                        </h2>
                        {section.via && (
                          <span className="px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase">
                            {section.via}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{section.productName}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(`/layanan/${category.key}/${section.id}`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#7A0B0B] border border-neutral-200 hover:border-[#7A0B0B] text-neutral-800 hover:text-white font-extrabold text-xs transition cursor-pointer w-fit"
                  >
                    <span>Pilih & Order Layanan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Single-line Section Note if no detailed notesList */}
                {section.note && (!section.notesList || section.notesList.length === 0) && (
                  <div className="px-5 py-2.5 bg-neutral-100/80 border-b border-neutral-200 flex items-center gap-2 text-xs text-neutral-700 font-semibold">
                    <Info className="w-4 h-4 shrink-0 text-[#991B1B]" />
                    <span>Ketentuan: {section.note}</span>
                  </div>
                )}

                {/* Items List */}
                <div className="divide-y divide-neutral-200">
                  {section.items.map(item => {
                    const isMatched = matchedItemIdSet.has(item.id);
                    const isActiveTarget = activeMatchItemId === item.id;

                    const waUrl = buildWhatsAppOrderUrl({
                      categoryName: category.name,
                      sectionTitle: section.title,
                      item,
                      orderGuide: category.orderGuide
                    });

                    return (
                      <div
                        key={item.id}
                        id={`cat-item-${item.id}`}
                        className={`p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all scroll-mt-40 ${
                          isActiveTarget
                            ? 'bg-neutral-100 border-l-4 border-l-[#7A0B0B]'
                            : isMatched
                            ? 'bg-neutral-50 border-l-4 border-l-[#991B1B]'
                            : 'hover:bg-neutral-50/70'
                        }`}
                      >
                        <div
                          onClick={() =>
                            onNavigate(`/layanan/${category.key}/${section.id}?paket=${item.id}`)
                          }
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              isMatched ? 'bg-[#7A0B0B] scale-125' : 'bg-[#991B1B]'
                            }`}
                          />
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-[#991B1B] transition-colors">
                                {item.label}
                              </span>
                              {isMatched && (
                                <span className="px-2 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                                  Hasil Cari
                                </span>
                              )}
                              {item.badge && (
                                <span className="px-2 py-0.5 rounded-md bg-[#991B1B] text-white text-[10px] font-extrabold">
                                  {item.badge} Populer
                                </span>
                              )}
                              {item.remindDays && item.remindDays > 0 ? (
                                <span className="px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-semibold">
                                  Aktif ±{item.remindDays} hari
                                </span>
                              ) : null}
                            </div>
                            {item.name && item.name !== item.label && (
                              <p className="text-[11px] text-neutral-400">{item.name}</p>
                            )}
                          </div>
                        </div>

                        {/* Price & Order Buttons */}
                        <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
                          <span className="font-mono font-extrabold text-base sm:text-lg text-[#991B1B]">
                            {formatItemPrice(item)}
                          </span>

                          <div className="flex items-center gap-2">
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs flex items-center gap-1.5 transition shadow-sm"
                              title="Order paket ini via WhatsApp"
                            >
                              <span>Order WA</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                              href={STORE_CONFIG.discordInviteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1.5 rounded-xl bg-[#7A0B0B] hover:bg-[#5C0808] text-white font-extrabold text-xs flex items-center gap-1.5 transition shadow-sm"
                              title="Order paket ini via Ticket Discord"
                            >
                              <span>Discord</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Detailed Catatan & Keunggulan Box (e.g. for Gacha Netflix) */}
                {(section.notesList?.length || section.advantages?.length) ? (
                  <div className="p-4 sm:px-6 sm:py-5 bg-neutral-50 border-t border-neutral-200 grid sm:grid-cols-2 gap-4">
                    {section.notesList && section.notesList.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A0B0B] flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" />
                          <span>Catatan :</span>
                        </p>
                        <ul className="space-y-1 text-xs text-neutral-700">
                          {section.notesList.map((n, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#991B1B] font-bold">•</span>
                              <span>{n}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.advantages && section.advantages.length > 0 && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#7A0B0B] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Keunggulan :</span>
                        </p>
                        <ul className="space-y-1 text-xs text-neutral-700">
                          {section.advantages.map((adv, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                              <span>{adv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {/* Important Notes & Order Guide Card */}
      <div className="grid md:grid-cols-2 gap-4">
        {category.orderGuide && category.orderGuide.length > 0 && (
          <div className="bg-white rounded-3xl border-2 border-neutral-200 p-5 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-[#7A0B0B]">
              <ClipboardList className="w-5 h-5" />
              <h3 className="font-display font-black text-sm uppercase tracking-wider">
                Format Saat Order (WA / Discord)
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
              {category.orderGuide.map((guide, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                  <span>{guide}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {category.notes && category.notes.length > 0 && (
          <div className="bg-white rounded-3xl border-2 border-neutral-200 p-5 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-[#7A0B0B]">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-display font-black text-sm uppercase tracking-wider">
                Catatan Penting ({category.name})
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
              {category.notes.map((note, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#991B1B] font-bold">•</span>
                  <span className="capitalize">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Bottom Full-Page Navigation Between Categories in the Same Group */}
      <div className="grid sm:grid-cols-2 gap-3 pt-1">
        {prevCat ? (
          <button
            type="button"
            onClick={() => onNavigate(`/kategori/${prevCat.key}`)}
            className="bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-[#991B1B] rounded-2xl p-4 text-left flex items-center gap-3 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-[#991B1B] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Sebelumnya
              </p>
              <p className="font-display font-black text-sm text-neutral-900">{prevCat.name}</p>
            </div>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onNavigate(parentRoute)}
            className="bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-[#991B1B] rounded-2xl p-4 text-left flex items-center gap-3 transition cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-[#991B1B] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Kembali ke Daftar
              </p>
              <p className="font-display font-black text-sm text-neutral-900">{parentLabel}</p>
            </div>
          </button>
        )}

        {nextCat && (
          <button
            type="button"
            onClick={() => onNavigate(`/kategori/${nextCat.key}`)}
            className="bg-white hover:bg-neutral-50 border-2 border-neutral-200 hover:border-[#991B1B] rounded-2xl p-4 text-right flex items-center justify-end gap-3 transition cursor-pointer"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Berikutnya
              </p>
              <p className="font-display font-black text-sm text-neutral-900">{nextCat.name}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#991B1B] shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
};
