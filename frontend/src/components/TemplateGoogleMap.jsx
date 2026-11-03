import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

/**
 * Reusable Google Map Display Section for all Invitation Templates.
 * Renders an embedded interactive Google Map, with the full venue address
 * cleanly displayed as text directly below the map, along with a direct button
 * to open the location in Google Maps.
 */
export function TemplateGoogleMap({
  locationName = 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)',
  address = 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ',
  googleMapsUrl,
  isDark = false,
  accentColor = '#D4AF37',
  fontFamily = 'font-komutt',
  className = ''
}) {
  // Construct search query from venue and address
  const searchQuery = [locationName, address].filter(Boolean).join(', ') || 'The Premier Centre Sen Sok, Phnom Penh';
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(searchQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const directMapsUrl = googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(searchQuery)}`;

  return (
    <section className={`w-full max-w-full my-6 text-center ${className}`}>
      {/* 1. Header with Pin Icon */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <MapPin className="w-5 h-5 shrink-0" style={{ color: accentColor }} />
        <h3 className={`${fontFamily} text-base sm:text-lg font-bold tracking-wide`} style={{ color: accentColor }}>
          ទីតាំងប្រារព្ធពិធីមង្គល
        </h3>
      </div>

      <div className={`w-full rounded-2xl p-4 sm:p-5 border transition-all text-left ${
        isDark ? 'bg-slate-950/90 border-white/15 text-white' : 'bg-white/95 border-stone-200 text-stone-900'
      }`}>
        {/* 2. Embedded Google Maps Display */}
        <div className={`w-full h-56 sm:h-72 rounded-xl overflow-hidden border mb-4 ${
          isDark ? 'border-white/10 bg-slate-900' : 'border-stone-200 bg-stone-100'
        }`}>
          <iframe
            title={`Google Map - ${locationName}`}
            src={embedUrl}
            className="w-full h-full border-0 filter contrast-105"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* 3. Venue & Address Text Display (Directly below Google Map) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} />
              <div>
                <h4 className={`${fontFamily} text-sm sm:text-base font-bold leading-snug`}>
                  {locationName}
                </h4>
                <p className={`text-xs sm:text-[13px] leading-relaxed mt-0.5 ${
                  isDark ? 'text-slate-300' : 'text-stone-600'
                }`}>
                  {address}
                </p>
              </div>
            </div>
          </div>

          {/* 4. Action Button: Direct to Google Maps */}
          <a
            href={directMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 shrink-0 self-start sm:self-center"
            style={{
              backgroundColor: accentColor,
              color: isDark ? '#020617' : '#FFFFFF'
            }}
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>បើកមើលលើ Google Maps</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default TemplateGoogleMap;
