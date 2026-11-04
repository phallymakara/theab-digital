import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { useApp } from '../context/AppContext';
import { CEREMONY_DATA } from '../data/templates';
import { TRADITIONAL_TEMPLATES, RoyalGoldTemplate } from '../components/templates/traditional';
import { FLORAL_TEMPLATES } from '../components/templates/floral';
import { EMERALD_TEMPLATES } from '../components/templates/emerald';
import { MODERN_TEMPLATES } from '../components/templates/modern';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Check,
  Copy,
  Phone,
  MessageCircle,
  Upload,
  Trash2,
  Plus,
  Eye,
  Edit3,
  Share2,
  Download,
  Sparkles,
  Image as ImageIcon,
  Heart,
  QrCode,
  Users,
  Music,
  Volume2,
  VolumeX
} from 'lucide-react';

// Khmer Date Formatter Helper
function toKhmerNumber(num) {
  const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  return String(num).replace(/[0-9]/g, (d) => khmerDigits[Number(d)]);
}

function formatKhmerWeddingDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const daysKh = ['ថ្ងៃអាទិត្យ', 'ថ្ងៃច័ន្ទ', 'ថ្ងៃអង្គារ', 'ថ្ងៃពុធ', 'ថ្ងៃព្រហស្បតិ៍', 'ថ្ងៃសុក្រ', 'ថ្ងៃសៅរ៍'];
  const monthsKh = [
    'ខែមករា', 'ខែកុម្ភៈ', 'ខែមីនា', 'ខែមេសា', 'ខែឧសភា', 'ខែមិថុនា',
    'ខែកក្កដា', 'ខែសីហា', 'ខែកញ្ញា', 'ខែតុលា', 'ខែវិច្ឆិកា', 'ខែធ្នូ'
  ];

  const dayOfWeek = daysKh[date.getDay()];
  const dayNum = toKhmerNumber(date.getDate());
  const monthName = monthsKh[date.getMonth()];
  const yearNum = toKhmerNumber(date.getFullYear());

  return `${dayOfWeek} ទី${dayNum} ${monthName} ឆ្នាំ${yearNum}`;
}

// Dedicated Real Phone Preset (Samsung Galaxy / Android standard)
const GALAXY_PHONE = {
  name: 'Samsung Galaxy',
  width: 360,
  height: 800,
  aspect: '360/800',
  ratioLabel: '20:9'
};

// Helper to construct clean isolated initial form data for any template
function getInitialFormDataForTemplate(template) {
  const defaultRawDate = '2027-01-10';
  const defaultKhmerDate = template?.demoDate || formatKhmerWeddingDate(defaultRawDate);

  const heroList = (
    template?.bgImage
      ? [template.bgImage, ...(template.heroImages || []).filter((img) => img !== template.bgImage)]
      : (template?.heroImages && template.heroImages.length > 0
          ? template.heroImages
          : [
              '/images/templates/modern_wedding_aisle.webp',
              '/images/templates/emerald_diamond_prewedding.webp',
              '/images/templates/emerald_nature_prewedding.webp',
              '/images/templates/emerald_glasshouse_prewedding.webp',
              '/images/templates/emerald_noir_prewedding.webp'
            ])
  ).slice(0, 5);

  const galleryList = (
    template?.galleryPhotos && template.galleryPhotos.length > 0
      ? template.galleryPhotos
      : [
          { id: 1, src: heroList[0] || '/images/templates/emerald_diamond_prewedding.webp', caption: 'អនុស្សាវរីយ៍សច្ចាស្នេហ៍' },
          { id: 2, src: heroList[1] || '/images/templates/emerald_nature_prewedding.webp', caption: 'ស្នាមញញឹមនៃសុភមង្គល' },
          { id: 3, src: heroList[2] || '/images/templates/emerald_glasshouse_prewedding.webp', caption: 'ពន្លឺថ្ងៃជះលើសូត្រមាស' },
          { id: 4, src: heroList[3] || '/images/templates/emerald_noir_prewedding.webp', caption: 'រាត្រីសមោសរដ៏ផ្អែមល្ហែម' },
          { id: 5, src: heroList[4] || '/images/templates/emerald_malachite_prewedding.webp', caption: 'ចិញ្ចៀនពេជ្រសច្ចាស្នេហ៍' },
          { id: 6, src: heroList[0] || '/images/templates/modern_wedding_aisle.webp', caption: 'ចំណងអាពាហ៍ពិពាហ៍អមតៈ' }
        ]
  ).slice(0, 12);

  const groomFather = template?.demoGroomParents?.split?.(' និង ')?.[0] || 'លោក ចាន់ សុផល';
  const groomMother = template?.demoGroomParents?.split?.(' និង ')?.[1] || 'លោកស្រី ម៉ៅ សុខា';
  const brideFather = template?.demoBrideParents?.split?.(' និង ')?.[0] || 'លោក តែ គឹមសុង';
  const brideMother = template?.demoBrideParents?.split?.(' និង ')?.[1] || 'លោកស្រី លឹម គន្ធី';

  return {
    groomName: template?.demoGroom || 'សុខ វិបុល',
    groomTitle: 'កូនប្រុសនាម',
    brideName: template?.demoBride || 'ជា សុជាតា',
    brideTitle: 'កូនស្រីនាម',
    bgImage: template?.bgImage || '',
    heroImages: heroList,

    groomFather,
    groomMother,
    groomResidence: 'រាជធានីភ្នំពេញ',
    brideFather,
    brideMother,
    brideResidence: 'រាជធានីភ្នំពេញ',

    weddingDateRaw: defaultRawDate,
    ceremonyDateKh: defaultKhmerDate,
    ceremonyTime: template?.demoTime || 'ម៉ោង ០៥:០០ ល្ងាច',

    programs: [
      { num: 1, time: '០៦:៣០ ព្រឹក', title: 'ជួបជុំភ្ញៀវកិត្តិយសដើម្បីរៀបចំហែចំនូន', desc: 'ជួបជុំបងប្អូនញាតិមិត្តជិតឆ្ងាយរៀបចំគ្រឿងដង្វាយសូត្រមាស' },
      { num: 2, time: '០៧:០០ ព្រឹក', title: 'ពិធីហែចំនូនចូលរោងជ័យមង្គល', desc: 'ក្បួនហែផ្លែឈើ និងគ្រឿងបណ្ណាការចូលគេហដ្ឋានមង្គល' },
      { num: 3, time: '០៨:០០ ព្រឹក', title: 'ពិធីចុះសំបុត្រអាពាហ៍ពិពាហ៍ផ្លូវការ និងសែនដូនតា', desc: 'ចុះកិច្ចសន្យាអាពាហ៍ពិពាហ៍ចំពោះមុខអាជ្ញាធរ និងសែនព្រេនបុព្វការីជន' },
      { num: 4, time: '០៨:៣០ ព្រឹក', title: 'ពិធីកាត់សក់បង្កក់សិរីមង្គល', desc: 'កាត់សក់ជម្រះចង្រៃ និងប្រសិទ្ធពរជ័យសិរីសួស្តី' },
      { num: 5, time: '០៩:៣០ ព្រឹក', title: 'ពិធីសំពះផ្ទឹម ចងដៃសូត្រមាស បង្វិលពពិល ព្រះថោងតោងស្បៃ', desc: 'សំពះផ្ទឹមក្រងសីមា ចងខ្សែអំបោះក្រហម និងបង្វិលពពិលជ័យ' },
      { num: 6, time: '១១:៣០ ថ្ងៃត្រង់', title: 'អញ្ជើញភ្ញៀវកិត្តិយសពិសារអាហារថ្ងៃត្រង់', desc: 'ពិសារអាហារសាមគ្គីជួបជុំគ្រួសារ និងភ្ញៀវកិត្តិយស' },
      { num: 7, time: '០៥:០០ ល្ងាច', title: 'ទទួលបដិសណ្ឋារកិច្ចភ្ញៀវកិត្តិយស និងរាត្រីសមោសរ', desc: 'ពិសារភោជនាហារពេលរាត្រី និងរីករាយជាមួយតន្ត្រីសម័យអភិជន' }
    ],

    locationName: template?.demoLocation || 'សណ្ឋាគារ រ៉ូសវូដ ភ្នំពេញ (Rosewood Phnom Penh - Grand Ballroom)',
    locationAddress: 'អគារ វឌ្ឍនៈ កាពីតាល់ មហាវិថីព្រះមុនីវង្ស សង្កាត់វត្តភ្នំ រាជធានីភ្នំពេញ',
    googleMapsUrl: 'https://maps.google.com/?q=Rosewood+Phnom+Penh',

    galleryPhotos: galleryList,

    bankName: 'ABA Bank',
    accountName: `${template?.demoGroom || 'CHAN RITHISAK'} & ${template?.demoBride || 'TEA PICHCHINDA'}`,
    accountNumber: '000 987 654',
    qrCodeImage: '/images/aba_qr.webp',

    phoneGroom: '012 345 678',
    phoneBride: '098 765 432',
    telegramLink: 'https://t.me/theab_invitation',
    telegramUsername: '@theab_invitation'
  };
}

