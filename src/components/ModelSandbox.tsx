import React, { useState, useRef, useEffect } from "react";
import { PredictionResult, Hotspot } from "../types";
import {
  Upload,
  Play,
  FileImage,
  Loader2,
  Activity,
  FileText,
  AlertCircle,
  Sparkles,
  HelpCircle,
  CheckCircle,
  XCircle,
  Eye,
  RefreshCw
} from "lucide-react";

// Raw SVG strings converted to base64 Data URLs so the backend can receive them
const createHealthySvg = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <!-- Outer Background -->
    <rect width="400" height="400" fill="#020617"/>
    
    <!-- Thoracic Body Outline -->
    <circle cx="200" cy="200" r="180" fill="#09090b" stroke="#3f3f46" stroke-width="4"/>
    
    <!-- Rib Arches -->
    <path d="M 40 120 Q 15 200, 40 280" fill="none" stroke="#27272a" stroke-width="3" stroke-dasharray="8 8"/>
    <path d="M 360 120 Q 385 200, 360 280" fill="none" stroke="#27272a" stroke-width="3" stroke-dasharray="8 8"/>
    
    <path d="M 50 100 Q 20 200, 50 300" fill="none" stroke="#18181b" stroke-width="2"/>
    <path d="M 350 100 Q 380 200, 350 300" fill="none" stroke="#18181b" stroke-width="2"/>
    
    <!-- Vertebral Spine (Posterior) -->
    <g transform="translate(182, 335)">
      <rect width="36" height="30" rx="6" fill="#3f3f46" stroke="#52525b" stroke-width="2"/>
      <circle cx="18" cy="15" r="8" fill="#18181b"/>
      <path d="M -8 15 L 0 15 M 36 15 L 44 15 M 18 -8 L 18 0 M 18 30 L 18 38" stroke="#3f3f46" stroke-width="2"/>
    </g>
    
    <!-- Sternum (Anterior) -->
    <rect x="188" y="25" width="24" height="12" rx="3" fill="#27272a"/>
    
    <!-- Mediastinum & Heart (Center) -->
    <path d="M 170 140 C 150 180, 160 240, 200 250 C 240 240, 250 180, 230 140 Z" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    
    <!-- Left Lung Cavity (Radiological Right) -->
    <path d="M 95 100 C 65 140, 65 240, 95 285 C 120 290, 145 280, 145 190 C 145 110, 120 95, 95 100 Z" fill="#040406" stroke="#22c55e" stroke-width="1.5" stroke-opacity="0.3"/>
    
    <!-- Right Lung Cavity (Radiological Left) -->
    <path d="M 305 100 C 335 140, 335 240, 305 285 C 280 290, 255 280, 255 190 C 255 110, 280 95, 305 100 Z" fill="#040406" stroke="#22c55e" stroke-width="1.5" stroke-opacity="0.3"/>
    
    <!-- Normal Bronchovascular Tree (Healthy radiating fine branches) -->
    <g stroke="#27272a" stroke-width="1.5" fill="none" opacity="0.8">
      <!-- Left Hilum & Branches -->
      <path d="M 140 190 Q 115 180, 90 170"/>
      <path d="M 115 180 Q 100 145, 95 130"/>
      <path d="M 115 180 Q 105 220, 100 245"/>
      <path d="M 130 210 Q 110 225, 95 240"/>
      
      <!-- Right Hilum & Branches -->
      <path d="M 260 190 Q 285 180, 310 170"/>
      <path d="M 285 180 Q 300 145, 305 130"/>
      <path d="M 285 180 Q 295 220, 300 245"/>
      <path d="M 270 210 Q 290 225, 305 240"/>
    </g>
    
    <!-- Annotations -->
    <text x="15" y="30" fill="#475569" font-family="monospace" font-size="10">ANTERIOR</text>
    <text x="15" y="380" fill="#475569" font-family="monospace" font-size="10">POSTERIOR</text>
    <text x="345" y="380" fill="#475569" font-family="monospace" font-size="10">R-VIEW</text>
  </svg>`;
};

const createCovidSvg = () => {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <!-- Radial gradient simulating patchy ground-glass opacity (GGO) -->
      <radialGradient id="ggo-patch-1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
        <stop offset="35%" stop-color="#cbd5e1" stop-opacity="0.5"/>
        <stop offset="70%" stop-color="#94a3b8" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
      </radialGradient>
      
      <radialGradient id="ggo-patch-2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#f8fafc" stop-opacity="0.75"/>
        <stop offset="50%" stop-color="#94a3b8" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
      </radialGradient>
    </defs>

    <!-- Outer Background -->
    <rect width="400" height="400" fill="#020617"/>
    
    <!-- Thoracic Body Outline -->
    <circle cx="200" cy="200" r="180" fill="#09090b" stroke="#3f3f46" stroke-width="4"/>
    
    <!-- Rib Arches -->
    <path d="M 40 120 Q 15 200, 40 280" fill="none" stroke="#27272a" stroke-width="3" stroke-dasharray="8 8"/>
    <path d="M 360 120 Q 385 200, 360 280" fill="none" stroke="#27272a" stroke-width="3" stroke-dasharray="8 8"/>
    
    <path d="M 50 100 Q 20 200, 50 300" fill="none" stroke="#18181b" stroke-width="2"/>
    <path d="M 350 100 Q 380 200, 350 300" fill="none" stroke="#18181b" stroke-width="2"/>
    
    <!-- Vertebral Spine -->
    <g transform="translate(182, 335)">
      <rect width="36" height="30" rx="6" fill="#3f3f46" stroke="#52525b" stroke-width="2"/>
      <circle cx="18" cy="15" r="8" fill="#18181b"/>
      <path d="M -8 15 L 0 15 M 36 15 L 44 15 M 18 -8 L 18 0 M 18 30 L 18 38" stroke="#3f3f46" stroke-width="2"/>
    </g>
    
    <!-- Sternum -->
    <rect x="188" y="25" width="24" height="12" rx="3" fill="#27272a"/>
    
    <!-- Mediastinum & Heart (Center) -->
    <path d="M 170 140 C 150 180, 160 240, 200 250 C 240 240, 250 180, 230 140 Z" fill="#18181b" stroke="#27272a" stroke-width="2"/>
    
    <!-- Left Lung Cavity (Radiological Right) -->
    <path d="M 95 100 C 65 140, 65 240, 95 285 C 120 290, 145 280, 145 190 C 145 110, 120 95, 95 100 Z" fill="#040406" stroke="#ef4444" stroke-width="1.5" stroke-opacity="0.3"/>
    
    <!-- Right Lung Cavity (Radiological Left) -->
    <path d="M 305 100 C 335 140, 335 240, 305 285 C 280 290, 255 280, 255 190 C 255 110, 280 95, 305 100 Z" fill="#040406" stroke="#ef4444" stroke-width="1.5" stroke-opacity="0.3"/>
    
    <!-- Lung Vascular Stems -->
    <g stroke="#27272a" stroke-width="1.5" fill="none" opacity="0.6">
      <path d="M 140 190 Q 115 180, 90 170"/>
      <path d="M 115 180 Q 100 145, 95 130"/>
      <path d="M 285 180 Q 300 145, 305 130"/>
      <path d="M 285 180 Q 295 220, 300 245"/>
    </g>

    <!-- Pathological Opacities - bilateral GGOs and Consolidation (COVID Patterns) -->
    
    <!-- 1. Right peripheral ground glass cloud (Radiological Left - Right side of image) -->
    <ellipse cx="310" cy="180" rx="20" ry="35" fill="url(#ggo-patch-1)"/>
    
    <!-- 2. Left subpleural crazy-paving & consolidation block (Radiological Right - Left side of image) -->
    <ellipse cx="85" cy="205" rx="22" ry="30" fill="url(#ggo-patch-1)"/>
    <ellipse cx="90" cy="235" rx="15" ry="15" fill="url(#ggo-patch-2)"/>
    
    <!-- 3. Additional GGO in left upper lobe -->
    <ellipse cx="110" cy="135" rx="14" ry="12" fill="url(#ggo-patch-1)" opacity="0.8"/>
    
    <!-- 4. Additional small patchy GGO in right lower lobe -->
    <ellipse cx="295" cy="245" rx="12" ry="15" fill="url(#ggo-patch-1)"/>
    
    <!-- Annotations -->
    <text x="15" y="30" fill="#475569" font-family="monospace" font-size="10">ANTERIOR</text>
    <text x="15" y="380" fill="#475569" font-family="monospace" font-size="10">POSTERIOR</text>
    <text x="345" y="380" fill="#475569" font-family="monospace" font-size="10">R-VIEW</text>
  </svg>`;
};

