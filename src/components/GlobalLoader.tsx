import { useState, useEffect } from "react";

export default function GlobalLoader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let startTime: number;
    let raf: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const newProgress = Math.min(Math.floor((elapsed / 3000) * 100), 100);

      setProgress(newProgress);

      if (elapsed < 3000) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={`global_loader ${progress === 100 ? "fade_out" : ""}`}>
      <span className="loader_percentage">{progress}%</span>
      <div className="loader_outer">
        <span className="loader_inner" style={{ width: `${progress}%` }}></span>
      </div>
    </div>
  );
}
