import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, MapPin, Share2, Copy, Check, Heart, Send, Music } from 'lucide-react';
import { TraditionalHeroSection } from './TraditionalHeroSection';
import { plengKarSynth } from './PinpeatAudio';

export function RoyalLacquerTemplate({ data = {}, onBack }) {
  const groom = data.groomName || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន';
  const brideParents = data.brideParents || 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង';
  const dateStr = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ';
  const locationName = data.ceremonyLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.ceremonyAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const preweddingImg = data.preweddingPhoto || '/images/templates/traditional_lacquer_gold_prewedding.jpg';

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'ពូ សុខ និង មីង ផល្លី', text: 'សូមជូនពរក្មួយទាំងពីរជួបតែសុភមង្គល ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង!' },
    { id: 2, name: 'មិត្តភក្តិ វិសាល', text: 'អបអរសាទរគូស្នេហ៍ដ៏ស័ក្តិសមបំផុត! រីករាយថ្ងៃអាពាហ៍ពិពាហ៍!' }
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
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 }, colors: ['#BF953F', '#FCF6BA', '#AA771C'] });
    } catch (_) {}
  };

  const handleWish = (e) => {
    e.preventDefault();
    if (!wish.name.trim() || !wish.text.trim()) return;
    setWishesList([{ id: Date.now(), name: wish.name, text: wish.text }, ...wishesList]);
    setWish({ name: '', text: '' });
  };

  return (
    <div className="w-full relative pb-20 text-stone-800 font-kantumruy antialiased selection:bg-[#B38728] selection:text-white bg-pattern-royal-lacquer">
      {/* Floating Audio Controller */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-stone-800 font-bold text-xs shadow-lg border-2 border-[#D4AF37]/60 cursor-pointer active:scale-95 transition"
      >
        <Music className={`w-4 h-4 text-[#B38728] ${isPlaying ? 'animate-bounce' : ''}`} />
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

        {/* Ceremony Content */}
        <div id="traditional-ceremony-content">
          <header className="text-center pt-8 pb-6 px-6 relative">
            <div className="text-[#B38728] text-2xl mb-2 tracking-widest">❖ ❖ ❖</div>
            <p className="text-xs tracking-widest text-[#8C6813] uppercase mb-1 font-semibold">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
            <h1 className="font-moul text-2xl sm:text-3xl text-[#8C6813] leading-relaxed tracking-wider mb-2">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h1>
            <p className="text-xs text-stone-600 italic mb-6">សូមគោរពអញ្ជើញឯកឧត្តម លោកជំទាវ លោក លោកស្រី និងប្រិយមិត្តកិត្តិយស</p>

            {/* Couple Box */}
            <div className="my-6 py-6 px-4 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-[#D4AF37]/50 shadow-md">
              <div className="text-2xl font-moul text-stone-900 tracking-wide">{groom}</div>
              <div className="my-2 text-[#B38728] font-semibold text-sm">✦ ជួបប្រសព្វនឹង ✦</div>
              <div className="text-2xl font-moul text-stone-900 tracking-wide">{bride}</div>
            </div>

            {/* Prewedding Photo */}
            <div className="my-6 max-w-sm mx-auto overflow-hidden rounded-2xl border-2 border-[#B38728]/50 shadow-lg relative group">
              <img src={preweddingImg} alt={`${groom} & ${bride}`} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
            </div>
          </header>

          {/* Parents Section */}
          <section className="px-6 py-6 border-t border-[#D4AF37]/30">
            <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">មាតាបិតាទាំងសងខាង</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-xs">
                <p className="text-xs text-[#8C6813] font-semibold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
                <p className="font-semibold text-sm text-stone-800 leading-relaxed">{groomParents}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-xs">
                <p className="text-xs text-[#8C6813] font-semibold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
                <p className="font-semibold text-sm text-stone-800 leading-relaxed">{brideParents}</p>
              </div>
            </div>
          </section>

          {/* Ceremony Timeline */}
          <section className="px-6 py-8 border-t border-[#D4AF37]/30">
            <h2 className="font-moul text-center text-[#8C6813] text-base mb-8">
              កម្មវិធីមង្គលសិរីសួស្តី
            </h2>
            <div className="space-y-3">
              {[
                { time: '០៦:៣០ ព្រឹក', event: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
                { time: '០៧:០០ ព្រឹក', event: 'ពិធីហែចំនូនចូលរោងជ័យ' },
                { time: '០៨:០០ ព្រឹក', event: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍' },
                { time: '០៨:៣០ ព្រឹក', event: 'ពិធីកាត់សក់បង្កក់សិរី' },
                { time: '១០:០០ ព្រឹក', event: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
                { time: '១២:០០ ថ្ងៃត្រង់', event: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់' },
                { time: '០៥:០០ ល្ងាច', event: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងពិសារភោជនាហារ' }
              ].map((ev, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-white/90 backdrop-blur-md border-l-4 border-[#B38728] shadow-xs">
                  <span className="text-xs font-bold text-[#8C6813] bg-[#FAF5E8] border border-[#D4AF37]/35 px-2.5 py-1 rounded shrink-0">{ev.time}</span>
                  <p className="text-xs sm:text-sm font-medium text-stone-700">{ev.event}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section className="px-6 py-8 border-t border-[#D4AF37]/30 text-center">
            <h2 className="font-moul text-[#8C6813] text-base mb-3">ទីតាំងប្រារព្ធពិធី</h2>
            <p className="text-sm font-semibold text-stone-900 mb-1">{locationName}</p>
            <p className="text-xs text-stone-600 mb-5">{address}</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B38728] to-[#AA771C] text-white font-semibold text-xs shadow-md hover:brightness-110 active:scale-95 transition"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>បើកមើលក្នុង Google Maps</span>
            </a>
          </section>

          {/* Digital Ang Pao / Gift */}
          <section className="px-6 py-8 border-t border-[#D4AF37]/30 text-center">
            <h2 className="font-moul text-[#8C6813] text-base mb-2">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h2>
            <p className="text-xs text-stone-600 mb-6">សម្រាប់ភ្ញៀវកិត្តិយសដែលមានបំណងចងដៃតាមរយៈគណនីធនាគារ</p>
            <div className="p-6 rounded-2xl bg-white/95 border border-[#D4AF37]/50 max-w-sm mx-auto shadow-md">
              <p className="text-xs text-[#8C6813] uppercase tracking-wider mb-1 font-semibold">ABA PAY / BAKONG</p>
              <p className="font-bold text-sm sm:text-base text-stone-900 uppercase">{groom} & {bride}</p>
              <p className="text-lg font-mono tracking-widest text-[#B38728] font-bold my-3">012 345 678</p>
              <button
                onClick={() => copyAccount('012 345 678')}
                className="text-xs bg-[#FAF5E8] hover:bg-[#F2ECE0] text-[#8C6813] border border-[#B38728]/60 px-4 py-1.5 rounded-md transition cursor-pointer active:scale-95 flex items-center gap-1.5 mx-auto font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលេខគណនី'}</span>
              </button>
            </div>
          </section>

          {/* RSVP Form */}
          <section className="px-6 py-8 border-t border-[#D4AF37]/30">
            <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">ការបញ្ជាក់វត្តមានចូលរួម</h2>
            {rsvpDone ? (
              <div className="p-5 rounded-xl bg-white/90 border border-emerald-500/50 text-center shadow-xs">
                <p className="font-moul text-sm text-emerald-700 mb-1">សូមអរគុណ!</p>
                <p className="text-xs text-stone-600">យើងខ្ញុំទទួលបានការឆ្លើយតបរបស់អ្នកដោយជោគជ័យ។</p>
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
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#B38728]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-700 mb-1 font-medium">តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?</label>
                  <select
                    value={rsvp.attendance}
                    onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#B38728]"
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
                    className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#B38728]"
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
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#B38728] to-[#AA771C] text-white font-semibold text-sm hover:brightness-110 shadow-md cursor-pointer active:scale-95 transition"
                >
                  បញ្ជាក់ការចូលរួម
                </button>
              </form>
            )}
          </section>

          {/* Wishes Section */}
          <section className="px-6 py-8 border-t border-[#D4AF37]/30">
            <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">ពាក្យប្រសិទ្ធពរជ័យ</h2>
            <form onSubmit={handleWish} className="space-y-3 max-w-sm mx-auto mb-6">
              <input
                type="text"
                placeholder="ឈ្មោះរបស់អ្នក"
                value={wish.name}
                onChange={(e) => setWish({ ...wish, name: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#B38728]"
              />
              <textarea
                rows="2"
                placeholder="សារជូនពរ..."
                value={wish.text}
                onChange={(e) => setWish({ ...wish, text: e.target.value })}
                className="w-full bg-white border border-stone-300 rounded-lg px-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-[#B38728]"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-[#FAF5E8] hover:bg-[#F2ECE0] border border-[#B38728]/60 text-[#8C6813] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition active:scale-95"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ផ្ញើសារជូនពរ</span>
              </button>
            </form>

            <div className="space-y-3 max-w-sm mx-auto">
              {wishesList.map((w) => (
                <div key={w.id} className="p-3 rounded-lg bg-white/90 backdrop-blur-md border border-stone-200 shadow-2xs text-xs">
                  <p className="font-bold text-[#8C6813] mb-1">{w.name}</p>
                  <p className="text-stone-700">{w.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-[#D4AF37]/30 bg-white/70">
          <p className="font-moul text-xs text-[#8C6813] mb-2">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
          <p className="text-xs text-stone-500">សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ</p>
        </footer>
      </div>
    </div>
  );
}

export default RoyalLacquerTemplate;
