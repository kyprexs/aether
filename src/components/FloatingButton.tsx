'use client';

import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface FloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function FloatingButton({ onClick, isOpen }: FloatingButtonProps) {
  if (isOpen) return null;

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 300 }}
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 p-4 rounded-full bg-[#00E0FF] text-[#0A0E1A] shadow-lg glow-cyan hover:scale-110 transition-transform"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageSquare size={24} />
      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#FFC857] text-[#0A0E1A] text-xs font-bold flex items-center justify-center">
        !
      </span>
    </motion.button>
  );
}
