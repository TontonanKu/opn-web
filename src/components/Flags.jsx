import React from 'react';

// Crisp, modern SVG flags that render consistently on all OS and browsers without relying on system emoji fonts

export function FlagID({ className = "w-4 h-2.5" }) {
  return (
    <span className={`inline-flex flex-col overflow-hidden rounded-[2px] border border-black/20 shrink-0 shadow-2xs ${className}`} title="Indonesia">
      <span className="block h-1/2 w-full bg-[#E70011]"></span>
      <span className="block h-1/2 w-full bg-white"></span>
    </span>
  );
}

export function FlagMY({ className = "w-4 h-2.5" }) {
  return (
    <svg viewBox="0 0 28 14" className={`inline-block overflow-hidden rounded-[2px] border border-black/20 shrink-0 shadow-2xs ${className}`} title="Malaysia">
      {/* 14 alternating stripes */}
      <rect width="28" height="1" y="0" fill="#CC0000" />
      <rect width="28" height="1" y="1" fill="#FFFFFF" />
      <rect width="28" height="1" y="2" fill="#CC0000" />
      <rect width="28" height="1" y="3" fill="#FFFFFF" />
      <rect width="28" height="1" y="4" fill="#CC0000" />
      <rect width="28" height="1" y="5" fill="#FFFFFF" />
      <rect width="28" height="1" y="6" fill="#CC0000" />
      <rect width="28" height="1" y="7" fill="#FFFFFF" />
      <rect width="28" height="1" y="8" fill="#CC0000" />
      <rect width="28" height="1" y="9" fill="#FFFFFF" />
      <rect width="28" height="1" y="10" fill="#CC0000" />
      <rect width="28" height="1" y="11" fill="#FFFFFF" />
      <rect width="28" height="1" y="12" fill="#CC0000" />
      <rect width="28" height="1" y="13" fill="#FFFFFF" />
      {/* Blue canton */}
      <rect width="14" height="8" fill="#000066" />
      {/* Crescent and star */}
      <path d="M 6.5,4 A 2.6,2.6 0 1 0 7,6.5 A 2.2,2.2 0 1 1 6.5,4 Z" fill="#FFCC00" />
      <circle cx="9" cy="4" r="1.3" fill="#FFCC00" />
    </svg>
  );
}

export function FlagGB({ className = "w-4 h-2.5" }) {
  return (
    <svg viewBox="0 0 60 30" className={`inline-block overflow-hidden rounded-[2px] border border-black/20 shrink-0 shadow-2xs ${className}`} title="English (United Kingdom)">
      <clipPath id="gb-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="gb-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <g clipPath="url(#gb-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}
