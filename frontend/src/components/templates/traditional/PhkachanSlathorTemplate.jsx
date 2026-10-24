import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { plengKarSynth } from './PinpeatAudio';
import { TraditionalHeroSection } from './TraditionalHeroSection';
import { Calendar, Clock, MapPin, Music, Heart, Send, Copy, Check, X, CalendarPlus } from 'lucide-react';

export function PhkachanSlathorTemplate({ data = {} }) {
  const groom = data.groomName || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន';
  const brideParents = data.brideParents || 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង';
  const dateStr = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី២៤ ខែធ្នូ ឆ្នាំ២០២៨';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ០៦:៣០ ព្រឹក ដល់ ០៨:០០ យប់';
  const locationName = data.ceremonyLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.ceremonyAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const preweddingImg = data.preweddingPhoto || '/images/templates/traditional_phkachan_slathor_prewedding.jpg';

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'សុខ សំណាង', text: 'សូមប្រសិទ្ធពរជ័យសិរីសួស្តី ស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង រកស៊ីមានបានត្រជាក់ត្រជុំ!' },
    { id: 2, name: 'មិត្តភក្តិជិតដិត', text: 'អបអរសាទរថ្ងៃមង្គលការ! សូមឱ្យមានសុភមង្គលពេញបរិបូរណ៍!' }
  ]);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({ days: '789', hours: '19', mins: '59', secs: '59' });

  useEffect(() => {
    const targetDate = new Date('2028-12-24T06:30:00+07:00').getTime();
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
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 }, colors: ['#D4AF37', '#DC2626', '#FFF6D1'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  const gallery = [
    { id: 1, src: preweddingImg, caption: 'ផ្កាចន្ទន៍ដង្វាយមាស' },
    { id: 2, src: '/images/templates/angkor-heritage/angkor_1.jpg', caption: 'មង្គលសិរីមាស' },
    { id: 3, src: '/images/templates/angkor-heritage/angkor_2.jpg', caption: 'ផ្កាស្រស់រ៉ូមែនទិក' },
    { id: 4, src: '/images/templates/angkor-ancient-royalty/ancient_1.jpg', caption: 'ភាពថ្លៃថ្នូរ' },
    { id: 5, src: '/images/templates/angkor-ancient-royalty/ancient_2.jpg', caption: 'កេរដំណែលអង្គរ' },
    { id: 6, src: '/images/templates/traditional_indigo_hol_prewedding.jpg', caption: 'ភាពស៊ីវិល័យ' }
  ];

  return (
    <div
      className="w-full relative pb-20 text-stone-800 font-kantumruy antialiased selection:bg-[#B88926] selection:text-white bg-pattern-phkachan-slathor"
    >
      {/* Floating Audio Pinpeat Controller */}
      <aside className="fixed bottom-5 right-5 z-40">
        <button
          onClick={toggleMusic}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#8E6514] font-bold text-xs shadow-md border border-[#D4AF37] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Music className={`w-3.5 h-3.5 ${isPlaying ? 'animate-bounce' : ''}`} />
          <span className="font-semibold tracking-wide">{isPlaying ? 'តន្ត្រី (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
        </button>
      </aside>

      <div className="w-full relative pb-20">
        {/* Full-width Multi-Image Hero Section */}
        <TraditionalHeroSection
          groom={groom}
          bride={bride}
          images={data.heroImages}
          fallbackImage={preweddingImg}
          themeBorder="#D4AF37"
          badgeText="សិរីមង្គលអាពាហ៍ពិពាហ៍"
        />

        {/* Content Container with px-4 */}
        <div className="px-4">
          {/* 1. SLATHOR 7-TIER STUPA HEADER */}
          <header className="pt-10 pb-6 text-center relative">
          <div className="w-full flex justify-center mb-2">
            <svg className="w-48 h-auto" viewBox="0 0 200 130" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70 120 L130 120 L125 105 L140 100 L145 92 L55 92 L60 100 L75 105 Z" fill="url(#goldTier)" stroke="#FFEAA7" strokeWidth="1" />
              <path d="M40 92 C55 85 75 88 100 88 C125 88 145 85 160 92 L150 78 C135 74 120 76 100 76 C80 76 65 74 50 78 Z" fill="url(#darkGoldTier)" stroke="#FFEAA7" strokeWidth="0.8" />
              <path d="M52 78 C65 70 80 72 100 72 C120 72 135 70 148 78 L140 64 C128 60 115 62 100 62 C85 62 72 60 60 64 Z" fill="url(#goldTier)" stroke="#FFEAA7" strokeWidth="0.8" />
              <path d="M62 64 C72 58 85 60 100 60 C115 60 128 58 138 64 L132 50 C122 47 112 48 100 48 C88 48 78 47 68 50 Z" fill="url(#darkGoldTier)" stroke="#FFEAA7" strokeWidth="0.8" />
              <path d="M70 50 C80 44 90 46 100 46 C110 46 120 44 130 50 L125 36 C116 34 108 35 100 35 C92 35 84 34 75 36 Z" fill="url(#goldTier)" stroke="#FFEAA7" strokeWidth="0.8" />
              <path d="M78 36 C86 30 93 32 100 32 C107 32 114 30 122 36 L118 22 C112 20 106 21 100 21 C94 21 88 20 82 22 Z" fill="url(#darkGoldTier)" stroke="#FFEAA7" strokeWidth="0.8" />
              <path d="M100 2 L105 15 C108 17 112 18 114 22 L86 22 C88 18 92 17 95 15 Z" fill="url(#goldTier)" stroke="#FFF6D1" strokeWidth="1" />
              <ellipse cx="100" cy="5" rx="3" ry="5" fill="#FFF4CF" />
              <defs>
                <linearGradient id="goldTier" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF5B8" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#8E6514" />
                </linearGradient>
                <linearGradient id="darkGoldTier" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E5C058" />
                  <stop offset="50%" stopColor="#9C6C12" />
                  <stop offset="100%" stopColor="#4D3507" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="text-xs text-[#8E6514] tracking-widest uppercase mb-1 font-semibold">
            សិរីសួស្តី ជ័យមង្គល វិបុលសុខ
          </p>
          <h1 className="font-moul text-2xl md:text-3xl text-[#8E6514] tracking-wider leading-relaxed">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          <p className="text-xs text-stone-600 max-w-sm mx-auto leading-loose mt-1">
            សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា និងប្រិយមិត្តជិតឆ្ងាយ
          </p>
        </header>

        {/* 2. SACRED RED SILK BINDING CORD & COUPLE MEDALLIONS */}
        <section className="my-6 relative">
          <div className="relative bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/80 rounded-3xl p-6 shadow-md overflow-hidden">
            {/* Red Silk Glowing Cord */}
            <div
              className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-2.5 bg-gradient-to-r from-[#DC2626] via-[#F87171] to-[#DC2626] rounded-full z-0"
              style={{
                boxShadow: '0 0 12px rgba(220, 38, 38, 0.4), inset 0 0 6px rgba(254, 202, 202, 0.4)'
              }}
            ></div>

            <div className="grid grid-cols-2 gap-4 relative z-10">
              {/* Groom */}
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FAF7F2] border-4 border-[#D4AF37] p-1.5 shadow-md relative group">
                  <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37] flex flex-col items-center justify-center p-2 bg-white">
                    <span className="text-[10px] text-[#8E6514] bg-[#FAF7F2] px-2 py-0.5 rounded-full mb-1 border border-[#D4AF37]/40 font-semibold">
                      កូនកំលោះ
                    </span>
                    <h2 className="font-moul text-sm sm:text-base text-stone-900 leading-tight">
                      {groom}
                    </h2>
                  </div>
                </div>
                <span className="mt-2 text-[11px] font-moul text-[#8E6514]">កូនកំលោះ</span>
              </div>

              {/* Knot Center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF6D1] to-[#D4AF37] border-2 border-white flex flex-col items-center justify-center text-stone-900 font-moul text-[9px] shadow-md z-20">
                <span>សែន</span>
                <span>ចងដៃ</span>
              </div>

              {/* Bride */}
              <div className="flex flex-col items-center text-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#FAF7F2] border-4 border-[#D4AF37] p-1.5 shadow-md relative group">
                  <div className="w-full h-full rounded-full border border-dashed border-[#D4AF37] flex flex-col items-center justify-center p-2 bg-white">
                    <span className="text-[10px] text-[#8E6514] bg-[#FAF7F2] px-2 py-0.5 rounded-full mb-1 border border-[#D4AF37]/40 font-semibold">
                      កូនក្រមុំ
                    </span>
                    <h2 className="font-moul text-sm sm:text-base text-stone-900 leading-tight">
                      {bride}
                    </h2>
                  </div>
                </div>
                <span className="mt-2 text-[11px] font-moul text-[#8E6514]">កូនក្រមុំ</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#D4AF37]/20 text-center">
              <p className="text-xs text-stone-600 italic">
                "សំពះផ្ទឹម ចងដៃសិរីសួស្តី ព្រះថោងតោងស្បៃនាងនាគចូលរោងជ័យ"
              </p>
            </div>
          </div>
        </section>

        {/* 3. PEDESTAL TRAYS OF FILIAL GRATITUDE */}
        <section className="my-10">
          <div className="text-center mb-6">
            <span className="inline-block font-moul text-xs sm:text-sm text-[#8E6514] border-b-2 border-[#D4AF37] pb-1 px-4 tracking-wider">
              ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Groom's Side */}
            <div
              className="bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/70 p-6 text-center shadow-md"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 98% 25%, 85% 75%, 90% 100%, 10% 100%, 15% 75%, 2% 25%)'
              }}
            >
              <div className="inline-block px-3 py-0.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/60 text-[#8E6514] text-[11px] mb-2 font-semibold">
                ដង្វាយគុណខាងកូនកំលោះ
              </div>
              <div className="space-y-1 text-xs text-stone-700">
                <p className="font-moul text-sm text-stone-900 leading-relaxed">{groomParents}</p>
              </div>
              <div className="mt-3 text-xs text-[#8E6514]">✦ ផ្កាឈូកសិរីមង្គល ✦</div>
            </div>

            {/* Bride's Side */}
            <div
              className="bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/70 p-6 text-center shadow-md"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 98% 25%, 85% 75%, 90% 100%, 10% 100%, 15% 75%, 2% 25%)'
              }}
            >
              <div className="inline-block px-3 py-0.5 rounded-full bg-[#FAF7F2] border border-[#D4AF37]/60 text-[#8E6514] text-[11px] mb-2 font-semibold">
                ដង្វាយគុណខាងកូនក្រមុំ
              </div>
              <div className="space-y-1 text-xs text-stone-700">
                <p className="font-moul text-sm text-stone-900 leading-relaxed">{brideParents}</p>
              </div>
              <div className="mt-3 text-xs text-[#8E6514]">✦ ផ្កាឈូកសិរីមង្គល ✦</div>
            </div>
          </div>
        </section>

        {/* 4. ASTROLOGICAL YANTRA 8 DIRECTIONS */}
        <section className="my-10">
          <div
            className="bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/80 p-8 text-center shadow-md relative"
            style={{
              clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
            }}
          >
            <div className="text-center mb-4">
              <span className="text-xs font-moul text-[#8E6514]">យ័ន្តជ័យមង្គល ៨ ទិស</span>
              <h3 className="font-moul text-base text-stone-900 mt-1">ប្រតិទិនមង្គលការ</h3>
              <p className="text-xs text-stone-600">{dateStr}</p>
            </div>

            {/* Calendar */}
            <div className="bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-xl p-3 mb-5 max-w-xs mx-auto shadow-xs">
              <div className="grid grid-cols-7 gap-1 text-center font-bold text-[11px] text-[#8E6514] mb-1.5 border-b border-[#D4AF37]/30 pb-1">
                <span>អា</span><span>ច</span><span>អ</span><span>ព</span><span>ព្រ</span><span>សុ</span><span>ស</span>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-stone-700 font-medium">
                <span className="text-transparent">0</span><span className="text-transparent">0</span>
                <span className="text-transparent">0</span><span className="text-transparent">0</span>
                <span className="text-transparent">0</span>
                <span>1</span><span>2</span>
                <span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                <span>10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
                <span>17</span><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span>
                <span className="bg-gradient-to-br from-[#E5C058] to-[#B88926] text-stone-900 font-bold rounded-md flex items-center justify-center shadow-xs scale-105 ring-1 ring-white">
                  24
                </span>
                <span>25</span><span>26</span><span>27</span><span>28</span><span>29</span><span>30</span>
                <span>31</span>
              </div>
            </div>

            {/* 4 Directions Timer */}
            <div className="grid grid-cols-4 gap-2 text-center max-w-sm mx-auto mb-4">
              <div className="p-2 rounded-lg bg-white border border-[#D4AF37]/40 shadow-xs">
                <span className="block font-mono text-lg font-bold text-stone-900">{timeLeft.days}</span>
                <span className="text-[9px] text-[#8E6514]">ថ្ងៃ</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#D4AF37]/40 shadow-xs">
                <span className="block font-mono text-lg font-bold text-stone-900">{timeLeft.hours}</span>
                <span className="text-[9px] text-[#8E6514]">ម៉ោង</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#D4AF37]/40 shadow-xs">
                <span className="block font-mono text-lg font-bold text-stone-900">{timeLeft.mins}</span>
                <span className="text-[9px] text-[#8E6514]">នាទី</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#D4AF37]/40 shadow-xs">
                <span className="block font-mono text-lg font-bold text-stone-900">{timeLeft.secs}</span>
                <span className="text-[9px] text-[#8E6514]">វិនាទី</span>
              </div>
            </div>

            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=សិរីមង្គលអាពាហ៍ពិពាហ៍+${encodeURIComponent(groom)}+%26+${encodeURIComponent(bride)}&dates=20281224T063000/20281224T220000&location=${encodeURIComponent(locationName)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#B88926] via-[#FFF6D1] to-[#E5C058] text-stone-900 font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition"
            >
              <CalendarPlus className="w-3.5 h-3.5" />
              <span>Add to Calendar (បញ្ចូលក្នុងប្រតិទិន)</span>
            </a>
          </div>
        </section>

        {/* 5. JASMINE GARLAND 7-STAGE TIMELINE */}
        <section className="my-10">
          <div className="text-center mb-6">
            <h3 className="font-moul text-base text-[#8E6514]">កម្មពិធីសិរីសួស្ដី</h3>
            <p className="text-xs text-stone-600">តាមគន្លងប្រពៃណីព្រះពុទ្ធសាសនា និងបុរាណាចារ្យខ្មែរ</p>
          </div>

          <div className="relative max-w-md mx-auto pl-8 space-y-4 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-1 before:bg-gradient-to-b before:from-[#D4AF37] before:via-[#FFEAA7] before:to-transparent before:rounded-full">
            {[
              { num: '១', time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
              { num: '២', time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យ (ជំនូនកាល)' },
              { num: '៣', time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍' },
              { num: '៤', time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរី' },
              { num: '៥', time: '១០:០០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
              { num: '៦', time: '១២:០០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់' },
              { num: '៧', time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស ពិសាភោជនាហារ' }
            ].map((st, i) => (
              <div key={i} className="relative flex items-start gap-3">
                <span className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-[#D4AF37] text-stone-900 font-bold text-[11px] flex items-center justify-center ring-4 ring-[#FAF7F2] shadow-xs">
                  {st.num}
                </span>
                <div className="flex-1 bg-white/95 backdrop-blur-md border border-[#D4AF37]/40 p-2.5 rounded-r-xl shadow-xs">
                  <span className="text-[11px] font-bold text-[#8E6514] bg-[#FAF7F2] border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                    {st.time}
                  </span>
                  <p className="text-xs text-stone-800 font-semibold mt-1">{st.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. THANK YOU & LOCATION */}
        <section className="my-10 text-center">
          <div className="bg-white/95 backdrop-blur-md border border-[#D4AF37]/40 p-5 rounded-2xl mb-6 relative shadow-xs">
            <span className="text-xl text-[#8E6514]">❝</span>
            <h4 className="font-moul text-xs text-[#8E6514] mb-2">អរគុណ & អធ្យាស្រ័យ</h4>
            <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto italic">
              "យើងខ្ញុំ សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមាន ភ្ញៀវកិត្តិយសទាំងអស់ ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីនេះ។ ប្រសិនបើមានការខ្វះខាត ឬទទួលភ្ញៀវមិនបានដិតដល់ត្រង់ចំណុចណាមួយ សូមមេត្តាខន្តី និងអធ្យាស្រ័យដោយក្តីអនុគ្រោះ។"
            </p>
            <span className="text-xl text-[#8E6514]">❞</span>
          </div>

          <div className="bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/80 p-6 rounded-3xl shadow-md">
            <h4 className="font-moul text-sm text-[#8E6514] mb-1">ទីតាំងប្រារព្ធពិធី</h4>
            <p className="font-bold text-sm text-stone-900 mt-1 font-moul leading-relaxed">{locationName}</p>
            <p className="text-xs text-stone-600 mt-1 mb-4">{address}</p>
            <a
              href="https://maps.google.com/?q=The+Premier+Centre+Sen+Sok+Phnom+Penh"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B88926] via-[#FFF6D1] to-[#E5C058] text-stone-900 font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>បើកមើលក្នុង Google Maps</span>
            </a>
          </div>
        </section>

        {/* 7. GALLERY */}
        <section className="my-10">
          <div className="text-center mb-6">
            <h3 className="font-moul text-base text-[#8E6514]">រូបថតអនុស្សារីយ៍</h3>
            <p className="text-xs text-stone-600">អនុស្សាវរីយ៍ផ្អែមល្ហែម និងប្រពៃណីខ្មែរ</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {gallery.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="cursor-pointer group relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 aspect-square bg-stone-100 shadow-xs hover:border-[#8E6514] transition"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent opacity-80"></div>
                <p className="absolute bottom-1.5 inset-x-1 text-center text-[10px] font-bold text-[#FFF6D1] truncate">
                  {photo.caption}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 8. DIGITAL GIFT */}
        <section className="my-10">
          <div className="bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/80 p-6 rounded-3xl shadow-md text-center relative overflow-hidden">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] border border-[#D4AF37] text-[#8E6514] font-bold flex items-center justify-center text-xl mb-2 shadow-xs">
              <Heart className="w-6 h-6 text-[#8E6514] fill-[#8E6514]" />
            </div>
            <h3 className="font-moul text-base text-[#8E6514]">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h3>
            <p className="text-xs text-stone-600 mb-4">{groom} & {bride}</p>

            <div className="bg-[#FAF7F2] border border-[#D4AF37]/50 rounded-2xl p-4 max-w-xs mx-auto shadow-xs">
              <p className="text-[10px] font-bold text-[#8E6514] tracking-widest uppercase">ABA PAY / BAKONG</p>
              <p className="font-bold text-xs text-stone-800 mt-1 uppercase">HENG VATTANA & KEO CHORNAI</p>
              <p className="font-mono text-lg font-bold text-[#8E6514] tracking-widest my-2">012 345 678</p>
              <button
                onClick={() => copyAccount('012345678')}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-[#B88926] via-[#FFF6D1] to-[#E5C058] text-stone-900 font-bold text-xs shadow-xs hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Copy className="w-3.5 h-3.5 text-stone-900" />}
                <span>{copied ? '✓ បានចម្លងរួចរាល់!' : 'ចម្លងលេខគណនី'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 9. RSVP & WISHES */}
        <section className="my-10 space-y-6">
          <div className="bg-white/95 backdrop-blur-md border border-[#D4AF37]/50 rounded-2xl p-5 shadow-xs">
            <h4 className="font-moul text-xs sm:text-sm text-[#8E6514] text-center mb-4">ការចូលរួម (RSVP)</h4>
            {rsvpDone ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center text-xs text-emerald-800">
                <Check className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                <p className="font-bold">✓ បានកត់ត្រាការឆ្លើយតបរួចរាល់!</p>
              </div>
            ) : (
              <form onSubmit={handleRsvp} className="space-y-3 max-w-sm mx-auto text-xs">
                <div>
                  <label className="block text-[#8E6514] mb-1 font-semibold">ឈ្មោះរបស់អ្នក (Your Name) *</label>
                  <input
                    type="text"
                    required
                    value={rsvp.name}
                    onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                    placeholder="សូមបញ្ចូលឈ្មោះ..."
                    className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg p-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#8E6514]"
                  />
                </div>
                <div>
                  <label className="block text-[#8E6514] mb-1 font-semibold">តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?</label>
                  <select
                    value={rsvp.attendance}
                    onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-[#8E6514]"
                  >
                    <option value="attending">ចូលរួម (Attending)</option>
                    <option value="not_attending">មិនបានចូលរួម (Not Attending)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#8E6514] mb-1 font-semibold">ចំនួនអ្នកចូលរួម</label>
                  <select
                    value={rsvp.guests}
                    onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-[#8E6514]"
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
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#B88926] via-[#FFF6D1] to-[#E5C058] text-stone-900 font-bold text-xs hover:brightness-105 active:scale-95 shadow-md cursor-pointer transition"
                >
                  យល់ព្រម (Confirm)
                </button>
              </form>
            )}
          </div>

          <div className="bg-white/95 backdrop-blur-md border border-[#D4AF37]/50 rounded-2xl p-5 shadow-xs">
            <h4 className="font-moul text-xs sm:text-sm text-[#8E6514] text-center mb-4">សារជូនពរ</h4>
            <form onSubmit={handleWish} className="space-y-3 max-w-sm mx-auto text-xs mb-4">
              <input
                type="text"
                required
                value={wish.name}
                onChange={(e) => setWish({ ...wish, name: e.target.value })}
                placeholder="ឈ្មោះរបស់អ្នក..."
                className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg p-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#8E6514]"
              />
              <textarea
                required
                rows="2"
                value={wish.text}
                onChange={(e) => setWish({ ...wish, text: e.target.value })}
                placeholder="សារជូនពររបស់អ្នក..."
                className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg p-2 text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#8E6514]"
              />
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#B88926] via-[#FFF6D1] to-[#E5C058] text-stone-900 font-bold text-xs hover:brightness-105 active:scale-95 shadow-xs cursor-pointer transition"
              >
                ផ្ញើរសារជូនពរ
              </button>
            </form>

            <div className="space-y-2 max-h-36 overflow-y-auto">
              {wishesList.map((w) => (
                <div key={w.id} className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/20 text-xs shadow-xs">
                  <span className="font-bold text-[#8E6514]">{w.name}៖ </span>
                  <span className="text-stone-700">{w.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. FOOTER */}
        <footer className="pt-6 border-t border-[#D4AF37]/20 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-3 text-xs text-[#8E6514] mb-4">
            <span>✈️ Telegram: <span className="font-mono text-stone-800">012 345 678</span></span>
            <span>📞 ទូរស័ព្ទ: <span className="font-mono text-stone-800">012 345 678</span></span>
          </div>
          <p className="font-moul text-xs text-[#8E6514]">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
          <p className="text-[11px] text-stone-500 mt-1 mb-4">សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xs text-[#8E6514] underline cursor-pointer"
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
            className="relative max-w-md w-full bg-[#1A0508] border-2 border-[#D4AF37] p-2 rounded-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={activePhoto.src} alt={activePhoto.caption} className="w-full rounded-xl object-contain max-h-[70vh]" />
            <p className="text-center text-xs text-[#F6DE84] mt-2 font-semibold">{activePhoto.caption}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default PhkachanSlathorTemplate;
