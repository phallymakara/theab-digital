import { BaseModel } from './BaseModel.js';
import { apiService } from '../services/apiService.js';

export const CEREMONY_PRESETS = {
  wedding: {
    eventType: 'wedding',
    badge: 'កម្មវិធីមង្គលការ',
    titleKh: 'សិរីសួស្តី អាពាហ៍ពិពាហ៍',
    groomName: 'សុខ វិបុល',
    brideName: 'ជា សុជាតា',
    groomParents: 'លោក សុខ ជា និង លោកស្រី កែវ ផល្លី',
    brideParents: 'លោក ជា វណ្ណា និង លោកស្រី ហែម ស៊ីវន',
    ceremonyDate: 'ថ្ងៃអាទិត្យ ទី១៥ ខែវិច្ឆិកា ឆ្នាំ២០២៦',
    ceremonyTime: 'វេលាម៉ោង ៥:០០ ល្ងាច តទៅ',
    locationName: 'មជ្ឈមណ្ឌលសន្និបាត និងពិព័រណ៍ ឌឹ ព្រេមៀ សែនសុខ (អគារ A)',
    locationAddress: 'ផ្លូវឧកញ៉ាម៉ុងឫទ្ធី សង្កាត់ភ្នំពេញថ្មី ខណ្ឌសែនសុខ រាជធានីភ្នំពេញ',
    googleMapsUrl: 'https://maps.google.com/?q=The+Premier+Centre+Sen+Sok',
    themeColor: 'crimson',
    welcomeQuote: 'យើងខ្ញុំមានកិត្តិយស និងសេចក្តីសោមនស្សរីករាយឥតឧបមា សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អ្នកនាងកញ្ញា អញ្ជើញចូលរួមជាអធិបតី និងជាភ្ញៀវកិត្តិយស ដើម្បីប្រសិទ្ធពរជ័យ សិរីសួស្តី ជ័យមង្គល ក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍',
  },
  engagement: {
    eventType: 'engagement',
    badge: 'កម្មវិធីភ្ជាប់ពាក្យ',
    titleKh: 'មង្គលពិធី ភ្ជាប់ពាក្យ',
    groomName: 'គង់ ចាន់រិទ្ធ',
    brideName: 'ម៉ៅ ស្រីពៅ',
    groomParents: 'លោក គង់ ណារ៉េត និង លោកស្រី អ៊ុំ សុគន្ធា',
    brideParents: 'លោក ម៉ៅ ពិសិដ្ឋ និង លោកស្រី ឌៀប សុវណ្ណារី',
    ceremonyDate: 'ថ្ងៃសៅរ៍ ទី២៤ ខែតុលា ឆ្នាំ២០២៦',
    ceremonyTime: 'វេលាម៉ោង ៧:៣០ ព្រឹក តទៅ',
    locationName: 'គេហដ្ឋានខាងស្រី ភូមិបាគូ សង្កាត់ដង្កោ',
    locationAddress: 'ខណ្ឌដង្កោ រាជធានីភ្នំពេញ',
    googleMapsUrl: 'https://maps.google.com/?q=Dangkao+Phnom+Penh',
    themeColor: 'gold',
    welcomeQuote: 'សូមគោរពអញ្ជើញ ញាតិមិត្តជិតឆ្ងាយទាំងអស់ ចូលរួមជាសាក្សី និងផ្តល់កិត្តិយសក្នុងមង្គលការភ្ជាប់ពាក្យរបស់កូនប្រុស-កូនស្រីយើងខ្ញុំ',
  },
  housewarming: {
    eventType: 'housewarming',
    badge: 'កម្មវិធីឡើងគេហដ្ឋាន',
    titleKh: 'សិរីសួស្តី ឡើងគេហដ្ឋានថ្មី',
    groomName: 'លោក ហេង ពិសាល',
    brideName: 'លោកស្រី លី ណាដា',
    groomParents: 'ម្ចាស់គេហដ្ឋាន',
    brideParents: 'ម្ចាស់គេហដ្ឋាន',
    ceremonyDate: 'ថ្ងៃអាទិត្យ ទី០៨ ខែធ្នូ ឆ្នាំ២០២៦',
    ceremonyTime: 'វេលាម៉ោង ៨:០០ ព្រឹក តទៅ',
    locationName: 'បុរី ប៉េង ហួត បឹងស្នោ (ផ្ទះលេខ ៨៨)',
    locationAddress: 'ច្បារអំពៅ រាជធានីភ្នំពេញ',
    googleMapsUrl: 'https://maps.google.com/?q=Borey+Peng+Huoth+Boeung+Snor',
    themeColor: 'emerald',
    welcomeQuote: 'សូមគោរពអញ្ជើញ ឯកឧត្តម លោកជំទាវ លោក លោកស្រី អញ្ជើញចូលរួមពិសាអាហារសាមគ្គី ក្នុងឱកាសឡើងគេហដ្ឋានថ្មីរបស់យើងខ្ញុំ ដើម្បីសេចក្តីសុខចម្រើន',
  },
};

