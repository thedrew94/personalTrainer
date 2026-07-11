import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  appLoading: boolean;
  setAppLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GlobalLoader({ appLoading, setAppLoading }: Props) {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [displayedProgress, setDisplayedProgress] = useState<number>(1);
  const [loaderDuration, setLoaderDuration] = useState<number | null>(null);

  function handleLanguageSelection({ lang }: { lang: string }) {
    if (!appLoading) return;
    i18n.changeLanguage(lang);
    navigate(`/${lang}`, { replace: true });
    setAppLoading(false);
  }

  useEffect(() => {
    if (!loaderDuration) return;
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.floor((elapsed / loaderDuration!) * 100), 100);

      setDisplayedProgress(Math.max(1, progress));

      if (progress < 100) {
        requestAnimationFrame(animate);
      }
    }

    const rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [loaderDuration, setAppLoading]);

  useEffect(() => {
    // use the localStorage to store if user has already accessd this page in the past 30min, if yes change the loader duration from 3000 to 1000
    const lastAccess = localStorage.getItem("lastAccess");

    console.log("lastAccess", lastAccess);
    const now = Date.now();
    if (lastAccess && now - parseInt(lastAccess) < 30 * 60 * 1000) {
      console.log("lastAccessexeeeeee", lastAccess);
      setLoaderDuration(1000);
    } else {
      setLoaderDuration(3000);
    }
    localStorage.setItem("lastAccess", now.toString());
  }, []);

  return (
    <div className={`intro_view ${!appLoading ? "fade_out" : ""}`}>
      <ul className={`intro_language_selector ${displayedProgress === 100 ? "fade_in" : ""}`}>
        <li>
          <button onClick={() => handleLanguageSelection({ lang: "it" })}>ITALIANO</button>
        </li>
        <li>
          <button onClick={() => handleLanguageSelection({ lang: "en" })}>ENGLISH</button>
        </li>
        <li>
          <button onClick={() => handleLanguageSelection({ lang: "es" })}>Español</button>
        </li>
        <li>
          <button onClick={() => handleLanguageSelection({ lang: "ja" })}>日本語</button>
        </li>
      </ul>

      <div className={`global_loader ${displayedProgress === 100 ? "fade_out" : ""}`}>
        <div className="loader_percentage">
          <span>{displayedProgress} %</span>
        </div>
        <div className="loader_outer">
          <span className="loader_inner" style={{ width: `${displayedProgress}%` }} />
        </div>
      </div>
    </div>
  );
}
