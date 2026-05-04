import { Suspense } from 'react';
import Hero from '@/components/Hero';
import AddressLookup from '@/components/AddressLookup';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-12">
      {/* Allocation Checker at the very top */}
      <Suspense>
        <AddressLookup />
      </Suspense>

      <div className="w-full h-px bg-gray-200" />

      {/* Simplified Hero/Countdown below */}
      <Suspense>
        <Hero />
      </Suspense>
    </div>
  );
}
