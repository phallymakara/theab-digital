import React from 'react';

/**
 * Authentic Vector Khmer Kbach Ornaments (ក្បាច់ខ្មែរពិតប្រាកដ)
 * -----------------------------------------------------------------
 * 1. KbachMokotPhniTes    - ក្បាច់មកុដរាជវាំង & ភ្ញីទេសមាស (Royal Lacquer Gold)
 * 2. KbachPhniPhleung     - ក្បាច់ភ្ញីភ្លើងអង្គរាជ (Crimson Angkoreach)
 * 3. KbachKontuyHong      - ក្បាច់កន្ទុយហង្សសាស្ត្រាស្លឹករឹត (Ivory Parchment)
 * 4. KbachPopilSloekPothi - ក្បាច់ពពិលមង្គល & ស្លឹកពោធិ៍ (Indigo Hol)
 * 5. KbachHorCheangAngkor - ក្បាច់ហោជាងប្រាសាទអង្គរវត្ត (Angkor Pediment)
 * 6. KbachBusabokChatra   - ក្បាច់បុស្បុក & ឆត្ររួត ៩ ជាន់ (Royal Pavilion)
 * 7. KbachSlathorPhkachan - ក្បាច់ស្លាធម៌ ៧ ជាន់ & ផ្កាចន្ទន៍ (Phkachan Slathor)
 */

