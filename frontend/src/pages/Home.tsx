import HeroSection from "../components/home/HeroSection";
import Features from "../components/home/Features";
import Contact from "../components/home/Contact";
import CustomCursor from "../components/home/CustomCursor"; 

const Home = () => {
  return (
    <div className="home-screen">
      <div className="relative min-h-screen w-full text-black overflow-hidden">
        {/* Ink Pen Cursor */}
        <CustomCursor />

        {/* Main page sections */}
        <div className="relative z-10">
          <HeroSection />
          <Features />
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Home;
