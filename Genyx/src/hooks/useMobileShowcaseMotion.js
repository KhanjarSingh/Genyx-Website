import { useEffect } from 'react';

export function useMobileShowcaseMotion(containerRef, phoneRef) {
  useEffect(() => {
    const container = containerRef.current;
    const phone = phoneRef.current;
    if (!container || !phone) return undefined;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let mx = 0;
    let my = 0;

    const setTransform = () => {
      tx += (mx - tx) * 0.08;
      ty += (my - ty) * 0.08;
      phone.style.setProperty('--gx-tilt-x', `${tx.toFixed(2)}deg`);
      phone.style.setProperty('--gx-tilt-y', `${ty.toFixed(2)}deg`);
      raf = requestAnimationFrame(setTransform);
    };

    const onPointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mx = px * 10;
      my = py * -10;
    };

    const onPointerLeave = () => {
      mx = 0;
      my = 0;
    };

    const onDeviceOrientation = (e) => {
      if (typeof e.gamma !== 'number' || typeof e.beta !== 'number') return;
      mx = Math.max(-8, Math.min(8, e.gamma * 0.25));
      my = Math.max(-8, Math.min(8, (e.beta - 45) * -0.15));
    };

    const onScroll = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
      phone.style.setProperty('--gx-scroll-lift', `${(1 - progress) * 20 - 10}px`);
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('pointerleave', onPointerLeave, { passive: true });
    window.addEventListener('deviceorientation', onDeviceOrientation, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    onScroll();
    raf = requestAnimationFrame(setTransform);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('deviceorientation', onDeviceOrientation);
      window.removeEventListener('scroll', onScroll);
    };
  }, [containerRef, phoneRef]);
}
