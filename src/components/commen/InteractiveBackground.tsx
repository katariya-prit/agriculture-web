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

    const gridSize = 50;
    const cols = Math.ceil(width / gridSize) + 2;
    const rows = Math.ceil(height / gridSize) + 2;

    interface Point {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
    }

    let points: Point[][] = [];

    const initGrid = () => {
      points = [];
      for (let r = 0; r < rows; r++) {
        const rowPoints: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * gridSize;
          const y = r * gridSize;
          rowPoints.push({ x, y, originX: x, originY: y, vx: 0, vy: 0 });
        }
        points.push(rowPoints);
      }
    };

    initGrid();

    let mouse = { x: -1000, y: -1000, isDown: false, dragStartX: 0, dragStartY: 0 };

    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }
    let ripples: Ripple[] = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initGrid();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseDown = (e: MouseEvent) => {
      mouse.isDown = true;
      mouse.dragStartX = e.clientX;
      mouse.dragStartY = e.clientY;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (mouse.isDown) {
        mouse.isDown = false;
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 0,
          maxRadius: 280,
          alpha: 1,
        });
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    const spring = 0.08;
    const damping = 0.82;
    const pullRadius = 220;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // White Base Fill
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      const dragDX = mouse.isDown ? mouse.x - mouse.dragStartX : 0;
      const dragDY = mouse.isDown ? mouse.y - mouse.dragStartY : 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];
          const dx = mouse.x - pt.originX;
          const dy = mouse.y - pt.originY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetX = pt.originX;
          let targetY = pt.originY;

          if (mouse.isDown && dist < pullRadius) {
            const factor = Math.pow(1 - dist / pullRadius, 2);
            targetX += dragDX * factor * 0.6;
            targetY += dragDY * factor * 0.6;
          }

          const forceX = (targetX - pt.x) * spring;
          const forceY = (targetY - pt.y) * spring;

          pt.vx = (pt.vx + forceX) * damping;
          pt.vy = (pt.vy + forceY) * damping;

          pt.x += pt.vx;
          pt.y += pt.vy;
        }
      }

      ctx.lineWidth = 1;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = points[r][c];

          if (c < cols - 1) {
            const rightPt = points[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(rightPt.x, rightPt.y);

            const midX = (pt.x + rightPt.x) / 2;
            const midY = (pt.y + rightPt.y) / 2;
            const distToMouse = Math.hypot(mouse.x - midX, mouse.y - midY);

            if (distToMouse < 220) {
              const alpha = 0.3 + (1 - distToMouse / 220) * 0.7;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.lineWidth = 1.8;
            } else {
              ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
              ctx.lineWidth = 1;
            }
            ctx.stroke();
          }

          if (r < rows - 1) {
            const bottomPt = points[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
            ctx.lineTo(bottomPt.x, bottomPt.y);

            const midX = (pt.x + bottomPt.x) / 2;
            const midY = (pt.y + bottomPt.y) / 2;
            const distToMouse = Math.hypot(mouse.x - midX, mouse.y - midY);

            if (distToMouse < 220) {
              const alpha = 0.3 + (1 - distToMouse / 220) * 0.7;
              ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`;
              ctx.lineWidth = 1.8;
            } else {
              ctx.strokeStyle = "rgba(16, 185, 129, 0.15)";
              ctx.lineWidth = 1;
            }
            ctx.stroke();
          }
        }
      }

      // Mouse Glow
      if (mouse.x > 0 && mouse.y > 0) {
        const glowGradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          200
        );
        glowGradient.addColorStop(0, "rgba(16, 185, 129, 0.15)");
        glowGradient.addColorStop(1, "rgba(16, 185, 129, 0)");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 4;
        r.alpha -= 0.015;

        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(16, 185, 129, ${r.alpha * 0.8})`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-screen h-screen bg-white"
    />
  );
}