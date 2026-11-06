import TemplateGoogleMap from '../../TemplateGoogleMap';
import TemplateGratitudeNote from '../../TemplateGratitudeNote';
import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useTemplateAudio } from '../../../utils/useTemplateAudio';
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Send,
  Copy,
  Check,
  X,
  Phone,
  MessageCircle,
  QrCode,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowUp,
  Image as ImageIcon
} from 'lucide-react';
import { FlyingHeartsAndFlowers } from '../../FlyingHeartsAndFlowers';

// Royal Khmer Gold Motif Divider
function KhmerGoldDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-2 my-2 select-none ${className}`}>
      <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#B69225]" />
      <span className="text-[10px] text-[#B69225]">✤</span>
      <span className="text-sm sm:text-base font-serif text-[#B69225] drop-shadow-xs">❖</span>
      <span className="text-[10px] text-[#B69225]">✤</span>
      <div className="h-[1.5px] w-10 sm:w-16 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#B69225]" />
    </div>
  );
}

// Gold Corner Brackets for Heritage Cards
function GoldCornerBrackets() {
  return (
    <>
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none" />
    </>
  );
}

export function RoyalGoldTemplate({
  data = {},
  activeTemplate = {},
  invitationData = {},
  invitation = {}
}) {
  // 1. Core Data
  const groom = data.groomName || invitation.groomName || invitationData.groomName || activeTemplate?.demoGroom || 'សុខ វិបុល';
  const bride = data.brideName || invitation.brideName || invitationData.brideName || activeTemplate?.demoBride || 'ជា សុជាតា';

  const groomParents = data.groomParents || (data.groomFather ? `${data.groomFather} និង ${data.groomMother}` : null) || activeTemplate?.demoGroomParents || 'លោក សុខ ជា និង លោកស្រី កែវ ផល្លី';
  const brideParents = data.brideParents || (data.brideFather ? `${data.brideFather} និង ${data.brideMother}` : null) || activeTemplate?.demoBrideParents || 'លោក ជា វណ្ណា និង លោកស្រី ហែម ស៊ីវន';

  const groomFather = data.groomFather || groomParents?.split(' និង ')[0] || 'លោក សុខ ជា';
  const groomMother = data.groomMother || groomParents?.split(' និង ')[1] || 'លោកស្រី កែវ ផល្លី';
  const brideFather = data.brideFather || brideParents?.split(' និង ')[0] || 'លោក ជា វណ្ណា';
  const brideMother = data.brideMother || brideParents?.split(' និង ')[1] || 'លោកស្រី ហែម ស៊ីវន';

  const dateStr = data.ceremonyDate || invitation.weddingDate || invitationData.ceremonyDate || activeTemplate?.demoDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || invitation.weddingTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ';
  const locationName = data.ceremonyLocation || invitation.weddingLocation || activeTemplate?.demoLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.locationAddress || data.ceremonyAddress || invitation.locationAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const googleMapsUrl = data.googleMapsUrl || invitation.googleMapsUrl || 'https://maps.app.goo.gl/gmxb8VaN78xgkFiu5';

  // 2. Hero Images (Clamped to 5-6)
  const heroImages = (data.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : (activeTemplate?.heroImages && activeTemplate.heroImages.length > 0
        ? activeTemplate.heroImages
        : [
            '/images/templates/royal-gold/gold_1.webp',
            '/images/templates/royal-gold/gold_2.webp',
            '/images/templates/royal-gold/gold_3.webp',
            '/images/templates/royal-gold/gold_4.webp',
            '/images/templates/royal-gold/gold_5.webp',
            '/images/templates/royal-gold/gold_6.webp'
          ]);

  // 3. Gallery Photos
  const galleryPhotos = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : (activeTemplate?.galleryPhotos && activeTemplate.galleryPhotos.length > 0
        ? activeTemplate.galleryPhotos
        : [
            { id: 1, src: heroImages[0] || '/images/templates/royal-gold/gold_1.webp', caption: 'ស្នេហ៍ផ្អែមល្ហែមរវាងគូស្នេហ៍' },
            { id: 2, src: heroImages[1] || '/images/templates/royal-gold/gold_2.webp', caption: 'មង្គលសិរីមាសប្រណិត' },
            { id: 3, src: heroImages[2] || '/images/templates/royal-gold/gold_3.webp', caption: 'អនុស្សាវរីយ៍ផ្កាស្រស់រ៉ូមែនទិក' },
            { id: 4, src: heroImages[3] || '/images/templates/royal-gold/gold_4.webp', caption: 'ភាពថ្លៃថ្នូរ និងសេចក្តីសុខក្សេមក្សាន្ត' },
            { id: 5, src: heroImages[4] || '/images/templates/royal-gold/gold_5.webp', caption: 'កេរដំណែលប្រពៃណីខ្មែរអង្គរ' },
            { id: 6, src: heroImages[5] || heroImages[0] || '/images/templates/royal-gold/gold_6.webp', caption: 'ភាពទាន់សម័យ និងស៊ីវិល័យ' }
          ]);

  // 4. Ceremony Programs
  const programs = (data.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : (data.programs || [
        { num: 1, time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន', desc: 'ជួបជុំបងប្អូនញាតិមិត្តជិតឆ្ងាយរៀបចំគ្រឿងដង្វាយសូត្រមាស' },
        { num: 2, time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យមង្គល', desc: 'ក្បួនហែផ្លែឈើ និងគ្រឿងបណ្ណាការចូលគេហដ្ឋានមង្គល' },
        { num: 3, time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍ផ្លូវការ និងសែនដូនតា', desc: 'ចុះកិច្ចសន្យាអាពាហ៍ពិពាហ៍ចំពោះមុខអាជ្ញាធរ និងសែនព្រេនបុព្វការីជន' },
        { num: 4, time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរីមង្គល', desc: 'កាត់សក់ជម្រះចង្រៃ និងប្រសិទ្ធពរជ័យសិរីសួស្តី' },
        { num: 5, time: '០៩:៣០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម ចងដៃសូត្រមាស បង្វិលពពិល ព្រះថោងតោងស្បៃ', desc: 'សំពះផ្ទឹមក្រងសីមា ចងខ្សែអំបោះក្រហម និងបង្វិលពពិលជ័យ' },
        { num: 6, time: '១១:៣០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់', desc: 'ពិសារអាហារសាមគ្គីជួបជុំគ្រួសារ និងភ្ញៀវកិត្តិយស' },
        { num: 7, time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងរាត្រីសមោសរ', desc: 'ពិសារភោជនាហារពេលរាត្រី និងរីករាយជាមួយតន្ត្រីសម័យអភិជន' }
      ]);

  // 5. Digital Gift & Bank QR
  const bankName = data.bankName || invitation.bankName || 'ABA Bank';
  const accountName = data.accountName || invitation.accountName || `${groom} & ${bride}`;
  const accountNumber = data.accountNumber || invitation.accountNumber || '000 987 654';
  const qrCodeImage = data.qrCodeImage || invitation.qrCodeImage || '/images/aba_qr.webp';

  // 6. Host Contacts
  const phoneGroom = data.hostPhoneGroom || data.phoneGroom || invitation.hostPhoneGroom || '012 345 678';
  const phoneBride = data.hostPhoneBride || data.phoneBride || invitation.hostPhoneBride || '098 765 432';
  const telegramLink = data.telegramLink || invitation.telegramLink || 'https://t.me/theab_invitation';

  // 7. Isolated Audio
  const { isPlaying, toggleAudio } = useTemplateAudio();

  // 8. Internal UI States
  const [activePhoto, setActivePhoto] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);
  const heroScrollRef = useRef(null);

  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'ឯកឧត្តម & លោកជំទាវ', text: 'សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខ កើតមានដល់ក្មួយទាំងពីរគូស្រករថ្មី!' }
  ]);

  // Countdown timer
  const [countdown, setCountdown] = useState({ days: 18, hours: 8, minutes: 42, seconds: 15 });
  useEffect(() => {
    const target = new Date('2027-01-10T17:00:00+07:00').getTime();
    const interval = setInterval(() => {
      const diff = Math.max(0, target - Date.now());
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleHeroScroll = () => {
    if (heroScrollRef.current) {
      const { scrollLeft, clientWidth } = heroScrollRef.current;
      if (clientWidth > 0) {
        const idx = Math.round(scrollLeft / clientWidth);
        if (idx !== currentHeroIdx && idx >= 0 && idx < heroImages.length) {
          setCurrentHeroIdx(idx);
        }
      }
    }
  };

  const scrollToHero = (idx) => {
    if (heroScrollRef.current) {
      const clientWidth = heroScrollRef.current.clientWidth;
      heroScrollRef.current.scrollTo({ left: idx * clientWidth, behavior: 'smooth' });
      setCurrentHeroIdx(idx);
    }
  };

  const copyBankNumber = () => {
    navigator.clipboard?.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const submitRsvp = (e) => {
    e.preventDefault();
    if (!rsvp.name.trim()) return;
    setRsvpDone(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
  };

  const submitWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList((prev) => [{ id: Date.now(), name: wish.name, text: wish.text }, ...prev]);
    setWish({ name: '', text: '' });
    confetti({ particleCount: 35, spread: 50, origin: { y: 0.85 } });
  };

  const cardBoxClass = 'bg-white/80 backdrop-blur-xl border border-white/95 shadow-[0_10px_35px_rgba(212,175,55,0.12)] rounded-2xl';

  return (
    <div className="w-full bg-[#FCFAF6] text-stone-800 font-kantumruy relative selection:bg-amber-600 selection:text-white pb-24 select-none overflow-hidden">
      {/* Subtle Gold Ambient Veil */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-100/35 via-stone-50/50 to-transparent" />

      {/* =========================================================================
          1. HERO COVER SECTION (Kh Ang Komutt A Font)
          ========================================================================= */}
      <section className="relative w-full aspect-[896/1200] min-h-[460px] overflow-hidden select-none group border-b-2 border-[#D4AF37]">
        {/* Horizontal Snap Scroll Gallery */}
        <div
          ref={heroScrollRef}
          onScroll={handleHeroScroll}
          className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth touch-auto"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {heroImages.map((src, idx) => (
            <div key={idx} className="relative w-full min-w-full h-full shrink-0 snap-start snap-always">
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 brightness-[1.08] contrast-[1.02]"
                style={{ backgroundImage: `url(${src})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-black/55" />
            </div>
          ))}
        </div>

        {/* Flying Royal Petals */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <FlyingHeartsAndFlowers count={8} />
        </div>

        {/* Centered Typography: Kh Ang Komutt A (Scaled for mobile readability) */}
        <div className="relative z-20 pointer-events-none w-full h-full flex flex-col justify-center items-center p-3 sm:p-6 text-center">
          <div className="space-y-2.5 sm:space-y-4 max-w-lg mx-auto w-full my-auto px-2">
            {/* Title Badge in font-komutt-a */}
            <div className="flex justify-center w-full">
              <div className="relative inline-flex items-center justify-center py-1">
                <h1 className="font-komutt-a text-sm sm:text-base md:text-xl text-amber-200 tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-center whitespace-nowrap">
                  សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍
                </h1>
              </div>
            </div>

            {/* Groom Name in font-komutt-a */}
            <div className="pt-1.5">
              <div className="font-komutt-a text-xl sm:text-2xl md:text-3xl text-amber-100 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)] leading-relaxed">
                {groom}
              </div>
            </div>

            {/* Central Gold Ornament Connector */}
            <div className="flex items-center justify-center gap-2.5 my-0.5 sm:my-1">
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow" />
              <div className="px-3 py-0.5 rounded-full border-2 border-amber-300 bg-black/80 flex items-center justify-center shadow-lg backdrop-blur-md">
                <span className="font-komutt-a text-[10px] sm:text-xs text-amber-200 tracking-wider drop-shadow">
                  និង
                </span>
              </div>
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-16 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow" />
            </div>

            {/* Bride Name in font-komutt-a */}
            <div>
              <div className="font-komutt-a text-xl sm:text-2xl md:text-3xl text-amber-100 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)] leading-relaxed">
                {bride}
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Arrows */}
        {heroImages.length > 1 && (
          <>
            <button
              onClick={() => scrollToHero((currentHeroIdx - 1 + heroImages.length) % heroImages.length)}
              aria-label="Previous Photo"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-amber-300 border border-amber-400/50 flex items-center justify-center cursor-pointer z-20 backdrop-blur-xs transition active:scale-95 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToHero((currentHeroIdx + 1) % heroImages.length)}
              aria-label="Next Photo"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-amber-300 border border-amber-400/50 flex items-center justify-center cursor-pointer z-20 backdrop-blur-xs transition active:scale-95 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Dots */}
        <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToHero(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === currentHeroIdx
                  ? 'w-6 h-2 bg-gradient-to-r from-amber-300 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          CONTENT CARDS
          ========================================================================= */}
      <div className="pt-4 pb-20 px-3 sm:px-4 space-y-4 max-w-xl mx-auto">
        {/* 2. PARENTS BLESSING */}
        <section className="text-center py-2">
          <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
            ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
          </h3>
          <KhmerGoldDivider />

          <div className={`p-4 sm:p-5 relative ${cardBoxClass}`}>
            <GoldCornerBrackets />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 relative py-1">
              {/* Groom's Parents */}
              <div className="space-y-1 text-center">
                <div className="inline-flex items-center justify-center gap-1.5 pb-0.5 mb-0.5">
                  <span className="text-[10px] text-amber-500">✦</span>
                  <h4 className="font-komutt-a text-xs sm:text-sm text-[#B69225] tracking-wide">
                    ឪពុកម្ដាយខាងកូនកំលោះ
                  </h4>
                  <span className="text-[10px] text-amber-500">✦</span>
                </div>
                <div className="space-y-0.5">
                  <p className="font-komutt-a text-stone-800 text-xs sm:text-sm font-bold leading-snug">
                    {groomFather}
                  </p>
                  <p className="font-komutt-a text-stone-800 text-xs sm:text-sm font-bold leading-snug">
                    {groomMother}
                  </p>
                </div>
              </div>

              {/* Center Divider Ornament */}
              <div className="hidden sm:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col items-center justify-center pointer-events-none">
                <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-amber-300/70 to-transparent" />
                <span className="text-xs text-amber-600/80 my-1 select-none">❖</span>
                <div className="w-[1px] flex-1 bg-gradient-to-b from-transparent via-amber-300/70 to-transparent" />
              </div>

              {/* Bride's Parents */}
              <div className="space-y-1 text-center">
                <div className="inline-flex items-center justify-center gap-1.5 pb-0.5 mb-0.5">
                  <span className="text-[10px] text-amber-500">✦</span>
                  <h4 className="font-komutt-a text-xs sm:text-sm text-[#B69225] tracking-wide">
                    ឪពុកម្ដាយខាងកូនក្រមុំ
                  </h4>
                  <span className="text-[10px] text-amber-500">✦</span>
                </div>
                <div className="space-y-0.5">
                  <p className="font-komutt-a text-stone-800 text-xs sm:text-sm font-bold leading-snug">
                    {brideFather}
                  </p>
                  <p className="font-komutt-a text-stone-800 text-xs sm:text-sm font-bold leading-snug">
                    {brideMother}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CALENDAR & COUNTDOWN */}
        <section className="text-center py-2">
          <div className="flex items-center justify-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#B69225]" />
            <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
              កាលបរិច្ឆេទនៃពិធីមង្គលការ
            </h3>
          </div>
          <KhmerGoldDivider />

          {/* Date Card */}
          <div className={`p-4 sm:p-5 relative ${cardBoxClass} text-center mb-3`}>
            <GoldCornerBrackets />
            <p className="font-komutt-a text-sm sm:text-base text-stone-800 font-bold mb-1">
              {dateStr}
            </p>
            <p className="text-xs text-amber-800 font-bold font-mono">
              {timeStr}
            </p>
          </div>

          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 sm:gap-2.5 max-w-xs mx-auto mb-2">
            {[
              { val: countdown.days, label: 'ថ្ងៃ' },
              { val: String(countdown.hours).padStart(2, '0'), label: 'ម៉ោង' },
              { val: String(countdown.minutes).padStart(2, '0'), label: 'នាទី' },
              { val: String(countdown.seconds).padStart(2, '0'), label: 'វិនាទី' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-2 sm:p-2.5 bg-white/85 backdrop-blur-md border border-amber-200/80 shadow-[0_4px_16px_rgba(212,175,55,0.15)] text-center"
              >
                <span className="font-komutt-a text-lg sm:text-xl block text-[#B69225] font-bold leading-tight">
                  {item.val}
                </span>
                <span className="text-[10px] font-bold text-stone-600 mt-0.5 block font-kantumruy">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. WEDDING PROGRAM */}
        <section className="py-2 text-center">
          <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
            កម្មពិធីសិរីសួស្ដី
          </h3>
          <KhmerGoldDivider />

          <div className="space-y-2.5 text-left">
            {programs.map((prog, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-3 relative ${cardBoxClass} hover:border-amber-400 transition-all`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-600 to-amber-700 text-white font-komutt-a font-bold text-xs flex items-center justify-center shrink-0 shadow-sm border border-amber-300">
                  {prog.num || idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-komutt-a text-xs sm:text-sm text-stone-800 font-bold leading-snug">
                    {prog.title}
                  </p>
                  {prog.desc && (
                    <p className="text-[11px] text-stone-600 leading-tight mt-0.5">
                      {prog.desc}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0 text-amber-800 font-bold text-[11px] font-mono">
                  <Clock className="w-3 h-3 text-amber-600" />
                  <span>{prog.time}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. VENUE & MAPS */}
        <section className="py-2 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#B69225]" />
            <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
              ទីតាំងប្រារព្ធពិធីមង្គល
            </h3>
          </div>
          <KhmerGoldDivider />

          <TemplateGratitudeNote isDark={false} accentColor="#B69225" fontFamily="font-komutt-a" />
          <TemplateGoogleMap
            locationName={locationName}
            address={address}
            googleMapsUrl={googleMapsUrl}
            accentColor="#B69225"
            fontFamily="font-komutt-a"
          /></section>

        {/* 6. PHOTO GALLERY */}
        <section className="py-2 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-[#B69225]" />
            <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
              វិចិត្រសាលរូបថតអនុស្សាវរីយ៍
            </h3>
          </div>
          <KhmerGoldDivider />

          <div className="grid grid-cols-2 gap-2 sm:gap-2.5">
            {galleryPhotos.map((photo, idx) => (
              <div
                key={photo.id || idx}
                onClick={() => setActivePhoto(photo.src || photo)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-amber-300/80 shadow-md cursor-pointer hover:scale-[1.02] transition-transform"
              >
                <img
                  src={photo.src || photo}
                  alt={photo.caption || 'Prewedding'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  decoding="async"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5 text-center justify-center">
                  <p className="font-komutt-a text-xs text-amber-200 font-bold">
                    {photo.caption || 'អនុស្សាវរីយ៍មង្គល'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. DIGITAL GIFT & QR CODE */}
        <section className="py-2 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <QrCode className="w-4 h-4 text-[#B69225]" />
            <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
              ចំណងដៃឌីជីថល (QR Code)
            </h3>
          </div>
          <KhmerGoldDivider />

          <div className={`p-4 sm:p-5 relative ${cardBoxClass} text-center space-y-3`}>
            <GoldCornerBrackets />
            <div className="w-44 h-44 mx-auto p-2 bg-white rounded-2xl border-2 border-[#D4AF37] shadow-inner flex items-center justify-center">
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-full h-full object-contain"
                decoding="async"
                loading="lazy"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-amber-800 font-mono">
                {bankName}
              </p>
              <p className="font-komutt-a text-xs sm:text-sm font-bold text-stone-800">
                {accountName}
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="font-mono text-xs sm:text-sm font-bold text-stone-700 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  {accountNumber}
                </span>
                <button
                  type="button"
                  onClick={copyBankNumber}
                  className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'បានចម្លង' : 'ចម្លងលេខ'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 8. RSVP FORM */}
        <section className="py-2 text-center">
          <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
            ឆ្លើយតបការចូលរួម (RSVP)
          </h3>
          <KhmerGoldDivider />

          <div className={`p-4 sm:p-5 relative ${cardBoxClass} text-left`}>
            <GoldCornerBrackets />
            {rsvpDone ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-center space-y-2">
                <Check className="w-6 h-6 text-amber-700 mx-auto" />
                <p className="font-komutt-a text-xs sm:text-sm text-amber-900 font-bold">
                  សូមអរគុណសម្រាប់ការឆ្លើយតបការចូលរួម!
                </p>
              </div>
            ) : (
              <form onSubmit={submitRsvp} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1 font-komutt-a">
                    ឈ្មោះភ្ញៀវកិត្តិយស
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvp.name}
                    onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                    placeholder="បញ្ចូលឈ្មោះភ្ញៀវកិត្តិយស"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 focus:bg-white focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 font-komutt-a">
                      ការចូលរួម
                    </label>
                    <select
                      value={rsvp.attendance}
                      onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 focus:bg-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="attending">ចូលរួមដោយក្ដីរីករាយ</option>
                      <option value="not_attending">សុំទោស មិនអាចចូលរួមបាន</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 font-komutt-a">
                      ចំនួនភ្ញៀវ
                    </label>
                    <select
                      value={rsvp.guests}
                      onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 focus:bg-white focus:border-amber-500 focus:outline-none"
                    >
                      <option value="1 នាក់">១ នាក់</option>
                      <option value="2 នាក់">២ នាក់</option>
                      <option value="3 នាក់">៣ នាក់</option>
                      <option value="ច្រើនជាង ៣ នាក់">ច្រើនជាង ៣ នាក់</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-white font-komutt-a text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  ផ្ញើការឆ្លើយតប (Submit RSVP)
                </button>
              </form>
            )}
          </div>
        </section>

        {/* 9. WISHES / GUESTBOOK */}
        <section className="py-2 text-center">
          <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
            សៀវភៅពរជ័យមង្គល
          </h3>
          <KhmerGoldDivider />

          <div className={`p-4 sm:p-5 relative ${cardBoxClass} text-left space-y-3`}>
            <GoldCornerBrackets />
            <form onSubmit={submitWish} className="space-y-2">
              <input
                type="text"
                required
                value={wish.name}
                onChange={(e) => setWish({ ...wish, name: e.target.value })}
                placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 focus:bg-white focus:border-amber-500 focus:outline-none"
              />
              <textarea
                rows={2}
                required
                value={wish.text}
                onChange={(e) => setWish({ ...wish, text: e.target.value })}
                placeholder="សរសេរពាក្យជូនពរនៅទីនេះ..."
                className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-stone-50/50 text-xs text-stone-800 focus:bg-white focus:border-amber-500 focus:outline-none resize-none"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-komutt-a text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ផ្ញើពាក្យជូនពរ</span>
              </button>
            </form>

            <div className="space-y-2 pt-2 border-t border-stone-100 max-h-48 overflow-y-auto luxury-scrollbar">
              {wishesList.map((item) => (
                <div key={item.id} className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs">
                  <p className="font-komutt-a text-[#B69225] font-bold">{item.name}</p>
                  <p className="text-stone-700 mt-0.5 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. HOST CONTACTS */}
        <section className="py-2 text-center">
          <h3 className="font-komutt-a text-base sm:text-lg text-[#B69225] tracking-wide">
            ទំនាក់ទំនងម្ចាស់កម្មវិធី
          </h3>
          <KhmerGoldDivider />

          <div className={`p-4 relative ${cardBoxClass} grid grid-cols-2 gap-2 text-center`}>
            <GoldCornerBrackets />
            <a
              href={`tel:${phoneGroom}`}
              className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 hover:border-amber-400 transition block cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-700 mx-auto mb-1" />
              <p className="font-komutt-a text-[11px] text-stone-600">ខាងកូនកំលោះ</p>
              <p className="font-mono text-xs font-bold text-amber-900">{phoneGroom}</p>
            </a>
            <a
              href={`tel:${phoneBride}`}
              className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 hover:border-amber-400 transition block cursor-pointer"
            >
              <Phone className="w-4 h-4 text-rose-700 mx-auto mb-1" />
              <p className="font-komutt-a text-[11px] text-stone-600">ខាងកូនក្រមុំ</p>
              <p className="font-mono text-xs font-bold text-rose-900">{phoneBride}</p>
            </a>
          </div>
        </section>

        {/* 11. FOOTER */}
        <footer className="text-center pt-6 pb-2 text-stone-500 text-xs space-y-2">
          <p className="font-komutt-a text-sm text-[#B69225] font-bold">
            សិរីសួស្តីជ័យមង្គល វិបុលសុខ
          </p>
          <p className="text-[11px] text-stone-600">
            រៀបចំឡើងដោយសេចក្ដីស្រឡាញ់ និងការគោរពដ៏ខ្ពង់ខ្ពស់
          </p>
        </footer>
      </div>

      {/* Floating Audio Toggle - Isolated Soundtrack («ភ្ជាប់និស្ស័យ» - NISAI) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={toggleAudio}
          className={`px-3.5 py-2.5 rounded-full flex items-center gap-2 border backdrop-blur-md shadow-2xl transition-all duration-300 text-xs font-medium cursor-pointer ${
            isPlaying
              ? 'bg-amber-600 text-white border-amber-400 shadow-amber-500/30 ring-2 ring-amber-400/40'
              : 'bg-white/95 text-stone-800 border-amber-300 hover:text-black shadow-lg'
          }`}
          title="ភ្លេងមង្គល «ភ្ជាប់និស្ស័យ»"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-amber-200" />
              <span className="font-komutt-a font-bold text-white">កំពុងចាក់ «ភ្ជាប់និស្ស័យ»</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-stone-500" />
              <span className="font-komutt-a text-stone-700">ចាក់ភ្លេងមង្គល</span>
            </>
          )}
        </button>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fade"
        >
          <div className="relative max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={activePhoto}
              alt="Photo Preview"
              className="w-full max-h-[85vh] object-contain rounded-2xl border-2 border-amber-400 shadow-2xl"
              decoding="async"
            />
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white text-stone-900 font-bold flex items-center justify-center cursor-pointer shadow-lg hover:scale-105 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoyalGoldTemplate;

