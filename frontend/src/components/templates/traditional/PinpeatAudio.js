// Web Audio API Synthesizer for Authentic Traditional Khmer Pleng Kar (Wedding Music) & Auspicious Chimes
class PlengKarSynthesizer {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play single warm chime or wedding bell
  playNote(freq, type = 'sine', duration = 1.3, gainValue = 0.12) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Khmer wedding auspicious pentatonic melody (ភ្លេងការមង្គល)
  playMelody() {
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    let step = 0;

    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      const note = scale[step % scale.length];
      this.playNote(note, 'triangle', 1.8, 0.10);
      if (step % 2 === 0) {
        this.playNote(scale[(step + 2) % scale.length] * 0.5, 'sine', 2.2, 0.07);
      }
      step++;
    }, 650);
  }

  toggle() {
    this.init();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.isPlaying = true;
      this.playMelody();
      return true;
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const plengKarSynth = new PlengKarSynthesizer();
// Backwards compatibility alias
export const pinpeatSynth = plengKarSynth;
export default plengKarSynth;
