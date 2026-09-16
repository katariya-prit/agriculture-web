import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const gridSize = 55;

    let mouse = { x: -1000, y: -1000 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#eef2f5";
      ctx.fillRect(0, 0, width, height);

      const cols = Math.ceil(width / gridSize);
      const rows = Math.ceil(height / gridSize);

      for (let c = 0; c <= cols; c++) {
        const x = c * gridSize;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.strokeStyle = "rgba(163, 177, 198, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let r = 0; r <= rows; r++) {
        const y = r * gridSize;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.strokeStyle = "rgba(163, 177, 198, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (mouse.x > 0 && mouse.y > 0) {
        const highlightRadius = 200;

        const startCol = Math.max(0, Math.floor((mouse.x - highlightRadius) / gridSize));
        const endCol = Math.min(cols, Math.ceil((mouse.x + highlightRadius) / gridSize));

        for (let c = startCol; c <= endCol; c++) {
          const x = c * gridSize;
          const dist = Math.abs(mouse.x - x);

          if (dist < highlightRadius) {
            const alpha = (1 - dist / highlightRadius) * 0.5;
            const startY = Math.max(0, mouse.y - highlightRadius);
            const endY = Math.min(height, mouse.y + highlightRadius);

            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, endY);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
        }

        const startRow = Math.max(0, Math.floor((mouse.y - highlightRadius) / gridSize));
        const endRow = Math.min(rows, Math.ceil((mouse.y + highlightRadius) / gridSize));

        for (let r = startRow; r <= endRow; r++) {
          const y = r * gridSize;
          const dist = Math.abs(mouse.y - y);

          if (dist < highlightRadius) {
            const alpha = (1 - dist / highlightRadius) * 0.5;
            const startX = Math.max(0, mouse.x - highlightRadius);
            const endX = Math.min(width, mouse.x + highlightRadius);

            ctx.beginPath();
            ctx.moveTo(startX, y);
            ctx.lineTo(endX, y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
            ctx.lineWidth = 1.8;
            ctx.stroke();
          }
        }

        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          highlightRadius
        );
        glowGradient.addColorStop(0, "rgba(16, 185, 129, 0.1)");
        glowGradient.addColorStop(1, "rgba(16, 185, 129, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, highlightRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-screen h-screen bg-[#eef2f5]"
    />
  );
}