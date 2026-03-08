import { useEffect } from 'react';

export function useTiltFx() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll('[data-tilt]'));
    if (!cards.length) return undefined;

    const cleanups = cards.map((card) => {
      let raf = 0;
      let rx = 0;
      let ry = 0;
      let tx = 0;
      let ty = 0;

      const animate = () => {
        rx += (tx - rx) * 0.12;
        ry += (ty - ry) * 0.12;
        card.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`;
        raf = requestAnimationFrame(animate);
      };

      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        tx = py * -7;
        ty = px * 7;
      };

      const onLeave = () => {
        tx = 0;
        ty = 0;
      };

      card.addEventListener('pointermove', onMove, { passive: true });
      card.addEventListener('pointerleave', onLeave, { passive: true });
      raf = requestAnimationFrame(animate);

      return () => {
        cancelAnimationFrame(raf);
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
        card.style.transform = '';
      };
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);
}
