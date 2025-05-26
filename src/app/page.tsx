"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Home() {
  /* ---------- canvas refs ---------- */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  /* ---------- draw liquid once mounted ---------- */
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    let rafId: number;
    let start = 0;

    /* resize canvas to viewport */
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const WAVE_COLOR = "#74AD7C";
    const DURATION = 4000; // 10 s to fill

    const render = (t: number) => {
      if (!start) start = t;
      const dt = t - start;
      const progress = Math.min(dt / DURATION, 1);          // 0 → 1
      const h = canvas.height;
      const w = canvas.width;
      const waterLevel = h-200 - h * progress;                  // y-pos of liquid
      const amplitude = 20;                                 // wave height
      const frequency = 0.015;                              // wave frequency
      const phase = dt * 0.002;                             // wave phase shift

      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = WAVE_COLOR;
      ctx.beginPath();
      ctx.moveTo(0, waterLevel);

      // draw sinusoidal top
      for (let x = 0; x <= w; x += 10) {
        const y =
          waterLevel + Math.sin(x * frequency + phase) * amplitude;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      if (progress < 1) rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ---------- jsx ---------- */
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-gradient-matcha bg-[length:200%_200%] animate-gradient-move">

      {/* 🍵 Canvas-based Rising Liquid Background */}
      <canvas
        ref={canvasRef}
        className="absolute bottom-0 left-0 w-full h-full z-0 pointer-events-none"
      />

      {/* 🧾 White Content Box */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-xl shadow-lg px-8 py-10 max-w-xl w-full">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-matcha-taupe mb-4 drop-shadow-sm break-words"
        >
          🍵 MatchaMatch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-lg sm:text-xl text-matcha-taupe max-w-md mx-auto mb-8"
        >
          Get personalized matcha recommendations based on your taste preferences after taking a short quiz.
        </motion.p>

        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Link
            href="/taste"
            className="px-6 py-3 bg-matcha-med text-white rounded-full text-lg font-semibold hover:bg-matcha-light transition shadow-lg"
          >
            Start Taste Test →
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
