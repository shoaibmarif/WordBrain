import React, { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { Home } from './pages/Home';

// The home page ships in the main bundle; everything else loads on demand.
const Daily = lazy(() => import('./pages/Daily').then((m) => ({ default: m.Daily })));
const Practice = lazy(() => import('./pages/Practice').then((m) => ({ default: m.Practice })));
const Timed = lazy(() => import('./pages/Timed').then((m) => ({ default: m.Timed })));
const LengthPage = lazy(() => import('./pages/LengthPage').then((m) => ({ default: m.LengthPage })));
const HowToPlay = lazy(() => import('./pages/HowToPlay').then((m) => ({ default: m.HowToPlay })));
const Strategies = lazy(() => import('./pages/Strategies').then((m) => ({ default: m.Strategies })));
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./pages/Terms').then((m) => ({ default: m.Terms })));
const Sitemap = lazy(() => import('./pages/Sitemap').then((m) => ({ default: m.Sitemap })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
};

const Loading = () => <div className="min-h-[60vh]" aria-busy="true" />;

export const App: React.FC = () => (
  <AppLayout>
    <ScrollToTop />
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/timed" element={<Timed />} />
        {[5, 6, 7, 8].map((n) => (
          <Route key={n} path={`/${n}-letter-word-game`} element={<LengthPage length={n as 5 | 6 | 7 | 8} />} />
        ))}
        <Route path="/how-to-play" element={<HowToPlay />} />
        <Route path="/strategies" element={<Strategies />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </AppLayout>
);
