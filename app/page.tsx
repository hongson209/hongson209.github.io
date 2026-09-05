'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  User, Users, Mail, Code2, MapPin, Sparkles, Terminal, FolderGit2,
  Clock, Calendar, ExternalLink, Check, Copy, Play, Pause, Volume2,
  VolumeX, Music, Layers, Wand2, Gamepad2, Bot, Cake, Type,
  Send, MessageSquare, ArrowUpRight, Github, Globe, ArrowRight,
  Boxes, Search, Download, Trash2, Loader2, CheckSquare, Square, Package, CheckCircle2,
  ChevronLeft, ChevronRight, ChevronDown
} from 'lucide-react';
import confetti from 'canvas-confetti';
import JSZip from 'jszip';


function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const [trails, setTrails] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const lastTrailTime = useRef(0);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse), ignore touch
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = target.closest('a, button, input, [role="button"], .cursor-pointer') !== null;
        setIsHovered(isClickable);
      }

      const now = Date.now();
      if (now - lastTrailTime.current > 35) {
        lastTrailTime.current = now;
        const colors = ['#38bdf8', '#818cf8', '#f472b6', '#4ade80'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const newTrail = { id: now + Math.random(), x: e.clientX, y: e.clientY, color: randomColor };
        setTrails((prev) => [...prev.slice(-10), newTrail]);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY };
      setRipples((prev) => [...prev.slice(-5), newRipple]);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      ringRef.current.x = lerp(ringRef.current.x, posRef.current.x, 0.22);
      ringRef.current.y = lerp(ringRef.current.y, posRef.current.y, 0.22);
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted || !isVisible) return null;

  return (
    <>
      {/* Click shockwave ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="custom-cursor-click-ripple"
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
        />
      ))}

      {/* Sparkle star trail */}
      {trails.map((t) => (
        <div
          key={t.id}
          className="cursor-trail-star font-mono text-[11px]"
          style={{
            left: `${t.x}px`,
            top: `${t.y}px`,
            color: t.color,
            textShadow: `0 0 8px ${t.color}`,
          }}
        >
          ✦
        </div>
      ))}

      {/* Outer trailing targeting reticle */}
      <div
        className={`custom-cursor-reticle ${isHovered ? 'hovered' : ''}`}
        style={{
          left: `${ringPos.x}px`,
          top: `${ringPos.y}px`,
        }}
      />

      {/* Futuristic Cyber Arrow Pointer */}
      <div
        className={`custom-cursor-pointer ${isHovered ? 'hovered' : ''}`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-1px, -1px) scale(${isClicked ? 0.85 : isHovered ? 1.18 : 1})`,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 2L19.5 11.5L11.5 13.5L8.5 21.5L3 2Z"
            fill={isHovered ? 'url(#cursorPinkGradient)' : 'url(#cursorCyanGradient)'}
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="cursorCyanGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38bdf8" />
              <stop offset="1" stopColor="#818cf8" />
            </linearGradient>
            <linearGradient id="cursorPinkGradient" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f472b6" />
              <stop offset="1" stopColor="#a855f7" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}

interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

function MusicPlayer({
  audioRef,
  isPlaying,
  setIsPlaying,
  isMuted,
  setIsMuted,
}: MusicPlayerProps) {
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        if (audio.currentTime < 25) {
          audio.currentTime = 25;
        }
      } catch {}
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 rounded-full bg-black/75 border border-white/20 backdrop-blur-xl shadow-2xl">
      {/* Spotify Green Icon */}
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/50 text-[#1DB954] shadow-[0_0_12px_rgba(29,185,84,0.35)]">
        <Music className={'w-4 h-4 ' + (isPlaying ? 'animate-spin-slow' : '')} />
      </div>

      {/* Track Info */}
      <div className="flex flex-col min-w-[110px] max-w-[160px] sm:max-w-[210px]">
        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-[13px] font-semibold text-white truncate">
            Soundtrack • Flow
          </span>
          {/* Animated Equalizer */}
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-[#1DB954] animate-equalizer h-2.5" style={{ animationDelay: '0ms' }} />
              <span className="w-0.5 bg-[#1DB954] animate-equalizer h-3.5" style={{ animationDelay: '200ms' }} />
              <span className="w-0.5 bg-[#1DB954] animate-equalizer h-2" style={{ animationDelay: '400ms' }} />
              <span className="w-0.5 bg-[#1DB954] animate-equalizer h-3" style={{ animationDelay: '100ms' }} />
            </div>
          )}
        </div>
        <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400/90 truncate">
          music.mp3 • Vibe Coder
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1 sm:gap-1.5 ml-auto">
        <button
          onClick={togglePlay}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          title={isPlaying ? 'Tạm dừng' : 'Phát'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleMute}
          className="p-1.5 sm:p-2 rounded-full hover:bg-white/10 text-gray-200 hover:text-white transition-colors"
          title={isMuted ? 'Bật âm' : 'Tắt âm'}
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

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
      // Birth date: September 19, 2009 at 00:00:00 GMT+7 (Vietnam Time)
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

        {/* Tuổi - Tháng - Ngày */}
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

        {/* Time Grid (Giờ - Phút - Giây) */}
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

        {/* Birthday Milestone Progress Bar */}
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

      {/* Footer 19/09/2009 - Perfectly parallel with Birthday Card */}
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
    { name: 'ChatGPT', role: 'OpenAI GPT-4o', Icon: ChatGPTLogo, color: 'text-emerald-400' },
    { name: 'Claude', role: 'Anthropic 3.5', Icon: ClaudeLogo, color: 'text-amber-500' },
    { name: 'Gemini', role: 'Google DeepMind', Icon: GeminiLogo, color: 'text-sky-400' },
    { name: 'DeepSeek', role: 'DeepSeek-V3 / R1', Icon: DeepSeekLogo, color: 'text-blue-500' },
    { name: 'Kimi', role: 'Moonshot AI', Icon: KimiLogo, color: 'text-pink-500' },
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

              {/* Tooltip */}
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

function TabHongson() {
  const [daysUntilBirthday, setDaysUntilBirthday] = useState<number>(14);

  useEffect(() => {
    const calcDays = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const today = new Date(currentYear, now.getMonth(), now.getDate());
      let nextBday = new Date(currentYear, 8, 19); // September 19th

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

          {/* Clean Modern Tech Badges with Lucide Icons */}
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
            <span>Định hướng: <strong className="text-gray-200 font-semibold">Web Full Stack, AI Tools & Minecraft Plugins</strong></span>
          </div>
        </div>

        <AgeCalculator />
      </div>

      {/* Right Column (AI Logos, Minecraft, Projects, Birthday Countdown) */}
      <div className="lg:col-span-6 flex flex-col justify-between gap-2 sm:gap-2.5">
        <AILogos />
        <MinecraftWidget />

        {/* Kotoba Studio Repositories */}
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
                Kho dự án mã nguồn mở & plugins miễn phí
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

        {/* Free Domain mc-vn.top */}
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

        {/* Birthday Countdown: Cân đối hoàn hảo, song song với 19/09 bên trái */}
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

const smallCapsMap: Record<string, string> = {
  a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ',
  n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ',
};

function convertMinecraftChar(char: string): string {
  // Lowercase accented Vietnamese: uppercase with accent must be lowercased with accent!
  const lower = char.toLowerCase();
  if (lower === 'đ') return 'đ';
  if (smallCapsMap[lower]) return smallCapsMap[lower];
  return lower;
}

function convertMinecraftConfig(input: string, isSafe: boolean = true): string {
  if (!isSafe) {
    return Array.from(input).map(convertMinecraftChar).join('');
  }

  const lines = input.split('\n');
  const convertedLines = lines.map((line) => {
    // Check if line is YAML key-value: e.g. '  welcome: "..."'
    const yamlKeyMatch = line.match(/^(\s*[-a-zA-Z0-9_.]+\s*:\s*)(.*)$/);
    let prefix = '';
    let content = line;
    if (yamlKeyMatch) {
      prefix = yamlKeyMatch[1];
      content = yamlKeyMatch[2];
    }

    // Protected tokens: <...>, %...%, {...}, [...], &color, §color, escape \n, commands /cmd, namespace x:y
    const tokenRegex = /(<[^>]+>|%[^%\s]+%|\{[^\}\s]+\}|\[[^\]\s]+\]|(?:&|§)(?:#[0-9a-fA-F]{6}|[0-9a-fk-orA-FK-OR])|\\[ntr]|\/[a-zA-Z0-9_-]+|[a-zA-Z0-9_.-]+:[a-zA-Z0-9_.-]+)/g;

    let lastIndex = 0;
    let result = '';
    let match: RegExpExecArray | null;

    while ((match = tokenRegex.exec(content)) !== null) {
      const rawText = content.substring(lastIndex, match.index);
      result += Array.from(rawText).map(convertMinecraftChar).join('');
      result += match[0];
      lastIndex = tokenRegex.lastIndex;
    }

    const remainingText = content.substring(lastIndex);
    result += Array.from(remainingText).map(convertMinecraftChar).join('');

    return prefix + result;
  });

  return convertedLines.join('\n');
}

function TabFont() {
  const [inputText, setInputText] = useState('Chào mừng <player> đến với Kotoba Studio!');
  const [mode, setMode] = useState<'safe' | 'all'>('safe');
  const [miniFont, setMiniFont] = useState(true);
  const [copied, setCopied] = useState(false);

  const convertedText = miniFont ? convertMinecraftConfig(inputText, mode === 'safe') : inputText;

  const handleCopy = () => {
    navigator.clipboard.writeText(convertedText);
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#38bdf8', '#818cf8', '#34d399'],
    });
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 items-stretch">
      {/* 01 Nội dung */}
      <div className="bg-card/90 rounded-2xl border border-card-border p-3 sm:p-3.5 shadow-md backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-white/[0.06] border border-white/10 text-gray-400 flex items-center justify-center text-[10px] font-mono">
                01
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">Nội dung</span>
            </div>

            <button
              onClick={() => setMiniFont(!miniFont)}
              className="flex items-center gap-1.5 text-xs font-mono text-gray-300 hover:text-white transition-colors"
            >
              <span className={'w-7 h-4 rounded-full transition-colors relative flex items-center px-0.5 ' + (miniFont ? 'bg-indigo-600' : 'bg-white/20')}>
                <span className={'w-3 h-3 rounded-full bg-white transition-transform ' + (miniFont ? 'translate-x-3' : 'translate-x-0')} />
              </span>
              <span className="text-[11px]">Mini font</span>
            </button>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <button
              onClick={() => setMode('all')}
              className={'p-1.5 sm:p-2 rounded-xl text-left border transition-all ' + (
                mode === 'all'
                  ? 'bg-white/[0.08] border-indigo-500/50 text-white shadow-sm'
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/[0.04]'
              )}
            >
              <div className="text-xs font-semibold">All Text</div>
              <div className="text-[9px] text-gray-500">Chuyển toàn bộ ký tự</div>
            </button>

            <button
              onClick={() => setMode('safe')}
              className={'p-1.5 sm:p-2 rounded-xl text-left border transition-all ' + (
                mode === 'safe'
                  ? 'bg-indigo-600/20 border-indigo-500/50 text-white shadow-sm'
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:bg-white/[0.04]'
              )}
            >
              <div className="text-xs font-semibold text-indigo-300">Safe Config</div>
              <div className="text-[9px] text-indigo-200/60">Bảo vệ cú pháp Minecraft</div>
            </button>
          </div>

          {/* Textarea Input */}
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập văn bản hoặc nội dung config Minecraft..."
            className="w-full h-32 sm:h-36 p-2.5 sm:p-3 rounded-xl bg-black/40 border border-white/10 text-gray-200 placeholder-gray-500 text-xs font-mono focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 resize-none transition-all"
          />
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mt-2 pt-1.5 border-t border-white/5">
          <span>{inputText.length} ký tự</span>
          <span className="truncate max-w-[200px] sm:max-w-none text-gray-400">
            Bảo vệ &lt;tag&gt;, %papi%, &màu, /lệnh
          </span>
        </div>
      </div>

      {/* 02 Kết quả (Không còn Preview, hiển thị trực tiếp) */}
      <div className="bg-card/90 rounded-2xl border border-card-border p-3 sm:p-3.5 shadow-md backdrop-blur-md flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-md bg-white/[0.06] border border-white/10 text-gray-400 flex items-center justify-center text-[10px] font-mono">
                02
              </span>
              <span className="text-xs sm:text-sm font-bold text-white">Kết quả</span>
            </div>

            <button
              onClick={handleCopy}
              className={'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all active:scale-95 ' + (
                copied
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/30'
              )}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Sao chép</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-indigo-300/80 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20 mb-2">
            <span>Minecraft Small Caps Unicode</span>
            <span className="text-emerald-400 font-semibold">Tự động convert</span>
          </div>

          {/* Converted Result Box */}
          <div className="w-full h-32 sm:h-36 p-2.5 sm:p-3 rounded-xl bg-black/50 border border-white/10 font-mono text-xs text-indigo-100 overflow-y-auto break-words whitespace-pre-wrap select-all leading-relaxed">
            {convertedText || <span className="text-gray-600">Kết quả sau khi chuyển đổi...</span>}
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-gray-500 mt-2 pt-1.5 border-t border-white/5">
          <span>{convertedText.length} ký tự</span>
          <span className="text-gray-400">Click Sao chép hoặc bôi đen văn bản</span>
        </div>
      </div>
    </div>
  );
}

interface Friend {
  name: string;
  role: string;
  avatar: string;
  status: string;
  tag: string;
  link?: string;
  badgeColor: string;
  description: string;
}

function TabFriends() {
  const friends: Friend[] = [
    {
      name: 'Kotoba Studio Crew',
      role: 'Dev Team & Co-creators',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Kotoba',
      status: 'Đang phát triển dự án',
      tag: 'Team Core',
      link: 'https://github.com/orgs/Kotoba-Studio',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      description: 'Nhóm nghiên cứu và phát triển phần mềm, bot và AI tools.',
    },
    {
      name: 'MewMC Staff Team',
      role: 'Minecraft Builders & Admins',
      avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=MewMCStaff',
      status: 'Online • Quản trị Server',
      tag: 'Minecraft',
      link: 'https://discord.gg/5uq862p3W7',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      description: 'Đội ngũ phụ trách build map và quản trị máy chủ MewMC.',
    },
    {
      name: 'Discord Vibe Coders',
      role: 'AI & Full Stack Enthusiasts',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=VibeCoders',
      status: 'Học hỏi & Chia sẻ prompt',
      tag: 'Community',
      link: 'https://discord.gg/5uq862p3W7',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      description: 'Cộng đồng lập trình viên đam mê AI và coding thực chiến.',
    },
  ];

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="bg-card/90 rounded-2xl border border-card-border p-3 sm:p-3.5 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Users className="w-4 h-4" />
          </span>
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-400">
            Friends & Collaborators
          </span>
        </div>
        <span className="text-xs font-mono text-gray-500">3 Communities</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {friends.map((friend) => (
          <div
            key={friend.name}
            className="bg-card/90 rounded-2xl border border-card-border p-3.5 sm:p-4 shadow-md flex flex-col justify-between group hover:border-indigo-500/40 hover:bg-[#161a29] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-black/40 border border-white/10 p-0.5">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <span className={'px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-mono border ' + friend.badgeColor}>
                  {friend.tag}
                </span>
              </div>

              <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-indigo-300 transition-colors">
                {friend.name}
              </h4>
              <p className="text-xs text-indigo-400/90 font-mono mt-0.5">
                {friend.role}
              </p>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed line-clamp-2">
                {friend.description}
              </p>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400 font-mono truncate">
                ● {friend.status}
              </span>
              {friend.link && (
                <a
                  href={friend.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface PluginVersion {
  versionNumber: string;
  gameVersions: string[];
  downloadUrl: string;
  filename: string;
  loaders?: string[];
}

interface PluginItem {
  id: string;
  name: string;
  description: string;
  icon?: string;
  source: 'modrinth' | 'hangar' | 'spigot';
  author: string;
  downloads?: string;
  likes?: string;
  projectUrl?: string;
  versions: PluginVersion[];
}

const DEFAULT_PLUGINS: PluginItem[] = [
  {
    id: 'simple-voice-chat',
    name: 'Simple Voice Chat',
    description: 'A working voice chat in Minecraft! Proximity chat, group chats, and audio recording.',
    icon: 'https://cdn.modrinth.com/data/9eGKb6K1/icon.png',
    source: 'modrinth',
    author: 'henkelmax',
    downloads: '35.5M',
    likes: '10.1k',
    projectUrl: 'https://modrinth.com/plugin/simple-voice-chat',
    versions: [
      {
        versionNumber: 'bukkit-2.6.23',
        gameVersions: ['1.20.4', '1.21', '1.21.4'],
        downloadUrl: 'https://cdn.modrinth.com/data/9eGKb6K1/versions/IhqyykOv/voicechat-bukkit-2.6.23.jar',
        filename: 'voicechat-bukkit-2.6.23.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
      {
        versionNumber: 'bukkit-2.5.25',
        gameVersions: ['1.20.1', '1.20.2'],
        downloadUrl: 'https://cdn.modrinth.com/data/9eGKb6K1/versions/IhqyykOv/voicechat-bukkit-2.6.23.jar',
        filename: 'voicechat-bukkit-2.5.25.jar',
        loaders: ['bukkit', 'paper'],
      },
    ],
  },
  {
    id: 'veinminer',
    name: 'Veinminer',
    description: 'Mine the whole vein on mining a single ore. Known feature by modpacks and pvp games like UHC (quick mine).',
    icon: 'https://cdn.modrinth.com/data/OhduvhIc/5ea1f538e66ee4d4e5e571ad952cba0e06e0bd5c.png',
    source: 'modrinth',
    author: 'Miraculixx',
    downloads: '32.7M',
    likes: '3.8k',
    projectUrl: 'https://modrinth.com/plugin/veinminer',
    versions: [
      {
        versionNumber: '2.12.1',
        gameVersions: ['1.20.4', '1.21', '1.21.4'],
        downloadUrl: 'https://cdn.modrinth.com/data/OhduvhIc/versions/qztdh63o/veinminer-paper-2.12.1.jar',
        filename: 'veinminer-paper-2.12.1.jar',
        loaders: ['paper', 'purpur'],
      },
      {
        versionNumber: '2.11.0',
        gameVersions: ['1.20.1'],
        downloadUrl: 'https://cdn.modrinth.com/data/OhduvhIc/versions/qztdh63o/veinminer-paper-2.12.1.jar',
        filename: 'veinminer-paper-2.11.0.jar',
        loaders: ['paper'],
      },
    ],
  },
  {
    id: 'veinminer-enchantment',
    name: 'Veinminer Enchantment',
    description: 'Veinminer Addon - Adds veinminer enchantment to enchanting tables. Only tools with the enchantment can veinmine.',
    icon: 'https://cdn.modrinth.com/data/4sP0LXxp/1e37ba60062cf9455fc75d61c653a75d11825783.png',
    source: 'modrinth',
    author: 'Miraculixx',
    downloads: '11.6M',
    likes: '888',
    projectUrl: 'https://modrinth.com/plugin/veinminer-enchantment',
    versions: [
      {
        versionNumber: '2.11.2',
        gameVersions: ['1.20.4', '1.21', '1.21.1'],
        downloadUrl: 'https://cdn.modrinth.com/data/4sP0LXxp/versions/ybkUAVuf/veinminer-enchant-2.11.2%2B1.21.1.jar',
        filename: 'veinminer-enchant-2.11.2+1.21.1.jar',
        loaders: ['paper', 'spigot'],
      },
    ],
  },
  {
    id: 'chunky',
    name: 'Chunky',
    description: 'Pre-generates chunks, quickly and efficiently. Eliminates map exploration lag on server.',
    icon: 'https://cdn.modrinth.com/data/fALzjamp/e1954413665e57b7bae1feef44eda530270c7d47_96.webp',
    source: 'modrinth',
    author: 'pop4959',
    downloads: '9.3M',
    likes: '4.7k',
    projectUrl: 'https://modrinth.com/plugin/chunky',
    versions: [
      {
        versionNumber: '1.5.3',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/fALzjamp/versions/MdY6JATr/Chunky-Bukkit-1.5.3.jar',
        filename: 'Chunky-Bukkit-1.5.3.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
  {
    id: 'worldedit',
    name: 'WorldEdit',
    description: 'A Minecraft Map Editor... that runs in-game! With selections, schematics, copy, paste and brushes.',
    icon: 'https://cdn.modrinth.com/data/1u6JkXh5/30698991048ced77e60c4e8284007d3782f2e6a3_96.webp',
    source: 'modrinth',
    author: 'me4502',
    downloads: '5.5M',
    likes: '3.7k',
    projectUrl: 'https://modrinth.com/plugin/worldedit',
    versions: [
      {
        versionNumber: '7.4.5',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/1u6JkXh5/versions/F5ea2ov3/worldedit-bukkit-7.4.5.jar',
        filename: 'worldedit-bukkit-7.4.5.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
  {
    id: 'emotecraft',
    name: 'Emotecraft',
    description: 'Create your own emotes in Minecraft. Syncs poses and animations with all players.',
    icon: 'https://cdn.modrinth.com/data/pZ2wrerK/eed7e2c9851392e5879c7d7cb763f142f124e6d2_96.webp',
    source: 'modrinth',
    author: 'KosmX',
    downloads: '4.7M',
    likes: '1.9k',
    projectUrl: 'https://modrinth.com/plugin/emotecraft',
    versions: [
      {
        versionNumber: '3.4.0',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/pZ2wrerK/versions/IzrUr1gI/emotecraft-geyser-for-MC26.2-3.4.0-b.build.165.jar',
        filename: 'emotecraft-paper-3.4.0.jar',
        loaders: ['paper', 'spigot'],
      },
    ],
  },
  {
    id: 'plasmo-voice',
    name: 'Plasmo Voice',
    description: 'Next generation proximity voice chat mod with audio positioning and lots of features.',
    icon: 'https://cdn.modrinth.com/data/1bZhdhsH/72c1641d4af92d93546958a2c87e0b5fd1c3f650_96.webp',
    source: 'modrinth',
    author: 'Apehum',
    downloads: '2.7M',
    likes: '1.9k',
    projectUrl: 'https://modrinth.com/plugin/plasmo-voice',
    versions: [
      {
        versionNumber: '2.1.16',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/1bZhdhsH/versions/YnC4RoiW/PlasmoVoice-Paper-2.1.16.jar',
        filename: 'PlasmoVoice-Paper-2.1.16.jar',
        loaders: ['paper', 'purpur'],
      },
    ],
  },
  {
    id: 'luckperms',
    name: 'LuckPerms',
    description: 'An advanced permissions plugin for Minecraft servers, proxies and networks.',
    icon: 'https://cdn.modrinth.com/data/Vebnzrzj/90943902cc650e95b167265b8f2d7c893f82c8f4_96.webp',
    source: 'modrinth',
    author: 'Luck',
    downloads: '18.2M',
    likes: '15.4k',
    projectUrl: 'https://modrinth.com/plugin/luckperms',
    versions: [
      {
        versionNumber: '5.5.71',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/Vebnzrzj/versions/b0mk8uS6/LuckPerms-Bukkit-5.5.71.jar',
        filename: 'LuckPerms-Bukkit-5.5.71.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
  {
    id: 'viaversion',
    name: 'ViaVersion',
    description: 'Allow newer Java Edition clients to connect to older server versions seamlessly.',
    icon: 'https://cdn.modrinth.com/data/P1OZGk5p/ad14260a7308dc9e4c3385f3f6b5bdabfe17f295_96.webp',
    source: 'modrinth',
    author: 'Gerrygames',
    downloads: '15.1M',
    likes: '12.3k',
    projectUrl: 'https://modrinth.com/plugin/viaversion',
    versions: [
      {
        versionNumber: '5.12.0',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/P1OZGk5p/versions/I7EtZ7sn/ViaVersion-5.12.0-SNAPSHOT.jar',
        filename: 'ViaVersion-5.12.0.jar',
        loaders: ['bukkit', 'paper', 'spigot', 'velocity'],
      },
    ],
  },
  {
    id: 'fastasyncworldedit',
    name: 'FastAsyncWorldEdit',
    description: 'Blazingly fast world manipulation for artists, builders and everyone else.',
    icon: 'https://cdn.modrinth.com/data/z4HZZnLr/1dab3e5596f37ade9a65f3587254ff61a9cf3c43.svg',
    source: 'modrinth',
    author: 'IntellectualSites',
    downloads: '6.2M',
    likes: '5.1k',
    projectUrl: 'https://modrinth.com/plugin/fastasyncworldedit',
    versions: [
      {
        versionNumber: '2.15.4',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/z4HZZnLr/versions/Li78VnLD/FastAsyncWorldEdit-Bukkit-2.15.4.jar',
        filename: 'FastAsyncWorldEdit-Bukkit-2.15.4.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
  {
    id: 'decentholograms',
    name: 'DecentHolograms',
    description: 'Lightweight, feature-rich hologram plugin with animations, pages and click actions.',
    icon: 'https://cdn.modrinth.com/data/w02MKsTg/da26ff80e9bcd5646284c57dd06a57b2e4361027.png',
    source: 'modrinth',
    author: 'DecentSoftware',
    downloads: '3.1M',
    likes: '2.5k',
    projectUrl: 'https://modrinth.com/plugin/decentholograms',
    versions: [
      {
        versionNumber: '2.10.1',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/w02MKsTg/versions/Fva1FgWm/DecentHolograms-2.10.1.jar',
        filename: 'DecentHolograms-2.10.1.jar',
        loaders: ['paper', 'spigot'],
      },
    ],
  },
  {
    id: 'coreprotect',
    name: 'CoreProtect',
    description: 'Fast, efficient data logging and anti-griefing tool. Rollback and restore any amount of damage.',
    icon: 'https://cdn.modrinth.com/data/Lu3KuzdV/b2c4b7b0033ab09cc166f2848003ef3a02c70a83.png',
    source: 'modrinth',
    author: 'Intelli',
    downloads: '4.9M',
    likes: '3.2k',
    projectUrl: 'https://modrinth.com/plugin/coreprotect',
    versions: [
      {
        versionNumber: '24.0',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/Lu3KuzdV/versions/Kma0kBsY/CoreProtect-CE-24.0.jar',
        filename: 'CoreProtect-CE-24.0.jar',
        loaders: ['bukkit', 'paper', 'spigot', 'purpur'],
      },
    ],
  },
  {
    id: 'essentialsx',
    name: 'EssentialsX',
    description: 'The essential plugin suite for Paper and Spigot servers providing over 100 commands.',
    icon: 'https://cdn.modrinth.com/data/hXiIvTyT/e621675be1d0421b43b65ab8082507532d937009_96.webp',
    source: 'modrinth',
    author: 'EssentialsX Team',
    downloads: '7.8M',
    likes: '6.4k',
    projectUrl: 'https://modrinth.com/plugin/essentialsx',
    versions: [
      {
        versionNumber: '2.22.0',
        gameVersions: ['1.20.4', '1.20.1', '1.21'],
        downloadUrl: 'https://cdn.modrinth.com/data/hXiIvTyT/versions/nY6VN1XH/EssentialsX-2.22.0.jar',
        filename: 'EssentialsX-2.22.0.jar',
        loaders: ['bukkit', 'paper', 'spigot'],
      },
    ],
  },
];

function CustomPluginVersionDropdown({
  plugin,
  selectedIndex,
  onSelectIndex,
  onOpen,
  isLoading,
  versions,
}: {
  plugin: PluginItem;
  selectedIndex: number;
  onSelectIndex: (idx: number) => void;
  onOpen: () => void;
  isLoading?: boolean;
  versions: PluginVersion[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    if (next) {
      onOpen();
    }
  };

  const currentVer = versions[selectedIndex] || versions[0] || {
    versionNumber: 'Latest',
    gameVersions: ['1.21.x'],
  };

  let displayVer = currentVer.versionNumber || 'Latest';
  if (/^[a-zA-Z0-9]{8}$/.test(displayVer)) {
    displayVer = 'Latest';
  } else if (!displayVer.toLowerCase().startsWith('v') && !displayVer.toLowerCase().startsWith('bukkit')) {
    displayVer = `v${displayVer}`;
  }

  const mcBadge = currentVer.gameVersions?.[currentVer.gameVersions.length - 1];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dark Obsidian Glass Trigger Pill */}
      <button
        type="button"
        onClick={handleToggle}
        className={`flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/60 hover:bg-white/[0.08] border transition-all text-[10px] font-mono shadow-sm group/btn ${
          isOpen
            ? 'border-indigo-500/70 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.3)]'
            : 'border-white/10 hover:border-white/25 text-indigo-300 hover:text-white'
        }`}
        title="Chọn phiên bản chi tiết"
      >
        <span className="font-semibold truncate max-w-[70px]">
          {displayVer}
        </span>
        {mcBadge && (
          <span className="hidden xl:inline-block px-1 py-0.2 rounded bg-indigo-500/15 text-cyan-300 text-[8px] border border-indigo-500/25">
            {mcBadge}
          </span>
        )}
        <ChevronDown
          className={`w-3 h-3 text-indigo-400 group-hover/btn:text-cyan-300 transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </button>

      {/* Popover Menu - Opens upward above card edge */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-1.5 z-50 w-52 max-h-48 overflow-y-auto rounded-xl bg-[#0b0e17]/95 border border-white/15 shadow-[0_12px_36px_rgba(0,0,0,0.85)] backdrop-blur-2xl p-1 no-scrollbar animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2 py-1 text-[9px] font-mono uppercase tracking-wider text-gray-400 border-b border-white/10 flex items-center justify-between">
            <span>Chọn phiên bản</span>
            <span className="text-emerald-400 font-bold">{versions.length} bản</span>
          </div>

          {isLoading && versions.length <= 1 ? (
            <div className="py-4 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Đang tải danh sách...</span>
            </div>
          ) : (
            <div className="space-y-0.5 py-1">
              {versions.map((v, i) => {
                const isSelected = selectedIndex === i;
                let vLabel = v.versionNumber;
                if (/^[a-zA-Z0-9]{8}$/.test(vLabel)) {
                  vLabel = 'Latest';
                } else if (!vLabel.toLowerCase().startsWith('v') && !vLabel.toLowerCase().startsWith('bukkit')) {
                  vLabel = `v${vLabel}`;
                }
                const mcTag = v.gameVersions?.[v.gameVersions.length - 1];

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      onSelectIndex(i);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left text-xs font-mono transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="truncate">{vLabel}</span>
                      {mcTag && (
                        <span className="px-1 py-0.2 rounded bg-black/50 text-[9px] text-cyan-300 border border-white/10">
                          MC {mcTag}
                        </span>
                      )}
                    </div>
                    {isSelected && <Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TabPlugins() {
  const [viewMode, setViewMode] = useState<'browse' | 'manage'>('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [provider, setProvider] = useState<'all' | 'modrinth' | 'hangar' | 'spigot'>('modrinth');
  const [pageSize, setPageSize] = useState<number>(6);
  const [sortBy, setSortBy] = useState<'downloads' | 'relevance' | 'newest'>('downloads');
  const [loader, setLoader] = useState<string>('paper');
  const [mcVersion, setMcVersion] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalHits, setTotalHits] = useState<number>(DEFAULT_PLUGINS.length);
  const [plugins, setPlugins] = useState<PluginItem[]>(DEFAULT_PLUGINS);
  const [selectedVersions, setSelectedVersions] = useState<Record<string, number>>({});
  const [selectedQueue, setSelectedQueue] = useState<{
    id: string;
    name: string;
    version: string;
    filename: string;
    downloadUrl: string;
    icon?: string;
    source: string;
  }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState('');
  const [versionsCache, setVersionsCache] = useState<Record<string, PluginVersion[]>>({});
  const [loadingVersions, setLoadingVersions] = useState<Record<string, boolean>>({});

  const fetchProjectVersions = async (projectId: string) => {
    if (versionsCache[projectId] || loadingVersions[projectId]) return;

    setLoadingVersions((prev) => ({ ...prev, [projectId]: true }));
    try {
      const res = await fetch(`https://api.modrinth.com/v2/project/${projectId}/version`);
      if (res.ok) {
        const data = await res.json();
        const serverLoaders = ['paper', 'spigot', 'purpur', 'bukkit', 'folia', 'velocity', 'bungeecord'];
        let filtered = data.filter((v: any) => v.loaders?.some((l: string) => serverLoaders.includes(l)));
        if (!filtered || filtered.length === 0) filtered = data;

        const loadedVersions: PluginVersion[] = filtered.slice(0, 15).map((v: any) => {
          const rawVer = String(v.version_number || 'Latest');
          const mainFile = v.files?.find((f: any) => f.primary) || v.files?.[0];
          return {
            versionNumber: rawVer,
            gameVersions: v.game_versions || [],
            downloadUrl: mainFile?.url || '',
            filename: mainFile?.filename || `${projectId}.jar`,
            loaders: v.loaders || ['paper'],
          };
        });

        if (loadedVersions.length > 0) {
          setVersionsCache((prev) => ({ ...prev, [projectId]: loadedVersions }));
          setPlugins((prev) =>
            prev.map((p) => (p.id === projectId ? { ...p, versions: loadedVersions } : p))
          );
        }
      }
    } catch (err) {
      console.error('Failed to fetch versions for', projectId, err);
    } finally {
      setLoadingVersions((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  // Reset trang về 1 khi người dùng thay đổi bộ lọc hoặc từ khóa tìm kiếm
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, provider, pageSize, sortBy, loader, mcVersion]);

  // Live API Search & Phân trang từ Modrinth API
  useEffect(() => {
    let isCancelled = false;

    const fetchPlugins = async () => {
      setIsLoading(true);
      try {
        const q = searchQuery.trim();
        const facets: string[][] = [['project_type:plugin']];

        if (loader !== 'all') {
          facets.push([`categories:${loader}`]);
        }
        if (mcVersion !== 'all') {
          facets.push([`versions:${mcVersion}`]);
        }

        const offset = (currentPage - 1) * pageSize;
        const index = sortBy === 'relevance' ? 'relevance' : sortBy === 'downloads' ? 'downloads' : 'newest';
        const url = `https://api.modrinth.com/v2/search?query=${encodeURIComponent(q)}&facets=${encodeURIComponent(
          JSON.stringify(facets)
        )}&limit=${pageSize}&offset=${offset}&index=${index}`;

        const res = await fetch(url);
        if (res.ok && !isCancelled) {
          const data = await res.json();
          setTotalHits(data.total_hits || 0);

          const hits: PluginItem[] = (data.hits || []).map((h: any) => {
            const pId = h.slug || h.project_id;
            const mcVersions = h.versions || [];
            return {
              id: pId,
              name: h.title,
              description: h.description || 'Minecraft plugin từ Modrinth ecosystem.',
              icon: h.icon_url,
              source: 'modrinth' as const,
              author: h.author || 'Developer',
              downloads:
                h.downloads > 1000000
                  ? `${(h.downloads / 1000000).toFixed(1)}M`
                  : h.downloads > 1000
                  ? `${(h.downloads / 1000).toFixed(0)}k`
                  : String(h.downloads || 0),
              likes: h.follows ? `${(h.follows / 1000).toFixed(1)}k` : undefined,
              projectUrl: `https://modrinth.com/plugin/${pId}`,
              versions: versionsCache[pId] || [
                {
                  versionNumber: 'Latest',
                  gameVersions: mcVersions.slice(-3),
                  downloadUrl: `https://api.modrinth.com/v2/project/${h.project_id}/version`,
                  filename: `${pId}.jar`,
                  loaders: h.loaders || ['paper', 'spigot', 'purpur'],
                },
              ],
            };
          });

          if (hits.length > 0) {
            setPlugins(hits);
            // Tự động tải trước phiên bản cho các plugin hiển thị
            hits.forEach((item) => {
              fetchProjectVersions(item.id);
            });
          } else if (currentPage === 1 && !q && loader === 'paper' && mcVersion === 'all') {
            setPlugins(DEFAULT_PLUGINS);
            setTotalHits(DEFAULT_PLUGINS.length);
          } else {
            setPlugins([]);
          }
        }
      } catch (err) {
        if (!isCancelled && currentPage === 1) {
          setPlugins(DEFAULT_PLUGINS);
          setTotalHits(DEFAULT_PLUGINS.length);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    const timer = setTimeout(() => {
      fetchPlugins();
    }, 250);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [searchQuery, provider, pageSize, sortBy, loader, mcVersion, currentPage]);

  const totalPages = Math.max(1, Math.ceil(totalHits / pageSize));

  // Tạo mảng số trang thông minh
  const pageNumbers: (number | string)[] = (() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  })();

  const toggleSelect = async (plugin: PluginItem) => {
    const exists = selectedQueue.some((item) => item.id === plugin.id);

    if (exists) {
      setSelectedQueue((prev) => prev.filter((item) => item.id !== plugin.id));
    } else {
      const vIndex = selectedVersions[plugin.id] || 0;
      let versionObj = plugin.versions[vIndex] || plugin.versions[0];
      let finalDownloadUrl = versionObj.downloadUrl;
      let finalFilename = versionObj.filename;

      // Nếu là URL endpoint version của Modrinth, lấy URL trực tiếp của file jar từ CDN
      if (finalDownloadUrl.includes('api.modrinth.com/v2/project/') && finalDownloadUrl.endsWith('/version')) {
        try {
          const vRes = await fetch(finalDownloadUrl);
          if (vRes.ok) {
            const vList = await vRes.json();
            const bukkitVer =
              vList.find((v: any) =>
                v.loaders?.some((l: string) => ['bukkit', 'paper', 'spigot', 'purpur'].includes(l))
              ) || vList[0];
            if (bukkitVer && bukkitVer.files && bukkitVer.files[0]) {
              finalDownloadUrl = bukkitVer.files[0].url;
              finalFilename = bukkitVer.files[0].filename || finalFilename;
            }
          }
        } catch {}
      }

      setSelectedQueue((prev) => [
        ...prev,
        {
          id: plugin.id,
          name: plugin.name,
          version: versionObj.versionNumber,
          filename: finalFilename,
          downloadUrl: finalDownloadUrl,
          icon: plugin.icon,
          source: plugin.source,
        },
      ]);
    }
  };

  const removeFromQueue = (id: string) => {
    setSelectedQueue((prev) => prev.filter((item) => item.id !== id));
  };

  // 1-Click: Tự tải các file .jar thật từ CDN & nén vào .zip
  const handleDownloadZip = async () => {
    if (selectedQueue.length === 0 || isZipping) return;

    setIsZipping(true);
    setZipProgress('Đang chuẩn bị gói nén...');

    try {
      const zip = new JSZip();
      const pluginsFolder = zip.folder('plugins');
      let successCount = 0;

      for (let i = 0; i < selectedQueue.length; i++) {
        const item = selectedQueue[i];
        setZipProgress(`Đang tải (${i + 1}/${selectedQueue.length}): ${item.filename || item.name}...`);

        try {
          let downloadUrl = item.downloadUrl;

          // Nếu URL còn trỏ vào endpoint Modrinth API version, giải nén URL file thực từ CDN
          if (downloadUrl.includes('api.modrinth.com/v2/project/') && downloadUrl.endsWith('/version')) {
            const vRes = await fetch(downloadUrl);
            if (vRes.ok) {
              const vList = await vRes.json();
              const bukkitVer =
                vList.find((v: any) =>
                  v.loaders?.some((l: string) => ['bukkit', 'paper', 'spigot', 'purpur'].includes(l))
                ) || vList[0];
              if (bukkitVer?.files?.[0]?.url) {
                downloadUrl = bukkitVer.files[0].url;
                item.filename = bukkitVer.files[0].filename || item.filename;
              }
            }
          }

          // Fetch trực tiếp file .jar nhị phân từ Modrinth CDN (CORS unrestricted)
          const fileRes = await fetch(downloadUrl);
          if (fileRes.ok) {
            const arrayBuffer = await fileRes.arrayBuffer();
            if (pluginsFolder) {
              pluginsFolder.file(item.filename, arrayBuffer);
            } else {
              zip.file(`plugins/${item.filename}`, arrayBuffer);
            }
            successCount++;
          }
        } catch (fetchErr) {
          console.error('Error fetching jar:', item.name, fetchErr);
        }
      }

      // Đính kèm file hướng dẫn cài đặt server Minecraft
      zip.file(
        'README_CAI_DAT.txt',
        `=======================================================\n` +
        ` GÓI PLUGINS MINECRAFT - NGUYỄN HỒNG SƠN PROFILE\n` +
        ` Thời gian đóng gói: ${new Date().toLocaleString('vi-VN')}\n` +
        ` Tổng số plugin: ${selectedQueue.length}\n` +
        ` Số file .jar đã nén thành công: ${successCount}\n` +
        `=======================================================\n\n` +
        `HƯỚNG DẪN CÀI ĐẶT:\n` +
        `1. Mở thư mục "plugins" trong file zip này.\n` +
        `2. Sao chép toàn bộ file .jar vào thư mục "plugins" của máy chủ Minecraft (Paper / Purpur / Spigot).\n` +
        `3. Khởi động lại máy chủ (Restart Server) để plugin được kích hoạt.\n\n` +
        `Danh sách file kèm theo:\n` +
        selectedQueue.map((p, idx) => `${idx + 1}. ${p.filename} (v${p.version})`).join('\n') +
        `\n\nChúc server của bạn vận hành mượt mà và thành công! ✨\n`
      );

      setZipProgress('Đang nén file .ZIP...');
      const zipContent = await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 },
      });

      const downloadAnchor = document.createElement('a');
      const blobUrl = URL.createObjectURL(zipContent);
      downloadAnchor.href = blobUrl;
      downloadAnchor.download = `Minecraft_Plugins_Pack_${new Date().toISOString().slice(0, 10)}.zip`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(blobUrl);

      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#6366f1', '#38bdf8', '#00dfd8'],
      });

      setZipProgress(`Hoàn tất! Đã nén ${successCount} file .jar 🎉`);
      setTimeout(() => {
        setZipProgress('');
      }, 4000);
    } catch (err) {
      setZipProgress('Lỗi nén zip, vui lòng thử lại.');
      setTimeout(() => setZipProgress(''), 3000);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="bg-card/90 rounded-2xl border border-card-border p-3 sm:p-4 shadow-xl backdrop-blur-md flex flex-col justify-between transition-all">
      {/* Top Header: Sub-tabs (Browse Plugins | Manage Plugins) */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setViewMode('browse')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all ${
              viewMode === 'browse'
                ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Browse Plugins</span>
          </button>

          <button
            onClick={() => setViewMode('manage')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold font-mono transition-all ${
              viewMode === 'manage'
                ? 'text-emerald-400 bg-emerald-500/15 border border-emerald-500/40 shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Package className="w-4 h-4 text-emerald-400" />
            <span>Manage Plugins</span>
            {selectedQueue.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-emerald-500 text-black text-[10px] font-mono font-bold">
                {selectedQueue.length}
              </span>
            )}
          </button>
        </div>

        {/* Status / Quick Action */}
        <div className="flex items-center gap-2.5">
          {zipProgress && (
            <span className="text-xs font-mono text-cyan-300 animate-pulse hidden sm:inline">
              {zipProgress}
            </span>
          )}
          {selectedQueue.length > 0 && (
            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 border border-emerald-400/30 flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              <span>ZIP ({selectedQueue.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Row: Layout thoáng đãng, kích thước chuẩn */}
      <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 sm:gap-2.5 mb-3 items-end">
        {/* PROVIDER */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">PROVIDER</span>
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value as any)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="modrinth" className="bg-gray-900">Modrinth</option>
            <option value="all" className="bg-gray-900">All Providers</option>
            <option value="hangar" className="bg-gray-900">Hangar</option>
            <option value="spigot" className="bg-gray-900">Spigot</option>
          </select>
        </div>

        {/* SIZE */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">SIZE</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value={6} className="bg-gray-900">6 / page</option>
            <option value={12} className="bg-gray-900">12 / page</option>
            <option value={24} className="bg-gray-900">24 / page</option>
          </select>
        </div>

        {/* SORT BY */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">SORT BY</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="downloads" className="bg-gray-900">Downloads</option>
            <option value="relevance" className="bg-gray-900">Relevance</option>
            <option value="newest" className="bg-gray-900">Newest</option>
          </select>
        </div>

        {/* LOADER */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">LOADER</span>
          <select
            value={loader}
            onChange={(e) => setLoader(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="paper" className="bg-gray-900">Paper</option>
            <option value="purpur" className="bg-gray-900">Purpur</option>
            <option value="spigot" className="bg-gray-900">Spigot</option>
            <option value="velocity" className="bg-gray-900">Velocity</option>
            <option value="all" className="bg-gray-900">All Loaders</option>
          </select>
        </div>

        {/* VERSION */}
        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">VERSION</span>
          <select
            value={mcVersion}
            onChange={(e) => setMcVersion(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs font-mono text-gray-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all" className="bg-gray-900">All Versions</option>
            <option value="1.21" className="bg-gray-900">1.21.x</option>
            <option value="1.20.4" className="bg-gray-900">1.20.4</option>
            <option value="1.20.1" className="bg-gray-900">1.20.1</option>
            <option value="1.19.4" className="bg-gray-900">1.19.4</option>
            <option value="1.16.5" className="bg-gray-900">1.16.5</option>
          </select>
        </div>

        {/* SEARCH */}
        <div className="col-span-2 sm:col-span-1 flex flex-col gap-1">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">SEARCH</span>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plugins..."
              className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
            />
            {isLoading && (
              <Loader2 className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-emerald-400 animate-spin" />
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'browse' ? (
        <>
          {/* Card Grid: Kích thước mở rộng thoáng đãng, ngang tầm plugins manager */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 overflow-y-auto max-h-[340px] sm:max-h-[360px] min-h-[320px] pr-1.5 no-scrollbar flex-1">
            {isLoading && plugins.length === 0 ? (
              <div className="col-span-full text-center py-16 text-gray-400 font-mono text-xs flex flex-col items-center gap-2">
                <Loader2 className="w-6 h-6 text-emerald-400 animate-spin" />
                <span>Đang tải danh sách plugins...</span>
              </div>
            ) : plugins.length === 0 ? (
              <div className="col-span-full text-center py-16 text-gray-400 font-mono text-xs">
                Không tìm thấy plugin nào phù hợp với bộ lọc hiện tại.
              </div>
            ) : (
              plugins.map((plugin) => {
                const isSelected = selectedQueue.some((item) => item.id === plugin.id);
                const currentVIndex = selectedVersions[plugin.id] || 0;

                return (
                  <div
                    key={plugin.id}
                    className={`rounded-2xl border p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-200 group relative ${
                      isSelected
                        ? 'border-emerald-500/60 bg-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                        : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-black/60'
                    }`}
                  >
                    {/* Top: Icon + Title + Meta */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/50 border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0 p-0.5 shadow-sm group-hover:border-emerald-500/40 transition-colors">
                        {plugin.icon ? (
                          <img src={plugin.icon} alt={plugin.name} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Package className="w-5 h-5 text-emerald-400" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-[15px] text-white truncate group-hover:text-emerald-300 transition-colors">
                          {plugin.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-mono text-gray-400 mt-0.5 truncate">
                          {plugin.downloads && <span>📥 {plugin.downloads}</span>}
                          {plugin.likes && <span>❤️ {plugin.likes}</span>}
                          {plugin.author && <span className="truncate">👤 {plugin.author}</span>}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Description thoáng đãng */}
                    <p className="text-xs text-gray-300 line-clamp-2 my-2 leading-relaxed min-h-[34px]">
                      {plugin.description}
                    </p>

                    {/* Bottom: External link + Version Dropdown + Install / Selected */}
                    <div className="flex items-center justify-between gap-1.5 pt-2 border-t border-white/5 mt-1">
                      <a
                        href={plugin.projectUrl || `https://modrinth.com/plugin/${plugin.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        title="Xem trang Modrinth"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      {/* Custom Glass Dropdown Version */}
                      <CustomPluginVersionDropdown
                        plugin={plugin}
                        selectedIndex={currentVIndex}
                        onSelectIndex={(newIdx) =>
                          setSelectedVersions((prev) => ({
                            ...prev,
                            [plugin.id]: newIdx,
                          }))
                        }
                        onOpen={() => fetchProjectVersions(plugin.id)}
                        isLoading={loadingVersions[plugin.id]}
                        versions={plugin.versions}
                      />

                      {/* Install Button */}
                      <button
                        onClick={() => toggleSelect(plugin)}
                        className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all active:scale-95 ${
                          isSelected
                            ? 'bg-emerald-600 text-white border border-emerald-400/50 shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                            : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white border border-emerald-500/30'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-white" />
                            <span>Đã chọn</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Install</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Phân Trang (Pagination Bar) */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-1.5 pt-2 mt-1.5 border-t border-white/10 text-xs font-mono text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]">
                Trang <strong className="text-white">{currentPage}</strong> / <strong className="text-white">{totalPages}</strong>
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-[10px] text-gray-400" suppressHydrationWarning>
                {totalHits.toLocaleString('en-US')} plugins
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1 || isLoading}
                className="px-2 py-0.5 rounded-lg bg-black/50 hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:hover:bg-black/50 border border-white/10 transition-all flex items-center gap-1 text-[11px]"
              >
                <ChevronLeft className="w-3 h-3" />
                <span className="hidden sm:inline">Trước</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {pageNumbers.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => typeof p === 'number' && setCurrentPage(p)}
                    disabled={p === '...' || isLoading}
                    className={`min-w-[24px] h-6 px-1 rounded-lg text-[11px] font-semibold transition-all ${
                      p === currentPage
                        ? 'bg-emerald-600 text-white font-bold border border-emerald-400/50 shadow-sm'
                        : p === '...'
                        ? 'text-gray-600 cursor-default'
                        : 'bg-black/40 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages || isLoading}
                className="px-2 py-0.5 rounded-lg bg-black/50 hover:bg-white/10 text-gray-300 disabled:opacity-30 disabled:hover:bg-black/50 border border-white/10 transition-all flex items-center gap-1 text-[11px]"
              >
                <span className="hidden sm:inline">Sau</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Docked Action Footer when plugins are selected */}
          {selectedQueue.length > 0 && (
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-2 bg-black/50 px-3 py-1.5 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-gray-300">
                  Đã chọn: <strong className="text-emerald-400 font-bold">{selectedQueue.length}</strong> plugins
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('manage')}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  Xem giỏ ({selectedQueue.length})
                </button>
                <button
                  onClick={handleDownloadZip}
                  disabled={isZipping}
                  className="px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-md transition-all active:scale-95 flex items-center gap-1.5 border border-emerald-400/30"
                >
                  {isZipping ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>ĐANG NÉN...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>TẢI TRỌN BỘ (.ZIP)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        /* Manage Plugins View */
        <div className="flex flex-col flex-1 min-h-[350px] justify-between">
          <div className="overflow-y-auto max-h-[320px] space-y-2 pr-1 no-scrollbar flex-1">
            {selectedQueue.length === 0 ? (
              <div className="text-center py-16 text-gray-500 font-mono text-xs flex flex-col items-center gap-2.5">
                <Package className="w-10 h-10 opacity-30 text-gray-400" />
                <span>Chưa chọn plugin nào vào giỏ tải về.</span>
                <button
                  onClick={() => setViewMode('browse')}
                  className="mt-1 px-4 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs hover:bg-emerald-500 hover:text-white transition-all"
                >
                  Quay lại Browse Plugins
                </button>
              </div>
            ) : (
              selectedQueue.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-black/40 border border-white/10 text-xs group"
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-black/50 border border-white/10 overflow-hidden flex items-center justify-center flex-shrink-0">
                      {item.icon ? (
                        <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-white truncate block text-xs">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400 truncate block">
                        File: {item.filename} (v{item.version})
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromQueue(item.id)}
                    className="p-2 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex-shrink-0"
                    title="Xóa khỏi giỏ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Action Bar for Manage view */}
          {selectedQueue.length > 0 && (
            <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 mt-2">
              <button
                onClick={() => setSelectedQueue([])}
                className="px-3 py-1.5 rounded-xl text-xs font-mono text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                Xóa tất cả ({selectedQueue.length})
              </button>

              <button
                onClick={handleDownloadZip}
                disabled={isZipping}
                className="px-5 py-2 rounded-xl font-mono text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-md shadow-emerald-900/30 active:scale-95 transition-all flex items-center gap-2 border border-emerald-400/30"
              >
                {isZipping ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>ĐANG ĐÓNG GÓI ZIP...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>TẢI TRỌN BỘ PLUGINS (.ZIP)</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TabContact() {
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

type TabType = 'hongson' | 'friends' | 'font' | 'plugins' | 'contact';

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabType>('hongson');
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const startAudioSafe = () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.currentTime < 25) {
        audio.currentTime = 25;
      }
    } catch {}
    audio.volume = 0.5;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      // Browser autoplay policy
    });
  };

  const handleEnter = () => {
    startAudioSafe();
    setHasEntered(true);
  };

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile_active_tab', tabId);
      window.history.replaceState(null, '', `/${tabId}`);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const pathTab = window.location.pathname.replace(/^\/+/, '').split('/')[0] as TabType;
      const hashTab = window.location.hash.replace('#', '') as TabType;
      const storedTab = localStorage.getItem('profile_active_tab') as TabType;
      const validTabs: TabType[] = ['hongson', 'friends', 'font', 'plugins', 'contact'];
      if (validTabs.includes(pathTab)) {
        setActiveTab(pathTab);
      } else if (validTabs.includes(hashTab)) {
        setActiveTab(hashTab);
      } else if (validTabs.includes(storedTab)) {
        setActiveTab(storedTab);
      }
    }
  }, []);

  // Tự động đồng bộ trạng thái isPlaying với audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const tabs: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'hongson', label: 'Hongson', icon: User },
    { id: 'friends', label: 'Friends', icon: Users },
    { id: 'font', label: 'Font', icon: Type },
    { id: 'plugins', label: 'Plugins', icon: Boxes },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Background Audio Element - Đường dẫn tuyệt đối chuẩn xác */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Màn hình hơi mờ "Click to Enter" tối giản, tự nhiên & thẩm mỹ */}
      <div
        onClick={handleEnter}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md cursor-pointer select-none transition-all duration-700 ease-out ${
          hasEntered ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-2.5 text-center px-4">
          <p className="text-sm sm:text-base font-mono tracking-[0.25em] uppercase text-white/90 font-medium animate-pulse">
            [ click to enter ]
          </p>
          <p className="text-xs font-mono text-white/40 tracking-wider">
            nhấp chuột bất kỳ đâu để vào website
          </p>
        </div>
      </div>

      {/* Custom Interactive Gaming / Vibe Cursor */}
      <CustomCursor />

      {/* Video Background Layer */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-20 pointer-events-none"
        src="/background.mp4"
      />
      {/* Dark Blur Overlay */}
      <div className="fixed inset-0 bg-[#07090e]/70 backdrop-blur-[3px] -z-10 pointer-events-none" />

      {/* Main Container */}
      <main suppressHydrationWarning={true} className={`w-full ${
        activeTab === 'plugins' ? 'max-w-5xl lg:max-w-6xl' : 'max-w-4xl lg:max-w-5xl xl:max-w-6xl'
      } my-auto py-1 sm:py-2 px-2 sm:px-4 scale-[0.92] sm:scale-[0.95] xl:scale-100 origin-center transition-all duration-500 ease-out max-h-[96vh] ${
        hasEntered ? 'opacity-100 scale-[0.92] sm:scale-[0.95] xl:scale-100 blur-0 pointer-events-auto' : 'opacity-60 scale-[0.95] blur-[2px] pointer-events-none'
      }`}>
        <div suppressHydrationWarning={true} className="relative rounded-3xl bg-[#0e1017]/70 border border-white/15 shadow-[0_0_60px_-15px_rgba(99,102,241,0.3)] overflow-hidden backdrop-blur-2xl transition-all">
          
          {/* Banner Section */}
          <div className="relative h-24 sm:h-32 md:h-36 w-full overflow-hidden bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900">
            <img
              src="/banner.gif"
              alt="Banner Cover"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-[#0e1017]/35 to-transparent" />

            {/* Music Player in Banner */}
            <div className="absolute top-2 sm:top-3 right-2 sm:right-4 z-20">
              <MusicPlayer
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
              />
            </div>
          </div>

          {/* Profile Header */}
          <div className="px-4 sm:px-6 md:px-8 pt-0 pb-2.5 sm:pb-3 relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2.5 sm:gap-3 -mt-10 sm:-mt-14 md:-mt-16 mb-2 sm:mb-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 sm:gap-3.5">
                {/* Avatar with RGB Glow */}
                <div className="relative group flex-shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-2xl p-1 bg-gradient-to-tr from-[#ff007f] via-[#7928ca] to-[#00dfd8] animate-rgb-glow shadow-2xl relative z-10">
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-[#0e1017]">
                      <img
                        src="/avatar.gif"
                        alt="Nguyễn Hồng Sơn"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div 
                    className="absolute bottom-1 right-1 z-20 w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-500 border-2 border-[#0e1017] flex items-center justify-center shadow-lg"
                    title="Online"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping opacity-75" />
                  </div>
                </div>

                {/* Name & Subtitle */}
                <div className="mb-0.5">
                  <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-gradient-rgb font-sans leading-none">
                      Nguyễn Hồng Sơn
                    </h1>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 font-pixel text-[9px] sm:text-[10px]">
                      DEV
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5 mt-1 text-xs sm:text-sm font-mono text-gray-300 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Full Stack <span className="text-gradient-purple font-semibold">Vibe Coder</span></span>
                    </div>
                    <span className="text-gray-600 hidden sm:inline">•</span>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Việt Nam 🇻🇳 (GMT+7)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/15 text-[11px] font-mono self-start sm:self-end">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-gray-400">Status:</span>
                <span className="text-indigo-300 font-semibold">Vibe Coding...</span>
              </div>
            </div>

            {/* Navigation Bar (Hongson | Friends | Font | Plugins | Contact) */}
            <div className="pt-1 sm:pt-2">
              <nav className="flex items-center justify-start gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleTabChange(tab.id)}
                      className={'relative px-3.5 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 flex-shrink-0 ' + (
                        isActive
                          ? 'text-white bg-indigo-600/90 shadow-md shadow-indigo-600/30'
                          : 'text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]'
                      )}
                    >
                      <Icon className={'w-3.5 h-3.5 ' + (isActive ? 'text-white' : 'text-gray-400')} />
                      <span className="font-mono capitalize tracking-wide">{tab.label}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-300 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content Panel - Liền mạch bên trong cùng một thẻ (như cũ) */}
          <div className="px-4 sm:px-6 md:px-8 pb-3 pt-0">
            {mounted ? (
              <div key={activeTab} className="animate-tab-swipe">
                {activeTab === 'hongson' && <TabHongson />}
                {activeTab === 'friends' && <TabFriends />}
                {activeTab === 'font' && <TabFont />}
                {activeTab === 'plugins' && <TabPlugins />}
                {activeTab === 'contact' && <TabContact />}
              </div>
            ) : (
              <div className="min-h-[260px] flex flex-col items-center justify-center gap-2 text-gray-500 font-mono text-xs">
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                <span>Đang kết nối hệ thống...</span>
              </div>
            )}
          </div>

          {/* Footer - Liền mạch dưới chân thẻ */}
          <div className="border-t border-white/10 py-2.5 px-4 sm:px-6 md:px-8 flex items-center justify-between text-[11px] font-mono text-gray-500 bg-black/20">
            <span>© 2026 Nguyễn Hồng Sơn</span>
            <span>Next.js 16 & Tailwind CSS</span>
          </div>
        </div>
      </main>
    </>
  );
}
