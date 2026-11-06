import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { CEREMONY_DATA } from '../data/templates.js';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [ceremonyType, setCeremonyType] = useState('wedding');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [currentTheme, setCurrentTheme] = useState('crimson');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  // Selected category tab state with sessionStorage persistence so it remembers user selection across navigations
  const [selectedCategory, setSelectedCategoryState] = useState(() => {
    try {
      return sessionStorage.getItem('theab_selected_category') || 'all';
    } catch (_) {
      return 'all';
    }
  });

  const setSelectedCategory = (cat) => {
    setSelectedCategoryState(cat);
    try {
      sessionStorage.setItem('theab_selected_category', cat);
    } catch (_) {}
  };

  // User Draft State (Persisted across sessions and logins)
  const [userDraft, setUserDraft] = useState(() => {
    try {
      const saved = localStorage.getItem('theab_user_draft');
      return saved ? JSON.parse(saved) : null;
    } catch (_) {
      return null;
    }
  });

  const saveUserDraft = (draft) => {
    setUserDraft(draft);
    try {
      if (draft) {
        localStorage.setItem('theab_user_draft', JSON.stringify(draft));
      } else {
        localStorage.removeItem('theab_user_draft');
      }
    } catch (_) {}
  };

  const clearUserDraft = () => {
    setUserDraft(null);
    try {
      localStorage.removeItem('theab_user_draft');
    } catch (_) {}
  };

  // Audio reference (Single authentic wedding song: «ភ្ជាប់និស្ស័យ» - NISAI)
  const [audio] = useState(() => {
    const a = new Audio('/audio/nisai_wedding_song.mp3');
    a.loop = true;
    if (typeof window !== 'undefined') {
      window.__THEAB_AUDIO__ = a;
    }
    return a;
  });

  const [invitationData, setInvitationData] = useState({
    id: 1,
    slug: 'vibol-sovanndy',
    eventType: 'wedding',
    ...CEREMONY_DATA.wedding
  });

  // Switch ceremony type
  const selectCeremony = (type) => {
    const data = CEREMONY_DATA[type] || CEREMONY_DATA.wedding;
    setCeremonyType(type);
    setInvitationData((prev) => ({
      ...prev,
      eventType: type,
      titleKh: data.title,
      groomName: data.defaultGroom,
      brideName: data.defaultBride,
      groomParents: data.defaultGroomParents,
      brideParents: data.defaultBrideParents,
      ceremonyDate: data.defaultDate,
      ceremonyTime: data.defaultTime,
      locationName: data.defaultLocation,
      locationAddress: data.defaultAddress,
      welcomeQuote: data.defaultQuote,
    }));
  };

  const shouldPlayRef = useRef(false);
  const pendingGestureRef = useRef(null);

  const clearPendingGesture = () => {
    if (pendingGestureRef.current) {
      window.removeEventListener('click', pendingGestureRef.current);
      window.removeEventListener('touchstart', pendingGestureRef.current);
      pendingGestureRef.current = null;
    }
  };

  const playAudio = () => {
    if (typeof window !== 'undefined' && window.__THEAB_ACTIVE_AUDIO__) {
      try {
        window.__THEAB_ACTIVE_AUDIO__.pause();
      } catch (_) {}
    }
    shouldPlayRef.current = true;
    clearPendingGesture();
    audio.play().then(() => {
      if (!shouldPlayRef.current) {
        audio.pause();
        audio.currentTime = 0;
        setIsAudioPlaying(false);
        return;
      }
      setIsAudioPlaying(true);
    }).catch((err) => {
      console.warn('Autoplay restricted by browser, awaiting user click:', err);
      const enableOnGesture = () => {
        if (!shouldPlayRef.current) {
          clearPendingGesture();
          return;
        }
        audio.play().then(() => {
          if (!shouldPlayRef.current) {
            audio.pause();
            audio.currentTime = 0;
            setIsAudioPlaying(false);
            return;
          }
          setIsAudioPlaying(true);
        }).catch(() => {});
        clearPendingGesture();
      };
      pendingGestureRef.current = enableOnGesture;
      window.addEventListener('click', enableOnGesture, { once: true });
      window.addEventListener('touchstart', enableOnGesture, { once: true, passive: true });
    });
  };

  const restartAndPlayAudio = () => {
    if (typeof window !== 'undefined' && window.__THEAB_ACTIVE_AUDIO__) {
      try {
        window.__THEAB_ACTIVE_AUDIO__.pause();
      } catch (_) {}
    }
    shouldPlayRef.current = true;
    clearPendingGesture();
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}

    audio.play().then(() => {
      if (!shouldPlayRef.current) {
        audio.pause();
        audio.currentTime = 0;
        setIsAudioPlaying(false);
        return;
      }
      setIsAudioPlaying(true);
    }).catch((err) => {
      console.warn('Autoplay restricted by browser, awaiting user gesture:', err);
      const enableOnGesture = () => {
        if (!shouldPlayRef.current) {
          clearPendingGesture();
          return;
        }
        try {
          audio.currentTime = 0;
        } catch (e) {}
        audio.play().then(() => {
          if (!shouldPlayRef.current) {
            audio.pause();
            audio.currentTime = 0;
            setIsAudioPlaying(false);
            return;
          }
          setIsAudioPlaying(true);
        }).catch(() => {});
        clearPendingGesture();
      };
      pendingGestureRef.current = enableOnGesture;
      window.addEventListener('click', enableOnGesture, { once: true });
      window.addEventListener('touchstart', enableOnGesture, { once: true, passive: true });
    });
  };

  const stopAudio = () => {
    shouldPlayRef.current = false;
    clearPendingGesture();
    try {
      audio.pause();
      audio.currentTime = 0;
    } catch (e) {}
    setIsAudioPlaying(false);
  };

  const pauseAudio = () => {
    shouldPlayRef.current = false;
    clearPendingGesture();
    try {
      audio.pause();
    } catch (e) {}
    setIsAudioPlaying(false);
  };

  const toggleAudio = () => {
    if (!isAudioPlaying) {
      playAudio();
      addToast('កំពុងចាក់បទ «ភ្ជាប់និស្ស័យ» - NISAI', 'info');
    } else {
      pauseAudio();
      addToast('បានបិទភ្លេង', 'info');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__THEAB_AUDIO_PLAYING__ = isAudioPlaying;
      window.__THEAB_TOGGLE_AUDIO__ = toggleAudio;
      window.__THEAB_PLAY_AUDIO__ = playAudio;
      window.__THEAB_PAUSE_AUDIO__ = pauseAudio;
      window.__THEAB_STOP_AUDIO__ = stopAudio;
      window.__THEAB_RESTART_AUDIO__ = restartAndPlayAudio;
      window.dispatchEvent(new CustomEvent('theab_audio_change', { detail: { isPlaying: isAudioPlaying } }));
    }
  }, [isAudioPlaying, audio]);

  const addToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        ceremonyType,
        selectCeremony,
        selectedTemplate,
        setSelectedTemplate,
        currentTheme,
        setCurrentTheme,
        isAudioPlaying,
        toggleAudio,
        playAudio,
        restartAndPlayAudio,
        stopAudio,
        pauseAudio,
        toasts,
        addToast,
        removeToast,
        isQrModalOpen,
        setIsQrModalOpen,
        invitationData,
        setInvitationData,
        selectedCategory,
        setSelectedCategory,
        userDraft,
        saveUserDraft,
        clearUserDraft,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
