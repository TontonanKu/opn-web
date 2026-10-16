import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WhatsAppTestimonial, Order } from '../types';
import { 
  Receipt, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  Eye, 
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
  Gamepad2,
  Calendar,
  Sparkles,
  Check,
  X,
  Image as ImageIcon
} from 'lucide-react';

export const TestimonialSection: React.FC = () => {
  const { orders, testimonials, openReceiptModal } = useApp();
  const [activeTab, setActiveTab] = useState<'receipts' | 'whatsapp'>('receipts');
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  // Filter completed orders with receipts or customer reviews, sorted by latest review / creation
  const completedOrders = orders
    .filter(o => o.status === 'completed' && (o.receipt || o.reviewText))
    .sort((a, b) => {
      const timeA = a.reviewSubmittedAt || a.createdAt;
      const timeB = b.reviewSubmittedAt || b.createdAt;
      return timeB - timeA;
    });

  return (
    <section id="testimoni" className="py-16 bg-white border-b-[3px] border-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFC700] text-black px-3 py-1 font-mono text-xs font-bold uppercase mb-2 border border-black shadow-[2px_2px_0px_#000]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DUAL TESTIMONIAL SYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-[#121212]">
              BUKTI & TESTIMONI PELANGGAN
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl mt-1">
              Transparansi 100%. Ulasan dan rating bintang pelanggan di Web terbit otomatis bersama struk resmi, transaksi WhatsApp terdokumentasi lewat tangkapan layar asli.
            </p>
          </div>

          {/* Toggle Tab Buttons */}
          <div className="flex flex-col sm:flex-row border-[3px] border-[#121212] bg-[#FAF8F2] p-1 shadow-brutal-sm w-full sm:w-auto gap-1">
            <button
              onClick={() => setActiveTab('receipts')}
              className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 font-mono text-xs font-black uppercase transition-all ${
                activeTab === 'receipts'
                  ? 'bg-[#121212] text-[#FFC700] shadow-[2px_2px_0px_#000]'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              <Star className="w-4 h-4 fill-[#FFC700] text-[#FFC700] shrink-0" />
              <span>Ulasan & Struk Web ({completedOrders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2 font-mono text-xs font-black uppercase transition-all ${
                activeTab === 'whatsapp'
                  ? 'bg-[#121212] text-[#FFC700] shadow-[2px_2px_0px_#000]'
                  : 'text-neutral-700 hover:text-black'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span>Bukti Chat WhatsApp ({testimonials.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: WEB REVIEWS & RECEIPTS */}
        {activeTab === 'receipts' && (
          <div>
            <div className="mb-5 bg-[#FFF3B0] border-2 border-[#121212] p-3 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-[2px_2px_0px_#000]">
              <span className="font-bold flex items-center gap-2 text-black">
                <Star className="w-4 h-4 fill-[#FF5900] text-[#FF5900]" />
                <span>ULASAN & RATING RESMI PELANGGAN (Otomatis Masuk dari Live Chat & Lacak Pesanan)</span>
              </span>
              <span className="text-neutral-700 text-[11px]">Setiap ulasan terverifikasi 100% dari transaksi nyata</span>
            </div>

            {completedOrders.length === 0 ? (
              <div className="bg-[#FAF8F2] border-2 border-black p-8 text-center shadow-[3px_3px_0px_#000]">
                <MessageSquare className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <h4 className="font-display font-black text-base uppercase text-[#121212]">
                  Belum Ada Ulasan Transaksi Web
                </h4>
                <p className="text-xs font-mono text-neutral-600 mt-1 max-w-md mx-auto">
                  Jadilah pelanggan pertama yang menyelesaikan pesanan dan memberikan ulasan! Anda juga dapat melihat dokumentasi di tab Bukti Chat WhatsApp.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedOrders.map((order) => {
                const receipt = order.receipt;
                const rating = order.rating || receipt?.rating || 5;
                const reviewText = order.reviewText || receipt?.review;

                return (
                  <div
                    key={order.id}
                    className="brutal-card bg-white p-5 flex flex-col justify-between shadow-brutal hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all border-[2.5px] border-black"
                  >
                    <div>
                      {/* Top Bar: Customer Info & Rating */}
                      <div className="flex items-start justify-between border-b-2 border-black pb-3 mb-3 gap-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 bg-[#FFC700] border-2 border-black flex items-center justify-center font-display font-black text-sm shadow-[1.5px_1.5px_0px_#000]">
                            {order.customerName ? order.customerName.charAt(0).toUpperCase() : 'P'}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-display font-black text-xs text-[#121212] uppercase truncate max-w-[120px]">
                                {order.customerName}
                              </span>
                              <span className="bg-emerald-100 text-emerald-800 border border-emerald-600 font-mono font-bold text-[9px] px-1.5 py-0.2 uppercase">
                                VERIFIED
                              </span>
                            </div>
                            
                            {/* Dynamic Rating Stars */}
                            <div className="flex items-center gap-1 mt-0.5">
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((starIdx) => (
                                  <Star 
                                    key={starIdx} 
                                    className={`w-3.5 h-3.5 ${starIdx <= rating ? 'fill-[#FFC700] text-[#FFC700]' : 'text-neutral-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="font-mono font-bold text-[11px] text-neutral-800 ml-1">
                                {rating}.0
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="font-mono text-[10px] font-bold text-neutral-500 bg-neutral-100 px-2 py-0.5 border border-neutral-300 shrink-0">
                          {receipt?.completedDate || (order.reviewSubmittedAt ? new Date(order.reviewSubmittedAt).toLocaleDateString('id-ID') : 'Baru saja')}
                        </span>
                      </div>

                      {/* Prominent Customer Review Bubble */}
                      {reviewText && (
                        <div className="p-3 bg-[#FFFDF9] border-2 border-black shadow-[2px_2px_0px_#000] mb-3">
                          <p className="font-mono font-bold text-xs text-[#121212] leading-relaxed">
                            "{reviewText}"
                          </p>
                        </div>
                      )}

                      {/* Service & Receipt Meta Info */}
                      <div className="bg-[#FAF8F2] border border-black p-2.5 font-mono text-[11px] space-y-1 mb-3">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Layanan:</span>
                          <span className="font-bold text-[#121212] truncate max-w-[160px]">{order.itemName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Paket/Varian:</span>
                          <span className="font-bold text-[#FF5900] truncate max-w-[160px]">{order.itemDetails}</span>
                        </div>
                        {receipt && (
                          <div className="flex justify-between">
                            <span className="text-neutral-500">No. Struk:</span>
                            <span className="font-bold">{receipt.receiptNumber}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Total & Action */}
                    <div className="pt-3 border-t-2 border-dashed border-neutral-300">
                      <div className="flex justify-between items-baseline mb-3">
                        <span className="font-mono text-xs font-bold text-neutral-600">Total Transaksi:</span>
                        <span className="font-display font-black text-lg text-[#121212]">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount)}
                        </span>
                      </div>

                      <button
                        onClick={() => openReceiptModal(order)}
                        className="w-full brutal-btn-yellow py-2 px-3 text-xs font-mono font-bold uppercase flex items-center justify-center gap-1.5"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Lihat Struk Digital Resmi</span>
                      </button>
                    </div>

                  </div>
                );
              })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WHATSAPP SCREENSHOT TESTIMONIALS */}
        {activeTab === 'whatsapp' && (
          <div>
            <div className="mb-4 bg-emerald-50 border-2 border-emerald-500 p-3 text-xs font-mono flex items-center justify-between text-emerald-900">
              <span className="font-bold flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-emerald-700" />
                <span>TANGKAPAN LAYAR CHAT WHATSAPP ASLI DARI PELANGGAN SETIA</span>
              </span>
              <span className="hidden sm:inline">Klik foto untuk memperbesar screenshot</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="brutal-card bg-[#FAF8F2] flex flex-col justify-between overflow-hidden hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
                >
                  {/* WhatsApp Screenshot Box */}
                  <div
                    className="relative aspect-[4/3] bg-neutral-900 border-b-[3px] border-[#121212] cursor-pointer group overflow-hidden"
                    onClick={() => setSelectedScreenshot(testi.screenshotUrl)}
                  >
                    <img 
                      src={testi.screenshotUrl} 
                      alt={`Testimoni ${testi.customerName}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-1.5 font-mono text-xs font-bold">
                      <Eye className="w-4 h-4" />
                      <span>Perbesar Bukti</span>
                    </div>

                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 border border-black flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>WA VERIFIED</span>
                    </div>
                  </div>

                  {/* WhatsApp Chat Body */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Customer info */}
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <img 
                          src={testi.avatar} 
                          alt={testi.customerName}
                          className="w-9 h-9 rounded-full border-2 border-black object-cover" 
                        />
                        <div>
                          <h4 className="font-bold text-xs text-[#121212] leading-tight">
                            {testi.customerName}
                          </h4>
                          <span className="text-[10px] font-mono text-neutral-500">
                            {testi.date}
                          </span>
                        </div>
                      </div>

                      {/* Service Tag */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="bg-[#FFC700] text-black font-mono font-extrabold text-[10px] px-2 py-0.5 border border-black">
                          {testi.serviceCategory}
                        </span>
                        <div className="flex items-center">
                          {[...Array(testi.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#FF5900] text-[#FF5900]" />
                          ))}
                        </div>
                      </div>

                      {/* Chat Snippet (WhatsApp bubble look) */}
                      <div className="bg-emerald-100 border border-emerald-400 p-2.5 rounded-br-lg rounded-tl-lg text-xs text-neutral-800 leading-relaxed font-sans shadow-sm mb-2">
                        "{testi.chatSnippet}"
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-300 flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>Ref Order:</span>
                      <span className="font-bold text-black">{testi.orderCode}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Screenshot Zoom Modal */}
      {selectedScreenshot && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div className="brutal-card bg-white max-w-xl w-full p-4 relative" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-3 pb-2 border-b-2 border-black">
              <span className="font-mono font-bold text-xs uppercase flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#FF5900]" />
                <span>Tangkapan Layar Chat Bukti Pembayaran & Testimoni</span>
              </span>
              <button 
                onClick={() => setSelectedScreenshot(null)}
                className="font-mono font-bold text-xs bg-red-500 text-white px-2 py-1 border border-black flex items-center gap-1 hover:bg-red-600 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>TUTUP</span>
              </button>
            </div>
            <div className="border-2 border-black overflow-hidden max-h-[70vh]">
              <img 
                src={selectedScreenshot} 
                alt="Screenshot Detail" 
                className="w-full h-full object-contain" 
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
