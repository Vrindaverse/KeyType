import { useEffect, useRef, useState } from "react";

const DoodleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [lines, setLines] = useState<{ x: number; y: number; time: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();
      // draw lines that are less than 1 min old
      const recentLines = lines.filter(l => now - l.time < 60000);
      setLines(recentLines);
      ctx.strokeStyle = "rgba(0,0,0,0.7)";
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 1; i < recentLines.length; i++) {
        ctx.moveTo(recentLines[i - 1].x, recentLines[i - 1].y);
        ctx.lineTo(recentLines[i].x, recentLines[i].y);
      }
      ctx.stroke();
      requestAnimationFrame(draw);
    };
    draw();
  }, [lines]);

  const handleMouseDown = () => setDrawing(true);
  const handleMouseUp = () => setDrawing(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!drawing) return;
    setLines(prev => [...prev, { x: e.clientX, y: e.clientY, time: Date.now() }]);
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
};

export default DoodleCanvas;
