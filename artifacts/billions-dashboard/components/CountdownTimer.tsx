'use client';

import { useEffect, useState } from 'react';

const TARGET = new Date('2026-05-04T00:00:00Z');
const SERVER_NOW = new Date('2026-05-03T00:00:00Z');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function getTimeLeft(now = Date.now()): TimeLeft {
  const diff = TARGET.getTime() - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
    expired: false,
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const [prevValue, setPrevValue] = useState(value);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    if (value !== prevValue) {
      setAnimKey((k) => k + 1);
      setPrevValue(value);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="glass-card rounded-lg flex items-center justify-center relative overflow-hidden"
        style={{
          width: 'clamp(60px, 14vw, 84px)',
          height: 'clamp(68px, 16vw, 96px)',
          border: '1px solid rgba(0,200,212,0.15)',
        }}
      >
        <span
          key={animKey}
          className="font-black animate-count-up"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: 'clamp(24px, 6vw, 36px)',
            color: '#00c8d4',
            textShadow: '0 0 8px rgba(0,200,212,0.4)',
          }}
        >
          {String(value).padStart(2, '0')}
        </span>
        <div
          className="absolute bottom-0 left-4 right-4 h-px"
          style={{ background: 'rgba(0,200,212,0.2)' }}
        />
      </div>
      <span
        className="text-xs uppercase tracking-widest opacity-40"
        style={{ color: '#00c8d4', fontFamily: "'Share Tech Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <div
      className="text-xl font-black mt-3 opacity-30"
      style={{ color: '#cc0088', fontFamily: "'Orbitron', monospace" }}
    >
      :
    </div>
  );
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(SERVER_NOW.getTime()));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return (
      <div className="flex gap-2 sm:gap-3 justify-center items-start">
        <TimeUnit value={timeLeft.days} label="DAYS" />
        <Colon />
        <TimeUnit value={timeLeft.hours} label="HRS" />
        <Colon />
        <TimeUnit value={timeLeft.minutes} label="MIN" />
        <Colon />
        <TimeUnit value={timeLeft.seconds} label="SEC" />
      </div>
    );
  }

  if (timeLeft.expired) {
    return (
      <div className="text-center py-4">
        <span
          className="text-2xl font-black"
          style={{ fontFamily: "'Orbitron', monospace", color: '#00c8d4' }}
        >
          TGE IS LIVE
        </span>
      </div>
    );
  }

  return (
    <div className="flex gap-2 sm:gap-3 justify-center items-start">
      <TimeUnit value={timeLeft.days} label="DAYS" />
      <Colon />
      <TimeUnit value={timeLeft.hours} label="HRS" />
      <Colon />
      <TimeUnit value={timeLeft.minutes} label="MIN" />
      <Colon />
      <TimeUnit value={timeLeft.seconds} label="SEC" />
    </div>
  );
}
