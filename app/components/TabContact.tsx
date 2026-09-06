'use client';

import React, { useState } from 'react';
import { Mail, Check, Copy, Send, MessageSquare, ArrowUpRight, Github, FolderGit2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TabContact() {
  const [copied, setCopied] = useState(false);
  const email = '4h3svn@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#ec4899', '#38bdf8'],
    });

    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  return (
    <div className="space-y-2.5">
      {/* Email Card */}
      <div className="bg-card/90 rounded-xl border border-card-border p-3 shadow-md backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/40 transition-all">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="p-1 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Mail className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Liên Hệ Công Việc (Email)
            </span>
          </div>
          <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Active
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 bg-white/[0.03] p-2.5 rounded-lg border border-white/5">
          <span className="text-sm font-mono font-bold text-white tracking-wide truncate">
            {email}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium transition-all shadow-md active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span className="text-emerald-200">Đã Sao Chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao Chép Mail</span>
                </>
              )}
            </button>

            <a
              href={'mailto:' + email}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              title="Gửi mail"
            >
              <Send className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 3 Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <a
          href="https://discord.gg/5uq862p3W7"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card/90 rounded-2xl border border-card-border p-3.5 sm:p-4 shadow-md flex items-center justify-between group hover:border-[#5865F2]/60 hover:bg-[#151829] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#5865F2]/20 text-[#5865F2] border border-[#5865F2]/30">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm group-hover:text-[#5865F2] transition-colors">
                Discord MewMC
              </h4>
              <p className="text-xs text-gray-400">Server cộng đồng</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#5865F2]" />
        </a>

        <a
          href="https://github.com/hongson209"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card/90 rounded-2xl border border-card-border p-3.5 sm:p-4 shadow-md flex items-center justify-between group hover:border-white/50 hover:bg-[#151829] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/[0.05] text-white border border-white/10">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                GitHub
              </h4>
              <p className="text-xs text-gray-400">@hongson209</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white" />
        </a>

        <a
          href="https://github.com/orgs/Kotoba-Studio/repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-card/90 rounded-2xl border border-card-border p-3.5 sm:p-4 shadow-md flex items-center justify-between group hover:border-purple-500/60 hover:bg-[#151829] transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm group-hover:text-purple-300 transition-colors">
                Kotoba Repos
              </h4>
              <p className="text-xs text-gray-400">Dự án tổ chức</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-purple-300" />
        </a>
      </div>
    </div>
  );
}

