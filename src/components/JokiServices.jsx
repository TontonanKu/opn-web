import React, { useState, useMemo } from 'react';
import { 
  Gamepad2, ShieldCheck, Zap, Trophy, Flame, CheckCircle, ArrowRight, 
  Eye, Star, Plus, Minus, Download, Copy, Check, MessageCircle, 
  ShoppingBag, Sparkles, Clock, AlertCircle, Smartphone, Crown, ShieldAlert,
  PlayCircle, FileText, Palette, Languages, Award
} from 'lucide-react';
import { jokiGames, premiumApps, premiumAppsNotes, personalInfo } from '../data/portfolioData';
import { generateInvoiceImage } from '../utils/generateInvoiceImage';

export default function JokiServices() {
  // Can be 'mlbb', 'wuwa', 'hsr', 'roblox', or 'apps'
  const [activeTabId, setActiveTabId] = useState('mlbb');
  
  // Cart / Order state
  const [selectedItemType, setSelectedItemType] = useState('rank'); // 'rank', 'package', or 'app'
  const [selectedRankIndex, setSelectedRankIndex] = useState(0);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);
  const [selectedAppIndex, setSelectedAppIndex] = useState(0);
  const [quantity, setQuantity] = useState(5); // default 5 stars for MOBA

  // Add-ons state (Gaming only)
  const [isExpress, setIsExpress] = useState(false);
  const [isLiveStream, setIsLiveStream] = useState(false);
  const [isHeroRequest, setIsHeroRequest] = useState(false);

  // Download & Copy status
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Category filter for WuWa, Roblox & MLBB
  const [wuwaCategoryFilter, setWuwaCategoryFilter] = useState('all');
  const [robloxGameFilter, setRobloxGameFilter] = useState('anime-vanguard');
  const [mlbbFilter, setMlbbFilter] = useState('joki-akun');

  const isAppsTab = activeTabId === 'apps';
  const activeGame = isAppsTab 
    ? null 
    : (jokiGames.find((g) => g.id === activeTabId) || jokiGames[0]);

  // Tab switch
  const handleTabChange = (tabId) => {
    setActiveTabId(tabId);
    setWuwaCategoryFilter('all');
    setRobloxGameFilter('anime-vanguard');
    setMlbbFilter('joki-akun');
    if (tabId === 'apps') {
      setSelectedItemType('app');
      setSelectedAppIndex(0);
      setQuantity(1);
    } else {
      setSelectedItemType('rank');
      setSelectedRankIndex(0);
      setSelectedPackageIndex(null);
      setQuantity(tabId === 'mlbb' ? 5 : 1);
    }
  };

  // Select a tier from price list
  const handleSelectRank = (idx) => {
    setSelectedItemType('rank');
    setSelectedRankIndex(idx);
    setSelectedPackageIndex(null);
    if (activeGame && (activeGame.id === 'hsr' || activeGame.id === 'wuwa')) {
      setQuantity(1);
    }
  };

  // Select a package from packages list
  const handleSelectPackage = (idx) => {
    setSelectedItemType('package');
    setSelectedPackageIndex(idx);
    setQuantity(1);
  };

  // Select an app from premium apps list
  const handleSelectApp = (idx) => {
    setSelectedItemType('app');
    setSelectedAppIndex(idx);
    setQuantity(1);
  };

  // Calculations
  const orderDetails = useMemo(() => {
    let title = '';
    let categoryName = '';
    let unitPrice = 0;
    let baseTotal = 0;
    let timeEst = '1 - 2 Hari';
    const activeAddons = [];
    let addonSum = 0;

    if (isAppsTab || selectedItemType === 'app') {
      const currentApp = premiumApps[selectedAppIndex] || premiumApps[0];
      title = currentApp.fullName;
      categoryName = 'Aplikasi Premium';
      unitPrice = currentApp.price;
      baseTotal = unitPrice * quantity;
      timeEst = currentApp.duration || 'Proses Instan';

      activeAddons.push({ name: 'Private Account Resmi (Bukan Sharing)', price: 0 });
      activeAddons.push({ name: 'Panduan Aktivasi & Garansi Resmi', price: 0 });
    } else {
      categoryName = activeGame.name;

      if (selectedItemType === 'rank') {
        const currentRank = activeGame.ranks[selectedRankIndex] || activeGame.ranks[0];
        title = currentRank.name;
        unitPrice = currentRank.pricePerStar;
        baseTotal = unitPrice * quantity;
        timeEst = currentRank.estimatedTime || '1 - 2 Hari';
      } else {
        const currentPkg = activeGame.packages[selectedPackageIndex || 0] || activeGame.packages[0];
        title = currentPkg.name;
        const numPrice = parseInt(currentPkg.price.replace(/[^0-9]/g, ''), 10) || 0;
        unitPrice = numPrice;
        baseTotal = unitPrice * quantity;
        timeEst = currentPkg.speed || '1 - 2 Hari';
      }

      // Addons for gaming
      if (isExpress) {
        const expressCost = Math.round(baseTotal * 0.20);
        activeAddons.push({ name: 'Express Kilat (+20%)', price: expressCost });
        addonSum += expressCost;
      }

      if (isLiveStream) {
        const liveCost = 15000;
        activeAddons.push({ name: 'Private Live Stream Discord', price: liveCost });
        addonSum += liveCost;
      }

      if (isHeroRequest) {
        activeAddons.push({ name: 'Request Hero / Jam Main (Gratis)', price: 0 });
      }
    }

    const finalTotal = baseTotal + addonSum;

    return {
      title,
      categoryName,
      unitPrice,
      baseTotal,
      activeAddons,
      finalTotal,
      timeEst
    };
  }, [isAppsTab, selectedItemType, selectedAppIndex, activeGame, selectedRankIndex, selectedPackageIndex, quantity, isExpress, isLiveStream, isHeroRequest]);

  // Generate unique order ID
  const orderId = useMemo(() => {
    const prefix = isAppsTab ? 'APK' : (activeGame?.shortName || 'JOKI');
    return `INV-${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
  }, [isAppsTab, activeGame?.id, selectedRankIndex, selectedPackageIndex, selectedAppIndex]);

  // Handle Download Receipt Image
  const handleDownloadInvoice = async () => {
    try {
      setIsGeneratingImage(true);
      const { blob, url } = await generateInvoiceImage({
        gameName: orderDetails.categoryName,
        tierName: orderDetails.title,
        quantity,
        unitPrice: orderDetails.unitPrice,
        addons: orderDetails.activeAddons,
        totalPrice: orderDetails.finalTotal,
        estimatedTime: orderDetails.timeEst,
        orderNumber: orderId
      });

      const a = document.createElement('a');
      a.href = url;
      a.download = `Struk-${isAppsTab ? 'Apk-Premium' : (activeGame?.shortName || 'Joki')}-${orderId}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setToastMessage('✓ Gambar struk berhasil disimpan ke perangkatmu!');
      setTimeout(() => setToastMessage(''), 4000);
    } catch (err) {
      console.error(err);
      alert('Gagal membuat gambar struk. Silakan coba lagi.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Handle Copy to Clipboard (Image or Text)
  const handleCopyInvoice = async () => {
    try {
      const { blob } = await generateInvoiceImage({
        gameName: orderDetails.categoryName,
        tierName: orderDetails.title,
        quantity,
        unitPrice: orderDetails.unitPrice,
        addons: orderDetails.activeAddons,
        totalPrice: orderDetails.finalTotal,
        estimatedTime: orderDetails.timeEst,
        orderNumber: orderId
      });

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopySuccess(true);
        setToastMessage('✓ Gambar struk tersalin ke clipboard! Tekan Ctrl+V di WhatsApp untuk tempel.');
        setTimeout(() => {
          setCopySuccess(false);
          setToastMessage('');
        }, 4000);
        return;
      }
    } catch (e) {
      console.log('Clipboard image fallback');
    }

    const textToCopy = `Order ${orderDetails.categoryName}\n${orderDetails.title} (${quantity}x) = Rp ${orderDetails.finalTotal.toLocaleString('id-ID')}\nInvoice: ${orderId}`;
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(true);
    setToastMessage('✓ Rincian order berhasil disalin!');
    setTimeout(() => {
      setCopySuccess(false);
      setToastMessage('');
    }, 3000);
  };

  // Generate WhatsApp order message URL
  const waOrderUrl = useMemo(() => {
    const addonListStr = orderDetails.activeAddons.length > 0 
      ? orderDetails.activeAddons.map(a => a.name).join(', ') 
      : 'Standar';

    const itemLabel = isAppsTab 
      ? 'Aplikasi Premium' 
      : 'Joki Game';

    const msg = `Halo zura-w!
Saya mau order ${itemLabel}:
📦 Produk/Layanan: ${orderDetails.title}
⭐ Jumlah: ${quantity} ${isAppsTab ? 'Akun/Lisensi' : (activeGame?.id === 'mlbb' ? 'Bintang' : 'Paket')}
⏱ Durasi/Estimasi: ${orderDetails.timeEst}
⚡ Catatan/Opsi: ${addonListStr}
💰 Total Biaya: Rp ${orderDetails.finalTotal.toLocaleString('id-ID')}
📄 No. Invoice: ${orderId}

(Gambar struk order sudah saya simpan dan akan saya lampirkan di chat ini)
Apakah stok / slot pengerjaan masih tersedia?`;

    return `https://wa.me/${personalInfo.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }, [isAppsTab, activeGame, orderDetails, quantity, orderId]);

  return (
    <section id="joki-game" className="py-12 md:py-20 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E8] border border-[#9E1B28] text-[#9E1B28] font-black text-xs uppercase tracking-wider mb-3 shadow-2xs">
            <Trophy className="w-3.5 h-3.5 text-[#E58327]" />
            <span>Fast & Professional Service • Handplay & Official</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight font-['Outfit']">
            <span className="text-[#C02C3C]">JOKI GAME</span> <span className="text-[#FAF4E8]">&</span> <span className="text-[#E58327]">APK PREMIUM</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#FAF4E8]/90 font-medium">
            Layanan jasa joki game terpercaya (Mobile Legends, Wuthering Waves, Honkai: Star Rail, Roblox) 
            serta lisensi aplikasi premium private resmi dengan harga mahasiswa termurah.
          </p>
        </div>

        {/* 4 Key Guarantees Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          <div className="bg-[#FAF4E8] border-2 border-[#9E1B28] p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#2B1618]">100% Handplay</h4>
              <p className="text-[11px] text-[#6B5B5E]">Tanpa cheat / bot / script</p>
            </div>
          </div>

          <div className="bg-[#FAF4E8] border-2 border-[#9E1B28] p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#2B1618]">Proses Cepat</h4>
              <p className="text-[11px] text-[#6B5B5E]">Langsung diproses hari ini</p>
            </div>
          </div>

          <div className="bg-[#FAF4E8] border-2 border-[#9E1B28] p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
              <Eye className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#2B1618]">Live Stream Ready</h4>
              <p className="text-[11px] text-[#6B5B5E]">Bisa nonton via Discord</p>
            </div>
          </div>

          <div className="bg-[#FAF4E8] border-2 border-[#9E1B28] p-3 sm:p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#FDE047]" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#2B1618]">100% Private</h4>
              <p className="text-[11px] text-[#6B5B5E]">Bukan akun sharing / mod</p>
            </div>
          </div>
        </div>

        {/* Category Tabs: 4 Joki Games + 1 APK Premium */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {jokiGames.map((game) => (
            <button
              key={game.id}
              onClick={() => handleTabChange(game.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeTabId === game.id
                  ? 'bg-[#9E1B28] text-white border-2 border-white shadow-lg -translate-y-1'
                  : 'bg-[#FAF4E8] text-[#2B1618] border-2 border-[#9E1B28] hover:bg-[#F3ECE0]'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-[#E58327]" />
              <span>{game.name}</span>
            </button>
          ))}

          {/* New Tab: Aplikasi Premium */}
          <button
            onClick={() => handleTabChange('apps')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer relative overflow-hidden ${
              activeTabId === 'apps'
                ? 'bg-[#E58327] text-white border-2 border-white shadow-lg -translate-y-1'
                : 'bg-[#FAF4E8] text-[#9E1B28] border-2 border-[#E58327] hover:bg-[#F3ECE0]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#FDE047]" />
            <span>Aplikasi Premium</span>
            <span className="text-[10px] bg-[#9E1B28] text-white px-1.5 py-0.2 rounded font-black tracking-wide">
              HOT
            </span>
          </button>
        </div>

        {/* Content Container */}
        <div className="bg-[#FAF4E8] border-3 border-[#9E1B28] rounded-[32px] p-6 sm:p-10 shadow-2xl">
          
          {/* ======================================================== */}
          {/* VIEW A: JOKI GAMES CONTENT                               */}
          {/* ======================================================== */}
          {!isAppsTab && activeGame && (
            <>
              {/* Header of Active Game */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#9E1B28]/20">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#E58327] text-white mb-2">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>{activeGame.category}</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-[#9E1B28] tracking-tight font-['Outfit']">
                    {activeGame.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B5B5E] font-bold mt-1">
                    Spesialisasi: {activeGame.roles.join(' • ')}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeGame.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 bg-white/80 border border-[#9E1B28]/30 px-3 py-1 rounded-full text-xs font-bold text-[#2B1618]"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#9E1B28]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Grid & Packages */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                
                {/* Left: Tier / Service Price List */}
                <div className="lg:col-span-7">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <h4 className="text-lg sm:text-xl font-black text-[#9E1B28] uppercase tracking-wider font-['Outfit'] flex items-center gap-2">
                      <span>
                        {activeGame.id === 'wuwa' 
                          ? 'Daftar Layanan, Quest & Eksplorasi' 
                          : (activeGame.id === 'roblox' ? 'Daftar Unit & Joki Roblox' : 'Daftar Harga Per Tier / Bintang')}
                      </span>
                      <span className="text-[10px] bg-[#9E1B28] text-white px-2 py-0.5 rounded-full font-sans font-bold">
                        Pilih untuk Order
                      </span>
                    </h4>
                  </div>

                  {/* Category Buttons for Mobile Legends */}
                  {activeGame.id === 'mlbb' && (
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {[
                        { id: 'joki-akun', label: '🎮 Joki Akun' },
                        { id: 'joki-gendong', label: '👥 Joki Gendong' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setMlbbFilter(cat.id)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                            mlbbFilter === cat.id
                              ? 'bg-[#9E1B28] text-white shadow-xs -translate-y-0.5'
                              : 'bg-white text-[#2B1618] border border-[#9E1B28]/30 hover:border-[#9E1B28]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Category Filter Buttons for Wuthering Waves */}
                  {activeGame.id === 'wuwa' && (
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'astrites', label: '✦ Astrites' },
                        { id: 'exploration', label: '🗺 Exploration' },
                        { id: 'quest', label: '📜 Quest' },
                        { id: 'rawat-akun', label: '🛡 Rawat Akun' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setWuwaCategoryFilter(cat.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            wuwaCategoryFilter === cat.id
                              ? 'bg-[#9E1B28] text-white shadow-xs -translate-y-0.5'
                              : 'bg-white text-[#2B1618] border border-[#9E1B28]/30 hover:border-[#9E1B28]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Category Buttons for Roblox (No All button, just Anime Vanguard & Coming Soon) */}
                  {activeGame.id === 'roblox' && (
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {[
                        { id: 'anime-vanguard', label: '⚔️ Anime Vanguards' },
                        { id: 'coming-soon', label: '⏳ Coming Soon' }
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setRobloxGameFilter(cat.id)}
                          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                            robloxGameFilter === cat.id
                              ? 'bg-[#9E1B28] text-white shadow-xs -translate-y-0.5'
                              : 'bg-white text-[#2B1618] border border-[#9E1B28]/30 hover:border-[#9E1B28]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Filtered Grid of Ranks/Services */}
                  {(() => {
                    // If MLBB and joki gendong is selected
                    if (activeGame.id === 'mlbb' && mlbbFilter === 'joki-gendong') {
                      return (
                        <div className="text-center py-12 px-6 bg-white rounded-2xl border-2 border-dashed border-[#9E1B28]/40">
                          <Clock className="w-12 h-12 text-[#E58327] mx-auto mb-3 animate-pulse" />
                          <h5 className="font-black text-base text-[#9E1B28] font-['Outfit']">
                            Layanan Joki Gendong MLBB Segera Hadir!
                          </h5>
                          <p className="text-xs text-[#6B5B5E] mt-1.5 max-w-md mx-auto leading-relaxed">
                            Layanan Mabar Duo / Joki Gendong Mobile Legends sedang dipersiapkan (Coming Soon). Pantau terus atau hubungi zura-w via WhatsApp untuk info jadwal pembukaan slot!
                          </p>
                        </div>
                      );
                    }

                    // If Roblox and coming soon is selected
                    if (activeGame.id === 'roblox' && robloxGameFilter === 'coming-soon') {
                      return (
                        <div className="text-center py-12 px-6 bg-white rounded-2xl border-2 border-dashed border-[#9E1B28]/40">
                          <Clock className="w-12 h-12 text-[#E58327] mx-auto mb-3 animate-pulse" />
                          <h5 className="font-black text-base text-[#9E1B28] font-['Outfit']">
                            Game Roblox Lainnya Segera Hadir!
                          </h5>
                          <p className="text-xs text-[#6B5B5E] mt-1.5 max-w-md mx-auto leading-relaxed">
                            Game Roblox lainnya sedang dipersiapkan dan akan segera dirilis. Punya request game Roblox favorit? Hubungi zura-w langsung via WhatsApp!
                          </p>
                        </div>
                      );
                    }

                    const displayedRanks = activeGame.id === 'wuwa' && wuwaCategoryFilter !== 'all'
                      ? activeGame.ranks.filter(r => r.category === wuwaCategoryFilter)
                      : activeGame.ranks;

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {displayedRanks.map((r) => {
                          const originalIdx = activeGame.ranks.findIndex(orig => orig.name === r.name);
                          const isSelected = selectedItemType === 'rank' && selectedRankIndex === originalIdx;
                          return (
                            <button
                              key={originalIdx}
                              type="button"
                              onClick={() => handleSelectRank(originalIdx)}
                              className={`flex items-center justify-between p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#9E1B28] text-white border-[#7A111C] shadow-md -translate-y-0.5'
                                  : 'bg-white border-[#9E1B28]/30 hover:border-[#9E1B28] text-[#2B1618] shadow-2xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-center gap-1.5">
                                  {isSelected && <Check className="w-3.5 h-3.5 text-[#FDE047]" />}
                                  <h5 className={`font-extrabold text-xs sm:text-sm ${isSelected ? 'text-white' : 'text-[#2B1618]'}`}>
                                    {r.name}
                                  </h5>
                                </div>
                                <span className={`text-[10px] font-semibold ${isSelected ? 'text-white/80' : 'text-[#6B5B5E]'}`}>
                                  Estimasi: {r.estimatedTime}
                                </span>
                              </div>

                              <div className="text-right">
                                <span className={`text-xs sm:text-sm font-black ${isSelected ? 'text-[#FDE047]' : 'text-[#9E1B28]'}`}>
                                  Rp {r.pricePerStar.toLocaleString('id-ID')}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}

                  <div className="mt-4 p-3 bg-[#E58327]/10 border border-[#E58327]/40 rounded-xl text-xs text-[#2B1618] font-medium flex items-start gap-2">
                    <Star className="w-4 h-4 text-[#E58327] shrink-0 mt-0.5" />
                    <span>
                      Klik rank di atas atau paket di samping untuk mengatur jumlah bintang dan opsi tambahan di panel bawah.
                    </span>
                  </div>
                </div>

                {/* Right: Popular Best-Value Packages */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg sm:text-xl font-black text-[#9E1B28] uppercase tracking-wider mb-4 font-['Outfit'] flex items-center gap-2">
                      <span>Paket Favorit Terlaris</span>
                      <span className="text-[10px] bg-[#E58327] text-white px-2 py-0.5 rounded-full font-sans font-bold">
                        HEMAT
                      </span>
                    </h4>

                    <div className="space-y-3">
                      {activeGame.packages.map((pkg, idx) => {
                        const isSelected = selectedItemType === 'package' && selectedPackageIndex === idx;
                        return (
                          <div
                            key={idx}
                            className={`p-3.5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                              isSelected
                                ? 'bg-[#9E1B28] text-white border-[#7A111C] shadow-md'
                                : 'bg-white border-[#9E1B28]/40 hover:border-[#9E1B28] text-[#2B1618] shadow-2xs'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h5 className={`font-black text-sm ${isSelected ? 'text-white' : 'text-[#2B1618]'}`}>
                                {pkg.name}
                              </h5>
                              <span className={`text-sm font-black shrink-0 ${isSelected ? 'text-[#FDE047]' : 'text-[#9E1B28]'}`}>
                                {pkg.price}
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-xs font-medium mb-3">
                              <span className={`px-2 py-0.5 rounded font-bold ${isSelected ? 'bg-white/20 text-[#FDE047]' : 'bg-[#E58327]/15 text-[#9E1B28]'}`}>
                                Bonus: {pkg.bonus}
                              </span>
                              <span className={`font-bold ${isSelected ? 'text-white/80' : 'text-[#6B5B5E]'}`}>
                                ⏱ {pkg.speed}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleSelectPackage(idx)}
                              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-black text-xs transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#E58327] hover:bg-[#D4741B] text-white shadow-xs'
                                  : 'bg-[#9E1B28] hover:bg-[#80141F] text-white shadow-2xs'
                              }`}
                            >
                              <span>{isSelected ? '✓ Paket Terpilih' : 'Pilih Paket Ini'}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#9E1B28]/20 text-center">
                    <a
                      href="#kalkulator"
                      className="inline-flex items-center gap-1.5 text-xs font-black text-[#9E1B28] hover:underline"
                    >
                      <span>Simulasikan rank awal ke target rank? Buka Kalkulator Joki</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* ======================================================== */}
          {/* VIEW B: APLIKASI PREMIUM CONTENT                         */}
          {/* ======================================================== */}
          {isAppsTab && (
            <div>
              {/* Header Apps */}
              <div className="pb-6 border-b-2 border-[#9E1B28]/20">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#E58327] text-white mb-2">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  <span>Produk Digital Bergaransi</span>
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#9E1B28] tracking-tight font-['Outfit']">
                  Aplikasi Premium (Private Account)
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5B5E] font-bold mt-1">
                  Semua akun 100% original & private, tanpa sharing, dan tanpa mod/crack apk berbahaya.
                </p>

                {/* 3 Golden Rules Alert Box */}
                <div className="mt-4 p-4 rounded-2xl bg-linear-to-r from-[#9E1B28] to-[#7A111C] text-white border-2 border-[#7A111C] shadow-md">
                  <div className="flex items-center gap-2 mb-2 font-black text-sm text-[#FDE047] font-['Outfit']">
                    <ShieldAlert className="w-4 h-4" />
                    <span>SYARAT & KETENTUAN PENTING SEBELUM ORDER:</span>
                  </div>
                  <ul className="space-y-1.5 text-xs font-semibold text-[#FAF4E8]">
                    {premiumAppsNotes.map((note, nIdx) => (
                      <li key={nIdx} className="flex items-start gap-2">
                        <span className="text-[#FDE047] font-black">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 5 Premium Apps Products Grid */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {premiumApps.map((app, idx) => {
                  const isSelected = selectedItemType === 'app' && selectedAppIndex === idx;
                  return (
                    <div
                      key={app.id}
                      className={`p-5 rounded-2xl border-3 transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#9E1B28] text-white border-[#7A111C] shadow-xl -translate-y-1'
                          : 'bg-white border-[#9E1B28]/30 hover:border-[#9E1B28] text-[#2B1618] shadow-sm'
                      }`}
                    >
                      <div>
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            isSelected ? 'bg-white/20 text-[#FDE047]' : 'bg-[#E58327]/15 text-[#9E1B28]'
                          }`}>
                            {app.category}
                          </span>
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md text-white ${app.badgeColor}`}>
                            {app.methodBadge}
                          </span>
                        </div>

                        {/* Title & Price */}
                        <h4 className={`text-lg font-black tracking-tight mb-1 font-['Outfit'] ${isSelected ? 'text-white' : 'text-[#2B1618]'}`}>
                          {app.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mb-3">
                          <span className={`text-2xl font-black font-['Outfit'] ${isSelected ? 'text-[#FDE047]' : 'text-[#9E1B28]'}`}>
                            {app.priceFormatted}
                          </span>
                          <span className={`text-xs font-bold ${isSelected ? 'text-white/80' : 'text-[#6B5B5E]'}`}>
                            / {app.duration}
                          </span>
                        </div>

                        <p className={`text-xs leading-relaxed mb-4 ${isSelected ? 'text-white/90' : 'text-[#5A464A]'}`}>
                          {app.description}
                        </p>

                        {/* Specific Note from Screenshot */}
                        <div className={`p-2.5 rounded-xl border text-[11px] mb-4 font-mono font-medium ${
                          isSelected 
                            ? 'bg-black/30 border-white/20 text-[#FDE047]' 
                            : 'bg-[#FAF4E8] border-[#9E1B28]/20 text-[#9E1B28]'
                        }`}>
                          <span className="font-bold block mb-0.5">📌 Note Seller:</span>
                          {app.note}
                        </div>

                        {/* Key Features */}
                        <div className="space-y-1.5 mb-5">
                          {app.features.map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-1.5 text-xs font-bold">
                              <Check className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[#FDE047]' : 'text-green-600'}`} />
                              <span className={isSelected ? 'text-white' : 'text-[#2B1618]'}>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Select Button */}
                      <button
                        type="button"
                        onClick={() => handleSelectApp(idx)}
                        className={`w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${
                          isSelected
                            ? 'bg-[#E58327] hover:bg-[#D4741B] text-white shadow-md'
                            : 'bg-[#9E1B28] hover:bg-[#80141F] text-white'
                        }`}
                      >
                        <span>{isSelected ? '✓ Produk Terpilih' : 'Pilih Produk Ini'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* INTERACTIVE CART & ORDER BUILDER (FOR BOTH GAMES & APPS) */}
          {/* ======================================================== */}
          <div className="mt-10 pt-8 border-t-3 border-[#9E1B28]">
            <div className="bg-white border-2 border-[#9E1B28] rounded-2xl p-5 sm:p-8 shadow-md">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#9E1B28]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#9E1B28] text-white flex items-center justify-center font-black">
                    <ShoppingBag className="w-5 h-5 text-[#FDE047]" />
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-[#9E1B28] tracking-tight font-['Outfit']">
                      Keranjang & Rincian Order
                    </h4>
                    <p className="text-xs text-[#6B5B5E] font-medium">
                      {isAppsTab ? 'Pilih jumlah lisensi dan langsung order via WhatsApp' : 'Atur kuantitas bintang dan opsi tambahan sesuai kebutuhanmu'}
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E8] border border-[#9E1B28]/40 text-xs font-bold text-[#9E1B28]">
                  <span>Item Terpilih:</span>
                  <span className="font-extrabold text-[#E58327]">{orderDetails.title}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                
                {/* Left Controls */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Quantity Stepper */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-black uppercase tracking-wider text-[#9E1B28] font-['Outfit']">
                        {isAppsTab ? 'Jumlah Lisensi / Akun:' : 'Jumlah Bintang / Order Quantity:'}
                      </label>
                      <span className="text-xs font-black text-[#E58327]">
                        @ Rp {orderDetails.unitPrice.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                        className="w-12 h-12 rounded-xl bg-[#FAF4E8] hover:bg-[#F3ECE0] border-2 border-[#9E1B28] flex items-center justify-center text-[#9E1B28] font-black text-xl shadow-xs active:translate-y-0.5 cursor-pointer"
                        aria-label="Kurangi"
                      >
                        <Minus className="w-5 h-5" />
                      </button>

                      <div className="flex-1 bg-[#FAF4E8] border-2 border-[#9E1B28] rounded-xl h-12 flex items-center justify-center font-black text-lg text-[#2B1618]">
                        <span>{quantity}</span>
                        <span className="text-xs font-bold text-[#6B5B5E] ml-1.5">
                          {isAppsTab ? 'Akun / User' : (activeGame?.id === 'mlbb' ? 'Bintang' : 'Paket')}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setQuantity((prev) => prev + 1)}
                        className="w-12 h-12 rounded-xl bg-[#9E1B28] hover:bg-[#80141F] border-2 border-[#7A111C] flex items-center justify-center text-white font-black text-xl shadow-xs active:translate-y-0.5 cursor-pointer"
                        aria-label="Tambah"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quick quantity shortcuts for MLBB */}
                    {!isAppsTab && activeGame?.id === 'mlbb' && (
                      <div className="flex items-center gap-2 mt-2.5">
                        <span className="text-[11px] text-[#6B5B5E] font-bold">Preset Cepat:</span>
                        {[1, 3, 5, 10, 25].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setQuantity(star)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                              quantity === star
                                ? 'bg-[#E58327] text-white shadow-xs'
                                : 'bg-[#FAF4E8] text-[#2B1618] border border-[#9E1B28]/30 hover:border-[#9E1B28]'
                            }`}
                          >
                            {star}★
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Addon Checkboxes for Gaming */}
                  {!isAppsTab && (
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#9E1B28] mb-2.5 font-['Outfit']">
                        Opsi & Layanan Tambahan (Opsional):
                      </label>

                      <div className="space-y-2.5">
                        {/* Live Stream Discord */}
                        <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF4E8] border border-[#9E1B28]/30 cursor-pointer hover:border-[#9E1B28] transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isLiveStream}
                              onChange={(e) => setIsLiveStream(e.target.checked)}
                              className="w-4 h-4 rounded text-[#9E1B28] accent-[#9E1B28] cursor-pointer"
                            />
                            <div>
                              <span className="text-xs sm:text-sm font-extrabold text-[#2B1618] block">
                                Private Live Stream via Discord
                              </span>
                              <span className="text-[11px] text-[#6B5B5E] block">
                                Pantau proses joki secara live real-time
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-black text-[#E58327] shrink-0">+Rp 15.000</span>
                        </label>

                        {/* Express Kilat */}
                        <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF4E8] border border-[#9E1B28]/30 cursor-pointer hover:border-[#9E1B28] transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isExpress}
                              onChange={(e) => setIsExpress(e.target.checked)}
                              className="w-4 h-4 rounded text-[#9E1B28] accent-[#9E1B28] cursor-pointer"
                            />
                            <div>
                              <span className="text-xs sm:text-sm font-extrabold text-[#2B1618] block">
                                Express Kilat (Prioritas Antrian Utama)
                              </span>
                              <span className="text-[11px] text-[#6B5B5E] block">
                                Langsung dikerjakan slot pertama hari ini
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-black text-[#E58327] shrink-0">+20%</span>
                        </label>

                        {/* Request Hero Favorit */}
                        <label className="flex items-center justify-between p-3 rounded-xl bg-[#FAF4E8] border border-[#9E1B28]/30 cursor-pointer hover:border-[#9E1B28] transition-colors">
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isHeroRequest}
                              onChange={(e) => setIsHeroRequest(e.target.checked)}
                              className="w-4 h-4 rounded text-[#9E1B28] accent-[#9E1B28] cursor-pointer"
                            />
                            <div>
                              <span className="text-xs sm:text-sm font-extrabold text-[#2B1618] block">
                                Request Hero / Jam Main Khusus
                              </span>
                              <span className="text-[11px] text-[#6B5B5E] block">
                                Bebas tentukan hero dan waktu akun dimainkan
                              </span>
                            </div>
                          </div>
                          <span className="text-xs font-black text-green-600 shrink-0">GRATIS</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Info for Apps */}
                  {isAppsTab && (
                    <div className="bg-[#FAF4E8] p-4 rounded-xl border border-[#9E1B28]/30 space-y-2">
                      <span className="text-xs font-black text-[#9E1B28] uppercase tracking-wider block">
                        Keuntungan Order Aplikasi Premium di Kazura Store:
                      </span>
                      <ul className="text-xs text-[#5A464A] space-y-1 font-medium">
                        <li>✓ <strong>Bukan Sharing Account</strong>: Akses privat resmi untuk Anda sendiri.</li>
                        <li>✓ <strong>Bukan Crack / Mod APK</strong>: Memakai aplikasi original Play Store / App Store resmi.</li>
                        <li>✓ <strong>Aktivasi Super Mudah</strong>: Cukup via invite email atau code redeem resmi.</li>
                      </ul>
                    </div>
                  )}

                </div>

                {/* Right: Live Ringkasan Order & Action Buttons */}
                <div className="lg:col-span-5 flex flex-col justify-between bg-linear-to-b from-[#9E1B28] to-[#7A111C] p-6 rounded-2xl text-white shadow-lg border border-[#7A111C]">
                  <div>
                    <div className="flex items-center justify-between border-b border-white/20 pb-3 mb-4">
                      <span className="text-xs font-black uppercase tracking-wider text-[#FDE047] font-['Outfit']">
                        Struk / Ringkasan Order
                      </span>
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-mono font-bold">
                        {orderId}
                      </span>
                    </div>

                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="flex justify-between">
                        <span className="text-white/70">Kategori:</span>
                        <span className="font-extrabold">{orderDetails.categoryName}</span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white/70">Item Terpilih:</span>
                        <span className="font-extrabold text-[#FDE047] text-right max-w-[200px]">
                          {orderDetails.title}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white/70">Jumlah:</span>
                        <span className="font-extrabold">
                          {quantity}x (@ Rp {orderDetails.unitPrice.toLocaleString('id-ID')})
                        </span>
                      </div>

                      <div className="flex justify-between border-t border-white/10 pt-2">
                        <span className="text-white/70">Subtotal Item:</span>
                        <span className="font-bold">
                          Rp {orderDetails.baseTotal.toLocaleString('id-ID')}
                        </span>
                      </div>

                      {/* Line items of add-ons */}
                      {orderDetails.activeAddons.length > 0 && (
                        <div className="bg-black/20 p-2.5 rounded-xl space-y-1.5 border border-white/10">
                          <span className="text-[11px] font-bold text-[#FDE047] block">
                            Rincian Tambahan / Jaminan:
                          </span>
                          {orderDetails.activeAddons.map((addon, idx) => (
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
                        <span className="text-white/70">Durasi / Estimasi:</span>
                        <span className="font-extrabold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#FDE047]" />
                          {orderDetails.timeEst}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white/70">Keamanan:</span>
                        <span className="font-extrabold text-green-300 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          {isAppsTab ? '100% Private & Legal' : '100% Handplay Garansi'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/20">
                      <span className="text-xs text-white/80 font-bold uppercase tracking-wider">
                        Total Estimasi Biaya
                      </span>
                      <div className="text-3xl sm:text-4xl font-black text-[#FDE047] mt-1 font-['Outfit']">
                        Rp {orderDetails.finalTotal.toLocaleString('id-ID')}
                      </div>
                      <p className="text-[11px] text-white/60 mt-0.5">
                        *Mendukung QRIS Kazura Store & Semua Bank / E-Wallet
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

                    {/* Button 1: Simpan Gambar Struk / Invoice */}
                    <button
                      type="button"
                      onClick={handleDownloadInvoice}
                      disabled={isGeneratingImage}
                      className="w-full flex items-center justify-center gap-2 bg-[#FAF4E8] hover:bg-[#F3ECE0] text-[#9E1B28] font-black text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md transition-all active:translate-y-0.5 cursor-pointer border border-[#7A111C]"
                    >
                      <Download className="w-4 h-4 text-[#9E1B28]" />
                      <span>{isGeneratingImage ? 'Membuat Gambar...' : 'Simpan Gambar Struk (PNG)'}</span>
                    </button>

                    {/* Button 2: Salin Gambar ke Clipboard */}
                    <button
                      type="button"
                      onClick={handleCopyInvoice}
                      className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all cursor-pointer border border-white/20"
                    >
                      {copySuccess ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copySuccess ? 'Tersalin ke Clipboard!' : 'Salin Gambar Struk (Ctrl+V)'}</span>
                    </button>

                    {/* Button 3: Order via WhatsApp */}
                    <a
                      href={waOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-[#E58327] hover:bg-[#D4741B] text-white font-black text-sm py-3.5 px-4 rounded-xl shadow-lg transition-transform active:scale-95 border-2 border-white cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 text-white" />
                      <span>Order via WhatsApp Sekarang</span>
                    </a>

                    <div className="p-2.5 bg-black/25 rounded-xl border border-white/10 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-[#FDE047] shrink-0 mt-0.5" />
                      <p className="text-[11px] text-white/80 leading-relaxed">
                        <strong>Tips:</strong> WhatsApp tidak menerima file gambar otomatis lewat web link. Klik <strong>"Simpan Gambar"</strong> lalu lampirkan gambar struk ini di chat WhatsApp!
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
