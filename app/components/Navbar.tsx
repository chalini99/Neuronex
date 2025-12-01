"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="absolute top-0 left-0 w-full p-6 flex justify-between items-center text-white z-10"
    >
      <h1 className="text-2xl font-bold tracking-wide">
        PharmaGen <span className="text-cyan-300">AI</span>
      </h1>

      <div className="flex gap-6 text-lg">
        <a href="#" className="hover:text-cyan-300 transition">Dashboard</a>
        <a href="#" className="hover:text-cyan-300 transition">Features</a>
        <a href="#" className="hover:text-cyan-300 transition">Contact</a>
      </div>

      <button className="px-5 py-2 bg-white bg-opacity-20 rounded-full backdrop-blur-lg hover:bg-opacity-30 transition">
        Login
      </button>
    </motion.nav>
  );
}
