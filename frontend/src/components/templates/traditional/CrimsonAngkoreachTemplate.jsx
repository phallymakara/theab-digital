import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { plengKarSynth } from './PinpeatAudio';
import { Calendar, Clock, MapPin, Music, Heart, Send, Copy, Check, X } from 'lucide-react';
import { TraditionalHeroSection } from './TraditionalHeroSection';

export function CrimsonAngkoreachTemplate({ data = {} }) {
  const groom = data.groomName || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន';
  const brideParents = data.brideParents || 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង';
  const dateStr = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ';
  const locationName = data.ceremonyLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.ceremonyAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const preweddingImg = data.preweddingPhoto || '/images/templates/traditional_crimson_angkoreach_prewedding.jpg';

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'អ៊ុំ ប្រុស-ស្រី', text: 'សូមឱ្យក្មួយទាំងពីរស្រឡាញ់គ្នាដល់ចាស់កោងខ្នង រកស៊ីមានបាន ត្រជាក់ត្រជុំជានិច្ច!' }
  ]);

  const [timeLeft, setTimeLeft] = useState({ days: 18, hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(t);
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

  const gallery = [
    { id: 1, src: preweddingImg, caption: 'មង្គលក្បាច់អង្គរាជ' },
    { id: 2, src: '/images/templates/crimson-classic/crimson_1.jpg', caption: 'ជ័យមង្គលសិរីសួស្តី' },
    { id: 3, src: '/images/templates/crimson-classic/crimson_2.jpg', caption: 'សូត្រក្រហមមង្គលការ' },
    { id: 4, src: '/images/templates/royal-gold/gold_2.jpg', caption: 'ភាពថ្លៃថ្នូរ និងកិត្តិយស' }
  ];

  return (
    <div
      className="w-full relative text-[#F8EEDB] font-kantumruy antialiased selection:bg-[#D4AF37] selection:text-black pb-20"
      style={{
        backgroundColor: '#120306',
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.28) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(170, 119, 28, 0.3) 0%, transparent 70%),
          url("data:image/svg+xml,%3Csvg width='72' height='72' viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.09'%3E%3Cpath d='M36 0 L54 18 L36 36 L18 18 Z M36 36 L54 54 L36 72 L18 54 Z M0 36 L18 18 L36 36 L18 54 Z M72 36 L54 18 L36 36 L54 54 Z'/%3E%3Ccircle cx='36' cy='36' r='4' fill='%23f6e08a' fill-opacity='0.16'/%3E%3Ccircle cx='0' cy='0' r='2' fill='%23f6e08a' fill-opacity='0.1'/%3E%3Ccircle cx='72' cy='0' r='2' fill='%23f6e08a' fill-opacity='0.1'/%3E%3Ccircle cx='0' cy='72' r='2' fill='%23f6e08a' fill-opacity='0.1'/%3E%3Ccircle cx='72' cy='72' r='2' fill='%23f6e08a' fill-opacity='0.1'/%3E%3C/g%3E%3C/svg%3E")
        `,
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Floating Audio Button */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F6E08A] to-[#D4AF37] text-black font-bold text-xs shadow-2xl cursor-pointer active:scale-95 transition"
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'ភ្លេងការ (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
      </button>

      <div className="w-full relative">
        {/* Top Hero Section with Multiple Images Carousel */}
        <TraditionalHeroSection
          groom={groom}
          bride={bride}
          images={data.heroImages}
          fallbackImage={preweddingImg}
          themeBorder="#D4AF37"
          badgeText="សិរីមង្គលអាពាហ៍ពិពាហ៍"
        />

        {/* Header */}
        <header className="text-center pt-8 pb-8 px-6 relative">
          <div className="text-[#D4AF37] text-xl mb-2">❖ ❖ ❖</div>
          <p className="text-xs tracking-widest text-[#F6E08A] uppercase mb-1 font-semibold">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
          <h1 className="font-moul text-2xl sm:text-3xl bg-gradient-to-r from-[#FFFDE8] via-[#F5DE7A] to-[#D4AF37] bg-clip-text text-transparent leading-relaxed tracking-wider mb-2">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          <p className="text-xs text-[#E6C280] italic mb-6">ក្បាច់អង្គរាជ និងក្រឡាសំណាញ់ពេជ្រសូត្រមាស</p>

          {/* Couple Frame */}
          <div className="my-6 p-6 rounded-2xl bg-[#1C050A]/90 border border-[#D4AF37]/60 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
            <div className="text-2xl sm:text-3xl font-moul text-[#FFF4BF] tracking-wide mb-1">{groom}</div>
            <div className="my-2 text-[#D4AF37] font-semibold text-xs tracking-widest font-moul">✦ ជួបប្រសព្វនឹង ✦</div>
            <div className="text-2xl sm:text-3xl font-moul text-[#FFF4BF] tracking-wide">{bride}</div>
          </div>

          {/* Prewedding Photo */}
          <div className="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37]/70 shadow-2xl relative group">
            <img src={preweddingImg} alt={`${groom} & ${bride}`} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120306] via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Countdown */}
          <div className="my-8 p-4 rounded-xl bg-[#1C050A]/80 border border-[#D4AF37]/40 max-w-sm mx-auto">
            <p className="text-xs text-[#E6C280] font-moul mb-3">រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#2A080F] border border-[#D4AF37]/30">
                <span className="text-lg font-bold text-[#FCF6BA] font-mono">{timeLeft.days}</span>
                <span className="block text-[10px] text-[#D4AF37]">ថ្ងៃ</span>
              </div>
              <div className="p-2 rounded-lg bg-[#2A080F] border border-[#D4AF37]/30">
                <span className="text-lg font-bold text-[#FCF6BA] font-mono">{timeLeft.hours}</span>
                <span className="block text-[10px] text-[#D4AF37]">ម៉ោង</span>
              </div>
              <div className="p-2 rounded-lg bg-[#2A080F] border border-[#D4AF37]/30">
                <span className="text-lg font-bold text-[#FCF6BA] font-mono">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-[#D4AF37]">នាទី</span>
              </div>
              <div className="p-2 rounded-lg bg-[#2A080F] border border-[#D4AF37]/30">
                <span className="text-lg font-bold text-[#FCF6BA] font-mono">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-[#D4AF37]">វិនាទី</span>
              </div>
            </div>
          </div>
        </header>

        {/* Parents */}
        <section className="px-6 py-6 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">មាតាបិតាទាំងសងខាង</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#1C050A] border border-[#D4AF37]/40">
              <p className="text-xs text-[#E6C280] font-semibold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
              <p className="font-semibold text-sm text-[#F8EEDB] leading-relaxed">{groomParents}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#1C050A] border border-[#D4AF37]/40">
              <p className="text-xs text-[#E6C280] font-semibold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
              <p className="font-semibold text-sm text-[#F8EEDB] leading-relaxed">{brideParents}</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">កាលវិភាគកម្មវិធីមង្គលការ</h2>
          <div className="space-y-3">
            {[
              { time: '០៦:៣០ ព្រឹក', text: 'ពិធីជួបជុំភ្ញៀវកិត្តិយស និងរៀបចំហែចំនូន' },
              { time: '០៧:០០ ព្រឹក', text: 'ពិធីហែចំនូន (កំណត់វេលាចូលរោងជ័យ)' },
              { time: '០៨:៣០ ព្រឹក', text: 'ពិធីកាត់សក់បង្កក់សិរី និងជ័យមង្គល' },
              { time: '១០:០០ ព្រឹក', text: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងតោងស្បៃ' },
              { time: '០៥:០០ ល្ងាច', text: 'ពិសារភោជនាហារ និងបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស' }
            ].map((ev, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#1C050A]/90 border border-[#D4AF37]/30">
                <span className="text-xs font-bold text-[#FCF6BA] bg-[#2A080F] px-2.5 py-1 rounded shrink-0 border border-[#D4AF37]/40">{ev.time}</span>
                <span className="text-xs sm:text-sm text-[#F8EEDB]">{ev.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">រូបថតអនុស្សាវរីយ៍</h2>
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((p) => (
              <div
                key={p.id}
                onClick={() => setActivePhoto(p.src)}
                className="group rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-[#120204] cursor-pointer hover:border-[#F6E08A] transition relative aspect-square"
              >
                <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 justify-center">
                  <span className="text-[11px] font-semibold text-[#F7EBD2] truncate">{p.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30 text-center">
          <h2 className="font-moul text-[#D4AF37] text-base mb-2">ទីតាំងប្រារព្ធពិធី</h2>
          <p className="text-sm font-semibold text-[#FCF6BA] mb-1">{locationName}</p>
          <p className="text-xs text-[#E6C280] mb-5">{address}</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-semibold text-xs shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>បើកមើលក្នុង Google Maps</span>
          </a>
        </section>

        {/* Digital Gift */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30 text-center">
          <h2 className="font-moul text-[#D4AF37] text-base mb-2">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h2>
          <p className="text-xs text-[#E6C280] mb-6">ABA PAY / BAKONG</p>
          <div className="p-5 rounded-2xl bg-[#1C050A] border border-[#D4AF37]/50 max-w-sm mx-auto shadow-xl">
            <p className="font-bold text-sm text-[#FCF6BA] uppercase">{groom} & {bride}</p>
            <p className="text-lg font-mono tracking-widest text-[#E6C687] my-3">012 345 678</p>
            <button
              onClick={() => copyAccount('012 345 678')}
              className="text-xs bg-[#2A080F] hover:bg-[#3D0A16] text-[#FCF6BA] border border-[#D4AF37]/60 px-4 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 mx-auto"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលេខគណនី'}</span>
            </button>
          </div>
        </section>

        {/* RSVP */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">ការបញ្ជាក់វត្តមានចូលរួម</h2>
          {rsvpDone ? (
            <div className="p-5 rounded-xl bg-[#1C050A] border border-[#D4AF37] text-center">
              <p className="font-moul text-sm text-[#FCF6BA] mb-1">សូមអរគុណ!</p>
              <p className="text-xs text-[#E6C280]">ការបញ្ជាក់វត្តមានរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ។</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs text-[#E6C280] mb-1">ឈ្មោះរបស់អ្នក *</label>
                <input
                  type="text"
                  required
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="សូមបញ្ចូលឈ្មោះ"
                  className="w-full bg-[#1C050A] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-sm text-[#F8EEDB] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#E6C280] mb-1">ការចូលរួម</label>
                <select
                  value={rsvp.attendance}
                  onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                  className="w-full bg-[#1C050A] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-sm text-[#F8EEDB] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="attending">ចូលរួម (Attending)</option>
                  <option value="not_attending">មិនបានចូលរួម (Decline)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#AA771C] text-black font-semibold text-sm hover:brightness-110 shadow-lg cursor-pointer active:scale-95 transition"
              >
                បញ្ជាក់ការចូលរួម
              </button>
            </form>
          )}
        </section>

        {/* Wishes */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">ពាក្យប្រសិទ្ធពរជ័យ</h2>
          <form onSubmit={handleWish} className="space-y-3 max-w-sm mx-auto mb-6">
            <input
              type="text"
              placeholder="ឈ្មោះរបស់អ្នក"
              value={wish.name}
              onChange={(e) => setWish({ ...wish, name: e.target.value })}
              className="w-full bg-[#1C050A] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-xs text-[#F8EEDB] focus:outline-none focus:border-[#D4AF37]"
            />
            <textarea
              rows="2"
              placeholder="សារជូនពរ..."
              value={wish.text}
              onChange={(e) => setWish({ ...wish, text: e.target.value })}
              className="w-full bg-[#1C050A] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-xs text-[#F8EEDB] focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#2A080F] hover:bg-[#3D0A16] border border-[#D4AF37]/60 text-[#FCF6BA] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </form>

          <div className="space-y-3 max-w-sm mx-auto">
            {wishesList.map((w) => (
              <div key={w.id} className="p-3 rounded-lg bg-[#1C050A] border border-[#D4AF37]/30 text-xs">
                <p className="font-bold text-[#FCF6BA] mb-1">{w.name}</p>
                <p className="text-[#E6C280]">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-[#D4AF37]/30 bg-[#0C0204]">
          <p className="font-moul text-xs text-[#D4AF37] mb-2">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
          <p className="text-xs text-[#A88243]">សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ</p>
        </footer>
      </div>

      {/* Lightbox */}
      {activePhoto && (
        <div
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative max-w-lg w-full">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-10 right-0 text-white p-1"
            >
              <X className="w-6 h-6" />
            </button>
            <img src={activePhoto} alt="Enlarged" className="w-full rounded-2xl border-2 border-[#D4AF37] object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CrimsonAngkoreachTemplate;
