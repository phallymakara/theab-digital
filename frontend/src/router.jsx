import React, { Suspense } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from '@tanstack/react-router';
import { Header } from './components/Header';
import { ToastContainer } from './components/ToastContainer';
import { QrModal } from './components/QrModal';

// Route-Level Lazy Loading: Load each page on-demand only when requested by user
const CeremonySelectionPage = React.lazy(() => import('./pages/CeremonySelectionPage').then(m => ({ default: m.CeremonySelectionPage })));
const TemplatesPage = React.lazy(() => import('./pages/TemplatesPage').then(m => ({ default: m.TemplatesPage })));
const InvitationPreviewPage = React.lazy(() => import('./pages/InvitationPreviewPage').then(m => ({ default: m.InvitationPreviewPage })));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const TemplateDetailPage = React.lazy(() => import('./pages/TemplateDetailPage').then(m => ({ default: m.TemplateDetailPage })));
const TemplateCustomizerPage = React.lazy(() => import('./pages/TemplateCustomizerPage').then(m => ({ default: m.TemplateCustomizerPage })));

// Minimal luxury fallback during route transitions
function RouteLoadingFallback() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] p-8 text-stone-500">
      <div className="w-9 h-9 border-2 border-theabCrimson/30 border-t-theabCrimson rounded-full animate-spin mb-3" />
      <span className="font-komutt text-xs text-stone-500">កំពុងដំណើរការ...</span>
    </div>
  );
}

// Root Layout Component with Page Visibility Lifecycle Manager
function RootLayout() {
  React.useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        document.documentElement.classList.add('app-idle-paused');
      } else {
        document.documentElement.classList.remove('app-idle-paused');
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col">
        <Suspense fallback={<RouteLoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <ToastContainer />
      <QrModal />
    </div>
  );
}

// Root Route layout
const rootRoute = createRootRoute({
  component: RootLayout,
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

// Route: /guest/wedding (Guest View-Only Wedding Templates Gallery)
const guestWeddingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guest/wedding',
  component: () => <TemplatesPage ceremonyType="wedding" isGuestMode={true} />,
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

// Route: /wedding/$templateId (Dedicated Wedding Template Route)
const weddingTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wedding/$templateId',
  component: TemplateDetailPage,
});

// Route: /guest/wedding/$templateId (Dedicated Guest View Wedding Template Route)
const guestWeddingTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guest/wedding/$templateId',
  component: TemplateDetailPage,
});

// Route: /engagement/$templateId
const engagementTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/engagement/$templateId',
  component: TemplateDetailPage,
});

// Route: /housewarming/$templateId
const housewarmingTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/housewarming/$templateId',
  component: TemplateDetailPage,
});

// Route: /$templateId/preview (Template Detail & Preview by Card ID)
const templatePreviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$templateId/preview',
  component: TemplateDetailPage,
});

// Route: /preview/$templateId
const previewTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview/$templateId',
  component: TemplateDetailPage,
});

// Route: /preview (General preview default)
const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview',
  component: TemplateDetailPage,
});

// Route: /customize/$templateId
const customizeTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customize/$templateId',
  component: TemplateCustomizerPage,
});

// Route: /customize
const customizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customize',
  component: TemplateCustomizerPage,
});

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  weddingRoute,
  guestWeddingRoute,
  weddingTemplateRoute,
  guestWeddingTemplateRoute,
  engagementRoute,
  engagementTemplateRoute,
  housewarmingRoute,
  housewarmingTemplateRoute,
  invitationRoute,
  dashboardRoute,
  templatePreviewRoute,
  previewTemplateRoute,
  previewRoute,
  customizeTemplateRoute,
  customizeRoute,
]);

// Create TanStack Router instance (defaultPreload: false prevents eager background downloading)
export const router = createRouter({
  routeTree,
  defaultPreload: false,
});
