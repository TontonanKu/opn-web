import React from 'react';
import {
  ArrowLeft,
  ChevronRight,
  QrCode,
  ShieldCheck,
  Clock,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { STORE_CONFIG, buildWhatsAppOrderUrl } from '../data/catalog';

interface OrderGuidePageProps {
  onNavigate: (route: string) => void;
}

export const OrderGuidePage: React.FC<OrderGuidePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-5">
      {/* Top Back Navigation */}
      <div className="bg-white rounded-2xl border border-neutral-200 px-4 py-3 shadow-sm flex flex-wrap items-center justify-between gap-3">
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
          <span className="font-extrabold text-[#7A0B0B]">Cara Order & QRIS Resmi</span>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white rounded-3xl border-2 border-neutral-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#7A0B0B] via-[#8B1111] to-[#5C0808] p-6 sm:p-7 text-white">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-red-100 text-[11px] font-extrabold uppercase tracking-wider">
            <QrCode className="w-3.5 h-3.5" />
            <span>Panduan Pemesanan & Pembayaran Resmi</span>
          </div>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-white mt-2">
            Cara Order di {STORE_CONFIG.storeName}
          </h1>
          <p className="text-xs sm:text-sm text-red-100/90 mt-1">
            Website ini khusus untuk mengecek katalog produk & daftar harga resmi. Untuk pemesanan langsung dialihkan ke WhatsApp atau Ticket Discord tanpa perlu login.
          </p>
        </div>

        <div className="p-5 sm:p-6 grid md:grid-cols-2 gap-6 items-start">
          {/* Left: Step-by-Step Guide */}
          <div className="space-y-4">
            <h2 className="font-display font-black text-lg text-neutral-900">
              Langkah Order Cepat (WA / Discord)
            </h2>

            <div className="space-y-3">
              {[
                {
                  step: '1',
                  title: 'Pilih Kategori di Menu Utama',
                  desc: 'Klik Joki Game atau Produk Digital untuk membuka daftar game/produk beserta halaman Pricelist lengkapnya.'
                },
                {
                  step: '2',
                  title: 'Klik Tombol Order WA atau Discord',
                  desc: 'Pilih paket yang kamu inginkan, lalu klik tombol Order via WhatsApp (pesan otomatis terisi) atau bergabung ke Server Discord Zura Store untuk membuka Ticket Order.'
                },
                {
                  step: '3',
                  title: 'Bayar via QRIS Resmi KAZURA STORE',
                  desc: `Scan QRIS resmi "${STORE_CONFIG.paymentInfo.merchant}" (NMID: ${STORE_CONFIG.paymentInfo.nmid}) melalui ${STORE_CONFIG.paymentInfo.supports}.`
                },
                {
                  step: '4',
                  title: 'Kirim Bukti & Pesanan Diproses',
                  desc: 'Kirimkan screenshot bukti pembayaran ke Admin di WhatsApp atau di dalam ruang Ticket Discord. Pesanan langsung dikerjakan!'
                }
              ].map(item => (
                <div
                  key={item.step}
                  className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-xl bg-[#7A0B0B] text-white font-mono font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {item.step}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-neutral-900">{item.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Store Hours & Safety Box */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <div className="flex items-center gap-2 text-[#7A0B0B] font-extrabold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Jam Operasional: {STORE_CONFIG.storeHours.label} (Setiap Hari)</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Di luar jam buka, kamu tetap bisa chat WhatsApp atau buka Ticket Discord — pesanan akan masuk antrean prioritas dan langsung dikerjakan saat toko buka.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-1">
              <a
                href={buildWhatsAppOrderUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-2xl bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Chat WhatsApp Admin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={STORE_CONFIG.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-2xl bg-[#7A0B0B] hover:bg-[#5C0808] text-white font-extrabold text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Masuk Server Discord</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: Official QRIS Card */}
          <div className="bg-neutral-50 rounded-3xl border-2 border-neutral-200 p-5 text-center space-y-4">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#7A0B0B] text-white text-[10px] font-extrabold uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" />
                QRIS Resmi Toko Kazura
              </span>
              <h3 className="font-display font-black text-xl text-neutral-900 pt-1">
                {STORE_CONFIG.paymentInfo.merchant}
              </h3>
              <p className="font-mono text-xs font-bold text-neutral-500">
                NMID: {STORE_CONFIG.paymentInfo.nmid}
              </p>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-neutral-200 shadow-sm max-w-[280px] mx-auto">
              <img
                src={STORE_CONFIG.qrisUrl}
                alt={`QRIS ${STORE_CONFIG.paymentInfo.merchant}`}
                className="w-full h-auto rounded-xl object-contain mx-auto"
              />
            </div>

            <div className="text-left bg-white p-3.5 rounded-2xl border border-neutral-200 space-y-1.5 text-xs">
              <div className="flex items-start gap-2 text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  Mendukung: <strong>{STORE_CONFIG.paymentInfo.supports}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2 text-neutral-700">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
                <span>
                  Pastikan nama merchant <strong>{STORE_CONFIG.paymentInfo.merchant}</strong> sesuai sebelum menyelesaikan pembayaran.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
