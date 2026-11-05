import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';

// Automatically handle and reload stale dynamic chunks after new deployments
window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  window.location.reload();
});

const rootElement = document.getElementById('app');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AuthProvider>
        <AppProvider>
          <RouterProvider router={router} />
          <AuthModal />
        </AppProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}
