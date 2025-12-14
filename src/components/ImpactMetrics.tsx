'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { impactMetrics } from '@/lib/mockData';
import { TrendingUp, DollarSign, Users, Shield, Target, Truck } from 'lucide-react';

const icons = [TrendingUp, DollarSign, TrendingUp, Users, Shield, Truck];

function AnimatedCounter({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function ImpactMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="impact" className="py-24 px-6 bg-[#0A0E1A]/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Impact & <span className="text-[#00E0FF]">ROI</span>
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
            Measurable improvements across fleet operations
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {impactMetrics.map((metric, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6 text-center hover:border-[#00E0FF]/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#00E0FF]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#00E0FF]/20 transition-colors">
                  <Icon size={24} className="text-[#00E0FF]" />
                </div>
                <div
                  className="text-4xl md:text-5xl font-bold text-[#00E0FF] mb-2"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  <AnimatedCounter
                    value={metric.value}
                    suffix={metric.suffix}
                    isInView={isInView}
                  />
                </div>
                <div className="text-[#9AA4B2] text-sm">{metric.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[#9AA4B2] mb-6">
            Based on pilot deployments and industry benchmarks
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-4 py-2 rounded-full bg-[#00E0FF]/10 text-[#00E0FF] text-sm">
              Bosch 2024
            </div>
            <div className="px-4 py-2 rounded-full bg-[#00E0FF]/10 text-[#00E0FF] text-sm">
              EY Fleet Study
            </div>
            <div className="px-4 py-2 rounded-full bg-[#00E0FF]/10 text-[#00E0FF] text-sm">
              McKinsey Auto
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
