'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, User } from 'lucide-react';
import { teamMembers } from '@/lib/mockData';

export default function TeamContact() {
  return (
    <section id="team" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
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
            Meet the <span className="text-[#00E0FF]">Team</span>
          </h2>
          <p className="text-[#9AA4B2] text-lg max-w-2xl mx-auto">
            Building the future of intelligent vehicle maintenance
          </p>
        </motion.div>

        {/* Team cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 hover:border-[#00E0FF]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                {/* Avatar placeholder */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00E0FF]/20 to-[#00E0FF]/5 flex items-center justify-center border border-[#00E0FF]/30">
                  <User size={32} className="text-[#00E0FF]" />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#E6EAF0] mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#00E0FF] text-sm mb-3">{member.role}</p>
                  <p className="text-[#9AA4B2] text-sm mb-4">{member.skills}</p>

                  {/* Social links */}
                  <div className="flex gap-3">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#0A0E1A] hover:bg-[#00E0FF]/10 transition-colors text-[#9AA4B2] hover:text-[#00E0FF]"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#0A0E1A] hover:bg-[#00E0FF]/10 transition-colors text-[#9AA4B2] hover:text-[#00E0FF]"
                    >
                      <Linkedin size={18} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="card p-8 text-center"
        >
          <h3
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Get in <span className="text-[#00E0FF]">Touch</span>
          </h3>
          <p className="text-[#9AA4B2] mb-6 max-w-lg mx-auto">
            Interested in learning more about AetherDrive or exploring partnership opportunities?
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hello@aetherdrive.io"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Mail size={18} />
              Contact Us
            </a>
            <a
              href="#"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <FileText size={18} />
              Demo Deck
            </a>
            <a
              href="#"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Github size={18} />
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
