import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "./locales/i18n.ts";

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(
  // <BrowserRouter basename="/personalTrainer">
  <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Navigate to={"/it"} replace />} /> */}
      <Route path="*" element={<App />} />
      {/* <Route path="/:lang" element={<App />} /> */}
      {/* <Route path="*" element={<div>not found</div>} /> */}
    </Routes>
  </BrowserRouter>,
);
