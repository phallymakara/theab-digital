import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => apiService.getToken());
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [pendingCallback, setPendingCallback] = useState(null);

  // Check token on initial mount
  useEffect(() => {
    async function loadUser() {
      const savedToken = apiService.getToken();
      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const profile = await apiService.getMe();
        setUser(profile);
      } catch (err) {
        console.warn('Session expired or invalid, logging out.');
        apiService.logout();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await apiService.login(email, password);
    setToken(res.access_token);
    setUser(res.user);
    if (pendingCallback) {
      pendingCallback(res.user);
      setPendingCallback(null);
    }
    setIsAuthModalOpen(false);
    return res;
  };

  const register = async (userData) => {
    const res = await apiService.register(userData);
    setToken(res.access_token);
    setUser(res.user);
    if (pendingCallback) {
      pendingCallback(res.user);
      setPendingCallback(null);
    }
    setIsAuthModalOpen(false);
    return res;
  };

  const logout = () => {
    apiService.logout();
    setToken(null);
    setUser(null);
  };

  const openAuthModal = (callback = null) => {
    if (callback) {
      setPendingCallback(() => callback);
    }
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setPendingCallback(null);
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
