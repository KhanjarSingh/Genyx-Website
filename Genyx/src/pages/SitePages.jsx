import React, { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/useReveal';
import ArduCamModule3 from '../components/ArduCamModule3';
import podSpec from '../assets/pod2.jpeg';
import mobileHandImg from '../assets/Mobile.jpeg';
import kushKadhyanImg from '../assets/kush Sir.jpeg';
import siddarthaImg from '../assets/lastest_siddhart.jpeg';
import shashankMitalImg from '../assets/shashank_mital.png';
import podAestheticImg from '../assets/pod asthetic pic.jpeg';

const DEMO_VIDEO = 'https://cdn.speedsize.com/3f711f28-1488-44dc-b013-5e43284ac4b0/https://public-web-assets.uh-static.com/web_v2/homepage-v3/app-section/display-videos/ring-new.mp4';

function PodSVG({ size = 300 }) {
  const s = size;
  return (
    <svg width={s} height={s * 1.35} viewBox="0 0 300 405" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pbg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e1e" /><stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <radialGradient id="lgr" cx="42%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#202020" />
          <stop offset="50%" stopColor="#0e0e0e" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
        <linearGradient id="lring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4DFFEF" stopOpacity="0.75" />
          <stop offset="30%" stopColor="#4DFFEF" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#4DFFEF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#4DFFEF" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="aura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4DFFEF" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#4DFFEF" stopOpacity="0" />
        </radialGradient>
        <filter id="pod-blur" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="14" result="b" />
          <feFlood floodColor="#4DFFEF" floodOpacity="0.07" result="c" />
          <feComposite in="c" in2="b" operator="in" result="cb" />
          <feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="led-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Ambient lens glow behind pod */}
      <ellipse cx="150" cy="195" rx="100" ry="72" fill="url(#aura)" className="lens-glow" />

      {/* Mount arm */}
      <rect x="142" y="0" width="16" height="72" rx="4" fill="rgba(255,255,255,0.05)" />
      {/* Mount bracket */}
      <rect x="124" y="67" width="52" height="16" rx="4" fill="rgba(255,255,255,0.07)" />

      {/* Pod body */}
      <rect x="44" y="83" width="212" height="140" rx="32" fill="url(#pbg)" filter="url(#pod-blur)" />

      {/* Pod body highlight – top rim */}
      <path d="M76 83 Q150 80 224 83" stroke="rgba(255,255,255,0.09)" strokeWidth="1.5" fill="none" />

      {/* Pod side vents (subtle) */}
      {[0,1,2].map(i => (
        <rect key={i} x="50" y={104 + i * 16} width="8" height="6" rx="2" fill="rgba(255,255,255,0.04)" />
      ))}
      {[0,1,2].map(i => (
        <rect key={i} x="242" y={104 + i * 16} width="8" height="6" rx="2" fill="rgba(255,255,255,0.04)" />
      ))}

      {/* Outer lens ring (thin, very subtle) */}
      <circle cx="150" cy="153" r="60" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

      {/* Accent lens ring */}
      <circle cx="150" cy="153" r="55" stroke="url(#lring)" strokeWidth="2.5" />

      {/* Lens body */}
      <circle cx="150" cy="153" r="48" fill="url(#lgr)" />

      {/* Lens inner ring */}
      <circle cx="150" cy="153" r="34" stroke="rgba(255,255,255,0.04)" strokeWidth="1.5" fill="none" />

      {/* Lens reflection glint */}
      <ellipse cx="135" cy="139" rx="11" ry="7" fill="rgba(255,255,255,0.055)" transform="rotate(-28 135 139)" />

      {/* Lens center iris */}
      <circle cx="150" cy="153" r="8" fill="rgba(5,5,5,0.95)" />
      <circle cx="150" cy="153" r="3" fill="rgba(77,255,239,0.28)" />

      {/* GENYX label on pod */}
      <text x="150" y="217" textAnchor="middle" fill="rgba(255,255,255,0.12)"
        fontSize="8.5" letterSpacing="5" fontFamily="DM Sans, sans-serif" fontWeight="500">GENYX</text>

      {/* Status LED */}
      <circle cx="216" cy="100" r="4.5" fill="#4DFFEF" className="led" filter="url(#led-glow)" />

      {/* LED label */}
      <text x="228" y="104" fill="rgba(77,255,239,0.4)" fontSize="7.5" letterSpacing="1" fontFamily="DM Sans, sans-serif">LIVE</text>

      {/* Bottom shadow line */}
      <rect x="44" y="221" width="212" height="1" rx="0.5" fill="rgba(0,0,0,0.4)" />

      {/* Ground shadow ellipse */}
      <ellipse cx="150" cy="360" rx="90" ry="14" fill="rgba(0,0,0,0.45)" />
    </svg>
  );
}

// ─── Shared navigation helper ────────────────────────────────────────────────────
function goPage(path) {
  return (e) => {
    e.preventDefault();
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };
}

// ─── Hero ─────────────────────────────────────────────────────────────────────────
function Hero() {
  const cvs = useRef(null);

  useEffect(() => {
    document.querySelectorAll('.hw').forEach((el, i) =>
      setTimeout(() => el.classList.add('in'), 150 + i * 48)
    );
  }, []);

  useEffect(() => {
    const c = cvs.current; if (!c) return;
    const ctx = c.getContext('2d'); let raf;
    const fit = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    fit();
    const ro = new ResizeObserver(fit); ro.observe(c);
    const N = 16;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * (c.width || 1400), y: Math.random() * (c.height || 900),
      vx: (Math.random() - .5) * .32, vy: (Math.random() - .5) * .32,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;
      });
      for (let i = 0; i < N; i++)
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < 200) {
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(77,255,239,${(1 - d / 200) * .038})`; ctx.lineWidth = .6; ctx.stroke();
          }
        }
      pts.forEach(p => { ctx.beginPath(); ctx.arc(p.x, p.y, 1.3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(77,255,239,.07)'; ctx.fill(); });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', background: 'var(--bg)',
      transition: 'background .4s ease',
    }}>
      {/* Subtle radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(77,255,239,.022) 0%, transparent 70%)',
      }} />
      <canvas ref={cvs} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />

      <div className="sp" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 980, paddingLeft: 48, paddingRight: 48, paddingTop: 80 }}>
        {/* Label */}
        <div className="hw" style={{ marginBottom: 32 }}>
          <span className="tag" style={{ display: 'inline-block', margin: 0 }}>AI Movement Intelligence</span>
        </div>

        {/* Hero headline - very large */}
        <h1 style={{
          fontSize: 'clamp(60px, 10.5vw, 126px)',
          fontWeight: 700, lineHeight: .98, letterSpacing: '-.03em',
          marginBottom: 32, color: 'var(--txt)', transition: 'color .4s ease',
        }}>
          {'Movement,'.split('').map((ch, i) => (
            <span key={'a' + i} className="hw" style={{ animationDelay: `${.2 + i * .02}s` }}>{ch}</span>
          ))}
          <br />
          {'Measured.'.split('').map((ch, i) => (
            <span key={'b' + i} className="hw" style={{ animationDelay: `${.48 + i * .02}s` }}>{ch}</span>
          ))}
        </h1>

        {/* Subline */}
        <p className="hw" style={{
          fontSize: 'clamp(15px, 1.6vw, 19px)', color: 'var(--sub)',
          maxWidth: 400, margin: '0 auto 52px', lineHeight: 1.7, fontWeight: 300,
          animationDelay: '.88s', transition: 'color .4s ease',
        }}>
          Computer vision coaching. No wearables. No manual input.
        </p>

        {/* CTAs */}
        <div className="hw" style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', animationDelay: '1.02s' }}>
          <button className="cp" onClick={goPage('/contact')} style={{
            background: 'transparent', border: '1px solid var(--bd)',
            borderRadius: 100, padding: '14px 36px',
            color: 'var(--txt)', fontSize: 13, fontWeight: 500, letterSpacing: '.06em',
            transition: 'color .4s ease, border-color .4s ease',
          }}>
            <span>Request Access</span>
          </button>
          <button className="cp" onClick={goPage('/platform')} style={{
            background: 'var(--at)', border: '1px solid var(--a)',
            borderRadius: 100, padding: '14px 36px',
            color: 'var(--a)', fontSize: 13, fontWeight: 500, letterSpacing: '.06em',
            transition: 'all .4s ease',
          }}>
            See how it works ↓
          </button>
        </div>

        {/* 3D Genyx Hardware hero object */}
        <div className="hw" style={{ marginTop: 64, display: 'flex', justifyContent: 'center', animationDelay: '1.18s' }}>
          <div className="hero-cam-wrap">
            <ArduCamModule3 />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pod Section ─────────────────────────────────────────────────────────────────
function PodSection() {
  useReveal();
  return (
    <section className="sp sec" style={{
      background: 'var(--bg2)', paddingTop: 180, paddingBottom: 0,
      paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <span className="tag r">The Device</span>
          <div className="r" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, transitionDelay: '.08s' }}>
            <h2 style={{
              fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 700,
              letterSpacing: '-.032em', lineHeight: .98,
              color: 'var(--txt)', transition: 'color .4s ease',
            }}>Meet the Pod.</h2>
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'var(--sub)',
              maxWidth: 340, lineHeight: 1.72, fontWeight: 300,
              paddingBottom: 6, transition: 'color .4s ease',
            }}>
              Fixed-mount or floor-standing. AI-native. No configuration required per user.
            </p>
          </div>
        </div>

        {/* Hero photo - the real Genyx Pod in a premium gym */}
        <div className="r" style={{
          position: 'relative', borderRadius: '20px 20px 0 0', overflow: 'hidden',
          aspectRatio: '16/9', transitionDelay: '.15s',
          background: '#0a0a0a',
        }}>
          <img
            src={podAestheticImg}
            alt="Genyx Pod deployed in a premium gym - Genyx Hardware on floor stand near dumbbell rack"
            style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }}
          />
          {/* Subtle dark vignette overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.35) 100%)',
          }} />
          {/* Pod callout - bottom-left overlay */}
          <div style={{
            position: 'absolute', bottom: 32, left: 36,
            display: 'flex', flexDirection: 'column', gap: 4,
          }}>
            <span style={{ fontSize: 9, color: 'rgba(77,255,239,.8)', letterSpacing: '.2em', textTransform: 'uppercase' }}>
              Genyx Pod - Floor Stand
            </span>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>
              AI vision. No wearables.
            </span>
          </div>
          {/* Live badge top-right */}
          <div style={{
            position: 'absolute', top: 24, right: 24,
            display: 'flex', alignItems: 'center', gap: 7,
            background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 100, padding: '6px 14px',
          }}>
            <span className="rec" style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: '#fff', letterSpacing: '.1em', fontWeight: 500 }}>LIVE</span>
          </div>
        </div>

        {/* Feature strip below photo */}
        <div className="pod-strip r" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1, background: 'var(--div)',
          borderRadius: '0 0 20px 20px', overflow: 'hidden',
          marginBottom: 180, transitionDelay: '.25s',
        }}>
          {[
            ['Computer Vision AI', 'Vision Engine'],
            ['< 200ms Latency', 'Real-time processing'],
            ['Zero Calibration', 'Any athlete, instantly'],
            ['Multi-location', 'One platform, every pod'],
          ].map(([title, sub]) => (
            <div key={title} style={{ background: 'var(--bg3)', padding: '28px 24px', transition: 'background .4s ease' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 5, transition: 'color .4s ease' }}>{title}</div>
              <div style={{ fontSize: 12, color: 'var(--sub)', transition: 'color .4s ease' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pod Spec ────────────────────────────────────────────────────────────────────
function PodSpec() {
  useReveal();
  return (
    <section className="sp sec" style={{
      background: 'var(--bg)', paddingTop: 140, paddingBottom: 140,
      paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <span className="tag r">Engineering</span>
          <div className="r" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, transitionDelay: '.08s' }}>
            <h2 style={{
              fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 700,
              letterSpacing: '-.032em', lineHeight: .98,
              color: 'var(--txt)', transition: 'color .4s ease',
            }}>Precision-engineered.</h2>
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'var(--sub)',
              maxWidth: 360, lineHeight: 1.72, fontWeight: 300,
              paddingBottom: 6, transition: 'color .4s ease',
            }}>
              Weighted aluminum base. Genyx Hardware. Ball-head articulation. Height-adjustable 0.9m–1.6m. Built for serious training environments.
            </p>
          </div>
        </div>

        {/* Full-width spec image */}
        <div className="r" style={{
          position: 'relative', borderRadius: 20, overflow: 'hidden',
          background: 'var(--bg2)', transitionDelay: '.14s',
        }}>
          <img
            src={podSpec}
            alt="Genyx Pod technical specifications - floor stand with Genyx Hardware, ball head, height adjustment"
            style={{ width: '100%', display: 'block', objectFit: 'cover' }}
          />
          {/* Subtle border overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 20,
            boxShadow: 'inset 0 0 0 1px var(--bd)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Spec pills below image */}
        <div className="r pod-strip" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          gap: 1, background: 'var(--div)',
          borderRadius: '0 0 16px 16px', marginTop: 1,
          overflow: 'hidden', transitionDelay: '.24s',
        }}>
          {[
            ['Genyx Hardware', 'Custom matte grey housing'],
            ['H: 0.9m – 1.6m', 'Seamless height lock'],
            ['±90° Pan Rotation', 'Precision ball head'],
            ['Weighted Aluminum', 'Brushed base, internal cable'],
          ].map(([title, sub]) => (
            <div key={title} style={{ background: 'var(--bg3)', padding: '24px 20px', transition: 'background .4s ease' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', marginBottom: 4, transition: 'color .4s ease' }}>{title}</div>
              <div style={{ fontSize: 11, color: 'var(--sub)', transition: 'color .4s ease' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Problem ─────────────────────────────────────────────────────────────────────
function Problem() {
  useReveal();
  return (
    <section className="sp sec" style={{
      background: 'var(--bg)', paddingTop: 180, paddingBottom: 180,
      paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Giant stat + headline */}
        <div className="r" style={{ marginBottom: 72 }}>
          <span className="tag">The Gap</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <div className="stat-num" style={{
              fontSize: 'clamp(96px, 18vw, 220px)', fontWeight: 700, lineHeight: .88,
              color: 'var(--a)', letterSpacing: '-.04em', transition: 'color .4s ease',
            }}>73%</div>
            <div style={{ paddingBottom: 16, maxWidth: 320 }}>
              <div style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, lineHeight: 1.2, color: 'var(--txt)', marginBottom: 8, transition: 'color .4s ease' }}>
                of reps go<br />unvalidated.
              </div>
              <p style={{ fontSize: 15, color: 'var(--sub)', lineHeight: 1.65, transition: 'color .4s ease' }}>
                Training tools track inputs - not outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="div" style={{ marginBottom: 72 }} />

        {/* 3 pain points */}
        {[
          ['Form', 'Equipment records sessions. It doesn\'t understand them.'],
          ['Fatigue', 'Coaches estimate fatigue. Athletes push past failure without knowing.'],
          ['Reps', 'No system validates quality in real time. Every partial rep counts the same.'],
        ].map(([cat, line], i) => (
          <div key={i} className="r" style={{ transitionDelay: `${.1 + i * .1}s` }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, padding: '28px 0' }}>
              <div style={{ minWidth: 80 }}>
                <span style={{ fontSize: 10, color: 'var(--a)', letterSpacing: '.18em', textTransform: 'uppercase', transition: 'color .4s ease' }}>{cat}</span>
              </div>
              <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--sub)', lineHeight: 1.65, fontWeight: 300, transition: 'color .4s ease' }}>{line}</p>
            </div>
            {i < 2 && <div className="div" />}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Live Dashboard ───────────────────────────────────────────────────────────────
function LiveDash() {
  useReveal();
  return (
    <section className="sp sec" style={{
      background: 'var(--bg2)', paddingTop: 180, paddingBottom: 180,
      paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>
          <span className="tag r">Live Analytics</span>
          <h2 className="r" style={{
            fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700,
            letterSpacing: '-.028em', lineHeight: .98,
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.1s',
          }}>Every rep.<br />Validated.</h2>
        </div>

        {/* Live dashboard UI mockup */}
        <div className="r" style={{
          background: 'var(--card)', border: '1px solid var(--bd)',
          borderRadius: 24, overflow: 'hidden',
          boxShadow: 'var(--sh)',
          transition: 'background .4s ease, border-color .4s ease, box-shadow .4s ease',
          transitionDelay: '.18s',
        }}>
          {/* Toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '14px 24px',
            borderBottom: '1px solid var(--div)', background: 'var(--bg3)',
            transition: 'background .4s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="rec" style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              <span style={{ fontSize: 11, color: 'var(--sub)', letterSpacing: '.12em', textTransform: 'uppercase', transition: 'color .4s ease' }}>
                Live · Back Squat · Session 24
              </span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--sub)', transition: 'color .4s ease' }}>Set 3 of 5  ·  Rep 12 of 15</div>
          </div>

          {/* Main metrics */}
          <div className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--div)' }}>
            {[
              { label: 'Clean Reps', value: '68', sub: 'This session', accent: false },
              { label: 'Effort Consistency', value: '94%', sub: 'Above threshold', accent: false },
              { label: 'Rep Quality', value: '●', sub: 'Solid', accent: true },
            ].map(({ label, value, sub, accent }) => (
              <div key={label} style={{ background: 'var(--card)', padding: '40px 36px', textAlign: 'center', transition: 'background .4s ease' }}>
                <div style={{ fontSize: 9, color: 'var(--sub)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 12, transition: 'color .4s ease' }}>{label}</div>
                {accent ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <div className="rdot" style={{ width: 14, height: 14 }} />
                    <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--txt)', transition: 'color .4s ease' }}>Solid</span>
                  </div>
                ) : (
                  <div style={{ fontSize: 'clamp(42px, 6vw, 64px)', fontWeight: 700, letterSpacing: '-.02em', color: 'var(--a)', lineHeight: 1, transition: 'color .4s ease' }}>{value}</div>
                )}
                <div style={{ fontSize: 12, color: 'var(--sub)', marginTop: 8, transition: 'color .4s ease' }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Waveform / rep bars */}
          <div style={{ padding: '28px 36px', borderTop: '1px solid var(--div)' }}>
            <div style={{ fontSize: 9, color: 'var(--sub)', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 16, transition: 'color .4s ease' }}>
              Rep Quality · Live
            </div>
            <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 52 }}>
              {Array.from({ length: 30 }, (_, i) => {
                const h = i < 12 ? 44 + Math.sin(i * 0.8) * 6 : i < 20 ? 32 + Math.sin(i * 0.9) * 5 : i < 26 ? 22 + Math.sin(i * 1.1) * 4 : 14;
                const c = i < 12 ? 'rgba(34,197,94,.6)' : i < 20 ? 'rgba(234,179,8,.6)' : i < 26 ? 'rgba(239,68,68,.55)' : 'rgba(255,255,255,.1)';
                return <div key={i} style={{ flex: 1, height: h, borderRadius: 3, background: c }} />;
              })}
            </div>
          </div>

          {/* Bottom 4 mini cards */}
          <div className="g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--div)', borderTop: '1px solid var(--div)' }}>
            {[
              ['Set Completion Confidence', '92%'],
              ['Effort Drop-Off Risk', 'Low'],
            ].map(([l, v]) => (
              <div key={l} style={{ background: 'var(--card)', padding: '18px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'background .4s ease' }}>
                <span style={{ fontSize: 12, color: 'var(--sub)', transition: 'color .4s ease' }}>{l}</span>
                <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--a)', transition: 'color .4s ease' }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Post-Workout ─────────────────────────────────────────────────────────────────
function PostWorkout() {
  useReveal();
  const cardRef = useRef(null), pathRef = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const c = cardRef.current, p = pathRef.current; if (!c || !p) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        c.classList.add('in'); p.classList.add('in');
        const end = 68, dur = 1400, st = performance.now();
        const tick = now => { const pr = Math.min((now - st) / dur, 1); setN(Math.round((1 - Math.pow(1 - pr, 3)) * end)); if (pr < 1) requestAnimationFrame(tick); };
        requestAnimationFrame(tick); io.disconnect();
      }
    }, { threshold: .2 });
    io.observe(c);
    return () => io.disconnect();
  }, []);

  return (
    <section className="sp sec" style={{
      background: 'var(--bg)', paddingTop: 180, paddingBottom: 180,
      paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 72, maxWidth: 600 }}>
          <span className="tag r">Post-Workout Analytics</span>
          <h2 className="r" style={{
            fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700,
            letterSpacing: '-.028em', lineHeight: .98,
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.1s',
          }}>Fatigue has<br />a pattern.</h2>
        </div>

        <div className="pw-sp" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Feature list */}
          <div className="r" style={{ transitionDelay: '.18s' }}>
            {[
              ['Clean Reps Completed', 'Every validated rep stored per session.'],
              ['Movement Quality State', 'Solid. Inconsistent. Breaking Down.'],
              ['Fatigue & Form Degradation', 'Where form broke - not just when.'],
              ['Effort Drop-Off Point', 'The exact rep where output declined.'],
              ['Repetitive Stress Indicator', 'Catch compounding errors before injury.'],
            ].map(([t, d], i) => (
              <div key={i}>
                <div style={{ display: 'flex', gap: 16, padding: '22px 0', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 11, color: 'var(--dim)', paddingTop: 2, flexShrink: 0, fontVariantNumeric: 'tabular-nums', transition: 'color .4s ease' }}>0{i + 1}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 5, color: 'var(--txt)', transition: 'color .4s ease' }}>{t}</div>
                    <p style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.65, transition: 'color .4s ease' }}>{d}</p>
                  </div>
                </div>
                {i < 4 && <div className="div" />}
              </div>
            ))}
            <div style={{ marginTop: 36 }}>
              <div style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 10, transition: 'color .4s ease' }}>
                Form Degradation Curve
              </div>
              <svg viewBox="0 0 300 60" style={{ width: '100%', height: 60 }}>
                <defs>
                  <linearGradient id="fcg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#4DFFEF" stopOpacity=".8" />
                    <stop offset="55%" stopColor="#eab308" stopOpacity=".8" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity=".8" />
                  </linearGradient>
                </defs>
                <path ref={pathRef} className="fp"
                  d="M8,8 Q44,8 78,10 Q114,14 146,22 Q180,32 208,46 Q236,58 278,60"
                  stroke="url(#fcg)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Summary card */}
          <div>
            <div ref={cardRef} className="sc sc-p" style={{
              background: 'var(--card)', border: '1px solid var(--bd)',
              borderRadius: 24, padding: 36,
              boxShadow: 'var(--sh)',
              transition: 'background .4s ease, border-color .4s ease, box-shadow .4s ease',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                  <div style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 4, transition: 'color .4s ease' }}>Post-Workout Summary</div>
                  <div style={{ fontSize: 13, color: 'var(--sub)', transition: 'color .4s ease' }}>Back Squat · Session 24</div>
                </div>
                <div style={{ background: 'rgba(34,197,94,.07)', border: '1px solid rgba(34,197,94,.18)', borderRadius: 100, padding: '5px 14px' }}>
                  <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 500 }}>Solid</span>
                </div>
              </div>
              <div style={{ borderBottom: '1px solid var(--div)', paddingBottom: 22, marginBottom: 22 }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10 }}>
                  <span style={{ fontSize: 72, fontWeight: 700, lineHeight: 1, fontVariantNumeric: 'tabular-nums', letterSpacing: '-.03em', color: 'var(--txt)', transition: 'color .4s ease' }}>{n}</span>
                  <div style={{ paddingBottom: 10 }}>
                    <div style={{ fontSize: 12, color: 'var(--a)', marginBottom: 3, fontWeight: 500, transition: 'color .4s ease' }}>+12 vs last session</div>
                    <div style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.14em', textTransform: 'uppercase', transition: 'color .4s ease' }}>Clean Reps</div>
                  </div>
                </div>
              </div>
              <div className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 18 }}>
                {[['Quality','Solid','#22c55e'],['Drop-Off','Rep 11','#eab308'],['Stress','Low','var(--a)']].map(([l,v,c]) => (
                  <div key={l} style={{ background: 'var(--bg2)', borderRadius: 12, padding: '12px 10px', transition: 'background .4s ease' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: c, marginBottom: 4, transition: 'color .4s ease' }}>{v}</div>
                    <div style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.1em', textTransform: 'uppercase', transition: 'color .4s ease' }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: 'var(--bg2)', borderRadius: 12, padding: '14px 16px', transition: 'background .4s ease' }}>
                <div style={{ fontSize: 9, color: 'var(--dim)', letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 10, transition: 'color .4s ease' }}>Rep Quality Breakdown</div>
                <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                  {Array.from({ length: 20 }, (_, i) => (
                    <div key={i} style={{ flex: 1, height: i < 12 ? 26 : i < 16 ? 19 : 12, borderRadius: 3, background: i < 12 ? 'rgba(34,197,94,.5)' : i < 16 ? 'rgba(234,179,8,.5)' : 'rgba(239,68,68,.45)' }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────────
function HowItWorks() {
  useReveal();
  return (
    <section className="sp sec" style={{
      background: 'var(--bg2)', paddingTop: 180, paddingBottom: 180,
      paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 80 }}>
          <span className="tag r">How It Works</span>
          <h2 className="r" style={{
            fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700,
            letterSpacing: '-.028em', lineHeight: .98,
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.1s',
          }}>Three steps.<br />Zero friction.</h2>
        </div>
        {[
          ['Genyx Hardware captures movement', 'Fixed overhead or side angle. No setup. No per-user calibration. Plug in, point, run.'],
          ['AI extracts rep-level signals in real time', 'Joint angles, velocity curves, timing - rep by rep - as the set unfolds. Frame-level accuracy.'],
          ['Intelligence delivered instantly', 'Live signals to the display in under 200ms. Full post-session analytics within seconds.'],
        ].map(([title, desc], i) => (
          <div key={i}>
            <div className="step-g r" style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 40, padding: '52px 0', transitionDelay: `${.08 + i * .12}s` }}>
              <span className="step-num" style={{ fontSize: 88, fontWeight: 700, lineHeight: 1, color: 'var(--num)', letterSpacing: '-.03em', userSelect: 'none', transition: 'color .4s ease' }}>
                0{i + 1}
              </span>
              <div style={{ paddingTop: 10 }}>
                <h3 style={{ fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 600, marginBottom: 12, color: 'var(--txt)', transition: 'color .4s ease' }}>{title}</h3>
                <p style={{ fontSize: 15, color: 'var(--sub)', lineHeight: 1.75, maxWidth: 520, transition: 'color .4s ease' }}>{desc}</p>
              </div>
            </div>
            {i < 2 && <div className="div" />}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── App Preview ─────────────────────────────────────────────────────────────────
function AppPreview() {
  useReveal();
  return (
    <section style={{ background: '#050505', overflow: 'hidden', position: 'relative' }}>
      {/* Always-dark section - accent color and white text forced */}

      {/* Headline */}
      <div className="sp r" style={{
        textAlign: 'center', paddingTop: 160, paddingBottom: 60,
        paddingLeft: 48, paddingRight: 48,
      }}>
        <span style={{
          display: 'inline-block', fontSize: 10, fontWeight: 500,
          letterSpacing: '.2em', textTransform: 'uppercase',
          color: '#4DFFEF', marginBottom: 20,
        }}>
          Platform Preview
        </span>
        <h2 style={{
          fontSize: 'clamp(52px, 9vw, 116px)',
          fontWeight: 700, lineHeight: .96,
          letterSpacing: '-.032em',
          color: '#4DFFEF',
        }}>
          Training intelligence,<br />
          <span style={{ color: '#FFFFFF' }}>live.</span>
        </h2>
        <p className="r" style={{
          fontSize: 'clamp(14px, 1.5vw, 17px)', color: '#4a4a4a',
          maxWidth: 380, margin: '24px auto 0', lineHeight: 1.7, fontWeight: 300,
          transitionDelay: '.1s',
        }}>
          Every rep. Every signal. Visible in real time - no equipment attached.
        </p>
      </div>

      {/* Handset preview - live screen fitted into in-hand phone */}
      <div className="app-hand-zone">
        <div className="app-hand-glow" />
        <div className="app-hand-wrap r" style={{ transitionDelay: '.16s' }}>
          <div className="app-live-screen">
            <video
              src={DEMO_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <img src={mobileHandImg} alt="Athlete holding Genyx live training intelligence mobile view" className="app-hand-img" />
        </div>
      </div>

      {/* CTA */}
      <div className="sp r" style={{
        textAlign: 'center', paddingTop: 52, paddingBottom: 120,
        paddingLeft: 48, paddingRight: 48, transitionDelay: '.2s',
      }}>
        <button onClick={goPage('/contact')} style={{
          background: 'transparent',
          border: '1px solid rgba(77,255,239,.3)',
          borderRadius: 100, padding: '14px 40px',
          color: '#fff', fontSize: 13, fontWeight: 500, letterSpacing: '.06em',
          cursor: 'none',
          position: 'relative', overflow: 'hidden',
          transition: 'color .38s ease',
        }}
          className="cp"
        >
          <span>Request Early Access</span>
        </button>
      </div>
    </section>
  );
}

// ─── Testimonials ───────────────────────────────────────────────────────────────
function Testimonials() {
  useReveal();
  const items = [
    {
      quote: 'We used to film sets and review them post-session. With Genyx, I get joint angle data and fatigue flags live, mid-set. It completely changed how I programme deloads.',
      name: 'Rohit Sharma',
      role: 'Head S&C Coach, Bengaluru Sports Academy',
      img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80',
    },
    {
      quote: 'My athletes stopped questioning my feedback once they could see the rep quality score themselves. Genyx made coaching conversations data-driven, not opinion-driven.',
      name: 'Priya Nair',
      role: 'Sports Scientist, ProFit Performance Lab, Mumbai',
      img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=160&q=80',
    },
    {
      quote: 'No sensors on the body, no calibration per athlete - that was the deal-breaker for us. We onboard 40+ new members a month. Genyx just works from day one.',
      name: 'Arjun Mehta',
      role: 'Founder & Head Coach, Iron Tribe Fitness, Delhi',
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=160&q=80',
    },
    {
      quote: 'I trialled every wearable on the market for two years. Nothing stuck with my athletes. Genyx removed the friction entirely - they just train and I get everything I need.',
      name: 'James Whitfield',
      role: 'Performance Director, Elevate Athletic, London',
      img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    },
    {
      quote: 'The velocity curve data per rep is something I previously only got in a university lab. Now I have it on a floor stand in my facility. That shift is massive for Indian sport.',
      name: 'Kavitha Rajan',
      role: 'Lead Physiotherapist, Chennai Athletic Rehab Centre',
      img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
    },
    {
      quote: 'We deployed across three locations in Pune and the dashboard unified everything. I coach remotely now with more confidence than I had standing on the floor before Genyx.',
      name: 'Vikram Desai',
      role: 'Director of Coaching, FitStaq Gyms, Pune',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    },
  ];
  const loopItems = [...items, ...items];

  return (
    <section className="sp sec" style={{
      background: 'var(--bg2)', paddingTop: 140, paddingBottom: 140,
      paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 44 }}>
          <span className="tag r">Testimonials</span>
          <h2 className="r" style={{
            fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 700,
            letterSpacing: '-.028em', lineHeight: .98,
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s',
          }}>
            Trusted by coaches.
          </h2>
        </div>

        <div className="tm-wrap r" style={{ transitionDelay: '.15s' }}>
          <div className="tm-track">
            {loopItems.map((t, i) => (
              <article key={i} className="tm-card">
                <p style={{ fontSize: 15, color: 'var(--txt)', lineHeight: 1.74, marginBottom: 18, transition: 'color .4s ease' }}>
                  "{t.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <img src={t.img} alt={t.name} className="tm-avatar" loading="lazy" />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', transition: 'color .4s ease' }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--sub)', transition: 'color .4s ease' }}>{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Team ───────────────────────────────────────────────────────────────────────
function TeamSection() {
  useReveal();
  const team = [
    {
      name: 'Kush Kadhyan',
      title: 'Founder',
      bio: 'Technical experience in quantitative finance, systems thinking, and operational leadership to building scalable computer vision products. Previously built and exited a data-driven venture and led investment and growth initiatives across technology and capital-intensive environments.',
      img: kushKadhyanImg,
      linkedin: 'https://www.linkedin.com/in/kushkadhyan/',
    },
    {
      name: 'Siddartha Agrawal',
      title: 'Core Tech Systems and Investor',
      bio: 'Entrepreneur | Quantitative Investments | High Frequency Trading | Co-Founder of Wallsoft Labs',
      img: siddarthaImg,
      linkedin: 'https://www.linkedin.com/in/siddhartha-agrawal-1883098/',
    },
    {
      name: 'Shashank Mital',
      title: 'Business & Marketing Advisor',
      bio: 'Principal Partner at India Accelerator and global marketing leader with 30+ years of experience, closely guiding Genyx on growth strategy, partnerships, and investor relations.',
      img: shashankMitalImg,
      linkedin: 'https://www.linkedin.com/in/shashank-m-b9b20123/',
    },
    {
      name: 'Aarav Mehta',
      title: 'Computer Vision Tech Lead',
      bio: "IIT Bombay dual-degree (MSc Mech Eng + AI/DS). Published NLP & CV research (AMIA'23, SMM4H benchmark) and shipped computer-vision security at Reliance Jio. Passionate about turning state-of-the-art models into snappy mobile experiences.",
      img: '',
      linkedin: 'https://linkedin.com/company/genyx',
    },
  ];
  return (
    <section className="sp sec" style={{
      background: 'var(--bg)', paddingTop: 140, paddingBottom: 140,
      paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <span className="tag r">The Team</span>
          <h2 className="r" style={{
            fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 700,
            letterSpacing: '-.028em', lineHeight: .98,
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s',
          }}>
            Our Core Team
          </h2>
        </div>

        <div className="team-core-grid" style={{ display: 'grid', gap: 16 }}>
          {team.map((m, i) => (
            <article key={m.name} className="team-card r" style={{ transitionDelay: `${.12 + i * .08}s` }}>
              {m.img ? (
                <div className="team-img-wrap">
                  <img
                    src={m.img}
                    alt={m.name}
                    className={`team-img-person${m.blendDark ? ' blend-dark' : ''}`}
                    loading="lazy"
                  />
                </div>
              ) : (
                <div className="team-img-wrap team-img-temp" aria-label="Temporary profile icon">
                  <svg width="72" height="72" viewBox="0 0 24 24" fill="none" style={{ color: 'var(--a)' }}>
                    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 20C4.7 16.7 7.4 14.5 12 14.5C16.6 14.5 19.3 16.7 20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              )}
              <div style={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 6 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', marginBottom: 0, transition: 'color .4s ease' }}>{m.name}</h3>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="team-linkedin-btn"
                      aria-label={`${m.name} LinkedIn`}
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                </div>
                {m.title && (
                  <div style={{ fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--a)', marginBottom: 10, transition: 'color .4s ease' }}>{m.title}</div>
                )}
                {m.bio && (
                  <p style={{ fontSize: 13, lineHeight: 1.68, color: 'var(--sub)', transition: 'color .4s ease' }}>{m.bio}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Icons ───────────────────────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}
// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  useReveal();

  const colHead = {
    fontSize: 11, fontWeight: 600, letterSpacing: '.16em', textTransform: 'uppercase',
    color: '#fff', marginBottom: 20,
  };
  const colLink = {
    fontSize: 13, color: '#666', transition: 'color .3s ease',
    display: 'block', lineHeight: 2.2,
  };
  const socialBtn = {
    width: 34, height: 34, borderRadius: '50%',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    color: '#666', border: '1px solid rgba(255,255,255,.08)',
    transition: 'color .3s ease, border-color .3s ease, background .3s ease',
  };

  return (
    <footer style={{
      background: '#060606',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* CTA Section */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,.06)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(77,255,239,.04) 0%, transparent 70%)',
        }} />
        <div className="sp" style={{ padding: '120px 80px 96px', textAlign: 'center', maxWidth: 720, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span className="tag r" style={{ display: 'block', textAlign: 'center' }}>Early Access</span>
          <h2 className="r" style={{
            fontSize: 'clamp(36px, 5.5vw, 64px)', fontWeight: 700,
            letterSpacing: '-.028em', lineHeight: 1.02, marginBottom: 18,
            color: '#fff', transitionDelay: '.1s',
          }}>
            Built for serious<br />
            <span style={{ color: '#4DFFEF' }}>coaching outcomes.</span>
          </h2>
          <p className="r" style={{ color: '#666', fontSize: 15, lineHeight: 1.75, marginBottom: 44, transitionDelay: '.2s' }}>
            Genyx helps teams coach with measurable movement intelligence, not assumptions.
          </p>
          <div className="r" style={{ transitionDelay: '.3s' }}>
            <button className="cp" onClick={goPage('/contact')} style={{
              background: 'transparent', border: '1px solid #4DFFEF',
              borderRadius: 100, padding: '15px 48px',
              color: '#fff', fontSize: 13, fontWeight: 500, letterSpacing: '.07em',
              transition: 'background .3s ease',
            }}>
              <span>Request Early Access</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer - 3 column */}
      <div className="sp" style={{ padding: '56px 80px 48px', position: 'relative', zIndex: 1 }}>
        <div className="footer-main-grid" style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1.6fr 0.8fr 1fr',
          gap: 48,
        }}>

          {/* Col 1 - Brand */}
          <div>
            <a href="/" onClick={goPage('/')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <span style={{ color: '#fff', fontSize: 24, letterSpacing: '-.02em', fontWeight: 700, lineHeight: 1 }}>
                Genyx
              </span>
            </a>
            <p style={{ color: '#555', fontSize: 13, lineHeight: 1.75, maxWidth: 360, marginBottom: 20 }}>
              AI-powered movement intelligence for coaches and athletes. Precision biomechanics without wearables.
            </p>
            <p style={{ color: '#444', fontSize: 12, lineHeight: 1.7, marginBottom: 24 }}>
              For suggestions, feedback, or partnership inquiries, we'd love to hear from you.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="https://www.linkedin.com/company/genyxhealthcare/" target="_blank" rel="noopener noreferrer" className="ft-social" style={socialBtn}><LinkedInIcon /></a>
              <a href="https://www.instagram.com/genyxai/" target="_blank" rel="noopener noreferrer" className="ft-social" style={socialBtn}><InstagramIcon /></a>
            </div>
          </div>

          {/* Col 2 - Navigation */}
          <div>
            <h4 style={colHead}>Navigate</h4>
            {[
              ['Home', '/'],
              ['Platform', '/platform'],
              ['Analytics', '/analytics'],
              ['About', '/about'],
              ['Contact', '/contact'],
            ].map(([label, path]) => (
              <a key={label} href={path} onClick={goPage(path)} className="ft-link" style={colLink}>{label}</a>
            ))}
          </div>

          {/* Col 3 - Contact */}
          <div>
            <h4 style={colHead}>Contact Us</h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4DFFEF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <a href="mailto:labs@genyxfitness.com" className="ft-link" style={{ color: '#888', fontSize: 13, transition: 'color .3s ease' }}>
                labs@genyxfitness.com
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4DFFEF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <a href="tel:+919990211844" className="ft-link" style={{ color: '#888', fontSize: 13, transition: 'color .3s ease' }}>
                +91 9990211844
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 18 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4DFFEF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 2, flexShrink: 0 }}>
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Golf+Course+Road%2C+DLF+Phase+5%2C+Sector+43%2C+Gurugram%2C+Haryana+122002%2C+India"
                target="_blank"
                rel="noopener noreferrer"
                className="ft-link"
                style={{ color: '#888', fontSize: 13, lineHeight: 1.6 }}
              >
                Golf Course Road, DLF Phase 5,<br />
                Sector 43, Gurugram, Haryana 122002, India
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#4DFFEF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
              </svg>
              <span style={{ color: '#888', fontSize: 13 }}>
                Mon – Sat, 10 AM – 7 PM IST
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,.06)',
        padding: '18px 80px',
        position: 'relative', zIndex: 1,
      }}>
        <div className="footer-bottom-grid" style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <a href="/privacy" onClick={goPage('/privacy')} className="ft-link" style={{ fontSize: 11, color: '#555', transition: 'color .3s ease' }}>Privacy Policy</a>
            <a href="/terms" onClick={goPage('/terms')} className="ft-link" style={{ fontSize: 11, color: '#555', transition: 'color .3s ease' }}>Terms & Conditions</a>
          </div>
          <span style={{ fontSize: 11, color: '#333', letterSpacing: '.05em' }}>
            &copy; {new Date().getFullYear()} Genyx Fitness&trade;. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── About Page ───────────────────────────────────────────────────────────────────
export function AboutPage() {
  useReveal();
  return (
    <>
      {/* Hero */}
      <section className="sp" style={{
        minHeight: '85vh', display: 'flex', alignItems: 'center',
        background: 'var(--bg)', paddingTop: 140, paddingBottom: 120,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(77,255,239,.016) 0%, transparent 70%)' }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <span className="tag r">About Genyx</span>
          <h1 className="r" style={{
            fontSize: 'clamp(56px, 10vw, 120px)', fontWeight: 700,
            lineHeight: .95, letterSpacing: '-.034em',
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s',
            maxWidth: 900,
          }}>
            Built for the<br /><span style={{ color: 'var(--a)', transition: 'color .4s ease' }}>pursuit.</span>
          </h1>
          <p className="r" style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--sub)', lineHeight: 1.72,
            maxWidth: 560, marginTop: 40, fontWeight: 300, transition: 'color .4s ease',
            transitionDelay: '.18s',
          }}>
            Genyx was built on a single conviction: coaches and athletes deserve the same precision sports science that elite labs have - without the lab, the wearables, or the setup.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="sp" style={{
        background: 'var(--bg2)', paddingTop: 140, paddingBottom: 140,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="tag r">The Problem We Solve</span>
          <div className="r" style={{ transitionDelay: '.08s' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 56 }}>
              <div style={{ fontSize: 'clamp(80px, 16vw, 180px)', fontWeight: 700, lineHeight: .88, color: 'var(--a)', letterSpacing: '-.04em', transition: 'color .4s ease' }}>73%</div>
              <div style={{ paddingBottom: 16, maxWidth: 380 }}>
                <div style={{ fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: 600, lineHeight: 1.2, color: 'var(--txt)', marginBottom: 12, transition: 'color .4s ease' }}>
                  of reps go unvalidated<br />in every training session.
                </div>
                <p style={{ fontSize: 15, color: 'var(--sub)', lineHeight: 1.65, transition: 'color .4s ease' }}>
                  Existing tools count inputs - sets, reps, weight. None of them understand movement quality. That's the gap Genyx was built to close.
                </p>
              </div>
            </div>
          </div>
          <div className="div" style={{ marginBottom: 56 }} />
          {[
            ['The Equipment Problem', 'Gym equipment records that a session happened. Barbells don\'t know if your hips shifted on rep 8. Cables don\'t know if your form degraded under fatigue. Hardware tracks inputs - never outcomes.'],
            ['The Coach Problem', 'Even elite coaches can\'t watch every rep of every set across every athlete simultaneously. Visual observation has limits. Fatigue is estimated. Form breaks are caught after, not during.'],
            ['The Data Problem', 'Wearables require attachment, calibration, and maintenance per athlete. They measure proximity and acceleration - not movement mechanics. Rep quality has never been measurable at scale. Until now.'],
          ].map(([cat, line], i) => (
            <div key={i} className="r" style={{ transitionDelay: `${.1 + i * .1}s` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 28, padding: '28px 0' }}>
                <div style={{ minWidth: 100, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: 'var(--a)', letterSpacing: '.18em', textTransform: 'uppercase', transition: 'color .4s ease' }}>{cat.split(' ')[1]}</span>
                </div>
                <p style={{ fontSize: 'clamp(15px, 1.7vw, 19px)', color: 'var(--sub)', lineHeight: 1.68, fontWeight: 300, transition: 'color .4s ease' }}>{line}</p>
              </div>
              {i < 2 && <div className="div" />}
            </div>
          ))}
        </div>
      </section>

      {/* The technology */}
      <section className="sp" style={{
        background: 'var(--bg)', paddingTop: 140, paddingBottom: 140,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="tag r">The Technology</span>
          <h2 className="r" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700, letterSpacing: '-.028em', lineHeight: .98, marginBottom: 64, color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s' }}>
            Computer vision.<br />No compromises.
          </h2>
          <div className="r" style={{ transitionDelay: '.16s', marginBottom: 80 }}>
            <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--sub)', lineHeight: 1.72, maxWidth: 720, fontWeight: 300, transition: 'color .4s ease' }}>
              The Genyx Pod uses Genyx Hardware inside a custom-built, precision-machined housing. Mounted on a weighted aluminum floor stand with ball-head articulation and height adjustment from 0.9m to 1.6m, it deploys in minutes - in any facility, for any athlete. The AI processes every frame locally and delivers coaching signals in under 200 milliseconds.
            </p>
          </div>
          <div className="g2r" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1, background: 'var(--div)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              ['Genyx Hardware', 'Custom grey housing', 'The hardware core at the heart of the Pod. High frame rate, low latency, optimized for movement capture in gym lighting conditions.'],
              ['Computer Vision AI', 'Frame-level accuracy', 'Joint angle extraction, velocity measurement, range-of-motion tracking - all without body-worn sensors. Processed rep by rep.'],
              ['< 200ms Latency', 'Live coaching feedback', 'Signals are processed and delivered to the coaching display before a rep completes. Feedback that changes behavior in real time.'],
              ['Zero Calibration', 'Any athlete, instantly', 'No setup per user. No body measurements entered. A new athlete walks in - the system reads their movement from frame one.'],
            ].map(([title, sub, desc], i) => (
              <div key={i} className="r" style={{ background: 'var(--card)', padding: '44px 40px', transition: 'background .4s ease', transitionDelay: `${.08 + i * .08}s` }}>
                <div style={{ fontSize: 12, color: 'var(--a)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8, transition: 'color .4s ease' }}>{sub}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: 'var(--txt)', transition: 'color .4s ease' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--sub)', lineHeight: 1.72, fontWeight: 300, transition: 'color .4s ease' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="sp" style={{
        background: 'var(--bg2)', paddingTop: 120, paddingBottom: 120,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <blockquote className="r" style={{
            fontSize: 'clamp(20px, 2.8vw, 34px)', fontWeight: 300,
            lineHeight: 1.65, color: 'var(--txt)', letterSpacing: '-.01em',
            transition: 'color .4s ease',
          }}>
            "Movement is the most honest signal of human performance.<br />We built the intelligence to read it."
          </blockquote>
          <div className="r" style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 16, transitionDelay: '.12s' }}>
            <div className="div" style={{ width: 40, flex: 'none' }} />
            <span style={{ fontSize: 12, color: 'var(--sub)', letterSpacing: '.12em', textTransform: 'uppercase', transition: 'color .4s ease' }}>Genyx, 2025</span>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="sp" style={{
        background: 'var(--bg)', paddingTop: 140, paddingBottom: 140,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="tag r">Principles</span>
          <h2 className="r" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700, letterSpacing: '-.028em', lineHeight: .98, marginBottom: 80, color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s' }}>Three principles.</h2>
          <div className="g3r" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'var(--div)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              ['Precision', 'Every rep is a data point. Every session tells a story. We read both at frame-level resolution - not by approximation.'],
              ['Accessibility', 'No wearables. No calibration. No friction between the athlete and accurate data. Intelligence that works the moment you do.'],
              ['Integrity', 'We build for coaches who demand truth - not dashboards that confirm what you already believe. Data should challenge, not validate.'],
            ].map(([title, desc], i) => (
              <div key={i} className="r" style={{ background: 'var(--card)', padding: '48px 40px', transition: 'background .4s ease', transitionDelay: `${.08 + i * .1}s` }}>
                <div style={{ fontSize: 'clamp(40px,6vw,72px)', fontWeight: 700, color: 'var(--num)', letterSpacing: '-.03em', marginBottom: 28, transition: 'color .4s ease' }}>0{i + 1}</div>
                <h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 14, color: 'var(--txt)', transition: 'color .4s ease' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--sub)', lineHeight: 1.72, fontWeight: 300, transition: 'color .4s ease' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="sp" style={{
        background: 'var(--bg2)', paddingTop: 100, paddingBottom: 100,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div className="g4r" style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1, background: 'var(--div)', borderRadius: 20, overflow: 'hidden' }}>
          {[['< 200ms', 'Live coaching latency'], ['1080P', 'Genyx Hardware'], ['0', 'Wearables required'], ['73%', 'Reps that go unvalidated today']].map(([stat, label]) => (
            <div key={stat} className="r" style={{ background: 'var(--card)', padding: '52px 32px', textAlign: 'center', transition: 'background .4s ease' }}>
              <div style={{ fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: 'var(--a)', letterSpacing: '-.02em', marginBottom: 10, transition: 'color .4s ease' }}>{stat}</div>
              <div style={{ fontSize: 12, color: 'var(--sub)', letterSpacing: '.06em', lineHeight: 1.5, transition: 'color .4s ease' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      <Testimonials />
      <TeamSection />

      <Footer />
    </>
  );
}

// ─── Contact Page ─────────────────────────────────────────────────────────────────
function ContactSelect({ label, value, options, onChange, error }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (!boxRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div ref={boxRef} className="contact-dd-wrap">
      <label className={`contact-lbl${error ? ' is-err' : ''}`}>{label}</label>
      <button
        type="button"
        className={`contact-dd-btn${error ? ' is-err' : ''}`}
        onClick={() => setOpen((v) => !v)}
        data-h
      >
        <span>{value || 'Select'}</span>
        <span className={`contact-dd-caret${open ? ' is-open' : ''}`}>⌄</span>
      </button>
      {open && (
        <div className="contact-dd-list">
          {options.map((opt) => (
            <button
              type="button"
              key={opt}
              className={`contact-dd-item${value === opt ? ' is-active' : ''}`}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              data-h
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {error ? <div className="contact-err">{error}</div> : null}
    </div>
  );
}

export function ContactPage() {
  useReveal();
  const roleData = {
    beta: {
      icon: '♛',
      name: 'Beta Tester',
      desc: 'Pilot Genyx in your facility before launch.',
      tag: 'Beta Access',
      response: '48h',
      purpose: 'Early B2B pilot for coaching teams and facilities testing live movement intelligence.',
      checklist: ['Pilot onboarding call', 'Facility-fit review', 'Deployment recommendation', 'Priority beta access'],
      next: 'Our onboarding team will review your setup and schedule the best pilot path.',
    },
    investor: {
      icon: '◈',
      name: 'Investor',
      desc: 'Explore the opportunity. Request our deck or a call.',
      tag: 'Investment',
      response: '24h',
      purpose: 'For investor conversations around traction, roadmap, and category scale.',
      checklist: ['Deck request handling', 'Roadmap + moat walkthrough', 'Partner Q&A', 'Founder call scheduling'],
      next: 'You will hear from the core team with next steps for deck sharing and discussion.',
    },
    product: {
      icon: '◎',
      name: 'Product Inquiry',
      desc: 'Pricing, specs, demo, or deployment questions.',
      tag: 'Inquiry',
      response: '1 day',
      purpose: 'For teams evaluating deployment, integrations, pricing, and roll-out fit.',
      checklist: ['Use-case qualification', 'Technical requirements review', 'Deployment path mapping', 'Demo planning'],
      next: 'A product specialist will reply with recommended rollout options for your requirements.',
    },
    other: {
      icon: '∿',
      name: 'Other',
      desc: 'Press, research, partnerships, or anything else.',
      tag: 'General',
      response: '2-3 days',
      purpose: 'For media, research, partnership, event, and general requests.',
      checklist: ['Request routing', 'Internal owner assignment', 'Response timeline', 'Direct follow-up'],
      next: 'We will route your request internally and come back with a clear next step.',
    },
  };

  const [activeRole, setActiveRole] = useState('beta');
  const [formPhase, setFormPhase] = useState('in');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [submitted, setSubmitted] = useState({ firstName: '', email: '' });
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    roleTitle: '', facilityName: '', facilityType: '', city: '', country: '', memberRange: 1,
    trainingTracking: [], painPoint: '', startTimeline: '', betaNotes: '',
    firmName: '', investorType: '', checkSize: '', thesisAlignment: [], investorInterest: '', investorNotes: '', ndaAccepted: false,
    company: '', inquiryType: '', deploymentScale: '', integrations: [], decisionTimeline: '', productQuestion: '',
    otherOrg: '', otherTopic: '', otherMessage: '',
  });

  const switchTimeoutRef = useRef(null);
  const formZoneRef = useRef(null);
  const activeMeta = roleData[activeRole];
  const memberCount = Math.max(1, Number(form.memberRange) || 1);
  const memberCountLabel = `${memberCount.toLocaleString()} members`;

  useEffect(() => () => {
    if (switchTimeoutRef.current) clearTimeout(switchTimeoutRef.current);
  }, []);

  const upd = (k) => (e) => {
    const v = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: '' }));
  };
  const toggleMulti = (k, option) => {
    setForm((f) => {
      const next = f[k].includes(option) ? f[k].filter((x) => x !== option) : [...f[k], option];
      return { ...f, [k]: next };
    });
    setErrors((prev) => ({ ...prev, [k]: '' }));
  };
  const setRadio = (k, option) => {
    setForm((f) => ({ ...f, [k]: option }));
    setErrors((prev) => ({ ...prev, [k]: '' }));
  };
  const switchRole = (next) => {
    if (next === activeRole) return;
    setSent(false);
    setErrors({});
    setSubmitting(false);
    setFormPhase('out');
    if (switchTimeoutRef.current) clearTimeout(switchTimeoutRef.current);
    switchTimeoutRef.current = setTimeout(() => {
      setActiveRole(next);
      setFormPhase('in');
      formZoneRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const validate = () => {
    const e = {};
    const req = (k, m) => { if (!String(form[k] || '').trim()) e[k] = m; };
    req('firstName', 'First name is required');
    req('lastName', 'Last name is required');
    req('email', 'Email is required');
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';

    if (activeRole === 'beta') {
      req('roleTitle', 'Select role/title');
      req('facilityName', 'Facility name is required');
      req('facilityType', 'Select facility type');
      req('city', 'City is required');
      req('country', 'Country is required');
      if (!form.trainingTracking.length) e.trainingTracking = 'Select at least one option';
      req('painPoint', 'Select one pain point');
      req('startTimeline', 'Select start timeline');
    }
    if (activeRole === 'investor') {
      req('firmName', 'Firm/fund is required');
      req('investorType', 'Select investor type');
      req('checkSize', 'Select check size');
      if (!form.thesisAlignment.length) e.thesisAlignment = 'Select at least one thesis alignment';
      req('investorInterest', 'Select one option');
      if (!form.ndaAccepted) e.ndaAccepted = 'NDA acknowledgement is required';
    }
    if (activeRole === 'product') {
      req('company', 'Company/organisation is required');
      req('inquiryType', 'Select inquiry type');
      req('deploymentScale', 'Select deployment scale');
      if (!form.integrations.length) e.integrations = 'Select at least one integration';
      req('decisionTimeline', 'Select decision timeline');
      req('productQuestion', 'Please enter your requirements');
    }
    if (activeRole === 'other') {
      req('otherTopic', 'Select what this is about');
      req('otherMessage', 'Message is required');
    }
    return e;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const eMap = validate();
    setErrors(eMap);
    if (Object.keys(eMap).length) return;
    setSubmitting(true);
    try {
      const res = await fetch('https://genyx-backend.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: activeRole, form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setSubmitted({ firstName: form.firstName || 'there', email: form.email });
      setSent(true);
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to send. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const err = (k) => errors[k] ? <div className="contact-err">{errors[k]}</div> : null;

  return (
    <>
      <section className="sp" style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'var(--bg)', paddingTop: 120, paddingBottom: 120,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(77,255,239,.018) 0%, transparent 70%)',
        }} />
        <div className="contact-wrap" style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="contact-hero-grid">
            <div>
              <span className="tag r">Contact</span>
              <h1 className="r" style={{
                fontSize: 'clamp(56px, 10vw, 118px)', fontWeight: 700,
                lineHeight: .95, letterSpacing: '-.034em', color: 'var(--txt)',
                transition: 'color .4s ease', transitionDelay: '.08s',
              }}>
                Let's <span style={{ color: 'var(--a)' }}>Connect.</span>
              </h1>
              <p className="r" style={{
                fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--sub)', lineHeight: 1.72,
                maxWidth: 420, marginTop: 28, fontWeight: 300, transition: 'color .4s ease',
                transitionDelay: '.16s',
              }}>
                The right form is below. Pick what fits.
              </p>
            </div>
            <div className="r contact-chip-grid" style={{ transitionDelay: '.22s' }}>
              {[['48h', 'Beta response'], ['24h', 'Investor deck'], ['1 day', 'Product reply']].map(([v, l]) => (
                <div key={l} className="contact-chip">
                  <div className="contact-chip-v">{v}</div>
                  <div className="contact-chip-l">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sp" style={{
        background: 'var(--bg2)', paddingTop: 60, paddingBottom: 60,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div className="contact-wrap" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="r contact-role-grid">
            {Object.entries(roleData).map(([id, meta]) => (
              <button key={id} type="button" className={`contact-role-btn${activeRole === id ? ' is-active' : ''}`} onClick={() => switchRole(id)} data-h>
                <div className="contact-role-top">
                  <span className="contact-role-icon">{meta.icon}</span>
                  <span className="contact-role-name">{meta.name}</span>
                </div>
                <p className="contact-role-desc">{meta.desc}</p>
                <span className="contact-pill">{meta.tag}</span>
                <span className="contact-role-line" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section ref={formZoneRef} className="sp" style={{
        background: 'var(--bg)', paddingTop: 90, paddingBottom: 140,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div className="contact-wrap" style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="contact-form-grid">
            <div className={`contact-form-shell ${formPhase === 'out' ? 'is-out' : 'is-in'}`}>
              {sent ? (
                <div className="contact-form-card">
                  <div className="contact-ok">✓</div>
                  <h2 style={{ fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, letterSpacing: '-.03em', color: 'var(--txt)', marginBottom: 12 }}>
                    You're <span style={{ color: 'var(--a)' }}>on the list.</span>
                  </h2>
                  <p style={{ fontSize: 15, color: 'var(--sub)', lineHeight: 1.72, marginBottom: 14 }}>
                    Thanks, {submitted.firstName}. We received your {activeMeta.name.toLowerCase()} inquiry.
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.7, marginBottom: 8 }}>{activeMeta.next}</p>
                  <p style={{ fontSize: 13, color: 'var(--a)', marginBottom: 24 }}>A confirmation has been sent to {submitted.email}</p>
                  <a href="/platform" onClick={goPage('/platform')} className="nl" data-h style={{ fontSize: 14 }}>Explore how Genyx works →</a>
                </div>
              ) : (
                <form onSubmit={submitForm} className="contact-form-card">
                  <div className="contact-form-title">{activeMeta.name}</div>

                  <div className="contact-sec-lbl">Primary Details</div>
                  <div className="div" />
                  <div className="contact-grid-2">
                    <div>
                      <label className={`contact-lbl${errors.firstName ? ' is-err' : ''}`}>First Name</label>
                      <input className={`fi${errors.firstName ? ' fi-err' : ''}`} value={form.firstName} onChange={upd('firstName')} data-h />
                      {err('firstName')}
                    </div>
                    <div>
                      <label className={`contact-lbl${errors.lastName ? ' is-err' : ''}`}>Last Name</label>
                      <input className={`fi${errors.lastName ? ' fi-err' : ''}`} value={form.lastName} onChange={upd('lastName')} data-h />
                      {err('lastName')}
                    </div>
                  </div>

                  <div className="contact-grid-2">
                    <div>
                      <label className={`contact-lbl${errors.email ? ' is-err' : ''}`}>Email</label>
                      <input className={`fi${errors.email ? ' fi-err' : ''}`} type="email" value={form.email} onChange={upd('email')} data-h />
                      {err('email')}
                    </div>
                    <div>
                      <label className={`contact-lbl${activeRole === 'beta' && errors.facilityName ? ' is-err' : ''}${activeRole === 'investor' && errors.firmName ? ' is-err' : ''}${activeRole === 'product' && errors.company ? ' is-err' : ''}`}>
                        {activeRole === 'beta' ? 'Facility Name' : activeRole === 'investor' ? 'Firm / Fund Name' : activeRole === 'product' ? 'Company / Organisation' : 'Organisation (optional)'}
                      </label>
                      {activeRole === 'beta' && <input className={`fi${errors.facilityName ? ' fi-err' : ''}`} value={form.facilityName} onChange={upd('facilityName')} data-h />}
                      {activeRole === 'investor' && <input className={`fi${errors.firmName ? ' fi-err' : ''}`} value={form.firmName} onChange={upd('firmName')} data-h />}
                      {activeRole === 'product' && <input className={`fi${errors.company ? ' fi-err' : ''}`} value={form.company} onChange={upd('company')} data-h />}
                      {activeRole === 'other' && <input className="fi" value={form.otherOrg} onChange={upd('otherOrg')} data-h />}
                      {activeRole === 'beta' && err('facilityName')}
                      {activeRole === 'investor' && err('firmName')}
                      {activeRole === 'product' && err('company')}
                    </div>
                  </div>

                  {activeRole === 'beta' && (
                    <>
                      <div className="contact-sec-lbl">Beta Fit</div>
                      <div className="div" />
                      <div className="contact-grid-2">
                        <ContactSelect
                          label="Role / Title"
                          value={form.roleTitle}
                          onChange={(v) => {
                            setForm((f) => ({ ...f, roleTitle: v }));
                            setErrors((prev) => ({ ...prev, roleTitle: '' }));
                          }}
                          error={errors.roleTitle}
                          options={['Head Coach', 'S&C Coach', 'Gym Owner/Operator', 'Personal Trainer', 'Athletic Director', 'Sports Scientist', 'Other']}
                        />
                        <ContactSelect
                          label="Facility Type"
                          value={form.facilityType}
                          onChange={(v) => {
                            setForm((f) => ({ ...f, facilityType: v }));
                            setErrors((prev) => ({ ...prev, facilityType: '' }));
                          }}
                          error={errors.facilityType}
                          options={['Commercial Gym/Box', 'CrossFit/Functional Fitness', 'Sports Performance Facility', 'Professional Sports Club', 'University/College Athletics', 'Boutique Studio', 'Physical Therapy/Rehab', 'Corporate Wellness']}
                        />
                      </div>
                      <div className="contact-grid-2">
                        <div>
                          <label className={`contact-lbl${errors.city ? ' is-err' : ''}`}>City</label>
                          <input className={`fi${errors.city ? ' fi-err' : ''}`} value={form.city} onChange={upd('city')} data-h />
                          {err('city')}
                        </div>
                        <div>
                          <label className={`contact-lbl${errors.country ? ' is-err' : ''}`}>Country</label>
                          <input className={`fi${errors.country ? ' fi-err' : ''}`} value={form.country} onChange={upd('country')} data-h />
                          {err('country')}
                        </div>
                      </div>
                      <div>
                        <label className="contact-lbl">Member count range</label>
                        <div className="contact-range-val">{memberCountLabel}</div>
                        <input className="contact-range" type="range" min="1" max="5000" step="1" value={memberCount} onChange={upd('memberRange')} data-h />
                      </div>
                      <div>
                        <label className={`contact-lbl${errors.trainingTracking ? ' is-err' : ''}`}>How do you currently track training?</label>
                        <div className={`contact-checkgrp${errors.trainingTracking ? ' is-err' : ''}`}>
                          {['Manual rep counting', 'Whiteboard/notes', 'Wearables', 'Video review', 'Coach observation only', 'No formal tracking'].map((opt) => (
                            <button key={opt} type="button" className="contact-opt" onClick={() => toggleMulti('trainingTracking', opt)} data-h>
                              <span className={`contact-box${form.trainingTracking.includes(opt) ? ' is-on' : ''}`}>✓</span><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        {err('trainingTracking')}
                      </div>
                      <div>
                        <label className={`contact-lbl${errors.painPoint ? ' is-err' : ''}`}>Biggest pain point</label>
                        <div className={`contact-radiogrp${errors.painPoint ? ' is-err' : ''}`}>
                          {['No visibility into movement quality', "Can't track fatigue/form breakdown", 'Hard to scale coaching', 'Athletes progressing slowly without data', 'Injury risk with no early warning'].map((opt) => (
                            <button key={opt} type="button" className="contact-opt" onClick={() => setRadio('painPoint', opt)} data-h>
                              <span className={`contact-dot${form.painPoint === opt ? ' is-on' : ''}`} /><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        {err('painPoint')}
                      </div>
                      <ContactSelect
                        label="Start timeline"
                        value={form.startTimeline}
                        onChange={(v) => {
                          setForm((f) => ({ ...f, startTimeline: v }));
                          setErrors((prev) => ({ ...prev, startTimeline: '' }));
                        }}
                        error={errors.startTimeline}
                        options={['Immediately', 'Within 1 month', '1-3 months', '3-6 months', 'Exploring']}
                      />
                      <div>
                        <label className="contact-lbl">Anything else we should know?</label>
                        <textarea className="fi" rows={4} value={form.betaNotes} onChange={upd('betaNotes')} data-h />
                      </div>
                    </>
                  )}

                  {activeRole === 'investor' && (
                    <>
                      <div className="contact-sec-lbl">Investor Profile</div>
                      <div className="div" />
                      <div className="contact-grid-2">
                        <ContactSelect
                          label="Investor type"
                          value={form.investorType}
                          onChange={(v) => {
                            setForm((f) => ({ ...f, investorType: v }));
                            setErrors((prev) => ({ ...prev, investorType: '' }));
                          }}
                          error={errors.investorType}
                          options={['Angel', 'Seed/Micro-VC', 'Series A+ VC', 'Family Office', 'Corporate/Strategic', 'Sports & Fitness Fund', 'Deep Tech Fund']}
                        />
                        <ContactSelect
                          label="Typical check size"
                          value={form.checkSize}
                          onChange={(v) => {
                            setForm((f) => ({ ...f, checkSize: v }));
                            setErrors((prev) => ({ ...prev, checkSize: '' }));
                          }}
                          error={errors.checkSize}
                          options={['$25K-$100K', '$100K-$250K', '$250K-$500K', '$500K-$1M', '$1M-$2M', '$2M-$5M', '$5M+']}
                        />
                      </div>
                      <div>
                        <label className={`contact-lbl${errors.thesisAlignment ? ' is-err' : ''}`}>Investment thesis alignment</label>
                        <div className={`contact-checkgrp${errors.thesisAlignment ? ' is-err' : ''}`}>
                          {['Sports & Performance Tech', 'AI/Computer Vision', 'SaaS/Recurring Revenue', 'Consumer Health & Wellness', 'Enterprise B2B', 'Hardware + Software Platforms'].map((opt) => (
                            <button key={opt} type="button" className="contact-opt" onClick={() => toggleMulti('thesisAlignment', opt)} data-h>
                              <span className={`contact-box${form.thesisAlignment.includes(opt) ? ' is-on' : ''}`}>✓</span><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        {err('thesisAlignment')}
                      </div>
                      <div>
                        <label className={`contact-lbl${errors.investorInterest ? ' is-err' : ''}`}>What interests you most about Genyx?</label>
                        <div className={`contact-radiogrp${errors.investorInterest ? ' is-err' : ''}`}>
                          {['Genyx Hardware AI differentiation', 'Market size', 'Enterprise scalability', 'Team & execution', 'Post-workout analytics IP'].map((opt) => (
                            <button key={opt} type="button" className="contact-opt" onClick={() => setRadio('investorInterest', opt)} data-h>
                              <span className={`contact-dot${form.investorInterest === opt ? ' is-on' : ''}`} /><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        {err('investorInterest')}
                      </div>
                      <div>
                        <label className="contact-lbl">Additional context or questions</label>
                        <textarea className="fi" rows={4} value={form.investorNotes} onChange={upd('investorNotes')} data-h />
                      </div>
                      <button type="button" className="contact-checkline" onClick={() => setForm((f) => ({ ...f, ndaAccepted: !f.ndaAccepted }))} data-h>
                        <span className={`contact-box${form.ndaAccepted ? ' is-on' : ''}`}>✓</span>
                        <span>I understand a standard NDA is required for full data room access</span>
                      </button>
                      {err('ndaAccepted')}
                    </>
                  )}

                  {activeRole === 'product' && (
                    <>
                      <div className="contact-sec-lbl">Product Context</div>
                      <div className="div" />
                      <div className="contact-grid-2">
                        <ContactSelect
                          label="Inquiry type"
                          value={form.inquiryType}
                          onChange={(v) => {
                            setForm((f) => ({ ...f, inquiryType: v }));
                            setErrors((prev) => ({ ...prev, inquiryType: '' }));
                          }}
                          error={errors.inquiryType}
                          options={['Pricing & Plans', 'Technical Specs', 'Demo Request', 'Enterprise Deployment', 'API/Integration', 'Multi-Location Rollout', 'Hardware Requirements']}
                        />
                        <ContactSelect
                          label="Deployment scale"
                          value={form.deploymentScale}
                          onChange={(v) => {
                            setForm((f) => ({ ...f, deploymentScale: v }));
                            setErrors((prev) => ({ ...prev, deploymentScale: '' }));
                          }}
                          error={errors.deploymentScale}
                          options={['Single location', '2-5 locations', '6-10 locations', '11-20 locations', '20+ locations/enterprise']}
                        />
                      </div>
                      <div>
                        <label className={`contact-lbl${errors.integrations ? ' is-err' : ''}`}>Integrations you need</label>
                        <div className={`contact-checkgrp${errors.integrations ? ' is-err' : ''}`}>
                          {['Gym management software', 'Existing CRM/member app', 'Performance tracking database', 'Coaching platform/LMS', 'Custom API', 'No specific integrations'].map((opt) => (
                            <button key={opt} type="button" className="contact-opt" onClick={() => toggleMulti('integrations', opt)} data-h>
                              <span className={`contact-box${form.integrations.includes(opt) ? ' is-on' : ''}`}>✓</span><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        {err('integrations')}
                      </div>
                      <ContactSelect
                        label="Decision timeline"
                        value={form.decisionTimeline}
                        onChange={(v) => {
                          setForm((f) => ({ ...f, decisionTimeline: v }));
                          setErrors((prev) => ({ ...prev, decisionTimeline: '' }));
                        }}
                        error={errors.decisionTimeline}
                        options={['ASAP', 'Within 1 month', '1-3 months', '3-6 months', 'Just researching']}
                      />
                      <div>
                        <label className={`contact-lbl${errors.productQuestion ? ' is-err' : ''}`}>Your question or requirements</label>
                        <textarea className={`fi${errors.productQuestion ? ' fi-err' : ''}`} rows={6} style={{ minHeight: 120 }} value={form.productQuestion} onChange={upd('productQuestion')} data-h />
                        {err('productQuestion')}
                      </div>
                    </>
                  )}

                  {activeRole === 'other' && (
                    <>
                      <div className="contact-sec-lbl">Request Type</div>
                      <div className="div" />
                      <div>
                        <label className={`contact-lbl${errors.otherTopic ? ' is-err' : ''}`}>What's this about?</label>
                        <div className={`contact-radiogrp${errors.otherTopic ? ' is-err' : ''}`}>
                          {['Press/Media', 'Academic/Research', 'Strategic Partnership', 'Speaking/Event', 'Supplier or Vendor', 'Something Else'].map((opt) => (
                            <button key={opt} type="button" className="contact-opt" onClick={() => setRadio('otherTopic', opt)} data-h>
                              <span className={`contact-dot${form.otherTopic === opt ? ' is-on' : ''}`} /><span>{opt}</span>
                            </button>
                          ))}
                        </div>
                        {err('otherTopic')}
                      </div>
                      <div>
                        <label className={`contact-lbl${errors.otherMessage ? ' is-err' : ''}`}>Your message</label>
                        <textarea className={`fi${errors.otherMessage ? ' fi-err' : ''}`} rows={7} style={{ minHeight: 140 }} value={form.otherMessage} onChange={upd('otherMessage')} data-h />
                        {err('otherMessage')}
                      </div>
                    </>
                  )}

                  <button type="submit" className="cp contact-submit" disabled={submitting} data-h>
                    <span>{submitting ? 'Submitting...' : 'Submit Inquiry →'}</span>
                  </button>
                </form>
              )}
            </div>

            <aside className="contact-info">
              <div className="contact-info-hi">
                <h3>{activeMeta.name}</h3>
                <p>{activeMeta.purpose}</p>
                <div className="contact-info-list">
                  {activeMeta.checklist.map((item) => <div key={item}>• {item}</div>)}
                </div>
              </div>
              <div className="contact-info-card">
                <div className="contact-meta">
                  <div>
                    <div className="contact-info-k">Response</div>
                    <div className="contact-info-v">{activeMeta.response}</div>
                  </div>
                  <div>
                    <div className="contact-info-k">Location</div>
                    <div style={{ color: 'var(--txt)', fontSize: 14, fontWeight: 500 }}>India</div>
                    <div style={{ color: 'var(--sub)', fontSize: 12, marginTop: 4 }}>IST timezone · Remote-first</div>
                  </div>
                </div>
                <div className="div" style={{ margin: '14px 0' }} />
                <div className="contact-info-k">Quick Links</div>
                <div className="contact-linklist">
                  <a href="/platform" onClick={goPage('/platform')} className="nl" data-h>→ How It Works</a>
                  <a href="/platform" onClick={goPage('/platform')} className="nl" data-h>→ Platform</a>
                  <a href="/analytics" onClick={goPage('/analytics')} className="nl" data-h>→ Analytics</a>
                  <a href="/about" onClick={goPage('/about')} className="nl" data-h>→ About</a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ─── Platform Page ────────────────────────────────────────────────────────────────
export function PlatformPage() {
  useReveal();
  return (
    <>
      {/* Hero */}
      <section className="sp" style={{
        minHeight: '88vh', display: 'flex', alignItems: 'center',
        background: 'var(--bg)', paddingTop: 140, paddingBottom: 120,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle grid backdrop */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(77,255,239,.018) 0%, transparent 70%)',
        }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          <span className="tag r">The Platform</span>
          <h1 className="r" style={{
            fontSize: 'clamp(56px, 10vw, 118px)', fontWeight: 700,
            lineHeight: .95, letterSpacing: '-.034em',
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s',
            maxWidth: 860,
          }}>
            Intelligence built<br />
            <span style={{ color: 'var(--a)', transition: 'color .4s ease' }}>for movement.</span>
          </h1>
          <p className="r" style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--sub)', lineHeight: 1.72,
            maxWidth: 500, marginTop: 40, fontWeight: 300, transition: 'color .4s ease',
            transitionDelay: '.18s',
          }}>
            Genyx turns Genyx Hardware into a full-stack coaching system. No wearables. No manual logging. No friction.
          </p>
          {/* Stat row */}
          <div className="r" style={{ marginTop: 64, display: 'flex', gap: 56, flexWrap: 'wrap', transitionDelay: '.28s' }}>
            {[['< 200ms', 'Live latency'], ['1080P', 'Vision module'], ['0', 'Wearables'], ['∞', 'Athletes per pod']].map(([v, l]) => (
              <div key={l}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: 'var(--a)', letterSpacing: '-.02em', lineHeight: 1, transition: 'color .4s ease' }}>{v}</div>
                <div style={{ fontSize: 11, color: 'var(--sub)', marginTop: 6, letterSpacing: '.1em', textTransform: 'uppercase', transition: 'color .4s ease' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="sp" style={{
        background: 'var(--bg2)', paddingTop: 140, paddingBottom: 140,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="tag r">How It Works</span>
          <h2 className="r" style={{
            fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700,
            letterSpacing: '-.028em', lineHeight: .98, marginBottom: 80,
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s',
          }}>Capture. Analyze.<br />Deliver.</h2>

          {[
            ['Capture', 'The Genyx Pod mounts in your facility - floor stand or fixed. Point it at the platform. No per-athlete setup. No wearables. Genyx Hardware starts reading movement the moment training begins.'],
            ['Analyze', 'Computer vision AI processes every frame in real time. Joint angles, velocity curves, rep timing, range of motion - extracted rep by rep. The system understands the difference between a clean lift and a compromised one.'],
            ['Deliver', 'Signals reach your display in under 200ms. Coaches see quality scores, fatigue state, and rep-level data live - while the set is happening. Full analytics hit the dashboard the moment the session ends.'],
          ].map(([title, desc], i) => (
            <div key={i}>
              <div className="step-g r" style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 40, padding: '52px 0', transitionDelay: `${.08 + i * .12}s` }}>
                <span className="step-num" style={{ fontSize: 88, fontWeight: 700, lineHeight: 1, color: 'var(--num)', letterSpacing: '-.03em', userSelect: 'none', transition: 'color .4s ease' }}>
                  0{i + 1}
                </span>
                <div style={{ paddingTop: 10 }}>
                  <h3 style={{ fontSize: 'clamp(20px, 2.2vw, 26px)', fontWeight: 600, marginBottom: 14, color: 'var(--txt)', transition: 'color .4s ease' }}>{title}</h3>
                  <p style={{ fontSize: 15, color: 'var(--sub)', lineHeight: 1.75, maxWidth: 560, transition: 'color .4s ease' }}>{desc}</p>
                </div>
              </div>
              {i < 2 && <div className="div" />}
            </div>
          ))}
        </div>
      </section>

      {/* Hardware section */}
      <section className="sp" style={{
        background: 'var(--bg)', paddingTop: 140, paddingBottom: 0,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="tag r">The Hardware</span>
          <div className="r" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 56, transitionDelay: '.08s' }}>
            <h2 style={{ fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 700, letterSpacing: '-.032em', lineHeight: .98, color: 'var(--txt)', transition: 'color .4s ease' }}>
              The Pod.
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'var(--sub)', maxWidth: 340, lineHeight: 1.72, fontWeight: 300, paddingBottom: 6, transition: 'color .4s ease' }}>
              Precision-built for performance environments. Weighted aluminum base. Ball-head articulation. Internal cable management.
            </p>
          </div>
          <div className="r" style={{ position: 'relative', borderRadius: '20px 20px 0 0', overflow: 'hidden', aspectRatio: '16/9', transitionDelay: '.15s', background: '#0a0a0a' }}>
            <img src={podAestheticImg} alt="Genyx Pod in gym" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.35) 100%)' }} />
            <div style={{ position: 'absolute', bottom: 32, left: 36 }}>
              <span style={{ fontSize: 9, color: 'rgba(77,255,239,.8)', letterSpacing: '.2em', textTransform: 'uppercase', display: 'block', marginBottom: 4 }}>Genyx Pod - Floor Stand</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Deploy anywhere. Zero configuration.</span>
            </div>
            <div style={{ position: 'absolute', top: 24, right: 24, display: 'flex', alignItems: 'center', gap: 7, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 100, padding: '6px 14px' }}>
              <span className="rec" style={{ width: 7, height: 7, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
              <span style={{ fontSize: 11, color: '#fff', letterSpacing: '.1em', fontWeight: 500 }}>LIVE</span>
            </div>
          </div>
          <div className="pod-strip r" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--div)', borderRadius: '0 0 20px 20px', overflow: 'hidden', marginBottom: 140, transitionDelay: '.25s' }}>
            {[['Computer Vision AI', 'Genyx Hardware'], ['< 200ms Latency', 'Frame-level processing'], ['Zero Wearables', 'No athlete setup required'], ['Multi-Location', 'One dashboard, every pod']].map(([title, sub]) => (
              <div key={title} style={{ background: 'var(--bg3)', padding: '28px 24px', transition: 'background .4s ease' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 5, transition: 'color .4s ease' }}>{title}</div>
                <div style={{ fontSize: 12, color: 'var(--sub)', transition: 'color .4s ease' }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform features */}
      <section className="sp" style={{
        background: 'var(--bg2)', paddingTop: 140, paddingBottom: 140,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="tag r">Platform Features</span>
          <h2 className="r" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700, letterSpacing: '-.028em', lineHeight: .98, marginBottom: 72, color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s' }}>
            Built different.
          </h2>
          <div className="g2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--div)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              ['Zero Wearables', 'Athletes train without attaching anything. No sensors. No bands. No friction before a session starts.'],
              ['Any Athlete, Instantly', 'No per-user calibration. A new athlete walks in - the system reads them immediately.'],
              ['Multi-Location Ready', 'Deploy pods across facilities. All sessions flow into one dashboard. One view of your entire operation.'],
              ['Sub-200ms Live Signals', 'Coaching feedback reaches the display before a rep is finished. Real-time means real-time.'],
              ['Session-Level History', 'Every rep from every session is stored. Track improvement, fatigue patterns, and injury risk across weeks.'],
              ['Coach + Athlete Views', 'Separate views for coaching staff and athletes. The right data, in the right hands, at the right time.'],
            ].map(([title, desc], i) => (
              <div key={i} className="r dc" style={{ borderRadius: 0, border: 'none', transitionDelay: `${.06 + i * .07}s` }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: 'var(--txt)', transition: 'color .4s ease' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--sub)', lineHeight: 1.72, fontWeight: 300, transition: 'color .4s ease' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

// ─── Analytics Page ───────────────────────────────────────────────────────────────
export function AnalyticsPage() {
  useReveal();
  return (
    <>
      {/* Hero */}
      <section className="sp" style={{
        minHeight: '80vh', display: 'flex', alignItems: 'center',
        background: 'var(--bg)', paddingTop: 140, paddingBottom: 120,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%' }}>
          <span className="tag r">Analytics</span>
          <h1 className="r" style={{
            fontSize: 'clamp(56px, 10vw, 118px)', fontWeight: 700,
            lineHeight: .95, letterSpacing: '-.034em',
            color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s',
            maxWidth: 900,
          }}>
            Every rep<br />
            <span style={{ color: 'var(--a)', transition: 'color .4s ease' }}>tells a story.</span>
          </h1>
          <p className="r" style={{
            fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--sub)', lineHeight: 1.72,
            maxWidth: 500, marginTop: 40, fontWeight: 300, transition: 'color .4s ease',
            transitionDelay: '.18s',
          }}>
            Genyx analytics go beyond rep counts. We track quality, fatigue, velocity, and form - session by session, rep by rep.
          </p>
        </div>
      </section>

      {/* What we track */}
      <section className="sp" style={{
        background: 'var(--bg2)', paddingTop: 140, paddingBottom: 140,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="tag r">What We Track</span>
          <h2 className="r" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700, letterSpacing: '-.028em', lineHeight: .98, marginBottom: 72, color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s' }}>
            The full picture.
          </h2>
          <div className="g3r" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--div)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              ['Form Quality', 'Rep-by-rep scoring of movement mechanics. Clean, Inconsistent, or Breaking Down - classified per set.'],
              ['Fatigue State', 'Detects velocity loss and range-of-motion decline as they happen. Catch breakdown before failure.'],
              ['Clean Reps', 'Only reps that meet quality thresholds are counted as clean. Partial reps and form breaks are flagged.'],
              ['Velocity Curves', 'Bar path and joint velocity plotted across every rep of every set. See where speed drops.'],
              ['Joint Angles', 'Hip, knee, and shoulder angles tracked at key phases of each lift - without any body-worn sensors.'],
              ['Effort Drop-Off', 'The exact rep where output declined. Not an estimate - derived from frame-level movement data.'],
            ].map(([title, desc], i) => (
              <div key={i} className="r" style={{
                background: 'var(--card)', padding: '40px 36px',
                transition: 'background .4s ease', transitionDelay: `${.06 + i * .08}s`,
              }}>
                <div style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: 'var(--num)', letterSpacing: '-.03em', marginBottom: 20, transition: 'color .4s ease' }}>0{i + 1}</div>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 10, color: 'var(--txt)', transition: 'color .4s ease' }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--sub)', lineHeight: 1.72, fontWeight: 300, transition: 'color .4s ease' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live dashboard preview */}
      <section className="sp" style={{
        background: 'var(--bg)', paddingTop: 140, paddingBottom: 140,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <span className="tag r">Live Dashboard</span>
            <h2 className="r" style={{ fontSize: 'clamp(44px, 7vw, 80px)', fontWeight: 700, letterSpacing: '-.028em', lineHeight: .98, color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.1s' }}>
              While it's<br />happening.
            </h2>
          </div>

          <div className="r" style={{ background: 'var(--card)', border: '1px solid var(--bd)', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--sh)', transition: 'background .4s ease, border-color .4s ease', transitionDelay: '.18s' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid var(--div)', background: 'var(--bg3)', transition: 'background .4s ease' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="rec" style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <span style={{ fontSize: 11, color: 'var(--sub)', letterSpacing: '.12em', textTransform: 'uppercase', transition: 'color .4s ease' }}>Live · Deadlift · Session 31</span>
              </div>
              <span style={{ fontSize: 11, color: 'var(--sub)', transition: 'color .4s ease' }}>Set 4 of 5  ·  Rep 8 of 10</span>
            </div>
            <div className="g3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--div)' }}>
              {[
                { label: 'Clean Reps', value: '42', sub: 'This session' },
                { label: 'Form Score', value: '88%', sub: 'Above threshold' },
                { label: 'Fatigue State', value: 'Solid', sub: 'No drop-off detected', accent: true },
              ].map(({ label, value, sub, accent }) => (
                <div key={label} style={{ background: 'var(--card)', padding: '40px 36px', textAlign: 'center', transition: 'background .4s ease' }}>
                  <div style={{ fontSize: 9, color: 'var(--sub)', letterSpacing: '.18em', textTransform: 'uppercase', marginBottom: 12, transition: 'color .4s ease' }}>{label}</div>
                  {accent ? (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                      <div className="rdot" style={{ width: 14, height: 14 }} />
                      <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--txt)', transition: 'color .4s ease' }}>{value}</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: 'clamp(42px, 6vw, 64px)', fontWeight: 700, letterSpacing: '-.02em', color: 'var(--a)', lineHeight: 1, transition: 'color .4s ease' }}>{value}</div>
                  )}
                  <div style={{ fontSize: 12, color: 'var(--sub)', marginTop: 8, transition: 'color .4s ease' }}>{sub}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: '28px 36px', borderTop: '1px solid var(--div)' }}>
              <div style={{ fontSize: 9, color: 'var(--sub)', letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 16, transition: 'color .4s ease' }}>Rep Quality · Live</div>
              <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 52 }}>
                {Array.from({ length: 32 }, (_, i) => {
                  const h = i < 14 ? 46 + Math.sin(i * 0.7) * 5 : i < 22 ? 34 + Math.sin(i * 0.9) * 4 : i < 28 ? 22 + Math.sin(i * 1.1) * 4 : 12;
                  const c = i < 14 ? 'rgba(34,197,94,.6)' : i < 22 ? 'rgba(234,179,8,.6)' : i < 28 ? 'rgba(239,68,68,.55)' : 'rgba(255,255,255,.1)';
                  return <div key={i} style={{ flex: 1, height: h, borderRadius: 3, background: c }} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post-session strip */}
      <section className="sp" style={{
        background: 'var(--bg2)', paddingTop: 100, paddingBottom: 100,
        paddingLeft: 80, paddingRight: 80, transition: 'background .4s ease',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span className="tag r">Post-Session</span>
          <h2 className="r" style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 700, letterSpacing: '-.028em', lineHeight: .98, marginBottom: 56, color: 'var(--txt)', transition: 'color .4s ease', transitionDelay: '.08s' }}>
            After every session.
          </h2>
          <div className="g2r" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: 'var(--div)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              ['Session Summary', 'Clean rep count, quality rating, fatigue progression, and effort drop-off point - delivered instantly.'],
              ['Trend Analysis', 'Compare sessions over time. See if fatigue is compounding, form is improving, or intensity is sustainable.'],
              ['Injury Risk Signals', 'Repetitive stress patterns flagged before they accumulate. Protect athletes from compounding errors.'],
              ['Coach Export', 'Full session data available for coaching review. Share with athletes or integrate into your programming.'],
            ].map(([title, desc], i) => (
              <div key={i} className="r" style={{ background: 'var(--card)', padding: '44px 40px', transition: 'background .4s ease', transitionDelay: `${.08 + i * .09}s` }}>
                <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12, color: 'var(--txt)', transition: 'color .4s ease' }}>{title}</h3>
                <p style={{ fontSize: 14, color: 'var(--sub)', lineHeight: 1.72, fontWeight: 300, transition: 'color .4s ease' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <PodSection />
      <PodSpec />
      <Problem />
      <LiveDash />
      <PostWorkout />
      <HowItWorks />
      <AppPreview />
      <Footer />
    </>
  );
}
