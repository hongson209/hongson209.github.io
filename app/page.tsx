'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  User, Users, Mail, Code2, MapPin, Wrench, Loader2
} from 'lucide-react';

import CustomCursor from './components/CustomCursor';
import MusicPlayer from './components/MusicPlayer';
import TabHongson from './components/TabHongson';
import TabFriends from './components/TabFriends';
import TabTools, { ToolSubTab } from './components/TabTools';
import TabContact from './components/TabContact';

export type TabType = 'hongson' | 'friends' | 'tools' | 'contact';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('hongson');
  const [toolsSubTab, setToolsSubTab] = useState<ToolSubTab>('translator');
  const [mounted, setMounted] = useState(false);
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
    setHasEntered(true);
    const audio = audioRef.current;
    if (audio) {
      try {
        if (audio.currentTime < 25) {
          audio.currentTime = 25;
        }
      } catch {}
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleTabChange = (tabId: TabType) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('profile_active_tab', tabId);
      window.history.replaceState(null, '', `#${tabId}`);
    }
  };

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const rawPath = window.location.pathname.replace(/^\/+/, '').split('/')[0];
      const rawHash = window.location.hash.replace('#', '');
      const storedTab = localStorage.getItem('profile_active_tab') || '';

      const targetRoute = (rawHash || rawPath || storedTab).toLowerCase();

      if (targetRoute === 'font') {
        setActiveTab('tools');
        setToolsSubTab('font');
      } else if (targetRoute === 'plugins') {
        setActiveTab('tools');
        setToolsSubTab('plugins');
      } else if (targetRoute === 'tools' || targetRoute === 'tool' || targetRoute === 'translator') {
        setActiveTab('tools');
        setToolsSubTab('translator');
      } else if (targetRoute === 'friends') {
        setActiveTab('friends');
      } else if (targetRoute === 'contact') {
        setActiveTab('contact');
      } else {
        setActiveTab('hongson');
      }
    }
  }, []);

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
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <>
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
        preload="auto"
        playsInline
      />

      {/* Màn hình "Click to Enter" với loading.gif nổi bật */}
      <div
        onClick={handleEnter}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/60 backdrop-blur-md cursor-pointer select-none transition-all duration-700 ease-out ${
          hasEntered ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex flex-col items-center gap-3 text-center px-4">
          {/* Cute vibing anime loading gif */}
          <div className="relative">
            <img
              src="/loading.gif"
              alt="Loading"
              className="w-28 h-28 sm:w-36 sm:h-36 object-contain select-none pointer-events-none"
            />
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <p className="text-sm sm:text-base font-mono tracking-[0.25em] uppercase text-white/90 font-medium animate-pulse">
              [ click to enter ]
            </p>
            <p className="text-xs font-mono text-white/40 tracking-wider">
              nhấp chuột bất kỳ đâu để vào website
            </p>
          </div>
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

      {/* Main Container - Responsive for PE (Mobile) and PC */}
      <main
        suppressHydrationWarning={true}
        className={`w-full ${
          activeTab === 'tools' ? 'max-w-5xl lg:max-w-6xl' : 'max-w-4xl lg:max-w-5xl xl:max-w-6xl'
        } my-2 lg:my-auto py-1 sm:py-2 px-1.5 sm:px-4 scale-100 lg:scale-[0.96] xl:scale-100 origin-center transition-all duration-500 ease-out max-h-none lg:max-h-[96vh] pb-8 lg:pb-0 ${
          hasEntered
            ? 'opacity-100 scale-100 lg:scale-[0.96] xl:scale-100 blur-0 pointer-events-auto'
            : 'opacity-60 scale-100 lg:scale-[0.96] xl:scale-100 blur-[2px] pointer-events-none'
        }`}
      >
        <div
          suppressHydrationWarning={true}
          className="relative rounded-3xl bg-[#0e1017]/70 border border-white/15 shadow-[0_0_60px_-15px_rgba(99,102,241,0.3)] overflow-hidden backdrop-blur-2xl transition-all"
        >
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

            {/* Navigation Bar (Hongson | Friends | Tools | Contact) */}
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

          {/* Tab Content Panel */}
          <div className="px-4 sm:px-6 md:px-8 pb-3 pt-0">
            {mounted ? (
              <div key={activeTab} className="animate-tab-swipe">
                {activeTab === 'hongson' && <TabHongson />}
                {activeTab === 'friends' && <TabFriends />}
                {activeTab === 'tools' && <TabTools initialSubTab={toolsSubTab} />}
                {activeTab === 'contact' && <TabContact />}
              </div>
            ) : (
              <div className="min-h-[260px] flex flex-col items-center justify-center gap-2 text-gray-500 font-mono text-xs">
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                <span>Đang kết nối hệ thống...</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 py-2.5 px-4 sm:px-6 md:px-8 flex items-center justify-between text-[11px] font-mono text-gray-500 bg-black/20">
            <span>© 2026 Nguyễn Hồng Sơn</span>
            <span>Next.js 16 &amp; Tailwind CSS</span>
          </div>
        </div>
      </main>
    </>
  );
}