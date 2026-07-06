import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { trainingHistory } from "../data";
import { Flame, Brain, Award, ShieldAlert, Layers } from "lucide-react";

export default function TrainingStats() {
  const [activeTab, setActiveTab] = useState<"accuracy" | "loss">("accuracy");

  const finalEpoch = trainingHistory[trainingHistory.length - 1];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl" id="training-stats-container">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
            Model Training Metrics
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Performance of the Keras CNN over 50 training epochs on Google Colab
          </p>
        </div>

        <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("accuracy")}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "accuracy"
                ? "bg-sky-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
            id="tab-btn-accuracy"
          >
            Accuracy Curve
          </button>
          <button
            onClick={() => setActiveTab("loss")}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
              activeTab === "loss"
                ? "bg-rose-600 text-white shadow-md"
                : "text-slate-400 hover:text-slate-200"
            }`}
            id="tab-btn-loss"
          >
            Loss Convergence
          </button>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Total Dataset</span>
          <span className="text-xl font-bold text-slate-100 block">1,152 Scans</span>
          <span className="text-2xs text-slate-500 block mt-1">920 Train | 232 Val</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Final Train Acc</span>
          <span className="text-xl font-bold text-sky-400 block">
            {(finalEpoch.accuracy * 100).toFixed(2)}%
          </span>
          <span className="text-2xs text-slate-500 block mt-1">Epoch 50 convergence</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Final Val Acc</span>
          <span className="text-xl font-bold text-emerald-400 block">
            {(finalEpoch.val_accuracy * 100).toFixed(2)}%
          </span>
          <span className="text-2xs text-slate-500 block mt-1">Strong generalization</span>
        </div>
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 text-center">
          <span className="text-xs text-slate-400 uppercase tracking-wider block mb-1">Trainable Params</span>
          <span className="text-xl font-bold text-violet-400 block">630,273</span>
          <span className="text-2xs text-slate-500 block mt-1">100% Trainable</span>
        </div>
      </div>

      {/* Recharts Container */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 h-[350px]" id="chart-viewport">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === "accuracy" ? (
            <LineChart
              data={trainingHistory}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="epoch"
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                label={{ value: "Training Epoch", position: "insideBottom", offset: -5, fill: "#64748b", fontSize: 11 }}
              />
              <YAxis
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                domain={[0.4, 1.0]}
                tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#020617", border: "1px solid #334155" }}
                labelFormatter={(label) => `Epoch ${label}`}
                formatter={(value: any) => [`${(value * 100).toFixed(2)}%`]}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Line
                name="Train Accuracy"
                type="monotone"
                dataKey="accuracy"
                stroke="#38bdf8"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                name="Validation Accuracy"
                type="monotone"
                dataKey="val_accuracy"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          ) : (
            <LineChart
              data={trainingHistory}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis
                dataKey="epoch"
                stroke="#64748b"
                tick={{ fontSize: 11 }}
                label={{ value: "Training Epoch", position: "insideBottom", offset: -5, fill: "#64748b", fontSize: 11 }}
              />
              <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#020617", border: "1px solid #334155" }}
                labelFormatter={(label) => `Epoch ${label}`}
                formatter={(value: any) => [parseFloat(value).toFixed(4)]}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Line
                name="Train Loss"
                type="monotone"
                dataKey="loss"
                stroke="#f43f5e"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                name="Validation Loss"
                type="monotone"
                dataKey="val_loss"
                stroke="#fb7185"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Hyperparameters Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-sky-400" />
            CNN Hyperparameters
          </h3>
          <table className="w-full text-xs text-slate-400">
            <tbody>
              <tr className="border-b border-slate-900">
                <td className="py-2 font-medium">Optimizer</td>
                <td className="py-2 text-right text-slate-200">Adam (lr=0.001)</td>
              </tr>
              <tr className="border-b border-slate-900">
                <td className="py-2 font-medium">Loss Function</td>
                <td className="py-2 text-right text-slate-200">Binary Crossentropy</td>
              </tr>
              <tr className="border-b border-slate-900">
                <td className="py-2 font-medium">Batch Size</td>
                <td className="py-2 text-right text-slate-200">64</td>
              </tr>
              <tr>
                <td className="py-2 font-medium">Input Dimension</td>
                <td className="py-2 text-right text-slate-200">224 x 224 x 3 (RGB)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4">
          <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            Regularization & Overfitting Guards
          </h3>
          <ul className="text-xs text-slate-400 space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1 flex-shrink-0" />
              <span>
                <strong>Dropout:</strong> Incorporated at multiple layers (25% rate) and heavy 50% rate before final dense classification to enforce features distribution.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" />
              <span>
                <strong>Image Augmentation:</strong> rescale=1./255, shear_range=0.2, zoom_range=0.2, and horizontal_flip=True dynamically used to expand raw training variety.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
