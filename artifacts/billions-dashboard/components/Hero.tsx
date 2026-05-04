'use client';

import CountdownTimer from './CountdownTimer';

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center gap-6 py-8">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
          $BILL <span className="opacity-20">REVELATION</span>
        </h1>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-bold mt-4">
          Verified Direct Chain Indexing
        </p>
      </div>

      <div className="w-16 h-[2px] bg-white/10 rounded-full" />

      <div className="animate-fade-in-up delay-200">
        <div className="flex items-center gap-3 mb-6 opacity-40 justify-center">
          <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
          <span className="text-[9px] uppercase tracking-[0.3em] font-black">Live TGE Countdown</span>
        </div>
        <CountdownTimer />
      </div>

      <p className="max-w-xs text-[9px] uppercase tracking-widest leading-loose text-white/20 font-bold animate-fade-in-up delay-300">
        Intercepting community round indices and testnet snapshots. 
        Verify your allocation before official portal activation.
      </p>
    </section>
  );
}
