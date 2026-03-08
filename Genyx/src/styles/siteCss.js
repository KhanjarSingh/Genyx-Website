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

/* ── Footer link (always dark bg) ── */
.ft-link { text-decoration: none; transition: color .25s ease; cursor: none; }
.ft-link:hover { color: #fff!important; }
.ft-social { text-decoration: none; cursor: none; transition: color .25s ease, border-color .25s ease; }
.ft-social:hover { color: #4DFFEF!important; border-color: rgba(77,255,239,.3)!important; }

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
.team-core-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.team-img-wrap {
  width: 100%;
  aspect-ratio: 3/4;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: linear-gradient(180deg, #0c0c0c 0%, #111 50%, #0e0e0e 100%);
  border-bottom: 1px solid var(--bd);
  overflow: hidden;
  position: relative;
}
.team-img-person {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}
.team-img-person.blend-dark {
  mix-blend-mode: multiply;
}
.team-img-temp {
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, #151515 0%, #1a1a1a 100%);
}
.team-linkedin-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(6, 8, 12, 0.78);
  border: 1px solid rgba(255,255,255,0.16);
  color: #e9f7ff;
  transition: border-color .25s ease, color .25s ease, background .25s ease, transform .25s ease;
  flex-shrink: 0;
}
.team-linkedin-btn:hover {
  border-color: rgba(77,255,239,.6);
  color: #4DFFEF;
  background: rgba(8, 14, 20, 0.92);
  transform: translateY(-1px);
}

/* ── Contact Page ── */
.contact-wrap { width: 100%; }
.contact-hero-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 22px; align-items: end; }
.contact-chip-grid { display: grid; gap: 8px; justify-self: end; width: min(330px, 100%); }
.contact-chip { background: var(--card); border: 1px solid var(--bd); border-radius: 12px; padding: 12px 14px; transition: background .4s ease, border-color .4s ease; }
.contact-chip-v { color: var(--a); font-size: 20px; font-weight: 700; letter-spacing: -.02em; line-height: 1; margin-bottom: 5px; }
.contact-chip-l { color: var(--sub); font-size: 10px; letter-spacing: .12em; text-transform: uppercase; }

.contact-role-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; background: var(--div); border-radius: 14px; overflow: hidden; }
.contact-role-btn { position: relative; background: var(--card); border: none; text-align: left; padding: 18px; transition: background .4s ease; }
.contact-role-btn:hover { background: var(--bg3); }
.contact-role-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.contact-role-icon { color: var(--a); font-size: 16px; line-height: 1; }
.contact-role-name { color: var(--txt); font-size: 14px; font-weight: 600; letter-spacing: -.01em; }
.contact-role-desc {
  color: var(--sub); font-size: 12px; line-height: 1.55; margin-bottom: 14px;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.contact-pill { display: inline-block; border: 1px solid var(--bd); border-radius: 999px; color: var(--sub); font-size: 9px; letter-spacing: .12em; text-transform: uppercase; padding: 4px 9px; }
.contact-role-line { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--a); transform: scaleX(0); transform-origin: left; transition: transform .44s cubic-bezier(.4,0,.2,1); }
.contact-role-btn.is-active .contact-role-line { transform: scaleX(1); }

