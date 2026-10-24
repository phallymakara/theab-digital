import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { FlyingHeartsAndFlowers } from '../../FlyingHeartsAndFlowers';

export function TraditionalHeroSection({
  groom = 'ហេង វឌ្ឍនា',
  bride = 'កែវ ចរណៃ',
  images = [],
  fallbackImage = '/images/templates/traditional_lacquer_gold_prewedding.jpg',
  themeBorder = '#D4AF37',
  badgeText = 'សិរីមង្គលអាពាហ៍ពិពាហ៍',
  fontNames = 'font-moul',
  onScrollDown
}) {
  const heroList = (images && images.length > 0)
    ? images
    : [fallbackImage, '/images/templates/royal-gold/gold_1.jpg', '/images/templates/royal-gold/gold_2.jpg'];

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      if (clientWidth > 0) {
        const idx = Math.round(scrollLeft / clientWidth);
        if (idx !== currentIndex && idx >= 0 && idx < heroList.length) {
          setCurrentIndex(idx);
        }
      }
    }
  };

  const goToSlide = (idx) => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      scrollRef.current.scrollTo({
        left: idx * clientWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(idx);
    }
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % heroList.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + heroList.length) % heroList.length;
    goToSlide(prev);
  };

  const handleScrollDownClick = () => {
    if (onScrollDown) {
      onScrollDown();
    } else {
      const target = document.getElementById('traditional-ceremony-content');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollBy({ top: 500, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full aspect-[896/1200] min-h-[520px] sm:min-h-[620px] md:min-h-[700px] overflow-hidden select-none group border-b-2" style={{ borderColor: themeBorder }}>
      {/* Horizontal Snap Scroll Gallery */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory scrollbar-none scroll-smooth touch-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {heroList.map((src, idx) => (
          <div key={idx} className="relative w-full min-w-full h-full shrink-0 snap-start snap-always">
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: '100% 100%'
              }}
            />
            {/* Cinematic Balanced Vignette to Highlight Centered Gold Text */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />
          </div>
        ))}
      </div>

      {/* Flying Hearts & Auspicious Petals Animation Layer */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <FlyingHeartsAndFlowers count={8} />
      </div>

      {/* Decorative Traditional Filigree Inner Frame */}
      <div
        className="absolute inset-3 sm:inset-5 rounded-[22px] border pointer-events-none z-10"
        style={{ borderColor: `${themeBorder}80` }}
      >
        <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2" style={{ borderColor: themeBorder }}></div>
        <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2" style={{ borderColor: themeBorder }}></div>
        <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2" style={{ borderColor: themeBorder }}></div>
        <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2" style={{ borderColor: themeBorder }}></div>
      </div>

      {/* Centered Couple Presentation on Hero Photo */}
      <div className="relative z-20 pointer-events-none w-full h-full flex flex-col justify-center items-center p-4 sm:p-6 text-center">
        <div className="space-y-3 sm:space-y-4 max-w-lg mx-auto w-full my-auto px-2">
          {/* Top Auspicious Title Badge */}
          <div>
            <div className="inline-flex items-center justify-center gap-2 px-5 py-2 sm:px-7 sm:py-2.5 rounded-2xl bg-black/65 backdrop-blur-md border border-amber-400/80 shadow-[0_4px_25px_rgba(0,0,0,0.85)] relative">
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-300 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-300 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-300 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-300 pointer-events-none" />

              <span className="text-amber-300 text-xs">❖</span>
              <h1 className="font-moul text-sm sm:text-base md:text-lg text-amber-200 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                {badgeText}
              </h1>
              <span className="text-amber-300 text-xs">❖</span>
            </div>
          </div>

          {/* Groom Name */}
          <div className="pt-2">
            <div className={`${fontNames} text-2xl sm:text-3xl md:text-4xl text-amber-100 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)] leading-relaxed`}>
              {groom}
            </div>
          </div>

          {/* Central Knot / Connector */}
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="h-[1.5px] w-12 sm:w-16 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
            <div className="w-8 h-8 rounded-full bg-black/70 border-2 border-amber-300 flex items-center justify-center shadow-[0_0_12px_rgba(212,175,55,0.7)]">
              <span className="font-moul text-[10px] text-amber-200">៚</span>
            </div>
            <div className="h-[1.5px] w-12 sm:w-16 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
          </div>

          {/* Bride Name */}
          <div>
            <div className={`${fontNames} text-2xl sm:text-3xl md:text-4xl text-amber-100 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)] leading-relaxed`}>
              {bride}
            </div>
          </div>
        </div>
      </div>

      {/* Left / Right Arrow Navigation Buttons */}
      {heroList.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous Photo"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-amber-300 border border-amber-400/50 flex items-center justify-center cursor-pointer z-20 backdrop-blur-xs transition active:scale-95 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next Photo"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-black/80 text-amber-300 border border-amber-400/50 flex items-center justify-center cursor-pointer z-20 backdrop-blur-xs transition active:scale-95 shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Horizontal Scroll Dot Indicators & Counter Badge */}
      <div className="absolute bottom-12 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
        {heroList.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              idx === currentIndex
                ? 'w-6 h-2 bg-gradient-to-r from-amber-300 to-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={handleScrollDownClick}
        className="absolute bottom-3 inset-x-0 flex flex-col items-center justify-center text-amber-200/90 hover:text-amber-100 z-20 cursor-pointer pointer-events-auto transition group/btn"
      >
        <span className="text-[10px] uppercase font-bold tracking-widest font-preahvihear text-amber-300 group-hover/btn:underline">
          អូសចុះក្រោមមើលពិធីមង្គល
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-300 -mt-0.5" />
      </button>
    </section>
  );
}
export default TraditionalHeroSection;
