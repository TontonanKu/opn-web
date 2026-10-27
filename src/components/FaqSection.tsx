import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, Zap, Clock, Smartphone, CreditCard, MessageSquare } from 'lucide-react';

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Joki Game',
    question: 'Bagaimana cara order joki game dan apakah akun saya dijamin aman?',
    answer: 'Pilih game dan target rank Anda di katalog Joki Game, isi ID & Server serta catatan hero request, lalu lakukan pembayaran via QRIS/DANA. Joki kami 100% murni handplay pro player tanpa script/cheat dan bergaransi 100% Anti Hack-Back. Setelah pesanan selesai, data password akun otomatis dibersihkan (auto-purged) oleh sistem demi keamanan privasi Anda.',
    icon: <Zap className="w-4 h-4 text-[#FF5900]" />
  },
  {
    id: 'faq-2',
    category: 'Waktu Pengerjaan',
    question: 'Berapa lama waktu pengerjaan joki Mobile Legends atau Wuthering Waves?',
    answer: 'Untuk paket per-bintang diproses dalam hitungan jam (rata-rata 1-3 jam). Untuk paket rank besar seperti Epic ke Legend atau Legend ke Mythic biasanya selesai dalam 1-2 hari kerja tergantung banyaknya antrean dan request hero.',
    icon: <Clock className="w-4 h-4 text-emerald-600" />
  },
  {
    id: 'faq-3',
    category: 'Aplikasi Premium',
    question: 'Berapa durasi dan harga Spotify Premium serta CapCut Pro?',
    answer: 'Spotify Premium saat ini tersedia durasi 26-31 Hari (Rp 25.000). Untuk CapCut Pro tersedia pilihan Team Plan (durasi 4-7 Hari Rp 9.000 & 26-31 Hari Rp 35.000) serta Individual Plan (durasi 4-7 Hari Rp 9.000 & 6-7 Bulan Rp 250.000) via akun seller.',
    icon: <Smartphone className="w-4 h-4 text-purple-600" />
  },
  {
    id: 'faq-4',
    category: 'Garansi Aplikasi',
    question: 'Bagaimana kebijakan garansi untuk produk aplikasi?',
    answer: 'Aplikasi seperti Canva Edu dan YouTube Premium bergaransi resmi. Sedangkan untuk produk Spotify dan CapCut (Team & Individual) via akun seller berstatus No Garansi dengan harga yang sangat terjangkau.',
    icon: <ShieldCheck className="w-4 h-4 text-blue-600" />
  },
  {
    id: 'faq-5',
    category: 'Respon 10 Menit',
    question: 'Bagaimana mekanisme Garansi Respon 10 Menit di Zura Store?',
    answer: 'Setelah Anda checkout di web, sistem menghitung mundur 10 menit. Jika admin belum memproses pesanan Anda di web dalam 10 menit, tombol WhatsApp otomatis aktif dengan kode pesanan unik Anda agar pesanan langsung ditangani prioritas via chat WA admin.',
    icon: <Clock className="w-4 h-4 text-amber-600" />
  },
  {
    id: 'faq-6',
    category: 'Pembayaran',
    question: 'Metode pembayaran apa saja yang diterima di Zura Store?',
    answer: 'Kami menerima QRIS Resmi KAZURA STORE yang mendukung semua bank (BCA, Mandiri, BRI, BNI, Seabank, Jago) dan e-wallet (DANA, GoPay, OVO, ShopeePay). Anda juga bisa melakukan transfer langsung ke DANA & GoPay admin.',
    icon: <CreditCard className="w-4 h-4 text-green-600" />
  },
  {
    id: 'faq-7',
    category: 'Struk Transaksi',
    question: 'Apakah saya mendapatkan bukti transaksi resmi setelah membayar?',
    answer: 'Ya! Setiap pesanan memiliki Struk Transaksi Digital Resmi dengan kode unik (REC-xxxx) dan stempel verifikasi sistem. Anda bisa melihat, menyalin, mengunduh file gambar struk PNG, atau mencetak struk langsung dari web.',
    icon: <MessageSquare className="w-4 h-4 text-[#FF5900]" />
  }
];

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Joki Game', 'Aplikasi Premium', 'Garansi & Respon', 'Pembayaran'];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    if (activeCategory === 'Semua') return true;
    if (activeCategory === 'Joki Game') return item.category === 'Joki Game' || item.category === 'Waktu Pengerjaan';
    if (activeCategory === 'Aplikasi Premium') return item.category === 'Aplikasi Premium';
    if (activeCategory === 'Garansi & Respon') return item.category === 'Garansi Aplikasi' || item.category === 'Respon 10 Menit';
    if (activeCategory === 'Pembayaran') return item.category === 'Pembayaran' || item.category === 'Struk Transaksi';
    return true;
  });

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 bg-[#FAF8F2] border-b-[3px] border-[#121212]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFC700] text-black px-3.5 py-1 font-mono text-xs font-black uppercase mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PUSAT BANTUAN & PANDUAN</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#121212] uppercase tracking-tight">
            PERTANYAAN UMUM (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl mx-auto mt-2 font-sans">
            Semua hal yang perlu Anda ketahui tentang layanan joki game, pembelian aplikasi premium, garansi akun, dan metode pembayaran di Zura Store.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 font-mono text-xs font-bold uppercase border-2 border-black transition-all ${
                activeCategory === cat
                  ? 'bg-black text-[#FFC700] shadow-[2px_2px_0px_#FFC700]'
                  : 'bg-white text-black hover:bg-[#FFC700]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="brutal-card bg-white border-[2.5px] border-black transition-all overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-amber-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-none bg-[#FFC700] border border-black flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#000]">
                      {faq.icon}
                    </div>
                    <span className="font-display font-black text-sm sm:text-base text-[#121212] leading-snug">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-7 h-7 border border-black bg-neutral-100 flex items-center justify-center shrink-0 ml-2">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-black" /> : <ChevronDown className="w-4 h-4 text-black" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t-2 border-dashed border-neutral-200 bg-[#FFFDF9] animate-fade-in font-mono text-xs sm:text-sm text-neutral-800 leading-relaxed">
                    <p className="bg-amber-50/70 p-3 border-l-4 border-[#FF5900]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-10 bg-[#FFC700] border-[2.5px] border-black p-5 sm:p-6 text-center shadow-brutal flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-display font-black text-base sm:text-lg text-black uppercase">
              Masih punya pertanyaan lain?
            </h4>
            <p className="text-xs font-mono font-medium text-neutral-800 mt-0.5">
              CS Zura Store siap melayani Anda lewat Live Chat di web atau via WhatsApp resmi.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://wa.me/6282172795156?text=Halo%20Admin%20Zura!%20Saya%20mau%20tanya%20seputar%20layanan%20Zura%20Store"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black text-[#FFC700] hover:bg-neutral-900 border-2 border-black font-mono font-black text-xs py-2.5 px-4 shadow-[2px_2px_0px_#fff] flex items-center gap-1.5 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-[#FFC700]" />
              <span>Tanya CS di WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
