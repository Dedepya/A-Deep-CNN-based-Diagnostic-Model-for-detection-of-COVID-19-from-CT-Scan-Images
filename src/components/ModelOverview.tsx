import { Microscope, Award, FileSpreadsheet, ShieldCheck } from "lucide-react";

export default function ModelOverview() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl" id="model-overview-container">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-100 flex items-center gap-2">
          <Microscope className="w-5 h-5 text-sky-500" />
          Clinical Context & Model Methodology
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Reviewing the scientific foundations of the Keras-trained CNN model
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core Case Study */}
        <div className="md:col-span-2 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-sky-400" />
              Project Objective
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Early diagnosis of COVID-19 pneumonia is critical for both patient management and public health isolation protocols. While RT-PCR is the gold standard, chest Computed Tomography (CT) scans offer rapid, highly detailed cross-sectional visualization of the lung parenchyma, allowing immediate clinical triage before molecular results return.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              This project showcases a deep Convolutional Neural Network (CNN) engineered to detect the visual indicators of COVID-19 from axial chest CT scan slices. By analyzing spatial density distributions, the network learns to isolate abnormal lung patches from normal healthy lungs.
            </p>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Diagnostic Visual Indicators
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              The model identifies key radiological features of viral pneumonitis:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-3">
                <span className="text-xs font-semibold text-slate-300 block">Ground-Glass Opacities (GGO)</span>
                <span className="text-4xs text-slate-500 block mt-1">
                  Bilateral, peripheral, or subpleural hazy grey patches in the lower lobes indicating alveolar airspace partially filled with fluid.
                </span>
              </div>
              <div className="bg-slate-950 border border-slate-900 rounded-lg p-3">
                <span className="text-xs font-semibold text-slate-300 block">Subpleural Consolidation</span>
                <span className="text-4xs text-slate-500 block mt-1">
                  Dense white solid patches where airspaces are fully replaced by inflammatory fluid or cellular debris.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Dataset Breakdown Info */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 border-b border-slate-900 pb-2.5">
              <FileSpreadsheet className="w-4 h-4 text-amber-500" />
              Dataset Specifications
            </h3>

            <div className="space-y-3">
              <div>
                <span className="text-3xs text-slate-500 block uppercase tracking-wider">Source folder</span>
                <span className="text-xs font-mono font-medium text-slate-300 block">
                  drive/MyDrive/Code_Test
                </span>
              </div>
              
              <div>
                <span className="text-3xs text-slate-500 block uppercase tracking-wider">Training subset</span>
                <span className="text-xs font-mono font-semibold text-slate-300 block">
                  920 images (Class-balanced)
                </span>
              </div>

              <div>
                <span className="text-3xs text-slate-500 block uppercase tracking-wider">Validation subset</span>
                <span className="text-xs font-mono font-semibold text-slate-300 block">
                  232 images (Class-balanced)
                </span>
              </div>

              <div>
                <span className="text-3xs text-slate-500 block uppercase tracking-wider">Class Indice Map</span>
                <span className="text-xs font-mono font-bold text-sky-400 block mt-1">
                  {"{'Covid': 0, 'Normal': 1}"}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 text-3xs text-slate-500">
            <span>
              Images rescaled dynamically by 1./255 and target-sized to (224, 224, 3) prior to forward layer feed.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
