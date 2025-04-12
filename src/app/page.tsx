"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-gradient-matcha bg-[length:200%_200%] animate-gradient-move">
      
      {/* 🍵 Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl sm:text-6xl font-extrabold text-matcha-taupe mb-4 drop-shadow-sm z-10"
      >
        🍵 MatchaMatch
      </motion.h1>

      {/* 📝 Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-lg sm:text-xl text-matcha-taupe max-w-md mb-8 z-10"
      >
        Get personalized matcha recommendations based on your taste preferences after taking a short quiz.
      </motion.p>

      {/* 🌈 CTA Button with pulse */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="z-10"
      >
        <Link
          href="/taste"
          className="px-6 py-3 bg-matcha-med text-white rounded-full text-lg font-semibold hover:bg-matcha-light transition shadow-lg"
        >
          Start Taste Test →
        </Link>
      </motion.div>
    </main>
  );
}
