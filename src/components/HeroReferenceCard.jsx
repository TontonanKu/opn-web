import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  Search, 
  Sparkles, 
  Gamepad2, 
  Calculator, 
  Check, 
  Copy, 
  ArrowDownRight,
  ExternalLink
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

// Reusable decorative bubble cluster matching the reference image corners
export function GlossyBubbleCluster({ className = "" }) {
  return (
    <div className={`flex items-end gap-1.5 ${className}`}>
      {/* Smallest */}
      <div className="w-3.5 h-3.5 rounded-full bg-[#9E1B28] relative shadow-xs">
        <div className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full bg-white/80"></div>
      </div>
      {/* Largest */}
      <div className="w-8 h-8 rounded-full bg-[#9E1B28] relative shadow-xs">
        <div className="absolute top-1 right-1.5 w-2.5 h-2.5 rounded-full bg-white/90"></div>
        <div className="absolute bottom-1.5 left-2 w-1.5 h-1.5 rounded-full bg-white/40"></div>
      </div>
      {/* Medium */}
      <div className="w-5 h-5 rounded-full bg-[#9E1B28] relative shadow-xs">
        <div className="absolute top-0.5 right-1 w-1.5 h-1.5 rounded-full bg-white/85"></div>
      </div>
    </div>
  );
}

