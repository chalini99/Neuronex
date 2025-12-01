"use client";

import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Hero() {
  const router = useRouter();

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { speed: 1 },
            links: { enable: true, color: "#ffffff", distance: 120, opacity: 0.4 },
          },
        }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold text-center z-10"
      >
        Transforming Pharmaceutical Research
      </motion.h1>

      <button
        onClick={() => router.push("/dashboard")}
        className="mt-10 px-6 py-3 bg-white text-black rounded-full hover:bg-opacity-80 transition z-10"
      >
        Get Started
      </button>
    </div>
  );
}
