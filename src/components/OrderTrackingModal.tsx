import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CONFIG } from '../data/initialData';
import { 
  X, 
  Copy, 
  Check, 
  Clock, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Receipt, 
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Star,
  XCircle,
  Camera,
  Lock
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    activeOrderToTrack, 
    orders, 
    adminStatus, 
    generateWhatsAppLink,
    openReceiptModal,
    updateOrderStatus,
    cancelOrder,
    submitOrderReview,
    setIsChatOpen,
    triggerPaymentProofChat,
    sendChatMessage
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number>(10 * 60); // 10 minutes in seconds
  const [ratingInput, setRatingInput] = useState<number>(5);
  const [reviewInput, setReviewInput] = useState<string>('');

  // Get freshest order from context orders array
  const currentOrder = orders.find(o => o.id === activeOrderToTrack?.id) || activeOrderToTrack;

  const handleClaimWarranty = () => {
    if (!currentOrder) return;
    const msg = `[KLAIM GARANSI] Halo Admin Zura! Saya ingin klaim garansi untuk pesanan #${currentOrder.orderCode} (${currentOrder.itemName} - ${currentOrder.itemDetails}). Akun/layanan mengalami kendala, mohon bantuannya min!`;
    sendChatMessage(msg, currentOrder.orderCode, 'customer', currentOrder.orderCode);
    setActiveModal(null);
    setIsChatOpen(true);
  };

  useEffect(() => {
    if (!currentOrder) return;

    const calculateRemaining = () => {
      const tenMinutesMs = ADMIN_CONFIG.maxWaitMinutes * 60 * 1000;
      const elapsed = Date.now() - currentOrder.createdAt;
      const remainingMs = Math.max(0, tenMinutesMs - elapsed);
      return Math.floor(remainingMs / 1000);
    };

    setTimeLeft(calculateRemaining());

    const interval = setInterval(() => {
      const rem = calculateRemaining();
      setTimeLeft(rem);
      if (rem <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentOrder]);

  // Close with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveModal]);

  if (activeModal !== 'tracking' || !currentOrder) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isExpired = timeLeft <= 0;
  const isOffline = adminStatus === 'offline';
  const shouldPromptWhatsApp = isExpired || isOffline || currentOrder.paymentMethod === 'whatsapp_direct';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentOrder.orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const waLink = generateWhatsAppLink(
    currentOrder.orderCode,
    currentOrder.itemName,
    currentOrder.totalAmount,
    `Saya menunggu respon pesanan kode ${currentOrder.orderCode}`
  );

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveModal(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="brutal-card bg-white max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden relative shadow-[6px_6px_0px_#000]">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-white z-30 px-5 py-3.5 border-b-[2.5px] border-black flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-[#121212] text-[#FFC700] text-xs font-mono font-bold px-2 py-0.5 uppercase">
              STATUS PEMESANAN AKTIF
            </span>
            <span className={`text-xs font-mono font-bold px-2 py-0.5 border border-black ${
              currentOrder.status === 'completed'
                ? 'bg-emerald-300 text-emerald-950'
                : currentOrder.status === 'processing'
                ? 'bg-blue-300 text-blue-950'
                : 'bg-[#FFC700] text-black'
            }`}>
              ● {currentOrder.status === 'completed' ? 'SELESAI' : currentOrder.status === 'processing' ? 'DIPROSES' : 'MENUNGGU ADMIN'}
            </span>
          </div>

          <button 
            type="button"
            onClick={() => setActiveModal(null)}
            className="p-1.5 border-2 border-black bg-[#FFC700] hover:bg-[#FF5900] hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1 font-mono text-xs font-bold"
            title="Tutup Modal (Esc)"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">TUTUP</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-display font-black text-[#121212] uppercase">
            Detail & Kode Checkout
          </h2>

        {/* Checkout Code Highlight Box */}
        <div className="bg-[#FFC700] border-[3px] border-[#121212] p-4 mb-5 shadow-brutal text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-800 block mb-1">
            KODE CHECKOUT ANDA
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono font-black text-2xl sm:text-3xl tracking-wider text-[#121212] bg-white px-3 py-1 border-2 border-black">
              {currentOrder.orderCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="brutal-btn-dark p-2 text-xs font-mono flex items-center gap-1"
              title="Salin Kode Checkout"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white" />}
              <span className="hidden sm:inline">{copied ? 'Tersalin' : 'Salin'}</span>
            </button>
          </div>
          <p className="text-[11px] font-semibold text-neutral-800 mt-2">
            Simpan kode ini sebagai bukti identifikasi pesanan Anda.
          </p>
        </div>

        {/* 10-Minute Timer & Admin Response Card */}
        {currentOrder.status === 'pending_admin' && (
          <div className={`border-2 border-black p-4 mb-5 ${
            shouldPromptWhatsApp ? 'bg-amber-50' : 'bg-[#FAF8F2]'
          }`}>
            <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${isExpired ? 'text-red-600' : 'text-[#FF5900]'}`} />
                <span className="text-xs font-mono font-bold uppercase">
                  Batas Waktu Respon Admin:
                </span>
              </div>
              <span className={`font-mono font-black text-lg px-2.5 py-0.5 border border-black ${
                isExpired ? 'bg-red-500 text-white animate-pulse' : 'bg-white text-black'
              }`}>
                {isExpired ? 'WAKTU HABIS (00:00)' : timeFormatted}
              </span>
            </div>

            {/* Status explanation */}
            {!shouldPromptWhatsApp ? (
              <div>
                <p className="text-xs text-neutral-700 leading-relaxed mb-2 font-medium">
                  Pesanan Anda sedang menunggu verifikasi admin di web. Sistem memberi waktu <strong>10 menit</strong>. Jika dalam 10 menit admin belum merespon, Anda dipersilakan melanjutkan konfirmasi lewat WhatsApp.
                </p>
                <div className="w-full bg-neutral-200 h-2 border border-black overflow-hidden">
                  <div 
                    className="bg-[#FF5900] h-full transition-all duration-1000"
                    style={{ width: `${(timeLeft / (10 * 60)) * 100}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="bg-red-100 border border-red-500 p-2.5 text-xs text-red-900 font-semibold flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    {isOffline ? (
                      <span>Admin saat ini sedang offline. Silakan langsung chat via WhatsApp dan berikan kode checkout Anda!</span>
                    ) : (
                      <span>Waktu tunggu 10 menit telah berakhir dan admin belum merespon di web. Silakan langsung hubungi admin via WhatsApp dengan menyertakan kode checkout Anda di bawah!</span>
                    )}
                  </div>
                </div>

                {/* WhatsApp Trigger Button with prefilled code */}
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full brutal-btn-orange py-3.5 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase font-black"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>CHAT ADMIN VIA WHATSAPP (KIRIM KODE: {currentOrder.orderCode})</span>
                </a>
              </div>
            )}

            {/* Direct 1-Click Action to Send Payment Proof in Live Chat */}
            <div className="pt-3 border-t border-black/20 mt-3">
              <button
                type="button"
                onClick={() => triggerPaymentProofChat(currentOrder)}
                className="w-full brutal-btn-yellow py-3.5 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm uppercase font-black shadow-brutal animate-pulse hover:animate-none"
              >
                <Camera className="w-5 h-5 text-black shrink-0" />
                <span>SAYA SUDAH TRANSFER (KIRIM BUKTI PEMBAYARAN)</span>
              </button>
              <p className="text-[11px] text-center text-neutral-600 mt-1.5 font-medium">
                Klik tombol di atas untuk membuka Live Chat & mengirim foto/screenshot bukti transfer Anda ke Admin
              </p>
            </div>
          </div>
        )}

        {/* If Order is Completed -> Display Struk Button & Rating Form */}
        {currentOrder.status === 'completed' && (
          <div className="space-y-4 mb-5">
            <div className="bg-emerald-50 border-2 border-emerald-600 p-4 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 text-white rounded-full mb-2">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h3 className="font-display font-black text-xl text-emerald-950 uppercase">
                Transaksi Telah Selesai!
              </h3>
              <p className="text-xs text-emerald-800 font-medium mb-3">
                Admin telah memproses pesanan dan menerbitkan struk resmi digital untuk Anda.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => openReceiptModal(currentOrder)}
                  className="brutal-btn-yellow py-2.5 px-4 text-xs font-mono uppercase inline-flex items-center gap-2"
                >
                  <Receipt className="w-4 h-4 text-black" />
                  <span>Buka Struk Resmi</span>
                </button>
                <button
                  type="button"
                  onClick={handleClaimWarranty}
                  className="brutal-btn-orange py-2.5 px-4 text-xs font-mono uppercase inline-flex items-center gap-1.5"
                  title="Klaim garansi jika akun/layanan mengalami kendala"
                >
                  <AlertTriangle className="w-4 h-4 text-white" />
                  <span>Klaim Garansi</span>
                </button>
              </div>

              {currentOrder.credentialsPurged && (
                <div className="mt-3 bg-blue-100 border border-blue-500 p-2 text-[10px] text-blue-950 font-mono flex items-center justify-center gap-1.5 text-left">
                  <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Jaminan Privasi: Kredensial akun game Anda telah dihapus secara aman dari sistem pasca pengerjaan.</span>
                </div>
              )}
            </div>

            {/* Interactive Rating & Review Form (Auto-Closes Live Chat 30m-1h after submit) */}
            {!currentOrder.reviewSubmittedAt ? (
              <div className="bg-[#FFFDF9] border-[2.5px] border-[#121212] p-4 shadow-[3px_3px_0px_#000]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Star className="w-5 h-5 fill-[#FFC700] text-[#FFC700]" />
                  <span className="font-display font-black text-sm uppercase text-[#121212]">
                    Beri Bintang & Ulasan Transaksi
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mb-3 font-medium">
                  Bagikan kepuasan Anda! Setelah Anda mengirim review, ruang chat pesanan ini akan ditutup otomatis dalam 30-60 menit agar antrean tetap rapi.
                </p>

                {/* 5 Clickable Stars */}
                <div className="flex items-center gap-1.5 mb-2.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRatingInput(s)}
                      className="p-1 hover:scale-125 transition-transform"
                      title={`${s} Bintang`}
                    >
                      <Star className={`w-6 h-6 ${s <= ratingInput ? 'fill-[#FFC700] text-[#FFC700]' : 'text-neutral-300'}`} />
                    </button>
                  ))}
                  <span className="font-mono text-xs font-bold ml-2 text-neutral-800">
                    {ratingInput === 5 ? '5.0 - Sangat Puas' : `${ratingInput}.0 Bintang`}
                  </span>
                </div>

                <textarea
                  rows={2}
                  value={reviewInput}
                  onChange={(e) => setReviewInput(e.target.value)}
                  placeholder="Contoh: Proses joki super cepat, akun aman, admin ramah & fast respon!"
                  className="w-full bg-white border-2 border-black p-2 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-black mb-2.5"
                />

                <button
                  type="button"
                  onClick={() => {
                    if (!reviewInput.trim()) {
                      alert('Silakan tulis ulasan singkat terlebih dahulu.');
                      return;
                    }
                    submitOrderReview(currentOrder.id, ratingInput, reviewInput.trim());
                    alert('Terima kasih! Ulasan berhasil dikirim dan struk resmi Anda telah diperbarui.');
                  }}
                  className="w-full brutal-btn-yellow py-2.5 px-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span className="flex items-center gap-1">
                    <span>Kirim Ulasan & Bintang ({ratingInput}.0)</span>
                    <Star className="w-3.5 h-3.5 fill-black text-black inline" />
                  </span>
                </button>
              </div>
            ) : (
              <div className="bg-[#FAF8F2] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-800 mb-1">
                  <Star className="w-4 h-4 fill-[#FFC700] text-[#FFC700]" />
                  <span>Ulasan Anda ({currentOrder.rating || 5}.0 Bintang): "{currentOrder.reviewText || currentOrder.receipt?.review}"</span>
                </div>
                <p className="text-[11px] font-mono text-neutral-600 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-neutral-600 shrink-0" />
                  <span>Ruang live chat untuk pesanan ini akan ditutup otomatis 30-60 menit setelah review untuk mengoptimalkan performa antrean.</span>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Order Details Breakdown */}
        <div className="bg-[#FAF8F2] border-2 border-black p-3.5 text-xs font-mono space-y-2 mb-5">
          <div className="flex items-start justify-between gap-2">
            <span className="text-neutral-500 shrink-0">Produk/Jasa:</span>
            <span className="font-bold text-black text-right break-words">{currentOrder.itemName}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-neutral-500 shrink-0">Detail Paket:</span>
            <span className="font-bold text-[#FF5900] text-right break-words">{currentOrder.itemDetails}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-500 shrink-0">Nama Pelanggan:</span>
            <span className="font-bold text-black text-right break-words">{currentOrder.customerName}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-500 shrink-0">WhatsApp:</span>
            <span className="font-bold text-black text-right">{currentOrder.customerPhone}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-neutral-500 shrink-0">Metode Bayar:</span>
            <span className="font-bold uppercase text-right">
              {currentOrder.paymentMethod === 'web_transfer' ? 'QRIS / DANA / GoPay' : 'Langsung via WhatsApp'}
            </span>
          </div>
          <div className="border-t border-neutral-300 pt-2 flex items-center justify-between text-sm gap-2">
            <span className="font-bold shrink-0">Total Pembayaran:</span>
            <span className="font-black text-black text-right">
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(currentOrder.totalAmount)}
            </span>
          </div>
        </div>

        {/* Action button options */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={() => {
              setActiveModal(null);
              setIsChatOpen(true);
            }}
            className="flex-1 brutal-btn-yellow py-2.5 px-4 text-xs uppercase flex items-center justify-center gap-1.5 font-bold"
            title="Buka obrolan langsung untuk pesanan ini"
          >
            <MessageSquare className="w-4 h-4 text-black" />
            <span>Live Chat Pesanan Ini</span>
          </button>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="brutal-btn-white py-2.5 px-4 text-xs uppercase flex items-center justify-center gap-1.5 font-bold text-emerald-700 hover:text-black"
          >
            <ExternalLink className="w-4 h-4 text-emerald-600" />
            <span>Chat WhatsApp</span>
          </a>

          {currentOrder.status === 'pending_admin' && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Yakin ingin membatalkan pesanan ini?')) {
                  cancelOrder(currentOrder.id, 'Dibatalkan oleh pelanggan');
                }
              }}
              className="border-2 border-black bg-white hover:bg-red-50 text-red-600 text-xs font-mono font-bold py-2.5 px-3 flex items-center justify-center gap-1 shadow-[2px_2px_0px_#000]"
              title="Batalkan pesanan ini jika tidak jadi beli"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Batal Pesanan</span>
            </button>
          )}

          <button
            onClick={() => setActiveModal(null)}
            className="brutal-btn-dark py-2.5 px-5 text-xs uppercase font-bold text-white"
          >
            Tutup
          </button>
        </div>

        </div>

      </div>
    </div>
  );
};