// Shared Gold Leaf Gradient Component
function GoldDefs({ prefix = 'gold' }) {
  return (
    <defs>
      <linearGradient id={`${prefix}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFEE8" />
        <stop offset="25%" stopColor="#FCE488" />
        <stop offset="60%" stopColor="#E5B232" />
        <stop offset="85%" stopColor="#9C6B10" />
        <stop offset="100%" stopColor="#5B3E05" />
      </linearGradient>
      <linearGradient id={`${prefix}-bright`} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFF8D6" />
        <stop offset="50%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <filter id={`${prefix}-glow`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  );
}

// =========================================================================
// 1. ក្បាច់មកុដរាជវាំង & ភ្ញីទេស (Royal Lacquer Gold)
// =========================================================================
function KbachPhniTesWing({ flip = false, size = 'lg' }) {
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 0.9 : 1.1;
  return (
    <svg
      width={46 * scale}
      height={32 * scale}
      viewBox="0 0 46 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      className="shrink-0"
    >
      <GoldDefs prefix={`phnites-${flip ? 'r' : 'l'}`} />
      {/* Primary Vine Spiral (ក្បាច់វល្លិ៍ភ្ញីទេស) */}
      <path
        d="M2 16 C6 8, 16 4, 24 9 C30 13, 31 22, 24 26 C18 29, 12 24, 15 17 C17 12, 23 12, 24 16 C25 19, 21 21, 19 19"
        stroke={`url(#phnites-${flip ? 'r' : 'l'}-grad)`}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Outer Acanthus Leaf Crests */}
      <path
        d="M24 9 C30 5, 38 7, 44 2 C41 9, 43 17, 36 21 C33 17, 30 14, 24 16"
        fill={`url(#phnites-${flip ? 'r' : 'l'}-grad)`}
        opacity="0.9"
      />
      {/* Lower Leaf Finial */}
      <path
        d="M16 25 C19 28, 25 31, 33 29 C29 26, 26 24, 24 22"
        fill={`url(#phnites-${flip ? 'r' : 'l'}-grad)`}
        opacity="0.75"
      />
      <circle cx="44" cy="2" r="1.5" fill="#FFFDE8" />
    </svg>
  );
}

function RoyalCrownCrest({ size = 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'md' ? 0.85 : 1;
  return (
    <svg
      width={70 * scale}
      height={22 * scale}
      viewBox="0 0 70 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs prefix="crown-crest" />
      {/* Central Spire (កំពូលមកុដ) */}
      <path d="M35 1 L37 8 L43 9 L38 13 L40 19 L35 16 L30 19 L32 13 L27 9 L33 8 Z" fill="url(#crown-crest-grad)" />
      {/* Flanking Crown Crests */}
      <path d="M22 10 C18 10, 13 13, 7 11 C11 15, 17 16, 21 16 Z" fill="url(#crown-crest-grad)" opacity="0.85" />
      <path d="M48 10 C52 10, 57 13, 63 11 C59 15, 53 16, 49 16 Z" fill="url(#crown-crest-grad)" opacity="0.85" />
      {/* Base Lotus Beads */}
      <circle cx="35" cy="1" r="1.5" fill="#FFFDE8" />
      <circle cx="21" cy="15" r="1.2" fill="#FCE692" />
      <circle cx="49" cy="15" r="1.2" fill="#FCE692" />
      <circle cx="35" cy="20" r="1.5" fill="#FFFDE8" />
    </svg>
  );
}

// =========================================================================
// 2. ក្បាច់ភ្ញីភ្លើងអង្គរាជ (Crimson Angkoreach)
// =========================================================================
function KbachPhniPhleungWing({ flip = false, size = 'lg' }) {
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 0.9 : 1.1;
  return (
    <svg
      width={44 * scale}
      height={34 * scale}
      viewBox="0 0 44 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      className="shrink-0"
    >
      <GoldDefs prefix={`flame-${flip ? 'r' : 'l'}`} />
      {/* Triple Ascending Flame Tongues (ក្បាច់ភ្ញីភ្លើង ៣ ថ្នាក់) */}
      <path
        d="M2 32 C6 24, 11 19, 18 18 C14 14, 15 9, 21 5 C23 2, 28 0, 32 1 C28 5, 29 11, 26 14 C33 12, 38 14, 43 9 C40 18, 33 22, 25 24 C20 25, 14 28, 2 32 Z"
        fill={`url(#flame-${flip ? 'r' : 'l'}-grad)`}
        stroke="#7F1D1D"
        strokeWidth="0.6"
      />
      {/* Inner Fire Feather Accent */}
      <path
        d="M12 25 C16 20, 22 17, 28 17 C24 20, 20 24, 16 26 Z"
        fill="#FECDD3"
        opacity="0.8"
      />
      {/* Ruby Jewel Flame Node */}
      <circle cx="32" cy="1" r="1.5" fill="#F43F5E" stroke="#FFF" strokeWidth="0.5" />
    </svg>
  );
}

function AngkoreachApexFlame({ size = 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'md' ? 0.85 : 1;
  return (
    <svg
      width={54 * scale}
      height={22 * scale}
      viewBox="0 0 54 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs prefix="apex-flame" />
      {/* Central Flame Spire with Interlocking Curls */}
      <path
        d="M27 0 C29 6, 34 9, 39 8 C36 12, 33 15, 34 21 C31 17, 29 17, 27 15 C25 17, 23 17, 20 21 C21 15, 18 12, 15 8 C20 9, 25 6, 27 0 Z"
        fill="url(#apex-flame-grad)"
        stroke="#991B1B"
        strokeWidth="0.6"
      />
      <circle cx="27" cy="14" r="2" fill="#E11D48" stroke="#FDE68A" strokeWidth="0.8" />
    </svg>
  );
}

// =========================================================================
// 3. ក្បាច់កន្ទុយហង្ស (Ivory Parchment Manuscript)
// =========================================================================
function KbachKontuyHongWing({ flip = false, size = 'lg' }) {
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 0.9 : 1.1;
  return (
    <svg
      width={48 * scale}
      height={32 * scale}
      viewBox="0 0 48 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      className="shrink-0"
    >
      <GoldDefs prefix={`hong-${flip ? 'r' : 'l'}`} />
      {/* Quadruple Plume Swan-Tail Arc (ក្បាច់កន្ទុយហង្សលាត) */}
      <path
        d="M2 16 C10 16, 17 12, 23 7 C29 2, 38 0, 46 2 C40 6, 38 12, 33 15 C41 15, 46 19, 48 24 C41 24, 36 21, 31 19 C34 24, 33 28, 30 31 C27 28, 25 24, 24 19 C18 20, 10 22, 2 16 Z"
        fill={`url(#hong-${flip ? 'r' : 'l'}-grad)`}
        stroke="#78350F"
        strokeWidth="0.6"
      />
      {/* Inner Feather Slits */}
      <path d="M22 10 C28 8, 35 7, 40 5" stroke="#FFFDF8" strokeWidth="0.8" strokeLinecap="round" />
      <path d="M26 17 C32 17, 39 19, 42 21" stroke="#FFFDF8" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  );
}

function KhmerSealKbach({ size = 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'md' ? 0.85 : 1;
  return (
    <svg
      width={60 * scale}
      height={20 * scale}
      viewBox="0 0 60 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs prefix="khmer-seal" />
      {/* Sacred Palm Leaf Scroll Finial (ក្បាច់ត្រាសាស្ត្រា) */}
      <path d="M4 10 L16 10 M44 10 L56 10" stroke="url(#khmer-seal-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="10" r="2" fill="url(#khmer-seal-grad)" />
      <circle cx="44" cy="10" r="2" fill="url(#khmer-seal-grad)" />
      {/* Central Rosette */}
      <path
        d="M30 2 C33 6, 37 7, 40 10 C37 13, 33 14, 30 18 C27 14, 23 13, 20 10 C23 7, 27 6, 30 2 Z"
        fill="url(#khmer-seal-grad)"
        stroke="#78350F"
        strokeWidth="0.75"
      />
      <circle cx="30" cy="10" r="2" fill="#FFFDF8" />
    </svg>
  );
}

// =========================================================================
// 4. ក្បាច់ស្លឹកពោធិ៍ & ពពិលមាស (Indigo Hol & Popil)
// =========================================================================
function KbachPopilWing({ flip = false, size = 'lg' }) {
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 0.9 : 1.1;
  return (
    <svg
      width={42 * scale}
      height={32 * scale}
      viewBox="0 0 42 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      className="shrink-0"
    >
      <GoldDefs prefix={`popil-${flip ? 'r' : 'l'}`} />
      {/* Sacred Popil Bodhi Wing (ក្បាច់ត្រចៀកពពិល) */}
      <path
        d="M2 16 C8 16, 14 12, 18 7 C24 1, 32 0, 39 3 C36 8, 33 13, 27 16 C34 16, 39 20, 41 26 C35 25, 30 21, 26 18 C26 23, 24 28, 20 31 C18 26, 17 22, 14 18 C9 19, 5 19, 2 16 Z"
        fill={`url(#popil-${flip ? 'r' : 'l'}-grad)`}
        stroke="#1E1B4B"
        strokeWidth="0.6"
      />
      {/* Inner Light Glow */}
      <circle cx="37" cy="4" r="1.5" fill="#FEF08A" />
      <circle cx="40" cy="24" r="1.2" fill="#FEF08A" />
    </svg>
  );
}

function PopilCandleApex({ size = 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'md' ? 0.85 : 1;
  return (
    <svg
      width={56 * scale}
      height={24 * scale}
      viewBox="0 0 56 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs prefix="popil-apex" />
      {/* Three Sacred Popil Candle Flames (អណ្តាតទៀនពពិល ៣) */}
      {/* Center Flame */}
      <path d="M28 1 C30 5, 33 8, 33 12 C33 15, 31 17, 28 17 C25 17, 23 15, 23 12 C23 8, 26 5, 28 1 Z" fill="#FDE047" stroke="#D97706" strokeWidth="0.75" />
      <circle cx="28" cy="11" r="1.5" fill="#FFF" />
      {/* Left Flame */}
      <path d="M18 6 C20 9, 22 11, 22 14 C22 16, 20 18, 18 18 C16 18, 14 16, 14 14 C14 11, 16 9, 18 6 Z" fill="#FDE047" stroke="#D97706" strokeWidth="0.6" />
      {/* Right Flame */}
      <path d="M38 6 C40 9, 42 11, 42 14 C42 16, 40 18, 38 18 C36 18, 34 16, 34 14 C34 11, 36 9, 38 6 Z" fill="#FDE047" stroke="#D97706" strokeWidth="0.6" />
      {/* Base Golden Popil Bar */}
      <path d="M10 20 C18 18, 38 18, 46 20 C42 22, 14 22, 10 20 Z" fill="url(#popil-apex-grad)" />
    </svg>
  );
}

// =========================================================================
// 5. ក្បាច់ហោជាងប្រាសាទថ្មមាស (Angkor Pediment Arch)
// =========================================================================
function KbachNagaEavesWing({ flip = false, size = 'lg' }) {
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 0.9 : 1.1;
  return (
    <svg
      width={46 * scale}
      height={32 * scale}
      viewBox="0 0 46 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      className="shrink-0"
    >
      <GoldDefs prefix={`pediment-${flip ? 'r' : 'l'}`} />
      {/* Angkorian Naga Crest Eaves (ក្បាច់នាគរាជព័ន្ធជើងហោជាង) */}
      <path
        d="M2 28 C6 24, 12 18, 20 15 C26 12, 32 8, 38 3 C41 7, 44 11, 45 16 C40 15, 36 17, 33 20 C36 24, 38 27, 40 31 C33 29, 27 26, 21 24 C14 27, 8 29, 2 28 Z"
        fill={`url(#pediment-${flip ? 'r' : 'l'}-grad)`}
        stroke="#451A03"
        strokeWidth="0.6"
      />
      {/* Sandstone Inlaid Scales */}
      <circle cx="38" cy="3" r="1.5" fill="#FFFDE8" />
      <path d="M22 18 C26 16, 30 14, 34 14" stroke="#FFFDE8" strokeWidth="0.8" />
    </svg>
  );
}

function AngkorPrasatSpireApex({ size = 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'md' ? 0.85 : 1;
  return (
    <svg
      width={72 * scale}
      height={26 * scale}
      viewBox="0 0 72 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs prefix="angkor-spire" />
      {/* 3-Tiered Temple Gable Spire (កំពូលប្រាសាទហោជាង ៣ ថ្នាក់) */}
      {/* Central Prasat Spire */}
      <path d="M36 0 L39 6 L43 7 L40 11 L41 16 L36 14 L31 16 L32 11 L29 7 L33 6 Z" fill="url(#angkor-spire-grad)" stroke="#451A03" strokeWidth="0.5" />
      <circle cx="36" cy="0" r="1.5" fill="#FFFDE8" />
      {/* Stepped Pediment Gable Arch (ធ្នឹមហោជាង) */}
      <path
        d="M8 24 C16 18, 24 14, 36 14 C48 14, 56 18, 64 24 L60 26 C52 20, 44 17, 36 17 C28 17, 20 20, 12 26 Z"
        fill="url(#angkor-spire-grad)"
        stroke="#451A03"
        strokeWidth="0.5"
      />
      {/* Left/Right Miniature Stupas */}
      <path d="M16 19 L18 15 L20 19 Z" fill="url(#angkor-spire-grad)" />
      <path d="M52 19 L54 15 L56 19 Z" fill="url(#angkor-spire-grad)" />
    </svg>
  );
}

// =========================================================================
// 6. ក្បាច់បុស្បុក & ឆត្ររួត ៩ ជាន់ (Royal Pavilion & Astrology)
// =========================================================================
function KbachRoyalChatraWing({ flip = false, size = 'lg' }) {
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 0.9 : 1.1;
  return (
    <svg
      width={44 * scale}
      height={32 * scale}
      viewBox="0 0 44 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      className="shrink-0"
    >
      <GoldDefs prefix={`chatra-${flip ? 'r' : 'l'}`} />
      {/* Royal Canopy Garland Flanks (កម្រងផ្កាក្លាំពូបុស្បុក) */}
      <path
        d="M2 16 C8 14, 15 10, 22 6 C28 2, 36 1, 42 3 C38 8, 34 13, 28 16 C34 17, 38 21, 41 27 C34 26, 29 23, 24 20 C23 24, 21 28, 17 31 C16 26, 14 22, 11 18 C8 18, 5 18, 2 16 Z"
        fill={`url(#chatra-${flip ? 'r' : 'l'}-grad)`}
        stroke="#451A03"
        strokeWidth="0.5"
      />
      {/* Hanging Golden Tassel Drop */}
      <circle cx="42" cy="3" r="1.5" fill="#FFFDE8" />
      <circle cx="41" cy="27" r="1.2" fill="#FCE692" />
    </svg>
  );
}

function RoyalNineTierChatraApex({ size = 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'md' ? 0.85 : 1;
  return (
    <svg
      width={68 * scale}
      height={26 * scale}
      viewBox="0 0 68 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs prefix="nine-tier" />
      {/* 9-Tiered Royal Chatra Parasol Spire (ឆត្ររួត ៩ ជាន់) */}
      {/* Central Spire Pin */}
      <line x1="34" y1="0" x2="34" y2="24" stroke="url(#nine-tier-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="34" cy="1" r="1.8" fill="#FFFDE8" />
      {/* Tier 1 (Top smallest) */}
      <path d="M30 5 C32 4, 36 4, 38 5 L37 6 L31 6 Z" fill="url(#nine-tier-grad)" />
      {/* Tier 2 */}
      <path d="M28 8 C31 7, 37 7, 40 8 L39 9.5 L29 9.5 Z" fill="url(#nine-tier-grad)" />
      {/* Tier 3 */}
      <path d="M25 12 C29 10.5, 39 10.5, 43 12 L41 14 L27 14 Z" fill="url(#nine-tier-grad)" />
      {/* Tier 4 (Broad canopy) */}
      <path d="M20 17 C26 15, 42 15, 48 17 L46 19 L22 19 Z" fill="url(#nine-tier-grad)" />
      {/* Radiating Astrological Rays (រស្មីចក្ររាសី) */}
      <circle cx="34" cy="21" r="2.5" fill="#FFF" stroke="#D97706" strokeWidth="0.8" />
      <line x1="16" y1="21" x2="22" y2="21" stroke="url(#nine-tier-grad)" strokeWidth="1" />
      <line x1="46" y1="21" x2="52" y2="21" stroke="url(#nine-tier-grad)" strokeWidth="1" />
    </svg>
  );
}

// =========================================================================
// 7. ក្បាច់ស្លាធម៌ ៧ ជាន់ & ផ្កាចន្ទន៍ (Phkachan Slathor)
// =========================================================================
function KbachPhkachanWing({ flip = false, size = 'lg' }) {
  const scale = size === 'sm' ? 0.75 : size === 'md' ? 0.9 : 1.1;
  return (
    <svg
      width={44 * scale}
      height={32 * scale}
      viewBox="0 0 44 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
      className="shrink-0"
    >
      <GoldDefs prefix={`phkachan-${flip ? 'r' : 'l'}`} />
      {/* Cascading 8-Petal Sandalwood Blossom Garland (កម្រងផ្កាចន្ទន៍ ៨ ត្របក) */}
      {/* Flower 1 */}
      <circle cx="34" cy="8" r="4" fill={`url(#phkachan-${flip ? 'r' : 'l'}-grad)`} stroke="#78350F" strokeWidth="0.5" />
      <circle cx="34" cy="8" r="1.5" fill="#FFFDE8" />
      {/* Flower 2 */}
      <circle cx="38" cy="22" r="3" fill={`url(#phkachan-${flip ? 'r' : 'l'}-grad)`} stroke="#78350F" strokeWidth="0.5" />
      <circle cx="38" cy="22" r="1.2" fill="#FFFDE8" />
      {/* Intertwining Slathor vine */}
      <path
        d="M2 18 C10 18, 18 14, 25 10 C30 7, 34 8, 34 8 C34 8, 36 16, 38 22 C32 23, 26 21, 20 20 C14 20, 8 20, 2 18 Z"
        fill={`url(#phkachan-${flip ? 'r' : 'l'}-grad)`}
        opacity="0.85"
      />
    </svg>
  );
}

function SlathorSevenTierApex({ size = 'lg' }) {
  const scale = size === 'sm' ? 0.7 : size === 'md' ? 0.85 : 1;
  return (
    <svg
      width={58 * scale}
      height={26 * scale}
      viewBox="0 0 58 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <GoldDefs prefix="slathor-7" />
      {/* Slathor 7-Tier Stupa (ស្លាធម៌ ៧ ជាន់ដង្វាយមង្គល) */}
      {/* Central Pinnacle Lotus Bud */}
      <path d="M29 0 C30 2, 32 3, 32 5 C32 6, 30 7, 29 7 C28 7, 26 6, 26 5 C26 3, 28 2, 29 0 Z" fill="#FFFDE8" stroke="#78350F" strokeWidth="0.5" />
      {/* 7 tiers stepped cone */}
      <path d="M26 8 L32 8 L33 10 L25 10 Z" fill="url(#slathor-7-grad)" />
      <path d="M24 11 L34 11 L35 13 L23 13 Z" fill="url(#slathor-7-grad)" />
      <path d="M22 14 L36 14 L37 16 L21 16 Z" fill="url(#slathor-7-grad)" />
      <path d="M20 17 L38 17 L39 19 L19 19 Z" fill="url(#slathor-7-grad)" />
      <path d="M18 20 L40 20 L41 22 L17 22 Z" fill="url(#slathor-7-grad)" />
      {/* Slathor Pedestal Bowl (ជើងពានស្លាធម៌) */}
      <path d="M14 23 C20 22, 38 22, 44 23 L42 26 L16 26 Z" fill="url(#slathor-7-grad)" stroke="#78350F" strokeWidth="0.5" />
      {/* Flanking Jasmine Bud Accents */}
      <circle cx="8" cy="22" r="1.8" fill="#FFFDE8" stroke="#D97706" strokeWidth="0.5" />
      <circle cx="50" cy="22" r="1.8" fill="#FFFDE8" stroke="#D97706" strokeWidth="0.5" />
    </svg>
  );
}

/**
 * TraditionalBadgeComponent
 * -----------------------------------------------------------------
 * Renders 7 distinctly unique, authentic Khmer Kbach vector badges
 * for each template in the "បុរាណមហានគរ" category.
 */
export function TraditionalBadgeComponent({
  templateId = 'traditional-lacquer-gold',
  title = 'សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍',
  size = 'lg' // 'sm' (card grid), 'md' (modal preview), 'lg' (hero section)
}) {
  const isSm = size === 'sm';
  const isMd = size === 'md';

  switch (templateId) {
    // -------------------------------------------------------------
    // មង្គលសិរីមាសប្រណិត (Royal Gold Heritage - Kh Ang Komutt A Font)
    // -------------------------------------------------------------
    case 'royal-gold':
      return (
        <div className="relative inline-flex items-center justify-center select-none py-1">
          <h1 className={`font-komutt-a tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-amber-200 text-center whitespace-nowrap ${
            isSm ? 'text-xs sm:text-sm' : isMd ? 'text-sm sm:text-base' : 'text-lg sm:text-xl md:text-2xl'
          }`}>
            {title}
          </h1>
        </div>
      );

    // -------------------------------------------------------------
    // 1. បុរាណមហានគរ (Angkor Ancient Royalty) - Kh Ang Kouteok Font
    // -------------------------------------------------------------
    case 'angkor-ancient-royalty':
      return (
        <div className="relative inline-flex items-center justify-center select-none py-1">
          <h1 className={`font-kouteok tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-amber-200 text-center whitespace-nowrap ${
            isSm ? 'text-xs sm:text-sm' : isMd ? 'text-sm sm:text-base' : 'text-lg sm:text-xl md:text-2xl'
          }`}>
            {title}
          </h1>
        </div>
      );

    // -------------------------------------------------------------
    // 2. មង្គលរាជវាំងលា័ក្ខមាស (Royal Lacquer Gold - ASvadek Momo Font)
    // -------------------------------------------------------------
    case 'traditional-royal-lacquer':
    case 'traditional-lacquer-gold':
      return (
        <div className="relative inline-flex items-center justify-center select-none py-1">
          <h1 className={`font-momo tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-amber-200 text-center whitespace-nowrap ${
            isSm ? 'text-[11px] sm:text-xs' : isMd ? 'text-xs sm:text-sm' : 'text-base sm:text-lg md:text-xl'
          }`}>
            {title}
          </h1>
        </div>
      );

    // -------------------------------------------------------------
    // 2. មង្គលក្បាច់អង្គរាជ (Crimson Angkoreach - Kh Ang Kouteok Font)
    // -------------------------------------------------------------
    case 'traditional-crimson-angkoreach':
      return (
        <div className="relative inline-flex items-center justify-center select-none py-1">
          <h1 className={`font-kouteok tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-amber-200 text-center whitespace-nowrap ${
            isSm ? 'text-[11px] sm:text-xs' : isMd ? 'text-xs sm:text-sm' : 'text-base sm:text-lg md:text-xl'
          }`}>
            {title}
          </h1>
        </div>
      );

    // -------------------------------------------------------------
    // 3. ក្រាំងមាសសូត្រភ្លុក (Ivory Parchment Manuscript) - ក្បាច់កន្ទុយហង្ស
    // -------------------------------------------------------------
    case 'traditional-ivory-parchment':
      return (
        <div className="relative inline-flex flex-col items-center justify-center select-none">
          {/* Top Palm-Leaf Seal */}
          <div className="mb-[-2px] z-10 drop-shadow-[0_2px_6px_rgba(180,83,9,0.5)]">
            <KhmerSealKbach size={size} />
          </div>

          {/* Ivory Silk Manuscript Scroll */}
          <div className={`relative inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E5] to-[#F5ECE0] border-2 border-[#B69225] shadow-[0_6px_25px_rgba(182,146,37,0.45)] backdrop-blur-md ${
            isSm ? 'px-2 py-0.5 gap-1' : isMd ? 'px-3 py-1 gap-1.5' : 'px-4 py-1.5 sm:px-6 sm:py-2 gap-2 sm:gap-3'
          }`}>
            <KbachKontuyHongWing flip={false} size={size} />

            <h1 className={`font-moul tracking-wider drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)] text-[#63480B] text-center whitespace-nowrap px-1 ${
              isSm ? 'text-[10px]' : isMd ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-base md:text-lg'
            }`}>
              {title}
            </h1>

            <KbachKontuyHongWing flip={true} size={size} />
          </div>

          {!isSm && (
            <div className="mt-1 flex items-center justify-center gap-1.5 opacity-90">
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-amber-700" />
              <span className="text-[10px] tracking-widest uppercase font-serifTrad text-amber-900 font-bold">
                ក្បាច់កន្ទុយហង្សសាស្ត្រាស្លឹករឹត
              </span>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-amber-700" />
            </div>
          )}
        </div>
      );

    // -------------------------------------------------------------
    // 4. ហូលពពិលឥន្ទ្រនីលមាស (Indigo Hol & Popil) - ក្បាច់ពពិលមាស
    // -------------------------------------------------------------
    case 'traditional-indigo-hol':
      return (
        <div className="relative inline-flex flex-col items-center justify-center select-none">
          {/* Top 3 Popil Flames */}
          <div className="mb-[-2px] z-10 drop-shadow-[0_2px_10px_rgba(251,191,36,0.8)]">
            <PopilCandleApex size={size} />
          </div>

          {/* Sapphire Shield with Bodhi Popil Wings */}
          <div className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-[#090C1A] via-[#161540] to-[#090C1A] border-2 border-indigo-400/90 ring-1 ring-amber-300/60 shadow-[0_4px_25px_rgba(99,102,241,0.6)] backdrop-blur-md ${
            isSm ? 'px-2 py-0.5 gap-1' : isMd ? 'px-3 py-1 gap-1.5' : 'px-4 py-1.5 sm:px-6 sm:py-2 gap-2 sm:gap-3'
          }`}>
            <KbachPopilWing flip={false} size={size} />

            <h1 className={`font-moul tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] bg-gradient-to-r from-[#EEF2FF] via-[#C7D2FE] to-[#FDE047] bg-clip-text text-transparent text-center whitespace-nowrap px-1 ${
              isSm ? 'text-[10px]' : isMd ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-base md:text-lg'
            }`}>
              {title}
            </h1>

            <KbachPopilWing flip={true} size={size} />
          </div>

          {!isSm && (
            <div className="mt-1 flex items-center justify-center gap-1.5 opacity-90">
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-indigo-400" />
              <span className="text-[10px] tracking-widest uppercase font-serifTrad text-indigo-200 font-bold">
                ក្បាច់ពពិលមង្គល & ស្លឹកពោធិ៍
              </span>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-indigo-400" />
            </div>
          )}
        </div>
      );

    // -------------------------------------------------------------
    // 5. ហោជាងប្រាសាទថ្មមាស (Angkor Stone Pediment) - ក្បាច់ហោជាងប្រាសាទ
    // -------------------------------------------------------------
    case 'traditional-angkor-pediment':
      return (
        <div className="relative inline-flex flex-col items-center justify-center select-none">
          {/* Top 3-Tiered Temple Gable Spire */}
          <div className="mb-[-2px] z-10 drop-shadow-[0_2px_10px_rgba(217,119,6,0.7)]">
            <AngkorPrasatSpireApex size={size} />
          </div>

          {/* Angkorian Gable Arch */}
          <div className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#1E1914] via-[#14100D] to-[#0A0806] border-2 border-amber-400 ring-1 ring-amber-300/50 shadow-[0_6px_30px_rgba(0,0,0,0.9)] backdrop-blur-md ${
            isSm ? 'px-2 py-0.5 gap-1' : isMd ? 'px-3 py-1 gap-1.5' : 'px-4 py-1.5 sm:px-6 sm:py-2 gap-2 sm:gap-3'
          }`}>
            <KbachNagaEavesWing flip={false} size={size} />

            <h1 className={`font-moul tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] bg-gradient-to-r from-[#FFFCE8] via-[#FDE68A] to-[#D97706] bg-clip-text text-transparent text-center whitespace-nowrap px-1 ${
              isSm ? 'text-[10px]' : isMd ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-base md:text-lg'
            }`}>
              {title}
            </h1>

            <KbachNagaEavesWing flip={true} size={size} />
          </div>

          {!isSm && (
            <div className="mt-1 flex items-center justify-center gap-1.5 opacity-90">
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="text-[10px] tracking-widest uppercase font-serifTrad text-amber-300 font-bold">
                ក្បាច់ហោជាងប្រាសាទអង្គរ
              </span>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
          )}
        </div>
      );

    // -------------------------------------------------------------
    // 6. ព្រះពន្លាមាស ហោរាសាស្ត្រមង្គល (Royal Pavilion) - ក្បាច់ឆត្ររួត ៩ ជាន់
    // -------------------------------------------------------------
    case 'traditional-royal-pavilion':
      return (
        <div className="relative inline-flex flex-col items-center justify-center select-none">
          {/* Top 9-Tiered Royal Chatra Parasol Spire */}
          <div className="mb-[-2px] z-10 drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)]">
            <RoyalNineTierChatraApex size={size} />
          </div>

          {/* Pavilion Cartouche with Hanging Tassels */}
          <div className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-b from-[#2B1F05]/95 via-[#140E02]/95 to-[#0A0701] border-2 border-amber-300 ring-1 ring-amber-200/50 shadow-[0_0_30px_rgba(245,158,11,0.6)] backdrop-blur-md ${
            isSm ? 'px-2 py-0.5 gap-1' : isMd ? 'px-3 py-1 gap-1.5' : 'px-4 py-1.5 sm:px-6 sm:py-2 gap-2 sm:gap-3'
          }`}>
            <KbachRoyalChatraWing flip={false} size={size} />

            <h1 className={`font-moul tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] bg-gradient-to-r from-[#FFFFFF] via-[#FEF08A] to-[#F59E0B] bg-clip-text text-transparent text-center whitespace-nowrap px-1 ${
              isSm ? 'text-[10px]' : isMd ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-base md:text-lg'
            }`}>
              {title}
            </h1>

            <KbachRoyalChatraWing flip={true} size={size} />
          </div>

          {!isSm && (
            <div className="mt-1 flex items-center justify-center gap-1.5 opacity-90">
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-amber-300" />
              <span className="text-[10px] tracking-widest uppercase font-serifTrad text-amber-200 font-bold">
                ក្បាច់បុស្បុក & ឆត្ររួត ៩ ជាន់
              </span>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-amber-300" />
            </div>
          )}
        </div>
      );

    // -------------------------------------------------------------
    // 7. សូត្រផ្កាចន្ទន៍ដង្វាយមាស (Phkachan Slathor) - ក្បាច់ស្លាធម៌ & ផ្កាចន្ទន៍
    // -------------------------------------------------------------
    case 'traditional-phkachan-slathor':
    default:
      return (
        <div className="relative inline-flex flex-col items-center justify-center select-none">
          {/* Top Slathor 7-Tier Stupa */}
          <div className="mb-[-2px] z-10 drop-shadow-[0_2px_10px_rgba(212,175,55,0.7)]">
            <SlathorSevenTierApex size={size} />
          </div>

          {/* Sandalwood Garland Capsule */}
          <div className={`relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#17120A] via-[#241A0B] to-[#17120A] border-2 border-amber-400 ring-2 ring-amber-300/40 shadow-[0_0_25px_rgba(212,175,55,0.5)] backdrop-blur-md ${
            isSm ? 'px-2 py-0.5 gap-1' : isMd ? 'px-3 py-1 gap-1.5' : 'px-4 py-1.5 sm:px-6 sm:py-2 gap-2 sm:gap-3'
          }`}>
            <KbachPhkachanWing flip={false} size={size} />

            <h1 className={`font-moul tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] bg-gradient-to-r from-[#FFFBEB] via-[#FDE68A] to-[#EAB308] bg-clip-text text-transparent text-center whitespace-nowrap px-1 ${
              isSm ? 'text-[10px]' : isMd ? 'text-xs sm:text-[13px]' : 'text-sm sm:text-base md:text-lg'
            }`}>
              {title}
            </h1>

            <KbachPhkachanWing flip={true} size={size} />
          </div>

          {!isSm && (
            <div className="mt-1 flex items-center justify-center gap-1.5 opacity-90">
              <span className="h-[1px] w-6 bg-gradient-to-r from-transparent to-amber-400" />
              <span className="text-[10px] tracking-widest uppercase font-serifTrad text-amber-300 font-bold">
                ក្បាច់ស្លាធម៌ ៧ ជាន់ & ផ្កាចន្ទន៍
              </span>
              <span className="h-[1px] w-6 bg-gradient-to-l from-transparent to-amber-400" />
            </div>
          )}
        </div>
      );
  }
}

export default TraditionalBadgeComponent;