export function TemplateCustomizerPage() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate, addToast, isAudioPlaying, toggleAudio, playAudio, stopAudio } = useApp();

  // TemplateComponent manages its own isolated audio. Ensure AppContext audio is stopped so only one sound plays
  useEffect(() => {
    stopAudio?.();
    return () => {
      stopAudio?.();
    };
  }, []);

  // Find template by ID from params or AppContext or fallback
  const weddingTemplates = CEREMONY_DATA.wedding.templates || [];
  const currentTemplateId = params?.templateId || selectedTemplate?.id || 'royal-gold';
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const [hasCustomHeroImages, setHasCustomHeroImages] = useState(false);

  const activeTemplate =
    weddingTemplates.find((t) => t.id === currentTemplateId) ||
    weddingTemplates[0];

  const templateFont =
    activeTemplate.font ||
    activeTemplate.fontFamily ||
    (activeTemplate.id === 'royal-gold' ? 'font-komutt-a' :
     activeTemplate.id === 'angkor-heritage' ? 'font-phalluch' :
     activeTemplate.id === 'floral-romance' ? 'font-kouteok' :
     activeTemplate.id === 'traditional-royal-lacquer' ? 'font-momo' :
     activeTemplate.id === 'traditional-crimson-angkoreach' ? 'font-kouteok' :
     activeTemplate.id === 'floral-editorial-magazine' ? 'font-phalluch' :
     activeTemplate.id === 'floral-golden-orchid' ? 'font-koulen' :
     activeTemplate.category === 'modern' ? 'font-komutt' :
     'font-komutt-a');

  // Isolated template form state dictionary: templateId -> formData
  const [templateForms, setTemplateForms] = useState({});
  const [formData, _setFormData] = useState(() => getInitialFormDataForTemplate(activeTemplate));

  const setFormData = (updater) => {
    _setFormData((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      setTemplateForms((forms) => ({
        ...forms,
        [currentTemplateId]: next
      }));
      return next;
    });
  };

  // Synchronize isolated form data whenever current template changes
  useEffect(() => {
    _setFormData((prev) => {
      if (templateForms[currentTemplateId]) {
        return templateForms[currentTemplateId];
      }
      return getInitialFormDataForTemplate(activeTemplate);
    });
    setSelectedHeroIndex(0);
    setHasCustomHeroImages(false);
  }, [currentTemplateId]);

  // Mobile Tab state ('form' or 'preview')
  const [mobileTab, setMobileTab] = useState('form');

  // Preview internal scroll ref to ensure only inner container scrolls
  const fullScrollRef = useRef(null);

  const handleOuterWheel = (e) => {
    const targetRef = fullScrollRef.current;
    if (!targetRef) return;
    if (targetRef.contains(e.target)) {
      // Native inner scroll takes care of it
      return;
    }
    // Forward outer canvas mouse wheel to scroll inside the mockup
    targetRef.scrollTop += e.deltaY;
  };

  // Handle Date Change
  const handleDateChange = (e) => {
    const rawVal = e.target.value;
    const formattedKhmer = formatKhmerWeddingDate(rawVal);
    setFormData((prev) => ({
      ...prev,
      weddingDateRaw: rawVal,
      ceremonyDateKh: formattedKhmer || prev.ceremonyDateKh
    }));
  };

  // Upload Hero Images (Max 5)
  const handleHeroUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = 5 - formData.heroImages.length;
    if (remainingSlots <= 0) {
      addToast('អ្នកបានបញ្ចូលរូបភាព Hero អតិបរមា ៥ សន្លឹកពេញហើយ!', 'warning');
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);
    const newUrls = filesToUpload.map((file) => URL.createObjectURL(file));

    setFormData((prev) => ({
      ...prev,
      heroImages: [...prev.heroImages, ...newUrls].slice(0, 5)
    }));

    setHasCustomHeroImages(true);
    setSelectedHeroIndex(0);
    addToast(`បានបញ្ចូលរូបភាព Hero ចំនួន ${filesToUpload.length} សន្លឹកជោគជ័យ!`, 'success');
  };

  const removeHeroImage = (indexToRemove) => {
    setFormData((prev) => {
      const updated = prev.heroImages.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        heroImages: updated
      };
    });
    setSelectedHeroIndex(0);
  };

  // Add / Upload Background Image directly
  const handleBackgroundUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      bgImage: newUrl
    }));
    setHasCustomHeroImages(true);
    addToast('បានបន្ថែមរូបភាពផ្ទៃខាងក្រោយ (Background) ជោគជ័យ!', 'success');
  };

  // Upload Gallery Photos (Max 12)
  const handleGalleryUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const remainingSlots = 12 - formData.galleryPhotos.length;
    if (remainingSlots <= 0) {
      addToast('អ្នកបានបញ្ចូលរូបភាពអនុស្សាវរីយ៍អតិបរមា ១២ សន្លឹកពេញហើយ!', 'warning');
      return;
    }

    const filesToUpload = files.slice(0, remainingSlots);
    const newItems = filesToUpload.map((file, idx) => ({
      id: Date.now() + idx,
      src: URL.createObjectURL(file),
      caption: `រូបភាពអនុស្សាវរីយ៍ទី ${formData.galleryPhotos.length + idx + 1}`
    }));

    setFormData((prev) => ({
      ...prev,
      galleryPhotos: [...prev.galleryPhotos, ...newItems].slice(0, 12)
    }));

    addToast(`បានបញ្ចូលរូបភាពអនុស្សាវរីយ៍ ${filesToUpload.length} សន្លឹកជោគជ័យ!`, 'success');
  };

  const removeGalleryPhoto = (idToRemove) => {
    setFormData((prev) => ({
      ...prev,
      galleryPhotos: prev.galleryPhotos.filter((item) => item.id !== idToRemove)
    }));
  };

  // Upload Bank QR Code Image
  const handleQrUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setFormData((prev) => ({
      ...prev,
      qrCodeImage: objectUrl
    }));
    addToast('បានបញ្ចូលរូបភាព QR Code ធនាគារជោគជ័យ!', 'success');
  };

  // Program milestones update
  const handleProgramChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.programs];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, programs: updated };
    });
  };

  const addProgramMilestone = () => {
    setFormData((prev) => ({
      ...prev,
      programs: [
        ...prev.programs,
        {
          num: prev.programs.length + 1,
          time: 'ម៉ោង...',
          title: 'ពិធីថ្មី...',
          desc: 'ការរៀបរាប់ពិធី...'
        }
      ]
    }));
  };

  const removeProgramMilestone = (index) => {
    setFormData((prev) => ({
      ...prev,
      programs: prev.programs.filter((_, idx) => idx !== index).map((p, i) => ({ ...p, num: i + 1 }))
    }));
  };

  // Save / Rent celebration handler
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSaveAndRent = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    setShowSuccessModal(true);
  };

  // Resolve template component dynamically with bulletproof fallbacks
  const TemplateComponent =
    MODERN_TEMPLATES[activeTemplate.id] ||
    MODERN_TEMPLATES[activeTemplate.cardStyle] ||
    TRADITIONAL_TEMPLATES[activeTemplate.id] ||
    TRADITIONAL_TEMPLATES[activeTemplate.cardStyle] ||
    FLORAL_TEMPLATES[activeTemplate.id] ||
    FLORAL_TEMPLATES[activeTemplate.cardStyle] ||
    EMERALD_TEMPLATES[activeTemplate.id] ||
    EMERALD_TEMPLATES[activeTemplate.cardStyle] ||
    (activeTemplate.category === 'traditional' ? TRADITIONAL_TEMPLATES['royal-gold'] : null) ||
    (activeTemplate.category === 'floral' ? FLORAL_TEMPLATES['floral-romdoul-moonlight'] : null) ||
    (activeTemplate.category === 'emerald' ? EMERALD_TEMPLATES['emerald-jade'] : null) ||
    (activeTemplate.category === 'modern' ? MODERN_TEMPLATES['modern-noir-diamond'] : null) ||
    RoyalGoldTemplate;

  // Selected background image chosen by user (custom bgImage, or from hero buttons, or default template backdrop)
  const chosenHeroImage =
    formData.bgImage ||
    formData.heroImages[selectedHeroIndex] ||
    formData.heroImages[0] ||
    activeTemplate.bgImage;

  // Active hero images list with the chosen background image positioned at index 0
  const activeHeroImagesList = formData.heroImages.length > 0
    ? [
        chosenHeroImage,
        ...formData.heroImages.filter((_, idx) => idx !== selectedHeroIndex)
      ]
    : (activeTemplate.heroImages || []);

  // Prepared data object passed to the live template component
  const liveTemplateData = {
    groomName: formData.groomName,
    brideName: formData.brideName,
    groomFather: formData.groomFather,
    groomMother: formData.groomMother,
    brideFather: formData.brideFather,
    brideMother: formData.brideMother,
    groomParents: `${formData.groomFather} និង ${formData.groomMother}`,
    brideParents: `${formData.brideFather} និង ${formData.brideMother}`,
    ceremonyDate: formData.ceremonyDateKh,
    ceremonyTime: formData.ceremonyTime,
    ceremonyLocation: formData.locationName,
    locationAddress: formData.locationAddress,
    googleMapsUrl: formData.googleMapsUrl,
    heroImages: activeHeroImagesList.slice(0, 5),
    galleryPhotos: formData.galleryPhotos,
    preweddingPhoto: chosenHeroImage,
    bgImage: chosenHeroImage,
    ceremonyPrograms: formData.programs,
    bankName: formData.bankName,
    accountName: formData.accountName,
    accountNumber: formData.accountNumber,
    qrCodeImage: formData.qrCodeImage,
    hostPhoneGroom: formData.phoneGroom,
    hostPhoneBride: formData.phoneBride,
    phoneGroom: formData.phoneGroom,
    phoneBride: formData.phoneBride,
    telegramLink: formData.telegramLink
  };

  const liveInvitation = {
    groomName: formData.groomName,
    brideName: formData.brideName,
    groomParents: { father: formData.groomFather, mother: formData.groomMother },
    brideParents: { father: formData.brideFather, mother: formData.brideMother },
    weddingDate: formData.ceremonyDateKh,
    weddingTime: formData.ceremonyTime,
    weddingLocation: formData.locationName,
    locationAddress: formData.locationAddress,
    googleMapsUrl: formData.googleMapsUrl,
    heroImages: activeHeroImagesList.slice(0, 5),
    galleryPhotos: formData.galleryPhotos,
    preweddingPhoto: chosenHeroImage,
    bgImage: chosenHeroImage,
    bankName: formData.bankName,
    accountName: formData.accountName,
    accountNumber: formData.accountNumber,
    qrCodeImage: formData.qrCodeImage,
    hostPhoneGroom: formData.phoneGroom,
    hostPhoneBride: formData.phoneBride,
    telegramLink: formData.telegramLink
  };

  const liveActiveTemplate = {
    ...activeTemplate,
    demoGroom: formData.groomName,
    demoBride: formData.brideName,
    demoDate: formData.ceremonyDateKh,
    demoLocation: formData.locationName,
    heroImages: activeHeroImagesList.slice(0, 5),
    galleryPhotos: formData.galleryPhotos,
    bgImage: chosenHeroImage
  };

  return (
    <div className="fixed inset-0 w-full h-screen h-[100dvh] flex flex-col overflow-hidden bg-[#FDFBF7] text-stone-900 font-kantumruy z-30">
      {/* Top Fixed Main Navigation Header (Does NOT scroll) */}
      <header className="shrink-0 h-14 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs px-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate({ to: '/wedding' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition-all active:scale-95 cursor-pointer font-kantumruy"
          >
            <ArrowLeft className="w-4 h-4 text-amber-700" />
            <span className="hidden sm:inline">ត្រឡប់ទៅជ្រើសរើសគំរូ</span>
            <span className="sm:hidden text-xs">ថយក្រោយ</span>
          </button>


        </div>

        {/* Center Mobile View Switcher (Icon-only, compact & scaled smaller for mobile phones) */}
        <div className="flex lg:hidden bg-stone-100 p-0.5 rounded-full border border-stone-200 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab('form')}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              mobileTab === 'form' ? 'bg-amber-600 text-white' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="បំពេញព័ត៌មាន (Edit)"
            aria-label="បំពេញព័ត៌មាន"
          >
            <Edit3 className="w-3.5 h-3.5 shrink-0" />
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('preview')}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              mobileTab === 'preview' ? 'bg-amber-600 text-white' : 'text-stone-600 hover:text-stone-900'
            }`}
            title="មើលគំរូ (View)"
            aria-label="មើលគំរូ"
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>

        {/* Right Action: Audio Toggle & Share Invitation Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all active:scale-95 cursor-pointer font-kantumruy ${
              isAudioPlaying
                ? 'bg-amber-500/15 border-amber-400 text-amber-900 shadow-xs'
                : 'bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-600'
            }`}
            title={isAudioPlaying ? 'ចុចដើម្បីបិទភ្លេង «ភ្ជាប់និស្ស័យ»' : 'ចុចដើម្បីចាក់ភ្លេង «ភ្ជាប់និស្ស័យ»'}
          >
            <Music className={`w-3.5 h-3.5 ${isAudioPlaying ? 'text-amber-600 animate-pulse' : 'text-stone-400'}`} />
            <span className="hidden md:inline">{isAudioPlaying ? 'ភ្លេង «ភ្ជាប់និស្ស័យ»' : 'ចាក់ភ្លេង'}</span>
          </button>
          <button
            onClick={handleSaveAndRent}
            className={`flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full ${activeTemplate.primaryGradient || 'bg-theabCrimson hover:bg-rose-900'} active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-950/20 hover:shadow-lg transition-all cursor-pointer ${templateFont}`}
          >
            <Share2 className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-amber-200 shrink-0" />
            <span className="hidden sm:inline">រក្សាទុក & ចែករំលែក</span>
            <span className="sm:hidden text-xs">ចែករំលែក</span>
          </button>
        </div>
      </header>

      {/* Main Two-Container Workspace (Split Screen on Desktop, strictly independent scroll) */}
      <div className="flex-1 min-h-0 w-full h-full flex flex-col lg:flex-row overflow-hidden relative">
        {/* =========================================================================
            LEFT CONTAINER: THE FORM (SCROLLS INDEPENDENTLY INSIDE THIS CONTAINER ONLY)
            ========================================================================= */}
        <section
          className={`w-full lg:w-[480px] xl:w-[540px] 2xl:w-[580px] shrink-0 bg-[#FAF8F5] border-r border-stone-200/90 flex flex-col h-full min-h-0 overflow-y-auto overscroll-contain luxury-scrollbar p-4 sm:p-6 space-y-5 font-kantumruy select-text ${
            mobileTab === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
          style={{ WebkitOverflowScrolling: 'touch' }}
        >

          {/* 01. ឈ្មោះកូនកំលោះនិងកូនក្រមុំ & Hero Images (Max 5) */}
          <div className="rounded-none bg-white border border-stone-200/90  hover:border-amber-200/90 transition-all p-4 sm:p-5 space-y-4 select-text">
            <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-700 shrink-0">
                1.
              </span>
              <h3 className={`${templateFont} text-sm sm:text-base font-bold text-stone-900`}>
                ឈ្មោះកូនកំលោះ & កូនក្រមុំ
              </h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                    កូនប្រុសនាម
                  </label>
                  <input
                    type="text"
                    value={formData.groomName}
                    onChange={(e) => setFormData({ ...formData, groomName: e.target.value })}
                    placeholder="ឧ. សុខ វិបុល"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                  />
                </div>
                <div>
                  <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                    កូនស្រីនាម
                  </label>
                  <input
                    type="text"
                    value={formData.brideName}
                    onChange={(e) => setFormData({ ...formData, brideName: e.target.value })}
                    placeholder="ឧ. ជា សុជាតា"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                  />
                </div>
              </div>

              {/* Hero Images Upload Section */}
              <div className="pt-2 border-t border-stone-100 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-kantumruy text-xs font-semibold text-stone-700 flex items-center gap-1.5 select-text">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                    <span>រូបភាព Hero (អតិបរមា 5 សន្លឹក)</span>
                  </label>
                  {formData.heroImages.length < 5 && (
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-300/80 font-kantumruy text-xs font-bold transition  cursor-pointer active:scale-95 select-none">
                      <Plus className="w-3.5 h-3.5 text-amber-600" />
                      <span>បន្ថែមរូបភាព Hero</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleHeroUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Hero Thumbnails Grid with Proper Upload Slot */}
                <div className="grid grid-cols-5 gap-2">
                  {formData.heroImages.slice(0, 5).map((imgSrc, idx) => {
                    const isSelected = selectedHeroIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedHeroIndex(idx)}
                        className={`group relative aspect-[3/4] rounded-none overflow-hidden border-2 text-left transition-all cursor-pointer focus:outline-none ${
                          isSelected
                            ? 'border-amber-600 ring-2 ring-amber-400/60 scale-[1.02]'
                            : 'border-stone-200 hover:border-amber-400 bg-stone-100 opacity-85 hover:opacity-100'
                        }`}
                      >
                        <img src={imgSrc} alt={`Hero ${idx + 1}`} className="w-full h-full object-cover" decoding="async" />
                        <span
                          role="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeHeroImage(idx);
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer z-10"
                          title="លុបរូបភាពនេះ"
                        >
                          <Trash2 className="w-2.5 h-2.5" />
                        </span>
                      </button>
                    );
                  })}

                  {formData.heroImages.length < 5 && (
                    <label className="group relative aspect-[3/4] rounded-none border-2 border-dashed border-amber-400 hover:border-amber-600 bg-amber-50/50 hover:bg-amber-100/60 flex flex-col items-center justify-center cursor-pointer transition-all text-center p-1">
                      <Upload className="w-5 h-5 text-amber-700 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-bold text-amber-950 leading-tight">បញ្ចូលរូប</span>
                      <span className="text-[9px] text-amber-700 font-mono">Hero</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleHeroUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Button Below Add Hero Image Section: "រូបភាពផ្ទៃខាងក្រោយ (Background)" */}
              <div className="pt-2 border-t border-stone-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="font-kantumruy text-xs font-semibold text-stone-700 flex items-center gap-1.5 select-text">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>ផ្ទៃខាងក្រោយ</span>
                  </label>

                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-amber-500 hover:bg-amber-600 text-white font-kantumruy text-xs font-bold transition  cursor-pointer active:scale-95 select-none">
                    <Plus className="w-3.5 h-3.5" />
                    <span>រូបភាពផ្ទៃខាងក្រោយ (Background)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Custom Background Image Preview */}
                {formData.bgImage && (
                  <div className="relative aspect-[16/9] w-full max-w-[220px] rounded-none overflow-hidden border-2 border-amber-500  group">
                    <img src={formData.bgImage} alt="Background" className="w-full h-full object-cover" decoding="async" />
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 py-0.5 text-center">
                      <span className="text-[10px] text-amber-200 font-kantumruy font-bold">ផ្ទៃខាងក្រោយកំពុងប្រើ</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, bgImage: '' }))}
                      className="absolute top-1 right-1 p-1 rounded-none bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
                      title="លុបផ្ទៃខាងក្រោយ"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 02. ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ */}
          <div className="rounded-none bg-white border border-stone-200/90  hover:border-amber-200/90 transition-all p-4 sm:p-5 space-y-4 select-text">
            <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-700 shrink-0">
                2.
              </span>
              <h3 className={`${templateFont} text-sm sm:text-base font-bold text-stone-900`}>
                ឪពុកម្ដាយកូនកំលោះ & ឪពុកម្ដាយកូនក្រមុំ
              </h3>
            </div>

            <div className="space-y-4">
              {/* Groom Parents */}
              <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200/80 space-y-3">
                <p className="font-kantumruy text-xs font-bold text-stone-800 flex items-center gap-1.5 select-text">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>មាតាបិតាខាងកូនប្រុស</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-kantumruy text-[11px] text-stone-600 mb-1 select-text">ឪពុកកូនកំលោះ</label>
                    <input
                      type="text"
                      value={formData.groomFather}
                      onChange={(e) => setFormData({ ...formData, groomFather: e.target.value })}
                      placeholder="ឧ. លោក ចាន់ សុផល"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                    />
                  </div>
                  <div>
                    <label className="block font-kantumruy text-[11px] text-stone-600 mb-1 select-text">ម្ដាយកូនកំលោះ</label>
                    <input
                      type="text"
                      value={formData.groomMother}
                      onChange={(e) => setFormData({ ...formData, groomMother: e.target.value })}
                      placeholder="ឧ. លោកស្រី ម៉ៅ សុខា"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-kantumruy text-[11px] text-stone-600 mb-1 select-text">ទីលំនៅ / ស្រុកកំណើត</label>
                  <input
                    type="text"
                    value={formData.groomResidence}
                    onChange={(e) => setFormData({ ...formData, groomResidence: e.target.value })}
                    placeholder="ឧ. រាជធានីភ្នំពេញ"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                  />
                </div>
              </div>

              {/* Bride Parents */}
              <div className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200/80 space-y-3">
                <p className="font-kantumruy text-xs font-bold text-stone-800 flex items-center gap-1.5 select-text">
                  <Users className="w-3.5 h-3.5 text-rose-600" />
                  <span>មាតាបិតាខាងកូនស្រី</span>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block font-kantumruy text-[11px] text-stone-600 mb-1 select-text">ឪពុកកូនក្រមុំ</label>
                    <input
                      type="text"
                      value={formData.brideFather}
                      onChange={(e) => setFormData({ ...formData, brideFather: e.target.value })}
                      placeholder="ឧ. លោក តែ គឹមសុង"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                    />
                  </div>
                  <div>
                    <label className="block font-kantumruy text-[11px] text-stone-600 mb-1 select-text">ម្ដាយកូនក្រមុំ</label>
                    <input
                      type="text"
                      value={formData.brideMother}
                      onChange={(e) => setFormData({ ...formData, brideMother: e.target.value })}
                      placeholder="ឧ. លោកស្រី លឹម គន្ធី"
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-kantumruy text-[11px] text-stone-600 mb-1 select-text">ទីលំនៅ / ស្រុកកំណើត</label>
                  <input
                    type="text"
                    value={formData.brideResidence}
                    onChange={(e) => setFormData({ ...formData, brideResidence: e.target.value })}
                    placeholder="ឧ. រាជធានីភ្នំពេញ"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 bg-white font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 03. ប្រតិទិន & កាលបរិច្ឆេទ (Date & Calendar Picker) */}
          <div className="rounded-none bg-white border border-stone-200/90  hover:border-amber-200/90 transition-all p-4 sm:p-5 space-y-4 select-text">
            <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-700 shrink-0">
                3.
              </span>
              <h3 className={`${templateFont} text-sm sm:text-base font-bold text-stone-900`}>
                ប្រតិទិន & កាលបរិច្ឆេទ
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                    រើសថ្ងៃមង្គលការ
                  </label>
                  <input
                    type="date"
                    value={formData.weddingDateRaw}
                    onChange={handleDateChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-mono text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all cursor-pointer select-text"
                  />
                </div>
                <div>
                  <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                    ម៉ោងកម្មវិធី
                  </label>
                  <input
                    type="text"
                    value={formData.ceremonyTime}
                    onChange={(e) => setFormData({ ...formData, ceremonyTime: e.target.value })}
                    placeholder="ឧ. ម៉ោង 05:00 ល្ងាច"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 04. កម្មពិធីសិរីសួស្ដី (Ceremony Schedule) */}
          <div className="rounded-none bg-white border border-stone-200/90  hover:border-amber-200/90 transition-all p-4 sm:p-5 space-y-4 select-text">
            <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-700 shrink-0">
                4.
              </span>
              <h3 className={`${templateFont} text-sm sm:text-base font-bold text-stone-900`}>
                កម្មវិធីពិធីការ
              </h3>
            </div>

            <div className="space-y-3">
              {formData.programs.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-stone-50/70 border border-stone-200/80 relative group hover:border-amber-300 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-none bg-gradient-to-br from-amber-600 to-amber-700 text-white font-mono text-xs font-bold flex items-center justify-center ">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={item.time}
                        onChange={(e) => handleProgramChange(idx, 'time', e.target.value)}
                        placeholder="ម៉ោង..."
                        className="px-2.5 py-1 rounded-none bg-white border border-stone-200 font-kantumruy text-xs font-bold text-amber-900 w-32 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none select-text"
                      />
                    </div>
                    <button
                      onClick={() => removeProgramMilestone(idx)}
                      className="text-stone-400 hover:text-red-600 p-1.5 rounded-none hover:bg-red-50 transition cursor-pointer"
                      title="លុបកម្មវិធីនេះ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleProgramChange(idx, 'title', e.target.value)}
                    placeholder="ចំណងជើងពិធី..."
                    className="w-full px-3 py-1.5 rounded-none bg-white border border-stone-200 font-kantumruy text-xs font-bold text-stone-800 mb-1.5 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none select-text"
                  />
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => handleProgramChange(idx, 'desc', e.target.value)}
                    placeholder="ការរៀបរាប់សង្ខេប..."
                    className="w-full px-3 py-1.5 rounded-none bg-white border border-stone-200 font-kantumruy text-[11px] text-stone-600 resize-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none select-text"
                  />
                </div>
              ))}

              <button
                onClick={addProgramMilestone}
                className="w-full py-2.5 rounded-xl border-2 border-dashed border-stone-300 hover:border-amber-500 text-amber-800 font-kantumruy text-xs font-bold flex items-center justify-center gap-1.5 bg-stone-50/50 hover:bg-amber-50/40 transition cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-600" />
                <span>បន្ថែមកម្មវិធីពិធីការថ្មី</span>
              </button>
            </div>
          </div>

          {/* 05. ទីតាំងពិធី (Venue & Location) */}
          <div className="rounded-none bg-white border border-stone-200/90  hover:border-amber-200/90 transition-all p-4 sm:p-5 space-y-4 select-text">
            <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-700 shrink-0">
                5.
              </span>
              <h3 className={`${templateFont} text-sm sm:text-base font-bold text-stone-900`}>
                ទីតាំងពិធី
              </h3>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                  ឈ្មោះទីតាំង/សណ្ឋាគារ/គេហដ្ឋាន
                </label>
                <input
                  type="text"
                  value={formData.locationName}
                  onChange={(e) => setFormData({ ...formData, locationName: e.target.value })}
                  placeholder="ឧ. សណ្ឋាគារ រ៉ូសវូដ ភ្នំពេញ (Grand Ballroom)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                />
              </div>

              <div>
                <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                  អាសយដ្ឋានលម្អិត (Address)
                </label>
                <textarea
                  rows={2}
                  value={formData.locationAddress}
                  onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                  placeholder="ឧ. អគារ វឌ្ឍនៈ កាពីតាល់ មហាវិថីព្រះមុនីវង្ស សង្កាត់វត្តភ្នំ រាជធានីភ្នំពេញ"
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-kantumruy text-base sm:text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all resize-none select-text"
                />
              </div>

              <div>
                <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                  តំណភ្ជាប់ Google Maps URL
                </label>
                <input
                  type="url"
                  value={formData.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, googleMapsUrl: e.target.value })}
                  placeholder="https://maps.google.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-mono text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                />
              </div>
            </div>
          </div>

          {/* 06. រូបថតអនុស្សារីយ៍ (Pre-wedding Gallery - max 12 pics) */}
          <div className="rounded-none bg-white border border-stone-200/90  hover:border-amber-200/90 transition-all p-4 sm:p-5 space-y-4 select-text">
            <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-700 shrink-0">
                6.
              </span>
              <h3 className={`${templateFont} text-sm sm:text-base font-bold text-stone-900`}>
                វិចិត្រសាលរូបថត
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="font-kantumruy text-xs font-semibold text-stone-700 select-text">រូបថតក្នុង Gallery</span>
                <span className="font-mono text-[11px] font-semibold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-none border border-indigo-200/80 ">
                  {Math.min(12, formData.galleryPhotos.length)} / 12 Photos
                </span>
              </div>

              {/* Thumbnails grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {formData.galleryPhotos.slice(0, 12).map((photo, idx) => (
                  <div
                    key={photo.id || idx}
                    className="group relative aspect-square rounded-none overflow-hidden border border-stone-200 bg-stone-100 "
                  >
                    <img src={photo.src} alt="Gallery" className="w-full h-full object-cover" decoding="async" loading="lazy" />
                    <button
                      onClick={() => removeGalleryPhoto(photo.id)}
                      className="absolute top-1 right-1 p-1 rounded-none bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer"
                      title="លុប"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Upload Button */}
              {formData.galleryPhotos.length < 12 && (
                <label className="flex flex-col items-center justify-center p-3.5 border-2 border-dashed border-indigo-300 hover:border-indigo-500 rounded-none bg-indigo-50/40 hover:bg-indigo-50 text-center cursor-pointer transition select-none">
                  <Upload className="w-5 h-5 text-indigo-600 mb-1" />
                  <span className="font-kantumruy text-xs font-bold text-indigo-900">
                    បញ្ចូលរូបថតអនុស្សារីយ៍បន្ថែម (ជ្រើសរើសបានច្រើនសន្លឹក)
                  </span>
                  <span className="font-mono text-[10px] text-stone-500 mt-0.5">JPG, PNG, WebP • អតិបរមា 12 សន្លឹក</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleGalleryUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* 07. ជូនចំណងដៃ (Bank QR Upload) */}
          <div className="rounded-2xl bg-white border border-stone-200/90 hover:border-amber-200/90 transition-all p-4 sm:p-5 space-y-4 select-text">
            <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-700 shrink-0">
                7.
              </span>
              <h3 className={`${templateFont} text-sm sm:text-base font-bold text-stone-900`}>
                ជូនចំណងដៃ & គណនីធនាគារ
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                    ឈ្មោះធនាគារ
                  </label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-kantumruy text-base sm:text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all select-text"
                  >
                    <option value="ABA Bank">ABA Bank</option>
                    <option value="ACLEDA Bank">ACLEDA Bank</option>
                    <option value="Canadia Bank">Canadia Bank</option>
                    <option value="Wing Bank">Wing Bank</option>
                    <option value="Bakong KHQR">Bakong KHQR</option>
                  </select>
                </div>
                <div>
                  <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                    លេខគណនី
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="000 987 654"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-mono text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all select-text"
                  />
                </div>
              </div>

              <div>
                <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 select-text">
                  ឈ្មោះម្ចាស់គណនី
                </label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  placeholder="CHAN RITHISAK & TEA PICHCHINDA"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-mono text-xs focus:ring-1 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all select-text"
                />
              </div>

              {/* Proper QR Code Upload Button & Preview */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <label className="block font-kantumruy text-xs font-semibold text-stone-700 select-text">
                  រូបភាព QR Code ធនាគារ (KHQR Code)
                </label>
                <div className="flex items-center gap-3">
                  {formData.qrCodeImage && (
                    <div className="relative w-24 h-24 rounded-none border-2 border-amber-500 overflow-hidden bg-white p-1 shrink-0">
                      <img src={formData.qrCodeImage} alt="QR Code" className="w-full h-full object-contain" />
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, qrCodeImage: '' }))}
                        className="absolute top-0.5 right-0.5 p-0.5 bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        title="លុប QR Code"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  )}

                  <label className="flex-1 flex flex-col items-center justify-center p-3 rounded-none border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 hover:bg-amber-50 text-center cursor-pointer transition select-none">
                    <Upload className="w-5 h-5 text-amber-700 mb-1" />
                    <span className="font-kantumruy text-xs font-bold text-amber-950">
                      {formData.qrCodeImage ? 'ប្ដូររូបភាព QR Code ថ្មី' : 'បញ្ចូលរូបភាព QR Code'}
                    </span>
                    <span className="font-mono text-[10px] text-stone-500 mt-0.5">JPG, PNG, WebP (KHQR)</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleQrUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 08. លេខទូរស័ព្ទនិងតេលេក្រាមម្ចាស់កម្មវិធី */}
          <div className="rounded-none bg-white border border-stone-200/90  hover:border-amber-200/90 transition-all p-4 sm:p-5 space-y-4 mb-6 select-text">
            <div className="pb-3 border-b border-stone-100 flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base font-bold text-amber-700 shrink-0">
                8.
              </span>
              <h3 className={`${templateFont} text-sm sm:text-base font-bold text-stone-900`}>
                លេខទូរស័ព្ទ & តេលេក្រាមម្ចាស់កម្មវិធី
              </h3>
            </div>

            <div className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1 select-text">
                    <Phone className="w-3 h-3 text-sky-600" />
                    <span>លេខទូរស័ព្ទ (ខាងកូនកំលោះ)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneGroom}
                    onChange={(e) => setFormData({ ...formData, phoneGroom: e.target.value })}
                    placeholder="012 345 678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-mono text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                  />
                </div>
                <div>
                  <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1 select-text">
                    <Phone className="w-3 h-3 text-rose-600" />
                    <span>លេខទូរស័ព្ទ (ខាងកូនក្រមុំ)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneBride}
                    onChange={(e) => setFormData({ ...formData, phoneBride: e.target.value })}
                    placeholder="098 765 432"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-mono text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                  />
                </div>
              </div>

              <div>
                <label className="block font-kantumruy text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1 select-text">
                  <MessageCircle className="w-3.5 h-3.5 text-sky-600" />
                  <span>តំណភ្ជាប់ ឬឈ្មោះ Telegram ម្ចាស់កម្មវិធី</span>
                </label>
                <input
                  type="text"
                  value={formData.telegramLink}
                  onChange={(e) => setFormData({ ...formData, telegramLink: e.target.value })}
                  placeholder="https://t.me/username ឬ @username"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white focus:bg-white text-stone-800 font-mono text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none transition-all select-text"
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            RIGHT CONTAINER: THE LIVE RESULT PREVIEW
            ========================================================================= */}
        <section
          className={`flex-1 min-h-0 bg-stone-900 flex flex-col h-full overflow-hidden relative ${
            mobileTab === 'form' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Preview Viewport Canvas (Does NOT scroll outside - only content inside scrolls) */}
          <div
            onWheel={handleOuterWheel}
            className="flex-1 min-h-0 h-full w-full overflow-hidden flex items-center justify-center relative select-auto p-0"
          >
            {/* Ambient Background Glow of the Template / Chosen Hero Background */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none opacity-20 blur-2xl scale-110"
              style={{
                backgroundImage: `url(${chosenHeroImage})`
              }}
            />
            <div className="absolute inset-0 bg-stone-950/75 pointer-events-none" />

            {/* Computer Viewport: Centered and responsive for all screen sizes */}
            <div className="w-full max-w-2xl h-full rounded-none border-x border-white/10 overflow-hidden relative flex flex-col shrink-0 mx-auto">
              {/* Template Main Background Pinned in Computer View */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 pointer-events-none scale-105"
                style={{
                  backgroundImage: `url(${chosenHeroImage})`
                }}
              />
              <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px] pointer-events-none z-0" />

              <div
                ref={fullScrollRef}
                className="relative z-10 w-full h-full overflow-y-auto overscroll-contain luxury-scrollbar"
              >
                {TemplateComponent ? (
                  <TemplateComponent
                    key={currentTemplateId}
                    data={liveTemplateData}
                    invitation={liveInvitation}
                    invitationData={liveInvitation}
                    activeTemplate={liveActiveTemplate}
                  />
                ) : (
                  <RoyalGoldTemplate
                    key={currentTemplateId}
                    data={liveTemplateData}
                    invitation={liveInvitation}
                    invitationData={liveInvitation}
                    activeTemplate={liveActiveTemplate}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Save & Rent Success Celebration Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade font-kantumruy">
          <div className="max-w-md w-full rounded-3xl bg-white border border-amber-300 p-6 sm:p-8 text-center space-y-4 shadow-2xl relative">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className={`${templateFont} text-2xl text-stone-900 font-bold`}>
              ព័ត៌មានធៀបត្រូវបានរក្សាទុករួចរាល់!
            </h3>

            <p className="font-kantumruy text-xs text-stone-600 leading-relaxed">
              សូមអរគុណដែលបានជ្រើសរើសជួលសេវាកម្មធៀបមង្គលការឌីជីថល <span className="font-bold text-amber-800">Theab Digital</span>។ លោកអ្នកអាចចម្លងតំណភ្ជាប់ធៀបនេះដើម្បីផ្ញើទៅកាន់ភ្ញៀវកិត្តិយស ឬទាញយកបានភ្លាមៗ។
            </p>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-1 text-xs">
              <p className="font-kantumruy text-[11px] text-stone-500 font-bold uppercase">តំណភ្ជាប់ធៀបរបស់អ្នក (Your Live Link)</p>
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-amber-800 truncate text-xs">
                  {window.location.origin}/{currentTemplateId}/preview
                </span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`${window.location.origin}/${currentTemplateId}/preview`);
                    addToast('បានចម្លងតំណភ្ជាប់ធៀបរួចរាល់!', 'success');
                  }}
                  className="px-3 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px] shrink-0 active:scale-95 font-kantumruy"
                >
                  ចម្លង
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer font-kantumruy"
              >
                កែសម្រួលបន្ត
              </button>
              <a
                href={`/${currentTemplateId}/preview`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition font-kantumruy"
              >
                <span>បើកមើលធៀប</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateCustomizerPage;
