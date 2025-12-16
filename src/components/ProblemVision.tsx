'use client';

import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, RefreshCcw } from 'lucide-react';

const problems = [
  {
    icon: AlertTriangle,
    title: 'Unplanned Breakdowns',
    description: 'Lead to costly downtime & frustrated customers',
    stat: '30%+ revenue loss',
    source: 'Bosch 2024',
  },
  {
    icon: Calendar,
    title: 'Manual Scheduling',
    description: 'Overloaded bays & wasted service capacity',
    stat: '40% underutilization',
    source: 'EY 2024',
  },
  {
    icon: RefreshCcw,
    title: 'No RCA Loop',
    description: 'Repeat defects without root cause analysis',
    stat: '25% recurring issues',
    source: 'Industry Avg',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function ProblemVision() {
  return (
    <section id="problem-vision" className="py-24 px-6">
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
            The <span className="text-[#FFC857]">Problem</span>
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
            Traditional fleet management is reactive, inefficient, and leaves money on the table
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problem cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card p-6 hover:border-[#FFC857]/30 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-[#FFC857]/10 text-[#FFC857] group-hover:bg-[#FFC857]/20 transition-colors">
                    <problem.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#E6EAF0] mb-1">
                      {problem.title}
                    </h3>
                    <p className="text-[#9AA4B2] text-sm mb-2">
                      {problem.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#FFC857] font-medium">{problem.stat}</span>
                      <span className="text-[#9AA4B2] text-xs">— {problem.source}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Vision / Solution visual */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="card p-8 bg-gradient-to-br from-[#111315] to-[#0A0E1A]">
              <h3
                className="text-2xl font-bold mb-6 text-center"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                Our <span className="text-[#00E0FF]">Vision</span>
              </h3>

              {/* Before/After comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#FFC857]/5 border border-[#FFC857]/20">
                  <h4 className="text-[#FFC857] font-semibold mb-3 text-sm">Before AetherDrive</h4>
                  <ul className="space-y-2 text-sm text-[#9AA4B2]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC857]" />
                      Reactive maintenance
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC857]" />
                      Manual scheduling
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC857]" />
                      No data feedback
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFC857]" />
                      Customer frustration
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-[#00E0FF]/5 border border-[#00E0FF]/20">
                  <h4 className="text-[#00E0FF] font-semibold mb-3 text-sm">With AetherDrive</h4>
                  <ul className="space-y-2 text-sm text-[#9AA4B2]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF]" />
                      Predictive insights
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF]" />
                      Auto-scheduling
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF]" />
                      OEM feedback loop
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E0FF]" />
                      Proactive service
                    </li>
                  </ul>
                </div>
              </div>

              {/* Arrow indicator */}
              <div className="flex justify-center my-6">
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[#00E0FF]"
                >
                  <svg width="48" height="24" viewBox="0 0 48 24" fill="none">
                    <path
                      d="M0 12H44M44 12L34 2M44 12L34 22"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              {/* Result */}
              <div className="text-center p-4 rounded-lg bg-[#00E0FF]/10 border border-[#00E0FF]/30">
                <p className="text-[#00E0FF] font-semibold text-lg">
                  Intelligent, Predictive, Connected
                </p>
                <p className="text-[#9AA4B2] text-sm mt-1">
                  Transform vehicle maintenance from cost center to competitive advantage
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
