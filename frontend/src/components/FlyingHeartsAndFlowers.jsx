import React, { useMemo } from 'react';
import { Heart, Flower2 } from 'lucide-react';

const HEART_COLORS = [
  'text-amber-200 fill-amber-400 drop-shadow-[0_2px_8px_rgba(212,175,55,0.7)]',
  'text-yellow-100 fill-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.65)]',
  'text-amber-300 fill-yellow-500 drop-shadow-[0_2px_8px_rgba(212,175,55,0.75)]',
  'text-amber-100 fill-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.6)]',
  'text-yellow-200 fill-amber-500 drop-shadow-[0_2px_8px_rgba(212,175,55,0.7)]',
];

const FLOWER_COLORS = [
  'text-amber-100 fill-amber-300 drop-shadow-[0_2px_6px_rgba(212,175,55,0.7)]',
  'text-yellow-200 fill-amber-400 drop-shadow-[0_2px_6px_rgba(245,158,11,0.65)]',
  'text-amber-200 fill-yellow-400 drop-shadow-[0_2px_6px_rgba(212,175,55,0.7)]',
  'text-yellow-100 fill-amber-200 drop-shadow-[0_2px_6px_rgba(254,243,199,0.75)]',
  'text-amber-300 fill-amber-500 drop-shadow-[0_2px_6px_rgba(212,175,55,0.7)]',
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
  // Generate a randomized, smooth, 3D multi-directional mix of hearts and flowers
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, idx) => {
      // Guaranteed 50/50 mix: even = heart, odd = flower
      const isHeart = idx % 2 === 0;
      const type = isHeart ? 'heart' : 'flower';

      // Random position across BOTH horizontal and vertical axes (not just bottom)
      const baseLeft = (idx / count) * 82 + 8;
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
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none opacity-70">
      {particles.map((p) => (
        <div
          key={p.id}
          className={`absolute will-change-transform ${p.animClass} ${p.colorClass}`}
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
