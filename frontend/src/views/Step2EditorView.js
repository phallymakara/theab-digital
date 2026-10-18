import { BaseView } from './BaseView.js';

export class Step2EditorView extends BaseView {
  constructor(containerId, handlers) {
    super(containerId);
    this.handlers = handlers || {};
    // handlers: { onInputChange, onThemeSelect, onSave, onNext, onPrev, onToggleAudio }
  }

  render(invitationData, currentTheme = 'crimson', isAudioPlaying = false) {
    if (!this.container) return;

    const data = invitationData || {};
    const themeBorderColor =
      currentTheme === 'gold'
        ? '#D4AF37'
        : currentTheme === 'emerald'
        ? '#059669'
        : '#881337';

    const themeHeaderBg =
      currentTheme === 'gold'
        ? 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800'
        : currentTheme === 'emerald'
        ? 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900'
        : 'bg-gradient-to-r from-rose-900 via-rose-800 to-rose-950';

    this.container.innerHTML = `
      <section class="container-max py-6 md:py-8">
        <!-- Top Toolbar -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-4 rounded-xl border border-stone-200 shadow-sm">
          <div class="flex items-center gap-3">
            <button id="editor-back-btn" class="btn-secondary !py-1.5 !px-3 text-xs flex items-center gap-1">
              <i data-lucide="arrow-left" class="w-4 h-4"></i>
              <span>ប្តូរប្រភេទកម្មវិធី</span>
            </button>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-900 border border-rose-200">
              <span class="w-2 h-2 rounded-full bg-rose-700 mr-1.5"></span>
              ${data.eventType === 'wedding' ? 'កម្មវិធីមង្គលការ' : data.eventType === 'engagement' ? 'កម្មវិធីភ្ជាប់ពាក្យ' : 'កម្មវិធីឡើងគេហដ្ឋាន'}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button id="editor-save-btn" class="btn-secondary !py-2 !px-4 text-xs flex items-center gap-1.5">
              <i data-lucide="save" class="w-4 h-4 text-amber-600"></i>
              <span>រក្សាទុកទិន្នន័យ</span>
            </button>
            <button id="editor-next-btn" class="btn-primary !py-2 !px-4 text-xs flex items-center gap-1.5">
              <span>មើលទម្រង់ភ្ញៀវ & RSVP</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>
        </div>

        <!-- Split Grid: Editor (Left) & Phone Mockup (Right) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left: Input Form Controls (7 cols) -->
          <div class="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm">
            <div class="border-b border-stone-100 pb-4 mb-6">
              <h2 class="font-moul text-lg text-rose-950 flex items-center gap-2">
                <i data-lucide="sliders" class="w-5 h-5 text-rose-800"></i>
                កែសម្រួលព័ត៌មានលិខិតអញ្ជើញ
              </h2>
              <p class="text-xs text-stone-500 mt-1">
                រាល់ការកែប្រែនឹងបង្ហាញលើទូរស័ព្ទគំរូ (Live Phone Mockup) ភ្លាមៗដោយស្វ័យប្រវត្តិ
              </p>
            </div>

            <form id="invitation-form" onsubmit="return false;">
              <!-- Theme Color Selector -->
              <div class="form-group mb-6">
                <label class="form-label text-xs font-bold text-stone-700 uppercase tracking-wide">
                  ជម្រើសពណ៌ធៀប (Theme Style)
                </label>
                <div class="flex items-center gap-3 mt-2">
                  <button type="button" data-theme="crimson" class="theme-choice-btn flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition ${currentTheme === 'crimson' ? 'border-rose-900 bg-rose-50 text-rose-900 ring-2 ring-rose-800/20' : 'border-stone-200 hover:bg-stone-50 text-stone-600'}">
                    <span class="w-4 h-4 rounded-full bg-rose-900 border border-white shadow-sm"></span>
                    <span>ក្រហមមង្គល</span>
                  </button>

                  <button type="button" data-theme="gold" class="theme-choice-btn flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition ${currentTheme === 'gold' ? 'border-amber-600 bg-amber-50 text-amber-900 ring-2 ring-amber-500/20' : 'border-stone-200 hover:bg-stone-50 text-stone-600'}">
                    <span class="w-4 h-4 rounded-full bg-amber-500 border border-white shadow-sm"></span>
                    <span>មាសប្រណិត</span>
                  </button>

                  <button type="button" data-theme="emerald" class="theme-choice-btn flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition ${currentTheme === 'emerald' ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20' : 'border-stone-200 hover:bg-stone-50 text-stone-600'}">
                    <span class="w-4 h-4 rounded-full bg-emerald-800 border border-white shadow-sm"></span>
                    <span>បៃតងត្បូងមរកត</span>
                  </button>
                </div>
              </div>

              <!-- Names Section -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="form-group">
                  <label class="form-label">ឈ្មោះកូនកំលោះ / ម្ចាស់ពិធី (ស្វាមី)</label>
                  <input type="text" id="input-groom" class="form-input" value="${data.groomName || ''}" placeholder="ឧ. សុខ វិបុល" />
                </div>
                <div class="form-group">
                  <label class="form-label">ឈ្មោះកូនក្រមុំ / ម្ចាស់ពិធី (ភរិយា)</label>
                  <input type="text" id="input-bride" class="form-input" value="${data.brideName || ''}" placeholder="ឧ. ជា សុជាតា" />
                </div>
              </div>

              <!-- Parents Section -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="form-group">
                  <label class="form-label">មាតាបិតាខាងប្រុស</label>
                  <input type="text" id="input-groom-parents" class="form-input" value="${data.groomParents || ''}" placeholder="លោក... និង លោកស្រី..." />
                </div>
                <div class="form-group">
                  <label class="form-label">មាតាបិតាខាងស្រី</label>
                  <input type="text" id="input-bride-parents" class="form-input" value="${data.brideParents || ''}" placeholder="លោក... និង លោកស្រី..." />
                </div>
              </div>

              <!-- Date & Time Section -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="form-group">
                  <label class="form-label">កាលបរិច្ឆេទកម្មវិធី</label>
                  <input type="text" id="input-date" class="form-input" value="${data.ceremonyDate || ''}" placeholder="ឧ. ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦" />
                </div>
                <div class="form-group">
                  <label class="form-label">ពេលវេលាកម្មវិធី</label>
                  <input type="text" id="input-time" class="form-input" value="${data.ceremonyTime || ''}" placeholder="ឧ. វេលាម៉ោង ៥:០០ ល្ងាច តទៅ" />
                </div>
              </div>

              <!-- Location Section -->
              <div class="form-group mb-4">
                <label class="form-label">ឈ្មោះទីតាំងកម្មវិធី / មជ្ឈមណ្ឌល</label>
                <input type="text" id="input-location" class="form-input" value="${data.locationName || ''}" placeholder="ឧ. មជ្ឈមណ្ឌលសន្និបាត ឌឹ ព្រេមៀ សែនសុខ (អគារ A)" />
              </div>

              <div class="form-group mb-4">
                <label class="form-label">តំណភ្ជាប់ Google Maps URL</label>
                <input type="url" id="input-maps-url" class="form-input" value="${data.googleMapsUrl || ''}" placeholder="https://maps.google.com/..." />
              </div>

              <!-- Welcome Quote -->
              <div class="form-group mb-6">
                <label class="form-label">ពាក្យអញ្ជើញ និងប្រសិទ្ធពរជ័យ</label>
                <textarea id="input-quote" class="form-textarea" rows="3">${data.welcomeQuote || ''}</textarea>
              </div>
            </form>
          </div>

          <!-- Right: Live Realistic Phone Mockup (5 cols) -->
          <div class="lg:col-span-5 flex flex-col items-center">
            <div class="flex items-center justify-between w-[340px] mb-2 px-1 text-xs text-stone-500">
              <span class="flex items-center gap-1 font-semibold text-rose-900">
                <i data-lucide="smartphone" class="w-4 h-4"></i>
                ទិដ្ឋភាពទូរស័ព្ទភ្ញៀវផ្ទាល់
              </span>
              <button id="editor-audio-toggle" class="hover:text-rose-900 flex items-center gap-1 cursor-pointer">
                <i data-lucide="${isAudioPlaying ? 'volume-2' : 'volume-x'}" class="w-4 h-4 text-amber-600"></i>
                <span>${isAudioPlaying ? 'បិទភ្លេង' : 'ចាក់ភ្លេង'}</span>
              </button>
            </div>

            <!-- Phone Frame -->
            <div class="phone-mockup" style="border-color: ${themeBorderColor};">
              <div class="phone-notch"></div>

              <!-- Live Mobile Phone Screen -->
              <div class="phone-screen khmer-pattern p-4 flex flex-col text-stone-800">
                <!-- Top Status Bar Simulation -->
                <div class="flex items-center justify-between text-[10px] text-stone-400 pt-3 pb-2 mb-2">
                  <span class="font-bold">9:41 AM</span>
                  <div class="flex items-center gap-1">
                    <i data-lucide="wifi" class="w-3 h-3"></i>
                    <i data-lucide="battery" class="w-3.5 h-3.5"></i>
                  </div>
                </div>

                <!-- Digital Invitation Card Inside Phone -->
                <div class="bg-white/95 rounded-2xl p-4 shadow-sm border border-amber-300/40 text-center flex-1 flex flex-col justify-between my-1">
                  <!-- Header Ornament -->
                  <div>
                    <div class="w-12 h-12 rounded-full mx-auto ${themeHeaderBg} text-amber-300 flex items-center justify-center font-moul text-lg shadow-sm border border-amber-300/50 mb-2">
                      ធ
                    </div>
                    <span class="text-[11px] font-bold text-amber-700 tracking-wider uppercase block font-sans">
                      Digital Invitation
                    </span>
                    <h3 class="font-moul text-xs text-rose-900 mt-1 mb-1">
                      ${data.titleKh || 'សិរីសួស្តី អាពាហ៍ពិពាហ៍'}
                    </h3>
                    <div class="khmer-gold-strip max-w-[120px] mx-auto my-1.5"></div>
                  </div>

                  <!-- Parents Text -->
                  <div class="text-[10px] text-stone-600 leading-tight my-2">
                    <p class="font-medium text-stone-500">ដោយសេចក្តីគោរពពីមាតាបិតា</p>
                    <p id="live-parents-preview" class="font-semibold text-stone-700 mt-0.5">
                      ${data.groomParents || 'លោក... និង លោកស្រី...'}<br />និង ${data.brideParents || 'លោក... និង លោកស្រី...'}
                    </p>
                  </div>

                  <!-- Groom & Bride Names -->
                  <div class="my-2 p-2 rounded-xl bg-amber-50/50 border border-amber-200/40">
                    <div id="live-groom-preview" class="font-moul text-sm text-rose-900 leading-normal">
                      ${data.groomName || 'កូនកំលោះ'}
                    </div>
                    <div class="text-[11px] text-amber-600 font-bold my-0.5">&bull; និង &bull;</div>
                    <div id="live-bride-preview" class="font-moul text-sm text-rose-900 leading-normal">
                      ${data.brideName || 'កូនក្រមុំ'}
                    </div>
                  </div>

                  <!-- Date & Time Badge -->
                  <div class="bg-stone-50 rounded-xl p-2.5 text-[11px] border border-stone-200/70 space-y-1 my-2">
                    <div class="flex items-center justify-center gap-1.5 text-rose-900 font-bold">
                      <i data-lucide="calendar" class="w-3.5 h-3.5 text-amber-600"></i>
                      <span id="live-date-preview">${data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦'}</span>
                    </div>
                    <div class="flex items-center justify-center gap-1.5 text-stone-600 text-[10px]">
                      <i data-lucide="clock" class="w-3 h-3 text-stone-400"></i>
                      <span id="live-time-preview">${data.ceremonyTime || 'វេលាម៉ោង ៥:០០ ល្ងាច'}</span>
                    </div>
                  </div>

                  <!-- Venue Preview -->
                  <div class="text-[10px] text-stone-600 mb-2">
                    <div class="flex items-center justify-center gap-1 text-rose-900 font-bold mb-0.5">
                      <i data-lucide="map-pin" class="w-3 h-3 text-rose-700"></i>
                      <span>ទីតាំងប្រារព្ធពិធី</span>
                    </div>
                    <p id="live-location-preview" class="text-stone-700 font-medium px-2 truncate">
                      ${data.locationName || 'មជ្ឈមណ្ឌលសន្និបាត ឌឹ ព្រេមៀ សែនសុខ'}
                    </p>
                  </div>

                  <!-- RSVP Teaser Button Inside Phone -->
                  <div class="pt-2">
                    <div class="w-full py-2 px-3 rounded-xl ${themeHeaderBg} text-amber-200 text-xs font-bold shadow-sm flex items-center justify-center gap-1.5">
                      <i data-lucide="send" class="w-3.5 h-3.5"></i>
                      <span>ឆ្លើយតបការចូលរួម (RSVP)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    `;

    this.bindEvents();
    this.refreshIcons();
  }

