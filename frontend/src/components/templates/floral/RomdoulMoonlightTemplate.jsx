import { TemplateGoogleMap } from '../../TemplateGoogleMap';
import React, { useState, useEffect, useRef } from 'react';
import { useTemplateAudio } from '../../../utils/useTemplateAudio';
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
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Flame,
  ChevronDown,
  ChevronUp,
  X,
  Phone,
  MessageCircle,
  Users,
  Check,
  Download
} from 'lucide-react';

/**
 * RomdoulMoonlightTemplate
 * -------------------------------------------------------------
 * Theme: "រាត្រីផ្ការំដួលពន្លឺចន្ទ" (Romdoul Moonlight Starlight Union)
 * Category: ផ្កាស្រស់រ៉ូមែនទិក (floral)
 * Typography: font-komutt-a (headings/names) + font-serifTrad (Cinzel) + font-kantumruy (body)
 * Components:
 *   1. 5-Photo Khmer Prewedding Hero Snap Carousel with stationary centered typography
 *   2. Parents of Groom & Bride Blessing Section
 *   3. Cordial Formal Invitation Letter
 *   4. Calendar Matrix + Real-time Countdown Timer + Add to Calendar (.ics)
 *   5. Full 7 Ceremony Milestones + 4-Phase Love Story Interactive Deck
 *   6. Certificate of Gratitude (លិខិតថ្លែងអំណរគុណ)
 *   7. Venue Location & Google Maps Interactive Card
 *   8. 6-Photo Prewedding Gallery with Lightbox Modal
 *   9. Gift & Blessing Registry (ABA PAY & Bakong QR) with 1-click copy
 *   10. Interactive RSVP Confirmation Form
 *   11. Virtual Starlight Lantern Release & Wishes Guestbook
 *   12. Host Contacts (Telegram & Phone Call)
 *   13. Footer with Scroll-to-Top
 *   14. Ambient Nocturne Harp & Chimes Audio Synthesizer + Starlight Canvas
 */

