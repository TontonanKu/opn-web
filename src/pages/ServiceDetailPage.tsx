import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Check,
  Info,
  ExternalLink,
  Copy,
  CheckCircle2,
  AlertCircle,
  Minus,
  Plus
} from 'lucide-react';
import {
  CatalogCategory,
  CatalogSection,
  STORE_CONFIG,
  formatRupiah,
  formatItemPrice
} from '../data/catalog';
import { BrandIcon } from '../components/BrandIcon';

interface ServiceDetailPageProps {
  category: CatalogCategory;
  section: CatalogSection;
  initialItemId?: string | null;
  onNavigate: (route: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  category,
  section,
  initialItemId,
  onNavigate
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(() => {
    if (initialItemId && section.items.some(i => i.id === initialItemId)) {
      return initialItemId;
    }
    return section.items[0]?.id || '';
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [customNote, setCustomNote] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialItemId && section.items.some(i => i.id === initialItemId)) {
      setSelectedItemId(initialItemId);
    } else if (section.items.length > 0) {
      setSelectedItemId(section.items[0].id);
    }
    setQuantity(1);
    setCustomNote('');
    setCopied(false);
  }, [category.key, section.id, initialItemId]);

  const selectedItem =
    section.items.find(i => i.id === selectedItemId) || section.items[0];

  const totalPrice = (selectedItem?.price || 0) * quantity;

  const buildOrderMessage = () => {
    if (!selectedItem) return '';
    const qtyStr = quantity > 1 ? ` x${quantity}` : '';
    const lines = [
      `Halo Admin *${STORE_CONFIG.storeName}*, saya mau order:`,
      '',
      `• *Kategori:* ${category.name}`,
      `• *Layanan:* ${section.title}${section.via ? ` (${section.via})` : ''}`,
      `• *Paket:* ${selectedItem.label}${qtyStr}`,
      `• *Estimasi Harga:* ${formatRupiah(totalPrice)}${selectedItem.unit && quantity === 1 ? `/${selectedItem.unit}` : ''}`
    ];

    if (customNote.trim()) {
      lines.push(`• *Detail / Catatan:* ${customNote.trim()}`);
    } else if (category.orderGuide && category.orderGuide.length > 0) {
      lines.push('');
      lines.push('*Data Pesanan:*');
      for (const g of category.orderGuide) {
        lines.push(`- ${g}: `);
      }
    }

    lines.push('');
    lines.push('Mohon info QRIS & proses selanjutnya ya kak, terima kasih!');
    return lines.join('\n');
  };

