import React from 'react';
import { useRouterState, useNavigate, Link } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { QrCode, Share2 } from 'lucide-react';

export function Header() {
  const routerState = useRouterState();
  const navigate = useNavigate();
  const { setIsQrModalOpen, addToast, ceremonyType } = useApp();

  const currentPath = routerState.location.pathname;

  // As specifically requested: Hide header on Step 1 (/) and Step 2 (/wedding, /engagement, /housewarming)
  const isTemplateOrHome = ['/', '/wedding', '/engagement', '/housewarming'].includes(currentPath);
  if (isTemplateOrHome) {
    return null;
  }

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'លិខិតអញ្ជើញឌីជីថល (Digital Theab)',
        text: 'សូមគោរពអញ្ជើញចូលរួមជាភ្ញៀវកិត្តិយសក្នុងកម្មវិធីរបស់យើងខ្ញុំ',
        url: url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url).then(() => {
        addToast('បានចម្លងតំណភ្ជាប់ចែករំលែកដោយជោគជ័យ!', 'success');
      });
    }
  };

  const getCeremonyRoute = () => {
    if (ceremonyType === 'engagement') return '/engagement';
    if (ceremonyType === 'housewarming') return '/housewarming';
    return '/wedding';
  };

  return (
    <div className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-sm animate-fade">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div
          onClick={() => navigate({ to: '/' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img
            src="/logo/theab_digital.png"
            alt="Digital Theab Logo"
            className="w-10 h-10 object-contain drop-shadow-xs group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="font-moul text-base tracking-wide text-theabCrimson block leading-tight">
              ឌីជីថលធៀប
            </span>
            <span className="text-xs text-stone-500 block font-sans">
              Digital Theab Platform
            </span>
          </div>
        </div>

        {/* Step Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1.5 text-xs sm:text-sm bg-stone-50 p-1 rounded-xl border border-stone-200">
          <Link
            to="/"
            className="step-nav-btn text-stone-600 hover:text-theabCrimson py-1 px-2.5 rounded-lg transition"
          >
            ១. ជ្រើសរើសកម្មវិធី
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            to={getCeremonyRoute()}
            className="step-nav-btn text-stone-600 hover:text-theabCrimson py-1 px-2.5 rounded-lg transition"
          >
            ២. គំរូធៀប
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            to="/invitation"
            className={`step-nav-btn py-1 px-2.5 rounded-lg font-bold transition ${
              currentPath === '/invitation'
                ? 'bg-white text-theabCrimson shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-theabCrimson'
            }`}
          >
            ៣. ទម្រង់លិខិត & RSVP
          </Link>
          <span className="text-stone-300">/</span>
          <Link
            to="/dashboard"
            className={`step-nav-btn py-1 px-2.5 rounded-lg font-bold transition ${
              currentPath === '/dashboard'
                ? 'bg-white text-theabCrimson shadow-xs border border-stone-200'
                : 'text-stone-600 hover:text-theabCrimson'
            }`}
          >
            ៤. ផ្ទាំងគ្រប់គ្រង
          </Link>
        </nav>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="btn-secondary !py-2 !px-3 text-xs flex items-center gap-1.5 cursor-pointer"
            title="ទាញយក QR Code"
          >
            <QrCode className="w-4 h-4 text-theabCrimson" />
            <span className="hidden sm:inline">QR Code</span>
          </button>
          <button
            onClick={handleShare}
            className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1.5 cursor-pointer text-white"
            title="ចែករំលែកធៀប"
          >
            <Share2 className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">ចែករំលែកធៀប</span>
          </button>
        </div>
      </div>

      {/* Mobile Steps Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-stone-100 py-1.5 bg-stone-50 text-xs">
        <Link
          to="/"
          className="px-2 py-1 text-stone-500 hover:text-theabCrimson"
        >
          ១. កម្មវិធី
        </Link>
        <Link
          to={getCeremonyRoute()}
          className="px-2 py-1 text-stone-500 hover:text-theabCrimson"
        >
          ២. គំរូធៀប
        </Link>
        <Link
          to="/invitation"
          className={`px-2 py-1 ${
            currentPath === '/invitation'
              ? 'text-theabCrimson font-bold border-b-2 border-theabCrimson'
              : 'text-stone-500'
          }`}
        >
          ៣. RSVP
        </Link>
        <Link
          to="/dashboard"
          className={`px-2 py-1 ${
            currentPath === '/dashboard'
              ? 'text-theabCrimson font-bold border-b-2 border-theabCrimson'
              : 'text-stone-500'
          }`}
        >
          ៤. ស្ថិតិ
        </Link>
      </div>
    </div>
  );
}
