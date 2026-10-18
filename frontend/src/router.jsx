import React from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { QrModal } from './components/QrModal';
import { CeremonySelectionPage } from './pages/CeremonySelectionPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { InvitationPreviewPage } from './pages/InvitationPreviewPage';
import { DashboardPage } from './pages/DashboardPage';

// Root Route layout
const rootRoute = createRootRoute({
  component: () => (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <ToastContainer />
      <QrModal />
    </div>
  ),
});

// Route: / (Ceremony Selection)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CeremonySelectionPage,
});

// Route: /wedding (Wedding Templates Gallery)
const weddingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wedding',
  component: () => <TemplatesPage ceremonyType="wedding" />,
});

// Route: /engagement (Engagement Templates Gallery)
const engagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/engagement',
  component: () => <TemplatesPage ceremonyType="engagement" />,
});

// Route: /housewarming (Housewarming Templates Gallery)
const housewarmingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/housewarming',
  component: () => <TemplatesPage ceremonyType="housewarming" />,
});

// Route: /invitation (Live Theab & RSVP)
const invitationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invitation',
  component: InvitationPreviewPage,
});

// Route: /dashboard (Guest RSVP Dashboard)
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
});

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  weddingRoute,
  engagementRoute,
  housewarmingRoute,
  invitationRoute,
  dashboardRoute,
]);

// Create TanStack Router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});
