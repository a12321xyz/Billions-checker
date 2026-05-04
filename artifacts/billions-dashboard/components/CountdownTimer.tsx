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
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-16 sm:w-16 sm:h-20 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
        <span className="text-2xl sm:text-3xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[8px] tracking-[0.3em] uppercase text-white/30 font-bold">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <div className="text-xl font-black mt-6 opacity-10 text-white">
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
        <span className="text-xl font-black text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
          THE REVELATION IS LIVE
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
