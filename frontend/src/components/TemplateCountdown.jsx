import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

/**
 * Reusable Live Countdown Timer (date & time countdown)
 * for Wedding Invitation Templates.
 */
export function TemplateCountdown({
  targetDate,
  isDark = false,
  accentColor = '#D4AF37',
  fontFamily = 'font-komutt',
  className = ''
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 8,
    minutes: 42,
    seconds: 15
  });

  useEffect(() => {
    // Default to future wedding date if not provided
    const target = targetDate ? new Date(targetDate).getTime() : new Date(Date.now() + 18 * 86400000 + 8 * 3600000).getTime();

    const updateTimer = () => {
      const diff = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: 'ថ្ងៃ' },
    { value: String(timeLeft.hours).padStart(2, '0'), label: 'ម៉ោង' },
    { value: String(timeLeft.minutes).padStart(2, '0'), label: 'នាទី' },
    { value: String(timeLeft.seconds).padStart(2, '0'), label: 'វិនាទី' }
  ];

  return (
    <section className={`px-4 py-6 text-center ${className}`}>
      <div className="max-w-md mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-4 h-4" style={{ color: accentColor }} />
          <h3 className={`${fontFamily} text-xs sm:text-sm font-bold tracking-wider uppercase`} style={{ color: accentColor }}>
            រាប់ថយក្រោយដល់ថ្ងៃសិរីមង្គល
          </h3>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {units.map((unit, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl border text-center transition-all ${
                isDark
                  ? 'bg-slate-950/80 border-white/10 text-white'
                  : 'bg-white/90 border-stone-200 text-stone-900'
              }`}
            >
              <span className="block font-mono text-lg sm:text-2xl font-bold tracking-tight" style={{ color: accentColor }}>
                {unit.value}
              </span>
              <span className={`block text-[11px] font-suwannaphum mt-0.5 ${
                isDark ? 'text-slate-400' : 'text-stone-500'
              }`}>
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TemplateCountdown;

