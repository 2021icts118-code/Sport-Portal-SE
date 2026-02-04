import Hero from "../sections/Hero";
import WhyChoose from "../sections/WhyChoose";
import ExploreCategory from "../sections/ExploreCategory";
import SriLankanTravelGuide from "../sections/province";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyChoose />
      <ExploreCategory />
      <SriLankanTravelGuide />
      <Footer />
    </main>
  );
} 