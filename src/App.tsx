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

import { useState } from "react";
import GlobalLoader from "./components/GlobalLoader";
import type { AssetInterface } from "./types/interfaces";

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
    type: "image",
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
  const [appLoading, setAppLoading] = useState(true);

  return (
    <>
      <GlobalLoader assets={assets} setAppLoading={setAppLoading} />

      {!appLoading && (
        <>
          <Hero assets={assets} />
          <HorizontalPresentation assets={assets} />
          <Testimonials assets={assets} />
          <Contacts />
          <Footer />
        </>
      )}
    </>
  );
}
