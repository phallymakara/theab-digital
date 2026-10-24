import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, MapPin, Music, Heart, Send, Copy, Check, X, Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX, Flower2 } from 'lucide-react';

// Soft Flute & Acoustic Romantic Melody Synthesizer (C Major / F Major / G Major gentle harmonies)
class JasmineRomanceAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.step = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, dur = 1.8, type = 'sine', gainVal = 0.1) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, this.ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + dur);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Romantic acoustic melody (Hz) - Sweet Jasmine & Rose Waltz
    const notes = [
      329.63, 392.00, 523.25, 493.88,
      440.00, 392.00, 349.23, 329.63,
      293.66, 349.23, 440.00, 392.00,
      329.63, 261.63, 293.66, 329.63
    ];

    this.timer = setInterval(() => {
      const f = notes[this.step % notes.length];
      this.playTone(f, 1.5, 'sine', 0.08);
      // Soft bass accompaniment every 4 beats
      if (this.step % 4 === 0) {
        this.playTone(f / 2, 2.2, 'triangle', 0.06);
      }
      this.step++;
    }, 480);
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const jasmineRomanceAudio = new JasmineRomanceAudio();

export function KhmerBlossomTemplate({ data = {} }) {
  const groom = data.groomName || 'សុខ វិបុល';
  const bride = data.brideName || 'ជា សុជាតា';
  const groomParents = data.groomParents || 'លោក សុខ ជា និង លោកស្រី កែវ ផល្លី';
  const brideParents = data.brideParents || 'លោក ជា វណ្ណា និង លោកស្រី ហែម ស៊ីវន';
  const dateStr = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ០៧:០០ ព្រឹក ដល់ ០៨:០០ យប់';
  const locationName = data.ceremonyLocation || 'សាលមង្គលសួនផ្ការំដួល ឌឹ ព្រេមៀ សែនសុខ (អគារ C)';
  const address = data.ceremonyAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const preweddingImg = data.preweddingPhoto || '/images/templates/floral_cambodian_blossom_prewedding.jpg';

  const heroList = (data.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : [
        '/images/templates/floral_cambodian_blossom_prewedding.jpg',
        '/images/templates/floral-romance/floral_1.jpg',
        '/images/templates/floral-romance/floral_2.jpg',
        '/images/templates/floral-romance/floral_3.jpg'
      ];

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const heroScrollRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [blessingCount, setBlessingCount] = useState(88);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'កែវ ចិន្តា', text: 'សូមឱ្យគូស្វាមីភរិយាថ្មីស្រឡាញ់គ្នាផ្អែមល្ហែមដូចផ្កាម្លិះក្រអូបសាយភាយ និងមានសុភមង្គលជានិរន្តរ៍!' },
    { id: 2, name: 'ញាតិមិត្ត និងមិត្តភក្តិ', text: 'អបអរសាទរថ្ងៃមង្គលការ! សូមឱ្យគ្រួសារថ្មីពោរពេញដោយសិរីសួស្តី ត្រជាក់ត្រជុំ និងចម្រុងចម្រើន!' }
  ]);

  // Countdown timer (Target: Nov 15, 2026)
  const [timeLeft, setTimeLeft] = useState({ days: '752', hours: '19', mins: '30', secs: '00' });

  useEffect(() => {
    const targetDate = new Date('2026-11-15T07:00:00+07:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
          secs: Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0')
        });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleHeroScroll = () => {
    if (heroScrollRef.current) {
      const { scrollLeft, clientWidth } = heroScrollRef.current;
      if (clientWidth > 0) {
        const idx = Math.round(scrollLeft / clientWidth);
        if (idx !== activeHeroIdx && idx >= 0 && idx < heroList.length) {
          setActiveHeroIdx(idx);
        }
      }
    }
  };

  const scrollToHero = (idx) => {
    if (heroScrollRef.current) {
      const clientWidth = heroScrollRef.current.clientWidth;
      heroScrollRef.current.scrollTo({ left: idx * clientWidth, behavior: 'smooth' });
      setActiveHeroIdx(idx);
    }
  };

  const toggleMusic = () => {
    const res = jasmineRomanceAudio.toggle();
    setIsPlaying(res);
  };

  const handleBlessingShower = () => {
    setBlessingCount((prev) => prev + 1);
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#F472B6', '#FB7185', '#FDE047', '#FFF1F2', '#E11D48']
      });
    } catch (_) {}
  };

  const copyAccount = (acc) => {
    navigator.clipboard.writeText(acc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRsvp = (e) => {
    e.preventDefault();
    if (!rsvp.name.trim()) return;
    setRsvpDone(true);
    try {
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.65 }, colors: ['#E11D48', '#FB7185', '#FDE047'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  const gallery = [
    { id: 1, src: preweddingImg, caption: 'មន្តស្នេហ៍ផ្កាម្លិះ និងកុលាបមង្គល' },
    { id: 2, src: '/images/templates/floral-romance/floral_1.jpg', caption: 'ពន្លឺថ្ងៃមាសកក់ក្តៅនៃស្នេហា' },
    { id: 3, src: '/images/templates/floral-romance/floral_2.jpg', caption: 'ស្នាមញញឹមរំលេចក្តីសង្ឃឹម' },
    { id: 4, src: '/images/templates/floral-romance/floral_3.jpg', caption: 'អនុស្សាវរីយ៍សួនផ្កាអមតៈ' },
    { id: 5, src: '/images/templates/wedding_floral_bg.jpg', caption: 'កម្រងផ្កាស្រស់សិរីមង្គល' },
    { id: 6, src: '/images/templates/wedding_flowers_bg.jpg', caption: 'សេចក្តីសុខក្សេមក្សាន្តជានិរន្តរ៍' }
  ];

  return (
    <div
      className="w-full min-h-screen text-[#3D2C2E] font-battambang antialiased selection:bg-[#E06D7B] selection:text-white relative"
      style={{
        backgroundColor: '#FFF7F4',
        backgroundImage: `
          radial-gradient(circle at 15% 15%, rgba(254, 205, 211, 0.35) 0%, transparent 40%),
          radial-gradient(circle at 85% 85%, rgba(253, 230, 138, 0.25) 0%, transparent 45%),
          url("data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e06d7b' fill-opacity='0.04'%3E%3Cpath d='M26 0 C28 12 36 20 48 22 C36 24 28 32 26 44 C24 32 16 24 4 22 C16 20 24 12 26 0 Z'/%3E%3Ccircle cx='26' cy='26' r='2.5' fill='%23dfb15b' fill-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")
        `
      }}
    >
      {/* Floating Audio Controller */}
      <aside className="fixed top-5 right-5 z-40">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#E06D7B]/30 text-[#C84B5B] text-xs font-semibold shadow-lg hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#E06D7B] animate-pulse" />
              <span className="font-moulpali text-xs">តន្ត្រី (កំពុងចាក់)</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-moulpali text-xs text-stone-600">តន្ត្រីផ្កាម្លិះ</span>
            </>
          )}
        </button>
      </aside>

      {/* Main Container */}
      <div className="w-full relative bg-[#FFFDFB] pb-24">
        
        {/* =========================================================================
            1. MULTI-IMAGE HERO SLIDER WITH CAMBODIAN COUPLE
            ========================================================================= */}
        <section className="relative w-full overflow-hidden bg-[#FBF0EB] border-b border-[#E06D7B]/20">
          
          {/* Scalloped Floral Badge Header */}
          <div className="absolute top-0 inset-x-0 z-20 flex justify-center pt-3 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E06D7B]/30 shadow-md">
              <span className="text-[#E06D7B] text-xs">❀</span>
              <span className="font-moulpali text-[11px] sm:text-xs text-[#C84B5B] tracking-wider">
                មន្តស្នេហ៍ផ្កាម្លិះ និងកុលាបមង្គល
              </span>
              <span className="text-[#E06D7B] text-xs">❀</span>
            </div>
          </div>

          {/* Horizontal Snap Scroll Gallery */}
          <div
            ref={heroScrollRef}
            onScroll={handleHeroScroll}
            className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none aspect-[4/5] relative"
            style={{ scrollBehavior: 'smooth' }}
          >
            {heroList.map((imgUrl, idx) => (
              <div key={idx} className="w-full h-full shrink-0 snap-center relative">
                <img
                  src={imgUrl}
                  alt={`Cambodian Wedding ${idx + 1}`}
                  className="w-full h-full object-cover object-top"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                {/* Warm Sunset Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F1117]/85 via-transparent to-black/20 pointer-events-none"></div>

                {/* Couple Names in Moulpali Font */}
                <div className="absolute bottom-10 inset-x-4 text-center text-white z-10">
                  <div className="inline-flex items-center gap-2 mb-1.5">
                    <span className="h-[1px] w-6 bg-rose-200/70"></span>
                    <span className="text-[11px] font-moulpali text-rose-200 tracking-widest uppercase">
                      សិរីសួស្តីអាពាហ៍ពិពាហ៍
                    </span>
                    <span className="h-[1px] w-6 bg-rose-200/70"></span>
                  </div>
                  <h1 className="font-moulpali text-2xl sm:text-3xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] tracking-wide leading-relaxed">
                    {groom} <span className="text-amber-300 text-xl font-moulpali">✦ និង ✦</span> {bride}
                  </h1>
                  <p className="text-xs text-rose-100/90 font-serifTrad tracking-widest mt-1">
                    {dateStr}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Chevron Buttons */}
          {heroList.length > 1 && (
            <>
              <button
                onClick={() => scrollToHero(Math.max(0, activeHeroIdx - 1))}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 text-rose-800 flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToHero(Math.min(heroList.length - 1, activeHeroIdx + 1))}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-rose-200 text-rose-800 flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {heroList.length > 1 && (
            <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center items-center gap-1.5">
              {heroList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToHero(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeHeroIdx === idx
                      ? 'w-6 bg-rose-400 shadow-[0_0_8px_rgba(244,114,182,0.8)]'
                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* Content Container */}
        <div className="px-5 sm:px-6">

          {/* =========================================================================
              2. INVITATION LETTER HEADER (MOULPALI TYPOGRAPHY)
              ========================================================================= */}
          <section className="mt-8 text-center relative">
            <div className="w-12 h-12 mx-auto mb-2.5 rounded-full bg-gradient-to-tr from-[#E06D7B] to-[#F48D99] border-2 border-[#DFB15B] flex items-center justify-center text-white shadow-md">
              <Flower2 className="w-6 h-6 text-white" />
            </div>

            <p className="font-moulpali text-xs text-[#C84B5B] tracking-widest uppercase mb-1">
              សិរីសួស្តី ជ័យមង្គល វិបុលសុខ បវរមហាប្រសើរ
            </p>

            <h2 className="font-moulpali text-2xl sm:text-3xl bg-gradient-to-r from-[#C84B5B] via-[#E06D7B] to-[#B33544] bg-clip-text text-transparent tracking-wide mb-3">
              លិខិតគោរពអញ្ជើញអាពាហ៍ពិពាហ៍
            </h2>

            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-white to-[#FFF5F2] border border-[#E06D7B]/25 shadow-sm relative overflow-hidden">
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                យើងខ្ញុំមានកិត្តិយសដ៏ខ្ពង់ខ្ពស់ សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ
              </p>

              {/* Parents Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[#E06D7B]/15">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E06D7B]/20 text-center shadow-xs">
                  <span className="text-[11px] font-moulpali text-[#C84B5B] block mb-1">
                    មាតាបិតាខាងកូនប្រុស
                  </span>
                  <p className="font-battambang font-bold text-xs sm:text-sm text-[#2F1117]">
                    {groomParents}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#E06D7B]/20 text-center shadow-xs">
                  <span className="text-[11px] font-moulpali text-[#C84B5B] block mb-1">
                    មាតាបិតាខាងកូនស្រី
                  </span>
                  <p className="font-battambang font-bold text-xs sm:text-sm text-[#2F1117]">
                    {brideParents}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              3. CAMBODIAN BRIDAL MEDALLIONS
              ========================================================================= */}
          <section className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              {/* Groom */}
              <div className="p-4 rounded-3xl bg-gradient-to-b from-white to-[#FFF0EC] border-2 border-[#E06D7B]/30 shadow-xs text-center relative group">
                <div className="w-10 h-10 rounded-full mx-auto bg-gradient-to-r from-[#C84B5B] to-[#E06D7B] text-amber-200 flex items-center justify-center font-moulpali text-sm mb-2 shadow">
                  កូន
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100 text-[#C84B5B] font-moulpali text-[10.5px] mb-1.5">
                  កូនកំលោះ
                </span>
                <h3 className="font-moulpali text-base sm:text-lg text-[#2F1117] tracking-wide">
                  {groom}
                </h3>
                <p className="text-[10px] text-stone-500 font-serifTrad uppercase tracking-wider mt-0.5">
                  The Groom
                </p>
              </div>

              {/* Bride */}
              <div className="p-4 rounded-3xl bg-gradient-to-b from-white to-[#FFF0EC] border-2 border-[#E06D7B]/30 shadow-xs text-center relative group">
                <div className="w-10 h-10 rounded-full mx-auto bg-gradient-to-r from-[#C84B5B] to-[#E06D7B] text-amber-200 flex items-center justify-center font-moulpali text-sm mb-2 shadow">
                  ស្រី
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100 text-[#C84B5B] font-moulpali text-[10.5px] mb-1.5">
                  កូនក្រមុំ
                </span>
                <h3 className="font-moulpali text-base sm:text-lg text-[#2F1117] tracking-wide">
                  {bride}
                </h3>
                <p className="text-[10px] text-stone-500 font-serifTrad uppercase tracking-wider mt-0.5">
                  The Bride
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              4. COUNTDOWN TIMER & BLESSING SHOWER BUTTON
              ========================================================================= */}
          <section className="mt-8">
            <div className="p-5 rounded-3xl bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#881337] text-white text-center shadow-lg relative overflow-hidden">
              <p className="text-xs font-moulpali text-amber-200 tracking-widest mb-3">
                រាប់ថយក្រោយឆ្ពោះទៅកាន់ថ្ងៃសិរីមង្គល
              </p>
              <div className="grid grid-cols-4 gap-2 relative z-10 max-w-sm mx-auto mb-4">
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="font-serifTrad text-xl sm:text-2xl font-bold text-amber-200">{timeLeft.days}</div>
                  <div className="text-[10px] text-white/80 font-moulpali">ថ្ងៃ</div>
                </div>
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="font-serifTrad text-xl sm:text-2xl font-bold text-amber-200">{timeLeft.hours}</div>
                  <div className="text-[10px] text-white/80 font-moulpali">ម៉ោង</div>
                </div>
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="font-serifTrad text-xl sm:text-2xl font-bold text-amber-200">{timeLeft.mins}</div>
                  <div className="text-[10px] text-white/80 font-moulpali">នាទី</div>
                </div>
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="font-serifTrad text-xl sm:text-2xl font-bold text-amber-200">{timeLeft.secs}</div>
                  <div className="text-[10px] text-white/80 font-moulpali">វិនាទី</div>
                </div>
              </div>

              {/* Interactive Blossom Shower Button */}
              <button
                onClick={handleBlessingShower}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#DFB15B] to-[#F59E0B] text-stone-900 font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-rose-900" />
                <span className="font-moulpali text-[11.5px]">ចុចបាចផ្កាប្រសិទ្ធពរជ័យ ({blessingCount})</span>
              </button>
            </div>
          </section>

          {/* =========================================================================
              5. CEREMONY ITINERARY TIMELINE
              ========================================================================= */}
          <section className="mt-8">
            <div className="text-center mb-4">
              <span className="text-xs font-moulpali text-[#C84B5B] tracking-widest block mb-1">
                កម្មវិធីនៃពិធីមង្គលការ
              </span>
              <h3 className="font-moulpali text-xl text-[#2F1117]">
                កាលវិភាគពិធីសិរីមង្គល
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-white border border-[#E06D7B]/20 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#C84B5B] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-moulpali text-sm text-[#2F1117]">ពិធីហែជំនូន និងពិធីសែនព្រេន</h4>
                    <span className="text-[11px] font-serifTrad text-[#C84B5B] font-semibold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      ០៧:០០ ព្រឹក
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    ពិធីហែផ្លែឈើជំនូន ពិធីសែនមេបា និងកិច្ចសំពះពិសារស្លាកំណត់
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E06D7B]/20 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#C84B5B] flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-moulpali text-sm text-[#2F1117]">ពិធីកាត់សក់បង្កក់សិរី និងចងដៃ</h4>
                    <span className="text-[11px] font-serifTrad text-[#C84B5B] font-semibold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      ០៩:៣០ ព្រឹក
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    ពិធីកាត់សក់បង្កក់សិរី ពិធីបង្វិលពពិល និងពិធីសែនចងដៃសិរីសួស្តី
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-[#E06D7B]/20 shadow-xs flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-[#C84B5B] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-moulpali text-sm text-[#2F1117]">ពិធីពិសាភោជនាហារមង្គលការ</h4>
                    <span className="text-[11px] font-serifTrad text-[#C84B5B] font-semibold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                      ០៥:០០ ល្ងាច
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    ទទួលភ្ញៀវកិត្តិយសពិសាអាហារសាមគ្គី និងរាំកម្សាន្តអបអរសាទរ
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              6. LOCATION & MAPS
              ========================================================================= */}
          <section className="mt-8">
            <div className="p-5 rounded-3xl bg-white border border-[#E06D7B]/20 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full mx-auto bg-rose-50 border border-[#E06D7B]/30 flex items-center justify-center text-[#C84B5B] mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-moulpali text-base text-[#2F1117] mb-1">
                {locationName}
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                {address}
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName + ' ' + address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C84B5B] text-white text-xs font-semibold shadow hover:bg-[#A93342] active:scale-95 transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-200" />
                <span>បើកមើលទីតាំងលើ Google Maps</span>
              </a>
            </div>
          </section>

          {/* =========================================================================
              7. PREWEDDING GALLERY
              ========================================================================= */}
          <section className="mt-8">
            <div className="text-center mb-4">
              <span className="text-xs font-moulpali text-[#C84B5B] tracking-widest block mb-1">
                អនុស្សាវរីយ៍ផ្អែមល្ហែម
              </span>
              <h3 className="font-moulpali text-xl text-[#2F1117]">
                កម្រងរូបភាព Pre-Wedding
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActivePhoto(item)}
                  className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-100 border border-[#E06D7B]/20 shadow-xs hover:shadow-md cursor-pointer group relative"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <p className="text-[11px] text-white leading-tight font-moulpali">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              8. DIGITAL GIFT (ABA / BAKONG)
              ========================================================================= */}
          <section className="mt-8">
            <div className="p-5 rounded-3xl bg-gradient-to-b from-white to-[#FFF4F0] border-2 border-[#DFB15B]/50 shadow-sm text-center">
              <span className="text-xs font-moulpali text-[#C84B5B] tracking-widest block mb-1">
                កាដូមង្គលការឌីជីថល (QR Code)
              </span>
              <h4 className="font-moulpali text-lg text-[#2F1117] mb-2">
                ចងដៃតាមរយៈគណនីធនាគារ
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                ភ្ញៀវកិត្តិយសអាចស្កេន QR Code ឬចម្លងលេខគណនីខាងក្រោម
              </p>

              <div className="max-w-[200px] mx-auto p-3 bg-white rounded-2xl border border-stone-200 shadow-inner mb-3">
                <img
                  src="/images/aba_qr.png"
                  alt="ABA QR"
                  className="w-full h-auto rounded-lg object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs">
                <span className="font-serifTrad font-bold text-[#2F1117]">ABA: 001 888 999</span>
                <button
                  onClick={() => copyAccount('001888999')}
                  className="text-[#C84B5B] hover:text-black font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'បានចម្លង!' : 'ចម្លង'}</span>
                </button>
              </div>
            </div>
          </section>

          {/* =========================================================================
              9. RSVP & WISHES
              ========================================================================= */}
          <section className="mt-8">
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#E06D7B]/25 shadow-sm">
              <div className="text-center mb-5">
                <span className="text-xs font-moulpali text-[#C84B5B] tracking-widest block mb-1">
                  ឆ្លើយតបការចូលរួម
                </span>
                <h4 className="font-moulpali text-xl text-[#2F1117]">
                  សូមផ្តល់ដំណឹងអំពីការចូលរួម (RSVP)
                </h4>
              </div>

              {rsvpDone ? (
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                  <div className="w-10 h-10 rounded-full mx-auto bg-[#C84B5B] text-white flex items-center justify-center mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <h5 className="font-moulpali text-base text-[#2F1117]">អរគុណសម្រាប់ការឆ្លើយតប!</h5>
                  <p className="text-xs text-stone-600 mt-1">
                    យើងខ្ញុំពិតជារីករាយ និងទន្ទឹងរង់ចាំវត្តមានដ៏ខ្ពង់ខ្ពស់របស់លោកអ្នក!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-moulpali text-[#2F1117] mb-1">ឈ្មោះភ្ញៀវកិត្តិយស *</label>
                    <input
                      type="text"
                      required
                      value={rsvp.name}
                      onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                      placeholder="សូមបញ្ចូលឈ្មោះរបស់អ្នក"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#C84B5B] focus:outline-none text-xs bg-stone-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-moulpali text-[#2F1117] mb-1">ការចូលរួម</label>
                      <select
                        value={rsvp.attendance}
                        onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#C84B5B] focus:outline-none text-xs bg-stone-50"
                      >
                        <option value="attending">ចូលរួមដោយក្តីរីករាយ</option>
                        <option value="regret">មិនអាចចូលរួមបាន</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-moulpali text-[#2F1117] mb-1">ចំនួនអ្នកចូលរួម</label>
                      <select
                        value={rsvp.guests}
                        onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#C84B5B] focus:outline-none text-xs bg-stone-50"
                      >
                        <option value="1 នាក់">1 នាក់</option>
                        <option value="2 នាក់">2 នាក់</option>
                        <option value="3 នាក់">3 នាក់</option>
                        <option value="ច្រើនជាងនេះ">ច្រើនជាងនេះ</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#C84B5B] hover:bg-[#A93342] text-white text-xs font-bold transition-all shadow cursor-pointer mt-2"
                  >
                    ផ្ញើការឆ្លើយតប (Submit RSVP)
                  </button>
                </form>
              )}

              {/* Wishes Wall */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h5 className="font-moulpali text-sm text-[#2F1117] mb-3 text-center">
                  សៀវភៅប្រសិទ្ធពរជ័យឌីជីថល
                </h5>

                <form onSubmit={handleWish} className="space-y-2 mb-4">
                  <input
                    type="text"
                    value={wish.name}
                    onChange={(e) => setWish({ ...wish, name: e.target.value })}
                    placeholder="ឈ្មោះរបស់អ្នក"
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:outline-none"
                  />
                  <textarea
                    rows={2}
                    value={wish.text}
                    onChange={(e) => setWish({ ...wish, text: e.target.value })}
                    placeholder="សរសេរពាក្យជូនពរ..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:outline-none resize-none"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-rose-100 text-[#C84B5B] hover:bg-rose-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ផ្ញើពាក្យជូនពរ</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishesList.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-xl bg-[#FFF6F3] border border-[#E06D7B]/20 text-xs">
                      <div className="font-moulpali text-[#C84B5B]">{w.name}</div>
                      <p className="text-stone-600 text-[11.5px] mt-0.5">{w.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-12 text-center text-xs text-stone-500 pb-6">
            <p className="font-moulpali text-xs text-[#C84B5B] mb-1">
              សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តម
            </p>
            <p className="text-[11px] font-serifTrad text-stone-400">
              Digital Theab • Khmer Jasmine & Rose Blossom Edition
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-3 text-xs text-[#C84B5B] underline cursor-pointer"
            >
              ត្រឡប់ទៅលើវិញ ↑
            </button>
          </footer>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-md w-full bg-[#2F1117] border border-rose-300/50 p-2 rounded-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-rose-400 text-white font-bold flex items-center justify-center cursor-pointer shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={activePhoto.src} alt={activePhoto.caption} className="w-full rounded-xl object-contain max-h-[70vh]" />
            <p className="text-center text-xs text-rose-200 mt-2 font-moulpali">{activePhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default KhmerBlossomTemplate;
