import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HorizontalPresentation from "./components/HorizontalPresentation";
import Testimonials from "./components/Testimonials";

import trainerImg2 from "./assets/trainer2Compressed.jpg";
import trainerImg3 from "./assets/trainer3Compressed.jpg";
import trainerImg from "./assets/trainerCompressed.jpg";

const assets = [
  {
    path: trainerImg,
    alt: "Trainer 1",
  },
  {
    path: trainerImg2,
    alt: "Trainer 2",
  },
  {
    path: trainerImg3,
    alt: "Trainer 3",
  },
];

export default function App() {
  return (
    <>
      <Hero />
      <HorizontalPresentation assets={assets} />
      <Testimonials assets={assets} />
      <Contacts />
      <Footer />
    </>
  );
}
