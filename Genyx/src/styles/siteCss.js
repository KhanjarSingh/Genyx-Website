export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,200;9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

:root {
  --bg:   #080808;  --bg2:  #0D0D0D;  --bg3:  #111111;
  --txt:  #FFFFFF;  --sub:  #555555;  --dim:  #2a2a2a;
  --bd:   rgba(255,255,255,0.06);  --div:  rgba(255,255,255,0.05);
  --num:  rgba(255,255,255,0.12);
  --card: #0F0F0F;
  --a:    #4DFFEF;  --at:   rgba(77,255,239,0.07);
  --nb:   rgba(8,8,8,0.9);
  --sh:   0 48px 96px rgba(0,0,0,0.6);
}
:root[data-theme="light"] {
  --bg:   #FAFAFA;  --bg2:  #F2F2F2;  --bg3:  #EBEBEB;
  --txt:  #0A0A0A;  --sub:  #6a6a6a;  --dim:  #C0C0C0;
  --bd:   rgba(0,0,0,0.07);          --div:  rgba(0,0,0,0.06);
  --num:  rgba(0,0,0,0.10);
  --card: #FFFFFF;
  --a:    #009E98;  --at:   rgba(0,158,152,0.07);
  --nb:   rgba(250,250,250,0.92);
  --sh:   0 48px 96px rgba(0,0,0,0.1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--bg); color: var(--txt);
  font-family: 'DM Sans', -apple-system, sans-serif;
  -webkit-font-smoothing: antialiased; overflow-x: hidden;
  cursor: none;
  transition: background .4s ease, color .4s ease;
}
a, button { cursor: none; text-decoration: none; }
::-webkit-scrollbar { width: 2px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--dim); }

/* ── Cursor ── */
#cur {
  position: fixed; width: 7px; height: 7px;
  background: var(--a); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transform: translate(-50%,-50%);
  transition: width .22s ease, height .22s ease, opacity .22s ease, background .4s ease;
}
#cur.lg { width: 22px; height: 22px; opacity: .35; }

/* ── Reveal ── */
.r {
  opacity: 0; transform: translateY(32px);
  transition: opacity .85s cubic-bezier(.4,0,.2,1), transform .85s cubic-bezier(.4,0,.2,1);
}
.r.in { opacity: 1; transform: translateY(0); }

/* ── Hero word stagger ── */
.hw { display: inline-block; opacity: 0; transform: translateY(24px); }
.hw.in { animation: hwIn .75s cubic-bezier(.4,0,.2,1) forwards; }
@keyframes hwIn { to { opacity: 1; transform: translateY(0); } }

/* ── Tag / Label ── */
.tag {
  font-size: 10px; font-weight: 500;
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--a); display: block; margin-bottom: 20px;
  transition: color .4s ease;
}

/* ── Nav link ── */
.nl { color: var(--sub); font-size: 13px; transition: color .25s ease; }
.nl:hover { color: var(--txt); }

