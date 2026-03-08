import React, { useEffect, useRef, useState } from 'react';

function TIcon({ theme }) {
  return theme === 'dark' ? (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" style={{ stroke: 'var(--txt)', transition: 'stroke .4s ease' }}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" style={{ stroke: 'var(--txt)', transition: 'stroke .4s ease' }}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const mv = e => { el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px'; };
    const ov = e => { e.target.closest('a,button,[data-h]') ? el.classList.add('lg') : el.classList.remove('lg'); };
    window.addEventListener('mousemove', mv, { passive: true });
    window.addEventListener('mouseover', ov, { passive: true });
    return () => { window.removeEventListener('mousemove', mv); window.removeEventListener('mouseover', ov); };
  }, []);
  return <div id="cur" ref={ref} />;
}

export function Nav({ theme, toggleTheme, page, setPage }) {
  const [up, setUp] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setUp(window.scrollY > 44);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const links = [
    { label: 'Home', pg: 'home' },
    { label: 'Platform', pg: 'platform' },
    { label: 'Analytics', pg: 'analytics' },
    { label: 'About', pg: 'about' },
    { label: 'Contact', pg: 'contact' },
  ];

  const go = (pg) => { setPage(pg); setOpen(false); };

  return (
    <>
      <nav className="np" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 60, display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
        paddingLeft: 52, paddingRight: 52,
        background: up || open ? 'var(--nb)' : 'transparent',
        backdropFilter: up || open ? 'blur(20px)' : 'none',
        borderBottom: up || open ? '1px solid var(--div)' : 'none',
        transition: 'background .35s ease, border-color .35s ease',
      }}>
        <button onClick={() => go('home')} style={{ display: 'flex', alignItems: 'center', gap: 9, zIndex: 101, background: 'none', border: 'none', padding: 0, justifySelf: 'start' }}>
          <img
            src="/genyx-logo.svg"
            alt="Genyx"
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'scale(1.2)',
              border: '1px solid var(--bd)',
              display: 'block',
            }}
          />
        </button>

        <div className="nm" style={{ display: 'flex', gap: 36 }}>
          {links.map(({ label, pg }) => (
            <button key={label} onClick={() => go(pg)} className="nl" style={{
              background: 'none', border: 'none', padding: 0,
              color: page === pg ? 'var(--txt)' : undefined,
            }}>{label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, zIndex: 101, justifySelf: 'end' }}>
          <button className="tt" onClick={toggleTheme} aria-label="Toggle theme"><TIcon theme={theme} /></button>
          <button className="cp nm-cta" onClick={() => go('contact')} style={{
            background: 'transparent', border: '1px solid var(--bd)',
            borderRadius: 100, padding: '8px 20px',
            color: 'var(--txt)', fontSize: 12, fontWeight: 500, letterSpacing: '.05em',
            transition: 'color .4s ease, border-color .4s ease',
          }}>
            <span>Request Access</span>
          </button>
          <button className="hb" onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span className="hb-line" style={{ transform: open ? 'translateY(6.5px) rotate(45deg)' : 'none' }} />
            <span className="hb-line" style={{ opacity: open ? 0 : 1 }} />
            <span className="hb-line" style={{ transform: open ? 'translateY(-6.5px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div className={`mob-menu${open ? ' open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: '100%', padding: '0 40px' }}>
          {links.map(({ label, pg }, i) => (
            <button key={label} onClick={() => go(pg)} style={{
              display: 'block', width: '100%', textAlign: 'center',
              padding: '18px 0', fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 500,
              color: 'var(--txt)', letterSpacing: '-.01em',
              background: 'none', border: 'none',
              borderBottom: i < links.length - 1 ? '1px solid var(--div)' : 'none',
              transition: 'color .2s ease',
            }}>{label}</button>
          ))}
        </div>
        <button className="cp" onClick={() => go('contact')} style={{
          marginTop: 40, background: 'transparent',
          border: '1px solid var(--a)', borderRadius: 100,
          padding: '14px 44px', color: 'var(--txt)',
          fontSize: 14, fontWeight: 500, letterSpacing: '.06em',
          transition: 'color .4s ease, border-color .4s ease',
        }}>
          <span>Request Access</span>
        </button>
      </div>
    </>
  );
}
