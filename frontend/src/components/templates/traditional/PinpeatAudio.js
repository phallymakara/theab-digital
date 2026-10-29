// Authentic Traditional Khmer Wedding Music («ភ្ជាប់និស្ស័យ» - NISAI)
// Exclusively uses the original wedding soundtrack and eliminates all artificial synthesizer audio.
class PlengKarAudioPlayer {
  constructor() {
    this.audio = null;
  }

  getAudio() {
    if (typeof window !== 'undefined' && window.__THEAB_AUDIO__) {
      return window.__THEAB_AUDIO__;
    }
    if (!this.audio && typeof Audio !== 'undefined') {
      this.audio = new Audio('/audio/nisai_wedding_song.mp3');
      this.audio.loop = true;
    }
    return this.audio;
  }

  get isPlaying() {
    if (typeof window !== 'undefined' && typeof window.__THEAB_AUDIO_PLAYING__ === 'boolean') {
      return window.__THEAB_AUDIO_PLAYING__;
    }
    const a = this.getAudio();
    return a ? !a.paused : false;
  }

  play() {
    if (typeof window !== 'undefined' && typeof window.__THEAB_PLAY_AUDIO__ === 'function') {
      window.__THEAB_PLAY_AUDIO__();
      return;
    }
    const a = this.getAudio();
    if (a) {
      a.play().catch(() => {});
    }
  }

  stop() {
    if (typeof window !== 'undefined' && typeof window.__THEAB_PAUSE_AUDIO__ === 'function') {
      window.__THEAB_PAUSE_AUDIO__();
      return;
    }
    const a = this.getAudio();
    if (a) {
      try {
        a.pause();
      } catch (_) {}
    }
  }

  toggle() {
    if (typeof window !== 'undefined' && typeof window.__THEAB_TOGGLE_AUDIO__ === 'function') {
      window.__THEAB_TOGGLE_AUDIO__();
      return !window.__THEAB_AUDIO_PLAYING__;
    }
    const a = this.getAudio();
    if (!a) return false;
    if (a.paused) {
      a.play().catch(() => {});
      return true;
    } else {
      a.pause();
      return false;
    }
  }
}

export const plengKarSynth = new PlengKarAudioPlayer();
export const pinpeatSynth = plengKarSynth;
export default plengKarSynth;
