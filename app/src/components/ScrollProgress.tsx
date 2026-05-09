import { useEffect, useState } from 'react';

/**
 * Subtle 2px progress bar at the top of the viewport showing scroll depth.
 * Premium polish detail used by AG1, Hims, IM8, and most editorial DTC.
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const p = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} aria-hidden />;
}