export default function RomdoulMoonlightTemplate({
  data = {},
  invitation = {},
  invitationData = {},
  activeTemplate = {},
  isEditMode = false,
  onSave = () => {}
}) {
  // Safe resolved data
  const groomName = data?.groomName || invitation?.groomName || invitationData?.groomName || activeTemplate?.demoGroom || 'លី វិសាល';
  const brideName = data?.brideName || invitation?.brideName || invitationData?.brideName || activeTemplate?.demoBride || 'សុខ គន្ធារី';
  
  const groomFather = data?.groomFather || invitation?.groomParents?.father || 'លោក លី សុខុម';
  const groomMother = data?.groomMother || invitation?.groomParents?.mother || 'លោកស្រី ង៉ែត សុភ័ក្ត្រ';
  const brideFather = data?.brideFather || invitation?.brideParents?.father || 'លោក សុខ វ៉ាន់នី';
  const brideMother = data?.brideMother || invitation?.brideParents?.mother || 'លោកស្រី កែវ មុនី';

  const weddingDate = data?.ceremonyDate || invitation?.weddingDate || activeTemplate?.demoDate || 'ថ្ងៃសៅរ៍ ទី១៩ ខែធ្នូ ឆ្នាំ២០២៦';
  const weddingTime = data?.ceremonyTime || invitation?.weddingTime || 'ម៉ោង ៥:០០ ល្ងាច';
  const weddingLocation = data?.ceremonyLocation || invitation?.weddingLocation || activeTemplate?.demoLocation || 'សណ្ឋាគារ សូហ្វីតែល ភ្នំពេញ ភូគីត្រា (Sofitel Phnom Penh Phokeethra)';
  const locationAddress = data?.locationAddress || data?.ceremonyAddress || invitation?.locationAddress || 'សង្កាត់ទន្លេបាសាក់ ខណ្ឌចំការមន រាជធានីភ្នំពេញ';
  const googleMapsUrl = data?.googleMapsUrl || invitation?.googleMapsUrl || 'https://maps.google.com/?q=Sofitel+Phnom+Penh+Phokeethra';

  // Bank & Gift
  const bankName = data?.bankName || invitation?.bankName || 'ABA BANK / BAKONG';
  const accountName = data?.accountName || invitation?.accountName || `${groomName} & ${brideName}`;
  const accountNumber = data?.accountNumber || invitation?.accountNumber || '001 234 567';
  const qrCodeImage = data?.qrCodeImage || invitation?.qrCodeImage || '/images/aba_qr.webp';

  // Host Contacts
  const phoneGroom = data?.hostPhoneGroom || data?.phoneGroom || invitation?.hostPhoneGroom || '012 345 678';
  const phoneBride = data?.hostPhoneBride || data?.phoneBride || invitation?.hostPhoneBride || '098 765 432';
  const telegramLink = data?.telegramLink || invitation?.telegramLink || 'https://t.me';

  // 5 Khmer People Prewedding Images for Hero Section
  const heroList = (data?.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : (activeTemplate?.heroImages && activeTemplate.heroImages.length >= 5)
    ? activeTemplate.heroImages
    : [
        '/images/templates/romdoul-moonlight/hero_1.webp',
        '/images/templates/romdoul-moonlight/hero_2.webp',
        '/images/templates/romdoul-moonlight/hero_3.webp',
        '/images/templates/romdoul-moonlight/hero_4.webp',
        '/images/templates/romdoul-moonlight/hero_5.webp'
      ];

  // 6 Prewedding Gallery Photos with captions
  const galleryPhotos = (data?.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : (activeTemplate?.galleryPhotos || [
        { id: 1, src: '/images/templates/romdoul-moonlight/hero_1.webp', caption: 'រាត្រីផ្ការំដួល និងពន្លឺចន្ទពេញវង់' },
        { id: 2, src: '/images/templates/romdoul-moonlight/hero_2.webp', caption: 'ស្នាមញញឹមរំលេចក្តីសង្ឃឹម' },
        { id: 3, src: '/images/templates/romdoul-moonlight/hero_3.webp', caption: 'កម្រងផ្កាអ័រគីដេទឹកមាសសច្ចាស្នេហ៍' },
        { id: 4, src: '/images/templates/romdoul-moonlight/hero_4.webp', caption: 'ក្លិនផ្កាឡាវែនឌ័រក្រោមពន្លឺចន្ទ្រា' },
        { id: 5, src: '/images/templates/romdoul-moonlight/hero_5.webp', caption: 'សួនផ្កាបូតានិកមនោរម្យ' },
        { id: 6, src: '/images/templates/romdoul-moonlight/gallery_1.webp', caption: 'អនុស្សាវរីយ៍សិរីសួស្តីអមតៈ' }
      ]);

  // Hero Snap Carousel State
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const heroScrollRef = useRef(null);

  const handleHeroScroll = () => {
    if (heroScrollRef.current) {
      const scrollLeft = heroScrollRef.current.scrollLeft;
      const clientWidth = heroScrollRef.current.clientWidth;
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

  // Lightbox Modal State
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Fully isolated template audio («ភ្ជាប់និស្ស័យ» - NISAI)
  const { isPlaying, toggleAudio } = useTemplateAudio();

  // Canvas Firefly / Starlight Particles
  const canvasRef = useRef(null);

  // Love Story Active Milestone
  const [activeMilestone, setActiveMilestone] = useState(0);

  // Live Real-Time Countdown (Target: Dec 19, 2026)
  const [timeLeft, setTimeLeft] = useState({ days: 785, hours: 18, minutes: 30, seconds: 45 });

  useEffect(() => {
    const targetDate = new Date('2026-12-19T08:00:00+07:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 7 Standard Ceremony Milestones
  const ceremonyPrograms = (data?.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms.map((p, idx) => ({
        num: idx + 1,
        time: p.time,
        title: p.title,
        desc: p.desc
      }))
    : [
        { num: 1, time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន', desc: 'ជួបជុំបងប្អូនញាតិមិត្តជិតឆ្ងាយរៀបចំគ្រឿងដង្វាយ' },
        { num: 2, time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យមង្គល', desc: 'ក្បួនហែផ្លែឈើ និងគ្រឿងបណ្ណាការចូលគេហដ្ឋានមង្គល' },
        { num: 3, time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍ផ្លូវការ', desc: 'ចុះកិច្ចសន្យាអាពាហ៍ពិពាហ៍ចំពោះមុខអាជ្ញាធរមានសមត្ថកិច្ច' },
        { num: 4, time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរីមង្គល', desc: 'កាត់សក់ជម្រះចង្រៃ និងប្រសិទ្ធពរជ័យសិរីសួស្តី' },
        { num: 5, time: '០៩:៣០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ', desc: 'សំពះផ្ទឹមក្រងសីមា ចងខ្សែអំបោះក្រហម និងបង្វិលពពិល' },
        { num: 6, time: '១១:៣០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់', desc: 'ពិសារអាហារសាមគ្គីជួបជុំគ្រួសារ និងភ្ញៀវកិត្តិយស' },
        { num: 7, time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងពិធីជប់លៀង', desc: 'ពិសាភោជនាហារពេលរាត្រី និងរីករាយជាមួយតន្ត្រីសម័យ' }
      ];

  // 4 Moon Phase Story Milestones
  const milestones = [
    {
      phase: '🌙 ដំណាក់កាលទី ១',
      title: 'ថ្ងៃជួបគ្នាដំបូង',
      date: 'ខែកុម្ភៈ ឆ្នាំ២០២២',
      desc: 'ក្រោមរាត្រីស្រស់បំព្រងក្នុងសួនកម្សាន្ត យើងបានជួបគ្នាដោយចៃដន្យ តែជាចំណារនិស្ស័យដែលមិនអាចបំភ្លេចបាន។'
    },
    {
      phase: '🌓 ដំណាក់កាលទី ២',
      title: 'ពាក្យសារភាពស្នេហ៍',
      date: 'ខែវិច្ឆិកា ឆ្នាំ២០២៣',
      desc: 'ក្រោមក្លិនក្រអូបឈ្ងុយឈ្ងប់នៃផ្ការំដួលព្រៃ ដៃទាំងពីរក្តោបជាប់គ្នា អមដោយសច្ចាថានឹងរួមរស់ជាមួយគ្នារហូតតទៅ។'
    },
    {
      phase: '🌔 ដំណាក់កាលទី ៣',
      title: 'ពិធីចូលស្តីដណ្តឹង',
      date: 'ខែមីនា ឆ្នាំ២០២៥',
      desc: 'ចាស់ទុំទាំងសងខាងបានជួបជុំគ្នា អនុមោទនាពរជ័យ និងបំពាក់ចិញ្ចៀនសច្ចារវាងគូដណ្តឹងទាំងពីរ។'
    },
    {
      phase: '🌕 ដំណាក់កាលទី ៤',
      title: 'រាត្រីមង្គលការពិសិដ្ឋ',
      date: weddingDate,
      desc: 'ថ្ងៃសិរីសួស្តីដែលយើងទាំងពីរបានក្លាយជាគូស្វាមីភរិយាពេញច្បាប់ ក្រោមការប្រសិទ្ធពរពីញាតិមិត្តជិតឆ្ងាយ។'
    }
  ];

  // Copy Bank Info
  const [copiedBank, setCopiedBank] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const copyBankInfo = () => {
    navigator.clipboard?.writeText(accountNumber.replace(/\s+/g, ''));
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState('yes');
  const [rsvpGuests, setRsvpGuests] = useState('1 នាក់');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpNote, setRsvpNote] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      setRsvpName('');
      setRsvpPhone('');
      setRsvpNote('');
    }, 4500);
  };

  // Lantern Release State
  const [lanternSender, setLanternSender] = useState('');
  const [lanternWish, setLanternWish] = useState('');
  const [releasedLanterns, setReleasedLanterns] = useState([
    { id: 1, name: 'បងប្អូនជីដូនមួយ', text: 'សូមឱ្យចំណងស្នេហ៍ផ្អែមល្ហែមដូចក្លិនផ្ការំដួល និងស្ថិតស្ថេរដូចពន្លឺចន្ទ!', time: 'មុននេះបន្តិច' },
    { id: 2, name: 'មិត្តភក្តិវិទ្យាល័យ', text: 'អបអរសាទរគូព្រេងដ៏សមសួន! ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នងណា៎!', time: '១ ម៉ោងមុន' },
    { id: 3, name: 'លោកពូ & អ្នកមីង', text: 'សូមឱ្យក្មួយទាំងពីរទទួលបាននូវសេចក្តីសុខ សុភមង្គល និងទ្រព្យសម្បត្តិស្តុកស្តម្ភ!', time: '២ ម៉ោងមុន' }
  ]);
  const [isReleasing, setIsReleasing] = useState(false);

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
    }, 800);
  };



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
        vy: -Math.random() * 0.6 - 0.2,
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

  // Download .ics Calendar Event Helper
  const downloadCalendarEvent = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Theab Digital//Wedding Invitation//KM',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-romdoul-moonlight@theab-digital.com',
      'DTSTART:20261219T010000Z',
      'DTEND:20261219T150000Z',
      `SUMMARY:ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍: ${groomName} & ${brideName}`,
      `DESCRIPTION:សូមគោរពអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍`,
      `LOCATION:${weddingLocation}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Wedding-${groomName}-${brideName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[#070B14] text-slate-100 font-kantumruy relative selection:bg-amber-400 selection:text-slate-900 pb-20 select-none overflow-hidden">
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
          title="ភ្លេងមង្គល «ភ្ជាប់និស្ស័យ»"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-amber-300" />
              <span>ភ្លេង «ភ្ជាប់និស្ស័យ»</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-slate-400" />
              <span>ចាក់ភ្លេងមង្គល</span>
            </>
          )}
        </button>
      </div>

      {/* =========================================================================
          1. HERO SNAP CAROUSEL (5 KHMER PEOPLE PREWEDDING PHOTOS)
          - Fitted directly to entire container width without nested container wrapper
          - Stationary typography centered directly on top of the photo
          ========================================================================= */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden border-b border-amber-400/30 bg-[#070B14] select-none">
        {/* Horizontal Snap Scroll Carousel */}
        <div
          ref={heroScrollRef}
          onScroll={handleHeroScroll}
          className="flex w-full h-full overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {heroList.map((imgUrl, idx) => (
            <div key={idx} className="w-full h-full shrink-0 snap-center relative">
              <img
                src={imgUrl}
                alt={`Khmer Prewedding ${idx + 1}`}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'} decoding="async" />
              {/* Deep Midnight Gradient Overlay for crystal clear typography contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-[#070B14]/45 to-black/50 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stationary Centered Typography Directly on Photo (Scaled for mobile readability, frameless) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="space-y-2.5 sm:space-y-3 w-full max-w-md mx-auto px-2 sm:px-4">
            {/* Top Celestial Emblem */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-amber-300 text-xs drop-shadow-[0_0_8px_#F59E0B]">✦</span>
              <span className="font-komutt-a text-[11px] sm:text-xs md:text-sm text-amber-200 tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍
              </span>
              <span className="text-amber-300 text-xs drop-shadow-[0_0_8px_#F59E0B]">✦</span>
            </div>

            {/* Groom Name in font-komutt-a */}
            <h1 className="font-komutt-a text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-rose-200">
              {groomName}
            </h1>

            {/* Ampersand Divider */}
            <div className="flex items-center justify-center gap-2.5 my-0.5 sm:my-1">
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-amber-300 to-amber-200 drop-shadow" />
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950/80 border border-amber-300/80 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.7)] backdrop-blur-sm">
                <span className="font-serifTrad italic text-amber-300 text-[10px] sm:text-xs font-bold">~ & ~</span>
              </div>
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-14 bg-gradient-to-l from-transparent via-amber-300 to-amber-200 drop-shadow" />
            </div>

            {/* Bride Name in font-komutt-a */}
            <h1 className="font-komutt-a text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-rose-200">
              {brideName}
            </h1>

            {/* Date & Location Subtitle */}
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-amber-200/95 font-medium tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-komutt-a">
                {weddingDate}
              </p>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-1 drop-shadow font-light">
                {weddingLocation}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrow Controls */}
        <div className="absolute inset-y-0 inset-x-2 z-30 flex items-center justify-between pointer-events-none">
          <button
            onClick={() => scrollToHero(Math.max(0, activeHeroIdx - 1))}
            disabled={activeHeroIdx === 0}
            className="w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 text-amber-200 border border-amber-300/30 flex items-center justify-center backdrop-blur-md transition disabled:opacity-20 pointer-events-auto cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToHero(Math.min(heroList.length - 1, activeHeroIdx + 1))}
            disabled={activeHeroIdx === heroList.length - 1}
            className="w-8 h-8 rounded-full bg-black/45 hover:bg-black/75 text-amber-200 border border-amber-300/30 flex items-center justify-center backdrop-blur-md transition disabled:opacity-20 pointer-events-auto cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Carousel Pagination Dots */}
        <div className="absolute bottom-3 inset-x-0 z-30 flex items-center justify-center gap-1.5 pointer-events-auto">
          {heroList.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToHero(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeHeroIdx === i ? 'w-6 bg-amber-300 shadow-[0_0_8px_#F59E0B]' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <span className="ml-2 text-[10px] text-amber-200/80 font-mono bg-black/50 px-2 py-0.5 rounded-full border border-amber-300/30">
            {activeHeroIdx + 1}/{heroList.length}
          </span>
        </div>
      </section>

      {/* =========================================================================
          2. PARENTS BLESSING SECTION (មាតាបិតាទាំងសងខាង)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-12">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-slate-950/90 border border-amber-400/30 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-44 h-44 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-serifTrad">
              <Sparkles className="w-3.5 h-3.5" />
              <span>សិរីមង្គលមហាកិត្តិយស</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-komutt-a text-2xl sm:text-3xl font-bold text-amber-100">
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
              <p className="font-komutt-a text-sm sm:text-base font-semibold text-slate-100">{groomFather}</p>
              <p className="font-komutt-a text-sm sm:text-base font-semibold text-slate-100">{groomMother}</p>
            </div>

            {/* Bride's Parents */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <span className="text-[11px] text-amber-300/80 font-serifTrad uppercase tracking-wider block mb-1">
                ខាងកូនស្រី
              </span>
              <p className="font-komutt-a text-sm sm:text-base font-semibold text-slate-100">{brideFather}</p>
              <p className="font-komutt-a text-sm sm:text-base font-semibold text-slate-100">{brideMother}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FORMAL INVITATION LETTER (លិខិតគោរពអញ្ជើញផ្លូវការ)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0B1220] to-[#060A12] border border-amber-400/25 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-serifTrad uppercase tracking-widest">
            <Stars className="w-3.5 h-3.5" />
            <span>Cordial Invitation</span>
            <Stars className="w-3.5 h-3.5" />
          </div>

          <h2 className="font-komutt-a text-2xl sm:text-3xl font-bold text-amber-100">
            សេចក្តីគោរពអញ្ជើញ
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-light">
            ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍នៃកូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ ដែលនឹងប្រព្រឹត្តទៅតាមគន្លងប្រពៃណីព្រះពុទ្ធសាសនា និងទំនៀមខ្មែរបុរាណ។ វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក គឺជាកិត្តិយសដ៏ថ្លៃថ្លាបំផុតសម្រាប់គ្រួសារយើងខ្ញុំទាំងពីរ។
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-amber-300 font-komutt-a">
            <span>សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមានដ៏មានតម្លៃ!</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CALENDAR MATRIX + LIVE REAL-TIME COUNTDOWN + ADD TO CALENDAR
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0F172A] via-[#090E1A] to-[#060913] border border-amber-400/30 backdrop-blur-xl shadow-2xl space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs text-amber-300 uppercase tracking-widest font-serifTrad">Event Countdown & Date</span>
            <h2 className="font-komutt-a text-2xl sm:text-3xl font-bold text-amber-100">
              កាលបរិច្ឆេទ & ការរាប់ថយក្រោយ
            </h2>
            <p className="text-xs text-slate-400 font-komutt-a">{weddingDate}</p>
          </div>

          {/* Real-Time Live Countdown Timer */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto text-center">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-400/30">
              <span className="block text-2xl sm:text-3xl font-bold font-serifTrad text-amber-200">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-komutt-a">ថ្ងៃ</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-400/30">
              <span className="block text-2xl sm:text-3xl font-bold font-serifTrad text-amber-200">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-komutt-a">ម៉ោង</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-400/30">
              <span className="block text-2xl sm:text-3xl font-bold font-serifTrad text-amber-200">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-komutt-a">នាទី</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-400/30">
              <span className="block text-2xl sm:text-3xl font-bold font-serifTrad text-amber-400 animate-pulse">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-komutt-a">វិនាទី</span>
            </div>
          </div>

          {/* Monthly Calendar Matrix (December 2026) */}
          <div className="max-w-xs mx-auto p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
            <div className="text-xs font-bold text-amber-200 font-serifTrad mb-3">
              DECEMBER 2026 • ខែធ្នូ
            </div>
            <div className="grid grid-cols-7 gap-1 text-[11px] text-slate-400 mb-2 font-mono">
              <span>អា</span><span>ច</span><span>អ</span><span>ពុ</span><span>ព្រ</span><span>សុ</span><span>ស</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {/* Empty offset for Tuesday Dec 1 */}
              <span /><span />
              <span className="p-1.5 text-slate-500">1</span>
              <span className="p-1.5 text-slate-500">2</span>
              <span className="p-1.5 text-slate-500">3</span>
              <span className="p-1.5 text-slate-500">4</span>
              <span className="p-1.5 text-slate-500">5</span>
              <span className="p-1.5 text-slate-500">6</span>
              <span className="p-1.5 text-slate-500">7</span>
              <span className="p-1.5 text-slate-500">8</span>
              <span className="p-1.5 text-slate-500">9</span>
              <span className="p-1.5 text-slate-500">10</span>
              <span className="p-1.5 text-slate-500">11</span>
              <span className="p-1.5 text-slate-500">12</span>
              <span className="p-1.5 text-slate-500">13</span>
              <span className="p-1.5 text-slate-500">14</span>
              <span className="p-1.5 text-slate-500">15</span>
              <span className="p-1.5 text-slate-500">16</span>
              <span className="p-1.5 text-slate-500">17</span>
              <span className="p-1.5 text-slate-500">18</span>
              {/* Wedding Day: 19 */}
              <span className="p-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold shadow-[0_0_12px_#F59E0B]">
                19
              </span>
              <span className="p-1.5 text-slate-500">20</span>
              <span className="p-1.5 text-slate-500">21</span>
              <span className="p-1.5 text-slate-500">22</span>
              <span className="p-1.5 text-slate-500">23</span>
              <span className="p-1.5 text-slate-500">24</span>
              <span className="p-1.5 text-slate-500">25</span>
              <span className="p-1.5 text-slate-500">26</span>
              <span className="p-1.5 text-slate-500">27</span>
              <span className="p-1.5 text-slate-500">28</span>
              <span className="p-1.5 text-slate-500">29</span>
              <span className="p-1.5 text-slate-500">30</span>
              <span className="p-1.5 text-slate-500">31</span>
            </div>
          </div>

          {/* Add to Calendar Button */}
          <div className="text-center">
            <button
              onClick={downloadCalendarEvent}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 hover:opacity-95 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>កត់ត្រាទុកក្នុងប្រតិទិន (Add to Calendar)</span>
              <Download className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. COMPLETE 7 CEREMONY MILESTONES & 4-PHASE LOVE STORY DECK
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8 space-y-8">
        {/* Full 7 Ceremony Programs */}
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-amber-300 uppercase tracking-widest font-serifTrad">Full Wedding Schedule</span>
            <h2 className="font-komutt-a text-2xl font-bold text-white">កាលវិភាគពិធីការទាំង ៧ កម្មវិធី</h2>
          </div>

          <div className="space-y-3.5">
            {ceremonyPrograms.map((prog) => (
              <div
                key={prog.num}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-start gap-4 hover:border-amber-400/30 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-komutt-a font-bold text-white text-sm sm:text-base">
                      {prog.title}
                    </h4>
                    <span className="text-xs text-amber-300 font-serifTrad font-semibold shrink-0">
                      {prog.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4-Phase Love Story Interactive Deck */}
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0A101D] to-[#060913] border border-amber-400/25 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-amber-300 uppercase tracking-widest font-serifTrad">Love Story Chapters</span>
            <h2 className="font-komutt-a text-2xl font-bold text-white">ដំណើររឿងរ៉ាវនៃសេចក្តីស្រឡាញ់</h2>
            <p className="text-xs text-slate-400">ចុចលើដំណាក់កាលនីមួយៗ ដើម្បីអានដំណើរដើមទង</p>
          </div>

          {/* Milestone Steps Bar */}
          <div className="grid grid-cols-4 gap-2">
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
                <div className="text-[10px] sm:text-[11px] truncate font-komutt-a">
                  {m.title}
                </div>
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <div className="rounded-2xl p-5 bg-slate-950/80 border border-amber-400/30 backdrop-blur-md">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <span className="text-xs font-semibold text-amber-300 font-serifTrad block mb-1">
                  {milestones[activeMilestone].phase} • {milestones[activeMilestone].date}
                </span>
                <h3 className="font-komutt-a text-xl font-bold text-white">
                  {milestones[activeMilestone].title}
                </h3>
              </div>
              <div className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300/30" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              {milestones[activeMilestone].desc}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CERTIFICATE OF GRATITUDE (លិខិតថ្លែងអំណរគុណ)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-500/10 via-slate-950 to-slate-950 border border-amber-400/30 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs font-serifTrad uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Gratitude Certificate</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          </div>

          <h2 className="font-komutt-a text-2xl sm:text-3xl font-bold text-amber-100">
            សេចក្តីថ្លែងអំណរគុណ
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-light">
            យើងខ្ញុំជាគូស្វាមីភរិយាថ្មី រួមជាមួយមាតាបិតាទាំងសងខាង សូមលំឱនកាយវាចាចិត្តថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តម ពេលវេលាដ៏មានតម្លៃ និងពរជ័យសព្ទសាធុការពររបស់ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា ដែលបានផ្តល់កិត្តិយសអញ្ជើញមកចូលរួមជាសាក្សីនៃសេចក្តីស្រឡាញ់របស់យើងខ្ញុំ។
          </p>

          <div className="pt-2 text-xs text-amber-200/90 font-komutt-a">
            «សូមទេវតាថែរក្សា និងប្រទានពរជ័យឱ្យលោកអ្នកជួបតែសេចក្តីសុខ ចម្រើនជានិច្ចនិរន្តរ៍»
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. VENUE LOCATION & GOOGLE MAPS
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-amber-300 uppercase tracking-widest font-serifTrad">Venue & Directions</span>
            <h2 className="font-komutt-a text-2xl font-bold text-white">ទីតាំងប្រារព្ធពិធី</h2>
          </div>

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

      {/* =========================================================================
          8. PREWEDDING PHOTO GALLERY (6 PHOTOS) WITH LIGHTBOX MODAL
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-amber-300 uppercase tracking-widest font-serifTrad">Memories & Portraits</span>
            <h2 className="font-komutt-a text-2xl font-bold text-white">កម្រងរូបភាពអនុស្សាវរីយ៍</h2>
            <p className="text-xs text-slate-400">ចុចលើរូបភាពដើម្បីមើលទំហំធំពេញអេក្រង់</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-md hover:border-amber-400/50 transition duration-300"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2.5">
                  <p className="text-[10px] text-amber-200 line-clamp-2 font-komutt-a">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-lg w-full bg-slate-950 border border-amber-400/40 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:text-amber-300 flex items-center justify-center cursor-pointer border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-[3/4] w-full bg-black">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-contain" decoding="async" />
              </div>
              <div className="p-4 text-center bg-slate-900 border-t border-slate-800">
                <p className="font-komutt-a text-sm text-amber-200 font-semibold">
                  {selectedPhoto.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================================
          9. DIGITAL GIFT & BLESSING REGISTRY (ABA PAY & BAKONG QR)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 text-center space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest font-serifTrad">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>ចំណងដៃមង្គលការឌីជីថល</span>
            </div>
            <h2 className="font-komutt-a text-2xl font-bold text-white">
              អាំងប៉ាវ & ចំណងដៃពរជ័យ
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              សម្រាប់ញាតិមិត្តដែលមិនបានមកចូលរួមផ្ទាល់ អាចផ្ញើចំណងដៃជូនពរតាមរយៈគណនីធនាគារខាងក្រោម
            </p>
          </div>

          <div className="max-w-xs mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div
              onClick={() => setShowQrModal(true)}
              className="w-40 h-40 mx-auto bg-white p-2 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-amber-300/30 cursor-pointer hover:border-amber-400 transition"
            >
              {qrCodeImage ? (
                <img
                  src={qrCodeImage}
                  alt="QR Code"
                  className="w-full h-full object-contain rounded-xl" decoding="async" loading="lazy" />
              ) : (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-800 text-[10px] font-mono text-center p-1 border border-slate-300 rounded-xl">
                  <span className="font-bold text-xs text-blue-900">{bankName}</span>
                  <span className="text-[9px] mt-1 text-slate-600 font-bold">SCAN TO PAY</span>
                  <span className="text-[9px] text-slate-700">{accountNumber}</span>
                  <span className="text-[8px] text-slate-500 font-bold mt-1 truncate max-w-full">{accountName}</span>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-500 block">ចុចដើម្បីពង្រីក QR</span>

            <div className="text-xs text-slate-300 space-y-0.5">
              <p className="font-semibold text-white">{bankName}: {accountNumber}</p>
              <p className="text-[11px] text-slate-400">ឈ្មោះគណនី: {accountName}</p>
            </div>

            <button
              onClick={copyBankInfo}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer"
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

      {/* =========================================================================
          10. INTERACTIVE RSVP FORM
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0F172A] via-[#090D18] to-[#050811] border border-amber-400/30 backdrop-blur-xl shadow-2xl">
          <div className="text-center space-y-1 mb-6">
            <span className="text-xs text-amber-300 uppercase tracking-widest font-serifTrad">RSVP Confirmation</span>
            <h2 className="font-komutt-a text-2xl font-bold text-white">ការបញ្ជាក់វត្តមានចូលរួម</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              សូមមេត្តាឆ្លើយតបមុនថ្ងៃទី ០១ ខែធ្នូ ដើម្បីជួយសម្រួលដល់ការរៀបចំតុទទួលភ្ញៀវ
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="font-komutt-a text-lg font-bold text-emerald-200">
                អរគុណសម្រាប់ការបញ្ជាក់វត្តមាន!
              </h3>
              <p className="text-xs text-emerald-300/80">
                ព័ត៌មានរបស់អ្នកត្រូវបានកត់ត្រាទុកដោយជោគជ័យ។ ជួបគ្នាក្នុងថ្ងៃសិរីសួស្តី!
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt-a">
                  ឈ្មោះពេញរបស់អ្នក *
                </label>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="ឧ. លោក ឈុន វឌ្ឍនៈ និងភរិយា"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt-a">
                  វត្តមានចូលរួម
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRsvpAttending('yes')}
                    className={`py-2.5 rounded-xl text-xs font-bold font-komutt-a transition border cursor-pointer ${
                      rsvpAttending === 'yes'
                        ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                        : 'bg-slate-950/60 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    ✓ ចូលរួមពិតប្រាកដ
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpAttending('no')}
                    className={`py-2.5 rounded-xl text-xs font-bold font-komutt-a transition border cursor-pointer ${
                      rsvpAttending === 'no'
                        ? 'bg-rose-500 text-white border-rose-400 shadow-md'
                        : 'bg-slate-950/60 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    ✗ អធ្យាស្រ័យមិនបានចូលរួម
                  </button>
                </div>
              </div>

              {rsvpAttending === 'yes' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt-a">
                    ចំនួនភ្ញៀវចូលរួម
                  </label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-amber-400 transition"
                  >
                    <option value="1 នាក់">១ នាក់</option>
                    <option value="2 នាក់">២ នាក់</option>
                    <option value="3 នាក់">៣ នាក់</option>
                    <option value="4 នាក់">៤ នាក់</option>
                    <option value="5+ នាក់">៥ នាក់ឡើងទៅ</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt-a">
                  លេខទូរស័ព្ទ (ជាជម្រើស)
                </label>
                <input
                  type="tel"
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  placeholder="012 345 678"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt-a">
                  ចំណាំបន្ថែម / ពាក្យជូនពរ
                </label>
                <textarea
                  value={rsvpNote}
                  onChange={(e) => setRsvpNote(e.target.value)}
                  rows={2}
                  placeholder="សរសេរចំណាំ ឬពាក្យជូនពរនៅទីនេះ..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition shadow-xl shadow-amber-400/25 cursor-pointer"
              >
                ផ្ញើការឆ្លើយតប RSVP
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          11. VIRTUAL STARLIGHT LANTERN RELEASE & DIGITAL WISHES GUESTBOOK
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0F172A] via-[#090D18] to-[#050811] border border-amber-400/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-6">
            <h2 className="font-komutt-a text-2xl sm:text-3xl font-bold text-amber-100">
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
                    <span className="font-komutt-a font-semibold text-amber-200 text-xs">
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

      {/* =========================================================================
          12. HOST CONTACTS (ទំនាក់ទំនងម្ចាស់កម្មវិធី)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/80 border border-slate-800 backdrop-blur-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-amber-300 uppercase tracking-widest font-serifTrad">Contact & Inquiries</span>
            <h2 className="font-komutt-a text-2xl font-bold text-white">ទំនាក់ទំនងម្ចាស់កម្មវិធី</h2>
            <p className="text-xs text-slate-400">សម្រាប់ព័ត៌មានបន្ថែម ឬការសាកសួរទីតាំង</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Groom side contact */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-300 font-serifTrad block">ខាងកូនប្រុស</span>
              <p className="text-xs text-slate-200 font-semibold">{groomName}</p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`tel:${phoneGroom}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{phoneGroom}</span>
                </a>
                {telegramLink && (
                  <a
                    href={telegramLink.startsWith('http') ? telegramLink : `https://${telegramLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 text-xs transition border border-blue-500/30"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            </div>

            {/* Bride side contact */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-300 font-serifTrad block">ខាងកូនស្រី</span>
              <p className="text-xs text-slate-200 font-semibold">{brideName}</p>
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={`tel:${phoneBride}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{phoneBride}</span>
                </a>
                {telegramLink && (
                  <a
                    href={telegramLink.startsWith('http') ? telegramLink : `https://${telegramLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 text-xs transition border border-blue-500/30"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-blue-400" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          13. FOOTER ACKNOWLEDGEMENT & SCROLL TO TOP
          ========================================================================= */}
      <footer className="relative z-20 text-center py-8 text-xs text-slate-500 space-y-4">
        <div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 transition cursor-pointer text-xs"
          >
            <ChevronUp className="w-4 h-4" />
            <span>ត្រឡប់ទៅលើវិញ</span>
          </button>
        </div>

        <p className="font-komutt-a text-amber-200/80">
          សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមាន និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក!
        </p>

        <p className="font-serifTrad text-[11px] tracking-widest text-slate-600 uppercase">
          Theab Digital • Romdoul Starlight Garden
        </p>
      </footer>

      {/* QR Code Zoom Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-slate-950 p-6 rounded-3xl max-w-xs w-full text-center shadow-2xl border border-amber-400/40 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-komutt-a text-sm text-amber-200 mb-1">{bankName}</h4>
            <p className="text-xs text-slate-400 mb-3">{accountName}</p>
            {qrCodeImage ? (
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-full aspect-square object-contain rounded-xl border border-slate-700 bg-white p-2" decoding="async" loading="lazy" />
            ) : (
              <div className="w-full aspect-square bg-slate-900 rounded-xl border border-slate-700 flex flex-col items-center justify-center text-amber-300 p-4">
                <span className="font-bold text-sm mb-1">{bankName}</span>
                <span className="text-xs">{accountNumber}</span>
                <span className="text-[11px] text-slate-400 mt-1">{accountName}</span>
              </div>
            )}
            <p className="text-xs font-serifTrad font-bold text-amber-300 mt-3">
              {accountNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
