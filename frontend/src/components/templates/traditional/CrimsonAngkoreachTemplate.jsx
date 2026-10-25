import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { plengKarSynth } from './PinpeatAudio';
import { Calendar, Clock, MapPin, Music, Heart, Send, Copy, Check, X, Phone, MessageCircle, QrCode } from 'lucide-react';
import { TraditionalHeroSection } from './TraditionalHeroSection';

export function CrimsonAngkoreachTemplate({ data = {} }) {
  const groom = data.groomName || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន';
  const brideParents = data.brideParents || 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង';
  const dateStr = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ';
  const locationName = data.ceremonyLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.locationAddress || data.ceremonyAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const googleMapsUrl = data.googleMapsUrl || 'https://maps.google.com';
  const preweddingImg = data.preweddingPhoto || data.bgImage || '/images/templates/traditional_crimson_angkoreach_prewedding.jpg';

  // Bank Info
  const bankName = data.bankName || 'ABA Bank';
  const accountName = data.accountName || `${groom} & ${bride}`;
  const accountNumber = data.accountNumber || '000 987 654';
  const qrCodeImage = data.qrCodeImage || 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ABA000987654';

  // Host phone & telegram contacts
  const phoneGroom = data.hostPhoneGroom || '012 345 678';
  const phoneBride = data.hostPhoneBride || '098 765 432';
  const telegramLink = data.telegramLink || 'https://t.me/theab_invitation';

  // Gallery Photos (up to 12)
  const gallery = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : [
        { id: 1, src: '/images/templates/traditional-crimson/angkoreach_1.jpg', caption: 'រស្មីក្បាច់អង្គរាជ និងស្នេហ៍អមតៈ' },
        { id: 2, src: '/images/templates/traditional-crimson/angkoreach_2.jpg', caption: 'ភាពថ្លៃថ្នូរនៃរាជវាំងខ្មែរ' },
        { id: 3, src: '/images/templates/traditional-crimson/angkoreach_3.jpg', caption: 'ពន្លឺចែងចាំងសូត្រលា័ក្ខមាស' },
        { id: 4, src: '/images/templates/traditional-crimson/angkoreach_4.jpg', caption: 'សច្ចាស្នេហ៍និរន្តរ៍កាល' },
        { id: 5, src: '/images/templates/traditional-crimson/angkoreach_5.jpg', caption: 'កេរដំណែលមង្គលបុរាណ' },
        { id: 6, src: '/images/templates/traditional-crimson/angkoreach_6.jpg', caption: 'ចំណងអាពាហ៍ពិពាហ៍ជ័យមង្គល' }
      ];

  // Programs / Milestones
  const programs = (data.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { num: 1, time: '០៦:៣០ ព្រឹក', title: 'ពិធីជួបជុំភ្ញៀវកិត្តិយស និងរៀបចំហែចំនូន', desc: 'ជួបជុំបងប្អូន ញាតិមិត្តជិតឆ្ងាយ និងភ្ញៀវកិត្តិយស' },
        { num: 2, time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូន (កំណត់វេលាចូលរោងជ័យ)', desc: 'ក្បួនហែជំនូនផ្លែឈើ និងគ្រឿងដង្វាយចូលរោងជ័យ' },
        { num: 3, time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍', desc: 'ពិធីផ្លូវការចំពោះមុខមន្ត្រីអត្រានុកូលដ្ឋាន' },
        { num: 4, time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរី និងជ័យមង្គល', desc: 'កាត់សក់ប្រសិទ្ធពរជ័យ កម្ចាត់ឧបទ្រពចង្រៃ' },
        { num: 5, time: '១០:០០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងតោងស្បៃ', desc: 'សំពះផ្ទឹមក្រងផ្កាស្លា ចងអំបោះក្រហមប្រសិទ្ធពរ' },
        { num: 6, time: '១១:៣០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់', desc: 'ពិសារអាហារសាមគ្គីជួបជុំគ្រួសារ និងភ្ញៀវកិត្តិយស' },
        { num: 7, time: '០៥:០០ ល្ងាច', title: 'ពិសារភោជនាហារ និងបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស', desc: 'ទទួលបដិសណ្ឋារកិច្ច និងរាត្រីសមោសរមង្គលការ' }
      ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'អ៊ុំ ប្រុស-ស្រី', text: 'សូមឱ្យក្មួយទាំងពីរស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំជានិច្ច!' }
  ]);

  const [timeLeft, setTimeLeft] = useState({ days: '18', hours: '08', minutes: '42', seconds: '15' });

  useEffect(() => {
    const target = new Date('2027-01-10T17:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    }, 1000);
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
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 }, colors: ['#D4AF37', '#881337', '#BE123C'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  return (
    <div
      className="w-full relative text-stone-800 font-kantumruy antialiased selection:bg-[#BE123C] selection:text-white pb-20 bg-pattern-crimson-angkoreach"
    >
      {/* Pinned Scenery Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-all duration-700 opacity-25"
        style={{
          backgroundImage: `url(${preweddingImg})`
        }}
      />

      {/* Floating Audio Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-stone-800 font-bold text-xs shadow-lg border-2 border-[#D4AF37]/60 cursor-pointer active:scale-95 transition"
      >
        <Music className={`w-4 h-4 text-[#BE123C] ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'ភ្លេងការ (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
      </button>

      <div className="w-full relative z-10">
        {/* Top Hero Section with Multiple Images Carousel */}
        <TraditionalHeroSection
          templateId="traditional-crimson-angkoreach"
          groom={groom}
          bride={bride}
          images={data.heroImages}
          fallbackImage={preweddingImg}
          themeBorder="#D4AF37"
          badgeText="សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍"
        />

        {/* Header */}
        <header className="text-center pt-8 pb-8 px-6 relative">
          <div className="text-[#BE123C] text-xl mb-2">❖ ❖ ❖</div>
          <p className="text-xs tracking-widest text-[#881337] uppercase mb-1 font-semibold">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
          <h1 className="font-moul text-2xl sm:text-3xl text-[#881337] leading-relaxed tracking-wider mb-2">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          <p className="text-xs text-stone-600 italic mb-6">ក្បាច់អង្គរាជ និងក្រឡាសំណាញ់ពេជ្រសូត្រមាស</p>

          {/* Couple Frame */}
          <div className="my-6 p-6 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-[#BE123C]/35 shadow-md">
            <div className="text-2xl sm:text-3xl font-moul text-stone-900 tracking-wide mb-1">{groom}</div>
            <div className="my-2 text-[#BE123C] font-semibold text-xs tracking-widest font-moul">✦ ជួបប្រសព្វនឹង ✦</div>
            <div className="text-2xl sm:text-3xl font-moul text-stone-900 tracking-wide">{bride}</div>
          </div>

          {/* Prewedding Photo */}
          <div className="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-lg relative group">
            <img src={preweddingImg} alt={`${groom} & ${bride}`} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Countdown */}
          <div className="my-8 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/40 max-w-sm mx-auto shadow-xs text-center">
            <p className="text-xs text-[#881337] font-moul mb-3 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#BE123C]" />
              <span>រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល</span>
            </p>
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 rounded-lg bg-[#FFF5F5] border border-rose-200 shadow-2xs">
                <span className="text-lg font-bold text-[#BE123C] font-mono">{timeLeft.days}</span>
                <span className="block text-[10px] text-stone-600 font-medium">ថ្ងៃ</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FFF5F5] border border-rose-200 shadow-2xs">
                <span className="text-lg font-bold text-[#BE123C] font-mono">{timeLeft.hours}</span>
                <span className="block text-[10px] text-stone-600 font-medium">ម៉ោង</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FFF5F5] border border-rose-200 shadow-2xs">
                <span className="text-lg font-bold text-[#BE123C] font-mono">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-stone-600 font-medium">នាទី</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FFF5F5] border border-rose-200 shadow-2xs">
                <span className="text-lg font-bold text-[#BE123C] font-mono">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-stone-600 font-medium">វិនាទី</span>
              </div>
            </div>
          </div>
        </header>

        {/* Parents */}
        <section className="px-6 py-6 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#881337] text-base mb-6">មាតាបិតាទាំងសងខាង</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-xs">
              <p className="text-xs text-[#881337] font-semibold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
              <p className="font-semibold text-sm text-stone-800 leading-relaxed">{groomParents}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/35 shadow-xs">
              <p className="text-xs text-[#881337] font-semibold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
              <p className="font-semibold text-sm text-stone-800 leading-relaxed">{brideParents}</p>
            </div>
          </div>
        </section>

        {/* Timeline / 7 Milestones */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#881337] text-base mb-2">កាលវិភាគកម្មវិធីមង្គលការ</h2>
          <p className="text-xs text-center text-stone-600 mb-6">{dateStr} • {timeStr}</p>
          <div className="space-y-3">
            {programs.map((item, i) => (
              <div key={i} className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 shadow-2xs">
                <span className="text-xs font-bold text-[#BE123C] bg-[#FFF1F2] px-2.5 py-1 rounded-lg shrink-0 border border-rose-200 mt-0.5">
                  {item.time}
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 mb-0.5">
                    {item.title || item.event || item.text}
                  </h3>
                  {item.desc && (
                    <p className="text-[11px] text-stone-600 leading-relaxed">{item.desc}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery (up to 12 Photos) */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <div className="text-center mb-6">
            <h2 className="font-moul text-[#881337] text-base mb-1">រូបថតអនុស្សាវរីយ៍</h2>
            <p className="text-xs text-stone-600">កម្រងរូបភាព Pre-Wedding នៃក្តីស្រឡាញ់ដ៏បរិសុទ្ធ</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {gallery.map((p, idx) => (
              <div
                key={p.id || idx}
                onClick={() => setActivePhoto(p.src)}
                className="group rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-stone-100 cursor-pointer hover:border-[#BE123C] transition relative aspect-square shadow-2xs"
              >
                <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 justify-center">
                  <span className="text-[11px] font-semibold text-white truncate">{p.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location & Google Maps */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30 text-center">
          <h2 className="font-moul text-[#881337] text-base mb-2">ទីតាំងប្រារព្ធពិធី</h2>
          <p className="text-sm font-bold text-stone-900 mb-1">{locationName}</p>
          <p className="text-xs text-stone-600 mb-5 leading-relaxed max-w-sm mx-auto">{address}</p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#BE123C] to-[#9F1239] text-white font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>បើកមើលក្នុង Google Maps</span>
          </a>
        </section>

        {/* Digital Gift / Bank QR */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30 text-center">
          <h2 className="font-moul text-[#881337] text-base mb-2">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h2>
          <p className="text-xs text-stone-600 mb-6 font-semibold">សម្រាប់ភ្ញៀវកិត្តិយសដែលមានបំណងចងដៃតាមរយៈគណនីធនាគារ</p>
          <div className="p-6 rounded-2xl bg-white/95 border-2 border-[#BE123C]/35 max-w-sm mx-auto shadow-md space-y-4">
            {qrCodeImage && (
              <div
                onClick={() => setShowQrModal(true)}
                className="w-36 h-36 mx-auto rounded-xl border border-stone-200 bg-white p-2 shadow-2xs cursor-pointer hover:scale-105 transition-transform"
              >
                <img src={qrCodeImage} alt="Bank QR" className="w-full h-full object-contain" />
                <span className="block text-[9px] text-stone-400 mt-1">ចុចពង្រីក QR</span>
              </div>
            )}

            <div>
              <p className="text-xs text-[#BE123C] uppercase tracking-wider font-bold mb-1">{bankName}</p>
              <p className="font-bold text-sm text-stone-900 uppercase">{accountName}</p>
              <p className="text-lg font-mono tracking-widest text-[#BE123C] font-bold my-2">{accountNumber}</p>
            </div>

            <button
              onClick={() => copyAccount(accountNumber)}
              className="text-xs bg-[#FFF1F2] hover:bg-[#FFE4E6] text-[#BE123C] border border-rose-200 px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 mx-auto font-bold shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលេខគណនី'}</span>
            </button>
          </div>
        </section>

        {/* Host Contacts (Phone & Telegram) */}
        <section className="px-6 py-6 border-t border-[#D4AF37]/30 text-center">
          <h2 className="font-moul text-[#881337] text-base mb-4">ទំនាក់ទំនងម្ចាស់ដើមការ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
            <a
              href={`tel:${phoneGroom}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-rose-200 text-stone-800 text-xs font-bold hover:bg-rose-50 transition active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-[#BE123C]" />
              <span>ខាងកូនកំលោះ: {phoneGroom}</span>
            </a>
            <a
              href={`tel:${phoneBride}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-rose-200 text-stone-800 text-xs font-bold hover:bg-rose-50 transition active:scale-95"
            >
              <Phone className="w-3.5 h-3.5 text-rose-500" />
              <span>ខាងកូនក្រមុំ: {phoneBride}</span>
            </a>
          </div>
          {telegramLink && (
            <div className="mt-3">
              <a
                href={telegramLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold hover:bg-sky-100 transition active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 text-sky-500" />
                <span>ឆាតសួរព័ត៌មានតាម Telegram</span>
              </a>
            </div>
          )}
        </section>

        {/* RSVP */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#881337] text-base mb-6">ការបញ្ជាក់វត្តមានចូលរួម</h2>
          {rsvpDone ? (
            <div className="p-5 rounded-xl bg-white/90 border border-emerald-500/50 text-center shadow-xs">
              <p className="font-moul text-sm text-emerald-700 mb-1">សូមអរគុណ!</p>
              <p className="text-xs text-stone-600">ការបញ្ជាក់វត្តមានរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ។</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs text-stone-700 mb-1 font-medium">ឈ្មោះរបស់អ្នក *</label>
                <input
                  type="text"
                  required
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="សូមបញ្ចូលឈ្មោះ"
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#BE123C]"
                />
              </div>
              <div>
                <label className="block text-xs text-stone-700 mb-1 font-medium">តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?</label>
                <select
                  value={rsvp.attendance}
                  onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#BE123C]"
                >
                  <option value="attending">ចូលរួម (Attending)</option>
                  <option value="not_attending">មិនបានចូលរួម (Sorry, can't make it)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-stone-700 mb-1 font-medium">ចំនួនអ្នកចូលរួម</label>
                <select
                  value={rsvp.guests}
                  onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#BE123C]"
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
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#BE123C] to-[#9F1239] text-white font-semibold text-sm hover:brightness-110 shadow-md cursor-pointer active:scale-95 transition"
              >
                បញ្ជាក់ការចូលរួម
              </button>
            </form>
          )}
        </section>

        {/* Wishes */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#881337] text-base mb-6">ពាក្យប្រសិទ្ធពរជ័យ</h2>
          <form onSubmit={handleWish} className="space-y-3 max-w-sm mx-auto mb-6">
            <input
              type="text"
              placeholder="ឈ្មោះរបស់អ្នក"
              value={wish.name}
              onChange={(e) => setWish({ ...wish, name: e.target.value })}
              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#BE123C]"
            />
            <textarea
              rows="2"
              placeholder="សារជូនពរ..."
              value={wish.text}
              onChange={(e) => setWish({ ...wish, text: e.target.value })}
              className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#BE123C]"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#FFF1F2] hover:bg-[#FFE4E6] border border-rose-200 text-[#BE123C] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </form>

          <div className="space-y-3 max-w-sm mx-auto">
            {wishesList.map((w) => (
              <div key={w.id} className="p-3 rounded-lg bg-white/90 backdrop-blur-md border border-stone-200 shadow-2xs text-xs">
                <p className="font-bold text-[#881337] mb-1">{w.name}</p>
                <p className="text-stone-700">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-[#D4AF37]/30 bg-white/70">
          <p className="font-moul text-xs text-[#881337] mb-2">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
          <p className="text-xs text-stone-500">សិរីមង្គល វិបុលសុខ ក្សេមក្សាន្ត អាយុយឺនយូរ</p>
        </footer>
      </div>

      {/* Lightbox for Gallery */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade cursor-pointer"
        >
          <div className="relative max-w-lg w-full max-h-[85vh] rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl">
            <img src={activePhoto} alt="Zoomed" className="w-full h-full object-contain" />
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/60 text-white hover:bg-black transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xs w-full bg-white rounded-3xl p-6 text-center border-2 border-[#BE123C] shadow-2xl space-y-3"
          >
            <h3 className="font-moul text-sm text-[#881337]">{bankName}</h3>
            <div className="w-48 h-48 mx-auto p-2 bg-white rounded-xl border border-stone-200 shadow-inner">
              <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain" />
            </div>
            <p className="text-xs font-bold text-stone-800 uppercase">{accountName}</p>
            <p className="text-base font-mono font-bold text-[#BE123C]">{accountNumber}</p>
            <button
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 rounded-xl bg-rose-50 text-[#BE123C] font-bold text-xs border border-rose-200"
            >
              បិទ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
