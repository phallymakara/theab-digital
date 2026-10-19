import { BaseView } from './BaseView.js';

export const CEREMONY_TEMPLATES = {
  wedding: [
    {
      id: 'royal-gold',
      name: 'មង្គលសិរីមាសប្រណិត',
      subtitle: 'Royal Golden Heritage',
      category: 'traditional',
      tag: 'ពេញនិយមបំផុត',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      themeColor: 'gold',
      primaryGradient: 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800',
      borderColor: '#D4AF37',
      badgeBg: 'bg-amber-500',
      description: 'រចនាបថប្រពៃណីខ្មែររាជវាំង រំលេចក្បាច់ភ្ញីទេសពណ៌មាសលើផ្ទៃក្រហមមង្គល យ៉ាងស័ក្តិសមឥតខ្ចោះសម្រាប់មង្គលការបែបប្រពៃណីខ្មែរដ៏រុងរឿង។',
      previewBg: 'bg-[#FCFAF6]',
      cardBorder: 'border-amber-300/80 hover:border-amber-500',
      features: ['ក្បាច់ភ្ញីទេសមាស', 'ភ្លេងមង្គលបុរាណ', 'ប្រព័ន្ធ RSVP ឆ្លាតវៃ', 'Google Maps']
    },
    {
      id: 'floral-romance',
      name: 'មនោសញ្ចេតនាផ្កាស្រស់',
      subtitle: 'Romantic Floral Romance',
      category: 'floral',
      tag: 'ផ្កាស្រស់រ៉ូមែនទិក',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-300',
      themeColor: 'crimson',
      primaryGradient: 'bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900',
      borderColor: '#881337',
      badgeBg: 'bg-rose-600',
      description: 'រចនាបថផ្ការំដួល និងផ្កាម្លិះស្រស់បំព្រង ផ្សំផ្គុំជាមួយពណ៌ផ្កាឈូកស្រាល និងក្រហមរំលេចភាពផ្អែមល្ហែម និងសេចក្តីស្រឡាញ់ដ៏បរិសុទ្ធ។',
      previewBg: 'bg-[#FFF9FA]',
      cardBorder: 'border-rose-200 hover:border-rose-400',
      features: ['ក្បាច់ផ្ការំដួល & ម្លិះ', 'កាលវិភាគពិធីមង្គល', 'រាប់ថយក្រោយ (Countdown)', 'ចែករំលែក Telegram']
    },
    {
      id: 'emerald-jade',
      name: 'ត្បូងមរកតសិរីសួស្តី',
      subtitle: 'Imperial Emerald Jade',
      category: 'emerald',
      tag: 'ថ្លៃថ្នូរប្រណិត',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      themeColor: 'emerald',
      primaryGradient: 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900',
      borderColor: '#059669',
      badgeBg: 'bg-emerald-600',
      description: 'រចនាបថពណ៌បៃតងត្បូងមរកត តំណាងឱ្យសេចក្តីសុខក្សេមក្សាន្ត ភាពត្រជាក់ត្រជុំ ថ្កុំថ្កើង និងសេចក្តីចម្រើនយូរអង្វែងនៃគូស្វាមីភរិយាថ្មី។',
      previewBg: 'bg-[#F4FBF7]',
      cardBorder: 'border-emerald-200 hover:border-emerald-400',
      features: ['ក្បាច់ឈូកមង្គល', 'តារាងកម្មវិធីព្រឹក-ល្ងាច', 'RSVP & ជូនពរឌីជីថល', 'គាំទ្រគ្រប់ទូរស័ព្ទ']
    },
    {
      id: 'modern-luxury',
      name: 'អភិជនទំនើប',
      subtitle: 'Chic Modern Minimalist',
      category: 'modern',
      tag: 'ទាន់សម័យ',
      tagColor: 'bg-stone-100 text-stone-800 border-stone-300',
      themeColor: 'gold',
      primaryGradient: 'bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900',
      borderColor: '#D4AF37',
      badgeBg: 'bg-stone-800',
      description: 'រចនាបថបែបទាន់សម័យ សាមញ្ញតែប្រណិត (Minimalist Chic) បង្ហាញភាពស៊ីវិល័យ ស្រឡះភ្នែក ងាយស្រួលអាន និងរហ័សទាន់ចិត្តលើទូរស័ព្ទដៃ។',
      previewBg: 'bg-[#FAF9F5]',
      cardBorder: 'border-stone-200 hover:border-theabGold',
      features: ['រចនាបថ Minimalist', 'QR Code ផ្ទាល់ខ្លួន', 'ផែនទីពិធីការ', 'ចំណុចប្រទាក់លឿន']
    },
    {
      id: 'angkor-heritage',
      name: 'កេរដំណែលប្រាសាទអង្គរ',
      subtitle: 'Angkorian Grandeur Heritage',
      category: 'heritage',
      tag: 'កេរដំណែលវប្បធម៌',
      tagColor: 'bg-amber-50 text-amber-950 border-amber-300',
      themeColor: 'crimson',
      primaryGradient: 'bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950',
      borderColor: '#B69225',
      badgeBg: 'bg-amber-800',
      description: 'រចនាបថលើកតម្កើងអរិយធម៌ខ្មែរដ៏មហិមា រំលេចក្បាច់ផ្កាចន្ទន៍ និងក្បាច់អង្គរបុរាណ សម្រាប់ពិធីមង្គលការដែលបង្កប់នូវមោទនភាពជាតិ។',
      previewBg: 'bg-[#FAF6EE]',
      cardBorder: 'border-amber-200 hover:border-amber-400',
      features: ['ក្បាច់អង្គរវត្តបុរាណ', 'ភ្លេងពិណពាទ្យប្រពៃណី', 'ពាក្យប្រសិទ្ធពរជ័យ', 'ទាញយក QR ព្រីន']
    },
    {
      id: 'crimson-classic',
      name: 'មង្គលក្រហមប្រពៃណី',
      subtitle: 'Classic Khmer Crimson',
      category: 'traditional',
      tag: 'ប្រពៃណីខ្មែរសុទ្ធ',
      tagColor: 'bg-rose-50 text-rose-950 border-rose-300',
      themeColor: 'crimson',
      primaryGradient: 'bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950',
      borderColor: '#881337',
      titleColor: '#881337',
      badgeBg: 'bg-rose-800',
      description: 'រចនាបថប្រពៃណីខ្មែរសុទ្ធសាធ ដោយប្រើប្រាស់ពណ៌ក្រហមឈាមជ្រូក និងអក្សរមូលធំៗ ស្របតាមក្បួនខ្នាតលិខិតអញ្ជើញមង្គលការខ្មែរតាំងពីបុរាណ។',
      previewBg: 'bg-[#FFFDFB]',
      bgImage: '/images/templates/crimson_classic_prewedding.jpg',
      hasFlyingFlowers: true,
      flyEffect: 'crimson-petals',
      cardStyle: 'crimson-classic',
      cardBorder: 'border-rose-300/80 hover:border-theabCrimson',
      demoGroom: 'ឈួន សម្បត្តិ',
      demoBride: 'កែវ រចនា',
      demoDate: 'ថ្ងៃសៅរ៍ ទី២៣ ខែមករា ឆ្នាំ២០២៧',
      features: ['អក្សរមូលប្រពៃណីខ្មែរ', 'ពាក្យពេចន៍មាតាបិតា', 'គ្រប់គ្រងភ្ញៀវឆ្លើយតប', 'ស្កេនចូលរួម']
    }
  ],

  engagement: [
    {
      id: 'betrothal-gold',
      name: 'មង្គលសិរី ស្តីដណ្តឹង',
      subtitle: 'Golden Betrothal Heritage',
      category: 'traditional',
      tag: 'ពេញនិយមបំផុត',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      themeColor: 'gold',
      primaryGradient: 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800',
      borderColor: '#D4AF37',
      badgeBg: 'bg-amber-500',
      description: 'រចនាបថប្រពៃណីខ្មែរសម្រាប់ពិធីស្តីដណ្តឹង និងសែនព្រេន រំលេចក្បាច់ភ្ញីទេសពណ៌មាសលើផ្ទៃក្រហមមង្គល យ៉ាងសមរម្យសម្រាប់កិច្ចសន្យាដំបូង។',
      previewBg: 'bg-[#FCFAF6]',
      cardBorder: 'border-amber-300/80 hover:border-amber-500',
      features: ['ក្បាច់ភ្ញីទេសមាស', 'ពិធីស្តីដណ្តឹង & សែនព្រេន', 'ប្រព័ន្ធ RSVP ឌីជីថល', 'ផែនទីគេហដ្ឋានខាងស្រី']
    },
    {
      id: 'areca-sacred',
      name: 'ផ្កាស្លាពិសិដ្ឋ',
      subtitle: 'Sacred Areca Flower Tradition',
      category: 'floral',
      tag: 'ប្រពៃណីបុរាណ',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-300',
      themeColor: 'crimson',
      primaryGradient: 'bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900',
      borderColor: '#881337',
      badgeBg: 'bg-rose-600',
      description: 'លើកតម្កើងពិធីជូនផ្កាស្លាពិសិដ្ឋតាមទំនៀមទម្លាប់ខ្មែរបុរាណ បង្ហាញភាពស្មោះស្ម័គ្រ និងកិត្តិយសថ្លៃថ្លានៃគ្រួសារទាំងសងខាង។',
      previewBg: 'bg-[#FFF9FA]',
      cardBorder: 'border-rose-200 hover:border-rose-400',
      features: ['ពិធីជូនផ្កាស្លាពិសិដ្ឋ', 'កាលវិភាគពិធីពេលព្រឹក', 'រាប់ថយក្រោយ (Countdown)', 'ចែករំលែក Telegram']
    },
    {
      id: 'promise-ring',
      name: 'ចិញ្ចៀនពេជ្រសច្ចា',
      subtitle: 'Diamond Promise Ring',
      category: 'modern',
      tag: 'ទាន់សម័យ',
      tagColor: 'bg-stone-100 text-stone-800 border-stone-300',
      themeColor: 'gold',
      primaryGradient: 'bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900',
      borderColor: '#D4AF37',
      badgeBg: 'bg-stone-800',
      description: 'រចនាបថទំនើបបែប Romance រំលេចរូបតំណាងចិញ្ចៀនភ្ជាប់ពាក្យ និងពាក្យសច្ចាប្រណិធានស្នេហារវាងគូដណ្តឹងទាំងពីរ។',
      previewBg: 'bg-[#FAF9F5]',
      cardBorder: 'border-stone-200 hover:border-theabGold',
      features: ['រូបតំណាងចិញ្ចៀនពេជ្រ', 'ទម្រង់ឆ្លើយតបងាយស្រួល', 'QR Code ផ្ទាល់ខ្លួន', 'ផែនទី Google Maps']
    },
    {
      id: 'emerald-blessing',
      name: 'មរកតជ័យមង្គល',
      subtitle: 'Emerald Auspicious Betrothal',
      category: 'emerald',
      tag: 'ថ្លៃថ្នូរប្រណិត',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      themeColor: 'emerald',
      primaryGradient: 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900',
      borderColor: '#059669',
      badgeBg: 'bg-emerald-600',
      description: 'ពណ៌បៃតងត្បូងមរកត តំណាងឱ្យភាពត្រជាក់ត្រជុំ និងការប្រសិទ្ធពរជ័យពីចាស់ទុំទាំងសងខាងក្នុងមង្គលពិធីស្តីដណ្តឹង។',
      previewBg: 'bg-[#F4FBF7]',
      cardBorder: 'border-emerald-200 hover:border-emerald-400',
      features: ['ក្បាច់ឈូកមង្គល', 'ពិធីសែនព្រេនដូនតា', 'RSVP & ជូនពរឌីជីថល', 'គាំទ្រគ្រប់ទូរស័ព្ទ']
    },
    {
      id: 'floral-romdoul',
      name: 'ផ្ការំដួលមនោសញ្ចេតនា',
      subtitle: 'Romdoul Romance',
      category: 'floral',
      tag: 'ផ្កាស្រស់រ៉ូមែនទិក',
      tagColor: 'bg-pink-100 text-pink-900 border-pink-300',
      themeColor: 'crimson',
      primaryGradient: 'bg-gradient-to-r from-pink-800 via-rose-700 to-rose-900',
      borderColor: '#BE123C',
      badgeBg: 'bg-pink-600',
      description: 'ផ្ការំដួលតំណាងជាតិខ្មែរ ផ្សំជាមួយក្បាច់ភ្ញីទន់ភ្លន់ បង្កើតបានជាលិខិតអញ្ជើញភ្ជាប់ពាក្យដ៏ស្រស់បំព្រង និងស្និទ្ធស្នាល។',
      previewBg: 'bg-[#FFFDFB]',
      cardBorder: 'border-pink-200 hover:border-pink-400',
      features: ['ក្បាច់ផ្ការំដួលស្រស់', 'ភ្លេងការខ្មែរពិរោះ', 'ពាក្យពេចន៍មាតាបិតា', 'ស្កេនចូលរួម']
    },
    {
      id: 'ancestral-classic',
      name: 'ពិធីសែនព្រេនដូនតា',
      subtitle: 'Ancestral Ceremony Classic',
      category: 'traditional',
      tag: 'ប្រពៃណីខ្មែរសុទ្ធ',
      tagColor: 'bg-rose-50 text-rose-950 border-rose-300',
      themeColor: 'crimson',
      primaryGradient: 'bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950',
      borderColor: '#881337',
      badgeBg: 'bg-rose-800',
      description: 'រចនាបថបែបប្រពៃណីខ្មែរសុទ្ធសាធ គោរពកិច្ចសែនព្រេនដូនតានិងព្រះភូមិ តាមគន្លងធម៌ និងទំនៀមពីបុរាណនៃពិធីភ្ជាប់ពាក្យ។',
      previewBg: 'bg-[#FAF6EE]',
      cardBorder: 'border-amber-200 hover:border-amber-400',
      features: ['ក្បាច់បុរាណខ្មែរ', 'ពាក្យប្រសិទ្ធពរជ័យ', 'ទាញយក QR ព្រីន', 'គាំទ្រទូរស័ព្ទ']
    }
  ],

  housewarming: [
    {
      id: 'prosperous-home',
      name: 'សិរីសួស្តី ឡើងគេហដ្ឋានថ្មី',
      subtitle: 'Prosperous New Home',
      category: 'traditional',
      tag: 'ពេញនិយមបំផុត',
      tagColor: 'bg-amber-100 text-amber-900 border-amber-300',
      themeColor: 'gold',
      primaryGradient: 'bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800',
      borderColor: '#D4AF37',
      badgeBg: 'bg-amber-500',
      description: 'រចនាបថអបអរសាទរផ្ទះថ្មី រំលេចរូបតំណាងគេហដ្ឋានមាសប្រណិត សិរីសួស្តី ជ័យមង្គល និងវិបុលសុខគ្រប់ប្រការសម្រាប់ម្ចាស់ផ្ទះថ្មី។',
      previewBg: 'bg-[#FCFAF6]',
      cardBorder: 'border-amber-300/80 hover:border-amber-500',
      features: ['រូបតំណាងគេហដ្ឋានមាស', 'ផែនទីបុរី / ទីតាំងផ្ទះ', 'ប្រព័ន្ធ RSVP ឆ្លាតវៃ', 'ពិធីឡើងផ្ទះ']
    },
    {
      id: 'monk-blessing',
      name: 'សូត្រមន្តឡើងផ្ទះមង្គល',
      subtitle: 'Blessing House Monks Ceremony',
      category: 'traditional',
      tag: 'សូត្រមន្តឡើងផ្ទះ',
      tagColor: 'bg-rose-100 text-rose-900 border-rose-300',
      themeColor: 'crimson',
      primaryGradient: 'bg-gradient-to-r from-rose-800 via-rose-700 to-rose-900',
      borderColor: '#881337',
      badgeBg: 'bg-rose-600',
      description: 'រចនាបថបែបពុទ្ធសាសនា និងប្រពៃណី រំលេចក្បាច់ផ្កាឈូក និងពាក្យប្រសិទ្ធពរជ័យសិរីសួស្តីពីព្រះសង្ឃក្នុងពិធីចម្រើនព្រះបរិត្ត។',
      previewBg: 'bg-[#FFF9FA]',
      cardBorder: 'border-rose-200 hover:border-rose-400',
      features: ['ពិធីសូត្រមន្តចម្រើនព្រះបរិត្ត', 'កាលវិភាគពិធីពេលព្រឹក', 'រាប់ថយក្រោយ (Countdown)', 'ចែករំលែក Telegram']
    },
    {
      id: 'golden-residence',
      name: 'គេហដ្ឋានមាសប្រណិត',
      subtitle: 'Golden Residence Luxury',
      category: 'modern',
      tag: 'ប្រណិតភាព',
      tagColor: 'bg-stone-100 text-stone-800 border-stone-300',
      themeColor: 'gold',
      primaryGradient: 'bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900',
      borderColor: '#D4AF37',
      badgeBg: 'bg-stone-800',
      description: 'រចនាបថមាសឆើតឆាយ សម្រាប់ពិធីសម្ពោធផ្ទះថ្មី ឬភូមិគ្រឹះប្រណិត ជាមួយព័ត៌មានទីតាំងច្បាស់លាស់ និងការអញ្ជើញយ៉ាងថ្លៃថ្នូរ។',
      previewBg: 'bg-[#FAF9F5]',
      cardBorder: 'border-stone-200 hover:border-theabGold',
      features: ['រចនាបថ Luxury Residence', 'QR Code ផ្ទាល់ខ្លួន', 'ផែនទី Google Maps', 'ពិសារអាហារសាមគ្គី']
    },
    {
      id: 'peaceful-villa',
      name: 'ភូមិគ្រឹះសុខសាន្ត',
      subtitle: 'Peaceful Villa Heritage',
      category: 'emerald',
      tag: 'ត្រជាក់ត្រជុំ',
      tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      themeColor: 'emerald',
      primaryGradient: 'bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900',
      borderColor: '#059669',
      badgeBg: 'bg-emerald-600',
      description: 'ពណ៌បៃតងត្បូងមរកត និងមាស បង្ហាញពីភាពសុខដុមរមនា ត្រជាក់ត្រជុំ និងភាពសុខសាន្តយូរអង្វែងនៃគេហដ្ឋានថ្មី។',
      previewBg: 'bg-[#F4FBF7]',
      cardBorder: 'border-emerald-200 hover:border-emerald-400',
      features: ['ពណ៌បៃតងសុខដុមរមនា', 'តារាងកម្មវិធីពិសាអាហារ', 'RSVP & ជូនពរឌីជីថល', 'គាំទ្រគ្រប់ទូរស័ព្ទ']
    },
    {
      id: 'smart-modern',
      name: 'គេហដ្ឋានទំនើបស៊ីវិល័យ',
      subtitle: 'Modern Chic Home Celebration',
      category: 'modern',
      tag: 'ទាន់សម័យ',
      tagColor: 'bg-amber-50 text-amber-950 border-amber-300',
      themeColor: 'gold',
      primaryGradient: 'bg-gradient-to-r from-amber-800 via-stone-800 to-amber-900',
      borderColor: '#B69225',
      badgeBg: 'bg-amber-700',
      description: 'រចនាបថ Minimalist ទំនើប ស្រឡះភ្នែក រហ័ស និងទាក់ទាញ ងាយស្រួលអានលើទូរស័ព្ទដៃ និងងាយស្រួលចែករំលែក។',
      previewBg: 'bg-[#FAF6EE]',
      cardBorder: 'border-amber-200 hover:border-amber-400',
      features: ['រចនាបថ Smart Modern', 'ផែនទី GPS ផ្ទះថ្មី', 'ទាញយក QR ព្រីន', 'គាំទ្រទូរស័ព្ទ']
    },
    {
      id: 'grand-opening',
      name: 'សម្ពោធផ្ទះសិរីមង្គល',
      subtitle: 'Grand Opening Auspicious Home',
      category: 'traditional',
      tag: 'ប្រពៃណីខ្មែរសុទ្ធ',
      tagColor: 'bg-rose-50 text-rose-950 border-rose-300',
      themeColor: 'crimson',
      primaryGradient: 'bg-gradient-to-r from-rose-950 via-rose-900 to-rose-950',
      borderColor: '#881337',
      badgeBg: 'bg-rose-800',
      description: 'រចនាបថក្រហមមង្គលបុរាណ អមដោយពាក្យអញ្ជើញពិសាអាហារសាមគ្គី និងការជួបជុំញាតិមិត្តជិតឆ្ងាយក្នុងឱកាសឡើងផ្ទះថ្មី។',
      previewBg: 'bg-[#FFFDFB]',
      cardBorder: 'border-rose-300/80 hover:border-theabCrimson',
      features: ['អក្សរមូលប្រពៃណី', 'ពាក្យពេចន៍ម្ចាស់ផ្ទះ', 'គ្រប់គ្រងភ្ញៀវឆ្លើយតប', 'ស្កេនចូលរួម']
    }
  ]
};

