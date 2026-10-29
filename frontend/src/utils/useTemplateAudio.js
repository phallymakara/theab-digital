import { useState, useEffect, useRef, useCallback } from 'react';

// Single global pointer to ensure at most one isolated audio plays at a time
let activeGlobalAudio = null;

export class IsolatedAudioPlayer {
  constructor(soundUrl = '/audio/nisai_wedding_song.mp3') {
    this.soundUrl = soundUrl;
    this.audio = null;
    this.isPlaying = false;
    this.subscribers = new Set();
  }

  getAudio() {
    if (!this.audio && typeof Audio !== 'undefined') {
      const a = new Audio(this.soundUrl);
      a.loop = true;
      a.addEventListener('play', () => {
        if (activeGlobalAudio && activeGlobalAudio !== a) {
          try {
            activeGlobalAudio.pause();
          } catch (_) {}
        }
        activeGlobalAudio = a;
        this.isPlaying = true;
        this.notify();
      });
      a.addEventListener('pause', () => {
        if (activeGlobalAudio === a) {
          activeGlobalAudio = null;
        }
        this.isPlaying = false;
        this.notify();
      });
      a.addEventListener('ended', () => {
        this.isPlaying = false;
        this.notify();
      });
      this.audio = a;
    }
    return this.audio;
  }

  subscribe(callback) {
    this.subscribers.add(callback);
    callback(this.isPlaying);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => {
      try {
        cb(this.isPlaying);
      } catch (_) {}
    });
  }

  play() {
    const a = this.getAudio();
    if (a) {
      return a.play().then(() => {
        this.isPlaying = true;
        this.notify();
        return true;
      }).catch(() => {
        return false;
      });
    }
    return Promise.resolve(false);
  }

  pause() {
    if (this.audio) {
      try {
        this.audio.pause();
      } catch (_) {}
      this.isPlaying = false;
      this.notify();
    }
  }

  toggle() {
    const a = this.getAudio();
    if (!a) return false;
    if (a.paused) {
      this.play();
      return true;
    } else {
      this.pause();
      return false;
    }
  }

  destroy() {
    if (this.audio) {
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
      } catch (_) {}
      if (activeGlobalAudio === this.audio) {
        activeGlobalAudio = null;
      }
      this.audio = null;
    }
    this.isPlaying = false;
    this.notify();
    this.subscribers.clear();
  }
}

/**
 * Custom React Hook for fully isolated audio in each template.
 * - Guarantees isolated audio instance per component.
 * - Uses the authentic original wedding song (/audio/nisai_wedding_song.mp3).
 * - Automatically destroys and stops audio when the template unmounts.
 */
export function useTemplateAudio(autoPlay = false) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  if (!playerRef.current) {
    playerRef.current = new IsolatedAudioPlayer();
  }

  useEffect(() => {
    const player = playerRef.current;
    const unsubscribe = player.subscribe(setIsPlaying);

    if (autoPlay) {
      player.play();
    }

    return () => {
      unsubscribe();
      player.destroy();
    };
  }, [autoPlay]);

  const toggle = useCallback(() => {
    return playerRef.current ? playerRef.current.toggle() : false;
  }, []);

  const play = useCallback(() => {
    return playerRef.current ? playerRef.current.play() : Promise.resolve(false);
  }, []);

  const pause = useCallback(() => {
    if (playerRef.current) playerRef.current.pause();
  }, []);

  return {
    isPlaying,
    toggleAudio: toggle,
    toggleMusic: toggle,
    playAudio: play,
    pauseAudio: pause,
    player: playerRef.current
  };
}

export default useTemplateAudio;