.contact-form-grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 14px; align-items: start; }
.contact-form-shell { transition: opacity .85s cubic-bezier(.4,0,.2,1), transform .85s cubic-bezier(.4,0,.2,1); }
.contact-form-shell.is-out { opacity: 0; transform: translateY(12px); pointer-events: none; }
.contact-form-shell.is-in { opacity: 1; transform: translateY(0); }
.contact-form-card { background: var(--card); border: 1px solid var(--bd); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; gap: 12px; transition: background .4s ease, border-color .4s ease; }
.contact-form-title { color: var(--a); font-size: clamp(30px, 4.2vw, 50px); font-weight: 700; letter-spacing: -.03em; line-height: .95; text-transform: uppercase; }
.contact-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.contact-lbl { display: block; color: var(--sub); font-size: 10px; letter-spacing: .16em; text-transform: uppercase; margin-bottom: 8px; transition: color .25s ease; }
.contact-lbl.is-err { color: #ef4444; }
.contact-lbl:has(+ .fi:focus), .contact-lbl:has(+ .fiw .fi:focus) { color: var(--a); }
.fi-err { border-color: #ef4444!important; }
.contact-err { color: #ef4444; font-size: 11px; margin-top: 6px; line-height: 1.5; }
.contact-sec-lbl { color: var(--dim); font-size: 10px; letter-spacing: .16em; text-transform: uppercase; margin-top: 8px; }
.contact-submit { margin-top: 8px; background: var(--at); border: 1px solid var(--a); border-radius: 10px; padding: 14px 26px; color: var(--a); font-size: 12px; font-weight: 500; letter-spacing: .08em; }
.contact-submit:disabled { opacity: .6; }
.contact-ok { width: 62px; height: 62px; border: 1px solid var(--a); border-radius: 12px; display: grid; place-items: center; color: var(--a); font-size: 30px; margin-bottom: 20px; animation: pulse 1.6s ease-in-out infinite; }

.fiw { position: relative; }
.fiw::after { content: '⌄'; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--sub); pointer-events: none; font-size: 14px; }
.fiw .fi { padding-right: 42px; }

.contact-dd-wrap { position: relative; }
.contact-dd-wrap:focus-within .contact-lbl { color: var(--a); }
.contact-dd-btn {
  width: 100%;
  background: var(--bg3);
  border: 1px solid var(--bd);
  border-radius: 12px;
  padding: 16px 44px 16px 20px;
  color: var(--txt);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  transition: border-color .25s ease, background .4s ease, color .4s ease;
}
.contact-dd-btn:hover { border-color: var(--a); }
.contact-dd-btn.is-err { border-color: #ef4444; }
.contact-dd-caret {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--sub);
  font-size: 14px;
  transition: transform .25s ease, color .25s ease;
  pointer-events: none;
}
.contact-dd-caret.is-open { transform: translateY(-50%) rotate(180deg); color: var(--a); }
.contact-dd-list {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  z-index: 20;
  background: var(--card);
  border: 1px solid var(--bd);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--sh);
  max-height: 280px;
  overflow-y: auto;
}
.contact-dd-item {
  width: 100%;
  border: none;
  border-bottom: 1px solid var(--div);
  background: transparent;
  color: var(--txt);
  font-size: 13px;
  line-height: 1.55;
  text-align: left;
  padding: 11px 14px;
  transition: background .25s ease, color .25s ease;
}
.contact-dd-item:last-child { border-bottom: none; }
.contact-dd-item:hover,
.contact-dd-item.is-active {
  background: var(--bg3);
  color: var(--a);
}

.contact-radiogrp, .contact-checkgrp { border: 1px solid var(--bd); border-radius: 10px; padding: 0 10px; background: transparent; }
.contact-radiogrp.is-err, .contact-checkgrp.is-err { border-color: #ef4444; }
.contact-opt { width: 100%; border: none; background: transparent; color: var(--txt); display: flex; align-items: center; gap: 10px; padding: 11px 0; border-bottom: 1px solid var(--div); font-size: 13px; line-height: 1.55; text-align: left; }
.contact-opt:last-child { border-bottom: none; }
.contact-dot { width: 14px; height: 14px; border-radius: 50%; border: 1px solid var(--dim); flex: none; position: relative; }
.contact-dot.is-on { border-color: var(--a); }
.contact-dot.is-on::after { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--a); position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); }
.contact-box { width: 14px; height: 14px; border-radius: 3px; border: 1px solid var(--dim); flex: none; display: grid; place-items: center; color: transparent; font-size: 10px; line-height: 1; }
.contact-box.is-on { background: var(--a); border-color: var(--a); color: #0a0a0a; font-weight: 700; }
.contact-checkline { border: none; background: transparent; color: var(--sub); font-size: 13px; line-height: 1.6; display: flex; align-items: flex-start; gap: 10px; text-align: left; }

.contact-range-val { color: var(--a); font-size: clamp(24px, 3vw, 34px); font-weight: 700; letter-spacing: -.02em; margin-bottom: 8px; }
.contact-range { width: 100%; appearance: none; height: 6px; border-radius: 999px; background: var(--bg3); border: 1px solid var(--bd); }
.contact-range::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; border-radius: 50%; border: 1px solid var(--a); background: var(--bg); cursor: none; }
.contact-range::-moz-range-thumb { width: 16px; height: 16px; border-radius: 50%; border: 1px solid var(--a); background: var(--bg); cursor: none; }

.contact-info { display: flex; flex-direction: column; gap: 10px; position: sticky; top: 84px; }
.contact-info-hi { background: var(--card); border: 1px solid var(--bd); border-radius: 16px; padding: 16px; transition: background .4s ease, border-color .4s ease; }
.contact-info-hi h3 { color: var(--txt); font-size: 16px; margin-bottom: 8px; }
.contact-info-hi p { color: var(--sub); font-size: 12px; line-height: 1.6; margin-bottom: 10px; }
.contact-info-list { color: var(--txt); font-size: 12px; display: grid; gap: 5px; }
.contact-info-card { background: var(--card); border: 1px solid var(--bd); border-radius: 16px; padding: 16px; transition: border-color .3s ease, background .4s ease; }
.contact-info-k { color: var(--sub); font-size: 10px; letter-spacing: .16em; text-transform: uppercase; margin-bottom: 8px; }
.contact-info-v { color: var(--a); font-size: 24px; font-weight: 700; letter-spacing: -.02em; }
.contact-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.contact-linklist { display: grid; gap: 6px; }
.contact-info-card .nl { display: block; margin-top: 0; font-size: 12px; }

/* ─── Responsive ─────────────────────────────────────────────────── */
@media (max-width:1024px) {
  .g2 { grid-template-columns:1fr!important; }
  .g2r { grid-template-columns:1fr!important; }
  .g3r { grid-template-columns:1fr 1fr!important; }
  .g4r { grid-template-columns:1fr 1fr!important; }
  .pw-sp { grid-template-columns:1fr!important; }
  .prob-g { grid-template-columns:1fr!important; }
  .pod-cols { grid-template-columns:1fr!important; text-align:center!important; }
  .team-core-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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
  .contact-hero-grid { grid-template-columns: 1fr!important; gap: 18px!important; }
  .contact-chip-grid { justify-self: start!important; width: 100%!important; grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .contact-form-grid { grid-template-columns: 1fr!important; }
  .contact-info { display: none!important; }
  .footer-main-grid {
    grid-template-columns: 1fr 1fr!important;
    gap: 36px!important;
  }
  .footer-bottom-grid {
    justify-content: center!important;
    text-align: center!important;
    flex-direction: column!important;
    align-items: center!important;
    gap: 8px!important;
  }
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
  .contact-role-grid { grid-template-columns:1fr 1fr!important; }
  .contact-role-btn { padding:18px!important; }
  .contact-form-card { padding:20px!important; }
  .team-core-grid { grid-template-columns: 1fr!important; }
  .footer-main-grid { grid-template-columns: 1fr!important; gap: 32px!important; }
  .footer-bottom-grid {
    justify-content: center!important;
    flex-direction: column!important;
    align-items: center!important;
    text-align: center!important;
    gap: 8px!important;
  }
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
`;
