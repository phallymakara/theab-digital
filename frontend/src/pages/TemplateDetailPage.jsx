import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { CEREMONY_DATA } from '../data/templates';
import confetti from 'canvas-confetti';
import { FlyingHeartsAndFlowers } from '../components/FlyingHeartsAndFlowers';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Check,
  Send,
  Heart,
  Share2,
  Copy,
  Download,
  Phone,
  MessageCircle,
  QrCode,
  Image as ImageIcon,
  Sparkles,
  X,
  Music,
  ChevronDown
} from 'lucide-react';

export function TemplateDetailPage() {
  const navigate = useNavigate();
  const params = useParams({ strict: false }) || {};
  const templateId = params.templateId || 'royal-gold';

  const {
    isAudioPlaying,
    toggleAudio,
    playAudio,
    pauseAudio,
    addToast,
    invitationData,
    setSelectedTemplate,
    setCurrentTheme
  } = useApp();

  // Find matching template or fallback to royal-gold
  const weddingTemplates = CEREMONY_DATA.wedding.templates || [];
  const activeTemplate =
    weddingTemplates.find((t) => t.id === templateId) ||
    weddingTemplates[0];

  // Play audio on preview entrance, stop song when leaving preview
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playAudio();

    // When user leaves the preview (navigates away), STOP the song
    return () => {
      pauseAudio();
    };
  }, []);

  // Sync selected template in context
  useEffect(() => {
    if (activeTemplate) {
      setSelectedTemplate(activeTemplate);
      setCurrentTheme(activeTemplate.themeColor || 'crimson');
    }
  }, [activeTemplate]);

  // Real-time Event Countdown (Target: May 18, 2026 or ~790 days)
  const [countdown, setCountdown] = useState({
    days: 790,
    hours: 19,
    minutes: 2,
    seconds: 24
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Lightbox Modal Image Preview
  const [activePhoto, setActivePhoto] = useState(null);

  // Gallery Photos
  const galleryPhotos = [
    {
      id: 1,
      src: activeTemplate.bgImage || '/images/templates/crimson_classic_prewedding.jpg',
      caption: 'ស្នេហ៍ផ្អែមល្ហែមរវាងគូស្នេហ៍'
    },
    {
      id: 2,
      src: '/images/templates/royal_gold_prewedding.jpg',
      caption: 'មង្គលសិរីមាសប្រណិត'
    },
    {
      id: 3,
      src: '/images/templates/floral_romance_prewedding.jpg',
      caption: 'អនុស្សាវរីយ៍ផ្កាស្រស់រ៉ូមែនទិក'
    },
    {
      id: 4,
      src: '/images/templates/emerald_jade_prewedding.jpg',
      caption: 'ភាពថ្លៃថ្នូរ និងសេចក្តីសុខក្សេមក្សាន្ត'
    },
    {
      id: 5,
      src: '/images/templates/angkor_heritage_prewedding.jpg',
      caption: 'កេរដំណែលប្រពៃណីខ្មែរអង្គរ'
    },
    {
      id: 6,
      src: '/images/templates/modern_luxury_prewedding.jpg',
      caption: 'ភាពទាន់សម័យ និងស៊ីវិល័យ'
    }
  ];

  // RSVP State
  const [rsvpForm, setRsvpForm] = useState({
    name: '',
    status: 'attending', // attending | not_attending
    guestCount: '1 នាក់'
  });

  const [rsvpList, setRsvpList] = useState([
    {
      id: 1,
      name: 'លោក ចន្ទ សុផល',
      status: 'attending',
      guestCount: '1 នាក់',
      time: '១០ នាទីមុន'
    },
    {
      id: 2,
      name: 'អ្នកនាង សុខ គន្ធា',
      status: 'attending',
      guestCount: '2 នាក់',
      time: '២៥ នាទីមុន'
    }
  ]);

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim()) {
      addToast('សូមបញ្ចូលឈ្មោះរបស់អ្នក', 'warning');
      return;
    }

    const newRsvp = {
      id: Date.now(),
      name: rsvpForm.name,
      status: rsvpForm.status,
      guestCount: rsvpForm.guestCount,
      time: 'ទើបតែឆ្លើយតប'
    };

    setRsvpList([newRsvp, ...rsvpList]);
    setRsvpForm({ name: '', status: 'attending', guestCount: '1 នាក់' });

    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#881337', '#BE123C', '#F59E0B']
      });
    } catch (err) {}

    addToast('សូមអរគុណ! ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាជោគជ័យ', 'success');
  };

  // Best Wishes State
  const [wishForm, setWishForm] = useState({
    name: '',
    message: ''
  });

  const [wishesList, setWishesList] = useState([
    {
      id: 1,
      name: 'លោក ចន្ទ សុផល',
      message: 'Congratulations! សូមជូនពរឱ្យអ្នកទាំងពីរមានសុភមង្គល និងស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង។',
      date: '13-10-2025 | 23:36 PM'
    },
    {
      id: 2,
      name: 'កញ្ញា ម៉ៅ សុខា',
      message: 'រីករាយថ្ងៃមង្គលការ! ជូនពរគូស្វាមីភរិយាថ្មីមានទ្រព្យសម្បត្តិហូរហៀរ និងជោគជ័យគ្រប់ភារកិច្ច។',
      date: '14-10-2025 | 08:15 AM'
    }
  ]);

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (!wishForm.name.trim() || !wishForm.message.trim()) {
      addToast('សូមបញ្ចូលឈ្មោះ និងសារជូនពររបស់អ្នក', 'warning');
      return;
    }

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()} | ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}`;

    const newWish = {
      id: Date.now(),
      name: wishForm.name,
      message: wishForm.message,
      date: formattedDate
    };

    setWishesList([newWish, ...wishesList]);
    setWishForm({ name: '', message: '' });

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#881337', '#E11D48', '#FDE047']
      });
    } catch (err) {}

    addToast('សារជូនពររបស់អ្នកត្រូវបានបង្ហោះដោយជោគជ័យ!', 'success');
  };

  // Add to Calendar helper
  const handleAddToCalendar = () => {
    const title = encodeURIComponent('ពិធីមង្គលការ ចាន់ សីហា & ហ៊ាង សុជាតា');
    const details = encodeURIComponent('សិរីមង្គលអាពាហ៍ពិពាហ៍ រៀបចំឡើងនៅសាលមង្គល ឌឹ ព្រេមៀ សែនសុខ (អគារ A)');
    const location = encodeURIComponent('ឌឹ ព្រេមៀ សែនសុខ, រាជធានីភ្នំពេញ');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=20260518T013000Z/20260518T150000Z`;
    window.open(googleCalUrl, '_blank');
    addToast('បានបើក Google Calendar', 'info');
  };

  // Copy share link helper
  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      addToast('បានចម្លងតំណភ្ជាប់ធៀបដោយជោគជ័យ!', 'success');
    }).catch(() => {
      addToast('មិនអាចចម្លងតំណភ្ជាប់បានទេ', 'warning');
    });
  };

  // Copy Account Number
  const handleCopyAccount = (accNo) => {
    navigator.clipboard.writeText(accNo).then(() => {
      addToast(`បានចម្លងលេខគណនី ${accNo} រួចរាល់!`, 'success');
    });
  };

  // Theme Accent Variables
  const isCrimson = activeTemplate.id === 'crimson-classic' || activeTemplate.themeColor === 'crimson';
  const isEmerald = activeTemplate.id === 'emerald-jade' || activeTemplate.themeColor === 'emerald';
  const isModern = activeTemplate.id === 'modern-luxury';

  const themeBorder = activeTemplate.borderColor || '#D4AF37';
  const themeTitleColor = activeTemplate.titleColor || '#881337';

  // Specific Typography styling for Crimson Classic
  const groomBrideFont = isCrimson
    ? 'font-komutt-a'
    : isEmerald
    ? 'font-moulpali'
    : isModern
    ? 'font-komutt-b'
    : 'font-moul';

  return (
    <div className="w-full min-h-screen bg-[#FAF8F5] text-stone-800 relative selection:bg-rose-900 selection:text-white pb-24">
      {/* Background Decorative Khmer Vignettes & Petals */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-rose-500/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-96 h-96 rounded-full bg-amber-300/15 blur-3xl"></div>
      </div>

      {/* Floating Audio Play/Pause Button */}
      <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2">
        <button
          onClick={toggleAudio}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-white/95 hover:bg-white text-stone-800 border-2 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer active:scale-95"
          style={{ borderColor: themeBorder }}
          title={isAudioPlaying ? 'ចុចដើម្បីបិទភ្លេង' : 'ចុចដើម្បីចាក់ភ្លេងមង្គល'}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md ${
            isAudioPlaying
              ? 'bg-gradient-to-tr from-amber-600 to-amber-500 animate-[spin_4s_linear_infinite]'
              : 'bg-stone-500'
          }`}>
            <Music className="w-4 h-4" />
          </div>
          <div className="text-left hidden sm:block pr-1">
            <span className="block text-[11px] font-bold text-stone-700 leading-tight">
              {isAudioPlaying ? 'កំពុងចាក់ភ្លេងមង្គល' : 'ភ្លេងមង្គលបុរាណ'}
            </span>
            <span className="block text-[10px] text-amber-700 font-medium">
              {isAudioPlaying ? 'ចុចដើម្បីបិទ' : 'ចុចដើម្បីចាក់'}
            </span>
          </div>
        </button>
      </div>


      {/* Back Button Row (Same position and styling as other pages) */}
      <div className="max-w-3xl mx-auto px-4 pt-4 sm:pt-6 relative z-20">
        <button
          onClick={() => navigate({ to: '/wedding' })}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white border border-stone-200/90 text-stone-700 hover:text-theabCrimson text-xs font-bold transition shadow-2xs cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-theabCrimson" />
          <span>ថយក្រោយ</span>
        </button>
      </div>

      {/* Main Content Container */}
      <main className="max-w-3xl mx-auto px-4 pt-3 sm:pt-4 space-y-10 relative z-10">

        {/* 1. Hero & Groom/Bride Section */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-amber-400/40 khmer-pattern relative animate-fade">
          {/* Header Strip with Prewedding Photo & Vignette */}
          <div className="relative min-h-[380px] sm:min-h-[440px] flex flex-col justify-between p-6 sm:p-8 text-center overflow-hidden">
            {/* Background Prewedding Photo */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${activeTemplate.bgImage || '/images/templates/royal_gold_prewedding.jpg'})` }}
            />
            {/* Elegant Gradient Vignette */}
            <div className={`absolute inset-0 ${
              isCrimson
                ? 'bg-gradient-to-t from-rose-950/95 via-rose-950/60 to-black/40'
                : isEmerald
                ? 'bg-gradient-to-t from-emerald-950/95 via-emerald-950/60 to-black/40'
                : 'bg-gradient-to-t from-black/90 via-black/55 to-black/35'
            }`} />

            {/* Flying Hearts & Flying Flowers Animation Layer */}
            <FlyingHeartsAndFlowers count={8} />

            {/* Inner Gold Frame Border */}
            <div className="absolute inset-3 sm:inset-4 rounded-[24px] border border-amber-300/40 pointer-events-none shadow-[inset_0_0_16px_rgba(212,175,55,0.25)]">
              <div className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-amber-300"></div>
              <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-amber-300"></div>
              <div className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-amber-300"></div>
              <div className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-amber-300"></div>
            </div>

            {/* Top Monogram */}
            <div className="relative z-10">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full mx-auto bg-amber-400/20 text-amber-300 flex items-center justify-center font-moul text-2xl border-2 border-amber-300/50 shadow-lg backdrop-blur-xs mb-2">
                {activeTemplate.monogram || 'ធ'}
              </div>
              <h1 className="font-moul text-xl sm:text-2xl text-amber-200 tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                សិរីមង្គលអាពាហ៍ពិពាហ៍
              </h1>
              <p className="text-xs sm:text-sm text-amber-100 font-sans tracking-widest uppercase font-semibold mt-0.5">
                Wedding Celebration
              </p>
            </div>

            {/* Center Couple Names in designated font */}
            <div className="relative z-10 my-4 sm:my-6">
              {isCrimson ? (
                /* Pure Traditional 5-line Structure in Kh Ang Komutt A */
                <div className="space-y-1">
                  <div className="font-komutt-a text-sm sm:text-base text-amber-200 drop-shadow">
                    កូនប្រុសនាម
                  </div>
                  <div className="font-komutt-a text-3xl sm:text-4xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    ចាន់ សីហា
                  </div>
                  <div className="font-komutt-a text-base sm:text-lg text-amber-300 my-1 drop-shadow">
                    &bull; និង &bull;
                  </div>
                  <div className="font-komutt-a text-sm sm:text-base text-amber-200 drop-shadow">
                    កូនស្រីនាម
                  </div>
                  <div className="font-komutt-a text-3xl sm:text-4xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                    ហ៊ាង សុជាតា
                  </div>
                </div>
              ) : (
                /* General Royal / Emerald / Modern Style */
                <div className="space-y-1">
                  <div className={`${groomBrideFont} text-3xl sm:text-4xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]`}>
                    ចាន់ សីហា
                  </div>
                  <div className="flex items-center justify-center gap-3 my-1">
                    <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-amber-400"></span>
                    <span className="font-serif italic text-lg text-amber-300 font-bold">&</span>
                    <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-amber-400"></span>
                  </div>
                  <div className={`${groomBrideFont} text-3xl sm:text-4xl text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]`}>
                    ហ៊ាង សុជាតា
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Date & Venue Badge */}
            <div className="relative z-10 pt-2 border-t border-amber-300/30 max-w-md mx-auto w-full">
              <p className="text-xs text-amber-200 font-medium">ប្រព្រឹត្តទៅនៅ</p>
              <p className="font-moul text-sm sm:text-base text-white tracking-wide my-1 drop-shadow">
                ១៨ - ឧសភា - ២០២៦
              </p>
              <p className="text-xs text-amber-100/90 leading-relaxed font-suwannaphum">
                ពិធីនេះរៀបចំឡើងនៅសាលមង្គល ឌឹ ព្រេមៀ សែនសុខ (អគារ A) រាជធានីភ្នំពេញ
              </p>
            </div>
          </div>

          {/* Parents Section Body */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-stone-50 to-white text-center">
            <div className="khmer-gold-strip max-w-xs mx-auto mb-6 opacity-75"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto">
              {/* Groom's Parents */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs relative">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-900 mx-auto flex items-center justify-center text-xs font-bold mb-2">
                  កំលោះ
                </div>
                <h4 className="font-moul text-sm text-theabCrimson mb-2.5">
                  ឪពុកម្ដាយខាងកូនកំលោះ
                </h4>
                <p className="text-stone-700 text-sm font-semibold leading-relaxed">
                  លោក ស៊ីណា ចាន់
                </p>
                <p className="text-stone-700 text-sm font-semibold leading-relaxed">
                  អ្នកស្រី មឿន ម៉ាឡៃ
                </p>
              </div>

              {/* Bride's Parents */}
              <div className="bg-white p-5 rounded-2xl border border-amber-200/80 shadow-xs relative">
                <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-900 mx-auto flex items-center justify-center text-xs font-bold mb-2">
                  ក្រមុំ
                </div>
                <h4 className="font-moul text-sm text-theabCrimson mb-2.5">
                  ឪពុកម្ដាយខាងកូនក្រមុំ
                </h4>
                <p className="text-stone-700 text-sm font-semibold leading-relaxed">
                  លោក ហ៊ិន ហ៊ាង
                </p>
                <p className="text-stone-700 text-sm font-semibold leading-relaxed">
                  អ្នកស្រី ភា សោភ័ណ្ឌ
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Event Calendar (ប្រតិទិន) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200/80 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-theabCrimson" />
            <h2 className="font-moul text-lg text-theabCrimson">
              ប្រតិទិន
            </h2>
          </div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-bold block mb-4">
            Event Calendar &bull; December 2028
          </span>

          {/* Khmer Gold Strip Divider */}
          <div className="khmer-gold-strip max-w-xs mx-auto mb-6 opacity-60"></div>

          {/* Calendar Grid Box */}
          <div className="max-w-md mx-auto bg-stone-50 rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-inner">
            <div className="text-center font-bold text-stone-800 text-sm mb-4">
              December 2028
            </div>

            {/* Days Header S M T W T F S */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-xs font-bold text-stone-500 pb-2 border-b border-stone-200 mb-2">
              <span className="text-rose-600">S</span>
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span className="text-rose-600">S</span>
            </div>

            {/* Days Grid 1..31 */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
              {/* Day 1 starts on Friday (5 empty cells for S, M, T, W, T) */}
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span className="p-2 rounded-lg hover:bg-stone-200 transition">1</span>
              <span className="p-2 rounded-lg text-rose-600 hover:bg-stone-200 transition">2</span>

              {[...Array(29)].map((_, idx) => {
                const dayNum = idx + 3;
                const isWeddingDay = dayNum === 18;
                return (
                  <div
                    key={dayNum}
                    className={`p-2 rounded-xl flex items-center justify-center relative transition-all ${
                      isWeddingDay
                        ? 'bg-theabCrimson text-white font-bold shadow-md ring-2 ring-amber-300 scale-105'
                        : 'hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <span>{dayNum}</span>
                    {isWeddingDay && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-theabCrimson hover:bg-rose-900 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-amber-300" />
              <span>Add to Calendar (បញ្ចូលក្នុងប្រតិទិន)</span>
            </button>
          </div>
        </section>

        {/* 3. Event Countdown (រាប់ថយក្រោយ) */}
        <section className="bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-amber-300 animate-pulse" />
              <h2 className="font-moul text-lg text-amber-200">
                រាប់ថយក្រោយ
              </h2>
            </div>
            <span className="text-xs uppercase font-sans tracking-widest text-amber-100/80 font-bold block mb-6">
              Event Countdown
            </span>

            {/* Countdown Grid (790 ថ្ងៃ • 19 ម៉ោង • 02 នាទី • 24 វិនាទី) */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-amber-300/30 shadow-inner">
                <span className="font-moul text-2xl sm:text-3xl text-amber-300 block">
                  {countdown.days}
                </span>
                <span className="text-xs text-amber-100 font-medium">ថ្ងៃ</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-amber-300/30 shadow-inner">
                <span className="font-moul text-2xl sm:text-3xl text-amber-300 block">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="text-xs text-amber-100 font-medium">ម៉ោង</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-amber-300/30 shadow-inner">
                <span className="font-moul text-2xl sm:text-3xl text-amber-300 block">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="text-xs text-amber-100 font-medium">នាទី</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-amber-300/30 shadow-inner">
                <span className="font-moul text-2xl sm:text-3xl text-amber-300 block">
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
                <span className="text-xs text-amber-100 font-medium">វិនាទី</span>
              </div>
            </div>

            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-900 text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </section>

        {/* 4. Wedding Program (កម្មពិធីសិរីសួស្ដី) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200/80">
          <div className="text-center mb-6">
            <h2 className="font-moul text-lg text-theabCrimson mb-1">
              កម្មពិធីសិរីសួស្ដី
            </h2>
            <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-bold">
              Wedding Program
            </span>
            <div className="khmer-gold-strip max-w-xs mx-auto mt-3 opacity-60"></div>
          </div>

          {/* Timeline List */}
          <div className="space-y-4 max-w-xl mx-auto">
            {[
              { time: 'វេលាម៉ោង ០៦:៣០ ព្រឹក', event: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន' },
              { time: 'វេលាម៉ោង ០៧:០០ ព្រឹក', event: 'ពិធីហែចំនូនចូលរោងជ័យ' },
              { time: 'វេលាម៉ោង ០៨:០០ ព្រឹក', event: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍' },
              { time: 'វេលាម៉ោង ០៨:៣០ ព្រឹក', event: 'ពិធីកាត់សក់បង្កក់សិរី' },
              { time: 'វេលាម៉ោង ១០:០០ ព្រឹក', event: 'ពិធីសំពះផ្ទឹម សែនចងដៃ ព្រះថោងនាងនាគ' },
              { time: 'វេលាម៉ោង ១២:០០ ថ្ងៃត្រង់', event: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់' },
              { time: 'វេលាម៉ោង ០៥:០០ ល្ងាច', event: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស' }
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 hover:border-amber-300 transition-all hover:bg-amber-50/30"
              >
                <div className="w-8 h-8 rounded-full bg-theabCrimson text-amber-300 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 shadow-xs">
                  {idx + 1}
                </div>
                <div>
                  <div className="font-bold text-amber-800 text-xs sm:text-sm">
                    {item.time}
                  </div>
                  <div className="text-stone-700 text-xs sm:text-[13px] font-medium mt-0.5">
                    {item.event}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Thank You & Sorry (អរគុណ & អធ្យាស្រ័យ) */}
        <section className="bg-gradient-to-b from-stone-50 to-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-300/40 text-center">
          <div className="w-12 h-12 rounded-full mx-auto bg-rose-50 text-theabCrimson flex items-center justify-center mb-3 border border-rose-200">
            <Heart className="w-6 h-6 fill-theabCrimson" />
          </div>
          <h2 className="font-moul text-lg text-theabCrimson mb-1">
            អរគុណ & អធ្យាស្រ័យ
          </h2>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-bold block mb-4">
            Thank You & Sorry
          </span>
          <div className="khmer-gold-strip max-w-xs mx-auto mb-5 opacity-60"></div>

          <p className="max-w-xl mx-auto text-stone-700 text-xs sm:text-sm leading-relaxed font-suwannaphum bg-white/80 p-5 rounded-2xl border border-stone-200 shadow-2xs italic">
            "យើងខ្ញុំ សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅ ចំពោះវត្តមាន ភ្ញៀវកិត្តិយសទាំងអស់ ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃអញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយសក្នុងពិធីនេះ។ ប្រសិនបើមានការខ្វះខាត ឬទទួលភ្ញៀវមិនបានដិតដល់ត្រង់ចំណុចណាមួយ សូមមេត្តាខន្តី និងអធ្យាស្រ័យដោយក្តីអនុគ្រោះ។"
          </p>
        </section>

        {/* 6. Location & Google Maps (ទីតាំងពិធី) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200/80 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-theabCrimson" />
            <h2 className="font-moul text-lg text-theabCrimson">
              ទីតាំងពិធី
            </h2>
          </div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-bold block mb-4">
            Google Maps
          </span>
          <div className="khmer-gold-strip max-w-xs mx-auto mb-5 opacity-60"></div>

          <p className="text-sm font-bold text-stone-800 mb-1">
            មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)
          </p>
          <p className="text-xs text-stone-500 mb-5">
            ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ
          </p>

          {/* Embedded Google Maps Preview Frame */}
          <div className="rounded-2xl overflow-hidden border border-stone-300 shadow-sm mb-4 max-w-xl mx-auto h-64 sm:h-72 bg-stone-100">
            <iframe
              title="Venue Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7753177659496!2d104.87760987595568!3d11.567936188632668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310951a029c78829%3A0xb304726bf6025bc0!2sThe%20Premier%20Centre%20Sen%20Sok!5e0!3m2!1sen!2skh!4v1700000000000!5m2!1sen!2skh"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            />
          </div>

          <a
            href="https://maps.app.goo.gl/gmxb8VaN78xgkFiu5"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-theabCrimson hover:bg-rose-900 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ExternalLink className="w-4 h-4 text-amber-300" />
            <span>Link ទៅកាន់ Google Maps</span>
          </a>
        </section>

        {/* 7. Photo Gallery (រូបថតអនុស្សារីយ៍) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200/80 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <ImageIcon className="w-5 h-5 text-theabCrimson" />
            <h2 className="font-moul text-lg text-theabCrimson">
              រូបថតអនុស្សារីយ៍
            </h2>
          </div>
          <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-bold block mb-4">
            Photo Gallery
          </span>
          <div className="khmer-gold-strip max-w-xs mx-auto mb-6 opacity-60"></div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative h-40 sm:h-48 rounded-2xl overflow-hidden cursor-pointer shadow-xs border border-stone-200"
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white p-2 text-center text-xs font-bold">
                  <span>ចុចដើម្បីមើលរូបធំ</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. Scan to Gift (ជូនចំណងដៃ) */}
        <section className="bg-gradient-to-b from-amber-50/60 to-white rounded-3xl p-6 sm:p-8 shadow-md border border-amber-300/60 text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <QrCode className="w-5 h-5 text-theabCrimson" />
            <h2 className="font-moul text-lg text-theabCrimson">
              ជូនចំណងដៃ
            </h2>
          </div>
          <span className="text-xs uppercase font-sans tracking-widest text-amber-900 font-bold block mb-1">
            Scan QR Code &bull; Scan to Gift
          </span>
          <p className="font-moul text-sm text-stone-800 mb-4">
            ចាន់ សីហា & ហ៊ាង សុជាតា
          </p>
          <div className="khmer-gold-strip max-w-xs mx-auto mb-6 opacity-75"></div>

          {/* Bank QR Code Card */}
          <div className="bg-white max-w-xs mx-auto rounded-3xl p-6 border-2 border-amber-300 shadow-xl text-center relative khmer-pattern">
            <div className="w-10 h-10 rounded-full bg-theabCrimson text-amber-300 flex items-center justify-center font-moul text-sm mx-auto mb-2 shadow">
              ធ
            </div>
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block mb-3">
              ABA PAY / BAKONG
            </span>

            {/* QR Image */}
            <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 inline-block mb-3 shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent('https://theab-digital.app/gift/seyha-socheata')}`}
                alt="Scan to Gift QR Code"
                className="w-44 h-44 object-contain rounded-lg"
              />
            </div>

            <p className="text-xs font-bold text-stone-800">
              CHAN SEYHA & HEANG SOCHEATA
            </p>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              012 345 678 (USD / KHR)
            </p>

            <button
              onClick={() => handleCopyAccount('012 345 678')}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5 text-theabCrimson" />
              <span>ចម្លងលេខគណនី</span>
            </button>
          </div>
        </section>

        {/* 9. RSVP (ការចូលរួម) */}
        <section id="rsvp-section" className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200/80">
          <div className="text-center mb-6">
            <h2 className="font-moul text-lg text-theabCrimson mb-1">
              ការចូលរួម
            </h2>
            <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-bold">
              RSVP
            </span>
            <div className="khmer-gold-strip max-w-xs mx-auto mt-3 opacity-60"></div>
          </div>

          <form onSubmit={handleRsvpSubmit} className="max-w-md mx-auto space-y-4">
            {/* Guest Name */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                ឈ្មោះរបស់អ្នក (Your Name) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="សូមបញ្ចូលឈ្មោះ..."
                value={rsvpForm.name}
                onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-theabCrimson focus:ring-1 focus:ring-theabCrimson text-xs sm:text-sm bg-stone-50/50"
              />
            </div>

            {/* Attendance Radio */}
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                តើអ្នកនឹងអញ្ជើញចូលរួមដែរឬទេ?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRsvpForm({ ...rsvpForm, status: 'attending' })}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    rsvpForm.status === 'attending'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  ចូលរួម (Attending)
                </button>
                <button
                  type="button"
                  onClick={() => setRsvpForm({ ...rsvpForm, status: 'not_attending' })}
                  className={`py-2 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    rsvpForm.status === 'not_attending'
                      ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  មិនបានចូលរួម
                </button>
              </div>
            </div>

            {/* Guest Count */}
            {rsvpForm.status === 'attending' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  ចំនួនអ្នកចូលរួម (Number of Guests)
                </label>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {['1 នាក់', '2 នាក់', '3 នាក់', '4 នាក់', '5+ នាក់'].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setRsvpForm({ ...rsvpForm, guestCount: count })}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                        rsvpForm.guestCount === count
                          ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                          : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-theabCrimson hover:bg-rose-900 text-white text-xs sm:text-sm font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4 text-amber-300" />
              <span>យល់ព្រម (Confirm)</span>
            </button>
          </form>

          {/* Live RSVP Response List */}
          <div className="mt-8 pt-6 border-t border-stone-200 max-w-md mx-auto">
            <h4 className="text-xs font-bold text-stone-500 mb-3 uppercase tracking-wider">
              ភ្ញៀវដែលបានឆ្លើយតបថ្មីៗ
            </h4>
            <div className="space-y-2">
              {rsvpList.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-stone-800">{item.name}</span>
                      <span className="text-stone-500 ml-1">
                        បានឆ្លើយតប៖{' '}
                        <strong className="text-emerald-700">
                          {item.status === 'attending' ? `ចូលរួម (${item.guestCount})` : 'មិនបានចូលរួម'}
                        </strong>
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-stone-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Best Wishes (សារជូនពរ) */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-stone-200/80">
          <div className="text-center mb-6">
            <h2 className="font-moul text-lg text-theabCrimson mb-1">
              សារជូនពរ
            </h2>
            <span className="text-xs uppercase font-sans tracking-widest text-stone-500 font-bold">
              Best Wishes
            </span>
            <div className="khmer-gold-strip max-w-xs mx-auto mt-3 opacity-60"></div>
          </div>

          <form onSubmit={handleWishSubmit} className="max-w-md mx-auto space-y-4 mb-8">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                ឈ្មោះរបស់អ្នក (Your Name) <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                placeholder="សូមបញ្ចូលឈ្មោះ..."
                value={wishForm.name}
                onChange={(e) => setWishForm({ ...wishForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-theabCrimson focus:ring-1 focus:ring-theabCrimson text-xs sm:text-sm bg-stone-50/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">
                សារជូនពររបស់អ្នក (Your Message) <span className="text-rose-600">*</span>
              </label>
              <textarea
                rows={3}
                placeholder="សូមសរសេរសារជូនពរ..."
                value={wishForm.message}
                onChange={(e) => setWishForm({ ...wishForm, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-theabCrimson focus:ring-1 focus:ring-theabCrimson text-xs sm:text-sm bg-stone-50/50"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-900 text-xs sm:text-sm font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4 text-stone-900" />
              <span>ផ្ញើរសារជូនពរ</span>
            </button>
          </form>

          {/* Wishes List */}
          <div className="max-w-md mx-auto space-y-3">
            {wishesList.map((wish) => (
              <div
                key={wish.id}
                className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 text-left relative"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-stone-900 text-xs sm:text-sm">
                    {wish.name}
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">
                    {wish.date}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-suwannaphum">
                  "{wish.message}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Contact Host (ទំនាក់ទំនងម្ចាស់ពិធីមង្គល) */}
        <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          <h2 className="font-moul text-base sm:text-lg text-amber-300 mb-1">
            ទំនាក់ទំនងម្ចាស់ពិធីមង្គល
          </h2>
          <div className="khmer-gold-strip max-w-xs mx-auto my-3 opacity-60"></div>

          <p className="text-xs text-stone-300 mb-4 leading-relaxed font-suwannaphum">
            ប្រសិនបើលោកអ្នកមានចម្ងល់ ឬត្រូវការការណែនាំផ្លូវ សូមទាក់ទងមកកាន់យើងខ្ញុំ៖
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://t.me/+85512345678"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Telegram: 012 345 678</span>
            </a>
            <a
              href="tel:012345678"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>ទូរស័ព្ទ: 012 345 678</span>
            </a>
          </div>
        </section>

      </main>

      {/* Lightbox Photo Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="max-w-2xl w-full max-h-[90vh] flex flex-col items-center relative text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white p-1 rounded-full cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>
            <img
              src={activePhoto.src}
              alt={activePhoto.caption}
              className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl border border-stone-700"
            />
            <p className="text-white text-xs sm:text-sm font-semibold mt-3">
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
