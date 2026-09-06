'use client';

import React, { useState } from 'react';
import { Copy, Check, Type, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { convertTextToMiniFontSafe, SMALL_CAPS_MAP } from './translatorEngine';

export default function FontConverter() {
  const [inputText, setInputText] = useState('Chào mừng <player> đến với MewMC! Nhấn /help để xem hướng dẫn.');
  const [mode, setMode] = useState<'safe' | 'all'>('safe');
  const [copied, setCopied] = useState(false);

  const convertedText = React.useMemo(() => {
    if (mode === 'safe') {
      return convertTextToMiniFontSafe(inputText);
    } else {
      return Array.from(inputText).map((c) => {
        const lower = c.toLowerCase();
        return SMALL_CAPS_MAP[lower] || c;
      }).join('');
    }
  }, [inputText, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#38bdf8', '#818cf8', '#34d399'],
    });
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-[#0b0d14]/90 rounded-2xl border border-white/10 p-3 sm:p-4 shadow-xl flex flex-col justify-between transition-all min-h-[380px] sm:min-h-[405px]">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Type className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-white font-mono">
            FONT MINI (SMALL CAPS)
          </span>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-white/[0.04] p-0.5 rounded-lg border border-white/10 text-[11px] font-mono">
          <button
            onClick={() => setMode('safe')}
            className={'px-2.5 py-1 rounded-md transition-all ' + (
              mode === 'safe'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-gray-400 hover:text-white'
            )}
            title="Giữ nguyên mã màu và placeholder không bị đổi sang font mini"
          >
            Safe Token
          </button>
          <button
            onClick={() => setMode('all')}
            className={'px-2.5 py-1 rounded-md transition-all ' + (
              mode === 'all'
                ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                : 'text-gray-400 hover:text-white'
            )}
            title="Đổi toàn bộ ký tự sang font mini"
          >
            All Text
          </button>
        </div>
      </div>

      {/* 2-Column Textareas - Chiều cao cân bằng tuyệt đối với Kho Plugins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 items-stretch">
        {/* Input Pane */}
        <div className="flex flex-col justify-between bg-black/40 rounded-xl border border-white/10 p-2.5 sm:p-3">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-gray-300 font-semibold">VĂN BẢN GỐC</span>
            <button
              onClick={() => setInputText('')}
              className="text-[11px] text-gray-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Xóa</span>
            </button>
          </div>

          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập văn bản cần đổi sang Font Mini..."
            className="w-full flex-1 min-h-[220px] sm:min-h-[245px] bg-transparent text-xs font-mono text-gray-200 focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Output Pane */}
        <div className="flex flex-col justify-between bg-black/40 rounded-xl border border-white/10 p-2.5 sm:p-3">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="text-emerald-400 font-semibold">KẾT QUẢ FONT MINI</span>
            <span className="text-[11px] text-gray-500">
              {convertedText.length} ký tự
            </span>
          </div>

          <textarea
            value={convertedText}
            readOnly
            placeholder="Kết quả font mini..."
            className="w-full flex-1 min-h-[220px] sm:min-h-[245px] bg-transparent text-xs font-mono text-emerald-300 focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 text-xs font-mono text-gray-400">
        <span className="text-[11px] text-gray-500">
          Độ dài: {inputText.length} ký tự gốc &rarr; {convertedText.length} ký tự mini
        </span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition-all active:scale-95 shadow-sm"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'ĐÃ SAO CHÉP!' : 'SAO CHÉP FONT MINI'}</span>
        </button>
      </div>
    </div>
  );
}
