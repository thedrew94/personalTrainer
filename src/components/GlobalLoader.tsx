import { useEffect, useState, useRef } from "react";
import type { AssetInterface } from "../types/interfaces";

interface Props {
  assets: Array<AssetInterface>;
  setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GlobalLoader({ assets, setAppLoading }: Props) {
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    let loadedCount = 0;
    const totalAssets = assets.length;

    const preloadAssets = () => {
      assets.forEach(({ type, path }) => {
        if (type === "image") {
          const img = new Image();
          img.src = path;

          img.onload = () => {
            loadedCount++;
            const newProgress = Math.round((loadedCount / totalAssets) * 100);
            setTargetProgress(newProgress);
          };

          img.onerror = () => {
            console.warn(`Failed to load asset: ${path}`);
            loadedCount++;
            const newProgress = Math.round((loadedCount / totalAssets) * 100);
            setTargetProgress(newProgress);
          };
        } else if (type === "video") {
          const video = document.createElement("video");
          video.src = path;
          video.preload = "auto";

          video.onloadeddata = () => {
            loadedCount++;
            const newProgress = Math.round((loadedCount / totalAssets) * 100);
            setTargetProgress(newProgress);
          };

          video.onerror = () => {
            console.warn(`Failed to load asset: ${path}`);
            loadedCount++;
            const newProgress = Math.round((loadedCount / totalAssets) * 100);
            setTargetProgress(newProgress);
          };
        }
      });
    };

    if (totalAssets > 0) {
      preloadAssets();
    } else {
      setTargetProgress(100);
    }
  }, [assets]);

  // Smooth animation from displayedProgress → targetProgress
  useEffect(() => {
    if (displayedProgress === targetProgress) return;

    const animate = () => {
      setDisplayedProgress((prev) => {
        const diff = targetProgress - prev;
        const increment = Math.max(1, Math.floor(diff / 8)); // Smooth speed

        if (Math.abs(diff) <= 1) {
          return targetProgress;
        }
        return prev + increment;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetProgress]);

  // Final callback when loading is complete
  useEffect(() => {
    if (targetProgress === 100 && displayedProgress === 100) {
      const timer = setTimeout(() => {
        setAppLoading(false);
      }, 600); // Small delay for nice finish

      return () => clearTimeout(timer);
    }
  }, [targetProgress, displayedProgress, setAppLoading]);

  return (
    <div className={`global_loader ${displayedProgress === 100 ? "fade_out" : ""}`}>
      <div className="loader_percentage">
        <span>{displayedProgress}</span>
        <span>%</span>
      </div>
      <div className="loader_outer">
        <span className="loader_inner" style={{ width: `${targetProgress}%` }} />
      </div>
    </div>
  );
}
