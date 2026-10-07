import React, { useState, useMemo } from 'react';
import { 
  Calculator, MessageCircle, Sparkles, Check, Flame, Clock, 
  ShieldCheck, Download, Copy, AlertCircle, ArrowRight, Globe
} from 'lucide-react';
import { getJokiGames, personalInfo } from '../data/portfolioData';
import { generateInvoiceImage } from '../utils/generateInvoiceImage';
import { useLanguage } from '../context/LanguageContext';
import { useExchangeRate } from '../utils/currencyRate';
import { FlagID, FlagMY } from './Flags';

export default function JokiCalculator() {
  const { t, lang } = useLanguage();
  const jokiGames = useMemo(() => getJokiGames(lang), [lang]);
  const { rate, convertIdrToMyr } = useExchangeRate();

  const [currency, setCurrency] = useState('IDR'); // 'IDR' or 'MYR'
  const isMyr = currency === 'MYR';

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
    let estimatedTime = lang === 'en' ? '1 - 2 Days' : '1 - 2 Hari';

    if (isDirectServiceGame) {
      const service = activeGame.ranks[safeServiceIndex] || activeGame.ranks[0];
      basePrice = service.pricePerStar;
      description = service.name;
      estimatedTime = service.estimatedTime || (lang === 'en' ? '1 - 3 Days' : '1 - 3 Hari');
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

      estimatedTime = safeTargetRank - safeCurrentRank <= 1 
        ? (lang === 'en' ? '1 - 2 Days' : '1 - 2 Hari') 
        : (lang === 'en' ? '2 - 4 Days' : '2 - 4 Hari');
    }

    // Addons calculations
    const activeAddons = [];
    let addonSum = 0;

    if (isExpress) {
      const cost = Math.round(basePrice * 0.20);
      activeAddons.push({ name: lang === 'en' ? 'Express Rush (+20%)' : 'Express Kilat (+20%)', price: cost });
      addonSum += cost;
    }

    if (isLiveStream) {
      const cost = 15000;
      activeAddons.push({ name: lang === 'en' ? 'Private Live Stream Discord' : 'Private Live Stream Discord', price: cost });
      addonSum += cost;
    }

    if (isHeroRequest) {
      activeAddons.push({ name: lang === 'en' ? 'Request Hero / Playing Hours (Free)' : 'Request Hero / Jam Main (Gratis)', price: 0 });
    }

    const finalTotal = basePrice + addonSum;

    return {
      basePrice,
      description,
      activeAddons,
      finalTotal,
      estimatedTime
    };
  }, [activeGame, isDirectServiceGame, safeCurrentRank, safeTargetRank, safeServiceIndex, starCount, isExpress, isLiveStream, isHeroRequest, lang]);

  // Unique Order ID
  const orderId = useMemo(() => {
    return `CALC-${activeGame.shortName || 'JOKI'}-${Math.floor(100000 + Math.random() * 900000)}`;
  }, [activeGame.id, safeCurrentRank, safeTargetRank, safeServiceIndex]);

  // Download Image
  const handleDownloadInvoice = async () => {
    try {
      setIsGeneratingImage(true);
      const myrUnitPrice = convertIdrToMyr(Math.round(calculation.basePrice / (isDirectServiceGame ? 1 : starCount)));
      const myrBasePrice = convertIdrToMyr(calculation.basePrice);
      const myrFinalTotal = convertIdrToMyr(calculation.finalTotal);

      const formattedAddons = calculation.activeAddons.map(a => ({
        ...a,
        formattedPrice: a.price > 0 
          ? (isMyr ? `+RM ${convertIdrToMyr(a.price).toFixed(2)}` : `+Rp ${a.price.toLocaleString('id-ID')}`)
          : t.joki.free
      }));

      const { blob, url } = await generateInvoiceImage({
        gameName: activeGame.name,
        tierName: calculation.description,
        quantity: isDirectServiceGame ? 1 : starCount,
        unitPrice: isMyr ? myrUnitPrice : Math.round(calculation.basePrice / (isDirectServiceGame ? 1 : starCount)),
        addons: formattedAddons,
        totalPrice: isMyr ? myrFinalTotal : calculation.finalTotal,
        estimatedTime: calculation.estimatedTime,
        orderNumber: orderId,
        currency: isMyr ? 'MYR' : 'IDR',
        formattedUnitPrice: isMyr ? `RM ${myrUnitPrice.toFixed(2)}` : null,
        formattedSubtotal: isMyr ? `RM ${myrBasePrice.toFixed(2)}` : null,
        formattedTotal: isMyr ? `RM ${myrFinalTotal.toFixed(2)}` : null,
        secondaryTotalText: isMyr ? `≈ Rp ${calculation.finalTotal.toLocaleString('id-ID')}` : null
      });

      const a = document.createElement('a');
      a.href = url;
      a.download = `Struk-${activeGame.shortName || 'Kalkulator'}-${orderId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setToastMessage(t.joki.toastDownloaded);
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      console.error(err);
      alert(lang === 'en' ? 'Failed to generate calculator receipt image.' : 'Gagal membuat gambar struk kalkulator.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Copy to clipboard
  const handleCopyInvoice = async () => {
    const myrUnitPrice = convertIdrToMyr(Math.round(calculation.basePrice / (isDirectServiceGame ? 1 : starCount)));
    const myrBasePrice = convertIdrToMyr(calculation.basePrice);
    const myrFinalTotal = convertIdrToMyr(calculation.finalTotal);

    const formattedAddons = calculation.activeAddons.map(a => ({
      ...a,
      formattedPrice: a.price > 0 
        ? (isMyr ? `+RM ${convertIdrToMyr(a.price).toFixed(2)}` : `+Rp ${a.price.toLocaleString('id-ID')}`)
        : t.joki.free
    }));

    try {
      const { blob } = await generateInvoiceImage({
        gameName: activeGame.name,
        tierName: calculation.description,
        quantity: isDirectServiceGame ? 1 : starCount,
        unitPrice: isMyr ? myrUnitPrice : Math.round(calculation.basePrice / (isDirectServiceGame ? 1 : starCount)),
        addons: formattedAddons,
        totalPrice: isMyr ? myrFinalTotal : calculation.finalTotal,
        estimatedTime: calculation.estimatedTime,
        orderNumber: orderId,
        currency: isMyr ? 'MYR' : 'IDR',
        formattedUnitPrice: isMyr ? `RM ${myrUnitPrice.toFixed(2)}` : null,
        formattedSubtotal: isMyr ? `RM ${myrBasePrice.toFixed(2)}` : null,
        formattedTotal: isMyr ? `RM ${myrFinalTotal.toFixed(2)}` : null,
        secondaryTotalText: isMyr ? `≈ Rp ${calculation.finalTotal.toLocaleString('id-ID')}` : null
      });

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopySuccess(true);
        setToastMessage(t.joki.toastCopiedImg);
        setTimeout(() => {
          setCopySuccess(false);
          setToastMessage('');
        }, 4000);
        return;
      }
    } catch (e) {
      console.log('Clipboard fallback');
    }

    const priceText = isMyr 
      ? `RM ${myrFinalTotal.toFixed(2)} (≈ Rp ${calculation.finalTotal.toLocaleString('id-ID')})`
      : `Rp ${calculation.finalTotal.toLocaleString('id-ID')}`;

    const text = `Simulasi Kalkulator Joki ${activeGame.name}\n${calculation.description} = ${priceText}\nInvoice: ${orderId}`;
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setToastMessage(t.joki.toastCopiedText);
    setTimeout(() => {
      setCopySuccess(false);
      setToastMessage('');
    }, 3000);
  };

  // WhatsApp order link
  const waOrderUrl = useMemo(() => {
    const myrFinalTotal = convertIdrToMyr(calculation.finalTotal);

    const addonListStr = calculation.activeAddons.length > 0 
      ? calculation.activeAddons.map(a => {
          if (a.price > 0 && isMyr) {
            return `${a.name} (+RM ${convertIdrToMyr(a.price).toFixed(2)})`;
          }
          return a.name;
        }).join(', ') 
      : (lang === 'en' ? 'Standard Handplay' : 'Standar Handplay');

    const costStr = isMyr
      ? `RM ${myrFinalTotal.toFixed(2)} (≈ Rp ${calculation.finalTotal.toLocaleString('id-ID')})\n💱 Kurs Real-Time: 1 MYR ≈ Rp ${Math.round(rate).toLocaleString('id-ID')}\n🇲🇾 Pembayaran: DuitNow / QRIS / Wise / Bank Transfer`
      : `Rp ${calculation.finalTotal.toLocaleString('id-ID')}`;

    const msg = lang === 'en'
      ? `Hello zura-w!
I would like to order Game Boost via Calculator:
🎮 Game: ${activeGame.name}
📍 Details: ${calculation.description}
⚡ Add-ons: ${addonListStr}
💰 Total Estimated Cost: ${costStr}
⏱ Estimate: ${calculation.estimatedTime}
📄 Invoice No: ${orderId}

(I have saved the calculator receipt image and will attach it in this chat)
Are boosting slots currently available?`
      : `Halo zura-w!
Saya mau order Joki Game hasil kalkulator:
🎮 Game: ${activeGame.name}
📍 Detail: ${calculation.description}
⚡ Opsi Tambahan: ${addonListStr}
💰 Total Estimasi Biaya: ${costStr}
⏱ Estimasi: ${calculation.estimatedTime}
📄 No. Invoice: ${orderId}

(Gambar struk kalkulator sudah saya simpan dan akan saya kirim di chat ini)
Apakah slot pengerjaan masih tersedia?`;

    return `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }, [activeGame, calculation, orderId, lang, isMyr, rate]);

  return (
    <section id="kalkulator" className="py-12 md:py-20 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E58327] text-white font-black text-xs uppercase tracking-wider mb-3 shadow-2xs">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t.calc.badge}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight font-['Outfit']">
            <span className="text-[#C02C3C]">{t.calc.titlePrefix}</span> <span className="text-[#E58327]">{t.calc.titleSuffix}</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#FAF4E8]/90 font-medium">
            {t.calc.subtitle}
          </p>
        </div>

        {/* Calculator Card */}
        <div className="bg-[#FAF4E8] border-3 border-[#9E1B28] rounded-[32px] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Form Inputs (Left) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Currency Selector */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white rounded-2xl border-2 border-[#9E1B28]/30 mb-5 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
                    <Globe className="w-3.5 h-3.5 text-[#FDE047]" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-[#9E1B28] uppercase tracking-wide">
                      {lang === 'en' ? 'Currency:' : 'Mata Uang:'}
                    </span>
                    <span className="text-[10px] text-[#6B5B5E] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      <span>1 MYR ≈ Rp {Math.round(rate).toLocaleString('id-ID')}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 p-0.5 bg-[#FAF4E8] border border-[#9E1B28]/30 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setCurrency('IDR')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      !isMyr
                        ? 'bg-[#9E1B28] text-white shadow-2xs'
                        : 'text-[#2B1618] hover:bg-white'
                    }`}
                  >
                    <FlagID className="w-3.5 h-2" />
                    <span>IDR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('MYR')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                      isMyr
                        ? 'bg-[#9E1B28] text-white shadow-2xs'
                        : 'text-[#2B1618] hover:bg-white'
                    }`}
                  >
                    <FlagMY className="w-3.5 h-2" />
                    <span>MYR</span>
                  </button>
                </div>
              </div>
              
              {/* 1. Pilih Game */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-2 font-['Outfit']">
                  {t.calc.step1}
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
                    {t.calc.step2Service} ({activeGame.name})
                  </label>
                  <select
                    value={safeServiceIndex}
                    onChange={(e) => setSelectedServiceIndex(Number(e.target.value))}
                    className="w-full bg-white border-2 border-[#9E1B28]/40 rounded-xl p-3 text-xs sm:text-sm font-bold text-[#2B1618] focus:outline-hidden focus:border-[#9E1B28] cursor-pointer"
                  >
                    {activeGame.ranks.map((r, i) => (
                      <option key={i} value={i}>
                        {r.name} — {isMyr ? `RM ${convertIdrToMyr(r.pricePerStar).toFixed(2)}` : `Rp ${r.pricePerStar.toLocaleString('id-ID')}`}
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
                        {t.calc.step2RankFrom}
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
                        {t.calc.step3RankTo}
                      </label>
                      <select
                        value={safeTargetRank}
                        onChange={(e) => setTargetRankIndex(Number(e.target.value))}
                        className="w-full bg-white border-2 border-[#9E1B28]/40 rounded-xl p-3 text-xs sm:text-sm font-bold text-[#2B1618] focus:outline-hidden focus:border-[#9E1B28] cursor-pointer"
                      >
                        {activeGame.ranks.map((r, i) => (
                          <option key={i} value={i} disabled={i < safeCurrentRank}>
                            {r.name} {i < safeCurrentRank ? t.calc.belowInitialRank : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Slider Bintang */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit']">
                        {t.calc.step4Stars}
                      </label>
                      <span className="px-3 py-1 bg-[#E58327] text-white font-black text-xs rounded-full">
                        {starCount} {t.calc.starsUnit}
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
                      <span>1 {t.calc.starsUnit}</span>
                      <span>10 {t.calc.starsUnit}</span>
                      <span>25 {t.calc.starsUnit}</span>
                    </div>
                  </div>
                </>
              )}

              {/* Opsi Tambahan (No Joki Gendong) */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-2 font-['Outfit']">
                  {isDirectServiceGame ? `3. ${t.calc.stepAddons}` : `5. ${t.calc.stepAddons}`}
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
                          {t.joki.streamTitle}
                        </span>
                        <span className="text-[11px] text-[#6B5B5E] block">
                          {t.joki.streamDesc}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-[#E58327] shrink-0">
                      {isMyr ? `+RM ${convertIdrToMyr(15000).toFixed(2)}` : '+Rp 15.000'}
                    </span>
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
                          {t.joki.expressTitle}
                        </span>
                        <span className="text-[11px] text-[#6B5B5E] block">
                          {t.joki.expressDesc}
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
                          {t.joki.heroTitle}
                        </span>
                        <span className="text-[11px] text-[#6B5B5E] block">
                          {t.joki.heroDesc}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-black text-green-600 shrink-0">{t.joki.free}</span>
                  </label>
                </div>
              </div>

            </div>

            {/* Price Output Summary (Right) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-linear-to-b from-[#9E1B28] to-[#7A111C] p-6 sm:p-7 rounded-2xl text-white shadow-lg border border-[#7A111C]">
              <div>
                <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-[#FDE047] font-['Outfit']">
                    {t.joki.receiptTitle}
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-bold">
                    {orderId}
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">{t.joki.receiptCategory}</span>
                    <span className="font-extrabold">{activeGame.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/70">{t.joki.receiptItem}</span>
                    <span className="font-extrabold text-[#FDE047] text-right">
                      {calculation.description}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-white/10 pt-2">
                    <span className="text-white/70">{t.calc.subtotalBase}</span>
                    <span className="font-bold">
                      {isMyr ? `RM ${convertIdrToMyr(calculation.basePrice).toFixed(2)}` : `Rp ${calculation.basePrice.toLocaleString('id-ID')}`}
                    </span>
                  </div>

                  {/* Explicit breakdown of all active addons */}
                  {calculation.activeAddons.length > 0 && (
                    <div className="bg-black/20 p-2.5 rounded-xl space-y-1.5 border border-white/10">
                      <span className="text-[11px] font-bold text-[#FDE047] block">
                        {t.calc.addonsBreakdown}
                      </span>
                      {calculation.activeAddons.map((addon, idx) => (
                        <div key={idx} className="flex justify-between text-[11px]">
                          <span className="text-white/80">• {addon.name}</span>
                          <span className="font-mono font-bold text-[#FDE047]">
                            {addon.price > 0 
                              ? (isMyr ? `+RM ${convertIdrToMyr(addon.price).toFixed(2)}` : `+Rp ${addon.price.toLocaleString('id-ID')}`) 
                              : t.joki.free}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-white/70">{t.calc.estCompleted}</span>
                    <span className="font-extrabold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#FDE047]" />
                      {calculation.estimatedTime}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-white/70">{t.joki.receiptSecurity}</span>
                    <span className="font-extrabold text-green-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t.calc.securityGuarantee}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-white/20">
                  <span className="text-xs text-white/80 font-bold uppercase tracking-wider">
                    {t.calc.totalEstimate}
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-[#FDE047] mt-1 font-['Outfit']">
                    {isMyr ? `RM ${convertIdrToMyr(calculation.finalTotal).toFixed(2)}` : `Rp ${calculation.finalTotal.toLocaleString('id-ID')}`}
                  </div>
                  {isMyr && (
                    <div className="text-xs text-white/90 font-mono font-bold mt-1">
                      ≈ Rp {calculation.finalTotal.toLocaleString('id-ID')} (Kurs Live: 1 MYR ≈ Rp {Math.round(rate).toLocaleString('id-ID')})
                    </div>
                  )}
                  <p className="text-[11px] text-white/60 mt-0.5">
                    {isMyr ? '*Mendukung DuitNow QR / Wise / QRIS / Bank' : t.calc.paymentSupport}
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
                  <span>{isGeneratingImage ? t.joki.btnGenerating : t.joki.btnDownloadReceipt}</span>
                </button>

                {/* Salin Struk */}
                <button
                  type="button"
                  onClick={handleCopyInvoice}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer border border-white/20"
                >
                  {copySuccess ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copySuccess ? t.joki.btnCopiedReceipt : t.joki.btnCopyReceipt}</span>
                </button>

                {/* Order via WhatsApp */}
                <a
                  href={waOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#E58327] hover:bg-[#D4741B] text-white font-black text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95 border-2 border-white cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>{t.joki.btnOrderWaNow}</span>
                </a>

                {/* Tips */}
                <div className="p-2 bg-black/20 rounded-xl border border-white/10 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-[#FDE047] shrink-0 mt-0.5" />
                  <p className="text-[10px] text-white/80 leading-tight">
                    {t.joki.receiptWaTip}
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
