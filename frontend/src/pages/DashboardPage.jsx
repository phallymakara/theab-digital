import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/apiService';
import {
  Search,
  Trash2,
  Copy,
  QrCode,
  ArrowLeft,
  Check
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { invitationData, setIsQrModalOpen, addToast, ceremonyType, stopAudio, selectedTemplate } = useApp();

  useEffect(() => {
    stopAudio?.();
  }, []);

  const [rsvps, setRsvps] = useState([
    {
      id: 1,
      guest_name: 'ឯកឧត្តម ស៊ុន ចាន់ថុល',
      phone: '012 888 999',
      attendance_status: 'attending',
      guest_count: 2,
      wishes: 'សូមជូនពរឱ្យគូស្វាមីភរិយាថ្មី ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង!',
      source: 'direct_link',
    },
    {
      id: 2,
      guest_name: 'លោកជំទាវ ម៉ៅ ថូរី',
      phone: '017 555 444',
      attendance_status: 'attending',
      guest_count: 2,
      wishes: 'ជ័យមង្គល សិរីសួស្តី វិបុលសុខគ្រប់ប្រការ!',
      source: 'qr_code',
    },
    {
      id: 3,
      guest_name: 'លោក ហេង រតនា',
      phone: '089 123 456',
      attendance_status: 'declined',
      guest_count: 0,
      wishes: 'សូមអភ័យទោស ដោយសារជាប់បេសកកម្មក្រៅប្រទេស តែសូមផ្ញើពរជ័យដ៏កក់ក្តៅជូន!',
      source: 'telegram',
    },
    {
      id: 4,
      guest_name: 'កញ្ញា ជា សុភ័ក្ត្រ',
      phone: '096 777 888',
      attendance_status: 'attending',
      guest_count: 1,
      wishes: 'រីករាយថ្ងៃមង្គលការ បងស្រីសម្លាញ់!',
      source: 'direct_link',
    },
  ]);

  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  // Load from API if available with null-safe handling
  useEffect(() => {
    if (invitationData?.id) {
      apiService.getRSVPs(invitationData.id)
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setRsvps(data);
          }
        })
        .catch(() => {});
    }
  }, [invitationData?.id]);

  // Derived statistics (null-safe)
  const totalResponses = (rsvps || []).length;
  const attendingParties = (rsvps || []).filter((r) => r?.attendance_status === 'attending').length;
  const declinedParties = (rsvps || []).filter((r) => r?.attendance_status === 'declined').length;
  const totalAttendingGuests = (rsvps || [])
    .filter((r) => r?.attendance_status === 'attending')
    .reduce((sum, r) => sum + (Number(r?.guest_count) || 1), 0);
  const estimatedTables = Math.ceil(totalAttendingGuests / 10);

  // Filtered list (null-safe)
  const filteredRsvps = (rsvps || []).filter((r) => {
    if (!r) return false;
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'attending'
        ? r.attendance_status === 'attending'
        : r.attendance_status === 'declined';

    const guestName = (r.guest_name || '').toLowerCase();
    const query = (searchQuery || '').toLowerCase().trim();
    const matchesSearch =
      !query ||
      guestName.includes(query) ||
      (r.phone && String(r.phone).includes(query));

    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id) => {
    setRsvps((prev) => (prev || []).filter((r) => r?.id !== id));
    addToast('បានលុបទិន្នន័យភ្ញៀវដោយជោគជ័យ', 'info');
  };

  const getTargetTemplateId = () => {
    return invitationData?.template_id || invitationData?.templateId || selectedTemplate?.id || 'romdoul-moonlight';
  };

  const handleViewTheab = () => {
    const templateId = getTargetTemplateId();
    const ceremony = ceremonyType || 'wedding';
    navigate({ to: `/${ceremony}/${templateId}` });
  };

  const handleCopyLink = () => {
    try {
      const templateId = getTargetTemplateId();
      const ceremony = ceremonyType || 'wedding';
      const url = `${window.location.origin}/guest/${ceremony}/${templateId}`;
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText(url)
          .then(() => {
            setCopied(true);
            addToast('បានចម្លង Link ធៀប!', 'success');
            setTimeout(() => setCopied(false), 2000);
          })
          .catch(() => fallbackCopy(url));
      } else {
        fallbackCopy(url);
      }
    } catch (_) {
      addToast('មិនអាចចម្លង Link បានទេ', 'warning');
    }
  };

  const fallbackCopy = (text) => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      addToast('បានចម្លង Link ធៀប!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      addToast('មិនអាចចម្លង Link បានទេ', 'warning');
    }
  };

  return (
    <section className="container-max py-4 sm:py-6 md:py-8 animate-fade">
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-moul text-lg sm:text-xl md:text-2xl text-rose-950 leading-normal">
            ផ្ទាំងគ្រប់គ្រងភ្ញៀវ និងស្ថិតិឆ្លើយតប
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            តាមដានវត្តមានភ្ញៀវ និងគណនាចំនួនតុជាក់ស្តែង
          </p>
        </div>

        <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleViewTheab}
            className="btn-secondary !py-2 !px-2.5 sm:!px-3.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer truncate"
            title="មើលធៀបឌីជីថល"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0 text-stone-600" />
            <span className="truncate">មើលធៀប</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="btn-secondary !py-2 !px-2.5 sm:!px-3.5 text-xs flex items-center justify-center gap-1.5 text-rose-900 cursor-pointer truncate"
            title="ចម្លង Link ធៀប"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span className="text-emerald-700 font-bold truncate">បានចម្លង</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">ចម្លង Link</span>
              </>
            )}
          </button>
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="btn-primary !py-2 !px-2.5 sm:!px-3.5 text-xs flex items-center justify-center gap-1.5 text-white cursor-pointer truncate"
            title="QR Code"
          >
            <QrCode className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">QR Code</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div
          style={{ animationDelay: '0ms' }}
          className="animate-card-enter bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200 transition-colors"
        >
          <div className="text-xl sm:text-2xl font-bold font-moul text-stone-800">
            {totalResponses}
          </div>
          <div className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1 leading-snug">
            ការឆ្លើយតបសរុប
          </div>
        </div>

        <div
          style={{ animationDelay: '70ms' }}
          className="animate-card-enter bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200 transition-colors"
        >
          <div className="text-xl sm:text-2xl font-bold font-moul text-emerald-700">
            {totalAttendingGuests}
          </div>
          <div className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1 leading-snug">
            ភ្ញៀវចូលរួមជាក់ស្តែង (នាក់)
          </div>
        </div>

        <div
          style={{ animationDelay: '140ms' }}
          className="animate-card-enter bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200 transition-colors"
        >
          <div className="text-xl sm:text-2xl font-bold font-moul text-rose-800">
            {declinedParties}
          </div>
          <div className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1 leading-snug">
            មិនអាចចូលរួម (ភាគី)
          </div>
        </div>

        <div
          style={{ animationDelay: '210ms' }}
          className="animate-card-enter bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200 transition-colors"
        >
          <div className="text-xl sm:text-2xl font-bold font-moul text-blue-700">
            ~{estimatedTables}
          </div>
          <div className="text-[11px] sm:text-xs text-stone-500 font-medium mt-1 leading-snug">
            តុប៉ាន់ស្មាន (១០នាក់/តុ)
          </div>
        </div>
      </div>

      {/* Guest List / Table Container */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mb-8">
        {/* Table Filter Toolbar */}
        <div className="p-3 sm:p-4 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 bg-stone-50/50">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'all'
                  ? 'bg-rose-900 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              ទាំងអស់ ({rsvps.length})
            </button>
            <button
              onClick={() => setActiveFilter('attending')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'attending'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              ចូលរួម ({attendingParties})
            </button>
            <button
              onClick={() => setActiveFilter('declined')}
              className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap shrink-0 ${
                activeFilter === 'declined'
                  ? 'bg-rose-800 text-white'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              មិនចូលរួម ({declinedParties})
            </button>
          </div>

          <div className="relative w-full sm:w-auto sm:min-w-[220px]">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរកឈ្មោះ ឬលេខទូរស័ព្ទ..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-rose-900"
            />
          </div>
        </div>

        {/* Mobile View: Dedicated Guest Cards (Phones) */}
        <div className="md:hidden divide-y divide-stone-100">
          {filteredRsvps.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs">
              មិនមានទិន្នន័យត្រូវគ្នានឹងការស្វែងរកឡើយ
            </div>
          ) : (
            filteredRsvps.map((rsvp) => {
              const isAttending = rsvp?.attendance_status === 'attending';
              return (
                <div key={rsvp.id} className="p-3.5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-stone-800 truncate">
                        {rsvp.guest_name}
                      </div>
                      {rsvp.phone && (
                        <div className="text-[11px] text-stone-400 mt-0.5">
                          {rsvp.phone}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {isAttending ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                          ចូលរួម ({rsvp.guest_count} នាក់)
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                          មិនអាចចូលរួម
                        </span>
                      )}
                      <button
                        onClick={() => handleDelete(rsvp.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                        title="លុបទិន្នន័យ"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span className="inline-block px-2 py-0.5 rounded bg-stone-100 text-stone-600 font-medium capitalize">
                      ប្រភព: {rsvp.source || 'Direct'}
                    </span>
                    <span className="font-medium">
                      {isAttending ? `ភ្ញៀវ: ${rsvp.guest_count} នាក់` : 'អវត្តមាន'}
                    </span>
                  </div>

                  {rsvp.wishes && (
                    <div className="text-xs text-stone-600 bg-stone-50 rounded-lg p-2.5 border border-stone-100 italic leading-relaxed">
                      "{rsvp.wishes}"
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Desktop View: Full Responsive Table (Tablets & Desktops) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-bold">
                <th className="py-3 px-4">ឈ្មោះភ្ញៀវកិត្តិយស</th>
                <th className="py-3 px-4">ប្រភព</th>
                <th className="py-3 px-4 text-center">ចំនួនភ្ញៀវ</th>
                <th className="py-3 px-4 text-center">ស្ថានភាព</th>
                <th className="py-3 px-4">ពាក្យជូនពរ</th>
                <th className="py-3 px-4 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredRsvps.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-stone-400 text-xs">
                    មិនមានទិន្នន័យត្រូវគ្នានឹងការស្វែងរកឡើយ
                  </td>
                </tr>
              ) : (
                filteredRsvps.map((rsvp) => {
                  const isAttending = rsvp?.attendance_status === 'attending';
                  return (
                    <tr key={rsvp.id} className="hover:bg-amber-50/20 transition">
                      <td className="py-3 px-4 font-bold text-stone-800">
                        {rsvp.guest_name}
                        {rsvp.phone && (
                          <span className="block text-[11px] font-normal text-stone-400">
                            {rsvp.phone}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-[11px] text-stone-500 font-medium capitalize">
                          {rsvp.source || 'Direct'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-stone-700">
                        {isAttending ? `${rsvp.guest_count} នាក់` : '0'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {isAttending ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                            ចូលរួម ({rsvp.guest_count} នាក់)
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5"></span>
                            មិនអាចចូលរួម
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-stone-600 max-w-xs truncate italic">
                        {rsvp.wishes || <span className="text-stone-300">-</span>}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDelete(rsvp.id)}
                          className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                          title="លុបទិន្នន័យ"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
