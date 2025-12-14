'use client';

import { motion } from 'framer-motion';
import Logo from './Logo';

interface FooterProps {
  onTrySystem: () => void;
}

export default function Footer({ onTrySystem }: FooterProps) {
  return (
    <footer className="py-12 px-6 border-t border-[#9AA4B2]/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={40} />
              <span
                className="text-2xl font-bold"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                <span className="text-[#E6EAF0]">Aether</span>
                <span className="text-[#00E0FF]">Drive</span>
              </span>
            </div>
            <p className="text-[#9AA4B2] text-sm max-w-sm mb-6">
              The Intelligent Pulse Behind Every Vehicle. Transforming fleet maintenance from reactive to predictive.
            </p>
            <button onClick={onTrySystem} className="btn-primary text-sm">
              Try the System
            </button>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[#E6EAF0] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Dashboard', href: '#dashboard' },
                { label: 'Architecture', href: '#architecture' },
                { label: 'Voice Demo', href: '#voice' },
                { label: 'Impact', href: '#impact' },
                { label: 'Team', href: '#team' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[#9AA4B2] hover:text-[#00E0FF] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-[#E6EAF0] font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms of Service', href: '#' },
                { label: 'Cookie Policy', href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#9AA4B2] hover:text-[#00E0FF] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#9AA4B2]/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#9AA4B2] text-sm">
            &copy; {new Date().getFullYear()} AetherDrive. All rights reserved.
          </p>
          <p className="text-[#9AA4B2] text-sm">
            Built with <span className="text-[#00E0FF]">Next.js</span>,{' '}
            <span className="text-[#00E0FF]">Tailwind</span>, and{' '}
            <span className="text-[#00E0FF]">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
