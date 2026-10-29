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

export function AngkorPedimentTemplate({
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
  const preweddingImg = data.preweddingPhoto || data.bgImage || activeTemplate?.bgImage || '/images/templates/traditional_angkor_pediment_prewedding.jpg';

  // Bank details
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

  // Gallery Photos
  const gallery = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : (activeTemplate?.galleryPhotos || [
        { id: 1, src: preweddingImg, caption: 'ហោជាងប្រាសាទថ្មមាស' },
        { id: 2, src: '/images/templates/angkor-heritage/angkor_1.jpg', caption: 'កេរដំណែលប្រាសាទអង្គរវត្ត' },
        { id: 3, src: '/images/templates/angkor-heritage/angkor_2.jpg', caption: 'មោទនភាពវប្បធម៌ជាតិ' },
        { id: 4, src: '/images/templates/angkor-ancient-royalty/ancient_1.jpg', caption: 'សិរីមង្គលមហានគរ' }
      ]);

  const { isPlaying, toggleMusic } = useTemplateAudio();
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [rsvp, setRsvp] = useState({ name: '', attendance: 'attending', guests: '1 នាក់' });
  const [rsvpDone, setRsvpDone] = useState(false);
  const [wish, setWish] = useState({ name: '', text: '' });
  const [wishesList, setWishesList] = useState([
    { id: 1, name: 'ញាតិមិត្តកិត្តិយស', text: 'សូមឱ្យគូស្នេហ៍មានសិរីសួស្តី ជោគជ័យ និងសុភមង្គលដូចព្រះថោងនាងនាគ!' }
  ]);

  const [timeLeft, setTimeLeft] = useState({ days: 22, hours: 14, minutes: 30, seconds: 10 });

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
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.65 }, colors: ['#D4AF37', '#AA771C', '#FFF9D2'] });
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
      className="w-full relative pb-20 text-stone-800 font-kantumruy antialiased selection:bg-[#C59B27] selection:text-white bg-pattern-angkor-pediment overflow-hidden"
    >
      {/* Background Ambience */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.06] fixed-bg"
        style={{ backgroundImage: `url(${preweddingImg})` }}
      />

      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#8C6813] via-[#FFF9D2] to-[#C59B27] text-stone-900 font-bold text-xs shadow-xl cursor-pointer active:scale-95 transition"
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'ភ្លេងការ (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
      </button>

      <div className="w-full relative z-10">
        {/* Top Hero Section with Multiple Images Carousel */}
        <TraditionalHeroSection
          templateId="traditional-angkor-pediment"
          groom={groom}
          bride={bride}
          images={data.heroImages}
          fallbackImage={preweddingImg}
          themeBorder="#C59B27"
          badgeText="សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍"
        />

        {/* Header - Angkor Pediment Shape */}
        <header className="text-center pt-8 pb-8 px-6 relative">
          <div
            className="p-6 rounded-2xl bg-white/90 backdrop-blur-md border-2 border-[#C59B27]/40 shadow-lg mb-6"
            style={{ clipPath: 'polygon(50% 0%, 100% 8%, 100% 100%, 0% 100%, 0% 8%)' }}
          >
            <div className="text-[#C59B27] text-2xl pt-2 mb-2">❖ ❖ ❖</div>
            <p className="text-xs tracking-widest text-[#8C6813] uppercase mb-1 font-semibold">សិរីសួស្តី អាពាហ៍ពិពាហ៍</p>
            <h1 className="font-moul text-2xl sm:text-3xl text-[#8C6813] leading-relaxed tracking-wider mb-2">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h1>
            <p className="text-xs text-stone-500 italic mb-4">រចនាបថហោជាងប្រាសាទថ្មមាសបុរាណ</p>

            {/* Couple Names */}
            <div className="my-4 py-4 px-3 rounded-xl bg-[#FAF7F2] border border-[#C59B27]/30 shadow-xs">
              <div className="text-2xl sm:text-3xl font-moul text-stone-900 tracking-wide mb-1">{groom}</div>
              <div className="my-2 text-[#C59B27] font-semibold text-xs tracking-widest font-moul">✦ ជួបប្រសព្វនឹង ✦</div>
              <div className="text-2xl sm:text-3xl font-moul text-stone-900 tracking-wide">{bride}</div>
            </div>
          </div>

          {/* Prewedding Photo with Octagonal Royal Border */}
          <div
            className="my-6 max-w-sm mx-auto overflow-hidden border-2 border-[#C59B27] shadow-xl relative group bg-stone-100"
            style={{ clipPath: 'polygon(6% 0%, 94% 0%, 100% 6%, 100% 94%, 94% 100%, 6% 100%, 0% 94%, 0% 6%)' }}
          >
            <img src={preweddingImg} alt={`${groom} & ${bride}`} className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"></div>
          </div>

          {/* Countdown */}
          <div className="my-6 p-4 rounded-xl bg-white/90 border border-[#C59B27]/40 max-w-sm mx-auto shadow-sm">
            <p className="text-xs text-[#8C6813] font-moul mb-3">រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល</p>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#C59B27]/20">
                <span className="text-lg font-bold text-stone-900 font-mono">{timeLeft.days}</span>
                <span className="block text-[10px] text-[#8C6813]">ថ្ងៃ</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#C59B27]/20">
                <span className="text-lg font-bold text-stone-900 font-mono">{timeLeft.hours}</span>
                <span className="block text-[10px] text-[#8C6813]">ម៉ោង</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#C59B27]/20">
                <span className="text-lg font-bold text-stone-900 font-mono">{timeLeft.minutes}</span>
                <span className="block text-[10px] text-[#8C6813]">នាទី</span>
              </div>
              <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#C59B27]/20">
                <span className="text-lg font-bold text-stone-900 font-mono">{timeLeft.seconds}</span>
                <span className="block text-[10px] text-[#8C6813]">វិនាទី</span>
              </div>
            </div>
          </div>
        </header>

        {/* Parents Section */}
        <section className="px-6 py-6 border-t border-[#C59B27]/20">
          <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">មាតាបិតាទាំងសងខាង</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-[#C59B27]/30 shadow-xs">
              <p className="text-xs text-[#8C6813] font-semibold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
              <p className="font-semibold text-sm text-stone-800 leading-relaxed">{groomParents}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-sm border border-[#C59B27]/30 shadow-xs">
              <p className="text-xs text-[#8C6813] font-semibold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
              <p className="font-semibold text-sm text-stone-800 leading-relaxed">{brideParents}</p>
            </div>
          </div>
        </section>

        {/* Timeline with Manuscript Ribbon Shape */}
        <section className="px-6 py-8 border-t border-[#C59B27]/20">
          <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">កាលវិភាគពិធីបុរាណ</h2>
          <div className="space-y-3">
            {programs.map((ev, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-[#C59B27]/30 shadow-xs"
                style={{ clipPath: 'polygon(0 0, 100% 0, 97% 50%, 100% 100%, 0 100%, 3% 50%)' }}
              >
                <span className="text-xs font-bold text-stone-900 bg-gradient-to-r from-[#8C6813]/20 via-[#FFF9D2] to-[#C59B27]/30 border border-[#C59B27]/40 px-3 py-1 rounded shrink-0">{ev.time}</span>
                <span className="text-xs sm:text-sm text-stone-800 font-medium">{ev.title || ev.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="px-6 py-8 border-t border-[#C59B27]/20">
          <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">រូបថតអនុស្សាវរីយ៍</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {gallery.map((p, idx) => (
              <div
                key={p.id || idx}
                onClick={() => setActivePhoto(p.src || p)}
                className="group rounded-2xl overflow-hidden border-2 border-[#C59B27]/40 bg-stone-100 cursor-pointer hover:border-[#8C6813] transition relative aspect-[4/5] shadow-xs"
              >
                <img src={p.src || p} alt={p.caption || 'Prewedding'} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" decoding="async" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent flex items-end p-2 justify-center">
                  <span className="text-[11px] font-semibold text-[#FFF9D2] truncate">{p.caption || 'អនុស្សាវរីយ៍'}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="px-6 py-8 border-t border-[#C59B27]/20 text-center">
          <h2 className="font-moul text-[#8C6813] text-base mb-2">ទីតាំងប្រារព្ធពិធី</h2>
          <p className="text-sm font-semibold text-stone-900 mb-1">{locationName}</p>
          <p className="text-xs text-stone-600 mb-5">{address}</p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8C6813] via-[#FFF9D2] to-[#C59B27] text-stone-900 font-semibold text-xs shadow-md hover:brightness-105 active:scale-95 transition cursor-pointer"
          >
            <MapPin className="w-4 h-4" />
            <span>បើកមើលក្នុង Google Maps</span>
          </a>
        </section>

        {/* Digital Gift */}
        <section className="px-6 py-8 border-t border-[#C59B27]/20 text-center">
          <h2 className="font-moul text-[#8C6813] text-base mb-2">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h2>
          <p className="text-xs text-stone-500 mb-6">{bankName}</p>
          <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-sm border border-[#C59B27]/40 max-w-sm mx-auto shadow-md">
            {qrCodeImage && (
              <div
                onClick={() => setShowQrModal(true)}
                className="w-36 h-36 mx-auto mb-3 p-1.5 rounded-xl bg-white border border-[#C59B27] cursor-pointer hover:scale-105 transition shadow-sm"
              >
                <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain rounded-lg" decoding="async" loading="lazy" />
                <span className="text-[9px] text-[#8C6813] font-bold block mt-0.5">ចុចដើម្បីពង្រីក QR</span>
              </div>
            )}
            <p className="font-bold text-sm text-stone-800 uppercase">{accountName}</p>
            <p className="text-lg font-mono tracking-widest text-[#8C6813] font-bold my-3">{accountNumber}</p>
            <button
              onClick={() => copyAccount(accountNumber)}
              className="text-xs bg-stone-50 hover:bg-stone-100 text-stone-800 border border-[#C59B27]/40 px-4 py-1.5 rounded-md transition cursor-pointer flex items-center gap-1.5 mx-auto font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
              <span>{copied ? 'បានចម្លងរួចរាល់' : 'ចម្លងលេខគណនី'}</span>
            </button>
          </div>
        </section>

        {/* Host Contacts */}
        <section className="px-6 py-8 border-t border-[#C59B27]/20">
          <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">ទំនាក់ទំនងម្ចាស់កម្មវិធី</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto">
            <a
              href={`tel:${phoneGroom.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-[#C59B27]/40 text-stone-800 hover:bg-[#FAF7F2] transition font-semibold text-xs shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#8C6813]" />
              <span>កូនប្រុស៖ {phoneGroom}</span>
            </a>
            <a
              href={`tel:${phoneBride.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-white/90 border border-[#C59B27]/40 text-stone-800 hover:bg-[#FAF7F2] transition font-semibold text-xs shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#8C6813]" />
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
        <section className="px-6 py-8 border-t border-[#C59B27]/20">
          <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">ការបញ្ជាក់វត្តមានចូលរួម</h2>
          {rsvpDone ? (
            <div className="p-5 rounded-xl bg-white/90 border border-[#C59B27] text-center shadow-xs">
              <p className="font-moul text-sm text-[#8C6813] mb-1">សូមអរគុណ!</p>
              <p className="text-xs text-stone-600">ការបញ្ជាក់វត្តមានរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ។</p>
            </div>
          ) : (
            <form onSubmit={handleRsvp} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-xs text-[#8C6813] font-semibold mb-1">ឈ្មោះរបស់អ្នក *</label>
                <input
                  type="text"
                  required
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="សូមបញ្ចូលឈ្មោះ"
                  className="w-full bg-white border border-[#C59B27]/40 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C59B27]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#8C6813] font-semibold mb-1">ការចូលរួម</label>
                <select
                  value={rsvp.attendance}
                  onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                  className="w-full bg-white border border-[#C59B27]/40 rounded-lg px-3 py-2 text-sm text-stone-800 focus:outline-none focus:border-[#C59B27]"
                >
                  <option value="attending">ចូលរួម (Attending)</option>
                  <option value="not_attending">មិនបានចូលរួម (Decline)</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#8C6813] via-[#FFF9D2] to-[#C59B27] text-stone-900 font-semibold text-sm hover:brightness-105 shadow-md cursor-pointer active:scale-95 transition"
              >
                បញ្ជាក់ការចូលរួម
              </button>
            </form>
          )}
        </section>

        {/* Wishes */}
        <section className="px-6 py-8 border-t border-[#C59B27]/20">
          <h2 className="font-moul text-center text-[#8C6813] text-base mb-6">សៀវភៅប្រសិទ្ធពរជ័យ</h2>
          <form onSubmit={handleWish} className="space-y-4 max-w-sm mx-auto mb-6">
            <input
              type="text"
              required
              value={wish.name}
              onChange={(e) => setWish({ ...wish, name: e.target.value })}
              placeholder="ឈ្មោះរបស់អ្នក"
              className="w-full bg-white border border-[#C59B27]/40 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C59B27]"
            />
            <textarea
              required
              rows="3"
              value={wish.text}
              onChange={(e) => setWish({ ...wish, text: e.target.value })}
              placeholder="សរសេរសារជូនពរ..."
              className="w-full bg-white border border-[#C59B27]/40 rounded-lg px-3 py-2 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#C59B27]"
            ></textarea>
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-[#FFF9D2] font-semibold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>ផ្ញើសារជូនពរ</span>
            </button>
          </form>

          <div className="space-y-3 max-w-sm mx-auto">
            {wishesList.map((w) => (
              <div key={w.id} className="p-3 rounded-lg bg-white/90 backdrop-blur-sm border border-[#C59B27]/30 text-xs shadow-xs">
                <p className="font-bold text-stone-800 mb-1">{w.name}</p>
                <p className="text-stone-600">{w.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 px-4 border-t border-[#C59B27]/20 bg-[#FAF7F2]/80">
          <p className="font-moul text-xs text-[#8C6813] mb-2">Theab Digital • ធៀបអាពាហ៍ពិពាហ៍ឌីជីថល</p>
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
            <img src={activePhoto} alt="Enlarged" className="w-full rounded-2xl border-2 border-[#D4AF37] object-contain shadow-2xl" decoding="async" />
          </div>
        </div>
      )}

      {/* QR Code Zoom Modal */}
      {showQrModal && qrCodeImage && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative max-w-sm w-full bg-white p-6 rounded-3xl text-center shadow-2xl border-2 border-[#C59B27]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 text-stone-500 hover:text-stone-900 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-moul text-[#8C6813] text-sm mb-1">ស្កេនដើម្បីជូនចំណងដៃ</h3>
            <p className="text-xs text-stone-500 mb-4">{bankName}</p>
            <div className="p-2 bg-stone-50 rounded-2xl border border-stone-200 mb-4">
              <img src={qrCodeImage} alt="QR Code Enlarged" className="w-full h-auto rounded-xl object-contain max-h-[350px]" decoding="async" loading="lazy" />
            </div>
            <p className="font-bold text-xs text-stone-800 uppercase">{accountName}</p>
            <p className="text-base font-mono font-bold text-[#8C6813] my-1">{accountNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AngkorPedimentTemplate;