export default function HeroReferenceCard() {
  const [copiedContact, setCopiedContact] = useState('');

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedContact(type);
    setTimeout(() => setCopiedContact(''), 2500);
  };

  return (
    <section id="profile" className="py-6 md:py-12 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Main Poster Container replicating the user's reference */}
        <div className="relative bg-[#FAF4E8] border-2 md:border-3 border-[#9E1B28] rounded-[32px] p-5 sm:p-8 md:p-12 shadow-2xl overflow-hidden">
          
          {/* Top-Left Close/Sticker Icon */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#9E1B28] border-2 border-white flex items-center justify-center text-white font-black text-sm sm:text-base shadow-md cursor-pointer hover:rotate-90 transition-transform">
              ✕
            </div>
          </div>

          {/* Top-Right Decorative Glossy Bubbles */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <GlossyBubbleCluster />
          </div>

          {/* Bottom-Left Decorative Glossy Bubbles */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20">
            <GlossyBubbleCluster />
          </div>

          {/* Poster Inner Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 pt-8 sm:pt-4">
            
            {/* LEFT COLUMN: Photo, Contact, Software, Domain */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              
              {/* Skill Arrow Indicator */}
              <div className="w-full flex items-center justify-end pr-4 mb-1">
                <div className="flex flex-col items-center">
                  <div className="flex items-center gap-1 text-[#9E1B28] font-bold text-xs">
                    <svg className="w-5 h-5 -rotate-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 14c4-7 11-8 16-3" />
                      <polyline points="15 11 20 11 20 6" />
                    </svg>
                    <span className="tracking-wider text-[11px] font-black uppercase font-['Outfit']">SKILL</span>
                  </div>
                  {/* Skill Minis */}
                  <div className="flex items-center gap-1.5 mt-0.5 bg-[#FAF4E8] border border-[#9E1B28]/30 px-2 py-0.5 rounded-full shadow-2xs">
                    {/* Figma */}
                    <div className="w-4 h-4 rounded-full flex items-center justify-center bg-white shadow-2xs" title="Figma">
                      <span className="text-[10px] font-black text-[#F24E1E]">F</span>
                    </div>
                    {/* Canva */}
                    <div className="w-4 h-4 rounded-full flex items-center justify-center bg-[#00C4CC] text-white shadow-2xs" title="Canva">
                      <span className="text-[9px] font-black">C</span>
                    </div>
                    {/* Unity */}
                    <div className="w-4 h-4 rounded-full flex items-center justify-center bg-black text-white shadow-2xs" title="Unity">
                      <span className="text-[9px] font-black">U</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Photo Frame with reference styling */}
              <div className="relative mx-auto lg:mx-0 w-64 h-72 sm:w-72 sm:h-80 rounded-[28px] border-2 border-[#9E1B28] p-2 bg-[#FAF4E8] shadow-md group">
                {/* Red Inner Card */}
                <div className="w-full h-full rounded-[22px] bg-linear-to-b from-[#9E1B28] to-[#6E101B] relative overflow-hidden flex items-end justify-center">
                  
                  {/* Top-Left X inside Photo Frame */}
                  <div className="absolute top-2.5 left-2.5 w-6 h-6 rounded-full bg-[#9E1B28] border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-sm z-10">
                    ✕
                  </div>

                  {/* POLI BATAM Curved Badge on the Left */}
                  <div className="absolute left-2 top-10 -rotate-90 origin-top-left z-10">
                    <span className="text-white text-[11px] font-black tracking-widest uppercase drop-shadow-md">
                      POLI BATAM
                    </span>
                  </div>

                  {/* Corner Accent Pattern */}
                  <div className="absolute bottom-2 right-2 text-white/20 font-black text-xl select-none">
                    ✕
                  </div>

                  {/* zura-w's Portrait Image */}
                  <div className="w-full h-full flex items-end justify-center relative">
                    <img 
                      src="/reihan-portrait.png" 
                      alt="zura-w"
                      className="w-full h-full object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-300 drop-shadow-xl"
                      onError={(e) => {
                        e.target.src = '/reihan-profile.png';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Date of Birth Badge with Flanking Lines */}
              <div className="w-full max-w-xs mx-auto lg:mx-0 flex items-center gap-3 my-4">
                <div className="h-[2px] bg-[#E58327] flex-1"></div>
                <span className="text-[#E58327] font-black text-sm tracking-wider font-['Outfit']">
                  {personalInfo.birthDate}
                </span>
                <div className="h-[2px] bg-[#E58327] flex-1"></div>
              </div>

              {/* CONTACT Heading & Info */}
              <div className="w-full max-w-xs mx-auto lg:mx-0">
                <h3 className="text-2xl font-black font-outline tracking-wider text-left mb-2.5 font-['Outfit']">
                  CONTACT
                </h3>

                <div className="flex flex-col gap-2">
                  {/* Phone */}
                  <button
                    onClick={() => handleCopy(personalInfo.phone, 'phone')}
                    className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#2B1618] hover:text-[#9E1B28] transition-colors group text-left p-1 rounded-lg hover:bg-[#F3ECE0]"
                    title="Klik untuk salin no telp / chat WA"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#9E1B28] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                      <Phone className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <span className="font-semibold">{personalInfo.phone}</span>
                    {copiedContact === 'phone' ? (
                      <span className="ml-auto text-[10px] text-green-700 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Tersalin!
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                    )}
                  </button>

                  {/* Email */}
                  <button
                    onClick={() => handleCopy(personalInfo.email, 'email')}
                    className="flex items-center gap-3 text-xs sm:text-sm font-bold text-[#2B1618] hover:text-[#9E1B28] transition-colors group text-left p-1 rounded-lg hover:bg-[#F3ECE0]"
                    title="Klik untuk salin email"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#9E1B28] text-white flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-semibold truncate max-w-[200px]">{personalInfo.email}</span>
                    {copiedContact === 'email' ? (
                      <span className="ml-auto text-[10px] text-green-700 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Tersalin!
                      </span>
                    ) : (
                      <Copy className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                    )}
                  </button>
                </div>

                {/* Domain Pill Badge matching reference: zura-w.my.id */}
                <div className="mt-4">
                  <div className="inline-flex items-center gap-2 bg-[#9E1B28] text-white px-4 py-2 rounded-full text-xs font-bold shadow-sm border border-[#7A111C]">
                    <Search className="w-3.5 h-3.5 text-[#FDE047]" />
                    <span>{personalInfo.domain}</span>
                    <span className="text-white/60">/</span>
                    <span className="text-[#FDE047]">coming soon</span>
                  </div>
                </div>

                {/* SOFTWARE Heading & Badges */}
                <div className="mt-6">
                  <h3 className="text-xl font-black font-outline tracking-wider text-left mb-3 font-['Outfit']">
                    SOFTWARE
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-left">
                    <div className="flex items-center gap-2 bg-white/70 border border-[#9E1B28]/20 px-3 py-1.5 rounded-xl shadow-2xs">
                      <div className="w-5 h-5 rounded-md bg-[#F24E1E] flex items-center justify-center text-white font-black text-xs">
                        F
                      </div>
                      <span className="text-xs font-extrabold text-[#2B1618]">FIGMA</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/70 border border-[#9E1B28]/20 px-3 py-1.5 rounded-xl shadow-2xs">
                      <div className="w-5 h-5 rounded-md bg-black flex items-center justify-center text-white font-black text-xs">
                        U
                      </div>
                      <span className="text-xs font-extrabold text-[#2B1618]">UNITY</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/70 border border-[#9E1B28]/20 px-3 py-1.5 rounded-xl shadow-2xs">
                      <div className="w-5 h-5 rounded-md bg-[#00C4CC] flex items-center justify-center text-white font-black text-xs">
                        C
                      </div>
                      <span className="text-xs font-extrabold text-[#2B1618]">CANVA</span>
                    </div>

                    <div className="flex items-center gap-2 bg-white/70 border border-[#9E1B28]/20 px-3 py-1.5 rounded-xl shadow-2xs">
                      <div className="w-5 h-5 rounded-md bg-[#3776AB] flex items-center justify-center text-white font-black text-xs">
                        Py
                      </div>
                      <span className="text-xs font-extrabold text-[#2B1618]">PYTHON / AI</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: Big Typography, Bio, Education, Experience */}
            <div className="lg:col-span-7 flex flex-col justify-between text-left">
              
              {/* Heading Section */}
              <div>
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-black font-outline leading-none tracking-tight font-['Outfit']">
                  Hello.
                </h1>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#9E1B28] tracking-tight -mt-2 font-['Outfit']">
                  I'm zura-w !
                </h2>

                {/* Bio text directly from reference */}
                <p className="mt-4 text-[#3D2527] text-sm sm:text-base leading-relaxed font-medium max-w-xl">
                  {personalInfo.bio}
                </p>
              </div>

              {/* EDUCATION Section */}
              <div className="mt-6 relative">
                <h3 className="text-3xl sm:text-4xl font-black font-outline tracking-wider font-['Outfit'] mb-3">
                  EDUCATION
                </h3>

                {/* Line connector to Experience box */}
                <div className="border-l-2 border-t-2 border-[#9E1B28]/40 rounded-tl-2xl pl-4 pt-3 pb-1 ml-2">
                  <div className="flex flex-col gap-4">
                    
                    {/* Education Item 1 */}
                    <div className="relative flex items-start gap-3">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#E58327] shrink-0 mt-1 shadow-2xs ring-4 ring-[#FAF4E8]"></div>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-[#E58327] font-black text-sm sm:text-base font-['Outfit']">
                            2022-2025 :
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-[#2B1618]">
                            SMK Negeri 7 Batam
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#6B5B5E]">
                          [ Teknik Komputer & Jaringan ]
                        </p>
                      </div>
                    </div>

                    {/* Education Item 2 */}
                    <div className="relative flex items-start gap-3">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#E58327] shrink-0 mt-1 shadow-2xs ring-4 ring-[#FAF4E8]"></div>
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="text-[#E58327] font-black text-sm sm:text-base font-['Outfit']">
                            2025-Sekarang :
                          </span>
                          <span className="text-base sm:text-lg font-extrabold text-[#2B1618]">
                            Politeknik Negeri Batam
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#6B5B5E]">
                          [ Teknik Informatika (Game Tech) ]
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* EXPERIENCE Box directly from reference */}
              <div className="mt-6 bg-[#9E1B28] text-white p-5 sm:p-7 rounded-2xl relative shadow-lg border border-[#7A111C]">
                <h3 className="text-2xl sm:text-3xl font-black tracking-wider uppercase font-['Outfit'] border-b border-white/20 pb-2 mb-4">
                  EXPERIENCE
                </h3>

                <div className="flex flex-col gap-5">
                  {/* Experience 1 */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                      <h4 className="font-black text-sm sm:text-base tracking-wide uppercase">
                        2024 : PT AMBER KARYA
                      </h4>
                    </div>
                    <ul className="pl-6 text-xs sm:text-sm space-y-1 text-white/90 font-medium list-disc">
                      <li>Termination Crimping</li>
                      <li>Assembly Kabel & Connector</li>
                      <li>Quality Control Dasar</li>
                      <li>Kerja Tim & Target Harian</li>
                    </ul>
                  </div>

                  {/* Experience 2 */}
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FDE047]"></div>
                      <h4 className="font-black text-sm sm:text-base tracking-wide uppercase text-[#FDE047]">
                        2026 : FOCUS LEARNING
                      </h4>
                    </div>
                    <ul className="pl-6 text-xs sm:text-sm space-y-1 text-white/90 font-medium list-disc">
                      <li>Learn UI/visual design and apply it to game assets</li>
                      <li>Learn practical AI for design workflows & game engines</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Quick CTA Actions at the bottom of hero card */}
          <div className="mt-8 pt-6 border-t-2 border-[#9E1B28]/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#6B5B5E]">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
              <span>Status: Siap menerima order Joki Game & Kolaborasi AI Project</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#ai-projects"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FAF4E8] text-[#9E1B28] font-black text-xs sm:text-sm border-2 border-[#9E1B28] hover:bg-[#9E1B28] hover:text-white transition-all shadow-xs"
              >
                <Sparkles className="w-4 h-4" />
                <span>Project AI</span>
              </a>

              <a
                href="#joki-game"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#9E1B28] text-white font-black text-xs sm:text-sm border-2 border-[#9E1B28] hover:bg-[#80141F] transition-all shadow-xs"
              >
                <Gamepad2 className="w-4 h-4 text-[#FDE047]" />
                <span>Layanan Joki</span>
              </a>

              <a
                href="#kalkulator"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E58327] text-white font-black text-xs sm:text-sm border-2 border-[#C26B18] hover:bg-[#D4741B] transition-all shadow-xs"
              >
                <Calculator className="w-4 h-4" />
                <span>Hitung Biaya Joki</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
