import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const { t } = useLanguage();

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  const faqList = t.faq.items || [];

  return (
    <section id="faq" className="py-12 md:py-20 px-3 sm:px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E8] border border-[#9E1B28] text-[#9E1B28] font-black text-xs uppercase tracking-wider mb-3 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t.faq.badge}</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight font-['Outfit']">
            <span className="text-[#C02C3C]">{t.faq.titlePrefix}</span> <span className="text-[#E58327]">{t.faq.titleSuffix}</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#FAF4E8]/90 font-medium">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-3">
          {faqList.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF4E8] border-2 sm:border-3 border-[#9E1B28] rounded-2xl overflow-hidden transition-all shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-extrabold text-sm sm:text-base text-[#2B1618] hover:text-[#9E1B28] transition-colors gap-3 cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-[#9E1B28] text-white flex items-center justify-center text-xs font-black shrink-0">
                      ?
                    </span>
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#9E1B28] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#6B5B5E] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#3D2527] leading-relaxed border-t border-[#9E1B28]/15 bg-white/40">
                    <p className="font-medium">{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
