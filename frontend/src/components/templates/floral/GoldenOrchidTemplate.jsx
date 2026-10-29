import React, { useState, useEffect, useRef } from 'react';
import { useTemplateAudio } from '../../../utils/useTemplateAudio';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Volume2,
  VolumeX,
  Navigation,
  Send,
  Sparkles,
  Share2,
  Users,
  CheckCircle,
  Copy,
  Gift,
  ArrowRight,
  ChevronRight,
  Utensils,
  Award,
  Flower2,
  Phone,
  X,
  Camera
} from 'lucide-react';

/**
 * GoldenOrchidTemplate
 * -------------------------------------------------------------
 * Theme: "ផ្កាអ័រគីដេវិមានកែវ" (Golden Orchid Glasshouse Luxury)
 * Category: ផ្កាស្រស់រ៉ូមែនទិក (floral)
 * Typography: font-koulen (modern statuesque headings) + font-serifTrad (Cinzel) + font-kantumruy (body)
 * Components:
 *   - Split-screen Glass Conservatory Architecture
 *   - Interactive Orchid Petal Burst on Click/Tap Canvas
 *   - Classical Glasshouse Waltz Audio Synthesizer
 *   - Ceremony Itinerary & Dress Code Guide
 *   - Luxury Table Seating & RSVP Confirmation Desk
 *   - Golden Envelope Digital Gift with ABA/ACLEDA QR
 */

