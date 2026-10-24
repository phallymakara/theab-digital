import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { plengKarSynth } from './PinpeatAudio';
import { TraditionalHeroSection } from './TraditionalHeroSection';
import { Calendar, Clock, MapPin, Music, Heart, Send, Copy, Check, X, Phone, CalendarPlus } from 'lucide-react';

export function RoyalPavilionTemplate({ data = {} }) {
  const groom = data.groomName || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន';
  const brideParents = data.brideParents || 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង';
  const dateStr = data.ceremonyDate || 'ថ្ងៃចន្ទ ទី២៥ ខែធ្នូ ឆ្នាំ២០២៨';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ០៦:៣០ ព្រឹក ដល់ ០៨:០០ យប់';
  const locationName = data.ceremonyLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.ceremonyAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const preweddingImg = data.preweddingPhoto || '/images/templates/traditional_royal_pavilion_prewedding.jpg';

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('rsvp'); // 'rsvp' | 'wishes'
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'yes', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'ចាន់ រតនា', text: 'សូមជូនពរឱ្យប្អូនទាំងពីរស្រឡាញ់គ្នាលុះក្បាលត្រជាក់កោងខ្នង រកស៊ីទទួលទានមានបានត្រជាក់ត្រជុំ!' },
    { id: 2, name: 'ញាតិមិត្តកិត្តិយស', text: 'សិរីសួស្តី ជ័យមង្គល វិបុលសុខ បវរមហាប្រសើរក្នុងជីវិតអាពាហ៍ពិពាហ៍ថ្មី!' }
  ]);

  // Live countdown state
  const [timeLeft, setTimeLeft] = useState({ days: '790', hours: '19', mins: '59', secs: '59' });

  useEffect(() => {
    const targetDate = new Date('2028-12-25T06:30:00+07:00').getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = targetDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
          secs: Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0')
        });
      }
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleMusic = () => {
    const res = plengKarSynth.toggle();
    setIsPlaying(res);
  };

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
      confetti({ particleCount: 75, spread: 75, origin: { y: 0.65 }, colors: ['#E5BE53', '#FFF2B2', '#8E6514'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  const gallery = [
    { id: 1, src: preweddingImg, caption: 'ព្រះពន្លាមាស ហោរាសាស្ត្រមង្គល' },
    { id: 2, src: '/images/templates/angkor-heritage/angkor_1.jpg', caption: 'មង្គលសិរីមាសប្រណិត' },
    { id: 3, src: '/images/templates/angkor-heritage/angkor_2.jpg', caption: 'អនុស្សាវរីយ៍ផ្កាស្រស់រ៉ូមែនទិក' },
    { id: 4, src: '/images/templates/angkor-ancient-royalty/ancient_1.jpg', caption: 'ភាពថ្លៃថ្នូរ និងសេចក្តីសុខក្សេមក្សាន្ត' },
    { id: 5, src: '/images/templates/angkor-ancient-royalty/ancient_2.jpg', caption: 'កេរដំណែលប្រពៃណីខ្មែរអង្គរ' },
    { id: 6, src: '/images/templates/traditional_crimson_angkoreach_prewedding.jpg', caption: 'ភាពទាន់សម័យ និងស៊ីវិល័យ' }
  ];

  return (
    <div
      className="w-full relative pb-20 text-[#F7EEDB] font-kantumruy antialiased selection:bg-[#8E6514] selection:text-[#FFF2B2]"
      style={{
        backgroundColor: '#0A0404',
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(229, 190, 83, 0.25) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(142, 101, 20, 0.25) 0%, transparent 70%),
          url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23e5be53' fill-opacity='0.065'%3E%3Cpath d='M36 0 L48 24 L72 36 L48 48 L36 72 L24 48 L0 36 L24 24 Z M36 14 L43 29 L58 36 L43 43 L36 58 L29 43 L14 36 L29 29 Z'/%3E%3Ccircle cx='36' cy='36' r='3' fill='%23fff2b2' fill-opacity='0.12'/%3E%3Ccircle cx='0' cy='0' r='2' fill='%23fff2b2' fill-opacity='0.08'/%3E%3Ccircle cx='72' cy='0' r='2' fill='%23fff2b2' fill-opacity='0.08'/%3E%3Ccircle cx='0' cy='72' r='2' fill='%23fff2b2' fill-opacity='0.08'/%3E%3Ccircle cx='72' cy='72' r='2' fill='%23fff2b2' fill-opacity='0.08'/%3E%3C/g%3E%3C/svg%3E")
        `
      }}
    >
      {/* Reusable SVG Definitions */}
      <svg style={{ display: 'none' }}>
        <defs>
          <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDE8" />
            <stop offset="25%" stopColor="#FCE692" />
            <stop offset="55%" stopColor="#E5BE53" />
            <stop offset="85%" stopColor="#9C6E13" />
            <stop offset="100%" stopColor="#553804" />
          </linearGradient>

          <g id="prasat-meru-gate">
            <path
              d="M160 0 L166 18 C173 14 180 16 184 25 C192 23 200 28 202 38 C215 36 228 44 234 58 C252 56 270 66 295 86 C280 84 265 82 250 82 C230 82 210 90 195 100 C182 82 170 78 160 76 C150 78 138 82 125 100 C110 90 90 82 70 82 C55 82 40 84 25 86 C50 66 68 56 86 58 C92 44 105 36 118 38 C120 28 128 23 136 25 C140 16 147 14 154 18 Z"
              fill="url(#goldLeafGrad)"
              stroke="#503503"
              strokeWidth="1"
            />
            <path
              d="M70 34 L74 48 C78 45 83 47 86 54 C95 53 103 62 108 72 C96 68 85 66 75 68 C64 68 55 72 45 78 C54 66 60 56 70 34 Z"
              fill="url(#goldLeafGrad)"
              stroke="#503503"
              strokeWidth="0.8"
            />
            <path
              d="M250 34 L254 48 C250 45 245 47 242 54 C233 53 225 62 220 72 C232 68 243 66 253 68 C264 68 273 72 283 78 C274 66 268 56 250 34 Z"
              fill="url(#goldLeafGrad)"
              stroke="#503503"
              strokeWidth="0.8"
            />
            <circle cx="160" cy="-6" r="4.5" fill="#FFFDE8" stroke="#9C6E13" strokeWidth="1.5" />
            <circle cx="70" cy="28" r="3.5" fill="#FFFDE8" />
            <circle cx="250" cy="28" r="3.5" fill="#FFFDE8" />
          </g>

          <g id="rumduol-mandala">
            <path d="M40 40 C32 14, 10 14, 6 32 C2 50, 28 50, 40 40 Z" fill="url(#goldLeafGrad)" stroke="#6C4E0B" strokeWidth="0.75" />
            <path d="M40 40 C32 14, 10 14, 6 32 C2 50, 28 50, 40 40 Z" fill="url(#goldLeafGrad)" stroke="#6C4E0B" strokeWidth="0.75" transform="rotate(120 40 40)" />
            <path d="M40 40 C32 14, 10 14, 6 32 C2 50, 28 50, 40 40 Z" fill="url(#goldLeafGrad)" stroke="#6C4E0B" strokeWidth="0.75" transform="rotate(240 40 40)" />
            <circle cx="40" cy="40" r="6" fill="#3D0F14" stroke="#FCE692" strokeWidth="1.8" />
            <circle cx="40" cy="40" r="2.5" fill="#FFFDE8" />
          </g>
        </defs>
      </svg>

      {/* Floating Audio Controller */}
      <aside className="fixed top-5 right-5 z-40">
        <button
          onClick={toggleMusic}
          className="px-4 py-2 rounded-full bg-gradient-to-r from-[#180709] via-[#380E13] to-[#180709] border-2 border-[#E5BE53] text-[#FFF2B2] flex items-center gap-2 shadow-[0_0_20px_rgba(229,190,83,0.35)] hover:scale-105 active:scale-95 transition-all text-xs font-semibold cursor-pointer"
        >
          <Music className={`w-3.5 h-3.5 text-[#E5BE53] ${isPlaying ? 'animate-bounce' : ''}`} />
          <span className="tracking-wider">{isPlaying ? 'ភ្លេងការ (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
        </button>
      </aside>

      {/* Main Container */}
      <div className="w-full relative bg-gradient-to-b from-[#100305] via-[#1A0608] to-[#0A0203] pb-28">
        {/* Full-width Multi-Image Hero Section */}
        <TraditionalHeroSection
          groom={groom}
          bride={bride}
          images={data.heroImages}
          fallbackImage={preweddingImg}
          themeBorder="#E5BE53"
          badgeText="សិរីមង្គលអាពាហ៍ពិពាហ៍"
        />

        {/* 1. HERO GATE */}
        <header className="pt-10 pb-4 px-4 text-center relative">
          <div className="flex justify-center mb-2">
            <svg className="w-72 sm:w-80 h-auto" viewBox="0 0 320 105">
              <use href="#prasat-meru-gate" />
            </svg>
          </div>

          <div className="inline-block px-5 py-1 rounded-full border border-[#E5BE53]/60 bg-[#2E0B10] shadow-[0_0_15px_rgba(229,190,83,0.25)] mb-3">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#FFF2B2] font-semibold">
              ព្រះរាជាណាចក្រកម្ពុជា • ជាតិ សាសនា ព្រះមហាក្សត្រ
            </p>
          </div>

          <p className="text-xs tracking-widest text-[#E5BE53] font-semibold mb-1">
            សិរីសួស្តី ជ័យមង្គល វិបុលសុខ បវរមហាប្រសើរ
          </p>

          <h1 className="font-moul text-2xl sm:text-3xl bg-gradient-to-r from-[#FFFDE8] via-[#E5BE53] to-[#9C6E13] bg-clip-text text-transparent leading-relaxed tracking-wider mb-2">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>

          <p className="text-xs sm:text-sm text-[#E7D6BD] max-w-md mx-auto leading-relaxed px-2">
            យើងខ្ញុំមានកិត្តិយសដ៏ខ្ពង់ខ្ពស់ សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីអាពាហ៍ពិពាហ៍
          </p>
        </header>

        {/* 2. BRIDAL PALANQUIN NAMES */}
        <section className="mt-4 px-4">
          <div
            className="bg-gradient-to-b from-[#2B080D] via-[#1D0609] to-[#120305] rounded-3xl p-5 shadow-2xl relative border-2 border-[#E5BE53]"
            style={{ outline: '1px dashed rgba(255, 242, 178, 0.45)', outlineOffset: '-7px' }}
          >
            <div className="text-center mb-3">
              <span className="inline-flex items-center gap-2 px-4 py-0.5 rounded-full bg-[#100305] border border-[#E5BE53] text-[10px] font-moul text-[#FFF2B2]">
                <span>❖</span> ព្រះពន្លាមង្គលភ្ជាប់និស្ស័យ <span>❖</span>
              </span>
            </div>

            <div className="grid grid-cols-11 gap-1 items-center">
              {/* Groom */}
              <div className="col-span-5 p-3 rounded-2xl bg-gradient-to-b from-[#380E13] to-[#1F070A] border border-[#E5BE53]/60 text-center shadow-lg relative">
                <div className="w-8 h-8 rounded-full border border-[#E5BE53] bg-[#140406] mx-auto flex items-center justify-center mb-2 shadow">
                  <svg className="w-5 h-5"><use href="#rumduol-mandala" /></svg>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#180406] border border-[#E5BE53]/40 text-[10px] font-bold text-[#E5BE53]">
                  កូនកំលោះ
                </span>
                <h2 className="font-moul text-lg sm:text-xl text-[#FFF2B2] mt-2 tracking-wide leading-relaxed">
                  {groom}
                </h2>
                <div className="mt-2 text-[10px] text-[#C7B08B] uppercase tracking-wider">Groom</div>
              </div>

              {/* Knot Center */}
              <div className="col-span-1 flex flex-col items-center justify-center gap-1.5 py-2">
                <div className="w-0.5 h-6 bg-gradient-to-b from-transparent via-[#E5BE53] to-[#E5BE53]"></div>
                <div className="w-7 h-7 rounded-full bg-[#48121A] border-2 border-[#E5BE53] flex items-center justify-center shadow-[0_0_12px_rgba(229,190,83,0.5)]">
                  <span className="font-moul text-[9px] text-[#FFF2B2]">៚</span>
                </div>
                <div className="w-0.5 h-8 bg-gradient-to-b from-[#E5BE53] via-[#FFF2B2] to-[#E5BE53]"></div>
                <div className="w-7 h-7 rounded-full bg-[#48121A] border-2 border-[#E5BE53] flex items-center justify-center shadow-[0_0_12px_rgba(229,190,83,0.5)]">
                  <span className="font-moul text-[8px] text-[#FFF2B2]">មង្គល</span>
                </div>
                <div className="w-0.5 h-6 bg-gradient-to-b from-[#E5BE53] to-transparent"></div>
              </div>

              {/* Bride */}
              <div className="col-span-5 p-3 rounded-2xl bg-gradient-to-b from-[#380E13] to-[#1F070A] border border-[#E5BE53]/60 text-center shadow-lg relative">
                <div className="w-8 h-8 rounded-full border border-[#E5BE53] bg-[#140406] mx-auto flex items-center justify-center mb-2 shadow">
                  <svg className="w-5 h-5"><use href="#rumduol-mandala" /></svg>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#180406] border border-[#E5BE53]/40 text-[10px] font-bold text-[#E5BE53]">
                  កូនក្រមុំ
                </span>
                <h2 className="font-moul text-lg sm:text-xl text-[#FFF2B2] mt-2 tracking-wide leading-relaxed">
                  {bride}
                </h2>
                <div className="mt-2 text-[10px] text-[#C7B08B] uppercase tracking-wider">Bride</div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PARENTS CONCAVE STONE TABLETS */}
        <section className="mt-8 px-4">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-8 bg-[#E5BE53]"></span>
              <h3 className="font-moul text-sm sm:text-base text-[#FFF2B2] tracking-wide">
                សិលាចារឹកមាតាបិតាទាំងសងខាង
              </h3>
              <span className="h-[1px] w-8 bg-[#E5BE53]"></span>
            </div>
            <p className="text-[11px] text-[#E5BE53] mt-0.5">មាតាបិតាទាំងសងខាងសូមគោរពអញ្ជើញ</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Groom's Parents */}
            <div
              className="bg-gradient-to-br from-[#2D090E] via-[#1A0508] to-[#100305] p-6 border-2 border-[#E5BE53]/70 text-center shadow-xl relative"
              style={{
                clipPath: 'polygon(0% 8%, 8% 0%, 92% 0%, 100% 8%, 100% 40%, 95% 50%, 100% 60%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 60%, 5% 50%, 0% 40%)'
              }}
            >
              <div className="w-10 h-10 rounded-full border border-[#E5BE53] bg-[#3B0E14] mx-auto flex items-center justify-center mb-2 shadow">
                <svg className="w-6 h-6"><use href="#rumduol-mandala" /></svg>
              </div>
              <p className="text-xs font-bold text-[#E5BE53] uppercase mb-2 tracking-wider">
                ឪពុកម្ដាយខាងកូនកំលោះ
              </p>
              <div className="space-y-1 text-sm text-[#F7EEDB]">
                <p className="font-bold text-[#FFF2B2] font-moul text-sm leading-relaxed">{groomParents}</p>
              </div>
            </div>

            {/* Bride's Parents */}
            <div
              className="bg-gradient-to-bl from-[#2D090E] via-[#1A0508] to-[#100305] p-6 border-2 border-[#E5BE53]/70 text-center shadow-xl relative"
              style={{
                clipPath: 'polygon(0% 8%, 8% 0%, 92% 0%, 100% 8%, 100% 40%, 95% 50%, 100% 60%, 100% 92%, 92% 100%, 8% 100%, 0% 92%, 0% 60%, 5% 50%, 0% 40%)'
              }}
            >
              <div className="w-10 h-10 rounded-full border border-[#E5BE53] bg-[#3B0E14] mx-auto flex items-center justify-center mb-2 shadow">
                <svg className="w-6 h-6"><use href="#rumduol-mandala" /></svg>
              </div>
              <p className="text-xs font-bold text-[#E5BE53] uppercase mb-2 tracking-wider">
                ឪពុកម្ដាយខាងកូនក្រមុំ
              </p>
              <div className="space-y-1 text-sm text-[#F7EEDB]">
                <p className="font-bold text-[#FFF2B2] font-moul text-sm leading-relaxed">{brideParents}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ASTROLOGICAL ZODIAC SUNDIAL & COUNTDOWN */}
        <section className="mt-9 px-4">
          <div
            className="rounded-3xl p-6 bg-gradient-to-b from-[#22070A] via-[#160406] to-[#0D0204] relative text-center overflow-hidden border-2 border-[#E5BE53]"
            style={{ outline: '1px dashed rgba(255, 242, 178, 0.45)', outlineOffset: '-7px' }}
          >
            <div className="text-center mb-4">
              <h3 className="font-moul text-base text-[#FFF2B2] tracking-wider mb-1">
                ហោរាសាស្ត្រមង្គលរាសី & ប្រតិទិន
              </h3>
              <p className="text-xs text-[#E5BE53]">{dateStr}</p>
            </div>

            {/* Dial Container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-3 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full animate-[spin_90s_linear_infinite] opacity-40 pointer-events-none" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="95" fill="none" stroke="#E5BE53" strokeWidth="1.2" strokeDasharray="4 3" />
                <circle cx="100" cy="100" r="85" fill="none" stroke="#E5BE53" strokeWidth="0.8" />
                <path d="M100 5 L100 15 M100 185 L100 195 M5 100 L15 100 M185 100 L195 100 M33 33 L40 40 M160 160 L167 167 M167 33 L160 40 M33 167 L40 160" stroke="#FFF2B2" strokeWidth="1.5" />
              </svg>

              <div className="absolute inset-4 rounded-full border-2 border-[#E5BE53]/70 bg-gradient-to-b from-[#380E14] to-[#120306] flex items-center justify-center shadow-[inset_0_0_30px_rgba(229,190,83,0.35)]">
                <div className="relative z-10 text-center px-4">
                  <span className="text-[10px] text-[#E5BE53] uppercase tracking-widest block mb-1">
                    រាប់ថយក្រោយឆ្ពោះទៅថ្ងៃជ័យ
                  </span>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 max-w-[160px] mx-auto text-center">
                    <div className="bg-[#1F070A]/90 border border-[#E5BE53]/50 p-1.5 rounded-xl shadow">
                      <span className="font-bold text-lg font-mono text-[#FFF2B2] block">{timeLeft.days}</span>
                      <span className="text-[9px] text-[#E5BE53]">ថ្ងៃ (Days)</span>
                    </div>
                    <div className="bg-[#1F070A]/90 border border-[#E5BE53]/50 p-1.5 rounded-xl shadow">
                      <span className="font-bold text-lg font-mono text-[#FFF2B2] block">{timeLeft.hours}</span>
                      <span className="text-[9px] text-[#E5BE53]">ម៉ោង (Hours)</span>
                    </div>
                    <div className="bg-[#1F070A]/90 border border-[#E5BE53]/50 p-1.5 rounded-xl shadow">
                      <span className="font-bold text-lg font-mono text-[#FFF2B2] block">{timeLeft.mins}</span>
                      <span className="text-[9px] text-[#E5BE53]">នាទី (Mins)</span>
                    </div>
                    <div className="bg-[#1F070A]/90 border border-[#E5BE53]/50 p-1.5 rounded-xl shadow">
                      <span className="font-bold text-lg font-mono text-[#FFF2B2] block">{timeLeft.secs}</span>
                      <span className="text-[9px] text-[#E5BE53]">វិនាទី (Secs)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Matrix */}
            <div className="max-w-xs mx-auto mt-4 p-3.5 rounded-2xl bg-[#140406] border border-[#E5BE53]/40 shadow-inner">
              <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-[#E5BE53] pb-1.5 border-b border-[#E5BE53]/30">
                <span>អា</span><span>ច</span><span>អ</span><span>ព</span><span>ព្រ</span><span>សុ</span><span>ស</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-[#DBCBB1] pt-1.5">
                <span></span><span></span><span></span><span></span><span></span>
                <span className="p-1">1</span><span className="p-1">2</span>
                <span className="p-1">3</span><span className="p-1">4</span><span className="p-1">5</span><span className="p-1">6</span><span className="p-1">7</span><span className="p-1">8</span><span className="p-1">9</span>
                <span className="p-1">10</span><span className="p-1">11</span><span className="p-1">12</span><span className="p-1">13</span><span className="p-1">14</span><span className="p-1">15</span><span className="p-1">16</span>
                <span className="p-1">17</span><span className="p-1">18</span><span className="p-1">19</span><span className="p-1">20</span><span className="p-1">21</span><span className="p-1">22</span><span className="p-1">23</span>
                <span className="p-1">24</span>
                <span className="relative p-1 rounded-lg bg-gradient-to-tr from-[#E5BE53] to-[#8E6514] text-black font-extrabold shadow-[0_0_12px_rgba(229,190,83,0.8)] border border-[#FFF2B2]">
                  25
                </span>
                <span className="p-1">26</span><span className="p-1">27</span><span className="p-1">28</span><span className="p-1">29</span><span className="p-1">30</span>
                <span className="p-1">31</span>
              </div>
            </div>

            {/* Add to Calendar Link */}
            <div className="mt-5">
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=សិរីមង្គលអាពាហ៍ពិពាហ៍+${encodeURIComponent(groom)}+%26+${encodeURIComponent(bride)}&dates=20281225T000000Z/20281225T150000Z&details=មង្គលសិរីសួស្តី+អាពាហ៍ពិពាហ៍+${encodeURIComponent(groom)}+%26+${encodeURIComponent(bride)}&location=${encodeURIComponent(locationName)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E5BE53] via-[#FFF2B2] to-[#8E6514] text-black font-bold text-xs uppercase shadow-xl hover:brightness-110 active:scale-95 transition"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Add to Calendar (បញ្ចូលក្នុងប្រតិទិន)</span>
              </a>
            </div>
          </div>
        </section>

        {/* 5. CEREMONIAL SCHEDULE */}
        <section className="mt-9 px-4">
          <div className="text-center mb-6">
            <h3 className="font-moul text-base text-[#FFF2B2] tracking-wider mb-1">
              គន្លងនាគរាជសួស្តី • កម្មពិធីសិរីមង្គល
            </h3>
            <p className="text-xs text-[#E5BE53]">លំដាប់លំដោយពិធីប្រពៃណីតាមកាលវេលា</p>
          </div>

          <div className="relative max-w-md mx-auto space-y-4">
            {[
              { time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន', num: '១', left: true },
              { time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យ (ជំនូនកាល)', num: '២', left: false },
              { time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍តាមច្បាប់', num: '៣', left: true },
              { time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរីមង្គល', num: '៤', left: false },
              { time: '១០:០០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ', num: '៥', left: true },
              { time: '១២:០០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់', num: '៦', left: false },
              { time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស ពិសាភោជនាហារ', num: '៧', left: true }
            ].map((st, i) => (
              <div key={i} className="flex items-center justify-between gap-3">
                <div className={`w-1/2 ${st.left ? 'text-right pr-3' : 'pr-3'}`}>
                  {st.left && (
                    <>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#380E14] border border-[#E5BE53] text-[10px] font-bold text-[#FFF2B2] mb-1">
                        {st.time}
                      </span>
                      <p className="text-xs font-semibold text-[#F7EEDB]">{st.title}</p>
                    </>
                  )}
                </div>
                <div className="w-8 h-8 rounded-full bg-[#180507] border-2 border-[#E5BE53] z-10 flex items-center justify-center text-[10px] font-bold text-[#FFF2B2] shadow-[0_0_10px_rgba(229,190,83,0.6)] shrink-0">
                  {st.num}
                </div>
                <div className={`w-1/2 ${!st.left ? 'text-left pl-3' : 'pl-3'}`}>
                  {!st.left && (
                    <>
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#380E14] border border-[#E5BE53] text-[10px] font-bold text-[#FFF2B2] mb-1">
                        {st.time}
                      </span>
                      <p className="text-xs font-semibold text-[#F7EEDB]">{st.title}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. GOLDEN OFFERING PLATTER DIGITAL GIFT */}
        <section className="mt-10 px-4">
          <div
            className="bg-gradient-to-b from-[#380F15] via-[#24080D] to-[#120306] border-2 border-[#E5BE53] p-6 text-center shadow-2xl relative"
            style={{
              clipPath: 'polygon(8% 0%, 92% 0%, 100% 15%, 96% 75%, 88% 85%, 68% 88%, 74% 100%, 26% 100%, 32% 88%, 12% 85%, 4% 75%, 0% 15%)'
            }}
          >
            <div className="text-center mb-3">
              <div className="w-11 h-11 rounded-full border-2 border-[#E5BE53] bg-[#481219] mx-auto flex items-center justify-center text-lg text-[#FFF2B2] shadow-lg mb-2">
                <Heart className="w-5 h-5 text-[#FFF2B2] fill-[#FFF2B2]" />
              </div>
              <h3 className="font-moul text-base text-[#FFF2B2] tracking-wider mb-0.5">
                ពានមាសជូនចំណងដៃឌីជីថល
              </h3>
              <p className="text-xs text-[#E5BE53]">{groom} & {bride}</p>
            </div>

            <div className="max-w-xs mx-auto p-4 rounded-2xl bg-[#170508] border border-[#E5BE53]/60 shadow-inner my-2">
              <div className="flex items-center justify-between text-[10px] text-[#E5BE53] border-b border-[#E5BE53]/30 pb-2 mb-2 font-mono">
                <span>ABA PAY / BAKONG</span>
                <span>USD / KHR</span>
              </div>
              <p className="font-bold text-xs text-[#FFF2B2] tracking-wide mb-1 uppercase">HENG VATTANA & KEO CHORNAI</p>
              <div className="bg-[#2B090E] py-2 px-3 rounded-xl border border-[#E5BE53]/40 my-2">
                <span className="text-lg font-mono font-bold text-[#FFF2B2] tracking-widest">012 345 678</span>
              </div>
              <button
                onClick={() => copyAccount('012345678')}
                className="w-full py-2 px-4 rounded-xl bg-gradient-to-r from-[#E5BE53] via-[#FFF2B2] to-[#8E6514] text-black font-bold text-xs flex items-center justify-center gap-2 shadow hover:brightness-110 active:scale-95 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5 text-black" />}
                <span>{copied ? 'បានចម្លងរួចរាល់!' : 'ចម្លងលេខគណនី'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 7. PHOTO GALLERY */}
        <section className="mt-10 px-4">
          <div className="text-center mb-6">
            <h3 className="font-moul text-base text-[#FFF2B2] tracking-wider mb-1">
              ទ្វារជប់ប្រាសាទ • រូបថតអនុស្សារីយ៍
            </h3>
            <p className="text-xs text-[#E5BE53]">ផ្ទាំងទស្សនីយភាពអនុស្សាវរីយ៍គូស្វាមីភរិយា</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="cursor-pointer group relative bg-[#24080D] border-2 border-[#E5BE53]/60 aspect-[3/4] overflow-hidden shadow-lg"
                style={{
                  clipPath: 'polygon(50% 0%, 75% 6%, 92% 16%, 100% 30%, 100% 100%, 0% 100%, 0% 30%, 8% 16%, 25% 6%)'
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black via-black/60 to-transparent text-center">
                  <p className="text-[10px] font-bold text-[#FFF2B2] truncate">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. LOCATION */}
        <section className="mt-10 px-4">
          <div
            className="rounded-3xl p-6 bg-[#1A0508] text-center relative shadow-xl border-2 border-[#E5BE53]"
            style={{ outline: '1px dashed rgba(255, 242, 178, 0.45)', outlineOffset: '-7px' }}
          >
            <h3 className="font-moul text-base text-[#FFF2B2] mb-1">ទីតាំងប្រារព្ធពិធីមង្គល</h3>
            <p className="font-bold text-sm text-[#FFF2B2] mt-2 font-moul leading-relaxed">
              {locationName}
            </p>
            <p className="text-xs text-[#D4C3A9] mt-1 mb-4">
              {address}
            </p>
            <a
              href="https://maps.google.com/?cid=16357496095708519698"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E5BE53] via-[#FFF2B2] to-[#8E6514] text-black font-bold text-xs uppercase shadow-xl hover:brightness-110 active:scale-95 transition"
            >
              <MapPin className="w-4 h-4" />
              <span>បើកមើលក្នុង Google Maps</span>
            </a>
          </div>
        </section>

        {/* 9. RSVP & WISHES ACCORDION BOOK */}
        <section className="mt-10 px-4">
          <div
            className="rounded-3xl p-6 bg-gradient-to-b from-[#2B080D] via-[#1B0508] to-[#100305] shadow-2xl relative border-2 border-[#E5BE53]"
            style={{ outline: '1px dashed rgba(255, 242, 178, 0.45)', outlineOffset: '-7px' }}
          >
            {/* Tabs */}
            <div className="flex items-center justify-center gap-3 border-b border-[#E5BE53]/40 pb-4 mb-5">
              <button
                onClick={() => setActiveTab('rsvp')}
                className={`px-4 py-1.5 rounded-full font-bold text-xs shadow transition cursor-pointer ${
                  activeTab === 'rsvp'
                    ? 'bg-[#E5BE53] text-black'
                    : 'bg-[#180406] border border-[#E5BE53] text-[#FFF2B2]'
                }`}
              >
                ការចូលរួម (RSVP)
              </button>
              <button
                onClick={() => setActiveTab('wishes')}
                className={`px-4 py-1.5 rounded-full font-bold text-xs shadow transition cursor-pointer ${
                  activeTab === 'wishes'
                    ? 'bg-[#E5BE53] text-black'
                    : 'bg-[#180406] border border-[#E5BE53] text-[#FFF2B2]'
                }`}
              >
                សារជូនពរ ({wishesList.length})
              </button>
            </div>

            {/* RSVP Panel */}
            {activeTab === 'rsvp' && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h4 className="font-moul text-sm text-[#FFF2B2]">ការបញ្ជាក់វត្តមាន</h4>
                  <p className="text-[11px] text-[#E5BE53]">សូមមេត្តាឆ្លើយតបដើម្បីឱ្យយើងខ្ញុំរៀបចំទទួលបដិសណ្ឋារកិច្ច</p>
                </div>

                {rsvpDone ? (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/50 text-center text-xs text-emerald-200">
                    <Check className="w-6 h-6 text-emerald-400 mx-auto mb-1" />
                    <p className="font-bold">✓ សូមថ្លែងអំណរគុណ!</p>
                    <p className="text-[11px] mt-1">ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រារួចរាល់។</p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvp} className="space-y-3 text-xs max-w-sm mx-auto">
                    <div>
                      <label className="block text-[#E5BE53] mb-1 font-semibold">ឈ្មោះរបស់អ្នក (Your Name) *</label>
                      <input
                        type="text"
                        required
                        value={rsvp.name}
                        onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                        placeholder="សូមបញ្ចូលឈ្មោះរបស់អ្នក"
                        className="w-full bg-[#140406] border border-[#E5BE53]/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FFF2B2]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#E5BE53] mb-1 font-semibold">តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?</label>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E5BE53]/40 bg-[#140406] cursor-pointer hover:border-[#E5BE53]">
                          <input
                            type="radio"
                            name="rsvp_val"
                            value="yes"
                            checked={rsvp.attendance === 'yes'}
                            onChange={() => setRsvp({ ...rsvp, attendance: 'yes' })}
                            className="accent-[#E5BE53]"
                          />
                          <span className="text-[#FFF2B2]">ចូលរួម</span>
                        </label>
                        <label className="flex items-center gap-2 p-2.5 rounded-xl border border-[#E5BE53]/40 bg-[#140406] cursor-pointer hover:border-[#E5BE53]">
                          <input
                            type="radio"
                            name="rsvp_val"
                            value="no"
                            checked={rsvp.attendance === 'no'}
                            onChange={() => setRsvp({ ...rsvp, attendance: 'no' })}
                            className="accent-[#E5BE53]"
                          />
                          <span className="text-[#FFF2B2]">មិនបានចូលរួម</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#E5BE53] mb-1 font-semibold">ចំនួនអ្នកចូលរួម</label>
                      <select
                        value={rsvp.guests}
                        onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                        className="w-full bg-[#140406] border border-[#E5BE53]/50 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FFF2B2]"
                      >
                        <option>1 នាក់</option>
                        <option>2 នាក់</option>
                        <option>3 នាក់</option>
                        <option>4 នាក់</option>
                        <option>5+ នាក់</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#E5BE53] via-[#FFF2B2] to-[#8E6514] text-black font-bold text-xs uppercase shadow hover:brightness-110 active:scale-95 transition cursor-pointer"
                    >
                      យល់ព្រម (Confirm)
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* Wishes Panel */}
            {activeTab === 'wishes' && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h4 className="font-moul text-sm text-[#FFF2B2]">សារជូនពរដល់គូស្វាមីភរិយា</h4>
                  <p className="text-[11px] text-[#E5BE53]">ផ្ញើសេចក្តីជូនពរជ័យសិរីសួស្តី</p>
                </div>

                <form onSubmit={handleWish} className="space-y-3 text-xs max-w-sm mx-auto">
                  <input
                    type="text"
                    required
                    value={wish.name}
                    onChange={(e) => setWish({ ...wish, name: e.target.value })}
                    placeholder="ឈ្មោះរបស់អ្នក..."
                    className="w-full bg-[#140406] border border-[#E5BE53]/50 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#FFF2B2]"
                  />
                  <textarea
                    required
                    rows="2"
                    value={wish.text}
                    onChange={(e) => setWish({ ...wish, text: e.target.value })}
                    placeholder="សរសេរសារជូនពរនៅទីនេះ..."
                    className="w-full bg-[#140406] border border-[#E5BE53]/50 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-[#FFF2B2]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-[#E5BE53] to-[#8E6514] text-black font-bold text-xs uppercase shadow hover:brightness-110 active:scale-95 transition cursor-pointer"
                  >
                    ផ្ញើរសារជូនពរ
                  </button>
                </form>

                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {wishesList.map((w) => (
                    <div key={w.id} className="p-3 rounded-xl bg-[#140406] border border-[#E5BE53]/30 text-xs">
                      <span className="font-bold text-[#FFF2B2] block">{w.name}</span>
                      <p className="text-[#E7D6BD] mt-0.5">{w.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 10. FOOTER */}
        <footer className="mt-12 pt-8 pb-10 text-center px-4 border-t border-[#E5BE53]/35 bg-[#090203]">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs mb-4">
            <span className="text-[#FFF2B2]">✈️ Telegram: <span className="font-mono">012 345 678</span></span>
            <span className="text-[#FFF2B2]">📞 ទូរស័ព្ទ: <span className="font-mono">012 345 678</span></span>
          </div>

          <p className="font-moul text-xs bg-gradient-to-r from-[#FFFDE8] to-[#E5BE53] bg-clip-text text-transparent mb-1">
            Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល
          </p>
          <p className="text-[11px] text-[#A6864C]">
            សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-5 inline-flex items-center gap-1 text-xs text-[#E5BE53] hover:text-[#FFF2B2] transition cursor-pointer"
          >
            <span>ត្រឡប់ទៅលើវិញ</span>
            <span>↑</span>
          </button>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 text-[#FFF2B2] text-xl w-10 h-10 rounded-full bg-white/10 border border-[#E5BE53] flex items-center justify-center hover:bg-white/20 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={activePhoto.src}
              alt={activePhoto.caption}
              className="max-h-[75vh] w-auto mx-auto rounded-xl border border-[#E5BE53]"
            />
            <p className="mt-3 text-sm text-[#FFF2B2] font-semibold">{activePhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default RoyalPavilionTemplate;
