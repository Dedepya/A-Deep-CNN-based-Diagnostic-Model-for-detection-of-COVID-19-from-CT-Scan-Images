export interface Hotspot {
  x: number;
  y: number;
  radius: number;
  intensity: number;
  feature: string;
}

export interface PredictionResult {
  prediction: "covid" | "normal";
  confidence: number;
  findings: string;
  recommendations: string;
  hotspots: Hotspot[];
  simulated?: boolean;
  error?: string;
}

export interface EpochMetric {
  epoch: number;
  loss: number;
  accuracy: number;
  val_loss: number;
  val_accuracy: number;
}

export interface CnnLayer {
  id: string;
  name: string;
  type: "Conv2D" | "MaxPooling2D" | "Dropout" | "Flatten" | "Dense";
  inputShape: string;
  outputShape: string;
  params: number;
  description: string;
  extractedFeature: string;
}
