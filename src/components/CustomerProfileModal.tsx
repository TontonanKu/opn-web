import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { 
  X, 
  User, 
  Package, 
  Clock, 
  CheckCircle2, 
  Receipt, 
  ExternalLink, 
  Smartphone, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  Save, 
  ArrowRight,
  Sparkles,
  ShoppingBag,
  AlertCircle,
  HelpCircle,
  Crown
} from 'lucide-react';
import { ADMIN_CONFIG } from '../data/initialData';
import { sanitizeInput } from '../utils/securityUtils';

export const CustomerProfileModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    user, 
    myOrders, 
    logout, 
    updateUserName, 
    openOrderTracking, 
    openReceiptModal,
    setViewMode 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [newUsername, setNewUsername] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync newUsername with current user name
  useEffect(() => {
    if (user) {
      setNewUsername(user.name);
    }
  }, [user]);

  // Handle escape key
  useEffect(() => {
    if (activeModal !== 'customer-profile') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'customer-profile' || !user) return null;

  // Filter orders for this customer (isolated via myOrders)
  const userOrders = [...myOrders].sort((a, b) => b.createdAt - a.createdAt);

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaveSuccess(false);

    const clean = sanitizeInput(newUsername.trim());
    if (!clean || clean.length < 2) {
      setErrorMessage('Username minimal harus 2 karakter.');
      return;
    }

    const ok = updateUserName(clean);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } else {
      setErrorMessage('Username tersebut tidak dapat digunakan (dilindungi sistem atau tidak valid).');
    }
  };

  const formatDate = (timestamp: number) => {
    try {
      const d = new Date(timestamp);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB';
    } catch {
      return '-';
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending_admin':
        return (
          <span className="inline-flex items-center gap-1.5 bg-[#FFC700] text-black border border-black px-2 py-0.5 text-[10px] font-mono font-bold animate-pulse">
            <Clock className="w-3 h-3" />
            <span>MENUNGGU ADMIN</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1.5 bg-blue-400 text-black border border-black px-2 py-0.5 text-[10px] font-mono font-bold">
            <Sparkles className="w-3 h-3" />
            <span>SEDANG DIKERJAKAN</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 bg-emerald-400 text-black border border-black px-2 py-0.5 text-[10px] font-mono font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>SELESAI</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 bg-red-400 text-black border border-black px-2 py-0.5 text-[10px] font-mono font-bold">
            <X className="w-3 h-3" />
            <span>DIBATALKAN</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveModal(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="brutal-card bg-[#FAF8F5] max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden relative shadow-[6px_6px_0px_#000]">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#FAF8F5] z-30 px-5 py-4 border-b-[2.5px] border-black flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFC700] border-2 border-black flex items-center justify-center font-display font-black text-xl shadow-[2px_2px_0px_#000]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-[#121212] text-[#FFC700] text-[10px] font-mono font-black px-2 py-0.5 uppercase">
                  MEMBER RESMI
                </span>
                <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase">
                  EST. 2025
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-display font-black text-[#121212] uppercase leading-tight">
                {user.name}
              </h2>
            </div>
          </div>

          <button 
            type="button"
            onClick={() => setActiveModal(null)}
            className="p-1.5 border-2 border-black bg-white hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_#000]"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Admin Quick Jump Banner */}
        {user.role === 'admin' && (
          <div className="bg-[#121212] text-white p-3.5 border-b-2 border-black flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#FFC700] text-black border border-white flex items-center justify-center shrink-0">
                <Crown className="w-5 h-5 text-black" />
              </div>
              <div>
                <div className="font-mono font-black text-xs text-[#FFC700] uppercase">
                  STATUS AKUN: SUPER ADMINISTRATOR
                </div>
                <div className="text-[11px] text-neutral-300">
                  Akses langsung dashboard admin untuk kelola order & chat
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setActiveModal(null);
                setViewMode('admin-dashboard');
              }}
              className="bg-[#FFC700] hover:bg-[#FFD43B] text-black font-mono font-black text-xs px-3.5 py-2 border border-black shadow-[2px_2px_0px_#FFF] shrink-0 uppercase transition-all"
            >
              BUKA PANEL ADMIN &rarr;
            </button>
          </div>
        )}

        {/* Tab Controls */}
        <div className="flex border-b-2 border-black bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 px-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 border-r-2 border-black transition-all ${
              activeTab === 'orders'
                ? 'bg-[#FFD43B] text-black shadow-inner'
                : 'bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Riwayat Pesanan</span>
            <span className="bg-black text-[#FFD43B] px-1.5 py-0.2 text-[10px] font-bold">
              {userOrders.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 transition-all ${
              activeTab === 'profile'
                ? 'bg-[#FFD43B] text-black shadow-inner'
                : 'bg-white text-neutral-600 hover:bg-neutral-50'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Pengaturan Akun</span>
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          
          {/* TAB 1: RIWAYAT PESANAN */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-neutral-600 uppercase">
                  Daftar Pesanan ({userOrders.length} Transaksi)
                </span>
                <span className="font-mono text-[11px] text-neutral-500">
                  Update Real-Time 10 Menit
                </span>
              </div>

              {userOrders.length === 0 ? (
                /* Empty Orders State */
                <div className="border-2 border-dashed border-neutral-300 p-8 text-center bg-white">
                  <div className="w-14 h-14 bg-[#FFF3B0] border-2 border-black flex items-center justify-center mx-auto mb-3 shadow-[2px_2px_0px_#000]">
                    <ShoppingBag className="w-7 h-7 text-[#FF5900]" />
                  </div>
                  <h3 className="font-display font-black text-lg text-black uppercase mb-1">
                    Belum Ada Riwayat Pesanan
                  </h3>
                  <p className="text-xs font-mono text-neutral-600 max-w-sm mx-auto mb-5">
                    Akun Anda belum memiliki transaksi aktif atau selesai. Pesanan joki dan aplikasi premium Anda akan muncul di sini.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal(null);
                      const el = document.getElementById('joki');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="brutal-btn-orange text-xs py-2.5 px-5 inline-flex items-center gap-2 font-black uppercase"
                  >
                    <span>Mulai Order Sekarang</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Orders List */
                <div className="space-y-3.5">
                  {userOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_#000] hover:shadow-[4px_4px_0px_#000] transition-all"
                    >
                      {/* Top Bar of Order Card */}
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-100 pb-2.5 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-xs bg-[#121212] text-[#FFC700] px-2 py-0.5">
                            {order.orderCode}
                          </span>
                          <span className="font-mono text-[10px] text-neutral-500">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      {/* Main Details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
                        <div>
                          <h4 className="font-display font-black text-sm uppercase text-[#121212]">
                            {order.itemName}
                          </h4>
                          <p className="font-mono text-xs text-neutral-600 mt-0.5">
                            {order.itemDetails}
                          </p>
                          {order.extraFormData?.customerNotes && (
                            <p className="font-mono text-[11px] text-neutral-500 italic mt-1 bg-neutral-50 p-1.5 border border-neutral-200">
                              Catatan: {order.extraFormData.customerNotes}
                            </p>
                          )}
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-[10px] font-mono text-neutral-500 block">TOTAL BIAYA</span>
                          <span className="font-display font-black text-base text-[#FF5900]">
                            Rp {order.totalAmount.toLocaleString('id-ID')}
                          </span>
                          <span className="text-[10px] font-mono font-bold block text-neutral-600">
                            {order.paymentMethod === 'web_transfer' ? 'Transfer Bank / QRIS' : 'WhatsApp Direct'}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModal(null);
                            openOrderTracking(order);
                          }}
                          className="brutal-btn-orange text-xs py-1.5 px-3 flex items-center gap-1.5 font-mono font-bold"
                          title="Buka panel live tracking order ini"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Lacak Pesanan</span>
                        </button>

                        {(order.receipt || order.status === 'completed') && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModal(null);
                              openReceiptModal(order);
                            }}
                            className="bg-white hover:bg-neutral-100 text-black border-2 border-black py-1.5 px-3 text-xs font-mono font-bold flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#000]"
                            title="Buka Struk Resmi"
                          >
                            <Receipt className="w-3.5 h-3.5 text-[#FF5900]" />
                            <span>Struk Resmi</span>
                          </button>
                        )}

                        <a
                          href={`https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=Halo%20Admin%20Zura,%20saya%20ingin%20tanya%20order%20${order.orderCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono font-bold text-neutral-600 hover:text-black ml-auto flex items-center gap-1 underline"
                        >
                          <span>Chat CS Order</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PENGATURAN AKUN & UBAH USERNAME */}
          {activeTab === 'profile' && (
            <div className="space-y-5">
              
              {/* Account Info Card */}
              <div className="bg-[#FFF3B0] border-2 border-black p-4 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs font-black uppercase text-[#121212]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Informasi Akun Terverifikasi</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono mt-3">
                  <div className="bg-white p-2.5 border border-black">
                    <span className="text-neutral-500 block text-[10px]">NOMOR WHATSAPP</span>
                    <span className="font-black text-neutral-900 flex items-center gap-1 mt-0.5">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                      {user.phone}
                    </span>
                  </div>
                  <div className="bg-white p-2.5 border border-black">
                    <span className="text-neutral-500 block text-[10px]">STATUS ROLE</span>
                    <span className="font-black text-neutral-900 mt-0.5 block">
                      {user.role === 'admin' ? 'SUPER ADMINISTRATOR' : 'PELANGGAN RESMI'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Success Notification */}
              {saveSuccess && (
                <div className="p-3 bg-emerald-100 border-2 border-emerald-600 text-xs font-mono text-emerald-900 font-bold flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Username berhasil diperbarui menjadi "{user.name}"!</span>
                </div>
              )}

              {/* Error Notification */}
              {errorMessage && (
                <div className="p-3 bg-red-100 border-2 border-red-600 text-xs font-mono text-red-900 font-bold flex items-center gap-2 shadow-[2px_2px_0px_#000]">
                  <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Edit Username Form */}
              <form onSubmit={handleUpdateName} className="bg-white border-2 border-black p-4 sm:p-5 shadow-[3px_3px_0px_#000] space-y-4">
                <div className="border-b-2 border-black pb-2">
                  <h3 className="font-display font-black text-sm uppercase text-[#121212] flex items-center gap-2">
                    <Edit3 className="w-4 h-4 text-[#FF5900]" />
                    <span>Ubah Username / Nama Lengkap</span>
                  </h3>
                  <p className="text-[11px] font-mono text-neutral-500 mt-0.5">
                    Nama ini akan digunakan pada struk transaksi, live chat CS, dan profil akun Anda.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono font-black uppercase text-[#121212] mb-1.5">
                    Username Baru
                  </label>
                  <div className="flex items-center border-2 border-black bg-[#FAF8F5]">
                    <span className="pl-3 text-neutral-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={40}
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Masukkan nama/username baru"
                      className="w-full p-2.5 text-xs font-bold focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="brutal-btn-yellow py-2.5 px-5 text-xs uppercase font-black tracking-wide flex items-center gap-2 shadow-brutal-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>SIMPAN PERUBAHAN USERNAME</span>
                </button>
              </form>

              {/* Account Security Tips */}
              <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_#000] text-xs font-mono space-y-2">
                <div className="font-black text-[#121212] flex items-center gap-2 uppercase">
                  <HelpCircle className="w-4 h-4 text-[#FF5900]" />
                  <span>Keamanan Akun Zura Store</span>
                </div>
                <p className="text-neutral-600 text-[11px] leading-relaxed">
                  Akun Anda terikat pada nomor WhatsApp terdaftar. Password Anda disimpan secara aman menggunakan enkripsi SHA-256. Jangan pernah berikan password akun kepada siapa pun.
                </p>
              </div>

              {/* Logout Action */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setActiveModal(null);
                  }}
                  className="w-full border-2 border-red-600 bg-red-50 hover:bg-red-100 text-red-700 py-3 px-4 font-mono font-black text-xs uppercase flex items-center justify-center gap-2 transition-colors shadow-[2px_2px_0px_#991b1b]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar dari Akun (Logout)</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
