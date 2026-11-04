// Lazy load detail/preview page chunk on-demand
const TemplateDetailPage = React.lazy(() => import('./TemplateDetailPage').then(m => ({ default: m.TemplateDetailPage || m.default })));
import React, { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { CEREMONY_DATA, TEMPLATE_CATEGORIES } from '../data/templates';
import { FlyingHeartsAndFlowers } from '../components/FlyingHeartsAndFlowers';
import { KhmerFloatingBackground } from '../components/KhmerBackgroundFlowers';
import { TraditionalBadgeComponent } from '../components/templates/traditional/TraditionalBadgeComponent';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Maximize2,
  CheckCircle,
  ExternalLink,
  X,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Flower2
} from 'lucide-react';

export function TemplatesPage({ ceremonyType = 'wedding', isGuestMode = false }) {
  const isGuest = isGuestMode || (typeof window !== 'undefined' && window.location.pathname.startsWith('/guest'));
  const navigate = useNavigate();
  const {
    selectCeremony,
    setSelectedTemplate,
    setCurrentTheme,
    invitationData,
    addToast,
    playAudio,
    restartAndPlayAudio,
    stopAudio,
    pauseAudio,
    selectedCategory,
    setSelectedCategory
  } = useApp();

  const activeCategory = selectedCategory || 'all';
  const setActiveCategory = setSelectedCategory;
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const categoryScrollRef = useRef(null);

  const openPreview = (tpl) => {
    setPreviewTemplate(tpl);
  };

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -240 : 240,
        behavior: 'smooth'
      });
    }
  };

  const handleCategorySelect = (catId) => {
    setActiveCategory(catId);
  };

  const ceremonyInfo = CEREMONY_DATA[ceremonyType] || CEREMONY_DATA.wedding;
  const templates = ceremonyInfo.templates || [];

  const filteredTemplates =
    activeCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setCurrentTheme(template.themeColor || 'crimson');
    addToast(`បានជ្រើសរើសគំរូ៖ "${template.name}"`, 'success');
    stopAudio?.();
    navigate({ to: `/customize/${template.id}` });
  };

  // Synchronize ceremony selection with route & stop audio when browsing templates
  useEffect(() => {
    selectCeremony(ceremonyType);
    stopAudio?.();
  }, [ceremonyType]);

  // Handle iframe message events (back/close or select) from the template preview inside modal
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data?.type === 'CLOSE_PREVIEW_MODAL') {
        setPreviewTemplate(null);
      } else if (e.data?.type === 'SELECT_TEMPLATE') {
        const targetId = e.data.templateId;
        const t = templates.find((item) => item.id === targetId) || previewTemplate;
        setPreviewTemplate(null);
        if (t) {
          handleSelectTemplate(t);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [previewTemplate, templates]);

  // When preview modal is open, stop parent audio so the template iframe plays its own soundtrack cleanly
  useEffect(() => {
    if (previewTemplate) {
      stopAudio?.();
    }
  }, [previewTemplate]);

  const groomName = invitationData.groomName || ceremonyInfo.defaultGroom;
  const brideName = invitationData.brideName || ceremonyInfo.defaultBride;

  const bgClass =
    activeCategory === 'traditional'
      ? 'bg-category-traditional'
      : ceremonyType === 'engagement'
        ? 'bg-ceremony-engagement'
        : ceremonyType === 'housewarming'
          ? 'bg-ceremony-housewarming'
          : 'bg-ceremony-wedding';

  const bgGradFrom =
    activeCategory === 'traditional'
      ? 'from-[#FAF8F5] via-[#FAF8F5]/90 to-transparent'
      : ceremonyType === 'engagement'
        ? 'from-[#FDF9F9] via-[#FDF9F9]/90 to-transparent'
        : ceremonyType === 'housewarming'
          ? 'from-[#F8FAF8] via-[#F8FAF8]/90 to-transparent'
          : 'from-[#FCFAF7] via-[#FCFAF7]/90 to-transparent';

  return (
    <div className={`w-full h-screen h-[100dvh] flex flex-col ${bgClass} relative overflow-hidden animate-fade`}>
      {/* Decorative Ambient Background Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-theabGold/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-rose-500/5 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none"></div>

      {/* Decorative Traditional Corner Watermark Motifs */}
      <div className="absolute -top-10 -left-10 w-64 h-64 text-theabGold/15 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full transform -rotate-12">
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M100 20 C120 70 180 100 180 100 C180 100 120 130 100 180 C80 130 20 100 20 100 C20 100 80 70 100 20 Z" fill="currentColor" opacity="0.35" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="absolute -bottom-16 -right-16 w-72 h-72 text-theabGold/15 pointer-events-none select-none">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full transform rotate-45">
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M100 20 C120 70 180 100 180 100 C180 100 120 130 100 180 C80 130 20 100 20 100 C20 100 80 70 100 20 Z" fill="currentColor" opacity="0.35" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* Locked Header Section with Soft Gradient Fade Behind Buttons */}
      <header className={`shrink-0 z-30 w-full pt-4 sm:pt-6 pb-3 bg-gradient-to-b ${bgGradFrom} relative`}>
        <div className="container-max">
          {/* Back Button Row */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => navigate({ to: '/' })}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-white border border-stone-200/90 text-stone-700 hover:text-theabCrimson text-xs font-bold transition shadow-2xs cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-theabCrimson shrink-0" />
              <span>ថយក្រោយ</span>
            </button>
          </div>

          {/* Title Row (Moved below back button to prevent truncation and height clipping) */}
          <h1 className="font-moul text-lg sm:text-2xl md:text-3xl text-theabCrimson tracking-wide text-center leading-normal mb-2 px-2">
            {ceremonyInfo.title}
          </h1>

          {/* Luxury Gold Divider Strip */}
          <div className="khmer-gold-strip max-w-xs mx-auto mb-3 opacity-70"></div>

          {/* Category Filter Bar (Centered in the middle of the page, completely static position) */}
          {templates.length > 0 && (
            <div className="w-full flex items-center justify-center px-2">
              <div
                ref={categoryScrollRef}
                className="flex items-center justify-center gap-1.5 sm:gap-2.5 overflow-x-auto py-1 px-1 no-scrollbar flex-nowrap max-w-full"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch'
                }}
              >
                {TEMPLATE_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      data-category-id={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className={`px-3.5 sm:px-4 py-1.5 rounded-full font-bold whitespace-nowrap text-xs transition-colors duration-150 shrink-0 cursor-pointer select-none border ${isActive
                          ? 'bg-theabCrimson text-white border-theabCrimson shadow-md shadow-rose-950/25 ring-2 ring-rose-300/60'
                          : 'bg-white/85 text-stone-700 hover:bg-white hover:text-theabCrimson border-stone-200/90 shadow-2xs hover:shadow-xs'
                        }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Scrollable Cards Container (Cards scroll with comfortable top padding) */}
      <main className={`flex-1 overflow-y-auto relative z-10 px-3 sm:px-6 pt-4 sm:pt-6 pb-12 scroll-smooth ${filteredTemplates.length === 0 ? 'flex flex-col justify-center items-center' : ''} [mask-image:linear-gradient(to_bottom,transparent_0px,black_24px,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0px,black_24px,black_100%)]`}>
        <div className={`w-full ${filteredTemplates.length === 0 ? 'flex items-center justify-center my-auto' : 'container-max'}`}>
          {/* Templates Gallery Grid (Modern Sleek Cards) */}
          {filteredTemplates.length === 0 ? (
            <div className="py-10 sm:py-14 text-center max-w-lg w-full mx-auto bg-white/95 backdrop-blur-md rounded-[32px] border border-stone-200/80 p-6 sm:p-10 shadow-xl my-auto animate-fade">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-theabCrimson shadow-xs animate-pulse">
                <Flower2 className="w-8 h-8 sm:w-10 sm:h-10 opacity-80" />
              </div>
              <h3 className="font-moul text-base sm:text-lg text-stone-800 mb-2.5 sm:mb-3">
                កំពុងរៀបចំគំរូរចនាថ្មីៗ
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mb-6 sm:mb-8 leading-relaxed font-suwannaphum max-w-md mx-auto">
                គំរូធៀបក្នុងប្រភេទនេះកំពុងស្ថិតក្នុងការច្នៃប្រឌិត និងដាក់ឱ្យប្រើប្រាស់ឆាប់ៗនេះ។ លោកអ្នកអាចជ្រើសរើសប្រភេទផ្សេងទៀតបាន។
              </p>
              {templates.length === 0 ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => navigate({ to: '/wedding' })}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-theabCrimson hover:bg-rose-900 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 cursor-pointer transition-all"
                  >
                    ជ្រើសរើសគំរូមង្គលការ (Wedding)
                  </button>
                  <button
                    onClick={() => navigate({ to: '/' })}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-bold active:scale-95 cursor-pointer transition-all border border-stone-200"
                  >
                    ត្រឡប់ទៅទំព័រដើម
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setActiveCategory('all')}
                  className="px-6 py-2.5 rounded-full bg-theabCrimson hover:bg-rose-900 text-white text-xs sm:text-sm font-bold shadow-sm hover:brightness-110 active:scale-95 cursor-pointer transition-all"
                >
                  មើលគំរូទាំងអស់
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {displayedTemplates.map((tpl, idx) => {
                const cardGroom = tpl.demoGroom || invitationData.groomName || ceremonyInfo.defaultGroom;
                const cardBride = tpl.demoBride || invitationData.brideName || ceremonyInfo.defaultBride;
                const cardDate = tpl.demoDate || invitationData.ceremonyDate || ceremonyInfo.defaultDate;

                return (
                  <div
                    key={tpl.id}
                    className="performance-card-contain animate-card-enter group bg-white rounded-[32px] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border-2 flex flex-col min-h-[390px] sm:min-h-[410px]"
                    style={{ borderColor: tpl.borderColor, animationDelay: `${idx * 65}ms` }}
                  >
                    {/* Edge-to-Edge Couple & Photo Body (Full Bleed from Top of Card) */}
                    <div
                      onClick={() => openPreview(tpl)}
                      className={`${tpl.previewBg} p-4 sm:p-5 text-center border-b border-stone-100 flex-1 flex flex-col items-center justify-center relative overflow-hidden rounded-t-[30px] min-h-[200px] sm:min-h-[220px] cursor-pointer`}
                    >
                      {/* Prewedding Photo Background & Elegant Vignette */}
                      {tpl.bgImage && (
                        <>
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                            style={{ backgroundImage: `url(${tpl.bgImage})` }}
                          />
                          <div className={`absolute inset-0 ${tpl.cardStyle === 'crimson-classic'
                              ? 'bg-gradient-to-t from-rose-950/90 via-rose-950/45 to-black/30'
                              : tpl.cardStyle === 'romantic-frosted'
                                ? 'bg-gradient-to-t from-black/75 via-black/35 to-black/20'
                                : tpl.cardStyle === 'floral-glasshouse'
                                  ? 'bg-gradient-to-t from-[#1C2C21]/85 via-[#2E4535]/40 to-black/20'
                                  : tpl.cardStyle === 'floral-khmer-blossom'
                                    ? 'bg-gradient-to-t from-[#2F1117]/85 via-[#4A1D25]/40 to-black/20'
                                    : tpl.cardStyle === 'floral-editorial-magazine'
                                      ? 'bg-gradient-to-t from-black/85 via-black/35 to-black/30'
                                      : tpl.cardStyle === 'floral-romdoul-moonlight'
                                        ? 'bg-gradient-to-t from-[#070B14]/90 via-[#0F172A]/40 to-black/30'
                                        : tpl.cardStyle === 'floral-golden-orchid'
                                          ? 'bg-gradient-to-t from-black/80 via-black/35 to-transparent'
                                          : 'bg-gradient-to-t from-black/80 via-black/40 to-black/25'
                            }`} />
                        </>
                      )}

                      {/* Flying Hearts & Flying Flowers Animation Layer for All Card Containers */}
                      <FlyingHeartsAndFlowers count={3} />

                      {/* Couple Names - Modern Khmer Typographic Text Directly Floating on Photo */}
                      {tpl.cardStyle === 'floral-romdoul-moonlight' ? (
                        /* Romdoul Moonlight Romance Style with Kh Ang Komutt A */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          <div className="font-komutt-a text-lg sm:text-xl text-white font-bold leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardGroom}
                          </div>

                          <div className="flex items-center justify-center gap-2 my-1">
                            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-amber-300 to-amber-200"></span>
                            <span className="font-serifTrad italic text-xs font-bold text-amber-300">~ & ~</span>
                            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent via-amber-300 to-amber-200"></span>
                          </div>

                          <div className="font-komutt-a text-lg sm:text-xl text-white font-bold leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'floral-golden-orchid' ? (
                        /* Golden Orchid & Glasshouse Luxury with font-koulen */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          <div className="font-koulen text-xl sm:text-2xl text-amber-100 leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-300 transition-colors truncate">
                            {cardGroom}
                          </div>

                          <div className="flex items-center justify-center gap-2 my-0.5">
                            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-amber-300 to-white"></span>
                            <span className="font-serifTrad text-xs font-bold text-amber-300">&</span>
                            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent via-amber-300 to-white"></span>
                          </div>

                          <div className="font-koulen text-xl sm:text-2xl text-amber-100 leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-300 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'floral-editorial-magazine' ? (
                        /* Editorial Haute Couture Floral Magazine Style */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          {/* Groom Name in Phalluch */}
                          <div className="font-phalluch text-lg sm:text-xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardGroom}
                          </div>

                          {/* Central Editorial Ampersand */}
                          <div className="flex items-center justify-center gap-2 my-1">
                            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-amber-200 to-white"></span>
                            <span className="font-serifTrad italic text-xs font-bold text-amber-200">&</span>
                            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent via-amber-200 to-white"></span>
                          </div>

                          {/* Bride Name in Phalluch */}
                          <div className="font-phalluch text-lg sm:text-xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'floral-khmer-blossom' ? (
                        /* Cambodian Couple Romantic Floral Jasmine & Rose Blossom Style */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          {/* Groom Name in Moulpali */}
                          <div className="font-moulpali text-lg sm:text-xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-rose-200 transition-colors truncate">
                            {cardGroom}
                          </div>

                          {/* Central Romantic Motif */}
                          <div className="flex items-center justify-center gap-2 my-1">
                            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-rose-300 to-rose-400"></span>
                            <span className="font-moulpali text-xs text-amber-300">✦ និង ✦</span>
                            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent via-rose-300 to-rose-400"></span>
                          </div>

                          {/* Bride Name in Moulpali */}
                          <div className="font-moulpali text-lg sm:text-xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-rose-200 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'floral-glasshouse' ? (
                        /* Luxury Botanical Glasshouse & Champagne Peony Style */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          {/* Groom Name in Preahvihear */}
                          <div className="font-preahvihear text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardGroom}
                          </div>

                          {/* Central Botanical Vine Divider */}
                          <div className="flex items-center justify-center gap-2 my-1">
                            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-amber-300 to-amber-400"></span>
                            <span className="font-serifTrad italic text-xs font-bold text-amber-200">&</span>
                            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent via-amber-300 to-amber-400"></span>
                          </div>

                          {/* Bride Name in Preahvihear */}
                          <div className="font-preahvihear text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'romantic-frosted' ? (
                        <div className="text-center w-full relative z-20 my-auto px-2">
                          {/* Modern Khmer Top Floral Motif (ក្បាច់ផ្កាចន្ទន៍មាស) */}
                          <div className="flex items-center justify-center gap-1.5 mb-1.5">
                            <svg viewBox="0 0 30 10" fill="currentColor" className="w-8 h-2.5 text-amber-300 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                              <path d="M0 5 C10 0 15 10 30 5 C20 10 15 0 0 5 Z" opacity="0.9" />
                              <circle cx="15" cy="5" r="1.8" fill="#FBBF24" />
                            </svg>
                            <span className="font-kouteok text-xs sm:text-[13px] text-amber-100 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              សិរីសួស្តីអាពាហ៍ពិពាហ៍
                            </span>
                            <svg viewBox="0 0 30 10" fill="currentColor" className="w-8 h-2.5 text-amber-300 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)] transform scale-x-[-1]">
                              <path d="M0 5 C10 0 15 10 30 5 C20 10 15 0 0 5 Z" opacity="0.9" />
                              <circle cx="15" cy="5" r="1.8" fill="#FBBF24" />
                            </svg>
                          </div>

                          {/* Groom Name in Kh Ang Kouteok Font */}
                          <div className="font-kouteok text-xl sm:text-2xl text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardGroom}
                          </div>

                          {/* Central Tied Knot with Direct Heart (No Container, No Background Box) */}
                          <div className="flex items-center justify-center gap-2.5 my-1.5">
                            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                            <Heart className="w-4 h-4 fill-rose-500 text-rose-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] shrink-0" />
                            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                          </div>

                          {/* Bride Name in Kh Ang Kouteok Font */}
                          <div className="font-kouteok text-xl sm:text-2xl text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardBride}
                          </div>

                          {/* Modern Khmer Bottom Accent Filigree */}
                          <div className="flex items-center justify-center gap-1 mt-1.5 opacity-85 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                            <div className="w-1.5 h-1.5 rotate-45 bg-amber-300"></div>
                            <div className="w-10 h-[1px] bg-amber-300"></div>
                            <div className="w-2 h-2 rotate-45 bg-rose-400"></div>
                            <div className="w-10 h-[1px] bg-amber-300"></div>
                            <div className="w-1.5 h-1.5 rotate-45 bg-amber-300"></div>
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'emerald-jade' ? (
                        /* Imperial Emerald Jade Typographic Style (Smooth Moulpali Calligraphy & Emerald Jewelry Accents, No Container) */
                        <div className="text-center w-full relative z-20 my-auto px-2">
                          {/* Top Header Motif & Title */}
                          <div className="flex items-center justify-center gap-2 mb-1.5">
                            <div className="h-[1px] w-6 bg-gradient-to-r from-transparent to-emerald-400"></div>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]"></span>
                            <span className="font-moulpali text-xs sm:text-[13px] text-emerald-200 tracking-wide drop-shadow-[0_2px_4px_rgba(2,44,34,0.95)]">
                              មរកតរាជវាំងសិរីសួស្តី
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]"></span>
                            <div className="h-[1px] w-6 bg-gradient-to-l from-transparent to-emerald-400"></div>
                          </div>

                          {/* Groom Name in Smooth Moulpali Font */}
                          <div className="font-moulpali text-base sm:text-lg text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(2,44,34,0.95)] hover:text-emerald-100 transition-colors truncate">
                            {cardGroom}
                          </div>

                          {/* Smooth Royal Amber & Emerald Ampersand */}
                          <div className="flex items-center justify-center gap-2.5 my-1">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-emerald-400 to-amber-300 drop-shadow"></div>
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-950/70 border border-emerald-400/50 shadow-[0_0_8px_rgba(16,185,129,0.6)]">
                              <span className="font-serifTrad italic text-[11px] font-bold text-amber-300">&</span>
                            </div>
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-emerald-400 to-amber-300 drop-shadow"></div>
                          </div>

                          {/* Bride Name in Smooth Moulpali Font */}
                          <div className="font-moulpali text-base sm:text-lg text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(2,44,34,0.95)] hover:text-emerald-100 transition-colors truncate">
                            {cardBride}
                          </div>

                          {/* Bottom Smooth Emerald-Gold Filigree */}
                          <div className="flex items-center justify-center gap-1.5 mt-2 opacity-90 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34D399]"></div>
                            <div className="w-8 h-[1px] bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400"></div>
                            <div className="w-2 h-2 rotate-45 border border-emerald-300 bg-amber-300 shadow-[0_0_6px_#F59E0B]"></div>
                            <div className="w-8 h-[1px] bg-gradient-to-l from-emerald-400 via-amber-300 to-emerald-400"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34D399]"></div>
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'emerald-radiant-diamond' ? (
                        /* Haute Joaillerie Radiant Sapphire-Cyan Diamond Direct Typographic Style (Kh Ang Komutt B Font, No Container) */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-cyan-200 transition-colors truncate">
                            {cardGroom}
                          </div>

                          <div className="flex items-center justify-center gap-2.5 my-1">
                            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-cyan-300 to-amber-300"></div>
                            <span className="font-serif italic text-xs font-bold text-cyan-300 drop-shadow">✦ & ✦</span>
                            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent via-cyan-300 to-amber-300"></div>
                          </div>

                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-cyan-200 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'emerald-nature-heirloom' ? (
                        /* Lush Forest Emerald Nature Direct Typographic Style (Kh Ang Komutt B Font, No Container) */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-emerald-200 transition-colors truncate">
                            {cardGroom}
                          </div>

                          <div className="flex items-center justify-center gap-2.5 my-1">
                            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-amber-300/80 to-amber-300"></div>
                            <Heart className="w-4 h-4 fill-amber-300 text-amber-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent via-amber-300/80 to-amber-300"></div>
                          </div>

                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-emerald-200 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'emerald-glasshouse-moonlight' ? (
                        /* Celestial Emerald Glasshouse Moonlight Style (Asvadek Mokha Font, No Container) */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          {/* Top Header Motif & Title in Asvadek Mokha */}
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <span className="text-amber-300 text-[10px] drop-shadow">✦</span>
                            <span className="font-komutt text-[11px] sm:text-xs text-amber-200 tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                              មរកតវិមានកែវរស្មីចន្ទ្រា
                            </span>
                            <span className="text-amber-300 text-[10px] drop-shadow">✦</span>
                          </div>

                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardGroom}
                          </div>

                          <div className="flex items-center justify-center gap-2.5 my-1">
                            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-emerald-400 to-amber-300"></div>
                            <div className="w-5 h-5 rounded-full bg-[#03241D]/90 border border-amber-300/80 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                              <span className="font-serif italic text-[10px] font-bold text-amber-300">✦ & ✦</span>
                            </div>
                            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent via-emerald-400 to-amber-300"></div>
                          </div>

                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'emerald-noir-editorial' ? (
                        /* Emerald Noir Editorial Folio Style (Kh Ang Komutt B, No Container) */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <span className="text-[#E2C375] text-[10px] font-mono tracking-widest">+ HAUTE COUTURE +</span>
                          </div>

                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-[#E2C375] transition-colors truncate">
                            {cardGroom}
                          </div>

                          <div className="flex items-center justify-center gap-2.5 my-1">
                            <div className="h-[0.5px] w-10 bg-gradient-to-r from-transparent via-[#E2C375] to-[#E2C375]"></div>
                            <span className="font-serif italic text-xs font-bold text-[#E2C375]">&</span>
                            <div className="h-[0.5px] w-10 bg-gradient-to-l from-transparent via-[#E2C375] to-[#E2C375]"></div>
                          </div>

                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-[#E2C375] transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'emerald-malachite-seal' ? (
                        /* Imperial Malachite Gilded Wax Seal Style (Kh Ang Komutt B, No Container) */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1">
                            <span className="text-amber-300 text-[10px]">⚜</span>
                            <span className="font-komutt text-[11px] sm:text-xs text-amber-200 tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                              មរកតក្សត្រាត្រាជ័រកែវ
                            </span>
                            <span className="text-amber-300 text-[10px]">⚜</span>
                          </div>

                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardGroom}
                          </div>

                          <div className="flex items-center justify-center gap-2.5 my-1">
                            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-amber-300 to-amber-400"></div>
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-amber-200 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                              <span className="font-serif italic text-[10px] font-black text-emerald-950">✦ & ✦</span>
                            </div>
                            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent via-amber-300 to-amber-400"></div>
                          </div>

                          <div className="font-komutt text-xl sm:text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle?.startsWith('modern-') ? (
                        /* Modern Luxury Chic Direct-on-Photo Typographic Style (Kh Ang Komutt B Font, No Container/Background) */
                        <div className="text-center w-full relative z-20 my-auto px-2">
                          {/* Top Header Motif & Title in Kh Ang Komutt B */}
                          <div className="flex items-center justify-center gap-2 mb-1.5">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-300"></div>
                            <span className="w-1.5 h-1.5 rotate-45 bg-amber-300 shadow-[0_0_6px_#F59E0B]"></span>
                            <span className="font-komutt text-xs sm:text-[13px] text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              សិរីសួស្តីអាពាហ៍ពិពាហ៍
                            </span>
                            <span className="w-1.5 h-1.5 rotate-45 bg-amber-300 shadow-[0_0_6px_#F59E0B]"></span>
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-300"></div>
                          </div>

                          {/* Groom Name in Kh Ang Komutt B with Radiant Champagne Gold Foil Gradient */}
                          <div className="font-komutt text-2xl sm:text-[26px] leading-relaxed tracking-wide font-normal bg-gradient-to-b from-[#FFFDF0] via-[#FDE68A] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:scale-105 transition-all duration-300 truncate">
                            {cardGroom}
                          </div>

                          {/* Central Modern Luxury Geometric Jewel Ampersand */}
                          <div className="flex items-center justify-center gap-2.5 my-1.5">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-black/50 border border-amber-300/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                              <span className="font-serifTrad italic text-[11px] font-bold text-amber-300">&</span>
                            </div>
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                          </div>

                          {/* Bride Name in Kh Ang Komutt B with Radiant Champagne Gold Foil Gradient */}
                          <div className="font-komutt text-2xl sm:text-[26px] leading-relaxed tracking-wide font-normal bg-gradient-to-b from-[#FFFDF0] via-[#FDE68A] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:scale-105 transition-all duration-300 truncate">
                            {cardBride}
                          </div>

                          {/* Bottom Modern Minimalist Luxury Accent */}
                          <div className="flex items-center justify-center gap-1.5 mt-2 opacity-90 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                            <div className="w-1.5 h-1.5 rotate-45 bg-amber-300"></div>
                            <div className="w-8 h-[1px] bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300"></div>
                            <div className="w-2 h-2 rotate-45 border border-amber-300 bg-amber-400 shadow-[0_0_6px_#F59E0B]"></div>
                            <div className="w-8 h-[1px] bg-gradient-to-l from-amber-300 via-amber-100 to-amber-300"></div>
                            <div className="w-1.5 h-1.5 rotate-45 bg-amber-300"></div>
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'angkor-heritage' ? (
                        /* Angkorian Grandeur Heritage Direct-on-Photo Style (KH PhalLuch 002 Font by Yeun PhalLuch) */
                        <div className="text-center w-full relative z-20 my-auto px-2">
                          {/* Top Header Motif & Title in KH PhalLuch 002 */}
                          <div className="flex items-center justify-center gap-2 mb-1.5">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-300"></div>
                            <span className="w-2 h-2 rotate-45 border border-amber-300 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                            <span className="font-phalluch text-sm sm:text-base text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              សិរីសួស្តីអាពាហ៍ពិពាហ៍
                            </span>
                            <span className="w-2 h-2 rotate-45 border border-amber-300 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-300"></div>
                          </div>

                          {/* Groom Name in KH PhalLuch 002 Font */}
                          <div className="font-phalluch text-2xl sm:text-[28px] leading-relaxed tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardGroom}
                          </div>

                          {/* Central Royal Angkorian Lotus & Ampersand Motif */}
                          <div className="flex items-center justify-center gap-3 my-1">
                            <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-950/80 border border-amber-300/80 shadow-[0_0_8px_rgba(245,158,11,0.7)]">
                              <span className="font-serifTrad italic text-xs font-bold text-amber-300">&</span>
                            </div>
                            <div className="h-[1px] w-14 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                          </div>

                          {/* Bride Name in KH PhalLuch 002 Font */}
                          <div className="font-phalluch text-2xl sm:text-[28px] leading-relaxed tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardBride}
                          </div>

                          {/* Bottom Sacred Angkorian Lotus Floret */}
                          <div className="flex items-center justify-center gap-1.5 mt-2 opacity-95 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                            <div className="w-8 h-[1px] bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300"></div>
                            <div className="w-2.5 h-2.5 rotate-45 border border-amber-200 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.85)]"></div>
                            <div className="w-8 h-[1px] bg-gradient-to-l from-amber-300 via-amber-100 to-amber-300"></div>
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'angkor-ancient-royalty' ? (
                        /* Authentic Ancient Angkorian Heritage Style in Card Grid (Kh Ang Kouteok Font) */
                        <div className="text-center w-full relative z-20 my-auto px-2 flex flex-col justify-center items-center">
                          {/* Title: សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍ (Kh Ang Kouteok Font) */}
                          <div className="mb-2">
                            <span className="font-kouteok text-xs sm:text-[13px] text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍
                            </span>
                          </div>

                          {/* Groom Name in Kh Ang Kouteok Font */}
                          <div className="mb-0.5">
                            <div className="font-kouteok text-xl sm:text-2xl text-amber-200 leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                              {cardGroom}
                            </div>
                          </div>

                          {/* Central Sacred Lotus & Ampersand */}
                          <div className="flex items-center justify-center gap-2.5 my-1">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-amber-950/80 border border-amber-300/80 shadow-[0_0_8px_rgba(245,158,11,0.7)]">
                              <span className="font-serif italic text-[11px] font-bold text-amber-300">&</span>
                            </div>
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                          </div>

                          {/* Bride Name in Kh Ang Kouteok Font */}
                          <div>
                            <div className="font-kouteok text-xl sm:text-2xl text-amber-200 leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                              {cardBride}
                            </div>
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'crimson-classic' ? (
                        /* Pure Traditional Khmer Crimson Style with Kh Ang Komutt A Font */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-3 flex flex-col justify-center items-center">
                          {/* 1. Groom Name */}
                          <div className="font-komutt-a text-2xl sm:text-[28px] text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate mb-1">
                            {cardGroom}
                          </div>

                          {/* 2. និង */}
                          <div className="flex items-center justify-center gap-3 my-1">
                            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                            <span className="font-komutt-a text-sm sm:text-base text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                              និង
                            </span>
                            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                          </div>

                          {/* 3. Bride Name */}
                          <div className="font-komutt-a text-2xl sm:text-[28px] text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle?.startsWith('traditional-') ? (
                        /* Traditional Khmer Styles with Distinct Historic Badges */
                        <div className="text-center w-full relative z-20 my-auto px-3 py-2 flex flex-col justify-center items-center">
                          {/* Distinct Modern-Historical Badge Component */}
                          <div className="mb-2">
                            <TraditionalBadgeComponent
                              templateId={tpl.id || tpl.cardStyle}
                              title="សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍"
                              size="sm"
                            />
                          </div>

                          {/* Groom Name */}
                          <div className={`${(tpl.id === 'traditional-royal-lacquer' || tpl.cardStyle === 'traditional-royal-lacquer' || tpl.cardStyle === 'traditional-lacquer-gold') ? 'font-momo' : (tpl.id === 'traditional-crimson-angkoreach' || tpl.cardStyle === 'traditional-crimson-angkoreach') ? 'font-kouteok' : 'font-moul'} text-base sm:text-lg text-[#FFF2B2] bg-gradient-to-r from-[#FFFDE8] via-[#FCE692] to-[#E5BE53] bg-clip-text text-transparent leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:brightness-125 transition-all truncate`}>
                            {cardGroom}
                          </div>

                          {/* Central Khmer Motif */}
                          <div className="flex items-center justify-center gap-2 my-1">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                            <span className={`text-[11px] font-semibold text-amber-300 ${(tpl.id === 'traditional-royal-lacquer' || tpl.cardStyle === 'traditional-royal-lacquer' || tpl.cardStyle === 'traditional-lacquer-gold') ? 'font-momo' : (tpl.id === 'traditional-crimson-angkoreach' || tpl.cardStyle === 'traditional-crimson-angkoreach') ? 'font-kouteok' : 'font-moul'} tracking-wider drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]`}>និង</span>
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                          </div>

                          {/* Bride Name */}
                          <div className={`${(tpl.id === 'traditional-royal-lacquer' || tpl.cardStyle === 'traditional-royal-lacquer' || tpl.cardStyle === 'traditional-lacquer-gold') ? 'font-momo' : (tpl.id === 'traditional-crimson-angkoreach' || tpl.cardStyle === 'traditional-crimson-angkoreach') ? 'font-kouteok' : 'font-moul'} text-base sm:text-lg text-[#FFF2B2] bg-gradient-to-r from-[#FFFDE8] via-[#FCE692] to-[#E5BE53] bg-clip-text text-transparent leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:brightness-125 transition-all truncate`}>
                            {cardBride}
                          </div>
                        </div>
                      ) : (
                        /* Classic Direct-on-Photo Style for Royal Gold in Kh Ang Komutt A Font */
                        <div className="text-center w-full relative z-20 my-auto px-2">
                          <div className="flex items-center justify-center gap-2 mb-1.5">
                            <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-300"></div>
                            <span className="w-1.5 h-1.5 rotate-45 bg-amber-300 shadow-[0_0_6px_#D4AF37]"></span>
                            <span className="font-komutt-a text-xs sm:text-[13px] text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍
                            </span>
                            <span className="w-1.5 h-1.5 rotate-45 bg-amber-300 shadow-[0_0_6px_#D4AF37]"></span>
                            <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-300"></div>
                          </div>
                          <div className="font-komutt-a text-2xl sm:text-[28px] leading-relaxed tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardGroom}
                          </div>
                          <div className="flex items-center justify-center gap-3 my-1">
                            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></span>
                            <span className="font-komutt-a text-xs sm:text-sm text-amber-300 font-bold drop-shadow">និង</span>
                            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></span>
                          </div>
                          <div className="font-komutt-a text-2xl sm:text-[28px] leading-relaxed tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Template Information & Action (Reduced height & sleek compact layout) */}
                    <div className="p-3.5 sm:px-4.5 sm:py-3.5 flex flex-col justify-between bg-white rounded-b-[30px]">
                      <div>
                        {/* Template Title in its own brand color & authentic font */}
                        <h3
                          className={`${tpl.font || 'font-moul'} text-[13px] sm:text-sm mb-1.5 tracking-wide ${tpl.cardStyle === 'angkor-ancient-royalty' || tpl.cardStyle?.startsWith('traditional-') ? 'text-amber-900' : ''}`}
                          style={{ color: tpl.titleColor || (tpl.themeColor === 'gold' ? '#B69225' : tpl.borderColor) }}
                        >
                          {tpl.name}
                        </h3>

                        {/* Date Bar (Directly below template name) */}
                        <div className="w-full text-xs sm:text-[13px] pb-1.5 mb-2 border-b border-stone-100 flex items-center">
                          <span className={`truncate font-medium ${tpl.cardStyle === 'angkor-ancient-royalty' || tpl.cardStyle?.startsWith('traditional-') ? 'font-suwannaphum font-semibold text-amber-900' : 'text-stone-700'}`}>
                            {cardDate}
                          </span>
                        </div>

                        <p className={`text-xs sm:text-[12.5px] leading-relaxed mb-2.5 line-clamp-2 ${tpl.cardStyle === 'angkor-ancient-royalty' || tpl.cardStyle?.startsWith('traditional-') ? 'font-suwannaphum text-stone-700' : 'text-stone-600'}`}>
                          {tpl.description}
                        </p>
                      </div>

                      {/* Action Buttons: Guest Mode has only 'មើលគំរូ', no 'ជ្រើសរើស' */}
                      {isGuest ? (
                        <div className="pt-2 border-t border-stone-100">
                          <button
                            type="button"
                            onClick={() => openPreview(tpl)}
                            className="w-full btn-secondary !rounded-full !py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer font-bold hover:bg-stone-100 active:scale-95 transition-all"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-stone-600" />
                            <span>មើលគំរូ</span>
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                          <button
                            onClick={() => openPreview(tpl)}
                            className="btn-secondary !rounded-full !py-1.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer font-bold hover:bg-stone-100 active:scale-95 transition-all"
                          >
                            <Maximize2 className="w-3.5 h-3.5 text-stone-600" />
                            <span>មើលគំរូផ្ទាល់</span>
                          </button>
                          <button
                            onClick={() => handleSelectTemplate(tpl)}
                            style={{
                              backgroundColor: tpl.titleColor || (tpl.themeColor === 'gold' ? '#B69225' : tpl.borderColor),
                            }}
                            className="!rounded-full !py-1.5 text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all duration-200"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-white" />
                            <span>ជ្រើសរើស</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Live Full Preview Modal - Direct Live Template View */}
      {previewTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-0 bg-black/85 backdrop-blur-md animate-fade overflow-hidden"
          onClick={() => setPreviewTemplate(null)}
        >
          {/* Modern Khmer Flowers & Hearts Floating Smoothly Outside the Modal Frame */}
          <KhmerFloatingBackground count={16} />

          {/* Floating Close Button */}
          <button
            onClick={() => setPreviewTemplate(null)}
            className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-center cursor-pointer transition-all active:scale-95 group"
            title="បិទផ្ទាំង"
          >
            <X className="w-5 h-5 text-stone-200 group-hover:text-white" />
          </button>

                    {/* Modal Container: Wraps entire height of the page */}
          <div
            className="relative w-full max-w-2xl h-screen h-[100dvh] shadow-2xl overflow-hidden bg-stone-950 border-x border-stone-800/80 flex flex-col animate-scaleUp z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Direct Live Template View Component (Zero-latency, No Iframe, No 404) */}
            <TemplateDetailPage
              templateId={previewTemplate.id}
              isModal={true}
              onClose={() => setPreviewTemplate(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
