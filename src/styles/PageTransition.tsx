import { motion } from "framer-motion";

const transitionVariants = {
  initial: { scaleY: 0, transformOrigin: "bottom" },
  animate: { scaleY: 0, transformOrigin: "top" },
  exit: { scaleY: 1, transformOrigin: "bottom" },
};

export default function PageTransition() {
  return (
    <motion.div
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-50 bg-black"
    />
  );
}