export default function GoldenOrchidTemplate({
  data = {},
  invitation = {},
  activeTemplate = {},
  isEditMode = false,
  onSave = () => {}
}) {
  // Safe default data
  const groomName = data?.groomName || invitation?.groomName || activeTemplate?.demoGroom || 'កែវ សិទ្ធិពង្ស';
  const brideName = data?.brideName || invitation?.brideName || activeTemplate?.demoBride || 'អ៊ុំ ម៉ាលីកា';
  const groomFather = data?.groomFather || invitation?.groomParents?.father || 'ឯកឧត្តម កែវ មុនីរ័ត្ន';
  const groomMother = data?.groomMother || invitation?.groomParents?.mother || 'លោកជំទាវ ស៊ុន សុភា';
  const brideFather = data?.brideFather || invitation?.brideParents?.father || 'លោក អ៊ុំ សុវណ្ណារ៉ា';
  const brideMother = data?.brideMother || invitation?.brideParents?.mother || 'លោកស្រី ជា ចិន្តា';
  const weddingDate = data?.ceremonyDate || invitation?.weddingDate || activeTemplate?.demoDate || 'ថ្ងៃអាទិត្យ ទី១០ ខែមករា ឆ្នាំ២០២៧';
  const weddingTime = data?.ceremonyTime || invitation?.weddingTime || 'ម៉ោង ៤:៣០ រសៀល';
  const weddingLocation = data?.ceremonyLocation || invitation?.weddingLocation || activeTemplate?.demoLocation || 'វិមានកញ្ចក់ Grand Glasshouse Pavilion (The Premier Center Sen Sok)';
  const locationAddress = data?.locationAddress || data?.ceremonyAddress || invitation?.locationAddress || 'ផ្លូវ ១០០៣ សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ';
  const preweddingImage = data?.preweddingPhoto || data?.bgImage || activeTemplate?.bgImage || invitation?.preweddingImage || '/images/templates/floral_golden_orchid_prewedding.jpg';
  const googleMapsUrl = data?.googleMapsUrl || invitation?.googleMapsUrl || 'https://maps.google.com/?q=The+Premier+Center+Sen+Sok';

  // Bank & Gift
  const bankName = data?.bankName || invitation?.bankName || 'ABA & ACLEDA';
  const accountName = data?.accountName || invitation?.accountName || `${groomName} & ${brideName}`;
  const accountNumber = data?.accountNumber || invitation?.accountNumber || '012 999 888';
  const qrCodeImage = data?.qrCodeImage || invitation?.qrCodeImage || null;

  // Host Contacts
  const phoneGroom = data?.hostPhoneGroom || data?.phoneGroom || invitation?.hostPhoneGroom || '012 345 678';
  const phoneBride = data?.hostPhoneBride || data?.phoneBride || invitation?.hostPhoneBride || '098 765 432';
  const telegramLink = data?.telegramLink || invitation?.telegramLink || 'https://t.me';

  // Dynamic Programs
  const programs = (data?.ceremonyPrograms && data.ceremonyPrograms.length > 0)
    ? data.ceremonyPrograms
    : [
        { time: '០៦:៣០ ព្រឹក ដល់ ១១:០០ ព្រឹក', title: 'ពិធីហែជំនូន កាត់សក់បង្កក់សិរី និងសំពះផ្ទឹម', desc: 'ប្រារព្ធឡើងនៅគេហដ្ឋានខាងស្រី ស្របតាមទំនៀមទម្លាប់ព្រះរាជពិធីខ្មែរបុរាណ មានកិច្ចសូត្រមន្ត ប្រោះព្រំទឹកមន្ត និងសំពះចាស់ទុំ។' },
        { time: `${weddingTime} តទៅ`, title: 'ពិធីពិសាភោជនាហារ និងបាចផ្កាប្រសិទ្ធពរជ័យ', desc: `ប្រារព្ធឡើងនៅ ${weddingLocation}។ អមដោយតន្ត្រីកំដរពិធី និងការទទួលទានអាហារបែបអឺរ៉ុបលំដាប់ផ្កាយ ៥។` }
      ];

  // Gallery Photos
  const galleryPhotos = (data?.galleryPhotos && data.galleryPhotos.length > 0)
    ? data.galleryPhotos
    : (activeTemplate?.galleryPhotos || [
        { id: 1, src: preweddingImage, caption: 'Grand Glasshouse Orchid Luxury' },
        { id: 2, src: '/images/templates/floral-romance/floral_1.jpg', caption: 'ពន្លឺថ្ងៃមាសកក់ក្តៅនៃស្នេហា' },
        { id: 3, src: '/images/templates/floral-romance/floral_2.jpg', caption: 'ស្នាមញញឹមរំលេចក្តីសង្ឃឹម' }
      ]);

  // Fully isolated template audio («ភ្ជាប់និស្ស័យ» - NISAI)
  const { isPlaying, toggleAudio } = useTemplateAudio();

  // Canvas Petal Burst & Golden Shimmer
  const canvasRef = useRef(null);
  const burstsRef = useRef([]);

  // Modal States
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('២ នាក់');
  const [rsvpAttendance, setRsvpAttendance] = useState('attending');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Digital Envelope Flap State
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);

  // Active Ceremony Tab
  const [activeTab, setActiveTab] = useState('reception');

  // Canvas Petal Burst & Golden Glitters
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Continuous floating gold shimmer
    const ambientShimmer = [];
    for (let i = 0; i < 35; i++) {
      ambientShimmer.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        color: i % 2 === 0 ? '#D4AF37' : '#F5E6BE',
        vy: -Math.random() * 0.4 - 0.1,
        vx: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Render ambient shimmers
      ambientShimmer.forEach((p) => {
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();

        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
      });

      // Render click/tap bursts
      burstsRef.current.forEach((burst, bIdx) => {
        burst.particles.forEach((p) => {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.globalAlpha = p.alpha;

          if (p.isPetal) {
            // Draw Orchid petal teardrop
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size * 1.5, p.size, 0, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Gold Sparkle
            ctx.fillStyle = '#D4AF37';
            ctx.beginPath();
            ctx.arc(0, 0, p.size, 0, Math.PI * 2);
            ctx.shadowColor = '#D4AF37';
            ctx.shadowBlur = 8;
            ctx.fill();
          }
          ctx.restore();

          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05; // Gentle gravity
          p.rotation += p.rotSpeed;
          p.alpha -= 0.015;
        });

        burst.particles = burst.particles.filter((p) => p.alpha > 0);
      });

      burstsRef.current = burstsRef.current.filter((b) => b.particles.length > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Screen click handler to burst petals
    const handleScreenClick = (e) => {
      // Don't burst on input/buttons
      if (e.target.closest('button, input, textarea, a')) return;

      const newParticles = [];
      const count = 16;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1.5;
        newParticles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: Math.random() * 7 + 4,
          isPetal: i % 2 === 0,
          color: i % 3 === 0 ? '#FFFFFF' : i % 3 === 1 ? '#FDE68A' : '#F5E6BE',
          rotation: Math.random() * Math.PI,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          alpha: 1
        });
      }
      burstsRef.current.push({ particles: newParticles });
    };

    window.addEventListener('click', handleScreenClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleScreenClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;
    setRsvpSubmitted(true);
  };

  const copyBankInfo = () => {
    navigator.clipboard?.writeText(accountNumber.replace(/\s+/g, ''));
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2500);
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-stone-800 font-kantumruy relative selection:bg-amber-200 selection:text-stone-900 pb-20">
      {/* Interactive Petal Burst Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Floating Audio Toggle */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={toggleAudio}
          className={`px-3.5 py-2.5 rounded-full flex items-center gap-2 border backdrop-blur-md shadow-xl transition-all duration-300 text-xs font-medium cursor-pointer ${
            isPlaying
              ? 'bg-amber-600/10 text-amber-800 border-amber-500/50 ring-2 ring-amber-400/30'
              : 'bg-white/80 text-stone-600 border-stone-300 hover:text-stone-900'
          }`}
          title="ភ្លេងមង្គល «ភ្ជាប់និស្ស័យ»"
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-4 h-4 animate-pulse text-amber-600" />
              <span>ភ្លេង «ភ្ជាប់និស្ស័យ»</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-stone-400" />
              <span>ចាក់ភ្លេងមង្គល</span>
            </>
          )}
        </button>
      </div>

      {/* Main Layout Container */}
      <div className="max-w-4xl mx-auto px-4 pt-10 sm:pt-16 pb-12 relative z-20">
        {/* Top Header Monogram */}
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300/60 shadow-sm text-amber-800 text-xs">
            <Flower2 className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-serifTrad uppercase tracking-widest text-[11px] font-semibold">
              Grand Glasshouse Orchid Wedding
            </span>
            <Flower2 className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <p className="text-xs text-stone-500 uppercase tracking-widest font-serifTrad">
            The Wedding of Two Hearts
          </p>
        </div>

        {/* Hero Showcase with Prewedding Cambodian Couple (Fitted 100% Edge-to-Edge with Container, Frameless) */}
        <div className="relative mb-12 w-full mx-auto px-0">
          <div className="relative overflow-hidden shadow-[0_15px_40px_rgba(212,175,55,0.15)] w-full">
            <div className="relative overflow-hidden aspect-[896/1200] bg-stone-100 w-full">
              <img
                src={preweddingImage}
                alt="Cambodian Couple in Golden Orchid Glasshouse"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition duration-700 ease-out" decoding="async" />

              {/* Bottom Glass Bar Over Image */}
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent backdrop-blur-[2px] text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-amber-300 text-xs">❖</span>
                  <span className="font-koulen text-[11px] sm:text-xs md:text-sm text-amber-300 tracking-wider">
                    សិរីសួស្តីអាពាហ៍ពិពាហ៍
                  </span>
                  <span className="text-amber-300 text-xs">❖</span>
                </div>
                <h1 className="font-koulen text-2xl sm:text-4xl md:text-5xl tracking-wide drop-shadow-md text-amber-100">
                  {groomName} & {brideName}
                </h1>
                <p className="text-xs text-stone-200 mt-1 max-w-lg font-light hidden sm:block">
                  សូមគោរពអញ្ជើញឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា ចូលរួមពិធីសិរីសួស្តីអាពាហ៍ពិពាហ៍
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Couple & Date Showcase Card (Mobile & Desktop) */}
        <div className="text-center space-y-4 mb-14">
          <div className="space-y-2">
            <h2 className="font-koulen text-3xl sm:text-4xl text-amber-900 tracking-wide">
              {groomName}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-500" />
              <Heart className="w-5 h-5 text-amber-600 fill-amber-500/30" />
              <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="font-koulen text-3xl sm:text-4xl text-amber-900 tracking-wide">
              {brideName}
            </h2>
          </div>

          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-amber-300/80 shadow-sm text-stone-700 text-xs sm:text-sm font-semibold">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="font-serifTrad">{weddingDate}</span>
            <span className="text-stone-300">|</span>
            <Clock className="w-4 h-4 text-amber-600" />
            <span>{weddingTime}</span>
          </div>
        </div>

        {/* Parents' Honor & Blessing Section */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white/90 border border-stone-200/90 shadow-lg backdrop-blur-xl mb-12 relative overflow-hidden">
          <div className="text-center space-y-2 mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 font-serifTrad">
              Honorary Parents
            </span>
            <h3 className="font-koulen text-2xl sm:text-3xl text-stone-900">
              សេចក្តីថ្លែងអំណរគុណ និងពរជ័យមាតាបិតា
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
              យើងខ្ញុំជាមាតាបិតាទាំងសងខាង មានសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញភ្ញៀវកិត្តិយសទាំងអស់ អញ្ជើញចូលរួមជាសាក្សី និងផ្តល់កិត្តិយសក្នុងទិវាដ៏មហានក្ខត្តឫក្សនេះ។
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            {/* Groom's Family */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] border border-amber-200/60 shadow-sm space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold uppercase tracking-wider">
                មាតាបិតាខាងកូនប្រុស
              </span>
              <p className="font-koulen text-lg text-stone-800">{groomFather}</p>
              <p className="font-koulen text-lg text-stone-800">{groomMother}</p>
            </div>

            {/* Bride's Family */}
            <div className="p-6 rounded-2xl bg-[#FCFAF6] border border-amber-200/60 shadow-sm space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold uppercase tracking-wider">
                មាតាបិតាខាងកូនស្រី
              </span>
              <p className="font-koulen text-lg text-stone-800">{brideFather}</p>
              <p className="font-koulen text-lg text-stone-800">{brideMother}</p>
            </div>
          </div>
        </div>

        {/* Ceremony Itinerary & Dress Code Guide */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white/90 border border-stone-200/90 shadow-lg backdrop-blur-xl mb-12 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 font-serifTrad">
              Ceremony Itinerary
            </span>
            <h3 className="font-koulen text-2xl sm:text-3xl text-stone-900">
              កម្មវិធីពិធីមង្គលការ និងការស្លៀកពាក់
            </h3>
          </div>

          {/* Dynamic Itinerary Schedule List */}
          <div className="space-y-3">
            {programs.map((prog, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#FCFAF6] border border-stone-200 flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 font-bold shrink-0 mt-0.5">
                  {idx % 2 === 0 ? <Clock className="w-5 h-5" /> : <Utensils className="w-5 h-5" />}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h4 className="font-koulen text-lg text-stone-900">{prog.title}</h4>
                    <span className="text-xs text-amber-800 font-semibold font-serifTrad">{prog.time}</span>
                  </div>
                  {prog.desc && <p className="text-xs text-stone-600 leading-relaxed">{prog.desc}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs flex items-center gap-2 text-amber-900">
            <Award className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>សម្លៀកបំពាក់កិត្តិយស (Dress Code):</strong> Champagne Gold, Ivory & Formal Suit / សម្លៀកបំពាក់ប្រពៃណីខ្មែរ
            </span>
          </div>

          {/* Location & Map Link */}
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-stone-900">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{weddingLocation}</span>
              </div>
              <p className="text-[11px] text-stone-500 pl-6">{locationAddress}</p>
            </div>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 text-amber-100 font-semibold text-xs hover:bg-stone-800 transition shadow-md shrink-0"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>បើកមើលផែនទី Google Maps</span>
            </a>
          </div>
        </div>

        {/* Pre-wedding Gallery Section */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white/90 border border-stone-200/90 shadow-lg backdrop-blur-xl mb-12 space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-700 font-serifTrad">
              Photo Memories
            </span>
            <h3 className="font-koulen text-2xl sm:text-3xl text-stone-900">
              កម្រងរូបភាពអនុស្សាវរីយ៍ Pre-Wedding
            </h3>
            <p className="text-xs text-stone-500">ចុចលើរូបភាពដើម្បីមើលទំហំធំ</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-stone-100 border border-amber-200/60 cursor-pointer shadow-sm hover:border-amber-500 transition duration-300"
              >
                <img
                  src={photo.src}
                  alt={photo.caption || 'Prewedding'}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  loading="lazy" decoding="async" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-2.5">
                  <p className="text-[11px] text-amber-200 font-serifTrad line-clamp-2">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* UNIQUE COMPONENT: Luxury Table Seating & RSVP Confirmation */}
        <div className="rounded-3xl p-6 sm:p-10 bg-white/95 border-2 border-amber-300/80 shadow-xl backdrop-blur-xl mb-12 relative overflow-hidden">
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
              <Users className="w-3.5 h-3.5 text-amber-700" />
              <span>ប្រព័ន្ធឆ្លើយតបការចូលរួម (RSVP)</span>
            </div>
            <h3 className="font-koulen text-2xl sm:text-3xl text-stone-900">
              បញ្ជាក់ការចូលរួម និងរៀបចំតុទទួលភ្ញៀវ
            </h3>
            <p className="text-xs text-stone-500 max-w-md mx-auto">
              ដើម្បីជួយសម្រួលដល់ការរៀបចំតុ និងម្ហូបអាហារ សូមមេត្តាបំពេញព័ត៌មានខាងក្រោមមុនថ្ងៃពិធី
            </p>
          </div>

          {rsvpSubmitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-koulen text-xl text-emerald-900">
                បានបញ្ជាក់ការចូលរួមដោយជោគជ័យ!
              </h4>
              <p className="text-xs text-emerald-800 leading-relaxed">
                សូមអរគុណ <strong>{rsvpName}</strong>! យើងខ្ញុំទន្ទឹងរង់ចាំទទួលស្វាគមន៍លោកអ្នកយ៉ាងកក់ក្តៅបំផុត។
              </p>
            </div>
          ) : (
            <form onSubmit={handleRsvpSubmit} className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  ឈ្មោះភ្ញៀវកិត្តិយស
                </label>
                <input
                  type="text"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="ឧ. លោក ឈួន សម្បត្តិ & ភរិយា"
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-amber-500 transition bg-stone-50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    ស្ថានភាពចូលរួម
                  </label>
                  <select
                    value={rsvpAttendance}
                    onChange={(e) => setRsvpAttendance(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-amber-500 transition bg-stone-50"
                  >
                    <option value="attending">ចូលរួមផ្ទាល់ (Will Attend)</option>
                    <option value="not_attending">មិនអាចចូលរួមបាន (Regretfully Decline)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    ចំនួនភ្ញៀវ
                  </label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-amber-500 transition bg-stone-50"
                  >
                    <option value="១ នាក់">១ នាក់</option>
                    <option value="២ នាក់">២ នាក់</option>
                    <option value="៣ នាក់">៣ នាក់</option>
                    <option value="គ្រួសារ">ជាលក្ខណៈគ្រួសារ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  ពាក្យជូនពរ ឬកំណត់សម្គាល់ម្ហូបអាហារ
                </label>
                <textarea
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  placeholder="ជូនពរគូស្វាមីភរិយាថ្មី ឬប្រាប់ពីតម្រូវការអាហារពិសេស..."
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 text-xs focus:outline-none focus:border-amber-500 transition bg-stone-50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg shadow-amber-600/20 cursor-pointer"
              >
                ផ្ញើការបញ្ជាក់ចូលរួម (Submit RSVP)
              </button>
            </form>
          )}
        </div>

        {/* Digital Gift Envelope with Flap Interaction */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#FCFAF6] border border-amber-300/70 text-center shadow-lg relative overflow-hidden">
          <div className="space-y-2 mb-6">
            <span className="text-xs uppercase tracking-widest text-amber-700 font-serifTrad font-semibold">
              Digital Wedding Gift
            </span>
            <h3 className="font-koulen text-2xl sm:text-3xl text-stone-900">
              ចំណងដៃ និងអាំងប៉ាវឌីជីថល
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              ចុចលើស្រោមសំបុត្រមាសខាងក្រោម ដើម្បីបង្ហាញ QR Code ធនាគារ ABA និង ACLEDA
            </p>
          </div>

          {/* Envelope Card */}
          <div className="max-w-xs mx-auto">
            <button
              onClick={() => setIsEnvelopeOpen(!isEnvelopeOpen)}
              className="w-full p-6 rounded-2xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-400 shadow-md hover:shadow-lg transition cursor-pointer text-center group"
            >
              <Gift className="w-10 h-10 text-amber-700 mx-auto mb-2 group-hover:scale-110 transition" />
              <p className="font-koulen text-lg text-amber-900">
                {isEnvelopeOpen ? 'បិទស្រោមសំបុត្រវិញ' : 'បើកស្រោមសំបុត្រមាស'}
              </p>
              <span className="text-[11px] text-amber-800 font-serifTrad">
                Tap to Reveal QR
              </span>
            </button>

            {isEnvelopeOpen && (
              <div className="mt-4 p-5 rounded-2xl bg-white border border-stone-200 shadow-xl space-y-4 animate-in fade-in zoom-in duration-300">
                <div
                  onClick={() => setShowQrModal(true)}
                  className="w-36 h-36 mx-auto bg-stone-50 p-2 rounded-xl border border-stone-300 flex flex-col items-center justify-center text-center cursor-pointer hover:border-amber-500 transition"
                >
                  {qrCodeImage ? (
                    <img
                      src={qrCodeImage}
                      alt="QR Code"
                      className="w-full h-full object-contain rounded-lg" decoding="async" loading="lazy" />
                  ) : (
                    <>
                      <span className="font-bold text-xs text-blue-900">{bankName}</span>
                      <span className="text-[9px] text-stone-500 mt-1">KHQR WEDDING</span>
                      <span className="text-[8px] text-stone-600 mt-1 font-semibold truncate max-w-full">{accountName}</span>
                    </>
                  )}
                </div>
                <span className="text-[10px] text-stone-400 block">ចុចដើម្បីពង្រីក QR</span>

                <div className="text-xs text-stone-700 space-y-0.5">
                  <p className="font-bold text-stone-900">{bankName}: {accountNumber}</p>
                  <p className="text-[11px] text-stone-500">ឈ្មោះគណនី: {accountName}</p>
                </div>

                <button
                  onClick={copyBankInfo}
                  className="w-full py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  {copiedBank ? (
                    <>
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                      <span>បានចម្លងលេខកុងរួចរាល់!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>ចម្លងលេខកុងធនាគារ</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Host Contacts Section */}
        <div className="rounded-3xl p-6 sm:p-8 bg-white/90 border border-amber-300/60 shadow-lg backdrop-blur-xl mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-700 font-serifTrad">
            <Phone className="w-3.5 h-3.5 text-amber-600" />
            <span>Host Contacts</span>
          </div>
          <h3 className="font-koulen text-2xl text-stone-900">
            ទំនាក់ទំនងម្ចាស់ដើមការ
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <a
              href={`tel:${phoneGroom}`}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCFAF6] border border-amber-200 hover:bg-amber-50 transition text-xs"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-700" />
                <span className="font-koulen text-stone-800 text-sm">ខាងកូនប្រុស</span>
              </div>
              <span className="font-serifTrad font-bold text-amber-900">{phoneGroom}</span>
            </a>
            <a
              href={`tel:${phoneBride}`}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FCFAF6] border border-amber-200 hover:bg-amber-50 transition text-xs"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-700" />
                <span className="font-koulen text-stone-800 text-sm">ខាងកូនស្រី</span>
              </div>
              <span className="font-serifTrad font-bold text-amber-900">{phoneBride}</span>
            </a>
          </div>
          {telegramLink && (
            <div className="pt-2">
              <a
                href={telegramLink.startsWith('http') ? telegramLink : `https://${telegramLink}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ឆាតតាម Telegram</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center pt-12 text-xs text-stone-500 space-y-1">
          <p className="font-koulen text-stone-700 text-sm">
            សូមអរគុណយ៉ាងជ្រាលជ្រៅចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តមរបស់លោកអ្នក!
          </p>
          <p className="font-serifTrad text-[11px] uppercase tracking-wider text-stone-400">
            Digital Theab • Grand Glasshouse Orchid Luxury Edition
          </p>
        </footer>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-lg w-full bg-white border border-amber-300 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white hover:text-amber-300 flex items-center justify-center cursor-pointer border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[3/4] w-full bg-black">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption || 'Photo'}
                className="w-full h-full object-contain" decoding="async" />
            </div>
            {selectedPhoto.caption && (
              <div className="p-4 text-center bg-stone-50 border-t border-stone-200">
                <p className="font-serifTrad text-sm text-stone-800 font-semibold">
                  {selectedPhoto.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Code Zoom Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-white p-6 rounded-3xl max-w-xs w-full text-center shadow-2xl border border-amber-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h4 className="font-koulen text-base text-stone-900 mb-1">{bankName}</h4>
            <p className="text-xs text-stone-500 mb-3">{accountName}</p>
            {qrCodeImage ? (
              <img
                src={qrCodeImage}
                alt="QR Code"
                className="w-full aspect-square object-contain rounded-xl border border-stone-200 bg-white p-2" decoding="async" loading="lazy" />
            ) : (
              <div className="w-full aspect-square bg-stone-50 rounded-xl border border-stone-200 flex flex-col items-center justify-center text-amber-900 p-4">
                <span className="font-bold text-sm mb-1">{bankName}</span>
                <span className="text-xs">{accountNumber}</span>
                <span className="text-[11px] text-stone-500 mt-1">{accountName}</span>
              </div>
            )}
            <p className="text-xs font-serifTrad font-bold text-amber-800 mt-3">
              {accountNumber}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
