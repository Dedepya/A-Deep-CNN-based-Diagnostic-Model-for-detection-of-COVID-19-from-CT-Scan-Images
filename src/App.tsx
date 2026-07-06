import { useState } from "react";
import ModelSandbox from "./components/ModelSandbox";
import CnnArchitecture from "./components/CnnArchitecture";
import TrainingStats from "./components/TrainingStats";
import ModelOverview from "./components/ModelOverview";
import {
  Activity,
  Network,
  TrendingUp,
  BookOpen,
  Github,
  BrainCircuit,
  Database
} from "lucide-react";

type TabId = "sandbox" | "architecture" | "metrics" | "overview";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("sandbox");

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 antialiased selection:bg-sky-500/30">
      
      {/* Top Professional Diagnostic Header */}
      <header className="bg-slate-900/60 border-b border-slate-800/80 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-sky-950/20">
              <BrainCircuit className="w-5.5 h-5.5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-slate-100 tracking-tight font-sans">
                  COVID-19 CT Scan Classifier
                </h1>
                <span className="text-4xs font-mono font-bold bg-sky-950 text-sky-400 border border-sky-800 px-1.5 py-0.5 rounded uppercase">
                  Keras Sequential v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Research Project Showcase & Medical Diagnostic Sandbox
              </p>
            </div>
          </div>

          {/* Core Highlights Row */}
          <div className="flex items-center gap-3 font-mono text-3xs">
            <div className="bg-slate-950 border border-slate-800 px-2.5 py-1.5 rounded flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-slate-500">DATASET:</span>
              <span className="text-slate-300 font-semibold">Code_Test (1,152 Scans)</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 px-2.5 py-1.5 rounded flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-slate-500">ACCURACY:</span>
              <span className="text-emerald-400 font-bold">98.10% Val</span>
            </div>
          </div>

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-800 overflow-x-auto pb-px custom-scrollbar">
          <button
            onClick={() => setActiveTab("sandbox")}
            className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-medium text-xs tracking-wide transition-all uppercase cursor-pointer ${
              activeTab === "sandbox"
                ? "border-sky-500 text-sky-400 bg-sky-950/5"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
            }`}
            id="nav-tab-sandbox"
          >
            <Activity className="w-4.5 h-4.5" />
            Interactive Sandbox
          </button>
          
          <button
            onClick={() => setActiveTab("architecture")}
            className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-medium text-xs tracking-wide transition-all uppercase cursor-pointer ${
              activeTab === "architecture"
                ? "border-sky-500 text-sky-400 bg-sky-950/5"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
            }`}
            id="nav-tab-architecture"
          >
            <Network className="w-4.5 h-4.5" />
            CNN Layer Inspector
          </button>
          
          <button
            onClick={() => setActiveTab("metrics")}
            className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-medium text-xs tracking-wide transition-all uppercase cursor-pointer ${
              activeTab === "metrics"
                ? "border-sky-500 text-sky-400 bg-sky-950/5"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
            }`}
            id="nav-tab-metrics"
          >
            <TrendingUp className="w-4.5 h-4.5" />
            Training Performance
          </button>
          
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 px-5 py-3.5 border-b-2 font-medium text-xs tracking-wide transition-all uppercase cursor-pointer ${
              activeTab === "overview"
                ? "border-sky-500 text-sky-400 bg-sky-950/5"
                : "border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-800"
            }`}
            id="nav-tab-overview"
          >
            <BookOpen className="w-4.5 h-4.5" />
            Clinical Context
          </button>
        </div>

        {/* Tab Viewport Contents */}
        <div className="min-h-[480px]">
          {activeTab === "sandbox" && <ModelSandbox />}
          {activeTab === "architecture" && <CnnArchitecture />}
          {activeTab === "metrics" && <TrainingStats />}
          {activeTab === "overview" && <ModelOverview />}
        </div>

        {/* Informative Footer */}
        <footer className="border-t border-slate-900 pt-6 pb-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            <p>Designed as a high-fidelity diagnostic showcase for deep learning in pulmonary healthcare.</p>
            <p className="mt-1">
              Class Indice Reference: Covid Class 0, Normal Class 1. Sequential CNN compiled via Adam optimizer.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400 font-mono">
              <Github className="w-4 h-4 text-slate-500" />
              Source: .ipynb Jupyter Notebook
            </span>
            <span>v1.0.0</span>
          </div>
        </footer>

      </main>
    </div>
  );
}
