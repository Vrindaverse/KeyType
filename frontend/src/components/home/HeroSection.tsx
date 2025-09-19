import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center mt-10 text-center min-h-[90vh] bg-white text-black px-4 overflow-hidden">
      {/* Website Name */}
      <h1 className="relative z-10 text-6xl md:text-6xl font-bold font-passero mb-16 mt-20 px-8 py-4 border-2 border-black rounded-lg inline-block shadow-[7px_6px_2px_rgba(0,0,0,0.25)] bg-white/80 backdrop-blur-sm">
        KeyType
      </h1>

      {/* Tagline */}
      <p className="relative z-10 text-xl md:text-2xl mb-10 font-patrick bg-white/60 px-4 rounded">
        <Typewriter
          words={[
            '"When speed meets accuracy"',
            '"Test your speed and compete with others"',
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={50}
          delaySpeed={1300}
        />
      </p>

      {/* Buttons */}
      <div className="relative z-10 flex gap-6">
        <Link
          to="/play"
          className="px-6 py-3 bg-black text-white rounded-md font-patrick shadow-[4px_4px_0px_rgba(0,0,0,0.25)] transform transition-all duration-200 hover:scale-105 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.25)]"
        >
          Play Now
        </Link>
        <Link
          to="/auth"
          className="px-6 py-3 border-2 border-black text-black rounded-md font-patrick shadow-[4px_4px_0px_rgba(0,0,0,0.25)] transform transition-all duration-200 hover:scale-105 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.25)]"
        >
          Join Us
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
