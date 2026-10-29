import React, { useState, useEffect, useRef } from 'react';
import { useTemplateAudio } from '../../../utils/useTemplateAudio';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Send,
  Sparkles,
  CheckCircle2,
  Gem,
  Award,
  QrCode,
  Copy,
  Check,
  Share2,
  Phone,
  MessageCircle,
  ArrowUp,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Volume2,
  VolumeX
} from 'lucide-react';
import { FlyingHeartsAndFlowers } from '../../FlyingHeartsAndFlowers';

export function EmeraldRadiantDiamondTemplate({ data = {}, invitationData = {}, invitation = {}, activeTemplate = {} }) {
  // Isolated template audio («ភ្ជាប់និស្ស័យ» - NISAI)
  const { isPlaying, toggleAudio } = useTemplateAudio();

  const groom = data.groomName || invitation.groomName || invitationData.groomName || activeTemplate?.demoGroom || 'ជា វឌ្ឍនៈ';
  const bride = data.brideName || invitation.brideName || invitationData.brideName || activeTemplate?.demoBride || 'ម៉េង សុភ័ក្ត្រា';
  
  const groomFather = data.groomFather || invitation?.groomParents?.father || 'លោក ហេង វណ្ណា';
  const groomMother = data.groomMother || invitation?.groomParents?.mother || 'អ្នកស្រី គីម ស្រ៊ុន';
  const brideFather = data.brideFather || invitation?.brideParents?.father || 'លោក កែវ សម្បត្តិ';
  const brideMother = data.brideMother || invitation?.brideParents?.mother || 'អ្នកស្រី សុខ ហៀង';
  
  const dateStr = data.ceremonyDate || invitation?.weddingDate || invitationData.ceremonyDate || activeTemplate?.demoDate || 'ថ្ងៃសៅរ៍ ទី១២ ខែធ្នូ ឆ្នាំ២០២៦';
  const locationStr = data.ceremonyLocation || invitation?.weddingLocation || invitationData.ceremonyLocation || activeTemplate?.demoLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const addressStr = data.locationAddress || data.ceremonyAddress || invitation?.locationAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const mapsUrl = data.googleMapsUrl || invitation?.googleMapsUrl || 'https://maps.app.goo.gl/gmxb8VaN78xgkFiu5';

  // Bank & Gift
  const bankName = data.bankName || invitation?.bankName || 'ABA PAY / BAKONG';
  const accountName = data.accountName || invitation?.accountName || `${groom} & ${bride}`;
  const accountNumber = data.accountNumber || invitation?.accountNumber || '012 345 678';
  const qrCodeImage = data.qrCodeImage || invitation?.qrCodeImage || null;

  // Host Contacts
  const phoneGroom = data.hostPhoneGroom || data.phoneGroom || invitation?.hostPhoneGroom || '012 345 678';
  const phoneBride = data.hostPhoneBride || data.phoneBride || invitation?.hostPhoneBride || '098 765 432';
  const telegramLink = data.telegramLink || invitation?.telegramLink || 'https://t.me';

  // 5 Hero Prewedding Images of Khmer Couples in Haute Joaillerie Sapphire & Radiant Diamond Wedding Couture
  const heroList = (data.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : [
        data.bgImage || '/images/templates/emerald_diamond_prewedding.jpg',
        '/images/templates/emerald-diamond/diamond_1.jpg',
        '/images/templates/emerald-diamond/diamond_2.jpg',
        '/images/templates/emerald-diamond/diamond_4.jpg',
        '/images/templates/emerald-diamond/diamond_5.jpg'
      ];

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

  const [copiedAccount, setCopiedAccount] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  // Live countdown to target wedding date
  const [timeLeft, setTimeLeft] = useState({ days: 790, hours: 19, minutes: 2, seconds: 5 });

  useEffect(() => {
    const targetDate = new Date('2028-12-18T08:00:00+07:00').getTime();
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

  // 6 Prewedding Gallery Photos in Haute Joaillerie Showcase
  const galleryPhotos = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : [
        { id: 1, src: '/images/templates/emerald_diamond_prewedding.jpg', caption: 'រស្មីពេជ្រចិន្តាត្បូងមរកត' },
        { id: 2, src: '/images/templates/emerald-diamond/diamond_1.jpg', caption: 'វិមានអភិជន Haute Joaillerie' },
        { id: 3, src: '/images/templates/emerald-diamond/diamond_2.jpg', caption: 'សេចក្តីស្នេហាចែងចាំងអស់កាលជានិច្ច' },
        { id: 4, src: '/images/templates/emerald-diamond/diamond_4.jpg', caption: 'កេរដំណែលត្បូងមរកតចរណៃ' },
        { id: 5, src: '/images/templates/emerald-diamond/diamond_5.jpg', caption: 'ចិញ្ចៀនពេជ្រសច្ចាស្នេហ៍ជានិរន្តរ៍' },
        { id: 6, src: '/images/templates/modern_luxury_prewedding.jpg', caption: 'ភាពស៊ីវិល័យកម្រិតកំពូល' }
      ];

  // 7 Haute Joaillerie Ceremony Milestones
  const ceremonyPrograms = (data.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { num: 1, time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
        { num: 2, time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យ' },
        { num: 3, time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍' },
        { num: 4, time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរី' },
        { num: 5, time: '១០:០០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
        { num: 6, time: '១២:០០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់' },
        { num: 7, time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស' }
      ];

  // Wishes state
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'លោកជំទាវ ចាន់ ស្រីពៅ',
      text: 'សូមជូនពរឱ្យចំណងអាពាហ៍ពិពាហ៍របស់អ្នកទាំងពីរ ភ្លឺរស្មីចែងចាំងដូចគ្រាប់ពេជ្រ និងមានតម្លៃឥតគណនាដូចត្បូងមរកត!',
      time: '២ ម៉ោងមុន'
    },
    {
      id: 2,
      name: 'កញ្ញា ម៉ៅ រតនា',
      text: 'Congratulations to the most radiant couple! May your love shine bright forever!',
      time: '៥ ម៉ោងមុន'
    }
  ]);
  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [guestSubmitted, setGuestSubmitted] = useState(false);

  // RSVP state
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState('yes');
  const [rsvpCount, setRsvpCount] = useState('1 នាក់');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const handleAddWish = (e) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    setWishes([
      { id: Date.now(), name: guestName.trim(), text: guestMessage.trim(), time: 'ទើបតែផ្ញើ' },
      ...wishes
    ]);
    setGuestName('');
    setGuestMessage('');
    setGuestSubmitted(true);
    setTimeout(() => setGuestSubmitted(false), 4000);
  };

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
    setTimeout(() => setRsvpSubmitted(false), 4000);
  };

  const copyBankInfo = () => {
    navigator.clipboard?.writeText((accountNumber || '').replace(/\s+/g, ''));
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Octagonal Emerald-Cut Chamfered Polygon Clip-Path Style Helper
  const emeraldCutStyle = {
    clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)'
  };

  return (
    /* Unified Single Root Container (No nested outer wrapper) */
    <div className="w-full min-h-full relative pb-16 bg-gradient-to-b from-[#052638] via-[#021824] to-[#042436] text-stone-100 font-suwannaphum overflow-hidden select-none">
      {/* Prismatic Cyan, Ice Diamond & Sapphire Facet Aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[550px] bg-gradient-to-b from-sky-400/20 via-cyan-600/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-28 w-96 h-96 rounded-full bg-sky-500/10 blur-[110px] pointer-events-none" />
      <div className="absolute top-2/3 -right-28 w-96 h-96 rounded-full bg-cyan-400/15 blur-[120px] pointer-events-none" />

      {/* Floating Sparkles & Hearts */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <FlyingHeartsAndFlowers count={8} />
      </div>

      {/* =========================================================================
          1. HAUTE JOAILLERIE HERO (5 KHMER COUPLE IMAGES & KH ANG KOMUTT B FONT)
          ========================================================================= */}
      <section className="relative w-full aspect-[3/4] overflow-hidden bg-black border-b-2 border-cyan-400/50 select-none">
        {/* Snap-scroll 5 Images Carousel */}
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
                alt={`Haute Joaillerie Khmer Couple ${idx + 1}`}
                className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.08]"
                loading={idx === 0 ? 'eager' : 'lazy'} decoding="async" />
              {/* Haute Joaillerie Prismatic Sapphire Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#021824] via-[#021824]/40 to-black/35 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stationary Centered Typography Directly on Photo (Kh Ang Komutt B Font, Scaled for mobile readability, frameless) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="space-y-2.5 sm:space-y-3 w-full max-w-md mx-auto px-2 sm:px-4">
            {/* Top Haute Joaillerie Brand Accent */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-cyan-300" />
              <span className="font-sans text-[10px] sm:text-xs tracking-[0.35em] text-cyan-200 font-semibold uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                ✦ HAUTE JOAILLERIE ✦
              </span>
              <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-cyan-300" />
            </div>

            {/* Groom Name in Kh Ang Komutt B Font */}
            <div className="font-komutt text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-relaxed">
              {groom}
            </div>

            {/* Central Diamond Facet Connector */}
            <div className="flex items-center justify-center gap-2.5 my-0.5 sm:my-1">
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-12 bg-gradient-to-r from-transparent via-cyan-300 to-amber-300 drop-shadow"></div>
              <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rotate-45 border border-cyan-300/80 bg-cyan-950/80 shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                <Gem className="-rotate-45 w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-200 fill-cyan-400/30" />
              </div>
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-12 bg-gradient-to-l from-transparent via-cyan-300 to-amber-300 drop-shadow"></div>
            </div>

            {/* Bride Name in Kh Ang Komutt B Font */}
            <div className="font-komutt text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-relaxed">
              {bride}
            </div>

            {/* Wedding Ceremony Date */}
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-cyan-200 font-medium tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {dateStr}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Arrows in Diamond-Cut Facet Style */}
        {heroList.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => scrollToHero(Math.max(0, activeHeroIdx - 1))}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg rotate-45 bg-black/60 hover:bg-black/90 border border-cyan-400/70 text-cyan-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="-rotate-45 w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToHero(Math.min(heroList.length - 1, activeHeroIdx + 1))}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-lg rotate-45 bg-black/60 hover:bg-black/90 border border-cyan-400/70 text-cyan-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronRight className="-rotate-45 w-4 h-4" />
            </button>
          </>
        )}

        {/* Carousel Indicator Dots in Diamond Shape */}
        {heroList.length > 1 && (
          <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center items-center gap-2 pointer-events-none">
            {heroList.map((_, idx) => (
              <div
                key={idx}
                className={`transition-all duration-300 ${
                  activeHeroIdx === idx
                    ? 'w-3 h-3 rotate-45 bg-gradient-to-r from-cyan-300 to-amber-300 shadow-[0_0_10px_#38BDF8]'
                    : 'w-2 h-2 rotate-45 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* =========================================================================
          2. ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ (DUAL CARDS DIRECTLY, NO NESTED CONTAINER)
          ========================================================================= */}
      <section className="px-5 py-7 text-center">
        <div className="inline-flex items-center gap-2 mb-1 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs shadow-inner">
          <Gem className="w-3.5 h-3.5" />
          <span className="font-sans tracking-widest text-[10px] uppercase font-bold">HAUTE JOAILLERIE HEIRLOOM</span>
        </div>

        <h2 className="font-komutt text-lg sm:text-xl text-amber-300 tracking-wide mt-1 mb-1">
          ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
        </h2>

        <div className="flex items-center justify-center gap-2 my-2">
          <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-cyan-300 to-amber-300" />
          <span className="text-cyan-300 text-xs">✦ 💎 ✦</span>
          <div className="h-[1px] w-14 bg-gradient-to-l from-transparent via-cyan-300 to-amber-300" />
        </div>

        {/* Direct Side-by-Side Cards (No outer enclosing container) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center mt-4">
          {/* Groom's Parents Presentation Case */}
          <div
            style={emeraldCutStyle}
            className="p-5 bg-gradient-to-b from-[#07364C] via-[#032333] to-[#021A26] border-2 border-cyan-400/50 shadow-[0_10px_30px_rgba(2,26,38,0.7)] relative"
          >
            <div className="text-amber-300 text-xs font-bold font-komutt mb-1 flex items-center justify-center gap-1.5">
              <span className="text-[10px]">✦</span>
              <span>ឪពុកម្ដាយខាងកូនកំលោះ</span>
              <span className="text-[10px]">✦</span>
            </div>
            <p className="font-komutt text-base text-white leading-relaxed mt-2 drop-shadow">
              {groomFather}
            </p>
            <p className="font-komutt text-base text-white leading-relaxed drop-shadow">
              {groomMother}
            </p>
            <div className="mt-2 text-xs text-cyan-300 font-medium">
              កូនប្រុសនាម៖ <span className="text-amber-200 font-komutt font-bold">{groom}</span>
            </div>
          </div>

          {/* Bride's Parents Presentation Case */}
          <div
            style={emeraldCutStyle}
            className="p-5 bg-gradient-to-b from-[#07364C] via-[#032333] to-[#021A26] border-2 border-cyan-400/50 shadow-[0_10px_30px_rgba(2,26,38,0.7)] relative"
          >
            <div className="text-amber-300 text-xs font-bold font-komutt mb-1 flex items-center justify-center gap-1.5">
              <span className="text-[10px]">✦</span>
              <span>ឪពុកម្ដាយខាងកូនក្រមុំ</span>
              <span className="text-[10px]">✦</span>
            </div>
            <p className="font-komutt text-base text-white leading-relaxed mt-2 drop-shadow">
              {brideFather}
            </p>
            <p className="font-komutt text-base text-white leading-relaxed drop-shadow">
              {brideMother}
            </p>
            <div className="mt-2 text-xs text-cyan-300 font-medium">
              កូនស្រីនាម៖ <span className="text-amber-200 font-komutt font-bold">{bride}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ប្រតិទិន & រាប់ថយក្រោយ (CALENDAR & COUNTDOWN)
          ========================================================================= */}
      <section className="px-5 py-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-amber-300" />
          <h2 className="font-komutt text-base sm:text-lg text-amber-300 tracking-wide">
            ប្រតិទិន
          </h2>
        </div>

        {/* Diamond Cut Calendar Matrix */}
        <div
          style={emeraldCutStyle}
          className="p-5 bg-gradient-to-b from-[#07354A] via-[#032231] to-[#021925] border-2 border-cyan-400/50 shadow-xl w-full mb-5"
        >
          <div className="text-center font-bold text-amber-200 text-sm mb-3 tracking-widest font-mono">
            DECEMBER 2028
          </div>

          {/* Days Header */}
          <div className="grid grid-cols-7 gap-1 text-[11px] font-bold text-cyan-300/80 pb-2 mb-2 border-b border-cyan-500/30">
            <span className="text-rose-400">S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span className="text-rose-400">S</span>
          </div>

          {/* Days Grid 1..31 */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="p-1.5 rounded text-stone-300">1</span>
            <span className="p-1.5 rounded text-rose-400">2</span>

            {[...Array(29)].map((_, idx) => {
              const dayNum = idx + 3;
              const isWeddingDay = dayNum === 18;
              return (
                <div
                  key={dayNum}
                  className={`p-1.5 flex items-center justify-center font-medium ${
                    isWeddingDay
                      ? 'bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-400 text-stone-950 font-bold ring-2 ring-amber-300 shadow-[0_0_12px_#38BDF8] scale-110 font-mono font-bold'
                      : 'text-stone-200'
                  }`}
                >
                  {dayNum}
                </div>
              );
            })}
          </div>
        </div>

        {/* Countdown Hub */}
        <div
          style={emeraldCutStyle}
          className="p-5 bg-gradient-to-b from-[#063044] via-[#031E2C] to-[#021622] border border-cyan-400/50 shadow-xl w-full"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            <h3 className="font-komutt text-sm sm:text-base text-cyan-200">
              រាប់ថយក្រោយ
            </h3>
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="p-2.5 rounded-xl bg-black/60 border border-cyan-400/30 flex flex-col items-center">
              <span className="font-mono font-bold text-xl sm:text-2xl text-amber-300">{timeLeft.days}</span>
              <span className="text-[10px] text-cyan-200 mt-0.5 font-bold">ថ្ងៃ</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/60 border border-cyan-400/30 flex flex-col items-center">
              <span className="font-mono font-bold text-xl sm:text-2xl text-amber-300">{timeLeft.hours}</span>
              <span className="text-[10px] text-cyan-200 mt-0.5 font-bold">ម៉ោង</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/60 border border-cyan-400/30 flex flex-col items-center">
              <span className="font-mono font-bold text-xl sm:text-2xl text-amber-300">{timeLeft.minutes}</span>
              <span className="text-[10px] text-cyan-200 mt-0.5 font-bold">នាទី</span>
            </div>
            <div className="p-2.5 rounded-xl bg-black/60 border border-cyan-400/30 flex flex-col items-center">
              <span className="font-mono font-bold text-xl sm:text-2xl text-amber-300">{timeLeft.seconds}</span>
              <span className="text-[10px] text-cyan-200 mt-0.5 font-bold">វិនាទី</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('បានបន្ថែមទៅក្នុងប្រតិទិនដោយជោគជ័យ!')}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-600 text-white font-komutt text-xs font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/60"
          >
            <Calendar className="w-4 h-4 text-amber-200" />
            <span>Add to Calendar (បញ្ចូលក្នុងប្រតិទិន)</span>
          </button>
        </div>
      </section>

      {/* =========================================================================
          4. កម្មពិធីសិរីសួស្ដី (HAUTE JOAILLERIE 7-FACET MILESTONE CHAIN)
          ========================================================================= */}
      <section className="px-5 py-6">
        <div className="text-center mb-5">
          <h2 className="font-komutt text-base sm:text-lg text-amber-300 tracking-wide">
            កម្មពិធីសិរីសួស្ដី
          </h2>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-300 to-amber-300" />
            <Clock className="w-3.5 h-3.5 text-cyan-300" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-cyan-300 to-amber-300" />
          </div>
        </div>

        <div className="space-y-3 w-full">
          {ceremonyPrograms.map((p) => (
            <div
              key={p.num}
              style={emeraldCutStyle}
              className="flex items-center gap-3.5 p-3.5 bg-gradient-to-r from-[#063347] via-[#032130] to-[#063347] border border-cyan-400/40 shadow-md"
            >
              <div className="w-8 h-8 rotate-45 bg-cyan-950 border border-amber-300 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                <span className="-rotate-45">{p.num}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-komutt text-xs sm:text-sm text-white leading-snug drop-shadow">
                  {p.title}
                </h4>
              </div>
              <div className="px-2.5 py-1 bg-black/60 border border-cyan-400/50 text-[11px] text-amber-200 font-mono shrink-0">
                {p.time}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. អរគុណ & អធ្យាស្រ័យ (HIGH JEWELRY CERTIFICATE PROCLAMATION)
          ========================================================================= */}
      <section className="px-5 py-6 text-center">
        <div
          style={emeraldCutStyle}
          className="p-6 bg-gradient-to-b from-[#07384E] via-[#032332] to-[#021A26] border-2 border-cyan-400/50 shadow-2xl w-full relative overflow-hidden"
        >
          <div className="flex items-center justify-center gap-1.5 text-cyan-300 mb-1">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span className="text-[10px] font-mono tracking-widest uppercase">CERTIFICATE OF GRATITUDE</span>
          </div>
          <h2 className="font-komutt text-base sm:text-lg text-amber-300 mb-2">
            អរគុណ & អធ្យាស្រ័យ
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-amber-300 text-xs">✦</span>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-cyan-300 to-amber-300" />
            <span className="text-amber-300 text-xs">✦</span>
          </div>
          <p className="font-suwannaphum text-xs sm:text-sm text-cyan-100/90 italic leading-relaxed px-2">
            "យើងខ្ញុំ សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមាន ភ្ញៀវកិត្តិយសទាំងអស់ ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីនេះ។ ប្រសិនបើមានការខ្វះខាត ឬទទួលភ្ញៀវមិនបានដិតដល់ត្រង់ចំណុចណាមួយ សូមមេត្តាខន្តី និងអធ្យាស្រ័យដោយក្តីអនុគ្រោះ។"
          </p>
        </div>
      </section>

      {/* =========================================================================
          6. ទីតាំងពិធី (HAUTE JOAILLERIE VENUE SHOWCASE)
          ========================================================================= */}
      <section className="px-5 py-6">
        <div
          style={emeraldCutStyle}
          className="p-6 bg-gradient-to-b from-[#07354A] via-[#032130] to-[#021824] border-2 border-cyan-400/50 shadow-2xl text-center w-full"
        >
          <div className="w-12 h-12 mx-auto mb-2 rotate-45 bg-cyan-950/90 border border-amber-300 flex items-center justify-center shadow-lg">
            <MapPin className="-rotate-45 w-6 h-6 text-amber-300" />
          </div>
          <h2 className="font-komutt text-base sm:text-lg text-amber-300 mb-1 mt-1">
            ទីតាំងពិធី
          </h2>
          <p className="font-komutt text-sm sm:text-base text-white mt-2 leading-relaxed">
            {locationStr}
          </p>
          <p className="font-suwannaphum text-xs text-cyan-200/90 mt-1 mb-4 leading-relaxed">
            {addressStr}
          </p>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-600 text-white font-komutt text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all border border-amber-300/60"
          >
            <ExternalLink className="w-4 h-4 text-amber-200" />
            <span>Link ទៅកាន់ Google Maps</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
          7. រូបថតអនុស្សារីយ៍ (HAUTE JOAILLERIE 6-PHOTO SHOWCASE)
          ========================================================================= */}
      <section className="px-5 py-6">
        <div className="text-center mb-5">
          <h2 className="font-komutt text-base sm:text-lg text-amber-300 tracking-wide">
            រូបថតអនុស្សារីយ៍
          </h2>
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-cyan-300 to-amber-300" />
            <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-cyan-300 to-amber-300" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3.5 w-full">
          {galleryPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo.src)}
              style={emeraldCutStyle}
              className="group cursor-pointer p-2 bg-black/60 border border-cyan-400/40 hover:border-amber-300 transition-all duration-300 shadow-md"
            >
              <div className="aspect-[4/5] overflow-hidden bg-black relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" decoding="async" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <span className="text-[10px] text-amber-200 font-bold font-komutt">ចុចដើម្បីមើលរូបធំ ✦</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="font-komutt text-[11px] text-cyan-100 truncate">
                  {photo.caption}
                </p>
                <span className="text-[9px] text-amber-300/80 font-bold block mt-0.5">
                  ចុចដើម្បីមើលរូបធំ ✦
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          8. ជូនចំណងដៃ (HAUTE JOAILLERIE VIP DIAMOND PASS & AUTHENTICITY CARD)
          ========================================================================= */}
      <section className="px-5 py-6">
        <div
          style={emeraldCutStyle}
          className="p-6 bg-gradient-to-b from-[#07374D] via-[#032131] to-[#021723] border-2 border-cyan-400/60 shadow-2xl text-center w-full relative overflow-hidden"
        >
          {/* Holographic Diamond Pass Header */}
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 pb-2 mb-2 border-b border-cyan-500/30">
            <span className="tracking-widest">VIP DIAMOND PASS</span>
            <span className="text-amber-300">#VIP-EMERALD-8899</span>
          </div>

          <h2 className="font-komutt text-base sm:text-lg text-amber-300 mb-1">
            ជូនចំណងដៃ
          </h2>
          <p className="font-komutt text-sm sm:text-base text-white mt-1">
            {groom} & {bride}
          </p>
          <div className="text-[11px] font-bold text-cyan-300 font-mono mt-1">
            {bankName}
          </div>

          <div
            onClick={() => setShowQrModal(true)}
            className="w-40 h-40 mx-auto my-3.5 p-2 bg-white shadow-xl flex items-center justify-center border-2 border-amber-300 cursor-pointer relative group"
          >
            {qrCodeImage ? (
              <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain" decoding="async" loading="lazy" />
            ) : (
              <QrCode className="w-32 h-32 text-stone-900" />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-[10px] text-white font-bold bg-black/70 px-2 py-1 rounded font-komutt">ចុចដើម្បីពង្រីក</span>
            </div>
          </div>

          <div className="text-xs text-amber-200 font-mono font-bold tracking-wider mb-1">
            {accountName}
          </div>
          <div className="text-xs text-stone-300 font-mono tracking-widest mb-3">
            {accountNumber} (USD / KHR)
          </div>

          <button
            type="button"
            onClick={copyBankInfo}
            className="w-full py-2.5 px-4 rounded-xl bg-black/70 hover:bg-black/90 border border-cyan-300/70 text-cyan-100 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 font-komutt"
          >
            {copiedAccount ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-komutt">បានចម្លងរួចរាល់!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-amber-300" />
                <span className="font-komutt">ចម្លងលេខគណនី</span>
              </>
            )}
          </button>
        </div>
      </section>

      {/* =========================================================================
          9. ការចូលរួម (HAUTE JOAILLERIE RSVP PASS)
          ========================================================================= */}
      <section className="px-5 py-6">
        <div
          style={emeraldCutStyle}
          className="p-6 bg-gradient-to-b from-[#07354A] via-[#03202F] to-[#021723] border-2 border-cyan-400/50 shadow-2xl w-full"
        >
          <h2 className="font-komutt text-base sm:text-lg text-amber-300 text-center mb-3">
            ការចូលរួម
          </h2>

          <form onSubmit={handleRsvpSubmit} className="space-y-3">
            <div>
              <label className="text-[11px] text-cyan-200 font-bold block mb-1">
                ឈ្មោះរបស់អ្នក (Your Name) *
              </label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="សូមបញ្ចូលឈ្មោះ..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-cyan-400/40 text-xs text-white placeholder-cyan-300/40 focus:outline-none focus:border-amber-300 font-suwannaphum"
              />
            </div>

            <div>
              <label className="text-[11px] text-cyan-200 font-bold block mb-1">
                តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRsvpAttending('yes')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition font-komutt ${
                    rsvpAttending === 'yes'
                      ? 'bg-cyan-600 border-amber-300 text-white'
                      : 'bg-black/40 border-cyan-400/30 text-cyan-200'
                  }`}
                >
                  ចូលរួម (Attending)
                </button>
                <button
                  type="button"
                  onClick={() => setRsvpAttending('no')}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition font-komutt ${
                    rsvpAttending === 'no'
                      ? 'bg-rose-900/60 border-rose-400 text-white'
                      : 'bg-black/40 border-cyan-400/30 text-cyan-200'
                  }`}
                >
                  មិនអាចចូលរួម (Regrets)
                </button>
              </div>
            </div>

            <div>
              <label className="text-[11px] text-cyan-200 font-bold block mb-1">
                ចំនួនភ្ញៀវចូលរួម
              </label>
              <select
                value={rsvpCount}
                onChange={(e) => setRsvpCount(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-cyan-400/40 text-xs text-white focus:outline-none focus:border-amber-300 font-suwannaphum"
              >
                <option value="1 នាក់">1 នាក់</option>
                <option value="2 នាក់">2 នាក់</option>
                <option value="3 នាក់">3 នាក់</option>
                <option value="4+ នាក់">4+ នាក់</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-600 text-white font-komutt text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/60"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-200" />
              <span>បញ្ជាក់ការចូលរួម (Submit RSVP)</span>
            </button>

            {rsvpSubmitted && (
              <div className="p-3 rounded-xl bg-cyan-900/80 border border-cyan-300/80 text-cyan-100 text-xs text-center font-bold font-komutt">
                អរគុណសម្រាប់ការបញ្ជាក់ការចូលរួម!
              </div>
            )}
          </form>
        </div>
      </section>

      {/* =========================================================================
          10. កម្រងពរជ័យរស្មីពេជ្រ (DIAMOND WISHES)
          ========================================================================= */}
      <section className="px-5 py-6">
        <div
          style={emeraldCutStyle}
          className="p-6 bg-gradient-to-b from-[#07354A] via-[#03202F] to-[#021723] border-2 border-cyan-400/50 shadow-2xl w-full"
        >
          <h2 className="font-komutt text-base sm:text-lg text-amber-300 text-center mb-3">
            កម្រងពរជ័យរស្មីពេជ្រ
          </h2>

          <form onSubmit={handleAddWish} className="space-y-3 mb-5">
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="ឈ្មោះរបស់អ្នក..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-cyan-400/40 text-xs text-white placeholder-cyan-300/40 focus:outline-none focus:border-amber-300 font-suwannaphum"
            />
            <textarea
              required
              rows={3}
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              placeholder="សរសេរពាក្យជូនពររបស់អ្នក..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-cyan-400/40 text-xs text-white placeholder-cyan-300/40 focus:outline-none focus:border-amber-300 font-suwannaphum resize-none"
            />
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-600 via-sky-600 to-cyan-600 text-white font-komutt text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300/60"
            >
              <Send className="w-3.5 h-3.5 text-amber-200" />
              <span>ផ្ញើពាក្យជូនពរ</span>
            </button>

            {guestSubmitted && (
              <div className="p-2.5 rounded-xl bg-cyan-900/80 border border-cyan-300 text-cyan-100 text-xs text-center font-bold font-komutt">
                ពាក្យជូនពររបស់អ្នកត្រូវបានផ្ញើដោយជោគជ័យ!
              </div>
            )}
          </form>

          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-xl bg-black/50 border border-cyan-400/30 text-left"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-komutt text-xs text-amber-300">{w.name}</span>
                  <span className="text-[10px] text-cyan-300/70 font-mono">{w.time}</span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed font-suwannaphum">
                  {w.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. ទំនាក់ទំនង (CONTACTS & SHARE)
          ========================================================================= */}
      <section className="px-5 py-6 text-center">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={`tel:${phoneGroom}`}
            className="py-2.5 px-4 rounded-xl bg-black/60 border border-cyan-400/40 text-cyan-200 text-xs font-komutt hover:text-white flex items-center gap-1.5 transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>កូនកំលោះ៖ {phoneGroom}</span>
          </a>
          <a
            href={`tel:${phoneBride}`}
            className="py-2.5 px-4 rounded-xl bg-black/60 border border-cyan-400/40 text-cyan-200 text-xs font-komutt hover:text-white flex items-center gap-1.5 transition"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>កូនក្រមុំ៖ {phoneBride}</span>
          </a>
          {telegramLink && (
            <a
              href={telegramLink.startsWith('http') ? telegramLink : `https://t.me/${telegramLink}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-4 rounded-xl bg-[#229ED9]/80 hover:bg-[#229ED9] text-white text-xs font-komutt flex items-center gap-1.5 transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Telegram ម្ចាស់ដើមការ</span>
            </a>
          )}
        </div>
      </section>

      {/* QR Code Zoom Modal */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={emeraldCutStyle}
            className="max-w-xs w-full bg-[#07374D] p-6 border-2 border-cyan-400/60 shadow-2xl text-center"
          >
            <h3 className="font-komutt text-sm text-amber-300 mb-2">QR កូដស្កេនផ្ញើចំណងដៃ</h3>
            <p className="text-xs text-cyan-200 mb-3 font-mono">{bankName}</p>
            <div className="w-48 h-48 mx-auto p-2 bg-white rounded-xl flex items-center justify-center mb-3 border-2 border-amber-300">
              {qrCodeImage ? (
                <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain" decoding="async" loading="lazy" />
              ) : (
                <QrCode className="w-40 h-40 text-stone-900" />
              )}
            </div>
            <p className="text-xs font-bold text-amber-200 mb-1 font-mono">{accountName}</p>
            <p className="text-xs text-stone-300 font-mono tracking-wider mb-4">{accountNumber}</p>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="px-6 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold cursor-pointer font-komutt"
            >
              បិទ
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          12. FOOTER & BACK TO TOP
          ========================================================================= */}
      <footer className="px-5 pt-4 pb-12 text-center text-xs text-cyan-300/70">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-cyan-400/50" />
          <Gem className="w-3.5 h-3.5 text-amber-300" />
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-cyan-400/50" />
        </div>
        <p className="font-komutt text-amber-200/90 text-sm mb-1">
          {groom} ✦ & ✦ {bride}
        </p>
        <p className="font-mono text-[10px] tracking-widest text-cyan-300/60 uppercase mb-3">
          HAUTE JOAILLERIE DIGITAL INVITATION
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-200 text-[11px] font-bold hover:text-white transition"
        >
          <ArrowUp className="w-3.5 h-3.5" />
          <span>ត្រឡប់ទៅលើវិញ</span>
        </button>
      </footer>

      {/* Lightbox / Gallery Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="max-w-lg w-full relative">
            <img
              src={selectedPhoto}
              alt="Enlarged Prewedding"
              className="w-full h-auto max-h-[85vh] object-contain border-2 border-cyan-400/80 shadow-2xl" decoding="async" />
            <p className="text-center text-xs text-cyan-200 font-komutt mt-3">
              ចុចទីតាំងណាក៏បានដើម្បីបិទ ✦
            </p>
          </div>
        </div>
      )}

      {/* Floating Audio Toggle - Isolated Template Soundtrack («ភ្ជាប់និស្ស័យ» - NISAI) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={toggleAudio}
          className={`px-3.5 py-2.5 rounded-full flex items-center gap-2 border backdrop-blur-md shadow-2xl transition-all duration-300 text-xs font-medium cursor-pointer ${
            isPlaying
              ? 'bg-cyan-800 text-white border-cyan-400 shadow-cyan-500/30 ring-2 ring-cyan-400/40'
              : 'bg-white/90 text-stone-800 border-cyan-300 hover:text-black'
          }`}
          title="ភ្លេងមង្គល «ភ្ជាប់និស្ស័យ»"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-cyan-200" />
              <span className="font-kantumruy font-bold">កំពុងចាក់ «ភ្ជាប់និស្ស័យ»</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-stone-500" />
              <span className="font-kantumruy">ចាក់ភ្លេងមង្គល</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
