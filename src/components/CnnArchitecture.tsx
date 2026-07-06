import { useState } from "react";
import { cnnLayers } from "../data";
import { Layers, Info, Network, Hash } from "lucide-react";

export default function CnnArchitecture() {
  const [selectedLayerId, setSelectedLayerId] = useState<string>("conv2d");

  const selectedLayer =
    cnnLayers.find((l) => l.id === selectedLayerId) || cnnLayers[0];

  const getLayerColor = (type: string) => {
    switch (type) {
      case "Conv2D":
        return "border-sky-500/40 hover:border-sky-400 bg-sky-950/20 text-sky-400";
      case "MaxPooling2D":
        return "border-emerald-500/40 hover:border-emerald-400 bg-emerald-950/20 text-emerald-400";
      case "Dropout":
        return "border-amber-500/40 hover:border-amber-400 bg-amber-950/20 text-amber-400";
      case "Flatten":
        return "border-indigo-500/40 hover:border-indigo-400 bg-indigo-950/20 text-indigo-400";
      case "Dense":
        return "border-violet-500/40 hover:border-violet-400 bg-violet-950/20 text-violet-400";
      default:
        return "border-slate-800 bg-slate-950 text-slate-400";
    }
  };

  const getLayerBadgeColor = (type: string) => {
    switch (type) {
      case "Conv2D":
        return "bg-sky-900/40 text-sky-300 border-sky-800/60";
      case "MaxPooling2D":
        return "bg-emerald-900/40 text-emerald-300 border-emerald-800/60";
      case "Dropout":
        return "bg-amber-900/40 text-amber-300 border-amber-800/60";
      case "Flatten":
        return "bg-indigo-900/40 text-indigo-300 border-indigo-800/60";
      case "Dense":
        return "bg-violet-900/40 text-violet-300 border-violet-800/60";
      default:
        return "bg-slate-900 text-slate-300 border-slate-800";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl" id="cnn-architecture-container">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Network className="w-5 h-5 text-sky-500" />
          Keras Model Architecture
        </h2>
        <p className="text-sm text-slate-400 mt-1 font-sans">
          Click any layer in the sequential stack to inspect tensor shapes, weights, and mathematical functions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Layer Stack (Left side) */}
        <div className="lg:col-span-7 h-[480px] overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2">
          <div className="text-2xs font-semibold text-slate-500 uppercase tracking-wider mb-1 sticky top-0 bg-slate-900 py-1 flex justify-between items-center z-10">
            <span>Layer Pipeline (Input ➡️ Output)</span>
            <span>Total Params: 630,273</span>
          </div>

          {cnnLayers.map((layer, index) => {
            const isSelected = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                onClick={() => setSelectedLayerId(layer.id)}
                className={`w-full flex items-center justify-between text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? "bg-slate-800 border-slate-700 shadow-lg translate-x-1 ring-1 ring-sky-500/30"
                    : "bg-slate-950 border-slate-900"
                }`}
                id={`layer-btn-${layer.id}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-500 w-5 text-right">
                    #{index + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold block text-slate-200">
                      {layer.name}
                    </span>
                    <span className="text-2xs font-mono text-slate-400 block mt-0.5">
                      Output Shape: {layer.outputShape}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-3xs font-semibold px-2 py-0.5 rounded-full border ${getLayerBadgeColor(
                      layer.type
                    )}`}
                  >
                    {layer.type}
                  </span>
                  {layer.params > 0 && (
                    <span className="text-3xs font-mono text-slate-500 bg-slate-900 border border-slate-800/80 px-1.5 py-0.5 rounded">
                      {layer.params.toLocaleString()} params
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Inspector Pane (Right side) */}
        <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between h-[480px]">
          <div>
            <div className="flex justify-between items-start gap-2 border-b border-slate-800 pb-3 mb-4">
              <div>
                <span
                  className={`text-3xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getLayerBadgeColor(
                    selectedLayer.type
                  )}`}
                >
                  {selectedLayer.type} Layer
                </span>
                <h3 className="text-base font-semibold text-slate-100 mt-1.5 font-mono">
                  {selectedLayer.name}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-2xs text-slate-500 block uppercase tracking-wider">Params</span>
                <span className="text-sm font-mono font-bold text-slate-300">
                  {selectedLayer.params.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Dimensions */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/50 border border-slate-900 rounded p-2.5">
                  <span className="text-3xs text-slate-500 block font-sans">Input Matrix Shape</span>
                  <span className="text-xs font-mono font-medium text-slate-300 block mt-0.5">
                    {selectedLayer.inputShape}
                  </span>
                </div>
                <div className="bg-slate-900/50 border border-slate-900 rounded p-2.5">
                  <span className="text-3xs text-slate-500 block font-sans">Output Tensor Shape</span>
                  <span className="text-xs font-mono font-medium text-sky-400 block mt-0.5">
                    {selectedLayer.outputShape}
                  </span>
                </div>
              </div>

              {/* Functional Explanation */}
              <div className="space-y-1.5">
                <h4 className="text-3xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-sky-500" />
                  Neural Function & Mathematical Role
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedLayer.description}
                </p>
              </div>

              {/* Extracted Feature Representation */}
              <div className="space-y-1.5 bg-sky-950/10 border border-sky-900/20 rounded-lg p-3">
                <h4 className="text-3xs text-sky-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-sky-400" />
                  Visual Representation Extracted
                </h4>
                <p className="text-xs text-slate-200 font-medium">
                  {selectedLayer.extractedFeature}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-900 pt-4 mt-4">
            <div className="flex items-center gap-1.5 text-2xs text-slate-500 bg-slate-900/40 p-2 rounded border border-slate-900">
              <Hash className="w-4.5 h-4.5 text-slate-400 flex-shrink-0" />
              <span>
                <strong>Total Trainable weights:</strong> 630,273 parameters. Constructed entirely in Keras Sequential API.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