export const WEDDING_TEMPLATES = CEREMONY_TEMPLATES.wedding;

export class Step2WeddingTemplatesView extends BaseView {
  constructor(containerId, handlers) {
    super(containerId);
    this.handlers = handlers || {};
    // handlers: { onSelectTemplate, onPrev, onPreviewTemplate, onToggleAudio }
    this.activeCategory = 'all';
    this.previewModalTemplate = null;
  }

  getTitle(ceremonyType) {
    if (ceremonyType === 'engagement') return 'ជ្រើសរើសគំរូធៀបភ្ជាប់ពាក្យ';
    if (ceremonyType === 'housewarming') return 'ជ្រើសរើសគំរូធៀបឡើងគេហដ្ឋាន';
    return 'ជ្រើសរើសគំរូធៀបមង្គលការ';
  }

  getMonogram(ceremonyType) {
    if (ceremonyType === 'engagement') return 'ភ';
    if (ceremonyType === 'housewarming') return 'ហ';
    return 'ធ';
  }

  render(invitationData, currentTheme = 'crimson', isAudioPlaying = false) {
    if (!this.container) return;
    const data = invitationData || {};
    const ceremonyType = data.eventType || 'wedding';

    const templates = CEREMONY_TEMPLATES[ceremonyType] || CEREMONY_TEMPLATES.wedding;
    const filteredTemplates =
      this.activeCategory === 'all'
        ? templates
        : templates.filter((t) => t.category === this.activeCategory);

    const titleKh = this.getTitle(ceremonyType);
    const monogram = this.getMonogram(ceremonyType);

    this.container.innerHTML = `
      <section class="container-max py-6 sm:py-10 animate-fade">
        
        <!-- Clean Back Button & Title Section -->
        <div class="mb-6 sm:mb-8">
          <div class="flex items-center justify-between mb-4">
            <button id="templates-back-btn" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white hover:bg-stone-100 border border-stone-200 text-stone-600 hover:text-theabCrimson text-xs font-bold transition shadow-2xs cursor-pointer">
              <i data-lucide="arrow-left" class="w-4 h-4 text-theabCrimson"></i>
              <span>ត្រឡប់ក្រោយ</span>
            </button>
          </div>

          <h1 class="font-moul text-xl sm:text-2xl md:text-3xl text-theabCrimson mb-6 tracking-wide text-center">
            ${titleKh}
          </h1>

          <!-- Category Filter Tabs (Horizontal scroll on mobile) -->
          <div class="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            <button data-cat="all" class="cat-filter-btn px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${this.activeCategory === 'all' ? 'bg-theabCrimson text-white shadow-sm' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}">
              ទាំងអស់ (${templates.length})
            </button>
            <button data-cat="traditional" class="cat-filter-btn px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${this.activeCategory === 'traditional' ? 'bg-theabCrimson text-white shadow-sm' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}">
              ប្រពៃណីបុរាណ
            </button>
            <button data-cat="floral" class="cat-filter-btn px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${this.activeCategory === 'floral' ? 'bg-theabCrimson text-white shadow-sm' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}">
              ផ្កាស្រស់រ៉ូមែនទិក
            </button>
            <button data-cat="emerald" class="cat-filter-btn px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${this.activeCategory === 'emerald' ? 'bg-theabCrimson text-white shadow-sm' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}">
              ត្បូងមរកតសិរី
            </button>
            <button data-cat="modern" class="cat-filter-btn px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all cursor-pointer ${this.activeCategory === 'modern' ? 'bg-theabCrimson text-white shadow-sm' : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'}">
              អភិជនទំនើប
            </button>
          </div>
        </div>

        <!-- Templates Gallery Grid (Responsive 1-col on mobile, 2-col on tablet, 3-col on desktop) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          ${filteredTemplates
            .map((tpl) => {
              const groomName = data.groomName || (ceremonyType === 'housewarming' ? 'លោក ហេង ពិសាល' : 'សុខ វិបុល');
              const brideName = data.brideName || (ceremonyType === 'housewarming' ? 'លោកស្រី លី ណាដា' : 'ជា សុជាតា');
              const groomParents = data.groomParents || 'លោក សុខ ជា និង លោកស្រី កែវ ផល្លី';
              const ceremonyDate = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
              const locationName = data.locationName || 'មជ្ឈមណ្ឌល ឌឹ ព្រេមៀ សែនសុខ';
              const bannerTitle = data.titleKh || titleKh;

              return `
              <div class="bg-white rounded-3xl overflow-hidden border-2 ${tpl.cardBorder} shadow-card hover:shadow-luxury transition-all duration-300 flex flex-col group">
                
                <!-- Card Header Tag & Category -->
                <div class="p-4 sm:p-5 pb-3 flex items-center justify-between border-b border-stone-100 bg-stone-50/60">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${tpl.tagColor}">
                    ${tpl.tag}
                  </span>
                  <span class="text-xs text-stone-400 font-sans tracking-wide">
                    ${tpl.subtitle}
                  </span>
                </div>

                <!-- Live Visual Theab Preview Inside Phone Simulation Box -->
                <div class="p-4 sm:p-6 flex-1 flex flex-col justify-center items-center ${tpl.previewBg}">
                  <div class="w-full max-w-[280px] bg-white rounded-2xl overflow-hidden shadow-md border-2 border-theabGold/50 transition-transform duration-300 group-hover:scale-[1.02]">
                    
                    <!-- Theab Banner -->
                    <div class="${tpl.primaryGradient} text-amber-200 py-3.5 px-3 text-center relative overflow-hidden">
                      <div class="w-8 h-8 rounded-full mx-auto bg-amber-400/20 text-amber-200 flex items-center justify-center font-moul text-sm shadow-inner border border-amber-300/40 mb-1">
                        ${monogram}
                      </div>
                      <div class="font-moul text-xs tracking-wide text-amber-100">${bannerTitle}</div>
                      <div class="h-[1px] w-12 bg-amber-300/50 mx-auto mt-1"></div>
                    </div>

                    <!-- Theab Content Mini Preview -->
                    <div class="p-3.5 text-center text-[10.5px] leading-tight space-y-2">
                      <div class="text-stone-500 font-light text-[9.5px]">
                        ${ceremonyType === 'housewarming' ? 'ដោយសេចក្តីសោមនស្សរីករាយពី' : 'ដោយសេចក្តីគោរពពីមាតាបិតា'}<br />
                        <span class="font-semibold text-stone-700">${groomParents.split(' និង ')[0]} ...</span>
                      </div>

                      <div class="py-1.5 px-2 rounded-xl bg-amber-50/70 border border-amber-200/50">
                        <div class="font-moul text-xs text-theabCrimson">${groomName}</div>
                        <div class="text-[9px] text-amber-600 font-bold">&bull; ${ceremonyType === 'housewarming' ? 'និង' : 'ជាគូស្វាមីភរិយា'} &bull;</div>
                        <div class="font-moul text-xs text-theabCrimson">${brideName}</div>
                      </div>

                      <div class="text-[10px] text-stone-600 bg-stone-50 p-1.5 rounded-lg border border-stone-200/60">
                        <div class="font-bold text-stone-800">${ceremonyDate}</div>
                        <div class="text-[9.5px] text-stone-500 truncate mt-0.5">${locationName}</div>
                      </div>

                      <div class="w-full py-1.5 rounded-lg ${tpl.primaryGradient} text-amber-200 font-bold text-[10px] shadow-xs flex items-center justify-center gap-1">
                        <i data-lucide="send" class="w-3 h-3"></i>
                        <span>ឆ្លើយតបការចូលរួម (RSVP)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Template Info & Metadata -->
                <div class="p-4 sm:p-5 pt-3 border-t border-stone-100 bg-white">
                  <h3 class="font-moul text-base text-stone-900 group-hover:text-theabCrimson transition-colors mb-1">
                    ${tpl.name}
                  </h3>
                  <p class="text-xs text-stone-500 font-light line-clamp-2 mb-3 leading-relaxed">
                    ${tpl.description}
                  </p>

                  <!-- Feature Chips -->
                  <div class="flex flex-wrap gap-1.5 mb-4">
                    ${tpl.features
                      .map(
                        (f) => `
                      <span class="text-[10px] bg-stone-100 text-stone-600 px-2 py-0.5 rounded-md font-medium">
                        ${f}
                      </span>
                    `
                      )
                      .join('')}
                  </div>

                  <!-- Action Buttons -->
                  <div class="grid grid-cols-2 gap-2.5">
                    <button data-preview-id="${tpl.id}" class="btn-preview-tpl w-full py-2.5 px-3 rounded-xl border border-stone-300 hover:border-theabGold bg-stone-50 hover:bg-amber-50/50 text-stone-700 hover:text-theabCrimson text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer">
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                      <span>មើលគំរូផ្ទាល់</span>
                    </button>
                    <button data-select-id="${tpl.id}" class="btn-select-tpl w-full py-2.5 px-3 rounded-xl ${tpl.primaryGradient} text-white hover:brightness-110 text-xs font-bold transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer">
                      <span>ជ្រើសរើសគំរូនេះ</span>
                      <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>

              </div>
            `;
            })
            .join('')}
        </div>

        <!-- Fullscreen Interactive Live Phone Preview Modal Container -->
        <div id="tpl-preview-modal-root"></div>

      </section>
    `;

    this.bindEvents(invitationData, templates);
    this.refreshIcons();
  }

