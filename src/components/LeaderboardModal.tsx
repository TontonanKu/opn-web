import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trophy, 
  Crown, 
  Medal, 
  Sparkles, 
  ShoppingBag, 
  ExternalLink,
  Flame,
  Award,
  ArrowRight
} from 'lucide-react';
import { calculateCustomerStats, getFullLeaderboard } from '../utils/loyaltyUtils';

export const LeaderboardModal: React.FC = () => {
  const { activeModal, setActiveModal, user, myOrders, orders, openCheckout } = useApp();

  useEffect(() => {
    if (activeModal !== 'leaderboard') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'leaderboard') return null;

  // Real data computed from all store orders
  const stats = calculateCustomerStats(user, myOrders, orders);
  const leaderboard = getFullLeaderboard(user, orders);

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3, 10);

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveModal(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="brutal-card bg-[#FAF8F5] max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden relative shadow-[6px_6px_0px_#000]">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#FFC700] z-30 px-5 py-3.5 border-b-[2.5px] border-black flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-black" />
            <span className="font-display font-black text-base uppercase text-black">
              LEADERBOARD TOP SPENDER
            </span>
            <span className="bg-[#121212] text-[#FFC700] text-[10px] font-mono font-black px-2 py-0.5 uppercase hidden sm:inline">
              REAL DATA
            </span>
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

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-6 space-y-5">
          
          {/* Banner Description */}
          <div className="bg-[#121212] text-white p-4 border-2 border-black shadow-[3px_3px_0px_#000]">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-[#FF5900] animate-bounce" />
              <span className="font-mono text-xs font-black text-[#FFC700] uppercase">
                PAPAN PERINGKAT PELANGGAN SULTAN
              </span>
            </div>
            <p className="text-xs font-mono text-neutral-300 leading-relaxed">
              Penghargaan tertinggi bagi pelanggan paling setia Zura Store. Setiap transaksi belanja dan tip booster mengumpulkan poin loyalitas untuk menaikkan peringkat Anda!
            </p>
          </div>

          {/* Empty State if No One Has Placed An Order */}
          {leaderboard.length === 0 || (leaderboard.length === 1 && leaderboard[0].totalSpend === 0) ? (
            <div className="bg-white border-2 border-black p-8 text-center space-y-3 shadow-[3px_3px_0px_#000]">
              <div className="w-14 h-14 bg-[#FFF3B0] border-2 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_#000]">
                <Crown className="w-8 h-8 text-[#FF5900]" />
              </div>
              <h4 className="font-display font-black text-base uppercase text-black">
                Papan Peringkat Masih Bersih (Tanpa Data Dummy)
              </h4>
              <p className="font-mono text-xs text-neutral-600 max-w-md mx-auto">
                Semua data dihitung secara real-time dari pesanan asli. Jadilah orang pertama yang menyelesaikan transaksi di Zura Store untuk mengklaim tahta <strong>TOP #1 Sultan</strong>!
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  const el = document.getElementById('joki');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="brutal-btn-yellow text-xs py-2 px-5 inline-flex items-center gap-2 font-mono font-black uppercase mt-2 shadow-[2px_2px_0px_#000]"
              >
                <span>Mulai Order & Raih Posisi #1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <>
              {/* Top 3 Podium Cards with Modern Lucide Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end pt-2">
                
                {/* Rank 2 (Silver) */}
                {top3[1] && (
                  <div className="order-2 sm:order-1 bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_#000] text-center relative">
                    <div className="w-8 h-8 bg-slate-200 text-slate-800 border-2 border-black flex items-center justify-center font-mono font-black text-xs mx-auto mb-1.5 shadow-[1.5px_1.5px_0px_#000]">
                      <Medal className="w-4 h-4 text-slate-800" />
                    </div>
                    <span className="inline-block bg-slate-200 text-slate-900 px-1.5 py-0.2 text-[9px] font-mono font-black mb-1 border border-black">
                      RANK #2
                    </span>
                    <div className="font-display font-black text-sm uppercase text-[#121212] truncate">
                      {top3[1].name}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 mb-1.5">
                      {top3[1].phoneMasked}
                    </div>
                    <div className="bg-slate-100 border border-slate-300 py-1 px-1.5 font-mono text-xs font-black text-slate-800">
                      Rp {top3[1].totalSpend.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[9px] font-mono text-neutral-600 mt-1 flex items-center justify-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-yellow-500" />
                      <span>{top3[1].points.toLocaleString('id-ID')} Pts</span>
                    </div>
                  </div>
                )}

                {/* Rank 1 (Gold / Crown) */}
                {top3[0] && (
                  <div className="order-1 sm:order-2 bg-[#FFC700] border-[2.5px] border-black p-4 shadow-[4px_4px_0px_#000] text-center relative transform sm:-translate-y-2">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#121212] text-[#FFC700] px-2 py-0.5 text-[9px] font-mono font-black border border-black flex items-center gap-1 shadow-sm">
                      <Crown className="w-3 h-3 text-[#FFC700]" />
                      <span>TOP #1 SULTAN</span>
                    </div>
                    <div className="w-9 h-9 bg-black text-[#FFC700] border-2 border-black flex items-center justify-center font-mono font-black text-sm mx-auto mb-1.5 mt-1 shadow-sm">
                      <Crown className="w-5 h-5 text-[#FFC700]" />
                    </div>
                    <div className="font-display font-black text-base uppercase text-[#121212] truncate">
                      {top3[0].name}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-800 mb-1.5 font-bold">
                      {top3[0].phoneMasked}
                    </div>
                    <div className="bg-black text-[#FFC700] border border-black py-1 px-2 font-mono text-xs font-black">
                      Rp {top3[0].totalSpend.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[10px] font-mono font-bold text-neutral-900 mt-1 flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3 text-black" />
                      <span>{top3[0].points.toLocaleString('id-ID')} Pts • {top3[0].tier}</span>
                    </div>
                  </div>
                )}

                {/* Rank 3 (Bronze) */}
                {top3[2] && (
                  <div className="order-3 bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_#000] text-center relative">
                    <div className="w-8 h-8 bg-amber-100 text-amber-900 border-2 border-black flex items-center justify-center font-mono font-black text-xs mx-auto mb-1.5 shadow-[1.5px_1.5px_0px_#000]">
                      <Award className="w-4 h-4 text-amber-900" />
                    </div>
                    <span className="inline-block bg-amber-100 text-amber-900 px-1.5 py-0.2 text-[9px] font-mono font-black mb-1 border border-black">
                      RANK #3
                    </span>
                    <div className="font-display font-black text-sm uppercase text-[#121212] truncate">
                      {top3[2].name}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500 mb-1.5">
                      {top3[2].phoneMasked}
                    </div>
                    <div className="bg-amber-50 border border-amber-300 py-1 px-1.5 font-mono text-xs font-black text-amber-900">
                      Rp {top3[2].totalSpend.toLocaleString('id-ID')}
                    </div>
                    <div className="text-[9px] font-mono text-neutral-600 mt-1 flex items-center justify-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-yellow-500" />
                      <span>{top3[2].points.toLocaleString('id-ID')} Pts</span>
                    </div>
                  </div>
                )}

              </div>

              {/* Ranks 4 to 10 Table */}
              {rest.length > 0 && (
                <div className="bg-white border-2 border-black shadow-[3px_3px_0px_#000] overflow-hidden">
                  <div className="p-3 bg-[#FAF8F5] border-b-2 border-black font-mono text-xs font-black uppercase flex justify-between items-center">
                    <span>Peringkat 4 - 10</span>
                    <span className="text-neutral-500 text-[10px]">Total {stats.totalMembers} Member Terdaftar</span>
                  </div>

                  <div className="divide-y divide-neutral-200 font-mono text-xs">
                    {rest.map((entry) => (
                      <div 
                        key={entry.rank}
                        className={`p-3 flex items-center justify-between gap-3 transition-colors ${
                          entry.isCurrentUser ? 'bg-[#FFF3B0] font-black' : 'hover:bg-neutral-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 text-center font-black text-neutral-500 text-xs">
                            #{entry.rank}
                          </span>
                          <div>
                            <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                              <span>{entry.name}</span>
                              {entry.isCurrentUser && (
                                <span className="bg-[#FF5900] text-white text-[9px] px-1.5 py-0.2 border border-black uppercase">
                                  AKUN ANDA
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-neutral-500">
                              {entry.phoneMasked} • {entry.tier}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-black text-neutral-900">
                            Rp {entry.totalSpend.toLocaleString('id-ID')}
                          </div>
                          <div className="text-[10px] text-[#FF5900] flex items-center justify-end gap-1">
                            <Sparkles className="w-2.5 h-2.5 text-yellow-500" />
                            <span>{entry.points.toLocaleString('id-ID')} Pts</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Pinned User Ranking Summary */}
          {user ? (
            <div className="bg-[#FFF3B0] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono text-neutral-600 block uppercase">POSISI ANDA SAAT INI</span>
                <span className="font-display font-black text-base text-[#121212] uppercase">
                  #{stats.rank} dari {stats.totalMembers} Member ({stats.tier})
                </span>
                <div className="text-xs font-mono text-neutral-700 mt-0.5">
                  Total Belanja: <strong>Rp {stats.totalSpend.toLocaleString('id-ID')}</strong> • Tips: <strong>Rp {stats.totalTips.toLocaleString('id-ID')}</strong> • {stats.points} Poin
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActiveModal('customer-profile');
                }}
                className="bg-[#121212] text-[#FFC700] hover:bg-neutral-800 border border-black px-3 py-1.5 text-xs font-mono font-black uppercase shadow-[1.5px_1.5px_0px_#000] shrink-0"
              >
                Buka Dashboard Saya &rarr;
              </button>
            </div>
          ) : (
            <div className="bg-[#FFF3B0] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div>
                <strong className="block text-black uppercase font-bold">Ingin Masuk ke Leaderboard Top Spender?</strong>
                <span className="text-neutral-700">Masuk atau pesan layanan sekarang untuk mulai mengumpulkan poin loyalitas!</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('login')}
                className="bg-[#121212] text-[#FFC700] hover:bg-neutral-800 border border-black px-3.5 py-2 font-mono font-black text-xs uppercase shadow-[2px_2px_0px_#000] shrink-0"
              >
                Masuk / Buat Akun
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
