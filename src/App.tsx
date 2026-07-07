import Contacts from "./components/Contacts";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import HorizontalPresentation from "./components/HorizontalPresentation";
import Testimonials from "./components/Testimonials";

export default function App() {
  return (
    <>
      <Hero />
      <HorizontalPresentation />
      <Testimonials />
      <Contacts />
      <Footer />
    </>
  );
}
