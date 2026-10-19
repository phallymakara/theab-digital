import React, { createContext, useContext, useState, useEffect } from 'react';
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
    const a = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=traditional-asian-instrumental-wedding-112191.mp3');
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

  const playAudio = () => {
    audio.play().then(() => {
      setIsAudioPlaying(true);
    }).catch((err) => {
      console.warn('Autoplay restricted by browser, awaiting user click:', err);
      // If browser blocks autoplay, start on next click/touch anywhere on the page
      const enableOnGesture = () => {
        audio.play().then(() => {
          setIsAudioPlaying(true);
        }).catch(() => {});
        window.removeEventListener('click', enableOnGesture);
        window.removeEventListener('touchstart', enableOnGesture);
      };
      window.addEventListener('click', enableOnGesture, { once: true });
      window.addEventListener('touchstart', enableOnGesture, { once: true });
    });
  };

  const pauseAudio = () => {
    try {
      audio.pause();
    } catch (e) {}
    setIsAudioPlaying(false);
  };

  const toggleAudio = () => {
    if (!isAudioPlaying) {
      playAudio();
      addToast('កំពុងចាក់ភ្លេងមង្គលបែបប្រពៃណី', 'info');
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
