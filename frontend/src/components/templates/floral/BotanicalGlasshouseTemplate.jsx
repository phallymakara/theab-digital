import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, MapPin, Music, Heart, Send, Copy, Check, X, Sparkles, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

// Gentle Acoustic Floral Romantic Melody Synthesizer (Cello + Flute + Harp arpeggios)
class FloralRomanticAudio {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    this.noteIdx = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Romantic Waltz progression in D Major (D - F# - A - D - B - G)
  playPluck(freq, duration = 1.6, type = 'sine', gainVal = 0.12) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm soft envelope for harp & acoustic strings
    gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(gainVal, this.ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Canon in D / Romantic Botanical Garden Melody (Hz)
    const melody = [
      293.66, 369.99, 440.00, 587.33,
      220.00, 277.18, 329.63, 440.00,
      246.94, 293.66, 369.99, 493.88,
      185.00, 220.00, 293.66, 369.99,
      196.00, 246.94, 293.66, 392.00,
      146.83, 220.00, 293.66, 440.00
    ];

    this.timer = setInterval(() => {
      const freq = melody[this.noteIdx % melody.length];
      this.playPluck(freq, 1.4, 'sine', 0.09);
      // Soft bass harmony on downbeat
      if (this.noteIdx % 4 === 0) {
        this.playPluck(freq / 2, 2.2, 'triangle', 0.07);
      }
      this.noteIdx++;
    }, 450);
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

export const floralRomanticAudio = new FloralRomanticAudio();

export function BotanicalGlasshouseTemplate({ data = {} }) {
  const groom = data.groomName || 'លី ម៉េងហុង';
  const bride = data.brideName || 'ចាន់ ធីតា';
  const groomParents = data.groomParents || 'លោក លី គឹមសាន និង លោកស្រី អ៊ុក សុផល';
  const brideParents = data.brideParents || 'លោក ចាន់ សុវណ្ណ និង លោកស្រី គង់ ម៉ាលីស';
  const dateStr = data.ceremonyDate || 'ថ្ងៃសៅរ៍ ទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ០៧:០០ ព្រឹក ដល់ ០៨:០០ យប់';
  const locationName = data.ceremonyLocation || 'សួនរុក្ខជាតិបូតានិក ហ្គ្រេនផាឡេស (Botanical Glasshouse Hall)';
  const address = data.ceremonyAddress || 'មហាវិថីសម្តេចតេជោ (៦០ម៉ែត្រ) រាជធានីភ្នំពេញ';
  const preweddingImg = data.preweddingPhoto || '/images/templates/floral_botanical_prewedding.jpg';

  // Multi-image hero list
  const heroList = (data.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : [
        '/images/templates/floral_botanical_prewedding.jpg',
        '/images/templates/floral-romance/floral_1.jpg',
        '/images/templates/floral-romance/floral_2.jpg',
        '/images/templates/floral-romance/floral_3.jpg'
      ];

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const heroScrollRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់', note: '' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'កញ្ញា ម៉ារីណា', text: 'សូមជូនពរឱ្យប្អូនទាំងពីរស្រឡាញ់គ្នាផ្អែមល្ហែមដូចផ្កាស្រស់ក្នុងសួនបូតានិក និងមានសុភមង្គលជានិរន្តរ៍!' },
    { id: 2, name: 'គ្រួសារ និងមិត្តភក្តិ', text: 'អបអរសាទរថ្ងៃមង្គលការដ៏ស្រស់បំព្រង! សូមឱ្យសេចក្តីស្រឡាញ់រីកស្គុះស្គាយជារៀងរហូត!' }
  ]);

  // Countdown timer (Target: Nov 28, 2026)
  const [timeLeft, setTimeLeft] = useState({ days: '765', hours: '18', mins: '45', secs: '30' });

  useEffect(() => {
    const targetDate = new Date('2026-11-28T07:00:00+07:00').getTime();
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
    const res = floralRomanticAudio.toggle();
    setIsPlaying(res);
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
      confetti({ particleCount: 75, spread: 80, origin: { y: 0.65 }, colors: ['#4A6753', '#D4AF37', '#E8C5B8', '#FAF7F2'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  const gallery = [
    { id: 1, src: preweddingImg, caption: 'សួនផ្កាកុលាបបារាំងមនោរម្យ' },
    { id: 2, src: '/images/templates/floral-romance/floral_1.jpg', caption: 'ពន្លឺថ្ងៃមាសកក់ក្តៅនៃស្នេហា' },
    { id: 3, src: '/images/templates/floral-romance/floral_2.jpg', caption: 'ស្នាមញញឹមរំលេចក្តីសង្ឃឹម' },
    { id: 4, src: '/images/templates/floral-romance/floral_3.jpg', caption: 'អនុស្សាវរីយ៍សួនផ្កាអមតៈ' },
    { id: 5, src: '/images/templates/wedding_floral_bg.jpg', caption: 'កម្រងផ្កាស្រស់សិរីមង្គល' },
    { id: 6, src: '/images/templates/wedding_flowers_bg.jpg', caption: 'សេចក្តីសុខក្សេមក្សាន្តជានិរន្តរ៍' }
  ];

  return (
    <div
      className="w-full min-h-screen text-[#2D3A30] font-suwannaphum antialiased selection:bg-[#4A6753] selection:text-[#FAF7F2] relative"
      style={{
        backgroundColor: '#FAF7F2',
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(232, 197, 184, 0.25) 0%, transparent 40%),
          radial-gradient(circle at 90% 80%, rgba(74, 103, 83, 0.15) 0%, transparent 45%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a6753' fill-opacity='0.035'%3E%3Cpath d='M30 10 C35 20 40 25 50 30 C40 35 35 40 30 50 C25 40 20 35 10 30 C20 25 25 20 30 10 Z'/%3E%3Ccircle cx='30' cy='30' r='2' fill='%23d4af37' fill-opacity='0.08'/%3E%3C/g%3E%3C/svg%3E")
        `
      }}
    >
      {/* Floating Gentle Acoustic Music Player */}
      <aside className="fixed top-5 right-5 z-40">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#4A6753]/30 text-[#2D3A30] text-xs font-semibold shadow-lg hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#4A6753] animate-pulse" />
              <span className="font-preahvihear text-xs text-[#2D3A30]">តន្ត្រី (កំពុងចាក់)</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-preahvihear text-xs text-stone-600">តន្ត្រីមនោសញ្ចេតនា</span>
            </>
          )}
        </button>
      </aside>

      {/* Main Container - Cathedral Botanical Glasshouse Arch */}
      <div className="w-full relative bg-[#FCFAF6] pb-24">
        
        {/* =========================================================================
            1. CATHEDRAL BOTANICAL ARCH HERO GALLERY (MULTI-IMAGE HORIZONTAL SWIPE)
            ========================================================================= */}
        <section className="relative w-full overflow-hidden bg-[#F2EDE4] border-b border-[#4A6753]/20">
          
          {/* Glasshouse Conservatory Dome Header Motif */}
          <div className="absolute top-0 inset-x-0 z-20 flex justify-center pt-3 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#4A6753]/30 shadow-md">
              <span className="text-[#D4AF37] text-xs">❀</span>
              <span className="font-preahvihear text-[11px] sm:text-xs text-[#2D3A30] tracking-wider font-semibold">
                មហាសួនផ្កាកុលាបមនោរម្យ • BOTANICAL GLASSHOUSE
              </span>
              <span className="text-[#D4AF37] text-xs">❀</span>
            </div>
          </div>

          {/* Horizontal Snap Scroll Prewedding Gallery */}
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
                  alt={`Prewedding ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
                {/* Dreamy Botanical Light Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E2E23]/80 via-transparent to-black/25 pointer-events-none"></div>

                {/* Couple Names in Flowing Romantic Preahvihear Script */}
                <div className="absolute bottom-10 inset-x-4 text-center text-white z-10">
                  <div className="inline-flex items-center gap-2 mb-1">
                    <span className="h-[1px] w-6 bg-white/70"></span>
                    <span className="text-[11px] font-preahvihear text-amber-100 tracking-widest uppercase">
                      ពិធីមង្គលការដ៏ផ្អែមល្ហែម
                    </span>
                    <span className="h-[1px] w-6 bg-white/70"></span>
                  </div>
                  <h1 className="font-preahvihear text-3xl sm:text-4xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] tracking-wide">
                    {groom} <span className="text-amber-200 text-2xl font-serifTrad italic">&</span> {bride}
                  </h1>
                  <p className="text-xs text-amber-100/90 font-serifTrad tracking-widest mt-1">
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
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-[#4A6753]/30 text-[#2D3A30] flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToHero(Math.min(heroList.length - 1, activeHeroIdx + 1))}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md border border-[#4A6753]/30 text-[#2D3A30] flex items-center justify-center shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
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
                      ? 'w-6 bg-amber-300 shadow-[0_0_8px_rgba(252,230,146,0.8)]'
                      : 'w-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* Content Container */}
        <div className="px-5 sm:px-6">

          {/* =========================================================================
              2. INVITATION UNVEIL WITH INTERACTIVE BOTANICAL WAX SEAL
              ========================================================================= */}
          <section className="mt-8 text-center relative">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-tr from-[#3A5342] to-[#5B8067] border-2 border-[#D4AF37] flex items-center justify-center text-white shadow-md relative">
              <span className="font-preahvihear text-lg">❀</span>
              <span className="absolute -inset-1 rounded-full border border-dashed border-[#4A6753]/40 animate-spin-slow"></span>
            </div>

            <p className="font-preahvihear text-xs text-[#5B8067] tracking-widest uppercase mb-1">
              សិរីសួស្តី ជ័យមង្គល វិបុលសុខ បវរមហាប្រសើរ
            </p>

            <h2 className="font-preahvihear text-2xl sm:text-3xl text-[#23372B] tracking-wide mb-3">
              លិខិតគោរពអញ្ជើញអាពាហ៍ពិពាហ៍
            </h2>

            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#4A6753]/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#E8C5B8]/30 to-transparent rounded-bl-full pointer-events-none"></div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
                យើងខ្ញុំមានកិត្តិយសដ៏ខ្ពង់ខ្ពស់ សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសដើម្បីប្រសិទ្ធពរជ័យ ក្នុងពិធីអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ
              </p>

              {/* Parents Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-5 border-t border-[#4A6753]/15">
                <div className="p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#4A6753]/15 text-center">
                  <span className="text-[11px] font-preahvihear text-[#5B8067] uppercase tracking-wider block mb-1">
                    មាតាបិតាខាងកូនប្រុស
                  </span>
                  <p className="font-suwannaphum font-bold text-xs sm:text-sm text-[#23372B]">
                    {groomParents}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#F7F4EE] border border-[#4A6753]/15 text-center">
                  <span className="text-[11px] font-preahvihear text-[#5B8067] uppercase tracking-wider block mb-1">
                    មាតាបិតាខាងកូនស្រី
                  </span>
                  <p className="font-suwannaphum font-bold text-xs sm:text-sm text-[#23372B]">
                    {brideParents}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              3. BOTANICAL HERBARIUM MEDALLION (GROOM & BRIDE CARDS)
              ========================================================================= */}
          <section className="mt-8">
            <div className="grid grid-cols-2 gap-4">
              {/* Groom Card */}
              <div className="p-4 rounded-3xl bg-gradient-to-b from-white to-[#F6F2EA] border-2 border-[#4A6753]/25 shadow-sm text-center relative group">
                <div className="w-10 h-10 rounded-full mx-auto bg-[#3A5342] text-amber-200 flex items-center justify-center font-preahvihear text-sm mb-2 shadow">
                  ក
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EBF0EC] text-[#3A5342] font-preahvihear text-[10.5px] font-semibold mb-1.5">
                  កូនកំលោះ
                </span>
                <h3 className="font-preahvihear text-base sm:text-lg text-[#23372B] tracking-wide">
                  {groom}
                </h3>
                <p className="text-[10px] text-stone-500 font-serifTrad uppercase tracking-wider mt-0.5">
                  The Groom
                </p>
              </div>

              {/* Bride Card */}
              <div className="p-4 rounded-3xl bg-gradient-to-b from-white to-[#F6F2EA] border-2 border-[#4A6753]/25 shadow-sm text-center relative group">
                <div className="w-10 h-10 rounded-full mx-auto bg-[#3A5342] text-amber-200 flex items-center justify-center font-preahvihear text-sm mb-2 shadow">
                  ខ
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#EBF0EC] text-[#3A5342] font-preahvihear text-[10.5px] font-semibold mb-1.5">
                  កូនក្រមុំ
                </span>
                <h3 className="font-preahvihear text-base sm:text-lg text-[#23372B] tracking-wide">
                  {bride}
                </h3>
                <p className="text-[10px] text-stone-500 font-serifTrad uppercase tracking-wider mt-0.5">
                  The Bride
                </p>
              </div>
            </div>
          </section>

          {/* =========================================================================
              4. LIVE EVENT COUNTDOWN TIMER
              ========================================================================= */}
          <section className="mt-8">
            <div className="p-5 rounded-3xl bg-gradient-to-r from-[#2A3E31] via-[#354E3E] to-[#2A3E31] text-white text-center shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <p className="text-xs font-preahvihear text-amber-200 tracking-widest uppercase mb-3">
                រាប់ថយក្រោយឆ្ពោះទៅកាន់ថ្ងៃមង្គលការ
              </p>
              <div className="grid grid-cols-4 gap-2 relative z-10 max-w-sm mx-auto">
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="font-serifTrad text-xl sm:text-2xl font-bold text-amber-200">{timeLeft.days}</div>
                  <div className="text-[10px] text-white/80 font-preahvihear">ថ្ងៃ</div>
                </div>
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="font-serifTrad text-xl sm:text-2xl font-bold text-amber-200">{timeLeft.hours}</div>
                  <div className="text-[10px] text-white/80 font-preahvihear">ម៉ោង</div>
                </div>
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="font-serifTrad text-xl sm:text-2xl font-bold text-amber-200">{timeLeft.mins}</div>
                  <div className="text-[10px] text-white/80 font-preahvihear">នាទី</div>
                </div>
                <div className="p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="font-serifTrad text-xl sm:text-2xl font-bold text-amber-200">{timeLeft.secs}</div>
                  <div className="text-[10px] text-white/80 font-preahvihear">វិនាទី</div>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              5. BOTANICAL BLOSSOM ITINERARY (CEREMONY SCHEDULE)
              ========================================================================= */}
          <section className="mt-8">
            <div className="text-center mb-4">
              <span className="text-xs font-preahvihear text-[#5B8067] tracking-widest uppercase block mb-1">
                កម្មវិធីនៃពិធីមង្គលការ
              </span>
              <h3 className="font-preahvihear text-xl text-[#23372B]">
                កាលវិភាគពិធីសិរីមង្គល
              </h3>
            </div>

            <div className="space-y-3">
              {/* Event 1 */}
              <div className="p-4 rounded-2xl bg-white border border-[#4A6753]/20 shadow-xs flex items-start gap-3.5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#EAF1EC] text-[#354E3E] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-preahvihear text-sm text-[#23372B]">ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត</h4>
                    <span className="text-[11px] font-serifTrad text-[#5B8067] font-semibold bg-[#EAF1EC] px-2 py-0.5 rounded-full">
                      ០៧:០០ ព្រឹក
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត និងបាចផ្កាចងដៃសិរីមង្គលដោយព្រះសង្ឃ
                  </p>
                </div>
              </div>

              {/* Event 2 */}
              <div className="p-4 rounded-2xl bg-white border border-[#4A6753]/20 shadow-xs flex items-start gap-3.5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#EAF1EC] text-[#354E3E] flex items-center justify-center shrink-0 mt-0.5">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-preahvihear text-sm text-[#23372B]">ពិធីហែកំណត់ និងសែនចងដៃ</h4>
                    <span className="text-[11px] font-serifTrad text-[#5B8067] font-semibold bg-[#EAF1EC] px-2 py-0.5 rounded-full">
                      ០៩:៣០ ព្រឹក
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    ពិធីហែជំនូន ពិធីកាត់សក់បង្កក់សិរី និងពិធីសែនចងដៃកូនប្រុសកូនស្រី
                  </p>
                </div>
              </div>

              {/* Event 3 */}
              <div className="p-4 rounded-2xl bg-white border border-[#4A6753]/20 shadow-xs flex items-start gap-3.5 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-xl bg-[#EAF1EC] text-[#354E3E] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-preahvihear text-sm text-[#23372B]">ពិធីពិសាភោជនាហារមង្គលការ</h4>
                    <span className="text-[11px] font-serifTrad text-[#5B8067] font-semibold bg-[#EAF1EC] px-2 py-0.5 rounded-full">
                      ០៥:០០ ល្ងាច
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                    ទទួលភ្ញៀវកិត្តិយសពិសាភោជនាហារ និងរាំកម្សាន្តអបអរសាទរ
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* =========================================================================
              6. CEREMONY LOCATION & GOOGLE MAPS
              ========================================================================= */}
          <section className="mt-8">
            <div className="p-5 rounded-3xl bg-white border border-[#4A6753]/20 shadow-sm text-center">
              <div className="w-10 h-10 rounded-full mx-auto bg-[#F7F4EE] border border-[#4A6753]/30 flex items-center justify-center text-[#354E3E] mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <h4 className="font-preahvihear text-base text-[#23372B] mb-1">
                {locationName}
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                {address}
              </p>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName + ' ' + address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#354E3E] text-white text-xs font-semibold shadow hover:bg-[#283C30] active:scale-95 transition-all cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-amber-200" />
                <span>បើកមើលទីតាំងលើ Google Maps</span>
              </a>
            </div>
          </section>

          {/* =========================================================================
              7. PREWEDDING MEMORY GALLERY
              ========================================================================= */}
          <section className="mt-8">
            <div className="text-center mb-4">
              <span className="text-xs font-preahvihear text-[#5B8067] tracking-widest uppercase block mb-1">
                អនុស្សាវរីយ៍ផ្អែមល្ហែម
              </span>
              <h3 className="font-preahvihear text-xl text-[#23372B]">
                កម្រងរូបភាព Pre-Wedding
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActivePhoto(item)}
                  className="rounded-2xl overflow-hidden aspect-[3/4] bg-stone-100 border border-[#4A6753]/20 shadow-xs hover:shadow-md cursor-pointer group relative"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <p className="text-[11px] text-white leading-tight font-preahvihear">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =========================================================================
              8. DIGITAL GIFT (ABA / BAKONG QR)
              ========================================================================= */}
          <section className="mt-8">
            <div className="p-5 rounded-3xl bg-gradient-to-b from-white to-[#F7F4EE] border-2 border-[#D4AF37]/50 shadow-sm text-center">
              <span className="text-xs font-preahvihear text-[#5B8067] tracking-widest uppercase block mb-1">
                កាដូមង្គលការឌីជីថល (QR Code)
              </span>
              <h4 className="font-preahvihear text-lg text-[#23372B] mb-2">
                ចងដៃតាមរយៈគណនីធនាគារ
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                ដើម្បីភាពងាយស្រួល ភ្ញៀវកិត្តិយសអាចស្កេន QR Code ឬចម្លងលេខគណនីខាងក្រោម
              </p>

              <div className="max-w-[200px] mx-auto p-3 bg-white rounded-2xl border border-stone-200 shadow-inner mb-3">
                <img
                  src="/images/aba_qr.png"
                  alt="ABA QR"
                  className="w-full h-auto rounded-lg object-contain"
                  onError={(e) => {
                    // Fallback visual QR simulation
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs">
                <span className="font-serifTrad font-bold text-[#23372B]">ABA: 001 888 999</span>
                <button
                  onClick={() => copyAccount('001888999')}
                  className="text-[#354E3E] hover:text-black font-semibold text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'បានចម្លង!' : 'ចម្លង'}</span>
                </button>
              </div>
            </div>
          </section>

          {/* =========================================================================
              9. RSVP & AUSPICIOUS WISHES WALL
              ========================================================================= */}
          <section className="mt-8">
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#4A6753]/25 shadow-sm">
              <div className="text-center mb-5">
                <span className="text-xs font-preahvihear text-[#5B8067] tracking-widest uppercase block mb-1">
                  ឆ្លើយតបការចូលរួម
                </span>
                <h4 className="font-preahvihear text-xl text-[#23372B]">
                  សូមផ្តល់ដំណឹងអំពីការចូលរួម (RSVP)
                </h4>
              </div>

              {rsvpDone ? (
                <div className="p-5 rounded-2xl bg-[#EAF1EC] border border-[#4A6753]/30 text-center">
                  <div className="w-10 h-10 rounded-full mx-auto bg-[#354E3E] text-white flex items-center justify-center mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <h5 className="font-preahvihear text-base text-[#23372B]">អរគុណសម្រាប់ការឆ្លើយតប!</h5>
                  <p className="text-xs text-stone-600 mt-1">
                    យើងខ្ញុំពិតជារីករាយ និងទន្ទឹងរង់ចាំវត្តមានដ៏ខ្ពង់ខ្ពស់របស់លោកអ្នក!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRsvp} className="space-y-3">
                  <div>
                    <label className="block text-xs font-preahvihear text-[#23372B] mb-1">ឈ្មោះភ្ញៀវកិត្តិយស *</label>
                    <input
                      type="text"
                      required
                      value={rsvp.name}
                      onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                      placeholder="សូមបញ្ចូលឈ្មោះរបស់អ្នក"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 focus:border-[#354E3E] focus:outline-none text-xs bg-stone-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-preahvihear text-[#23372B] mb-1">ការចូលរួម</label>
                      <select
                        value={rsvp.attendance}
                        onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#354E3E] focus:outline-none text-xs bg-stone-50"
                      >
                        <option value="attending">ចូលរួមដោយក្តីរីករាយ</option>
                        <option value="regret">មិនអាចចូលរួមបាន</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-preahvihear text-[#23372B] mb-1">ចំនួនអ្នកចូលរួម</label>
                      <select
                        value={rsvp.guests}
                        onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:border-[#354E3E] focus:outline-none text-xs bg-stone-50"
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
                    className="w-full py-2.5 rounded-xl bg-[#354E3E] hover:bg-[#283C30] text-white text-xs font-bold transition-all shadow cursor-pointer mt-2"
                  >
                    ផ្ញើការឆ្លើយតប (Submit RSVP)
                  </button>
                </form>
              )}

              {/* Wishes Section */}
              <div className="mt-8 pt-6 border-t border-stone-200">
                <h5 className="font-preahvihear text-sm text-[#23372B] mb-3 text-center">
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
                    className="w-full py-2 rounded-xl bg-[#EAF1EC] text-[#354E3E] hover:bg-[#D8E6DB] text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>ផ្ញើពាក្យជូនពរ</span>
                  </button>
                </form>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {wishesList.map((w) => (
                    <div key={w.id} className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#4A6753]/15 text-xs">
                      <div className="font-preahvihear font-semibold text-[#354E3E]">{w.name}</div>
                      <p className="text-stone-600 text-[11.5px] mt-0.5">{w.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Footer Back to Top */}
          <footer className="mt-12 text-center text-xs text-stone-500 pb-6">
            <p className="font-preahvihear text-xs text-[#5B8067] mb-1">
              សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តម
            </p>
            <p className="text-[11px] font-serifTrad text-stone-400">
              Digital Theab • Botanical Glasshouse Wedding Edition
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-3 text-xs text-[#354E3E] underline cursor-pointer"
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
            className="relative max-w-md w-full bg-[#1E2E23] border border-[#D4AF37]/50 p-2 rounded-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center cursor-pointer shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={activePhoto.src} alt={activePhoto.caption} className="w-full rounded-xl object-contain max-h-[70vh]" />
            <p className="text-center text-xs text-amber-200 mt-2 font-preahvihear">{activePhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BotanicalGlasshouseTemplate;
