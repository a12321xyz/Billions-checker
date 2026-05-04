'use client';

import { useState, useRef, useEffect } from 'react';
import { isAddress } from 'viem';
import { Search, Loader2, Database, Share2, Server, CheckCircle2, Globe, Settings2 } from 'lucide-react';
import { ActualChecker, ContractChecker } from '@workspace/airdrop-logic';

type ScanType = 'official' | 'chain';
const BILLIONS_PROJECT_ID = 'billions';

function shortenAddr(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

function AnimatedNumber({ target }: { target: number }) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1000;
    const startTime = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setCurrent(Math.floor(eased * target));
      if (p < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [target]);

  return <span>{current.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>;
}

export default function AddressLookup() {
  const [scanType, setScanType] = useState<ScanType>('official');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  
  // Official API State
  const [projectId, setProjectId] = useState('billions');
  
  // Direct Chain State
  const [contractAddr, setContractAddr] = useState('');
  const [chainKey, setChainKey] = useState('eth');

  const checker = new ActualChecker();
  const chainChecker = new ContractChecker();

  const handleScan = async () => {
    const addresses = input.split(/[\n, \t]+/).map(l => l.trim()).filter(l => isAddress(l));
    if (addresses.length === 0) return;

    setLoading(true);
    setResults([]);

    if (scanType === 'official') {
      const scanPromises = addresses.map(async (addr) => {
        const res = await checker.checkAllocation(projectId, addr);
        return { 
          addr, 
          allocation: res.allocation, 
          type: 'Official', 
          tier: res.tier, 
          isVerified: res.isVerified,
          error: !res.isVerified && res.tier === 'ERROR'
        };
      });
      setResults(await Promise.all(scanPromises));
    } else {
      const scanPromises = addresses.map(async (addr) => {
        const res = await chainChecker.checkOnChain({
          contractAddress: contractAddr,
          userAddress: addr,
          chainKey
        });
        return {
          addr,
          allocation: res.allocation,
          type: 'On-Chain',
          tier: 'DIRECT',
          isVerified: res.success,
          error: !res.success
        };
      });
      setResults(await Promise.all(scanPromises));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Sleek Switcher */}
      <div className="flex bg-white/5 p-1 rounded-2xl border border-white/5">
        {(['official', 'chain'] as const).map((t) => (
          <button
            key={t}
            onClick={() => { setScanType(t); setResults([]); }}
            className={`flex-1 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all ${scanType === t ? 'bg-white text-black' : 'text-white/40 hover:text-white/60'}`}
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            {t === 'official' ? 'Official Revelation' : 'Direct Chain Index'}
          </button>
        ))}
      </div>

      <div className="glass-card rounded-3xl p-8 space-y-6">
        {/* Config Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Target Identity</label>
            <div className="relative group">
              {scanType === 'official' ? (
                <div className="flex gap-2">
                  <input 
                    value={projectId} 
                    onChange={(e) => setProjectId(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-5 py-3 text-sm text-white outline-none focus:border-white/20 transition-all font-mono"
                    placeholder="Project ID"
                  />
                  <div className="flex gap-1">
                    {['billions', 'theoriq', 'rayls'].map(p => (
                      <button 
                        key={p} 
                        onClick={() => setProjectId(p)}
                        className={`px-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${projectId === p ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-white/20 hover:bg-white/5'}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input 
                    value={contractAddr} 
                    onChange={(e) => setContractAddr(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-5 py-3 text-sm text-white outline-none focus:border-white/20 transition-all font-mono"
                    placeholder="Contract Address (0x...)"
                  />
                  <div className="flex gap-1">
                    {['eth', 'bsc', 'base'].map(c => (
                      <button 
                        key={c} 
                        onClick={() => setChainKey(c)}
                        className={`px-3 py-3 sm:py-0 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${chainKey === c ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-white/20 hover:bg-white/5'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-2">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-1">Wallet Nodes</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="PASTE ADDRESSES (ONE PER LINE)"
            className="w-full h-32 p-5 bg-white/5 border border-white/5 rounded-3xl text-sm text-white outline-none focus:border-white/10 transition-all resize-none font-mono tracking-tight"
          />
        </div>

        <button
          onClick={handleScan}
          disabled={!input || loading}
          className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-3 active:scale-[0.98] ${input ? 'bg-white text-black hover:bg-gray-200' : 'bg-white/5 text-white/20'}`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Database className="w-5 h-5" />}
          {loading ? 'Executing Index...' : 'Reveal Allocation'}
        </button>
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4 animate-fade-in-up">
          {results.map((res, i) => (
            <div key={i} className="glass-card rounded-3xl p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-white/10 transition-all">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {res.isVerified ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <div className={`w-2 h-2 rounded-full ${res.error ? 'bg-red-500' : 'bg-white/20'}`} />
                  )}
                  <span className="text-xs font-bold tracking-widest text-white/40 font-mono">{shortenAddr(res.addr)}</span>
                  <span className="text-[8px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-black uppercase tracking-widest">{res.tier}</span>
                </div>
                <div className="text-5xl font-black text-white tracking-tighter" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {res.error ? '---' : <AnimatedNumber target={res.allocation} />}
                  <span className="text-sm font-bold text-white/20 ml-3 tracking-[0.2em] uppercase">$BILL</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right mr-4">
                  <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mb-1">Source</div>
                  <div className="text-[10px] font-bold text-white/40">{res.type}</div>
                </div>
                {res.allocation > 0 && (
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=Verified my $BILL allocation on the Revelation Terminal. 💎`, '_blank')}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all active:scale-90"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
