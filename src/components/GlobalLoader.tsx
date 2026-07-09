import { useEffect, useState } from "react";
import type { AssetInterface } from "../types/interfaces";

interface Props {
  assets: Array<AssetInterface>;
  setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GlobalLoader({ assets, setAppLoading }: Props) {
  const [displayedProgress, setDisplayedProgress] = useState<number>(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedProgress((prev) => {
        if (prev === 100) {
          clearInterval(interval);
          setAppLoading(false);
          return 100;
        }
        return prev === 99 ? 99 : prev + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // if the loading time exceeds 6 seconds, set displayedProgress to 100
    if (displayedProgress < 100) {
      const timeout = setTimeout(() => {
        setDisplayedProgress(100);
      }, 6000);
      return () => clearTimeout(timeout);
    }
  }, [displayedProgress]);

  useEffect(() => {
    // load assets, once fully loaded, set displayedProgress to 100
    function preloadAssets() {
      const totalAssets = assets.length;
      let loadedCount = 0;

      assets.forEach(({ type, path }) => {
        if (type === "image") {
          const img = new Image();
          img.src = path;
          img.onload = () => {
            loadedCount++;
            if (loadedCount === totalAssets) {
              setDisplayedProgress(100);
            }
          };
        } else if (type === "video") {
          const video = document.createElement("video");
          video.src = path;
          video.preload = "auto";
          video.onloadeddata = () => {
            loadedCount++;
            if (loadedCount === totalAssets) {
              setDisplayedProgress(100);
            }
          };
        }
      });
    }
    preloadAssets();
  }, [assets]);

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
