import { useEffect, useState } from "react";
import type { AssetInterface } from "../types/interfaces";

interface Props {
  assets: Array<AssetInterface>;
  setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GlobalLoader({ setAppLoading }: Props) {
  const [displayedProgress, setDisplayedProgress] = useState<number>(1);

  useEffect(() => {
    const duration = 500;
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setDisplayedProgress(Math.max(1, progress));

      if (progress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setAppLoading(false);
        }, 300);
      }
    }

    const rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [setAppLoading]);

  return (
    <div className={`global_loader ${displayedProgress === 100 ? "fade_out" : ""}`}>
      <div className="loader_percentage">
        <span>{displayedProgress}</span>
        <span>%</span>
      </div>
      <div className="loader_outer">
        <span className="loader_inner" style={{ width: `${displayedProgress}%` }} />
      </div>
    </div>
  );
}
