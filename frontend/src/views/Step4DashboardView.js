import { BaseView } from './BaseView.js';

export class Step4DashboardView extends BaseView {
  constructor(containerId, handlers) {
    super(containerId);
    this.handlers = handlers || {};
    // handlers: { onFilterChange, onSearch, onDeleteRsvp, onAddGuest, onCopyLink, onOpenQr, onBackToEditor }
  }

  render(stats, rsvps = [], activeFilter = 'all', searchQuery = '') {
    if (!this.container) return;

    const s = stats || {
      totalResponses: 0,
      totalAttendingGuests: 0,
      attendingParties: 0,
      declinedParties: 0,
      tentativeParties: 0,
      estimatedTables: 0,
    };

    const guestRowsHtml =
      rsvps.length === 0
        ? `
        <tr>
          <td colspan="6" class="text-center py-8 text-stone-400 text-xs">
            មិនទាន់មានទិន្នន័យភ្ញៀវឆ្លើយតបនៅឡើយទេ
          </td>
        </tr>
      `
        : rsvps
            .map((rsvp) => {
              const isAttending = rsvp.attendance_status === 'attending';
              const statusBadge = isAttending
                ? `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                     <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                     ចូលរួម (${rsvp.guest_count} នាក់)
                   </span>`
                : `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800">
                     <span class="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                     មិនអាចចូលរួម
                   </span>`;

              const sourceBadge =
                rsvp.source === 'telegram'
                  ? `<span class="text-[11px] text-blue-600 font-medium">Telegram</span>`
                  : rsvp.source === 'qr_code'
                  ? `<span class="text-[11px] text-purple-600 font-medium">QR Code</span>`
                  : `<span class="text-[11px] text-stone-500 font-medium">តំណភ្ជាប់ផ្ទាល់</span>`;

              return `
              <tr class="hover:bg-amber-50/20 transition">
                <td class="font-bold text-stone-800 text-sm">
                  ${rsvp.guest_name}
                  ${rsvp.phone ? `<span class="block text-[11px] font-normal text-stone-400">${rsvp.phone}</span>` : ''}
                </td>
                <td>${sourceBadge}</td>
                <td class="text-center font-bold text-stone-700">${rsvp.attendance_status === 'attending' ? `${rsvp.guest_count} នាក់` : '0'}</td>
                <td class="text-center">${statusBadge}</td>
                <td class="text-xs text-stone-600 max-w-xs truncate italic">
                  ${rsvp.wishes || '<span class="text-stone-300">-</span>'}
                </td>
                <td class="text-right">
                  <button data-delete-id="${rsvp.id}" class="delete-rsvp-btn text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition" title="លុបទិន្នន័យ">
                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                  </button>
                </td>
              </tr>
            `;
            })
            .join('');

    const recentWishes = rsvps.filter((r) => r.wishes && r.wishes.trim());

    this.container.innerHTML = `
      <section class="container-max py-6 md:py-8">
        <!-- Dashboard Top Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider">Live Host Dashboard</span>
            </div>
            <h1 class="font-moul text-xl md:text-2xl text-rose-950">
              ផ្ទាំងគ្រប់គ្រងភ្ញៀវ និងស្ថិតិឆ្លើយតប
            </h1>
            <p class="text-xs text-stone-500 mt-1">
              តាមដានស្ថិតិភ្ញៀវចូលរួម គណនាចំនួនតុ និងគ្រប់គ្រងបញ្ជីឈ្មោះជាក់ស្តែង
            </p>
          </div>

          <div class="flex items-center gap-2">
            <button id="dash-back-btn" class="btn-secondary !py-2 !px-3.5 text-xs flex items-center gap-1.5">
              <i data-lucide="edit-3" class="w-4 h-4 text-stone-600"></i>
              <span>កែសម្រួលធៀប</span>
            </button>
            <button id="dash-copy-link-btn" class="btn-secondary !py-2 !px-3.5 text-xs flex items-center gap-1.5 text-rose-900">
              <i data-lucide="copy" class="w-4 h-4"></i>
              <span id="copy-btn-label">ចម្លង Link ធៀប</span>
            </button>
            <button id="dash-qr-btn" class="btn-gold !py-2 !px-4 text-xs flex items-center gap-1.5">
              <i data-lucide="qr-code" class="w-4 h-4 text-amber-950"></i>
              <span>ទាញយក QR Code</span>
            </button>
          </div>
        </div>

        <!-- 4 KPI Metrics Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Metric 1: Total Responses -->
          <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
            <span class="text-xs text-stone-500 font-medium">ការឆ្លើយតបសរុប (Responses)</span>
            <div class="text-2xl font-bold text-stone-800 mt-1">
              ${s.totalResponses} <span class="text-xs font-normal text-stone-500">នាក់</span>
            </div>
            <span class="text-[10px] text-stone-400">តាមប្រព័ន្ធឌីជីថល</span>
          </div>

          <!-- Metric 2: Attending Guests -->
          <div class="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-sm">
            <span class="text-xs text-emerald-700 font-medium">នឹងចូលរួម (Attending)</span>
            <div class="text-2xl font-bold text-emerald-700 mt-1">
              ${s.totalAttendingGuests} <span class="text-xs font-normal text-emerald-600">នាក់</span>
            </div>
            <span class="text-[10px] text-emerald-600 font-medium">ស្មើនឹង ~ ${s.estimatedTables} តុ</span>
          </div>

          <!-- Metric 3: Estimated Tables -->
          <div class="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-sm">
            <span class="text-xs text-amber-800 font-medium">តុប៉ាន់ស្មាន (១០នាក់/តុ)</span>
            <div class="text-2xl font-bold text-amber-700 mt-1">
              ${s.estimatedTables} <span class="text-xs font-normal text-amber-600">តុ</span>
            </div>
            <span class="text-[10px] text-amber-600">គិតជាមធ្យមភោជនីយដ្ឋាន</span>
          </div>

          <!-- Metric 4: Declined -->
          <div class="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-sm">
            <span class="text-xs text-rose-700 font-medium">មិនអាចចូលរួម (Declined)</span>
            <div class="text-2xl font-bold text-rose-700 mt-1">
              ${s.declinedParties} <span class="text-xs font-normal text-rose-600">នាក់</span>
            </div>
            <span class="text-[10px] text-rose-500">បានផ្ញើសារសុំអភ័យទោស</span>
          </div>
        </div>

        <!-- Main Section: Guest Table + Wishes Wall -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- Guest List Table (8 cols) -->
          <div class="lg:col-span-8 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div>
                <h3 class="font-moul text-base text-rose-950">បញ្ជីឈ្មោះភ្ញៀវឆ្លើយតប</h3>
                <p class="text-xs text-stone-500 mt-0.5">ទិន្នន័យជាក់ស្តែងតាមប្រព័ន្ធ RSVP ឌីជីថល</p>
              </div>

              <div class="flex items-center gap-2">
                <button id="dash-add-guest-btn" class="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1.5">
                  <i data-lucide="user-plus" class="w-4 h-4"></i>
                  <span>បន្ថែមភ្ញៀវ</span>
                </button>
              </div>
            </div>

            <!-- Search and Filter Bar -->
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-stone-100">
              <div class="flex items-center gap-1 bg-stone-100 p-1 rounded-xl text-xs">
                <button data-filter="all" class="dash-filter-btn px-3 py-1 rounded-lg font-semibold transition ${activeFilter === 'all' ? 'bg-white text-rose-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'}">ទាំងអស់</button>
                <button data-filter="attending" class="dash-filter-btn px-3 py-1 rounded-lg font-semibold transition ${activeFilter === 'attending' ? 'bg-white text-emerald-800 shadow-xs' : 'text-stone-600 hover:text-stone-900'}">ចូលរួម</button>
                <button data-filter="declined" class="dash-filter-btn px-3 py-1 rounded-lg font-semibold transition ${activeFilter === 'declined' ? 'bg-white text-rose-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'}">មិនបានចូលរួម</button>
              </div>

              <div class="relative w-full sm:w-64">
                <i data-lucide="search" class="w-4 h-4 text-stone-400 absolute left-3 top-2.5"></i>
                <input type="text" id="dash-search-input" value="${searchQuery}" class="form-input !py-1.5 !pl-9 !text-xs" placeholder="ស្វែងរកតាមឈ្មោះភ្ញៀវ..." />
              </div>
            </div>

            <!-- Table Container -->
            <div class="overflow-x-auto">
              <table class="dashboard-table">
                <thead>
                  <tr>
                    <th>ឈ្មោះភ្ញៀវ</th>
                    <th>ប្រភព</th>
                    <th class="text-center">ចំនួន</th>
                    <th class="text-center">ស្ថានភាព</th>
                    <th>ពាក្យជូនពរ</th>
                    <th class="text-right">សកម្មភាព</th>
                  </tr>
                </thead>
                <tbody id="dash-table-body">
                  ${guestRowsHtml}
                </tbody>
              </table>
            </div>
          </div>

          <!-- Wishes & Blessings Wall (4 cols) -->
          <div class="lg:col-span-4 bg-white rounded-2xl p-6 border border-stone-200 shadow-sm flex flex-col">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
              <div class="flex items-center gap-2">
                <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                  <i data-lucide="message-square-heart" class="w-4 h-4"></i>
                </div>
                <h3 class="font-moul text-sm text-rose-950">សៀវភៅពាក្យជូនពរ</h3>
              </div>
              <span class="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                ${recentWishes.length} សារ
              </span>
            </div>

            <div class="space-y-3 overflow-y-auto max-h-[460px] pr-1">
              ${
                recentWishes.length === 0
                  ? `<p class="text-stone-400 text-xs text-center py-6">មិនទាន់មានពាក្យជូនពរនៅឡើយទេ</p>`
                  : recentWishes
                      .map(
                        (item) => `
                <div class="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/50 text-xs">
                  <div class="flex items-center justify-between mb-1.5">
                    <span class="font-bold text-stone-800">${item.guest_name}</span>
                    <span class="text-[10px] text-stone-400">${item.attendance_status === 'attending' ? 'ចូលរួម' : 'ជូនពរ'}</span>
                  </div>
                  <p class="text-stone-600 leading-relaxed italic">
                    "${item.wishes}"
                  </p>
                </div>
              `
                      )
                      .join('')
              }
            </div>
          </div>
        </div>
      </section>
    `;

    this.bindEvents();
    this.refreshIcons();
  }

