import React, { useState, useMemo } from 'react';
import { 
  Calculator, MessageCircle, Sparkles, Check, Flame, Clock, 
  ShieldCheck, Download, Copy, AlertCircle, ArrowRight 
} from 'lucide-react';
import { jokiGames, personalInfo } from '../data/portfolioData';
import { generateInvoiceImage } from '../utils/generateInvoiceImage';

export default function JokiCalculator() {
  const [selectedGameId, setSelectedGameId] = useState('mlbb');
  const [currentRankIndex, setCurrentRankIndex] = useState(2); // e.g. Epic
  const [targetRankIndex, setTargetRankIndex] = useState(4);  // e.g. Mythic
  const [starCount, setStarCount] = useState(5);

  // Single service index (for WuWa and Roblox)
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  // Addons (No Joki Gendong as requested)
  const [isExpress, setIsExpress] = useState(false);
  const [isLiveStream, setIsLiveStream] = useState(false);
  const [isHeroRequest, setIsHeroRequest] = useState(false);

  // Image & Copy states
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const activeGame = jokiGames.find((g) => g.id === selectedGameId) || jokiGames[0];
  const isDirectServiceGame = activeGame.id === 'wuwa' || activeGame.id === 'roblox';

  // Safe rank indices
  const safeCurrentRank = Math.min(currentRankIndex, activeGame.ranks.length - 1);
  const safeTargetRank = Math.max(safeCurrentRank, Math.min(targetRankIndex, activeGame.ranks.length - 1));
  const safeServiceIndex = Math.min(selectedServiceIndex, activeGame.ranks.length - 1);

  // Precise calculation
  const calculation = useMemo(() => {
    let basePrice = 0;
    let description = '';
    let estimatedTime = '1 - 2 Hari';

    if (isDirectServiceGame) {
      const service = activeGame.ranks[safeServiceIndex] || activeGame.ranks[0];
      basePrice = service.pricePerStar;
      description = service.name;
      estimatedTime = service.estimatedTime || '1 - 3 Hari';
    } else {
      // MOBA Rank Progression (MLBB)
      const fromRank = activeGame.ranks[safeCurrentRank];
      const toRank = activeGame.ranks[safeTargetRank];
      description = `${fromRank.name} → ${toRank.name} (${starCount}★)`;

      if (safeCurrentRank === safeTargetRank) {
        basePrice = fromRank.pricePerStar * starCount;
      } else {
        let totalRankPrice = 0;
        const totalSteps = safeTargetRank - safeCurrentRank + 1;
        for (let i = safeCurrentRank; i <= safeTargetRank; i++) {
          totalRankPrice += activeGame.ranks[i].pricePerStar;
        }
        const avgPrice = totalRankPrice / totalSteps;
        basePrice = Math.round(avgPrice * starCount * Math.max(1, safeTargetRank - safeCurrentRank));
      }

      estimatedTime = safeTargetRank - safeCurrentRank <= 1 ? '1 - 2 Hari' : '2 - 4 Hari';
    }

    // Addons calculations
    const activeAddons = [];
    let addonSum = 0;

    if (isExpress) {
      const cost = Math.round(basePrice * 0.20);
      activeAddons.push({ name: 'Express Kilat (+20%)', price: cost });
      addonSum += cost;
    }

    if (isLiveStream) {
      const cost = 15000;
      activeAddons.push({ name: 'Private Live Stream Discord', price: cost });
      addonSum += cost;
    }

    if (isHeroRequest) {
      activeAddons.push({ name: 'Request Hero / Jam Main (Gratis)', price: 0 });
    }

    const finalTotal = basePrice + addonSum;

    return {
      basePrice,
      description,
      activeAddons,
      finalTotal,
      estimatedTime
    };
  }, [activeGame, isDirectServiceGame, safeCurrentRank, safeTargetRank, safeServiceIndex, starCount, isExpress, isLiveStream, isHeroRequest]);

  // Unique Order ID
  const orderId = useMemo(() => {
    return `CALC-${activeGame.shortName || 'JOKI'}-${Math.floor(100000 + Math.random() * 900000)}`;
  }, [activeGame.id, safeCurrentRank, safeTargetRank, safeServiceIndex]);

  // Download Image
  const handleDownloadInvoice = async () => {
    try {
      setIsGeneratingImage(true);
      const { blob, url } = await generateInvoiceImage({
        gameName: activeGame.name,
        tierName: calculation.description,
        quantity: isDirectServiceGame ? 1 : starCount,
        unitPrice: Math.round(calculation.basePrice / (isDirectServiceGame ? 1 : starCount)),
        addons: calculation.activeAddons,
        totalPrice: calculation.finalTotal,
        estimatedTime: calculation.estimatedTime,
        orderNumber: orderId
      });

      const a = document.createElement('a');
      a.href = url;
      a.download = `Struk-${activeGame.shortName || 'Kalkulator'}-${orderId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setToastMessage('✓ Gambar struk berhasil disimpan ke perangkatmu!');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Gagal membuat gambar struk kalkulator.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Copy to clipboard
  const handleCopyInvoice = async () => {
    try {
      const { blob } = await generateInvoiceImage({
        gameName: activeGame.name,
        tierName: calculation.description,
        quantity: isDirectServiceGame ? 1 : starCount,
        unitPrice: Math.round(calculation.basePrice / (isDirectServiceGame ? 1 : starCount)),
        addons: calculation.activeAddons,
        totalPrice: calculation.finalTotal,
        estimatedTime: calculation.estimatedTime,
        orderNumber: orderId
      });

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopySuccess(true);
        setToastMessage('✓ Gambar struk tersalin! Tekan Ctrl+V di WhatsApp untuk tempel.');
        setTimeout(() => {
          setCopySuccess(false);
          setToastMessage('');
        }, 4000);
        return;
      }
    } catch (e) {
      console.log('Clipboard fallback');
    }

    const text = `Simulasi Kalkulator Joki ${activeGame.name}\n${calculation.description} = Rp ${calculation.finalTotal.toLocaleString('id-ID')}\nInvoice: ${orderId}`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setToastMessage('✓ Simulasi order berhasil disalin!');
    setTimeout(() => {
      setCopySuccess(false);
      setToastMessage('');
    }, 3000);
  };

  // WhatsApp order link
  const waOrderUrl = useMemo(() => {
    const addonListStr = calculation.activeAddons.length > 0 
      ? calculation.activeAddons.map(a => a.name).join(', ') 
      : 'Standar Handplay';

    const msg = `Halo zura-w!
Saya mau order Joki Game hasil kalkulator:
🎮 Game: ${activeGame.name}
📍 Detail: ${calculation.description}
⚡ Opsi Tambahan: ${addonListStr}
💰 Total Estimasi Biaya: Rp ${calculation.finalTotal.toLocaleString('id-ID')}
⏱ Estimasi: ${calculation.estimatedTime}
📄 No. Invoice: ${orderId}

(Gambar struk kalkulator sudah saya simpan dan akan saya kirim di chat ini)
Apakah slot pengerjaan masih tersedia?`;

    return `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }, [activeGame, calculation, orderId]);

  return (
    <section id="kalkulator" className="py-12 md:py-20 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58327] text-white font-black text-xs uppercase tracking-wider mb-3 shadow-2xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>Simulasi Harga 100% Akurat</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight font-['Outfit']">
            <span className="text-[#C02C3C]">KALKULATOR</span> <span className="text-[#E58327]">JOKI</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#FAF4E8]/90 font-medium">
            Simulasikan estimasi harga joki rank atau perawatan akun secara real-time dan transparan.
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-[#FAF4E8] border-3 border-[#9E1B28] rounded-[32px] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Inputs (Left) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* 1. Pilih Game */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-2 font-['Outfit']">
                  1. Pilih Game
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {jokiGames.map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => {
                        setSelectedGameId(g.id);
                        setCurrentRankIndex(0);
                        setTargetRankIndex(Math.min(2, g.ranks.length - 1));
                        setSelectedServiceIndex(0);
                      }}
                      className={`p-3 rounded-xl text-left border-2 text-xs sm:text-sm font-black transition-all cursor-pointer ${
                        selectedGameId === g.id
                          ? 'border-[#9E1B28] bg-[#9E1B28] text-white shadow-sm'
                          : 'border-[#9E1B28]/30 bg-white text-[#2B1618] hover:border-[#9E1B28]'
                      }`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Mode Selector: MOBA vs Service Games */}
              {isDirectServiceGame ? (
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-1.5 font-['Outfit']">
                    2. Pilih Paket Layanan / Durasi ({activeGame.name})
                  </label>
                  <select
                    value={safeServiceIndex}
                    onChange={(e) => setSelectedServiceIndex(Number(e.target.value))}
                    className="w-full bg-white border-2 border-[#9E1B28]/40 rounded-xl p-3 text-xs sm:text-sm font-bold text-[#2B1618] focus:outline-hidden focus:border-[#9E1B28] cursor-pointer"
                  >
                    {activeGame.ranks.map((r, i) => (
                      <option key={i} value={i}>
                        {r.name} — Rp {r.pricePerStar.toLocaleString('id-ID')}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  {/* Rank Asal & Target (MLBB) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-1.5 font-['Outfit']">
                        2. Rank Saat Ini
                      </label>
                      <select
                        value={safeCurrentRank}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setCurrentRankIndex(val);
                          if (val > safeTargetRank) setTargetRankIndex(val);
                        }}
                        className="w-full bg-white border-2 border-[#9E1B28]/40 rounded-xl p-3 text-xs sm:text-sm font-bold text-[#2B1618] focus:outline-hidden focus:border-[#9E1B28] cursor-pointer"
                      >
                        {activeGame.ranks.map((r, i) => (
                          <option key={i} value={i}>
                            {r.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-1.5 font-['Outfit']">
                        3. Target Rank
                      </label>
                      <select
                        value={safeTargetRank}
                        onChange={(e) => setTargetRankIndex(Number(e.target.value))}
                        className="w-full bg-white border-2 border-[#9E1B28]/40 rounded-xl p-3 text-xs sm:text-sm font-bold text-[#2B1618] focus:outline-hidden focus:border-[#9E1B28] cursor-pointer"
                      >
                        {activeGame.ranks.map((r, i) => (
                          <option key={i} value={i} disabled={i < safeCurrentRank}>
                            {r.name} {i < safeCurrentRank ? '(Di bawah rank awal)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Slider Bintang */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit']">
                        4. Total Bintang / Win Ditargetkan:
                      </label>
                      <span className="px-3 py-1 bg-[#E58327] text-white font-black text-xs rounded-full">
                        {starCount} Bintang
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="25"
                      value={starCount}
                      onChange={(e) => setStarCount(Number(e.target.value))}
                      className="w-full h-2.5 bg-white border border-[#9E1B28]/30 rounded-lg appearance-none cursor-pointer accent-[#9E1B28]"
                    />
                    <div className="flex justify-between text-[10px] text-[#6B5B5E] font-bold mt-1">
                      <span>1 Bintang</span>
                      <span>10 Bintang</span>
                      <span>25 Bintang</span>
                    </div>
                  </div>
                </>
              )}

              {/* Opsi Tambahan (No Joki Gendong) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-2 font-['Outfit']">
                  {isDirectServiceGame ? '3. Opsi Tambahan' : '5. Opsi Tambahan'}
                </label>
                <div className="space-y-2.5">
                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#9E1B28]/30 cursor-pointer hover:border-[#9E1B28] transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isLiveStream}
                        onChange={(e) => setIsLiveStream(e.target.checked)}
                        className="w-4 h-4 rounded text-[#9E1B28] accent-[#9E1B28] cursor-pointer"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#2B1618] block">
                          Private Live Stream via Discord
                        </span>
                        <span className="text-[11px] text-[#6B5B5E] block">
                          Nonton langsung permainan joki di Discord
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#E58327] shrink-0">+Rp 15.000</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#9E1B28]/30 cursor-pointer hover:border-[#9E1B28] transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isExpress}
                        onChange={(e) => setIsExpress(e.target.checked)}
                        className="w-4 h-4 rounded text-[#9E1B28] accent-[#9E1B28] cursor-pointer"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#2B1618] block">
                          Express Kilat (Prioritas Antrian Utama)
                        </span>
                        <span className="text-[11px] text-[#6B5B5E] block">
                          Dikerjakan pertama hari ini
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#E58327] shrink-0">+20%</span>
                  </label>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#9E1B28]/30 cursor-pointer hover:border-[#9E1B28] transition-colors">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isHeroRequest}
                        onChange={(e) => setIsHeroRequest(e.target.checked)}
                        className="w-4 h-4 rounded text-[#9E1B28] accent-[#9E1B28] cursor-pointer"
                      />
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-[#2B1618] block">
                          Request Hero / Jam Main
                        </span>
                        <span className="text-[11px] text-[#6B5B5E] block">
                          Hero favorit disesuaikan
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-green-600 shrink-0">GRATIS</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Price Output Summary (Right) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-linear-to-b from-[#9E1B28] to-[#7A111C] p-6 sm:p-7 rounded-2xl text-white shadow-lg border border-[#7A111C]">
              <div>
                <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FDE047] font-['Outfit']">
                    Ringkasan Order
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-bold">
                    {orderId}
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Game:</span>
                    <span className="font-extrabold">{activeGame.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/70">Detail Layanan:</span>
                    <span className="font-extrabold text-[#FDE047] text-right">
                      {calculation.description}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="text-white/70">Subtotal Dasar:</span>
                    <span className="font-bold">
                      Rp {calculation.basePrice.toLocaleString('id-ID')}
                    </span>
                  </div>

                  {/* Explicit breakdown of all active addons */}
                  {calculation.activeAddons.length > 0 && (
                    <div className="bg-black/20 p-2.5 rounded-xl space-y-1.5 border border-white/10">
                      <span className="text-[11px] font-bold text-[#FDE047] block">
                        Rincian Tambahan:
                      </span>
                      {calculation.activeAddons.map((addon, idx) => (
                        <div key={idx} className="flex justify-between text-[11px]">
                          <span className="text-white/80">• {addon.name}</span>
                          <span className="font-mono font-bold text-[#FDE047]">
                            {addon.price > 0 ? `+Rp ${addon.price.toLocaleString('id-ID')}` : 'Gratis'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-white/70">Estimasi Selesai:</span>
                    <span className="font-extrabold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FDE047]" />
                      {calculation.estimatedTime}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/70">Keamanan:</span>
                    <span className="font-extrabold text-green-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      100% Handplay Garansi
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/20">
                  <span className="text-xs text-white/80 font-bold uppercase tracking-wider">
                    Total Estimasi Biaya
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#FDE047] mt-1 font-['Outfit']">
                    Rp {calculation.finalTotal.toLocaleString('id-ID')}
                  </div>
                  <p className="text-[11px] text-white/60 mt-0.5">
                    *Mendukung QRIS Kazura Store & Semua Bank
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                {toastMessage && (
                  <div className="p-2.5 rounded-xl bg-green-500 text-white font-bold text-xs text-center animate-in fade-in duration-200">
                    {toastMessage}
                  </div>
                )}

                {/* Simpan Gambar Struk */}
                <button
                  type="button"
                  onClick={handleDownloadInvoice}
                  disabled={isGeneratingImage}
                  className="w-full flex items-center justify-center gap-2 bg-[#FAF4E8] hover:bg-[#F3ECE0] text-[#9E1B28] font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all active:translate-y-0.5 cursor-pointer border border-[#7A111C]"
                >
                  <Download className="w-4 h-4 text-[#9E1B28]" />
                  <span>{isGeneratingImage ? 'Membuat Gambar...' : 'Simpan Gambar Struk (PNG)'}</span>
                </button>

                {/* Salin Struk */}
                <button
                  type="button"
                  onClick={handleCopyInvoice}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer border border-white/20"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copySuccess ? 'Tersalin ke Clipboard!' : 'Salin Gambar Struk (Ctrl+V)'}</span>
                </button>

                {/* Order via WhatsApp */}
                <a
                  href={waOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#E58327] hover:bg-[#D4741B] text-white font-black text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95 border-2 border-white cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Order via WhatsApp Sekarang</span>
                </a>

                {/* Tips */}
                <div className="p-2 bg-black/20 rounded-xl border border-white/10 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#FDE047] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-white/80 leading-tight">
                    WhatsApp hanya menerima teks dari link web. Simpan gambar struk di atas lalu lampirkan langsung di ruang chat WhatsApp.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
