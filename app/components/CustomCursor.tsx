'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
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

