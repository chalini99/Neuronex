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
      {/* LOGO */}
      <h1 className="text-2xl font-bold tracking-wide">
        PharmaGen <span className="text-cyan-300">AI</span>
      </h1>

      {/* NAV LINKS */}
      <div className="flex gap-8 text-lg">
        <a href="/dashboard" className="hover:text-cyan-300 transition">Dashboard</a>
        <a href="#features" className="hover:text-cyan-300 transition">Features</a>
        <a href="#contact" className="hover:text-cyan-300 transition">Contact</a>
      </div>

      {/* LOGIN BUTTON (removed margin-top issue) */}
      <button className="px-6 py-2 bg-white text-black rounded-full hover:bg-opacity-80 transition">
        Login
      </button>
    </motion.nav>
  );
}
