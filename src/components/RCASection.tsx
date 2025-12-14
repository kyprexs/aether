'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ChevronRight, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { rcaData } from '@/lib/mockData';

export default function RCASection() {
  const [selectedVehicle, setSelectedVehicle] = useState<'AETHER0001' | 'AETHER0002'>('AETHER0001');
  const rca = rcaData[selectedVehicle];

  const handleDownloadPDF = () => {
    // Simulate PDF download
    alert('PDF download would be triggered here. In production, this would generate a detailed RCA report.');
  };

  return (
    <section id="rca" className="py-24 px-6">
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
            OEM <span className="text-[#00E0FF]">Feedback</span> & RCA
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
            LLM-powered root cause analysis for continuous quality improvement
          </p>
        </motion.div>

        {/* RCA Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {/* Vehicle selector */}
          <div className="card p-4">
            <h3 className="text-sm font-medium text-[#E6EAF0] mb-4">Select Vehicle</h3>
            <div className="space-y-2">
              {(['AETHER0001', 'AETHER0002'] as const).map((vin) => (
                <button
                  key={vin}
                  onClick={() => setSelectedVehicle(vin)}
                  className={`w-full p-3 rounded-lg text-left transition-all flex items-center justify-between ${
                    selectedVehicle === vin
                      ? 'bg-[#00E0FF]/20 border border-[#00E0FF]/50 text-[#00E0FF]'
                      : 'bg-[#0A0E1A] border border-[#9AA4B2]/20 text-[#9AA4B2] hover:border-[#9AA4B2]/40'
                  }`}
                >
                  <span className="text-sm font-medium">{vin}</span>
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* RCA Summary Card */}
          <div className="md:col-span-2 card p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[#00E0FF]/10">
                  <FileText size={20} className="text-[#00E0FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#E6EAF0]">Root Cause Analysis</h3>
                  <p className="text-xs text-[#9AA4B2]">AI-generated insight for {selectedVehicle}</p>
                </div>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00E0FF]/10 text-[#00E0FF] hover:bg-[#00E0FF]/20 transition-colors text-sm"
              >
                <Download size={16} />
                Download PDF
              </button>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-lg bg-[#0A0E1A] mb-4">
              <p className="text-[#E6EAF0] leading-relaxed">{rca.summary}</p>
            </div>

            {/* Details grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#FFC857]/5 border border-[#FFC857]/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} className="text-[#FFC857]" />
                  <span className="text-xs text-[#FFC857]">Impact</span>
                </div>
                <div className="text-2xl font-bold text-[#E6EAF0]">
                  {rca.details.affected_vehicles}/{rca.details.total_fleet}
                </div>
                <div className="text-xs text-[#9AA4B2]">Vehicles affected</div>
              </div>

              <div className="p-4 rounded-lg bg-[#00E0FF]/5 border border-[#00E0FF]/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-[#00E0FF]" />
                  <span className="text-xs text-[#00E0FF]">Confidence</span>
                </div>
                <div className="text-2xl font-bold text-[#E6EAF0]">
                  {Math.round(rca.details.confidence * 100)}%
                </div>
                <div className="text-xs text-[#9AA4B2]">Analysis confidence</div>
              </div>
            </div>

            {/* Root cause & recommendation */}
            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-lg bg-[#0A0E1A]">
                <div className="text-xs text-[#9AA4B2] mb-1">Root Cause</div>
                <p className="text-sm text-[#E6EAF0]">{rca.details.root_cause}</p>
              </div>
              <div className="p-3 rounded-lg bg-[#00E0FF]/5 border border-[#00E0FF]/20">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-[#00E0FF]" />
                  <span className="text-xs text-[#00E0FF]">Recommendation</span>
                </div>
                <p className="text-sm text-[#E6EAF0]">{rca.details.recommendation}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
