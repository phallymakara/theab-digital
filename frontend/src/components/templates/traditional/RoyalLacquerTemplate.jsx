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
    <div className="w-full relative pb-20 bg-[#120B0A] text-[#F4E8D1] font-kantumruy antialiased selection:bg-[#B38728] selection:text-black">
      {/* Floating Audio Controller */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#B38728] via-[#FCF6BA] to-[#AA771C] text-black font-bold text-xs shadow-2xl cursor-pointer active:scale-95 transition"
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'ភ្លេងការ (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
      </button>

      <div className="w-full relative bg-gradient-to-b from-[#1C0E0A] via-[#120B0A] to-[#1A0C08]">
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
            <div className="text-[#D4AF37] text-2xl mb-2 tracking-widest">❖ ❖ ❖</div>
            <p className="text-xs tracking-widest text-[#E6C687] uppercase mb-1 font-semibold">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
            <h1 className="font-moul text-2xl sm:text-3xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent leading-relaxed tracking-wider mb-2">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h1>
            <p className="text-xs text-[#C5A059] italic mb-6">សូមគោរពអញ្ជើញឯកឧត្តម លោកជំទាវ លោក លោកស្រី និងប្រិយមិត្តកិត្តិយស</p>

          {/* Couple Box */}
          <div className="my-6 py-6 px-4 rounded-2xl bg-[#23140F]/80 border border-[#B38728]/40 shadow-inner">
            <div className="text-2xl font-moul text-[#FCF6BA] tracking-wide">{groom}</div>
            <div className="my-2 text-[#D4AF37] font-semibold text-sm">✦ ជួបប្រសព្វនឹង ✦</div>
            <div className="text-2xl font-moul text-[#FCF6BA] tracking-wide">{bride}</div>
          </div>

          {/* Prewedding Photo */}
          <div className="my-6 max-w-sm mx-auto overflow-hidden rounded-2xl border-2 border-[#B38728]/60 shadow-2xl relative group">
            <img src={preweddingImg} alt={`${groom} & ${bride}`} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B0A] via-transparent to-transparent opacity-60"></div>
          </div>
        </header>

        {/* Parents Section */}
        <section className="px-6 py-6 border-t border-[#3D2619]">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">មាតាបិតាទាំងសងខាង</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-[#1F100B] border border-[#52331C]">
              <p className="text-xs text-[#A88243] font-semibold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
              <p className="font-semibold text-sm text-[#F7E7CE] leading-relaxed">{groomParents}</p>
            </div>
            <div className="p-4 rounded-xl bg-[#1F100B] border border-[#52331C]">
              <p className="text-xs text-[#A88243] font-semibold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
              <p className="font-semibold text-sm text-[#F7E7CE] leading-relaxed">{brideParents}</p>
            </div>
          </div>
        </section>

        {/* Ceremony Timeline */}
        <section className="px-6 py-8 border-t border-[#3D2619]">
          <h2 className="font-moul text-center bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] bg-clip-text text-transparent text-base mb-8">
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
              <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[#1F100B]/70 border-l-4 border-[#B38728]">
                <span className="text-xs font-bold text-[#FCF6BA] bg-[#3B2213] px-2.5 py-1 rounded shrink-0">{ev.time}</span>
                <p className="text-xs sm:text-sm font-medium text-[#EED8B6]">{ev.event}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="px-6 py-8 border-t border-[#3D2619] text-center">
          <h2 className="font-moul text-[#D4AF37] text-base mb-3">ទីតាំងប្រារព្ធពិធី</h2>
          <p className="text-sm font-semibold text-[#FCF6BA] mb-1">{locationName}</p>
          <p className="text-xs text-[#C9AF8B] mb-5">{address}</p>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#B38728] to-[#AA771C] text-black font-semibold text-xs shadow-lg hover:brightness-110 active:scale-95 transition"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>បើកមើលក្នុង Google Maps</span>
          </a>
        </section>

        {/* Digital Ang Pao / Gift */}
        <section className="px-6 py-8 border-t border-[#3D2619] text-center">
          <h2 className="font-moul text-[#D4AF37] text-base mb-2">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h2>
          <p className="text-xs text-[#A88243] mb-6">សម្រាប់ភ្ញៀវកិត្តិយសដែលមានបំណងចងដៃតាមរយៈគណនីធនាគារ</p>
          <div className="p-6 rounded-2xl bg-[#1A0E0A] border border-[#B38728]/50 max-w-sm mx-auto shadow-xl">
            <p className="text-xs text-[#C5A059] uppercase tracking-wider mb-1">ABA PAY / BAKONG</p>
            <p className="font-bold text-sm sm:text-base text-[#FCF6BA] uppercase">{groom} & {bride}</p>
            <p className="text-lg font-mono tracking-widest text-[#E6C687] my-3">012 345 678</p>
            <button
              onClick={() => copyAccount('012 345 678')}
              className="text-xs bg-[#2B170E] hover:bg-[#3D2214] text-[#E5B55A] border border-[#B38728]/60 px-4 py-1.5 rounded-md transition cursor-pointer active:scale-95 flex items-center gap-1.5 mx-auto"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលេខគណនី'}</span>
            </button>
          </div>
        </section>

        {/* RSVP Form */}
        <section className="px-6 py-8 border-t border-[#3D2619]">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">ការបញ្ជាក់វត្តមានចូលរួម</h2>
          {rsvpDone ? (
            <div className="p-5 rounded-xl bg-[#1F100B] border border-[#B38728] text-center">
              <p className="font-moul text-sm text-[#FCF6BA] mb-1">សូមអរគុណ!</p>
              <p className="text-xs text-[#C5A059]">យើងខ្ញុំទទួលបានការឆ្លើយតបរបស់អ្នកដោយជោគជ័យ។</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs text-[#D8B986] mb-1">ឈ្មោះរបស់អ្នក *</label>
                <input
                  type="text"
                  required
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="សូមបញ្ចូលឈ្មោះ"
                  className="w-full bg-[#180C07] border border-[#52331C] rounded-lg px-3 py-2 text-sm text-[#F4E8D1] focus:outline-none focus:border-[#B38728]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#D8B986] mb-1">តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?</label>
                <select
                  value={rsvp.attendance}
                  onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                  className="w-full bg-[#180C07] border border-[#52331C] rounded-lg px-3 py-2 text-sm text-[#F4E8D1] focus:outline-none focus:border-[#B38728]"
                >
                  <option value="attending">ចូលរួម (Attending)</option>
                  <option value="not_attending">មិនបានចូលរួម (Sorry, can't make it)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#D8B986] mb-1">ចំនួនអ្នកចូលរួម</label>
                <select
                  value={rsvp.guests}
                  onChange={(e) => setRsvp({ ...rsvp, guests: e.target.value })}
                  className="w-full bg-[#180C07] border border-[#52331C] rounded-lg px-3 py-2 text-sm text-[#F4E8D1] focus:outline-none focus:border-[#B38728]"
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
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#B38728] to-[#AA771C] text-black font-semibold text-sm hover:brightness-110 shadow-lg cursor-pointer active:scale-95 transition"
              >
                បញ្ជាក់ការចូលរួម
              </button>
            </form>
          )}
        </section>

        {/* Wishes Section */}
        <section className="px-6 py-8 border-t border-[#3D2619]">
          <h2 className="font-moul text-center text-[#D4AF37] text-base mb-6">ពាក្យប្រសិទ្ធពរជ័យ</h2>
          <form onSubmit={handleWish} className="space-y-3 max-w-sm mx-auto mb-6">
            <input
              type="text"
              placeholder="ឈ្មោះរបស់អ្នក"
              value={wish.name}
              onChange={(e) => setWish({ ...wish, name: e.target.value })}
              className="w-full bg-[#180C07] border border-[#52331C] rounded-lg px-3 py-2 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#B38728]"
            />
            <textarea
              rows="2"
              placeholder="សារជូនពរ..."
              value={wish.text}
              onChange={(e) => setWish({ ...wish, text: e.target.value })}
              className="w-full bg-[#180C07] border border-[#52331C] rounded-lg px-3 py-2 text-xs text-[#F4E8D1] focus:outline-none focus:border-[#B38728]"
            />
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#2B170E] hover:bg-[#3D2214] border border-[#B38728]/60 text-[#E5B55A] font-semibold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </form>

          <div className="space-y-3 max-w-sm mx-auto">
            {wishesList.map((w) => (
              <div key={w.id} className="p-3 rounded-lg bg-[#1F100B]/80 border border-[#52331C] text-xs">
                <p className="font-bold text-[#FCF6BA] mb-1">{w.name}</p>
                <p className="text-[#C9AF8B]">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        </div>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-[#3D2619] bg-[#0E0705]">
          <p className="font-moul text-xs text-[#B38728] mb-2">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
          <p className="text-xs text-[#8C6D46]">សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ</p>
        </footer>
      </div>
    </div>
  );
}

export default RoyalLacquerTemplate;
