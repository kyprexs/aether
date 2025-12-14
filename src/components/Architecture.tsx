'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Brain, LineChart, MessageSquare, BarChart3 } from 'lucide-react';
import { architectureNodes } from '@/lib/mockData';

const icons = {
  sensors: Cpu,
  ai: Brain,
  predictive: LineChart,
  engagement: MessageSquare,
  feedback: BarChart3,
};

export default function Architecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <section id="architecture" className="py-24 px-6 bg-[#0A0E1A]/50">
      <div className="max-w-7xl mx-auto">
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
            System <span className="text-[#00E0FF]">Architecture</span>
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
            End-to-end intelligent pipeline from vehicle sensors to actionable insights
          </p>
        </motion.div>

        {/* Architecture flow */}
        <div className="relative">
          {/* Connection lines - desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00E0FF]/30 to-transparent transform -translate-y-1/2 z-0" />

          {/* Animated arrow flow */}
          <motion.div
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 z-0"
            style={{ transform: 'translateY(-50%)' }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#00E0FF] to-transparent"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
          </motion.div>

          {/* Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {architectureNodes.map((node, index) => {
              const Icon = icons[node.id as keyof typeof icons];
              const isActive = activeNode === node.id;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className={`card p-6 cursor-pointer transition-all h-full ${
                      isActive ? 'border-[#00E0FF] glow-cyan' : ''
                    }`}
                    onMouseEnter={() => setActiveNode(node.id)}
                    onMouseLeave={() => setActiveNode(null)}
                    onClick={() => setActiveNode(isActive ? null : node.id)}
                    whileHover={{ scale: 1.02 }}
                  >
                    {/* Icon */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                        isActive
                          ? 'bg-[#00E0FF]/20 text-[#00E0FF]'
                          : 'bg-[#00E0FF]/10 text-[#00E0FF]/70'
                      }`}
                    >
                      <Icon size={28} />
                    </div>

                    {/* Step number */}
                    <div className="text-xs text-[#9AA4B2] mb-2">Step {index + 1}</div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-[#E6EAF0] mb-2">
                      {node.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-[#9AA4B2] mb-4">{node.description}</p>

                    {/* Tech stack - expandable */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-[#9AA4B2]/20">
                            <div className="text-xs text-[#00E0FF] font-medium mb-2">
                              Technologies
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {node.tech.split(', ').map((tech, i) => (
                                <span
                                  key={i}
                                  className="text-xs px-2 py-1 rounded bg-[#00E0FF]/10 text-[#00E0FF]/80"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Arrow for mobile */}
                  {index < architectureNodes.length - 1 && (
                    <div className="flex justify-center my-4 lg:hidden">
                      <motion.svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          d="M12 5v14m0 0l-7-7m7 7l7-7"
                          stroke="#00E0FF"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Click hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center text-[#9AA4B2] text-sm mt-8"
        >
          Click or hover on each step to see the technology stack
        </motion.p>
      </div>
    </section>
  );
}
