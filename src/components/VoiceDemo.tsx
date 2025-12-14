'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';
import { voiceConversation } from '@/lib/mockData';

export default function VoiceDemo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showMessages, setShowMessages] = useState<number[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Waveform animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let phase = 0;

    const drawWaveform = () => {
      ctx.clearRect(0, 0, width, height);

      const barCount = 50;
      const barWidth = width / barCount - 2;
      const centerY = height / 2;

      for (let i = 0; i < barCount; i++) {
        const amplitude = isPlaying
          ? Math.sin(phase + i * 0.2) * 0.5 + Math.random() * 0.5
          : 0.1;
        const barHeight = amplitude * (height * 0.8);

        const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
        gradient.addColorStop(0, 'rgba(0, 224, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(0, 224, 255, 1)');
        gradient.addColorStop(1, 'rgba(0, 224, 255, 0.8)');

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * (barWidth + 2),
          centerY - barHeight / 2,
          barWidth,
          barHeight
        );
      }

      phase += 0.1;
      animationRef.current = requestAnimationFrame(drawWaveform);
    };

    drawWaveform();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

  // Auto-play messages
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setShowMessages((prev) => {
        if (prev.length >= voiceConversation.length) {
          setIsPlaying(false);
          return prev;
        }
        return [...prev, prev.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlay = () => {
    if (showMessages.length >= voiceConversation.length) {
      setShowMessages([]);
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section id="voice" className="py-24 px-6 bg-[#0A0E1A]/50">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Voice <span className="text-[#00E0FF]">Agent</span> Demo
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
            Natural language interaction for seamless driver communication
          </p>
        </motion.div>

        {/* Voice demo container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Waveform section */}
            <div className="flex flex-col items-center">
              <div className="w-full mb-6">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={100}
                  className="w-full h-24 rounded-lg bg-[#0A0E1A]"
                />
              </div>

              {/* Play button */}
              <button
                onClick={handlePlay}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl transition-all ${
                  isPlaying
                    ? 'bg-[#00E0FF]/20 text-[#00E0FF] border border-[#00E0FF]'
                    : 'btn-primary'
                }`}
              >
                {isPlaying ? (
                  <>
                    <Pause size={24} />
                    <span className="font-medium">Pause Demo</span>
                  </>
                ) : (
                  <>
                    <Play size={24} />
                    <span className="font-medium">Play Conversation</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2 mt-4 text-[#9AA4B2] text-sm">
                <Volume2 size={16} />
                <span>Simulated voice interaction</span>
              </div>
            </div>

            {/* Transcript section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-[#E6EAF0] mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00E0FF] animate-pulse" />
                Conversation Transcript
              </h3>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {voiceConversation.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: msg.speaker === 'Driver' ? -20 : 20 }}
                    animate={{
                      opacity: showMessages.includes(index) ? 1 : 0.3,
                      x: 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className={`flex ${
                      msg.speaker === 'Driver' ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-xl ${
                        msg.speaker === 'Driver'
                          ? 'bg-[#0A0E1A] border border-[#9AA4B2]/30'
                          : 'bg-[#00E0FF]/10 border border-[#00E0FF]/30'
                      }`}
                    >
                      <div
                        className={`text-xs mb-2 ${
                          msg.speaker === 'Driver' ? 'text-[#9AA4B2]' : 'text-[#00E0FF]'
                        }`}
                      >
                        {msg.speaker}
                      </div>
                      <p className="text-sm text-[#E6EAF0]">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {showMessages.length === 0 && (
                <p className="text-center text-[#9AA4B2] text-sm py-8">
                  Press play to start the voice demo
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
