import { BaseView } from './BaseView.js';

export class Step1CeremonyView extends BaseView {
  constructor(containerId, onSelectCeremony) {
    super(containerId);
    this.onSelectCeremony = onSelectCeremony;
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <section class="w-full flex-1 min-h-screen flex flex-col justify-center items-center text-center py-6 sm:py-10 px-3.5 sm:px-6 animate-fade dot-bg-luxury relative overflow-hidden">
        <div class="w-full max-w-lg mx-auto flex flex-col items-center relative z-10">
          
          <!-- Official Logo with Background Removed (Scales responsively) -->
          <div class="mb-3 sm:mb-4">
            <img src="/logo/theab_digital.png" alt="Digital Theab Logo" class="w-24 h-24 sm:w-32 sm:h-32 object-contain drop-shadow-md mx-auto" />
          </div>

          <!-- Traditional Floral Header Motif (Responsive size & spacing) -->
          <div class="mb-4 sm:mb-6 flex items-center justify-center space-x-2 sm:space-x-3 text-theabGold-600 max-w-full">
            <i data-lucide="flower2" class="w-6 h-6 sm:w-8 sm:h-8 text-theabGold flex-shrink-0"></i>
            <div class="h-[1.5px] w-6 sm:w-12 bg-theabGold-400"></div>
            <span class="font-kantumruy font-bold text-sm sm:text-base md:text-lg tracking-wide text-stone-700 whitespace-nowrap">
              លិខិតអញ្ជើញឌីជីថល
            </span>
            <div class="h-[1.5px] w-6 sm:w-12 bg-theabGold-400"></div>
            <i data-lucide="flower2" class="w-6 h-6 sm:w-8 sm:h-8 text-theabGold flex-shrink-0"></i>
          </div>

          <!-- Main Title (Fluid Responsive Scaling for mobile & desktop) -->
          <h1 class="font-moul text-lg xs:text-xl sm:text-2xl md:text-3xl text-theabCrimson mb-6 sm:mb-8 tracking-wide text-center leading-snug sm:whitespace-nowrap px-2">
            ជ្រើសរើសប្រភេទកម្មវិធីរបស់អ្នក
          </h1>

          <!-- Three Row of Buttons (Responsive scaling, rounded-full) -->
          <div class="space-y-3.5 sm:space-y-4 w-full max-w-md mx-auto">
            <!-- Row 1: កម្មវិធីមង្គលការ -->
            <button id="btn-ceremony-wedding" class="group w-full min-h-[76px] sm:min-h-[84px] relative overflow-hidden bg-[#FCFAF6] hover:bg-[#F8F2E4] border-2 border-theabGold/40 hover:border-theabCrimson text-left py-3.5 px-4.5 sm:py-5 sm:px-7 rounded-full shadow-sm hover:shadow-luxury transition-all duration-300 flex items-center justify-between cursor-pointer">
              <div class="flex items-center space-x-3 sm:space-x-4 min-w-0 pr-1">
                <div class="w-10 h-10 sm:w-12 sm:h-12 text-theabCrimson group-hover:scale-110 transition-transform flex items-center justify-center flex-shrink-0">
                  <i data-lucide="heart-handshake" class="w-7 h-7 sm:w-8.5 sm:h-8.5"></i>
                </div>
                <div class="min-w-0 pt-1.5 sm:pt-2">
                  <div class="font-moul text-sm sm:text-lg text-theabCrimson leading-normal">កម្មវិធីមង្គលការ</div>
                  <p class="text-[11px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 font-light truncate">ពិធីអាពាហ៍ពិពាហ៍បែបប្រពៃណីខ្មែរ (Khmer Wedding)</p>
                </div>
              </div>
              <div class="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-stone-400 group-hover:text-theabCrimson group-hover:translate-x-1.5 transition-all flex-shrink-0 ml-2">
                <i data-lucide="arrow-right" class="w-4 h-4 sm:w-5 sm:h-5"></i>
              </div>
            </button>

            <!-- Row 2: កម្មវិធីភ្ជាប់ពាក្យ -->
            <button id="btn-ceremony-engagement" class="group w-full min-h-[76px] sm:min-h-[84px] relative overflow-hidden bg-[#FCFAF6] hover:bg-[#F8F2E4] border-2 border-theabGold/40 hover:border-theabCrimson text-left py-3.5 px-4.5 sm:py-5 sm:px-7 rounded-full shadow-sm hover:shadow-luxury transition-all duration-300 flex items-center justify-between cursor-pointer">
              <div class="flex items-center space-x-3 sm:space-x-4 min-w-0 pr-1">
                <div class="w-10 h-10 sm:w-12 sm:h-12 text-theabCrimson group-hover:scale-110 transition-transform flex items-center justify-center flex-shrink-0">
                  <i data-lucide="gem" class="w-7 h-7 sm:w-8.5 sm:h-8.5"></i>
                </div>
                <div class="min-w-0 pt-1.5 sm:pt-2">
                  <div class="font-moul text-sm sm:text-lg text-theabCrimson leading-normal">កម្មវិធីភ្ជាប់ពាក្យ</div>
                  <p class="text-[11px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 font-light truncate">ពិធីស្តីដណ្តឹង និងសែនព្រេន (Engagement Ceremony)</p>
                </div>
              </div>
              <div class="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-stone-400 group-hover:text-theabCrimson group-hover:translate-x-1.5 transition-all flex-shrink-0 ml-2">
                <i data-lucide="arrow-right" class="w-4 h-4 sm:w-5 sm:h-5"></i>
              </div>
            </button>

            <!-- Row 3: កម្មវិធីឡើងគេហដ្ឋាន -->
            <button id="btn-ceremony-housewarming" class="group w-full min-h-[76px] sm:min-h-[84px] relative overflow-hidden bg-[#FCFAF6] hover:bg-[#F8F2E4] border-2 border-theabGold/40 hover:border-theabCrimson text-left py-3.5 px-4.5 sm:py-5 sm:px-7 rounded-full shadow-sm hover:shadow-luxury transition-all duration-300 flex items-center justify-between cursor-pointer">
              <div class="flex items-center space-x-3 sm:space-x-4 min-w-0 pr-1">
                <div class="w-10 h-10 sm:w-12 sm:h-12 text-theabCrimson group-hover:scale-110 transition-transform flex items-center justify-center flex-shrink-0">
                  <i data-lucide="building-2" class="w-7 h-7 sm:w-8.5 sm:h-8.5"></i>
                </div>
                <div class="min-w-0 pt-1.5 sm:pt-2">
                  <div class="font-moul text-sm sm:text-lg text-theabCrimson leading-normal">កម្មវិធីឡើងគេហដ្ឋាន</div>
                  <p class="text-[11px] sm:text-xs text-stone-500 mt-0.5 sm:mt-1 font-light truncate">ពិធីសម្ពោធផ្ទះថ្មី និងសូត្រមន្តឡើងផ្ទះ (Housewarming)</p>
                </div>
              </div>
              <div class="w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center text-stone-400 group-hover:text-theabCrimson group-hover:translate-x-1.5 transition-all flex-shrink-0 ml-2">
                <i data-lucide="arrow-right" class="w-4 h-4 sm:w-5 sm:h-5"></i>
              </div>
            </button>
          </div>

        </div>
      </section>
    `;

    this.bindEvents();
    this.refreshIcons();
  }

  bindEvents() {
    const weddingBtn = document.getElementById('btn-ceremony-wedding');
    if (weddingBtn) {
      weddingBtn.onclick = () => this.onSelectCeremony('wedding');
    }

    const engagementBtn = document.getElementById('btn-ceremony-engagement');
    if (engagementBtn) {
      engagementBtn.onclick = () => this.onSelectCeremony('engagement');
    }

    const housewarmingBtn = document.getElementById('btn-ceremony-housewarming');
    if (housewarmingBtn) {
      housewarmingBtn.onclick = () => this.onSelectCeremony('housewarming');
    }
  }
}
