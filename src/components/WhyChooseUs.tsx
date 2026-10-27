import React from 'react';
import { ShieldCheck, Clock, Receipt, Zap, HeartHandshake, Lock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#FF5900]" />,
      title: "100% ANTI HACK-BACK",
      desc: "Semua akun joki dikerjakan murni handplay pro player tanpa script/cheat ilegal. Data kredensial otomatis dibersihkan saat pesanan selesai."
    },
    {
      icon: <Clock className="w-6 h-6 text-black" />,
      title: "GARANSI RESPON < 10 MENIT",
      desc: "Sistem cerdas kami memonitor respon admin. Jika lewat 10 menit belum dibalas, tombol WhatsApp langsung aktif otomatis dengan kode pesanan Anda."
    },
    {
      icon: <Receipt className="w-6 h-6 text-[#FF5900]" />,
      title: "STRUK RESMI & TERVERIFIKASI",
      desc: "Setiap transaksi diverifikasi dengan sidik jari kriptografi unik (hash) dan stempel resmi. Dapat diunduh atau dicetak kapan saja."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-black" />,
      title: "TRANSPARANSI & KEAMANAN AKUN",
      desc: "Setiap akun aplikasi diuji sebelum dikirim. Status garansi maupun non-garansi dicantumkan secara jujur dan transparan di setiap produk."
    }
  ];

  return (
    <section className="py-14 bg-[#FAF8F2] border-b-[3px] border-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FF5900] text-white px-3 py-1 font-mono text-xs font-black uppercase mb-2 border border-black shadow-[2px_2px_0px_#000]">
            <Lock className="w-3.5 h-3.5" />
            <span>STANDAR KEAMANAN TINGGI</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-[#121212] uppercase">
            KENAPA MEMILIH ZURA STORE?
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl mx-auto mt-1">
            Komitmen kami memberikan pelayanan terpercaya, aman, dan tanpa risiko bagi seluruh gamer dan pengguna aplikasi di Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white border-[2.5px] border-black p-5 shadow-brutal flex flex-col justify-between hover:translate-y-[-2px] transition-all"
            >
              <div>
                <div className="w-12 h-12 bg-[#FFC700] border-2 border-black flex items-center justify-center mb-4 shadow-[2px_2px_0px_#000]">
                  {item.icon}
                </div>
                <h4 className="font-display font-black text-base uppercase text-[#121212] mb-2 leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs font-mono text-neutral-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
