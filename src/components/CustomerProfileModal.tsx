import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { 
  X, 
  User, 
  Package, 
  Clock, 
  CheckCircle2, 
  Receipt, 
  ExternalLink, 
  Smartphone, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  Save, 
  ArrowRight,
  Sparkles,
  ShoppingBag,
  AlertCircle,
  HelpCircle,
  Crown,
  Trophy,
  Award,
  Heart,
  Flame,
  Star
} from 'lucide-react';
import { ADMIN_CONFIG } from '../data/initialData';
import { sanitizeInput } from '../utils/securityUtils';
import { calculateCustomerStats, getFullLeaderboard, MEMBER_TIERS, TOTAL_COMMUNITY_MEMBERS } from '../utils/loyaltyUtils';

export const CustomerProfileModal: React.FC = () => {
  const { 
    activeModal, 
    setActiveModal, 
    user, 
    myOrders, 
    logout, 
    updateUserName, 
    openOrderTracking, 
    openReceiptModal,
    setViewMode 
  } = useApp();

  // Active view tab inside dashboard: 'orders' | 'rank' | 'rewards' | 'settings'
  const [activeTab, setActiveTab] = useState<'orders' | 'rank' | 'rewards' | 'settings'>('orders');
  const [newUsername, setNewUsername] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync newUsername with current user name
  useEffect(() => {
    if (user) {
      setNewUsername(user.name);
    }
  }, [user]);

  // Handle escape key
  useEffect(() => {
    if (activeModal !== 'customer-profile') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModal(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal, setActiveModal]);

  if (activeModal !== 'customer-profile' || !user) return null;

  // Filter orders for this customer (isolated via myOrders)
  const userOrders = [...myOrders].sort((a, b) => b.createdAt - a.createdAt);

  // Customer Loyalty & Dashboard Stats
  const stats = calculateCustomerStats(user, userOrders);
  const leaderboard = getFullLeaderboard(user, stats);

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaveSuccess(false);

    const clean = sanitizeInput(newUsername.trim());
    if (!clean || clean.length < 2) {
      setErrorMessage('Username minimal harus 2 karakter.');
      return;
    }

    const ok = updateUserName(clean);
    if (ok) {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } else {
      setErrorMessage('Username tersebut tidak dapat digunakan (dilindungi sistem atau tidak valid).');
    }
  };

  const formatDate = (timestamp: number) => {
    try {
      const d = new Date(timestamp);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) + ' WIB';
    } catch {
      return '-';
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending_admin':
        return (
          <span className="inline-flex items-center gap-1 bg-[#FFC700] text-black border border-black px-1.5 py-0.2 text-[10px] font-mono font-bold animate-pulse">
            <Clock className="w-3 h-3" />
            <span>MENUNGGU ADMIN</span>
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-400 text-black border border-black px-1.5 py-0.2 text-[10px] font-mono font-bold">
            <Sparkles className="w-3 h-3" />
            <span>SEDANG DIKERJAKAN</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-400 text-black border border-black px-1.5 py-0.2 text-[10px] font-mono font-bold">
            <CheckCircle2 className="w-3 h-3" />
            <span>SELESAI</span>
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 bg-red-400 text-black border border-black px-1.5 py-0.2 text-[10px] font-mono font-bold">
            <X className="w-3 h-3" />
            <span>DIBATALKAN</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) setActiveModal(null);
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
    >
      <div className="brutal-card bg-[#FAF8F5] max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden relative shadow-[6px_6px_0px_#000]">
        
        {/* Sticky Header with Close */}
        <div className="sticky top-0 bg-[#FFC700] z-30 px-5 py-3 border-b-[2.5px] border-black flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-sm uppercase text-black tracking-wide">
              PORTAL PELANGGAN RESMI
            </span>
            <span className="bg-[#121212] text-[#FFC700] text-[10px] font-mono font-black px-2 py-0.2 uppercase">
              {stats.tier}
            </span>
          </div>

          <button 
            type="button"
            onClick={() => setActiveModal(null)}
            className="p-1 border-2 border-black bg-white hover:bg-neutral-100 transition-colors shadow-[2px_2px_0px_#000]"
            title="Tutup (Esc)"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          
          {/* Admin Quick Jump Banner (if role is admin) */}
          {user.role === 'admin' && (
            <div className="bg-[#121212] text-white p-3 border-2 border-black flex items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#FFC700] shrink-0" />
                <span className="font-mono text-xs text-[#FFC700] font-black uppercase">
                  SUPER ADMINISTRATOR
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  setViewMode('admin-dashboard');
                }}
                className="bg-[#FFC700] hover:bg-[#FFD43B] text-black font-mono font-black text-[11px] px-2.5 py-1 border border-black uppercase"
              >
                Panel Admin &rarr;
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* DISCORD-INSPIRED CUSTOMER DASHBOARD CARD               */}
          {/* ======================================================== */}
          <div className="bg-[#121212] text-white border-[3px] border-black p-4 sm:p-5 shadow-[4px_4px_0px_#000] relative overflow-hidden">
            
            {/* Top Row: Title + Avatar */}
            <div className="flex items-center justify-between border-b border-neutral-700/80 pb-3 mb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-lg">🏠</span>
                  <h3 className="font-display font-black text-lg sm:text-xl uppercase text-white tracking-wide">
                    CUSTOMER DASHBOARD
                  </h3>
                </div>
                <div className="font-mono text-xs text-neutral-400 mt-0.5">
                  <span className="font-black text-[#FFC700]">{user.name}</span>
                  <span className="text-neutral-500"> • akun Anda</span>
                </div>
              </div>

              {/* Avatar Initial with Online indicator */}
              <div className="relative shrink-0">
                <div className="w-12 h-12 bg-[#FFC700] text-black border-2 border-white flex items-center justify-center font-display font-black text-xl shadow-[2px_2px_0px_#000]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="w-3.5 h-3.5 bg-emerald-500 border-2 border-[#121212] rounded-full absolute -bottom-1 -right-1" title="Online"></span>
              </div>
            </div>

            {/* Terminal Stats Box */}
            <div className="bg-[#181818] border border-neutral-800 p-3 sm:p-3.5 font-mono text-xs space-y-2 mb-3 shadow-inner">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-400 flex items-center gap-2">
                  <span>🛒</span>
                  <span>Orders</span>
                </span>
                <span className="font-bold text-white">{stats.ordersCount}x</span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-400 flex items-center gap-2">
                  <span>💰</span>
                  <span>Spend</span>
                </span>
                <span className="font-black text-[#FFC700]">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats.totalSpend)}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-400 flex items-center gap-2">
                  <span>🎁</span>
                  <span>Tips</span>
                </span>
                <span className="font-black text-[#FF5900]">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats.totalTips)}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-400 flex items-center gap-2">
                  <span>📝</span>
                  <span>Reviews</span>
                </span>
                <span className="font-bold text-white">{stats.reviewsCount}x</span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-400 flex items-center gap-2">
                  <span>⭐</span>
                  <span>Points</span>
                </span>
                <span className="font-black text-yellow-300">
                  {stats.points.toLocaleString('id-ID')} Pts
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-1">
                <span className="text-neutral-400 flex items-center gap-2">
                  <span>🏆</span>
                  <span>Rank</span>
                </span>
                <span className="font-black text-emerald-400">
                  #{stats.rank} / {stats.totalMembers}
                </span>
              </div>

              <div className="flex items-center justify-between pt-0.5">
                <span className="text-neutral-400 flex items-center gap-2">
                  <span>🎖️</span>
                  <span>Tier</span>
                </span>
                <span className="font-black text-[11px] bg-[#FFC700] text-black px-2 py-0.5 border border-black uppercase">
                  {stats.tier}
                </span>
              </div>
            </div>

            {/* Progress Bar towards Next Tier */}
            <div className="space-y-1 font-mono text-[10px] sm:text-[11px] mb-3">
              <div className="w-full bg-neutral-800 h-3 border border-neutral-700 relative overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#FFC700] via-[#FF5900] to-emerald-400 transition-all duration-500"
                  style={{ width: `${stats.progressPercent}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span>
                  {stats.progressPercent}% &rarr; <strong className="text-white">{stats.nextTier || 'MAX TIER'}</strong>
                </span>
                {stats.remainingToNextTier ? (
                  <span className="text-[#FFC700]">
                    kurang {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(stats.remainingToNextTier)}
                  </span>
                ) : (
                  <span className="text-emerald-400 font-bold">Peringkat Tertinggi</span>
                )}
              </div>
            </div>

            {/* Discord Sub-Navigation Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono text-xs font-bold pt-2 border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`py-2 px-2 text-center border-2 border-black flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'orders'
                    ? 'bg-[#FFC700] text-black shadow-[2px_2px_0px_#FFF] font-black'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <span>🛒</span>
                <span>Orders</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('rank')}
                className={`py-2 px-2 text-center border-2 border-black flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'rank'
                    ? 'bg-[#FFC700] text-black shadow-[2px_2px_0px_#FFF] font-black'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <span>🏆</span>
                <span>Rank</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('rewards')}
                className={`py-2 px-2 text-center border-2 border-black flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'rewards'
                    ? 'bg-[#FFC700] text-black shadow-[2px_2px_0px_#FFF] font-black'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <span>🎁</span>
                <span>Rewards</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-2 text-center border-2 border-black flex items-center justify-center gap-1.5 transition-all ${
                  activeTab === 'settings'
                    ? 'bg-[#FFC700] text-black shadow-[2px_2px_0px_#FFF] font-black'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                <span>⚙️</span>
                <span>Akun</span>
              </button>
            </div>

          </div>

          {/* ======================================================== */}
          {/* TAB 1: RIWAYAT PESANAN (ORDERS)                          */}
          {/* ======================================================== */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-black text-neutral-800 uppercase flex items-center gap-1.5">
                  <span>RIWAYAT PESANAN SAYA ({userOrders.length})</span>
                </span>
                <span className="font-mono text-[11px] text-neutral-500">
                  Update Real-Time
                </span>
              </div>

              {userOrders.length === 0 ? (
                <div className="border-2 border-dashed border-neutral-300 p-7 text-center bg-white">
                  <div className="w-12 h-12 bg-[#FFF3B0] border-2 border-black flex items-center justify-center mx-auto mb-2.5 shadow-[2px_2px_0px_#000]">
                    <ShoppingBag className="w-6 h-6 text-[#FF5900]" />
                  </div>
                  <h4 className="font-display font-black text-base text-black uppercase mb-1">
                    Belum Ada Riwayat Pesanan
                  </h4>
                  <p className="text-xs font-mono text-neutral-600 max-w-sm mx-auto mb-4">
                    Pesan joki MLBB/HOK atau aplikasi premium untuk mulai mengumpulkan Poin Loyalty dan naik ke Tier VIP!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal(null);
                      const el = document.getElementById('joki');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="brutal-btn-orange text-xs py-2 px-4 inline-flex items-center gap-2 font-black uppercase"
                  >
                    <span>Mulai Order Pertama</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {userOrders.map((order) => (
                    <div 
                      key={order.id}
                      className="bg-white border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] space-y-2.5"
                    >
                      {/* Top Bar of Order Card */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-neutral-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-xs bg-[#121212] text-[#FFC700] px-2 py-0.5">
                            {order.orderCode}
                          </span>
                          <span className="font-mono text-[10px] text-neutral-500">
                            {formatDate(order.createdAt)}
                          </span>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>

                      {/* Main Details */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="font-display font-black text-sm uppercase text-[#121212]">
                            {order.itemName}
                          </h4>
                          <p className="font-mono text-xs text-neutral-600">
                            {order.itemDetails}
                          </p>
                          {order.tipAmount && order.tipAmount > 0 && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-800 font-bold bg-[#FFF3B0] px-1.5 py-0.2 border border-black mt-1">
                              🎁 Ada Tip Booster: Rp {order.tipAmount.toLocaleString('id-ID')}
                            </span>
                          )}
                        </div>

                        <div className="text-left sm:text-right shrink-0">
                          <span className="text-[10px] font-mono text-neutral-500 block">TOTAL BAYAR</span>
                          <span className="font-display font-black text-base text-[#FF5900]">
                            Rp {order.totalAmount.toLocaleString('id-ID')}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-200">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModal(null);
                            openOrderTracking(order);
                          }}
                          className="brutal-btn-orange text-xs py-1 px-2.5 flex items-center gap-1 font-mono font-bold"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Lacak Order</span>
                        </button>

                        {(order.receipt || order.status === 'completed') && (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveModal(null);
                              openReceiptModal(order);
                            }}
                            className="bg-white hover:bg-neutral-100 text-black border-2 border-black py-1 px-2.5 text-xs font-mono font-bold flex items-center gap-1 shadow-[1.5px_1.5px_0px_#000]"
                          >
                            <Receipt className="w-3.5 h-3.5 text-[#FF5900]" />
                            <span>Struk Resmi</span>
                          </button>
                        )}

                        <a
                          href={`https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=Halo%20Admin%20Zura,%20saya%20ingin%20tanya%20order%20${order.orderCode}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-mono font-bold text-neutral-600 hover:text-black ml-auto flex items-center gap-1 underline"
                        >
                          <span>Chat CS</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 2: LEADERBOARD TOP SPENDER (RANK)                    */}
          {/* ======================================================== */}
          {activeTab === 'rank' && (
            <div className="space-y-4">
              <div className="bg-[#121212] text-white p-3.5 border-2 border-black">
                <div className="flex items-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-[#FFC700]" />
                  <span className="font-mono text-xs font-black text-[#FFC700] uppercase">
                    PAPAN PERINGKAT TOP SPENDER
                  </span>
                </div>
                <p className="text-[11px] font-mono text-neutral-300">
                  Posisi Anda saat ini: <strong className="text-emerald-400">#{stats.rank}</strong> dari <strong>{stats.totalMembers} Member</strong> ({stats.tier}).
                </p>
              </div>

              {/* Top 3 Podium */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 items-end">
                {leaderboard[1] && (
                  <div className="order-2 sm:order-1 bg-white border-2 border-black p-3 text-center shadow-[2px_2px_0px_#000]">
                    <div className="w-6 h-6 bg-slate-200 border-2 border-black rounded-full flex items-center justify-center font-mono font-black text-xs mx-auto mb-1">
                      🥈
                    </div>
                    <div className="font-display font-black text-xs uppercase truncate">
                      {leaderboard[1].name}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500">
                      Rp {leaderboard[1].totalSpend.toLocaleString('id-ID')}
                    </div>
                  </div>
                )}

                {leaderboard[0] && (
                  <div className="order-1 sm:order-2 bg-[#FFC700] border-2 border-black p-3.5 text-center shadow-[3px_3px_0px_#000] relative">
                    <div className="w-8 h-8 bg-black text-[#FFC700] border-2 border-black rounded-full flex items-center justify-center font-mono font-black text-sm mx-auto mb-1">
                      🥇
                    </div>
                    <div className="font-display font-black text-sm uppercase truncate">
                      {leaderboard[0].name}
                    </div>
                    <div className="text-xs font-mono font-black">
                      Rp {leaderboard[0].totalSpend.toLocaleString('id-ID')}
                    </div>
                  </div>
                )}

                {leaderboard[2] && (
                  <div className="order-3 bg-white border-2 border-black p-3 text-center shadow-[2px_2px_0px_#000]">
                    <div className="w-6 h-6 bg-amber-100 border-2 border-black rounded-full flex items-center justify-center font-mono font-black text-xs mx-auto mb-1">
                      🥉
                    </div>
                    <div className="font-display font-black text-xs uppercase truncate">
                      {leaderboard[2].name}
                    </div>
                    <div className="text-[10px] font-mono text-neutral-500">
                      Rp {leaderboard[2].totalSpend.toLocaleString('id-ID')}
                    </div>
                  </div>
                )}
              </div>

              {/* Ranks 4 to 10 List */}
              <div className="bg-white border-2 border-black divide-y divide-neutral-200 font-mono text-xs shadow-[2px_2px_0px_#000]">
                {leaderboard.slice(3, 10).map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`p-2.5 flex items-center justify-between ${
                      entry.isCurrentUser ? 'bg-[#FFF3B0] font-black' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 text-center font-black text-neutral-500">#{entry.rank}</span>
                      <div>
                        <span className="font-bold">{entry.name}</span>
                        {entry.isCurrentUser && (
                          <span className="bg-[#FF5900] text-white text-[9px] px-1 py-0.2 ml-1 border border-black">ANDA</span>
                        )}
                        <span className="text-[10px] text-neutral-500 block">{entry.tier}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-black">Rp {entry.totalSpend.toLocaleString('id-ID')}</span>
                      <span className="text-[10px] text-[#FF5900] block">⭐ {entry.points} Pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 3: REWARDS & TIER BENEFITS                           */}
          {/* ======================================================== */}
          {activeTab === 'rewards' && (
            <div className="space-y-4 font-mono text-xs">
              <div className="bg-[#FFF3B0] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000] space-y-1.5">
                <div className="flex items-center gap-1.5 font-black uppercase text-[#121212]">
                  <Sparkles className="w-4 h-4 text-[#FF5900]" />
                  <span>Cara Kerja Poin & Tier Zura Store</span>
                </div>
                <p className="text-neutral-700 leading-relaxed text-[11px]">
                  • <strong>Belanja</strong>: Rp 1.000 pengeluaran = <strong>1 Poin Loyalty</strong>.<br />
                  • <strong>Tip Booster</strong>: Rp 1.000 tip = <strong>2 Poin Loyalty (2x lipat)</strong>.<br />
                  • <strong>Review</strong>: Beri ulasan bintang = bonus <strong>+50 Poin</strong>.<br />
                  Semakin tinggi poin dan total belanja, semakin tinggi Tier dan keuntungan VIP Anda!
                </p>
              </div>

              <div className="space-y-2.5">
                {MEMBER_TIERS.map((tier) => {
                  const isCurrent = tier.name === stats.tier;
                  return (
                    <div 
                      key={tier.name}
                      className={`border-2 border-black p-3 transition-all ${
                        isCurrent ? 'bg-[#FFC700] shadow-[3px_3px_0px_#000]' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-black font-display text-sm uppercase">{tier.name}</span>
                          {isCurrent && (
                            <span className="bg-[#121212] text-[#FFC700] text-[9px] px-1.5 py-0.2 border border-black uppercase font-black">
                              TIER ANDA SAAT INI
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] font-bold text-neutral-700">
                          {tier.maxSpend === Infinity ? '≥ Rp 2.000.000' : `Rp ${tier.minSpend.toLocaleString('id-ID')} - ${tier.maxSpend.toLocaleString('id-ID')}`}
                        </span>
                      </div>

                      <div className="space-y-0.5 text-[11px] text-neutral-800">
                        {tier.benefits.map((b, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 4: PENGATURAN AKUN (SETTINGS)                        */}
          {/* ======================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              
              {/* Account Info Card */}
              <div className="bg-[#FFF3B0] border-2 border-black p-3.5 shadow-[2px_2px_0px_#000]">
                <div className="flex items-center gap-2 mb-2 font-mono text-xs font-black uppercase text-[#121212]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Informasi Akun Terverifikasi</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono mt-2">
                  <div className="bg-white p-2 border border-black">
                    <span className="text-neutral-500 block text-[10px]">NOMOR WHATSAPP</span>
                    <span className="font-black text-neutral-900 flex items-center gap-1 mt-0.5">
                      <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                      {user.phone}
                    </span>
                  </div>
                  <div className="bg-white p-2 border border-black">
                    <span className="text-neutral-500 block text-[10px]">STATUS ROLE</span>
                    <span className="font-black text-neutral-900 mt-0.5 block">
                      {user.role === 'admin' ? 'SUPER ADMINISTRATOR' : 'PELANGGAN RESMI'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notification Alerts */}
              {saveSuccess && (
                <div className="p-2.5 bg-emerald-100 border-2 border-emerald-600 text-xs font-mono text-emerald-900 font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Username berhasil diperbarui menjadi "{user.name}"!</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-2.5 bg-red-100 border-2 border-red-600 text-xs font-mono text-red-900 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-700 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Edit Username Form */}
              <form onSubmit={handleUpdateName} className="bg-white border-2 border-black p-4 shadow-[2px_2px_0px_#000] space-y-3">
                <div className="border-b-2 border-black pb-2">
                  <h4 className="font-display font-black text-xs uppercase text-[#121212] flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5 text-[#FF5900]" />
                    <span>Ubah Username / Nama Lengkap</span>
                  </h4>
                  <p className="text-[10px] font-mono text-neutral-500 mt-0.5">
                    Nama ini akan muncul pada Leaderboard Top Spender dan struk resmi.
                  </p>
                </div>

                <div>
                  <div className="flex items-center border-2 border-black bg-[#FAF8F5]">
                    <span className="pl-2.5 text-neutral-400">
                      <User className="w-3.5 h-3.5" />
                    </span>
                    <input
                      type="text"
                      required
                      minLength={2}
                      maxLength={40}
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="Masukkan nama/username baru"
                      className="w-full p-2 text-xs font-mono font-bold focus:outline-none bg-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full brutal-btn-yellow py-2 text-xs font-mono font-black uppercase flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_#000]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Perubahan Nama</span>
                </button>
              </form>

              {/* Logout Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setActiveModal(null);
                  }}
                  className="w-full bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 p-2.5 text-xs font-mono font-black uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Keluar dari Akun (Sign Out)</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
