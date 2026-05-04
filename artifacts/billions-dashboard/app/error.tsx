'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 flex flex-col items-center gap-6 text-center">
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center"
        style={{ background: 'rgba(255,0,170,0.1)', border: '1px solid rgba(255,0,170,0.3)' }}
      >
        <AlertTriangle className="w-8 h-8" style={{ color: '#ff00aa' }} />
      </div>
      <div>
        <h2
          className="font-black text-2xl mb-2"
          style={{ fontFamily: "'Orbitron', monospace", color: '#ff00aa', textShadow: '0 0 15px rgba(255,0,170,0.6)' }}
        >
          SYSTEM ERROR
        </h2>
        <p className="text-sm opacity-60" style={{ color: '#ff00aa', fontFamily: "'Share Tech Mono', monospace" }}>
          {error?.message || 'An unexpected error occurred'}
        </p>
      </div>
      <button
        onClick={reset}
        className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all"
        style={{
          fontFamily: "'Orbitron', monospace",
          background: 'rgba(0,240,255,0.08)',
          border: '1px solid rgba(0,240,255,0.3)',
          color: '#00f0ff',
          boxShadow: '0 0 15px rgba(0,240,255,0.15)',
        }}
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  );
}
