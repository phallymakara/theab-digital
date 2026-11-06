import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import {
  Search,
  Trash2,
  Copy,
  QrCode,
  ArrowLeft,
  Check,
  RefreshCw,
  Heart,
  Users,
  Compass,
  Edit3,
  Eye,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    invitationData,
    setIsQrModalOpen,
    addToast,
    ceremonyType,
    stopAudio,
    selectedTemplate,
    userDraft
  } = useApp();

  useEffect(() => {
    stopAudio?.();
    if (user && (user.is_superuser || user.role === 'superadmin')) {
      navigate({ to: '/superadmin', replace: true });
    }
  }, [user, navigate]);

  if (user && (user.is_superuser || user.role === 'superadmin')) {
    return null;
  }

  const [rsvps, setRsvps] = useState([
    {
      id: 1,
      guest_name: 'ឯកឧត្តម ស៊ុន ចាន់ថុល',
      phone: '012 888 999',
      attendance_status: 'attending',
      guest_count: 2,
      wishes: 'សូមជូនពរឱ្យគូស្វាមីភរិយាថ្មី ស្រឡាញ់គ្នារហូតដល់ចាស់កោងខ្នង!',
      source: 'direct_link',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      guest_name: 'លោកជំទាវ ម៉ៅ ថូរី',
      phone: '017 555 444',
      attendance_status: 'attending',
      guest_count: 2,
      wishes: 'ជ័យមង្គល សិរីសួស្តី វិបុលសុខគ្រប់ប្រការ!',
      source: 'qr_code',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      guest_name: 'លោក ហេង រតនា',
      phone: '089 123 456',
      attendance_status: 'declined',
      guest_count: 0,
      wishes: 'សូមអភ័យទោស ដោយសារជាប់បេសកកម្មក្រៅប្រទេស តែសូមផ្ញើពរជ័យដ៏កក់ក្តៅជូន!',
      source: 'telegram',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      guest_name: 'កញ្ញា ជា សុភ័ក្ត្រ',
      phone: '096 777 888',
      attendance_status: 'attending',
      guest_count: 1,
      wishes: 'រីករាយថ្ងៃមង្គលការ បងស្រីសម្លាញ់!',
      source: 'direct_link',
      created_at: new Date().toISOString()
    },
  ]);

  const [userInvitations, setUserInvitations] = useState([]);
  const [activeTab, setActiveTab] = useState('guests'); // 'guests' or 'wishes'
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentInvitationId, setCurrentInvitationId] = useState(invitationData?.id || 1);

  // Sync with API & localStorage submissions
  const loadRsvps = useCallback(async (showToast = false) => {
    setIsRefreshing(true);
    let targetId = currentInvitationId;

    try {
      if (user) {
        try {
          const userInvs = await apiService.listInvitations();
          if (Array.isArray(userInvs) && userInvs.length > 0) {
            setUserInvitations(userInvs);
            targetId = userInvs[0].id;
            setCurrentInvitationId(userInvs[0].id);
          }
        } catch (_) {}
      }

      const data = await apiService.getRSVPs(targetId);
      let combined = Array.isArray(data) ? [...data] : [];

      try {
        const local = JSON.parse(localStorage.getItem('theab_guest_submissions') || '[]');
        if (Array.isArray(local) && local.length > 0) {
          local.forEach((loc) => {
            const exists = combined.some(
              (c) => c.guest_name === loc.guest_name || c.id === loc.id
            );
            if (!exists) {
              combined.unshift(loc);
            }
          });
        }
      } catch (_) {}

      if (combined.length > 0) {
        setRsvps(combined);
        if (showToast) {
          addToast('បានធ្វើបច្ចុប្បន្នភាពទិន្នន័យរួចរាល់', 'success');
        }
      }
    } catch (_) {
      try {
        const local = JSON.parse(localStorage.getItem('theab_guest_submissions') || '[]');
        if (Array.isArray(local) && local.length > 0) {
          setRsvps((prev) => {
            const merged = [...local];
            prev.forEach((p) => {
              if (!merged.some((m) => m.guest_name === p.guest_name)) {
                merged.push(p);
              }
            });
            return merged;
          });
        }
      } catch (_) {}
    } finally {
      setIsRefreshing(false);
    }
  }, [user, currentInvitationId, addToast]);

  useEffect(() => {
    loadRsvps(false);
  }, []);

  // Derived statistics (null-safe)
  const totalResponses = (rsvps || []).length;
  const attendingParties = (rsvps || []).filter((r) => r?.attendance_status === 'attending').length;
  const declinedParties = (rsvps || []).filter((r) => r?.attendance_status === 'declined').length;
  const totalAttendingGuests = (rsvps || [])
    .filter((r) => r?.attendance_status === 'attending')
    .reduce((sum, r) => sum + (Number(r?.guest_count) || 1), 0);
  const estimatedTables = Math.ceil(totalAttendingGuests / 10);

  // List of guests with wishes
  const wishesList = (rsvps || []).filter((r) => r?.wishes && r.wishes.trim().length > 0);

  // Active Draft or Published Theab
  const activeTheab =
    (userInvitations && userInvitations.length > 0 ? userInvitations[0] : null) ||
    userDraft ||
    (invitationData?.isCustomized ? invitationData : null);

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
      (r.phone && String(r.phone).includes(query)) ||
      (r.wishes && String(r.wishes).toLowerCase().includes(query));

    return matchesFilter && matchesSearch;
  });

  const handleDelete = (id) => {
    setRsvps((prev) => (prev || []).filter((r) => r?.id !== id));
    try {
      const local = JSON.parse(localStorage.getItem('theab_guest_submissions') || '[]');
      const updated = local.filter((item) => item.id !== id);
      localStorage.setItem('theab_guest_submissions', JSON.stringify(updated));
    } catch (_) {}
    addToast('បានលុបទិន្នន័យភ្ញៀវដោយជោគជ័យ', 'info');
  };

  const getTargetTemplateId = () => {
    return (
      activeTheab?.templateId ||
      activeTheab?.template_id ||
      invitationData?.template_id ||
      selectedTemplate?.id ||
      'royal-gold'
    );
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
            តាមដានវត្តមានភ្ញៀវ ពាក្យជូនពរ និងគណនាចំនួនតុជាក់ស្តែង
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => loadRsvps(true)}
            disabled={isRefreshing}
            className="btn-secondary !py-2 !px-2.5 sm:!px-3.5 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            title="ទាញយកទិន្នន័យចុងក្រោយ"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-stone-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>ផ្ទុកឡើងវិញ</span>
          </button>
          <button
            onClick={() => navigate({ to: '/wedding' })}
            className="btn-secondary !py-2 !px-2.5 sm:!px-3.5 text-xs flex items-center justify-center gap-1.5 text-rose-900 cursor-pointer"
            title="ស្វែងរក និងជ្រើសរើសគំរូធៀបផ្សេងទៀត"
          >
            <Compass className="w-3.5 h-3.5 text-rose-800" />
            <span>ស្វែងរកគំរូ</span>
          </button>
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

      {/* SECTION: ACTIVE THEAB / DRAFT vs DISCOVERY */}
      {activeTheab ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 mb-6 sm:mb-8 transition-colors">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-14 h-18 sm:w-16 sm:h-20 rounded-xl bg-stone-100 border border-stone-200 overflow-hidden shrink-0 flex items-center justify-center">
                {activeTheab.thumbnail || activeTheab.bg_image_url ? (
                  <img
                    src={activeTheab.thumbnail || activeTheab.bg_image_url}
                    alt="Theab Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Sparkles className="w-6 h-6 text-amber-600" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                    activeTheab.is_published
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    {activeTheab.is_published ? '✨ បានផ្សព្វផ្សាយ' : '📝 ធៀបព្រាង (Draft)'}
                  </span>
                  <span className="text-[11px] text-stone-400 capitalize">
                    គំរូ៖ {activeTheab.templateName || activeTheab.template_id || 'រាជរដ្ឋមាស'}
                  </span>
                </div>
                <h2 className="font-bold text-sm sm:text-base text-stone-900 font-komutt-a">
                  {activeTheab.formData?.groomName || activeTheab.groom_name || 'សុខ វិបុល'} ❤️ {activeTheab.formData?.brideName || activeTheab.bride_name || 'ជា សុជាតា'}
                </h2>
                <p className="text-xs text-stone-500 mt-0.5 line-clamp-1">
                  {activeTheab.formData?.ceremonyDateKh || activeTheab.ceremony_date_kh || 'ថ្ងៃអាទិត្យ ទី១០ ខែមករា ឆ្នាំ២០២៧'} • {activeTheab.formData?.locationName || activeTheab.location_name || 'រាជធានីភ្នំពេញ'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-stone-100">
              <button
                onClick={() => navigate({ to: `/customize/${activeTheab.templateId || activeTheab.template_id || 'royal-gold'}` })}
                className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 text-white cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>កែសម្រួលបន្ត</span>
              </button>
              <button
                onClick={() => navigate({ to: `/${activeTheab.ceremonyType || activeTheab.event_type || 'wedding'}/${activeTheab.templateId || activeTheab.template_id || 'royal-gold'}` })}
                className="btn-secondary !py-2 !px-3.5 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-stone-600" />
                <span>មើលគំរូ</span>
              </button>
              <button
                onClick={() => navigate({ to: '/wedding' })}
                className="btn-secondary !py-2 !px-3.5 text-xs flex items-center gap-1.5 text-rose-900 cursor-pointer"
                title="ស្វែងរក និងជ្រើសរើសគំរូធៀបផ្សេងទៀត"
              >
                <Compass className="w-3.5 h-3.5 text-rose-800" />
                <span>ជ្រើសរើសគំរូផ្សេង</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* First-Time User Template Discovery Hero */
        <div className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 mb-6 sm:mb-8 text-center animate-fade">
          <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 text-theabCrimson flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6 text-theabCrimson" />
          </div>
          <h2 className="font-moul text-base sm:text-lg text-rose-950 mb-1">
            សូមស្វាគមន៍! អ្នកមិនទាន់បានជ្រើសរើសគំរូធៀបនៅឡើយទេ
          </h2>
          <p className="text-xs text-stone-500 max-w-md mx-auto mb-6 leading-relaxed">
            សូមជ្រើសរើសគំរូដែលលោកអ្នកពេញចិត្តខាងក្រោម ដើម្បីចាប់ផ្តើមរៀបចំ និងកែសម្រួលព័ត៌មានមង្គលការរបស់អ្នក៖
          </p>

          {/* 3 Quick Highlighted Templates */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl mx-auto mb-6 text-left">
            <div
              onClick={() => navigate({ to: '/customize/royal-gold' })}
              className="p-3.5 rounded-xl border border-stone-200 hover:border-theabCrimson bg-stone-50 hover:bg-white transition cursor-pointer group"
            >
              <div className="text-xs font-bold text-stone-900 group-hover:text-theabCrimson">
                រាជរដ្ឋមាស (Royal Gold)
              </div>
              <div className="text-[11px] text-amber-700 font-medium mt-0.5">ប្រពៃណីបុរាណ</div>
              <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                រចនាបទហូលផាមួងពណ៌មាសប្រណិត និងផ្កាចានស្លាដក
              </p>
              <span className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-bold text-theabCrimson">
                <span>ជ្រើសរើសគំរូនេះ</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => navigate({ to: '/customize/floral-romdoul-moonlight' })}
              className="p-3.5 rounded-xl border border-stone-200 hover:border-theabCrimson bg-stone-50 hover:bg-white transition cursor-pointer group"
            >
              <div className="text-xs font-bold text-stone-900 group-hover:text-theabCrimson">
                រំដួលរាត្រី (Romdoul Moonlight)
              </div>
              <div className="text-[11px] text-rose-700 font-medium mt-0.5">ផ្កាស្រស់រ៉ូមែនទិក</div>
              <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                ផ្ការំដួលពណ៌សក្សី និងពន្លឺចន្ទ្រារ៉ូមែនទិក
              </p>
              <span className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-bold text-theabCrimson">
                <span>ជ្រើសរើសគំរូនេះ</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>

            <div
              onClick={() => navigate({ to: '/customize/emerald-jade' })}
              className="p-3.5 rounded-xl border border-stone-200 hover:border-theabCrimson bg-stone-50 hover:bg-white transition cursor-pointer group"
            >
              <div className="text-xs font-bold text-stone-900 group-hover:text-theabCrimson">
                ត្បូងមរកត (Emerald Jade)
              </div>
              <div className="text-[11px] text-emerald-700 font-medium mt-0.5">ត្បូងមរតកសិរី</div>
              <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                ពណ៌បៃតងត្បូងមរកត រំលេចខ្សែលោហធាតុពណ៌មាស
              </p>
              <span className="inline-flex items-center gap-1 mt-2.5 text-[11px] font-bold text-theabCrimson">
                <span>ជ្រើសរើសគំរូនេះ</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate({ to: '/wedding' })}
            className="btn-primary !py-2.5 !px-5 text-xs text-white cursor-pointer inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>ស្វែងរកគំរូធៀបទាំងអស់ (២៨+ គំរូ)</span>
          </button>
        </div>
      )}

      {/* Navigation Tabs (Guests Attendance vs Blessings & Wishes) */}
      <div className="flex items-center gap-2 mb-4 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('guests')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'guests'
              ? 'border-b-2 border-theabCrimson text-theabCrimson'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>បញ្ជីវត្តមានភ្ញៀវ ({filteredRsvps.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('wishes')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'wishes'
              ? 'border-b-2 border-theabCrimson text-theabCrimson'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-600" />
          <span>កម្រងពាក្យជូនពរពីភ្ញៀវ ({wishesList.length})</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'guests' ? (
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
      ) : (
        /* Guest Blessings & Wishes Feed Tab */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mb-8 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-moul text-sm sm:text-base text-rose-950">
                កម្រងពាក្យជូនពរ និងប្រសិទ្ធពរជ័យ
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                សារពរជ័យដ៏កក់ក្តៅពីភ្ញៀវកិត្តិយសទាំងអស់
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-xs font-bold text-rose-900">
              {wishesList.length} សារជូនពរ
            </span>
          </div>

          {wishesList.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs">
              <Heart className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              មិនទាន់មានពាក្យជូនពរនៅឡើយទេ
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {wishesList.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-stone-100 bg-stone-50/60 hover:bg-stone-50 transition"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-xs sm:text-sm text-stone-800">
                      {item.guest_name}
                    </span>
                    <span className="text-[11px] text-stone-400">
                      {item.created_at ? new Date(item.created_at).toLocaleDateString('km-KH') : 'ទើបតែផ្ញើ'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{item.wishes}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