  bindEvents(invitationData, templates = []) {
    // Back to Ceremony selection button
    const backBtn = document.getElementById('templates-back-btn');
    if (backBtn && this.handlers.onPrev) {
      backBtn.onclick = () => this.handlers.onPrev();
    }

    // Category filter tabs
    const catBtns = this.container.querySelectorAll('.cat-filter-btn');
    catBtns.forEach((btn) => {
      btn.onclick = () => {
        this.activeCategory = btn.getAttribute('data-cat') || 'all';
        this.render(invitationData, this.activeTheme, false);
      };
    });

    // Select template buttons
    const selectBtns = this.container.querySelectorAll('.btn-select-tpl');
    selectBtns.forEach((btn) => {
      btn.onclick = () => {
        const tplId = btn.getAttribute('data-select-id');
        const selectedTpl = templates.find((t) => t.id === tplId);
        if (selectedTpl && this.handlers.onSelectTemplate) {
          this.handlers.onSelectTemplate(selectedTpl);
        }
      };
    });

    // Preview template buttons
    const previewBtns = this.container.querySelectorAll('.btn-preview-tpl');
    previewBtns.forEach((btn) => {
      btn.onclick = () => {
        const tplId = btn.getAttribute('data-preview-id');
        const selectedTpl = templates.find((t) => t.id === tplId);
        if (selectedTpl) {
          this.openPreviewModal(selectedTpl, invitationData);
        }
      };
    });
  }

