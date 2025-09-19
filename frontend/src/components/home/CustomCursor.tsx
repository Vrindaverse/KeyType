import { useEffect, useState } from "react";
import inkpen from "../../assets/inkpen2.png";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>(
    []
  );

  useEffect(() => {
    let animationFrame: number;

    const move = (e: MouseEvent) => {
      animationFrame = requestAnimationFrame(() => {
        const newPos = { x: e.clientX, y: e.clientY };
        setPos(newPos);

        // Add ink drop to trail
        setTrail((prev) => [
          ...prev.slice(-15), // keep last 15 drops only
          { ...newPos, id: Date.now() },
        ]);
      });
    };

    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Ink trail */}
      {trail.map((drop) => (
        <span
          key={drop.id}
          style={{
            left: drop.x,
            top: drop.y,
            transform: "translate(-50%, -50%)",
          }}
          className="pointer-events-none fixed z-40 w-2 h-2 rounded-full bg-black opacity-60 animate-fadeOut"
        />
      ))}

      {/* Inkpen */}
      <div
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
        className="pointer-events-none fixed z-50 w-12 h-12"
      >
        <img
          src={inkpen}
          alt="cursor"
          className="w-full h-full"
          style={{ filter: "brightness(0.2)" }} 
        />
      </div>
    </>
  );
};

export default CustomCursor;
