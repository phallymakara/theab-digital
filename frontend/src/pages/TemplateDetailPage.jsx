import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { CEREMONY_DATA } from '../data/templates';
import { TRADITIONAL_TEMPLATES } from '../components/templates/traditional';
import { FLORAL_TEMPLATES } from '../components/templates/floral';
import confetti from 'canvas-confetti';
import { FlyingHeartsAndFlowers } from '../components/FlyingHeartsAndFlowers';
import { KhmerFloatingBackground } from '../components/KhmerBackgroundFlowers';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Check,
  Send,
  Heart,
  Share2,
  Copy,
  Phone,
  MessageCircle,
  QrCode,
  Image as ImageIcon,
  Sparkles,
  X,
  Music,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Compact Traditional Khmer Gold Kbach Divider Component
function KhmerDivider({ className = '', color = 'text-amber-600', isAncient = false }) {
  if (isAncient) {
    return (
      <div className={`flex items-center justify-center gap-2 my-2 select-none ${className}`}>
        <div className="h-[1.5px] w-8 sm:w-14 bg-gradient-to-r from-transparent via-[#C5A059] to-[#8C6F19]" />
        <span className="text-[10px] text-[#8C6F19]">✤</span>
        <span className="text-sm sm:text-base font-serif text-[#8C6F19] drop-shadow-xs">❖</span>
        <span className="text-[10px] text-[#8C6F19]">✤</span>
        <div className="h-[1.5px] w-8 sm:w-14 bg-gradient-to-l from-transparent via-[#C5A059] to-[#8C6F19]" />
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center gap-1.5 my-1.5 sm:my-2 select-none ${className}`}>
      <div className={`flex items-center gap-1 ${color}`}>
        <span className="text-[9px] opacity-70">✦</span>
        <span className="text-sm sm:text-base font-serif">❖</span>
        <span className="text-[9px] opacity-70">✦</span>
      </div>
    </div>
  );
}

// Antique Angkorian Carved Corner Brackets for Khmer Historical Cards
function KhmerAncientCornerBrackets({ color = 'border-[#8C6F19]' }) {
  return (
    <>
      <div className={`absolute top-1.5 left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 ${color} pointer-events-none`} />
      <div className={`absolute top-1.5 right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 ${color} pointer-events-none`} />
      <div className={`absolute bottom-1.5 left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 ${color} pointer-events-none`} />
      <div className={`absolute bottom-1.5 right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 ${color} pointer-events-none`} />
    </>
  );
}

// Royal Wedding Golden Floating Motifs (Jasmine Petal, Royal Heart, Sparkle Star, Kbach Floret)
function GoldWeddingMotif({ type, size = 20, id }) {
  if (type === 'petal') {
    return (
      <svg
        viewBox="0 0 24 24"
        style={{ width: size, height: size }}
        className="drop-shadow-[0_2px_6px_rgba(212,175,55,0.45)]"
      >
        <defs>
          <linearGradient id={`gold-p-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8DB" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#9A7B1C" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M12 2 C8 6.5 4.5 11.5 5.5 16.5 A6.5 6.5 0 0 0 18.5 16.5 C19.5 11.5 16 6.5 12 2 Z"
          fill={`url(#gold-p-${id})`}
        />
      </svg>
    );
  }

  if (type === 'heart') {
    return (
      <svg
        viewBox="0 0 24 24"
        style={{ width: size, height: size }}
        className="drop-shadow-[0_2px_6px_rgba(212,175,55,0.45)]"
      >
        <defs>
          <linearGradient id={`gold-h-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill={`url(#gold-h-${id})`}
        />
      </svg>
    );
  }

  if (type === 'sparkle') {
    return (
      <svg
        viewBox="0 0 24 24"
        style={{ width: size, height: size }}
        className="drop-shadow-[0_2px_8px_rgba(245,158,11,0.55)]"
      >
        <defs>
          <linearGradient id={`gold-s-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0.75" />
          </linearGradient>
        </defs>
        <path
          d="M12 1L14.2 9.8L23 12L14.2 14.2L12 23L9.8 14.2L1 12L9.8 9.8L12 1Z"
          fill={`url(#gold-s-${id})`}
        />
      </svg>
    );
  }

  // Cambodian Golden Floral Kbach (default)
  return (
    <svg
      viewBox="0 0 24 24"
      style={{ width: size, height: size }}
      className="drop-shadow-[0_2px_6px_rgba(212,175,55,0.45)]"
    >
      <defs>
        <linearGradient id={`gold-f-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#EAB308" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#854D0E" stopOpacity="0.75" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="2.8" fill="#FFFBEB" />
      <circle cx="12" cy="5.2" r="3" fill={`url(#gold-f-${id})`} />
      <circle cx="12" cy="18.8" r="3" fill={`url(#gold-f-${id})`} />
      <circle cx="5.2" cy="12" r="3" fill={`url(#gold-f-${id})`} />
      <circle cx="18.8" cy="12" r="3" fill={`url(#gold-f-${id})`} />
    </svg>
  );
}

export function TemplateDetailPage() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) || {};
  const templateId = params.templateId || 'royal-gold';

  const {
    isAudioPlaying,
    toggleAudio,
    playAudio,
    restartAndPlayAudio,
    stopAudio,
    pauseAudio,
    addToast,
    setSelectedTemplate,
    setCurrentTheme
  } = useApp();

  // Find matching template or fallback to royal-gold
  const weddingTemplates = CEREMONY_DATA.wedding.templates || [];
  const activeTemplate =
    weddingTemplates.find((t) => t.id === templateId) ||
    weddingTemplates[0];

  // Check if this is the customized template (royal-gold) vs other standalone templates
  const isCustomized = activeTemplate.id === 'royal-gold';
  const isAngkorAncient = activeTemplate.cardStyle === 'angkor-ancient-royalty' || activeTemplate.id === 'angkor-ancient-royalty';
  const TraditionalComponent = TRADITIONAL_TEMPLATES[activeTemplate.id] || FLORAL_TEMPLATES[activeTemplate.id];
  const hasHtml = !!activeTemplate.htmlPreviewUrl;
  const [viewMode, setViewMode] = useState(hasHtml ? 'html' : 'smart');

  // Independent template data: each template preserves its own demo content unless viewing the customized template
  const groomName = activeTemplate.demoGroom || (isAngkorAncient ? 'កែវ វិបុលរាជ' : (isCustomized ? 'ហេង វឌ្ឍនា' : 'សុខ វិបុល'));
  const brideName = activeTemplate.demoBride || (isAngkorAncient ? 'ទេព ធីតាសួគ៌' : (isCustomized ? 'កែវ ចរណៃ' : 'ជា សុជាតា'));
  const weddingDate = activeTemplate.demoDate || (isAngkorAncient ? 'ថ្ងៃអាទិត្យ ទី១៤ ខែកុម្ភៈ ឆ្នាំ២០២៧' : (isCustomized ? '១៨ - ឧសភា - ២០២៦' : 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦'));
  const weddingLocation = activeTemplate.demoLocation || (isAngkorAncient ? 'ពិធីសិរីមង្គលបុរាណប្រារព្ធនៅ សាលប្រាសាទមាស សែនសុខ រាជធានីភ្នំពេញ' : 'ពិធីនេះរៀបចំឡើងនៅសាលមង្គល ឌឹ ព្រេមៀ សែនសុខ (អគារ A) រាជធានីភ្នំពេញ');

  const groomFather = isAngkorAncient
    ? 'លោក កែវ សម្បត្តិវិបុល'
    : isCustomized ? 'លោក ហេង វណ្ណា' : 'លោក ស៊ុន ហេង';
  const groomMother = isAngkorAncient
    ? 'លោកស្រី ជា ចរិយា'
    : isCustomized ? 'អ្នកស្រី គីម ស្រ៊ុន' : 'អ្នកស្រី គីម ស្រ៊ុន';
  const brideFather = isAngkorAncient
    ? 'លោក ទេព វរវង្ស'
    : isCustomized ? 'លោក កែវ សម្បត្តិ' : 'លោក ជា សម្បត្តិ';
  const brideMother = isAngkorAncient
    ? 'អ្នកស្រី ម៉ៅ សុវណ្ណមាលា'
    : isCustomized ? 'អ្នកស្រី សុខ ហៀង' : 'អ្នកស្រី អ៊ុក ផល្លី';

  const templateFont =
    isAngkorAncient || activeTemplate.cardStyle?.startsWith('traditional-')
      ? 'font-moul'
      : activeTemplate.cardStyle === 'floral-editorial-magazine' || activeTemplate.id === 'floral-editorial-magazine'
        ? 'font-phalluch'
        : activeTemplate.cardStyle === 'floral-romdoul-moonlight' || activeTemplate.id === 'floral-romdoul-moonlight'
          ? 'font-suwannaphum'
          : activeTemplate.cardStyle === 'floral-golden-orchid' || activeTemplate.id === 'floral-golden-orchid'
            ? 'font-koulen'
            : activeTemplate.cardStyle === 'floral-glasshouse' || activeTemplate.id === 'floral-botanical-glasshouse'
              ? 'font-preahvihear'
              : activeTemplate.cardStyle === 'floral-khmer-blossom' || activeTemplate.id === 'floral-khmer-blossom'
                ? 'font-moulpali'
                : activeTemplate.cardStyle === 'crimson-classic' || activeTemplate.id === 'crimson-classic'
                  ? 'font-komutt-a'
                  : activeTemplate.cardStyle === 'emerald-jade' || activeTemplate.id === 'emerald-jade'
                    ? 'font-moulpali'
                    : activeTemplate.cardStyle === 'romantic-frosted' || activeTemplate.id === 'floral-romance'
                      ? 'font-kouteok'
                      : activeTemplate.id === 'angkor-heritage'
                        ? 'font-phalluch'
                        : activeTemplate.cardStyle === 'modern-luxury' || activeTemplate.id === 'modern-luxury'
                          ? 'font-komutt'
                          : activeTemplate.id === 'royal-gold'
                            ? 'font-komutt-a'
                            : 'font-moul';

  const groomBrideFont = templateFont;

  // Dynamic Card Container Class depending on whether it is Angkor ancient heritage or modern frosted
  const cardBoxClass = isAngkorAncient
    ? 'bg-[#FAF5EA]/95 backdrop-blur-xl border-2 border-[#C5A059] shadow-[0_12px_36px_rgba(140,111,25,0.18)]'
    : 'bg-white/70 backdrop-blur-xl border border-white/90 shadow-[0_10px_35px_rgba(212,175,55,0.08)]';

  // Modern, beautiful wedding scenery background image (No models/people)
  const templateBackdropImage =
    activeTemplate.bgBackdrop ||
    (activeTemplate.id === 'angkor-heritage'
      ? '/images/templates/angkor_wat_scenery.jpg'
      : '/images/templates/modern_wedding_aisle.jpg');

  // Theme accent colors
  const themeBorder = activeTemplate.borderColor || '#D4AF37';
  const themeTitleColor = activeTemplate.titleColor || '#881337';
  const isEmerald = activeTemplate.themeColor === 'emerald' || activeTemplate.id === 'emerald-jade';

  // Play audio from start on preview entrance; restart from beginning whenever template changes; stop when leaving
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    restartAndPlayAudio();

    return () => {
      stopAudio();
    };
  }, [templateId]);

  // Sync selected template in context
  useEffect(() => {
    if (activeTemplate) {
      setSelectedTemplate(activeTemplate);
      setCurrentTheme(activeTemplate.themeColor || 'crimson');
    }
  }, [activeTemplate]);

  // Real-time Event Countdown (Target: May 18, 2026 or ~790 days)
  const [countdown, setCountdown] = useState({
    days: 790,
    hours: 19,
    minutes: 2,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lightbox Modal Image Preview
  const [activePhoto, setActivePhoto] = useState(null);

  // Hero Multiple Prewedding Images with Horizontal Scroll (Belongs to each template's specific model couple)
  const [heroImages, setHeroImages] = useState(
    activeTemplate?.heroImages || ['/images/templates/royal-gold/gold_1.jpg']
  );
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroScrollRef = useRef(null);

  // Sync hero images whenever active template changes
  useEffect(() => {
    if (activeTemplate?.heroImages) {
      setHeroImages(activeTemplate.heroImages);
      setCurrentHeroIndex(0);
      if (heroScrollRef.current) {
        heroScrollRef.current.scrollTo({ left: 0, behavior: 'instant' });
      }
    }
  }, [activeTemplate]);

  const handleHeroScroll = () => {
    if (heroScrollRef.current) {
      const { scrollLeft, clientWidth } = heroScrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        if (index !== currentHeroIndex && index >= 0 && index < heroImages.length) {
          setCurrentHeroIndex(index);
        }
      }
    }
  };

  const scrollToHero = (index) => {
    if (heroScrollRef.current) {
      const clientWidth = heroScrollRef.current.clientWidth;
      heroScrollRef.current.scrollTo({
        left: index * clientWidth,
        behavior: 'smooth'
      });
      setCurrentHeroIndex(index);
    }
  };

  const scrollToDetails = () => {
    const detailsEl = document.getElementById('template-details-section');
    if (detailsEl) {
      detailsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    const container = document.getElementById('template-components-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Royal Wedding Golden Floating Petals & Sparkles (Continuous & randomized)
  const [particles, setParticles] = useState([]);

  const generateGoldParticles = () => {
    const MOTIF_TYPES = ['petal', 'heart', 'sparkle', 'kbach', 'petal', 'sparkle'];
    const count = 22;
    const items = Array.from({ length: count }).map((_, i) => {
      const type = MOTIF_TYPES[i % MOTIF_TYPES.length];
      // Random duration from 8.5s to 18.0s
      const duration = (8.5 + (i * 0.45) + (Math.random() * 3.5));
      // Staggered negative delays spread evenly across full cycle
      // Ensures petals are already mid-flight at random heights on load, never all at once
      const delay = -((i / count) * 16 + (Math.random() * 2.5));
      const left = Math.min(92, Math.max(6, (i / count) * 86 + 6 + (Math.random() - 0.5) * 8));
      const size = type === 'sparkle' ? 14 + Math.floor(Math.random() * 8) : 18 + Math.floor(Math.random() * 10);
      const drift = `${(Math.random() - 0.5) * 75}px`;

      return {
        id: `gp-${i}-${Date.now()}`,
        type,
        left: `${left.toFixed(1)}%`,
        duration: `${duration.toFixed(2)}s`,
        delay: `${delay.toFixed(2)}s`,
        size,
        drift,
      };
    });
    setParticles(items);
  };

  useEffect(() => {
    generateGoldParticles();
  }, []);

  // Gallery Photos (Belongs to each template's specific model couple)
  const galleryPhotos = activeTemplate?.galleryPhotos || [
    {
      id: 1,
      src: activeTemplate?.bgImage || '/images/templates/royal-gold/gold_1.jpg',
      caption: 'ស្នេហ៍ផ្អែមល្ហែមរវាងគូស្នេហ៍'
    }
  ];

  // RSVP State
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    status: 'attending', // attending | not_attending
    guestCount: '1 នាក់'
  });

  const [rsvpList, setRsvpList] = useState([]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) {
      addToast('សូមបញ្ចូលឈ្មោះរបស់អ្នក', 'warning');
      return;
    }

    const newRsvp = {
      id: Date.now(),
      name: rsvpForm.name,
      status: rsvpForm.status,
      guestCount: rsvpForm.guestCount,
      time: 'ទើបតែឆ្លើយតប'
    };

    setRsvpList([newRsvp, ...rsvpList]);
    setRsvpForm({ name: '', status: 'attending', guestCount: '1 នាក់' });

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#881337', '#BE123C', '#F59E0B']
      });
    } catch (err) { }

    addToast('សូមអរគុណ! ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ', 'success');
  };

  // Best Wishes State
  const [wishForm, setWishForm] = useState({
    name: '',
    message: ''
  });

  const [wishesList, setWishesList] = useState([]);

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      addToast('សូមបញ្ចូលឈ្មោះ និងសារជូនពររបស់អ្នក', 'warning');
      return;
    }

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} | ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    const newWish = {
      id: Date.now(),
      name: wishForm.name,
      message: wishForm.message,
      date: formattedDate
    };

    setWishesList([newWish, ...wishesList]);
    setWishForm({ name: '', message: '' });

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#881337', '#E11D48', '#FDE047']
      });
    } catch (err) { }

    addToast('សារជូនពររបស់អ្នកត្រូវបានបង្ហោះដោយជោគជ័យ!', 'success');
  };

  // Add to Calendar helper
  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`ពិធីមង្គលការ ${groomName} & ${brideName}`);
    const details = encodeURIComponent(`សិរីមង្គលអាពាហ៍ពិពាហ៍ ${weddingLocation}`);
    const location = encodeURIComponent('មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A), រាជធានីភ្នំពេញ');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260518T013000Z/20260518T150000Z`;
    window.open(googleCalUrl, '_blank');
    addToast('បានបើក Google Calendar', 'info');
  };

  // Copy share link helper
  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      addToast('បានចម្លងតំណភ្ជាប់ធៀបដោយជោគជ័យ!', 'success');
    }).catch(() => {
      addToast('មិនអាចចម្លងតំណភ្ជាប់បានទេ', 'warning');
    });
  };

  // Copy Account Number
  const handleCopyAccount = (accNo) => {
    navigator.clipboard.writeText(accNo).then(() => {
      addToast(`បានចម្លងលេខគណនី ${accNo} រួចរាល់!`, 'success');
    });
  };

  return (
    <div className="w-full h-screen h-[100dvh] bg-preview-romantic text-stone-800 relative selection:bg-rose-900 selection:text-white flex flex-col p-0 sm:px-4 md:px-6 overflow-hidden">

      {/* Modern Khmer Flowers & Royal Hearts Background with Smooth Floating Animations (Outside the Modal/Card) */}
      <KhmerFloatingBackground count={26} />

      {/* Decorative Subtle Ambient Stage Lighting */}
      <div className="fixed -top-16 -left-16 w-80 h-80 rounded-full blur-3xl pointer-events-none select-none z-0 bg-rose-300/25" />
      <div className="fixed -bottom-16 -right-16 w-80 h-80 rounded-full blur-3xl pointer-events-none select-none z-0 bg-amber-300/20" />

      {/* Floating Audio Play/Pause Button */}
      <div className="fixed bottom-4 right-4 sm:right-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={toggleAudio}
          className="group flex items-center gap-2 px-3 py-2 rounded-full border-2 transition-all duration-300 cursor-pointer active:scale-95 shadow-sm bg-white/95 hover:bg-stone-50 text-stone-800"
          style={{ borderColor: themeBorder }}
          title={isAudioPlaying ? 'ចុចដើម្បីបិទភ្លេង' : 'ចុចដើម្បីចាក់ភ្លេងមង្គល'}
        >
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${isAudioPlaying
            ? 'bg-gradient-to-tr from-amber-600 to-amber-500 animate-[spin_4s_linear_infinite]'
            : 'bg-stone-500'
            }`}>
            <Music className="w-3.5 h-3.5 text-white" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <span className="block text-[11px] font-bold leading-tight text-stone-800">
              {isAudioPlaying ? 'កំពុងចាក់ «ភ្ជាប់និស្ស័យ»' : 'បទ៖ ភ្ជាប់និស្ស័យ (NISAI)'}
            </span>
            <span className="block text-[10px] text-amber-600 font-medium">
              {isAudioPlaying ? 'ចុចដើម្បីបិទ' : 'ចុចដើម្បីចាក់'}
            </span>
          </div>
        </button>
      </div>

      {/* =========================================================================
          THE UNIFIED WEDDING INVITATION CONTAINER (SAME EXACT SHELL AS ROYAL-GOLD)
          ========================================================================= */}
      <main
        className={`w-full max-w-xl sm:max-w-2xl mx-auto ${isAngkorAncient ? 'border-x-[3px] shadow-[0_0_35px_rgba(197,160,89,0.35)] ring-1 ring-[#8C6F19]/40' : 'sm:border-x-2 border-stone-800/30'} border-y-0 overflow-hidden relative z-10 animate-fade shadow-2xl flex-1 h-full min-h-0 bg-stone-900 flex flex-col`}
        style={{ borderColor: themeBorder }}
      >
        {/* Top Floating Control Bar - Inside at Top of Container (Transparent background behind buttons) */}
        <header className="absolute top-3 inset-x-3 sm:inset-x-4 flex items-center justify-between gap-2 z-50 pointer-events-none">
          {/* Back button */}
          <div className="pointer-events-auto">
            <button
              onClick={() => navigate({ to: '/wedding' })}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/25 shadow-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 text-amber-300 shrink-0" />
              <span>ថយក្រោយ</span>
            </button>
          </div>

          {/* Center / Right controls: HTML toggle, ✨, Share */}
          <div className="flex items-center gap-2 pointer-events-auto">
            {hasHtml && (
              <div className="flex items-center bg-black/50 backdrop-blur-md p-0.5 rounded-full border border-white/25 shadow-lg">
                <button
                  onClick={() => setViewMode('html')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    viewMode === 'html'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  ទម្រង់ដើម HTML
                </button>
                <button
                  onClick={() => setViewMode('smart')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                    viewMode === 'smart'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  ទម្រង់កម្មវិធី
                </button>
                <a
                  href={activeTemplate.htmlPreviewUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded-full text-stone-300 hover:text-amber-300"
                  title="បើកមើលផ្ទាំងថ្មីពេញលេញ"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* ✨ (Re-trigger Flying Golden Wedding Petals) */}
            <button
              onClick={generateGoldParticles}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 hover:bg-black/70 text-amber-300 backdrop-blur-md border border-white/25 shadow-lg text-sm font-bold transition-all active:scale-95 cursor-pointer"
              title="ចុចដើម្បីបង្ហោះផ្កាមាសឡើងវិញ"
            >
              <span>✨</span>
            </button>

            {/* Share button */}
            <button
              onClick={handleShareLink}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-md border border-white/25 shadow-lg text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <Share2 className="w-4 h-4 text-amber-300 shrink-0" />
              <span className="hidden xs:inline">ចែករំលែកធៀប</span>
              <span className="xs:hidden">ចែករំលែក</span>
            </button>
          </div>
        </header>

        {hasHtml && viewMode === 'html' ? (
          <iframe
            src={activeTemplate.htmlPreviewUrl}
            title={activeTemplate.name}
            className="w-full h-full border-0 relative z-20 bg-stone-950"
          />
        ) : TraditionalComponent ? (
          /* UNIFIED SCROLLABLE INVITATION CONTAINER FOR STANDALONE TEMPLATES (Exact same container as royal-gold) */
          <div
            id="template-components-scroll-container"
            className="relative z-10 flex-1 w-full h-full min-h-0 overflow-y-auto overscroll-contain scroll-smooth luxury-scrollbar scrollbar-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <TraditionalComponent
              data={{
                groomName,
                brideName,
                groomParents: `${groomFather} និង ${groomMother}`,
                brideParents: `${brideFather} និង ${brideMother}`,
                ceremonyDate: weddingDate,
                ceremonyLocation: weddingLocation,
                preweddingPhoto: activeTemplate.bgImage,
                heroImages: activeTemplate.heroImages
              }}
              activeTemplate={activeTemplate}
            />
          </div>
        ) : (
          <>
              {/* 1. Real Proper Scenery Background Image (Pinned behind entire invitation to fit with bottom) */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none scale-105"
                style={{
                  backgroundImage: `url(${templateBackdropImage})`
                }}
              />

              {/* 2. Modern Translucent Luxury Glass Veil - Highlights the scenery while ensuring crystal-clear frosted glass contrast */}
              <div className="absolute inset-0 bg-white/60 backdrop-blur-[1.5px] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-b from-stone-900/10 via-transparent to-amber-950/15 pointer-events-none" />

              {/* 3. Ambient Lighting Glow Blooms for Glassmorphism Depth & Refraction */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-b from-amber-200/35 via-amber-100/15 to-transparent rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/4 -left-28 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-1/2 -right-28 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute top-3/4 left-1/4 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

              {/* 4. Flying Royal Wedding Gold Petals & Sparkles (Continuous random drift inside container) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
                {particles.map((p) => (
                  <div
                    key={p.id}
                    className="absolute animate-gold-wedding-petal select-none pointer-events-none"
                    style={{
                      left: p.left,
                      top: '-50px',
                      animationDuration: p.duration,
                      animationDelay: p.delay,
                      '--drift': p.drift
                    }}
                  >
                    <GoldWeddingMotif type={p.type} size={p.size} id={p.id} />
                  </div>
                ))}
              </div>

              {/* 5. Subtle Top & Bottom Gradient Fades for Smooth Scroll Edges */}
              <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-black/25 to-transparent pointer-events-none z-20" />
              <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-stone-900/40 to-transparent pointer-events-none z-20" />

              {/* 6. UNIFIED SCROLLABLE INVITATION CONTAINER (HERO COVER + ALL 10 WEDDING COMPONENTS) */}
              <div
                id="template-components-scroll-container"
                className="relative z-10 flex-1 w-full h-full min-h-0 overflow-y-auto overscroll-contain scroll-smooth luxury-scrollbar scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* 1. HERO COVER & COUPLE TITLE (Fits width of container edge-to-edge) */}
                <section
                  className="relative w-full aspect-[896/1200] shrink-0 overflow-hidden select-none group flex flex-col justify-between"
                >
                  {/* Horizontal Snap Scroll Gallery */}
                  <div
                    ref={heroScrollRef}
                    onScroll={handleHeroScroll}
                    className="absolute inset-0 w-full h-full flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth touch-auto"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {heroImages.map((imgSrc, idx) => (
                      <div
                        key={idx}
                        className="relative w-full min-w-full h-full shrink-0 snap-start snap-always"
                      >
                        {/* Background Prewedding Photo (Fitted to Container Width) */}
                        <div
                          className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700"
                          style={{
                            backgroundImage: `url(${imgSrc})`,
                            backgroundSize: '100% 100%'
                          }}
                        />
                        {/* Cinematic Balanced Vignette to Highlight Centered Text */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/65" />
                      </div>
                    ))}
                  </div>

                  {/* Flying Hearts & Flying Flowers Animation Layer */}
                  <div className="pointer-events-none">
                    <FlyingHeartsAndFlowers count={8} />
                  </div>

                  {/* Inner Golden Filigree Border Frame */}
                  <div className="absolute inset-2.5 sm:inset-4 rounded-[18px] sm:rounded-[24px] border pointer-events-none z-10" style={{ borderColor: `${themeBorder}80` }}>
                    <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2" style={{ borderColor: themeBorder }}></div>
                    <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2" style={{ borderColor: themeBorder }}></div>
                    <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2" style={{ borderColor: themeBorder }}></div>
                    <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2" style={{ borderColor: themeBorder }}></div>
                  </div>

                  {/* GROUPED WEDDING TEXT (Centered in the Middle of Image, click-through for smooth touch swipe) */}
                  {isAngkorAncient ? (
                    <div className="relative z-10 pointer-events-none w-full h-full flex flex-col justify-center items-center p-3 sm:p-6 text-center">
                      <div className="space-y-2.5 sm:space-y-3.5 max-w-lg mx-auto w-full my-auto px-2">
                        {/* Title: Styled Container ONLY for សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍ */}
                        <div>
                          <div className="inline-flex items-center justify-center gap-2 px-5 py-2 sm:px-7 sm:py-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-400/80 shadow-[0_4px_25px_rgba(0,0,0,0.75)] relative">
                            {/* 4 Antique Gold Corner Accents on Title Badge */}
                            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
                            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
                            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
                            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300 pointer-events-none" />

                            <span className="text-amber-300 text-xs">✤</span>
                            <h1 className="font-moul text-base sm:text-lg md:text-xl text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍
                            </h1>
                            <span className="text-amber-300 text-xs">✤</span>
                          </div>
                        </div>

                        {/* Groom Section - Floating directly on photo with solid royal gold color (no transparency) */}
                        <div>
                          <div className="font-moul text-xl sm:text-2xl md:text-[26px] text-amber-200 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">
                            {groomName}
                          </div>
                        </div>

                        {/* Central Sacred Lotus & Ampersand */}
                        <div className="flex items-center justify-center gap-3 my-1">
                          <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow" />
                          <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-950/80 border border-amber-300/80 shadow-[0_0_10px_rgba(245,158,11,0.8)]">
                            <span className="font-serif italic text-xs font-bold text-amber-300">&</span>
                          </div>
                          <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow" />
                        </div>

                        {/* Bride Section - Floating directly on photo with solid royal gold color (no transparency) */}
                        <div>
                          <div className="font-moul text-xl sm:text-2xl md:text-[26px] text-amber-200 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">
                            {brideName}
                          </div>
                        </div>

                        {/* Date & Location with smooth Moul & Suwannaphum font, solid gold color (no transparency) */}
                        <div className="pt-2 sm:pt-2.5 space-y-1">
                          <div className="inline-flex items-center justify-center gap-2 my-0.5">
                            <span className="text-amber-400 text-xs select-none">✦</span>
                            <p className="font-moul text-sm sm:text-base md:text-lg text-amber-200 tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                              {weddingDate}
                            </p>
                            <span className="text-amber-400 text-xs select-none">✦</span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-amber-100/90 font-suwannaphum leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.95)] max-w-sm mx-auto">
                            {weddingLocation}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 pointer-events-none w-full h-full flex flex-col justify-center items-center p-4 sm:p-8 text-center">
                      <div className="space-y-2.5 sm:space-y-3.5 max-w-lg mx-auto w-full my-auto px-2">
                        {/* Title: សិរីមង្គលអាពាហ៍ពិពាហ៍ */}
                        <div>
                          <h1 className={`${templateFont} text-xl sm:text-2xl md:text-3xl text-amber-200 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]`}>
                            {activeTemplate.id === 'emerald-jade' ? 'សិរីសួស្តីអាពាហ៍ពិពាហ៍' : 'សិរីមង្គលអាពាហ៍ពិពាហ៍'}
                          </h1>
                        </div>

                        {/* Center Couple Names: Styled in each template's unique font (scaled smaller a bit) */}
                        <div className="py-0.5">
                          <div className={`${groomBrideFont} text-xl sm:text-2xl md:text-3xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]`}>
                            {groomName}
                          </div>
                          <div className="flex items-center justify-center gap-2 my-0.5">
                            <span className="font-serif italic text-base sm:text-lg text-amber-300 font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">&</span>
                          </div>
                          <div className={`${groomBrideFont} text-xl sm:text-2xl md:text-3xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]`}>
                            {brideName}
                          </div>
                        </div>

                        {/* Date & Venue Badge - Enlarged Text Sizes */}
                        <div className="pt-2.5 sm:pt-3.5 space-y-1">
                          <p className="text-sm sm:text-base text-amber-200 font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                            ប្រព្រឹត្តទៅនៅ
                          </p>
                          <p className={`${templateFont} text-xl sm:text-2xl md:text-3xl text-white tracking-wide my-1 drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)]`}>
                            {weddingDate}
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-amber-100 font-suwannaphum leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)] max-w-md mx-auto">
                            {weddingLocation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Left / Right Interactive Navigation Controls */}
                  {heroImages.length > 1 && (
                    <>
                      <button
                        onClick={() => scrollToHero(Math.max(0, currentHeroIndex - 1))}
                        disabled={currentHeroIndex === 0}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/70 text-white/90 disabled:opacity-0 flex items-center justify-center backdrop-blur-xs border border-white/20 transition-all cursor-pointer active:scale-90 shadow-md"
                        aria-label="Previous photo"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => scrollToHero(Math.min(heroImages.length - 1, currentHeroIndex + 1))}
                        disabled={currentHeroIndex === heroImages.length - 1}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/45 hover:bg-black/70 text-white/90 disabled:opacity-0 flex items-center justify-center backdrop-blur-xs border border-white/20 transition-all cursor-pointer active:scale-90 shadow-md"
                        aria-label="Next photo"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </>
                  )}

                  {/* Bottom Dot Indicators, Swipe Hint & Scroll Down Button */}
                  <div className="absolute bottom-3 left-0 right-0 z-20 flex flex-col items-center gap-1 pointer-events-auto">
                    {/* Dots */}
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/10">
                      {heroImages.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => scrollToHero(dotIdx)}
                          className={`h-2 rounded-full transition-all cursor-pointer ${dotIdx === currentHeroIndex
                            ? 'w-6 bg-gradient-to-r from-amber-300 to-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                            : 'w-2 bg-white/40 hover:bg-white/70'
                            }`}
                          aria-label={`Go to photo ${dotIdx + 1}`}
                        />
                      ))}
                    </div>
                    {/* Subtle swipe hint */}
                    <span className="text-[9.5px] text-amber-200/80 font-medium tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] select-none">
                      អូសឆ្វេង / ស្ដាំ ដើម្បីមើលរូបភាពបន្ថែម ({currentHeroIndex + 1}/{heroImages.length})
                    </span>
                    {/* Scroll Down to Wedding Details Button */}
                    <button
                      onClick={scrollToDetails}
                      className="mt-0.5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/45 hover:bg-black/65 active:scale-95 backdrop-blur-md text-amber-200 text-[10.5px] font-semibold border border-amber-300/30 transition-all cursor-pointer shadow-md group"
                    >
                      <span>អូសចុះក្រោមដើម្បីមើលលម្អិត</span>
                      <span className="animate-bounce group-hover:translate-y-0.5 transition-transform text-amber-300 font-bold">↓</span>
                    </button>
                  </div>
                </section>

                {/* ALL WEDDING COMPONENTS (Glassmorphism cards floating over fixed scenery background) */}
                <div id="template-details-section" className="pt-3 pb-24 sm:pb-28 px-1 sm:px-2 space-y-3.5">
                  {/* 2. PARENTS BLESSING SECTION (ឪពុកម្ដាយទាំងសងខាង) */}
                  <section className="px-3.5 py-4 sm:px-5 sm:py-5 relative z-10 text-center">
                    <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                      ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
                    </h3>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    {/* Unified Luxury Khmer Wedding Blessing Card */}
                    <div
                      className={`max-w-xl mx-auto rounded-2xl p-4 sm:p-5 relative ${cardBoxClass}`}
                    >
                      {/* Gold / Antique Angkorian Filigree Corner Accents */}
                      {isAngkorAncient ? (
                        <KhmerAncientCornerBrackets color="border-[#C5A059]" />
                      ) : (
                        <>
                          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 pointer-events-none" style={{ borderColor: themeBorder }}></div>
                          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 pointer-events-none" style={{ borderColor: themeBorder }}></div>
                          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 pointer-events-none" style={{ borderColor: themeBorder }}></div>
                          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 pointer-events-none" style={{ borderColor: themeBorder }}></div>
                        </>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 relative py-0.5">
                        {/* Groom's Parents */}
                        <div className="space-y-1 text-center">
                          <div className="inline-flex items-center justify-center gap-1.5 pb-0.5 mb-0.5">
                            <span className="text-[10px] text-amber-500">✦</span>
                            <h4 className={`${templateFont} text-xs sm:text-[13px] tracking-wide`} style={{ color: themeTitleColor }}>
                              ឪពុកម្ដាយខាងកូនកំលោះ
                            </h4>
                            <span className="text-[10px] text-amber-500">✦</span>
                          </div>
                          <div className="space-y-0.5">
                            <p className={`${templateFont} text-stone-800 text-xs sm:text-sm font-bold leading-snug`}>
                              {groomFather}
                            </p>
                            <p className={`${templateFont} text-stone-800 text-xs sm:text-sm font-bold leading-snug`}>
                              {groomMother}
                            </p>
                          </div>
                        </div>

                        {/* Center Divider Ornament (Vertical on sm+, horizontal on mobile) */}
                        <div className="hidden sm:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center justify-center pointer-events-none">
                          <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-amber-300/70 to-transparent"></div>
                          <span className="text-xs text-amber-600/80 my-1 select-none">❖</span>
                          <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-amber-300/70 to-transparent"></div>
                        </div>
                        <div className="sm:hidden flex items-center justify-center gap-2 my-0.5">
                          <span className="text-[9px] text-amber-600/80 select-none">❖</span>
                        </div>

                        {/* Bride's Parents */}
                        <div className="space-y-1 text-center">
                          <div className="inline-flex items-center justify-center gap-1.5 pb-0.5 mb-0.5">
                            <span className="text-[10px] text-amber-500">✦</span>
                            <h4 className={`${templateFont} text-xs sm:text-[13px] tracking-wide`} style={{ color: themeTitleColor }}>
                              ឪពុកម្ដាយខាងកូនក្រមុំ
                            </h4>
                            <span className="text-[10px] text-amber-500">✦</span>
                          </div>
                          <div className="space-y-0.5">
                            <p className={`${templateFont} text-stone-800 text-xs sm:text-sm font-bold leading-snug`}>
                              {brideFather}
                            </p>
                            <p className={`${templateFont} text-stone-800 text-xs sm:text-sm font-bold leading-snug`}>
                              {brideMother}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* 3. EVENT CALENDAR & COUNTDOWN HUB (ប្រតិទិន & រាប់ថយក្រោយ) */}
                  <section className="px-3.5 py-4 sm:px-5 sm:py-5 relative z-10 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <Calendar className="w-4 h-4" style={{ color: themeTitleColor }} />
                      <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                        ប្រតិទិន
                      </h3>
                    </div>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    {/* Calendar Box */}
                    <div className={`max-w-md mx-auto rounded-2xl p-3.5 sm:p-4 mb-4 relative ${cardBoxClass}`}>
                      {isAngkorAncient && <KhmerAncientCornerBrackets color="border-[#C5A059]" />}
                      <div className="text-center font-bold text-stone-800 text-xs sm:text-sm mb-2.5">
                        December 2028
                      </div>

                      {/* Days Header S M T W T F S */}
                      <div className="grid grid-cols-7 gap-1 text-[11px] font-bold text-stone-500 pb-1.5 mb-1.5">
                        <span className="text-rose-600">S</span>
                        <span>M</span>
                        <span>T</span>
                        <span>W</span>
                        <span>T</span>
                        <span>F</span>
                        <span className="text-rose-600">S</span>
                      </div>

                      {/* Days Grid 1..31 */}
                      <div className="grid grid-cols-7 gap-1 text-xs font-medium">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span className="p-1.5 rounded-lg hover:bg-white/80 transition">1</span>
                        <span className="p-1.5 rounded-lg text-rose-600 hover:bg-white/80 transition">2</span>

                        {[...Array(29)].map((_, idx) => {
                          const dayNum = idx + 3;
                          const isWeddingDay = dayNum === 18;
                          return (
                            <div
                              key={dayNum}
                              className={`p-1.5 rounded-lg flex items-center justify-center relative transition-all ${isWeddingDay
                                ? 'text-white font-bold ring-2 ring-amber-300 shadow-md scale-105'
                                : 'hover:bg-white/90 text-stone-700'
                                }`}
                              style={isWeddingDay ? { backgroundColor: themeTitleColor } : {}}
                            >
                              <span>{dayNum}</span>
                              {isWeddingDay && (
                                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Wedding Countdown Hub */}
                    <div className="max-w-md mx-auto pt-1 text-center">
                      <div className="flex items-center justify-center gap-1.5 mb-2.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                        <h4 className={`${templateFont} text-xs sm:text-[13px] tracking-wide`} style={{ color: themeTitleColor }}>
                          រាប់ថយក្រោយ
                        </h4>
                      </div>

                      {/* 4 Counters */}
                      <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-xs mx-auto mb-3.5">
                        {[
                          { val: countdown.days, label: 'ថ្ងៃ' },
                          { val: String(countdown.hours).padStart(2, '0'), label: 'ម៉ោង' },
                          { val: String(countdown.minutes).padStart(2, '0'), label: 'នាទី' },
                          { val: String(countdown.seconds).padStart(2, '0'), label: 'វិនាទី' }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={`rounded-2xl p-2 sm:p-2.5 ${isAngkorAncient ? 'bg-[#FDFBF7] border border-[#C5A059]/70' : 'bg-white/75 backdrop-blur-lg border border-white/95'} shadow-[0_4px_20px_rgba(212,175,55,0.12)] text-center transition-all hover:scale-105 hover:bg-white/90 hover:border-amber-200/60`}
                          >
                            <span
                              className={`${templateFont} text-base sm:text-lg block leading-tight drop-shadow-xs`}
                              style={{ color: themeTitleColor }}
                            >
                              {item.val}
                            </span>
                            <span className="text-[10px] sm:text-[10.5px] font-bold text-stone-600 mt-0.5 block">
                              {item.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={handleAddToCalendar}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md hover:shadow-lg"
                        style={{ backgroundColor: themeTitleColor }}
                      >
                        <Calendar className="w-3.5 h-3.5 text-amber-300" />
                        <span>Add to Calendar (បញ្ចូលក្នុងប្រតិទិន)</span>
                      </button>
                    </div>
                  </section>

                  {/* 4. WEDDING PROGRAM (កម្មពិធីសិរីសួស្ដី) */}
                  <section className="px-3.5 py-4 sm:px-5 sm:py-5 relative z-10">
                    <div className="text-center">
                      <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                        កម្មពិធីសិរីសួស្ដី
                      </h3>
                    </div>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    {/* Modern Luxury Wedding Program Timeline */}
                    <div className="max-w-md mx-auto relative px-1 sm:px-2">
                      {/* Subtle Vertical Timeline Track */}
                      <div
                        className="absolute left-[26px] sm:left-[30px] top-4 bottom-4 w-[2px] opacity-40 rounded-full"
                        style={{ backgroundColor: themeBorder }}
                      />

                      <div className="space-y-2.5 relative">
                        {[
                          { num: '1', time: '០៦:៣០ ព្រឹក', event: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
                          { num: '2', time: '០៧:០០ ព្រឹក', event: 'ពិធីហែចំនូនចូលរោងជ័យ' },
                          { num: '3', time: '០៨:០០ ព្រឹក', event: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍' },
                          { num: '4', time: '០៨:៣០ ព្រឹក', event: 'ពិធីកាត់សក់បង្កក់សិរី' },
                          { num: '5', time: '១០:០០ ព្រឹក', event: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
                          { num: '6', time: '១២:០០ ថ្ងៃត្រង់', event: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់' },
                          { num: '7', time: '០៥:០០ ល្ងាច', event: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស' }
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 sm:gap-3.5 ${isAngkorAncient ? 'bg-[#FAF5EA]/95 border border-[#C5A059]/70 hover:border-[#C5A059]' : 'bg-white/75 hover:bg-white/90 border border-white/90 hover:border-amber-200/80'} backdrop-blur-lg rounded-2xl p-2.5 sm:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-md transition-all relative group`}
                          >
                            {/* Step Numeral Badge */}
                            <div
                              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 ${templateFont} font-bold text-xs sm:text-sm text-white shadow-xs border transition-transform group-hover:scale-105`}
                              style={{ backgroundColor: themeTitleColor, borderColor: themeBorder }}
                            >
                              {item.num}
                            </div>

                            {/* Program Title & Time */}
                            <div className="flex-1 min-w-0 text-left">
                              <p className="text-stone-800 text-xs sm:text-[13px] font-semibold leading-snug">
                                {item.event}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <Clock className="w-3 h-3 text-amber-600/80 shrink-0" />
                              <span className="text-[11px] sm:text-[11.5px] font-bold text-amber-800 font-mono">
                                {item.time}
                              </span>
                            </div>

                            {/* Subtle Gold Filigree Star Accent */}
                            <div className="text-amber-400/60 text-[10px] pr-1 select-none">
                              ✦
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* 5. THANK YOU & SORRY (អរគុណ & អធ្យាស្រ័យ) */}
                  <section className="px-3.5 py-4 sm:px-5 sm:py-5 relative z-10 text-center">
                    <div className="w-9 h-9 rounded-full mx-auto bg-white/80 backdrop-blur-md flex items-center justify-center mb-1.5 border border-rose-200/80 shadow-xs">
                      <Heart className="w-4 h-4 fill-theabCrimson text-theabCrimson" />
                    </div>
                    <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                      អរគុណ & អធ្យាស្រ័យ
                    </h3>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    <div className={`max-w-xl mx-auto p-4 sm:p-5 rounded-2xl relative ${cardBoxClass}`}>
                      {isAngkorAncient && <KhmerAncientCornerBrackets color="border-[#C5A059]" />}
                      <span className="font-serif text-3xl text-amber-500 absolute top-1 left-3 select-none opacity-40">“</span>
                      <p className="text-stone-700 text-xs sm:text-[12.5px] leading-relaxed font-suwannaphum italic px-2 pt-1">
                        "យើងខ្ញុំ សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមាន ភ្ញៀវកិត្តិយសទាំងអស់ ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីនេះ។ ប្រសិនបើមានការខ្វះខាត ឬទទួលភ្ញៀវមិនបានដិតដល់ត្រង់ចំណុចណាមួយ សូមមេត្តាខន្តី និងអធ្យាស្រ័យដោយក្តីអនុគ្រោះ។"
                      </p>
                      <span className="font-serif text-3xl text-amber-500 absolute bottom-1 right-3 select-none opacity-40">”</span>
                    </div>
                  </section>

                  {/* 6. VENUE & GOOGLE MAPS (ទីតាំងពិធី) */}
                  <section className="px-1.5 sm:px-3 py-4 sm:py-5 relative z-10 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <MapPin className="w-4 h-4" style={{ color: themeTitleColor }} />
                      <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                        ទីតាំងពិធី
                      </h3>
                    </div>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    {/* Container wrapping Map & Address - Expanded Width */}
                    <div className={`w-full max-w-full sm:max-w-2xl mx-auto rounded-2xl p-3.5 sm:p-5 mb-3 relative ${cardBoxClass}`}>
                      {isAngkorAncient && <KhmerAncientCornerBrackets color="border-[#C5A059]" />}
                      {/* Embedded Google Maps Preview Frame */}
                      <div className="rounded-xl overflow-hidden border border-white/80 mb-3.5 h-48 sm:h-60 md:h-64 bg-stone-100 shadow-inner w-full">
                        <iframe
                          title="Venue Location Map"
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7753177659496!2d104.87760987595568!3d11.567936188632668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951a029c78829%3A0xb304726bf6025bc0!2sThe%20Premier%20Centre%20Sen%20Sok!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
                          className="w-full h-full border-0"
                          loading="lazy"
                          allowFullScreen
                        />
                      </div>

                      {/* Venue & Street Address */}
                      <div className="text-center mb-3.5 px-2">
                        <p className={`${templateFont} text-sm sm:text-base font-bold text-stone-800 leading-snug`}>
                          {activeTemplate.id === 'angkor-ancient-royalty' ? 'សាលប្រាសាទមាស សែនសុខ (អគារ A)' : 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)'}
                        </p>
                        <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed mt-1 max-w-lg mx-auto">
                          ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ
                        </p>
                      </div>

                      <a
                        href="https://maps.app.goo.gl/gmxb8VaN78xgkFiu5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-white text-xs sm:text-sm font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md"
                        style={{ backgroundColor: themeTitleColor }}
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                        <span>Link ទៅកាន់ Google Maps</span>
                      </a>
                    </div>
                  </section>

                  {/* 7. PHOTO GALLERY (រូបថតអនុស្សារីយ៍) */}
                  <section className="px-3.5 py-4 sm:px-5 sm:py-5 relative z-10 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <ImageIcon className="w-4 h-4" style={{ color: themeTitleColor }} />
                      <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                        រូបថតអនុស្សារីយ៍
                      </h3>
                    </div>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    {/* Editorial Photo Grid */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 max-w-xl mx-auto">
                      {galleryPhotos.map((photo, idx) => {
                        const isFullWidth = idx === 0 || idx === 5;
                        const heightClass = isFullWidth
                          ? 'h-64 sm:h-80 md:h-92'
                          : 'h-52 sm:h-64 md:h-72';

                        return (
                          <div
                            key={photo.id}
                            onClick={() => setActivePhoto(photo)}
                            className={`group relative rounded-2xl overflow-hidden cursor-pointer ${isAngkorAncient ? 'border-2 border-[#C5A059]/80 shadow-[0_8px_30px_rgba(140,111,25,0.2)]' : 'border border-white/80 shadow-[0_8px_25px_rgba(0,0,0,0.06)]'} backdrop-blur-xs transition-all hover:shadow-lg hover:border-amber-300/80 ${isFullWidth ? 'col-span-2' : 'col-span-1'
                              } ${heightClass}`}
                          >
                            <img
                              src={photo.src}
                              alt={photo.caption}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                            />
                            {/* Subtle Elegant Glass Hover Gradient Overlay with Caption */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-3.5 sm:p-4 text-white text-center backdrop-blur-[2px]">
                              <p className="text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md">
                                {photo.caption}
                              </p>
                              <span className="text-[10px] sm:text-[11px] text-amber-300 font-medium mt-0.5 opacity-90">
                                ចុចដើម្បីមើលរូបធំ ✦
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* 8. SCAN TO GIFT (ជូនចំណងដៃ) */}
                  <section className="px-3.5 py-4 sm:px-5 sm:py-5 relative z-10 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <QrCode className="w-4 h-4" style={{ color: themeTitleColor }} />
                      <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                        ជូនចំណងដៃ
                      </h3>
                    </div>
                    <p className={`${templateFont} text-xs sm:text-sm text-stone-800 mt-0.5 mb-1`}>
                      {groomName} & {brideName}
                    </p>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    {/* Bank QR Code Card */}
                    <div className={`max-w-[280px] sm:max-w-xs mx-auto rounded-2xl p-4 sm:p-5 text-center relative ${cardBoxClass}`}>
                      {isAngkorAncient && <KhmerAncientCornerBrackets color="border-[#C5A059]" />}
                      <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest block mb-2 font-mono">
                        ABA PAY / BAKONG
                      </span>

                      {/* QR Image Plate */}
                      <div className="p-3 bg-white/95 backdrop-blur-sm rounded-2xl border border-stone-100 shadow-inner inline-block mb-2.5">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://theab-digital.app/gift/${activeTemplate.id}`)}`}
                          alt="Scan to Gift QR Code"
                          className="w-32 h-32 sm:w-36 sm:h-36 object-contain rounded-lg"
                        />
                      </div>

                      <p className="text-xs sm:text-[13px] font-bold text-stone-800 leading-tight">
                        {isCustomized ? 'HENG VATTANA & KEO CHORNAI' : `${groomName} & ${brideName}`}
                      </p>
                      <p className="text-[11px] text-stone-500 font-mono mt-0.5">
                        012 345 678 (USD / KHR)
                      </p>

                      <button
                        onClick={() => handleCopyAccount('012 345 678')}
                        className="mt-2.5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/85 hover:bg-white text-stone-700 hover:text-amber-900 text-xs font-bold transition cursor-pointer border border-stone-200 shadow-xs hover:shadow-sm"
                      >
                        <Copy className="w-3 h-3 text-theabCrimson" />
                        <span>ចម្លងលេខគណនី</span>
                      </button>
                    </div>
                  </section>

                  {/* 9. RSVP ATTENDANCE FORM (ការចូលរួម) */}
                  <section id="rsvp-section" className="px-3.5 py-4 sm:px-5 sm:py-5 relative z-10">
                    <div className="text-center">
                      <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                        ការចូលរួម
                      </h3>
                    </div>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    {/* RSVP Card */}
                    <div className={`max-w-md mx-auto rounded-2xl p-4 sm:p-5 relative ${cardBoxClass}`}>
                      {isAngkorAncient && <KhmerAncientCornerBrackets color="border-[#C5A059]" />}
                      <form onSubmit={handleRsvpSubmit} className="space-y-3">
                        {/* Guest Name */}
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">
                            ឈ្មោះរបស់អ្នក (Your Name) <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="សូមបញ្ចូលឈ្មោះ..."
                            value={rsvpForm.name}
                            onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-stone-200/80 focus:ring-2 focus:ring-amber-200/50 text-xs sm:text-sm bg-white/85 backdrop-blur-xs transition focus:bg-white"
                            style={{ outlineColor: themeTitleColor }}
                          />
                        </div>

                        {/* Attendance Status */}
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">
                            តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setRsvpForm({ ...rsvpForm, status: 'attending' })}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${rsvpForm.status === 'attending'
                                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                : 'bg-white/80 text-stone-700 border-white/80 hover:bg-white'
                                }`}
                            >
                              ចូលរួម (Attending)
                            </button>
                            <button
                              type="button"
                              onClick={() => setRsvpForm({ ...rsvpForm, status: 'not_attending' })}
                              className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${rsvpForm.status === 'not_attending'
                                ? 'bg-rose-700 text-white border-rose-700 shadow-xs'
                                : 'bg-white/80 text-stone-700 border-white/80 hover:bg-white'
                                }`}
                            >
                              មិនបានចូលរួម
                            </button>
                          </div>
                        </div>

                        {/* Guest Count */}
                        {rsvpForm.status === 'attending' && (
                          <div>
                            <label className="block text-xs font-bold text-stone-700 mb-1">
                              ចំនួនអ្នកចូលរួម (Number of Guests)
                            </label>
                            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                              {['1 នាក់', '2 នាក់', '3 នាក់', '4 នាក់', '5+ នាក់'].map((count) => (
                                <button
                                  key={count}
                                  type="button"
                                  onClick={() => setRsvpForm({ ...rsvpForm, guestCount: count })}
                                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap transition cursor-pointer ${rsvpForm.guestCount === count
                                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                                    : 'bg-white/80 text-stone-700 border-white/80 hover:bg-white'
                                    }`}
                                >
                                  {count}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl text-white text-xs sm:text-sm font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                          style={{ backgroundColor: themeTitleColor }}
                        >
                          <Check className="w-4 h-4 text-amber-300" />
                          <span>យល់ព្រម (Confirm)</span>
                        </button>
                      </form>

                      {/* Live RSVP Response List */}
                      {rsvpList.length > 0 && (
                        <div className="mt-4 pt-3.5 border-t border-stone-200/50">
                          <h4 className="text-[11px] font-bold text-stone-500 mb-2 uppercase tracking-wider text-center">
                            ភ្ញៀវដែលបានឆ្លើយតបថ្មីៗ
                          </h4>
                          <div className="space-y-1.5">
                            {rsvpList.map((item) => (
                              <div
                                key={item.id}
                                className="p-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-white/80 flex items-center justify-between text-xs shadow-2xs"
                              >
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                  <div>
                                    <span className="font-bold text-stone-800">{item.name}</span>
                                    <span className="text-stone-500 ml-1">
                                      បានឆ្លើយតប៖{' '}
                                      <strong className="text-emerald-700">
                                        {item.status === 'attending' ? `ចូលរួម (${item.guestCount})` : 'មិនបានចូលរួម'}
                                      </strong>
                                    </span>
                                  </div>
                                </div>
                                <span className="text-[10px] text-stone-400">{item.time}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* 10. BEST WISHES (សារជូនពរ) */}
                  <section className="px-3.5 py-4 sm:px-5 sm:py-5 relative z-10">
                    <div className="text-center">
                      <h3 className={`${templateFont} text-sm sm:text-base tracking-wide`} style={{ color: themeTitleColor }}>
                        សារជូនពរ
                      </h3>
                    </div>

                    <KhmerDivider isAncient={isAngkorAncient} />

                    {/* Wishes Input Card */}
                    <div className={`max-w-md mx-auto rounded-2xl p-4 sm:p-5 mb-4 relative ${cardBoxClass}`}>
                      {isAngkorAncient && <KhmerAncientCornerBrackets color="border-[#C5A059]" />}
                      <form onSubmit={handleWishSubmit} className="space-y-3">
                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">
                            ឈ្មោះរបស់អ្នក (Your Name) <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="សូមបញ្ចូលឈ្មោះ..."
                            value={wishForm.name}
                            onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-stone-200/80 text-xs sm:text-sm bg-white/85 backdrop-blur-xs transition focus:bg-white"
                            style={{ outlineColor: themeTitleColor }}
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-stone-700 mb-1">
                            សារជូនពររបស់អ្នក (Your Message) <span className="text-rose-600">*</span>
                          </label>
                          <textarea
                            rows={2}
                            placeholder="សូមសរសេរសារជូនពរ..."
                            value={wishForm.message}
                            onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-stone-200/80 text-xs sm:text-sm bg-white/85 backdrop-blur-xs transition focus:bg-white"
                            style={{ outlineColor: themeTitleColor }}
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 text-xs sm:text-sm font-bold hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                        >
                          <Send className="w-3.5 h-3.5 text-stone-900" />
                          <span>ផ្ញើរសារជូនពរ</span>
                        </button>
                      </form>
                    </div>

                    {/* Wishes List as Floating Glass Cards */}
                    {wishesList.length > 0 && (
                      <div className="max-w-md mx-auto space-y-2.5">
                        {wishesList.map((wish) => (
                          <div
                            key={wish.id}
                            className="p-3 rounded-2xl bg-white/75 backdrop-blur-md border border-white/90 text-left relative hover:bg-white/90 hover:border-amber-200/80 transition-all shadow-xs"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-stone-900 text-xs sm:text-[13px]">
                                {wish.name}
                              </span>
                              <span className="text-[10px] text-stone-400 font-mono">
                                {wish.date}
                              </span>
                            </div>
                            <p className="text-xs text-stone-700 leading-relaxed font-suwannaphum">
                              "{wish.message}"
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                  {/* 11. CONTACT HOST & DIGITAL THEAB FOOTER */}
                  <section className="max-w-xl mx-auto my-3 p-4 sm:p-5 bg-stone-950/85 backdrop-blur-xl rounded-2xl border border-amber-300/30 text-white text-center relative overflow-hidden shadow-lg">
                    <h3 className={`${templateFont} text-sm sm:text-base text-amber-300`}>
                      ទំនាក់ទំនងម្ចាស់ពិធីមង្គល
                    </h3>
                    <p className="text-[11px] text-stone-300 max-w-md mx-auto my-2 leading-relaxed font-suwannaphum">
                      ប្រសិនបើលោកអ្នកមានចម្ងល់ ឬត្រូវការការណែនាំផ្លូវ សូមទាក់ទងមកកាន់យើងខ្ញុំ៖
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2.5 mb-4">
                      <a
                        href="https://t.me/+85512345678"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold hover:scale-105 active:scale-95 transition cursor-pointer shadow-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Telegram: 012 345 678</span>
                      </a>
                      <a
                        href="tel:012345678"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold hover:scale-105 active:scale-95 transition cursor-pointer shadow-md"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>ទូរស័ព្ទ: 012 345 678</span>
                      </a>
                    </div>

                    <div className="pt-3 border-t border-amber-300/20 text-center">
                      <div className="flex items-center justify-center gap-1.5 text-amber-300/80 text-[11px] font-semibold">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</span>
                      </div>
                      <p className="text-[10px] text-stone-400 mt-0.5">
                        សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ
                      </p>

                      {/* Back to Top Button */}
                      <div className="pt-2">
                        <button
                          onClick={scrollToTop}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 hover:bg-white text-stone-800 text-xs font-semibold border border-stone-300 shadow-xs hover:shadow transition active:scale-95 cursor-pointer"
                        >
                          <span>ត្រឡប់ទៅលើវិញ</span>
                          <span className="text-amber-600 font-bold">↑</span>
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </>
          )}

        </main>

      {/* Lightbox Photo Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="max-w-2xl w-full max-h-[90vh] flex flex-col items-center relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
            <img
              src={activePhoto.src}
              alt={activePhoto.caption || 'រូបថតអនុស្សារីយ៍'}
              className="max-h-[75vh] w-auto object-contain rounded-2xl border border-stone-700"
            />
            <p className="text-white text-xs sm:text-sm font-semibold mt-3">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
