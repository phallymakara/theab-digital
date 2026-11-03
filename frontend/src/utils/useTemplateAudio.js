import { useState, useEffect, useRef, useCallback } from 'react';

// Single global pointer to ensure at most one audio plays across the entire window and iframes
function stopAllOtherAudios(currentAudio) {
  if (typeof window === 'undefined') return;

  // 1. Stop AppContext audio if playing
  if (window.__THEAB_AUDIO__ && window.__THEAB_AUDIO__ !== currentAudio) {
    try {
      window.__THEAB_AUDIO__.pause();
      if (typeof window.__THEAB_STOP_AUDIO__ === 'function') {
        window.__THEAB_STOP_AUDIO__();
      }
    } catch (_) {}
  }

  // 2. Stop previously active global isolated audio
  if (window.__THEAB_ACTIVE_AUDIO__ && window.__THEAB_ACTIVE_AUDIO__ !== currentAudio) {
    try {
      window.__THEAB_ACTIVE_AUDIO__.pause();
    } catch (_) {}
  }
  window.__THEAB_ACTIVE_AUDIO__ = currentAudio;

  // 3. If running inside an iframe, stop parent audio
  if (window.parent && window.parent !== window) {
    try {
      if (window.parent.__THEAB_AUDIO__) {
        window.parent.__THEAB_AUDIO__.pause();
        if (typeof window.parent.__THEAB_STOP_AUDIO__ === 'function') {
          window.parent.__THEAB_STOP_AUDIO__();
        }
      }
      if (window.parent.__THEAB_ACTIVE_AUDIO__) {
        window.parent.__THEAB_ACTIVE_AUDIO__.pause();
      }
      window.parent.postMessage({ type: 'STOP_PARENT_AUDIO' }, '*');
    } catch (_) {}
  }
}

export class IsolatedAudioPlayer {
  constructor(soundUrl = '/audio/nisai_wedding_song.mp3') {
    this.soundUrl = soundUrl;
    this.audio = null;
    this.isPlaying = false;
    this.subscribers = new Set();
    this.userMuted = false;
    this.gestureHandler = null;
  }

  getAudio() {
    if (!this.audio && typeof Audio !== 'undefined') {
      const a = new Audio(this.soundUrl);
      a.loop = true;
      a.addEventListener('play', () => {
        stopAllOtherAudios(a);
        this.isPlaying = true;
        this.notify();
      });
      a.addEventListener('pause', () => {
        if (typeof window !== 'undefined' && window.__THEAB_ACTIVE_AUDIO__ === a) {
          window.__THEAB_ACTIVE_AUDIO__ = null;
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

  removeGestureListener() {
    if (this.gestureHandler && typeof window !== 'undefined') {
      window.removeEventListener('click', this.gestureHandler);
      window.removeEventListener('touchstart', this.gestureHandler);
      window.removeEventListener('pointerdown', this.gestureHandler);
      window.removeEventListener('keydown', this.gestureHandler);
      this.gestureHandler = null;
    }
  }

  attachGestureListener() {
    if (typeof window === 'undefined' || this.gestureHandler || this.userMuted) return;

    this.gestureHandler = () => {
      this.removeGestureListener();
      if (!this.userMuted) {
        this.play();
      }
    };

    window.addEventListener('click', this.gestureHandler, { once: true, passive: true });
    window.addEventListener('touchstart', this.gestureHandler, { once: true, passive: true });
    window.addEventListener('pointerdown', this.gestureHandler, { once: true, passive: true });
    window.addEventListener('keydown', this.gestureHandler, { once: true, passive: true });
  }

  play() {
    this.userMuted = false;
    this.removeGestureListener();
    const a = this.getAudio();
    if (a) {
      stopAllOtherAudios(a);
      return a.play().then(() => {
        this.isPlaying = true;
        this.notify();
        return true;
      }).catch(() => {
        // Autoplay restricted by browser policy; wait for first user gesture
        if (!this.userMuted) {
          this.attachGestureListener();
        }
        return false;
      });
    }
    return Promise.resolve(false);
  }

  pause() {
    this.userMuted = true;
    this.removeGestureListener();
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
    this.removeGestureListener();
    if (this.audio) {
      try {
        this.audio.pause();
        this.audio.currentTime = 0;
      } catch (_) {}
      if (typeof window !== 'undefined' && window.__THEAB_ACTIVE_AUDIO__ === this.audio) {
        window.__THEAB_ACTIVE_AUDIO__ = null;
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
 * - Guarantees only one audio plays at any time globally.
 * - Uses the authentic original wedding song (/audio/nisai_wedding_song.mp3).
 * - Plays sound by default (with seamless gesture fallback for browser autoplay restrictions).
 * - Automatically destroys and stops audio when the template unmounts.
 */
export function useTemplateAudio(autoPlay = true) {
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
