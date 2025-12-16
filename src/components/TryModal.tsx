'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2, Maximize2, Minimize2, Calendar, FileText, Bell } from 'lucide-react';
import { vehicleData, scheduleResponse, rcaData, fleetStats, availableVehicles } from '@/lib/mockData';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  actions?: { label: string; action: string }[];
}

interface TryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickActions = [
  { label: 'Show predictions', query: 'Show predictions for AETHER0001' },
  { label: 'Check fleet status', query: 'Check fleet status' },
  { label: 'Book service', query: 'Confirm booking' },
  { label: 'Get RCA', query: 'Give RCA summary' },
  { label: 'Diagnose issue', query: 'Diagnose AETHER0012' },
];

export default function TryModal({ isOpen, onClose }: TryModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        "Hello! I'm the AetherDrive Assistant. I can help you with vehicle predictions, diagnostics, fleet status, service bookings, and RCA summaries. Try asking me something!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query: string): Message => {
    const lowerQuery = query.toLowerCase();

    // Extract VIN from query
    const vinMatch = query.match(/AETHER\d{4}/i);
    const vin = vinMatch ? vinMatch[0].toUpperCase() : null;

    // Check fleet status
    if (lowerQuery.includes('fleet') && lowerQuery.includes('status')) {
      const flaggedList = fleetStats.flagged_vehicles
        .map(v => `${v.vin} (${v.issue})`)
        .join(', ');
      return {
        role: 'assistant',
        content: `**Fleet Overview**

**${fleetStats.vehicles_connected}/${fleetStats.total_vehicles}** vehicles operational (**${fleetStats.health_percentage}%** uptime)

**${fleetStats.active_alerts}** vehicles flagged:
${fleetStats.flagged_vehicles.map(v => `- **${v.vin}** — ${v.issue}`).join('\n')}

Would you like details on any specific vehicle?`,
      };
    }

    // Diagnose specific vehicle
    if (lowerQuery.includes('diagnose') || lowerQuery.includes('diagnostic')) {
      if (vin && vehicleData[vin]) {
        const vehicle = vehicleData[vin];
        const statusColor = vehicle.status === 'critical' ? '**CRITICAL ALERT**' :
                           vehicle.status === 'warning' ? '**Warning**' : '**Healthy**';
        return {
          role: 'assistant',
          content: `**Diagnostics for ${vin}** (${vehicle.model})

${statusColor}

${vehicle.diagnostics}`,
          actions: vehicle.status !== 'healthy' ? [
            { label: 'Auto-book Service', action: 'book' },
            { label: 'Send Alert to Driver', action: 'alert' },
          ] : undefined,
        };
      } else if (vin) {
        return {
          role: 'assistant',
          content: `Vehicle not found in fleet.

**Available vehicles:** ${availableVehicles.join(', ')}`,
        };
      }
      return {
        role: 'assistant',
        content: `Please specify a vehicle VIN to diagnose.

**Example:** "Diagnose AETHER0012"

**Available vehicles:** ${availableVehicles.join(', ')}`,
      };
    }

    // Show predictions
    if (lowerQuery.includes('prediction') || lowerQuery.includes('show')) {
      const targetVin = vin || 'AETHER0001';
      const vehicle = vehicleData[targetVin];
      if (!vehicle) {
        return {
          role: 'assistant',
          content: `Vehicle not found. Available vehicles: ${availableVehicles.join(', ')}`,
        };
      }

      if (vehicle.predictions.length === 0) {
        return {
          role: 'assistant',
          content: `**Vehicle: ${vehicle.vin}** (${vehicle.model})

No active predictions. All systems nominal.`,
        };
      }

      const prediction = vehicle.predictions[0];
      return {
        role: 'assistant',
        content: `**Vehicle: ${vehicle.vin}** (${vehicle.model})

**Predictions:**
${vehicle.predictions.map(p => `- **${p.component.replace('_', ' ')}** — ${p.eta_days} days (confidence ${Math.round(p.confidence * 100)}%)`).join('\n')}

**Recommendation:** Service slot at Nexa Central, Dec 12, 10 AM.

Would you like me to confirm this booking?`,
        actions: [
          { label: 'Auto-book', action: 'book' },
          { label: 'Snooze Alert', action: 'snooze' },
        ],
      };
    }

    // Confirm booking
    if (lowerQuery.includes('confirm') || lowerQuery.includes('book') || lowerQuery.includes('yes')) {
      return {
        role: 'assistant',
        content: `**Booking Confirmed!**

- **Service Center:** ${scheduleResponse.service_center}
- **Date & Time:** ${new Date(scheduleResponse.slot).toLocaleString()}
- **Booking ID:** ${scheduleResponse.booking_id}

You'll receive a confirmation SMS shortly. Is there anything else I can help you with?`,
      };
    }

    // RCA summary
    if (lowerQuery.includes('rca') || lowerQuery.includes('root cause') || lowerQuery.includes('analysis')) {
      const rca = rcaData.AETHER0001;
      return {
        role: 'assistant',
        content: `**Root Cause Analysis Summary**

${rca.summary}

**Details:**
- **Affected Vehicles:** ${rca.details.affected_vehicles}/${rca.details.total_fleet}
- **Pattern:** ${rca.details.pattern}
- **Confidence:** ${Math.round(rca.details.confidence * 100)}%

**Recommendation:** ${rca.details.recommendation}`,
        actions: [
          { label: 'Send RCA to OEM', action: 'send_rca' },
          { label: 'Download PDF', action: 'download' },
        ],
      };
    }

    // Maintenance history
    if (lowerQuery.includes('history') || lowerQuery.includes('maintenance')) {
      const targetVin = vin || 'AETHER0001';
      const vehicle = vehicleData[targetVin];
      if (!vehicle) {
        return {
          role: 'assistant',
          content: `Vehicle not found. Available vehicles: ${availableVehicles.join(', ')}`,
        };
      }

      if (!vehicle.maintenanceHistory) {
        return {
          role: 'assistant',
          content: `**Maintenance History for ${vehicle.vin}**

No maintenance history available for this vehicle.`,
        };
      }

      return {
        role: 'assistant',
        content: `**Maintenance History for ${vehicle.vin}:**

${vehicle.maintenanceHistory.map(m => `- **${m.date}** — ${m.service} (${m.location})`).join('\n')}

**Next scheduled:** Dec 12, 2025 — Brake pad replacement.`,
      };
    }

    // Fuel efficiency
    if (lowerQuery.includes('fuel') || lowerQuery.includes('efficiency')) {
      const targetVin = vin || 'AETHER0001';
      const vehicle = vehicleData[targetVin];
      if (!vehicle || !vehicle.fuelEfficiency) {
        return {
          role: 'assistant',
          content: `Fuel efficiency data not available for this vehicle.`,
        };
      }

      const fuel = vehicle.fuelEfficiency;
      return {
        role: 'assistant',
        content: `**Fuel Efficiency for ${vehicle.vin}** (last 30 days):

- **Average:** ${fuel.average} km/L (${fuel.change > 0 ? '↑' : '↓'} ${Math.abs(fuel.change)}% from last month)
- **Best day:** ${fuel.bestDay.date} — ${fuel.bestDay.value} km/L (${fuel.bestDay.note})
- **Worst day:** ${fuel.worstDay.date} — ${fuel.worstDay.value} km/L (${fuel.worstDay.note})

**Tip:** ${fuel.tip}`,
      };
    }

    // Send alert to driver
    if (lowerQuery.includes('alert') || lowerQuery.includes('notify') || lowerQuery.includes('send')) {
      const targetVin = vin || 'AETHER0001';
      return {
        role: 'assistant',
        content: `**Alert Sent!**

Alert sent to driver of ${targetVin} via SMS and app notification.

**Message:** "Brake service recommended within 5 days. Slot pre-booked at Nexa Central, Dec 12, 10 AM. Reply CONFIRM or call to reschedule."`,
      };
    }

    // What can you do / help
    if (lowerQuery.includes('what can you do') || lowerQuery.includes('help') || lowerQuery.includes('capabilities')) {
      return {
        role: 'assistant',
        content: `I'm your fleet intelligence assistant. I can help you with:

- **Real-time vehicle diagnostics** — "Diagnose AETHER0012"
- **Predictive maintenance alerts** — "Show predictions for AETHER0001"
- **Service scheduling and booking** — "Book service" or "Confirm booking"
- **Fleet status overview** — "Check fleet status"
- **RCA (Root Cause Analysis) reports** — "Give RCA summary"
- **Fuel efficiency insights** — "Show fuel efficiency trends"
- **Maintenance history** — "What's the maintenance history for AETHER0001?"
- **Driver notifications** — "Send alert to driver"

Just ask about any vehicle in your fleet!`,
      };
    }

    // Snooze
    if (lowerQuery.includes('snooze')) {
      return {
        role: 'assistant',
        content: `**Alert Snoozed**

The alert has been snoozed for 24 hours. You'll be reminded again tomorrow.`,
      };
    }

    // Default / fallback response
    return {
      role: 'assistant',
      content: `I didn't quite catch that. Try asking about:

- **Vehicle predictions** — "Show predictions for AETHER0001"
- **Fleet status** — "Check fleet status"
- **Diagnostics** — "Diagnose AETHER0012"
- **Bookings** — "Book service" or "Confirm booking"
- **Maintenance history** or **fuel trends**

**Available vehicles:** ${availableVehicles.join(', ')}`,
    };
  };

  const handleSend = async (queryOverride?: string) => {
    const query = queryOverride || input.trim();
    if (!query || isLoading) return;

    if (!queryOverride) {
      setInput('');
    }
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);

    // Simulate API delay with typing indicator
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const response = processQuery(query);
    setMessages((prev) => [...prev, response]);
    setIsLoading(false);
  };

  const handleQuickAction = (query: string) => {
    handleSend(query);
  };

  const handleActionButton = (action: string) => {
    switch (action) {
      case 'book':
        handleSend('Confirm booking');
        break;
      case 'alert':
        handleSend('Send alert to driver');
        break;
      case 'snooze':
        handleSend('Snooze alert');
        break;
      case 'send_rca':
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '**RCA Report Sent!**\n\nThe RCA report has been sent to the OEM portal. They will receive a notification shortly.',
        }]);
        break;
      case 'download':
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '**Download Started!**\n\nYour RCA report PDF is being generated and will download shortly.',
        }]);
        break;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-50 flex flex-col transition-all duration-300 ${
              isExpanded
                ? 'inset-4 md:inset-[10%]'
                : 'bottom-4 right-4 left-4 md:left-auto md:w-[450px] h-[600px] max-h-[80vh]'
            }`}
          >
            <div className="card flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#9AA4B2]/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00E0FF]/20 flex items-center justify-center">
                    <Bot size={20} className="text-[#00E0FF]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#E6EAF0]">AetherDrive Assistant</h3>
                    <p className="text-xs text-[#9AA4B2]">Ask me anything about your fleet</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleExpand}
                    className="p-2 rounded-lg hover:bg-[#9AA4B2]/10 transition-colors text-[#9AA4B2]"
                    title={isExpanded ? 'Minimize' : 'Expand'}
                  >
                    {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-[#9AA4B2]/10 transition-colors text-[#9AA4B2]"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`flex items-start gap-2 max-w-[85%] ${
                        message.role === 'user' ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          message.role === 'user'
                            ? 'bg-[#00E0FF]/20'
                            : 'bg-[#00E0FF]/10'
                        }`}
                      >
                        {message.role === 'user' ? (
                          <User size={16} className="text-[#00E0FF]" />
                        ) : (
                          <Bot size={16} className="text-[#00E0FF]" />
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <div
                          className={`p-3 rounded-xl text-sm ${
                            message.role === 'user'
                              ? 'bg-[#00E0FF] text-[#0A0E1A]'
                              : 'bg-[#0A0E1A] text-[#E6EAF0] border border-[#9AA4B2]/20'
                          }`}
                        >
                          {message.content.split('\n').map((line, i) => (
                            <p key={i} className={i > 0 ? 'mt-2' : ''}>
                              {line.startsWith('**') && line.endsWith('**') ? (
                                <strong className="text-[#00E0FF]">{line.replace(/\*\*/g, '')}</strong>
                              ) : line.includes('**') ? (
                                <span dangerouslySetInnerHTML={{
                                  __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00E0FF]">$1</strong>')
                                }} />
                              ) : line.startsWith('- ') ? (
                                <span className="block ml-2">{line}</span>
                              ) : (
                                line
                              )}
                            </p>
                          ))}
                        </div>
                        {/* Action buttons */}
                        {message.actions && message.role === 'assistant' && (
                          <div className="flex flex-wrap gap-2">
                            {message.actions.map((action, i) => (
                              <button
                                key={i}
                                onClick={() => handleActionButton(action.action)}
                                className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#00E0FF]/10 text-[#00E0FF] hover:bg-[#00E0FF]/20 transition-colors border border-[#00E0FF]/30"
                              >
                                {action.action === 'book' && <Calendar size={12} />}
                                {action.action === 'download' && <FileText size={12} />}
                                {action.action === 'alert' && <Bell size={12} />}
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-[#0A0E1A] border border-[#9AA4B2]/20">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-[#00E0FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-[#00E0FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-[#00E0FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-sm text-[#9AA4B2]">Thinking...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick actions */}
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action.query)}
                      className="px-3 py-1.5 text-xs rounded-full bg-[#00E0FF]/10 text-[#00E0FF] hover:bg-[#00E0FF]/20 transition-colors"
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#9AA4B2]/20">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about predictions, diagnostics, fleet status..."
                    className="flex-1 px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#9AA4B2]/30 text-[#E6EAF0] placeholder-[#9AA4B2] focus:outline-none focus:border-[#00E0FF]/50 text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="p-3 rounded-xl bg-[#00E0FF] text-[#0A0E1A] hover:bg-[#00E0FF]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
