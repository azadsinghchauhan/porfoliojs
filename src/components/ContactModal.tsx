import React, { useState, useEffect } from 'react';
import { X, Github, Send, Check, Copy, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyGithub = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.githubUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#222823]/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div className="relative w-full max-w-lg bg-[#F8F6F0] border border-[#DDD5C5] rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 bg-[#F3EFE6] border-b border-[#DDD5C5]">
          <div className="flex items-center gap-2">
            <span className="font-serif text-lg font-semibold text-[#222823]">
              Connect with Azad Chauhan
            </span>
            <span className="text-[#C2A277]">✦</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EAE4D6] text-[#222823] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C2A277]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6">
          <p className="text-sm text-[#4E5D52] leading-relaxed">
            Interested in collaborating on AI/ML projects, exploring agentic pipelines, or discussing software systems? Connect directly via GitHub or submit a collaboration inquiry.
          </p>

          {/* Primary GitHub Connection Card */}
          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#DDD5C5] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#222823] text-[#F8F6F0] flex items-center justify-center">
                <Github className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-sans font-semibold text-[#222823]">
                  GitHub Profile
                </span>
                <span className="text-[11px] font-mono text-[#5F7063] truncate max-w-[200px]">
                  azadsinghchauhan
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyGithub}
                className="p-2 rounded-lg border border-[#DDD5C5] text-[#222823] hover:bg-[#F3EFE6] transition-colors text-xs flex items-center gap-1"
                title="Copy GitHub URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px] hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[#222823] text-[#F8F6F0] hover:bg-[#3D4A41] transition-colors text-xs flex items-center gap-1"
                title="Open GitHub"
              >
                <span className="text-[10px] font-semibold">Open</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Direct Inquiry Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#5F7063] font-semibold mb-1">
                  Topic / Project Area
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agentic Workflows, Predictive ML, Full-Stack"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD5C5] bg-[#FAF8F5] text-xs text-[#222823] focus:outline-none focus:border-[#222823] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-sans uppercase tracking-wider text-[#5F7063] font-semibold mb-1">
                  Message / Inquiry
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe your project goals or discussion topic..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#DDD5C5] bg-[#FAF8F5] text-xs text-[#222823] focus:outline-none focus:border-[#222823] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#222823] text-[#F8F6F0] text-xs font-sans tracking-widest uppercase font-semibold hover:bg-[#3D4A41] transition-all flex items-center justify-center gap-2"
              >
                <span>SEND INQUIRY</span>
                <Send className="w-3.5 h-3.5 text-[#C2A277]" />
              </button>
            </form>
          ) : (
            <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <Check className="w-8 h-8 text-emerald-600 mx-auto" />
              <h4 className="font-serif text-lg font-semibold text-emerald-900">
                Inquiry Logged
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Thank you. You can also connect directly via the GitHub profile anytime.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 text-xs font-semibold text-emerald-900 underline"
              >
                Send another message
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F3EFE6] border-t border-[#DDD5C5] text-center text-[11px] font-sans text-[#738477]">
          Verified identity: Azad Chauhan • GitHub: azadsinghchauhan
        </div>

      </div>
    </div>
  );
};
