import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { plengKarSynth } from './PinpeatAudio';
import { TraditionalHeroSection } from './TraditionalHeroSection';
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
  CalendarPlus,
  Phone,
  MessageCircle,
  QrCode
} from 'lucide-react';

export function PhkachanSlathorTemplate({
  data = {},
  invitation = {},
  invitationData = {},
  activeTemplate = {}
}) {
  const groom = data.groomName || invitation.groomName || activeTemplate?.demoGroom || 'ហេង វឌ្ឍនា';
  const bride = data.brideName || invitation.brideName || activeTemplate?.demoBride || 'កែវ ចរណៃ';
  const groomParents = data.groomParents || (invitation.groomParents?.father ? `${invitation.groomParents.father} និង ${invitation.groomParents.mother}` : 'លោក ហេង វណ្ណា និង អ្នកស្រី គីម ស្រ៊ុន');
  const brideParents = data.brideParents || (invitation.brideParents?.father ? `${invitation.brideParents.father} និង ${invitation.brideParents.mother}` : 'លោក កែវ សម្បត្តិ និង អ្នកស្រី សុខ ហៀង');
  const dateStr = data.ceremonyDate || invitation.weddingDate || activeTemplate?.demoDate || 'ថ្ងៃអាទិត្យ ទី២៤ ខែធ្នូ ឆ្នាំ២០២៨';
  const timeStr = data.ceremonyTime || invitation.weddingTime || 'វេលាម៉ោង ០៦:៣០ ព្រឹក ដល់ ០៨:០០ យប់';
  const locationName = data.ceremonyLocation || invitation.weddingLocation || activeTemplate?.demoLocation || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
  const address = data.locationAddress || data.ceremonyAddress || invitation.locationAddress || 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const googleMapsUrl = data.googleMapsUrl || invitation.googleMapsUrl || 'https://maps.google.com/?q=The+Premier+Center+Sen+Sok';
  const preweddingImg = data.preweddingPhoto || data.bgImage || activeTemplate?.bgImage || '/images/templates/traditional_phkachan_slathor_prewedding.jpg';

  // Bank & Gift
  const bankName = data.bankName || invitation.bankName || 'ABA PAY / BAKONG';
  const accountName = data.accountName || invitation.accountName || `${groom} & ${bride}`;
  const accountNumber = data.accountNumber || invitation.accountNumber || '012 345 678';
  const qrCodeImage = data.qrCodeImage || invitation.qrCodeImage || null;

  // Host Contacts
  const phoneGroom = data.hostPhoneGroom || data.phoneGroom || invitation.hostPhoneGroom || '012 345 678';
  const phoneBride = data.hostPhoneBride || data.phoneBride || invitation.hostPhoneBride || '098 765 432';
  const telegramLink = data.telegramLink || invitation.telegramLink || 'https://t.me';

  // Dynamic Programs
  const programs = (data.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { num: '១', time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
        { num: '២', time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យ (ជំនូនកាល)' },
        { num: '៣', time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍' },
        { num: '៤', time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរី' },
        { num: '៥', time: '១០:០០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
        { num: '៦', time: '១២:០០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់' },
        { num: '៧', time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស ពិសាភោជនាហារ' }
      ];

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
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

  const gallery = (data.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : (activeTemplate?.galleryPhotos || [
        { id: 1, src: preweddingImg, caption: 'ផ្កាចន្ទន៍ដង្វាយមាស' },
        { id: 2, src: '/images/templates/angkor-heritage/angkor_1.jpg', caption: 'មង្គលសិរីមាស' },
        { id: 3, src: '/images/templates/angkor-heritage/angkor_2.jpg', caption: 'ផ្កាស្រស់រ៉ូមែនទិក' },
        { id: 4, src: '/images/templates/angkor-ancient-royalty/ancient_1.jpg', caption: 'ភាពថ្លៃថ្នូរ' },
        { id: 5, src: '/images/templates/angkor-ancient-royalty/ancient_2.jpg', caption: 'កេរដំណែលអង្គរ' },
        { id: 6, src: '/images/templates/traditional_indigo_hol_prewedding.jpg', caption: 'ភាពស៊ីវិល័យ' }
      ]);

  return (
    <div
      className="w-full relative pb-20 text-stone-800 font-kantumruy antialiased selection:bg-[#B88926] selection:text-white bg-pattern-phkachan-slathor overflow-hidden"
    >
      {/* Background Ambience Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.06] fixed-bg"
        style={{ backgroundImage: `url(${preweddingImg})` }}
      />

      <button
        onClick={toggleMusic}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-[#8E6514] via-[#FFEAA7] to-[#D4AF37] text-stone-900 font-bold text-xs shadow-xl cursor-pointer active:scale-95 transition"
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span>{isPlaying ? 'ភ្លេងការ (កំពុងចាក់)' : 'តន្ត្រីភ្លេងការ'}</span>
      </button>

      <div className="w-full relative z-10">
        {/* Top Hero Section with Multiple Images Carousel */}
        <TraditionalHeroSection
          templateId="traditional-phkachan-slathor"
          groom={groom}
          bride={bride}
          images={data.heroImages}
          fallbackImage={preweddingImg}
          themeBorder="#D4AF37"
          badgeText="សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍"
        />

        <div className="max-w-xl mx-auto px-4">
          {/* Header */}
          <header className="text-center pt-8 pb-4">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center bg-white/95 border-2 border-[#D4AF37] shadow-sm">
              <span className="font-moul text-xl text-[#8E6514]">៚</span>
            </div>
            <p className="text-xs tracking-widest text-[#B88926] uppercase font-bold mb-1">
              សិរីសួស្តី ជ័យមង្គល វិបុលសុខ
            </p>
            <h1 className="font-moul text-2xl sm:text-3xl text-[#8E6514] leading-relaxed tracking-wider mb-2">
              សិរីមង្គលអាពាហ៍ពិពាហ៍
            </h1>
            <p className="text-xs text-stone-500 italic">
              រចនាបថផ្កាចន្ទន៍ស្លាដក់មាស
            </p>

            {/* Couple Card */}
            <div className="my-6 p-6 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/80 shadow-md">
              <div className="text-2xl sm:text-3xl font-moul text-stone-900 tracking-wide mb-1">
                {groom}
              </div>
              <div className="my-2 text-[#B88926] font-semibold text-xs tracking-widest font-moul">
                ✦ ជួបប្រសព្វនឹង ✦
              </div>
              <div className="text-2xl sm:text-3xl font-moul text-stone-900 tracking-wide">
                {bride}
              </div>
            </div>

            {/* Hero Image */}
            <div className="my-6 max-w-sm mx-auto rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-xl relative group bg-white">
              <img
                src={preweddingImg}
                alt={`${groom} & ${bride}`}
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent"></div>
            </div>
          </header>

          {/* Parents Section */}
          <section className="my-8">
            <h2 className="font-moul text-center text-[#8E6514] text-base mb-6">
              មាតាបិតាទាំងសងខាង
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-xs">
                <p className="text-xs text-[#B88926] font-bold mb-2">ឪពុកម្តាយខាងកូនកំលោះ</p>
                <p className="font-semibold text-sm text-stone-800 leading-relaxed">{groomParents}</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#D4AF37]/40 shadow-xs">
                <p className="text-xs text-[#B88926] font-bold mb-2">ឪពុកម្តាយខាងកូនក្រមុំ</p>
                <p className="font-semibold text-sm text-stone-800 leading-relaxed">{brideParents}</p>
              </div>
            </div>
          </section>

          {/* Countdown */}
          <section className="my-8">
            <div className="bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/70 p-6 rounded-3xl shadow-sm text-center">
              <p className="font-moul text-xs text-[#8E6514] mb-1">កាលបរិច្ឆេទនៃពិធីមង្គល</p>
              <p className="text-sm font-semibold text-stone-800 mb-1">{dateStr}</p>
              <p className="text-xs text-stone-500 mb-5">{timeStr}</p>

              <div className="grid grid-cols-4 gap-2 text-center max-w-sm mx-auto mb-4">
                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-xs">
                  <span className="block font-mono text-lg font-bold text-stone-900">{timeLeft.days}</span>
                  <span className="text-[9px] text-[#8E6514]">ថ្ងៃ</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-xs">
                  <span className="block font-mono text-lg font-bold text-stone-900">{timeLeft.hours}</span>
                  <span className="text-[9px] text-[#8E6514]">ម៉ោង</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-xs">
                  <span className="block font-mono text-lg font-bold text-stone-900">{timeLeft.mins}</span>
                  <span className="text-[9px] text-[#8E6514]">នាទី</span>
                </div>
                <div className="p-2 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/40 shadow-xs">
                  <span className="block font-mono text-lg font-bold text-stone-900">{timeLeft.secs}</span>
                  <span className="text-[9px] text-[#8E6514]">វិនាទី</span>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline / Programs */}
          <section className="my-10">
            <div className="text-center mb-6">
              <h3 className="font-moul text-base text-[#8E6514]">កម្មពិធីសិរីសួស្ដី</h3>
              <p className="text-xs text-stone-600">តាមគន្លងប្រពៃណីព្រះពុទ្ធសាសនា និងបុរាណាចារ្យខ្មែរ</p>
            </div>

            <div className="relative max-w-md mx-auto pl-8 space-y-4 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-1 before:bg-gradient-to-b before:from-[#D4AF37] before:via-[#FFEAA7] before:to-transparent before:rounded-full">
              {programs.map((st, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <span className="absolute -left-8 top-1 w-6 h-6 rounded-full bg-[#D4AF37] text-stone-900 font-bold text-[11px] flex items-center justify-center ring-4 ring-[#FAF7F2] shadow-xs">
                    {i + 1}
                  </span>
                  <div className="flex-1 bg-white/95 backdrop-blur-md border border-[#D4AF37]/40 p-2.5 rounded-r-xl shadow-xs">
                    <span className="text-[11px] font-bold text-[#8E6514] bg-[#FAF7F2] border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                      {st.time}
                    </span>
                    <p className="text-xs text-stone-800 font-semibold mt-1">{st.title || st.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Location */}
          <section className="my-10 text-center">
            <div className="bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/80 p-6 rounded-3xl shadow-md">
              <h4 className="font-moul text-sm text-[#8E6514] mb-1">ទីតាំងប្រារព្ធពិធី</h4>
              <p className="font-bold text-sm text-stone-900 mt-1 font-moul leading-relaxed">{locationName}</p>
              <p className="text-xs text-stone-600 mt-1 mb-4">{address}</p>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B88926] via-[#FFF6D1] to-[#E5C058] text-stone-900 font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>បើកមើលក្នុង Google Maps</span>
              </a>
            </div>
          </section>

          {/* Gallery */}
          <section className="my-10">
            <div className="text-center mb-6">
              <h3 className="font-moul text-base text-[#8E6514]">រូបថតអនុស្សាវរីយ៍</h3>
              <p className="text-xs text-stone-600">អនុស្សាវរីយ៍ផ្អែមល្ហែម និងប្រពៃណីខ្មែរ</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {gallery.map((photo, idx) => (
                <div
                  key={photo.id || idx}
                  onClick={() => setActivePhoto(photo)}
                  className="cursor-pointer group relative rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 aspect-square bg-stone-100 shadow-xs hover:border-[#8E6514] transition"
                >
                  <img
                    src={photo.src || photo}
                    alt={photo.caption || 'Prewedding'}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/40 to-transparent opacity-80"></div>
                  <p className="absolute bottom-1.5 inset-x-1 text-center text-[10px] font-bold text-[#FFF6D1] truncate">
                    {photo.caption || 'អនុស្សាវរីយ៍'}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Digital Gift */}
          <section className="my-10">
            <div className="bg-white/95 backdrop-blur-md border-2 border-[#D4AF37]/80 p-6 rounded-3xl shadow-md text-center relative overflow-hidden">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] border border-[#D4AF37] text-[#8E6514] font-bold flex items-center justify-center text-xl mb-2 shadow-xs">
                <Heart className="w-6 h-6 text-[#8E6514] fill-[#8E6514]" />
              </div>
              <h3 className="font-moul text-base text-[#8E6514]">ជូនចំណងដៃតាមប្រព័ន្ធឌីជីថល</h3>
              <p className="text-xs text-stone-600 mb-4">{bankName}</p>

              <div className="bg-[#FAF7F2] border border-[#D4AF37]/50 rounded-2xl p-4 max-w-xs mx-auto shadow-xs">
                {qrCodeImage && (
                  <div
                    onClick={() => setShowQrModal(true)}
                    className="w-32 h-32 mx-auto mb-3 p-1.5 rounded-xl bg-white border border-[#D4AF37] cursor-pointer hover:scale-105 transition shadow-sm"
                  >
                    <img src={qrCodeImage} alt="QR Code" className="w-full h-full object-contain rounded-lg" />
                    <span className="text-[9px] text-[#8E6514] font-bold block mt-0.5">ចុចដើម្បីពង្រីក QR</span>
                  </div>
                )}
                <p className="text-[10px] font-bold text-[#8E6514] tracking-widest uppercase">{bankName}</p>
                <p className="font-bold text-xs text-stone-800 mt-1 uppercase">{accountName}</p>
                <p className="font-mono text-lg font-bold text-[#8E6514] tracking-widest my-2">{accountNumber}</p>
                <button
                  onClick={() => copyAccount(accountNumber)}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#B88926] via-[#FFF6D1] to-[#E5C058] text-stone-900 font-bold text-xs shadow-xs hover:brightness-105 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-stone-900" /> : <Copy className="w-3.5 h-3.5 text-stone-900" />}
                  <span>{copied ? '✓ បានចម្លងរួចរាល់!' : 'ចម្លងលេខគណនី'}</span>
                </button>
              </div>
            </div>
          </section>

          {/* Host Contacts */}
          <section className="my-10">
            <div className="bg-white/95 backdrop-blur-md border border-[#D4AF37]/50 rounded-2xl p-5 shadow-xs text-center">
              <h4 className="font-moul text-xs sm:text-sm text-[#8E6514] mb-3">ទំនាក់ទំនងម្ចាស់កម្មវិធី</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-sm mx-auto mb-3">
                <a
                  href={`tel:${phoneGroom.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 text-stone-800 hover:bg-stone-100 transition text-xs font-semibold"
                >
                  <Phone className="w-4 h-4 text-[#8E6514]" />
                  <span>កូនប្រុស៖ {phoneGroom}</span>
                </a>
                <a
                  href={`tel:${phoneBride.replace(/\s+/g, '')}`}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/40 text-stone-800 hover:bg-stone-100 transition text-xs font-semibold"
                >
                  <Phone className="w-4 h-4 text-[#8E6514]" />
                  <span>កូនស្រី៖ {phoneBride}</span>
                </a>
              </div>
              {telegramLink && (
                <a
                  href={telegramLink.startsWith('http') ? telegramLink : `https://${telegramLink}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#229ED9] text-white text-xs font-bold hover:brightness-105 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Telegram ម្ចាស់កម្មវិធី</span>
                </a>
              )}
            </div>
          </section>

          {/* RSVP & Wishes */}
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
                    <label className="block text-[#8E6514] mb-1 font-semibold">ឈ្មោះរបស់អ្នក *</label>
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
                    <label className="block text-[#8E6514] mb-1 font-semibold">ការចូលរួម</label>
                    <select
                      value={rsvp.attendance}
                      onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                      className="w-full bg-[#FAF7F2] border border-[#D4AF37]/40 rounded-lg p-2 text-stone-800 focus:outline-none focus:border-[#8E6514]"
                    >
                      <option value="attending">ចូលរួម (Attending)</option>
                      <option value="not_attending">មិនបានចូលរួម (Decline)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#B88926] via-[#FFF6D1] to-[#E5C058] text-stone-900 font-bold text-xs hover:brightness-105 active:scale-95 shadow-xs cursor-pointer transition"
                  >
                    បញ្ជាក់ការចូលរួម
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

          {/* Footer */}
          <footer className="pt-6 border-t border-[#D4AF37]/20 text-center">
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
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#D4AF37] text-black font-bold flex items-center justify-center cursor-pointer shadow-lg"
            >
              <X className="w-4 h-4" />
            </button>
            <img src={activePhoto.src || activePhoto} alt={activePhoto.caption || 'Prewedding'} className="w-full rounded-xl object-contain max-h-[70vh]" />
            <p className="text-center text-xs text-[#F6DE84] mt-2 font-semibold">{activePhoto.caption || 'អនុស្សាវរីយ៍'}</p>
          </div>
        </div>
      )}

      {/* QR Code Zoom Modal */}
      {showQrModal && qrCodeImage && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <div className="relative max-w-sm w-full bg-white p-6 rounded-3xl text-center shadow-2xl border-2 border-[#D4AF37]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 text-stone-500 hover:text-stone-900 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-moul text-[#8E6514] text-sm mb-1">ស្កេនដើម្បីជូនចំណងដៃ</h3>
            <p className="text-xs text-stone-500 mb-4">{bankName}</p>
            <div className="p-2 bg-stone-50 rounded-2xl border border-stone-200 mb-4">
              <img src={qrCodeImage} alt="QR Code Enlarged" className="w-full h-auto rounded-xl object-contain max-h-[350px]" />
            </div>
            <p className="font-bold text-xs text-stone-800 uppercase">{accountName}</p>
            <p className="text-base font-mono font-bold text-[#8E6514] my-1">{accountNumber}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PhkachanSlathorTemplate;
