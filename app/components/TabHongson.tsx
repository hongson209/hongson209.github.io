'use client';

import React, { useState, useEffect } from 'react';
import {
  Terminal, Layers, Wand2, Gamepad2, Bot, Clock, Calendar, MapPin,
  Sparkles, ExternalLink, Cake, FolderGit2, Globe
} from 'lucide-react';

function AgeCalculator() {
  const [ageDetails, setAgeDetails] = useState({
    years: 16,
    months: 11,
    days: 17,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateAge = () => {
      const birthDate = new Date('2009-09-19T00:00:00+07:00');
      const now = new Date();

      let years = now.getFullYear() - birthDate.getFullYear();
      let months = now.getMonth() - birthDate.getMonth();
      let days = now.getDate() - birthDate.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setAgeDetails({ years, months, days, hours, minutes, seconds });
    };

    updateAge();
    const interval = setInterval(updateAge, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card/90 rounded-2xl border border-card-border p-3 sm:p-3.5 shadow-md backdrop-blur-md relative overflow-hidden group hover:border-indigo-500/40 transition-all flex-1 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Clock className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Tuổi hiện tại
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            GMT+7 (VN)
          </span>
        </div>

        <div className="flex items-baseline flex-wrap gap-2 sm:gap-3 my-2">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-black font-mono tracking-tight text-white group-hover:text-indigo-300 transition-colors">
              {ageDetails.years}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-400">tuổi</span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-indigo-400">
              {ageDetails.months}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-400">tháng</span>
          </div>

          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-cyan-400">
              {ageDetails.days}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-gray-400">ngày</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/5 text-center text-xs font-mono">
          <div className="bg-white/[0.03] rounded-lg p-1.5 border border-white/5">
            <div className="text-white font-semibold text-xs sm:text-sm">{ageDetails.hours}h</div>
            <div className="text-gray-400 text-[10px]">giờ</div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-1.5 border border-white/5">
            <div className="text-white font-semibold text-xs sm:text-sm">{ageDetails.minutes}m</div>
            <div className="text-gray-400 text-[10px]">phút</div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-1.5 border border-white/5">
            <div className="text-indigo-400 font-bold text-xs sm:text-sm">{ageDetails.seconds}s</div>
            <div className="text-gray-400 text-[10px]">giây</div>
          </div>
        </div>

        <div className="mt-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 mb-1">
            <span className="flex items-center gap-1.5 text-indigo-300">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Tiến trình tuổi {ageDetails.years} &rarr; {ageDetails.years + 1}</span>
            </span>
            <span className="text-pink-300 font-bold">96%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: '96%' }}
            />
          </div>
        </div>
      </div>

      <div className="mt-2.5 flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/5 font-mono">
        <span className="inline-flex items-center gap-1.5 text-indigo-300 bg-indigo-500/15 px-2.5 py-1 rounded-lg border border-indigo-500/30 font-semibold shadow-sm">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          19/09/2009
        </span>
        <span className="inline-flex items-center gap-1.5 text-gray-300 bg-white/[0.04] px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-rose-400" />
          Việt Nam 🇻🇳
        </span>
      </div>
    </div>
  );
}

function ChatGPTLogo({ className = 'w-5 h-5 sm:w-6 sm:h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z" />
    </svg>
  );
}

function ClaudeLogo({ className = 'w-5 h-5 sm:w-6 sm:h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" fill="#D97757" />
    </svg>
  );
}

function GeminiLogo({ className = 'w-5 h-5 sm:w-6 sm:h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#38BDF8" />
    </svg>
  );
}

function DeepSeekLogo({ className = 'w-5 h-5 sm:w-6 sm:h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M23.748 4.482c-.254-.124-.364.113-.512.234-.051.039-.094.09-.137.136-.372.397-.806.657-1.373.626-.829-.046-1.537.214-2.163.848-.133-.782-.575-1.248-1.247-1.548-.352-.156-.708-.311-.955-.65-.172-.241-.219-.51-.305-.774-.055-.16-.11-.323-.293-.35-.2-.031-.278.136-.356.276-.313.572-.434 1.202-.422 1.84.027 1.436.633 2.58 1.838 3.393.137.093.172.187.129.323-.082.28-.18.552-.266.833-.055.179-.137.217-.329.14a5.526 5.526 0 01-1.736-1.18c-.857-.828-1.631-1.742-2.597-2.458a11.365 11.365 0 00-.689-.471c-.985-.957.13-1.743.388-1.836.27-.098.093-.432-.779-.428-.872.004-1.67.295-2.687.684a3.055 3.055 0 01-.465.137 9.597 9.597 0 00-2.883-.102c-1.885.21-3.39 1.102-4.497 2.623C.082 8.606-.231 10.684.152 12.85c.403 2.284 1.569 4.175 3.36 5.653 1.858 1.533 3.997 2.284 6.438 2.14 1.482-.085 3.133-.284 4.994-1.86.47.234.962.327 1.78.397.63.059 1.236-.03 1.705-.128.735-.156.684-.837.419-.961-2.155-1.004-1.682-.595-2.113-.926 1.096-1.296 2.746-2.642 3.392-7.003.05-.347.007-.565 0-.845-.004-.17.035-.237.23-.256a4.173 4.173 0 001.545-.475c1.396-.763 1.96-2.015 2.093-3.517.02-.23-.004-.467-.247-.588zM11.581 18c-2.089-1.642-3.102-2.183-3.52-2.16-.392.024-.321.471-.235.763.09.288.207.486.371.739.114.167.192.416-.113.603-.673.416-1.842-.14-1.897-.167-1.361-.802-2.5-1.86-3.301-3.307-.774-1.393-1.224-2.887-1.298-4.482-.02-.386.093-.522.477-.592a4.696 4.696 0 011.529-.039c2.132.312 3.946 1.265 5.468 2.774.868.86 1.525 1.887 2.202 2.891.72 1.066 1.494 2.082 2.48 2.914.348.292.625.514.891.677-.802.09-2.14.11-3.054-.614z" fill="#4D6BFE" />
    </svg>
  );
}

