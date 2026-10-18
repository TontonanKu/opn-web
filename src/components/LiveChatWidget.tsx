import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, 
  X, 
  Send, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Lock,
  User,
  Star,
  ShoppingBag,
  Image as ImageIcon,
  ZoomIn,
  Download,
  Receipt,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ADMIN_CONFIG } from '../data/initialData';
import { compressImageFile } from '../utils/imageUtils';

export const LiveChatWidget: React.FC = () => {
  const { 
    customerRoomId,
    customerSessionId,
    getMessagesForRoom, 
    sendChatMessage, 
    adminStatus, 
    orders, 
    myOrders,
    activeOrderToTrack,
    isChatOpen, 
    setIsChatOpen,
    unreadCount,
    markChatAsRead,
    generateWhatsAppLink,
    user,
    submitOrderReview,
    openReceiptModal
  } = useApp();

  const [inputVal, setInputVal] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // In-chat review states
  const [chatRatingInput, setChatRatingInput] = useState<number>(5);
  const [chatReviewInput, setChatReviewInput] = useState<string>('');

  const [chatTab, setChatTab] = useState<'order' | 'general'>(() => {
    return myOrders.length > 0 ? 'order' : 'general';
  });
  const [selectedOrderCode, setSelectedOrderCode] = useState<string>(() => {
    return activeOrderToTrack?.orderCode || myOrders[0]?.orderCode || '';
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync selected order if a new order is opened in tracking or newly created
  useEffect(() => {
    if (activeOrderToTrack?.orderCode) {
      setSelectedOrderCode(activeOrderToTrack.orderCode);
      setChatTab('order');
    } else if (myOrders.length > 0 && !selectedOrderCode) {
      setSelectedOrderCode(myOrders[0].orderCode);
    }
  }, [activeOrderToTrack, myOrders]);

  // Determine current effective room ID
  const effectiveRoomId = chatTab === 'order'
    ? (selectedOrderCode || myOrders[0]?.orderCode || customerRoomId)
    : customerSessionId;

  const currentOrder = myOrders.find(o => o.orderCode === selectedOrderCode) || myOrders[0];

  // Auto close check: if review was submitted > 30 mins ago or explicitly marked closed
  const isOrderChatClosed = chatTab === 'order' && Boolean(
    currentOrder?.chatClosed ||
    (currentOrder?.reviewSubmittedAt && (Date.now() - currentOrder.reviewSubmittedAt > 1000 * 60 * 30))
  );

  // Messages for active tab room
  const activeMessages = getMessagesForRoom(effectiveRoomId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
      markChatAsRead();
    }
  }, [activeMessages, isChatOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const handleImageFile = async (file: File) => {
    try {
      setIsUploading(true);
      const base64 = await compressImageFile(file);
      setSelectedImage(base64);
    } catch (err: any) {
      alert(err.message || 'Gagal memproses gambar.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageFile(file);
    }
    e.target.value = '';
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          e.preventDefault();
          handleImageFile(file);
          break;
        }
      }
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputVal.trim() && !selectedImage) || isOrderChatClosed) return;

    sendChatMessage(
      inputVal.trim(), 
      effectiveRoomId, 
      'customer', 
      chatTab === 'order' ? effectiveRoomId : undefined,
      selectedImage || undefined
    );
    setInputVal('');
    setSelectedImage(null);
  };

  const handleQuickQuestion = (text: string) => {
    if (isOrderChatClosed) return;
    sendChatMessage(
      text, 
      effectiveRoomId, 
      'customer', 
      chatTab === 'order' ? effectiveRoomId : undefined
    );
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="brutal-btn-yellow py-3 px-4 flex items-center gap-2 shadow-brutal hover:bg-[#FFD633] transition-all relative z-40 group"
          title="Buka Live Chat Pribadi dengan CS Admin"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-black" />
            {adminStatus === 'online' ? (
              <span className="w-2.5 h-2.5 bg-green-500 border border-black rounded-full absolute -top-1 -right-1"></span>
            ) : (
              <span className="w-2.5 h-2.5 bg-red-500 border border-black rounded-full absolute -top-1 -right-1"></span>
            )}
          </div>
          
          <div className="flex flex-col text-left">
            <span className="font-display font-black text-xs leading-none">
              LIVE CHAT CS
            </span>
            <span className="text-[10px] font-mono text-neutral-800 flex items-center gap-1 mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full ${adminStatus === 'online' ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}></span>
              <span>{adminStatus === 'online' ? 'Admin Online' : 'Admin Offline'}</span>
            </span>
          </div>

          {unreadCount > 0 && (
            <span className="bg-red-600 text-white font-mono font-black text-[10px] px-1.5 py-0.5 rounded-full border border-black absolute -top-2 -right-2 animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Floating / Fullscreen Private Chat Window */}
      {isChatOpen && (
        <div className={`fixed z-50 bg-[#FAF8F2] flex flex-col shadow-brutal-lg animate-fade-in overflow-hidden transition-all duration-200 ${
          isFullscreen 
            ? 'inset-0 w-full h-full max-w-none max-h-none rounded-none border-0' 
            : 'bottom-3 right-3 sm:bottom-5 sm:right-5 max-w-sm sm:max-w-md w-[calc(100vw-24px)] sm:w-[420px] max-h-[88vh] h-[640px] brutal-card border-[3px] border-[#121212]'
        }`}>
          
          {/* Header */}
          <div className="bg-[#FFC700] p-3.5 border-b-[3px] border-[#121212] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-black text-[#FFC700] border-2 border-black flex items-center justify-center font-display font-black text-base shrink-0">
                Z
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="font-display font-black text-sm uppercase text-[#121212] leading-none flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#121212]" />
                    <span>LIVE CHAT ZURA</span>
                  </h4>
                  <span className={`text-[9px] font-mono font-black px-1.5 py-0.2 border border-black uppercase ${
                    adminStatus === 'online' ? 'bg-green-400 text-black' : 'bg-red-500 text-white'
                  }`}>
                    {adminStatus === 'online' ? 'ONLINE' : 'OFFLINE'}
                  </span>
                  {isFullscreen && (
                    <span className="text-[9px] font-mono font-black px-1.5 py-0.2 bg-black text-white border border-black uppercase">
                      LAYAR PENUH
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-mono text-neutral-800 block mt-0.5 font-bold truncate max-w-[200px] sm:max-w-md">
                  {chatTab === 'order' && myOrders.length > 0 ? `Order: #${effectiveRoomId}` : 'Tanya Jawab CS Umum'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                title={isFullscreen ? "Kembalikan ke ukuran jendela mini (Esc)" : "Perbesar mode layar penuh (Fullscreen) agar mudah dibaca & diketik"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsChatOpen(false)}
                className="p-1.5 border-2 border-black bg-white hover:bg-red-600 hover:text-white transition-colors flex items-center justify-center"
                title="Tutup Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Tabs: Chat Pesanan vs Tanya Jawab CS */}
          <div className="flex border-b-2 border-black bg-neutral-100">
            <button
              type="button"
              onClick={() => setChatTab('order')}
              className={`flex-1 py-2 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors border-r-2 border-black ${
                chatTab === 'order' ? 'bg-white text-black border-b-2 border-b-white font-black' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Chat Pesanan</span>
              {myOrders.length > 0 && (
                <span className="bg-black text-[#FFC700] text-[9px] px-1.5 py-0.2 font-bold border border-black">
                  {myOrders.length}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setChatTab('general')}
              className={`flex-1 py-2 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors ${
                chatTab === 'general' ? 'bg-white text-black border-b-2 border-b-white font-black' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Tanya Jawab CS</span>
            </button>
          </div>

          {/* Order Details Mini Banner (If in Order Tab and has active orders) */}
          {chatTab === 'order' && myOrders.length > 0 && (
            <div className="bg-[#FAF8F2] border-b-2 border-black p-2.5 text-xs font-mono">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] text-neutral-500 font-bold uppercase">
                  {myOrders.length > 1 ? 'Pilih Pesanan Anda:' : 'Kode Pesanan Anda:'}
                </span>
                {myOrders.length > 1 ? (
                  <select
                    value={selectedOrderCode}
                    onChange={(e) => setSelectedOrderCode(e.target.value)}
                    className="bg-white border border-black px-2 py-0.5 text-[11px] font-bold font-mono focus:outline-none"
                  >
                    {myOrders.map(o => (
                      <option key={o.orderCode} value={o.orderCode}>
                        {o.orderCode} - {o.itemName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="bg-[#FFC700] text-black px-2 py-0.5 font-black border border-black text-[11px] font-mono tracking-wide">
                    {currentOrder?.orderCode}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <span className="truncate max-w-[200px] font-bold text-neutral-800">
                  {currentOrder?.itemName}
                </span>
                <span className={`px-1.5 py-0.2 text-[9px] font-bold border border-black uppercase ${
                  currentOrder?.status === 'completed' ? 'bg-emerald-200 text-emerald-950' :
                  currentOrder?.status === 'processing' ? 'bg-blue-200 text-blue-950' :
                  currentOrder?.status === 'cancelled' ? 'bg-red-200 text-red-950' : 'bg-amber-200'
                }`}>
                  {currentOrder?.status}
                </span>
              </div>

              {/* Interactive In-Chat Review Form (When Order is Completed and Not Yet Reviewed) */}
              {currentOrder?.status === 'completed' && !currentOrder?.reviewSubmittedAt && !isOrderChatClosed && (
                <div className="mt-2 bg-[#FFFDF0] border-2 border-[#121212] p-2.5 shadow-[2px_2px_0px_#000] animate-fade-in">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-display font-black text-xs text-[#121212] flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-[#FFC700] text-[#FFC700]" />
                      <span>BERI RATING & ULASAN TRANSAKSI</span>
                    </span>
                    <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 border border-emerald-500 uppercase">
                      Selesai
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-600 mb-2 leading-tight">
                    Pesanan Anda telah selesai! Silakan beri rating bintang & ulasan di bawah. Ulasan Anda langsung tampil di testimoni web dan tersinkron ke Lacak Pesanan.
                  </p>
                  
                  {/* Star Rating Picker */}
                  <div className="flex items-center justify-between mb-2 bg-white border border-black p-1.5">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setChatRatingInput(s)}
                          className="p-0.5 hover:scale-125 transition-transform"
                          title={`${s} Bintang`}
                        >
                          <Star className={`w-5 h-5 ${s <= chatRatingInput ? 'fill-[#FFC700] text-[#FFC700]' : 'text-neutral-300'}`} />
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] font-mono font-black text-neutral-900">
                      {chatRatingInput === 5 ? '5.0 (Sangat Puas)' : `${chatRatingInput}.0 Bintang`}
                    </span>
                  </div>

                  {/* Review Text Input & Submit Button */}
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      value={chatReviewInput}
                      onChange={(e) => setChatReviewInput(e.target.value)}
                      placeholder="Contoh: Proses kilat, akun aman & admin ramah banget!"
                      className="w-full bg-white border border-black px-2 py-1 text-[11px] font-semibold focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => openReceiptModal(currentOrder)}
                        className="text-[10px] font-mono underline text-neutral-600 hover:text-black flex items-center gap-1"
                      >
                        <Receipt className="w-3 h-3 text-[#FF5900]" />
                        <span>Cek Struk</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const finalReview = chatReviewInput.trim() || 'Pelayanan sangat cepat, ramah, dan memuaskan!';
                          submitOrderReview(currentOrder.id, chatRatingInput, finalReview);
                          setChatReviewInput('');
                        }}
                        className="bg-[#FFC700] hover:bg-[#FFD700] text-black border-2 border-black px-3 py-1 text-[11px] font-mono font-black uppercase flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#000]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Kirim Rating ({chatRatingInput}.0 ⭐)</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Verified Review Badge (When review is submitted) */}
              {currentOrder?.reviewSubmittedAt && !isOrderChatClosed && (
                <div className="mt-2 bg-emerald-50 border-2 border-emerald-600 p-2 text-[10px] text-emerald-950 flex flex-col gap-1 shadow-[2px_2px_0px_#000] animate-fade-in">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1 text-emerald-900 font-mono font-black">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Ulasan Terverifikasi ({currentOrder.rating || 5}.0 ⭐)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => openReceiptModal(currentOrder)}
                      className="bg-emerald-600 text-white px-1.5 py-0.5 border border-black font-mono text-[9px] hover:bg-emerald-700 flex items-center gap-0.5"
                    >
                      <Receipt className="w-2.5 h-2.5" />
                      <span>Lihat Struk</span>
                    </button>
                  </div>
                  <p className="italic text-neutral-800 font-medium">
                    "{currentOrder.reviewText || currentOrder.receipt?.review || 'Pelayanan sangat memuaskan!'}"
                  </p>
                  <span className="text-[9px] text-neutral-500 font-mono flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-neutral-400" />
                    <span>Telah tayang di testimoni web. Sesi chat ditutup otomatis dalam 30 menit.</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Privacy Notice Bar */}
          <div className="bg-[#121212] text-[#FFC700] px-3 py-1.5 text-[10px] font-mono flex items-center justify-between border-b-2 border-black">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-[#FF5900]" />
              <span>Respon Admin: <strong>Maks 10 Menit</strong></span>
            </div>
            <div className="flex items-center gap-1 text-neutral-300">
              {chatTab === 'order' ? (
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-[#FFC700]" />
                  <span>Khusus Pesanan Anda</span>
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3 text-[#FFC700]" />
                  <span>CS Konsultasi</span>
                </span>
              )}
            </div>
          </div>

          {/* Messages Body */}
          <div className={`p-3.5 sm:p-5 flex-1 overflow-y-auto space-y-3 bg-[#FAF8F2] ${
            isFullscreen ? 'h-full max-h-none text-sm' : 'max-h-[340px] min-h-[240px] text-xs'
          }`}>
            {chatTab === 'order' && myOrders.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 font-mono text-xs">
                <ShoppingBag className="w-8 h-8 mx-auto text-[#FFC700] mb-2" />
                <p className="font-bold text-black mb-1">Belum Ada Pesanan yang Dicheckout</p>
                <p className="text-[11px] leading-relaxed mb-3">
                  Fitur <strong>Chat Pesanan</strong> aktif secara otomatis setelah Anda memesan joki atau aplikasi premium.
                </p>
                <button
                  type="button"
                  onClick={() => setChatTab('general')}
                  className="brutal-btn-yellow py-1.5 px-3 text-xs uppercase font-mono font-bold"
                >
                  Pindah ke Tanya Jawab CS
                </button>
              </div>
            ) : activeMessages.length === 0 ? (
              <div className="text-center py-8 text-neutral-500 font-mono text-xs">
                <ShieldCheck className="w-8 h-8 mx-auto text-[#FFC700] mb-2" />
                <p className="font-bold text-black mb-1">
                  {chatTab === 'order' ? 'Ruang Chat Pesanan Siap' : 'Tanya Jawab CS Umum'}
                </p>
                <p className="text-[11px] leading-relaxed">
                  {chatTab === 'order' 
                    ? `Pesan di sini terisolasi khusus untuk pesanan #${effectiveRoomId}.`
                    : 'Silakan tanyakan info harga, stok aplikasi, atau konsultasi rank joki sebelum membeli!'}
                </p>
              </div>
            ) : (
              activeMessages.map((msg) => {
                const isCustomer = msg.sender === 'customer';
                const isSystem = msg.sender === 'system';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="bg-amber-100 border border-amber-400 p-2.5 text-[11px] sm:text-xs text-amber-900 font-mono shadow-sm">
                      <div className="flex items-center gap-1 font-bold text-amber-950 uppercase mb-0.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#FF5900]" />
                        <span>{msg.senderName}</span>
                      </div>
                      <p className="leading-snug">{msg.text}</p>
                      <span className="text-[9px] text-amber-700 block text-right mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isCustomer ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1 mb-0.5">
                      <span className="text-[10px] sm:text-[11px] font-mono font-bold text-neutral-500 flex items-center gap-1">
                        {msg.sender === 'admin' ? (
                          <>
                            <ShieldCheck className="w-3 h-3 text-[#FF5900]" />
                            <span>Admin Zura</span>
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3 text-neutral-700" />
                            <span>Anda</span>
                          </>
                        )}
                      </span>
                    </div>

                    <div
                      className={`p-2.5 sm:p-3 border-2 border-black font-medium leading-relaxed shadow-[2px_2px_0px_#000] ${
                        isFullscreen ? 'text-sm sm:text-base max-w-[90%] sm:max-w-[75%]' : 'text-xs max-w-[85%]'
                      } ${
                        isCustomer 
                          ? 'bg-[#FFC700] text-black rounded-tl-lg' 
                          : 'bg-white text-[#121212] rounded-tr-lg'
                      }`}
                    >
                      {/* Image Attachment in message bubble */}
                      {msg.imageUrl && (
                        <div className="mb-2 relative group overflow-hidden border border-black rounded bg-black/5">
                          <img 
                            src={msg.imageUrl} 
                            alt="Lampiran Chat" 
                            onClick={() => setLightboxImage(msg.imageUrl || null)}
                            className="max-h-48 w-full object-cover rounded cursor-pointer hover:opacity-95 transition-opacity"
                          />
                          <button 
                            type="button"
                            onClick={() => setLightboxImage(msg.imageUrl || null)}
                            className="absolute bottom-1.5 right-1.5 bg-black/80 hover:bg-black text-white text-[9px] font-mono font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-sm opacity-90 hover:opacity-100"
                          >
                            <ZoomIn className="w-2.5 h-2.5" />
                            <span>Perbesar</span>
                          </button>
                        </div>
                      )}

                      {msg.text && (
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                      )}
                    </div>

                    <span className="text-[9px] font-mono text-neutral-400 mt-0.5">
                      {new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Banner if Order Chat is Closed */}
          {isOrderChatClosed && (
            <div className="bg-neutral-800 text-white p-3 border-t-2 border-black text-xs font-mono">
              <div className="flex items-center gap-1.5 text-[#FFC700] font-bold mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>SESI CHAT PESANAN TELAH DITUTUP</span>
              </div>
              <p className="text-[11px] text-neutral-300 mb-2 leading-relaxed">
                Ruang chat pesanan ini otomatis ditutup setelah transaksi & ulasan selesai agar sistem tetap bersih.
              </p>
              <button
                type="button"
                onClick={() => setChatTab('general')}
                className="w-full bg-[#FFC700] hover:bg-white text-black font-bold py-1.5 px-2 text-[11px] uppercase border border-black"
              >
                Beralih ke Tanya Jawab CS
              </button>
            </div>
          )}

          {/* Quick Reply Suggestions (Only if not closed) */}
          {!isOrderChatClosed && (
            <div className="px-3 py-1.5 bg-neutral-100 border-t border-neutral-300 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono">
              <span className="text-neutral-500 shrink-0">Cepat:</span>
              {chatTab === 'order' ? (
                <>
                  {currentOrder?.status === 'completed' && !currentOrder?.reviewSubmittedAt && (
                    <button
                      onClick={() => {
                        submitOrderReview(currentOrder.id, 5, 'Pelayanan kilat, akun sangat aman & admin ramah!');
                      }}
                      className="bg-yellow-300 text-black font-black border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700] flex items-center gap-1 shadow-sm"
                    >
                      <Star className="w-3 h-3 fill-black text-black" />
                      <span>Beri Rating 5★ Kilat</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleQuickQuestion('Min, pesanan saya sedang diproses?')}
                    className="bg-white border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700]"
                  >
                    Cek Status Pengerjaan
                  </button>
                  <button
                    onClick={() => handleQuickQuestion(`Konfirmasi pembayaran untuk kode #${effectiveRoomId}`)}
                    className="bg-white border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700]"
                  >
                    Kirim Bukti Pembayaran
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleQuickQuestion('Min, mau tanya estimasi joki MLBB rank Epic ke Mythic berapa lama?')}
                    className="bg-white border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700]"
                  >
                    Tanya Joki MLBB
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('Stok Netflix 4K dan Gemini Pro Priv masih ready min?')}
                    className="bg-white border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700]"
                  >
                    Tanya Stok Aplikasi
                  </button>
                  <button
                    onClick={() => handleQuickQuestion('Bisa bayar lewat QRIS / DANA / GoPay langsung kan?')}
                    className="bg-white border border-black px-2 py-0.5 shrink-0 hover:bg-[#FFC700]"
                  >
                    Tanya Pembayaran
                  </button>
                </>
              )}
            </div>
          )}

          {/* Image Attachment Preview Bar */}
          {selectedImage && (
            <div className="px-3 py-2 bg-amber-50 border-t-2 border-black flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="relative w-11 h-11 border border-black rounded overflow-hidden bg-white shrink-0">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
                <div className="text-[11px] font-mono leading-tight">
                  <span className="font-bold text-[#FF5900] flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5 text-[#FF5900]" />
                    <span>Foto Siap Dikirim</span>
                  </span>
                  <span className="text-neutral-500 text-[10px] block mt-0.5">Ketik pesan atau klik tombol kirim</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="p-1 border border-black bg-white hover:bg-red-500 hover:text-white transition-colors"
                title="Batal lampirkan gambar"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input Form (Only if not closed and (tab !== 'order' || myOrders.length > 0)) */}
          {!isOrderChatClosed && (chatTab !== 'order' || myOrders.length > 0) && (
            <form onSubmit={handleSend} className={`bg-white border-t-2 border-black flex items-center gap-2 shrink-0 ${
              isFullscreen ? 'p-3 sm:p-4' : 'p-2.5'
            }`}>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`border-2 border-black transition-colors relative shrink-0 ${
                  isFullscreen ? 'p-2.5 sm:p-3' : 'p-2'
                } ${
                  selectedImage ? 'bg-[#FFC700]' : 'bg-white hover:bg-[#FFC700]'
                }`}
                title="Kirim Foto / Bukti Transfer / Screenshot"
              >
                <ImageIcon className={isFullscreen ? "w-5 h-5 text-black" : "w-4 h-4 text-black"} />
              </button>

              <input
                type="text"
                placeholder={chatTab === 'order' ? `Pesan #${effectiveRoomId} (bisa paste gambar)...` : "Ketik pesan (bisa paste gambar)..."}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onPaste={handlePaste}
                className={`flex-1 border-2 border-black font-semibold focus:outline-none focus:ring-2 focus:ring-[#FFC700] ${
                  isFullscreen ? 'p-2.5 sm:p-3 text-sm sm:text-base' : 'p-2 text-xs'
                }`}
              />
              <button
                type="submit"
                disabled={isUploading || (!inputVal.trim() && !selectedImage)}
                className={`brutal-btn-yellow flex items-center justify-center font-bold disabled:opacity-50 shrink-0 ${
                  isFullscreen ? 'px-4 sm:px-6 py-2.5 sm:py-3 text-sm gap-2' : 'px-3 py-2 text-xs'
                }`}
              >
                <Send className={isFullscreen ? "w-4 h-4 sm:w-5 sm:h-5 text-black" : "w-4 h-4 text-black"} />
                {isFullscreen && <span className="hidden sm:inline font-mono">Kirim</span>}
              </button>
            </form>
          )}

          {/* Fallback WhatsApp Direct CTA inside Chat */}
          <div className="bg-[#FAF8F2] p-2 text-center border-t border-neutral-300 text-[10px] font-mono">
            <span>Admin lambat / lewat 10 menit? </span>
            <a
              href={currentOrder 
                ? generateWhatsAppLink(currentOrder.orderCode, currentOrder.itemName, currentOrder.totalAmount)
                : `https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=Halo%20Admin%20Zura%20Store!`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-[#FF5900] hover:text-black ml-1 inline-flex items-center gap-0.5"
            >
              <span>Lanjut ke WhatsApp</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

        </div>
      )}

      {/* Lightbox Modal for Full Size Image Viewing */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full max-h-[90vh] bg-white border-[3px] border-black p-3 shadow-brutal flex flex-col"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-black">
              <span className="font-mono text-xs font-bold uppercase text-[#121212] flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#FF5900]" />
                <span>Foto / Bukti Transfer Pelanggan</span>
              </span>
              <div className="flex items-center gap-2">
                <a 
                  href={lightboxImage} 
                  download="bukti-transaksi.jpg" 
                  className="brutal-btn-yellow py-1 px-2.5 text-[11px] font-mono font-bold flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  <span>Unduh</span>
                </a>
                <button 
                  onClick={() => setLightboxImage(null)}
                  className="p-1 border-2 border-black bg-white hover:bg-red-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="overflow-auto max-h-[75vh] flex items-center justify-center bg-neutral-900 p-2 border border-black">
              <img src={lightboxImage} alt="Lampiran Penuh" className="max-w-full max-h-[70vh] object-contain" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
