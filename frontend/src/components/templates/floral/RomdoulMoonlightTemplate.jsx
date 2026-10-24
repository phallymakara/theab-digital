import React, { useState, useEffect, useRef } from 'react';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Music,
  VolumeX,
  Volume2,
  Navigation,
  Send,
  Sparkles,
  Share2,
  Moon,
  Stars,
  Compass,
  CheckCircle,
  Copy,
  Gift,
  ArrowRight,
  Flame,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

/**
 * RomdoulMoonlightTemplate
 * -------------------------------------------------------------
 * Theme: "រាត្រីផ្ការំដួលពន្លឺចន្ទ" (Romdoul Moonlight Romance)
 * Category: ផ្កាស្រស់រ៉ូមែនទិក (floral)
 * Typography: font-suwannaphum (headings/names) + font-serifTrad (Cinzel) + font-kantumruy (body)
 * Components:
 *   - Midnight Starlight & Firefly Canvas Simulation
 *   - Ambient Moonlight Harp & Chimes Audio Synthesizer
 *   - Moon Phase Love Story Milestones Deck (ជំពូកស្នេហា ៤ ដំណាក់កាល)
 *   - Virtual Wishing Lantern Release into the Moonlight Sky
 *   - Glassmorphic Reception & Digital Envelope Desk
 */

