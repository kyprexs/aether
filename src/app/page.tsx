'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import ProblemVision from '@/components/ProblemVision';
import Architecture from '@/components/Architecture';
import Dashboard from '@/components/Dashboard';
import VoiceDemo from '@/components/VoiceDemo';
import RCASection from '@/components/RCASection';
import ImpactMetrics from '@/components/ImpactMetrics';
import Footer from '@/components/Footer';
import TryModal from '@/components/TryModal';
import FloatingButton from '@/components/FloatingButton';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen">
      <Hero onTrySystem={openModal} />
      <ProblemVision />
      <Architecture />
      <Dashboard />
      <VoiceDemo />
      <RCASection />
      <ImpactMetrics />
      <Footer onTrySystem={openModal} />

      {/* Floating chat button */}
      <FloatingButton onClick={openModal} isOpen={isModalOpen} />

      {/* Try the System modal */}
      <TryModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  );
}