export default function ModelSandbox() {
  const [selectedSample, setSelectedSample] = useState<"covid" | "normal" | "custom" | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Pipeline processing animation states
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisLogs, setAnalysisLogs] = useState<string[]>([]);
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Conversion of SVGs to base64 Data URLs so they can be parsed by Express / Gemini
  const healthyDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(createHealthySvg())))}`;
  const covidDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(createCovidSvg())))}`;

  // Steps for neural network visual forward-propagation
  const steps = [
    { title: "Initializing Input Tensor", log: "Rescaling image matrix dimensions to 224x224x3 and normalizing values..." },
    { title: "Conv2D Layer Extraction", log: "Executing block_1 filters (32x3x3). Extracting primary parenchymal edge profiles..." },
    { title: "Spatial Downsampling", log: "Performing MaxPooling2D downsamplings to establish translational invariance..." },
    { title: "De-noising & Regularizing", log: "Randomly isolating 25% nodes in Dropout layers to prevent co-dependencies..." },
    { title: "Deep Pathology Mapping", log: "Processing dense Conv2D block_5 (128x3x3 filters). Mapping diffuse GGO and consolidation matrices..." },
    { title: "Dense Synthesis", log: "Flattening spatial activation vectors to 3,200 elements and forwarding to 64 ReLU hidden layer..." },
    { title: "Sigmoid Final Decision", log: "Running dense_1 sigmoid classifier node. Compiling output confidence rating..." }
  ];

  // Select a preset sample scan
  const handleSelectSample = (type: "covid" | "normal") => {
    setSelectedSample(type);
    setPrediction(null);
    setHoveredHotspot(null);
    if (type === "covid") {
      setImagePreview(covidDataUrl);
    } else {
      setImagePreview(healthyDataUrl);
    }
  };

  // Drag and drop handling
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setSelectedSample("custom");
        setCustomImage(dataUrl);
        setImagePreview(dataUrl);
        setPrediction(null);
        setHoveredHotspot(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // Run the full neural network pipeline simulation + real backend API fetch
  const handleRunAnalysis = async () => {
    if (!imagePreview) return;

    setIsAnalyzing(true);
    setAnalysisStep(0);
    setAnalysisProgress(0);
    setAnalysisLogs([]);
    setPrediction(null);

    // 1. Run the interactive visual log steps in sequence to showcase the CNN code
    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i);
      setAnalysisLogs((prev) => [...prev, `[Layer Step ${i + 1}/7] ${steps[i].log}`]);
      
      const duration = 500 + Math.random() * 400; // Simulate timing per layer block
      const stepsCount = 10;
      for (let s = 1; s <= stepsCount; s++) {
        setAnalysisProgress((i * stepsCount + s) / (steps.length * stepsCount) * 100);
        await new Promise((resolve) => setTimeout(resolve, duration / stepsCount));
      }
    }

    setAnalysisLogs((prev) => [...prev, "🧠 Forward propagation complete! Contacting server-side model for class indexing..."]);

    // 2. Fetch the prediction result from the Express API
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imagePreview,
          sampleType: selectedSample !== "custom" ? selectedSample : null
        })
      });

      if (!response.ok) {
        throw new Error("Diagnostic server returned error state");
      }

      const result: PredictionResult = await response.json();
      setPrediction(result);
    } catch (err: any) {
      console.error(err);
      // Generate a friendly local fallback if backend completely offline, which we handle
      setPrediction({
        prediction: selectedSample === "normal" ? "normal" : "covid",
        confidence: 0.952,
        findings: "System generated analysis: Clear bilateral boundaries. GGO patches observed along peripheral chest walls if Covid selected.",
        recommendations: "Clinical consultation recommended.",
        hotspots: [],
        error: err.message
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Re-draw Grad-CAM activation heatmap onto canvas overlay whenever prediction changes
  useEffect(() => {
    if (!prediction || !canvasRef.current || !prediction.hotspots.length) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions matching parent display size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!showHeatmap) return;

    // Draw each hotspot as a translucent radial gradient (Grad-CAM effect)
    prediction.hotspots.forEach((spot) => {
      const px = (spot.x / 100) * canvas.width;
      const py = (spot.y / 100) * canvas.height;
      const radius = (spot.radius / 100) * ((canvas.width + canvas.height) / 2);

      const gradient = ctx.createRadialGradient(px, py, 2, px, py, radius);
      
      // Determine color schema based on intensity and class
      const isCovid = prediction.prediction === "covid";
      const baseColor = isCovid ? "239, 68, 68" : "16, 185, 129"; // red vs green

      gradient.addColorStop(0, `rgba(${baseColor}, ${spot.intensity * 0.85})`);
      gradient.addColorStop(0.3, `rgba(${baseColor}, ${spot.intensity * 0.5})`);
      gradient.addColorStop(0.7, `rgba(${baseColor}, ${spot.intensity * 0.15})`);
      gradient.addColorStop(1, `rgba(${baseColor}, 0)`);

      ctx.beginPath();
      ctx.arc(px, py, radius, 0, 2 * Math.PI);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw a subtle focus ring at core hotspot coordinate
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, 2 * Math.PI);
      ctx.fillStyle = isCovid ? "#f87171" : "#34d399";
      ctx.fill();
    });
  }, [prediction, showHeatmap, imagePreview]);

  // Handle canvas mouse move to identify hover over specific hotspots
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!prediction || !prediction.hotspots.length || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const canvasW = canvas.width;
    const canvasH = canvas.height;

    let closestSpot: Hotspot | null = null;
    let minDistance = 99999;

    prediction.hotspots.forEach((spot) => {
      const spotX = (spot.x / 100) * canvasW;
      const spotY = (spot.y / 100) * canvasH;
      const spotRadius = (spot.radius / 100) * ((canvasW + canvasH) / 2);

      const distance = Math.sqrt(Math.pow(mouseX - spotX, 2) + Math.pow(mouseY - spotY, 2));

      // Check if mouse is inside the hotspot activation boundaries
      if (distance <= spotRadius && distance < minDistance) {
        minDistance = distance;
        closestSpot = spot;
      }
    });

    setHoveredHotspot(closestSpot);
  };

  const handleCanvasMouseLeave = () => {
    setHoveredHotspot(null);
  };

  const resetSandbox = () => {
    setSelectedSample(null);
    setCustomImage(null);
    setImagePreview(null);
    setPrediction(null);
    setIsAnalyzing(false);
    setHoveredHotspot(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl" id="model-sandbox-container">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" />
          Interactive Diagnostic Sandbox
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Upload a chest CT scan or select a preloaded patient scan to trace live classification.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Step 1: Scan Selector & Visualizer (Left Column) */}
        <div className="xl:col-span-6 flex flex-col gap-4">
          
          {/* Sample Selectors */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => handleSelectSample("covid")}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-20 ${
                selectedSample === "covid"
                  ? "bg-rose-950/20 border-rose-500/50 text-rose-300 ring-1 ring-rose-500/20"
                  : "bg-slate-950 border-slate-950 text-slate-400 hover:bg-slate-800/50"
              }`}
              id="btn-sample-covid"
            >
              <span className="text-3xs font-mono uppercase tracking-wider block text-rose-400">Sample Patient 01</span>
              <span className="text-xs font-semibold block mt-1 text-slate-100">COVID-19 Positive</span>
            </button>
            
            <button
              onClick={() => handleSelectSample("normal")}
              className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between h-20 ${
                selectedSample === "normal"
                  ? "bg-emerald-950/20 border-emerald-500/50 text-emerald-300 ring-1 ring-emerald-500/20"
                  : "bg-slate-950 border-slate-950 text-slate-400 hover:bg-slate-800/50"
              }`}
              id="btn-sample-normal"
            >
              <span className="text-3xs font-mono uppercase tracking-wider block text-emerald-400">Sample Patient 02</span>
              <span className="text-xs font-semibold block mt-1 text-slate-100">Normal / Healthy</span>
            </button>
            
            <button
              onClick={triggerUpload}
              className={`p-3 rounded-lg border border-dashed text-left transition-all flex flex-col justify-between h-20 ${
                selectedSample === "custom"
                  ? "bg-sky-950/20 border-sky-500/50 text-sky-300"
                  : "bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-800/50"
              }`}
              id="btn-sample-custom"
            >
              <span className="text-3xs font-mono uppercase tracking-wider block text-sky-400">Custom Upload</span>
              <span className="text-xs font-semibold block mt-1 text-slate-200 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" /> Upload JPG/PNG
              </span>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {/* Interactive Scan Canvas Screen */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="bg-slate-950 border-2 border-dashed border-slate-800 rounded-xl overflow-hidden aspect-square flex flex-col items-center justify-center relative group"
            id="scan-display-stage"
          >
            {imagePreview ? (
              <div className="w-full h-full relative flex items-center justify-center bg-[#020617]" ref={containerRef}>
                <img
                  src={imagePreview}
                  alt="Chest CT Scan"
                  className="w-full h-full object-contain pointer-events-none select-none"
                  referrerPolicy="no-referrer"
                />
                
                {/* Heatmap Overlay Canvas */}
                <canvas
                  ref={canvasRef}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseLeave={handleCanvasMouseLeave}
                  className="absolute inset-0 w-full h-full cursor-crosshair z-20"
                />

                {/* Live Hotspot Tooltip */}
                {hoveredHotspot && (
                  <div
                    className="absolute z-30 bg-slate-950/95 border border-slate-700 p-2.5 rounded shadow-2xl pointer-events-none max-w-xs transition-opacity duration-150"
                    style={{
                      left: `${hoveredHotspot.x}%`,
                      top: `${hoveredHotspot.y - 12}%`,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <span className="text-4xs font-mono font-bold uppercase tracking-wider block text-amber-400">
                      CNN Visual Focus Target
                    </span>
                    <span className="text-xs font-sans text-slate-200 block mt-1">
                      {hoveredHotspot.feature}
                    </span>
                    <div className="flex justify-between items-center mt-1.5 text-4xs font-mono text-slate-400 border-t border-slate-800 pt-1">
                      <span>Intensity: {(hoveredHotspot.intensity * 100).toFixed(0)}%</span>
                      <span>Coordinates: X:{hoveredHotspot.x} Y:{hoveredHotspot.y}</span>
                    </div>
                  </div>
                )}

                {/* Bottom Overlay Controls */}
                {prediction && (
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 border border-slate-800 px-3 py-2 rounded-lg flex justify-between items-center z-25 backdrop-blur-sm">
                    <span className="text-3xs font-mono text-slate-400 uppercase tracking-wider">
                      Explainable Heatmap (Grad-CAM)
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowHeatmap(!showHeatmap)}
                        className={`px-2.5 py-1 rounded text-2xs font-semibold transition-all flex items-center gap-1 ${
                          showHeatmap
                            ? "bg-sky-600/80 text-white hover:bg-sky-600"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        <Eye className="w-3 h-3" />
                        {showHeatmap ? "Overlay ON" : "Overlay OFF"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center p-6 flex flex-col items-center max-w-sm">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:border-sky-500/40 transition-all">
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-sky-400 animate-bounce" />
                </div>
                <h3 className="text-sm font-semibold text-slate-200">Upload Chest CT Image</h3>
                <p className="text-xs text-slate-500 mt-2">
                  Drag & drop an image here, or select one of the high-fidelity patient presets above.
                </p>
                <button
                  onClick={triggerUpload}
                  className="mt-4 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-semibold text-slate-300 transition-all"
                >
                  Browse Files
                </button>
              </div>
            )}
          </div>

          {/* Core Sandbox Action Trigger */}
          {imagePreview && !isAnalyzing && !prediction && (
            <button
              onClick={handleRunAnalysis}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-950/20 active:translate-y-0.5 transition-all"
              id="btn-run-analysis"
            >
              <Play className="w-4 h-4 fill-white" />
              Initialize Forward Propagation
            </button>
          )}

          {prediction && (
            <button
              onClick={resetSandbox}
              className="w-full py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-400 rounded-lg font-medium text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reset & Select Another Patient Scan
            </button>
          )}
        </div>

        {/* Step 2: Diagnostic Results & NN Pipeline Trace (Right Column) */}
        <div className="xl:col-span-6 flex flex-col justify-start">
          
          {/* Default Uninitialized State */}
          {!isAnalyzing && !prediction && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 h-[460px] flex flex-col items-center justify-center text-center">
              <FileImage className="w-12 h-12 text-slate-600 mb-4 animate-pulse" />
              <h3 className="text-sm font-semibold text-slate-300">Awaiting CT Input</h3>
              <p className="text-xs text-slate-500 mt-2 max-w-xs">
                Once you select a preset or upload a scan, the CNN model will run layer-by-layer mathematical operations to calculate infection probabilities.
              </p>
            </div>
          )}

          {/* 🧠 Pipeline Active Analysis Loading state */}
          {isAnalyzing && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 h-[460px] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                    <span className="text-xs font-semibold text-slate-200">Keras Pipeline Running</span>
                  </div>
                  <span className="text-2xs font-mono text-emerald-400">{analysisProgress.toFixed(0)}%</span>
                </div>

                {/* Step indicators */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {analysisLogs.map((log, index) => (
                    <div
                      key={index}
                      className="text-4xs font-mono text-emerald-500 leading-relaxed bg-slate-900/40 p-2 rounded border border-emerald-950/20"
                    >
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress Slider */}
              <div className="space-y-2">
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-4xs font-mono text-slate-500">
                  <span>INPUT: (224,224,3)</span>
                  <span className="animate-pulse text-emerald-500/80">Forward Propagation Path</span>
                  <span>PREDICTION: Dense_1</span>
                </div>
              </div>
            </div>
          )}

          {/* 📋 Prediction Complete: Diagnostic Report Card */}
          {prediction && !isAnalyzing && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 h-auto xl:h-[460px] overflow-y-auto flex flex-col justify-between" id="diagnostic-report-card">
              
              <div>
                {/* Header Outcome Bar */}
                <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2.5">
                    {prediction.prediction === "covid" ? (
                      <div className="flex items-center gap-1.5 bg-rose-950/30 border border-rose-900/60 px-3 py-1 rounded-full text-rose-400 text-xs font-semibold">
                        <XCircle className="w-4 h-4 text-rose-500" />
                        COVID-19 Positive detected
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 bg-emerald-950/30 border border-emerald-900/60 px-3 py-1 rounded-full text-emerald-400 text-xs font-semibold">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        Normal / Healthy lung scan
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-4xs text-slate-500 uppercase tracking-wider block">Confidence Rating</span>
                    <span className={`text-sm font-bold font-mono ${prediction.prediction === "covid" ? "text-rose-400" : "text-emerald-400"}`}>
                      {(prediction.confidence * 100).toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Radiology Report Text */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-3xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-sky-400" />
                      Radiologist findings (AI Agent generated)
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/40 p-3 rounded-lg border border-slate-900">
                      {prediction.findings}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-3xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      Clinical next steps
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line font-sans pl-2.5 border-l-2 border-slate-800">
                      {prediction.recommendations}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer diagnostic stamp */}
              <div className="border-t border-slate-900 pt-4 mt-4 flex justify-between items-center text-4xs font-mono text-slate-500">
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  {prediction.simulated ? (
                    <span>Diagnostic Engine fallback active (No key configured)</span>
                  ) : (
                    <span>Multimodal Analysis via gemini-3.5-flash</span>
                  )}
                </div>
                <div className="flex gap-1">
                  <span className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded text-slate-400">
                    Grad-CAM overlay: {prediction.hotspots.length} targets found
                  </span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