  bindEvents() {
    // Input sync handlers
    const inputs = [
      { id: 'input-groom', key: 'groomName', previewId: 'live-groom-preview' },
      { id: 'input-bride', key: 'brideName', previewId: 'live-bride-preview' },
      { id: 'input-groom-parents', key: 'groomParents' },
      { id: 'input-bride-parents', key: 'brideParents' },
      { id: 'input-date', key: 'ceremonyDate', previewId: 'live-date-preview' },
      { id: 'input-time', key: 'ceremonyTime', previewId: 'live-time-preview' },
      { id: 'input-location', key: 'locationName', previewId: 'live-location-preview' },
      { id: 'input-maps-url', key: 'googleMapsUrl' },
      { id: 'input-quote', key: 'welcomeQuote' },
    ];

    inputs.forEach(({ id, key, previewId }) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          const val = e.target.value;
          if (previewId) {
            const previewEl = document.getElementById(previewId);
            if (previewEl) previewEl.innerText = val;
          }
          if (key === 'groomParents' || key === 'brideParents') {
            const gp = document.getElementById('input-groom-parents')?.value || '';
            const bp = document.getElementById('input-bride-parents')?.value || '';
            const parentsEl = document.getElementById('live-parents-preview');
            if (parentsEl) parentsEl.innerHTML = `${gp}<br />និង ${bp}`;
          }
          if (this.handlers.onInputChange) {
            this.handlers.onInputChange(key, val);
          }
        });
      }
    });

    // Theme selector buttons
    const themeBtns = document.querySelectorAll('.theme-choice-btn');
    themeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.getAttribute('data-theme');
        if (this.handlers.onThemeSelect) this.handlers.onThemeSelect(theme);
      });
    });

    // Navigation buttons
    const backBtn = document.getElementById('editor-back-btn');
    if (backBtn && this.handlers.onPrev) backBtn.onclick = this.handlers.onPrev;

    const nextBtn = document.getElementById('editor-next-btn');
    if (nextBtn && this.handlers.onNext) nextBtn.onclick = this.handlers.onNext;

    const saveBtn = document.getElementById('editor-save-btn');
    if (saveBtn && this.handlers.onSave) saveBtn.onclick = this.handlers.onSave;

    // Audio toggle
    const audioBtn = document.getElementById('editor-audio-toggle');
    if (audioBtn && this.handlers.onToggleAudio) audioBtn.onclick = this.handlers.onToggleAudio;
  }
}
