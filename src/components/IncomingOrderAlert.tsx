import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { Bell, ShoppingBag, X, ArrowRight, Sparkles, ExternalLink, Crown } from 'lucide-react';

export const IncomingOrderAlert: React.FC = () => {
  const { user, setViewMode } = useApp();
  const [latestIncomingOrder, setLatestIncomingOrder] = useState<Order | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Listen for cross-tab or in-app incoming order event
    const handleNewOrder = (event: MessageEvent) => {
      if (event.data?.type === 'NEW_ORDER') {
        const order = event.data.payload as Order;
        setLatestIncomingOrder(order);
        setIsDismissed(false);
      }
    };

    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('zura_store_sync');
      channel.addEventListener('message', handleNewOrder);
    } catch (e) {}

    // Listen to custom window event
    const handleLocalOrder = (e: any) => {
      if (e.detail) {
        setLatestIncomingOrder(e.detail);
        setIsDismissed(false);
      }
    };
    window.addEventListener('zura:new-order', handleLocalOrder);

    return () => {
      if (channel) {
        channel.removeEventListener('message', handleNewOrder);
        channel.close();
      }
      window.removeEventListener('zura:new-order', handleLocalOrder);
    };
  }, []);

  // Auto-dismiss after 20 seconds
  useEffect(() => {
    if (latestIncomingOrder && !isDismissed) {
      const timer = setTimeout(() => {
        setIsDismissed(true);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [latestIncomingOrder, isDismissed]);

  if (!latestIncomingOrder || isDismissed || user?.role !== 'admin') return null;

  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(latestIncomingOrder.totalAmount);

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-[420px] z-[9999] animate-bounce-in">
      <div className="bg-[#121212] border-[3px] border-[#FFC700] p-4 text-white shadow-[6px_6px_0px_#000] relative">
        
        {/* Header Ribbon */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-700">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
            <span className="font-mono font-black text-xs text-[#FFC700] uppercase tracking-wider flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 animate-bounce text-[#FFC700]" />
              <span>ORDERAN BARU MASUK!</span>
            </span>
          </div>

          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
            title="Tutup Notifikasi"
          >
            <X className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-1.5 mb-3 font-mono text-xs">
          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Kode Pesanan:</span>
            <span className="bg-[#FFC700] text-black font-black px-1.5 py-0.2">
              #{latestIncomingOrder.orderCode}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Pelanggan:</span>
            <span className="font-bold text-white truncate max-w-[200px]">
              {latestIncomingOrder.customerName}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-neutral-400">Item:</span>
            <span className="font-bold text-[#FF5900] truncate max-w-[200px]">
              {latestIncomingOrder.itemName}
            </span>
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-neutral-800">
            <span className="text-neutral-300 font-bold">Total Transaksi:</span>
            <span className="text-sm font-black text-[#FFC700]">
              {formattedAmount}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {user?.role === 'admin' ? (
            <button
              onClick={() => {
                setIsDismissed(true);
                setViewMode('admin-dashboard');
              }}
              className="flex-1 bg-[#FFC700] hover:bg-[#FFD43B] text-black font-mono font-black text-xs py-2 px-3 flex items-center justify-center gap-1.5 border border-black shadow-[2px_2px_0px_#FFF] transition-all"
            >
              <Crown className="w-3.5 h-3.5" />
              <span>BUKA DI DASHBOARD ADMIN</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setIsDismissed(true);
                window.location.hash = 'admin';
              }}
              className="flex-1 bg-[#FFC700] hover:bg-[#FFD43B] text-black font-mono font-black text-xs py-2 px-3 flex items-center justify-center gap-1.5 border border-black shadow-[2px_2px_0px_#FFF] transition-all"
            >
              <span>LIHAT STATUS PESANAN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-mono text-xs py-2 px-3 border border-neutral-600"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
