"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const agents = [
  { name: "Market Trends", color: "bg-blue-500" },
  { name: "Patent Landscape", color: "bg-purple-500" },
  { name: "Clinical Trials", color: "bg-green-500" },
  { name: "Web Research", color: "bg-cyan-500" },
  { name: "Internal Documents", color: "bg-pink-500" },
];

export default function Workflow() {
  const router = useRouter();
  const [progress, setProgress] = useState(Array(agents.length).fill(0));

  useEffect(() => {
    const intervals = agents.map((_, index) =>
      setInterval(() => {
        setProgress((prev) => {
          const newVals = [...prev];
          newVals[index] = Math.min(newVals[index] + Math.random() * 10, 100);
          return newVals;
        });
      }, 600)
    );

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 text-gray-900 p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Running Analysis...</h1>

      <div className="max-w-3xl mx-auto space-y-6">
        {agents.map((agent, i) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-5 rounded-xl shadow-md bg-white"
          >
            <div className="max-w-3xl mx-auto mt-10 flex justify-end">
               <button
                  onClick={() => router.push("/results")}
                  className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
               >
                  View Consolidated Insights →
               </button>
            </div>

            <div className="flex justify-between mb-2">
              <h3 className="font-semibold">{agent.name}</h3>
              <p className="text-sm">{progress[i].toFixed(0)}%</p>
            </div>

            <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${agent.color}`}
                animate={{ width: `${progress[i]}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>

            <p className="text-sm mt-2 text-gray-500">
              {progress[i] < 100 ? "Processing..." : "Completed ✔"}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
