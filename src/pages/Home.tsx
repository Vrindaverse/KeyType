import HeroSection from "../components/home/HeroSection";
import Features from "../components/home/Features";
import Contact from "../components/home/Contact";
import Navbar from "../components/layout/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Features />
      <Contact />
    </div>
  )
}

export default Home;