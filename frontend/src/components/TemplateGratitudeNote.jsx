import React from 'react';
import { Award } from 'lucide-react';

/**
 * Reusable Gratitude & Apology (អរគុណ & អធ្យាស្រ័យ) Section
 * for Wedding Invitation Templates.
 */
export function TemplateGratitudeNote({
  isDark = false,
  accentColor = '#D4AF37',
  fontFamily = 'font-komutt',
  className = ''
}) {
  return (
    <section className={`px-4 py-6 text-center ${className}`}>
      <div className={`p-6 rounded-3xl border ${
        isDark 
          ? 'bg-slate-950/70 border-white/15 text-slate-200' 
          : 'bg-white/90 border-stone-200 text-stone-800'
      }`}>
        <div 
          className="w-10 h-10 rounded-full border flex items-center justify-center mx-auto mb-3"
          style={{ 
            borderColor: `${accentColor}60`,
            backgroundColor: isDark ? `${accentColor}15` : `${accentColor}10`,
            color: accentColor
          }}
        >
          <Award className="w-5 h-5" />
        </div>

        <h3 className={`${fontFamily} text-base sm:text-lg font-bold mb-3`} style={{ color: accentColor }}>
          អរគុណ & អធ្យាស្រ័យ
        </h3>

        <div className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed max-w-md mx-auto">
          <p>
            យើងខ្ញុំជាមាតាបិតា និងគូស្វាមីភរិយាថ្មី សូមថ្លែងអំណរគុណយ៉ាងជ្រាលជ្រៅបំផុត ចំពោះវត្តមានដ៏ឧត្តុង្គឧត្តមរបស់ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា ដែលបានចំណាយពេលវេលាដ៏មានតម្លៃអញ្ជើញចូលរួមជាអធិបតី និងប្រសិទ្ធពរជ័យក្នុងពិធីមង្គលនេះ។
          </p>
          <p className="italic font-medium opacity-90" style={{ color: accentColor }}>
            «ប្រសិនបើមានការខ្វះខាត ឬទទួលបដិសណ្ឋារកិច្ចមិនបានដិតដល់ត្រង់ចំណុចណាមួយ សូមមេត្តាខន្តី និងអធ្យាស្រ័យដោយក្តីអនុគ្រោះ។»
          </p>
        </div>
      </div>
    </section>
  );
}

export default TemplateGratitudeNote;

