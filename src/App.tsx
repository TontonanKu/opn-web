import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminStatusBar } from './components/AdminStatusBar';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { GameJokiSection } from './components/GameJokiSection';
import { PremiumAppSection } from './components/PremiumAppSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialSection } from './components/TestimonialSection';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReceiptModal } from './components/ReceiptModal';
import { AuthModal } from './components/AuthModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { TermsAndGuaranteeModal } from './components/TermsAndGuaranteeModal';
import { LiveOrderTicker } from './components/LiveOrderTicker';
import { AdminLoginPage } from './components/AdminLoginPage';
import { AdminDashboardView } from './components/AdminDashboardView';
import { LiveChatWidget } from './components/LiveChatWidget';
import { Footer } from './components/Footer';
import { ADMIN_CONFIG } from './data/initialData';
import { MessageSquare, Receipt } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { orders, openOrderTracking, viewMode } = useApp();

  // Ensure body scroll is never locked
  React.useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  // If Admin Login page is requested
  if (viewMode === 'admin-login') {
    return <AdminLoginPage />;
  }

  // If Admin Dashboard is active (full dedicated view, NOT a popup modal!)
  if (viewMode === 'admin-dashboard') {
    return <AdminDashboardView />;
  }

  // Active / pending order check
  const activeOrder = orders.find(o => o.status === 'pending_admin' || o.status === 'processing');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] selection:bg-[#FFC700] selection:text-black">
      {/* Top Admin Status Ticker */}
      <AdminStatusBar />

      {/* Main Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroBanner />
        <GameJokiSection />
        <PremiumAppSection />
        <PortfolioSection />
        <TestimonialSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals for Orders & Auth */}
      <OrderCheckoutModal />
      <OrderTrackingModal />
      <ReceiptModal />
      <AuthModal />
      <CustomerProfileModal />
      <TermsAndGuaranteeModal />

      {/* Social Proof Live Order Notification Ticker */}
      <LiveOrderTicker />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        
        {/* Floating Active Order Tracker if order exists */}
        {activeOrder && (
          <button
            onClick={() => openOrderTracking(activeOrder)}
            className="brutal-btn-orange py-2 px-3 text-xs flex items-center gap-2 shadow-brutal animate-bounce"
            title="Lihat status pesanan aktif & timer 10 menit"
          >
            <Receipt className="w-4 h-4" />
            <span className="font-mono font-bold">Lacak Order: {activeOrder.orderCode}</span>
          </button>
        )}

        {/* Live Chat Web Real-Time Widget */}
        <LiveChatWidget />

        {/* WhatsApp Fast Contact Button */}
        <a
          href={`https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=Halo%20Admin%20Zura%20Store,%20saya%20ingin%20tanya%20layanan%20joki%20/%20aplikasi%20premium.`}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-btn bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs sm:text-sm py-3 px-4 flex items-center gap-2 shadow-brutal"
        >
          <div className="w-3 h-3 rounded-full bg-white animate-ping"></div>
          <MessageSquare className="w-5 h-5 text-black" />
          <span className="font-mono">Chat CS WhatsApp</span>
        </a>
      </div>

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
