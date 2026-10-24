import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { CEREMONY_DATA, TEMPLATE_CATEGORIES } from '../data/templates';
import { FlyingHeartsAndFlowers } from '../components/FlyingHeartsAndFlowers';
import { KhmerFloatingBackground } from '../components/KhmerBackgroundFlowers';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle,
  X,
  Calendar,
  MapPin,
  Clock,
  Heart,
  Flower2
} from 'lucide-react';

export function TemplatesPage({ ceremonyType = 'wedding' }) {
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

  const scrollCategories = (direction) => {
    if (categoryScrollRef.current) {
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -240 : 240,
        behavior: 'smooth'
      });
    }
  };

  const handleCategorySelect = (catId, e) => {
    setActiveCategory(catId);
    if (e?.currentTarget?.scrollIntoView) {
      e.currentTarget.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  };

  // Auto-scroll the remembered active category tab into view on mount or tab change
  useEffect(() => {
    if (categoryScrollRef.current && activeCategory) {
      const activeBtn = categoryScrollRef.current.querySelector(`[data-category-id="${activeCategory}"]`);
      if (activeBtn) {
        setTimeout(() => {
          activeBtn.scrollIntoView({
            behavior: 'smooth',
            inline: 'center',
            block: 'nearest'
          });
        }, 100);
      }
    }
  }, [activeCategory]);

  // Synchronize ceremony selection with route & stop audio when browsing templates
  useEffect(() => {
    selectCeremony(ceremonyType);
    stopAudio?.();
  }, [ceremonyType]);

  // Play audio from beginning when modal preview is opened or changed, stop when closed
  useEffect(() => {
    if (previewTemplate) {
      restartAndPlayAudio?.();
    } else {
      stopAudio?.();
    }
  }, [previewTemplate]);

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
    navigate({ to: '/invitation' });
  };

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
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-theabGold/10 blur-3xl pointer-events-none animate-ambient-glow"></div>
      <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-rose-500/5 blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '3s' }}></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none animate-ambient-glow" style={{ animationDelay: '5s' }}></div>

      {/* Decorative Traditional Corner Watermark Motifs */}
      <div className="absolute -top-10 -left-10 w-64 h-64 text-theabGold/15 pointer-events-none select-none animate-float-slow">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full transform -rotate-12">
          <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          <path d="M100 20 C120 70 180 100 180 100 C180 100 120 130 100 180 C80 130 20 100 20 100 C20 100 80 70 100 20 Z" fill="currentColor" opacity="0.35" />
          <circle cx="100" cy="100" r="25" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="absolute -bottom-16 -right-16 w-72 h-72 text-theabGold/15 pointer-events-none select-none animate-float-slow" style={{ animationDelay: '3.5s' }}>
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
              <ArrowLeft className="w-4 h-4 text-theabCrimson" />
              <span>ត្រឡប់ក្រោយ</span>
            </button>
          </div>

          {/* Title Row (Moved below back button to prevent truncation and height clipping) */}
          <h1 className="font-moul text-lg sm:text-2xl md:text-3xl text-theabCrimson tracking-wide text-center leading-normal mb-2 px-2">
            {ceremonyInfo.title}
          </h1>

          {/* Luxury Gold Divider Strip */}
          <div className="khmer-gold-strip max-w-xs mx-auto mb-3 opacity-70"></div>

          {/* Category Filter Horizontal Scroll Bar with Left/Right Navigation */}
          <div className="relative max-w-5xl mx-auto flex items-center gap-1.5 sm:gap-2 px-1">
            {/* Scroll Left Button (Visible on sm+ screens) */}
            <button
              type="button"
              onClick={() => scrollCategories('left')}
              aria-label="Scroll left"
              className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white border border-stone-200/90 text-stone-600 hover:text-theabCrimson shadow-xs transition cursor-pointer shrink-0 hidden sm:flex items-center justify-center hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Horizontal Scroll Track */}
            <div
              ref={categoryScrollRef}
              className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 px-1 scroll-smooth no-scrollbar flex-nowrap w-full"
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
                    onClick={(e) => handleCategorySelect(cat.id, e)}
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full font-bold whitespace-nowrap text-xs transition-all duration-200 shrink-0 cursor-pointer select-none ${isActive
                        ? 'bg-theabCrimson text-white shadow-md shadow-rose-950/25 ring-2 ring-rose-300/60 scale-[1.02]'
                        : 'bg-white/85 text-stone-700 hover:bg-white hover:text-theabCrimson border border-stone-200/90 shadow-2xs hover:shadow-xs'
                      }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Scroll Right Button (Visible on sm+ screens) */}
            <button
              type="button"
              onClick={() => scrollCategories('right')}
              aria-label="Scroll right"
              className="p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white border border-stone-200/90 text-stone-600 hover:text-theabCrimson shadow-xs transition cursor-pointer shrink-0 hidden sm:flex items-center justify-center hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Scrollable Cards Container (Cards scroll with comfortable top padding) */}
      <main className="flex-1 overflow-y-auto relative z-10 px-3 sm:px-6 pt-4 sm:pt-6 pb-16 scroll-smooth [mask-image:linear-gradient(to_bottom,transparent_0px,black_24px,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0px,black_24px,black_100%)]">
        <div className="container-max">
          {/* Templates Gallery Grid (Modern Sleek Cards) */}
          {filteredTemplates.length === 0 ? (
            <div className="py-16 text-center max-w-md mx-auto bg-white/80 backdrop-blur-xs rounded-3xl border border-stone-200/80 p-8 shadow-sm">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-50 border border-rose-200/80 flex items-center justify-center text-theabCrimson shadow-xs">
                <Flower2 className="w-8 h-8 opacity-80" />
              </div>
              <h3 className="font-moul text-base text-stone-800 mb-2">
                កំពុងរៀបចំគំរូរចនាថ្មីៗ
              </h3>
              <p className="text-xs text-stone-500 mb-5 leading-relaxed font-suwannaphum">
                គំរូធៀបក្នុងប្រភេទនេះកំពុងស្ថិតក្នុងការច្នៃប្រឌិត និងដាក់ឱ្យប្រើប្រាស់ឆាប់ៗនេះ។ លោកអ្នកអាចជ្រើសរើសប្រភេទផ្សេងទៀតបាន។
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="px-5 py-2 rounded-full bg-theabCrimson text-white text-xs font-bold shadow-sm hover:brightness-110 active:scale-95 cursor-pointer transition-all"
              >
                មើលគំរូទាំងអស់
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {filteredTemplates.map((tpl, idx) => {
                const cardGroom = tpl.demoGroom || invitationData.groomName || ceremonyInfo.defaultGroom;
                const cardBride = tpl.demoBride || invitationData.brideName || ceremonyInfo.defaultBride;
                const cardDate = tpl.demoDate || invitationData.ceremonyDate || ceremonyInfo.defaultDate;

                return (
                  <div
                    key={tpl.id}
                    className="animate-card-enter group bg-white rounded-[32px] overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border-2 flex flex-col min-h-[390px] sm:min-h-[410px]"
                    style={{ borderColor: tpl.borderColor, animationDelay: `${idx * 65}ms` }}
                  >
                    {/* Edge-to-Edge Couple & Photo Body (Full Bleed from Top of Card) */}
                    <div className={`${tpl.previewBg} p-4 sm:p-5 text-center border-b border-stone-100 flex-1 flex flex-col items-center justify-center relative overflow-hidden rounded-t-[30px] min-h-[200px] sm:min-h-[220px]`}>
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
                      <FlyingHeartsAndFlowers count={6} />

                      {/* Couple Names - Modern Khmer Typographic Text Directly Floating on Photo */}
                      {tpl.cardStyle === 'floral-romdoul-moonlight' ? (
                        /* Romdoul Moonlight Romance Style with font-suwannaphum */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-400/40 text-amber-200 mb-2">
                            <span className="text-[10px]">🌙</span>
                            <span className="font-suwannaphum text-[11px] text-amber-200 tracking-wider">រាត្រីផ្ការំដួលពន្លឺចន្ទ</span>
                          </div>

                          <div className="font-suwannaphum text-lg sm:text-xl text-white font-bold leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardGroom}
                          </div>

                          <div className="flex items-center justify-center gap-2 my-1">
                            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-amber-300 to-amber-200"></span>
                            <span className="font-serifTrad italic text-xs font-bold text-amber-300">~ & ~</span>
                            <span className="h-[1px] w-8 bg-gradient-to-l from-transparent via-amber-300 to-amber-200"></span>
                          </div>

                          <div className="font-suwannaphum text-lg sm:text-xl text-white font-bold leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'floral-golden-orchid' ? (
                        /* Golden Orchid & Glasshouse Luxury with font-koulen */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-2 flex flex-col justify-center items-center">
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-md border border-amber-300 shadow-sm mb-2">
                            <span className="text-amber-600 text-[10px]">❀</span>
                            <span className="font-koulen text-[11px] text-amber-900 tracking-wider">ផ្កាអ័រគីដេវិមានកែវ</span>
                          </div>

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
                          {/* Magazine issue tag */}
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white mb-2">
                            <span className="font-serifTrad text-[9px] uppercase tracking-[0.2em] text-amber-200">VOGUE WEDDING</span>
                          </div>

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
                          {/* Auspicious floral badge */}
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-rose-300 shadow-sm mb-2">
                            <span className="text-rose-500 text-[10px]">❀</span>
                            <span className="font-moulpali text-[11px] text-[#C84B5B] tracking-wider">
                              មន្តស្នេហ៍ផ្កាម្លិះ និងកុលាបមង្គល
                            </span>
                            <span className="text-rose-500 text-[10px]">❀</span>
                          </div>

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
                          {/* Arched botanical badge */}
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-[#4A6753]/40 shadow-sm mb-2">
                            <span className="text-[#D4AF37] text-[10px]">❀</span>
                            <span className="font-preahvihear text-[11px] text-[#2D3A30] tracking-wider font-semibold">
                              សួនផ្កាអភិជនបូតានិក
                            </span>
                            <span className="text-[#D4AF37] text-[10px]">❀</span>
                          </div>

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
                              សិរីសួស្តីអាពាហ៍ពិពាហ៍
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
                      ) : tpl.cardStyle === 'modern-luxury' ? (
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
                        /* Authentic Ancient Angkorian Heritage Style in Card Grid */
                        <div className="text-center w-full relative z-20 my-auto px-2 flex flex-col justify-center items-center">
                          {/* Styled Container ONLY for សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍ */}
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-amber-400/80 shadow-[0_2px_15px_rgba(0,0,0,0.7)] relative mb-2">
                            <span className="text-amber-300 text-[10px]">✤</span>
                            <span className="font-moul text-[11px] sm:text-xs text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍
                            </span>
                            <span className="text-amber-300 text-[10px]">✤</span>
                          </div>

                          {/* Groom Name */}
                          <div className="mb-0.5">
                            <div className="font-moul text-base sm:text-lg text-amber-200 leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
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

                          {/* Bride Name */}
                          <div>
                            <div className="font-moul text-base sm:text-lg text-amber-200 leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate">
                              {cardBride}
                            </div>
                          </div>
                        </div>
                      ) : tpl.cardStyle === 'crimson-classic' ? (
                        /* Pure Traditional Khmer Crimson Style with Kh Ang Komutt A Font */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-3 flex flex-col justify-center items-center">
                          {/* Traditional Khmer Ornate Inner Border Frame (ស៊ុមឌិនមាសក្បាច់បុរាណ) */}
                          <div className="absolute inset-1 sm:inset-1.5 rounded-[22px] border border-amber-400/40 pointer-events-none -z-10 shadow-[inset_0_0_12px_rgba(136,19,55,0.4)]">
                            <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300"></div>
                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300"></div>
                            <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300"></div>
                            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300"></div>
                          </div>

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
                        /* Traditional Khmer Styles (Test 2 to 8) */
                        <div className="text-center w-full relative z-20 my-auto px-4 py-3 flex flex-col justify-center items-center">
                          {/* Top Header Motif & Title in Moul */}
                          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-amber-400/80 shadow-[0_2px_15px_rgba(0,0,0,0.7)] relative mb-2">
                            <span className="text-amber-300 text-[10px]">❖</span>
                            <span className="font-moul text-[11px] sm:text-xs text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                              សិរីមង្គលអាពាហ៍ពិពាហ៍
                            </span>
                            <span className="text-amber-300 text-[10px]">❖</span>
                          </div>

                          {/* Groom Name */}
                          <div className="font-moul text-lg sm:text-xl text-[#FFF2B2] bg-gradient-to-r from-[#FFFDE8] via-[#FCE692] to-[#E5BE53] bg-clip-text text-transparent leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:brightness-125 transition-all truncate">
                            {cardGroom}
                          </div>

                          {/* Central Khmer Motif */}
                          <div className="flex items-center justify-center gap-2.5 my-1.5">
                            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                            <span className="text-xs font-semibold text-amber-300 font-moul tracking-widest drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">✦ និង ✦</span>
                            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                          </div>

                          {/* Bride Name */}
                          <div className="font-moul text-lg sm:text-xl text-[#FFF2B2] bg-gradient-to-r from-[#FFFDE8] via-[#FCE692] to-[#E5BE53] bg-clip-text text-transparent leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:brightness-125 transition-all truncate">
                            {cardBride}
                          </div>
                        </div>
                      ) : (
                        /* Classic Direct-on-Photo Style for Royal Gold in Kh Ang Komutt A Font */
                        <div className="space-y-1.5 my-auto w-full relative z-20">
                          <div className={`font-komutt-a text-2xl sm:text-[28px] leading-relaxed tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate`}>
                            {cardGroom}
                          </div>
                          <div className="flex items-center justify-center gap-2 my-1">
                            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></span>
                            <span className="font-serifTrad italic text-xs font-bold text-amber-300">&</span>
                            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></span>
                          </div>
                          <div className={`font-komutt-a text-2xl sm:text-[28px] leading-relaxed tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors truncate`}>
                            {cardBride}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Template Information & Action (Reduced height & sleek compact layout) */}
                    <div className="p-3.5 sm:px-4.5 sm:py-3.5 flex flex-col justify-between bg-white rounded-b-[30px]">
                      <div>
                        {/* Template Title in its own brand color */}
                        <h3
                          className={`font-moul text-[13px] sm:text-sm mb-1.5 tracking-wide ${tpl.cardStyle === 'angkor-ancient-royalty' || tpl.cardStyle?.startsWith('traditional-') ? 'text-amber-900' : ''}`}
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

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-100">
                        <button
                          onClick={() => navigate({ to: `/${tpl.id}/preview` })}
                          className="btn-secondary !rounded-full !py-1.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer font-bold hover:bg-stone-100 active:scale-95 transition-all"
                        >
                          <Maximize2 className="w-3.5 h-3.5 text-stone-600" />
                          <span>មើលគំរូផ្ទាល់</span>
                        </button>
                        <button
                          onClick={() => {
                            setSelectedTemplate(tpl);
                            setCurrentTheme(tpl.themeColor || 'crimson');
                            navigate({ to: `/${tpl.id}/preview` });
                          }}
                          style={{
                            backgroundColor: tpl.titleColor || (tpl.themeColor === 'gold' ? '#B69225' : tpl.borderColor),
                          }}
                          className="!rounded-full !py-1.5 text-xs text-white flex items-center justify-center gap-1.5 cursor-pointer font-bold shadow-sm hover:brightness-110 active:scale-95 transition-all duration-200"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-white" />
                          <span>ជ្រើសរើស</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Live Full Preview Modal */}
      {previewTemplate && (() => {
        const modalGroom = previewTemplate.demoGroom || invitationData.groomName || ceremonyInfo.defaultGroom;
        const modalBride = previewTemplate.demoBride || invitationData.brideName || ceremonyInfo.defaultBride;
        const modalDate = previewTemplate.demoDate || invitationData.ceremonyDate || ceremonyInfo.defaultDate;

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-fade overflow-hidden"
            onClick={() => setPreviewTemplate(null)}
          >
            {/* Modern Khmer Flowers & Hearts Floating Smoothly Outside the Modal */}
            <KhmerFloatingBackground count={20} />

            <div
              className="bg-white rounded-3xl max-w-md w-full h-[94vh] max-h-[96vh] overflow-y-auto shadow-2xl border-2 border-amber-300 relative text-center p-5 sm:p-6 animate-scaleUp z-10 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 p-1 rounded-full bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-full mx-auto bg-amber-100 text-amber-800 flex items-center justify-center font-moul text-xl mb-2">
                {ceremonyInfo.monogram}
              </div>
              <h2 className="font-moul text-lg text-theabCrimson mb-6">
                {previewTemplate.name}
              </h2>

              {/* Simulated Live Theab Preview Card */}
              <div
                className={`rounded-2xl p-6 text-center border-2 mb-6 ${previewTemplate.previewBg} relative overflow-hidden`}
                style={{ borderColor: previewTemplate.borderColor }}
              >
                {/* Prewedding Photo Background & Elegant Vignette if template has bgImage */}
                {previewTemplate.bgImage && (
                  <>
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url(${previewTemplate.bgImage})` }}
                    />
                    <div className={`absolute inset-0 ${previewTemplate.cardStyle === 'crimson-classic'
                        ? 'bg-gradient-to-t from-rose-950/90 via-rose-950/45 to-black/30'
                        : 'bg-gradient-to-t from-black/80 via-black/40 to-black/25'
                      }`} />
                  </>
                )}

                {/* Flying Hearts & Flying Flowers Animation Layer for Modal Card Container */}
                <FlyingHeartsAndFlowers count={8} />

                {/* Only show banner box if template does NOT have full-bleed bgImage */}
                {!previewTemplate.bgImage && (
                  <div
                    className={`${previewTemplate.primaryGradient} text-white py-3 px-4 rounded-xl shadow-md mb-4 relative z-20`}
                  >
                    <div className="text-xs uppercase tracking-widest text-amber-200 font-bold mb-1">
                      Digital Khmer Theab
                    </div>
                    <div className="font-moul text-base text-amber-100">
                      {ceremonyInfo.title}
                    </div>
                  </div>
                )}

                {previewTemplate.cardStyle === 'floral-romdoul-moonlight' ? (
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-amber-400/40 text-amber-200 mb-3">
                      <span className="text-xs">🌙</span>
                      <span className="font-suwannaphum text-xs text-amber-200 tracking-wider">
                        រាត្រីផ្ការំដួលពន្លឺចន្ទ
                      </span>
                      <span className="text-xs">✨</span>
                    </div>

                    <div className="font-suwannaphum text-2xl sm:text-3xl font-bold text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                      {modalGroom}
                    </div>

                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-amber-200"></div>
                      <span className="text-xs font-serifTrad italic text-amber-300 font-bold">~ & ~</span>
                      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-amber-200"></div>
                    </div>

                    <div className="font-suwannaphum text-2xl sm:text-3xl font-bold text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                      {modalBride}
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'floral-golden-orchid' ? (
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-amber-300 shadow-sm mb-3">
                      <span className="text-amber-600 text-xs">❀</span>
                      <span className="font-koulen text-xs text-amber-900 tracking-wider">
                        ផ្កាអ័រគីដេវិមានកែវ
                      </span>
                      <span className="text-amber-600 text-xs">❀</span>
                    </div>

                    <div className="font-koulen text-2xl sm:text-3xl text-amber-100 leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-300 transition-colors truncate">
                      {modalGroom}
                    </div>

                    <div className="flex items-center justify-center gap-3 my-1">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-white"></div>
                      <span className="text-xs font-serifTrad font-bold text-amber-300">&</span>
                      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-white"></div>
                    </div>

                    <div className="font-koulen text-2xl sm:text-3xl text-amber-100 leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-300 transition-colors truncate">
                      {modalBride}
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'floral-editorial-magazine' ? (
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white mb-3">
                      <span className="font-serifTrad text-[10px] uppercase tracking-[0.2em] text-amber-200">EDITORIAL WEDDING JOURNAL</span>
                    </div>

                    <div className="font-phalluch text-2xl sm:text-3xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                      {modalGroom}
                    </div>

                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-200 to-white"></div>
                      <span className="text-sm font-serifTrad italic text-amber-200 font-bold">&</span>
                      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-200 to-white"></div>
                    </div>

                    <div className="font-phalluch text-2xl sm:text-3xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                      {modalBride}
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'floral-khmer-blossom' ? (
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-rose-300 shadow-sm mb-3">
                      <span className="text-rose-500 text-xs">❀</span>
                      <span className="font-moulpali text-xs text-[#C84B5B] tracking-wider">
                        មន្តស្នេហ៍ផ្កាម្លិះ និងកុលាបមង្គល
                      </span>
                      <span className="text-rose-500 text-xs">❀</span>
                    </div>

                    <div className="font-moulpali text-2xl sm:text-3xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-rose-200 transition-colors truncate">
                      {modalGroom}
                    </div>

                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-rose-300 to-rose-400"></div>
                      <span className="text-xs font-moulpali text-amber-300">✦ ជួបប្រសព្វនឹង ✦</span>
                      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-rose-300 to-rose-400"></div>
                    </div>

                    <div className="font-moulpali text-2xl sm:text-3xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-rose-200 transition-colors truncate">
                      {modalBride}
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'floral-glasshouse' ? (
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#4A6753]/40 shadow-sm mb-3">
                      <span className="text-[#D4AF37] text-xs">❀</span>
                      <span className="font-preahvihear text-xs text-[#2D3A30] tracking-wider font-semibold">
                        មហាសួនផ្កាកុលាបមនោរម្យ • BOTANICAL GLASSHOUSE
                      </span>
                      <span className="text-[#D4AF37] text-xs">❀</span>
                    </div>

                    <div className="font-preahvihear text-2xl sm:text-3xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                      {modalGroom}
                    </div>

                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-amber-400"></div>
                      <span className="text-sm font-serifTrad italic text-amber-200 font-bold">&</span>
                      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-amber-400"></div>
                    </div>

                    <div className="font-preahvihear text-2xl sm:text-3xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-200 transition-colors truncate">
                      {modalBride}
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'romantic-frosted' ? (
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <svg viewBox="0 0 30 10" fill="currentColor" className="w-8 h-2.5 text-amber-300 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)]">
                        <path d="M0 5 C10 0 15 10 30 5 C20 10 15 0 0 5 Z" opacity="0.85" />
                        <circle cx="15" cy="5" r="1.8" fill="#FBBF24" />
                      </svg>
                      <span className="font-kouteok text-xs sm:text-[13px] text-amber-100 tracking-wider drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)]">
                        សិរីសួស្តីអាពាហ៍ពិពាហ៍
                      </span>
                      <svg viewBox="0 0 30 10" fill="currentColor" className="w-8 h-2.5 text-amber-300 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.85)] transform scale-x-[-1]">
                        <path d="M0 5 C10 0 15 10 30 5 C20 10 15 0 0 5 Z" opacity="0.85" />
                        <circle cx="15" cy="5" r="1.8" fill="#FBBF24" />
                      </svg>
                    </div>
                    <div className="font-kouteok text-2xl text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-amber-100 transition-colors">{modalGroom}</div>
                    <div className="flex items-center justify-center gap-2.5 my-1.5">
                      <div className="h-[1px] w-10 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                      <Heart className="w-4 h-4 fill-rose-500 text-rose-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] shrink-0" />
                      <div className="h-[1px] w-10 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                    </div>
                    <div className="font-kouteok text-2xl text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] hover:text-amber-100 transition-colors">{modalBride}</div>
                    <div className="flex items-center justify-center gap-1 mt-1.5 opacity-80 drop-shadow">
                      <div className="w-1.5 h-1.5 rotate-45 bg-amber-300"></div>
                      <div className="w-10 h-[1px] bg-amber-300"></div>
                      <div className="w-2 h-2 rotate-45 bg-rose-400"></div>
                      <div className="w-10 h-[1px] bg-amber-300"></div>
                      <div className="w-1.5 h-1.5 rotate-45 bg-amber-300"></div>
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'emerald-jade' ? (
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    {/* Top Header Motif & Title */}
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-emerald-400"></div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]"></span>
                      <span className="font-moulpali text-xs sm:text-sm tracking-wide text-emerald-200 drop-shadow-[0_2px_4px_rgba(2,44,34,0.95)]">
                        សិរីសួស្តីអាពាហ៍ពិពាហ៍
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34D399]"></span>
                      <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-emerald-400"></div>
                    </div>

                    {/* Groom Name in Moulpali Font */}
                    <div className="font-moulpali text-lg sm:text-xl text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(2,44,34,0.95)] hover:text-emerald-100 transition-colors">
                      {modalGroom}
                    </div>

                    {/* Central Emerald & Gold Royal Ampersand */}
                    <div className="flex items-center justify-center gap-2.5 my-2">
                      <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-emerald-400 to-amber-300 drop-shadow"></div>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950/70 border border-emerald-400/50 shadow-[0_0_8px_rgba(16,185,129,0.6)]">
                        <span className="font-serifTrad italic text-xs font-bold text-amber-300">&</span>
                      </div>
                      <div className="h-[1px] w-14 bg-gradient-to-l from-transparent via-emerald-400 to-amber-300 drop-shadow"></div>
                    </div>

                    {/* Bride Name in Moulpali Font */}
                    <div className="font-moulpali text-lg sm:text-xl text-white leading-relaxed drop-shadow-[0_2px_6px_rgba(2,44,34,0.95)] hover:text-emerald-100 transition-colors">
                      {modalBride}
                    </div>

                    {/* Bottom Emerald-Gold Filigree */}
                    <div className="flex items-center justify-center gap-1.5 mt-2.5 opacity-90 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34D399]"></div>
                      <div className="w-10 h-[1px] bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400"></div>
                      <div className="w-2.5 h-2.5 rotate-45 border border-emerald-300 bg-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                      <div className="w-10 h-[1px] bg-gradient-to-l from-emerald-400 via-amber-300 to-emerald-400"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_4px_#34D399]"></div>
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'modern-luxury' ? (
                  /* Modern Luxury Chic Direct-on-Photo Typographic Style (Kh Ang Komutt B Font, No Container/Background) */
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    {/* Top Header Motif & Title in Kh Ang Komutt B */}
                    <div className="flex items-center justify-center gap-2 mb-1.5">
                      <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-300"></div>
                      <span className="w-1.5 h-1.5 rotate-45 bg-amber-300 shadow-[0_0_6px_#F59E0B]"></span>
                      <span className="font-komutt text-xs sm:text-sm text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                        សិរីសួស្តីអាពាហ៍ពិពាហ៍
                      </span>
                      <span className="w-1.5 h-1.5 rotate-45 bg-amber-300 shadow-[0_0_6px_#F59E0B]"></span>
                      <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-300"></div>
                    </div>

                    {/* Groom Name in Kh Ang Komutt B with Radiant Champagne Gold Foil Gradient */}
                    <div className="font-komutt text-2xl sm:text-3xl leading-relaxed tracking-wide font-normal bg-gradient-to-b from-[#FFFDF0] via-[#FDE68A] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:scale-105 transition-all duration-300">
                      {modalGroom}
                    </div>

                    {/* Central Modern Luxury Geometric Jewel Ampersand */}
                    <div className="flex items-center justify-center gap-2.5 my-2">
                      <div className="h-[1px] w-14 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black/50 border border-amber-300/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]">
                        <span className="font-serifTrad italic text-xs font-bold text-amber-300">&</span>
                      </div>
                      <div className="h-[1px] w-14 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                    </div>

                    {/* Bride Name in Kh Ang Komutt B with Radiant Champagne Gold Foil Gradient */}
                    <div className="font-komutt text-2xl sm:text-3xl leading-relaxed tracking-wide font-normal bg-gradient-to-b from-[#FFFDF0] via-[#FDE68A] to-[#F59E0B] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:scale-105 transition-all duration-300">
                      {modalBride}
                    </div>

                    {/* Bottom Modern Minimalist Luxury Accent */}
                    <div className="flex items-center justify-center gap-1.5 mt-2.5 opacity-90 drop-shadow-[0_1.5px_2px_rgba(0,0,0,0.9)]">
                      <div className="w-1.5 h-1.5 rotate-45 bg-amber-300"></div>
                      <div className="w-10 h-[1px] bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300"></div>
                      <div className="w-2.5 h-2.5 rotate-45 border border-amber-300 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></div>
                      <div className="w-10 h-[1px] bg-gradient-to-l from-amber-300 via-amber-100 to-amber-300"></div>
                      <div className="w-1.5 h-1.5 rotate-45 bg-amber-300"></div>
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'angkor-heritage' ? (
                  /* Angkorian Grandeur Heritage Direct-on-Photo Style (KH PhalLuch 002 Font by Yeun PhalLuch) */
                  <div className="text-center w-full relative z-20 my-4 px-2">
                    {/* Top Header Motif & Title in KH PhalLuch 002 */}
                    <div className="flex items-center justify-center gap-2 mb-1.5">
                      <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-amber-300"></div>
                      <span className="w-2.5 h-2.5 rotate-45 border border-amber-300 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                      <span className="font-phalluch text-base sm:text-lg text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                        សិរីសួស្តីអាពាហ៍ពិពាហ៍
                      </span>
                      <span className="w-2.5 h-2.5 rotate-45 border border-amber-300 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                      <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-amber-300"></div>
                    </div>

                    {/* Groom Name in KH PhalLuch 002 Font */}
                    <div className="font-phalluch text-2xl sm:text-3xl leading-relaxed tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">
                      {modalGroom}
                    </div>

                    {/* Central Royal Angkorian Lotus & Ampersand Motif */}
                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-950/80 border border-amber-300/80 shadow-[0_0_8px_rgba(245,158,11,0.7)]">
                        <span className="font-serifTrad italic text-xs font-bold text-amber-300">&</span>
                      </div>
                      <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                    </div>

                    {/* Bride Name in KH PhalLuch 002 Font */}
                    <div className="font-phalluch text-2xl sm:text-3xl leading-relaxed tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">
                      {modalBride}
                    </div>

                    {/* Bottom Sacred Angkorian Lotus Floret */}
                    <div className="flex items-center justify-center gap-1.5 mt-2.5 opacity-95 drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                      <div className="w-10 h-[1px] bg-gradient-to-r from-amber-300 via-amber-100 to-amber-300"></div>
                      <div className="w-3 h-3 rotate-45 border border-amber-200 bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.85)]"></div>
                      <div className="w-10 h-[1px] bg-gradient-to-l from-amber-300 via-amber-100 to-amber-300"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'angkor-ancient-royalty' ? (
                  /* Authentic Ancient Angkorian Heritage Style with Angkor / Moulpali Font */
                  <div className="text-center w-full relative z-20 my-3 px-2 flex flex-col justify-center items-center">
                    {/* Styled Container ONLY for សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍ */}
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-400/80 shadow-[0_4px_20px_rgba(0,0,0,0.7)] relative mb-2">
                      <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
                      <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
                      <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
                      <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-amber-300 pointer-events-none" />

                      <span className="text-amber-300 text-[10px]">✤</span>
                      <span className="font-moul text-xs sm:text-sm text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                        សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍
                      </span>
                      <span className="text-amber-300 text-[10px]">✤</span>
                    </div>

                    {/* Groom Section - Floating directly on photo with solid royal gold color (no transparency) */}
                    <div className="mb-1">
                      <div className="font-moul text-lg sm:text-xl md:text-2xl text-amber-200 leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">
                        {modalGroom}
                      </div>
                    </div>

                    {/* Center Sacred Khmer Lotus Ampersand */}
                    <div className="flex items-center justify-center gap-3 my-1">
                      <div className="h-[1px] w-10 sm:w-14 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                      <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-950/80 border border-amber-300/80 shadow-[0_0_8px_rgba(245,158,11,0.7)]">
                        <span className="font-serif italic text-xs font-bold text-amber-300">&</span>
                      </div>
                      <div className="h-[1px] w-10 sm:w-14 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                    </div>

                    {/* Bride Section - Floating directly on photo with solid royal gold color (no transparency) */}
                    <div>
                      <div className="font-moul text-lg sm:text-xl md:text-2xl text-amber-200 leading-relaxed tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">
                        {modalBride}
                      </div>
                    </div>

                    {/* Date floating in the modal preview with smooth Moul font */}
                    <div className="mt-2.5 pt-1">
                      <div className="inline-flex items-center justify-center gap-1.5 my-0.5">
                        <span className="text-amber-400 text-[10px] select-none">✦</span>
                        <p className="font-moul text-xs sm:text-sm text-amber-200 tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                          {modalDate}
                        </p>
                        <span className="text-amber-400 text-[10px] select-none">✦</span>
                      </div>
                    </div>
                  </div>
                ) : previewTemplate.cardStyle === 'crimson-classic' ? (
                  /* Pure Traditional Khmer Crimson Style in Modal with Kh Ang Komutt A Font */
                  <div className="text-center w-full relative z-20 my-4 px-4 py-4 flex flex-col justify-center items-center">
                    {/* Traditional Khmer Ornate Inner Border Frame (ស៊ុមឌិនមាសក្បាច់បុរាណ) */}
                    <div className="absolute inset-1.5 sm:inset-2.5 rounded-[22px] border border-amber-400/40 pointer-events-none -z-10 shadow-[inset_0_0_14px_rgba(136,19,55,0.4)]">
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-amber-300"></div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-amber-300"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-amber-300"></div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-amber-300"></div>
                    </div>

                    {/* 1. Groom Name */}
                    <div className="font-komutt-a text-2xl sm:text-3xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors mb-1.5">
                      {modalGroom}
                    </div>

                    {/* 2. និង */}
                    <div className="flex items-center justify-center gap-3.5 my-1.5">
                      <div className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                      <span className="font-komutt-a text-base sm:text-lg text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        និង
                      </span>
                      <div className="h-[1.5px] w-14 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                    </div>

                    {/* 3. Bride Name */}
                    <div className="font-komutt-a text-2xl sm:text-3xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">
                      {modalBride}
                    </div>
                  </div>
                ) : previewTemplate.cardStyle?.startsWith('traditional-') ? (
                  /* Traditional Khmer Styles in Modal */
                  <div className="text-center w-full relative z-20 my-4 px-4 py-3 flex flex-col justify-center items-center">
                    <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-amber-400/90 shadow-[0_2px_20px_rgba(0,0,0,0.8)] relative mb-3">
                      <span className="text-amber-300 text-xs">❖</span>
                      <span className="font-moul text-xs sm:text-sm bg-gradient-to-r from-[#FFFDE8] via-[#FCE692] to-[#E5BE53] bg-clip-text text-transparent tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                        សិរីមង្គលអាពាហ៍ពិពាហ៍
                      </span>
                      <span className="text-amber-300 text-xs">❖</span>
                    </div>

                    <div className="font-moul text-xl sm:text-2xl text-[#FFF2B2] bg-gradient-to-r from-[#FFFDE8] via-[#FCE692] to-[#E5BE53] bg-clip-text text-transparent leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:brightness-125 transition-all truncate">
                      {modalGroom}
                    </div>

                    <div className="flex items-center justify-center gap-3 my-2">
                      <div className="h-[1.5px] w-14 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                      <span className="text-xs font-semibold text-amber-300 font-moul tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">✦ ជួបប្រសព្វនឹង ✦</span>
                      <div className="h-[1.5px] w-14 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
                    </div>

                    <div className="font-moul text-xl sm:text-2xl text-[#FFF2B2] bg-gradient-to-r from-[#FFFDE8] via-[#FCE692] to-[#E5BE53] bg-clip-text text-transparent leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:brightness-125 transition-all truncate">
                      {modalBride}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 my-4 relative z-20">
                    <p className="text-xs text-amber-200">ដោយក្តីគោរព និងស្រឡាញ់</p>
                    <div className="font-komutt-a text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">{modalGroom}</div>
                    <div className="flex items-center justify-center gap-2 my-1">
                      <span className="h-[1px] w-12 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></span>
                      <span className="font-serifTrad italic text-xs font-bold text-amber-300">&</span>
                      <span className="h-[1px] w-12 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></span>
                    </div>
                    <div className="font-komutt-a text-2xl text-white leading-relaxed tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] hover:text-amber-100 transition-colors">{modalBride}</div>
                  </div>
                )}

                <div className={`p-3 sm:p-3.5 rounded-xl border text-xs space-y-2 mt-4 text-left relative z-20 ${previewTemplate.bgImage
                    ? 'bg-black/50 backdrop-blur-md border-amber-400/30 text-stone-100'
                    : 'bg-white/80 border-stone-200 text-stone-700'
                  }`}>
                  {/* Template Description rendered with font-suwannaphum */}
                  {previewTemplate.description && (
                    <p className={`text-xs sm:text-[13px] leading-relaxed pb-2 border-b ${previewTemplate.bgImage ? 'border-white/10 text-amber-100/90' : 'border-stone-100 text-stone-600'} ${previewTemplate.cardStyle === 'angkor-ancient-royalty' || previewTemplate.cardStyle?.startsWith('traditional-') || previewTemplate.cardStyle === 'floral-glasshouse' || previewTemplate.cardStyle === 'floral-khmer-blossom' || previewTemplate.cardStyle === 'floral-editorial-magazine' || previewTemplate.cardStyle === 'floral-romdoul-moonlight' || previewTemplate.cardStyle === 'floral-golden-orchid' ? 'font-suwannaphum' : ''}`}>
                      {previewTemplate.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className={`${previewTemplate.cardStyle === 'angkor-ancient-royalty' || previewTemplate.cardStyle?.startsWith('traditional-') || previewTemplate.cardStyle === 'floral-glasshouse' || previewTemplate.cardStyle === 'floral-khmer-blossom' || previewTemplate.cardStyle === 'floral-editorial-magazine' || previewTemplate.cardStyle === 'floral-romdoul-moonlight' || previewTemplate.cardStyle === 'floral-golden-orchid' ? 'font-suwannaphum font-semibold text-amber-200' : ''}`}>{modalDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className={`${previewTemplate.cardStyle === 'angkor-ancient-royalty' || previewTemplate.cardStyle?.startsWith('traditional-') || previewTemplate.cardStyle === 'floral-glasshouse' || previewTemplate.cardStyle === 'floral-khmer-blossom' || previewTemplate.cardStyle === 'floral-editorial-magazine' || previewTemplate.cardStyle === 'floral-romdoul-moonlight' || previewTemplate.cardStyle === 'floral-golden-orchid' ? 'font-suwannaphum text-amber-100' : ''}`}>{invitationData.ceremonyTime || ceremonyInfo.defaultTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className={`truncate ${previewTemplate.cardStyle === 'angkor-ancient-royalty' || previewTemplate.cardStyle?.startsWith('traditional-') || previewTemplate.cardStyle === 'floral-glasshouse' || previewTemplate.cardStyle === 'floral-khmer-blossom' || previewTemplate.cardStyle === 'floral-editorial-magazine' || previewTemplate.cardStyle === 'floral-romdoul-moonlight' || previewTemplate.cardStyle === 'floral-golden-orchid' ? 'font-suwannaphum text-amber-100' : ''}`}>
                      {invitationData.locationName || ceremonyInfo.defaultLocation}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="btn-secondary !py-2.5 text-xs cursor-pointer"
                >
                  បិទផ្ទាំង
                </button>
                <button
                  onClick={() => {
                    const t = previewTemplate;
                    setPreviewTemplate(null);
                    setSelectedTemplate(t);
                    setCurrentTheme(t.themeColor || 'crimson');
                    navigate({ to: `/${t.id}/preview` });
                  }}
                  style={{
                    backgroundColor: previewTemplate.titleColor || (previewTemplate.themeColor === 'gold' ? '#B69225' : previewTemplate.borderColor),
                  }}
                  className="!py-2.5 text-xs font-bold text-white cursor-pointer rounded-full flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all duration-200"
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                  <span>ជ្រើសរើសគំរូនេះ</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
