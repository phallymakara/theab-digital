import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import {
  Users,
  UserCheck,
  UserX,
  Utensils,
  Search,
  Plus,
  Trash2,
  Copy,
  QrCode,
  ArrowLeft,
  Check,
  Sparkles
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { invitationData, setIsQrModalOpen, addToast, ceremonyType } = useApp();

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

  // Load from API if available
  useEffect(() => {
    fetch(`/api/v1/invitations/${invitationData.id || 1}/rsvps`)
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Not found');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setRsvps(data);
        }
      })
      .catch(() => {});
  }, [invitationData.id]);

  // Derived statistics
  const totalResponses = rsvps.length;
  const attendingParties = rsvps.filter((r) => r.attendance_status === 'attending').length;
  const declinedParties = rsvps.filter((r) => r.attendance_status === 'declined').length;
  const totalAttendingGuests = rsvps
    .filter((r) => r.attendance_status === 'attending')
    .reduce((sum, r) => sum + (Number(r.guest_count) || 1), 0);
  const estimatedTables = Math.ceil(totalAttendingGuests / 10);

  // Filtered list
  const filteredRsvps = rsvps.filter((r) => {
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'attending'
        ? r.attendance_status === 'attending'
        : r.attendance_status === 'declined';

    const matchesSearch =
      !searchQuery.trim() ||
      r.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.phone && r.phone.includes(searchQuery));

    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id) => {
    setRsvps((prev) => prev.filter((r) => r.id !== id));
    addToast('បានលុបទិន្នន័យភ្ញៀវដោយជោគជ័យ', 'info');
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/invitation/${invitationData.slug || 'vibol-sovanndy'}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      addToast('បានចម្លង Link ធៀប!', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const getCeremonyRoute = () => {
    if (ceremonyType === 'engagement') return '/engagement';
    if (ceremonyType === 'housewarming') return '/housewarming';
    return '/wedding';
  };

  return (
    <section className="container-max py-6 md:py-8 animate-fade">
      {/* Dashboard Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Live Host Dashboard
            </span>
          </div>
          <h1 className="font-moul text-xl md:text-2xl text-rose-950">
            ផ្ទាំងគ្រប់គ្រងភ្ញៀវ និងស្ថិតិឆ្លើយតប
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            តាមដានស្ថិតិភ្ញៀវចូលរួម គណនាចំនួនតុ និងគ្រប់គ្រងបញ្ជីឈ្មោះជាក់ស្តែង
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate({ to: '/invitation' })}
            className="btn-secondary !py-2 !px-3.5 text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-stone-600" />
            <span>មើលធៀបឌីជីថល</span>
          </button>
          <button
            onClick={handleCopyLink}
            className="btn-secondary !py-2 !px-3.5 text-xs flex items-center gap-1.5 text-rose-900 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700 font-bold">បានចម្លង!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>ចម្លង Link ធៀប</span>
              </>
            )}
          </button>
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 text-white cursor-pointer"
          >
            <QrCode className="w-4 h-4" />
            <span>QR Code</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div
          style={{ animationDelay: '0ms' }}
          className="animate-card-enter bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-moul text-stone-800">
              {totalResponses}
            </div>
            <div className="text-xs text-stone-500 font-medium">ការឆ្លើយតបសរុប</div>
          </div>
        </div>

        <div
          style={{ animationDelay: '70ms' }}
          className="animate-card-enter bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-moul text-emerald-700">
              {totalAttendingGuests}
            </div>
            <div className="text-xs text-stone-500 font-medium">ភ្ញៀវចូលរួមជាក់ស្តែង (នាក់)</div>
          </div>
        </div>

        <div
          style={{ animationDelay: '140ms' }}
          className="animate-card-enter bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <UserX className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-moul text-rose-800">
              {declinedParties}
            </div>
            <div className="text-xs text-stone-500 font-medium">មិនអាចចូលរួម (ភាគី)</div>
          </div>
        </div>

        <div
          style={{ animationDelay: '210ms' }}
          className="animate-card-enter bg-white p-5 rounded-2xl border border-stone-200 shadow-sm flex items-center gap-4 hover:-translate-y-1 hover:shadow-md transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-bold font-moul text-blue-700">
              ~{estimatedTables}
            </div>
            <div className="text-xs text-stone-500 font-medium">តុប៉ាន់ស្មាន (១០នាក់/តុ)</div>
          </div>
        </div>
      </div>

      {/* Guest Table Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden mb-8">
        {/* Table Filter Toolbar */}
        <div className="p-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-rose-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              ទាំងអស់ ({rsvps.length})
            </button>
            <button
              onClick={() => setActiveFilter('attending')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'attending'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              ចូលរួម ({attendingParties})
            </button>
            <button
              onClick={() => setActiveFilter('declined')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeFilter === 'declined'
                  ? 'bg-rose-800 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              មិនចូលរួម ({declinedParties})
            </button>
          </div>

          <div className="relative min-w-[220px]">
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

        {/* Responsive Table */}
        <div className="overflow-x-auto">
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
                  const isAttending = rsvp.attendance_status === 'attending';
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
