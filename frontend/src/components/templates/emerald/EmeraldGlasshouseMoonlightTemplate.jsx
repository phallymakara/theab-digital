import { TemplateGoogleMap } from '../../TemplateGoogleMap';
import React, { useState, useRef, useEffect } from 'react';
import { useTemplateAudio } from '../../../utils/useTemplateAudio';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Share2,
  Phone,
  Send,
  Sparkles,
  ExternalLink,
  Check,
  CheckCircle2,
  Copy,
  QrCode,
  MessageCircle,
  ArrowUp,
  Moon,
  Compass,
  Award,
  Users,
  Volume2,
  VolumeX
} from 'lucide-react';
import { FlyingHeartsAndFlowers } from '../../FlyingHeartsAndFlowers';

export function EmeraldGlasshouseMoonlightTemplate({ data = {}, invitationData = {}, invitation = {}, activeTemplate = {} }) {
  // Isolated template audio («ភ្ជាប់និស្ស័យ» - NISAI)
  const { isPlaying, toggleAudio } = useTemplateAudio();

  const groom = data.groomName || invitation.groomName || invitationData.groomName || activeTemplate?.demoGroom || 'រ័ត្ន វិសាល';
  const bride = data.brideName || invitation.brideName || invitationData.brideName || activeTemplate?.demoBride || 'ស៊ូ ទេវី';

  const groomFather = data.groomFather || invitation?.groomParents?.father || 'លោក ហេង វណ្ណា';
  const groomMother = data.groomMother || invitation?.groomParents?.mother || 'អ្នកស្រី គីម ស្រ៊ុន';
  const brideFather = data.brideFather || invitation?.brideParents?.father || 'លោក កែវ សម្បត្តិ';
  const brideMother = data.brideMother || invitation?.brideParents?.mother || 'អ្នកស្រី សុខ ហៀង';

  const dateStr = data.ceremonyDate || invitation?.weddingDate || invitationData.ceremonyDate || activeTemplate?.demoDate || 'ថ្ងៃសៅរ៍ ទី២៦ ខែធ្នូ ឆ្នាំ២០២៦';
  const locationStr = data.ceremonyLocation || invitation?.weddingLocation || invitationData.ceremonyLocation || activeTemplate?.demoLocation || 'វិមានកែវ រ៉ូយ៉ាល់ ហ្គ្រេន (អគារ B) រាជធានីភ្នំពេញ';
  const addressStr = data.locationAddress || data.ceremonyAddress || invitation?.locationAddress || 'មហាវិថីព្រះមុនីវង្ស សង្កាត់ទន្លេបាសាក់ ខណ្ឌចំការមន រាជធានីភ្នំពេញ';
  const mapsUrl = data.googleMapsUrl || invitation?.googleMapsUrl || 'https://maps.google.com';

  // Bank & Gift
  const bankName = data.bankName || invitation?.bankName || 'ABA PAY / BAKONG';
  const accountName = data.accountName || invitation?.accountName || `${groom} & ${bride}`;
  const accountNumber = data.accountNumber || invitation?.accountNumber || '012 888 999';
  const qrCodeImage = data.qrCodeImage || invitation?.qrCodeImage || '/images/aba_qr.webp';

  // Host Contacts
  const phoneGroom = data.hostPhoneGroom || data.phoneGroom || invitation?.hostPhoneGroom || '012 888 999';
  const phoneBride = data.hostPhoneBride || data.phoneBride || invitation?.hostPhoneBride || '098 777 666';
  const telegramLink = data.telegramLink || invitation?.telegramLink || 'https://t.me';

  // 5 Hero prewedding photos featuring Khmer base couple in royal emerald & glasshouse setting
  const heroList = (data.heroImages && data.heroImages.length > 0)
    ? data.heroImages
    : [
        '/images/templates/emerald_glasshouse_prewedding.webp',
        '/images/templates/emerald-glasshouse/glasshouse_2.webp',
        '/images/templates/emerald-glasshouse/glasshouse_3.webp',
        '/images/templates/emerald-glasshouse/glasshouse_4.webp',
        '/images/templates/emerald-glasshouse/glasshouse_5.webp'
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

  // Live countdown timer (Target: Dec 18, 2028)
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

  // 6 Prewedding Gallery Photos with rich captions
  const galleryPhotos = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : [
        { id: 1, src: '/images/templates/emerald_glasshouse_prewedding.webp', caption: 'វិមានកែវរស្មីចន្ទ្រាសិរីសួស្តី' },
        { id: 2, src: '/images/templates/emerald-glasshouse/glasshouse_2.webp', caption: 'ស្នាមញញឹមរំលេចសេចក្តីស្រឡាញ់' },
        { id: 3, src: '/images/templates/emerald-glasshouse/glasshouse_3.webp', caption: 'គន្លងគូស្វាមីក្រោមពន្លឺចន្ទ្រា' },
        { id: 4, src: '/images/templates/emerald-glasshouse/glasshouse_4.webp', caption: 'សេចក្តីសុខក្សេមក្សាន្តក្នុងវិមានមរកត' },
        { id: 5, src: '/images/templates/emerald-glasshouse/glasshouse_5.webp', caption: 'ចិញ្ចៀនពេជ្រត្បូងមរកតសច្ចាស្នេហ៍' },
        { id: 6, src: '/images/templates/emerald_jade_prewedding.webp', caption: 'អនុស្សាវរីយ៍សិរីមង្គលអមតៈ' }
      ];

  // 7 Standard Ceremony Milestones
  const ceremonyPrograms = (data.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { num: 1, time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
        { num: 2, time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យវិមានកែវ' },
        { num: 3, time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍ផ្លូវការ' },
        { num: 4, time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរីមង្គល' },
        { num: 5, time: '១០:០០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
        { num: 6, time: '១២:០០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់' },
        { num: 7, time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងពិធីជប់លៀង' }
      ];

  // Wishes state
  const [wishes, setWishes] = useState([
    {
      id: 1,
      name: 'ឯកឧត្តម & លោកជំទាវ រ័ត្ន សុវណ្ណ',
      text: 'សូមបួងសួងដល់គុណបុណ្យព្រះរតនត្រ័យ និងទេវតាថែរក្សាវិមានកែវ ប្រទានពរជ័យឱ្យគូស្វាមីភរិយាថ្មី រក្សាបាននូវសេចក្តីស្រឡាញ់រឹងមាំដូចពេជ្រ និងត្រជាក់ដូចត្បូងមរកតរស្មីចន្ទ្រា!',
      time: '២ ម៉ោងមុន'
    },
    {
      id: 2,
      name: 'លោកជំទាវ កែវ ចរណៃ',
      text: 'សូមឱ្យចំណងអាពាហ៍ពិពាហ៍នេះ ពោរពេញដោយភាពថ្កុំថ្កើង សុភមង្គល សេចក្តីចម្រុងចម្រើន និងជោគជ័យគ្រប់ភារកិច្ចជានិច្ចនិរន្តរ៍!',
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
    <div className="w-full min-h-full relative pb-16 bg-[#031C17] text-stone-100 font-suwannaphum overflow-hidden select-none">
      {/* Nocturnal Glasshouse Moonlit Backdrop & Ambient Emerald Flares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[650px] bg-gradient-to-b from-emerald-500/15 via-[#063028]/40 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-24 w-96 h-96 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none" />

      {/* Floating Sparkles & Emerald Petals */}
      <div className="pointer-events-none absolute inset-0 z-20">
        <FlyingHeartsAndFlowers count={8} />
      </div>

      {/* =========================================================================
          1. NOCTURNAL GLASSHOUSE MOONLIGHT HERO SNAP CAROUSEL
          Featuring multiple images of Khmer couple in emerald attire
          Stationary typography directly on photo without container wrapper
          ========================================================================= */}
      <section className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden border-b-2 border-emerald-500/30 bg-[#021814] select-none">
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
                alt={`Prewedding ${idx + 1}`}
                className="w-full h-full object-cover object-center brightness-[1.08] contrast-[1.02]"
                loading={idx === 0 ? 'eager' : 'lazy'} decoding="async" />
              {/* Moonlit Emerald & Night Sky Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#021410]/80 via-[#021410]/20 to-black/25 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Stationary Centered Typography in Asvadek Mokha & Moul directly on photo (Scaled for mobile readability, frameless) */}
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="space-y-2.5 sm:space-y-3 w-full max-w-md mx-auto px-2 sm:px-4">
            {/* Top Celestial Emblem */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-amber-300 text-xs drop-shadow-[0_0_8px_#F59E0B]">✦</span>
              <span className="font-komutt text-[11px] sm:text-xs md:text-sm text-amber-200 tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                មរកតវិមានកែវរស្មីចន្ទ្រា
              </span>
              <span className="text-amber-300 text-xs drop-shadow-[0_0_8px_#F59E0B]">✦</span>
            </div>

            {/* Groom Name in Sculptural Asvadek Mokha */}
            <h1 className="font-komutt text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-relaxed">
              {groom}
            </h1>

            {/* Celestial Moonlit Ampersand Emblem */}
            <div className="flex items-center justify-center gap-2.5 my-0.5 sm:my-1">
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-emerald-400 to-amber-300 drop-shadow" />
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#03241D]/90 border border-amber-300/80 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.7)]">
                <span className="font-serif italic text-amber-300 text-[10px] sm:text-xs font-bold">✦ & ✦</span>
              </div>
              <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-14 bg-gradient-to-l from-transparent via-emerald-400 to-amber-300 drop-shadow" />
            </div>

            {/* Bride Name in Sculptural Asvadek Mokha */}
            <h1 className="font-komutt text-2xl sm:text-3xl md:text-4xl text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-relaxed">
              {bride}
            </h1>

            <div className="pt-2">
              <p className="text-xs sm:text-sm text-emerald-200 font-medium tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {dateStr}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center items-center gap-2 pointer-events-auto">
          {heroList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollToHero(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeHeroIdx === idx
                  ? 'w-7 bg-gradient-to-r from-amber-300 to-emerald-300 shadow-[0_0_8px_#34D399]'
                  : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* =========================================================================
          2. ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
          Unique Style: Cathedral Archway Double-Portal (ស៊ុមទ្វារកោងវិមានកែវ)
          ========================================================================= */}
      <section className="px-4 py-8">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Arch Apex Finial */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-amber-300/60 flex items-center justify-center text-amber-300 text-xs shadow-[0_0_10px_rgba(245,158,11,0.5)] mb-2">
              ❖
            </div>
            <h2 className="font-komutt text-lg sm:text-xl text-amber-300 tracking-wide text-center">
              ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
            </h2>
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-300 to-transparent mt-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Groom Parents Arch Card */}
            <div className="p-5 rounded-t-[36px] rounded-b-2xl bg-black/40 border border-emerald-400/30 text-center relative shadow-inner">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-amber-300/40 text-amber-300 text-[11px] font-bold mb-3 shadow">
                <span>✦ ឪពុកម្ដាយខាងកូនកំលោះ ✦</span>
              </div>
              <div className="space-y-1.5">
                <p className="font-komutt text-sm sm:text-base text-white tracking-wide">
                  {groomFather}
                </p>
                <p className="font-komutt text-sm sm:text-base text-white tracking-wide">
                  {groomMother}
                </p>
              </div>
            </div>

            {/* Bride Parents Arch Card */}
            <div className="p-5 rounded-t-[36px] rounded-b-2xl bg-black/40 border border-emerald-400/30 text-center relative shadow-inner">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-amber-300/40 text-amber-300 text-[11px] font-bold mb-3 shadow">
                <span>✦ ឪពុកម្ដាយខាងកូនក្រមុំ ✦</span>
              </div>
              <div className="space-y-1.5">
                <p className="font-komutt text-sm sm:text-base text-white tracking-wide">
                  {brideFather}
                </p>
                <p className="font-komutt text-sm sm:text-base text-white tracking-wide">
                  {brideMother}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ប្រតិទិន & រាប់ថយក្រោយ (CALENDAR & LIVE COUNTDOWN)
          Unique Style: Moonlit Celestial Astrolabe Archway
          ========================================================================= */}
      <section className="px-4 py-4">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-center relative">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Moon className="w-4 h-4 text-amber-300 fill-amber-300/20" />
              <h2 className="font-komutt text-lg text-amber-300 tracking-wide">
                ប្រតិទិនមង្គល
              </h2>
            </div>
            <p className="text-xs text-emerald-200/90 font-medium tracking-wider">
              December 2028
            </p>
          </div>

          {/* Calendar Grid */}
          <div className="max-w-xs mx-auto mb-6 bg-black/40 p-4 rounded-2xl border border-emerald-400/20">
            <div className="grid grid-cols-7 gap-1 text-[11px] font-bold text-amber-300/90 mb-2">
              <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs text-stone-300">
              <span className="opacity-30">28</span>
              <span className="opacity-30">29</span>
              <span className="opacity-30">30</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
              <span>6</span>
              <span>7</span>
              <span>8</span>
              <span>9</span>
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
              <span>15</span>
              <span>16</span>
              <span>17</span>
              {/* Highlighted 18th Wedding Day with Moonlit Gold Ring */}
              <span className="relative flex items-center justify-center w-7 h-7 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-emerald-950 font-bold shadow-[0_0_12px_#F59E0B] ring-2 ring-emerald-300 animate-pulse">
                18
              </span>
              <span>19</span>
              <span>20</span>
              <span>21</span>
              <span>22</span>
              <span>23</span>
              <span>24</span>
              <span>25</span>
              <span>26</span>
              <span>27</span>
              <span>28</span>
              <span>29</span>
              <span>30</span>
              <span>31</span>
            </div>
          </div>

          {/* Live Countdown Section */}
          <div className="pt-2 border-t border-emerald-400/30">
            <h3 className="font-komutt text-xs text-emerald-200 mb-3 tracking-widest">
              ✦ រាប់ថយក្រោយ ✦
            </h3>
            <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto mb-4">
              <div className="p-2.5 rounded-t-2xl rounded-b-xl bg-black/50 border border-amber-300/40 text-center shadow">
                <span className="block font-komutt text-lg sm:text-xl text-amber-300">{timeLeft.days}</span>
                <span className="text-[10px] text-emerald-200">ថ្ងៃ</span>
              </div>
              <div className="p-2.5 rounded-t-2xl rounded-b-xl bg-black/50 border border-amber-300/40 text-center shadow">
                <span className="block font-komutt text-lg sm:text-xl text-amber-300">{timeLeft.hours}</span>
                <span className="text-[10px] text-emerald-200">ម៉ោង</span>
              </div>
              <div className="p-2.5 rounded-t-2xl rounded-b-xl bg-black/50 border border-amber-300/40 text-center shadow">
                <span className="block font-komutt text-lg sm:text-xl text-amber-300">{timeLeft.minutes}</span>
                <span className="text-[10px] text-emerald-200">នាទី</span>
              </div>
              <div className="p-2.5 rounded-t-2xl rounded-b-xl bg-black/50 border border-amber-300/40 text-center shadow">
                <span className="block font-komutt text-lg sm:text-xl text-amber-300">{timeLeft.seconds}</span>
                <span className="text-[10px] text-emerald-200">វិនាទី</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const title = encodeURIComponent(`មង្គលការ ${groom} & ${bride}`);
                const loc = encodeURIComponent(locationStr);
                const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20281218T010000Z/20281218T150000Z&details=${encodeURIComponent('សិរីសួស្តីអាពាហ៍ពិពាហ៍')}&location=${loc}`;
                window.open(googleCalUrl, '_blank');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-emerald-950 font-bold text-xs shadow-[0_0_16px_rgba(245,158,11,0.6)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar (បញ្ចូលក្នុងប្រតិទិន)</span>
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. កម្មពិធីសិរីសួស្ដី (THE 7 WEDDING MILESTONES)
          Unique Style: Vertical Crystal Dewdrop & Arched Timeline
          ========================================================================= */}
      <section className="px-4 py-6">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="text-center mb-6">
            <h2 className="font-komutt text-lg sm:text-xl text-amber-300 mb-1">
              កម្មវិធីសិរីសួស្ដី
            </h2>
            <p className="text-xs text-emerald-200/90 font-medium">
              កាលវិភាគនៃពិធីសិរីមង្គលអាពាហ៍ពិពាហ៍
            </p>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-2" />
          </div>

          <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-5 before:w-0.5 before:bg-gradient-to-b before:from-amber-300 before:via-emerald-400 before:to-amber-300">
            {ceremonyPrograms.map((item) => (
              <div
                key={item.num}
                className="flex items-start gap-3.5 relative pl-2"
              >
                {/* Node Pill */}
                <div className="w-7 h-7 rounded-full bg-[#03241D] border-2 border-amber-300 flex items-center justify-center shrink-0 text-amber-300 text-xs font-bold shadow-[0_0_8px_#F59E0B] z-10">
                  {item.num}
                </div>

                {/* Content Box */}
                <div className="flex-1 p-3.5 rounded-2xl bg-black/40 border border-emerald-400/20 hover:border-amber-300/50 transition-colors shadow">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-amber-300/30 text-amber-300 text-[11px] font-bold mb-1">
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                  <h3 className="font-komutt text-xs sm:text-sm text-white leading-relaxed">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. អរគុណ & អធ្យាស្រ័យ (CERTIFICATE OF GRATITUDE)
          ========================================================================= */}
      <section className="px-4 py-4">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-amber-300/60 flex items-center justify-center text-amber-300 mx-auto mb-3 shadow-[0_0_12px_rgba(245,158,11,0.5)]">
            <Award className="w-5 h-5 text-amber-300" />
          </div>

          <h2 className="font-komutt text-base sm:text-lg text-amber-300 mb-3">
            លិខិតថ្លែងអំណរគុណ & អធ្យាស្រ័យ
          </h2>

          <div className="space-y-3 text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-suwannaphum max-w-md mx-auto">
            <p>
              យើងខ្ញុំជាមាតាបិតា និងគូស្វាមីភរិយាថ្មី សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តមរបស់ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា ដែលបានឆ្លៀតពេលវេលាដ៏មានតម្លៃចូលរួមប្រសិទ្ធពរជ័យ។
            </p>
            <p className="text-amber-200/90 italic">
              «វត្តមានដ៏ថ្លៃថ្លារបស់លោកអ្នក គឺជាកិត្តិយសដ៏ខ្ពង់ខ្ពស់ និងជាសិរីមង្គលដ៏ធំធេងសម្រាប់ក្រុមគ្រួសារយើងខ្ញុំទាំងពីរ»
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. ទីតាំងពិធី (CEREMONY LOCATION & MAP NAVIGATION)
          ========================================================================= */}
      <section className="px-4 py-6">
        <TemplateGoogleMap
          locationName={locationStr}
          address={addressStr}
          googleMapsUrl={mapsUrl}
          isDark={true}
          accentColor="#34D399"
          fontFamily="font-komutt"
        />
      </section>

      {/* =========================================================================
          7. រូបថតអនុស្សារីយ៍ (PHOTO GALLERY WITH LIGHTBOX)
          ========================================================================= */}
      <section className="px-4 py-4">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="text-center mb-5">
            <h2 className="font-komutt text-lg text-amber-300 mb-1">
              រូបថតអនុស្សារីយ៍
            </h2>
            <p className="text-xs text-emerald-200/90 font-medium">
              កម្រងរូបភាព Prewedding វិមានកែវរស្មីចន្ទ្រា
            </p>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo.src)}
                className="group relative aspect-[3/4] rounded-t-2xl rounded-b-xl overflow-hidden border border-amber-300/30 cursor-pointer shadow-md"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-2">
                  <p className="text-[10px] text-emerald-100 font-suwannaphum line-clamp-1">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. ជូនចំណងដៃ (GIFT / ABA PAY & BAKONG QR CODE)
          Unique Style: Arched Silk Envelope Presentation
          ========================================================================= */}
      <section className="px-4 py-6">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)] text-center">
          <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-amber-300/60 flex items-center justify-center text-amber-300 mx-auto mb-3 shadow-[0_0_12px_rgba(245,158,11,0.5)]">
            <QrCode className="w-5 h-5 text-amber-300" />
          </div>

          <h2 className="font-komutt text-base sm:text-lg text-amber-300 mb-1">
            ជូនចំណងដៃ (Gift QR Code)
          </h2>
          <p className="text-xs text-emerald-200/90 font-suwannaphum mb-5">
            សម្រាប់ការជូនពរ ឬចំណងដៃតាមរយៈប្រព័ន្ធធនាគារឌីជីថល ({bankName})
          </p>

          <div className="max-w-xs mx-auto p-5 rounded-t-[36px] rounded-b-2xl bg-gradient-to-b from-white to-stone-100 text-stone-900 shadow-2xl border-2 border-amber-300 relative">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-3">
              <span className="font-komutt text-xs text-emerald-900 font-bold">
                {bankName}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                KHQR
              </span>
            </div>

            {/* Stylized QR Frame */}
            <div
              onClick={() => setShowQrModal(true)}
              className="p-3 bg-white rounded-2xl border border-stone-200 shadow-inner mb-3 cursor-pointer relative group"
            >
              {qrCodeImage ? (
                <img
                  src={qrCodeImage}
                  alt="QR Code"
                  className="w-40 h-40 mx-auto object-contain" decoding="async" loading="lazy" />
              ) : (
                <QrCode className="w-40 h-40 mx-auto text-stone-900" />
              )}
              <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] text-white font-bold bg-black/70 px-2 py-1 rounded font-komutt">ចុចដើម្បីពង្រីក</span>
              </div>
            </div>

            <div className="text-center space-y-1 mb-3">
              <p className="font-komutt text-xs text-stone-900">
                {accountName}
              </p>
              <p className="font-mono text-xs font-bold text-emerald-800 tracking-wider">
                {accountNumber} (USD / KHR)
              </p>
            </div>

            <button
              type="button"
              onClick={copyBankInfo}
              className="w-full py-2 px-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow cursor-pointer active:scale-95"
            >
              {copiedAccount ? (
                <>
                  <Check className="w-3.5 h-3.5 text-amber-300" />
                  <span>បានចម្លងលេខគណនី!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-amber-300" />
                  <span>ចម្លងលេខគណនី</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. ការចូលរួម (RSVP FORM)
          Unique Style: Arched Confirmation Desk
          ========================================================================= */}
      <section className="px-4 py-4">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="text-center mb-5">
            <h2 className="font-komutt text-lg text-amber-300 mb-1">
              ការចូលរួម (RSVP)
            </h2>
            <p className="text-xs text-emerald-200/90 font-suwannaphum">
              សូមមេត្តាឆ្លើយតបការចូលរួមដើម្បីជួយសម្រួលដល់ការរៀបចំតុទទួលភ្ញៀវ
            </p>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-2" />
          </div>

          <form onSubmit={handleRsvpSubmit} className="max-w-sm mx-auto space-y-3.5 text-left">
            <div>
              <label className="block text-xs font-medium text-emerald-200 mb-1">
                គោត្តនាម និងនាម (Full Name) *
              </label>
              <input
                type="text"
                required
                placeholder="បញ្ចូលឈ្មោះភ្ញៀវកិត្តិយស"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-400/40 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-200 mb-1">
                ការចូលរួម (Will you attend?)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRsvpAttending('yes')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    rsvpAttending === 'yes'
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 border-amber-300 text-white shadow-[0_0_10px_rgba(52,211,153,0.5)]'
                      : 'bg-black/40 border-emerald-400/30 text-emerald-200/70 hover:bg-black/60'
                  }`}
                >
                  ✓ ចូលរួម (Yes, I will attend)
                </button>
                <button
                  type="button"
                  onClick={() => setRsvpAttending('no')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                    rsvpAttending === 'no'
                      ? 'bg-rose-900/80 border-rose-400 text-white shadow'
                      : 'bg-black/40 border-emerald-400/30 text-emerald-200/70 hover:bg-black/60'
                  }`}
                >
                  ✕ មិនអាចចូលរួម (Regretfully decline)
                </button>
              </div>
            </div>

            {rsvpAttending === 'yes' && (
              <div>
                <label className="block text-xs font-medium text-emerald-200 mb-1">
                  ចំនួនភ្ញៀវចូលរួម (Number of Guests)
                </label>
                <select
                  value={rsvpCount}
                  onChange={(e) => setRsvpCount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-emerald-400/40 text-xs text-white focus:outline-none focus:border-amber-300"
                >
                  <option value="1 នាក់" className="bg-[#03241D]">1 នាក់</option>
                  <option value="2 នាក់" className="bg-[#03241D]">2 នាក់</option>
                  <option value="3 នាក់" className="bg-[#03241D]">3 នាក់</option>
                  <option value="គ្រួសារ (Family)" className="bg-[#03241D]">គ្រួសារ (Family)</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-emerald-950 font-komutt text-xs font-bold shadow-[0_0_14px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              បញ្ជាក់ការឆ្លើយតប (Submit RSVP)
            </button>

            {rsvpSubmitted && (
              <p className="text-center text-xs text-amber-300 font-semibold animate-bounce mt-1">
                ✓ សូមអរគុណ! ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាទុក។
              </p>
            )}
          </form>
        </div>
      </section>

      {/* =========================================================================
          10. សារជូនពរ (WISHES GUESTBOOK)
          ========================================================================= */}
      <section className="px-4 py-6">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 sm:p-8 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <div className="text-center mb-5">
            <h2 className="font-komutt text-lg text-amber-300 mb-1">
              សារជូនពរឌីជីថល
            </h2>
            <p className="text-xs text-emerald-200/90 font-suwannaphum">
              សូមផ្ញើសារជូនពរដល់គូស្វាមីភរិយាថ្មីក្នុងទិវាដ៏មហានក្ខត្តឫក្សនេះ
            </p>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mt-2" />
          </div>

          {/* Existing Wishes Feed */}
          <div className="space-y-2.5 max-w-md mx-auto mb-5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-3.5 rounded-t-2xl rounded-b-xl bg-black/40 border border-emerald-400/20 text-left shadow"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-komutt text-xs text-amber-300">
                    {w.name}
                  </span>
                  <span className="text-[10px] text-emerald-300/60 font-sans">
                    {w.time}
                  </span>
                </div>
                <p className="text-xs text-emerald-100/90 font-suwannaphum leading-relaxed">
                  {w.text}
                </p>
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleAddWish} className="max-w-md mx-auto space-y-3 text-left">
            <div>
              <label className="block text-xs font-medium text-emerald-200 mb-1">
                ឈ្មោះរបស់អ្នក (Your Name) *
              </label>
              <input
                type="text"
                required
                placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-emerald-400/40 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-300"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-emerald-200 mb-1">
                សារជូនពរ (Your Blessing) *
              </label>
              <textarea
                rows={2}
                required
                placeholder="សរសេរពាក្យជូនពរនៅទីនេះ..."
                value={guestMessage}
                onChange={(e) => setGuestMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-emerald-400/40 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-amber-300 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-amber-500 to-emerald-600 text-white font-komutt text-xs font-bold shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ផ្ញើរសារជូនពរ</span>
            </button>

            {guestSubmitted && (
              <p className="text-center text-xs text-amber-300 font-semibold animate-bounce mt-1">
                ✓ សារជូនពររបស់អ្នកត្រូវបានផ្ញើរដោយជោគជ័យ!
              </p>
            )}
          </form>
        </div>
      </section>

      {/* =========================================================================
          11. ទំនាក់ទំនងម្ចាស់ពិធីមង្គល (CONTACT HOSTS)
          ========================================================================= */}
      <section className="px-4 py-4">
        <div className="w-full rounded-t-[44px] rounded-b-3xl bg-gradient-to-b from-[#083D34]/90 via-[#052923]/95 to-[#021815]/98 border border-amber-300/40 ring-1 ring-emerald-400/30 p-6 text-center shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
          <h2 className="font-komutt text-base text-amber-300 mb-1">
            ទំនាក់ទំនងម្ចាស់ពិធីមង្គល
          </h2>
          <p className="text-xs text-emerald-200/90 font-suwannaphum mb-4">
            ប្រសិនបើលោកអ្នកមានសំណួរ ឬត្រូវការការណែនាំផ្លូវ សូមទាក់ទងមកកាន់យើងខ្ញុំ៖
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-md mx-auto">
            <a
              href={`tel:${phoneGroom}`}
              className="py-2.5 px-4 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>ខាងកូនប្រុស៖ {phoneGroom}</span>
            </a>
            <a
              href={`tel:${phoneBride}`}
              className="py-2.5 px-4 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Phone className="w-4 h-4 text-amber-300" />
              <span>ខាងកូនស្រី៖ {phoneBride}</span>
            </a>
            {telegramLink && (
              <a
                href={telegramLink.startsWith('http') ? telegramLink : `https://t.me/${telegramLink}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-[#229ED9]/85 hover:bg-[#229ED9] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 sm:col-span-2"
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
            className="max-w-xs w-full bg-[#083D34] p-6 rounded-3xl border-2 border-amber-300 shadow-2xl text-center"
          >
            <h3 className="font-komutt text-sm text-amber-300 mb-2">QR កូដស្កេនផ្ញើចំណងដៃ</h3>
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
              className="px-6 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer font-komutt"
            >
              បិទ
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          12. FOOTER & SCROLL TO TOP
          ========================================================================= */}
      <footer className="text-center pt-8 pb-4 text-emerald-300/60 text-xs">
        <p className="font-komutt text-xs text-amber-300/90 mb-1">
          មរកតវិមានកែវរស្មីចន្ទ្រា
        </p>
        <p className="text-[11px] mb-4">
          រៀបចំឡើងដោយក្តីស្រឡាញ់ និងការគោរពដ៏ខ្ពង់ខ្ពស់
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-950/80 border border-amber-300/40 text-emerald-200 text-xs font-bold hover:bg-emerald-900 transition-all cursor-pointer shadow-md"
        >
          <ArrowUp className="w-3.5 h-3.5 text-amber-300" />
          <span>ត្រឡប់ទៅលើវិញ</span>
        </button>
      </footer>

      {/* Lightbox Photo Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fade"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-[#032019] rounded-3xl overflow-hidden border border-amber-300/60 shadow-2xl relative"
          >
            <img
              src={selectedPhoto}
              alt="Preview"
              className="w-full max-h-[70vh] object-contain bg-black" decoding="async" />
            <div className="p-4 text-center">
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="px-6 py-2 rounded-full bg-emerald-800 text-white text-xs font-bold cursor-pointer hover:bg-emerald-700"
              >
                បិទ
              </button>
            </div>
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
              ? 'bg-emerald-800 text-white border-amber-400 shadow-emerald-500/30 ring-2 ring-amber-400/40'
              : 'bg-white/90 text-stone-800 border-amber-300 hover:text-black'
          }`}
          title="ភ្លេងមង្គល «ភ្ជាប់និស្ស័យ»"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-amber-200" />
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

export default EmeraldGlasshouseMoonlightTemplate;
