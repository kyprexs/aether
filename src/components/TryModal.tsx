'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2 } from 'lucide-react';
import { vehicleData, scheduleResponse, rcaData } from '@/lib/mockData';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const quickActions = [
  { label: 'Show predictions', query: 'Show predictions for AETHER0001' },
  { label: 'Book service', query: 'Confirm booking' },
  { label: 'Get RCA summary', query: 'Give RCA summary' },
];

export default function TryModal({ isOpen, onClose }: TryModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I\'m the AetherDrive Assistant. I can help you with vehicle predictions, service bookings, and RCA summaries. Try asking me something!',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const processQuery = (query: string): string => {
    const lowerQuery = query.toLowerCase();

    // Show predictions
    if (lowerQuery.includes('prediction') || lowerQuery.includes('show')) {
      const vehicle = vehicleData.AETHER0001;
      const prediction = vehicle.predictions[0];
      return `**Vehicle: ${vehicle.vin}** (${vehicle.model})

**Predictions:**
- **Brake pad wear** predicted in ~${prediction.eta_days} days (confidence ${Math.round(prediction.confidence * 100)}%)
- Engine temp trend shows steady rise

**Recommendation:** Service slot at Nexa Central, Dec 12, 10 AM.

Would you like me to confirm this booking?`;
    }

    // Confirm booking
    if (lowerQuery.includes('confirm') || lowerQuery.includes('book') || lowerQuery.includes('yes')) {
      return `**Booking Confirmed!**

- **Service Center:** ${scheduleResponse.service_center}
- **Date & Time:** ${new Date(scheduleResponse.slot).toLocaleString()}
- **Booking ID:** ${scheduleResponse.booking_id}

You'll receive a confirmation SMS shortly. Is there anything else I can help you with?`;
    }

    // RCA summary
    if (lowerQuery.includes('rca') || lowerQuery.includes('root cause') || lowerQuery.includes('analysis')) {
      const rca = rcaData.AETHER0001;
      return `**Root Cause Analysis Summary**

${rca.summary}

**Details:**
- **Affected Vehicles:** ${rca.details.affected_vehicles}/${rca.details.total_fleet}
- **Pattern:** ${rca.details.pattern}
- **Confidence:** ${Math.round(rca.details.confidence * 100)}%

**Recommendation:** ${rca.details.recommendation}

Would you like me to send this report to the OEM?`;
    }

    // Vehicle status
    if (lowerQuery.includes('status') || lowerQuery.includes('health')) {
      return `**Fleet Status Overview**

- **Fleet Health:** 87%
- **Active Alerts:** 4
- **Connected Vehicles:** 18/20

**AETHER0001 Status:**
- Connection: Online
- Engine Temp: Normal (trending up)
- Brake Pads: Attention needed (5 days)

Need more details on a specific vehicle?`;
    }

    // Default response
    return `I can help you with:

1. **Predictions** - "Show predictions for AETHER0001"
2. **Service Booking** - "Book a service" or "Confirm booking"
3. **RCA Reports** - "Give RCA summary"
4. **Vehicle Status** - "Show vehicle status"

What would you like to know?`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = processQuery(userMessage);
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const handleQuickAction = (query: string) => {
    setInput(query);
    setTimeout(() => handleSend(), 100);
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
            className="fixed bottom-4 right-4 left-4 md:left-auto md:w-[450px] h-[600px] max-h-[80vh] z-50 flex flex-col"
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
                    <p className="text-xs text-[#9AA4B2]">Ask me anything</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-[#9AA4B2]/10 transition-colors text-[#9AA4B2]"
                >
                  <X size={20} />
                </button>
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
                      <div
                        className={`p-3 rounded-xl text-sm ${
                          message.role === 'user'
                            ? 'bg-[#00E0FF] text-[#0A0E1A]'
                            : 'bg-[#0A0E1A] text-[#E6EAF0] border border-[#9AA4B2]/20'
                        }`}
                      >
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={i > 0 ? 'mt-2' : ''}>
                            {line.startsWith('**') ? (
                              <strong>{line.replace(/\*\*/g, '')}</strong>
                            ) : line.startsWith('- ') ? (
                              <span className="block ml-2">{line}</span>
                            ) : (
                              line
                            )}
                          </p>
                        ))}
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
                      <Loader2 size={16} className="text-[#00E0FF] animate-spin" />
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
                    placeholder="Ask about predictions, bookings, or RCA..."
                    className="flex-1 px-4 py-3 rounded-xl bg-[#0A0E1A] border border-[#9AA4B2]/30 text-[#E6EAF0] placeholder-[#9AA4B2] focus:outline-none focus:border-[#00E0FF]/50 text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSend}
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
