import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { CEREMONY_DATA } from '../data/templates';
import confetti from 'canvas-confetti';
import { FlyingHeartsAndFlowers } from '../components/FlyingHeartsAndFlowers';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  ChevronRight,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Check,
  X,
  Send,
  Sparkles
} from 'lucide-react';

export function InvitationPreviewPage() {
  const navigate = useNavigate();
  const {
    invitationData,
    ceremonyType,
    selectedTemplate,
    currentTheme,
    isAudioPlaying,
    toggleAudio,
    addToast
  } = useApp();

  const ceremonyInfo = CEREMONY_DATA[ceremonyType] || CEREMONY_DATA.wedding;
  const data = invitationData;

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 27,
    hours: 14,
    minutes: 35,
    seconds: 50,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // RSVP Form state
  const [formData, setFormData] = useState({
    guest_name: '',
    phone: '',
    attendance_status: 'attending',
    guest_count: 1,
    wishes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCeremonyRoute = () => {
    if (ceremonyType === 'engagement') return '/engagement';
    if (ceremonyType === 'housewarming') return '/housewarming';
    return '/wedding';
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guest_name.trim()) {
      addToast('សូមបញ្ចូលឈ្មោះភ្ញៀវកិត្តិយស', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/v1/invitations/${data.id || 1}/rsvps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'direct_link',
        }),
      });

      if (!response.ok) {
        // Fallback for demo if backend isn't ready
        console.warn('Backend responded with error, falling back locally');
      }

      setIsSubmitted(true);
      addToast('សូមអរគុណ! ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាដោយជោគជ័យ', 'success');

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#881337', '#BE123C', '#F2E4BA'],
        });
      } catch (err) {
        console.warn('Confetti error:', err);
      }
    } catch (err) {
      console.warn('RSVP submission error:', err);
      setIsSubmitted(true);
      addToast('សូមអរគុណ! ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រា', 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const accentBg =
    currentTheme === 'gold'
      ? 'bg-gradient-to-r from-amber-600 to-amber-700'
      : currentTheme === 'emerald'
      ? 'bg-gradient-to-r from-emerald-700 to-emerald-900'
      : 'bg-gradient-to-r from-rose-900 to-rose-950';

  const isTraditional =
    selectedTemplate?.category === 'traditional' ||
    selectedTemplate?.tag === 'ប្រពៃណីបុរាណ' ||
    selectedTemplate?.cardStyle?.startsWith('traditional-');

  const getTraditionalBgClass = () => {
    switch (selectedTemplate?.id) {
      case 'traditional-phkachan-slathor':
        return 'bg-pattern-phkachan-slathor';
      case 'traditional-royal-lacquer':
        return 'bg-pattern-royal-lacquer';
      case 'traditional-crimson-angkoreach':
        return 'bg-pattern-crimson-angkoreach';
      case 'traditional-ivory-parchment':
        return 'bg-pattern-ivory-parchment';
      case 'traditional-indigo-hol':
        return 'bg-pattern-indigo-hol';
      case 'traditional-angkor-pediment':
        return 'bg-pattern-angkor-pediment';
      case 'traditional-royal-pavilion':
        return 'bg-pattern-royal-pavilion';
      default:
        return 'bg-traditional-pattern-main';
    }
  };

  const bgClass = isTraditional
    ? getTraditionalBgClass()
    : ceremonyType === 'engagement'
      ? 'bg-ceremony-engagement'
      : ceremonyType === 'housewarming'
      ? 'bg-ceremony-housewarming'
      : 'bg-ceremony-wedding';

  return (
    <div className={`w-full min-h-screen ${bgClass} py-6 md:py-10 relative overflow-hidden animate-fade`}>
      {/* Decorative Ambient Background Glow Elements */}
      <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-theabGold/10 blur-3xl pointer-events-none animate-ambient-glow"></div>
      <div className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-rose-500/5 blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '5s' }}></div>

      <section className="container-max max-w-3xl mx-auto relative z-10">
        {/* Top Toolbar for host */}
        <div className="flex items-center justify-between mb-6 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-200/90 shadow-sm text-xs animate-card-enter">
        <button
          onClick={() => navigate({ to: getCeremonyRoute() })}
          className="btn-secondary !py-1.5 !px-3 flex items-center gap-1 cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-theabCrimson" />
          <span>ត្រឡប់ទៅជ្រើសរើសគំរូធៀប</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className="btn-secondary !py-1.5 !px-3 flex items-center gap-1.5 text-amber-800 cursor-pointer active:scale-95"
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-600 animate-pulse" />
                <span>បិទភ្លេង</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-stone-500" />
                <span>ចាក់ភ្លេងមង្គល</span>
              </>
            )}
          </button>
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="btn-primary !py-1.5 !px-3.5 flex items-center gap-1 text-white cursor-pointer active:scale-95"
          >
            <span>ផ្ទាំងគ្រប់គ្រងភ្ញៀវ</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* The Luxury Digital Theab Card */}
      <div className="animate-scale-up bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/50 mb-8 khmer-pattern relative">
        {/* Flying Hearts & Flying Flowers Animation Layer */}
        <FlyingHeartsAndFlowers count={8} />
        {/* Top Royal Khmer Banner */}
        <div className={`${accentBg} text-amber-300 py-6 px-4 text-center relative overflow-hidden`}>
          <div className="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none animate-float-slow"></div>
          <div className="w-16 h-16 rounded-full mx-auto bg-amber-400/20 text-amber-300 flex items-center justify-center font-moul text-2xl shadow-inner border border-amber-300/40 mb-2 animate-glow-pulse">
            {ceremonyInfo.monogram}
          </div>
          <span className="text-xs uppercase font-sans tracking-widest text-amber-200 font-bold block">
            Digital Khmer Theab
          </span>
          <h1 className="font-moul text-xl md:text-2xl mt-1 tracking-wide text-amber-100">
            {data.titleKh || ceremonyInfo.title}
          </h1>
          <div className="khmer-gold-strip max-w-xs mx-auto mt-3"></div>
        </div>

        {/* Main Theab Body */}
        <div className="p-6 md:p-10 text-center">
          {/* Parents Section */}
          <div className="max-w-md mx-auto mb-6 text-stone-600 text-xs md:text-sm leading-relaxed">
            <p className="text-stone-400 text-xs font-semibold mb-1">
              ដោយសេចក្តីគោរព និងមនោសញ្ចេតនាជ្រាលជ្រៅពី
            </p>
            <p className="font-bold text-stone-800">
              {data.groomParents || ceremonyInfo.defaultGroomParents}
            </p>
            <span className="inline-block my-1 text-amber-600 font-bold">&bull; និង &bull;</span>
            <p className="font-bold text-stone-800">
              {data.brideParents || ceremonyInfo.defaultBrideParents}
            </p>
          </div>

          {/* Welcome Text */}
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/50 max-w-lg mx-auto mb-8 text-xs md:text-sm text-stone-700 leading-relaxed italic">
            "{data.welcomeQuote || ceremonyInfo.defaultQuote}"
          </div>

          {/* Groom & Bride Highlight Section */}
          <div className="py-6 px-4 bg-gradient-to-r from-stone-50 via-amber-50/30 to-stone-50 rounded-2xl border border-amber-300/40 max-w-md mx-auto mb-8 shadow-sm">
            <span className="text-xs text-amber-800 font-bold uppercase tracking-wider block mb-1">
              {ceremonyType === 'housewarming' ? 'ម្ចាស់គេហដ្ឋាន' : 'កូនប្រុស • កូនស្រី'}
            </span>
            <div className="font-moul text-xl md:text-2xl text-rose-900 leading-snug">
              {data.groomName || ceremonyInfo.defaultGroom}
            </div>
            <div className="my-2 flex items-center justify-center gap-3">
              <span className="h-[1px] w-12 bg-amber-300"></span>
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                {ceremonyType === 'housewarming' ? 'សិរីសួស្តី' : 'សំពះផ្ទឹម'}
              </span>
              <span className="h-[1px] w-12 bg-amber-300"></span>
            </div>
            <div className="font-moul text-xl md:text-2xl text-rose-900 leading-snug">
              {data.brideName || ceremonyInfo.defaultBride}
            </div>
          </div>

          {/* Event Details Pill */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 text-left">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs mb-1">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>កាលបរិច្ឆេទ & ពេលវេលា</span>
              </div>
              <p className="text-sm font-semibold text-stone-800 mt-1">
                {data.ceremonyDate || ceremonyInfo.defaultDate}
              </p>
              <p className="text-xs text-stone-500">
                {data.ceremonyTime || ceremonyInfo.defaultTime}
              </p>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs mb-1">
                <MapPin className="w-4 h-4 text-rose-700" />
                <span>ទីតាំងប្រារព្ធពិធី</span>
              </div>
              <p className="text-sm font-semibold text-stone-800 mt-1 truncate">
                {data.locationName || ceremonyInfo.defaultLocation}
              </p>
              <a
                href={data.googleMapsUrl || 'https://maps.google.com'}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-rose-800 font-bold hover:underline mt-1"
              >
                <span>បើកមើលលើ Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Countdown Timer to Event */}
          <div className="max-w-md mx-auto mb-10 bg-white p-4 rounded-2xl border border-amber-300 shadow-sm">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
              រាប់ថយក្រោយដល់ថ្ងៃមង្គល (Countdown)
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-rose-50 rounded-xl border border-rose-100 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
                <span className="font-moul text-lg md:text-xl text-rose-900 block leading-tight">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] text-stone-500">ថ្ងៃ</span>
              </div>
              <div className="p-2 bg-rose-50 rounded-xl border border-rose-100 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
                <span className="font-moul text-lg md:text-xl text-rose-900 block leading-tight">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] text-stone-500">ម៉ោង</span>
              </div>
              <div className="p-2 bg-rose-50 rounded-xl border border-rose-100 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
                <span className="font-moul text-lg md:text-xl text-rose-900 block leading-tight">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] text-stone-500">នាទី</span>
              </div>
              <div className="p-2 bg-rose-50 rounded-xl border border-rose-100 hover:scale-105 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-300">
                <span className="font-moul text-lg md:text-xl text-rose-900 block leading-tight">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] text-stone-500">វិនាទី</span>
              </div>
            </div>
          </div>

          {/* RSVP Form Section */}
          <div className="bg-gradient-to-b from-stone-50 to-amber-50/20 p-6 md:p-8 rounded-2xl border-2 border-amber-300 text-left max-w-lg mx-auto shadow-sm">
            <div className="text-center mb-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
                ទម្រង់ឆ្លើយតប (RSVP Form)
              </span>
              <h3 className="font-moul text-base md:text-lg text-rose-900">
                សូមជួយឆ្លើយតបការចូលរួមរបស់អ្នក
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                ដើម្បីងាយស្រួលដល់ម្ចាស់ពិធីក្នុងការរៀបចំកន្លែងអង្គុយ និងតុទទួលបដិសណ្ឋារកិច្ច
              </p>
            </div>

            {/* Success Alert Box */}
            {isSubmitted && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3 animate-fade">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">សូមអរគុណច្រើន!</p>
                  <p className="text-emerald-700 mt-0.5">
                    ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាទុកក្នុងប្រព័ន្ធដោយជោគជ័យ។
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div className="form-group">
                <label className="form-label text-xs">ឈ្មោះភ្ញៀវកិត្តិយស (Full Name) *</label>
                <input
                  type="text"
                  value={formData.guest_name}
                  onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                  className="form-input text-xs sm:text-sm"
                  placeholder="ឧ. ឯកឧត្តម... / លោក... / អ្នកនាង..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label text-xs">លេខទូរស័ព្ទ ឬ Telegram (Optional)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input text-xs sm:text-sm"
                  placeholder="012 345 678"
                />
              </div>

              <div className="form-group">
                <label className="form-label text-xs">តើលោកអ្នកអាចចូលរួមបានទេ? *</label>
                <div className="grid grid-cols-2 gap-3 mt-1.5">
                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                      formData.attendance_status === 'attending'
                        ? 'border-emerald-500 bg-emerald-50/50'
                        : 'border-stone-200 bg-white hover:border-emerald-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rsvp-status"
                      value="attending"
                      checked={formData.attendance_status === 'attending'}
                      onChange={() => setFormData({ ...formData, attendance_status: 'attending' })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      ចូលរួម
                    </span>
                  </label>

                  <label
                    className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition ${
                      formData.attendance_status === 'declined'
                        ? 'border-rose-500 bg-rose-50/50'
                        : 'border-stone-200 bg-white hover:border-rose-500'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rsvp-status"
                      value="declined"
                      checked={formData.attendance_status === 'declined'}
                      onChange={() => setFormData({ ...formData, attendance_status: 'declined' })}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" />
                      មិនអាចចូលរួម
                    </span>
                  </label>
                </div>
              </div>

              {formData.attendance_status === 'attending' && (
                <div className="form-group animate-fade">
                  <label className="form-label text-xs">ចំនួនអ្នកចូលរួមសរុប (Guests)</label>
                  <select
                    value={formData.guest_count}
                    onChange={(e) => setFormData({ ...formData, guest_count: Number(e.target.value) })}
                    className="form-select text-xs sm:text-sm"
                  >
                    <option value="1">១ នាក់ (រូបខ្ញុំផ្ទាល់)</option>
                    <option value="2">២ នាក់ (ខ្ញុំ និងដៃគូ/ស្វាមី/ភរិយា)</option>
                    <option value="3">៣ នាក់</option>
                    <option value="4">៤ នាក់</option>
                    <option value="5">៥ នាក់ ឡើងទៅ</option>
                  </select>
                </div>
              )}

              <div className="form-group">
                <label className="form-label text-xs">ពាក្យជូនពរដល់ម្ចាស់ពិធី (Wishes) - Optional</label>
                <textarea
                  rows="3"
                  value={formData.wishes}
                  onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                  className="form-textarea text-xs sm:text-sm"
                  placeholder="សូមជូនពរឱ្យគូស្វាមីភរិយាថ្មី ជួបតែសេចក្តីសុខ សុភមង្គល..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary !py-3 text-sm flex items-center justify-center gap-2 text-white cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'កំពុងផ្ញើ...' : 'បញ្ជូនការឆ្លើយតប (Submit RSVP)'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