/* ── CTA pill ── */
.cp { position: relative; overflow: hidden; transition: color .38s ease; }
.cp::before {
  content: ''; position: absolute; inset: 0;
  background: var(--a);
  transform: translateX(-101%);
  transition: transform .44s cubic-bezier(.4,0,.2,1), background .4s ease;
}
.cp:hover::before { transform: translateX(0); }
.cp:hover { color: #080808; }
.cp span { position: relative; z-index: 1; }

/* ── Divider ── */
.div { width: 100%; height: 1px; background: var(--div); transition: background .4s ease; }

/* ── Metric card ── */
.mc {
  background: var(--card); border: 1px solid var(--bd); border-radius: 20px; padding: 36px;
  transition: transform .3s cubic-bezier(.4,0,.2,1), border-color .3s ease, box-shadow .3s ease, background .4s ease;
}
.mc:hover { transform: translateY(-4px); border-color: rgba(77,255,239,.2); box-shadow: 0 16px 48px rgba(77,255,239,.04); }

/* ── Diff card ── */
.dc {
  background: var(--card); border: 1px solid var(--bd); border-radius: 20px; padding: 36px;
  transition: transform .3s cubic-bezier(.4,0,.2,1), border-color .3s ease, background .4s ease;
}
.dc:hover { transform: translateY(-4px); border-color: rgba(77,255,239,.18); }

/* ── Rep quality dot ── */
@keyframes rq {
  0%,28%  { background:#22c55e; box-shadow:0 0 8px rgba(34,197,94,.65); }
  38%,62% { background:#eab308; box-shadow:0 0 8px rgba(234,179,8,.65); }
  72%,96% { background:#ef4444; box-shadow:0 0 8px rgba(239,68,68,.65); }
  100%    { background:#22c55e; box-shadow:0 0 8px rgba(34,197,94,.65); }
}
.rdot { width: 9px; height: 9px; border-radius: 50%; animation: rq 3s ease-in-out infinite; }

/* ── Record dot ── */
@keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:.3;} }
.rec { animation: pulse 1.6s ease-in-out infinite; }

/* ── Pod LED glow ── */
@keyframes ledPulse { 0%,100%{opacity:.9;r:4.5} 50%{opacity:.5;r:3.5} }
.led { animation: ledPulse 2.2s ease-in-out infinite; }

/* ── Pod lens glow ── */
@keyframes lensBreathe { 0%,100%{opacity:.08;} 50%{opacity:.18;} }
.lens-glow { animation: lensBreathe 3s ease-in-out infinite; }

/* ── Hero camera stage ── */
.hero-stage {
  --hero-parallax-x: 0px;
  --hero-parallax-y: 0px;
  --hero-scroll-y: 0px;
  --hero-lens-x: 52%;
  --hero-lens-y: 44%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 390px;
  perspective: 1100px;
  transform: translateY(var(--hero-scroll-y));
}
.hero-pod-wrap {
  --hero-tilt-x: 0deg;
  --hero-tilt-y: 0deg;
  position: relative;
  z-index: 4;
  transform-style: preserve-3d;
  transform: translate3d(var(--hero-parallax-x), var(--hero-parallax-y), 0) rotateX(var(--hero-tilt-y)) rotateY(var(--hero-tilt-x));
  transition: transform .2s linear;
}
.hero-webgl-wrap {
  width: min(420px, 92vw);
  height: min(340px, 56vw);
  min-height: 250px;
  position: relative;
  z-index: 6;
  filter: drop-shadow(0 0 64px rgba(77,255,239,.12));
}
.hero-webgl-wrap canvas {
  width: 100%!important;
  height: 100%!important;
  border-radius: 24px;
  background: transparent!important;
}
.hero-svg-fallback {
  display: none;
  filter: drop-shadow(0 0 70px rgba(77,255,239,.16));
}
.hero-pod-halo {
  position: absolute;
  width: 360px;
  aspect-ratio: 1 / 1;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(77,255,239,.18) 0%, rgba(77,255,239,.05) 30%, transparent 70%);
  filter: blur(18px);
  pointer-events: none;
  animation: heroHaloPulse 4.2s ease-in-out infinite;
}
.hero-pod-scan {
  position: absolute;
  left: 50%;
  top: 28%;
  width: 240px;
  height: 5px;
  transform: translateX(-50%);
  border-radius: 999px;
  background: linear-gradient(90deg, transparent 0%, rgba(77,255,239,.95) 50%, transparent 100%);
  box-shadow: 0 0 22px rgba(77,255,239,.45);
  pointer-events: none;
  animation: heroScanner 2.8s ease-in-out infinite;
}
.hero-pod-reflection {
  position: absolute;
  z-index: 5;
  left: 50%;
  top: 26%;
  width: 180px;
  height: 180px;
  transform: translate(-50%, -50%) translateZ(32px);
  border-radius: 50%;
  background: radial-gradient(circle at var(--hero-lens-x) var(--hero-lens-y), rgba(255,255,255,.24) 0%, rgba(255,255,255,.08) 14%, rgba(255,255,255,0) 46%);
  pointer-events: none;
  mix-blend-mode: screen;
}
.hero-orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(77,255,239,.14);
  pointer-events: none;
  transform-style: preserve-3d;
}
.hero-orbit-a {
  width: min(410px, 90vw);
  aspect-ratio: 1 / 1;
  animation: heroOrbitA 16s linear infinite;
}
.hero-orbit-b {
  width: min(500px, 105vw);
  aspect-ratio: 1 / 1;
  border-color: rgba(255,255,255,.09);
  animation: heroOrbitB 24s linear infinite;
}
.hero-chip {
  position: absolute;
  z-index: 5;
  border: 1px solid rgba(255,255,255,.16);
  background: rgba(255,255,255,.05);
  color: rgba(255,255,255,.84);
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 10px;
  letter-spacing: .13em;
  text-transform: uppercase;
  backdrop-filter: blur(10px);
  animation: heroChipFloat 3.6s ease-in-out infinite;
}
.hero-chip-l { left: max(2%, calc(50% - 290px)); top: 18%; }
.hero-chip-r { right: max(2%, calc(50% - 290px)); top: 29%; animation-delay: .7s; }
.hero-chip-b { left: 50%; bottom: 8%; transform: translateX(-50%); animation-delay: .35s; }

@keyframes heroScanner {
  0%,100% { transform: translate(-50%, 0); opacity: .25; }
  50% { transform: translate(-50%, 128px); opacity: .9; }
}
@keyframes heroOrbitA {
  from { transform: rotateX(72deg) rotateZ(0deg); }
  to { transform: rotateX(72deg) rotateZ(360deg); }
}
@keyframes heroOrbitB {
  from { transform: rotateX(70deg) rotateY(12deg) rotateZ(360deg); }
  to { transform: rotateX(70deg) rotateY(12deg) rotateZ(0deg); }
}
@keyframes heroChipFloat {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes heroHaloPulse {
  0%,100% { opacity: .3; transform: translate(-50%, -50%) scale(.96); }
  50% { opacity: .7; transform: translate(-50%, -50%) scale(1.07); }
}

/* ── Sub-page hero background effect ── */
.fx-grid {
  position: relative;
  overflow: hidden;
}
.fx-grid::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(77,255,239,.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(77,255,239,.07) 1px, transparent 1px);
  background-size: 52px 52px;
  opacity: .2;
  mask-image: radial-gradient(circle at 50% 40%, #000 10%, transparent 70%);
  animation: gridShift 24s linear infinite;
  pointer-events: none;
}
.fx-grid::after {
  content: '';
  position: absolute;
  inset: -30%;
  background: radial-gradient(circle at 50% 50%, rgba(77,255,239,.1) 0%, rgba(77,255,239,0) 55%);
  animation: auroraDrift 12s ease-in-out infinite alternate;
  pointer-events: none;
}
@keyframes gridShift {
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(-52px, -52px, 0); }
}
@keyframes auroraDrift {
  from { transform: translate3d(-4%, -2%, 0) scale(1); opacity: .32; }
  to { transform: translate3d(4%, 4%, 0) scale(1.08); opacity: .5; }
}

[data-tilt] {
  transform-style: preserve-3d;
  will-change: transform;
  transition: box-shadow .25s ease, border-color .25s ease;
}
[data-tilt]:hover {
  box-shadow: 0 20px 56px rgba(77,255,239,.12);
}

/* ── Fatigue curve draw ── */
.fp { stroke-dasharray: 350; stroke-dashoffset: 350; transition: stroke-dashoffset 1.9s cubic-bezier(.4,0,.2,1) .2s; }
.fp.in { stroke-dashoffset: 0; }

/* ── Summary card slide ── */
.sc { opacity: 0; transform: translateY(48px); transition: opacity .95s cubic-bezier(.4,0,.2,1), transform .95s cubic-bezier(.4,0,.2,1); }
.sc.in { opacity: 1; transform: translateY(0); }

/* ── Theme toggle ── */
.tt {
  width: 36px; height: 36px; border-radius: 50%;
  background: var(--at); border: 1px solid var(--bd);
  display: flex; align-items: center; justify-content: center;
  transition: background .3s ease, transform .25s ease;
}
.tt:hover { transform: rotate(22deg); }

/* ── Stats strip ── */
.ss { display:grid; gap:1px; background: var(--div); border-radius: 20px; overflow:hidden; }

/* ── Hamburger ── */
.hb {
  display: none;
  flex-direction: column; justify-content: center; align-items: center;
  width: 36px; height: 36px;
  background: none; border: none; padding: 0;
  gap: 5px;
}
.hb-line {
  display: block; width: 20px; height: 1.5px;
  background: var(--txt); border-radius: 2px;
  transition: transform .3s ease, opacity .3s ease, top .3s ease;
}

/* Mobile menu overlay */
.mob-menu {
  position: fixed; inset: 0; z-index: 98;
  background: var(--bg);
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  opacity: 0; pointer-events: none;
  transition: opacity .3s ease;
  padding-bottom: 60px;
}
.mob-menu.open { opacity: 1; pointer-events: all; }

/* ── App preview handset ── */
.app-hand-zone {
  position: relative; display: flex; justify-content: center; align-items: center;
  padding-bottom: 80px; padding-top: 20px;
}
.app-showcase-3d { perspective: 1200px; }
.app-hand-glow {
  position: absolute; width: min(460px, 95vw); aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(77,255,239,.08) 0%, transparent 68%);
  pointer-events: none; transform: translateY(16px);
}
.app-hand-wrap {
  position: relative; z-index: 2;
  width: min(430px, 88vw);
}
.app-hand-wrap-3d {
  --gx-tilt-x: 0deg;
  --gx-tilt-y: 0deg;
  --gx-scroll-lift: 0px;
  transform-style: preserve-3d;
  will-change: transform;
  transform: translateY(var(--gx-scroll-lift)) rotateX(var(--gx-tilt-y)) rotateY(var(--gx-tilt-x));
}
.app-hand-img {
  width: 100%; height: auto; display: block;
  filter: drop-shadow(0 42px 96px rgba(0,0,0,.8));
}
.app-live-screen {
  position: absolute; z-index: 3; overflow: hidden;
  left: 17.2%; right: 17.2%;
  top: 4.9%; bottom: 5.4%;
  border-radius: 56px;
  border: 1px solid rgba(255,255,255,0.16);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03), 0 18px 44px rgba(0,0,0,0.42), 0 0 20px rgba(77,255,239,0.08);
  transform: translateZ(22px);
}
.app-orbit {
  position: absolute;
  border: 1px solid rgba(77,255,239,.16);
  border-radius: 50%;
  pointer-events: none;
  filter: drop-shadow(0 0 10px rgba(77,255,239,.12));
}
.app-orbit-a {
  width: min(510px, 96vw);
  aspect-ratio: 1 / 1;
  animation: appOrbitA 18s linear infinite;
}
.app-orbit-b {
  width: min(580px, 112vw);
  aspect-ratio: 1 / 1;
  border-color: rgba(255,255,255,.08);
  animation: appOrbitB 22s linear infinite;
}
.app-data-chip {
  position: absolute;
  z-index: 4;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.15);
  color: rgba(255,255,255,.9);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 10px;
  letter-spacing: .16em;
  text-transform: uppercase;
  backdrop-filter: blur(12px);
  animation: chipFloat 3.4s ease-in-out infinite;
}
.app-chip-l { left: max(4%, calc(50% - 290px)); top: 18%; }
.app-chip-r { right: max(4%, calc(50% - 290px)); bottom: 18%; animation-delay: .6s; }
@keyframes appOrbitA {
  from { transform: rotateX(68deg) rotateY(2deg) rotateZ(0deg); opacity: .9; }
  to { transform: rotateX(68deg) rotateY(2deg) rotateZ(360deg); opacity: .9; }
}
@keyframes appOrbitB {
  from { transform: rotateX(72deg) rotateY(-8deg) rotateZ(360deg); opacity: .72; }
  to { transform: rotateX(72deg) rotateY(-8deg) rotateZ(0deg); opacity: .72; }
}
@keyframes chipFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
.tm-wrap { position: relative; overflow: hidden; }
.tm-wrap::before, .tm-wrap::after {
  content: ''; position: absolute; top: 0; bottom: 0; z-index: 3; width: 64px; pointer-events: none;
}
.tm-wrap::before { left: 0; background: linear-gradient(to right, var(--bg2), transparent); }
.tm-wrap::after { right: 0; background: linear-gradient(to left, var(--bg2), transparent); }
.tm-track {
  display: flex; gap: 14px; width: max-content;
  animation: tmSlide 34s linear infinite;
}
.tm-wrap:hover .tm-track { animation-play-state: paused; }
@keyframes tmSlide {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.tm-card {
  width: min(360px, 82vw);
  background: var(--card); border: 1px solid var(--bd);
  border-radius: 18px; padding: 22px;
  transition: border-color .3s ease, transform .3s ease, background .4s ease;
}
.tm-card:hover { border-color: rgba(77,255,239,.2); transform: translateY(-3px); }
.tm-avatar {
  width: 42px; height: 42px; border-radius: 50%; object-fit: cover;
  border: 1px solid var(--bd);
}
.team-card {
  background: var(--card); border: 1px solid var(--bd); border-radius: 20px; overflow: hidden;
  transition: border-color .3s ease, transform .3s ease, background .4s ease;
}
.team-card:hover { border-color: rgba(77,255,239,.2); transform: translateY(-4px); }
.team-img { width: 100%; aspect-ratio: 4/5; object-fit: cover; display: block; filter: grayscale(.14) contrast(1.05); }

/* ─── Responsive ─────────────────────────────────────────────────── */
@media (max-width:1024px) {
  .g2 { grid-template-columns:1fr!important; }
  .g2r { grid-template-columns:1fr!important; }
  .g3r { grid-template-columns:1fr 1fr!important; }
  .g4r { grid-template-columns:1fr 1fr!important; }
  .pw-sp { grid-template-columns:1fr!important; }
  .prob-g { grid-template-columns:1fr!important; }
  .pod-cols { grid-template-columns:1fr!important; text-align:center!important; }
  .contact-sticky { position: static!important; }
  .iq-pills { grid-template-columns: repeat(3, 1fr)!important; }
}
@media (max-width:840px) {
  .nm  { display:none!important; }
  .hb  { display:flex!important; }
  .nm-cta { display:none!important; }
  .np  { padding-left:20px!important; padding-right:20px!important; }
  .sp  { padding-left:24px!important; padding-right:24px!important; }
  .sec { padding-top:110px!important; padding-bottom:110px!important; }
  .g2  { grid-template-columns:1fr!important; }
  .g3  { grid-template-columns:1fr 1fr!important; }
  .ss  { grid-template-columns:1fr!important; }
  /* Step fix: keep side-by-side but shrink number */
  .step-g  { grid-template-columns:60px 1fr!important; gap:16px!important; }
  .step-num { font-size:48px!important; line-height:1!important; }
  .pod-strip { grid-template-columns:repeat(2,1fr)!important; }
  .g3r  { grid-template-columns:1fr!important; }
  .g4r  { grid-template-columns:1fr 1fr!important; }
  .iq-pills { grid-template-columns: repeat(2, 1fr)!important; }
}
@media (max-width:600px) {
  .sec { padding-top:80px!important; padding-bottom:80px!important; }
  .sp  { padding-left:20px!important; padding-right:20px!important; }
  /* Step: stack number on top of content */
  .step-g  { display:block!important; }
  .step-num { font-size:36px!important; display:inline-block; margin-bottom:10px; }
  .g3  { grid-template-columns:1fr!important; }
  .mc  { padding:22px!important; }
  .dc  { padding:22px!important; }
  .sc-p { padding:20px!important; }
  .g2r { grid-template-columns:1fr!important; }
  .g4r { grid-template-columns:1fr!important; }
  .app-hand-wrap { width:min(340px, 92vw)!important; }
  .app-orbit-a { width: min(420px, 120vw)!important; }
  .app-orbit-b { width: min(470px, 134vw)!important; }
  .app-data-chip {
    font-size: 9px!important;
    letter-spacing: .11em!important;
    padding: 6px 10px!important;
  }
  .app-chip-l { left: 7%!important; top: 22%!important; }
  .app-chip-r { right: 6%!important; bottom: 20%!important; }
  .hero-stage { min-height: 320px!important; }
  .hero-webgl-wrap {
    width: min(360px, 96vw)!important;
    height: min(280px, 68vw)!important;
    min-height: 210px!important;
  }
  .hero-pod-halo { width: 280px!important; }
  .hero-pod-scan { width: 190px!important; top: 30%!important; }
  .hero-chip { font-size: 8px!important; letter-spacing: .1em!important; padding: 6px 8px!important; }
  .hero-chip-l { left: 6%!important; top: 14%!important; }
  .hero-chip-r { right: 4%!important; top: 22%!important; }
  .hero-chip-b { bottom: 8%!important; }
  .hero-pod-reflection { width: 132px!important; height: 132px!important; top: 30%!important; }
  .fx-grid::before, .fx-grid::after { opacity: .16!important; }
  .app-live-screen {
    left:17.4%!important; right:17.4%!important;
    top:5.3%!important; bottom:5.8%!important;
    border-radius:36px!important;
  }
  .tm-wrap::before, .tm-wrap::after { width: 30px!important; }
  .pod-strip { grid-template-columns:1fr!important; }
  /* Problem: hide giant stat number on tiny screens */
  .stat-num { font-size:clamp(72px,18vw,120px)!important; }
  .prob-g { gap:16px!important; }
  .iq-pills { grid-template-columns: 1fr!important; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-webgl-wrap { display: none!important; }
  .hero-svg-fallback { display: block!important; }
}

/* ── Form input ── */
.fi {
  width: 100%; background: var(--bg3); border: 1px solid var(--bd);
  border-radius: 12px; padding: 16px 20px;
  color: var(--txt); font-family: 'DM Sans', sans-serif; font-size: 15px;
  outline: none; appearance: none;
  transition: border-color .25s ease, background .4s ease, color .4s ease;
}
.fi:focus { border-color: var(--a); }
.fi::placeholder { color: var(--sub); }
textarea.fi { resize: none; line-height: 1.6; }

/* ── Contact inquiry UI ── */
.contact-panel {
  background: var(--card);
  border: 1px solid var(--bd);
  border-radius: 20px;
  padding: 18px;
  transition: background .4s ease, border-color .4s ease;
}
.contact-sticky {
  position: sticky;
  top: 96px;
}
.iq-pills {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
.iq-pill {
  border: 1px solid var(--bd);
  background: var(--bg2);
  color: var(--sub);
  border-radius: 10px;
  padding: 9px 10px;
  font-size: 10px;
  letter-spacing: .06em;
  text-transform: uppercase;
  font-weight: 500;
  transition: color .3s ease, border-color .3s ease, background .3s ease;
}
.iq-pill:hover {
  border-color: rgba(77,255,239,.24);
  color: var(--txt);
}
.iq-pill.is-active {
  border-color: rgba(77,255,239,.5);
  color: var(--a);
  background: var(--at);
}

/* ── Contact content swap ── */
.c-swap { animation: cSwapIn .35s ease; }
@keyframes cSwapIn {
  from { opacity: .72; }
  to { opacity: 1; }
}
`;
