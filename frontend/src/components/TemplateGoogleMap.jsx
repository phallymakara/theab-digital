import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

/**
 * Cambodia & Phnom Penh Venue Coordinates Directory
 */
const CAMBODIA_PHNOM_PENH_VENUES = [
  { match: /សែនសុខ|sen sok|premier/i, lat: 11.59365, lng: 104.88149 },
  { match: /សូហ្វីតែល|sofitel/i, lat: 11.54783, lng: 104.93513 },
  { match: /រ៉ូសវូដ|rosewood|វឌ្ឍនៈ|vattanac/i, lat: 11.57292, lng: 104.91978 },
  { match: /ហៃយ៉ាត់|hyatt/i, lat: 11.56583, lng: 104.93122 },
  { match: /កោះពេជ្រ|koh pich|diamond island/i, lat: 11.54920, lng: 104.93950 },
  { match: /ណាហ្គា|naga/i, lat: 11.55280, lng: 104.93850 },
  { match: /ទន្លេបាសាក់|bassac|ចំការមន|chamkarmon/i, lat: 11.54783, lng: 104.93513 },
  { match: /ដូនពេញ|daun penh/i, lat: 11.56583, lng: 104.93122 },
  { match: /ភ្នំពេញថ្មី|phnom penh thmey/i, lat: 11.59365, lng: 104.88149 }
];

// Phnom Penh Capital Center default coordinates (Cambodia)
const PHNOM_PENH_DEFAULT = { lat: 11.5564, lng: 104.9282 };

/**
 * Reusable Google Map Display Section for all Invitation Templates.
 * Centered on Cambodia / Phnom Penh latitude and longitude.
 * Displays embedded interactive Google Map, exact address below, and navigation button.
 */
export function TemplateGoogleMap({
  locationName = 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)',
  address = 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ',
  latitude,
  longitude,
  googleMapsUrl,
  isDark = false,
  accentColor = '#D4AF37',
  fontFamily = 'font-komutt',
  className = ''
}) {
  // Resolve Cambodia / Phnom Penh latitude and longitude
  let resolvedLat = latitude;
  let resolvedLng = longitude;

  if (!resolvedLat || !resolvedLng) {
    const combined = `${locationName} ${address}`;
    const found = CAMBODIA_PHNOM_PENH_VENUES.find(v => v.match.test(combined));
    if (found) {
      resolvedLat = found.lat;
      resolvedLng = found.lng;
    } else {
      resolvedLat = PHNOM_PENH_DEFAULT.lat;
      resolvedLng = PHNOM_PENH_DEFAULT.lng;
    }
  }

  // Google Maps embed URL centered on Cambodia / Phnom Penh Lat/Lng
  const embedUrl = `https://maps.google.com/maps?q=${resolvedLat},${resolvedLng}&hl=km&z=16&t=m&output=embed`;
  const directMapsUrl = googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${resolvedLat},${resolvedLng}`;

  // Defer heavy Google Maps iframe until user scrolls within proximity (saves 30MB-50MB RAM on initial load)
  const [isNearViewport, setIsNearViewport] = React.useState(false);
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '350px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
        {/* 2. Embedded Google Maps Display Centered on Phnom Penh, Cambodia with Lazy Viewport Injection */}
        <div
          ref={containerRef}
          className={`w-full h-56 sm:h-72 rounded-xl overflow-hidden border mb-4 relative ${
            isDark ? 'border-white/10 bg-slate-900' : 'border-stone-200 bg-stone-100'
          }`}
        >
          {isNearViewport ? (
            <iframe
              title={`Google Map - ${locationName}`}
              src={embedUrl}
              className="w-full h-full border-0 filter contrast-105 animate-fade"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
              <div
                className="w-11 h-11 rounded-full border flex items-center justify-center mb-2 animate-pulse"
                style={{
                  borderColor: `${accentColor}40`,
                  backgroundColor: isDark ? `${accentColor}15` : `${accentColor}10`,
                  color: accentColor
                }}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-stone-500'}`}>
                កំពុងរៀបចំផែនទី Google Maps...
              </span>
            </div>
          )}
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