export default function RomdoulMoonlightTemplate({
  invitation,
  isEditMode = false,
  onSave = () => {}
}) {
  // Safe default data
  const groomName = invitation?.groomName || 'លី វិសាល';
  const brideName = invitation?.brideName || 'សុខ គន្ធារី';
  const groomFather = invitation?.groomParents?.father || 'លោក លី សុខុម';
  const groomMother = invitation?.groomParents?.mother || 'លោកស្រី ង៉ែត សុភ័ក្ត្រ';
  const brideFather = invitation?.brideParents?.father || 'លោក សុខ វ៉ាន់នី';
  const brideMother = invitation?.brideParents?.mother || 'លោកស្រី កែវ មុនី';
  const weddingDate = invitation?.weddingDate || 'ថ្ងៃសៅរ៍ ទី១៩ ខែធ្នូ ឆ្នាំ២០២៦';
  const weddingTime = invitation?.weddingTime || 'ម៉ោង ៥:០០ ល្ងាច';
  const weddingLocation = invitation?.weddingLocation || 'សណ្ឋាគារ សូហ្វីតែល ភ្នំពេញ ភូគីត្រា (Sofitel Phnom Penh Phokeethra)';
  const locationAddress = invitation?.locationAddress || 'សង្កាត់ទន្លេបាសាក់ ខណ្ឌចំការមន រាជធានីភ្នំពេញ';
  const preweddingImage = invitation?.preweddingImage || '/images/templates/floral_romdoul_moonlight_prewedding.jpg';
  const googleMapsUrl = invitation?.googleMapsUrl || 'https://maps.google.com/?q=Sofitel+Phnom+Penh+Phokeethra';

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const timerRef = useRef(null);

  // Canvas Firefly / Starlight Particles
  const canvasRef = useRef(null);

  // Milestone Deck Active Card
  const [activeMilestone, setActiveMilestone] = useState(0);

  // Lantern Release State
  const [lanternSender, setLanternSender] = useState('');
  const [lanternWish, setLanternWish] = useState('');
  const [releasedLanterns, setReleasedLanterns] = useState([
    { id: 1, name: 'បងប្អូនជីដូនមួយ', text: 'សូមឱ្យចំណងស្នេហ៍ផ្អែមល្ហែមដូចក្លិនផ្ការំដួល និងស្ថិតស្ថេរដូចពន្លឺចន្ទ!', time: 'មុននេះបន្តិច' },
    { id: 2, name: 'មិត្តភក្តិវិទ្យាល័យ', text: 'អបអរសាទរគូព្រេងដ៏សមសួន! ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នងណា៎!', time: '១ ម៉ោងមុន' }
  ]);
  const [isReleasing, setIsReleasing] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Milestone Data
  const milestones = [
    {
      phase: '🌙 ដំណាក់កាលទី ១',
      title: 'ថ្ងៃជួបគ្នាដំបូង',
      date: 'ខែកុម្ភៈ ឆ្នាំ២០២២',
      desc: 'ក្រោមរាត្រីស្រស់បំព្រងក្នុងសួនកម្សាន្ត យើងបានជួបគ្នាដោយចៃដន្យ តែជាចំណារនិស្ស័យដែលមិនអាចបំភ្លេចបាន។',
      icon: 'sparkle'
    },
    {
      phase: '🌓 ដំណាក់កាលទី ២',
      title: 'ពាក្យសារភាពស្នេហ៍',
      date: 'ខែវិច្ឆិកា ឆ្នាំ២០២៣',
      desc: 'ក្រោមក្លិនក្រអូបឈ្ងុយឈ្ងប់នៃផ្ការំដួលព្រៃ ដៃទាំងពីរក្តោបជាប់គ្នា អមដោយសច្ចាថានឹងរួមរស់ជាមួយគ្នារហូតតទៅ។',
      icon: 'heart'
    },
    {
      phase: '🌔 ដំណាក់កាលទី ៣',
      title: 'ពិធីចូលស្តីដណ្តឹង',
      date: 'ខែមីនា ឆ្នាំ២០២៥',
      desc: 'ចាស់ទុំទាំងសងខាងបានជួបជុំគ្នា អនុមោទនាពរជ័យ និងបំពាក់ចិញ្ចៀនសច្ចារវាងគូដណ្តឹងទាំងពីរ។',
      icon: 'ring'
    },
    {
      phase: '🌕 ដំណាក់កាលទី ៤',
      title: 'រាត្រីមង្គលការពិសិដ្ឋ',
      date: weddingDate,
      desc: 'ថ្ងៃសិរីសួស្តីដែលយើងទាំងពីរបានក្លាយជាគូស្វាមីភរិយាពេញច្បាប់ ក្រោមការប្រសិទ្ធពរពីញាតិមិត្តជិតឆ្ងាយ។',
      icon: 'stars'
    }
  ];

  // Ambient Nocturne Harp & Chime Synthesizer
  const toggleAudio = () => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Romantic moonlit pentatonic harp notes (D minor / F major pentatonic)
      // D4, F4, G4, A4, C5, D5, F5
      const notes = [293.66, 349.23, 392.00, 440.00, 523.25, 587.33, 698.46];
      let step = 0;

      const playPluck = () => {
        if (!audioContextRef.current || audioContextRef.current.state === 'closed') return;
        const now = ctx.currentTime;
        const note = notes[step % notes.length];
        step++;

        // Primary bell-harp oscillator
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, now);

        // Harmonics shimmer
        const shimmerOsc = ctx.createOscillator();
        const shimmerGain = ctx.createGain();
        shimmerOsc.type = 'triangle';
        shimmerOsc.frequency.setValueAtTime(note * 2, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        shimmerGain.gain.setValueAtTime(0, now);
        shimmerGain.gain.linearRampToValueAtTime(0.03, now + 0.08);
        shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        osc.connect(gain);
        shimmerOsc.connect(shimmerGain);
        gain.connect(ctx.destination);
        shimmerGain.connect(ctx.destination);

        osc.start(now);
        shimmerOsc.start(now);
        osc.stop(now + 2.6);
        shimmerOsc.stop(now + 2.0);
      };

      playPluck();
      timerRef.current = setInterval(playPluck, 1100);
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Canvas Starlight & Glowing Fireflies Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = 45;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.2 + 0.8,
        color: i % 3 === 0 ? '#F3D282' : i % 3 === 1 ? '#FDE68A' : '#E9D5FF',
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.6 - 0.2, // Drifting upwards
        alpha: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        pulseVal: Math.random() * Math.PI
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.pulseVal += p.pulseSpeed;
        const currentAlpha = Math.max(0.1, Math.min(1, p.alpha + Math.sin(p.pulseVal) * 0.3));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.radius * 4;
        ctx.fill();
        ctx.restore();

        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Lantern Release Handler
  const handleReleaseLantern = (e) => {
    e.preventDefault();
    if (!lanternSender.trim() || !lanternWish.trim()) return;

    setIsReleasing(true);
    setTimeout(() => {
      setReleasedLanterns((prev) => [
        {
          id: Date.now(),
          name: lanternSender,
          text: lanternWish,
          time: 'អម្បាញ់មិញ'
        },
        ...prev
      ]);
      setLanternWish('');
      setIsReleasing(false);
    }, 900);
  };

  const copyBankInfo = () => {
    navigator.clipboard?.writeText('001 234 567 (ABA Bank: LY VISAL)');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  return (
    <div className="w-full bg-[#070B14] text-slate-100 font-kantumruy relative selection:bg-amber-400 selection:text-slate-900 pb-20">
      {/* Background Interactive Fireflies Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Floating Audio Toggle */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={toggleAudio}
          className={`px-3.5 py-2.5 rounded-full flex items-center gap-2 border backdrop-blur-md shadow-2xl transition-all duration-300 text-xs font-medium cursor-pointer ${
            isPlaying
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/60 shadow-amber-500/20 ring-2 ring-amber-400/30'
              : 'bg-slate-900/70 text-slate-300 border-slate-700/80 hover:text-white'
          }`}
          title="តន្ត្រីពន្លឺចន្ទរំដួល (Moonlight Ambient)"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-amber-300" />
              <span>តន្ត្រីរាត្រីមនោរម្យ</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>បើកតន្ត្រី</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Header Section */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-0 overflow-hidden pt-12 pb-16 w-full">
        {/* Deep Midnight Gradient with Moonlight Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.22),rgba(15,23,42,0)_75%)] pointer-events-none" />
        <div className="absolute top-10 w-72 h-72 rounded-full bg-amber-200/10 blur-[100px] pointer-events-none" />

        {/* Crescent / Full Moon Motif Badge */}
        <div className="relative z-20 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/30 text-amber-200 text-xs tracking-wider mb-6 backdrop-blur-md shadow-lg">
          <Moon className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="font-serifTrad uppercase tracking-widest text-[11px]">Moonlight Floral Romance</span>
          <Stars className="w-3.5 h-3.5 text-amber-300" />
        </div>

        {/* Prewedding Portrait in Moonlit Arch Frame (Fitted 100% Edge-to-Edge with Container) */}
        <div className="relative z-20 mb-8 group w-full mx-auto px-0">
          <div className="relative overflow-hidden border-y-2 border-amber-300/60 shadow-2xl aspect-[896/1200] bg-slate-900 w-full">
            <img
              src={preweddingImage}
              alt="Cambodian Couple Prewedding"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition duration-700 ease-out"
            />
            {/* Dark gradient overlay at bottom for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-black/20" />

            {/* Glowing Floral Corner Silhouette */}
            <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-slate-950/70 backdrop-blur-md border border-amber-400/20 text-center">
              <span className="text-[11px] text-amber-200/90 font-serifTrad tracking-widest uppercase block">
                The Sacred Union
              </span>
              <p className="font-suwannaphum text-sm text-white font-semibold">
                ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
              </p>
            </div>
          </div>
        </div>

        {/* Couple Names Styled with font-suwannaphum */}
        <div className="relative z-20 space-y-3 max-w-md mx-auto">
          <div className="text-xs uppercase tracking-widest text-amber-300/80 font-serifTrad">
            Together with their families
          </div>

          <h1 className="font-suwannaphum text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-rose-200 drop-shadow-[0_4px_16px_rgba(217,175,82,0.4)] leading-tight">
            {groomName}
          </h1>

          <div className="flex items-center justify-center gap-3 my-2">
            <span className="h-[1px] w-14 bg-gradient-to-r from-transparent via-amber-300 to-amber-400" />
            <span className="font-serifTrad italic text-amber-300 text-lg font-bold">~ & ~</span>
            <span className="h-[1px] w-14 bg-gradient-to-l from-transparent via-amber-300 to-amber-400" />
          </div>

          <h1 className="font-suwannaphum text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-rose-200 drop-shadow-[0_4px_16px_rgba(217,175,82,0.4)] leading-tight">
            {brideName}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 font-light max-w-sm mx-auto pt-2 leading-relaxed">
            «ផ្ការំដួលក្រអូបពេលរាត្រី ស្នេហ៍ស្មោះភក្តីក្រោមពន្លឺចន្ទពេញវង់»
          </p>
        </div>

        {/* Date & Location Pill Card */}
        <div className="relative z-20 mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-200">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="font-suwannaphum font-semibold text-amber-200">{weddingDate}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>{weddingTime}</span>
          </div>
        </div>
      </section>

      {/* Parents Blessing Section */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-12">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-amber-400/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Subtle Golden Glow Circle */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-serifTrad">
              <Sparkles className="w-3.5 h-3.5" />
              <span>សិរីមង្គលមហាកិត្តិយស</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-suwannaphum text-2xl sm:text-3xl font-bold text-amber-100">
              សេចក្តីគោរពអញ្ជើញ និងពរជ័យមាតាបិតា
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              យើងខ្ញុំជាមាតាបិតាទាំងសងខាង មានកិត្តិយសដ៏ខ្ពង់ខ្ពស់សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍កូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ។
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center border-t border-slate-800 pt-6">
            {/* Groom's Parents */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-amber-300/80 font-serifTrad uppercase tracking-wider block mb-1">
                ខាងកូនប្រុស
              </span>
              <p className="font-suwannaphum text-sm sm:text-base font-semibold text-slate-100">{groomFather}</p>
              <p className="font-suwannaphum text-sm sm:text-base font-semibold text-slate-100">{groomMother}</p>
            </div>

            {/* Bride's Parents */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-amber-300/80 font-serifTrad uppercase tracking-wider block mb-1">
                ខាងកូនស្រី
              </span>
              <p className="font-suwannaphum text-sm sm:text-base font-semibold text-slate-100">{brideFather}</p>
              <p className="font-suwannaphum text-sm sm:text-base font-semibold text-slate-100">{brideMother}</p>
            </div>
          </div>
        </div>
      </section>

      {/* UNIQUE COMPONENT 1: Moon-Phase Love Story Milestones Deck */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs mb-2">
            <Moon className="w-3.5 h-3.5 text-amber-300" />
            <span>និស្ស័យស្នេហ៍ក្រោមក្លិនផ្ការំដួល</span>
          </div>
          <h2 className="font-suwannaphum text-2xl sm:text-3xl font-bold text-white">
            ដំណើររឿងរ៉ាវនៃសេចក្តីស្រឡាញ់
          </h2>
          <p className="text-xs text-slate-400">ចុចលើដំណាក់កាលនីមួយៗ ដើម្បីអានដំណើរដើមទង</p>
        </div>

        {/* Milestone Steps Bar */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {milestones.map((m, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMilestone(idx)}
              className={`p-2.5 rounded-2xl text-center border transition-all duration-300 cursor-pointer ${
                activeMilestone === idx
                  ? 'bg-amber-400/20 border-amber-400 text-amber-200 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              <div className="text-xs sm:text-sm font-bold font-serifTrad mb-0.5">
                {idx + 1}
              </div>
              <div className="text-[10px] sm:text-[11px] truncate font-suwannaphum">
                {m.title}
              </div>
            </button>
          ))}
        </div>

        {/* Active Milestone Card */}
        <div className="rounded-3xl p-6 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-amber-400/30 backdrop-blur-xl relative overflow-hidden transition-all duration-500">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <span className="text-xs font-semibold text-amber-300 font-serifTrad block mb-1">
                {milestones[activeMilestone].phase} • {milestones[activeMilestone].date}
              </span>
              <h3 className="font-suwannaphum text-xl sm:text-2xl font-bold text-white">
                {milestones[activeMilestone].title}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-amber-300 fill-amber-300/30" />
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            {milestones[activeMilestone].desc}
          </p>
        </div>
      </section>

      {/* Ceremony Schedule & Location Section */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-amber-300 uppercase tracking-widest font-serifTrad">Schedule & Venue</span>
            <h2 className="font-suwannaphum text-2xl font-bold text-white">កាលវិភាគពិធីការ និងទីតាំង</h2>
          </div>

          <div className="space-y-4">
            {/* Morning Ceremony */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-suwannaphum font-bold text-white text-sm sm:text-base">ពិធីហែជំនូន & កាត់សក់បង្កក់សិរី</h4>
                  <span className="text-xs text-amber-300 font-serifTrad font-semibold">០៧:០០ ព្រឹក</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">រៀបចំពិធីតាមគន្លងប្រពៃណីព្រះពុទ្ធសាសនា និងទំនៀមខ្មែរបុរាណ នៅគេហដ្ឋានខាងស្រី</p>
              </div>
            </div>

            {/* Evening Reception */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-300 shrink-0 mt-0.5">
                <Moon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-suwannaphum font-bold text-white text-sm sm:text-base">ពិធីពិសាភោជនាហារ និងរាំកម្សាន្ត</h4>
                  <span className="text-xs text-rose-300 font-serifTrad font-semibold">{weddingTime}</span>
                </div>
                <p className="text-xs text-slate-400 mt-1">សូមអញ្ជើញទទួលទានអាហារពេលរាត្រី និងរីករាយជាមួយការប្រគុំតន្ត្រីសម័យ</p>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-amber-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-amber-300 font-semibold">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{weddingLocation}</span>
              </div>
              <p className="text-[11px] text-slate-400 pl-6">{locationAddress}</p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-semibold text-xs hover:bg-amber-300 transition duration-300 shadow-lg shadow-amber-400/20 shrink-0"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>បើកមើលផែនទី Google Maps</span>
            </a>
          </div>
        </div>
      </section>

      {/* UNIQUE COMPONENT 2: Virtual Starlight Lantern Release (បង្ហោះគោមជូនពរពន្លឺចន្ទ) */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-10">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0F172A] via-[#090D18] to-[#050811] border border-amber-400/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
              <span>គោមសិរីសួស្តីបង្ហោះលើមេឃ</span>
            </div>
            <h2 className="font-suwannaphum text-2xl sm:text-3xl font-bold text-amber-100">
              បង្ហោះគោមជូនពរពន្លឺចន្ទ
            </h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              ផ្ញើសារជូនពររបស់អ្នកតាមរយៈគោមរាត្រី បង្ហោះឡើងទៅកាន់ពន្លឺចន្ទ ដើម្បីប្រសិទ្ធពរជ័យដល់គូស្វាមីភរិយាថ្មី។
            </p>
          </div>

          {/* Lantern Form */}
          <form onSubmit={handleReleaseLantern} className="space-y-3 mb-8">
            <input
              type="text"
              value={lanternSender}
              onChange={(e) => setLanternSender(e.target.value)}
              placeholder="ឈ្មោះរបស់អ្នក (ឧ. សុខ ពិសិដ្ឋ & ក្រុមគ្រួសារ)"
              className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
              required
            />
            <textarea
              value={lanternWish}
              onChange={(e) => setLanternWish(e.target.value)}
              placeholder="សរសេរពាក្យជូនពររបស់អ្នកនៅទីនេះ..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition resize-none"
              required
            />
            <button
              type="submit"
              disabled={isReleasing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition shadow-xl shadow-amber-400/25 cursor-pointer disabled:opacity-50"
            >
              {isReleasing ? (
                <>
                  <Flame className="w-4 h-4 animate-spin text-slate-950" />
                  <span>កំពុងបង្ហោះគោមឡើងមេឃ...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>បង្ហោះគោមជូនពរឥឡូវនេះ</span>
                </>
              )}
            </button>
          </form>

          {/* Live Released Lanterns Feed */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-amber-200/90 uppercase tracking-wider font-serifTrad flex items-center gap-2">
              <Stars className="w-3.5 h-3.5 text-amber-300" />
              <span>គោមជូនពរដែលបានបង្ហោះរួច ({releasedLanterns.length})</span>
            </h4>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {releasedLanterns.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-400/20 text-xs space-y-1 relative group hover:border-amber-400/50 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-suwannaphum font-semibold text-amber-200 text-xs">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-serifTrad">{item.time}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Digital Gift Envelope & ABA QR */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 text-center space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-serifTrad">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>ចំណងដៃមង្គលការឌីជីថល</span>
            </div>
            <h2 className="font-suwannaphum text-2xl font-bold text-white">
              អាំងប៉ាវ & ចំណងដៃពរជ័យ
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              សម្រាប់ញាតិមិត្តដែលមិនបានមកចូលរួមផ្ទាល់ អាចផ្ញើចំណងដៃជូនពរតាមរយៈគណនីធនាគារខាងក្រោម
            </p>
          </div>

          <div className="max-w-xs mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl flex items-center justify-center shadow-lg">
              {/* Fallback QR representation */}
              <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-800 text-[10px] font-mono text-center p-1 border border-slate-300">
                <span className="font-bold text-xs text-blue-900">ABA BANK</span>
                <span className="text-[9px] mt-1">SCAN TO PAY</span>
                <span className="text-[8px] text-slate-500">LY VISAL</span>
              </div>
            </div>

            <div className="text-xs text-slate-300 space-y-0.5">
              <p className="font-semibold text-white">ABA Bank: 001 234 567</p>
              <p className="text-[11px] text-slate-400">ឈ្មោះគណនី: LY VISAL</p>
            </div>

            <button
              onClick={copyBankInfo}
              className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              {copiedBank ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">បានចម្លងរួចរាល់!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>ចម្លងលេខកុងធនាគារ</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Footer Acknowledgement */}
      <footer className="relative z-20 text-center py-8 text-xs text-slate-500 space-y-2">
        <p className="font-suwannaphum text-amber-200/80">
          សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមាន និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក!
        </p>
        <p className="font-serifTrad text-[11px] tracking-widest text-slate-600 uppercase">
          Digital Theab • Moonlight Floral Romance Edition
        </p>
      </footer>
    </div>
  );
}
