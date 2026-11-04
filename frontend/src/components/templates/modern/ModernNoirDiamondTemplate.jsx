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
  CheckCircle,
  Copy,
  Gift,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
  Phone,
  MessageCircle,
  Users,
  Check,
  Download,
  Diamond,
  Shield
} from 'lucide-react';

/**
 * ModernNoirDiamondTemplate
 * -------------------------------------------------------------
 * Theme: "អភិជនរាត្រីពេជ្រខ្មៅ" (Modern Noir Diamond & Platinum Chic)
 * Category: អភិជនទំនើប (modern)
 * Typography: font-komutt (headings/names) + font-serifTrad (Cinzel) + font-kantumruy (body)
 * Aesthetic: High-Fashion Black-Tie Gala, Obsidian Night, Frosted Platinum Glass, Luminous Diamond Sparkles
 */

export function ModernNoirDiamondTemplate({
  data = {},
  invitation = {},
  invitationData = {},
  activeTemplate = {},
  isEditMode = false,
  onSave = () => {}
}) {
  // Safe resolved data
  const groomName = data?.groomName || invitation?.groomName || invitationData?.groomName || activeTemplate?.demoGroom || 'ចាន់ រិទ្ធីស័ក្តិ';
  const brideName = data?.brideName || invitation?.brideName || invitationData?.brideName || activeTemplate?.demoBride || 'តែ ពេជ្រចិន្តា';

  const groomFather = invitation?.groomParents?.father || 'លោក ចាន់ រតនៈ';
  const groomMother = invitation?.groomParents?.mother || 'លោកស្រី ស៊ុន សុខុម';
  const brideFather = invitation?.brideParents?.father || 'លោក តែ គឹមសាន';
  const brideMother = invitation?.brideParents?.mother || 'លោកស្រី ហេង ស្រីពៅ';

  const weddingDate = data?.ceremonyDate || invitation?.weddingDate || activeTemplate?.demoDate || 'ថ្ងៃអាទិត្យ ទី១០ ខែមករា ឆ្នាំ២០២៧';
  const weddingTime = invitation?.weddingTime || 'ម៉ោង ៥:៣០ ល្ងាច';
  const weddingLocation = data?.ceremonyLocation || invitation?.weddingLocation || activeTemplate?.demoLocation || 'សណ្ឋាគារ រ៉ូសវូដ ភ្នំពេញ (Rosewood Phnom Penh - Grand Ballroom)';
  const locationAddress = (data?.locationAddress && data?.locationAddress !== weddingLocation) ? data.locationAddress : (data?.ceremonyAddress || invitation?.locationAddress || 'ជាន់ទី ៣៦ អគារវឌ្ឍនៈកាពីតាល មហាវិថីព្រះមុនីវង្ស រាជធានីភ្នំពេញ');
  const googleMapsUrl = invitation?.googleMapsUrl || 'https://maps.google.com/?q=Rosewood+Phnom+Penh';

  // Bank Info & Host Contacts
  const bankName = data?.bankName || 'ABA Bank';
  const accountName = data?.accountName || 'CHAN RITHYSAK';
  const accountNumber = data?.accountNumber || '010 888 999';
  const qrCodeImage = data?.qrCodeImage || '/images/aba_qr.webp';
  const phoneGroom = data?.phoneGroom || data?.hostPhoneGroom || '012 345 678';
  const phoneBride = data?.phoneBride || data?.hostPhoneBride || '098 765 432';
  const telegramLink = data?.telegramLink || 'https://t.me/theabdigital';
  const [showQrModal, setShowQrModal] = useState(false);

  // 5 Hero Images (Noir Diamond Aristocrat Khmer Couple)
  const heroList = (data?.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : (activeTemplate?.heroImages && activeTemplate.heroImages.length >= 5)
    ? activeTemplate.heroImages
    : [
        '/images/templates/modern-noir/noir_1.webp',
        '/images/templates/modern-noir/noir_2.webp',
        '/images/templates/modern-noir/noir_3.webp',
        '/images/templates/modern-noir/noir_4.webp',
        '/images/templates/modern-noir/noir_5.webp'
      ];

  // 6 Prewedding Gallery Photos
  const galleryPhotos = (data?.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : (activeTemplate?.galleryPhotos || [
        { id: 1, src: '/images/templates/modern-noir/noir_1.webp', caption: 'រាត្រីពេជ្រខ្មៅ និងសច្ចាស្នេហ៍អភិជន' },
        { id: 2, src: '/images/templates/modern-noir/noir_2.webp', caption: 'រចនាបថ Black-Tie Gala ទាន់សម័យ' },
        { id: 3, src: '/images/templates/modern-noir/noir_3.webp', caption: 'រស្មីពេជ្រចិន្តា និងភាពថ្លៃថ្នូរ' },
        { id: 4, src: '/images/templates/modern-noir/noir_4.webp', caption: 'អនុស្សាវរីយ៍នៃក្តីស្រឡាញ់កម្រិតខ្ពស់' },
        { id: 5, src: '/images/templates/modern-noir/noir_5.webp', caption: 'ចិញ្ចៀនពេជ្រផ្លាទីនសច្ចាស្នេហ៍' },
        { id: 6, src: '/images/templates/modern-noir/gallery_1.webp', caption: 'ចំណងអាពាហ៍ពិពាហ៍អមតៈ' }
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

  // Live Countdown (Target: Jan 10, 2027)
  const [timeLeft, setTimeLeft] = useState({ days: 807, hours: 19, minutes: 20, seconds: 30 });

  useEffect(() => {
    const targetDate = new Date('2027-01-10T08:00:00+07:00').getTime();
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

  // Complete Ceremony Milestones
  const ceremonyPrograms = (data?.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { num: 1, time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន', desc: 'ជួបជុំបងប្អូនញាតិមិត្តជិតឆ្ងាយរៀបចំគ្រឿងដង្វាយពេជ្រ' },
        { num: 2, time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យមង្គល', desc: 'ក្បួនហែផ្លែឈើ និងគ្រឿងបណ្ណាការចូលគេហដ្ឋានមង្គល' },
        { num: 3, time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍ផ្លូវការ', desc: 'ចុះកិច្ចសន្យាអាពាហ៍ពិពាហ៍ចំពោះមុខអាជ្ញាធរមានសមត្ថកិច្ច' },
        { num: 4, time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរីមង្គល', desc: 'កាត់សក់ជម្រះចង្រៃ និងប្រសិទ្ធពរជ័យសិរីសួស្តី' },
        { num: 5, time: '០៩:៣០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ', desc: 'សំពះផ្ទឹមក្រងសីមា ចងខ្សែអំបោះក្រហម និងបង្វិលពពិល' },
        { num: 6, time: '១១:៣០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់', desc: 'ពិសារអាហារសាមគ្គីជួបជុំគ្រួសារ និងភ្ញៀវកិត្តិយស' },
        { num: 7, time: '០៥:៣០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងរាត្រីសមោសរ Black-Tie Gala', desc: 'ពិសាភោជនាហារពេលរាត្រី និងរីករាយជាមួយតន្ត្រីសម័យអន្តរជាតិ' }
      ];

  // Copy Bank Info
  const [copiedBank, setCopiedBank] = useState(false);
  const copyBankInfo = () => {
    const rawNum = accountNumber.replace(/\s+/g, '');
    navigator.clipboard?.writeText(`${rawNum} (${bankName}: ${accountName})`);
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

  // Live Wishes State
  const [wishes, setWishes] = useState([
    { id: 1, name: 'ឯកឧត្តម & លោកជំទាវ ស៊ុយ សុជាតិ', text: 'សូមបួងសួងដល់វត្ថុស័ក្តិសិទ្ធិក្នុងលោក ប្រទានពរជ័យឱ្យចំណងអាពាហ៍ពិពាហ៍នេះ រឹងមាំភ្លឺថ្លាដូចពេជ្រចិន្តា និងចម្រុងចម្រើនជានិច្ចនិរន្តរ៍!', time: '១ ម៉ោងមុន' },
    { id: 2, name: 'លោកជំទាវ ហុង សុជាតា', text: 'សូមឱ្យក្មួយទាំងពីរទទួលបាននូវសុភមង្គល សេចក្តីថ្កុំថ្កើង និងជោគជ័យគ្រប់ភារកិច្ច!', time: '៣ ម៉ោងមុន' },
    { id: 3, name: 'Rosewood Executive Colleagues', text: 'Congratulations to the most magnificent couple! Wishing you both an extraordinary lifetime of love!', time: '៤ ម៉ោងមុន' }
  ]);
  const [guestName, setGuestName] = useState('');
  const [guestText, setGuestText] = useState('');

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestText.trim()) return;
    setWishes([
      { id: Date.now(), name: guestName.trim(), text: guestText.trim(), time: 'អម្បាញ់មិញ' },
      ...wishes
    ]);
    setGuestName('');
    setGuestText('');
  };



  // Download .ics Calendar Event
  const downloadCalendarEvent = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Theab Digital//Wedding Invitation//KM',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-modern-noir-diamond@theab-digital.com',
      'DTSTART:20270110T010000Z',
      'DTEND:20270110T150000Z',
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
    <div className="w-full bg-[#050811] text-slate-100 font-kantumruy relative selection:bg-cyan-500 selection:text-slate-950 pb-20 select-none overflow-hidden">
      {/* Subtle Platinum Starlight Gradient Flares */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800/25 via-[#0A0F1D]/60 to-transparent" />

      {/* Floating Audio Toggle */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={toggleAudio}
          className={`px-3.5 py-2.5 rounded-full flex items-center gap-2 border backdrop-blur-md shadow-2xl transition-all duration-300 text-xs font-medium cursor-pointer ${
            isPlaying
              ? 'bg-slate-800 text-cyan-300 border-cyan-400/60 shadow-cyan-500/20 ring-2 ring-cyan-400/30'
              : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:text-white'
          }`}
          title="ភ្លេងមង្គល «ភ្ជាប់និស្ស័យ»"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-cyan-300" />
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
          1. MODERN NOIR DIAMOND HERO SNAP CAROUSEL (5 KHMER COUPLE PHOTOS)
          - Fitted directly to container width without nested container wrapper
          - Stationary centered typography placed directly on photo
          ========================================================================= */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden border-b-2 border-slate-700/80 bg-black select-none">
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
                alt={`Noir Diamond Prewedding ${idx + 1}`}
                className="w-full h-full object-cover object-center"
                loading={idx === 0 ? 'eager' : 'lazy'} decoding="async" />
              {/* Balanced Dark Vignette for High-Contrast Typography */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/45 to-black/55 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stationary Centered Typography Directly on Photo (Scaled for mobile readability, frameless) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="space-y-2.5 sm:space-y-3 w-full max-w-md mx-auto px-2 sm:px-4">
            {/* Top Aristocrat Diamond Emblem */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-cyan-300 text-xs drop-shadow-[0_0_8px_#38BDF8]">✦</span>
              <span className="font-komutt text-[11px] sm:text-xs md:text-sm text-slate-200 tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                សិរីសួស្តីអាពាហ៍ពិពាហ៍
              </span>
              <span className="text-cyan-300 text-xs drop-shadow-[0_0_8px_#38BDF8]">✦</span>
            </div>

            {/* Groom Name in font-komutt */}
            <h1 className="font-komutt text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-100">
              {groomName}
            </h1>

            {/* Diamond Ampersand Divider */}
            <div className="flex items-center justify-center gap-2.5 my-0.5 sm:my-1">
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-cyan-400 to-slate-200 drop-shadow" />
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900/90 border border-cyan-400/80 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.6)] backdrop-blur-sm">
                <span className="font-serifTrad italic text-cyan-300 text-[10px] sm:text-xs font-bold">~ & ~</span>
              </div>
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-14 bg-gradient-to-l from-transparent via-cyan-400 to-slate-200 drop-shadow" />
            </div>

            {/* Bride Name in font-komutt */}
            <h1 className="font-komutt text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-100">
              {brideName}
            </h1>

            {/* Date & Location Subtitle */}
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-cyan-200/90 font-medium tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] font-komutt">
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
            className="w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-cyan-200 border border-slate-600 flex items-center justify-center backdrop-blur-md transition disabled:opacity-20 pointer-events-auto cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToHero(Math.min(heroList.length - 1, activeHeroIdx + 1))}
            disabled={activeHeroIdx === heroList.length - 1}
            className="w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-cyan-200 border border-slate-600 flex items-center justify-center backdrop-blur-md transition disabled:opacity-20 pointer-events-auto cursor-pointer"
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
                activeHeroIdx === i ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#38BDF8]' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
          <span className="ml-2 text-[10px] text-cyan-200/80 font-mono bg-black/60 px-2 py-0.5 rounded-full border border-slate-700">
            {activeHeroIdx + 1}/{heroList.length}
          </span>
        </div>
      </section>

      {/* =========================================================================
          2. PARENTS BLESSING SECTION (មាតាបិតាទាំងសងខាង)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-12">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-700/80 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 text-cyan-300 text-xs uppercase tracking-widest font-serifTrad">
              <Diamond className="w-3.5 h-3.5 text-cyan-400" />
              <span>Honorable Parents Blessing</span>
              <Diamond className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <h2 className="font-komutt text-2xl sm:text-3xl font-bold text-white">
              សេចក្តីគោរពអញ្ជើញ និងពរជ័យមាតាបិតា
            </h2>
            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              យើងខ្ញុំជាមាតាបិតាទាំងសងខាង មានកិត្តិយសដ៏ខ្ពង់ខ្ពស់សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍កូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ។
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center border-t border-slate-800 pt-6">
            {/* Groom's Parents */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-cyan-300 font-serifTrad  block mb-1">
                ខាងកូនប្រុស
              </span>
              <p className="font-komutt text-sm sm:text-base font-semibold text-slate-100">{groomFather}</p>
              <p className="font-komutt text-sm sm:text-base font-semibold text-slate-100">{groomMother}</p>
            </div>

            {/* Bride's Parents */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <span className="text-[11px] text-cyan-300 font-serifTrad  block mb-1">
                ខាងកូនស្រី
              </span>
              <p className="font-komutt text-sm sm:text-base font-semibold text-slate-100">{brideFather}</p>
              <p className="font-komutt text-sm sm:text-base font-semibold text-slate-100">{brideMother}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FORMAL INVITATION LETTER (លិខិតគោរពអញ្ជើញផ្លូវការ)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950 border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-serifTrad uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Cordial Invitation</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <h2 className="font-komutt text-2xl sm:text-3xl font-bold text-white">
            សេចក្តីគោរពអញ្ជើញ
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-light">
            ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ មហាប្រសើរ ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍នៃកូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ ដែលនឹងប្រព្រឹត្តទៅតាមគន្លងប្រពៃណីព្រះពុទ្ធសាសនា និងទំនៀមខ្មែរបុរាណ។ វត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក គឺជាកិត្តិយសដ៏ថ្លៃថ្លាបំផុតសម្រាប់គ្រួសារយើងខ្ញុំទាំងពីរ។
          </p>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-cyan-300 font-komutt">
            <span>សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមានដ៏មានតម្លៃ!</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CALENDAR MATRIX + LIVE REAL-TIME COUNTDOWN + ADD TO CALENDAR
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-700/80 shadow-2xl space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs text-cyan-300 uppercase tracking-widest font-serifTrad">Event Countdown & Date</span>
            <h2 className="font-komutt text-2xl sm:text-3xl font-bold text-white">
              កាលបរិច្ឆេទ & ការរាប់ថយក្រោយ
            </h2>
            <p className="text-xs text-slate-400 font-komutt">{weddingDate}</p>
          </div>

          {/* Real-Time Live Countdown Timer */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto text-center">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="block text-2xl sm:text-3xl font-bold font-serifTrad text-slate-100">
                {timeLeft.days}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-komutt">ថ្ងៃ</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="block text-2xl sm:text-3xl font-bold font-serifTrad text-slate-100">
                {timeLeft.hours}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-komutt">ម៉ោង</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="block text-2xl sm:text-3xl font-bold font-serifTrad text-slate-100">
                {timeLeft.minutes}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-komutt">នាទី</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
              <span className="block text-2xl sm:text-3xl font-bold font-serifTrad text-cyan-400 animate-pulse">
                {timeLeft.seconds}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-400 font-komutt">វិនាទី</span>
            </div>
          </div>

          {/* Monthly Calendar Matrix (January 2027) */}
          <div className="max-w-xs mx-auto p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-200 font-serifTrad mb-3">
              JANUARY 2027 • ខែមករា
            </div>
            <div className="grid grid-cols-7 gap-1 text-[11px] text-slate-500 mb-2 font-mono">
              <span>អា</span><span>ច</span><span>អ</span><span>ពុ</span><span>ព្រ</span><span>សុ</span><span>ស</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {/* Friday Jan 1 offset */}
              <span /><span /><span /><span /><span />
              <span className="p-1.5 text-slate-500">1</span>
              <span className="p-1.5 text-slate-500">2</span>
              <span className="p-1.5 text-slate-500">3</span>
              <span className="p-1.5 text-slate-500">4</span>
              <span className="p-1.5 text-slate-500">5</span>
              <span className="p-1.5 text-slate-500">6</span>
              <span className="p-1.5 text-slate-500">7</span>
              <span className="p-1.5 text-slate-500">8</span>
              <span className="p-1.5 text-slate-500">9</span>
              {/* Wedding Day: 10 */}
              <span className="p-1.5 rounded-full bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_#38BDF8]">
                10
              </span>
              <span className="p-1.5 text-slate-500">11</span>
              <span className="p-1.5 text-slate-500">12</span>
              <span className="p-1.5 text-slate-500">13</span>
              <span className="p-1.5 text-slate-500">14</span>
              <span className="p-1.5 text-slate-500">15</span>
              <span className="p-1.5 text-slate-500">16</span>
              <span className="p-1.5 text-slate-500">17</span>
              <span className="p-1.5 text-slate-500">18</span>
              <span className="p-1.5 text-slate-500">19</span>
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>កត់ត្រាទុកក្នុងប្រតិទិន (Add to Calendar)</span>
              <Download className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. COMPLETE 7 CEREMONY MILESTONES (កាលវិភាគពិធីការទាំង ៧ កម្មវិធី)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-cyan-300 uppercase tracking-widest font-serifTrad">Full Wedding Schedule</span>
            <h2 className="font-komutt text-2xl font-bold text-white">កាលវិភាគពិធីការទាំង ៧ កម្មវិធី</h2>
          </div>

          <div className="space-y-3.5">
            {ceremonyPrograms.map((prog) => (
              <div
                key={prog.num}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-4 hover:border-slate-700 transition"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-komutt font-bold text-white text-sm sm:text-base">
                      {prog.title}
                    </h4>
                    <span className="text-xs text-cyan-300 font-serifTrad font-semibold shrink-0">
                      {prog.time}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{prog.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CERTIFICATE OF GRATITUDE (លិខិតថ្លែងអំណរគុណ)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-950 border border-slate-800 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-serifTrad uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gratitude Certificate</span>
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          <h2 className="font-komutt text-2xl sm:text-3xl font-bold text-white">
            សេចក្តីថ្លែងអំណរគុណ
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed font-light">
            យើងខ្ញុំជាគូស្វាមីភរិយាថ្មី រួមជាមួយមាតាបិតាទាំងសងខាង សូមលំឱនកាយវាចាចិត្តថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តម ពេលវេលាដ៏មានតម្លៃ និងពរជ័យសព្ទសាធុការពររបស់ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា ដែលបានផ្តល់កិត្តិយសអញ្ជើញមកចូលរួមជាសាក្សីនៃសេចក្តីស្រឡាញ់របស់យើងខ្ញុំ។
          </p>

          <div className="pt-2 text-xs text-cyan-200/90 font-komutt">
            «សូមទេវតាថែរក្សា និងប្រទានពរជ័យឱ្យលោកអ្នកជួបតែសេចក្តីសុខ ចម្រើនជានិច្ចនិរន្តរ៍»
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. VENUE LOCATION & GOOGLE MAPS
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <TemplateGoogleMap
          locationName={weddingLocation}
          address={locationAddress}
          googleMapsUrl={googleMapsUrl}
          isDark={true}
          accentColor="#06B6D4"
          fontFamily="font-komutt"
        />
      </section>

      {/* =========================================================================
          8. PREWEDDING PHOTO GALLERY (6 PHOTOS) WITH LIGHTBOX MODAL
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-cyan-300 uppercase tracking-widest font-serifTrad">Memories & Portraits</span>
            <h2 className="font-komutt text-2xl font-bold text-white">កម្រងរូបភាពអនុស្សាវរីយ៍</h2>
            <p className="text-xs text-slate-400">ចុចលើរូបភាពដើម្បីមើលទំហំធំពេញអេក្រង់</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 cursor-pointer shadow-sm hover:border-cyan-400/50 transition duration-300"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2.5">
                  <p className="text-[10px] text-cyan-200 line-clamp-2 font-komutt">
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
              className="relative max-w-lg w-full bg-slate-950 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:text-cyan-300 flex items-center justify-center cursor-pointer border border-white/20"
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
                <p className="font-komutt text-sm text-cyan-200 font-semibold">
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
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 text-center space-y-6 shadow-2xl">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-cyan-300 text-xs uppercase tracking-widest font-serifTrad">
              <Gift className="w-4 h-4 text-cyan-400" />
              <span>Digital Wedding Envelope</span>
            </div>
            <h2 className="font-komutt text-2xl font-bold text-white">
              អាំងប៉ាវ & ចំណងដៃពរជ័យ
            </h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              សម្រាប់ញាតិមិត្តដែលមិនបានមកចូលរួមផ្ទាល់ អាចផ្ញើចំណងដៃជូនពរតាមរយៈគណនីធនាគារខាងក្រោម
            </p>
          </div>

          <div className="max-w-xs mx-auto p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <div
              onClick={() => qrCodeImage && setShowQrModal(true)}
              className={`w-36 h-36 mx-auto bg-white p-2.5 rounded-2xl flex items-center justify-center shadow-md border border-slate-700 relative group ${qrCodeImage ? 'cursor-pointer' : ''}`}
            >
              {qrCodeImage ? (
                <>
                  <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain" decoding="async" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold bg-black/70 px-2 py-1 rounded">ចុចដើម្បីពង្រីក</span>
                  </div>
                </>
              ) : (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-800 text-[10px] font-mono text-center p-1 border border-slate-300 rounded-xl">
                  <span className="font-bold text-xs text-blue-900">{bankName}</span>
                  <span className="text-[9px] mt-1 text-slate-600 font-bold">SCAN TO PAY</span>
                  <span className="text-[9px] text-slate-800 font-bold">{accountNumber}</span>
                  <span className="text-[8px] text-slate-500 font-bold mt-1">{accountName}</span>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-300 space-y-0.5">
              <p className="font-semibold text-white">{bankName}: {accountNumber}</p>
              <p className="text-[11px] text-slate-400">ឈ្មោះគណនី: {accountName}</p>
            </div>

            <button
              onClick={copyBankInfo}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition cursor-pointer shadow-sm"
            >
              {copiedBank ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-cyan-300">បានចម្លងរួចរាល់!</span>
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
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl">
          <div className="text-center space-y-1 mb-6">
            <span className="text-xs text-cyan-300 uppercase tracking-widest font-serifTrad">RSVP Confirmation</span>
            <h2 className="font-komutt text-2xl font-bold text-white">ការបញ្ជាក់វត្តមានចូលរួម</h2>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              សូមមេត្តាឆ្លើយតបមុនថ្ងៃទី ២៥ ខែធ្នូ ដើម្បីជួយសម្រួលដល់ការរៀបចំតុទទួលភ្ញៀវ
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-cyan-400 mx-auto" />
              <h3 className="font-komutt text-lg font-bold text-white">
                អរគុណសម្រាប់ការបញ្ជាក់វត្តមាន!
              </h3>
              <p className="text-xs text-cyan-200/80">
                ព័ត៌មានរបស់អ្នកត្រូវបានកត់ត្រាទុកដោយជោគជ័យ។ ជួបគ្នាក្នុងថ្ងៃសិរីសួស្តី!
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt">
                  ឈ្មោះពេញរបស់អ្នក *
                </label>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="ឧ. លោក ស៊ុំ វឌ្ឍនៈ និងភរិយា"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt">
                  វត្តមានចូលរួម
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRsvpAttending('yes')}
                    className={`py-2.5 rounded-xl text-xs font-bold font-komutt transition border cursor-pointer ${
                      rsvpAttending === 'yes'
                        ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-md'
                        : 'bg-slate-950/60 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    ✓ ចូលរួមពិតប្រាកដ
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpAttending('no')}
                    className={`py-2.5 rounded-xl text-xs font-bold font-komutt transition border cursor-pointer ${
                      rsvpAttending === 'no'
                        ? 'bg-slate-800 text-white border-slate-700 shadow-md'
                        : 'bg-slate-950/60 text-slate-300 border-slate-700 hover:border-slate-600'
                    }`}
                  >
                    ✗ អធ្យាស្រ័យមិនបានចូលរួម
                  </button>
                </div>
              </div>

              {rsvpAttending === 'yes' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt">
                    ចំនួនភ្ញៀវចូលរួម
                  </label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white text-xs focus:outline-none focus:border-cyan-400 transition"
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
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt">
                  លេខទូរស័ព្ទ (ជាជម្រើស)
                </label>
                <input
                  type="tel"
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  placeholder="012 345 678"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-komutt">
                  ចំណាំបន្ថែម / ពាក្យជូនពរ
                </label>
                <textarea
                  value={rsvpNote}
                  onChange={(e) => setRsvpNote(e.target.value)}
                  rows={2}
                  placeholder="សរសេរចំណាំ ឬពាក្យជូនពរនៅទីនេះ..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 text-slate-950 font-bold text-xs  hover:opacity-90 transition shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                ផ្ញើការឆ្លើយតប RSVP
              </button>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
          11. DIGITAL GUESTBOOK & WISHES FEED
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-cyan-300 uppercase tracking-widest font-serifTrad">Guest Wishes</span>
            <h2 className="font-komutt text-2xl font-bold text-white">សៀវភៅកត់ត្រាពរជ័យឌីជីថល</h2>
            <p className="text-xs text-slate-400">ផ្ញើសារជូនពរដល់គូស្វាមីភរិយាថ្មី</p>
          </div>

          <form onSubmit={handleAddWish} className="space-y-3">
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="ឈ្មោះរបស់អ្នក (ឧ. សុខ ពិសិដ្ឋ)"
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition"
            />
            <textarea
              value={guestText}
              onChange={(e) => setGuestText(e.target.value)}
              rows={3}
              placeholder="សរសេរពាក្យជូនពររបស់អ្នកនៅទីនេះ..."
              required
              className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 transition resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs  hover:bg-cyan-400 transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </form>

          {/* Wishes List */}
          <div className="space-y-3 pt-4 border-t border-slate-800 max-h-64 overflow-y-auto pr-1">
            {wishes.map((w) => (
              <div key={w.id} className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-komutt font-semibold text-cyan-200 text-xs">
                    {w.name}
                  </span>
                  <span className="text-[10px] text-slate-500 font-serifTrad">{w.time}</span>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          12. HOST CONTACTS (ទំនាក់ទំនងម្ចាស់កម្មវិធី)
          ========================================================================= */}
      <section className="relative z-20 max-w-2xl mx-auto px-4 py-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs text-cyan-300 uppercase tracking-widest font-serifTrad">Contact & Inquiries</span>
            <h2 className="font-komutt text-2xl font-bold text-white">ទំនាក់ទំនងម្ចាស់កម្មវិធី</h2>
            <p className="text-xs text-slate-400">សម្រាប់ព័ត៌មានបន្ថែម ឬការសាកសួរទីតាំង</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Groom side */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-300 font-serifTrad block">ខាងកូនប្រុស</span>
              <p className="text-xs text-slate-200 font-semibold">{groomName}</p>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <a
                  href={`tel:${phoneGroom}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{phoneGroom}</span>
                </a>
                {telegramLink && (
                  <a
                    href={telegramLink.startsWith('http') ? telegramLink : `https://t.me/${telegramLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/40 hover:bg-cyan-900/60 text-cyan-200 text-xs transition border border-cyan-700/50"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Telegram</span>
                  </a>
                )}
              </div>
            </div>

            {/* Bride side */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-cyan-300 font-serifTrad block">ខាងកូនស្រី</span>
              <p className="text-xs text-slate-200 font-semibold">{brideName}</p>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <a
                  href={`tel:${phoneBride}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{phoneBride}</span>
                </a>
                {telegramLink && (
                  <a
                    href={telegramLink.startsWith('http') ? telegramLink : `https://t.me/${telegramLink}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-900/40 hover:bg-cyan-900/60 text-cyan-200 text-xs transition border border-cyan-700/50"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition cursor-pointer text-xs"
          >
            <ChevronUp className="w-4 h-4" />
            <span>ត្រឡប់ទៅលើវិញ</span>
          </button>
        </div>

        <p className="font-komutt text-slate-200">
          សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមាន និងពរជ័យដ៏ថ្លៃថ្លារបស់លោកអ្នក!
        </p>

        <p className="font-serifTrad text-[11px] tracking-widest text-slate-500 uppercase">
          Theab Digital • Modern Noir Diamond Edition
        </p>
      </footer>

      {/* Bank QR Code Zoom Modal */}
      {showQrModal && qrCodeImage && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fade"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xs w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 text-center shadow-2xl relative"
          >
            <h4 className="font-komutt text-base font-bold text-cyan-300 mb-1">
              {bankName}
            </h4>
            <p className="text-xs text-slate-300 font-mono mb-3">{accountName} • {accountNumber}</p>
            <div className="p-3 bg-white rounded-2xl inline-block shadow-inner mb-4">
              <img src={qrCodeImage} alt="QR Code Large" className="w-56 h-56 object-contain" decoding="async" loading="lazy" />
            </div>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
            >
              បិទ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModernNoirDiamondTemplate;
