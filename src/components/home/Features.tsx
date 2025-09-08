
import type { FC } from "react";

type FeatureProps = {
  title: string;
  description: string;
  media: React.ReactNode; // could be <img>, <video>, <div>, etc.
  reverse?: boolean;
};

const Feature: FC<FeatureProps> = ({ title, description, media, reverse }) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 py-12 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Media */}
      <div className="flex-1 flex justify-center">
        <div className="w-full md:w-4/5 border-2 border-dashed border-black rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,0.25)] overflow-hidden">
          {media}
        </div>
      </div>

      {/* Text */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-2xl md:text-3xl font-passero mb-4">{title}</h3>
        <p className="font-patrick text-lg text-gray-700">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-white text-black py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-passero text-center mb-16 inline-block px-6 py-2 border-2 border-black rounded-lg shadow-[6px_6px_0px_rgba(0,0,0,0.25)]">
          Features
        </h2>

        {/* Feature list */}
        <Feature
          title="Smooth Typing Experience"
          description="Minimal lag, accurate word rendering, and a clean interface built for speed."
          media={<img src="/assets/typing-demo.gif" alt="Typing Demo" />}
        />
        <Feature
          title="Multiplayer Mode"
          description="Challenge friends or compete globally in real-time typing races."
          media={<img src="/assets/multiplayer.png" alt="Multiplayer" />}
          reverse
        />
        <Feature
          title="Leaderboard & Stats"
          description="Track progress, climb the leaderboard, and flex your skills."
          media={<video src="/assets/leaderboard.mp4" autoPlay loop muted />}
        />
      </div>
    </section>
  );
};

export default Features;
