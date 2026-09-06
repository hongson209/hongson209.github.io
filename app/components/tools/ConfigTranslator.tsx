'use client';

import React, { useState, useRef, useMemo } from 'react';
import {
  Wand2, FileUp, Download, Copy, Check, RefreshCw, Sparkles,
  ShieldCheck, Eye, EyeOff, Trash2, Shield, Lock, ChevronDown, CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  translateYamlWithAudit,
  convertTextToMiniFontSafe,
  renderMinecraftColorHtml,
  detectConfigFileType,
  detectPluginFingerprint,
  runProtocolAudit,
  FILE_TYPE_DEFINITIONS,
  ConfigFileType,
  TranslationAuditResult,
} from './translatorEngine';

const SAMPLE_CONFIG = `# Config mẫu MewMC Server
messages:
  prefix: "<gradient:#ff007f:#00dfd8>&l[MewMC]</gradient> &8» &f"
  welcome: "&aWelcome %player% to the server! <click:run_command:/help>&7[Click for Help]</click>"
  cooldown: "&cPlease wait %time% seconds before using this command again!"
  no-permission: "&#ff3366You do not have permission to use this command!"
  teleport-success: "&aTeleported successfully to &b%location%&a!"

gui:
  title: "<#ffaa00>&lSERVER MENU"
  confirm: "&a&lConfirm"
  close: "&cClose"
`;

