import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { FlyingHeartsAndFlowers } from '../../FlyingHeartsAndFlowers';
import { TraditionalBadgeComponent } from './TraditionalBadgeComponent';

export function TraditionalHeroSection({
  templateId = 'traditional-lacquer-gold',
  groom = 'ហេង វឌ្ឍនា',
  bride = 'កែវ ចរណៃ',
  images = [],
  fallbackImage = '/images/templates/traditional_lacquer_gold_prewedding.jpg',
  themeBorder = '#D4AF37',
  badgeText = 'សិរីសួស្តីមង្គលអាពាហ៍ពិពាហ៍',
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
    <section className="relative w-full aspect-[896/1200] min-h-[460px] overflow-hidden select-none group border-b-2" style={{ borderColor: themeBorder }}>
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
                backgroundImage: `url(${src})`
              }}
            />
            {/* Cinematic Balanced Vignette to Highlight Centered Gold Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/45 to-black/75" />
          </div>
        ))}
      </div>

      {/* Flying Hearts & Auspicious Petals Animation Layer */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <FlyingHeartsAndFlowers count={8} />
      </div>

      {/* Centered Couple Presentation on Hero Photo */}
      <div className="relative z-20 pointer-events-none w-full h-full flex flex-col justify-center items-center p-3 sm:p-6 text-center">
        <div className="space-y-2.5 sm:space-y-4 max-w-lg mx-auto w-full my-auto px-2">
          {/* Top Auspicious Title Badge with unique bespoke historical styling */}
          <div className="flex justify-center w-full">
            <TraditionalBadgeComponent
              templateId={templateId}
              title={badgeText}
              size="md"
            />
          </div>

          {/* Groom Name */}
          <div className="pt-1.5">
            <div className={`${fontNames} text-xl sm:text-2xl md:text-3xl text-amber-100 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)] leading-relaxed`}>
              {groom}
            </div>
          </div>

          {/* Central Knot / Connector - Unique to each historical template */}
          {/* Central Knot / Connector - Authentic Khmer 'និង' with traditional filigree */}
          <div className="flex items-center justify-center gap-2.5 my-0.5 sm:my-1">
            <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-16 bg-gradient-to-r from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
            <div className={`px-3 py-0.5 rounded-full border flex items-center justify-center shadow-lg backdrop-blur-md ${
              templateId === 'traditional-crimson-angkoreach'
                ? 'bg-[#3B0712]/90 border-red-400 text-amber-200 shadow-red-500/50'
                : templateId === 'traditional-indigo-hol'
                ? 'bg-[#0F172A]/90 border-indigo-400 text-amber-200 shadow-indigo-500/50'
                : templateId === 'traditional-ivory-parchment'
                ? 'bg-[#FFFDF8]/95 border-amber-500 text-amber-900 shadow-amber-600/40'
                : templateId === 'traditional-phkachan-slathor'
                ? 'bg-[#1C1608]/90 border-amber-400 text-amber-200 shadow-amber-400/50'
                : templateId === 'traditional-royal-pavilion'
                ? 'bg-[#140E02]/90 border-amber-300 text-amber-200 shadow-amber-500/60'
                : templateId === 'traditional-angkor-pediment'
                ? 'bg-[#14100D]/90 border-amber-400 text-amber-200 shadow-amber-600/50'
                : 'bg-black/80 border-amber-300 text-amber-200 shadow-amber-400/50'
            }`}>
              <span className={`${templateId === 'royal-gold' ? 'font-komutt-a' : 'font-moul'} text-[10px] sm:text-xs tracking-wider drop-shadow ${
                templateId === 'traditional-ivory-parchment' ? 'text-amber-900' : 'text-amber-200'
              }`}>
                និង
              </span>
            </div>
            <div className="h-[1px] sm:h-[1.5px] w-10 sm:w-16 bg-gradient-to-l from-transparent via-amber-300 to-amber-400 drop-shadow"></div>
          </div>

          {/* Bride Name */}
          <div>
            <div className={`${fontNames} text-xl sm:text-2xl md:text-3xl text-amber-100 tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.98)] leading-relaxed`}>
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
