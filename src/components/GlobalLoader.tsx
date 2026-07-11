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

  function handleLanguageSelection({ lang }: { lang: string }) {
    if (!appLoading) return;
    i18n.changeLanguage(lang);
    navigate(`/${lang}`, { replace: true });
    setAppLoading(false);
  }

  useEffect(() => {
    const duration = 3000;
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setDisplayedProgress(Math.max(1, progress));

      if (progress < 100) {
        requestAnimationFrame(animate);
      }
    }

    const rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [setAppLoading]);

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
