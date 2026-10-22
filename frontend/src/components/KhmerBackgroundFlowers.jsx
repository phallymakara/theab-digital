import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';

/**
 * ផ្ការំដួល (Khmer Rumduol Flower - Translucent Ethereal Silk Gold)
 */
function KhmerRumduol({ size = 32, id = 'r1', className = '' }) {
  return (
    <svg viewBox="0 0 48 48" style={{ width: size, height: size }} className={className}>
      <defs>
        <linearGradient id={`rumduol-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.75" />
          <stop offset="40%" stopColor="#FBBF24" stopOpacity="0.65" />
          <stop offset="80%" stopColor="#D97706" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#92400E" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id={`rumduol-core-${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      {/* 3 Outer Petals */}
      <path
        d="M24 4 C28 12 34 16 41 21 C33 24 29 30 24 24 C19 30 15 24 7 21 C14 16 20 12 24 4 Z"
        fill={`url(#rumduol-grad-${id})`}
      />
      <path
        d="M41 21 C33 26 31 34 33 43 C26 37 22 33 24 24 C29 30 33 24 41 21 Z"
        fill={`url(#rumduol-grad-${id})`}
      />
      <path
        d="M7 21 C15 26 17 34 15 43 C22 37 26 33 24 24 C19 30 15 24 7 21 Z"
        fill={`url(#rumduol-grad-${id})`}
      />
      {/* 3 Inner Petals & Core */}
      <circle cx="24" cy="24" r="8" fill={`url(#rumduol-grad-${id})`} opacity="0.8" />
      <circle cx="24" cy="24" r="4.5" fill={`url(#rumduol-core-${id})`} />
      <circle cx="24" cy="24" r="2" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

/**
 * ផ្កាចន្ទន៍ (Khmer Pka Chan Flower - Translucent Royal 8-Petal Rosette)
 */
function KhmerPkaChan({ size = 32, id = 'pc1', className = '' }) {
  return (
    <svg viewBox="0 0 48 48" style={{ width: size, height: size }} className={className}>
      <defs>
        <linearGradient id={`pkachan-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.75" />
          <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <g transform="translate(24, 24)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <path
            key={i}
            d="M 0 0 C -4 -8, -6 -15, 0 -22 C 6 -15, 4 -8, 0 0 Z"
            transform={`rotate(${angle})`}
            fill={`url(#pkachan-grad-${id})`}
          />
        ))}
        <circle cx="0" cy="0" r="6" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.2" opacity="0.85" />
        <circle cx="0" cy="0" r="2.8" fill="#F59E0B" opacity="0.9" />
      </g>
    </svg>
  );
}

/**
 * ផ្កាឈូកមង្គល (Khmer Sacred Lotus Blossom - Translucent Soft Rose Gold)
 */
function KhmerLotusBloom({ size = 30, id = 'lt1', className = '' }) {
  return (
    <svg viewBox="0 0 48 48" style={{ width: size, height: size }} className={className}>
      <defs>
        <linearGradient id={`lotus-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.75" />
          <stop offset="45%" stopColor="#FDA4AF" stopOpacity="0.65" />
          <stop offset="85%" stopColor="#E11D48" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#9F1239" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path d="M24 6 C28 14 30 24 24 38 C18 24 20 14 24 6 Z" fill={`url(#lotus-grad-${id})`} />
      <path d="M24 16 C32 20 38 27 38 34 C32 37 27 36 24 38 C21 36 16 37 10 34 C10 27 16 20 24 16 Z" fill={`url(#lotus-grad-${id})`} opacity="0.75" />
      <path d="M24 22 C36 24 43 31 42 38 C35 41 29 39 24 40 C19 39 13 41 6 38 C5 31 12 24 24 22 Z" fill={`url(#lotus-grad-${id})`} opacity="0.55" />
      <circle cx="24" cy="36" r="3" fill="#FBBF24" opacity="0.8" />
    </svg>
  );
}

/**
 * ផ្កាម្លិះ (Khmer Jasmine Petal - Translucent White Gold)
 */
function KhmerJasminePetal({ size = 22, id = 'jm1', className = '' }) {
  return (
    <svg viewBox="0 0 32 32" style={{ width: size, height: size }} className={className}>
      <defs>
        <linearGradient id={`jasmine-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FEF3C7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 C11 8 6 15 8 22 A8 8 0 0 0 24 22 C26 15 21 8 16 2 Z"
        fill={`url(#jasmine-grad-${id})`}
      />
    </svg>
  );
}

/**
 * បេះដូងក្បាច់ខ្មែរ (Modern Royal Khmer Heart with Kbach Crown)
 */
function KhmerRoyalHeart({ size = 32, id = 'rh1', className = '' }) {
  return (
    <svg viewBox="0 0 48 48" style={{ width: size, height: size }} className={className}>
      <defs>
        <linearGradient id={`kheart-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF1F2" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#FDA4AF" stopOpacity="0.75" />
          <stop offset="70%" stopColor="#E11D48" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#9F1239" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id={`kgold-crown-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#B45309" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path
        d="M24 2 C22 6 20 8 18 10 C21 9 23 11 24 13 C25 11 27 9 30 10 C28 8 26 6 24 2 Z"
        fill={`url(#kgold-crown-${id})`}
      />
      <path
        d="M24 42 C21 39 8 28 8 19 C8 13.5 12.5 9 18 9 C20.5 9 22.8 10 24 11.8 C25.2 10 27.5 9 30 9 C35.5 9 40 13.5 40 19 C40 28 27 39 24 42 Z"
        fill={`url(#kheart-grad-${id})`}
      />
      <path
        d="M24 37 C21.5 34.5 12 25 12 19 C12 15.5 14.5 12.5 18 12.5 C19.8 12.5 21.5 13.3 22.5 14.8 L24 16.8 L25.5 14.8 C26.5 13.3 28.2 12.5 30 12.5 C33.5 12.5 36 15.5 36 19 C36 25 26.5 34.5 24 37 Z"
        fill="none"
        stroke={`url(#kgold-crown-${id})`}
        strokeWidth="1.2"
        strokeDasharray="2.5 1.5"
        opacity="0.75"
      />
    </svg>
  );
}

/**
 * បេះដូងហោះស្នេហ៍ (Flying Romantic Translucent Heart)
 */
function FlyingRomanticHeart({ size = 24, variant = 0 }) {
  const styles = [
    'text-rose-400 fill-rose-300/40 drop-shadow-[0_2px_8px_rgba(244,63,94,0.35)]',
    'text-amber-300 fill-amber-200/35 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]',
    'text-pink-400 fill-pink-300/40 drop-shadow-[0_2px_8px_rgba(236,72,153,0.35)]',
    'text-red-400 fill-rose-400/35 drop-shadow-[0_2px_8px_rgba(225,29,72,0.3)]',
  ];
  const colorClass = styles[variant % styles.length];

  return (
    <div style={{ width: size, height: size }}>
      <Heart className={`w-full h-full ${colorClass}`} />
    </div>
  );
}

// Animation trajectory classes
const FLOWER_ANIMATIONS = [
  'animate-khmer-sway-1',
  'animate-khmer-sway-2',
  'animate-khmer-sway-pulse',
  'animate-khmer-diag-left',
  'animate-khmer-diag-right',
];

const HEART_FLY_ANIMATIONS = [
  'animate-khmer-heart-fly-1',
  'animate-khmer-heart-fly-2',
  'animate-khmer-heart-fly-3',
];

/**
 * KhmerFloatingBackground Component
 * Renders modern authentic Khmer floral motifs with enhanced transparency (more translucent & dreamy)
 * intermixed with flying hearts that float and fly upwards smoothly outside the container page.
 */
export function KhmerFloatingBackground({ count = 32 }) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, idx) => {
      // 50% Flowers, 50% Flying Hearts
      const isHeart = idx % 2 === 1;

      // Distribution: Place 44% on left flank, 44% on right flank, 12% top/bottom ambient
      let leftPercent;
      const zone = idx % 5;
      if (zone === 0 || zone === 1) {
        // Left Flank (outside modal on desktop/tablet)
        leftPercent = 1.2 + Math.random() * 18.5;
      } else if (zone === 2 || zone === 3) {
        // Right Flank (outside modal on desktop/tablet)
        leftPercent = 80.0 + Math.random() * 18.5;
      } else {
        // Ambient background drift around margins
        leftPercent = 18 + Math.random() * 64;
      }

      // Vertical position (for flying hearts, distribute them along lower/mid heights so they fly upwards)
      const topPercent = isHeart
        ? 35 + Math.random() * 60 // Hearts start lower and fly up
        : 6 + Math.random() * 84; // Flowers sway across full height

      // Sizes: elegant variation
      const size = isHeart
        ? Math.floor(16 + Math.random() * 18) // Hearts: 16px - 34px
        : Math.floor(22 + Math.random() * 20); // Flowers: 22px - 42px

      // Duration: Smooth, slow motion
      const duration = isHeart
        ? (9.5 + (idx % 5) * 1.6).toFixed(1) // Hearts fly up in 9.5s - 16s
        : (14 + (idx % 6) * 1.8).toFixed(1); // Flowers sway in 14s - 23s

      // Staggered negative delay for seamless immediate motion from frame 1
      const delay = (-((idx * 1.8) % 18)).toFixed(1);

      // Trajectory
      const animClass = isHeart
        ? HEART_FLY_ANIMATIONS[idx % HEART_FLY_ANIMATIONS.length]
        : FLOWER_ANIMATIONS[idx % FLOWER_ANIMATIONS.length];

      // Flower specific sub-types
      const flowerTypes = ['rumduol', 'pkachan', 'lotus', 'jasmine'];
      const flowerType = flowerTypes[idx % flowerTypes.length];

      // Heart specific sub-types
      const heartType = idx % 4 === 0 ? 'royalheart' : 'flyingheart';

      // Enhanced transparency: Soft translucent opacity (0.35 to 0.55)
      const opacity = isHeart ? 0.65 : 0.42;

      return {
        id: `k-motif-${idx}`,
        isHeart,
        flowerType,
        heartType,
        left: `${leftPercent.toFixed(1)}%`,
        top: `${Math.min(94, Math.max(3, topPercent)).toFixed(1)}%`,
        size,
        duration: `${duration}s`,
        delay: `${delay}s`,
        animClass,
        opacity,
      };
    });
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {particles.map((p) => {
        let content;
        if (p.isHeart) {
          if (p.heartType === 'royalheart') {
            content = <KhmerRoyalHeart size={p.size} id={p.id} className="drop-shadow-[0_2px_10px_rgba(244,63,94,0.3)]" />;
          } else {
            content = <FlyingRomanticHeart size={p.size} variant={parseInt(p.id.replace(/\D/g, '') || '0', 10)} />;
          }
        } else {
          // Translucent Khmer flowers
          if (p.flowerType === 'rumduol') {
            content = <KhmerRumduol size={p.size} id={p.id} className="drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]" />;
          } else if (p.flowerType === 'pkachan') {
            content = <KhmerPkaChan size={p.size} id={p.id} className="drop-shadow-[0_2px_8px_rgba(212,175,55,0.2)]" />;
          } else if (p.flowerType === 'lotus') {
            content = <KhmerLotusBloom size={p.size} id={p.id} className="drop-shadow-[0_2px_8px_rgba(244,63,94,0.2)]" />;
          } else {
            content = <KhmerJasminePetal size={Math.round(p.size * 0.75)} id={p.id} className="drop-shadow-[0_2px_6px_rgba(212,175,55,0.2)]" />;
          }
        }

        return (
          <div
            key={p.id}
            className={`absolute will-change-transform ${p.animClass}`}
            style={{
              left: p.left,
              top: p.top,
              animationDuration: p.duration,
              animationDelay: p.delay,
              opacity: p.opacity,
            }}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}

export default KhmerFloatingBackground;
