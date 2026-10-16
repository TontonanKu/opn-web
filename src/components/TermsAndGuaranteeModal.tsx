import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Award, 
  RefreshCcw, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Clock
} from 'lucide-react';

export const TermsAndGuaranteeModal: React.FC = () => {
  const { activeModal, setActiveModal } = useApp();
  const [activeTab, setActiveTab] = useState<'garansi' | 'privasi' | 'refund'>('garansi');

  // Close with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveModal]);

  if (activeModal !== 'terms') return null;

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveModal(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="brutal-card bg-white max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden relative shadow-[6px_6px_0px_#000]">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#FFC700] z-30 px-5 py-3.5 border-b-[2.5px] border-black flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-black stroke-[2.5]" />
            <h3 className="font-display font-black text-sm sm:text-base uppercase text-[#121212] tracking-wide">
              KETENTUAN LAYANAN & GARANSI RESMI
            </h3>
          </div>

          <button 
            type="button"
            onClick={() => setActiveModal(null)}
            className="p-1.5 border-2 border-black bg-white hover:bg-[#FF5900] hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b-2 border-black bg-[#FAF8F2]">
          <button
            onClick={() => setActiveTab('garansi')}
            className={`flex-1 py-2.5 px-3 text-xs font-mono font-black uppercase border-r-2 border-black transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'garansi' ? 'bg-white text-black shadow-inner' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#FF5900]" />
            <span>Garansi 100%</span>
          </button>
          <button
            onClick={() => setActiveTab('privasi')}
            className={`flex-1 py-2.5 px-3 text-xs font-mono font-black uppercase border-r-2 border-black transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'privasi' ? 'bg-white text-black shadow-inner' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Privasi & Keamanan</span>
          </button>
          <button
            onClick={() => setActiveTab('refund')}
            className={`flex-1 py-2.5 px-3 text-xs font-mono font-black uppercase transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'refund' ? 'bg-white text-black shadow-inner' : 'text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            <RefreshCcw className="w-3.5 h-3.5 text-emerald-600" />
            <span>Klaim & Refund</span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4 text-xs font-mono">

          {activeTab === 'garansi' && (
            <div className="space-y-4">
              <div className="bg-[#FAF8F2] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#FF5900] text-white px-2 py-0.5 text-[10px] font-black uppercase">
                    JOKI GAME
                  </span>
                  <h4 className="font-display font-black text-sm uppercase text-[#121212]">
                    Jaminan Anti Hack-Back & Akun Aman 100%
                  </h4>
                </div>
                <ul className="space-y-2 text-neutral-800 leading-relaxed list-disc list-inside">
                  <li><strong>Player Profesional & Terverifikasi:</strong> Semua joki dikerjakan oleh tim internal KAZURA STORE dengan reputasi tinggi.</li>
                  <li><strong>Zero Cheat / Script Ilegal:</strong> Kami menjamin 100% pengerjaan murni keahlian (human skill), bebas dari aplikasi pihak ketiga terlarang ataupun script bot yang berisiko banned.</li>
                  <li><strong>Kompensasi Penuh:</strong> Apabila terjadi kendala keamanan selama proses joki oleh tim kami, kami bertanggung jawab penuh sesuai ketentuan garansi.</li>
                </ul>
              </div>

              <div className="bg-[#FAF8F2] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-black uppercase">
                    APPS PREMIUM
                  </span>
                  <h4 className="font-display font-black text-sm uppercase text-[#121212]">
                    Full Garansi Sesuai Durasi Langganan
                  </h4>
                </div>
                <ul className="space-y-2 text-neutral-800 leading-relaxed list-disc list-inside">
                  <li><strong>Ganti Akun Baru:</strong> Apabila akun langganan Anda mengalami reset / back to free sebelum masa aktif berakhir, kami sediakan akun pengganti atau fix akun tanpa biaya tambahan.</li>
                  <li><strong>Durasi Terjamin:</strong> Masa garansi berlaku sama panjangnya dengan paket yang Anda beli (1 Bulan, 3 Bulan, atau 1 Tahun).</li>
                  <li><strong>Respon CS Prioritas:</strong> Tim kami siap memproses tiket klaim garansi Anda dalam hitungan menit di jam kerja operasional.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'privasi' && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-600 p-4 shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-2 mb-2 text-blue-950">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <h4 className="font-display font-black text-sm uppercase">
                    Auto-Purge Data Sensitif Pelanggan
                  </h4>
                </div>
                <p className="text-neutral-800 leading-relaxed mb-3">
                  KAZURA STORE menerapkan standar privasi ketat <strong>Auto-Purge</strong>:
                </p>
                <div className="space-y-2 text-neutral-800 bg-white p-3 border border-blue-400">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Pemusnahan Otomatis:</strong> Data login sensitif (Password akun game / PIN / Kredensial) <em>dihapus secara permanen dari server</em> segera setelah pesanan ditandai selesai.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Isolasi Transaksi Pengunjung:</strong> Riwayat checkout Anda tersimpan khusus pada perangkat Anda (local isolation) dan tidak dapat dilihat oleh pengunjung lain.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Verifikasi Digital Anti-Palsu:</strong> Setiap nota/struk dilengkapi sidik jari kriptografi digital untuk memastikan keaslian transaksi resmi KAZURA.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'refund' && (
            <div className="space-y-4">
              <div className="bg-[#FAF8F2] border-2 border-black p-4 shadow-[3px_3px_0px_#000]">
                <h4 className="font-display font-black text-sm uppercase text-[#121212] mb-2 flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4 text-emerald-600" />
                  <span>Kebijakan Pengembalian Dana (Refund)</span>
                </h4>
                <ul className="space-y-2 text-neutral-800 leading-relaxed list-disc list-inside">
                  <li><strong>Gagal Proses:</strong> Pengembalian dana 100% diberikan jika admin tidak dapat memproses pesanan karena stok habis atau masalah sistem di pihak KAZURA STORE.</li>
                  <li><strong>Keterlambatan Ekstrem:</strong> Jika pengerjaan joki melampaui batas waktu estimasi yang dijanjikan tanpa konfirmasi dari pihak kami, pembeli berhak mengajukan refund proporsional.</li>
                  <li><strong>Metode Pengembalian:</strong> Refund ditransfer kembali melalui QRIS / transfer E-Wallet (DANA/GoPay/OVO) ke nomor rekening yang sama saat pembayaran.</li>
                </ul>
              </div>

              <div className="bg-amber-50 border-2 border-amber-600 p-3.5">
                <div className="flex items-start gap-2 text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong>Catatan Pembeli:</strong> Pastikan Anda tidak login ke akun game selama proses joki berlangsung tanpa izin joki, agar tidak mengganggu match dan performa rank.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick SLA Rules Reminder */}
          <div className="border border-neutral-300 bg-neutral-50 p-3 flex items-center gap-3">
            <Clock className="w-5 h-5 text-neutral-600 shrink-0" />
            <div className="text-[11px] text-neutral-600 leading-tight">
              Butuh bantuan langsung? Chat WhatsApp CS kami di{' '}
              <strong className="text-black">0821-7279-5156</strong> atau gunakan fitur Live Chat di pojok kanan bawah.
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-[#FAF8F2] p-4 border-t-2 border-black flex justify-end">
          <button
            type="button"
            onClick={() => setActiveModal(null)}
            className="brutal-btn-yellow py-2 px-6 text-xs uppercase font-mono font-black"
          >
            Saya Mengerti & Setuju
          </button>
        </div>

      </div>
    </div>
  );
};
