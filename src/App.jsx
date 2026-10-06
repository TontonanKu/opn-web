import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ModernHero from './components/ModernHero';
import AiProjects from './components/AiProjects';
import JokiServices from './components/JokiServices';
import JokiCalculator from './components/JokiCalculator';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import QrisModal from './components/QrisModal';
import { ArrowLeft } from 'lucide-react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import './App.css';

function AppContent() {
  const { t } = useLanguage();

  // Sync tab with URL hash if available
  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '');
    if (['ai-projects', 'joki-game', 'testimoni', 'faq'].includes(hash)) {
      return hash;
    }
    return 'home';
  };

  const [activeTab, setActiveTab] = useState(getInitialTab);
  const [isQrisOpen, setIsQrisOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'ai-projects', 'joki-game', 'testimoni', 'faq'].includes(hash)) {
        setActiveTab(hash);
      } else if (!hash) {
        setActiveTab('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    window.location.hash = tabId === 'home' ? '' : `#${tabId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#242327] text-[#2B1618] selection:bg-[#9E1B28] selection:text-white relative font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Subtle retro background grid pattern */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-5 z-0"
        style={{
          backgroundImage: `radial-gradient(#FAF4E8 1.5px, transparent 1.5px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Bar with Active Tabs & Language Switcher */}
        <Navbar 
          activeTab={activeTab} 
          onSelectTab={handleSelectTab} 
          onOpenDonate={() => setIsQrisOpen(true)} 
        />

        {/* Main Content Area */}
        <main className="flex-1">
          
          {/* Back to Home Button on sub-pages */}
          {activeTab !== 'home' && (
            <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-2">
              <button
                onClick={() => handleSelectTab('home')}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF4E8] text-[#9E1B28] border-2 border-[#9E1B28] text-xs font-black hover:bg-[#9E1B28] hover:text-white transition-all shadow-xs cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.common.backToHome}</span>
              </button>
            </div>
          )}

          {/* 1. Halaman Home */}
          {activeTab === 'home' && (
            <ModernHero onNavigate={handleSelectTab} />
          )}

          {/* 2. Halaman Project & Assets */}
          {activeTab === 'ai-projects' && (
            <div className="animate-in fade-in duration-300">
              <AiProjects />
            </div>
          )}

          {/* 3. Halaman Joki Game & Kalkulator */}
          {activeTab === 'joki-game' && (
            <div className="animate-in fade-in duration-300">
              <JokiServices />
              <JokiCalculator />
            </div>
          )}

          {/* 4. Halaman Testimoni */}
          {activeTab === 'testimoni' && (
            <div className="animate-in fade-in duration-300">
              <Testimonials />
            </div>
          )}

          {/* 5. Halaman FAQ & Kontak */}
          {activeTab === 'faq' && (
            <div className="animate-in fade-in duration-300">
              <FaqSection />
            </div>
          )}

        </main>

        {/* Footer */}
        <Footer onSelectTab={handleSelectTab} />

        {/* Floating WhatsApp Action Button */}
        <FloatingWhatsApp />

        {/* QRIS Donation Modal */}
        <QrisModal 
          isOpen={isQrisOpen} 
          onClose={() => setIsQrisOpen(false)} 
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