  const whatsappHref = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    buildOrderMessage()
  )}`;

  const handleCopyFormat = () => {
    navigator.clipboard?.writeText(buildOrderMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const otherSections = category.sections.filter(s => s.id !== section.id);
  const parentRoute = category.type === 'joki' ? '/joki-game' : '/produk';
  const parentLabel = category.type === 'joki' ? 'Joki Game' : 'Produk Digital';

  return (
    <div className="space-y-5">
      {/* Top Breadcrumb & Back Buttons */}
      <div className="bg-white rounded-2xl border border-neutral-200 px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => onNavigate(`/kategori/${category.key}`)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-[#7A0B0B] text-neutral-800 hover:text-white font-extrabold text-xs transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke {category.name}</span>
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
          <button
            type="button"
            onClick={() => onNavigate(`/kategori/${category.key}`)}
            className="hover:text-[#991B1B] cursor-pointer truncate"
          >
            {category.name}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="font-extrabold text-[#7A0B0B] truncate">{section.title}</span>
        </div>
      </div>

      {/* Main Service Detail Card */}
      <div className="bg-white rounded-3xl border-2 border-neutral-200 shadow-sm overflow-hidden">
        {/* Crimson Banner Header */}
        <div className="bg-gradient-to-r from-[#7A0B0B] via-[#8B1111] to-[#5C0808] p-6 sm:p-7 text-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-4">
              <BrandIcon
                id={section.id}
                imageUrl={section.iconImage || category.iconImage}
                fallbackEmoji={section.icon}
                size="xl"
                className="border-white/25 bg-white/10"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-red-100 text-[11px] font-extrabold uppercase tracking-wider">
                    {category.name}
                  </span>
                  {section.via && (
                    <span className="px-2.5 py-0.5 rounded-full bg-white text-[#7A0B0B] text-[11px] font-extrabold uppercase tracking-wider">
                      {section.via}
                    </span>
                  )}
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {section.title}
                </h1>
                <p className="text-xs sm:text-sm text-red-100/90">{section.productName}</p>
              </div>
            </div>

            <div className="bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5 text-left sm:text-right shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-wider text-red-200">
                Kode Katalog
              </p>
              <p className="font-mono font-bold text-xs sm:text-sm text-white">
                {section.productId}
              </p>
            </div>
          </div>
        </div>

        {/* Section Important Note Banner */}
        {section.note && (!section.notesList || section.notesList.length === 0) && (
          <div className="px-6 py-3.5 bg-neutral-100 border-b border-neutral-200 flex items-center gap-2.5 text-xs sm:text-sm text-neutral-800 font-semibold">
            <Info className="w-4 h-4 shrink-0 text-[#991B1B]" />
            <span>Ketentuan Layanan: {section.note}</span>
          </div>
        )}

        {/* Detailed Catatan & Keunggulan Banner (e.g. Gacha Netflix) */}
        {(section.notesList?.length || section.advantages?.length) ? (
          <div className="px-6 py-4 bg-neutral-50 border-b border-neutral-200 grid sm:grid-cols-2 gap-4">
            {section.notesList && section.notesList.length > 0 && (
              <div className="space-y-1.5">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#7A0B0B] flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  <span>Catatan :</span>
                </p>
                <ul className="space-y-1 text-xs sm:text-sm text-neutral-700">
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
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#7A0B0B] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Keunggulan :</span>
                </p>
                <ul className="space-y-1 text-xs sm:text-sm text-neutral-700">
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

        {/* Step 1: Select Package Tier */}
        <div className="p-5 sm:p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-black text-base sm:text-lg text-neutral-900">
                1. Pilih Paket {section.title} ({section.items.length} Pilihan)
              </h2>
              <span className="text-xs text-neutral-500 font-medium">
                Klik paket untuk memilih
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {section.items.map(item => {
                const isSelected = selectedItem?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedItemId(item.id)}
                    className={`p-4 rounded-2xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-50 border-[#991B1B] shadow-sm'
                        : 'bg-white border-neutral-200 hover:border-[#991B1B]'
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#991B1B] border-[#991B1B] text-white'
                            : 'border-neutral-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-extrabold text-sm text-neutral-900">
                            {item.label}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-md bg-[#991B1B] text-white text-[10px] font-extrabold">
                              {item.badge} Populer
                            </span>
                          )}
                        </div>
                        {item.remindDays && item.remindDays > 0 ? (
                          <p className="text-[11px] text-neutral-500 mt-0.5">
                            Masa aktif ±{item.remindDays} hari
                          </p>
                        ) : item.name ? (
                          <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                            {item.name}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <span className="font-mono font-extrabold text-sm sm:text-base text-[#991B1B] shrink-0">
                      {formatItemPrice(item)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Optional Quantity & Notes */}
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-black text-sm sm:text-base text-neutral-900">
                  2. Jumlah & Catatan Order (Opsional)
                </h3>
                <p className="text-xs text-neutral-500">
                  Otomatis tertulis di pesan WhatsApp atau bisa disalin ke Ticket Discord
                </p>
              </div>

              <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-xl p-1.5 w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#7A0B0B] text-neutral-800 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-3 font-mono font-extrabold text-sm text-neutral-900">
                  {quantity} {selectedItem?.unit || 'x'}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.min(50, q + 1))}
                  className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-[#7A0B0B] text-neutral-800 hover:text-white flex items-center justify-center transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {category.orderGuide && category.orderGuide.length > 0 && (
              <div className="text-xs text-neutral-600 bg-white p-3 rounded-xl border border-neutral-200">
                <span className="font-bold text-[#7A0B0B]">Info yang diperlukan saat order: </span>
                {category.orderGuide.join(' • ')}
              </div>
            )}

            <div>
              <input
                type="text"
                value={customNote}
                onChange={e => setCustomNote(e.target.value)}
                placeholder={
                  category.orderGuide && category.orderGuide.length > 0
                    ? `Ketik ${category.orderGuide.join(' / ')} (opsional)...`
                    : 'Tambahkan catatan pesanan (opsional)...'
                }
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-neutral-200 focus:border-[#991B1B] text-xs sm:text-sm text-neutral-900 outline-none"
              />
            </div>
          </div>

          {/* Step 3: Direct Order Redirection Box (WhatsApp & Discord) */}
          <div className="p-5 rounded-2xl bg-white border-2 border-[#7A0B0B] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200 pb-3.5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Paket Dipilih
                </p>
                <p className="font-display font-black text-base sm:text-lg text-neutral-900">
                  {section.title} — {selectedItem?.label}
                  {quantity > 1 ? ` (x${quantity})` : ''}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Estimasi Total
                </p>
                <p className="font-mono font-black text-xl sm:text-2xl text-[#991B1B]">
                  {formatRupiah(totalPrice)}
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition"
              >
                <span>Order Paket Ini via WhatsApp</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={STORE_CONFIG.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-2xl bg-[#7A0B0B] hover:bg-[#5C0808] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition"
              >
                <span>Order Paket Ini via Discord</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-neutral-500">
              <span>
                Mau order lewat Ticket Discord? Kamu bisa salin teks format order di samping:
              </span>
              <button
                type="button"
                onClick={handleCopyFormat}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 font-bold text-xs transition cursor-pointer"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                    <span className="text-[#16A34A]">Format Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Format Order</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Notes */}
      {category.notes && category.notes.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-neutral-200 p-5 space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2 text-[#7A0B0B]">
            <AlertCircle className="w-4 h-4" />
            <h3 className="font-display font-black text-xs sm:text-sm uppercase tracking-wider">
              Catatan Penting ({category.name})
            </h3>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700">
            {category.notes.map((n, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#991B1B] font-bold">•</span>
                <span className="capitalize">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Other Services in Same Category */}
      {otherSections.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-neutral-200 p-5 sm:p-6 space-y-3.5 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-black text-base text-neutral-900">
              Layanan Lainnya di {category.name}
            </h3>
            <button
              type="button"
              onClick={() => onNavigate(`/kategori/${category.key}`)}
              className="text-xs font-extrabold text-[#991B1B] hover:underline cursor-pointer"
            >
              Lihat Semua →
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {otherSections.map(sec => (
              <button
                key={sec.id}
                type="button"
                onClick={() => onNavigate(`/layanan/${category.key}/${sec.id}`)}
                className="p-3 rounded-2xl bg-neutral-50 hover:bg-white border border-neutral-200 hover:border-[#991B1B] flex items-center justify-between gap-3 text-left transition cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <BrandIcon
                    id={sec.id}
                    imageUrl={sec.iconImage}
                    fallbackEmoji={sec.icon}
                    size="sm"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-neutral-900 truncate">
                      {sec.title}
                    </p>
                    <p className="text-[11px] text-neutral-500 truncate">
                      {sec.items.length} paket tersedia
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#991B1B] shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