function KimiLogo({ className = 'w-5 h-5 sm:w-6 sm:h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M21.846 0a1.923 1.923 0 110 3.846H20.15a.226.226 0 01-.227-.226V1.923C19.923.861 20.784 0 21.846 0z" fill="#1783FF" />
      <path d="M11.065 11.199l7.257-7.2c.137-.136.06-.41-.116-.41H14.3a.164.164 0 00-.117.051l-7.82 7.756c-.122.12-.302.013-.302-.179V3.82c0-.127-.083-.23-.185-.23H3.186c-.103 0-.186.103-.186.23V19.77c0 .128.083.23.186.23h2.69c.103 0 .186-.102.186-.23v-3.25c0-.069.025-.135.069-.178l2.424-2.406a.158.158 0 01.205-.023l6.484 4.772a7.677 7.677 0 003.453 1.283c.108.012.2-.095.2-.23v-3.06c0-.117-.07-.212-.164-.227a5.028 5.028 0 01-2.027-.807l-5.613-4.064c-.117-.078-.132-.279-.028-.381z" fill="#fff" />
    </svg>
  );
}

function AILogos() {
  const aiTools = [
    { name: 'ChatGPT', role: 'OpenAI GPT-4o', Icon: ChatGPTLogo },
    { name: 'Claude', role: 'Anthropic 3.5', Icon: ClaudeLogo },
    { name: 'Gemini', role: 'Google DeepMind', Icon: GeminiLogo },
    { name: 'DeepSeek', role: 'DeepSeek-V3 / R1', Icon: DeepSeekLogo },
    { name: 'Kimi', role: 'Moonshot AI', Icon: KimiLogo },
  ];

  return (
    <div className="bg-card/90 rounded-xl border border-card-border p-2.5 sm:p-3 shadow-md backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            AI Tech Stack
          </span>
        </div>
        <span className="text-xs font-mono text-gray-500">Official AI</span>
      </div>

      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {aiTools.map((tool) => {
          const Icon = tool.Icon;
          return (
            <div
              key={tool.name}
              className="group relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all duration-200 hover:scale-105 cursor-pointer"
            >
              <div className="w-7 h-7 flex items-center justify-center relative z-10 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.18)]">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-300 mt-1 truncate max-w-full relative z-10">
                {tool.name}
              </span>

              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-150 z-30 px-2 py-1 rounded bg-gray-950 border border-white/10 text-[10px] text-white whitespace-nowrap shadow-xl">
                {tool.role}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function MinecraftWidget() {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-[#151928] border border-card-border p-2 sm:p-2.5 shadow-md group hover:border-emerald-500/40 transition-all">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="p-0.5 px-1.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-pixel text-[8px]">
            MC
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Minecraft Server
          </span>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          Đang Làm
        </span>
      </div>

      <div className="flex items-center gap-2.5 my-0.5">
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-lg overflow-hidden bg-black/40 border border-emerald-500/30 p-0.5 flex-shrink-0 group-hover:scale-105 transition-transform">
          <img
            src="/mewmc.png"
            alt="MewMC"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <h4 className="font-bold text-white text-xs sm:text-sm truncate group-hover:text-emerald-300 transition-colors">
              MewMC Network
            </h4>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <p className="text-[10px] sm:text-[11px] text-gray-400 truncate">
            Server Minecraft hiện đại & cộng đồng năng động
          </p>
        </div>

        <a
          href="https://discord.gg/5uq862p3W7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white text-xs font-medium transition-all shadow flex-shrink-0 active:scale-95"
        >
          <span>Discord</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function TabHongson() {
  const [daysUntilBirthday, setDaysUntilBirthday] = useState<number>(14);

  useEffect(() => {
    const calcDays = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const today = new Date(currentYear, now.getMonth(), now.getDate());
      let nextBday = new Date(currentYear, 8, 19);

      if (today.getTime() > nextBday.getTime()) {
        nextBday = new Date(currentYear + 1, 8, 19);
      }

      const diffTime = nextBday.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDaysUntilBirthday(diffDays);
    };

    calcDays();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-2.5 items-stretch">
      {/* Left Column (Bio & Age) */}
      <div className="lg:col-span-6 flex flex-col justify-between gap-2 sm:gap-2.5">
        <div className="bg-card/90 rounded-2xl border border-card-border p-3 sm:p-3.5 shadow-md backdrop-blur-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                <Terminal className="w-4 h-4" />
              </span>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Giới Thiệu
              </h3>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-purple-300 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              Vibe Coder
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Tôi là <strong className="text-white font-semibold">Nguyễn Hồng Sơn</strong>, một{' '}
            <span className="text-gradient-purple font-semibold">Full Stack Vibe Coder</span> đến từ Việt Nam 🇻🇳.
            Đam mê xây dựng sản phẩm công nghệ hiện đại, kết hợp AI và Minecraft Ecosystem.
          </p>

          <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-white/5 font-mono text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/15 hover:scale-105 transition-all">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              Full Stack
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 hover:bg-purple-500/15 hover:scale-105 transition-all">
              <Wand2 className="w-3.5 h-3.5 text-purple-400" />
              Vibe Coder
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-500/15 hover:scale-105 transition-all">
              <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
              Minecraft
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-500/15 hover:scale-105 transition-all">
              <Bot className="w-3.5 h-3.5 text-cyan-400" />
              AI Tools
            </span>
          </div>

          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5 text-[11px] font-mono text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Định hướng: <strong className="text-gray-200 font-semibold">Web Full Stack, AI Tools &amp; Minecraft Plugins</strong></span>
          </div>
        </div>

        <AgeCalculator />
      </div>

      {/* Right Column */}
      <div className="lg:col-span-6 flex flex-col justify-between gap-2 sm:gap-2.5">
        <AILogos />
        <MinecraftWidget />

        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-indigo-950/30 border border-card-border p-2 sm:p-2.5 shadow-md group hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="p-0.5 px-1.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-pixel text-[8px]">
                KBS
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Kotoba Studio
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Plugins Free
            </span>
          </div>

          <div className="flex items-center gap-2.5 my-0.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-indigo-400 flex-shrink-0 group-hover:scale-105 transition-transform">
              <FolderGit2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-white text-xs sm:text-sm truncate group-hover:text-indigo-300 transition-colors">
                  Kotoba Studio Repositories
                </h4>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 truncate">
                Kho dự án mã nguồn mở &amp; plugins miễn phí
              </p>
            </div>

            <a
              href="https://github.com/orgs/Kotoba-Studio/repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-mono transition-all flex-shrink-0 shadow active:scale-95"
            >
              <span>View</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-cyan-950/30 border border-card-border p-2 sm:p-2.5 shadow-md group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <span className="p-0.5 px-1.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-pixel text-[8px]">
                DOM
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                Free Domain
              </span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Free Domain
            </span>
          </div>

          <div className="flex items-center gap-2.5 my-0.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-cyan-400 flex-shrink-0 group-hover:scale-105 transition-transform">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="font-bold text-white text-xs sm:text-sm truncate group-hover:text-cyan-300 transition-colors">
                  mc-vn.top
                </h4>
              </div>
              <p className="text-[10px] sm:text-[11px] text-gray-400 truncate">
                Tên miền miễn phí cho cộng đồng Minecraft VN
              </p>
            </div>

            <a
              href="https://github.com/hongson209/mc-vn.top"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cyan-600/90 hover:bg-cyan-600 text-white text-xs font-mono transition-all flex-shrink-0 shadow active:scale-95"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-500/15 via-purple-500/10 to-indigo-500/15 rounded-xl border border-pink-500/30 p-2 sm:p-2.5 flex items-center justify-between shadow-md group hover:border-pink-500/60 transition-all">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 group-hover:scale-105 transition-transform flex-shrink-0 shadow-inner">
              <Cake className="w-4 h-4" />
            </div>
            <div className="text-xs sm:text-sm text-gray-200">
              {daysUntilBirthday === 0 ? (
                <span className="font-bold text-pink-300 text-sm">Hôm nay là sinh nhật! 🎂🎉</span>
              ) : (
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-gray-300">Còn</span>
                  <span className="text-sm sm:text-base font-black font-mono text-pink-300 bg-pink-500/15 px-2 py-0.5 rounded-md border border-pink-500/25 shadow-sm">
                    {daysUntilBirthday} ngày
                  </span>
                  <span className="text-gray-300">nữa là sinh nhật</span>
                </div>
              )}
            </div>
          </div>

          <div className="px-3 py-1 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-200 font-mono font-bold text-xs sm:text-sm flex-shrink-0 shadow-sm flex items-center gap-1.5 group-hover:bg-pink-500/30 transition-colors">
            <Sparkles className="w-3.5 h-3.5 text-pink-300" />
            <span>19/09</span>
          </div>
        </div>
      </div>
    </div>
  );
}

