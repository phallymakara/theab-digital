import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useTemplateAudio } from '../../../utils/useTemplateAudio';
import {
  Calendar,
  Clock,
  MapPin,
  Music,
  Heart,
  Send,
  Copy,
  Check,
  X,
  Phone,
  MessageCircle,
  QrCode
} from 'lucide-react';
import { TraditionalHeroSection } from './TraditionalHeroSection';

export function IndigoHolTemplate({
  data = {},
  invitation = {},
  invitationData = {},
  activeTemplate = {}
}) {
  const groom = data.groomName || invitation.groomName || activeTemplate?.demoGroom || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || invitation.brideName || activeTemplate?.demoBride || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || (invitation.groomParents?.father ? `${invitation.groomParents.father} និង ${invitation.groomParents.mother}` : 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន');
  const brideParents = data.brideParents || (invitation.brideParents?.father ? `${invitation.brideParents.father} និង ${invitation.brideParents.mother}` : 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង');
  const dateStr = data.ceremonyDate || invitation.weddingDate || activeTemplate?.demoDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
  const timeStr = data.ceremonyTime || invitation.weddingTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ';
  const locationName = data.ceremonyLocation || invitation.weddingLocation || activeTemplate?.demoLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.locationAddress || data.ceremonyAddress || invitation.locationAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const googleMapsUrl = data.googleMapsUrl || invitation.googleMapsUrl || 'https://maps.google.com/?q=The+Premier+Center+Sen+Sok';
  const preweddingImg = data.preweddingPhoto || data.bgImage || activeTemplate?.bgImage || '/images/templates/traditional_indigo_hol_prewedding.jpg';

  // Bank & Gift
  const bankName = data.bankName || invitation.bankName || 'ABA PAY / BAKONG';
  const accountName = data.accountName || invitation.accountName || `${groom} & ${bride}`;
  const accountNumber = data.accountNumber || invitation.accountNumber || '012 345 678';
  const qrCodeImage = data.qrCodeImage || invitation.qrCodeImage || null;

  // Host contacts
  const phoneGroom = data.hostPhoneGroom || data.phoneGroom || invitation.hostPhoneGroom || '012 345 678';
  const phoneBride = data.hostPhoneBride || data.phoneBride || invitation.hostPhoneBride || '098 765 432';
  const telegramLink = data.telegramLink || invitation.telegramLink || 'https://t.me';

  // Dynamic Programs
  const programs = (data.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
        { time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យ' },
        { time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍តាមច្បាប់' },
        { time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរី' },
        { time: '១០:០០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
        { time: '១២:០០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់' },
        { time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងពិសារភោជនាហារ' }
      ];

  // Gallery
  const gallery = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : (activeTemplate?.galleryPhotos || [
        { id: 1, src: preweddingImg, caption: 'ហូលពពិលឥន្ទ្រនីលមាស' },
        { id: 2, src: '/images/templates/royal-gold/gold_1.jpg', caption: 'រស្មីមាសនៃក្តីស្រឡាញ់' },
        { id: 3, src: '/images/templates/royal-gold/gold_3.jpg', caption: 'សិរីមង្គលរាជវាំង' },
        { id: 4, src: '/images/templates/crimson-classic/crimson_1.jpg', caption: 'អនុស្សាវរីយ៍ផ្អែមល្ហែម' }
      ]);

  const { isPlaying, toggleMusic } = useTemplateAudio();
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'បងប្អូនខាងស្រុក', text: 'សូមជូនពរឱ្យមានសិរីសួស្តី ជ័យមង្គល ត្រជាក់ត្រជុំដូចទឹកអម្រឹត!' }
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
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 }, colors: ['#E3BA55', '#1A2A5E', '#FCF6BA'] });
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
      className="w-full relative pb-20 text-stone-800 font-kantumruy antialiased selection:bg-[#3B82F6] selection:text-white bg-pattern-indigo-hol overflow-hidden"
    >
      {/* Background Ambience */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.06] fixed-bg"
        style={{ backgroundImage: `url(${preweddingImg})` }}
      />

      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-stone-800 font-bold text-xs shadow-lg border-2 border-[#E3BA55]/60 cursor-pointer active:scale-95 transition"
      >
        <Music className={`w-4 h-4 text-[#1D4ED8] ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'ភ្លេងការ (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
      </button>

      <div className="w-full relative z-10">
        {/* Top Hero Section with Multiple Images Carousel */}
        <TraditionalHeroSection
          templateId="traditional-indigo-hol"
          groom={groom}
          bride={bride}
          images={data.heroImages}
          fallbackImage={preweddingImg}
          themeBorder="#E3BA55"
          badgeText="សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍"
        />

        {/* Header - Indigo & Gold */}
        <header className="text-center pt-8 pb-8 px-6 relative">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center bg-white border border-[#E3BA55] shadow-xs">
            <span className="font-moul text-lg text-[#1A2A5E]">ឧ</span>
          </div>
          <p className="text-xs tracking-widest text-[#1D4ED8] uppercase mb-1 font-semibold">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
          <h1 className="font-moul text-2xl sm:text-3xl text-[#1A2A5E] leading-relaxed tracking-wider mb-2">
            សិរីមង្គលអាពាហ៍ពិពាហ៍
          </h1>
          <p className="text-xs text-stone-500 italic mb-6">រចនាបថហូលពពិលឥន្ទ្រនីលមាស</p>

          {/* Couple Box */}
          <div className="my-6 p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-[#E3BA55]/60 shadow-md relative">
            <div className="text-2xl sm:text-3xl font-moul text-[#1A2A5E] tracking-wide mb-1">{groom}</div>
            <div className="my-2 text-[#E3BA55] font-semibold text-xs tracking-widest font-moul">✦ ជួបប្រសព្វនឹង ✦</div>
            <div className="text-2xl sm:text-3xl font-moul text-[#1A2A5E] tracking-wide">{bride}</div>
          </div>

          {/* Prewedding Photo */}
          <div className="my-6 max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-[#E3BA55] shadow-xl relative group bg-white">
            <img src={preweddingImg} alt={`${groom} & ${bride}`} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2A5E]/40 via-transparent to-transparent"></div>
          </div>

          {/* Countdown */}
          <div className="my-8 p-4 rounded-xl bg-white/90 border border-[#E3BA55]/40 max-w-sm mx-auto shadow-sm">
            <p className="text-xs text-[#1A2A5E] font-moul mb-3">រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#1A2A5E] font-mono">{timeLeft.days}</span>
                <span className="block text-[10px] text-[#E3BA55]">ថ្ងៃ</span>
              </div>
              <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#1A2A5E] font-mono">{timeLeft.hours}</span>
                <span className="block text-[10px] text-[#E3BA55]">ម៉ោង</span>
              </div>
              <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#1A2A5E] font-mono">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-[#E3BA55]">នាទី</span>
              </div>
              <div className="p-2 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                <span className="text-lg font-bold text-[#1A2A5E] font-mono">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-[#E3BA55]">វិនាទី</span>
              </div>
            </div>
          </div>
        </header>

        {/* Parents */}
        <section className="px-6 py-6 border-t border-[#E3BA55]/20">
          <h2 className="font-moul text-center text-[#1A2A5E] text-base mb-6">មាតាបិតាទាំងសងខាង</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-[#E3BA55]/30 shadow-xs">
              <p className="text-xs text-[#1D4ED8] font-semibold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
              <p className="font-semibold text-sm text-stone-800 leading-relaxed">{groomParents}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-[#E3BA55]/30 shadow-xs">
              <p className="text-xs text-[#1D4ED8] font-semibold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
              <p className="font-semibold text-sm text-stone-800 leading-relaxed">{brideParents}</p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="px-6 py-8 border-t border-[#E3BA55]/20">
          <h2 className="font-moul text-center text-[#1A2A5E] text-base mb-6">កាលវិភាគពិធីបុរាណ</h2>
          <div className="space-y-3">
            {programs.map((ev, i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-[#E3BA55]/30 shadow-xs">
                <span className="text-xs font-bold text-[#1A2A5E] bg-[#EFF6FF] px-2.5 py-1 rounded shrink-0 border border-[#BFDBFE]">{ev.time}</span>
                <span className="text-xs sm:text-sm text-stone-800 font-medium">{ev.title || ev.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 py-8 border-t border-[#E3BA55]/20">
          <h2 className="font-moul text-center text-[#1A2A5E] text-base mb-6">រូបថតអនុស្សាវរីយ៍</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.map((p, idx) => (
              <div
                key={p.id || idx}
                onClick={() => setActivePhoto(p.src || p)}
                className="group rounded-2xl overflow-hidden border border-[#E3BA55]/40 bg-white cursor-pointer hover:border-[#1D4ED8] transition relative aspect-square shadow-xs"
              >
                <img src={p.src || p} alt={p.caption || 'Prewedding'} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" decoding="async" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent flex items-end p-2 justify-center">
                  <span className="text-[11px] font-semibold text-white truncate">{p.caption || 'អនុស្សាវរីយ៍'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="px-6 py-8 border-t border-[#E3BA55]/20 text-center">
          <h2 className="font-moul text-[#1A2A5E] text-base mb-2">ទីតាំងប្រារព្ធពិធី</h2>
          <p className="text-sm font-semibold text-stone-900 mb-1">{locationName}</p>
          <p className="text-xs text-stone-500 mb-5">{address}</p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#1E3A8A] to-[#1D4ED8] text-white font-semibold text-xs shadow-md hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>បើកមើលក្នុង Google Maps</span>
          </a>
        </section>

        {/* Digital Gift */}
        <section className="px-6 py-8 border-t border-[#E3BA55]/20 text-center">
          <h2 className="font-moul text-[#1A2A5E] text-base mb-2">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h2>
          <p className="text-xs text-stone-500 mb-6">{bankName}</p>
          <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#E3BA55]/40 max-w-sm mx-auto shadow-md">
            {qrCodeImage && (
              <div
                onClick={() => setShowQrModal(true)}
                className="w-36 h-36 mx-auto mb-3 p-1.5 rounded-xl bg-white border border-[#E3BA55] cursor-pointer hover:scale-105 transition shadow-sm"
              >
                <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain rounded-lg" decoding="async" loading="lazy" />
                <span className="text-[9px] text-[#1D4ED8] font-bold block mt-0.5">ចុចដើម្បីពង្រីក QR</span>
              </div>
            )}
            <p className="font-bold text-sm text-[#1A2A5E] uppercase">{accountName}</p>
            <p className="text-lg font-mono tracking-widest text-[#1D4ED8] font-bold my-3">{accountNumber}</p>
            <button
              onClick={() => copyAccount(accountNumber)}
              className="text-xs bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1E3A8A] border border-[#BFDBFE] px-4 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 mx-auto font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 text-[#1D4ED8]" />}
              <span>{copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលេខគណនី'}</span>
            </button>
          </div>
        </section>

        {/* Host Contacts */}
        <section className="px-6 py-8 border-t border-[#E3BA55]/20">
          <h2 className="font-moul text-center text-[#1A2A5E] text-base mb-6">ទំនាក់ទំនងម្ចាស់កម្មវិធី</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
            <a
              href={`tel:${phoneGroom.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-[#E3BA55]/40 text-stone-800 hover:bg-[#EFF6FF] transition font-semibold text-xs shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#1D4ED8]" />
              <span>កូនប្រុស៖ {phoneGroom}</span>
            </a>
            <a
              href={`tel:${phoneBride.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-[#E3BA55]/40 text-stone-800 hover:bg-[#EFF6FF] transition font-semibold text-xs shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#1D4ED8]" />
              <span>កូនស្រី៖ {phoneBride}</span>
            </a>
          </div>
          {telegramLink && (
            <div className="mt-3 text-center">
              <a
                href={telegramLink.startsWith('http') ? telegramLink : `https://${telegramLink}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#229ED9] hover:bg-[#1D8BC0] text-white font-semibold text-xs shadow transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Telegram ម្ចាស់កម្មវិធី</span>
              </a>
            </div>
          )}
        </section>

        {/* RSVP */}
        <section className="px-6 py-8 border-t border-[#E3BA55]/20">
          <h2 className="font-moul text-center text-[#1A2A5E] text-base mb-6">ការបញ្ជាក់វត្តមានចូលរួម</h2>
          {rsvpDone ? (
            <div className="p-5 rounded-xl bg-white/90 border border-[#E3BA55] text-center shadow-xs">
              <p className="font-moul text-sm text-[#1A2A5E] mb-1">សូមអរគុណ!</p>
              <p className="text-xs text-stone-600">ការបញ្ជាក់វត្តមានរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ។</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs text-[#1D4ED8] font-semibold mb-1">ឈ្មោះរបស់អ្នក *</label>
                <input
                  type="text"
                  required
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="សូមបញ្ចូលឈ្មោះ"
                  className="w-full bg-white border border-[#E3BA55]/40 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#1D4ED8] font-semibold mb-1">ការចូលរួម</label>
                <select
                  value={rsvp.attendance}
                  onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                  className="w-full bg-white border border-[#E3BA55]/40 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#1D4ED8]"
                >
                  <option value="attending">ចូលរួម (Attending)</option>
                  <option value="not_attending">មិនបានចូលរួម (Decline)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#1E3A8A] to-[#1D4ED8] text-white font-semibold text-sm hover:brightness-105 shadow-md cursor-pointer active:scale-95 transition"
              >
                បញ្ជាក់ការចូលរួម
              </button>
            </form>
          )}
        </section>

        {/* Wishes */}
        <section className="px-6 py-8 border-t border-[#E3BA55]/20">
          <h2 className="font-moul text-center text-[#1A2A5E] text-base mb-6">សៀវភៅប្រសិទ្ធពរជ័យ</h2>
          <form onSubmit={handleWish} className="space-y-4 max-w-sm mx-auto mb-6">
            <input
              type="text"
              required
              value={wish.name}
              onChange={(e) => setWish({ ...wish, name: e.target.value })}
              placeholder="ឈ្មោះរបស់អ្នក"
              className="w-full bg-white border border-[#E3BA55]/40 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1D4ED8]"
            />
            <textarea
              required
              rows="3"
              value={wish.text}
              onChange={(e) => setWish({ ...wish, text: e.target.value })}
              placeholder="សរសេរសារជូនពរ..."
              className="w-full bg-white border border-[#E3BA55]/40 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#1D4ED8]"
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-[#1A2A5E] hover:bg-[#111C40] text-white font-semibold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-[#E3BA55]" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </form>

          <div className="space-y-3 max-w-sm mx-auto">
            {wishesList.map((w) => (
              <div key={w.id} className="p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-[#E3BA55]/30 text-xs shadow-xs">
                <p className="font-bold text-[#1A2A5E] mb-1">{w.name}</p>
                <p className="text-stone-600">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-[#E3BA55]/20 bg-white/60">
          <p className="font-moul text-xs text-[#1A2A5E] mb-2">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
          <p className="text-xs text-stone-500">សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល វិបុលសុខគ្រប់ប្រការ</p>
        </footer>
      </div>

      {/* Lightbox Modal */}
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
            <img src={activePhoto} alt="Enlarged" className="w-full rounded-2xl border-2 border-[#E3BA55] object-contain shadow-2xl" decoding="async" />
          </div>
        </div>
      )}

      {/* QR Code Zoom Modal */}
      {showQrModal && qrCodeImage && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative max-w-sm w-full bg-white p-6 rounded-3xl text-center shadow-2xl border-2 border-[#E3BA55]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 text-stone-500 hover:text-stone-900 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-moul text-[#1A2A5E] text-sm mb-1">ស្កេនដើម្បីជូនចំណងដៃ</h3>
            <p className="text-xs text-stone-500 mb-4">{bankName}</p>
            <div className="p-2 bg-stone-50 rounded-2xl border border-stone-200 mb-4">
              <img src={qrCodeImage} alt="QR Code Enlarged" className="w-full h-auto rounded-xl object-contain max-h-[350px]" decoding="async" loading="lazy" />
            </div>
            <p className="font-bold text-xs text-stone-800 uppercase">{accountName}</p>
            <p className="text-base font-mono font-bold text-[#1D4ED8] my-1">{accountNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default IndigoHolTemplate;