  openPreviewModal(template, invitationData) {
    const modalRoot = document.getElementById('tpl-preview-modal-root');
    if (!modalRoot) return;

    const data = invitationData || {};
    const ceremonyType = data.eventType || 'wedding';
    const groomName = data.groomName || (ceremonyType === 'housewarming' ? 'លោក ហេង ពិសាល' : 'សុខ វិបុល');
    const brideName = data.brideName || (ceremonyType === 'housewarming' ? 'លោកស្រី លី ណាដា' : 'ជា សុជាតា');
    const groomParents = data.groomParents || 'លោក សុខ ជា និង លោកស្រី កែវ ផល្លី';
    const brideParents = data.brideParents || 'លោក ជា វណ្ណា និង លោកស្រី ហែម ស៊ីវន';
    const ceremonyDate = data.ceremonyDate || 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦';
    const ceremonyTime = data.ceremonyTime || 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ';
    const locationName = data.locationName || 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)';
    const welcomeQuote = data.welcomeQuote || 'យើងខ្ញុំមានកិត្តិយស និងសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល';
    const monogram = this.getMonogram(ceremonyType);
    const titleKh = data.titleKh || this.getTitle(ceremonyType);

    modalRoot.innerHTML = `
      <div id="tpl-modal-backdrop" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fade">
        <div class="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl shadow-2xl border-2 border-theabGold/50 overflow-hidden my-auto animate-scaleUp">
          
          <!-- Modal Top Bar -->
          <div class="flex items-center justify-between p-3.5 px-4 bg-stone-900 text-white border-b border-stone-800">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full ${template.badgeBg} animate-pulse"></span>
              <span class="text-xs font-bold">${template.name}</span>
            </div>
            <button id="close-tpl-modal-btn" class="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Phone Screen Simulation Container (Scrollable) -->
          <div class="max-h-[75vh] overflow-y-auto ${template.previewBg} p-4 sm:p-6 text-center">
            
            <!-- Banner Section -->
            <div class="${template.primaryGradient} text-amber-200 py-6 px-4 rounded-2xl shadow-md mb-6 relative overflow-hidden">
              <div class="w-14 h-14 rounded-full mx-auto bg-amber-400/20 text-amber-200 flex items-center justify-center font-moul text-xl shadow-inner border border-amber-300/40 mb-2">
                ${monogram}
              </div>
              <span class="text-[10px] uppercase font-sans tracking-widest text-amber-300 block font-bold">
                Digital Theab Platform
              </span>
              <h2 class="font-moul text-base sm:text-lg mt-1 tracking-wide text-amber-100">
                ${titleKh}
              </h2>
              <div class="khmer-gold-strip max-w-[120px] mx-auto mt-2"></div>
            </div>

            <!-- Parents Section -->
            <div class="text-xs text-stone-600 mb-5 leading-relaxed bg-white/80 p-3.5 rounded-2xl border border-stone-200/60">
              <p class="text-stone-400 text-[11px] font-semibold mb-1">
                ${ceremonyType === 'housewarming' ? 'ដោយសេចក្តីសោមនស្សរីករាយពី' : 'ដោយសេចក្តីគោរព និងមនោសញ្ចេតនាជ្រាលជ្រៅពី'}
              </p>
              <p class="font-bold text-stone-800">${groomParents}</p>
              ${ceremonyType !== 'housewarming' ? `<div class="text-amber-600 font-bold my-1">&bull; និង &bull;</div><p class="font-bold text-stone-800">${brideParents}</p>` : ''}
            </div>

            <!-- Couple / Owners Names Section -->
            <div class="my-5 p-4 rounded-2xl bg-white shadow-sm border border-amber-200/70">
              <div class="font-moul text-base sm:text-lg text-theabCrimson">
                ${groomName}
              </div>
              <div class="text-xs text-amber-600 font-bold my-1">
                &bull; ${ceremonyType === 'housewarming' ? 'និង' : 'ជាគូភរិយាស្វាមី'} &bull;
              </div>
              <div class="font-moul text-base sm:text-lg text-theabCrimson">
                ${brideName}
              </div>
            </div>

            <!-- Invitation Quote -->
            <div class="text-xs text-stone-600 italic bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/50 mb-5 leading-relaxed">
              "${welcomeQuote}"
            </div>

            <!-- Date & Time & Venue Card -->
            <div class="bg-white rounded-2xl p-4 text-xs border border-stone-200/80 shadow-xs space-y-2.5 mb-5 text-left">
              <div class="flex items-start gap-2.5">
                <i data-lucide="calendar" class="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5"></i>
                <div>
                  <div class="font-bold text-stone-800">${ceremonyDate}</div>
                  <div class="text-[11px] text-stone-500">${ceremonyTime}</div>
                </div>
              </div>

              <div class="flex items-start gap-2.5 pt-2 border-t border-stone-100">
                <i data-lucide="map-pin" class="w-4 h-4 text-theabCrimson flex-shrink-0 mt-0.5"></i>
                <div>
                  <div class="font-bold text-stone-800">ទីតាំងប្រារព្ធពិធី</div>
                  <div class="text-[11px] text-stone-500">${locationName}</div>
                </div>
              </div>
            </div>

            <!-- Interactive RSVP Demonstration -->
            <div class="bg-white rounded-2xl p-4 border-2 border-amber-300 shadow-sm">
              <h4 class="font-moul text-xs text-theabCrimson mb-1">
                ឆ្លើយតបការចូលរួម (RSVP)
              </h4>
              <p class="text-[10px] text-stone-500 mb-3">
                ភ្ញៀវកិត្តិយសអាចឆ្លើយតបភ្លាមៗតាមទូរស័ព្ទដៃ
              </p>
              <div class="w-full py-2.5 rounded-xl ${template.primaryGradient} text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5">
                <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                <span>ខ្ញុំនឹងចូលរួម (I will attend)</span>
              </div>
            </div>

          </div>

          <!-- Modal Bottom Action Bar -->
          <div class="p-3.5 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
            <button id="modal-cancel-btn" class="btn-secondary !py-2.5 !px-4 text-xs font-bold cursor-pointer">
              បិទការមើលគំរូ
            </button>
            <button id="modal-select-btn" class="btn-primary !py-2.5 !px-5 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
              <span>ជ្រើសរើសយកគំរូនេះ</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </button>
          </div>

        </div>
      </div>
    `;

    // Refresh icons inside modal
    if (window.lucide) {
      window.lucide.createIcons({ root: modalRoot });
    }

    // Modal listeners
    const closeBtn = document.getElementById('close-tpl-modal-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const selectBtn = document.getElementById('modal-select-btn');
    const backdrop = document.getElementById('tpl-modal-backdrop');

    const closeModal = () => {
      modalRoot.innerHTML = '';
    };

    if (closeBtn) closeBtn.onclick = closeModal;
    if (cancelBtn) cancelBtn.onclick = closeModal;
    if (backdrop) {
      backdrop.onclick = (e) => {
        if (e.target === backdrop) closeModal();
      };
    }

    if (selectBtn) {
      selectBtn.onclick = () => {
        closeModal();
        if (this.handlers.onSelectTemplate) {
          this.handlers.onSelectTemplate(template);
        }
      };
    }
  }
}
