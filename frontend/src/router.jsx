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

// Lazy load helper that self-heals when a new deployment updates chunk hashes
function lazyWithRetry(importFn) {
  return React.lazy(async () => {
    try {
      return await importFn();
    } catch (error) {
      let isChunkError = false;
      try {
        const msg = String(error?.message || '');
        isChunkError =
          msg.includes('dynamically imported module') ||
          msg.includes('Failed to fetch') ||
          msg.includes('Loading chunk') ||
          error?.name === 'TypeError';
      } catch (_) {}

      let hasReloaded = false;
      try {
        hasReloaded = window.sessionStorage?.getItem('vite-chunk-reload') === 'true';
      } catch (_) {}

      if (isChunkError && !hasReloaded) {
        try {
          window.sessionStorage?.setItem('vite-chunk-reload', 'true');
        } catch (_) {}
        window.location.reload();
        return new Promise(() => {});
      }
      try {
        window.sessionStorage?.removeItem('vite-chunk-reload');
      } catch (_) {}
      throw error;
    }
  });
}

// Route-Level Lazy Loading: Load each page on-demand with automatic reload protection
const CeremonySelectionPage = lazyWithRetry(() => import('./pages/CeremonySelectionPage').then(m => ({ default: m.CeremonySelectionPage })));
const TemplatesPage = lazyWithRetry(() => import('./pages/TemplatesPage').then(m => ({ default: m.TemplatesPage })));
const DashboardPage = lazyWithRetry(() => import('./pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const TemplateDetailPage = lazyWithRetry(() => import('./pages/TemplateDetailPage').then(m => ({ default: m.TemplateDetailPage })));
const TemplateCustomizerPage = lazyWithRetry(() => import('./pages/TemplateCustomizerPage').then(m => ({ default: m.TemplateCustomizerPage })));
const SuperAdminPage = lazyWithRetry(() => import('./pages/SuperAdminPage').then(m => ({ default: m.SuperAdminPage })));

// Stable Route Wrappers to prevent unmounting/remounting on router re-evaluations
function WeddingRouteComponent() {
  return <TemplatesPage ceremonyType="wedding" />;
}
function GuestWeddingRouteComponent() {
  return <TemplatesPage ceremonyType="wedding" isGuestMode={true} />;
}
function EngagementRouteComponent() {
  return <TemplatesPage ceremonyType="engagement" />;
}
function HousewarmingRouteComponent() {
  return <TemplatesPage ceremonyType="housewarming" />;
}

// Minimal luxury fallback during route transitions
function RouteLoadingFallback() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] p-8 text-stone-500">
      <div className="w-9 h-9 border-2 border-theabCrimson/30 border-t-theabCrimson rounded-full animate-spin mb-3" />
      <span className="font-komutt text-xs text-stone-500">កំពុងដំណើរការ...</span>
    </div>
  );
}

// Polite and resilient Khmer Root Error Component (Eliminates raw "Something went wrong" messages)
function RootErrorComponent({ reset }) {
  return (
    <div className="flex-1 min-h-[60vh] flex flex-col items-center justify-center p-6 text-center animate-fade">
      <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 text-theabCrimson flex items-center justify-center mb-3">
        <span className="font-moul text-base text-theabCrimson">ធ</span>
      </div>
      <h2 className="font-moul text-base sm:text-lg text-rose-950 mb-2">
        សូមអភ័យទោស មានការរអាក់រអួលបន្តិចបន្តួច
      </h2>
      <p className="text-xs text-stone-500 max-w-sm mb-5 leading-relaxed">
        ប្រព័ន្ធមិនអាចដំណើរការទំព័រនេះបាននៅពេលនេះទេ។ សូមចុចប៊ូតុងខាងក្រោមដើម្បីព្យាយាមម្តងទៀត ឬត្រឡប់ទៅកាន់ទំព័រដើម។
      </p>
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if (reset) {
              reset();
            } else {
              window.location.reload();
            }
          }}
          className="btn-primary !py-2 !px-4 text-xs cursor-pointer text-white"
        >
          ព្យាយាមម្តងទៀត
        </button>
        <button
          onClick={() => {
            window.location.href = '/';
          }}
          className="btn-secondary !py-2 !px-4 text-xs cursor-pointer"
        >
          ត្រឡប់ទៅទំព័រដើម
        </button>
      </div>
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
  errorComponent: RootErrorComponent,
});

// Route: / (Ceremony Selection)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CeremonySelectionPage,
  errorComponent: RootErrorComponent,
});

// Route: /wedding (Wedding Templates Gallery)
const weddingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wedding',
  component: WeddingRouteComponent,
  errorComponent: RootErrorComponent,
});

// Route: /guest/wedding (Guest View-Only Wedding Templates Gallery)
const guestWeddingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guest/wedding',
  component: GuestWeddingRouteComponent,
  errorComponent: RootErrorComponent,
});

// Route: /engagement (Engagement Templates Gallery)
const engagementRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/engagement',
  component: EngagementRouteComponent,
  errorComponent: RootErrorComponent,
});

// Route: /housewarming (Housewarming Templates Gallery)
const housewarmingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/housewarming',
  component: HousewarmingRouteComponent,
  errorComponent: RootErrorComponent,
});

// Route: /invitation (Direct to Luxury Template)
const invitationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/invitation',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /dashboard (Guest RSVP Dashboard)
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: DashboardPage,
  errorComponent: RootErrorComponent,
});

// Route: /wedding/$templateId (Dedicated Wedding Template Route)
const weddingTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/wedding/$templateId',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /guest/wedding/$templateId (Dedicated Guest View Wedding Template Route)
const guestWeddingTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guest/wedding/$templateId',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /guest/engagement/$templateId (Dedicated Guest View Engagement Template Route)
const guestEngagementTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guest/engagement/$templateId',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /guest/housewarming/$templateId (Dedicated Guest View Housewarming Template Route)
const guestHousewarmingTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guest/housewarming/$templateId',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /guest/$templateId (Dedicated Guest View Direct Invitation Route)
const guestDirectTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/guest/$templateId',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /engagement/$templateId
const engagementTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/engagement/$templateId',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /housewarming/$templateId
const housewarmingTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/housewarming/$templateId',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /$templateId/preview (Template Detail & Preview by Card ID)
const templatePreviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/$templateId/preview',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /preview/$templateId
const previewTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview/$templateId',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /preview (General preview default)
const previewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/preview',
  component: TemplateDetailPage,
  errorComponent: RootErrorComponent,
});

// Route: /customize/$templateId
const customizeTemplateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customize/$templateId',
  component: TemplateCustomizerPage,
  errorComponent: RootErrorComponent,
});

// Route: /customize
const customizeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/customize',
  component: TemplateCustomizerPage,
  errorComponent: RootErrorComponent,
});

// Route: /superadmin (Platform Administration & Metrics Console)
const superAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/superadmin',
  component: SuperAdminPage,
  errorComponent: RootErrorComponent,
});

// Route: /admin (Alias for Superadmin Console)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: SuperAdminPage,
  errorComponent: RootErrorComponent,
});

// Build route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  weddingRoute,
  guestWeddingRoute,
  weddingTemplateRoute,
  guestWeddingTemplateRoute,
  guestEngagementTemplateRoute,
  guestHousewarmingTemplateRoute,
  guestDirectTemplateRoute,
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
  superAdminRoute,
  adminRoute,
]);

// Create TanStack Router instance (defaultPreload: false prevents eager background downloading)
export const router = createRouter({
  routeTree,
  defaultPreload: false,
  defaultErrorComponent: RootErrorComponent,
});
