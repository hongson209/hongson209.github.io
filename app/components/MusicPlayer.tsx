'use client';

import React from 'react';
import { Music, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export interface MusicPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isMuted: boolean;
  setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MusicPlayer({
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

