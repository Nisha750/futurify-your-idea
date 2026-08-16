import { useEffect, useRef } from "react";

type Obj = {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  rot: number;
  kind: "panel" | "store" | "bar" | "ring";
  phase: number;
};

/**
 * Lightweight cinematic scene: layered glass panels, miniature storefronts and
 * ambient particles rendered on a 2D canvas with parallax camera drift.
 * Chosen over WebGL for predictable performance on low-power devices.
 */
export function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const objects: Obj[] = [];
    const kinds: Obj["kind"][] = ["panel", "store", "bar", "ring", "panel", "store"];
    const objCount = small ? 7 : 13;
    for (let i = 0; i < objCount; i++) {
      objects.push({
        x: rand(0.05, 0.95),
        y: rand(0.12, 0.9),
        z: rand(0.35, 1),
        w: rand(60, 190),
        h: rand(40, 120),
        rot: rand(-0.16, 0.16),
        kind: kinds[i % kinds.length]!,
        phase: rand(0, Math.PI * 2),
      });
    }

    const particleCount = small ? 26 : 70;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: rand(0.2, 1),
      s: rand(0.6, 1.7),
      d: rand(0.00006, 0.00028),
    }));

    let mx = 0.5;
    let my = 0.5;
    let cx = 0.5;
    let cy = 0.5;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth;
      my = e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("resize", resize);

    let raf = 0;
    let t = 0;

    const drawObject = (o: Obj, ox: number, oy: number, time: number) => {
      const depth = 0.4 + o.z * 0.6;
      const px = o.x * width + ox * (1 - o.z) * 70;
      const py =
        o.y * height + oy * (1 - o.z) * 50 + (reduced ? 0 : Math.sin(time * 0.4 + o.phase) * 7 * o.z);
      const w = o.w * depth;
      const h = o.h * depth;

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(o.rot + (reduced ? 0 : Math.sin(time * 0.15 + o.phase) * 0.02));
      ctx.globalAlpha = 0.16 + o.z * 0.4;

      const grad = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
      grad.addColorStop(0, "rgba(255,255,255,0.10)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.03)");
      grad.addColorStop(1, "rgba(210,170,110,0.10)");

      if (o.kind === "ring") {
        ctx.strokeStyle = "rgba(226,214,190,0.5)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 0, w / 2, h / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (o.kind === "bar") {
        ctx.fillStyle = grad;
        for (let i = 0; i < 4; i++) {
          const bh = h * (0.3 + ((i * 7 + o.phase * 3) % 10) / 14);
          ctx.fillRect(-w / 2 + i * (w / 4), h / 2 - bh, w / 5.5, bh);
        }
        ctx.strokeStyle = "rgba(255,255,255,0.14)";
        ctx.strokeRect(-w / 2, -h / 2, w, h);
      } else if (o.kind === "store") {
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-w / 2, h / 2);
        ctx.lineTo(-w / 2, -h / 4);
        ctx.lineTo(0, -h / 2);
        ctx.lineTo(w / 2, -h / 4);
        ctx.lineTo(w / 2, h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.16)";
        ctx.stroke();
        ctx.fillStyle = "rgba(226,190,130,0.22)";
        ctx.fillRect(-w / 6, h / 6, w / 3, h / 3);
      } else {
        ctx.fillStyle = grad;
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.strokeStyle = "rgba(255,255,255,0.15)";
        ctx.strokeRect(-w / 2, -h / 2, w, h);
        ctx.fillStyle = "rgba(255,255,255,0.16)";
        ctx.fillRect(-w / 2 + 10, -h / 2 + 10, w * 0.4, 4);
        ctx.fillRect(-w / 2 + 10, -h / 2 + 22, w * 0.6, 3);
        ctx.fillRect(-w / 2 + 10, -h / 2 + 31, w * 0.28, 3);
      }
      ctx.restore();
    };

    const frame = () => {
      t += 0.016;
      cx += (mx - cx) * 0.045;
      cy += (my - cy) * 0.045;
      const ox = (cx - 0.5) * 2;
      const oy = (cy - 0.5) * 2;

      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * (0.5 + ox * 0.06),
        height * 0.18,
        0,
        width * 0.5,
        height * 0.3,
        Math.max(width, height) * 0.75,
      );
      glow.addColorStop(0, "rgba(150,160,185,0.16)");
      glow.addColorStop(0.5, "rgba(90,95,115,0.05)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        if (!reduced) p.y -= p.d * 900;
        if (p.y < -0.05) p.y = 1.05;
        ctx.globalAlpha = 0.12 + p.z * 0.4;
        ctx.fillStyle = "rgba(235,228,212,0.9)";
        ctx.beginPath();
        ctx.arc(
          p.x * width + ox * p.z * 26,
          p.y * height + oy * p.z * 18,
          p.s * p.z,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      for (const o of [...objects].sort((a, b) => a.z - b.z)) drawObject(o, ox, oy, t);

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
