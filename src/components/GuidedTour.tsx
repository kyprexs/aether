'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  content: string;
}

const tourSteps: TourStep[] = [
  {
    target: '#hero',
    title: 'Welcome to AetherDrive',
    content: 'The intelligent fleet management system that predicts vehicle issues before they happen.',
  },
  {
    target: '#problem-vision',
    title: 'The Problem We Solve',
    content: 'Unplanned breakdowns, manual scheduling, and no feedback loop to manufacturers.',
  },
  {
    target: '#architecture',
    title: 'AI-Powered Pipeline',
    content: 'Our system processes sensor data in real-time through multiple intelligent agents.',
  },
  {
    target: '#dashboard',
    title: 'Control Center',
    content: 'Monitor fleet health, view predictions, and schedule services automatically.',
  },
  {
    target: '#try-system-btn',
    title: 'Try It Out!',
    content: 'Chat with our AI assistant to see it in action!',
  },
];

interface GuidedTourProps {
  isRunning: boolean;
  onEnd: () => void;
}

export default function GuidedTour({ isRunning, onEnd }: GuidedTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isRunning) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }
  }, [isRunning, currentStep]);

  const updatePosition = () => {
    const step = tourSteps[currentStep];
    const element = document.querySelector(step.target);
    if (element) {
      const rect = element.getBoundingClientRect();
      // Scroll element into view if needed
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(() => {
        const newRect = element.getBoundingClientRect();
        setPosition({
          top: newRect.bottom + 20,
          left: Math.max(20, Math.min(newRect.left + newRect.width / 2 - 175, window.innerWidth - 370)),
        });
      }, 300);
    }
  };

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleEnd();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEnd = () => {
    setCurrentStep(0);
    onEnd();
  };

  const handleSkip = () => {
    handleEnd();
  };

  if (!isRunning) return null;

  return (
    <AnimatePresence>
      {isRunning && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[9998]"
            onClick={handleSkip}
          />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
            }}
            className="z-[9999] w-[350px] card p-5"
          >
            {/* Close button */}
            <button
              onClick={handleSkip}
              className="absolute top-3 right-3 p-1 rounded-lg hover:bg-[#9AA4B2]/10 text-[#9AA4B2]"
            >
              <X size={18} />
            </button>

            {/* Step indicator */}
            <div className="flex items-center gap-1 mb-3">
              {tourSteps.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentStep ? 'bg-[#00E0FF]' : 'bg-[#9AA4B2]/30'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-[#E6EAF0] mb-2">
              {tourSteps[currentStep].title}
            </h3>
            <p className="text-sm text-[#9AA4B2] mb-4">
              {tourSteps[currentStep].content}
            </p>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={handleSkip}
                className="text-sm text-[#9AA4B2] hover:text-[#E6EAF0] transition-colors"
              >
                Skip tour
              </button>
              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg bg-[#9AA4B2]/10 text-[#9AA4B2] hover:bg-[#9AA4B2]/20 transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 px-4 py-1.5 text-sm rounded-lg bg-[#00E0FF] text-[#0A0E1A] font-semibold hover:bg-[#00E0FF]/90 transition-colors"
                >
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < tourSteps.length - 1 && <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
