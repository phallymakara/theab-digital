import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { plengKarSynth } from './PinpeatAudio';
import { Calendar, Clock, MapPin, Music, Heart, Send, Copy, Check, X } from 'lucide-react';
import { TraditionalHeroSection } from './TraditionalHeroSection';

export function AngkorPedimentTemplate({ data = {} }) {
  const groom = data.groomName || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន';
  const brideParents = data.brideParents || 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង';
  const dateStr = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ';
  const locationName = data.ceremonyLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.ceremonyAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const preweddingImg = data.preweddingPhoto || '/images/templates/traditional_angkor_pediment_prewedding.jpg';

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'ញាតិមិត្តកិត្តិយស', text: 'សូមឱ្យគូស្នេហ៍មានសិរីសួស្តី ជោគជ័យ និងសុភមង្គលដូចព្រះថោងនាងនាគ!' }
  ]);

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
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 }, colors: ['#D4AF37', '#AA771C', '#FFF9D2'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  const gallery = [
    { id: 1, src: preweddingImg, caption: 'ហោជាងប្រាសាទថ្មមាស' },
    { id: 2, src: '/images/templates/angkor-heritage/angkor_1.jpg', caption: 'កេរដំណែលប្រាសាទអង្គរវត្ត' },
    { id: 3, src: '/images/templates/angkor-heritage/angkor_2.jpg', caption: 'មោទនភាពវប្បធម៌ជាតិ' },
    { id: 4, src: '/images/templates/angkor-ancient-royalty/ancient_1.jpg', caption: 'សិរីមង្គលមហានគរ' }
  ];

  return (
    <div
      className="w-full relative pb-20 text-[#F5EBD7] font-kantumruy antialiased selection:bg-[#D4AF37] selection:text-black"
      style={{
        backgroundColor: '#0b0704',
        backgroundImage: `
          radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.2) 0%, transparent 70%),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M30 0l30 30-30 30L0 30zM30 6l24 24-24 24L6 30z'/%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")
        `
      }}
    >
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#8E6514] via-[#F3E198] to-[#8E6514] text-black font-bold text-xs shadow-2xl cursor-pointer active:scale-95 transition"
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'ភ្លេងការ (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
      </button>

      <div className="w-full relative bg-[#140C08]/90">
        {/* Top Hero Section with Multiple Images Carousel */}
        <TraditionalHeroSection
          groom={groom}
          bride={bride}
          images={data.heroImages}
          fallbackImage={preweddingImg}
          themeBorder="#D4AF37"
          badgeText="សិរីមង្គលអាពាហ៍ពិពាហ៍"
        />

        {/* Header - Angkor Pediment Shape */}
        <header className="text-center pt-8 pb-8 px-6 relative">
          <div
            className="p-6 rounded-2xl bg-gradient-to-b from-[#24150D] to-[#140C08] border-2 border-[#D4AF37]/60 shadow-[0_0_35px_rgba(212,175,55,0.2)] mb-6"
            style={{ clipPath: 'polygon(50% 0%, 100% 8%, 100% 100%, 0% 100%, 0% 8%)' }}
          >
            <div className="text-[#D4AF37] text-2xl pt-2 mb-2">❖ ❖ ❖</div>
            <p className="text-xs tracking-widest text-[#F3E198] uppercase mb-1 font-semibold">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
            <h1 className="font-moul text-2xl sm:text-3xl bg-gradient-to-b from-[#FFF9D2] via-[#D4AF37] to-[#AA771C] bg-clip-text text-transparent leading-relaxed tracking-wider mb-2">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h1>
            <p className="text-xs text-[#C8B289] italic mb-4">រចនាបថហោជាងប្រាសាទថ្មមាសបុរាណ</p>

            {/* Couple Names */}
            <div className="my-4 py-4 px-3 rounded-xl bg-black/50 border border-[#D4AF37]/40">
              <div className="text-2xl sm:text-3xl font-moul text-[#FFF9D2] tracking-wide mb-1">{groom}</div>
              <div className="my-2 text-[#D4AF37] font-semibold text-xs tracking-widest font-moul">✦ ជួបប្រសព្វនឹង ✦</div>
              <div className="text-2xl sm:text-3xl font-moul text-[#FFF9D2] tracking-wide">{bride}</div>
            </div>
          </div>

          {/* Prewedding Photo with Octagonal Royal Border */}
          <div
            className="my-6 max-w-sm mx-auto overflow-hidden border-2 border-[#D4AF37] shadow-2xl relative group bg-black"
            style={{ clipPath: 'polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%)' }}
          >
            <img src={preweddingImg} alt={`${groom} & ${bride}`} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
        </header>

        {/* Parents Section */}
        <section className="px-6 py-6 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">មាតាបិតាទាំងសងខាង</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#1C100A] border border-[#D4AF37]/40 shadow-sm">
              <p className="text-xs text-[#D4AF37] font-semibold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
              <p className="font-semibold text-sm text-[#F5EBD7] leading-relaxed">{groomParents}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#1C100A] border border-[#D4AF37]/40 shadow-sm">
              <p className="text-xs text-[#D4AF37] font-semibold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
              <p className="font-semibold text-sm text-[#F5EBD7] leading-relaxed">{brideParents}</p>
            </div>
          </div>
        </section>

        {/* Timeline with Manuscript Ribbon Shape */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">កាលវិភាគពិធីបុរាណ</h2>
          <div className="space-y-3">
            {[
              { time: '០៦:៣០ ព្រឹក', text: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
              { time: '០៧:០០ ព្រឹក', text: 'ពិធីហែចំនូនចូលរោងជ័យ' },
              { time: '០៨:៣០ ព្រឹក', text: 'ពិធីកាត់សក់បង្កក់សិរី' },
              { time: '១០:០០ ព្រឹក', text: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
              { time: '០៥:០០ ល្ងាច', text: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងពិសារភោជនាហារ' }
            ].map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg bg-[#22130B] border border-[#D4AF37]/40"
                style={{ clipPath: 'polygon(0 0, 100% 0, 97% 50%, 100% 100%, 0 100%, 3% 50%)' }}
              >
                <span className="text-xs font-bold text-black bg-gradient-to-r from-[#D4AF37] to-[#F3E198] px-3 py-1 rounded shrink-0">{ev.time}</span>
                <span className="text-xs sm:text-sm text-[#F5EBD7]">{ev.text}</span>
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
                className="group rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 bg-black cursor-pointer hover:border-[#FFF9D2] transition relative aspect-[4/5]"
              >
                <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2 justify-center">
                  <span className="text-[11px] font-semibold text-[#F3E198] truncate">{p.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30 text-center">
          <h2 className="font-moul text-[#D4AF37] text-base mb-2">ទីតាំងប្រារព្ធពិធី</h2>
          <p className="text-sm font-semibold text-[#FFF9D2] mb-1">{locationName}</p>
          <p className="text-xs text-[#C8B289] mb-5">{address}</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8E6514] via-[#F3E198] to-[#8E6514] text-black font-semibold text-xs shadow-lg hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>បើកមើលក្នុង Google Maps</span>
          </a>
        </section>

        {/* Digital Gift */}
        <section className="px-6 py-8 border-t border-[#D4AF37]/30 text-center">
          <h2 className="font-moul text-[#D4AF37] text-base mb-2">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h2>
          <p className="text-xs text-[#C8B289] mb-6">ABA PAY / BAKONG</p>
          <div className="p-5 rounded-2xl bg-[#1C100A] border border-[#D4AF37]/60 max-w-sm mx-auto shadow-xl">
            <p className="font-bold text-sm text-[#FFF9D2] uppercase">{groom} & {bride}</p>
            <p className="text-lg font-mono tracking-widest text-[#D4AF37] my-3">012 345 678</p>
            <button
              onClick={() => copyAccount('012 345 678')}
              className="text-xs bg-[#2E1B11] hover:bg-[#3D2417] text-[#FFF9D2] border border-[#D4AF37]/60 px-4 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 mx-auto"
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
            <div className="p-5 rounded-xl bg-[#1C100A] border border-[#D4AF37] text-center">
              <p className="font-moul text-sm text-[#FFF9D2] mb-1">សូមអរគុណ!</p>
              <p className="text-xs text-[#C8B289]">ការបញ្ជាក់វត្តមានរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ។</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs text-[#D4AF37] mb-1">ឈ្មោះរបស់អ្នក *</label>
                <input
                  type="text"
                  required
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="សូមបញ្ចូលឈ្មោះ"
                  className="w-full bg-[#1C100A] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-sm text-[#F5EBD7] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#D4AF37] mb-1">ការចូលរួម</label>
                <select
                  value={rsvp.attendance}
                  onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                  className="w-full bg-[#1C100A] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-sm text-[#F5EBD7] focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="attending">ចូលរួម (Attending)</option>
                  <option value="not_attending">មិនបានចូលរួម (Decline)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#8E6514] via-[#F3E198] to-[#8E6514] text-black font-semibold text-sm hover:brightness-110 shadow-lg cursor-pointer active:scale-95 transition"
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
              className="w-full bg-[#1C100A] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-xs text-[#F5EBD7] focus:outline-none focus:border-[#D4AF37]"
            />
            <textarea
              rows="2"
              placeholder="សារជូនពរ..."
              value={wish.text}
              onChange={(e) => setWish({ ...wish, text: e.target.value })}
              className="w-full bg-[#1C100A] border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-xs text-[#F5EBD7] focus:outline-none focus:border-[#D4AF37]"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#2E1B11] hover:bg-[#3D2417] border border-[#D4AF37]/60 text-[#FFF9D2] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </form>

          <div className="space-y-3 max-w-sm mx-auto">
            {wishesList.map((w) => (
              <div key={w.id} className="p-3 rounded-lg bg-[#1C100A] border border-[#D4AF37]/30 text-xs">
                <p className="font-bold text-[#FFF9D2] mb-1">{w.name}</p>
                <p className="text-[#C8B289]">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-[#D4AF37]/30 bg-[#070402]">
          <p className="font-moul text-xs text-[#D4AF37] mb-2">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
          <p className="text-xs text-[#8E7958]">សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ</p>
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

export default AngkorPedimentTemplate;
