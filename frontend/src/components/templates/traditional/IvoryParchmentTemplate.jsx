import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, MapPin, Copy, Check, Heart, Send, X, Music } from 'lucide-react';
import { TraditionalHeroSection } from './TraditionalHeroSection';
import { plengKarSynth } from './PinpeatAudio';

export function IvoryParchmentTemplate({ data = {} }) {
  const groom = data.groomName || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន';
  const brideParents = data.brideParents || 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង';
  const dateStr = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ';
  const locationName = data.ceremonyLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.ceremonyAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const preweddingImg = data.preweddingPhoto || '/images/templates/traditional_ivory_parchment_prewedding.jpg';

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'បងប្អូនជីដូនមួយ', text: 'សូមឱ្យជីវិតអាពាហ៍ពិពាហ៍ពោរពេញដោយសុភមង្គល ជោគជ័យ និងសុខដុមរមនា!' }
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
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 }, colors: ['#B38728', '#54141E', '#E8D8BA'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  const gallery = [
    { id: 1, src: preweddingImg, caption: 'ក្រាំងមាសសូត្រភ្លុក' },
    { id: 2, src: '/images/templates/angkor-ancient-royalty/ancient_1.jpg', caption: 'មហានគរសិរីមង្គល' },
    { id: 3, src: '/images/templates/angkor-ancient-royalty/ancient_2.jpg', caption: 'ស្នាមញញឹមរំលេចក្តីស្រឡាញ់' },
    { id: 4, src: '/images/templates/royal-gold/gold_1.jpg', caption: 'អនុស្សាវរីយ៍ផ្អែមល្ហែម' }
  ];

  return (
    <div
      className="w-full relative pb-20 text-[#2A1F1D] font-kantumruy antialiased selection:bg-[#B38728] selection:text-white bg-pattern-ivory-parchment"
    >
      {/* Floating Audio Controller */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#B38728] via-[#FBF2CE] to-[#8C6813] text-black font-bold text-xs shadow-2xl cursor-pointer active:scale-95 transition"
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
          themeBorder="#B38728"
          badgeText="សិរីមង្គលអាពាហ៍ពិពាហ៍"
        />

        {/* Header */}
        <header className="text-center pt-8 pb-8 px-6 relative">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-[#FBF2CE] border border-[#B38728]/50 shadow-sm">
            <span className="font-moul text-lg text-[#54141E]">ឧ</span>
          </div>
          <p className="text-xs tracking-widest text-[#B38728] uppercase mb-1 font-semibold">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
          <h1 className="font-moul text-2xl sm:text-3xl text-[#54141E] leading-relaxed tracking-wider mb-2 drop-shadow-sm">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          <p className="text-xs text-[#7A5714] italic mb-6">រចនាបថក្រាំងមាសសូត្រភ្លុក</p>

          {/* Couple Box */}
          <div className="my-6 p-6 rounded-2xl bg-[#FFFBF2] border-2 border-[#D6B778] shadow-md relative">
            <div className="text-2xl sm:text-3xl font-moul text-[#54141E] tracking-wide mb-1">{groom}</div>
            <div className="my-2 text-[#B38728] font-semibold text-xs tracking-widest font-moul">✦ ជួបប្រសព្វនឹង ✦</div>
            <div className="text-2xl sm:text-3xl font-moul text-[#54141E] tracking-wide">{bride}</div>
          </div>

          {/* Prewedding Photo */}
          <div className="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-[#D6B778] shadow-xl relative group">
            <img src={preweddingImg} alt={`${groom} & ${bride}`} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#54141E]/40 via-transparent to-transparent"></div>
          </div>

          {/* Countdown */}
          <div className="my-8 p-4 rounded-xl bg-[#FAF5E8] border border-[#D6B778] max-w-sm mx-auto shadow-inner">
            <p className="text-xs text-[#54141E] font-moul mb-3">រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-white border border-[#E8D8BA]">
                <span className="text-lg font-bold text-[#54141E] font-mono">{timeLeft.days}</span>
                <span className="block text-[10px] text-[#B38728]">ថ្ងៃ</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E8D8BA]">
                <span className="text-lg font-bold text-[#54141E] font-mono">{timeLeft.hours}</span>
                <span className="block text-[10px] text-[#B38728]">ម៉ោង</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E8D8BA]">
                <span className="text-lg font-bold text-[#54141E] font-mono">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-[#B38728]">នាទី</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-[#E8D8BA]">
                <span className="text-lg font-bold text-[#54141E] font-mono">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-[#B38728]">វិនាទី</span>
              </div>
            </div>
          </div>
        </header>

        {/* Parents */}
        <section className="px-6 py-6 border-t border-[#E8D8BA]">
          <h2 className="font-moul text-center text-[#54141E] text-base mb-6">មាតាបិតាទាំងសងខាង</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#FFFBF2] border border-[#E8D8BA]">
              <p className="text-xs text-[#B38728] font-semibold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
              <p className="font-semibold text-sm text-[#3C2E29] leading-relaxed">{groomParents}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#FFFBF2] border border-[#E8D8BA]">
              <p className="text-xs text-[#B38728] font-semibold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
              <p className="font-semibold text-sm text-[#3C2E29] leading-relaxed">{brideParents}</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-6 py-8 border-t border-[#E8D8BA]">
          <h2 className="font-moul text-center text-[#54141E] text-base mb-6">កាលវិភាគពិធីការ</h2>
          <div className="space-y-3">
            {[
              { time: '០៦:៣០ ព្រឹក', text: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
              { time: '០៧:០០ ព្រឹក', text: 'ពិធីហែចំនូនចូលរោងជ័យ' },
              { time: '០៨:៣០ ព្រឹក', text: 'ពិធីកាត់សក់បង្កក់សិរី' },
              { time: '១០:០០ ព្រឹក', text: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
              { time: '០៥:០០ ល្ងាច', text: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងពិសារភោជនាហារ' }
            ].map((ev, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-[#FFFBF2] border border-[#E8D8BA]">
                <span className="text-xs font-bold text-[#54141E] bg-[#FBF2CE] px-2.5 py-1 rounded shrink-0 border border-[#D6B778]">{ev.time}</span>
                <span className="text-xs sm:text-sm text-[#3C2E29]">{ev.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 py-8 border-t border-[#E8D8BA]">
          <h2 className="font-moul text-center text-[#54141E] text-base mb-6">រូបថតអនុស្សាវរីយ៍</h2>
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((p) => (
              <div
                key={p.id}
                onClick={() => setActivePhoto(p.src)}
                className="group rounded-2xl overflow-hidden border border-[#D6B778] bg-[#FAF3E0] cursor-pointer hover:border-[#54141E] transition relative aspect-square shadow-sm"
              >
                <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2 justify-center">
                  <span className="text-[11px] font-semibold text-white truncate">{p.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="px-6 py-8 border-t border-[#E8D8BA] text-center">
          <h2 className="font-moul text-[#54141E] text-base mb-2">ទីតាំងប្រារព្ធពិធី</h2>
          <p className="text-sm font-semibold text-[#3C2E29] mb-1">{locationName}</p>
          <p className="text-xs text-[#7A5714] mb-5">{address}</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B38728] to-[#AA771C] text-white font-semibold text-xs shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>បើកមើលក្នុង Google Maps</span>
          </a>
        </section>

        {/* Digital Gift */}
        <section className="px-6 py-8 border-t border-[#E8D8BA] text-center">
          <h2 className="font-moul text-[#54141E] text-base mb-2">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h2>
          <p className="text-xs text-[#7A5714] mb-6">ABA PAY / BAKONG</p>
          <div className="p-5 rounded-2xl bg-[#FFFBF2] border border-[#D6B778] max-w-sm mx-auto shadow-md">
            <p className="font-bold text-sm text-[#54141E] uppercase">{groom} & {bride}</p>
            <p className="text-lg font-mono tracking-widest text-[#B38728] my-3">012 345 678</p>
            <button
              onClick={() => copyAccount('012 345 678')}
              className="text-xs bg-[#FBF2CE] hover:bg-[#F5E6B3] text-[#54141E] border border-[#B38728] px-4 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 mx-auto font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលេខគណនី'}</span>
            </button>
          </div>
        </section>

        {/* RSVP */}
        <section className="px-6 py-8 border-t border-[#E8D8BA]">
          <h2 className="font-moul text-center text-[#54141E] text-base mb-6">ការបញ្ជាក់វត្តមានចូលរួម</h2>
          {rsvpDone ? (
            <div className="p-5 rounded-xl bg-[#FAF5E8] border border-[#B38728] text-center">
              <p className="font-moul text-sm text-[#54141E] mb-1">សូមអរគុណ!</p>
              <p className="text-xs text-[#7A5714]">ការបញ្ជាក់វត្តមានរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ។</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs text-[#7A5714] mb-1 font-semibold">ឈ្មោះរបស់អ្នក *</label>
                <input
                  type="text"
                  required
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="សូមបញ្ចូលឈ្មោះ"
                  className="w-full bg-white border border-[#D6B778] rounded-lg px-3 py-2 text-sm text-[#3C2E29] focus:outline-none focus:border-[#54141E]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#7A5714] mb-1 font-semibold">ការចូលរួម</label>
                <select
                  value={rsvp.attendance}
                  onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                  className="w-full bg-white border border-[#D6B778] rounded-lg px-3 py-2 text-sm text-[#3C2E29] focus:outline-none focus:border-[#54141E]"
                >
                  <option value="attending">ចូលរួម (Attending)</option>
                  <option value="not_attending">មិនបានចូលរួម (Decline)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-[#54141E] hover:bg-[#6B1724] text-white font-semibold text-sm shadow-md cursor-pointer active:scale-95 transition"
              >
                បញ្ជាក់ការចូលរួម
              </button>
            </form>
          )}
        </section>

        {/* Wishes */}
        <section className="px-6 py-8 border-t border-[#E8D8BA]">
          <h2 className="font-moul text-center text-[#54141E] text-base mb-6">ពាក្យប្រសិទ្ធពរជ័យ</h2>
          <form onSubmit={handleWish} className="space-y-3 max-w-sm mx-auto mb-6">
            <input
              type="text"
              placeholder="ឈ្មោះរបស់អ្នក"
              value={wish.name}
              onChange={(e) => setWish({ ...wish, name: e.target.value })}
              className="w-full bg-white border border-[#D6B778] rounded-lg px-3 py-2 text-xs text-[#3C2E29] focus:outline-none focus:border-[#54141E]"
            />
            <textarea
              rows="2"
              placeholder="សារជូនពរ..."
              value={wish.text}
              onChange={(e) => setWish({ ...wish, text: e.target.value })}
              className="w-full bg-white border border-[#D6B778] rounded-lg px-3 py-2 text-xs text-[#3C2E29] focus:outline-none focus:border-[#54141E]"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#FAF5E8] hover:bg-[#F5ECCE] border border-[#B38728] text-[#54141E] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </form>

          <div className="space-y-3 max-w-sm mx-auto">
            {wishesList.map((w) => (
              <div key={w.id} className="p-3 rounded-lg bg-white border border-[#E8D8BA] text-xs shadow-xs">
                <p className="font-bold text-[#54141E] mb-1">{w.name}</p>
                <p className="text-[#6B5B52]">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-[#E8D8BA] bg-[#FAF5E8]">
          <p className="font-moul text-xs text-[#54141E] mb-2">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
          <p className="text-xs text-[#7A5714]">សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ</p>
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
            <img src={activePhoto} alt="Enlarged" className="w-full rounded-2xl border-2 border-[#D6B778] object-contain shadow-2xl" />
          </div>
        </div>
      )}
    </div>
  );
}

export default IvoryParchmentTemplate;
