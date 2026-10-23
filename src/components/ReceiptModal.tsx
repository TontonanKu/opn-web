import React, { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CONFIG } from '../data/initialData';
import { 
  X, 
  Printer, 
  CheckCircle, 
  ShieldCheck, 
  QrCode, 
  Share2, 
  Star, 
  Copy, 
  Check,
  Download,
  Shield,
  Sparkles
} from 'lucide-react';
import { downloadReceiptPNG } from '../utils/receiptCanvasGenerator';
import { generateVerificationFingerprint } from '../utils/securityUtils';

export const ReceiptModal: React.FC = () => {
  const { activeModal, setActiveModal, activeReceiptOrder, user, viewMode } = useApp();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  // Close on Escape key (WITHOUT touching body scroll to ensure homepage is never locked)
  React.useEffect(() => {
    if (activeModal !== 'receipt') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'receipt' || !activeReceiptOrder || !activeReceiptOrder.receipt) {
    return null;
  }

  const receipt = activeReceiptOrder.receipt;

  // Cetak & Salin teks dikhususkan untuk Admin atau Pemilik Pesanan tersebut
  const isAdmin = user?.role === 'admin' || viewMode === 'admin-dashboard';
  const isOwner = Boolean(
    user && (
      user.id === activeReceiptOrder.userId || 
      user.phone === activeReceiptOrder.customerPhone
    )
  );
  const canManageReceipt = isAdmin || isOwner;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyReceiptText = () => {
    const cleanPhone = receipt.customerPhone ? receipt.customerPhone.replace(/[^0-9]/g, '') : '';
    const phoneToDisplay = canManageReceipt 
      ? receipt.customerPhone 
      : (cleanPhone.length >= 8 ? `${cleanPhone.slice(0, 4)}••••${cleanPhone.slice(-3)}` : '08••••••••');

    const text = `🧾 *STRUK PEMBAYARAN RESMI ZURA STORE*
No. Struk: ${receipt.receiptNumber}
Kode Order: ${activeReceiptOrder.orderCode}
Tgl Transaksi: ${receipt.transactionDate}
Pelanggan: ${receipt.customerName} (${phoneToDisplay})
Produk/Jasa: ${receipt.serviceName}
Paket: ${receipt.variantOrRank}
Metode Bayar: ${receipt.paymentMethod === 'web_transfer' ? 'QRIS / DANA / GoPay' : 'WhatsApp Direct'}
Total Bayar: ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(receipt.amount)}
Status: ${receipt.paymentStatus} (TERVERIFIKASI SISTEM)
Website: https://${ADMIN_CONFIG.domain}
CS WhatsApp: 0821-7279-5156

Terima kasih atas kepercayaan Anda di Zura Store!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveModal(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="max-w-md w-full max-h-[92vh] flex flex-col relative">
        
        {/* Paper Container - Scroll bar is located INSIDE the card, NOT on the window edge */}
        <div 
          id="receipt-print-area"
          ref={receiptRef}
          className="bg-[#FFFDF9] border-[3px] border-[#121212] shadow-brutal flex flex-col max-h-[80vh] sm:max-h-[82vh] relative font-mono text-xs text-[#121212] select-text overflow-hidden"
        >
          {/* Top Jagged / Perforated Border effect */}
          <div className="h-2 bg-checker opacity-40 shrink-0"></div>

          {/* Sticky Header of the Receipt with Close Button */}
          <div className="p-4 pb-3 border-b-2 border-dashed border-[#121212] text-center relative shrink-0">
            {/* Satu Tombol Tutup Modern di Pojok Kanan Atas Struk */}
            <button 
              onClick={() => setActiveModal(null)}
              className="no-print absolute top-3 right-3 z-10 p-1.5 border-2 border-black bg-[#FFC700] hover:bg-[#FF5900] hover:text-white transition-colors shadow-[2px_2px_0px_#000]"
              title="Tutup (Esc)"
            >
              <X className="w-4 h-4 stroke-[3]" />
            </button>

            <div className="inline-block bg-[#121212] text-[#FFC700] px-3 py-1 font-display font-black text-lg sm:text-xl mb-1 tracking-wider uppercase border border-black">
              ZURA STORE
            </div>
            <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-0.5">
              Jasa Joki Game • App Premium • AI Art
            </p>
            <p className="text-[10px] text-neutral-500 font-medium">
              https://{ADMIN_CONFIG.domain} • CS: 0821-7279-5156
            </p>
            <div className="mt-1 text-xs font-black uppercase text-[#FF5900]">
              BUKTI TRANSAKSI DIGITAL RESMI
            </div>
          </div>

          {/* Scrollable Receipt Body (Internal scroll, keeping scrollbar inside the card) */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-5 space-y-3">
            {/* Receipt Meta */}
            <div className="pb-3 border-b-2 border-dashed border-neutral-300 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500 shrink-0">No. Struk:</span>
                <span className="font-bold text-right break-all">{receipt.receiptNumber}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500 shrink-0">Kode Order:</span>
                <span className="font-bold bg-[#FFC700] px-1 text-right">{activeReceiptOrder.orderCode}</span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500 shrink-0">Tgl Transaksi:</span>
                <span className="text-right font-medium">{receipt.transactionDate}</span>
              </div>
              {receipt.completedDate && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-neutral-500 shrink-0">Tgl Selesai:</span>
                  <span className="font-bold text-right font-medium">{receipt.completedDate}</span>
                </div>
              )}
              <div className="flex items-center justify-between gap-2">
                <span className="text-neutral-500 shrink-0">Pelanggan:</span>
                <span className="font-bold text-right break-words">{receipt.customerName}</span>
              </div>
            </div>

            {/* Line Item Breakdown */}
            <div className="pb-3 border-b-2 border-[#121212]">
              <div className="text-[10px] uppercase font-bold text-neutral-400 mb-1">
                Rincian Item Pembelian:
              </div>
              <div className="flex justify-between font-bold text-sm mb-0.5">
                <span>{receipt.serviceName}</span>
                <span>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(receipt.amount)}
                </span>
              </div>
              <div className="text-xs text-[#FF5900] font-semibold mb-2">
                Paket: {receipt.variantOrRank}
              </div>

              {/* Account details if exists (Only visible to the owner of this order or admin) */}
              {canManageReceipt && receipt.accountDetails && Object.keys(receipt.accountDetails).length > 0 && (
                <div className="bg-[#FAF8F2] border border-neutral-300 p-2 text-[10px] space-y-0.5 mb-1">
                  <div className="text-[9px] uppercase font-bold text-neutral-400 mb-0.5">Detail Data Akun:</div>
                  {Object.entries(receipt.accountDetails).map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-neutral-500">{k}:</span>
                      <span className="font-bold">{v}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="pb-3 border-b-2 border-dashed border-[#121212] space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Harga Layanan</span>
                <span>
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(receipt.amount - (receipt.tipAmount || 0))}
                </span>
              </div>
              {Boolean(receipt.tipAmount && receipt.tipAmount > 0) && (
                <div className="flex justify-between text-xs text-amber-800 font-bold">
                  <span>Tip Apresiasi Booster/Admin</span>
                  <span>+{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(receipt.tipAmount || 0)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs">
                <span className="text-neutral-500">Biaya Admin / Sistem</span>
                <span className="text-emerald-600 font-bold">Rp 0 (GRATIS)</span>
              </div>
              <div className="flex justify-between text-sm font-black pt-1 border-t border-neutral-300">
                <span>TOTAL DIBAYAR</span>
                <span className="font-display text-base">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(receipt.amount)}
                </span>
              </div>
            </div>

            {/* Official Stamp & Verification */}
            <div className="py-2.5 relative flex items-center justify-between">
              <div>
                <span className="text-[10px] text-neutral-500 block uppercase">Metode Pembayaran:</span>
                <span className="font-bold text-xs uppercase">
                  {receipt.paymentMethod === 'web_transfer' ? 'QRIS / DANA / GoPay' : 'WhatsApp Direct'}
                </span>
                <div className="text-[10px] text-neutral-400 mt-0.5">
                  Status: TERVERIFIKASI SISTEM
                </div>
              </div>

              {/* Stamp Look */}
              <div className="receipt-stamp px-3 py-1 bg-green-50/80">
                <div className="text-center text-xs font-black flex items-center justify-center gap-1 text-emerald-800">
                  <Star className="w-2.5 h-2.5 fill-emerald-700 text-emerald-700" />
                  <span>{receipt.paymentStatus}</span>
                  <Star className="w-2.5 h-2.5 fill-emerald-700 text-emerald-700" />
                </div>
                <div className="text-[8px] tracking-normal text-center font-bold text-emerald-900">
                  ZURA OFFICIAL
                </div>
              </div>
            </div>

            {/* Customer review if present */}
            {receipt.review && (
              <div className="bg-[#FAF8F2] border border-black p-2.5 my-1">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(receipt.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[#FFC700] text-[#FFC700]" />
                  ))}
                  <span className="text-[10px] font-bold ml-1">Rating Pelanggan</span>
                </div>
                <p className="text-[11px] italic text-neutral-700">
                  "{receipt.review}"
                </p>
              </div>
            )}

            {/* Tamper-Proof Digital Verification Fingerprint */}
            <div className="pt-2 text-center border-t border-dashed border-neutral-300">
              <div className="bg-neutral-100 border border-neutral-300 p-2 mb-2 text-left text-[9px] font-mono">
                <div className="flex items-center justify-between text-neutral-800 font-bold mb-0.5">
                  <span className="flex items-center gap-1 text-emerald-800">
                    <Shield className="w-3 h-3 text-emerald-600" />
                    <span>FINGERPRINT DIGITAL:</span>
                  </span>
                  <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 border border-emerald-400 font-bold">TERVERIFIKASI ASLI</span>
                </div>
                <div className="truncate font-mono text-neutral-600 text-[8.5px]">
                  {receipt.verificationHash || generateVerificationFingerprint(activeReceiptOrder.orderCode, receipt.amount, activeReceiptOrder.createdAt)}
                </div>
              </div>

              {/* Barcode Mockup */}
              <div className="h-7 w-4/5 mx-auto bg-black flex items-center justify-center text-white text-[9px] tracking-[0.3em] font-mono">
                ||| | |||| | ||| || ||| |||| |
              </div>
              <span className="text-[9px] text-neutral-500 tracking-wider block mt-1">
                AUTH-CODE: {receipt.receiptNumber}
              </span>
              <p className="text-[9px] text-neutral-500 mt-1 leading-snug">
                Terima kasih telah mempercayakan kebutuhan joki game & aplikasi Anda kepada Zura Store!
              </p>
            </div>
          </div>

          {/* Bottom Jagged edge */}
          <div className="h-2 bg-checker opacity-40 shrink-0"></div>
        </div>

        {/* Action Buttons Below Receipt */}
        <div className="mt-3 shrink-0 no-print">
          {canManageReceipt ? (
            // ADMIN ATAU PEMILIK PESANAN: Akses Download Gambar, Cetak & Salin Teks
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => downloadReceiptPNG(receipt, activeReceiptOrder.orderCode)}
                className="flex-1 brutal-btn-orange py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs uppercase font-bold"
                title="Unduh struk resmi format gambar PNG beresolusi tinggi"
              >
                <Download className="w-4 h-4" />
                <span>Simpan PNG</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex-1 brutal-btn-yellow py-2.5 px-3 flex items-center justify-center gap-2 text-xs uppercase font-bold"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak / PDF</span>
              </button>
              <button
                type="button"
                onClick={handleCopyReceiptText}
                className="brutal-btn-dark py-2.5 px-3 flex items-center justify-center gap-2 text-xs uppercase font-bold"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Tersalin!' : 'Salin'}</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="brutal-btn-white py-2.5 px-4 text-xs uppercase font-bold"
              >
                Tutup
              </button>
            </div>
          ) : (
            // PENGUNJUNG UMUM / TESTIMONI: Bisa Simpan PNG atau Tutup
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => downloadReceiptPNG(receipt, activeReceiptOrder.orderCode)}
                className="flex-1 brutal-btn-orange py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs uppercase font-bold"
              >
                <Download className="w-4 h-4" />
                <span>Simpan Gambar PNG</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="brutal-btn-yellow py-2.5 px-4 text-xs uppercase font-extrabold flex items-center justify-center gap-1.5 shadow-brutal"
              >
                <X className="w-4 h-4 stroke-[3]" />
                <span>Tutup</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