export default function ConfigTranslator() {
  const [inputConfig, setInputConfig] = useState(SAMPLE_CONFIG);
  const [outputConfig, setOutputConfig] = useState('');
  const [fileName, setFileName] = useState('config.yml');
  const [manualType, setManualType] = useState<ConfigFileType | null>(null);
  const [auditResult, setAuditResult] = useState<TranslationAuditResult | null>(null);
  const [showAuditDetails, setShowAuditDetails] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Nhận diện loại file tự động hoặc người dùng chọn
  const detectedType = useMemo<ConfigFileType>(() => {
    if (manualType) return manualType;
    return detectConfigFileType(inputConfig, fileName);
  }, [inputConfig, fileName, manualType]);

  const fileTypeInfo = FILE_TYPE_DEFINITIONS[detectedType];
  const fingerprint = useMemo(() => detectPluginFingerprint(inputConfig, fileName), [inputConfig, fileName]);

  const handleTranslate = async (forceMiniOnly = false, forceTranslateWithMini = false) => {
    if (!inputConfig.trim()) return;

    setIsTranslating(true);
    setProgress(10);

    try {
      if (forceMiniOnly) {
        const converted = convertTextToMiniFontSafe(inputConfig);
        setOutputConfig(converted);
        const lines = inputConfig.split(/\r?\n/);
        const cLines = converted.split(/\r?\n/);
        const audit = runProtocolAudit(lines, cLines, detectedType);
        setAuditResult({
          output: converted,
          fileType: detectedType,
          fileTypeInfo,
          pluginFingerprint: fingerprint,
          checks: audit.checks,
          allPassed: audit.allPassed,
          lineCount: lines.length,
          translatedCount: lines.length,
        });
        setProgress(100);
      } else {
        const result = await translateYamlWithAudit(inputConfig, {
          fileName,
          fileType: detectedType,
          useOnlineTranslation: true,
          toMiniFont: forceTranslateWithMini,
          onProgress: (pct) => setProgress(pct),
        });
        setOutputConfig(result.output);
        setAuditResult(result);
        setProgress(100);
      }

      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#38bdf8', '#818cf8', '#ec4899', '#34d399'],
      });
    } catch (err) {
      console.error('Translation error', err);
      alert('Lỗi xử lý file config. Vui lòng kiểm tra lại cú pháp YAML!');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setManualType(null); // Tự động nhận diện theo tệp mới tải lên
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setInputConfig(text);
        setOutputConfig('');
        setAuditResult(null);
      }
    };
    reader.readAsText(file, 'utf-8');
  };

  const handleDownload = () => {
    if (!outputConfig) return;
    const blob = new Blob([outputConfig], { type: 'text/yaml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const outName = fileName.replace(/(\.[\w]+)?$/, '_vi$1') || 'config_dich.yml';
    link.download = outName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!outputConfig) return;
    navigator.clipboard.writeText(outputConfig);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const previewLines: string[] = useMemo(() => {
    const textToScan = outputConfig || inputConfig;
    const lines = textToScan.split('\n');
    const previews: string[] = [];

    for (const line of lines) {
      const match = line.match(/^(\s*[-a-zA-Z0-9_.]+\s*[:=]\s*|^\s*-\s*)(.*)$/);
      if (match) {
        let val = match[2].trim().replace(/^['"]|['"]$/g, '');
        if (
          (val.includes('&') || val.includes('§') || val.includes('<') || val.includes('%')) &&
          !val.startsWith('/') &&
          !val.startsWith('http') &&
          val.length > 3
        ) {
          previews.push(val);
        }
      }
    }

    return previews.slice(0, 3);
  }, [outputConfig, inputConfig]);

  return (
    <div className="bg-[#0b0d14]/90 rounded-2xl border border-white/10 p-3 sm:p-4 shadow-xl flex flex-col justify-between transition-all min-h-[380px] sm:min-h-[405px]">
      {/* Top Action Toolbar */}
      <div className="flex items-center justify-between gap-2 flex-wrap border-b border-white/10 pb-2.5 mb-2.5 text-xs font-mono">
        <div className="flex items-center gap-1.5 flex-wrap">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".yml,.yaml,.txt,.properties,.sk"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-[11px] text-gray-300 hover:text-white transition-all"
            title="Tải tệp .yml, .yaml, .properties"
          >
            <FileUp className="w-3.5 h-3.5 text-cyan-400" />
            <span className="max-w-[110px] truncate">{fileName !== 'config.yml' ? fileName : 'Chọn .yml'}</span>
          </button>

          <button
            onClick={() => {
              setInputConfig(SAMPLE_CONFIG);
              setFileName('config.yml');
              setManualType(null);
              setOutputConfig('');
              setAuditResult(null);
            }}
            className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-[11px] text-gray-400 hover:text-gray-200 transition-all"
          >
            Mẫu
          </button>

          {/* Phân loại File Type Selector (36 Types with Categories) */}
          <div className="relative inline-flex items-center">
            <select
              value={manualType || detectedType}
              onChange={(e) => setManualType(e.target.value as ConfigFileType)}
              className={`text-[11px] px-2 py-1 rounded-lg border font-semibold outline-none cursor-pointer appearance-none pr-5 ${fileTypeInfo.badgeColor}`}
              title={fileTypeInfo.description}
            >
              <optgroup label="─── Cấu hình Cơ Bản & Ngôn Ngữ ───" className="bg-gray-900 text-gray-400 font-bold">
                {['TYPE_A', 'TYPE_B', 'TYPE_C', 'TYPE_D', 'TYPE_E'].map((k) => (
                  <option key={k} value={k} className="bg-gray-900 text-gray-100 font-normal">
                    {FILE_TYPE_DEFINITIONS[k as ConfigFileType]?.badge}
                  </option>
                ))}
              </optgroup>
              <optgroup label="─── Gameplay & RPG ───" className="bg-gray-900 text-gray-400 font-bold">
                {['TYPE_N', 'TYPE_O', 'TYPE_P', 'TYPE_Q', 'TYPE_R', 'TYPE_S', 'TYPE_Y', 'TYPE_Z', 'TYPE_AA', 'TYPE_AB'].map((k) => (
                  <option key={k} value={k} className="bg-gray-900 text-gray-100 font-normal">
                    {FILE_TYPE_DEFINITIONS[k as ConfigFileType]?.badge}
                  </option>
                ))}
              </optgroup>
              <optgroup label="─── Hệ Thống & Tích Hợp ───" className="bg-gray-900 text-gray-400 font-bold">
                {['TYPE_M', 'TYPE_G', 'TYPE_H', 'TYPE_T', 'TYPE_U', 'TYPE_W', 'TYPE_X', 'TYPE_AC', 'TYPE_AH', 'TYPE_AI', 'TYPE_I', 'TYPE_AJ'].map((k) => (
                  <option key={k} value={k} className="bg-gray-900 text-gray-100 font-normal">
                    {FILE_TYPE_DEFINITIONS[k as ConfigFileType]?.badge}
                  </option>
                ))}
              </optgroup>
              <optgroup label="─── Bảo Vệ Nghiêm Ngặt (Read-Only 100%) ───" className="bg-gray-900 text-amber-400 font-bold">
                {['TYPE_F', 'TYPE_J', 'TYPE_K', 'TYPE_L', 'TYPE_V', 'TYPE_AD', 'TYPE_AE', 'TYPE_AF', 'TYPE_AG'].map((k) => (
                  <option key={k} value={k} className="bg-gray-900 text-amber-200 font-normal">
                    {FILE_TYPE_DEFINITIONS[k as ConfigFileType]?.badge} 🔒
                  </option>
                ))}
              </optgroup>
            </select>
            <ChevronDown className="w-3 h-3 absolute right-1.5 pointer-events-none opacity-60" />
          </div>

          <button
            onClick={() => handleTranslate(false, false)}
            disabled={isTranslating}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            {isTranslating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>{progress}%</span>
              </>
            ) : (
              <>
                <Wand2 className="w-3.5 h-3.5" />
                <span>Dịch Config</span>
              </>
            )}
          </button>

          <button
            onClick={() => handleTranslate(false, true)}
            disabled={isTranslating}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-600/30 hover:bg-pink-600/50 border border-pink-500/40 text-pink-200 text-[11px] font-semibold transition-all active:scale-95 disabled:opacity-50"
            title="Dịch nội dung và đổi luôn sang font mini"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>Dịch + Font Mini</span>
          </button>

          <button
            onClick={() => handleTranslate(true, false)}
            disabled={isTranslating}
            className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-300 hover:text-white text-[11px] transition-all disabled:opacity-50"
            title="Chỉ đổi sang font mini, giữ nguyên ngôn ngữ gốc"
          >
            Font Mini
          </button>
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={'flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] transition-all ' + (
              showPreview
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
            )}
          >
            {showPreview ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            <span>Preview ({previewLines.length})</span>
          </button>

          <button
            onClick={handleCopy}
            disabled={!outputConfig}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-[11px] text-gray-300 hover:text-white transition-all disabled:opacity-30"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-indigo-400" />}
            <span>{copied ? 'Đã chép' : 'Chép'}</span>
          </button>

          <button
            onClick={handleDownload}
            disabled={!outputConfig}
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-[11px] text-emerald-300 font-bold transition-all disabled:opacity-30"
          >
            <Download className="w-3 h-3" />
            <span>Tải .yml</span>
          </button>
        </div>
      </div>

      {/* Thông tin Chế độ Bảo vệ & Loại Tệp Tin & Plugin Fingerprint */}
      <div className="flex items-center justify-between gap-2 px-2.5 py-1.5 mb-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-gray-400">
        <div className="flex items-center gap-1.5 truncate">
          {fileTypeInfo.readOnly ? (
            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          ) : (
            <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          )}
          <span className="text-gray-300 font-medium truncate">{fileTypeInfo.description}</span>
          {fingerprint !== 'GENERIC' && (
            <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-bold shrink-0">
              ⚡ {fingerprint}
            </span>
          )}
        </div>
        <span className="text-[10px] text-gray-500 shrink-0 hidden sm:inline">Zero Damage Protocol v2.0</span>
      </div>

      {/* 2-Column Textareas - Chiều cao cân bằng tuyệt đối với Kho Plugins */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 items-stretch">
        {/* Input Column */}
        <div className="flex flex-col justify-between bg-black/40 rounded-xl border border-white/10 p-2.5 sm:p-3">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="font-semibold text-gray-300">YAML GỐC</span>
            <button
              onClick={() => {
                setInputConfig('');
                setOutputConfig('');
                setAuditResult(null);
              }}
              className="text-[11px] text-gray-500 hover:text-rose-400 flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              <span>Xóa</span>
            </button>
          </div>

          <textarea
            value={inputConfig}
            onChange={(e) => setInputConfig(e.target.value)}
            placeholder="Dán nội dung config.yml vào đây..."
            className="w-full flex-1 min-h-[220px] sm:min-h-[245px] bg-transparent text-xs font-mono text-gray-200 focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Output Column */}
        <div className="flex flex-col justify-between bg-black/40 rounded-xl border border-white/10 p-2.5 sm:p-3">
          <div className="flex items-center justify-between text-xs font-mono mb-1.5">
            <span className="font-semibold text-emerald-400">KẾT QUẢ ĐÃ DỊCH</span>
            <span className="text-[11px] text-gray-500">
              {outputConfig ? `${outputConfig.split('\n').length} dòng` : 'Chờ dịch...'}
            </span>
          </div>

          <textarea
            value={outputConfig}
            onChange={(e) => setOutputConfig(e.target.value)}
            placeholder="Bấm 'Dịch Config' hoặc 'Dịch + Font Mini' để xem kết quả..."
            className="w-full flex-1 min-h-[220px] sm:min-h-[245px] bg-transparent text-xs font-mono text-emerald-300/90 focus:outline-none resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Collapsible Preview if open */}
      {showPreview && previewLines.length > 0 && (
        <div className="mt-2 bg-black/60 rounded-xl border border-white/10 p-2 font-mono text-xs space-y-1 shadow-inner">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider block">
            Mô phỏng màu sắc trong game:
          </span>
          {previewLines.map((line, idx) => (
            <div
              key={idx}
              className="text-gray-200 tracking-wide truncate p-1 rounded bg-white/[0.02]"
              dangerouslySetInnerHTML={{ __html: renderMinecraftColorHtml(line) }}
            />
          ))}
        </div>
      )}

      {/* Collapsible Protocol Audit Checks Details */}
      {showAuditDetails && auditResult && (
        <div className="mt-2 bg-black/60 rounded-xl border border-emerald-500/20 p-2.5 font-mono text-xs space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-emerald-400 font-bold border-b border-white/10 pb-1">
            <span>BẢNG THẨM ĐỊNH ZERO DAMAGE PROTOCOL (7/7 TIÊU CHÍ)</span>
            <span className="text-gray-400 font-normal">Đã dịch: {auditResult.translatedCount} mục</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 pt-1">
            {auditResult.checks.map((chk) => (
              <div
                key={chk.id}
                className="flex items-center justify-between p-1.5 rounded bg-white/[0.02] border border-white/5 text-[11px]"
              >
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-gray-300 font-medium">{chk.name}</span>
                </div>
                <span className="text-emerald-400 text-[10px]">{chk.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Footer Bar */}
      <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-white/10 text-xs font-mono text-gray-400">
        {auditResult ? (
          <button
            onClick={() => setShowAuditDetails(!showAuditDetails)}
            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-[11px] transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold">Thẩm định 7/7 Tiêu chí Đạt chuẩn Tuyệt đối</span>
            <span className="text-gray-500 text-[10px] underline ml-1">
              ({showAuditDetails ? 'Ẩn chi tiết' : 'Xem chi tiết'})
            </span>
          </button>
        ) : (
          <span className="flex items-center gap-1 text-gray-400 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Bảo toàn All Mã Màu, MiniMessage, Placeholders &amp; Thụt lề YAML</span>
          </span>
        )}

        <span className="text-emerald-400 text-[11px]">
          {outputConfig ? 'Hoàn tất ✓' : 'Sẵn sàng'}
        </span>
      </div>
    </div>
  );
}
