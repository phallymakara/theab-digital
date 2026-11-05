import React, { useMemo } from 'react';
import { Heart, Flower2 } from 'lucide-react';

const HEART_COLORS = [
  'text-amber-200 fill-amber-400',
  'text-yellow-100 fill-amber-300',
  'text-amber-300 fill-yellow-500',
  'text-amber-100 fill-amber-400',
  'text-yellow-200 fill-amber-500',
];

const FLOWER_COLORS = [
  'text-amber-100 fill-amber-300',
  'text-yellow-200 fill-amber-400',
  'text-amber-200 fill-yellow-400',
  'text-yellow-100 fill-amber-200',
  'text-amber-300 fill-amber-500',
];

// Multi-directional smooth flight animation classes
const SMOOTH_TRAJECTORIES = [
  'animate-smooth-ambient-1',
  'animate-smooth-ambient-2',
  'animate-smooth-fly-up',
  'animate-smooth-fly-down',
  'animate-smooth-cross-right',
  'animate-smooth-cross-left',
];

export function FlyingHeartsAndFlowers({ count = 8 }) {
  // Mobile thermal & power optimization: Completely disable particle animations on mobile screens
  // and for users requesting reduced motion.
  const isMobileOrReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return true;
    const isMobile = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    return isMobile || prefersReducedMotion;
  }, []);

  if (isMobileOrReducedMotion) return null;

  const effectiveCount = Math.min(count, 8);
  // Generate a randomized, smooth, 3D multi-directional mix of hearts and flowers
  const particles = useMemo(() => {
    return Array.from({ length: effectiveCount }, (_, idx) => {
      // Guaranteed 50/50 mix: even = heart, odd = flower
      const isHeart = idx % 2 === 0;
      const type = isHeart ? 'heart' : 'flower';

      // Random position across BOTH horizontal and vertical axes (not just bottom)
      const baseLeft = (idx / effectiveCount) * 82 + 8;
      const jitterX = (Math.random() - 0.5) * 12;
      const left = Math.min(92, Math.max(6, baseLeft + jitterX)).toFixed(1);

      // Random top position across the whole container height (8% to 88%)
      const top = (8 + Math.random() * 78).toFixed(1);

      // Smooth, gentle floating duration (6.5s to 12.0s)
      const duration = (6.5 + Math.random() * 5.5).toFixed(2);

      // Negative staggered delay for continuous seamless motion from frame 1
      const delay = (-Math.random() * 9.0).toFixed(2);

      // Random particle size (13px to 22px)
      const size = Math.floor(13 + Math.random() * 9);

      // Random color theme
      const colorClass = isHeart
        ? HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)]
        : FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)];

      // Pick trajectory from multi-directional smooth flights
      const animClass = SMOOTH_TRAJECTORIES[idx % SMOOTH_TRAJECTORIES.length];

      return {
        id: idx,
        type,
        left: `${left}%`,
        top: `${top}%`,
        duration: `${duration}s`,
        delay: `${delay}s`,
        size,
        colorClass,
        animClass,
      };
    });
  }, [effectiveCount]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none opacity-70 transform-gpu">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute will-change-transform transform-gpu ${p.animClass} ${p.colorClass}`}
          style={{
            left: p.left,
            top: p.top,
            animationDuration: p.duration,
            animationDelay: p.delay,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          {p.type === 'heart' ? (
            <Heart className="w-full h-full" />
          ) : (
            <Flower2 className="w-full h-full" />
          )}
        </div>
      ))}
    </div>
  );
}
