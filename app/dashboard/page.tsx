"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter(); // <--- Must be here

  return (
    <main className="min-h-screen bg-gray-100 text-gray-800 p-10">
      <h1 className="text-4xl font-bold mb-10">Research Dashboard</h1>

      {/* Search section */}
      <div className="max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Enter research query..."
          className="w-full p-4 rounded-xl border border-gray-300 shadow-sm text-lg"
        />

        <button
          onClick={() => router.push("/workflow")}
          className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          Run Analysis
        </button>
      </div>

      {/* Suggested Queries */}
      <div className="max-w-3xl mx-auto mt-10 grid gap-4">
        <h2 className="text-xl font-semibold">Example Queries</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Which diseases show high patient demand but low market competition?",
            "Repurposing potential of immunotherapy molecules in rare diseases",
            "Emerging trends in respiratory drug repositioning",
          ].map((quote, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg cursor-pointer"
            >
              {quote}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
