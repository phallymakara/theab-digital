import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Copy, Download, Check } from 'lucide-react';

export function QrModal() {
  const { isQrModalOpen, setIsQrModalOpen, invitationData, addToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isQrModalOpen) return null;

  const slug = invitationData?.slug || 'vibol-sovanndy';
  const invitationId = invitationData?.id || 1;
  const shareUrl = `${window.location.origin}/invitation/${slug}`;
  const qrSrc = `/api/v1/invitations/${invitationId}/qr`;
  const fallbackQr = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(shareUrl)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      addToast('បានចម្លងតំណភ្ជាប់ធៀបដោយជោគជ័យ!', 'success');
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      addToast('មិនអាចចម្លងតំណភ្ជាប់បានទេ', 'warning');
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade"
      onClick={() => setIsQrModalOpen(false)}
    >
      <div
        className="bg-white rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl border-2 border-amber-300 relative text-center khmer-pattern animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsQrModalOpen(false)}
          className="absolute top-4 right-4 text-stone-400 hover:text-rose-900 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-rose-900 to-rose-950 text-amber-300 flex items-center justify-center font-moul text-xl mx-auto mb-3 shadow-md border border-amber-400/40 animate-glow-pulse">
          ធ
        </div>
        <h3 className="font-moul text-base text-rose-950 mb-1">
          QR Code លិខិតអញ្ជើញ
        </h3>
        <p className="text-xs text-stone-500 mb-5">
          ស្កេនដើម្បីបើកមើលធៀបឌីជីថលភ្លាមៗ ឬទាញយករូបភាពសម្រាប់ព្រីន
        </p>

        {/* QR Code Image Box */}
        <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-sm inline-block mb-4 hover:scale-105 transition-transform duration-300">
          <img
            src={qrSrc}
            alt="Digital Theab QR Code"
            className="w-48 h-48 object-contain mx-auto rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackQr;
            }}
          />
        </div>

        {/* Share Link Box */}
        <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 truncate mb-4 font-mono select-all text-center">
          {shareUrl}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className="btn-secondary !py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">បានចម្លង!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>ចម្លង Link</span>
              </>
            )}
          </button>
          <a
            href={qrSrc}
            download="digital-theab-qr.png"
            className="btn-primary !py-2 text-xs flex items-center justify-center gap-1.5 text-white no-underline cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ទាញយក QR</span>
          </a>
        </div>
      </div>
    </div>
  );
}
