import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import {
  Users,
  Mail,
  Calendar,
  Heart,
  Search,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  ArrowLeft,
  ExternalLink,
  Eye,
  CheckCircle2,
  XCircle,
  Sparkles
} from 'lucide-react';

export function SuperAdminPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [metrics, setMetrics] = useState({
    total_users: 0,
    active_users: 0,
    total_invitations: 0,
    published_invitations: 0,
    total_rsvps: 0,
    total_attending_guests: 0,
    total_wishes: 0,
    ceremony_stats: {}
  });

  const [users, setUsers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'invitations'
  const [searchUser, setSearchUser] = useState('');
  const [searchInv, setSearchInv] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const isSuperAdmin = user && (user.is_superuser || user.role === 'superadmin');

  const fetchData = useCallback(async () => {
    if (!isAuthenticated || !isSuperAdmin) return;
    setIsLoading(true);
    setErrorMsg('');

    try {
      const [metricsData, usersData, invsData] = await Promise.all([
        apiService.getAdminMetrics(),
        apiService.getAdminUsers(),
        apiService.getAdminInvitations()
      ]);

      if (metricsData) setMetrics(metricsData);
      if (Array.isArray(usersData)) setUsers(usersData);
      if (Array.isArray(invsData)) setInvitations(invsData);
    } catch (err) {
      console.warn('Superadmin fetch error:', err);
      setErrorMsg(err.message || 'មិនអាចទាញយកទិន្នន័យបានទេ');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [isAuthenticated, isSuperAdmin]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchData();
  };

  // Filter users by search
  const filteredUsers = users.filter((u) => {
    if (!searchUser.trim()) return true;
    const q = searchUser.toLowerCase().trim();
    return (
      (u.full_name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.phone && String(u.phone).includes(q))
    );
  });

  // Filter invitations by search
  const filteredInvs = invitations.filter((inv) => {
    if (!searchInv.trim()) return true;
    const q = searchInv.toLowerCase().trim();
    return (
      (inv.slug || '').toLowerCase().includes(q) ||
      (inv.groom_name || '').toLowerCase().includes(q) ||
      (inv.bride_name || '').toLowerCase().includes(q) ||
      (inv.owner_email || '').toLowerCase().includes(q)
    );
  });

  // Access Denied / Not Authenticated Screen
  if (!isAuthenticated) {
    return (
      <section className="container-max py-12 flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade">
        <div className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="font-moul text-lg sm:text-xl text-stone-900 mb-2">
          សូមចូលប្រើប្រាស់គណនី Super Admin
        </h2>
        <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
          ទំព័រនេះត្រូវបានការពារយ៉ាងតឹងរ៉ឹងសម្រាប់តែអ្នកគ្រប់គ្រងជាន់ខ្ពស់ប៉ុណ្ណោះ។ សូមចូលគណនីរបស់អ្នកដើម្បីបន្ត។
        </p>
        <button
          onClick={() => openAuthModal()}
          className="btn-primary !py-2.5 !px-6 text-xs text-white cursor-pointer"
        >
          ចូលប្រើប្រាស់គណនី
        </button>
      </section>
    );
  }

  if (!isSuperAdmin) {
    return (
      <section className="container-max py-12 flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade">
        <div className="w-14 h-14 rounded-full bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="font-moul text-lg sm:text-xl text-stone-900 mb-2">
          អ្នកមិនមានសិទ្ធិចូលទំព័រនេះទេ
        </h2>
        <p className="text-xs text-stone-500 max-w-sm mb-6 leading-relaxed">
          គណនីរបស់អ្នក ({user.email}) មិនមែនជា Super Administrator ឡើយ។
        </p>
        <button
          onClick={() => navigate({ to: '/' })}
          className="btn-secondary !py-2.5 !px-6 text-xs cursor-pointer"
        >
          ត្រឡប់ទៅទំព័រដើម
        </button>
      </section>
    );
  }

  return (
    <section className="container-max py-4 sm:py-6 md:py-8 animate-fade">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              <span>SUPER ADMIN CONSOLE</span>
            </span>
          </div>
          <h1 className="font-moul text-lg sm:text-xl md:text-2xl text-rose-950 leading-normal">
            ផ្ទាំងគ្រប់គ្រងប្រព័ន្ធ Digital Theab
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            តាមដានចំនួនអ្នកចុះឈ្មោះប្រើប្រាស់ ស្ថិតិធៀប និងការរីកចម្រើននៃប្រព័ន្ធ
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="btn-secondary !py-2 !px-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            title="ធ្វើបច្ចុប្បន្នភាពទិន្នន័យ"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-stone-600 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>ផ្ទុកឡើងវិញ</span>
          </button>
          <button
            onClick={() => navigate({ to: '/' })}
            className="btn-secondary !py-2 !px-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-stone-600" />
            <span>ទំព័រដើម</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 p-3 rounded-xl border border-rose-200 bg-rose-50 text-xs text-rose-700">
          {errorMsg}
        </div>
      )}

      {/* Platform KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs text-stone-500 font-medium">អ្នកចុះឈ្មោះសរុប</span>
            <Users className="w-4 h-4 text-rose-900" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-moul text-rose-950">
            {metrics.total_users}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">
            សកម្ម: {metrics.active_users} នាក់
          </div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs text-stone-500 font-medium">ធៀបបានបង្កើត</span>
            <Calendar className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-moul text-emerald-700">
            {metrics.total_invitations}
          </div>
          <div className="text-[11px] text-stone-500 font-medium mt-1">
            ផ្សព្វផ្សាយ: {metrics.published_invitations}
          </div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs text-stone-500 font-medium">ភ្ញៀវបានឆ្លើយតប</span>
            <Mail className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-moul text-blue-700">
            {metrics.total_rsvps}
          </div>
          <div className="text-[11px] text-stone-500 font-medium mt-1">
            ចូលរួម: {metrics.attending_parties} | មិនចូលរួម: {metrics.declined_parties}
          </div>
        </div>

        <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] sm:text-xs text-stone-500 font-medium">ភ្ញៀវចូលរួមជាក់ស្តែង</span>
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-moul text-rose-800">
            {metrics.total_attending_guests} នាក់
          </div>
          <div className="text-[11px] text-stone-500 font-medium mt-1">
            ពាក្យជូនពរ: {metrics.total_wishes}
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 mb-4 border-b border-stone-200">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'users'
              ? 'border-b-2 border-theabCrimson text-theabCrimson'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>បញ្ជីអ្នកប្រើប្រាស់ ({filteredUsers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('invitations')}
          className={`flex items-center gap-1.5 pb-2.5 px-3 text-xs sm:text-sm font-bold transition cursor-pointer ${
            activeTab === 'invitations'
              ? 'border-b-2 border-theabCrimson text-theabCrimson'
              : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>ធៀបដែលកំពុងដំណើរការ ({filteredInvs.length})</span>
        </button>
      </div>

      {/* Tab: Registered Users */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mb-8">
          {/* Search bar */}
          <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50/50 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="ស្វែងរកឈ្មោះ អ៊ីមែល ឬលេខទូរស័ព្ទ..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-rose-900"
              />
            </div>
          </div>

          {/* Mobile Users List */}
          <div className="md:hidden divide-y divide-stone-100">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-stone-400 text-xs">
                មិនមានទិន្នន័យត្រូវគ្នានឹងការស្វែងរកឡើយ
              </div>
            ) : (
              filteredUsers.map((u) => (
                <div key={u.id} className="p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-stone-900">
                      {u.full_name}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      u.role === 'superadmin' ? 'bg-amber-100 text-amber-900' : 'bg-stone-100 text-stone-700'
                    }`}>
                      {u.role}
                    </span>
                  </div>
                  <div className="text-xs text-stone-600 truncate">{u.email}</div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>{u.phone || 'គ្មានលេខទូរស័ព្ទ'}</span>
                    <span>ធៀប: {u.invitations_count} | {new Date(u.created_at).toLocaleDateString('km-KH')}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Users Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-bold">
                  <th className="py-3 px-4">អត្តសញ្ញាណ</th>
                  <th className="py-3 px-4">ឈ្មោះពេញ</th>
                  <th className="py-3 px-4">អ៊ីមែល</th>
                  <th className="py-3 px-4">លេខទូរស័ព្ទ</th>
                  <th className="py-3 px-4 text-center">តួនាទី</th>
                  <th className="py-3 px-4 text-center">ចំនួនធៀប</th>
                  <th className="py-3 px-4 text-right">កាលបរិច្ឆេទចុះឈ្មោះ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-8 text-stone-400 text-xs">
                      មិនមានទិន្នន័យត្រូវគ្នានឹងការស្វែងរកឡើយ
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-50 transition">
                      <td className="py-3 px-4 text-stone-400 font-mono">#{u.id}</td>
                      <td className="py-3 px-4 font-bold text-stone-800">{u.full_name}</td>
                      <td className="py-3 px-4 text-stone-600">{u.email}</td>
                      <td className="py-3 px-4 text-stone-500">{u.phone || '-'}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          u.role === 'superadmin' ? 'bg-amber-100 text-amber-900 border border-amber-200' : 'bg-stone-100 text-stone-700'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-bold text-theabCrimson">
                        {u.invitations_count}
                      </td>
                      <td className="py-3 px-4 text-right text-stone-400">
                        {new Date(u.created_at).toLocaleDateString('km-KH')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Digital Theabs */}
      {activeTab === 'invitations' && (
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden mb-8">
          {/* Search bar */}
          <div className="p-3 sm:p-4 border-b border-stone-200 bg-stone-50/50 flex items-center justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchInv}
                onChange={(e) => setSearchInv(e.target.value)}
                placeholder="ស្វែងរកតាម Slug ឬឈ្មោះកូនកំលោះ-ក្រមុំ..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-rose-900"
              />
            </div>
          </div>

          {/* Mobile Invitations List */}
          <div className="md:hidden divide-y divide-stone-100">
            {filteredInvs.length === 0 ? (
              <div className="text-center py-8 text-stone-400 text-xs">
                មិនមានទិន្នន័យត្រូវគ្នានឹងការស្វែងរកឡើយ
              </div>
            ) : (
              filteredInvs.map((inv) => (
                <div key={inv.id} className="p-3.5 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                      {inv.groom_name} & {inv.bride_name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-rose-50 text-rose-800 font-bold capitalize">
                      {inv.event_type}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 font-mono truncate">
                    /{inv.slug} (គំរូ: {inv.template_id})
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-400">
                    <span>ម្ចាស់: {inv.owner_email}</span>
                    <span>ឆ្លើយតប: {inv.rsvps_count} | មើល: {inv.views_count}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Invitations Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-bold">
                  <th className="py-3 px-4">លេខសម្គាល់</th>
                  <th className="py-3 px-4">ម្ចាស់កម្មវិធី</th>
                  <th className="py-3 px-4">ប្រភេទកម្មវិធី</th>
                  <th className="py-3 px-4">គំរូ (Template)</th>
                  <th className="py-3 px-4">ម្ចាស់គណនី</th>
                  <th className="py-3 px-4 text-center">ចំនួនឆ្លើយតប</th>
                  <th className="py-3 px-4 text-center">ការបើកមើល</th>
                  <th className="py-3 px-4 text-right">កាលបរិច្ឆេទបង្កើត</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredInvs.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-8 text-stone-400 text-xs">
                      មិនមានទិន្នន័យត្រូវគ្នានឹងការស្វែងរកឡើយ
                    </td>
                  </tr>
                ) : (
                  filteredInvs.map((inv) => (
                    <tr key={inv.id} className="hover:bg-stone-50 transition">
                      <td className="py-3 px-4 text-stone-400 font-mono">#{inv.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-bold text-stone-800">
                          {inv.groom_name} & {inv.bride_name}
                        </div>
                        <span className="text-[11px] text-stone-400 font-mono">
                          /{inv.slug}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-800 capitalize">
                          {inv.event_type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-stone-600 font-mono">{inv.template_id}</td>
                      <td className="py-3 px-4 text-stone-600">{inv.owner_email}</td>
                      <td className="py-3 px-4 text-center font-bold text-emerald-700">
                        {inv.rsvps_count}
                      </td>
                      <td className="py-3 px-4 text-center text-stone-600">
                        {inv.views_count}
                      </td>
                      <td className="py-3 px-4 text-right text-stone-400">
                        {new Date(inv.created_at).toLocaleDateString('km-KH')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

