import TemplateGoogleMap from '../../TemplateGoogleMap';
import TemplateGratitudeNote from '../../TemplateGratitudeNote';
import React, { useState, useEffect, useRef } from 'react';
import { useTemplateAudio } from '../../../utils/useTemplateAudio';
import {
  Calendar,
  Clock,
  Heart,
  MapPin,
  Music,
  Navigation,
  Send,
  Sparkles,
  CheckCircle,
  Copy,
  Gift,
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  UserCheck,
  Phone,
  MessageCircle
} from 'lucide-react';

/**
 * ModernRoseGoldRoyaleTemplate
 * -------------------------------------------------------------
 * Theme: "អភិជនកុលាបមាស" (Modern Rose Gold Royale & Haute Couture)
 * Category: អភិជនទំនើប (modern)
 * Colors: Rose Gold, Copper Blush, Pure Ivory, Frosted Pearl
 */
export function ModernRoseGoldRoyaleTemplate({
  data = {},
  invitation = {},
  invitationData = {},
  activeTemplate = {},
  isEditMode = false,
  onSave = () => {}
}) {
  const groomName = data?.groomName || invitation?.groomName || invitationData?.groomName || activeTemplate?.demoGroom || 'លាង បញ្ញារិទ្ធ';
  const brideName = data?.brideName || invitation?.brideName || invitationData?.brideName || activeTemplate?.demoBride || 'ជា ស្រីពៅកល្យាណ';

  const groomFather = invitation?.groomParents?.father || 'លោក លាង គឹមសេង';
  const groomMother = invitation?.groomParents?.mother || 'លោកស្រី ស៊ុំ គន្ធា';
  const brideFather = invitation?.brideParents?.father || 'លោក ជា ប៊ុនថន';
  const brideMother = invitation?.brideParents?.mother || 'លោកស្រី ម៉ី វណ្ណា';

  const weddingDate = data?.ceremonyDate || invitation?.weddingDate || activeTemplate?.demoDate || 'ថ្ងៃសៅរ៍ ទី២៨ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const weddingTime = invitation?.weddingTime || 'ម៉ោង ៥:០០ ល្ងាច';
  const weddingLocation = data?.ceremonyLocation || invitation?.weddingLocation || activeTemplate?.demoLocation || 'សណ្ឋាគារ សូហ្វីតែល ភ្នំពេញ ភូគីត្រា (Grand Ballroom)';
  const locationAddress = invitation?.locationAddress || 'ផ្លូវ ២៦ ឧកញ៉ា ឈុន សង្កាត់ទន្លេបាសាក់ ខណ្ឌចំការមន រាជធានីភ្នំពេញ';
  const googleMapsUrl = invitation?.googleMapsUrl || 'https://maps.google.com/?q=Sofitel+Phnom+Penh+Phokeethra';

  // Bank Info & Host Contacts
  const bankName = data?.bankName || 'ABA Bank';
  const accountName = data?.accountName || 'LEANG PANHARITH & CHEA SREYPOV';
  const accountNumber = data?.accountNumber || '000 123 456';
  const qrCodeImage = data?.qrCodeImage || '/images/aba_qr.webp';
  const phoneGroom = data?.phoneGroom || data?.hostPhoneGroom || '012 345 678';
  const phoneBride = data?.phoneBride || data?.hostPhoneBride || '098 765 432';
  const telegramLink = data?.telegramLink || 'https://t.me/theabdigital';

  const heroList = (data?.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : (activeTemplate?.heroImages && activeTemplate.heroImages.length >= 5)
    ? activeTemplate.heroImages
    : [
        '/images/templates/modern-rosegold/rosegold_1.webp',
        '/images/templates/modern-rosegold/rosegold_2.webp',
        '/images/templates/modern-rosegold/rosegold_3.webp',
        '/images/templates/modern-rosegold/rosegold_4.webp',
        '/images/templates/modern-rosegold/rosegold_5.webp'
      ];

  const galleryPhotos = (data?.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : (activeTemplate?.galleryPhotos || [
        { id: 1, src: '/images/templates/modern-rosegold/rosegold_1.webp', caption: 'រស្មីកុលាបមាស នៃចំណងស្នេហ៍អភិជន' },
        { id: 2, src: '/images/templates/modern-rosegold/rosegold_2.webp', caption: 'ភាពរ៉ូមែនទិកកម្រិតខ្ពស់ Haute Couture' },
        { id: 3, src: '/images/templates/modern-rosegold/rosegold_3.webp', caption: 'ពន្លឺស្នេហ៍ក្នុងរាត្រីសមោសរ' },
        { id: 4, src: '/images/templates/modern-rosegold/rosegold_4.webp', caption: 'អនុស្សាវរីយ៍ដ៏ផ្អែមល្ហែម' },
        { id: 5, src: '/images/templates/modern-rosegold/rosegold_5.webp', caption: 'សច្ចាស្នេហ៍និរន្តរ៍កាល' },
        { id: 6, src: '/images/templates/modern-rosegold/rosegold_1.webp', caption: 'ចំណងអាពាហ៍ពិពាហ៍អមតៈ' }
      ]);

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const heroScrollRef = useRef(null);

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

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  // Fully isolated template audio («ភ្ជាប់និស្ស័យ» - NISAI)
  const { isPlaying, toggleAudio } = useTemplateAudio();

  const [timeLeft, setTimeLeft] = useState({ days: 763, hours: 14, minutes: 20, seconds: 15 });

  useEffect(() => {
    const targetDate = new Date('2026-11-28T17:00:00+07:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);



  // Download .ics Calendar Event
  const downloadCalendarEvent = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Theab Digital//Wedding Invitation//KM',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-modern-rosegold-royale@theab-digital.com',
      'DTSTART:20261128T100000Z',
      'DTEND:20261128T150000Z',
      `SUMMARY:ពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍: ${groomName} & ${brideName}`,
      'DESCRIPTION:សូមគោរពអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍',
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

  // Complete Ceremony Milestones
  const ceremonyPrograms = (data?.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { num: 1, time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន', desc: 'ជួបជុំបងប្អូនញាតិមិត្តជិតឆ្ងាយរៀបចំគ្រឿងដង្វាយសូត្រមាស' },
        { num: 2, time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យមង្គល', desc: 'ក្បួនហែផ្លែឈើ និងគ្រឿងបណ្ណាការចូលគេហដ្ឋានមង្គល' },
        { num: 3, time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍ផ្លូវការ និងសែនដូនតា', desc: 'ចុះកិច្ចសន្យាអាពាហ៍ពិពាហ៍ចំពោះមុខអាជ្ញាធរ និងសែនព្រេនបុព្វការីជន' },
        { num: 4, time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរីមង្គល', desc: 'កាត់សក់ជម្រះចង្រៃ និងប្រសិទ្ធពរជ័យសិរីសួស្តី' },
        { num: 5, time: '០៩:៣០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម ចងដៃសូត្រមាស បង្វិលពពិល ព្រះថោងតោងស្បៃ', desc: 'សំពះផ្ទឹមក្រងសីមា ចងខ្សែអំបោះក្រហម និងបង្វិលពពិលជ័យ' },
        { num: 6, time: '១១:៣០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់', desc: 'ពិសារអាហារសាមគ្គីជួបជុំគ្រួសារ និងភ្ញៀវកិត្តិយស' },
        { num: 7, time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងរាត្រីសមោសរ', desc: 'ពិសារភោជនាហារពេលរាត្រី និងរីករាយជាមួយតន្ត្រីសម័យអភិជន' }
      ];

  const [rsvpState, setRsvpState] = useState({ name: '', phone: '', guests: 1, attendance: 'attending', meal: 'standard' });
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishes, setWishes] = useState([
    { id: 1, name: 'ឯកឧត្តម ស៊ឹម វុឌ្ឍី', date: '២ ថ្ងៃមុន', text: 'សូមប្រសិទ្ធពរជ័យសិរីសួស្តី វិបុលសុខគ្រប់ប្រការដល់គូស្វាមីភរិយាថ្មី!' },
    { id: 2, name: 'Grace & Johnny', date: '៥ ម៉ោងមុន', text: 'May your love grow stronger with each passing day. Huge congratulations!' }
  ]);
  const [newWish, setNewWish] = useState({ name: '', text: '' });
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [activeBankTab, setActiveBankTab] = useState('aba');
  const [copiedBank, setCopiedBank] = useState(false);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpState.name.trim()) return;
    setRsvpSubmitted(true);
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!newWish.name.trim() || !newWish.text.trim()) return;
    setWishes([
      { id: Date.now(), name: newWish.name, date: 'ទើបតែផ្ញើ', text: newWish.text },
      ...wishes
    ]);
    setNewWish({ name: '', text: '' });
  };

  return (
    <div className="min-h-screen bg-[#140C0E] text-rose-50 font-kantumruy relative overflow-x-hidden selection:bg-[#E0A899] selection:text-black">
      {/* Rose Gold Ambient Light */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[650px] h-[550px] bg-rose-500/12 blur-[140px] pointer-events-none z-0 rounded-full" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/10 blur-[150px] pointer-events-none z-0 rounded-full" />

      {/* Floating Audio Controller */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#231215]/90 border border-rose-400/40 text-rose-200 text-xs font-semibold shadow-[0_4px_20px_rgba(224,168,153,0.3)] backdrop-blur-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="ភ្លេងមង្គល «ភ្ជាប់និស្ស័យ»"
      >
        <Music className={`w-4 h-4 text-rose-300 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'ភ្លេង «ភ្ជាប់និស្ស័យ»' : 'ចាក់ភ្លេងមង្គល'}</span>
      </button>

      {/* 1. HERO SECTION (Snap Carousel) - Responsive aspect ratio for all phone heights */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[3/4] min-h-[460px] sm:min-h-[560px] md:min-h-[660px] overflow-hidden select-none border-b border-rose-500/20">
        <div
          ref={heroScrollRef}
          onScroll={handleHeroScroll}
          className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth touch-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {heroList.map((img, idx) => (
            <div key={idx} className="relative w-full min-w-full h-full shrink-0 snap-start snap-always">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url(${img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#180E10] via-black/45 to-[#180E10]/80" />
            </div>
          ))}
        </div>

        {/* Carousel Indicators */}
        <div className="absolute top-4 inset-x-0 z-30 flex justify-center gap-1.5 px-4">
          {heroList.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToHero(idx)}
              className={`h-1 rounded-full transition-all duration-300 ${
                activeHeroIdx === idx ? 'w-8 bg-gradient-to-r from-rose-300 to-amber-300' : 'w-2 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Hero Content (Scaled for mobile readability, frameless) */}
        <div className="relative z-20 w-full h-full flex flex-col justify-between p-4 sm:p-8 text-center pointer-events-none">
          {/* Top Rose Gold Monogram Seal (Clean Khmer, No English subtitle) */}
          <div className="mt-6 sm:mt-8 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-rose-950/60 border border-rose-400/50 backdrop-blur-md shadow-[0_4px_20px_rgba(224,168,153,0.3)]">
              <span className="w-1.5 h-1.5 rotate-45 bg-rose-300" />
              <span className="font-komutt text-[11px] sm:text-xs md:text-sm tracking-wider bg-gradient-to-r from-rose-100 via-rose-200 to-amber-200 bg-clip-text text-transparent">
                សិរីសួស្តីអាពាហ៍ពិពាហ៍អភិជន
              </span>
              <span className="w-1.5 h-1.5 rotate-45 bg-rose-300" />
            </div>
          </div>

          {/* Names in Kh Ang Komutt */}
          <div className="my-auto space-y-2.5 sm:space-y-3">
            <h1 className="font-komutt text-2xl sm:text-3xl md:text-4xl bg-gradient-to-b from-[#FFF5F2] via-[#F5D0C5] to-[#E0A899] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {groomName}
            </h1>
            <div className="flex items-center justify-center gap-2.5 my-0.5 sm:my-1">
              <div className="h-[1px] w-10 sm:w-12 bg-gradient-to-r from-transparent to-rose-300" />
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-rose-950/80 border border-rose-400/60 flex items-center justify-center shadow-[0_0_12px_rgba(224,168,153,0.5)]">
                <span className="font-serifTrad italic text-[11px] sm:text-xs font-bold text-rose-300">&</span>
              </div>
              <div className="h-[1px] w-10 sm:w-12 bg-gradient-to-l from-transparent to-rose-300" />
            </div>
            <h1 className="font-komutt text-2xl sm:text-3xl md:text-4xl bg-gradient-to-b from-[#FFF5F2] via-[#F5D0C5] to-[#E0A899] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              {brideName}
            </h1>
          </div>

          {/* Bottom Date */}
          <div className="mb-4">
            <p className="font-kantumruy text-sm text-rose-200/90 drop-shadow">
              {weddingDate}
            </p>
            <p className="font-komutt text-xs text-rose-300/80 tracking-wide mt-0.5">
              {weddingLocation}
            </p>
          </div>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="absolute inset-y-0 inset-x-2 z-30 flex items-center justify-between pointer-events-none">
          <button
            onClick={() => scrollToHero(Math.max(0, activeHeroIdx - 1))}
            disabled={activeHeroIdx === 0}
            className="w-8 h-8 rounded-full bg-black/50 text-rose-200 border border-rose-400/30 flex items-center justify-center backdrop-blur-md transition disabled:opacity-20 pointer-events-auto cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollToHero(Math.min(heroList.length - 1, activeHeroIdx + 1))}
            disabled={activeHeroIdx === heroList.length - 1}
            className="w-8 h-8 rounded-full bg-black/50 text-rose-200 border border-rose-400/30 flex items-center justify-center backdrop-blur-md transition disabled:opacity-20 pointer-events-auto cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. LIVE COUNTDOWN */}
      <section className="max-w-xl mx-auto px-4 -mt-7 relative z-30">
        <div className="bg-[#231215]/95 border border-rose-400/40 rounded-2xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.85)] backdrop-blur-md">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-xl bg-black/40 border border-rose-500/20">
              <span className="font-komutt text-2xl text-rose-200 block">{timeLeft.days}</span>
              <span className="text-[10px] text-rose-300/80 ">ថ្ងៃ</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-rose-500/20">
              <span className="font-komutt text-2xl text-rose-200 block">{timeLeft.hours}</span>
              <span className="text-[10px] text-rose-300/80 ">ម៉ោង</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-rose-500/20">
              <span className="font-komutt text-2xl text-rose-200 block">{timeLeft.minutes}</span>
              <span className="text-[10px] text-rose-300/80 ">នាទី</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-rose-500/20">
              <span className="font-komutt text-2xl text-rose-200 block animate-pulse">{timeLeft.seconds}</span>
              <span className="text-[10px] text-rose-300/80 ">វិនាទី</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FORMAL PARENTS & INVITATION */}
      <section className="max-w-xl mx-auto px-4 py-12 text-center">
        <div className="inline-block p-2 rounded-full bg-rose-500/10 border border-rose-400/30 mb-4">
          <Sparkles className="w-5 h-5 text-rose-300" />
        </div>
        <p className="font-komutt text-lg text-rose-300 mb-2">យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញ</p>
        <p className="text-xs text-rose-200/80 leading-relaxed max-w-md mx-auto mb-8">
          ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយទាំងអស់ អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យសិរីមង្គលក្នុងពិធីអាពាហ៍ពិពាហ៍កូនប្រុស-កូនស្រីរបស់យើងខ្ញុំ
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
          <div className="p-5 rounded-2xl bg-[#231215]/80 border border-rose-500/20 backdrop-blur-sm">
            <p className="text-[11px] font-semibold text-rose-300 mb-2">មាតាបិតាខាងកូនប្រុស</p>
            <p className="font-komutt text-base text-white font-bold">{groomFather}</p>
            <p className="font-komutt text-base text-white font-bold">{groomMother}</p>
            <div className="mt-3 pt-3 border-t border-rose-500/20">
              <p className="text-xs text-rose-300/90">កូនប្រុសនាម: <span className="font-bold text-rose-100">{groomName}</span></p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-[#231215]/80 border border-rose-500/20 backdrop-blur-sm">
            <p className="text-[11px] font-semibold text-rose-300 mb-2">មាតាបិតាខាងកូនស្រី</p>
            <p className="font-komutt text-base text-white font-bold">{brideFather}</p>
            <p className="font-komutt text-base text-white font-bold">{brideMother}</p>
            <div className="mt-3 pt-3 border-t border-rose-500/20">
              <p className="text-xs text-rose-300/90">កូនស្រីនាម: <span className="font-bold text-rose-100">{brideName}</span></p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALENDAR & ADD TO CALENDAR */}
      <section className="max-w-xl mx-auto px-4 py-6">
        <div className="p-6 rounded-3xl bg-[#231215]/90 border border-rose-500/30 text-center space-y-4">
          <div className="text-xs font-bold text-rose-300 uppercase tracking-widest font-mono">
            NOVEMBER 2026 • ខែវិច្ឆិកា
          </div>
          <div className="grid grid-cols-7 gap-1 text-[11px] text-rose-400/60 mb-2 font-mono">
            <span>អា</span><span>ច</span><span>អ</span><span>ពុ</span><span>ព្រ</span><span>សុ</span><span>ស</span>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {/* Nov 1, 2026 is Sunday, so 0 leading empty slots */}
            <span className="p-1.5 text-rose-300/40">1</span>
            <span className="p-1.5 text-rose-300/40">2</span>
            <span className="p-1.5 text-rose-300/40">3</span>
            <span className="p-1.5 text-rose-300/40">4</span>
            <span className="p-1.5 text-rose-300/40">5</span>
            <span className="p-1.5 text-rose-300/40">6</span>
            <span className="p-1.5 text-rose-300/40">7</span>
            <span className="p-1.5 text-rose-300/40">8</span>
            <span className="p-1.5 text-rose-300/40">9</span>
            <span className="p-1.5 text-rose-300/40">10</span>
            <span className="p-1.5 text-rose-300/40">11</span>
            <span className="p-1.5 text-rose-300/40">12</span>
            <span className="p-1.5 text-rose-300/40">13</span>
            <span className="p-1.5 text-rose-300/40">14</span>
            <span className="p-1.5 text-rose-300/40">15</span>
            <span className="p-1.5 text-rose-300/40">16</span>
            <span className="p-1.5 text-rose-300/40">17</span>
            <span className="p-1.5 text-rose-300/40">18</span>
            <span className="p-1.5 text-rose-300/40">19</span>
            <span className="p-1.5 text-rose-300/40">20</span>
            <span className="p-1.5 text-rose-300/40">21</span>
            <span className="p-1.5 text-rose-300/40">22</span>
            <span className="p-1.5 text-rose-300/40">23</span>
            <span className="p-1.5 text-rose-300/40">24</span>
            <span className="p-1.5 text-rose-300/40">25</span>
            <span className="p-1.5 text-rose-300/40">26</span>
            <span className="p-1.5 text-rose-300/40">27</span>
            {/* Wedding Day: 28 */}
            <span className="p-1.5 rounded-full bg-gradient-to-r from-rose-400 to-amber-500 text-stone-950 font-bold shadow-[0_0_12px_rgba(244,63,94,0.7)] animate-pulse">
              28
            </span>
            <span className="p-1.5 text-rose-300/40">29</span>
            <span className="p-1.5 text-rose-300/40">30</span>
          </div>
          <div>
            <button
              onClick={downloadCalendarEvent}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-rose-400 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>កត់ត្រាទុកក្នុងប្រតិទិន (Add to Calendar)</span>
              <Download className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. COMPLETE 7 CEREMONY PROGRAMS */}
      <section className="max-w-xl mx-auto px-4 py-8">
        <h2 className="font-komutt text-2xl text-center text-rose-200 mb-2">កាលវិភាគពិធីមង្គលការពេញលេញ</h2>
        <p className="text-xs text-center text-rose-300/70 mb-6">
          កម្មវិធីសិរីមង្គលអាពាហ៍ពិពាហ៍តាមទំនៀមទម្លាប់ប្រពៃណីខ្មែរ និងរាត្រីសមោសរ
        </p>
        <div className="space-y-3">
          {ceremonyPrograms.map((prog) => (
            <div
              key={prog.num}
              className="p-4 rounded-2xl bg-[#231215]/80 border border-rose-500/25 flex items-start gap-3.5 hover:border-rose-400/50 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-rose-500/15 border border-rose-400/40 flex items-center justify-center shrink-0 text-rose-300 font-bold text-xs">
                {prog.num}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-md border border-rose-400/30">
                    {prog.time}
                  </span>
                </div>
                <h3 className="font-komutt text-sm font-bold text-white mt-1">{prog.title}</h3>
                <p className="text-xs text-rose-200/70 mt-0.5">{prog.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. GRATITUDE & LOCATION DISPLAY */}
      <section className="max-w-xl mx-auto px-4 py-8 space-y-6">
        <TemplateGratitudeNote isDark={true} accentColor="#fb7185" fontFamily="font-komutt" />
        <TemplateGoogleMap
          locationName={weddingLocation}
          address={locationAddress}
          googleMapsUrl={googleMapsUrl}
          isDark={true}
          accentColor="#fb7185"
          fontFamily="font-komutt"
        /></section>

      {/* 7. PHOTO GALLERY */}
      <section className="max-w-xl mx-auto px-4 py-8">
        <h2 className="font-komutt text-2xl text-center text-rose-200 mb-2">កម្រងរូបភាពអនុស្សាវរីយ៍ Pre-Wedding</h2>
        <p className="text-xs text-center text-rose-300/70 mb-6">
          រូបភាពនៃសេចក្តីស្រឡាញ់ដ៏ស្មោះស្ម័គ្រ និងអនុស្សាវរីយ៍ដ៏មានតម្លៃ
        </p>
        <div className="grid grid-cols-2 gap-3">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo.src)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-rose-500/20"
            >
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" decoding="async" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <p className="text-[11px] text-white font-medium line-clamp-1">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={selectedPhoto}
            alt="Preview"
            className="max-w-full max-h-[85vh] rounded-2xl object-contain border border-rose-500/30 shadow-2xl" decoding="async" />
        </div>
      )}

      {/* 8. DIGITAL GIFT (MULTI-BANK MODAL) */}
      <section className="max-w-xl mx-auto px-4 py-8 text-center">
        <div className="p-6 rounded-3xl bg-[#231215]/80 border border-rose-500/30">
          <Gift className="w-8 h-8 text-rose-300 mx-auto mb-2" />
          <h2 className="font-komutt text-xl text-rose-200 mb-1">ចំណងដៃឌីជីថល (Digital Gift)</h2>
          <p className="text-xs text-rose-200/80 mb-4 max-w-sm mx-auto">
            សម្រាប់ភ្ញៀវកិត្តិយសដែលមានបំណងចងដៃតាមរយៈគណនីធនាគារ (ABA / ACLEDA) អាចធ្វើការស្កេន QR Code ខាងក្រោម
          </p>
          <button
            onClick={() => setShowGiftModal(true)}
            className="px-6 py-2.5 rounded-full bg-rose-500/20 border border-rose-400/50 text-rose-200 text-xs font-bold hover:bg-rose-500/30 transition-all cursor-pointer"
          >
            បង្ហាញ QR Code ធនាគារ
          </button>
        </div>
      </section>

      {/* Gift Modal */}
      {showGiftModal && (
        <div
          onClick={() => setShowGiftModal(false)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-xs w-full p-6 rounded-3xl bg-[#231215] border border-rose-400/50 text-center relative shadow-2xl"
          >
            <button
              onClick={() => setShowGiftModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 text-rose-200"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-komutt text-lg text-rose-100 mb-3">ស្កេនដើម្បីចងដៃមង្គលការ</h3>

            <div className="flex justify-center gap-2 mb-3">
              <button
                onClick={() => setActiveBankTab('aba')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activeBankTab === 'aba' ? 'bg-rose-500 text-white' : 'bg-stone-800 text-rose-300'
                }`}
              >
                ABA Bank
              </button>
              <button
                onClick={() => setActiveBankTab('acleda')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  activeBankTab === 'acleda' ? 'bg-rose-500 text-white' : 'bg-stone-800 text-rose-300'
                }`}
              >
                ACLEDA Bank
              </button>
            </div>

            <div className="p-3 bg-white rounded-2xl inline-block mb-3 shadow-inner">
              {qrCodeImage ? (
                <img
                  src={qrCodeImage}
                  alt="Bank QR"
                  className="w-44 h-44 object-contain" decoding="async" loading="lazy" />
              ) : (
                <img
                  src={
                    activeBankTab === 'aba'
                      ? '/images/aba_qr.webp'
                      : 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ACLEDA654321098'
                  }
                  alt="Bank QR"
                  className="w-40 h-40 object-contain" decoding="async" loading="lazy" />
              )}
            </div>
            <p className="text-xs font-bold text-white">{accountName}</p>
            <p className="font-mono text-xs text-rose-300 mt-0.5">
              {bankName}: {accountNumber}
            </p>
            <button
              onClick={() => {
                const raw = accountNumber.replace(/\s+/g, '');
                navigator.clipboard.writeText(raw);
                setCopiedBank(true);
                setTimeout(() => setCopiedBank(false), 2000);
              }}
              className="mt-3 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-200 text-xs font-semibold flex items-center gap-1.5 mx-auto cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedBank ? 'បានចម្លង!' : 'ចម្លងលេខកុង'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 9. RSVP FORM */}
      <section className="max-w-xl mx-auto px-4 py-8">
        <div className="p-6 rounded-3xl bg-[#231215]/90 border border-rose-500/30">
          <div className="text-center mb-4">
            <UserCheck className="w-8 h-8 text-rose-300 mx-auto mb-1" />
            <h2 className="font-komutt text-2xl text-rose-200">ការឆ្លើយតបការចូលរួម (RSVP)</h2>
            <p className="text-xs text-rose-200/70 mt-1">
              សូមមេត្តាឆ្លើយតបមុនថ្ងៃទី ១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦ ដើម្បីជួយសម្រួលដល់ការរៀបចំតុអាហារ
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-400/40 text-center space-y-2">
              <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-komutt text-base font-bold text-white">អរគុណសម្រាប់ការឆ្លើយតប!</h3>
              <p className="text-xs text-rose-200/80">យើងខ្ញុំពិតជារំភើប និងទន្ទឹងរង់ចាំវត្តមានដ៏ខ្ពង់ខ្ពស់របស់អ្នក។</p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs text-rose-300 mb-1">គោត្តនាម និងនាម</label>
                <input
                  type="text"
                  required
                  value={rsvpState.name}
                  onChange={(e) => setRsvpState({ ...rsvpState, name: e.target.value })}
                  placeholder="ឧ. ហេង វិសាល"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-white text-xs focus:outline-none focus:border-rose-400"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-rose-300 mb-1">លេខទូរស័ព្ទ</label>
                  <input
                    type="tel"
                    value={rsvpState.phone}
                    onChange={(e) => setRsvpState({ ...rsvpState, phone: e.target.value })}
                    placeholder="012 345 678"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-white text-xs focus:outline-none focus:border-rose-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-rose-300 mb-1">ចំនួនភ្ញៀវ</label>
                  <select
                    value={rsvpState.guests}
                    onChange={(e) => setRsvpState({ ...rsvpState, guests: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-rose-500/30 text-white text-xs focus:outline-none focus:border-rose-400"
                  >
                    <option value={1} className="bg-stone-900">១ នាក់</option>
                    <option value={2} className="bg-stone-900">២ នាក់</option>
                    <option value={3} className="bg-stone-900">៣ នាក់</option>
                    <option value={4} className="bg-stone-900">៤ នាក់ (គ្រួសារ)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-rose-300 mb-1">ការចូលរួម</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRsvpState({ ...rsvpState, attendance: 'attending' })}
                    className={`py-2 rounded-xl text-xs font-semibold border transition ${
                      rsvpState.attendance === 'attending'
                        ? 'bg-rose-500/30 border-rose-400 text-white'
                        : 'bg-black/30 border-rose-500/20 text-rose-300/60'
                    }`}
                  >
                    ចូលរួមប្រាកដ
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpState({ ...rsvpState, attendance: 'declined' })}
                    className={`py-2 rounded-xl text-xs font-semibold border transition ${
                      rsvpState.attendance === 'declined'
                        ? 'bg-rose-500/30 border-rose-400 text-white'
                        : 'bg-black/30 border-rose-500/20 text-rose-300/60'
                    }`}
                  >
                    សោកស្តាយ អវត្តមាន
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-amber-400 text-stone-950 font-bold text-xs shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer"
              >
                បញ្ជាក់ការឆ្លើយតប
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 10. WISHES GUESTBOOK */}
      <section className="max-w-xl mx-auto px-4 py-8 pb-20">
        <h2 className="font-komutt text-2xl text-center text-rose-200 mb-2">សៀវភៅជូនពរ (Guestbook)</h2>
        <form onSubmit={handleWishSubmit} className="mb-6 p-4 rounded-2xl bg-[#231215]/80 border border-rose-500/30 space-y-2.5">
          <input
            type="text"
            required
            placeholder="ឈ្មោះរបស់អ្នក"
            value={newWish.name}
            onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-rose-500/30 text-white text-xs focus:outline-none focus:border-rose-400"
          />
          <textarea
            required
            rows={3}
            placeholder="សរសេរពាក្យជូនពរ..."
            value={newWish.text}
            onChange={(e) => setNewWish({ ...newWish, text: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-rose-500/30 text-white text-xs focus:outline-none focus:border-rose-400 resize-none"
          />
          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-rose-500/20 border border-rose-400/50 text-rose-200 text-xs font-bold hover:bg-rose-500/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ផ្ញើសារជូនពរ</span>
          </button>
        </form>

        <div className="space-y-3">
          {wishes.map((w) => (
            <div key={w.id} className="p-4 rounded-2xl bg-[#231215]/60 border border-rose-500/20">
              <div className="flex justify-between items-center mb-1">
                <span className="font-komutt text-xs font-bold text-rose-200">{w.name}</span>
                <span className="text-[10px] text-rose-300/60">{w.date}</span>
              </div>
              <p className="text-xs text-rose-100/90 leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 11. CONTACT HOSTS */}
      <section className="max-w-xl mx-auto px-4 py-6 text-center">
        <div className="p-6 rounded-3xl bg-[#231215]/80 border border-rose-500/30 space-y-4">
          <h2 className="font-komutt text-2xl text-rose-200">ទំនាក់ទំនងម្ចាស់ពិធីមង្គល</h2>
          <p className="text-xs text-rose-200/80 max-w-sm mx-auto">
            ប្រសិនបើលោកអ្នកត្រូវការការណែនាំផ្លូវ ឬមានសំណួរផ្សេងៗ សូមទំនាក់ទំនងមកកាន់យើងខ្ញុំ៖
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <a
              href={`tel:${phoneGroom}`}
              className="py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-rose-400" />
              <span>ខាងកូនប្រុស៖ {phoneGroom}</span>
            </a>
            <a
              href={`tel:${phoneBride}`}
              className="py-2.5 px-4 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <Phone className="w-4 h-4 text-rose-400" />
              <span>ខាងកូនស្រី៖ {phoneBride}</span>
            </a>
            {telegramLink && (
              <a
                href={telegramLink.startsWith('http') ? telegramLink : `https://t.me/${telegramLink}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#229ED9]/30 hover:bg-[#229ED9]/50 text-white text-xs font-bold flex items-center justify-center gap-2 transition sm:col-span-2"
              >
                <MessageCircle className="w-4 h-4 text-[#229ED9]" />
                <span>Telegram ម្ចាស់ដើមការ</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-rose-500/20 text-xs text-rose-300/70">
        <p className="font-komutt text-xs text-rose-200 font-bold">សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍អភិជន</p>
        <p className="text-[10px] mt-1 text-rose-400/50">Designed with love by Theab Digital</p>
      </footer>
    </div>
  );
}

export default ModernRoseGoldRoyaleTemplate;
