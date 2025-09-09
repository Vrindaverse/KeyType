import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Play from "./pages/Play";

export default function AnimatedRoutes() {
  const location = useLocation();

  const randomDirection = () => {
    const dirs = [
      { x: 50, y: 0 },
      { x: -50, y: 0 },
      { x: 50, y: -30 },
      { x: -50, y: 30 },
    ];
    return dirs[Math.floor(Math.random() * dirs.length)];
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/signup"
          element={
            <motion.div
              initial={randomDirection()}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={randomDirection()}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Signup />
            </motion.div>
          }
        />
        <Route
          path="/login"
          element={
            <motion.div
              initial={randomDirection()}
              animate={{ x: 0, y: 0, opacity: 1 }}
              exit={randomDirection()}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Login />
            </motion.div>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </AnimatePresence>
  );
}
