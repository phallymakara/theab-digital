import { BaseView } from './BaseView.js';

export class Step3GuestView extends BaseView {
  constructor(containerId, handlers) {
    super(containerId);
    this.handlers = handlers || {};
    // handlers: { onSubmitRsvp, onToggleAudio, onGoDashboard, onBackToEditor }
    this.countdownTimer = null;
  }

  render(invitationData, currentTheme = 'crimson', isAudioPlaying = false) {
    if (!this.container) return;
    const data = invitationData || {};

    const themeClass =
      currentTheme === 'gold'
        ? 'gold-theme'
        : currentTheme === 'emerald'
        ? 'emerald-theme'
        : 'crimson-theme';

    const accentBg =
      currentTheme === 'gold'
        ? 'bg-gradient-to-r from-amber-600 to-amber-700'
        : currentTheme === 'emerald'
        ? 'bg-gradient-to-r from-emerald-700 to-emerald-900'
        : 'bg-gradient-to-r from-rose-900 to-rose-950';

    this.container.innerHTML = `
      <section class="container-max py-6 md:py-10 max-w-3xl mx-auto">
        <!-- Top Toolbar for host -->
        <div class="flex items-center justify-between mb-6 bg-white px-4 py-3 rounded-xl border border-stone-200 shadow-sm text-xs">
          <button id="guest-back-btn" class="btn-secondary !py-1.5 !px-3 flex items-center gap-1">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>ត្រឡប់ទៅការកែសម្រួល</span>
          </button>

          <div class="flex items-center gap-2">
            <button id="guest-audio-toggle" class="btn-secondary !py-1.5 !px-3 flex items-center gap-1.5 text-amber-700">
              <i data-lucide="${isAudioPlaying ? 'volume-2' : 'volume-x'}" class="w-4 h-4"></i>
              <span>${isAudioPlaying ? 'បិទភ្លេងមង្គល' : 'ចាក់ភ្លេងមង្គល'}</span>
            </button>
            <button id="guest-dashboard-btn" class="btn-primary !py-1.5 !px-3.5 flex items-center gap-1">
              <span>ផ្ទាំងគ្រប់គ្រងភ្ញៀវ</span>
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- The Luxury Digital Theab Card (Guest Experience) -->
        <div class="bg-white rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/50 mb-8 khmer-pattern relative">
          <!-- Top Royal Khmer Banner -->
          <div class="${accentBg} text-amber-300 py-6 px-4 text-center relative overflow-hidden">
            <div class="absolute -right-8 -bottom-8 w-28 h-28 rounded-full bg-white/10 pointer-events-none"></div>
            <div class="w-16 h-16 rounded-full mx-auto bg-amber-400/20 text-amber-300 flex items-center justify-center font-moul text-2xl shadow-inner border border-amber-300/40 mb-2">
              ធ
            </div>
            <span class="text-xs uppercase font-sans tracking-widest text-amber-200 font-bold block">
              Digital Khmer Theab
            </span>
            <h1 class="font-moul text-xl md:text-2xl mt-1 tracking-wide text-amber-100">
              ${data.titleKh || 'សិរីសួស្តី អាពាហ៍ពិពាហ៍'}
            </h1>
            <div class="khmer-gold-strip max-w-xs mx-auto mt-3"></div>
          </div>

          <!-- Main Theab Body -->
          <div class="p-6 md:p-10 text-center">
            <!-- Parents Section -->
            <div class="max-w-md mx-auto mb-6 text-stone-600 text-xs md:text-sm leading-relaxed">
              <p class="text-stone-400 text-xs font-semibold mb-1">ដោយសេចក្តីគោរព និងមនោសញ្ចេតនាជ្រាលជ្រៅពី</p>
              <p class="font-bold text-stone-800">
                ${data.groomParents || 'លោក សុខ ជា និង លោកស្រី កែវ ផល្លី'}
              </p>
              <span class="inline-block my-1 text-amber-600 font-bold">&bull; និង &bull;</span>
              <p class="font-bold text-stone-800">
                ${data.brideParents || 'លោក ជា វណ្ណា និង លោកស្រី ហែម ស៊ីវន'}
              </p>
            </div>

            <!-- Welcome Text -->
            <div class="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/50 max-w-lg mx-auto mb-8 text-xs md:text-sm text-stone-700 leading-relaxed italic">
              "${data.welcomeQuote || 'យើងខ្ញុំមានកិត្តិយស និងសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស...'}"
            </div>

            <!-- Groom & Bride Highlight Section -->
            <div class="py-6 px-4 bg-gradient-to-r from-stone-50 via-amber-50/30 to-stone-50 rounded-2xl border border-amber-300/40 max-w-md mx-auto mb-8 shadow-sm">
              <span class="text-xs text-amber-800 font-bold uppercase tracking-wider block mb-1">កូនប្រុស &bull; កូនស្រី</span>
              <div class="font-moul text-xl md:text-2xl text-rose-900 leading-snug">
                ${data.groomName || 'សុខ វិបុល'}
              </div>
              <div class="my-2 flex items-center justify-center gap-3">
                <span class="h-[1px] w-12 bg-amber-300"></span>
                <span class="text-xs font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">សំពះផ្ទឹម</span>
                <span class="h-[1px] w-12 bg-amber-300"></span>
              </div>
              <div class="font-moul text-xl md:text-2xl text-rose-900 leading-snug">
                ${data.brideName || 'ជា សុជាតា'}
              </div>
            </div>

            <!-- Event Details Pill -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto mb-8 text-left">
              <div class="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div class="flex items-center gap-2 text-rose-900 font-bold text-xs mb-1">
                  <i data-lucide="calendar" class="w-4 h-4 text-amber-600"></i>
                  <span>កាលបរិច្ឆេទ & ពេលវេលា</span>
                </div>
                <p class="text-sm font-semibold text-stone-800 mt-1">${data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦'}</p>
                <p class="text-xs text-stone-500">${data.ceremonyTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ'}</p>
              </div>

              <div class="bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div class="flex items-center gap-2 text-rose-900 font-bold text-xs mb-1">
                  <i data-lucide="map-pin" class="w-4 h-4 text-rose-700"></i>
                  <span>ទីតាំងប្រារព្ធពិធី</span>
                </div>
                <p class="text-sm font-semibold text-stone-800 mt-1 truncate">${data.locationName || 'ឌឹ ព្រេមៀ សែនសុខ (អគារ A)'}</p>
                <a href="${data.googleMapsUrl || 'https://maps.google.com'}" target="_blank" class="inline-flex items-center gap-1 text-xs text-rose-800 font-bold hover:underline mt-1">
                  <span>បើកមើលលើ Google Maps</span>
                  <i data-lucide="external-link" class="w-3 h-3"></i>
                </a>
              </div>
            </div>

            <!-- Countdown Timer to Event -->
            <div class="max-w-md mx-auto mb-10 bg-white p-4 rounded-2xl border border-amber-300 shadow-sm">
              <span class="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-2">
                រាប់ថយក្រោយដល់ថ្ងៃមង្គល (Countdown)
              </span>
              <div class="grid grid-cols-4 gap-2 text-center">
                <div class="p-2 bg-rose-50 rounded-xl border border-rose-100">
                  <span id="timer-days" class="font-moul text-lg md:text-xl text-rose-900 block leading-tight">27</span>
                  <span class="text-[10px] text-stone-500">ថ្ងៃ</span>
                </div>
                <div class="p-2 bg-rose-50 rounded-xl border border-rose-100">
                  <span id="timer-hours" class="font-moul text-lg md:text-xl text-rose-900 block leading-tight">14</span>
                  <span class="text-[10px] text-stone-500">ម៉ោង</span>
                </div>
                <div class="p-2 bg-rose-50 rounded-xl border border-rose-100">
                  <span id="timer-minutes" class="font-moul text-lg md:text-xl text-rose-900 block leading-tight">35</span>
                  <span class="text-[10px] text-stone-500">នាទី</span>
                </div>
                <div class="p-2 bg-rose-50 rounded-xl border border-rose-100">
                  <span id="timer-seconds" class="font-moul text-lg md:text-xl text-rose-900 block leading-tight">50</span>
                  <span class="text-[10px] text-stone-500">វិនាទី</span>
                </div>
              </div>
            </div>

            <!-- RSVP Form Section -->
            <div id="rsvp-section" class="bg-gradient-to-b from-stone-50 to-amber-50/20 p-6 md:p-8 rounded-2xl border-2 border-amber-300 text-left max-w-lg mx-auto shadow-sm">
              <div class="text-center mb-6">
                <span class="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 mb-2">
                  ទម្រង់ឆ្លើយតប (RSVP Form)
                </span>
                <h3 class="font-moul text-base md:text-lg text-rose-900">
                  សូមជួយឆ្លើយតបការចូលរួមរបស់អ្នក
                </h3>
                <p class="text-xs text-stone-500 mt-1">
                  ដើម្បីងាយស្រួលដល់ម្ចាស់ពិធីក្នុងការរៀបចំកន្លែងអង្គុយ និងតុទទួលបដិសណ្ឋារកិច្ច
                </p>
              </div>

              <!-- Success Alert Box (Initially hidden) -->
              <div id="rsvp-success-banner" class="hidden mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-3">
                <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5"></i>
                <div>
                  <p class="font-bold text-sm">សូមអរគុណច្រើន!</p>
                  <p class="text-emerald-700 mt-0.5">ការឆ្លើយតបរបស់អ្នកត្រូវបានកត់ត្រាទុកក្នុងប្រព័ន្ធដោយជោគជ័យ។</p>
                </div>
              </div>

              <form id="rsvp-form" class="space-y-4">
                <div class="form-group">
                  <label class="form-label text-xs">ឈ្មោះភ្ញៀវកិត្តិយស (Full Name) *</label>
                  <input type="text" id="rsvp-name" class="form-input" placeholder="ឧ. ឯកឧត្តម... / លោក... / អ្នកនាង..." required />
                </div>

                <div class="form-group">
                  <label class="form-label text-xs">លេខទូរស័ព្ទ ឬ Telegram (Optional)</label>
                  <input type="tel" id="rsvp-phone" class="form-input" placeholder="012 345 678" />
                </div>

                <div class="form-group">
                  <label class="form-label text-xs">តើលោកអ្នកអាចចូលរួមបានទេ? *</label>
                  <div class="grid grid-cols-2 gap-3 mt-1.5">
                    <label class="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-white cursor-pointer hover:border-emerald-500 transition">
                      <input type="radio" name="rsvp-status" value="attending" checked class="text-emerald-600 focus:ring-emerald-500" />
                      <span class="text-xs font-bold text-emerald-800 flex items-center gap-1">
                        <i data-lucide="check" class="w-3.5 h-3.5"></i>
                        ចូលរួម
                      </span>
                    </label>

                    <label class="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-white cursor-pointer hover:border-rose-500 transition">
                      <input type="radio" name="rsvp-status" value="declined" class="text-rose-600 focus:ring-rose-500" />
                      <span class="text-xs font-bold text-rose-800 flex items-center gap-1">
                        <i data-lucide="x" class="w-3.5 h-3.5"></i>
                        មិនអាចចូលរួម
                      </span>
                    </label>
                  </div>
                </div>

                <div id="rsvp-count-wrapper" class="form-group">
                  <label class="form-label text-xs">ចំនួនអ្នកចូលរួមជាមួយ (Number of Guests)</label>
                  <select id="rsvp-count" class="form-select">
                    <option value="1">១ នាក់ (រូបខ្ញុំផ្ទាល់)</option>
                    <option value="2" selected>២ នាក់ (ខ្ញុំ និងដៃគូ/ស្វាមី/ភរិយា)</option>
                    <option value="3">៣ នាក់</option>
                    <option value="4">៤ នាក់ (ក្រុមគ្រួសារ)</option>
                    <option value="5">៥ នាក់ឡើងទៅ</option>
                  </select>
                </div>

                <div class="form-group">
                  <label class="form-label text-xs">ពាក្យជូនពរដល់ម្ចាស់កម្មវិធី (Blessings & Wishes)</label>
                  <textarea id="rsvp-wishes" class="form-textarea" rows="3" placeholder="សូមប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល..."></textarea>
                </div>

                <button type="submit" id="rsvp-submit-btn" class="w-full btn-primary !py-3 font-bold text-sm shadow-lg flex items-center justify-center gap-2">
                  <i data-lucide="send" class="w-4 h-4 text-amber-300"></i>
                  <span>ផ្ញើការឆ្លើយតប RSVP ឥឡូវនេះ</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    `;

    this.bindEvents();
    this.refreshIcons();
    this.startCountdown();
  }

