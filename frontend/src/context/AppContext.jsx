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

  const toggleAudio = () => {
    if (!isAudioPlaying) {
      audio.play().catch((err) => console.warn('Audio play restricted:', err));
      setIsAudioPlaying(true);
      addToast('កំពុងចាក់ភ្លេងមង្គលបែបប្រពៃណី', 'info');
    } else {
      audio.pause();
      setIsAudioPlaying(false);
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
