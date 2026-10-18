import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Receipt, 
  Plus, 
  AlertCircle, 
  User, 
  Upload, 
  MessageSquare,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  LogOut,
  Send,
  Eye,
  Check,
  Search,
  Trash2,
  XCircle,
  Star,
  Archive,
  Lock,
  Image as ImageIcon,
  ZoomIn,
  Download,
  X,
  Volume2,
  VolumeX,
  Bell,
  DollarSign,
  Bot,
  Info,
  ClipboardList,
  Package,
  ShieldCheck,
  Smartphone,
  BellRing,
  HelpCircle
} from 'lucide-react';
import { Order } from '../types';
import { compressImageFile } from '../utils/imageUtils';
import { exportOrdersToCSV } from '../utils/exportUtils';
import { TelegramConfig, getTelegramConfig, saveTelegramConfig, testTelegramConnection } from '../utils/telegramUtils';
import { 
  isNotificationSupported, 
  getNotificationPermission, 
  requestNotificationPermission, 
  triggerTestMobileNotification 
} from '../utils/notificationService';

export const AdminDashboardView: React.FC = () => {
  const { 
    adminStatus, 
    setAdminStatus, 
    orders, 
    updateOrderStatus, 
    deleteOrder,
    cancelOrder,
    closeChatRoom,
    deleteChatRoom,
    addWhatsAppTestimonial,
    openReceiptModal,
    submitOrderReview,
    chatMessages,
    sendChatMessage,
    getAllRooms,
    getMessagesForRoom,
    adminActiveRoomId,
    setAdminActiveRoomId,
    setViewMode,
    logout,
    isSoundEnabled,
    toggleSound,
    testSound
  } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'chat' | 'testi' | 'telegram'>('orders');
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>(() => getNotificationPermission());
  
  // Telegram Bot Settings State
  const [tgConfig, setTgConfig] = useState<TelegramConfig>(getTelegramConfig());
  const [tgTesting, setTgTesting] = useState(false);
  const [tgTestResult, setTgTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [tgSavedSuccess, setTgSavedSuccess] = useState(false);

  const handleSaveTelegram = (e: React.FormEvent) => {
    e.preventDefault();
    saveTelegramConfig(tgConfig);
    setTgSavedSuccess(true);
    setTimeout(() => setTgSavedSuccess(false), 3000);
  };

  const handleTestTelegram = async () => {
    if (!tgConfig.botToken.trim() || !tgConfig.chatId.trim()) {
      alert('Harap isi Bot Token dan Chat ID Telegram Anda terlebih dahulu.');
      return;
    }
    setTgTesting(true);
    setTgTestResult(null);
    const res = await testTelegramConnection(tgConfig.botToken, tgConfig.chatId);
    setTgTesting(false);
    setTgTestResult(res);
  };

  const [chatSubTab, setChatSubTab] = useState<'order' | 'general'>('order');
  const [adminReplyText, setAdminReplyText] = useState('');
  const [adminSelectedImage, setAdminSelectedImage] = useState<string | null>(null);
  const [adminUploading, setAdminUploading] = useState(false);
  const [adminLightboxImage, setAdminLightboxImage] = useState<string | null>(null);
  const adminFileInputRef = React.useRef<HTMLInputElement>(null);
  const [orderFilter, setOrderFilter] = useState<'all' | 'pending' | 'processing' | 'completed' | 'cancelled'>('all');

  const handleAdminImageFile = async (file: File) => {
    try {
      setAdminUploading(true);
      const base64 = await compressImageFile(file);
      setAdminSelectedImage(base64);
    } catch (err: any) {
      alert(err.message || 'Gagal memproses gambar.');
    } finally {
      setAdminUploading(false);
    }
  };

  const handleAdminFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleAdminImageFile(file);
    e.target.value = '';
  };

  const handleAdminPaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          handleAdminImageFile(file);
          break;
        }
      }
    }
  };

  // New WhatsApp Testimonial Form State
  const [waCustName, setWaCustName] = useState('');
  const [waCategory, setWaCategory] = useState('Joki Game');
  const [waSnippet, setWaSnippet] = useState('');
  const [waScreenshotUrl, setWaScreenshotUrl] = useState('');
  const [waRating, setWaRating] = useState(5);

  const filteredOrders = orders.filter(o => {
    if (orderFilter === 'all') return true;
    if (orderFilter === 'pending') return o.status === 'pending_admin';
    if (orderFilter === 'processing') return o.status === 'processing';
    if (orderFilter === 'completed') return o.status === 'completed';
    if (orderFilter === 'cancelled') return o.status === 'cancelled';
    return true;
  });

  // Financial & Operational Metrics
  const totalRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const formattedRevenue = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalRevenue);
  const completedOrdersCount = orders.filter(o => o.status === 'completed').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending_admin').length;
  const processingOrdersCount = orders.filter(o => o.status === 'processing').length;

  const handleDeleteOrder = (orderId: string, orderCode: string) => {
    if (window.confirm(`Yakin ingin MENGHAPUS pesanan [KODE: ${orderCode}]? Data akan dihapus dari antrean.`)) {
      deleteOrder(orderId);
    }
  };

  const handleCancelOrder = (orderId: string, orderCode: string) => {
    const reason = prompt(`Alasan pembatalan pesanan ${orderCode}:`, 'Pelanggan tidak jadi beli / batal transaksi.');
    if (reason !== null) {
      cancelOrder(orderId, reason);
    }
  };

  const allRooms = getAllRooms();
  const orderRooms = allRooms.filter(r => r.type === 'order');
  const generalRooms = allRooms.filter(r => r.type === 'general');
  const displayedRooms = chatSubTab === 'order' ? orderRooms : generalRooms;
  const currentSelectedRoom = allRooms.find(r => r.roomId === adminActiveRoomId);

  const handleRequestReview = (order: Order) => {
    sendChatMessage(
      `🎉 Halo kak ${order.customerName}! Pesanan #${order.orderCode} (${order.itemName}) telah selesai dikerjakan.\n\nMohon bantu luangkan waktu 5 detik untuk memberikan rating bintang ⭐ dan ulasan di Live Chat ini atau via menu Lacak Pesanan ya. Terima kasih banyak!`,
      order.orderCode,
      'admin',
      order.orderCode
    );
    alert(`Permintaan rating & ulasan telah dikirim ke ruang chat #${order.orderCode}`);
  };

  const handleQuickAutoReview = (order: Order) => {
    if (window.confirm(`Tetapkan rating 5★ dan ulasan terverifikasi otomatis untuk #${order.orderCode}?`)) {
      submitOrderReview(order.id, 5, 'Pelayanan cepat.');
    }
  };

  const handleFinishOrder = (order: Order) => {
    const adminNote = prompt('Catatan admin untuk struk transaksi:', 'Jasa selesai 100% tepat waktu sesuai request.');
    const review = prompt('Ulasan / feedback pelanggan untuk struk (Kosongkan jika ingin customer isi sendiri di web/chat):', '');
    
    updateOrderStatus(order.id, 'completed', {
      adminNotes: adminNote || undefined,
      review: review ? review : undefined,
      rating: 5
    });
  };

  const handleCreateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waCustName.trim() || !waSnippet.trim()) {
      alert('Nama dan isi chat testimoni wajib diisi');
      return;
    }

    addWhatsAppTestimonial({
      customerName: waCustName,
      serviceCategory: waCategory,
      date: 'Baru saja',
      chatSnippet: waSnippet,
      screenshotUrl: waScreenshotUrl || '/testimonials/wuwa/Group 1.png',
      rating: Number(waRating),
      orderCode: `ZURA-WA-${Math.floor(10000 + Math.random() * 90000)}`
    });

    alert('Testimoni WhatsApp berhasil ditambahkan!');
    setWaCustName('');
    setWaSnippet('');
    setWaScreenshotUrl('');
    setActiveTab('orders');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] flex flex-col selection:bg-[#FFC700] selection:text-black">
      
      {/* Top Header */}
      <header className="bg-[#121212] text-white border-b-[3px] border-black sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FFC700] text-black border-2 border-white flex items-center justify-center font-display font-black text-xl shadow-[2px_2px_0px_#FFF]">
              Z
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl tracking-tight text-white leading-none">
                  ADMIN DASHBOARD
                </span>
                <span className="bg-[#FF5900] text-white text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase">
                  PORTAL UTAMA
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-400">
                Pusat Kontrol Pesanan, Live Chat & Status CS
              </span>
            </div>
          </div>

          {/* Center: Live Status Switcher & Sound Notifications */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 px-3 py-1.5 font-mono text-xs">
              <span className="text-neutral-400 font-bold uppercase">Status CS Toko:</span>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setAdminStatus('online')}
                  className={`px-3 py-1 font-bold text-xs uppercase border border-black transition-all flex items-center gap-1.5 ${
                    adminStatus === 'online'
                      ? 'bg-green-500 text-black shadow-[2px_2px_0px_#000]'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-black animate-pulse"></span>
                  <span>ONLINE</span>
                </button>
                <button
                  onClick={() => setAdminStatus('offline')}
                  className={`px-3 py-1 font-bold text-xs uppercase border border-black transition-all flex items-center gap-1.5 ${
                    adminStatus === 'offline'
                      ? 'bg-red-600 text-white shadow-[2px_2px_0px_#000]'
                      : 'bg-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                  <span>OFFLINE</span>
                </button>
              </div>
            </div>

            {/* Sound Notification Control */}
            <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 px-2.5 py-1.5 font-mono text-xs">
              <button
                type="button"
                onClick={toggleSound}
                className={`px-2.5 py-1 font-black text-xs uppercase border border-black transition-all flex items-center gap-1.5 ${
                  isSoundEnabled
                    ? 'bg-[#FFC700] text-black shadow-[2px_2px_0px_#FFF]'
                    : 'bg-neutral-800 text-neutral-400 hover:text-white'
                }`}
                title="Nyalakan / Matikan Bel Notifikasi Order & Chat"
              >
                {isSoundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{isSoundEnabled ? 'Bel: ON' : 'Bel: BISU'}</span>
              </button>
              {isSoundEnabled && (
                <button
                  type="button"
                  onClick={testSound}
                  className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-yellow-300 hover:text-white border border-neutral-600 text-[11px] font-bold flex items-center gap-1 transition-colors"
                  title="Uji coba bunyikan bel Web Audio"
                >
                  <Bell className="w-3 h-3 text-yellow-300" />
                  <span>Tes Bel</span>
                </button>
              )}
            </div>

            {/* Mobile / Screen Pop-up Notification Control */}
            <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-700 px-2.5 py-1.5 font-mono text-xs">
              <div className="flex items-center gap-1 text-neutral-300">
                <Smartphone className="w-3.5 h-3.5 text-[#FF5900]" />
                <span className="hidden xl:inline text-[11px]">Notif Layar HP:</span>
              </div>
              {notifPermission === 'granted' ? (
                <>
                  <span className="px-2 py-0.5 bg-green-950 text-green-400 border border-green-600 text-[10px] font-black uppercase">
                    AKTIF
                  </span>
                  <button
                    type="button"
                    onClick={() => triggerTestMobileNotification()}
                    className="px-2 py-1 bg-[#FFC700] hover:bg-[#FFD633] text-black border border-black text-[11px] font-bold flex items-center gap-1 transition-colors active:scale-95 shadow-[2px_2px_0px_#000]"
                    title="Uji coba pop-up banner, suara dan getar HP"
                  >
                    <BellRing className="w-3 h-3 text-black" />
                    <span>Tes Notif HP</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={async () => {
                    const granted = await requestNotificationPermission();
                    setNotifPermission(granted ? 'granted' : 'denied');
                  }}
                  className="px-2.5 py-1 bg-green-500 hover:bg-green-600 text-black border border-black text-[11px] font-black flex items-center gap-1 transition-colors animate-pulse"
                  title="Izinkan notifikasi pop-up di layar HP/browser ketika ada order baru"
                >
                  <Bell className="w-3.5 h-3.5 text-black" />
                  <span>Aktifkan Notif HP</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setViewMode('store')}
              className="bg-white text-black font-mono font-bold text-xs py-2 px-3 border border-black shadow-[2px_2px_0px_#FFF] hover:bg-[#FFC700] transition-colors flex items-center gap-1.5"
              title="Buka tampilan toko publik"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lihat Toko Publik</span>
            </button>

            <button
              onClick={() => {
                logout();
                setViewMode('store');
              }}
              className="bg-red-600 text-white font-mono font-bold text-xs py-2 px-3 border border-black shadow-[2px_2px_0px_#000] hover:bg-red-700 transition-colors flex items-center gap-1.5"
              title="Keluar dari akun admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar Admin</span>
            </button>
          </div>

        </div>
      </header>

      {/* Navigation Sub-bar */}
      <div className="bg-[#FAF8F2] border-b-[3px] border-black py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Main Navigation Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-5 py-2.5 font-mono text-xs font-black uppercase border-2 border-black transition-all flex items-center gap-2 ${
                activeTab === 'orders' 
                  ? 'bg-[#FFC700] text-black shadow-brutal-sm' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <ClipboardList className="w-4 h-4 text-black" />
              <span>Kelola Pesanan ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`px-5 py-2.5 font-mono text-xs font-black uppercase border-2 border-black transition-all flex items-center gap-2 ${
                activeTab === 'chat' 
                  ? 'bg-[#FFC700] text-black shadow-brutal-sm' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-[#FF5900]" />
              <span>Live Chat Pelanggan ({getAllRooms().length})</span>
            </button>

            <button
              onClick={() => setActiveTab('testi')}
              className={`px-5 py-2.5 font-mono text-xs font-black uppercase border-2 border-black transition-all flex items-center gap-2 ${
                activeTab === 'testi' 
                  ? 'bg-[#FFC700] text-black shadow-brutal-sm' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Star className="w-4 h-4 text-black fill-black" />
              <span>+ Upload Testimoni WA</span>
            </button>

            <button
              onClick={() => setActiveTab('telegram')}
              className={`px-5 py-2.5 font-mono text-xs font-black uppercase border-2 border-black transition-all flex items-center gap-2 ${
                activeTab === 'telegram' 
                  ? 'bg-[#FFC700] text-black shadow-brutal-sm' 
                  : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              <Bot className="w-4 h-4 text-[#229ED9]" />
              <span>Bot Telegram (HP)</span>
            </button>
          </div>

          {/* Quick CS status & Mobile Pop-up Notif Controls on mobile */}
          <div className="flex flex-col sm:flex-row md:hidden gap-2 bg-white border-2 border-black p-2.5 text-xs font-mono shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold">Status CS:</span>
              <button
                onClick={() => setAdminStatus(adminStatus === 'online' ? 'offline' : 'online')}
                className="font-bold underline text-[#FF5900] flex items-center gap-1.5"
              >
                <span className={`w-2 h-2 rounded-full ${adminStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-600'}`}></span>
                <span>{adminStatus === 'online' ? 'Online' : 'Offline'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
              <span className="font-bold flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-[#FF5900]" />
                <span>Notif Pop-up HP:</span>
              </span>
              <div className="flex items-center gap-1.5">
                {notifPermission === 'granted' ? (
                  <button
                    type="button"
                    onClick={() => triggerTestMobileNotification()}
                    className="px-2 py-0.5 bg-[#FFC700] hover:bg-[#FFD633] text-black font-bold border border-black text-[11px] flex items-center gap-1 shadow-sm active:scale-95"
                    title="Kirim tes pop-up dan getar ke layar HP sekarang"
                  >
                    <BellRing className="w-3 h-3 text-black" />
                    <span>🧪 Tes Notif HP</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={async () => {
                      const granted = await requestNotificationPermission();
                      setNotifPermission(granted ? 'granted' : 'denied');
                    }}
                    className="px-2 py-0.5 bg-green-500 hover:bg-green-600 text-white font-bold border border-black text-[11px] flex items-center gap-1 animate-pulse active:scale-95"
                  >
                    <Bell className="w-3 h-3 text-white" />
                    <span>🔔 Aktifkan Notif HP</span>
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        
        {/* ================= VIEW 1: ORDERS ================= */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            
            {/* Quick Metrics & Revenue Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Total Omset Selesai */}
              <div className="bg-[#FFC700] border-[2.5px] border-[#121212] p-4 shadow-brutal flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-xs font-black uppercase text-neutral-800">
                    Total Omset Selesai
                  </span>
                  <DollarSign className="w-4 h-4 text-black" />
                </div>
                <div>
                  <div className="font-display font-black text-lg sm:text-2xl text-[#121212] truncate">
                    {formattedRevenue}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-800 mt-0.5 block">
                    Dari {completedOrdersCount} transaksi sukses
                  </span>
                </div>
              </div>

              {/* Pesanan Selesai */}
              <div className="bg-white border-[2.5px] border-[#121212] p-4 shadow-brutal flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-xs font-black uppercase text-neutral-600">
                    Order Selesai
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="font-display font-black text-lg sm:text-2xl text-emerald-700">
                    {completedOrdersCount} <span className="text-xs font-mono font-normal text-neutral-600">Order</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 mt-0.5 block">
                    Struk digital terbit
                  </span>
                </div>
              </div>

              {/* Antrean Menunggu */}
              <div className="bg-white border-[2.5px] border-[#121212] p-4 shadow-brutal flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-xs font-black uppercase text-neutral-600">
                    Menunggu Respon
                  </span>
                  <Clock className="w-4 h-4 text-[#FF5900]" />
                </div>
                <div>
                  <div className="font-display font-black text-lg sm:text-2xl text-[#FF5900]">
                    {pendingOrdersCount} <span className="text-xs font-mono font-normal text-neutral-600">Antrean</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 mt-0.5 block">
                    Batas waktu 10 menit
                  </span>
                </div>
              </div>

              {/* Antrean Sedang Diproses */}
              <div className="bg-white border-[2.5px] border-[#121212] p-4 shadow-brutal flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] sm:text-xs font-black uppercase text-neutral-600">
                    Sedang Dikerjakan
                  </span>
                  <Sparkles className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <div className="font-display font-black text-lg sm:text-2xl text-blue-700">
                    {processingOrdersCount} <span className="text-xs font-mono font-normal text-neutral-600">Proses</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-neutral-500 mt-0.5 block">
                    Pengerjaan aktif
                  </span>
                </div>
              </div>
            </div>

            {/* Header & Filter Row */}
            <div className="bg-white border-[3px] border-black p-5 shadow-brutal space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-black text-2xl uppercase text-[#121212]">
                    Daftar Antrean Pesanan Masuk
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    Pantau batas waktu respon 10 menit, konfirmasi pengerjaan, dan terbitkan struk resmi digital.
                  </p>
                </div>

                {/* 1-Click Excel / CSV Export Button */}
                <button
                  type="button"
                  onClick={() => exportOrdersToCSV(orders)}
                  className="brutal-btn-yellow py-2.5 px-4 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 shadow-brutal-sm hover:scale-[1.02] active:scale-95 transition-all self-start sm:self-auto shrink-0"
                  title="Download semua data transaksi dalam file CSV (kompatibel Excel & Sheets)"
                >
                  <Download className="w-4 h-4 text-black" />
                  <span>Download Laporan Excel (CSV)</span>
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-1.5 font-mono text-xs font-bold pt-3 border-t border-neutral-200">
                <button
                  onClick={() => setOrderFilter('all')}
                  className={`px-3 py-1.5 border border-black ${orderFilter === 'all' ? 'bg-[#FFC700]' : 'bg-neutral-100'}`}
                >
                  Semua ({orders.length})
                </button>
                <button
                  onClick={() => setOrderFilter('pending')}
                  className={`px-3 py-1.5 border border-black ${orderFilter === 'pending' ? 'bg-[#FFC700]' : 'bg-neutral-100'}`}
                >
                  Menunggu ({orders.filter(o => o.status === 'pending_admin').length})
                </button>
                <button
                  onClick={() => setOrderFilter('processing')}
                  className={`px-3 py-1.5 border border-black ${orderFilter === 'processing' ? 'bg-[#FFC700]' : 'bg-neutral-100'}`}
                >
                  Diproses ({orders.filter(o => o.status === 'processing').length})
                </button>
                <button
                  onClick={() => setOrderFilter('completed')}
                  className={`px-3 py-1.5 border border-black ${orderFilter === 'completed' ? 'bg-[#FFC700]' : 'bg-neutral-100'}`}
                >
                  Selesai ({orders.filter(o => o.status === 'completed').length})
                </button>
                <button
                  onClick={() => setOrderFilter('cancelled')}
                  className={`px-3 py-1.5 border border-black ${orderFilter === 'cancelled' ? 'bg-[#FFC700]' : 'bg-neutral-100'}`}
                >
                  Dibatalkan ({orders.filter(o => o.status === 'cancelled').length})
                </button>
              </div>
            </div>

            {/* Orders Cards Grid */}
            {filteredOrders.length === 0 ? (
              <div className="p-12 text-center bg-white border-2 border-dashed border-black font-mono text-xs">
                Tidak ada pesanan dalam kategori ini.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => {
                  const isPending = order.status === 'pending_admin';
                  const isProcessing = order.status === 'processing';
                  const isCompleted = order.status === 'completed';
                  const isCancelled = order.status === 'cancelled';

                  const elapsedMin = Math.floor((Date.now() - order.createdAt) / 60000);
                  const isOverdue = elapsedMin >= 10;

                  return (
                    <div
                      key={order.id}
                      className="brutal-card p-5 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                    >
                      {/* Left: Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                          <span className="font-mono font-black text-sm bg-[#FFC700] px-2.5 py-0.5 border border-black">
                            {order.orderCode}
                          </span>
                          <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 border border-black uppercase ${
                            isCompleted ? 'bg-emerald-300' : isProcessing ? 'bg-blue-300' : isCancelled ? 'bg-neutral-300 text-neutral-800 line-through' : 'bg-amber-200'
                          }`}>
                            ● {order.status}
                          </span>
                          {isPending && (
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 border border-black flex items-center gap-1 ${
                              isOverdue ? 'bg-red-500 text-white animate-pulse' : 'bg-neutral-100 text-neutral-800'
                            }`}>
                              <Clock className="w-3 h-3" />
                              <span>Tunggu: {elapsedMin} menit {isOverdue && '(MELEWATI 10 MENIT!)'}</span>
                            </span>
                          )}
                        </div>

                        <h4 className="font-display font-black text-xl text-[#121212]">
                          {order.itemName}
                        </h4>
                        <span className="text-xs font-mono font-bold text-[#FF5900] block mt-0.5">
                          {order.itemDetails}
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3 pt-3 border-t border-neutral-200 text-xs font-mono">
                          <div>
                            <span className="text-neutral-500 block text-[10px]">Pelanggan:</span>
                            <span className="font-bold">{order.customerName}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[10px]">WhatsApp:</span>
                            <span className="font-bold">{order.customerPhone}</span>
                          </div>
                          <div>
                            <span className="text-neutral-500 block text-[10px]">Metode Bayar:</span>
                            <span className="font-bold uppercase">
                              {order.paymentMethod === 'web_transfer' ? 'QRIS / DANA / GoPay' : 'Via WhatsApp'}
                            </span>
                          </div>
                        </div>

                        {order.extraFormData && Object.keys(order.extraFormData).length > 0 && (
                          <div className="mt-3 bg-[#FAF8F2] border border-black p-2.5 text-[11px] font-mono">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-neutral-600">Data Akun / Catatan Pemesanan:</span>
                              {order.credentialsPurged && (
                                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-400 px-1.5 py-0.2 flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  Password Di-Purge Otomatis
                                </span>
                              )}
                            </div>
                            {Object.entries(order.extraFormData).map(([k, v]) => (
                              <div key={k} className="inline-block mr-3">
                                <span className="text-neutral-500 capitalize">{k}:</span> <span className="font-bold">{v}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {order.reviewText && (
                          <div className="mt-2.5 bg-yellow-50 border-2 border-yellow-400 p-2.5 text-xs font-mono">
                            <div className="flex items-center gap-1.5 text-yellow-900 font-bold mb-1">
                              <Star className="w-3.5 h-3.5 fill-[#FFC700] text-[#FFC700]" />
                              <span>Ulasan Pelanggan ({order.rating || 5}.0 Bintang):</span>
                            </div>
                            <p className="italic text-neutral-900 font-semibold">"{order.reviewText}"</p>
                          </div>
                        )}

                        {order.status === 'completed' && !order.reviewText && (
                          <div className="mt-2.5 bg-amber-50 border border-amber-300 p-2 text-xs font-mono flex items-center justify-between gap-2">
                            <span className="text-amber-900 font-bold flex items-center gap-1 text-[11px]">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              <span>Menunggu rating/ulasan customer (Auto-5★ aktif jika &gt; 1 jam)</span>
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Right: Price & Admin Actions */}
                      <div className="flex flex-col lg:items-end justify-between gap-3 shrink-0 lg:border-l-2 lg:border-neutral-200 lg:pl-6">
                        <div className="lg:text-right">
                          <span className="text-[10px] font-mono text-neutral-500 uppercase block">Total Transaksi</span>
                          {order.discountAmount && order.discountAmount > 0 ? (
                            <div>
                              <span className="text-xs font-mono line-through text-neutral-400 block">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.originalAmount || (order.totalAmount + order.discountAmount))}
                              </span>
                              <span className="font-display font-black text-2xl text-emerald-600">
                                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                              </span>
                              <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-500 px-1.5 py-0.5 inline-block mt-0.5">
                                KODE: {order.voucherCode || 'DISKON'} (-{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.discountAmount)})
                              </span>
                            </div>
                          ) : (
                            <span className="font-display font-black text-2xl text-[#121212]">
                              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {isPending && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'processing')}
                              className="brutal-btn-yellow text-xs py-2 px-3.5 uppercase font-mono font-bold"
                            >
                              Terima & Proses
                            </button>
                          )}

                          {(isPending || isProcessing) && (
                            <button
                              onClick={() => handleFinishOrder(order)}
                              className="brutal-btn-orange text-xs py-2 px-3.5 uppercase font-mono font-bold"
                            >
                              Selesaikan & Buat Struk
                            </button>
                          )}

                          {isCompleted && (
                            <>
                              <button
                                onClick={() => openReceiptModal(order)}
                                className="brutal-btn-white text-xs py-2 px-3.5 uppercase font-mono font-bold flex items-center gap-1.5 hover:bg-[#FFC700]"
                                title="Buka dan cetak struk resmi transaksi"
                              >
                                <Receipt className="w-4 h-4 text-[#FF5900]" />
                                <span>Lihat / Cetak Struk</span>
                              </button>

                              {!order.reviewSubmittedAt && (
                                <>
                                  <button
                                    onClick={() => handleRequestReview(order)}
                                    className="bg-amber-400 hover:bg-amber-300 text-black border-2 border-black text-xs py-2 px-3 uppercase font-mono font-black flex items-center gap-1 shadow-[2px_2px_0px_#000]"
                                    title="Kirim pesan ajakan rating & ulasan ke Live Chat customer"
                                  >
                                    <Star className="w-3.5 h-3.5 fill-black text-black" />
                                    <span>Minta Rating (Chat)</span>
                                  </button>
                                  <button
                                    onClick={() => handleQuickAutoReview(order)}
                                    className="bg-emerald-300 hover:bg-emerald-400 text-black border-2 border-black text-xs py-2 px-2.5 uppercase font-mono font-bold flex items-center gap-1 shadow-[2px_2px_0px_#000]"
                                    title="Terapkan rating 5 bintang otomatis tanpa tunggu 1 jam"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-black" />
                                    <span>Set 5★</span>
                                  </button>
                                </>
                              )}
                            </>
                          )}

                          <a
                            href={`https://wa.me/${order.customerPhone}?text=${encodeURIComponent(`Halo kak ${order.customerName}, konfirmasi dari Admin Zura Store mengenai pesanan ${order.orderCode} (${order.itemName}).`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-black border-2 border-black text-xs py-2 px-3 font-mono font-black flex items-center gap-1 shadow-[2px_2px_0px_#000]"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>Chat WA</span>
                          </a>

                          {(isPending || isProcessing) && (
                            <button
                              type="button"
                              onClick={() => handleCancelOrder(order.id, order.orderCode)}
                              className="border-2 border-black bg-white hover:bg-red-50 text-red-600 text-xs py-2 px-3 font-mono font-bold flex items-center gap-1 transition-colors shadow-[2px_2px_0px_#000]"
                              title="Batalkan pesanan ini jika customer tidak jadi beli"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Batal</span>
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDeleteOrder(order.id, order.orderCode)}
                            className="border-2 border-black bg-white hover:bg-red-600 hover:text-white text-neutral-600 text-xs py-2 px-2.5 font-mono font-bold flex items-center gap-1 transition-colors shadow-[2px_2px_0px_#000]"
                            title="Hapus pesanan ini dari antrean"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Hapus</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* ================= VIEW 2: MULTI-CUSTOMER LIVE CHAT ================= */}
        {activeTab === 'chat' && (
          <div className="bg-white border-[3px] border-black p-5 shadow-brutal flex flex-col gap-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-neutral-200 pb-3 gap-2">
                <div>
                  <h3 className="font-display font-black text-2xl uppercase text-[#121212] flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-[#FF5900]" />
                    <span>INBOX CHAT PELANGGAN REAL-TIME</span>
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono mt-0.5">
                    Dipisahkan antara <strong>Chat Pesanan Khusus</strong> dan <strong>Tanya Jawab CS Umum</strong>. Obrolan yang selesai review akan ditutup otomatis setelah 30-60 menit.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="bg-[#121212] text-[#FFC700] text-xs font-mono font-bold px-3 py-1 uppercase">
                    {orderRooms.length} Chat Order • {generalRooms.length} Tanya Jawab
                  </span>
                </div>
              </div>

              {/* Two-Column WhatsApp Web Inbox */}
              <div className="grid grid-cols-1 md:grid-cols-12 border-2 border-black min-h-[520px] bg-[#FAF8F2]">
                
                {/* Left Column: Room List with Sub-Tabs */}
                <div className="md:col-span-5 border-b-2 md:border-b-0 md:border-r-2 border-black bg-white flex flex-col">
                  
                  {/* Category Switcher: Order Chat vs General CS */}
                  <div className="flex border-b-2 border-black bg-neutral-100">
                    <button
                      type="button"
                      onClick={() => {
                        setChatSubTab('order');
                        if (orderRooms.length > 0 && !orderRooms.some(r => r.roomId === adminActiveRoomId)) {
                          setAdminActiveRoomId(orderRooms[0].roomId);
                        }
                      }}
                      className={`flex-1 py-2.5 text-xs font-mono font-bold border-r-2 border-black flex items-center justify-center gap-1.5 transition-colors ${
                        chatSubTab === 'order' ? 'bg-[#FFC700] text-black shadow-inner' : 'bg-white text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <Package className="w-3.5 h-3.5 text-black" />
                      <span>Chat Pesanan</span>
                      <span className="bg-black text-[#FFC700] text-[10px] px-1.5 py-0.2 font-bold border border-black">
                        {orderRooms.length}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setChatSubTab('general');
                        if (generalRooms.length > 0 && !generalRooms.some(r => r.roomId === adminActiveRoomId)) {
                          setAdminActiveRoomId(generalRooms[0].roomId);
                        }
                      }}
                      className={`flex-1 py-2.5 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors ${
                        chatSubTab === 'general' ? 'bg-[#FFC700] text-black shadow-inner' : 'bg-white text-neutral-600 hover:bg-neutral-100'
                      }`}
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-black" />
                      <span>Tanya Jawab CS</span>
                      <span className="bg-black text-white text-[10px] px-1.5 py-0.2 font-bold border border-black">
                        {generalRooms.length}
                      </span>
                    </button>
                  </div>

                  <div className="p-2 bg-neutral-50 border-b border-black font-mono text-[11px] text-neutral-600 flex justify-between items-center">
                    <span>{chatSubTab === 'order' ? 'Daftar Ruang Pesanan Masuk' : 'Daftar Penanya Sebelum Beli'}</span>
                    <span className="text-[10px] text-neutral-400">Klik nama untuk balas</span>
                  </div>

                  {/* Room Items */}
                  <div className="divide-y divide-neutral-200 flex-1 overflow-y-auto max-h-[480px]">
                    {displayedRooms.length === 0 ? (
                      <div className="p-8 text-center text-xs font-mono text-neutral-400">
                        {chatSubTab === 'order' 
                          ? 'Belum ada ruang chat pesanan aktif.' 
                          : 'Belum ada pertanyaan tanya jawab CS.'}
                      </div>
                    ) : (
                      displayedRooms.map((room) => {
                        const isSelected = room.roomId === adminActiveRoomId;
                        return (
                          <div
                            key={room.roomId}
                            onClick={() => setAdminActiveRoomId(room.roomId)}
                            className={`p-3 cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-[#FFC700] text-black font-bold shadow-inner'
                                : 'hover:bg-neutral-50 text-neutral-800'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-display font-black text-xs uppercase truncate max-w-[160px] flex items-center gap-1">
                                <User className="w-3 h-3 text-neutral-700" />
                                <span>{room.customerName}</span>
                              </span>
                              <span className="text-[10px] font-mono text-neutral-500">
                                {new Date(room.lastMessageTime).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                              <span className="bg-black text-[#FFC700] text-[9px] font-mono font-bold px-1.5 py-0.2">
                                #{room.roomId}
                              </span>
                              
                              {room.orderStatus && (
                                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 border border-black uppercase ${
                                  room.orderStatus === 'completed' ? 'bg-emerald-200 text-emerald-950' :
                                  room.orderStatus === 'processing' ? 'bg-blue-200 text-blue-950' :
                                  room.orderStatus === 'cancelled' ? 'bg-red-200 text-red-950' : 'bg-amber-200'
                                }`}>
                                  {room.orderStatus}
                                </span>
                              )}

                              {room.rating && (
                                <span className="bg-amber-100 text-amber-900 border border-amber-400 text-[9px] font-mono font-bold px-1 flex items-center gap-0.5">
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                  <span>{room.rating}.0 Review</span>
                                </span>
                              )}

                              {room.isClosed && (
                                <span className="bg-neutral-800 text-neutral-200 border border-black text-[9px] font-mono font-bold px-1 flex items-center gap-0.5">
                                  <Lock className="w-2.5 h-2.5 text-[#FFC700]" />
                                  <span>Ditutup</span>
                                </span>
                              )}
                            </div>

                            <p className="text-[11px] font-sans truncate text-neutral-600 leading-snug">
                              {room.lastMessageText}
                            </p>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Right Column: Chat Room History & Reply Box */}
                <div className="md:col-span-7 flex flex-col bg-[#FAF8F2]">
                  
                  {/* Active Room Header with Controls */}
                  <div className="p-3 bg-white border-b-2 border-black flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-black text-sm uppercase">
                          Ruang: #{adminActiveRoomId}
                        </span>
                        {currentSelectedRoom?.isClosed ? (
                          <span className="bg-neutral-800 text-neutral-200 font-mono text-[9px] font-bold px-1.5 py-0.5 border border-black flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-[#FFC700]" />
                            <span>SESI DITUTUP (PASCA REVIEW)</span>
                          </span>
                        ) : (
                          <span className="bg-green-300 text-green-950 font-mono text-[9px] font-bold px-1.5 py-0.5 border border-black">
                            TERHUBUNG LIVE
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-neutral-500 block">
                        {currentSelectedRoom?.type === 'order' ? 'Percakapan Khusus Transaksi Pesanan' : 'Percakapan Tanya Jawab CS Umum'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap">
                      {currentSelectedRoom?.type === 'order' && !currentSelectedRoom?.isClosed && (
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Tutup sesi chat untuk #${adminActiveRoomId}? Chat akan dinonaktifkan agar tidak menumpuk.`)) {
                              closeChatRoom(adminActiveRoomId);
                            }
                          }}
                          className="bg-neutral-800 hover:bg-black text-white text-[10px] font-mono font-bold px-2 py-1 border border-black flex items-center gap-1 shadow-[1px_1px_0px_#000]"
                          title="Tutup sesi chat ini"
                        >
                          <Lock className="w-3 h-3 text-[#FFC700]" />
                          <span>Tutup Sesi</span>
                        </button>
                      )}

                      {currentSelectedRoom?.type === 'order' && !currentSelectedRoom?.isClosed && (
                        <button
                          type="button"
                          onClick={() => {
                            const ord = orders.find(o => o.orderCode === adminActiveRoomId);
                            if (ord) {
                              handleRequestReview(ord);
                            } else {
                              sendChatMessage(
                                '🎉 Halo kak! Pesanan Anda telah selesai dikerjakan. Mohon luangkan waktu untuk memberikan rating ⭐ bintang & ulasan kepuasan di live chat ini ya. Terima kasih banyak!',
                                adminActiveRoomId,
                                'admin',
                                adminActiveRoomId
                              );
                            }
                          }}
                          className="bg-[#FFC700] hover:bg-yellow-400 text-black border border-black text-[10px] font-mono font-black px-2 py-1 flex items-center gap-1 shadow-[1px_1px_0px_#000]"
                          title="Kirim pesan ajakan rating & ulasan ke customer"
                        >
                          <Star className="w-3 h-3 fill-black text-black" />
                          <span>Minta Rating</span>
                        </button>
                      )}

                      {orders.find(o => o.orderCode === adminActiveRoomId) && (
                        <a
                          href={`https://wa.me/${orders.find(o => o.orderCode === adminActiveRoomId)?.customerPhone}?text=${encodeURIComponent(`Halo ${orders.find(o => o.orderCode === adminActiveRoomId)?.customerName}, ini Admin Zura Store mengenai pesanan #${adminActiveRoomId}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-500 text-white border border-black text-[10px] font-mono font-bold px-2.5 py-1 flex items-center gap-1 hover:bg-emerald-600 shadow-[1px_1px_0px_#000]"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>WA</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Hapus seluruh riwayat chat #${adminActiveRoomId}?`)) {
                            deleteChatRoom(adminActiveRoomId);
                          }
                        }}
                        className="bg-white hover:bg-red-50 text-red-600 border border-black text-[10px] font-mono font-bold px-2 py-1 flex items-center gap-1 shadow-[1px_1px_0px_#000]"
                        title="Hapus riwayat chat ini"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Hapus</span>
                      </button>
                    </div>
                  </div>

                {/* Messages Body */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono text-xs max-h-[380px]">
                  {getMessagesForRoom(adminActiveRoomId).length === 0 ? (
                    <div className="text-center py-16 text-neutral-400 font-mono text-xs">
                      Belum ada pesan di ruang chat #{adminActiveRoomId}. Ketik pesan di bawah untuk menyapa customer.
                    </div>
                  ) : (
                    getMessagesForRoom(adminActiveRoomId).map((msg) => {
                      const isAdmin = msg.sender === 'admin';
                      const isSystem = msg.sender === 'system';

                      return (
                        <div
                          key={msg.id}
                          className={`p-3 border border-black text-xs ${
                            isSystem
                              ? 'bg-amber-100 text-amber-950'
                              : isAdmin
                              ? 'bg-[#121212] text-white ml-8 shadow-[2px_2px_0px_#000]'
                              : 'bg-white text-black mr-8 shadow-[2px_2px_0px_#000]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1 text-[10px] font-bold">
                            <span className={`flex items-center gap-1 ${isAdmin ? 'text-[#FFC700]' : 'text-[#FF5900]'}`}>
                              {isAdmin ? (
                                <>
                                  <ShieldCheck className="w-3.5 h-3.5 text-[#FFC700]" />
                                  <span>Anda (Admin Zura)</span>
                                </>
                              ) : (
                                <>
                                  <User className="w-3.5 h-3.5 text-[#FF5900]" />
                                  <span>{msg.senderName}</span>
                                </>
                              )}
                            </span>
                            <span className="opacity-70">
                              {new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>

                          {/* Image Attachment in message bubble */}
                          {msg.imageUrl && (
                            <div className="my-2 relative group overflow-hidden border border-black rounded bg-black/10">
                              <img
                                src={msg.imageUrl}
                                alt="Lampiran Chat"
                                onClick={() => setAdminLightboxImage(msg.imageUrl || null)}
                                className="max-h-56 w-auto max-w-full object-cover rounded cursor-pointer hover:opacity-95 transition-opacity"
                              />
                              <button
                                type="button"
                                onClick={() => setAdminLightboxImage(msg.imageUrl || null)}
                                className="absolute bottom-1.5 right-1.5 bg-black/80 hover:bg-black text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm opacity-90 hover:opacity-100"
                              >
                                <ZoomIn className="w-3 h-3" />
                                <span>Perbesar</span>
                              </button>
                            </div>
                          )}

                          {msg.text && (
                            <p className="font-sans font-medium leading-relaxed whitespace-pre-wrap">
                              {msg.text}
                            </p>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Quick Templates */}
                <div className="px-3 py-2 bg-neutral-100 border-t border-black flex gap-1.5 overflow-x-auto text-[10px] font-mono">
                  <span className="text-neutral-500 font-bold shrink-0 self-center">Template Balasan:</span>
                  <button
                    type="button"
                    onClick={() => setAdminReplyText('Halo kak! Pesanan sedang dalam antrean pengerjaan booster ya. Mohon ditunggu sebentar.')}
                    className="bg-white border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700]"
                  >
                    + Sedang Diproses
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdminReplyText('Akun premium sudah siap kak! Silakan cek kredensial atau email Anda ya.')}
                    className="bg-white border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700]"
                  >
                    + Akun Siap
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdminReplyText('Terima kasih kak! Transaksi selesai dan struk resmi sudah diterbitkan.')}
                    className="bg-white border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700]"
                  >
                    + Selesai & Terbit Struk
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdminReplyText('Halo kak! Pesanan sudah selesai dikerjakan dengan lancar ya. Mohon kesediaannya memberikan rating ⭐ bintang dan ulasan singkat langsung di Live Chat atau menu Lacak Pesanan. Terima kasih banyak!')}
                    className="bg-yellow-300 text-black font-black border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700] flex items-center gap-1 shadow-sm"
                  >
                    <Star className="w-3 h-3 fill-black text-black" />
                    <span>+ Minta Rating & Ulasan</span>
                  </button>
                </div>

                {/* Image Attachment Preview for Admin */}
                {adminSelectedImage && (
                  <div className="px-3 py-2 bg-amber-50 border-t-2 border-black flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="relative w-12 h-12 border border-black rounded overflow-hidden bg-white shrink-0">
                        <img src={adminSelectedImage} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-[11px] font-mono leading-tight">
                        <span className="font-bold text-[#FF5900] flex items-center gap-1">
                          <ImageIcon className="w-3.5 h-3.5 text-[#FF5900]" />
                          <span>Foto Siap Dikirim ke Pelanggan</span>
                        </span>
                        <span className="text-neutral-500 text-[10px] block mt-0.5">Ketik balasan atau langsung klik Kirim</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAdminSelectedImage(null)}
                      className="p-1 border border-black bg-white hover:bg-red-500 hover:text-white transition-colors"
                      title="Batal lampirkan gambar"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Reply Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!adminReplyText.trim() && !adminSelectedImage) return;
                    sendChatMessage(
                      adminReplyText.trim(), 
                      adminActiveRoomId, 
                      'admin', 
                      undefined, 
                      adminSelectedImage || undefined
                    );
                    setAdminReplyText('');
                    setAdminSelectedImage(null);
                  }}
                  className="p-3 bg-white border-t-2 border-black flex items-center gap-2"
                >
                  <input
                    type="file"
                    ref={adminFileInputRef}
                    accept="image/*"
                    onChange={handleAdminFileChange}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => adminFileInputRef.current?.click()}
                    disabled={adminUploading}
                    className={`p-2.5 border-2 border-black transition-colors shrink-0 ${
                      adminSelectedImage ? 'bg-[#FFC700]' : 'bg-neutral-100 hover:bg-[#FFC700]'
                    }`}
                    title="Kirim Foto / Bukti / Screenshot Akun"
                  >
                    <ImageIcon className="w-4 h-4 text-black" />
                  </button>

                  <input
                    type="text"
                    placeholder={`Ketik balasan untuk ruang #${adminActiveRoomId} (bisa paste gambar)...`}
                    value={adminReplyText}
                    onChange={(e) => setAdminReplyText(e.target.value)}
                    onPaste={handleAdminPaste}
                    className="flex-1 border-2 border-black p-2.5 text-xs font-semibold focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={adminUploading || (!adminReplyText.trim() && !adminSelectedImage)}
                    className="brutal-btn-yellow px-5 py-2.5 text-xs font-mono font-black uppercase flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim</span>
                  </button>
                </form>

              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW 3: UPLOAD TESTIMONI ================= */}
        {activeTab === 'testi' && (
          <div className="max-w-2xl mx-auto bg-white border-[3px] border-black p-8 shadow-brutal">
            <h3 className="font-display font-black text-2xl uppercase text-[#121212] mb-1">
              Upload Tangkapan Layar Testimoni WhatsApp
            </h3>
            <p className="text-xs text-neutral-500 font-mono mb-6">
              Testimoni yang diisi di sini akan langsung tampil pada galeri testimoni WhatsApp di halaman utama website.
            </p>

            <form onSubmit={handleCreateTestimonial} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase mb-1">
                    Nama Pelanggan & Kota
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rian (Jakarta)"
                    value={waCustName}
                    onChange={(e) => setWaCustName(e.target.value)}
                    className="w-full bg-[#FAF8F2] border-2 border-black p-2.5 text-xs font-semibold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase mb-1">
                    Kategori Layanan
                  </label>
                  <select
                    value={waCategory}
                    onChange={(e) => setWaCategory(e.target.value)}
                    className="w-full bg-[#FAF8F2] border-2 border-black p-2.5 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Joki MLBB">Joki MLBB</option>
                    <option value="Joki Valorant">Joki Valorant</option>
                    <option value="Netflix 4K UHD">Netflix 4K UHD</option>
                    <option value="Duolingo Super">Duolingo Super</option>
                    <option value="Adobe Express">Adobe Express</option>
                    <option value="Canva Edu">Canva Edu</option>
                    <option value="Gemini Pro Priv">Gemini Pro Priv</option>
                    <option value="Desain & AI Project">Desain & AI Project</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1">
                  Kutipan Chat Pelanggan (WhatsApp Bubble)
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Contoh: Akun Duolingo Super langsung aktif 12 bulan! Mantap admin fast respon banget."
                  value={waSnippet}
                  onChange={(e) => setWaSnippet(e.target.value)}
                  className="w-full bg-[#FAF8F2] border-2 border-black p-2.5 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold uppercase mb-1">
                  URL Screenshot Bukti Chat / Transfer
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-... (atau kosongkan untuk default)"
                  value={waScreenshotUrl}
                  onChange={(e) => setWaScreenshotUrl(e.target.value)}
                  className="w-full bg-[#FAF8F2] border-2 border-black p-2.5 text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full brutal-btn-yellow py-3.5 px-6 text-xs uppercase font-mono font-black"
                >
                  + Terbitkan Testimoni WhatsApp
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= VIEW 4: TELEGRAM BOT NOTIFICATIONS ================= */}
        {activeTab === 'telegram' && (
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Header Card */}
            <div className="bg-white border-[3px] border-black p-6 shadow-brutal">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-[#229ED9] border-2 border-black flex items-center justify-center text-white shadow-[2px_2px_0px_#000] shrink-0">
                    <Bot className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-display font-black text-2xl uppercase text-[#121212]">
                      Notifikasi Bot Telegram ke HP
                    </h3>
                    <p className="text-xs text-neutral-600 font-mono mt-0.5">
                      100% Gratis & Selamanya Aktif: HP Anda akan berdering otomatis saat ada order baru atau bukti transfer masuk, meskipun laptop mati.
                    </p>
                  </div>
                </div>

                <span className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border border-black self-start sm:self-auto shrink-0 ${
                  tgConfig.isEnabled && tgConfig.botToken && tgConfig.chatId
                    ? 'bg-green-400 text-black shadow-[1.5px_1.5px_0px_#000]'
                    : 'bg-amber-300 text-neutral-900'
                }`}>
                  {tgConfig.isEnabled && tgConfig.botToken && tgConfig.chatId ? '● BOT TERHUBUNG' : '○ BELUM DIHUBUNGKAN'}
                </span>
              </div>
            </div>

            {/* Test Result Alert if triggered */}
            {tgTestResult && (
              <div className={`p-4 border-2 border-black text-xs font-mono font-bold flex items-start gap-3 shadow-brutal-sm ${
                tgTestResult.success ? 'bg-green-100 text-green-950 border-green-700' : 'bg-red-100 text-red-950 border-red-700'
              }`}>
                {tgTestResult.success ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <span className="block font-black uppercase text-sm mb-0.5">
                    {tgTestResult.success ? 'Uji Coba Berhasil!' : 'Uji Coba Gagal'}
                  </span>
                  <p>{tgTestResult.message}</p>
                </div>
              </div>
            )}

            {tgSavedSuccess && (
              <div className="p-3 bg-emerald-100 border-2 border-black text-xs font-mono font-bold text-emerald-950 flex items-center gap-2 shadow-brutal-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Pengaturan Telegram berhasil disimpan di sistem browser!</span>
              </div>
            )}

            {/* Form Configuration Card */}
            <form onSubmit={handleSaveTelegram} className="bg-white border-[3px] border-black p-6 shadow-brutal space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-200">
                <div>
                  <span className="font-mono text-xs font-bold uppercase text-neutral-800 block">
                    Status Pengiriman Notifikasi Otomatis
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Kirim pesan ke Telegram setiap ada pesanan masuk & bukti transfer
                  </span>
                </div>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={tgConfig.isEnabled}
                    onChange={(e) => setTgConfig(prev => ({ ...prev, isEnabled: e.target.checked }))}
                    className="w-4 h-4 accent-[#FFC700]"
                  />
                  <span className="font-mono text-xs font-bold flex items-center gap-1.5">
                    {tgConfig.isEnabled ? (
                      <>
                        <Bell className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Aktif</span>
                      </>
                    ) : (
                      <>
                        <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
                        <span>Mute</span>
                      </>
                    )}
                  </span>
                </label>
              </div>

              {/* Bot Token Field */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#121212] mb-1">
                  1. Telegram Bot Token <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 7654321098:AAHkd97xXxX_abcdefghijklmnopqrstuvw"
                  value={tgConfig.botToken}
                  onChange={(e) => setTgConfig(prev => ({ ...prev, botToken: e.target.value }))}
                  className="w-full bg-[#FAF8F2] border-2 border-black p-2.5 text-xs font-mono font-semibold focus:outline-none"
                />
                <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                  Token rahasia yang diberikan oleh bot resmi @BotFather di Telegram saat membuat bot baru.
                </span>
              </div>

              {/* Chat ID Field */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase text-[#121212] mb-1">
                  2. Telegram Chat ID Pribadi Anda <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 123456789 atau 987654321"
                  value={tgConfig.chatId}
                  onChange={(e) => setTgConfig(prev => ({ ...prev, chatId: e.target.value }))}
                  className="w-full bg-[#FAF8F2] border-2 border-black p-2.5 text-xs font-mono font-semibold focus:outline-none"
                />
                <span className="text-[11px] font-mono text-neutral-500 mt-1 block">
                  ID akun Telegram Anda yang bisa dicek dengan kirim pesan ke @userinfobot di Telegram.
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 brutal-btn-yellow py-3 px-5 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 shadow-brutal-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan Pengaturan</span>
                </button>

                <button
                  type="button"
                  onClick={handleTestTelegram}
                  disabled={tgTesting}
                  className="brutal-btn-dark py-3 px-5 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 shadow-brutal-sm disabled:opacity-50"
                  title="Kirim pesan tes ke Telegram HP Anda"
                >
                  <Send className="w-4 h-4 text-[#FFC700]" />
                  <span>{tgTesting ? 'Mengirim Tes...' : 'Uji Coba Kirim ke HP'}</span>
                </button>
              </div>
            </form>

            {/* Step-by-Step Tutorial Card */}
            <div className="bg-[#FAF8F2] border-2 border-black p-5 space-y-3 font-mono text-xs shadow-brutal">
              <div className="flex items-center gap-2 font-bold uppercase text-neutral-900 border-b border-black pb-2">
                <Info className="w-4 h-4 text-[#229ED9]" />
                <span>Panduan 1 Menit: Cara Membuat Bot & Menemukan Chat ID Telegram Anda</span>
              </div>
              
              <ol className="list-decimal pl-5 space-y-2.5 text-neutral-800 leading-relaxed font-medium">
                <li>
                  Buka aplikasi Telegram di HP Anda, cari akun <strong>@BotFather</strong> (ada centang biru resmi dari Telegram).
                </li>
                <li>
                  Kirim pesan <code>/newbot</code>. Masukkan nama bot toko Anda (misal: <em>Zura Store Notif</em>), lalu masukkan username bot yang berakhiran <code>bot</code> (misal: <em>zura_notif_bot</em>).
                </li>
                <li>
                  BotFather akan langsung membalas dengan <strong>HTTP API Token</strong> (salin teks panjang tersebut dan tempel ke kolom <em>Bot Token</em> di atas).
                </li>
                <li>
                  <strong>PENTING:</strong> Buka bot yang baru saja Anda buat di Telegram tersebut, lalu klik <strong>START</strong> (agar bot punya izin mengirim pesan ke HP Anda).
                </li>
                <li>
                  Cari akun <strong>@userinfobot</strong> di Telegram, klik Start / kirim pesan apa saja. Bot tersebut akan menampilkan <strong>Id</strong> Anda (angka, misal: <code>123456789</code>). Salin angka tersebut ke kolom <em>Chat ID</em> di atas.
                </li>
                <li>
                  Klik tombol <strong>"Simpan Pengaturan"</strong>, lalu klik <strong>"Uji Coba Kirim ke HP"</strong>. Jika Telegram di HP Anda berbunyi, selamat! Notifikasi pesanan akan otomatis masuk ke HP Anda kapan pun ada order baru!
                </li>
              </ol>
            </div>

          </div>
        )}

      </main>

      {/* Admin Lightbox Modal for Full Size Screenshot / TF Proof Inspection */}
      {adminLightboxImage && (
        <div 
          onClick={() => setAdminLightboxImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full max-h-[90vh] bg-white border-[3px] border-black p-3 shadow-brutal flex flex-col"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-black">
              <span className="font-mono text-xs font-bold uppercase text-[#121212] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#FF5900]" />
                <span>Inspeksi Bukti Transfer / Screenshot Pelanggan</span>
              </span>
              <div className="flex items-center gap-2">
                <a 
                  href={adminLightboxImage} 
                  download="bukti-pelanggan.jpg" 
                  className="brutal-btn-yellow py-1 px-2.5 text-[11px] font-mono font-bold flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Unduh</span>
                </a>
                <button 
                  onClick={() => setAdminLightboxImage(null)}
                  className="p-1 border-2 border-black bg-white hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-auto max-h-[75vh] flex items-center justify-center bg-neutral-900 p-2 border border-black">
              <img src={adminLightboxImage} alt="Lampiran Penuh" className="max-w-full max-h-[70vh] object-contain" />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
