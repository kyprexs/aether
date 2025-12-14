'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle,
  ChevronDown,
  Clock,
  Wifi,
  WifiOff,
  X,
  FileText,
  Mic,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from 'recharts';
import { vehicleData, fleetStats, scheduleResponse, rcaData, voiceConversation } from '@/lib/mockData';

type VehicleKey = keyof typeof vehicleData;

export default function Dashboard() {
  const [selectedVin, setSelectedVin] = useState<VehicleKey>('AETHER0001');
  const [showVinDropdown, setShowVinDropdown] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showScheduleToast, setShowScheduleToast] = useState(false);
  const [scheduledSlot, setScheduledSlot] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const vehicle = vehicleData[selectedVin];
  const rca = rcaData[selectedVin as keyof typeof rcaData];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const chartData = vehicle.telemetry.map((t) => ({
    time: new Date(t.t).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    engine_temp: t.engine_temp,
    rpm: t.rpm / 100,
    vibration: t.vibration * 1000,
  }));

  // Add forecast data points
  const forecastData = [
    ...chartData,
    { time: '09:35', engine_temp: 108, rpm: 27, vibration: 60, forecast: true },
    { time: '09:40', engine_temp: 112, rpm: 28, vibration: 70, forecast: true },
    { time: '09:45', engine_temp: 118, rpm: 29, vibration: 85, forecast: true },
  ];

  const handleAutoSchedule = () => {
    setScheduledSlot(scheduleResponse.slot);
    setShowAlertModal(false);
    setShowScheduleToast(true);
    setTimeout(() => setShowScheduleToast(false), 5000);
  };

  const highSeverityPrediction = vehicle.predictions.find((p) => p.severity > 0.7);

  return (
    <section id="dashboard" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
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
            Live <span className="text-[#00E0FF]">Dashboard</span>
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
            Real-time telemetry, predictive alerts, and intelligent scheduling in action
          </p>
        </motion.div>

        {/* Dashboard container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="card p-6 bg-gradient-to-br from-[#111315] to-[#0A0E1A]"
        >
          {/* Top bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#9AA4B2]/20">
            {/* Vehicle selector */}
            <div className="relative">
              <button
                onClick={() => setShowVinDropdown(!showVinDropdown)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0A0E1A] border border-[#9AA4B2]/30 hover:border-[#00E0FF]/50 transition-colors"
              >
                <span className="text-[#E6EAF0]">{selectedVin}</span>
                <span className="text-[#9AA4B2] text-sm">({vehicle.model})</span>
                <ChevronDown size={16} className="text-[#9AA4B2]" />
              </button>

              <AnimatePresence>
                {showVinDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-full bg-[#0A0E1A] border border-[#9AA4B2]/30 rounded-lg overflow-hidden z-20"
                  >
                    {Object.keys(vehicleData).map((vin) => (
                      <button
                        key={vin}
                        onClick={() => {
                          setSelectedVin(vin as VehicleKey);
                          setShowVinDropdown(false);
                        }}
                        className={`w-full px-4 py-2 text-left hover:bg-[#00E0FF]/10 transition-colors ${
                          vin === selectedVin ? 'bg-[#00E0FF]/20 text-[#00E0FF]' : 'text-[#E6EAF0]'
                        }`}
                      >
                        {vin}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status indicators */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {vehicle.connected ? (
                  <>
                    <Wifi size={16} className="text-green-400" />
                    <span className="text-green-400 text-sm">Connected</span>
                  </>
                ) : (
                  <>
                    <WifiOff size={16} className="text-[#FFC857]" />
                    <span className="text-[#FFC857] text-sm">Offline</span>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-[#9AA4B2]">
                <Clock size={16} />
                <span className="text-sm font-mono">
                  {currentTime.toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>

          {/* Main dashboard grid */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Left column - Stats */}
            <div className="space-y-4">
              {/* Fleet Health */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Activity size={18} className="text-[#00E0FF]" />
                  <span className="text-sm text-[#9AA4B2]">Fleet Health</span>
                </div>
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#1a1f2e"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#00E0FF"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={`${fleetStats.health_percentage * 2.51} 251`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#00E0FF]">
                      {fleetStats.health_percentage}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Alerts */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={18} className="text-[#FFC857]" />
                  <span className="text-sm text-[#9AA4B2]">Active Alerts</span>
                </div>
                <div className="text-3xl font-bold text-[#FFC857]">
                  {fleetStats.active_alerts}
                </div>
                <div className="text-xs text-[#9AA4B2] mt-1">
                  {vehicle.predictions.length} for this vehicle
                </div>
              </div>

              {/* Next Service */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-[#00E0FF]" />
                  <span className="text-sm text-[#9AA4B2]">Next Service</span>
                </div>
                {scheduledSlot ? (
                  <div>
                    <div className="text-sm font-medium text-[#00E0FF]">
                      {new Date(scheduledSlot).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-[#9AA4B2]">
                      {new Date(scheduledSlot).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                    <div className="text-xs text-green-400 mt-1 flex items-center gap-1">
                      <CheckCircle size={12} />
                      Confirmed
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-[#9AA4B2]">No service scheduled</div>
                )}
              </div>
            </div>

            {/* Center - Chart and Alerts */}
            <div className="lg:col-span-2 space-y-4">
              {/* Telemetry Chart */}
              <div className="card p-4">
                <h3 className="text-sm font-medium text-[#E6EAF0] mb-4">
                  Telemetry & Forecast
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData}>
                      <defs>
                        <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00E0FF" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#00E0FF" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="vibGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FFC857" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#FFC857" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2f3e" />
                      <XAxis dataKey="time" stroke="#9AA4B2" tick={{ fontSize: 10 }} />
                      <YAxis stroke="#9AA4B2" tick={{ fontSize: 10 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0A0E1A',
                          border: '1px solid #00E0FF',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: '#E6EAF0' }}
                      />
                      <ReferenceLine y={110} stroke="#FFC857" strokeDasharray="5 5" label={{ value: 'Warning', fill: '#FFC857', fontSize: 10 }} />
                      <Area
                        type="monotone"
                        dataKey="engine_temp"
                        stroke="#00E0FF"
                        fill="url(#tempGradient)"
                        strokeWidth={2}
                        name="Engine Temp (°C)"
                      />
                      <Area
                        type="monotone"
                        dataKey="vibration"
                        stroke="#FFC857"
                        fill="url(#vibGradient)"
                        strokeWidth={2}
                        name="Vibration (x1000)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center gap-6 mt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#00E0FF]" />
                    <span className="text-xs text-[#9AA4B2]">Engine Temp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FFC857]" />
                    <span className="text-xs text-[#9AA4B2]">Vibration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-0.5 bg-[#FFC857]" style={{ borderStyle: 'dashed' }} />
                    <span className="text-xs text-[#9AA4B2]">Warning Threshold</span>
                  </div>
                </div>
              </div>

              {/* Alert Card */}
              {highSeverityPrediction && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card p-4 border-[#FFC857]/50 glow-amber"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#FFC857]/20">
                        <AlertTriangle size={20} className="text-[#FFC857]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#E6EAF0]">
                          Brake pad wear predicted
                        </h4>
                        <p className="text-sm text-[#9AA4B2] mt-1">
                          Estimated {highSeverityPrediction.eta_days} days remaining
                          (Confidence: {Math.round(highSeverityPrediction.confidence * 100)}%)
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowAlertModal(true)}
                        className="px-3 py-1.5 text-sm rounded bg-[#FFC857] text-[#0A0E1A] font-medium hover:bg-[#FFD77A] transition-colors"
                      >
                        Auto-schedule
                      </button>
                      <button className="px-3 py-1.5 text-sm rounded border border-[#9AA4B2]/30 text-[#9AA4B2] hover:border-[#9AA4B2] transition-colors">
                        Snooze
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Scheduling Panel */}
              <div className="card p-4">
                <h3 className="text-sm font-medium text-[#E6EAF0] mb-3">
                  Scheduling Panel
                </h3>
                {scheduledSlot ? (
                  <div className="flex items-center gap-4 p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                    <CheckCircle size={24} className="text-green-400" />
                    <div>
                      <div className="font-medium text-green-400">Service Scheduled</div>
                      <div className="text-sm text-[#9AA4B2]">
                        {scheduleResponse.service_center} •{' '}
                        {new Date(scheduledSlot).toLocaleString()}
                      </div>
                      <div className="text-xs text-[#9AA4B2] mt-1">
                        Booking ID: {scheduleResponse.booking_id}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-[#9AA4B2] p-3 rounded-lg bg-[#0A0E1A]">
                    No upcoming service scheduled. Click &quot;Auto-schedule&quot; on an alert to book.
                  </div>
                )}
              </div>
            </div>

            {/* Right column - RCA & Voice */}
            <div className="space-y-4">
              {/* RCA Quick Card */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={18} className="text-[#00E0FF]" />
                  <span className="text-sm font-medium text-[#E6EAF0]">RCA Summary</span>
                </div>
                {rca ? (
                  <p className="text-sm text-[#9AA4B2] leading-relaxed">{rca.summary}</p>
                ) : (
                  <p className="text-sm text-[#9AA4B2]">No RCA data available for this vehicle.</p>
                )}
              </div>

              {/* Voice History */}
              <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Mic size={18} className="text-[#00E0FF]" />
                  <span className="text-sm font-medium text-[#E6EAF0]">Voice Log</span>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {voiceConversation.slice(0, 2).map((msg, i) => (
                    <div key={i} className="text-sm">
                      <div className="text-xs text-[#00E0FF] mb-1">{msg.speaker}</div>
                      <div className="text-[#9AA4B2] bg-[#0A0E1A] p-2 rounded text-xs">
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alert Modal */}
      <AnimatePresence>
        {showAlertModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowAlertModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#E6EAF0]">
                  Schedule Service
                </h3>
                <button
                  onClick={() => setShowAlertModal(false)}
                  className="text-[#9AA4B2] hover:text-[#E6EAF0]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#0A0E1A]">
                  <div className="text-sm text-[#9AA4B2] mb-2">Diagnostic Details</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#9AA4B2]">Component:</span>
                      <span className="text-[#E6EAF0]">Brake Pads</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9AA4B2]">Severity:</span>
                      <span className="text-[#FFC857]">High (86%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9AA4B2]">ETA to failure:</span>
                      <span className="text-[#E6EAF0]">~5 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9AA4B2]">Confidence:</span>
                      <span className="text-[#00E0FF]">92%</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#00E0FF]/10 border border-[#00E0FF]/30">
                  <div className="text-sm text-[#00E0FF] mb-2">Recommended Slot</div>
                  <div className="text-[#E6EAF0] font-medium">
                    {scheduleResponse.service_center}
                  </div>
                  <div className="text-[#9AA4B2] text-sm">
                    {new Date(scheduleResponse.slot).toLocaleString()}
                  </div>
                </div>

                <button
                  onClick={handleAutoSchedule}
                  className="w-full btn-primary py-3"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {showScheduleToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 transform bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50"
          >
            <CheckCircle size={20} />
            <div>
              <div className="font-medium">Service Scheduled!</div>
              <div className="text-sm opacity-90">
                Booking ID: {scheduleResponse.booking_id}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
