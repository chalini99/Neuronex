"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx/xlsx.mjs";

const tabs = ["Summary", "Charts", "Clinical Trials", "Patents"] as const;
type Tab = (typeof tabs)[number];

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Summary");
  const router = useRouter();

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("PharmaGen AI - Insight Report", 14, 20);

    autoTable(doc, {
      head: [["Metric", "Value"]],
      body: [
        ["Top Opportunity", "Indication B"],
        ["Score", "90/100"],
        ["Time to Proof of Concept", "9–12 months"],
        ["Peak Revenue", "₹120–150 Cr"],
        ["Competition Intensity", "Low–Moderate"],
      ],
      startY: 30,
    });

    doc.save("PharmaGenAI_Report.pdf");
  };

  const exportExcel = () => {
    const sheetData = [
      { Metric: "Top Opportunity", Value: "Indication B" },
      { Metric: "Score", Value: "90/100" },
      { Metric: "Time to POC", Value: "9–12 months" },
      { Metric: "Peak Revenue", Value: "₹120–150 Cr" },
      { Metric: "Competition", Value: "Low–Moderate" },
    ];

    const worksheet = XLSX.utils.json_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Insights");
    XLSX.writeFile(workbook, "PharmaGenAI_Insights.xlsx");
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 p-8 flex flex-col items-center">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl w-full mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Insights for Your Query</h1>
        <p className="text-slate-300 italic">
          “Which respiratory diseases show low competition but high unmet patient need in India?”
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl w-full rounded-3xl bg-slate-900/70 border border-slate-700 p-6 shadow-xl backdrop-blur">
        <div className="flex gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full ${
                activeTab === tab
                  ? "bg-cyan-500 text-slate-900 font-bold"
                  : "bg-slate-800 hover:bg-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {activeTab === "Summary" && <SummarySection />}
          {activeTab === "Charts" && <ChartsSection />}
          {activeTab === "Clinical Trials" && <TrialsSection />}
          {activeTab === "Patents" && <PatentsSection />}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <p className="text-xs text-slate-400">
            Auto-generated draft. Please validate with medical & regulatory experts.
          </p>

          <div className="flex gap-3">
            <button onClick={() => router.push("/dashboard")} className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm">
              Back to Dashboard
            </button>

            <button onClick={() => router.push("/dashboard")} className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-sm">
              Run New Query
            </button>

            <button onClick={generatePDF} className="px-4 py-2 rounded-full bg-emerald-500 text-slate-900 font-bold hover:bg-emerald-400">
              Download PDF
            </button>

            <button onClick={exportExcel} className="px-4 py-2 rounded-full bg-cyan-500 text-slate-900 font-bold hover:bg-cyan-400">
              Export Excel
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

/* ------------------- TAB CONTENT SECTIONS ------------------ */

function SummarySection() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold mb-2">Key Opportunity Summary</h2>
        <ul className="list-disc list-inside space-y-2 text-slate-200 text-sm md:text-base">
          <li>Identified <b>3 high-burden respiratory indications</b> with limited competition.</li>
          <li>Strong <b>mechanistic rationale</b> from pathway and literature overlap.</li>
          <li>Early IIT trials show <b>favorable safety and efficacy signals</b>.</li>
          <li>Potential market opportunity of <b>₹120–150 Cr peak revenue</b> in India.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold mb-2">Strategic Recommendation</h2>
        <p className="text-sm md:text-base">Based on safety, competition & patient access:</p>
        <ul className="list-disc list-inside space-y-2 text-slate-200">
          <li><b>Indication B</b> emerges as best priority candidate.</li>
          <li>Plan Phase II trial start in <b>9-12 months</b>.</li>
          <li>Maintain A & C as <b>follow-on indications</b> post POC.</li>
        </ul>
      </div>
    </div>
  );
}


function ChartsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Opportunity vs Competition</h2>

      <div className="bg-slate-900 rounded-2xl p-4">
        {[
          { label: "Indication A", value: 60 },
          { label: "Indication B", value: 90 },
          { label: "Indication C", value: 75 },
        ].map((row) => (
          <div key={row.label} className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>{row.label}</span>
              <span>{row.value}/100</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-800">
              <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500" style={{ width: `${row.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard title="Time to Proof of Concept" value="9–12 mo" color="text-cyan-400" />
        <StatCard title="Peak Revenue" value="₹120–150 Cr" color="text-emerald-400" />
        <StatCard title="Competition Intensity" value="Low–Moderate" color="text-amber-300" />
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: any) {
  return (
    <div className="rounded-2xl bg-slate-900 p-4">
      <p className="text-slate-400 text-xs mb-1">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function TrialsSection() {
  return (
    <div className="space-y-4 text-sm md:text-base">
      <h2 className="text-xl font-semibold mb-2">Key Clinical Trial Signals</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200">
        <li>4 active/complete studies supporting mechanistic rationale.</li>
        <li>No major red-flag safety signals.</li>
        <li>Opportunity for first well-designed multi-center study.</li>
      </ul>
    </div>
  );
}

function PatentsSection() {
  return (
    <div className="space-y-4 text-sm md:text-base">
      <h2 className="text-xl font-semibold mb-2">IP & Patent Landscape</h2>
      <ul className="list-disc list-inside space-y-2 text-slate-200">
        <li><b>6–7 years</b> remaining life in key markets.</li>
        <li>Limited indication-specific method-of-use patents.</li>
        <li>Favorable freedom-to-operate based on high-level scan.</li>
      </ul>
    </div>
  );
}
