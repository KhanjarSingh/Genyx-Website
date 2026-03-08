import { useEffect, useState } from 'react';
import { CSS } from './styles/siteCss';
import { Cursor, Nav } from './components/LayoutChrome';
import { HomePage, PlatformPage, AnalyticsPage, AboutPage, ContactPage } from './pages/SitePages';

const pageToPath = {
  home: '/',
  platform: '/platform',
  analytics: '/analytics',
  about: '/about',
  contact: '/contact',
};

const pathToPage = {
  '/': 'home',
  '/platform': 'platform',
  '/analytics': 'analytics',
  '/about': 'about',
  '/contact': 'contact',
};

function resolvePage(pathname) {
  return pathToPage[pathname] || 'home';
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('gx-theme') || 'dark'; } catch { return 'dark'; }
  });

  const [page, setPage] = useState(() => resolvePage(window.location.pathname));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('gx-theme', theme); } catch { /* ignore storage errors */ }
  }, [theme]);

  useEffect(() => {
    const onPopState = () => setPage(resolvePage(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (pg) => {
    const next = pageToPath[pg] || '/';
    if (window.location.pathname !== next) {
      window.history.pushState({}, '', next);
    }
    setPage(pg);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <Cursor />
      <Nav
        theme={theme}
        toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        page={page}
        setPage={navigate}
      />
      <main>
        {page === 'home' && <HomePage />}
        {page === 'platform' && <PlatformPage />}
        {page === 'analytics' && <AnalyticsPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
      </main>
    </>
  );
}
