import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./locales/i18n.ts";

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/personalTrainer">
    <Routes>
      <Route path="/" element={<Navigate to={"/it"} replace />} />
      <Route path="/:lang" element={<App />} />
      <Route path="*" element={<div>not found</div>} />
    </Routes>
  </BrowserRouter>,
);
