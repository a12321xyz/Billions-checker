'use client';

import { Zap } from 'lucide-react';

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/5 backdrop-blur-xl"
      style={{ backgroundColor: 'rgba(5,5,5,0.8)' }}
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center">
          <Zap className="w-4 h-4 text-black fill-black" />
        </div>
        <div className="flex flex-col">
          <span
            className="text-lg font-black tracking-tighter text-white"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            BILLIONS
          </span>
          <span
            className="text-[8px] tracking-[0.4em] uppercase text-white/20 font-black -mt-1"
          >
            Terminal
          </span>
        </div>
      </div>

      <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.2em] text-white/30">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
          <span>Nodes Active</span>
        </div>
        <div className="hidden sm:block h-3 w-px bg-white/10" />
        <span className="hidden sm:inline">Mainnet 2.0</span>
      </div>
    </nav>
  );
}
