'use client';

import { ExternalLink, CheckCircle2, ShieldCheck, Zap, Terminal, Globe, Award } from 'lucide-react';

export default function ClaimGuide() {
  return (
    <div className="space-y-6 animate-fade-in-up delay-100">
      <div className="flex items-center gap-2 px-2">
        <Terminal className="w-4 h-4 text-[#00c8d4]" />
        <h3 className="text-xs uppercase tracking-[0.3em] font-bold" style={{ color: 'rgba(0,200,212,0.8)', fontFamily: "'Share Tech Mono', monospace" }}>
          Allocation Retrieval Guide
        </h3>
      </div>

      <div className="grid gap-6">
        {/* Kaito Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 opacity-60">
            <Globe className="w-3.5 h-3.5 text-[#00c8d4]" />
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#00c8d4' }}>Kaito Launchpad Users</span>
          </div>
          <div className="glass-card rounded-2xl p-5 border border-white/5 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-[#00c8d4]10 border border-[#00c8d4]20">
                <CheckCircle2 className="w-4 h-4 text-[#00c8d4]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', monospace", color: '#e8e8f0' }}>
                  Verify on Kaito
                </h4>
                <p className="text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace" }}>
                  Visit <span className="text-[#00c8d4]">yaps.kaito.ai</span> and connect your wallet to see your final "POWER" tier and community round status.
                </p>
              </div>
            </div>
            <a
              href="https://yaps.kaito.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all bg-white/[0.03] border border-white/10 hover:bg-white/[0.08]"
              style={{ fontFamily: "'Orbitron', monospace", color: '#e8e8f0' }}
            >
              Go to Kaito Portal <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Testnet Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 opacity-60">
            <Zap className="w-3.5 h-3.5 text-[#cc0088]" />
            <span className="text-[10px] uppercase tracking-widest font-bold" style={{ color: '#cc0088' }}>Testnet Beta Participants</span>
          </div>
          <div className="glass-card-magenta rounded-2xl p-5 border border-white/5 space-y-4">
            <div className="flex gap-4 items-start">
              <div className="p-2 rounded-lg bg-[#cc0088]10 border border-[#cc0088]20">
                <Award className="w-4 h-4 text-[#cc0088]" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider" style={{ fontFamily: "'Orbitron', monospace", color: '#e8e8f0' }}>
                  Wait for TGE Contract
                </h4>
                <p className="text-[10px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Share Tech Mono', monospace" }}>
                  Testnet allocations are mapped to your EVM address. The claim contract will be deployed on May 4. No action needed until then.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10 flex gap-3">
        <ShieldCheck className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
        <p className="text-[10px] leading-relaxed text-yellow-500/70 font-mono">
          PHISHING ALERT: Official contract details will be posted on @billions_ntwk. Do not interact with unverified claim links in DMs or comments.
        </p>
      </div>
    </div>
  );
}
