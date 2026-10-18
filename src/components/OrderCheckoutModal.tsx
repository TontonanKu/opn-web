import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ADMIN_CONFIG } from '../data/initialData';
import { 
  X, 
  ShieldCheck, 
  Clock, 
  ArrowRight, 
  QrCode, 
  CreditCard, 
  MessageSquare, 
  CheckCircle2, 
  Copy,
  ExternalLink,
  Eye,
  Gamepad2,
  Smartphone,
  Check,
  Sparkles,
  Tag
} from 'lucide-react';
import { sanitizeInput, validatePhoneNumber, checkRateLimit, isHoneypotTriggered } from '../utils/securityUtils';
import { validatePromoCode } from '../data/promoCodes';

export const OrderCheckoutModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    checkoutItem, 
    createOrder, 
    user, 
    adminStatus 
  } = useApp();

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState<'web_transfer' | 'whatsapp_direct'>('web_transfer');
  const [notes, setNotes] = useState('');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [showQrisPreview, setShowQrisPreview] = useState(false);

  // Promo Voucher States
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number; message: string } | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Bot Protection Honeypot
  const [botTrap, setBotTrap] = useState('');

  // Saved customer data from previous checkout (auto-fill convenience)
  const [savedCheckoutData, setSavedCheckoutData] = useState<{ name: string; phone: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('zura_last_checkout_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name && parsed.phone) {
          setSavedCheckoutData(parsed);
          setCustomerName(prev => prev || parsed.name);
          setCustomerPhone(prev => prev || parsed.phone);
        }
      }
    } catch {
      // ignore storage error
    }
  }, []);

  // Close with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActiveModal]);

  if (activeModal !== 'checkout' || !checkoutItem) return null;

  const isJoki = checkoutItem.serviceType === 'joki_game';

  const itemName = checkoutItem.title;

  const itemDetails = isJoki 
    ? `${checkoutItem.selectedTier?.fromRank}${checkoutItem.selectedTier?.toRank ? ` -> ${checkoutItem.selectedTier?.toRank}` : ''}`
    : `${checkoutItem.selectedVariant?.duration} (${checkoutItem.selectedVariant?.type})`;

  const baseAmount = checkoutItem.price || 0;
  const discountAmount = appliedPromo ? appliedPromo.discount : 0;
  const finalAmount = Math.max(0, baseAmount - discountAmount);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(label);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleApplyPromo = () => {
    setPromoError(null);
    if (!promoCodeInput.trim()) return;

    const result = validatePromoCode(promoCodeInput, baseAmount);
    if (result.isValid) {
      setAppliedPromo({
        code: promoCodeInput.trim().toUpperCase(),
        discount: result.discountAmount,
        message: result.message
      });
      setPromoError(null);
    } else {
      setPromoError(result.message);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput('');
    setPromoError(null);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    // 0. Invisible Honeypot Spam Bot Trap
    if (isHoneypotTriggered(botTrap)) {
      return; // Silent fail for automated bots
    }

    if (!customerName.trim() || !customerPhone.trim()) {
      alert('Silakan isi Nama dan Nomor WhatsApp Anda terlebih dahulu.');
      return;
    }

    // 1. Anti-Spam / Rate-Limiting Protection (Max 3 orders per 60s)
    const rateCheck = checkRateLimit('create_order_limit', 3, 60);
    if (!rateCheck.allowed) {
      alert(`Demi keamanan dan mencegah spam pesanan, mohon tunggu ${rateCheck.waitSeconds} detik sebelum membuat pesanan baru.`);
      return;
    }

    // 2. Phone Number Validation (Indonesian Format)
    const phoneCheck = validatePhoneNumber(customerPhone);
    if (!phoneCheck.isValid) {
      alert('Format nomor WhatsApp tidak valid. Masukkan nomor WhatsApp aktif diawali 08... atau 628... (minimal 10 digit).');
      return;
    }

    // 3. XSS Sanitization
    const cleanCustomerName = sanitizeInput(customerName);
    const cleanCustomerPhone = phoneCheck.normalized;
    const cleanNotes = sanitizeInput(notes);

    // Prepare extra form data
    const extraData: Record<string, string> = {
      ...(checkoutItem.formData || {}),
      customerNotes: cleanNotes
    };

    // Persist customer data for fast checkout next time
    try {
      localStorage.setItem('zura_last_checkout_data', JSON.stringify({
        name: cleanCustomerName,
        phone: cleanCustomerPhone
      }));
    } catch {
      // ignore
    }

    createOrder({
      userId: user?.id,
      customerName: cleanCustomerName,
      customerPhone: cleanCustomerPhone,
      serviceType: checkoutItem.serviceType,
      itemName,
      itemDetails,
      extraFormData: extraData,
      totalAmount: finalAmount,
      originalAmount: baseAmount > finalAmount ? baseAmount : undefined,
      voucherCode: appliedPromo?.code,
      discountAmount: discountAmount > 0 ? discountAmount : undefined,
      paymentMethod,
    });
  };

  return (
    <div 
      onClick={(e) => {
        // Close modal when clicking dark backdrop outside
        if (e.target === e.currentTarget) setActiveModal(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="brutal-card bg-white max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden relative shadow-[6px_6px_0px_#000]">
        
        {/* Sticky Header - NEVER SCROLLS OUT OF VIEW */}
        <div className="sticky top-0 bg-white z-30 px-5 py-3.5 border-b-[2.5px] border-black flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="bg-[#121212] text-[#FFC700] text-[11px] font-mono font-black px-2 py-0.5 uppercase">
              CHECKOUT SISTEM RESMI
            </span>
            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 border border-black ${
              adminStatus === 'online' ? 'bg-emerald-300 text-emerald-950' : 'bg-red-300 text-red-950'
            }`}>
              {adminStatus === 'online' ? '● Admin Online' : '● Admin Offline'}
            </span>
          </div>

          {/* High-visibility Close Button */}
          <button 
            type="button"
            onClick={() => setActiveModal(null)}
            className="p-1.5 border-2 border-black bg-[#FFC700] hover:bg-[#FF5900] hover:text-white transition-all shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 flex items-center gap-1 font-mono text-xs font-black"
            title="Tutup Modal (Tekan Esc)"
          >
            <X className="w-5 h-5" />
            <span className="hidden sm:inline">TUTUP</span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-4">
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-[#121212] uppercase leading-tight">
              Konfirmasi Pesanan
            </h2>
            <p className="text-xs text-neutral-600 font-medium mt-0.5">
              Sistem order langsung tanpa payment gateway otomatis. Pilih bayar via Web atau chat WhatsApp.
            </p>
          </div>

          {/* 10 Minute Guarantee Reminder Banner */}
          <div className="bg-[#FFC700] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] flex items-start gap-2.5">
            <Clock className="w-5 h-5 text-black shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-extrabold uppercase block text-[#121212]">
                Aturan Respon 10 Menit:
              </span>
              <p className="text-neutral-900 font-medium mt-0.5 leading-relaxed">
                Setelah tombol checkout ditekan, Anda akan mendapatkan <strong>Kode Checkout Unik</strong>. 
                Jika dalam 10 menit admin belum merespon pesanan Anda di web, sistem akan mengarahkan Anda untuk mengirim kode tersebut langsung ke WhatsApp admin!
              </p>
            </div>
          </div>

          {/* Order Item Summary Card */}
          <div className="border-2 border-black bg-[#FAF8F2] p-4 shadow-[2px_2px_0px_#000]">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-2 mb-2">
              <div>
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase flex items-center gap-1.5">
                  {isJoki ? (
                    <>
                      <Gamepad2 className="w-3.5 h-3.5 text-[#FF5900]" />
                      <span>JASA JOKI GAME</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-3.5 h-3.5 text-[#FF5900]" />
                      <span>APLIKASI PREMIUM</span>
                    </>
                  )}
                </span>
                <h4 className="font-display font-black text-lg text-[#121212]">{itemName}</h4>
                <p className="text-xs font-mono font-semibold text-[#FF5900]">{itemDetails}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Biaya</span>
                {discountAmount > 0 ? (
                  <div>
                    <span className="text-xs font-mono line-through text-neutral-400 block">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(baseAmount)}
                    </span>
                    <span className="font-display font-black text-xl text-emerald-600">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(finalAmount)}
                    </span>
                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-500 px-1.5 py-0.5 inline-block mt-0.5">
                      HEMAT {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(discountAmount)}
                    </span>
                  </div>
                ) : (
                  <span className="font-display font-black text-xl text-[#121212]">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(finalAmount)}
                  </span>
                )}
              </div>
            </div>

            {/* Additional details filled by user */}
            {checkoutItem.formData && Object.keys(checkoutItem.formData).length > 0 && (
              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-2.5 border border-black mt-2">
                {Object.entries(checkoutItem.formData).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-neutral-500 capitalize">{key}: </span>
                    <span className="font-bold text-black">{String(val) || '-'}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Form */}
          <form onSubmit={handleSubmitOrder} className="space-y-4">
            
            {/* Honeypot anti-spam trap (invisible to real users) */}
            <input
              type="text"
              name="b_trap"
              value={botTrap}
              onChange={(e) => setBotTrap(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            {/* Promo Voucher Code Card */}
            <div className="border-2 border-black bg-white p-3.5 shadow-[2px_2px_0px_#000]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#FF5900]" />
                  <span className="text-xs font-mono font-bold uppercase text-[#121212]">
                    Klaim Voucher Promo
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">Opsional</span>
              </div>

              {appliedPromo ? (
                <div className="bg-emerald-50 border-2 border-emerald-600 p-2.5 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-emerald-600 text-white font-mono font-black text-xs px-2 py-0.5">
                        {appliedPromo.code}
                      </span>
                      <span className="text-xs font-bold text-emerald-800">
                        Hemat {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(appliedPromo.discount)}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-emerald-700 mt-1">{appliedPromo.message}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    className="text-xs font-mono font-bold text-red-600 hover:text-red-800 border border-red-300 bg-white px-2 py-1 hover:border-red-600 shadow-[1px_1px_0px_#000]"
                  >
                    Hapus
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Masukkan kode voucher (e.g. ZURAGACOR)"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-[#FAF8F2] border-2 border-black p-2 text-xs font-mono font-bold uppercase focus:outline-none focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="brutal-btn-yellow px-4 py-2 text-xs font-mono font-bold uppercase shadow-[2px_2px_0px_#000]"
                    >
                      Terapkan
                    </button>
                  </div>

                  {promoError && (
                    <p className="text-[11px] font-mono text-red-600 font-semibold">{promoError}</p>
                  )}

                  {/* Preset Promo Suggestions */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10px] font-mono text-neutral-500">Coba kode:</span>
                    {['ZURAGACOR', 'HEMAT10', 'BOOSTKILAT'].map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          setPromoCodeInput(code);
                          const result = validatePromoCode(code, baseAmount);
                          if (result.isValid) {
                            setAppliedPromo({
                              code,
                              discount: result.discountAmount,
                              message: result.message
                            });
                            setPromoError(null);
                          } else {
                            setPromoError(result.message);
                          }
                        }}
                        className="text-[10px] font-mono font-bold bg-[#FAF8F2] hover:bg-[#FFC700] border border-black px-1.5 py-0.5 transition-colors"
                      >
                        +{code}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Auto-fill from previous session */}
            {savedCheckoutData && (customerName !== savedCheckoutData.name || customerPhone !== savedCheckoutData.phone) && (
              <div className="bg-[#FFF3B0] border-2 border-black p-2.5 flex items-center justify-between text-xs font-mono shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-1.5 truncate">
                  <Sparkles className="w-4 h-4 text-[#FF5900] shrink-0" />
                  <span className="truncate">Data sebelumnya: <strong>{savedCheckoutData.name}</strong> ({savedCheckoutData.phone})</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setCustomerName(savedCheckoutData.name);
                    setCustomerPhone(savedCheckoutData.phone);
                  }}
                  className="bg-black hover:bg-neutral-800 text-[#FFC700] px-2.5 py-1 text-[11px] font-mono font-black uppercase shrink-0 transition-colors"
                >
                  ⚡ Gunakan
                </button>
              </div>
            )}

            {/* Customer Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#121212] mb-1">
                  Nama Lengkap / Panggilan *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#121212] mb-1">
                  Nomor WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 082172795156"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-white border-2 border-black p-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#121212] mb-2">
                Pilih Opsi Pembayaran:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Option 1: Bayar di Web */}
                <div
                  onClick={() => setPaymentMethod('web_transfer')}
                  className={`p-3.5 border-2 border-black cursor-pointer transition-all ${
                    paymentMethod === 'web_transfer'
                      ? 'bg-[#FFC700] shadow-[3px_3px_0px_#000]'
                      : 'bg-[#FAF8F2] hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <CreditCard className="w-4 h-4 text-black" />
                    <span className="font-bold text-xs uppercase">Bayar Langsung di Web</span>
                  </div>
                  <p className="text-[11px] text-neutral-700 leading-snug">
                    Scan <strong>QRIS</strong> atau transfer <strong>DANA / GoPay</strong>. Verifikasi via chat room web.
                  </p>
                </div>

                {/* Option 2: Bayar via WhatsApp */}
                <div
                  onClick={() => setPaymentMethod('whatsapp_direct')}
                  className={`p-3.5 border-2 border-black cursor-pointer transition-all ${
                    paymentMethod === 'whatsapp_direct'
                      ? 'bg-emerald-300 shadow-[3px_3px_0px_#000]'
                      : 'bg-[#FAF8F2] hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <MessageSquare className="w-4 h-4 text-emerald-900" />
                    <span className="font-bold text-xs uppercase">Bayar via WhatsApp</span>
                  </div>
                  <p className="text-[11px] text-neutral-700 leading-snug">
                    Dapatkan kode checkout unik di web, lalu selesaikan transaksi langsung di chat WhatsApp.
                  </p>
                </div>

              </div>
            </div>

            {/* QRIS & E-Wallet Details (Only QRIS, DANA, GoPay) */}
            {paymentMethod === 'web_transfer' && (
              <div className="bg-[#FAF8F2] border-2 border-black p-4 space-y-3 shadow-[2px_2px_0px_#000]">
                
                <div className="flex items-center justify-between border-b border-neutral-300 pb-2">
                  <span className="text-xs font-mono font-black text-[#121212] uppercase flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-[#FF5900]" />
                    <span>Pembayaran: QRIS & E-Wallet Resmi</span>
                  </span>
                  <span className="text-[10px] font-mono bg-[#121212] text-[#FFC700] px-2 py-0.5 font-bold">
                    BEBAS BIAYA ADMIN
                  </span>
                </div>

                {/* QRIS Card with Real Image from User */}
                <div className="bg-white border-2 border-black p-3.5 flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative group cursor-pointer shrink-0" onClick={() => setShowQrisPreview(!showQrisPreview)}>
                    <img 
                      src={ADMIN_CONFIG.qrisImageUrl} 
                      alt="QRIS KAZURA STORE" 
                      className="w-28 h-auto border-2 border-black object-contain shadow-[2px_2px_0px_#000]"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Perbesar</span>
                    </div>
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                      <span className="font-display font-black text-sm uppercase">QRIS KAZURA STORE</span>
                      <span className="bg-green-100 text-green-800 text-[9px] font-mono font-bold px-1.5 border border-green-500">
                        ALL PAYMENT
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-600 leading-tight mb-2">
                      Support semua aplikasi: BCA Mobile, Mandiri Livin, BRImo, BNI, DANA, GoPay, OVO, ShopeePay, LinkAja.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(ADMIN_CONFIG.qrisNmid || 'ID1025393427014', 'qris')}
                        className="text-[11px] font-mono font-bold bg-[#FFC700] px-2.5 py-1 border border-black hover:bg-black hover:text-[#FFC700] transition-colors flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        {copiedBank === 'qris' ? (
                          <span className="flex items-center gap-1">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>NMID Disalin</span>
                          </span>
                        ) : (
                          <span>Salin NMID: ID1025393427014</span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowQrisPreview(!showQrisPreview)}
                        className="text-[11px] font-mono font-bold bg-white px-2.5 py-1 border border-black hover:bg-neutral-100 transition-colors flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>{showQrisPreview ? 'Tutup Preview' : 'Buka QRIS Penuh'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* QRIS Full Preview Drawer/Modal if clicked */}
                {showQrisPreview && (
                  <div className="p-3 bg-white border-2 border-black animate-fade-in flex flex-col items-center">
                    <img 
                      src={ADMIN_CONFIG.qrisImageUrl} 
                      alt="QRIS KAZURA STORE Penuh" 
                      className="max-h-[350px] w-auto border-2 border-black shadow-[3px_3px_0px_#000]"
                    />
                    <span className="text-[11px] font-mono text-neutral-500 mt-2">
                      Scan kode QR di atas menggunakan aplikasi m-Banking atau E-Wallet pilihan Anda.
                    </span>
                  </div>
                )}

                {/* E-Wallet DANA & GoPay Unified Card (No a/n, Just Number) */}
                <div className="pt-1">
                  <span className="text-[11px] font-mono font-bold text-neutral-600 uppercase block mb-1.5">
                    Atau Transfer E-Wallet Langsung:
                  </span>

                  <div className="flex items-center justify-between bg-white border-2 border-black p-2.5 sm:p-3 text-xs shadow-[2px_2px_0px_#000]">
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <div className="flex items-center gap-1.5">
                        <span className="bg-[#118EEA] text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                          DANA
                        </span>
                        <span className="bg-[#00AA13] text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                          GOPAY
                        </span>
                      </div>
                      <span className="font-mono font-black text-sm sm:text-base text-[#121212] tracking-wider">
                        0821-7279-5156
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('082172795156', 'ewallet')}
                      className="text-[11px] font-mono font-bold bg-[#FFC700] px-3.5 py-1.5 border border-black hover:bg-black hover:text-[#FFC700] transition-colors shadow-[1.5px_1.5px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 shrink-0 flex items-center gap-1"
                    >
                      {copiedBank === 'ewallet' ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>Disalin</span>
                        </>
                      ) : (
                        <span>Salin Nomor</span>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* Optional notes */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase text-[#121212] mb-1">
                Catatan Khusus (Opsional)
              </label>
              <input
                type="text"
                placeholder="Contoh: Tolong proses sekarang ya min, saya standby"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border-2 border-black p-2.5 text-xs font-medium focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="submit"
                className="flex-1 brutal-btn-yellow py-3.5 px-6 flex items-center justify-center gap-2 text-sm uppercase group"
              >
                <span>BUAT ORDER & DAPATKAN KODE</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="brutal-btn-white py-3.5 px-6 text-xs uppercase font-mono font-bold text-neutral-700 hover:text-black"
              >
                Batal
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-1.5 text-center pt-1">
              <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-600">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Garansi transaksi aman & kode order unik tercatat otomatis di sistem.</span>
              </div>
              <p className="text-[10px] font-mono text-neutral-500">
                Dengan melanjutkan, Anda menyetujui{' '}
                <button
                  type="button"
                  onClick={() => setActiveModal('terms')}
                  className="text-black font-bold underline hover:text-[#FF5900] transition-colors"
                >
                  Ketentuan Layanan, Garansi 100%, & Kebijakan Privasi
                </button>
              </p>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
