import { motion } from "framer-motion";
import { useEffect } from "react";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000); // Loader duration
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black overflow-hidden">
      
      {/* Particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 h-1 bg-white rounded-full absolute"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2 + Math.random() * 3,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Geometry Shapes */}
      <motion.div
        className="absolute w-20 h-20 border-2 border-white rotate-45"
        animate={{ rotate: 405, scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-12 h-12 border-2 border-white rounded-full"
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Typography */}
      <motion.h1
        className="text-white text-3xl font-bold z-50 relative"
        animate={{ opacity: [0, 1, 0], scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Loading...
      </motion.h1>
    </div>
  );
}
