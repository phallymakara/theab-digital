import TemplateGoogleMap from '../../TemplateGoogleMap';
import TemplateCountdown from '../../TemplateCountdown';
import TemplateGratitudeNote from '../../TemplateGratitudeNote';
import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Heart,
  Send,
  Copy,
  Check,
  X,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  BookOpen,
  CalendarCheck,
  Camera,
  Gift,
  Mail,
  Phone
} from 'lucide-react';

import { useTemplateAudio } from '../../../utils/useTemplateAudio';

export function EditorialMagazineTemplate({ data = {}, invitation = {}, activeTemplate = {} }) {
  const groom = data.groomName || invitation.groomName || activeTemplate?.demoGroom || 'កុសល វឌ្ឍនៈ';
  const bride = data.brideName || invitation.brideName || activeTemplate?.demoBride || 'សារ៉ា ទេវី';
  const groomParents = data.groomParents || (invitation.groomParents?.father ? `${invitation.groomParents.father} និង ${invitation.groomParents.mother}` : 'លោក កុសល សម្បត្តិ និង លោកស្រី គង់ សុជាតិ');
  const brideParents = data.brideParents || (invitation.brideParents?.father ? `${invitation.brideParents.father} និង ${invitation.brideParents.mother}` : 'លោក ទេព សុវណ្ណ និង លោកស្រី ហេង ធីតា');
  const dateStr = data.ceremonyDate || invitation.weddingDate || activeTemplate?.demoDate || 'ថ្ងៃសៅរ៍ ទី១៩ ខែធ្នូ ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || invitation.weddingTime || 'វេលាម៉ោង ០៧:០០ ព្រឹក ដល់ ០៨:៣០ យប់';
  const locationName = data.ceremonyLocation || invitation.weddingLocation || activeTemplate?.demoLocation || 'សណ្ឋាគារ រ៉ូសវូដ ភ្នំពេញ (Rosewood Phnom Penh Salon)';
  const address = data.locationAddress || data.ceremonyAddress || invitation.locationAddress || 'អគារ វឌ្ឍនៈ កាពីតាល មហាវិថីព្រះមុនីវង្ស រាជធានីភ្នំពេញ';
  const googleMapsUrl = data.googleMapsUrl || invitation.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName + ' ' + address)}`;
  const preweddingImg = data.preweddingPhoto || data.bgImage || activeTemplate?.bgImage || '/images/templates/floral_editorial_magazine_prewedding.webp';

  // Bank & Gift
  const bankName = data.bankName || invitation.bankName || 'ABA BANK / BAKONG';
  const accountName = data.accountName || invitation.accountName || `${groom} & ${bride}`;
  const accountNumber = data.accountNumber || invitation.accountNumber || '001 888 999';
  const qrCodeImage = data.qrCodeImage || invitation.qrCodeImage || '/images/aba_qr.webp';

  // Host Contacts
  const phoneGroom = data.hostPhoneGroom || data.phoneGroom || invitation.hostPhoneGroom || '012 345 678';
  const phoneBride = data.hostPhoneBride || data.phoneBride || invitation.hostPhoneBride || '098 765 432';
  const telegramLink = data.telegramLink || invitation.telegramLink || 'https://t.me';

  // Dynamic Programs
  const programs = (data.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { time: '07:00 ព្រឹក', title: 'ពិធីសូត្រមន្ត & ហែជំនូន', desc: 'កិច្ចសូត្រមន្តចម្រើនព្រះបរិត្ត និងហែផ្លែឈើជំនូន' },
        { time: '09:30 ព្រឹក', title: 'ពិធីកាត់សក់ & សែនចងដៃ', desc: 'កាត់សក់បង្កក់សិរី បង្វិលពពិល និងសែនចងដៃ' },
        { time: '17:30 ល្ងាច', title: 'ពិធីពិសាភោជនាហារមង្គលការ', desc: 'ទទួលភ្ញៀវកិត្តិយសពិសាអាហារ និងរាំកម្សាន្ត' }
      ];

  const heroImages = (data.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : (activeTemplate?.heroImages && activeTemplate.heroImages.length > 0)
    ? activeTemplate.heroImages
    : [
        preweddingImg,
        '/images/templates/floral-romance/floral_1.webp',
        '/images/templates/floral-romance/floral_2.webp',
        '/images/templates/floral-romance/floral_3.webp'
      ];
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const [activeTab, setActiveTab] = useState('cover'); // 'cover' | 'letter' | 'agenda' | 'lookbook' | 'rsvp'
  const { isPlaying, toggleMusic } = useTemplateAudio();
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'រតនៈ & ម៉ូនីកា', text: 'សូមជូនពរគូស្វាមីភរិយាថ្មីស្រឡាញ់គ្នាលុះក្បាលត្រជាក់កោងខ្នង និងពោរពេញដោយស្នាមញញឹមរៀងរហូត!' },
    { id: 2, name: 'ក្រុមមិត្តភក្តិជិតដិត', text: 'Happy Wedding Day! Wishing you endless love, joy, and wonderful years ahead!' }
  ]);

  const canvasRef = useRef(null);

  // Live Petals Falling Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Mobile thermal optimization: Completely disable canvas loop on mobile screens or reduced motion
    if (typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches)) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petalColors = ['#F9A8D4', '#F472B6', '#FBCFE8', '#FDE047', '#FDA4AF'];
    const petals = [];
    const count = 22;

    class Petal {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * -canvas.height;
        this.size = Math.random() * 9 + 6;
        this.speedY = Math.random() * 1.2 + 0.6;
        this.speedX = Math.random() * 1.4 - 0.7;
        this.angle = Math.random() * 360;
        this.angularSpeed = (Math.random() - 0.5) * 1.4;
        this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
        this.opacity = Math.random() * 0.45 + 0.35;
      }
      update() {
        this.y += this.speedY;
        this.x += Math.sin((this.angle * Math.PI) / 180) * 0.8 + this.speedX * 0.4;
        this.angle += this.angularSpeed;

        if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
          this.reset();
          this.y = -10;
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(this.size, -this.size / 2, this.size * 1.5, this.size, 0, this.size * 1.6);
        ctx.bezierCurveTo(-this.size * 1.5, this.size, -this.size, -this.size / 2, 0, 0);
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < count; i++) {
      petals.push(new Petal());
    }

    let lastTime = 0;
    const fpsInterval = 1000 / 30; // 30 FPS throttling for mobile efficiency
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry && entry.isIntersecting;
      if (isVisible && !document.hidden && !animationFrameId) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const onVisChange = () => {
      if (!document.hidden && isVisible && !animationFrameId) {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', onVisChange);

    const animate = (currentTime = performance.now()) => {
      if (!isVisible || document.hidden) {
        animationFrameId = null;
        return;
      }
      const elapsed = currentTime - lastTime;
      if (elapsed < fpsInterval) return;
      lastTime = currentTime - (elapsed % fpsInterval);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisChange);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);



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
      confetti({ particleCount: 85, spread: 80, origin: { y: 0.65 }, colors: ['#FB7185', '#DFB15B', '#FFFFFF', '#F43F5E'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  const lookbookPhotos = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos.map((p, idx) => ({
        id: p.id || idx + 1,
        src: p.src || p.url,
        title: p.caption || `Look ${idx + 1}`,
        subtitle: 'Editorial Gallery'
      }))
    : (activeTemplate?.galleryPhotos?.map((p, idx) => ({
        id: p.id || idx + 1,
        src: p.src || p.url,
        title: p.caption || `Look ${idx + 1}`,
        subtitle: 'Editorial Gallery'
      })) || [
        { id: 1, src: preweddingImg, title: 'The Wedding Cover', subtitle: 'Phnom Penh Editorial Look' },
        { id: 2, src: '/images/templates/floral-romance/floral_1.webp', title: 'The Serenade Arch', subtitle: 'Blush Hydrangeas' },
        { id: 3, src: '/images/templates/floral-romance/floral_2.webp', title: 'Sunset Silhouette', subtitle: 'Golden Hour Splendor' }
      ]);

  return (
    <div className="w-full min-h-screen text-[#262626] font-kantumruy antialiased selection:bg-[#E11D48] selection:text-white relative bg-[#FDFBF7]">
      {/* Floating Canvas for Live Falling Rose Petals */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-30 w-full h-full"
      />

      {/* Floating Music Player */}
      <aside className="fixed top-5 right-5 z-40">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-[#1C1917] text-xs font-semibold shadow-md hover:bg-white active:scale-95 transition-all cursor-pointer"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#E11D48] animate-pulse" />
              <span className="font-phalluch text-[11px] text-[#E11D48]">តន្ត្រី (កំពុងចាក់)</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-stone-400" />
              <span className="font-phalluch text-[11px] text-stone-600">តន្ត្រីមនោសញ្ចេតនា</span>
            </>
          )}
        </button>
      </aside>

      {/* Main Editorial Container */}
      <div className="w-full relative bg-white pb-28">
        
        {/* =========================================================================
            CHAPTER 1: EDITORIAL MAGAZINE COVER HERO
            ========================================================================= */}
        <section className="relative w-full aspect-[3/4] bg-stone-900 overflow-hidden">
          <img
            src={heroImages[currentHeroIdx] || preweddingImg}
            alt="Editorial Wedding"
            className="w-full h-full object-cover object-top scale-100 transition-all duration-500" decoding="async" />
          {heroImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => setCurrentHeroIdx((currentHeroIdx - 1 + heroImages.length) % heroImages.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setCurrentHeroIdx((currentHeroIdx + 1) % heroImages.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5 z-20">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentHeroIdx(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${i === currentHeroIdx ? 'w-5 bg-amber-400' : 'w-1.5 bg-white/50'}`}
                  />
                ))}
              </div>
            </>
          )}

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40 pointer-events-none"></div>

          {/* Top Magazine Masthead & Issue Info */}
          <div className="absolute top-4 inset-x-5 flex items-center justify-between z-10 text-white/90 border-b border-white/20 pb-2">
            <span className="font-serifTrad tracking-[0.25em] text-[10px] uppercase font-bold text-amber-200">
              SPECIAL WEDDING EDITION
            </span>
            <span className="font-serifTrad tracking-widest text-[10px] uppercase text-white/80">
              VOL. XXIV • 2026
            </span>
          </div>

          {/* Large Magazine Title in Editorial Typography */}
          <div className="absolute top-10 inset-x-0 text-center z-10 pointer-events-none">
            <div className="font-serifTrad text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-[0.18em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              VOGUE
            </div>
            <div className="font-serifTrad text-[11px] sm:text-xs tracking-[0.45em] text-amber-200 font-semibold uppercase -mt-1 drop-shadow">
              WEDDING CELEBRATION
            </div>
          </div>

          {/* Couple Feature Headline in KH PhalLuch 002 Font */}
          <div className="absolute bottom-6 inset-x-4 sm:inset-x-5 z-10 text-white text-center">
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
              <span className="text-amber-300 text-xs">❖</span>
              <span className="font-phalluch text-[11px] sm:text-xs text-amber-100 tracking-wider">
                សិរីមង្គលអាពាហ៍ពិពាហ៍
              </span>
              <span className="text-amber-300 text-xs">❖</span>
            </div>

            <h1 className="font-phalluch text-xl sm:text-2xl md:text-3xl text-white tracking-wide drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)] leading-relaxed">
              {groom} <span className="font-serifTrad italic text-base sm:text-xl text-amber-200">&</span> {bride}
            </h1>

            <p className="text-xs font-serifTrad tracking-[0.2em] text-amber-100/90 uppercase mt-1">
              {dateStr} • PHNOM PENH, CAMBODIA
            </p>
          </div>
        </section>

        {/* =========================================================================
            EDITORIAL CHAPTER TABS NAVIGATION (UNIQUE COMPONENT STRUCTURE)
            ========================================================================= */}
        <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 py-2.5 px-3">
          <div className="flex items-center justify-around text-xs font-serifTrad">
            <button
              onClick={() => setActiveTab('cover')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'cover' ? 'bg-stone-900 text-amber-200 font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="font-phalluch text-[11px]">គម្រប</span>
            </button>
            <button
              onClick={() => setActiveTab('letter')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'letter' ? 'bg-stone-900 text-amber-200 font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="font-phalluch text-[11px]">សំបុត្រ</span>
            </button>
            <button
              onClick={() => setActiveTab('agenda')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'agenda' ? 'bg-stone-900 text-amber-200 font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span className="font-phalluch text-[11px]">កាលវិភាគ</span>
            </button>
            <button
              onClick={() => setActiveTab('lookbook')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'lookbook' ? 'bg-stone-900 text-amber-200 font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span className="font-phalluch text-[11px]">រូបថត</span>
            </button>
            <button
              onClick={() => setActiveTab('rsvp')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'rsvp' ? 'bg-stone-900 text-amber-200 font-bold' : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Gift className="w-3.5 h-3.5" />
              <span className="font-phalluch text-[11px]">RSVP</span>
            </button>
          </div>
        </section>

        {/* Content Container */}
        <div className="p-5 sm:p-6 space-y-10">

          {/* =========================================================================
              VIEW 1: INVITATION LETTER & FORMAL BLESSINGS
              ========================================================================= */}
          {(activeTab === 'cover' || activeTab === 'letter') && (
            <section className="text-center relative">
              <div className="p-6 rounded-3xl bg-[#FAF8F5] border border-stone-200 shadow-sm relative overflow-hidden">
                <div className="w-10 h-10 rounded-full mx-auto bg-stone-900 text-amber-200 flex items-center justify-center font-serifTrad font-bold text-sm mb-3 shadow">
                  V
                </div>

                <span className="text-xs font-serifTrad text-stone-400 uppercase tracking-[0.25em] block mb-1">
                  OFFICIAL INVITATION
                </span>

                <h2 className="font-phalluch text-2xl text-stone-900 mb-3 tracking-wide">
                  លិខិតគោរពអញ្ជើញ
                </h2>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto mb-6">
                  យើងខ្ញុំមានកិត្តិយសដ៏ខ្ពង់ខ្ពស់ សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍កូនប្រុស កូនស្រីរបស់យើងខ្ញុំ
                </p>

                {/* Parents Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-5 border-t border-stone-200 text-left">
                  <div className="p-3.5 rounded-2xl bg-white border border-stone-200">
                    <span className="text-[10px] font-serifTrad text-stone-400 uppercase tracking-wider block mb-1">
                      GROOM'S PARENTS
                    </span>
                    <span className="text-xs font-phalluch text-stone-900 block mb-0.5">មាតាបិតាខាងកូនប្រុស</span>
                    <p className="text-xs text-stone-700 font-semibold">{groomParents}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-stone-200">
                    <span className="text-[10px] font-serifTrad text-stone-400 uppercase tracking-wider block mb-1">
                      BRIDE'S PARENTS
                    </span>
                    <span className="text-xs font-phalluch text-stone-900 block mb-0.5">មាតាបិតាខាងកូនស្រី</span>
                    <p className="text-xs text-stone-700 font-semibold">{brideParents}</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* =========================================================================
              VIEW 2: THE EDITORIAL ITINERARY & CEREMONY LOCATION
              ========================================================================= */}
          {(activeTab === 'cover' || activeTab === 'agenda') && (
            <section className="space-y-4">
              <div className="text-center mb-2">
                <span className="text-xs font-serifTrad text-stone-400 uppercase tracking-[0.25em] block mb-1">
                  WEDDING CEREMONY AGENDA
                </span>
                <h3 className="font-phalluch text-xl text-stone-900">
                  កាលវិភាគពិធីសិរីមង្គល
                </h3>
              </div>

              <div className="space-y-2.5">
                {programs.map((prog, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-xl bg-stone-900 text-amber-200 flex items-center justify-center font-serifTrad font-bold text-xs text-center px-1">
                        {prog.time.split(' ')[0]}
                      </div>
                      <div>
                        <h4 className="font-phalluch text-xs sm:text-sm text-stone-900">{prog.title}</h4>
                        {prog.desc && <p className="text-[11px] text-stone-500">{prog.desc}</p>}
                      </div>
                    </div>
                    <span className="text-[10px] font-serifTrad text-stone-400 uppercase">{prog.time}</span>
                  </div>
                ))}
              </div>

              {/* Gratitude & Apology Section */}
              <TemplateGratitudeNote isDark={true} accentColor="#f59e0b" fontFamily="font-phalluch" />

              {/* Location Card with Embedded Google Map & Text Address */}
              <div className="mt-4">
                <TemplateGoogleMap
                  locationName={locationName}
                  address={address}
                  googleMapsUrl={googleMapsUrl}
                  isDark={true}
                  accentColor="#f59e0b"
                  fontFamily="font-phalluch"
                />
              </div>
            </section>
          )}

          {/* =========================================================================
              VIEW 3: EDITORIAL LOOKBOOK GALLERY
              ========================================================================= */}
          {(activeTab === 'cover' || activeTab === 'lookbook') && (
            <section className="space-y-4">
              <div className="text-center mb-2">
                <span className="text-xs font-serifTrad text-stone-400 uppercase tracking-[0.25em] block mb-1">
                  EDITORIAL LOOKBOOK
                </span>
                <h3 className="font-phalluch text-xl text-stone-900">
                  កម្រងរូបថតទស្សនាវដ្តី
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {lookbookPhotos.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setActivePhoto(item)}
                    className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-stone-100 cursor-pointer shadow-xs hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy" decoding="async" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                      <p className="text-xs font-serifTrad font-bold">{item.title}</p>
                      <p className="text-[10px] text-amber-200">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* =========================================================================
              VIEW 4: RSVP & DIGITAL GIFT RECEPTION DESK
              ========================================================================= */}
          {(activeTab === 'cover' || activeTab === 'rsvp') && (
            <section className="space-y-6">
              {/* Digital Gift */}
              <div className="p-5 rounded-3xl bg-[#FAF8F5] border border-stone-200 text-center">
                <span className="text-xs font-serifTrad text-stone-400 uppercase tracking-[0.25em] block mb-1">
                  DIGITAL GIFT & BLESSING
                </span>
                <h4 className="font-phalluch text-lg text-stone-900 mb-2">
                  ចងដៃតាមរយៈគណនីធនាគារ ({bankName})
                </h4>
                <p className="text-xs text-stone-500 mb-3">{accountName}</p>

                <div
                  onClick={() => setShowQrModal(true)}
                  className="max-w-[190px] mx-auto p-3 bg-white rounded-2xl border border-stone-200 shadow-inner mb-3 cursor-pointer hover:border-stone-400 transition-all"
                >
                  <img
                    src={qrCodeImage || '/images/aba_qr.webp'}
                    alt="QR Code"
                    className="w-full h-auto rounded-lg object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }} decoding="async" loading="lazy" />
                  <span className="text-[10px] text-stone-400 mt-1 block">ចុចដើម្បីពង្រីក QR</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/70 border border-stone-300 text-xs">
                  <span className="font-serifTrad font-bold text-stone-900">{accountNumber}</span>
                  <button
                    onClick={() => copyAccount(accountNumber.replace(/\s+/g, ''))}
                    className="text-stone-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer hover:underline"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'បានចម្លង!' : 'ចម្លង'}</span>
                  </button>
                </div>
              </div>

              {/* Host Contacts */}
              <div className="p-5 rounded-3xl bg-white border border-stone-200 text-center shadow-xs">
                <span className="text-xs font-serifTrad text-stone-400 uppercase tracking-[0.25em] block mb-1">
                  HOST CONTACT DETAILS
                </span>
                <h4 className="font-phalluch text-lg text-stone-900 mb-3">
                  ទំនាក់ទំនងម្ចាស់កម្មវិធី
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
                  <a
                    href={`tel:${phoneGroom}`}
                    className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-all text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-stone-700" />
                      <span className="font-phalluch text-stone-900">ខាងកូនកំលោះ</span>
                    </div>
                    <span className="font-serifTrad font-bold text-stone-900">{phoneGroom}</span>
                  </a>
                  <a
                    href={`tel:${phoneBride}`}
                    className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 hover:bg-stone-100 transition-all text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-stone-700" />
                      <span className="font-phalluch text-stone-900">ខាងកូនក្រមុំ</span>
                    </div>
                    <span className="font-serifTrad font-bold text-stone-900">{phoneBride}</span>
                  </a>
                </div>
                {telegramLink && (
                  <div className="mt-3">
                    <a
                      href={telegramLink.startsWith('http') ? telegramLink : `https://${telegramLink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900 text-amber-200 text-xs font-bold hover:bg-stone-800 transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Telegram Host Chat</span>
                    </a>
                  </div>
                )}
              </div>

              {/* RSVP Form */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200 shadow-sm">
                <div className="text-center mb-4">
                  <span className="text-xs font-serifTrad text-stone-400 uppercase tracking-[0.25em] block mb-1">
                    GUEST CONFIRMATION
                  </span>
                  <h4 className="font-phalluch text-xl text-stone-900">
                    ឆ្លើយតបការចូលរួម (RSVP)
                  </h4>
                </div>

                {rsvpDone ? (
                  <div className="p-5 rounded-2xl bg-stone-100 border border-stone-300 text-center">
                    <Check className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                    <h5 className="font-phalluch text-sm text-stone-900">អរគុណសម្រាប់ការឆ្លើយតប!</h5>
                    <p className="text-xs text-stone-600 mt-1">
                      យើងខ្ញុំទន្ទឹងរង់ចាំវត្តមានដ៏ខ្ពង់ខ្ពស់របស់លោកអ្នក!
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvp} className="space-y-3">
                    <div>
                      <label className="block text-xs font-serifTrad text-stone-600 uppercase mb-1">Guest Name *</label>
                      <input
                        type="text"
                        required
                        value={rsvp.name}
                        onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                        placeholder="សូមបញ្ចូលឈ្មោះភ្ញៀវកិត្តិយស"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:outline-none focus:border-stone-900"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-serifTrad text-stone-600 uppercase mb-1">Attendance</label>
                        <select
                          value={rsvp.attendance}
                          onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:outline-none"
                        >
                          <option value="attending">ចូលរួមដោយក្តីរីករាយ</option>
                          <option value="regret">មិនអាចចូលរួមបាន</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-serifTrad text-stone-600 uppercase mb-1">Party Size</label>
                        <select
                          value={rsvp.guests}
                          onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs bg-stone-50 focus:outline-none"
                        >
                          <option value="1 នាក់">1 នាក់</option>
                          <option value="2 នាក់">2 នាក់</option>
                          <option value="ច្រើនជាងនេះ">ច្រើនជាងនេះ</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-stone-900 text-amber-200 text-xs font-serifTrad tracking-wider uppercase font-bold hover:bg-stone-800 transition-colors shadow cursor-pointer mt-2"
                    >
                      CONFIRM ATTENDANCE
                    </button>
                  </form>
                )}

                {/* Wishes Wall */}
                <div className="mt-8 pt-6 border-t border-stone-200">
                  <h5 className="font-phalluch text-xs text-stone-900 mb-3 text-center uppercase tracking-wider">
                    សៀវភៅពាក្យជូនពរឌីជីថល
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
                      className="w-full py-2 rounded-xl bg-stone-100 text-stone-800 hover:bg-stone-200 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>ផ្ញើពាក្យជូនពរ</span>
                    </button>
                  </form>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {wishesList.map((w) => (
                      <div key={w.id} className="p-2.5 rounded-xl bg-[#FAF8F5] border border-stone-200 text-xs">
                        <div className="font-serifTrad font-bold text-stone-900">{w.name}</div>
                        <p className="text-stone-600 text-[11.5px] mt-0.5">{w.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Editorial Colophon Footer */}
          <footer className="mt-12 text-center text-xs text-stone-400 pb-6 border-t border-stone-200 pt-6">
            <p className="font-serifTrad text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-1">
              THE WEDDING JOURNAL • ISSUE 24
            </p>
            <p className="text-[11px] font-kantumruy text-stone-400">
              រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ Digital Theab & Editorial Studio
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mt-3 text-xs text-stone-700 underline cursor-pointer"
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
            className="relative max-w-md w-full bg-stone-900 border border-stone-700 p-2 rounded-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-stone-900 font-bold flex items-center justify-center cursor-pointer shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={activePhoto.src} alt={activePhoto.title} className="w-full rounded-xl object-contain max-h-[70vh]" decoding="async" />
            <p className="text-center text-xs text-white mt-2 font-serifTrad">{activePhoto.title}</p>
          </div>
        </div>
      )}

      {/* QR Code Zoom Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white p-5 rounded-3xl max-w-xs w-full text-center shadow-2xl border border-stone-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-100 text-stone-700 hover:text-stone-950 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-phalluch text-sm text-stone-900 mb-1">{bankName}</h4>
            <p className="text-xs text-stone-500 mb-3">{accountName}</p>
            <img
              src={qrCodeImage || '/images/aba_qr.webp'}
              alt="QR Code"
              className="w-full aspect-square object-contain rounded-xl border border-stone-200" decoding="async" loading="lazy" />
            <p className="text-xs font-serifTrad font-bold text-stone-900 mt-3">
              {accountNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditorialMagazineTemplate;