export class InvitationModel extends BaseModel {
  constructor() {
    super();
    this.data = {
      id: 1,
      slug: 'vibol-sovanndy',
      ...CEREMONY_PRESETS.wedding,
    };
    this.isLoading = false;
  }

  get(key) {
    return this.data[key];
  }

  getData() {
    return { ...this.data };
  }

  updateField(key, value) {
    this.data[key] = value;
    this.emit('fieldUpdated', { key, value, data: this.getData() });
  }

  selectPreset(type) {
    const preset = CEREMONY_PRESETS[type] || CEREMONY_PRESETS.wedding;
    this.data = {
      ...this.data,
      ...preset,
    };
    this.emit('presetChanged', this.getData());
  }

  async loadFromApi() {
    this.isLoading = true;
    this.emit('loadingChanged', true);
    try {
      const result = await apiService.getOrSeedDefault();
      if (result) {
        this.data = {
          id: result.id,
          slug: result.slug,
          eventType: result.event_type,
          titleKh: result.title_kh,
          groomName: result.groom_name,
          brideName: result.bride_name,
          groomParents: result.groom_parents,
          brideParents: result.bride_parents,
          ceremonyDate: result.ceremony_date,
          ceremonyTime: result.ceremony_time,
          locationName: result.location_name,
          locationAddress: result.location_address,
          googleMapsUrl: result.google_maps_url,
          themeColor: result.theme_color,
          welcomeQuote: result.welcome_quote,
          audioUrl: result.audio_url,
        };
        this.emit('dataLoaded', this.getData());
      }
    } catch (err) {
      console.warn('Using offline preset data due to backend sync issue:', err.message);
    } finally {
      this.isLoading = false;
      this.emit('loadingChanged', false);
    }
  }

  async save() {
    this.isLoading = true;
    this.emit('loadingChanged', true);
    try {
      const payload = {
        event_type: this.data.eventType,
        title_kh: this.data.titleKh,
        groom_name: this.data.groomName,
        bride_name: this.data.brideName,
        groom_parents: this.data.groomParents,
        bride_parents: this.data.brideParents,
        ceremony_date: this.data.ceremonyDate,
        ceremony_time: this.data.ceremonyTime,
        location_name: this.data.locationName,
        location_address: this.data.locationAddress,
        google_maps_url: this.data.googleMapsUrl,
        theme_color: this.data.themeColor,
        welcome_quote: this.data.welcomeQuote,
      };

      if (this.data.id) {
        const updated = await apiService.updateInvitation(this.data.id, payload);
        this.emit('saved', updated);
        return updated;
      }
    } catch (err) {
      this.emit('saveError', err);
      throw err;
    } finally {
      this.isLoading = false;
      this.emit('loadingChanged', false);
    }
  }
}
