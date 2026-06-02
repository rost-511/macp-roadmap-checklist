import { useEffect, useState } from 'react';
import App from './App';
import { LandingPage } from './landing/LandingPage';

/**
 * Lightweight hash router (no dependencies). The landing page is the front
 * door; `#/app` resolves to the roadmap checklist. Landing in-page anchors
 * (#how / #features / #progress / #top) don't start with `#/app`, so they
 * scroll within the landing page without triggering navigation.
 */
function isAppRoute(hash: string): boolean {
  return hash.startsWith('#/app');
}

export default function Root() {
  const [showApp, setShowApp] = useState(() => isAppRoute(window.location.hash));

  useEffect(() => {
    const onHashChange = () => {
      const next = isAppRoute(window.location.hash);
      setShowApp((prev) => {
        // Jump to the top of the page whenever we switch surfaces.
        if (next !== prev) window.scrollTo(0, 0);
        return next;
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = showApp
      ? 'MACP Roadmap · Build Tracker'
      : 'MACP — Build the system you return to';
  }, [showApp]);

  return showApp ? <App /> : <LandingPage />;
}
