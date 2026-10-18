import React, { useState } from 'react';
import { GAME_SERVICES } from '../data/initialData';
import { GameService, GameBoostTier } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Gamepad2, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Check,
  Gift,
  Star,
  ArrowLeft
} from 'lucide-react';

interface GameJokiSectionProps {
  onBackToHome?: () => void;
}

export const GameJokiSection: React.FC<GameJokiSectionProps> = ({ onBackToHome }) => {
  const { openCheckout } = useApp();
  const [selectedGameId, setSelectedGameId] = useState<string>(GAME_SERVICES[0].id);
  const [viewTab, setViewTab] = useState<'tiers' | 'packages'>('tiers');
  const [starCount, setStarCount] = useState<number>(5);
  
  const activeGame = GAME_SERVICES.find(g => g.id === selectedGameId) || GAME_SERVICES[0];
  const [selectedTier, setSelectedTier] = useState<GameBoostTier>(activeGame.tiers[0]);

  // Form fields state
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleGameChange = (game: GameService) => {
    setSelectedGameId(game.id);
    setSelectedTier(game.tiers[0]);
    setViewTab('tiers');
    setStarCount(5);
    setFormData({});
  };

  const isPerStar = activeGame.id === 'mlbb' && (selectedTier.unit === 'Bintang' || selectedTier.toRank === 'Per Bintang');
  const effectivePrice = isPerStar ? selectedTier.price * starCount : selectedTier.price;

  const handleInputChange = (name: string, val: string) => {
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSelectPackage = (pkg: { id: string; name: string; price: string; bonus: string; speed: string }) => {
    const numPrice = parseInt(pkg.price.replace(/[^0-9]/g, '')) || 0;
    setSelectedTier({
      id: pkg.id,
      fromRank: pkg.name,
      toRank: pkg.bonus,
      price: numPrice,
      estTime: pkg.speed,
      unit: 'Paket'
    });
  };

  const handleStartOrder = () => {
    // Package item object for checkout
    const orderItem = {
      gameId: activeGame.id,
      title: activeGame.title,
      icon: activeGame.icon,
      selectedTier: {
        ...selectedTier,
        price: effectivePrice,
        toRank: isPerStar ? `${starCount} Bintang (${selectedTier.fromRank})` : selectedTier.toRank
      },
      price: effectivePrice,
      formData: {
        ...formData,
        ...(isPerStar ? { totalBintang: `${starCount} Bintang` } : {})
      },
    };
    openCheckout(orderItem, 'joki_game');
  };

  return (
    <section id="joki" className="py-12 bg-[#FAF8F2] border-b-[3px] border-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumb Navigation */}
        {onBackToHome && (
          <div className="mb-6 flex items-center justify-between border-b-2 border-dashed border-neutral-300 pb-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-neutral-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-[#FF5900]" />
              <span>← Kembali ke Beranda</span>
            </button>
            <span className="font-mono text-[11px] text-neutral-400 font-bold hidden sm:inline">
              Beranda &gt; Katalog Joki Game
            </span>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#121212] text-[#FFC700] px-3 py-1 font-mono text-xs font-bold uppercase mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>DAFTAR JOKI GAME RESMI zura-w</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-[#121212]">
              JASA JOKI RANK & RAWAT AKUN
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 font-medium max-w-xl mt-1">
              100% Murni Handplay tanpa script / cheat auto-ban. Winrate tinggi 80%-95%, garansi aman & privasi terjaga.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-checker border-2 border-black"></div>
            <span className="font-mono text-xs font-bold uppercase text-neutral-500">
              100% PURE HANDPLAY
            </span>
          </div>
        </div>

        {/* Game Selector Tabs (3 Games: MLBB, WuWa, Roblox) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {GAME_SERVICES.map((game) => {
            const isSelected = game.id === selectedGameId;
            return (
              <button
                key={game.id}
                onClick={() => handleGameChange(game)}
                className={`p-4 border-[3px] border-[#121212] text-left transition-all ${
                  isSelected
                    ? 'bg-[#FFC700] shadow-brutal translate-x-[-2px] translate-y-[-2px]'
                    : 'bg-white hover:bg-neutral-50 shadow-brutal-sm'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  {game.icon.startsWith('http') ? (
                    <img 
                      src={game.icon} 
                      alt={game.title} 
                      className="w-12 h-12 rounded-lg object-cover border-2 border-black shadow-[2px_2px_0px_#000]" 
                    />
                  ) : (
                    <span className="text-3xl">{game.icon}</span>
                  )}
                  {game.badge && (
                    <span className="bg-[#121212] text-white text-[10px] font-mono font-bold px-2 py-0.5">
                      {game.badge}
                    </span>
                  )}
                </div>
                <h4 className="font-display font-extrabold text-base leading-tight uppercase">
                  {game.title}
                </h4>
                <span className="text-[11px] font-mono text-neutral-600 font-semibold mt-1 block">
                  {game.category}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Game Details & Pricing Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Tier Packages Selection */}
          <div className="lg:col-span-7 brutal-card p-6 bg-white">
            <div className="flex items-center justify-between border-b-2 border-neutral-200 pb-3 mb-4">
              <div className="flex items-center gap-3">
                {activeGame.icon.startsWith('http') ? (
                  <img 
                    src={activeGame.icon} 
                    alt={activeGame.title} 
                    className="w-11 h-11 rounded-lg object-cover border-2 border-black shadow-[2px_2px_0px_#000]" 
                  />
                ) : (
                  <span className="text-2xl">{activeGame.icon}</span>
                )}
                <div>
                  <h3 className="font-display font-black text-xl leading-none">
                    {activeGame.title}
                  </h3>
                  <p className="text-xs text-neutral-500 font-medium mt-1">
                    {activeGame.tagline}
                  </p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-500 text-[11px] font-mono font-bold px-2 py-0.5">
                SLOT READY
              </span>
            </div>

            {/* Game Features & Role Badges */}
            {activeGame.features && (
              <div className="mb-4 bg-[#FAF8F2] border-2 border-black p-3 text-xs">
                <span className="font-mono font-black uppercase text-[#121212] block mb-1">
                  Keunggulan Layanan:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-medium text-neutral-700">
                  {activeGame.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sub-tab: Satuan vs Paket Bundle */}
            {activeGame.packages && activeGame.packages.length > 0 && (
              <div className="flex gap-2 mb-4 border-b-2 border-neutral-200 pb-2">
                <button
                  onClick={() => setViewTab('tiers')}
                  className={`text-xs font-mono font-bold px-3 py-1.5 border-2 border-black transition-all ${
                    viewTab === 'tiers' ? 'bg-[#FFC700] shadow-[2px_2px_0px_#000]' : 'bg-white hover:bg-neutral-100'
                  }`}
                >
                  Layanan Satuan / Rank
                </button>
                <button
                  onClick={() => setViewTab('packages')}
                  className={`text-xs font-mono font-bold px-3 py-1.5 border-2 border-black transition-all flex items-center gap-1 ${
                    viewTab === 'packages' ? 'bg-[#FF5900] text-white shadow-[2px_2px_0px_#000]' : 'bg-white hover:bg-neutral-100'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Paket Hemat / Bundle ({activeGame.packages.length})
                </button>
              </div>
            )}

            {/* Mode 1: Tiers Satuan */}
            {viewTab === 'tiers' && (
              <>
                <h4 className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                  1. PILIH RANK / LAYANAN:
                </h4>

                {/* List of Tiers */}
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {activeGame.tiers.map((tier) => {
                    const isTierSelected = selectedTier.id === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-3.5 border-2 border-[#121212] cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isTierSelected
                            ? 'bg-[#FFC700] shadow-[3px_3px_0px_#121212]'
                            : 'bg-[#FAF8F2] hover:bg-neutral-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`w-5 h-5 border-2 border-black flex items-center justify-center ${
                            isTierSelected ? 'bg-black text-[#FFC700]' : 'bg-white'
                          }`}>
                            {isTierSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <div>
                            <div className="font-extrabold text-sm uppercase flex items-center gap-1.5 flex-wrap">
                              <span>{tier.fromRank}</span>
                              {tier.toRank && tier.toRank !== 'Per Bintang' && (
                                <span className="text-[#FF5900] inline-flex items-center gap-1">
                                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                                  <span>{tier.toRank}</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-600 mt-0.5">
                              <Clock className="w-3 h-3 text-neutral-700" />
                              <span>Estimasi: {tier.estTime}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-display font-black text-base text-[#121212] flex items-center justify-end gap-1">
                            <span>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(tier.price)}</span>
                            {tier.unit === 'Bintang' && (
                              <span className="text-xs font-mono font-normal inline-flex items-center text-neutral-700">
                                /<Star className="w-3 h-3 fill-amber-500 text-amber-500 inline ml-0.5" />
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-neutral-500">
                            {tier.unit === 'Bintang' ? 'Per Bintang' : 'Tarif Pasti'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* MLBB Star Count selector if per-star */}
                {isPerStar && (
                  <div className="mt-4 p-3.5 border-2 border-black bg-[#FFF3B0] flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-black uppercase text-[#121212] block">
                        Jumlah Bintang / Win:
                      </span>
                      <span className="text-[11px] text-neutral-600">
                        {starCount} Bintang x Rp {selectedTier.price.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setStarCount(Math.max(1, starCount - 1))}
                        className="w-8 h-8 bg-white border-2 border-black font-black text-sm hover:bg-neutral-100"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-display font-black text-lg">
                        {starCount}
                      </span>
                      <button
                        onClick={() => setStarCount(starCount + 1)}
                        className="w-8 h-8 bg-white border-2 border-black font-black text-sm hover:bg-neutral-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Mode 2: Paket Hemat / Bundle */}
            {viewTab === 'packages' && activeGame.packages && (
              <>
                <h4 className="font-mono text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                  1. PILIH PAKET BUNDLE:
                </h4>
                <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                  {activeGame.packages.map((pkg) => {
                    const isSelectedPkg = selectedTier.id === pkg.id;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => handleSelectPackage(pkg)}
                        className={`p-3.5 border-2 border-[#121212] cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                          isSelectedPkg
                            ? 'bg-[#FF5900] text-white shadow-[3px_3px_0px_#121212]'
                            : 'bg-[#FAF8F2] hover:bg-neutral-100'
                        }`}
                      >
                        <div>
                          <div className="font-extrabold text-sm uppercase">
                            {pkg.name}
                          </div>
                          <div className={`text-xs font-mono font-bold mt-0.5 flex items-center gap-1 ${isSelectedPkg ? 'text-amber-200' : 'text-emerald-700'}`}>
                            <Gift className="w-3.5 h-3.5 shrink-0" />
                            <span>{pkg.bonus}</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-mono opacity-80 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>Pengerjaan: {pkg.speed}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-display font-black text-lg">
                            {pkg.price}
                          </div>
                          <span className={`text-[10px] font-mono ${isSelectedPkg ? 'text-white' : 'text-neutral-500'}`}>
                            Paket Khusus
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </div>

          {/* Right: Quick Order Form & Summary */}
          <div className="lg:col-span-5 brutal-card p-6 bg-[#FFC700]">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-[#121212] text-white text-xs font-mono font-bold px-2 py-0.5 uppercase">
                FORM DATA AKUN
              </span>
              <span className="font-mono text-xs font-bold text-neutral-800">
                Langkah 2 dari 2
              </span>
            </div>

            <h3 className="font-display font-black text-xl uppercase mb-3 text-[#121212]">
              Lengkapi Data Joki
            </h3>

            {/* Input fields */}
            <div className="space-y-3 mb-5">
              {activeGame.formFields.map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-mono font-bold uppercase text-[#121212] mb-1">
                    {field.label}
                  </label>
                  {field.type === 'select' ? (
                    <select
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full bg-white border-2 border-black p-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">-- Pilih {field.label} --</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleInputChange(field.name, e.target.value)}
                      className="w-full bg-white border-2 border-black p-2 text-xs font-semibold placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Price Breakdown Box */}
            <div className="bg-white border-2 border-[#121212] p-3 mb-4 shadow-[2px_2px_0px_#000]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-mono text-neutral-600">Paket Dipilih:</span>
                <span className="font-bold text-right inline-flex items-center gap-1 justify-end">
                  {isPerStar ? (
                    <>
                      <span>{starCount}</span>
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500 inline" />
                      <span>{selectedTier.fromRank}</span>
                    </>
                  ) : (
                    <>
                      <span>{selectedTier.fromRank}</span>
                      {selectedTier.toRank && (
                        <>
                          <ArrowRight className="w-3 h-3 inline stroke-[2.5]" />
                          <span>{selectedTier.toRank}</span>
                        </>
                      )}
                    </>
                  )}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-mono text-neutral-600">Estimasi Selesai:</span>
                <span className="font-bold">{selectedTier.estTime}</span>
              </div>
              <div className="border-t border-dashed border-neutral-300 my-2"></div>
              <div className="flex justify-between items-center">
                <span className="font-mono font-bold text-xs uppercase">Total Pembayaran:</span>
                <span className="font-display font-black text-xl text-[#FF5900]">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(effectivePrice)}
                </span>
              </div>
            </div>

            {/* Checkout Trigger */}
            <button
              onClick={handleStartOrder}
              className="w-full brutal-btn-dark py-3.5 px-4 flex items-center justify-center gap-2 group text-sm"
            >
              <span>LANJUT KE CHECKOUT (KODE ORDER)</span>
              <ArrowRight className="w-4 h-4 text-[#FFC700] group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-mono text-neutral-800">
              <ShieldCheck className="w-3.5 h-3.5 text-black" />
              <span>Tanpa payment gateway. Bayar via Web atau WhatsApp.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
