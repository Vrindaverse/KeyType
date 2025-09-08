// src/components/HeroSection.tsx
import { Link } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter'

const HeroSection = () => {
  return (
    <section className="relative w-full flex flex-col items-center mt-10  text-center min-h-[90vh] bg-white text-black px-4">
      {/* Website Name */}
<h1
  className="text-6xl md:text-6xl font-bold font-passero mb-16 mt-20 px-8 py-4 border-2 border-black rounded-lg inline-block shadow-[7px_6px_2px_rgba(0,0,0,0.25)]"
>
  KeyType
</h1>


      {/* Tagline */}
  <p className="text-xl md:text-2xl mb-10 font-patrick">
      <Typewriter
        words={[
          '"When speed meets accuracy"',
          '"Test your speed and compete with others"',
        ]}
        loop={0} // 0 = infinite loop
        cursor
        cursorStyle='|'
        typeSpeed={80}
        deleteSpeed={50}
        delaySpeed={1300} 
        />
    </p>
        
<div className="flex gap-6">
  <Link
    to="/test"
    className="px-6 py-3 bg-black text-white rounded-md font-patrick shadow-[4px_4px_0px_rgba(0,0,0,0.25)] transform transition-all duration-200 hover:scale-105 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.25)]"
  >
    Play Now
  </Link>
  <Link
    to="/signup"
    className="px-6 py-3 border-2 border-black text-black rounded-md font-patrick shadow-[4px_4px_0px_rgba(0,0,0,0.25)] transform transition-all duration-200 hover:scale-105 hover:shadow-[5px_5px_0px_rgba(0,0,0,0.25)]"
  >
    Join Us
  </Link>
</div>

    </section>
  );
};

export default HeroSection;