  bindEvents() {
    const backBtn = document.getElementById('guest-back-btn');
    if (backBtn && this.handlers.onBackToEditor) {
      backBtn.onclick = this.handlers.onBackToEditor;
    }

    const dashboardBtn = document.getElementById('guest-dashboard-btn');
    if (dashboardBtn && this.handlers.onGoDashboard) {
      dashboardBtn.onclick = this.handlers.onGoDashboard;
    }

    const audioBtn = document.getElementById('guest-audio-toggle');
    if (audioBtn && this.handlers.onToggleAudio) {
      audioBtn.onclick = this.handlers.onToggleAudio;
    }

    // Toggle guest count field when declining
    const statusRadios = document.querySelectorAll('input[name="rsvp-status"]');
    const countWrapper = document.getElementById('rsvp-count-wrapper');
    statusRadios.forEach((radio) => {
      radio.addEventListener('change', (e) => {
        if (countWrapper) {
          countWrapper.style.display = e.target.value === 'declined' ? 'none' : 'block';
        }
      });
    });

    // Form submit
    const form = document.getElementById('rsvp-form');
    if (form) {
      form.onsubmit = async (e) => {
        e.preventDefault();
        const guestName = document.getElementById('rsvp-name')?.value.trim();
        const phone = document.getElementById('rsvp-phone')?.value.trim();
        const status = document.querySelector('input[name="rsvp-status"]:checked')?.value || 'attending';
        const count = parseInt(document.getElementById('rsvp-count')?.value || '1', 10);
        const wishes = document.getElementById('rsvp-wishes')?.value.trim();

        if (!guestName) return;

        const payload = {
          guest_name: guestName,
          phone: phone || null,
          attendance_status: status,
          guest_count: status === 'attending' ? count : 0,
          wishes: wishes || null,
          source: 'direct',
        };

        if (this.handlers.onSubmitRsvp) {
          await this.handlers.onSubmitRsvp(payload);
          // Show success message
          const banner = document.getElementById('rsvp-success-banner');
          if (banner) banner.classList.remove('hidden');
          // Reset form fields
          form.reset();
        }
      };
    }
  }

  startCountdown() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);

    let secondsLeft = 27 * 86400 + 14 * 3600 + 35 * 60 + 50;

    this.countdownTimer = setInterval(() => {
      secondsLeft--;
      if (secondsLeft <= 0) {
        clearInterval(this.countdownTimer);
        return;
      }

      const days = Math.floor(secondsLeft / 86400);
      const hours = Math.floor((secondsLeft % 86400) / 3600);
      const mins = Math.floor((secondsLeft % 3600) / 60);
      const secs = secondsLeft % 60;

      const dEl = document.getElementById('timer-days');
      const hEl = document.getElementById('timer-hours');
      const mEl = document.getElementById('timer-minutes');
      const sEl = document.getElementById('timer-seconds');

      if (dEl) dEl.innerText = days.toString();
      if (hEl) hEl.innerText = hours.toString().padStart(2, '0');
      if (mEl) mEl.innerText = mins.toString().padStart(2, '0');
      if (sEl) sEl.innerText = secs.toString().padStart(2, '0');
    }, 1000);
  }
}
