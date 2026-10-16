import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Sparkles, X, ShieldCheck } from 'lucide-react';

interface TickerItem {
  id: string;
  customerName: string;
  action: string;
  item: string;
  timeAgo: string;
  tag: string;
}

const DEFAULT_TICKERS: TickerItem[] = [
  {
    id: '1',
    customerName: 'Rian S.',
    action: 'baru saja memesan',
    item: 'Joki MLBB - Mythic Honor ke Glory',
    timeAgo: '1 menit lalu',
    tag: 'JOKI KILAT'
  },
  {
    id: '2',
    customerName: 'Aldi P.',
    action: 'transaksi selesai',
    item: 'Netflix Premium 4K UHD 1 Bulan',
    timeAgo: '3 menit lalu',
    tag: 'TERVERIFIKASI'
  },
  {
    id: '3',
    customerName: 'Dimas K.',
    action: 'memberikan rating bintang 5',
    item: 'Spotify Premium 3 Bulan Tanpa Iklan',
    timeAgo: '7 menit lalu',
    tag: 'RATING 5.0'
  },
  {
    id: '4',
    customerName: 'Fajar W.',
    action: 'pesanan selesai diproses',
    item: 'Joki Free Fire - Master Bintang 25',
    timeAgo: '12 menit lalu',
    tag: 'SELESAI'
  },
  {
    id: '5',
    customerName: 'Bayu T.',
    action: 'baru saja klaim voucher',
    item: 'Hemat 10% dengan kode ZURAGACOR',
    timeAgo: 'Baru saja',
    tag: 'PROMO'
  }
];

export const LiveOrderTicker: React.FC = () => {
  const { orders } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Generate dynamic list combining completed orders and defaults
  const dynamicTickers: TickerItem[] = React.useMemo(() => {
    const list: TickerItem[] = [];

    // Include recent real completed orders if any
    orders.slice(0, 3).forEach((o) => {
      list.push({
        id: o.id,
        customerName: o.customerName ? `${o.customerName.slice(0, 4)}***` : 'Pelanggan',
        action: o.status === 'completed' ? 'pesanan telah selesai' : 'sedang diproses',
        item: `${o.itemName} - ${o.itemDetails}`,
        timeAgo: 'Hari ini',
        tag: o.status === 'completed' ? 'SUKSES' : 'DIPROSES'
      });
    });

    return [...list, ...DEFAULT_TICKERS];
  }, [orders]);

  useEffect(() => {
    if (!isVisible || isPaused || dynamicTickers.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dynamicTickers.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isVisible, isPaused, dynamicTickers.length]);

  if (!isVisible || dynamicTickers.length === 0) return null;

  const current = dynamicTickers[currentIndex];

  return (
    <div 
      className="fixed bottom-5 left-5 z-40 hidden sm:block max-w-sm animate-fade-in"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_#000] flex items-start gap-2.5 relative">
        
        {/* Pulsing Green Indicator */}
        <div className="relative flex h-3 w-3 mt-1 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-black"></span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[9px] font-mono font-black bg-[#FFC700] text-black px-1.5 py-0.2 border border-black">
              {current.tag}
            </span>
            <span className="text-[10px] font-mono text-neutral-500 font-semibold">
              {current.timeAgo}
            </span>
          </div>

          <p className="text-xs font-mono text-[#121212] leading-snug truncate">
            <strong>{current.customerName}</strong> {current.action}
          </p>

          <p className="text-[11px] font-bold text-[#FF5900] truncate">
            {current.item}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="text-neutral-400 hover:text-black absolute top-2 right-2 p-0.5"
          title="Tutup notifikasi"
        >
          <X className="w-3.5 h-3.5" />
        </button>

      </div>
    </div>
  );
};
