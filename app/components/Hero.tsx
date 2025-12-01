"use client";
import { useCallback } from "react";
import { Particles } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 60 },
            size: { value: 3 },
            move: { speed: 1 },
            links: { enable: true, color: "#ffffff", opacity: 0.25, distance: 140 },
          },
        }}
        className="absolute inset-0 -z-10"
      />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl sm:text-6xl font-extrabold text-center"
      >
        Accelerating Drug Repurposing <br />
        with <span className="text-cyan-300">AI</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mt-6 text-xl text-center max-w-2xl"
      >
        Transforming pharmaceutical research with insights generated in hours — not months.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="mt-10 flex gap-4"
      >
        
        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full font-semibold hover:scale-105 transition"
        >
          Get Started
        </button>
        <button className="px-6 py-3 bg-white bg-opacity-20 rounded-full backdrop-blur-lg hover:bg-opacity-30 transition">
          Watch Demo ▶
        </button>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
        {["Clinical Trials Insights", "Patent Landscape", "Market Trends"].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="p-6 rounded-2xl bg-white bg-opacity-15 backdrop-blur-lg shadow-lg text-center hover:scale-105 transition cursor-pointer"
          >
            <h3 className="font-semibold text-lg">{item}</h3>
          </motion.div>
        ))}
        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.5, duration: 1 }}
  className="mt-20 animate-bounce cursor-pointer"
>
  <span className="text-3xl">⬇</span>
</motion.div>

      </div>
    </div>
  );
}
