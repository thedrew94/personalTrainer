import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HorizontalPresentation from "./components/HorizontalPresentation";
import Testimonials from "./components/Testimonials";

import fitnessVideo from "./assets/fitnessCompressed.mp4";
import trainerImg2 from "./assets/trainer2Compressed.jpg";
import trainerImg3 from "./assets/trainer3Compressed.jpg";
import trainerImg from "./assets/trainerCompressed.jpg";
import videoPoster from "./assets/videoPoster.png";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GlobalLoader from "./components/GlobalLoader";
import Menu from "./components/Menu";
import PhotoGallery from "./components/PhotoGallery";
import type { AssetInterface } from "./types/interfaces";

const supportedLanguages = ["en", "es", "it", "ja"];
const assets: Array<AssetInterface> = [
  {
    type: "image",
    path: trainerImg,
    alt: "Trainer 1",
  },
  {
    type: "image",
    path: trainerImg2,
    alt: "Trainer 2",
  },
  {
    type: "image",
    path: trainerImg3,
    alt: "Trainer 3",
  },
  {
    type: "poster",
    path: videoPoster,
    alt: "Video Poster",
  },
  {
    type: "video",
    path: fitnessVideo,
    alt: "Fitness Video",
  },
];

export default function App() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    if (!lang || !supportedLanguages.includes(lang)) navigate("/it", { replace: true });
  }, [lang]);

  return (
    <>
      <GlobalLoader appLoading={appLoading} setAppLoading={setAppLoading} />

      {!appLoading && (
        <>
          <Menu />
          <Hero assets={assets} />
          <HorizontalPresentation assets={assets} />
          <PhotoGallery assets={assets} />
          <Testimonials assets={assets} />
          <Contacts />
          <Footer />
        </>
      )}
    </>
  );
}
