import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { Flower2, HeartHandshake, Gem, Building2, ArrowRight } from 'lucide-react';

export function CeremonySelectionPage() {
  const navigate = useNavigate();
  const { selectCeremony } = useApp();

  const handleSelect = (type, path) => {
    selectCeremony(type);
    navigate({ to: path });
  };

  return (
    <section className="w-full flex-1 min-h-screen flex flex-col justify-center items-center text-center py-6 sm:py-10 px-3.5 sm:px-6 animate-fade dot-bg-luxury relative overflow-hidden">
      <div className="w-full max-w-lg mx-auto flex flex-col items-center relative z-10">
        
        {/* Official Logo with Background Removed (Scales responsively) */}
        <div className="mb-3 sm:mb-4">
          <img
            src="/logo/theab_digital.png"
            alt="Digital Theab Logo"
            className="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-md mx-auto"
          />
        </div>

        {/* Traditional Floral Header Motif (Responsive size & spacing) */}
        <div className="mb-4 sm:mb-6 flex items-center justify-center space-x-2 sm:space-x-3 text-theabGold-600 max-w-full">
          <Flower2 className="w-6 h-6 sm:w-8 sm:h-8 text-theabGold shrink-0" />
          <div className="h-[1.5px] w-6 sm:w-12 bg-theabGold-400"></div>
          <span className="font-moul text-sm sm:text-base md:text-lg tracking-wide text-theabCrimson whitespace-nowrap leading-normal">
            លិខិតអញ្ជើញឌីជីថល
          </span>
          <div className="h-[1.5px] w-6 sm:w-12 bg-theabGold-400"></div>
          <Flower2 className="w-6 h-6 sm:w-8 sm:h-8 text-theabGold shrink-0" />
        </div>

        {/* Main Title (Fluid Responsive Scaling for mobile & desktop) */}
        <h1 className="font-moul text-lg xs:text-xl sm:text-2xl md:text-3xl text-theabCrimson mb-6 sm:mb-8 tracking-wide text-center leading-snug sm:whitespace-nowrap px-2">
          ជ្រើសរើសប្រភេទកម្មវិធីរបស់អ្នក
        </h1>

        {/* Three Row of Buttons (Responsive scaling, rounded-full, smooth staggered animation) */}
        <div className="space-y-3.5 sm:space-y-4 w-full max-w-md mx-auto">
          {/* Row 1: កម្មវិធីមង្គលការ -> /wedding */}
          <button
            onClick={() => handleSelect('wedding', '/wedding')}
            style={{ animationDelay: '80ms' }}
            className="animate-card-enter group w-full min-h-[76px] sm:min-h-[84px] relative overflow-hidden bg-[#FCFAF6] hover:bg-[#F8F2E4] border-2 border-theabGold/40 hover:border-theabCrimson text-left py-3.5 px-4.5 sm:py-5 sm:px-7 rounded-full shadow-xs hover:shadow-luxury hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 pr-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 text-theabCrimson group-hover:scale-110 transition-transform duration-300 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0 pt-1.5 sm:pt-2">
                <div className="font-moul text-sm sm:text-lg text-theabCrimson leading-normal">
                  កម្មវិធីមង្គលការ
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 font-light truncate">
                  ពិធីអាពាហ៍ពិពាហ៍បែបប្រពៃណីខ្មែរ (Khmer Wedding)
                </p>
              </div>
            </div>
            <div className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-stone-400 group-hover:text-theabCrimson group-hover:translate-x-1.5 transition-all duration-300 shrink-0 ml-2">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>

          {/* Row 2: កម្មវិធីភ្ជាប់ពាក្យ -> /engagement */}
          <button
            onClick={() => handleSelect('engagement', '/engagement')}
            style={{ animationDelay: '160ms' }}
            className="animate-card-enter group w-full min-h-[76px] sm:min-h-[84px] relative overflow-hidden bg-[#FCFAF6] hover:bg-[#F8F2E4] border-2 border-theabGold/40 hover:border-theabCrimson text-left py-3.5 px-4.5 sm:py-5 sm:px-7 rounded-full shadow-xs hover:shadow-luxury hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 pr-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 text-theabCrimson group-hover:scale-110 transition-transform duration-300 flex items-center justify-center shrink-0">
                <Gem className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0 pt-1.5 sm:pt-2">
                <div className="font-moul text-sm sm:text-lg text-theabCrimson leading-normal">
                  កម្មវិធីភ្ជាប់ពាក្យ
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 font-light truncate">
                  ពិធីស្តីដណ្តឹង និងសែនព្រេន (Engagement Ceremony)
                </p>
              </div>
            </div>
            <div className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-stone-400 group-hover:text-theabCrimson group-hover:translate-x-1.5 transition-all duration-300 shrink-0 ml-2">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>

          {/* Row 3: កម្មវិធីឡើងគេហដ្ឋាន -> /housewarming */}
          <button
            onClick={() => handleSelect('housewarming', '/housewarming')}
            style={{ animationDelay: '240ms' }}
            className="animate-card-enter group w-full min-h-[76px] sm:min-h-[84px] relative overflow-hidden bg-[#FCFAF6] hover:bg-[#F8F2E4] border-2 border-theabGold/40 hover:border-theabCrimson text-left py-3.5 px-4.5 sm:py-5 sm:px-7 rounded-full shadow-xs hover:shadow-luxury hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 ease-out flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center space-x-3 sm:space-x-4 min-w-0 pr-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 text-theabCrimson group-hover:scale-110 transition-transform duration-300 flex items-center justify-center shrink-0">
                <Building2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0 pt-1.5 sm:pt-2">
                <div className="font-moul text-sm sm:text-lg text-theabCrimson leading-normal">
                  កម្មវិធីឡើងគេហដ្ឋាន
                </div>
                <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 font-light truncate">
                  ពិធីសម្ពោធផ្ទះថ្មី និងសូត្រមន្តឡើងផ្ទះ (Housewarming)
                </p>
              </div>
            </div>
            <div className="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-stone-400 group-hover:text-theabCrimson group-hover:translate-x-1.5 transition-all duration-300 shrink-0 ml-2">
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
