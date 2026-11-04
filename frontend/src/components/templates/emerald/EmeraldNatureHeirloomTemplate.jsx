import { TemplateGoogleMap } from '../../TemplateGoogleMap';
import React, { useState, useEffect, useRef } from 'react';
import { useTemplateAudio } from '../../../utils/useTemplateAudio';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Send,
  Leaf,
  Sparkles,
  CheckCircle2,
  Trees,
  QrCode,
  Copy,
  Check,
  Phone,
  MessageCircle,
  ArrowUp,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { FlyingHeartsAndFlowers } from '../../FlyingHeartsAndFlowers';

export function EmeraldNatureHeirloomTemplate({ data = {}, invitationData = {}, invitation = {}, activeTemplate = {} }) {
  // Isolated template audio («ភ្ជាប់និស្ស័យ» - NISAI)
  const { isPlaying, toggleAudio } = useTemplateAudio();

  const groom = data.groomName || invitation.groomName || invitationData.groomName || activeTemplate?.demoGroom || 'សុខ សិរីរ័ត្ន';
  const bride = data.brideName || invitation.brideName || invitationData.brideName || activeTemplate?.demoBride || 'លឹម មុនីកា';
  
  const groomFather = data.groomFather || invitation?.groomParents?.father || 'លោក ហេង វណ្ណា';
  const groomMother = data.groomMother || invitation?.groomParents?.mother || 'អ្នកស្រី គីម ស្រ៊ុន';
  const brideFather = data.brideFather || invitation?.brideParents?.father || 'លោក កែវ សម្បត្តិ';
  const brideMother = data.brideMother || invitation?.brideParents?.mother || 'អ្នកស្រី សុខ ហៀង';
  
  const dateStr = data.ceremonyDate || invitation?.weddingDate || invitationData.ceremonyDate || activeTemplate?.demoDate || 'ថ្ងៃអាទិត្យ ទី២០ ខែធ្នូ ឆ្នាំ២០២៦';
  const locationStr = data.ceremonyLocation || invitation?.weddingLocation || invitationData.ceremonyLocation || activeTemplate?.demoLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const addressStr = data.locationAddress || data.ceremonyAddress || invitation?.locationAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const mapsUrl = data.googleMapsUrl || invitation?.googleMapsUrl || 'https://maps.app.goo.gl/gmxb8VaN78xgkFiu5';

  // Bank & Gift
  const bankName = data.bankName || invitation?.bankName || 'ABA PAY / BAKONG';
  const accountName = data.accountName || invitation?.accountName || `${groom} & ${bride}`;
  const accountNumber = data.accountNumber || invitation?.accountNumber || '012 345 678';
  const qrCodeImage = data.qrCodeImage || invitation?.qrCodeImage || '/images/aba_qr.webp';

  // Host Contacts
  const phoneGroom = data.hostPhoneGroom || data.phoneGroom || invitation?.hostPhoneGroom || '012 345 678';
  const phoneBride = data.hostPhoneBride || data.phoneBride || invitation?.hostPhoneBride || '098 765 432';
  const telegramLink = data.telegramLink || invitation?.telegramLink || 'https://t.me';

  // 5 Hero Prewedding Images of Khmer Couples in Emerald Nature Settings
  const heroList = (data.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : [
        data.bgImage || '/images/templates/emerald_nature_prewedding.webp',
        '/images/templates/emerald-nature/nature_1.webp',
        '/images/templates/emerald-nature/nature_2.webp',
        '/images/templates/emerald-nature/nature_4.webp',
        '/images/templates/emerald-nature/nature_5.webp'
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

  // 6 Prewedding Gallery Photos
  const galleryPhotos = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : [
        { id: 1, src: '/images/templates/emerald_nature_prewedding.webp', caption: 'ស្នេហ៍ផ្អែមល្ហែមរវាងគូស្នេហ៍' },
        { id: 2, src: '/images/templates/emerald-nature/nature_1.webp', caption: 'មង្គលសិរីមាសប្រណិត' },
        { id: 3, src: '/images/templates/emerald-nature/nature_2.webp', caption: 'អនុស្សាវរីយ៍ផ្កាស្រស់រ៉ូមែនទិក' },
        { id: 4, src: '/images/templates/emerald-nature/nature_3.webp', caption: 'ភាពថ្លៃថ្នូរ និងសេចក្តីសុខក្សេមក្សាន្ត' },
        { id: 5, src: '/images/templates/traditional_lacquer_gold_prewedding.webp', caption: 'កេរដំណែលប្រពៃណីខ្មែរអង្គរ' },
        { id: 6, src: '/images/templates/crimson_classic_prewedding.webp', caption: 'ភាពទាន់សម័យ និងស៊ីវិល័យ' }
      ];

  // 7 Standard Ceremony Milestones
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
      name: 'លោកគ្រូ សុវណ្ណ ពិសាល',
      text: 'សូមឱ្យចំណងស្នេហ៍របស់អ្នកទាំងពីរ មានម្លប់ត្រជាក់ត្រជុំ និងចម្រើនលូតលាស់ដូចរុក្ខជាតិត្បូងបៃតងក្នុងសួនសិរីមង្គល!',
      time: '៣០ នាទីមុន'
    },
    {
      id: 2,
      name: 'អ្នកស្រី កែវ មុនីនាថ',
      text: 'រីករាយថ្ងៃជ័យមង្គល! សូមឱ្យគ្រួសារថ្មីមានសេចក្តីសុខក្សេមក្សាន្ត ត្រជាក់ដូចទឹកអម្រឹត និងរីកស្រស់បំព្រងជានិច្ច!',
      time: '៤ ម៉ោងមុន'
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

  return (
    <div className="w-full min-h-full relative pb-16 bg-gradient-to-b from-[#033022] via-[#02241A] to-[#033022] text-stone-100 font-suwannaphum overflow-hidden select-none">
      {/* Organic Emerald Forest Ambient Halo */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 -left-24 w-[500px] h-[500px] rounded-full bg-emerald-400/15 blur-[120px] pointer-events-none" />

      {/* Floating Leaves & Flower Petals */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <FlyingHeartsAndFlowers count={8} />
      </div>
        
        {/* =========================================================================
            1. HERO SECTION (5 KHMER COUPLE IMAGES CAROUSEL & CENTERED KH ANG KOMUTT B TEXT)
            ========================================================================= */}
        <section className="relative w-full aspect-[3/4] overflow-hidden bg-black border-b-2 border-emerald-500/40 select-none">
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
                  alt={`Prewedding Khmer Couple ${idx + 1}`}
                  className="w-full h-full object-cover object-center filter brightness-[0.93] contrast-[1.05]"
                  loading={idx === 0 ? 'eager' : 'lazy'} decoding="async" />
                {/* Natural Forest Mist & Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#021B13] via-[#021B13]/40 to-black/30 pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Stationary Centered Typography Directly on Photo (Kh Ang Komutt B Font, Scaled for mobile readability, frameless) */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-4 sm:p-6 text-center">
            <div className="space-y-2.5 sm:space-y-3 w-full max-w-md mx-auto px-2 sm:px-4">
              <div className="font-komutt text-xl sm:text-2xl md:text-3xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-relaxed">
                {groom}
              </div>

              <div className="flex items-center justify-center gap-2.5 my-0.5 sm:my-1">
                <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-12 bg-gradient-to-r from-transparent via-amber-300/80 to-amber-300 drop-shadow"></div>
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-300 text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-12 bg-gradient-to-l from-transparent via-amber-300/80 to-amber-300 drop-shadow"></div>
              </div>

              <div className="font-komutt text-xl sm:text-2xl md:text-3xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-relaxed">
                {bride}
              </div>

              <div className="pt-2">
                <p className="text-xs sm:text-sm text-emerald-200 font-medium tracking-wide drop-shadow">
                  {dateStr}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Arrows */}
          {heroList.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => scrollToHero(Math.max(0, activeHeroIdx - 1))}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-emerald-400/60 text-emerald-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollToHero(Math.min(heroList.length - 1, activeHeroIdx + 1))}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 border border-emerald-400/60 text-emerald-200 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Carousel Indicator Dots */}
          {heroList.length > 1 && (
            <div className="absolute bottom-3 inset-x-0 z-20 flex justify-center items-center gap-1.5 pointer-events-none">
              {heroList.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeHeroIdx === idx
                      ? 'w-6 bg-gradient-to-r from-emerald-300 to-amber-300 shadow-[0_0_8px_#34D399]'
                      : 'w-1.5 bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </section>

        {/* =========================================================================
            2. ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
            ========================================================================= */}
        <section className="px-5 py-7 text-center">
          <h2 className="font-moul text-base sm:text-lg text-amber-300 tracking-wide mb-1">
            ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
          </h2>

          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-emerald-400 to-amber-300" />
            <span className="text-amber-300 text-xs">❖</span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-emerald-400 to-amber-300" />
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#053D2C] to-[#02281D] border-2 border-emerald-400/40 shadow-xl relative mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              {/* Groom's Parents */}
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-400/30">
                <div className="text-amber-300 text-xs font-bold font-moul mb-1">
                  ✦ ឪពុកម្ដាយខាងកូនកំលោះ ✦
                </div>
                <p className="font-preahvihear text-sm sm:text-base text-white leading-relaxed mt-2 font-bold">
                  {groomFather}
                </p>
                <p className="font-preahvihear text-sm sm:text-base text-white leading-relaxed font-bold">
                  {groomMother}
                </p>
                <div className="mt-2 text-xs text-emerald-300 font-semibold">
                  កូនប្រុសនាម៖ <span className="text-amber-200 font-preahvihear font-bold">{groom}</span>
                </div>
              </div>

              {/* Bride's Parents */}
              <div className="p-4 rounded-2xl bg-black/40 border border-emerald-400/30">
                <div className="text-amber-300 text-xs font-bold font-moul mb-1">
                  ✦ ឪពុកម្ដាយខាងកូនក្រមុំ ✦
                </div>
                <p className="font-preahvihear text-sm sm:text-base text-white leading-relaxed mt-2 font-bold">
                  {brideFather}
                </p>
                <p className="font-preahvihear text-sm sm:text-base text-white leading-relaxed font-bold">
                  {brideMother}
                </p>
                <div className="mt-2 text-xs text-emerald-300 font-semibold">
                  កូនស្រីនាម៖ <span className="text-amber-200 font-preahvihear font-bold">{bride}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. ប្រតិទិន & រាប់ថយក្រោយ
            ========================================================================= */}
        <section className="px-5 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-amber-300" />
            <h2 className="font-moul text-base text-amber-300 tracking-wide">
              ប្រតិទិន
            </h2>
          </div>

          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#053D2C] to-[#02281D] border-2 border-emerald-400/40 shadow-xl w-full mb-5">
            <div className="text-center font-bold text-amber-200 text-sm mb-3 font-preahvihear">
              December 2028
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 gap-1 text-[11px] font-bold text-emerald-300/80 pb-2 mb-2 border-b border-emerald-500/30">
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
              <span className="p-1.5 rounded-lg text-stone-300">1</span>
              <span className="p-1.5 rounded-lg text-rose-400">2</span>

              {[...Array(29)].map((_, idx) => {
                const dayNum = idx + 3;
                const isWeddingDay = dayNum === 18;
                return (
                  <div
                    key={dayNum}
                    className={`p-1.5 rounded-lg flex items-center justify-center font-medium ${
                      isWeddingDay
                        ? 'bg-gradient-to-r from-emerald-600 to-amber-600 text-white font-bold ring-2 ring-amber-300 shadow-md scale-105'
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
          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#043325] to-[#022018] border border-emerald-400/40 shadow-xl w-full">
            <h3 className="font-moul text-sm text-emerald-200 mb-3">
              រាប់ថយក្រោយ
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              <div className="p-2.5 rounded-2xl bg-black/50 border border-emerald-400/30 flex flex-col items-center">
                <span className="font-mono font-bold text-xl text-amber-300">{timeLeft.days}</span>
                <span className="text-[10px] text-emerald-200 mt-0.5 font-preahvihear">ថ្ងៃ</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-black/50 border border-emerald-400/30 flex flex-col items-center">
                <span className="font-mono font-bold text-xl text-amber-300">{timeLeft.hours}</span>
                <span className="text-[10px] text-emerald-200 mt-0.5 font-preahvihear">ម៉ោង</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-black/50 border border-emerald-400/30 flex flex-col items-center">
                <span className="font-mono font-bold text-xl text-amber-300">{timeLeft.minutes}</span>
                <span className="text-[10px] text-emerald-200 mt-0.5 font-preahvihear">នាទី</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-black/50 border border-emerald-400/30 flex flex-col items-center">
                <span className="font-mono font-bold text-xl text-amber-300">{timeLeft.seconds}</span>
                <span className="text-[10px] text-emerald-200 mt-0.5 font-preahvihear">វិនាទី</span>
              </div>
            </div>

            <button
              onClick={() => alert('បានបន្ថែមទៅក្នុងប្រតិទិនដោយជោគជ័យ!')}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 text-white font-preahvihear text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Add to Calendar (បញ្ចូលក្នុងប្រតិទិន)</span>
            </button>
          </div>
        </section>

        {/* =========================================================================
            4. កម្មពិធីសិរីសួស្ដី (7 MILESTONES)
            ========================================================================= */}
        <section className="px-5 py-6">
          <div className="text-center mb-5">
            <h2 className="font-moul text-base sm:text-lg text-amber-300 tracking-wide">
              កម្មពិធីសិរីសួស្ដី
            </h2>
            <div className="flex items-center justify-center gap-2 my-2">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-emerald-400 to-amber-300" />
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-emerald-400 to-amber-300" />
            </div>
          </div>

          <div className="space-y-3 w-full">
            {ceremonyPrograms.map((p) => (
              <div
                key={p.num}
                className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-gradient-to-r from-[#053C2D] via-[#02281D] to-[#053C2D] border border-emerald-400/30 shadow-md"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-900/80 border border-amber-300 flex items-center justify-center text-amber-300 font-bold text-xs shrink-0 shadow-sm">
                  {p.num}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-preahvihear text-xs sm:text-sm text-white font-bold leading-snug">
                    {p.title}
                  </h4>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-black/40 border border-emerald-400/40 text-[11px] text-amber-200 font-mono shrink-0">
                  {p.time}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            5. អរគុណ & អធ្យាស្រ័យ
            ========================================================================= */}
        <section className="px-5 py-6 text-center">
          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#053C2D] to-[#02281D] border-2 border-emerald-400/40 shadow-xl w-full relative overflow-hidden">
            <h2 className="font-moul text-base text-amber-300 mb-2">
              អរគុណ & អធ្យាស្រ័យ
            </h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-amber-300 text-xs">❖</span>
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-emerald-400 to-amber-300" />
              <span className="text-amber-300 text-xs">❖</span>
            </div>
            <p className="font-suwannaphum text-xs sm:text-sm text-emerald-100/90 italic leading-relaxed px-2">
              "យើងខ្ញុំ សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមាន ភ្ញៀវកិត្តិយសទាំងអស់ ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីនេះ។ ប្រសិនបើមានការខ្វះខាត ឬទទួលភ្ញៀវមិនបានដិតដល់ត្រង់ចំណុចណាមួយ សូមមេត្តាខន្តី និងអធ្យាស្រ័យដោយក្តីអនុគ្រោះ។"
            </p>
          </div>
        </section>

        {/* =========================================================================
            6. ទីតាំងពិធី
            ========================================================================= */}
        <section className="px-5 py-6">
          <TemplateGoogleMap
            locationName={locationStr}
            address={addressStr}
            googleMapsUrl={mapsUrl}
            isDark={true}
            accentColor="#10B981"
            fontFamily="font-moul"
          />
        </section>

        {/* =========================================================================
            7. រូបថតអនុស្សារីយ៍ (6 PHOTOS)
            ========================================================================= */}
        <section className="px-5 py-6">
          <div className="text-center mb-5">
            <h2 className="font-moul text-base sm:text-lg text-amber-300 tracking-wide">
              រូបថតអនុស្សារីយ៍
            </h2>
            <div className="flex items-center justify-center gap-2 my-2">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-emerald-400 to-amber-300" />
              <ImageIcon className="w-3.5 h-3.5 text-amber-300" />
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-emerald-400 to-amber-300" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 w-full">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo.src)}
                className="group cursor-pointer p-2 rounded-2xl bg-black/50 border border-emerald-400/40 hover:border-amber-300 transition-all duration-300 shadow-md"
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden bg-black relative">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" decoding="async" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-[10px] text-amber-200 font-bold">ចុចដើម្បីមើលរូបធំ ✦</span>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <p className="font-preahvihear text-[11px] text-emerald-100 font-semibold truncate">
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
            8. ជូនចំណងដៃ
            ========================================================================= */}
        <section className="px-5 py-6">
          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#053D2C] to-[#02281D] border-2 border-emerald-400/50 shadow-2xl text-center w-full">
            <h2 className="font-moul text-base text-amber-300 mb-1">
              ជូនចំណងដៃ
            </h2>
            <p className="font-preahvihear text-sm text-white font-bold mt-1">
              {groom} & {bride}
            </p>
            <div className="text-[11px] font-bold text-amber-300 font-mono mt-1">
              {bankName}
            </div>

            <div
              onClick={() => setShowQrModal(true)}
              className="w-40 h-40 mx-auto my-3.5 p-2 rounded-2xl bg-white shadow-xl flex items-center justify-center cursor-pointer relative group"
            >
              {qrCodeImage ? (
                <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain" decoding="async" loading="lazy" />
              ) : (
                <QrCode className="w-32 h-32 text-stone-900" />
              )}
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] text-white font-bold bg-black/70 px-2 py-1 rounded">ចុចដើម្បីពង្រីក</span>
              </div>
            </div>

            <div className="text-xs text-amber-200 font-mono font-bold tracking-wider mb-1">
              {accountName}
            </div>
            <div className="text-xs text-stone-300 font-mono tracking-widest mb-3">
              {accountNumber} (USD / KHR)
            </div>

            <button
              onClick={copyBankInfo}
              className="w-full py-2.5 px-4 rounded-xl bg-black/60 hover:bg-black/80 border border-emerald-400/60 text-emerald-100 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
            >
              {copiedAccount ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">បានចម្លងរួចរាល់!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-300" />
                  <span>ចម្លងលេខគណនី</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* =========================================================================
            9. ការចូលរួម (RSVP FORM)
            ========================================================================= */}
        <section className="px-5 py-6">
          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#053D2C] to-[#02241A] border-2 border-emerald-400/50 shadow-2xl w-full">
            <h2 className="font-moul text-base text-amber-300 text-center mb-3">
              ការចូលរួម
            </h2>

            <form onSubmit={handleRsvpSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] text-emerald-200 font-bold block mb-1">
                  ឈ្មោះរបស់អ្នក (Your Name) *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="សូមបញ្ចូលឈ្មោះ..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-emerald-400/40 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-[11px] text-emerald-200 font-bold block mb-1">
                  តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRsvpAttending('yes')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      rsvpAttending === 'yes'
                        ? 'bg-emerald-600 border-amber-300 text-white'
                        : 'bg-black/40 border-emerald-400/30 text-emerald-200'
                    }`}
                  >
                    ចូលរួម (Attending)
                  </button>
                  <button
                    type="button"
                    onClick={() => setRsvpAttending('no')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition ${
                      rsvpAttending === 'no'
                        ? 'bg-stone-700 border-stone-400 text-white'
                        : 'bg-black/40 border-emerald-400/30 text-emerald-200'
                    }`}
                  >
                    មិនបានចូលរួម
                  </button>
                </div>
              </div>

              {rsvpAttending === 'yes' && (
                <div>
                  <label className="text-[11px] text-emerald-200 font-bold block mb-1">
                    ចំនួនអ្នកចូលរួម (Number of Guests)
                  </label>
                  <select
                    value={rsvpCount}
                    onChange={(e) => setRsvpCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-emerald-400/40 text-xs text-white focus:outline-none focus:border-amber-300"
                  >
                    <option value="1 នាក់">1 នាក់</option>
                    <option value="2 នាក់">2 នាក់</option>
                    <option value="3 នាក់">3 នាក់</option>
                    <option value="4 នាក់">4 នាក់</option>
                    <option value="5+ នាក់">5+ នាក់</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 text-white font-preahvihear text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>យល់ព្រម (Confirm)</span>
              </button>

              {rsvpSubmitted && (
                <p className="text-center text-xs text-emerald-300 font-semibold animate-bounce mt-1">
                  ✓ ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាដោយជោគជ័យ!
                </p>
              )}
            </form>
          </div>
        </section>

        {/* =========================================================================
            10. សារជូនពរ
            ========================================================================= */}
        <section className="px-5 py-6">
          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#053D2C] to-[#02241A] border-2 border-emerald-400/50 shadow-2xl w-full">
            <h2 className="font-moul text-base text-amber-300 text-center mb-3">
              សារជូនពរ
            </h2>

            {/* Existing Wishes */}
            <div className="space-y-2.5 mb-4 max-h-56 overflow-y-auto pr-1">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-3 rounded-2xl bg-black/40 border border-emerald-400/30 text-xs"
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-amber-200">{w.name}</span>
                    <span className="text-[10px] text-emerald-300/70">{w.time}</span>
                  </div>
                  <p className="text-emerald-100/90 leading-relaxed font-suwannaphum">
                    {w.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Post Wish Form */}
            <form onSubmit={handleAddWish} className="space-y-2.5">
              <div>
                <label className="text-[11px] text-emerald-200 font-bold block mb-1">
                  ឈ្មោះរបស់អ្នក (Your Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ឈ្មោះរបស់អ្នក..."
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-emerald-400/40 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-300"
                />
              </div>

              <div>
                <label className="text-[11px] text-emerald-200 font-bold block mb-1">
                  សារជូនពររបស់អ្នក (Your Message) *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="សារជូនពរ..."
                  value={guestMessage}
                  onChange={(e) => setGuestMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-emerald-400/40 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-amber-600 to-emerald-600 text-white font-preahvihear text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ផ្ញើរសារជូនពរ</span>
              </button>

              {guestSubmitted && (
                <p className="text-center text-xs text-emerald-300 font-semibold animate-bounce mt-1">
                  ✓ សារជូនពររបស់អ្នកត្រូវបានផ្ញើរដោយជោគជ័យ!
                </p>
              )}
            </form>
          </div>
        </section>

        {/* =========================================================================
            11. ទំនាក់ទំនងម្ចាស់ពិធីមង្គល
            ========================================================================= */}
        <section className="px-5 py-6">
          <div className="p-5 rounded-3xl bg-gradient-to-b from-[#053D2C] to-[#02241A] border-2 border-emerald-400/50 shadow-2xl text-center w-full">
            <h2 className="font-moul text-base text-amber-300 mb-1">
              ទំនាក់ទំនងម្ចាស់ពិធីមង្គល
            </h2>
            <p className="text-xs text-emerald-200/90 font-suwannaphum mb-4">
              ប្រសិនបើលោកអ្នកមានចម្ងល់ ឬត្រូវការការណែនាំផ្លូវ សូមទាក់ទងមកកាន់យើងខ្ញុំ៖
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={`tel:${phoneGroom}`}
                className="py-2.5 px-4 rounded-xl bg-emerald-600/80 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>ខាងកូនប្រុស: {phoneGroom}</span>
              </a>

              <a
                href={`tel:${phoneBride}`}
                className="py-2.5 px-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Phone className="w-4 h-4 text-amber-300" />
                <span>ខាងកូនស្រី: {phoneBride}</span>
              </a>

              {telegramLink && (
                <a
                  href={telegramLink.startsWith('http') ? telegramLink : `https://t.me/${telegramLink}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-4 rounded-xl bg-[#229ED9]/80 hover:bg-[#229ED9] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 sm:col-span-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Telegram ម្ចាស់ដើមការ</span>
                </a>
              )}
            </div>
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
              className="max-w-xs w-full bg-[#053D2C] p-6 rounded-3xl border-2 border-emerald-400/60 shadow-2xl text-center"
            >
              <h3 className="font-moul text-sm text-amber-300 mb-2">QR កូដស្កេនផ្ញើចំណងដៃ</h3>
              <p className="text-xs text-emerald-200 mb-3 font-mono">{bankName}</p>
              <div className="w-48 h-48 mx-auto p-2 bg-white rounded-2xl flex items-center justify-center mb-3 border-2 border-amber-300">
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
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer"
              >
                បិទ
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            12. FOOTER & BACK TO TOP
            ========================================================================= */}
        <footer className="px-5 pt-4 pb-10 text-center">
          <div className="text-amber-200 text-xs font-moul mb-1">
            Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល
          </div>
          <p className="text-[11px] text-emerald-200/80 font-suwannaphum mb-4">
            សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ
          </p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-black/60 hover:bg-black/90 border border-emerald-400/50 text-emerald-200 text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
          >
            <span>ត្រឡប់ទៅលើវិញ</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </footer>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={selectedPhoto}
            alt="Preview"
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl border-2 border-emerald-400/60 object-contain" decoding="async" />
        </div>
      )}

      {/* Floating Audio Toggle - Isolated Template Soundtrack («ភ្ជាប់និស្ស័យ» - NISAI) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={toggleAudio}
          className={`px-3.5 py-2.5 rounded-full flex items-center gap-2 border backdrop-blur-md shadow-2xl transition-all duration-300 text-xs font-medium cursor-pointer ${
            isPlaying
              ? 'bg-emerald-800 text-white border-emerald-400 shadow-emerald-500/30 ring-2 ring-emerald-400/40'
              : 'bg-white/90 text-stone-800 border-emerald-300 hover:text-black'
          }`}
          title="ភ្លេងមង្គល «ភ្ជាប់និស្ស័យ»"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-emerald-200" />
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

export default EmeraldNatureHeirloomTemplate;
