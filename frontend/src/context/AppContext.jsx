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

  // Audio reference
  const [audio] = useState(() => {
    const a = new Audio('/audio/nisai_wedding_song.mp3');
    a.loop = true;
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
      window.addEventListener('touchstart', enableOnGesture, { once: true });
    });
  };

  const restartAndPlayAudio = () => {
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
      window.addEventListener('touchstart', enableOnGesture, { once: true });
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