  bindEvents() {
    // Back button
    const backBtn = document.getElementById('dash-back-btn');
    if (backBtn && this.handlers.onBackToEditor) {
      backBtn.onclick = this.handlers.onBackToEditor;
    }

    // QR modal
    const qrBtn = document.getElementById('dash-qr-btn');
    if (qrBtn && this.handlers.onOpenQr) {
      qrBtn.onclick = this.handlers.onOpenQr;
    }

    // Copy share link
    const copyBtn = document.getElementById('dash-copy-link-btn');
    if (copyBtn && this.handlers.onCopyLink) {
      copyBtn.onclick = () => {
        this.handlers.onCopyLink();
        const label = document.getElementById('copy-btn-label');
        if (label) {
          label.innerText = 'បានចម្លងរួចរាល់!';
          setTimeout(() => {
            label.innerText = 'ចម្លង Link ធៀប';
          }, 2000);
        }
      };
    }

    // Add guest manually
    const addGuestBtn = document.getElementById('dash-add-guest-btn');
    if (addGuestBtn && this.handlers.onAddGuest) {
      addGuestBtn.onclick = this.handlers.onAddGuest;
    }

    // Filter tabs
    const filterBtns = document.querySelectorAll('.dash-filter-btn');
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const status = btn.getAttribute('data-filter');
        if (this.handlers.onFilterChange) this.handlers.onFilterChange(status);
      });
    });

    // Search input
    const searchInput = document.getElementById('dash-search-input');
    if (searchInput && this.handlers.onSearch) {
      searchInput.addEventListener('input', (e) => {
        this.handlers.onSearch(e.target.value);
      });
    }

    // Delete RSVP buttons
    const deleteBtns = document.querySelectorAll('.delete-rsvp-btn');
    deleteBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-delete-id'), 10);
        if (id && this.handlers.onDeleteRsvp) {
          this.handlers.onDeleteRsvp(id);
        }
      });
    });
  }
}
