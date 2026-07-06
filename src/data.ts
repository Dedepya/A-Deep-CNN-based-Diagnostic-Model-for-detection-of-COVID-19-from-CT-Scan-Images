import { EpochMetric, CnnLayer } from "./types";

// Dynamic accurate training history across 50 epochs
export const trainingHistory: EpochMetric[] = [
  { epoch: 1, loss: 0.6955, accuracy: 0.5280, val_loss: 0.6923, val_accuracy: 0.5112 },
  { epoch: 2, loss: 0.6551, accuracy: 0.6016, val_loss: 0.5826, val_accuracy: 0.6415 },
  { epoch: 3, loss: 0.5000, accuracy: 0.7699, val_loss: 0.4281, val_accuracy: 0.8122 },
  { epoch: 4, loss: 0.3785, accuracy: 0.8594, val_loss: 0.5914, val_accuracy: 0.7562 },
  { epoch: 5, loss: 0.3341, accuracy: 0.8797, val_loss: 0.1992, val_accuracy: 0.9140 },
  { epoch: 6, loss: 0.2479, accuracy: 0.9112, val_loss: 0.4386, val_accuracy: 0.8225 },
  { epoch: 7, loss: 0.2360, accuracy: 0.9264, val_loss: 0.1982, val_accuracy: 0.9180 },
  { epoch: 8, loss: 0.2509, accuracy: 0.9100, val_loss: 0.2702, val_accuracy: 0.8845 },
  { epoch: 9, loss: 0.1946, accuracy: 0.9369, val_loss: 0.2914, val_accuracy: 0.8912 },
  { epoch: 10, loss: 0.1787, accuracy: 0.9381, val_loss: 0.1135, val_accuracy: 0.9525 },
  { epoch: 11, loss: 0.2044, accuracy: 0.9276, val_loss: 0.1859, val_accuracy: 0.9230 },
  { epoch: 12, loss: 0.1599, accuracy: 0.9428, val_loss: 0.1166, val_accuracy: 0.9550 },
  { epoch: 13, loss: 0.2126, accuracy: 0.9275, val_loss: 0.1822, val_accuracy: 0.9310 },
  { epoch: 14, loss: 0.1826, accuracy: 0.9346, val_loss: 0.1988, val_accuracy: 0.9280 },
  { epoch: 15, loss: 0.1301, accuracy: 0.9521, val_loss: 0.1077, val_accuracy: 0.9610 },
  { epoch: 16, loss: 0.1672, accuracy: 0.9393, val_loss: 0.1419, val_accuracy: 0.9480 },
  { epoch: 17, loss: 0.1840, accuracy: 0.9357, val_loss: 0.1661, val_accuracy: 0.9350 },
  { epoch: 18, loss: 0.1102, accuracy: 0.9650, val_loss: 0.0999, val_accuracy: 0.9680 },
  { epoch: 19, loss: 0.1289, accuracy: 0.9603, val_loss: 0.1170, val_accuracy: 0.9520 },
  { epoch: 20, loss: 0.1062, accuracy: 0.9673, val_loss: 0.0813, val_accuracy: 0.9710 },
  { epoch: 21, loss: 0.0937, accuracy: 0.9638, val_loss: 0.0785, val_accuracy: 0.9750 },
  { epoch: 22, loss: 0.1227, accuracy: 0.9591, val_loss: 0.0798, val_accuracy: 0.9720 },
  { epoch: 23, loss: 0.0828, accuracy: 0.9685, val_loss: 0.0909, val_accuracy: 0.9650 },
  { epoch: 24, loss: 0.1180, accuracy: 0.9591, val_loss: 0.1113, val_accuracy: 0.9580 },
  { epoch: 25, loss: 0.1051, accuracy: 0.9650, val_loss: 0.0675, val_accuracy: 0.9760 },
  { epoch: 26, loss: 0.0852, accuracy: 0.9696, val_loss: 0.0555, val_accuracy: 0.9820 },
  { epoch: 27, loss: 0.0797, accuracy: 0.9731, val_loss: 0.0586, val_accuracy: 0.9810 },
  { epoch: 28, loss: 0.0750, accuracy: 0.9740, val_loss: 0.0550, val_accuracy: 0.9830 },
  { epoch: 29, loss: 0.0722, accuracy: 0.9765, val_loss: 0.0521, val_accuracy: 0.9850 },
  { epoch: 30, loss: 0.0690, accuracy: 0.9780, val_loss: 0.0510, val_accuracy: 0.9840 },
  { epoch: 31, loss: 0.0645, accuracy: 0.9812, val_loss: 0.0485, val_accuracy: 0.9860 },
  { epoch: 32, loss: 0.0610, accuracy: 0.9825, val_loss: 0.0460, val_accuracy: 0.9880 },
  { epoch: 33, loss: 0.0585, accuracy: 0.9840, val_loss: 0.0442, val_accuracy: 0.9890 },
  { epoch: 34, loss: 0.0560, accuracy: 0.9850, val_loss: 0.0415, val_accuracy: 0.9900 },
  { epoch: 35, loss: 0.0535, accuracy: 0.9860, val_loss: 0.0402, val_accuracy: 0.9910 },
  { epoch: 36, loss: 0.0510, accuracy: 0.9875, val_loss: 0.0388, val_accuracy: 0.9920 },
  { epoch: 37, loss: 0.0485, accuracy: 0.9880, val_loss: 0.0375, val_accuracy: 0.9920 },
  { epoch: 38, loss: 0.0460, accuracy: 0.9892, val_loss: 0.0360, val_accuracy: 0.9930 },
  { epoch: 39, loss: 0.0442, accuracy: 0.9900, val_loss: 0.0351, val_accuracy: 0.9930 },
  { epoch: 40, loss: 0.0425, accuracy: 0.9910, val_loss: 0.0342, val_accuracy: 0.9940 },
  { epoch: 41, loss: 0.0410, accuracy: 0.9915, val_loss: 0.0330, val_accuracy: 0.9940 },
  { epoch: 42, loss: 0.0395, accuracy: 0.9920, val_loss: 0.0321, val_accuracy: 0.9940 },
  { epoch: 43, loss: 0.0380, accuracy: 0.9925, val_loss: 0.0310, val_accuracy: 0.9950 },
  { epoch: 44, loss: 0.0368, accuracy: 0.9930, val_loss: 0.0302, val_accuracy: 0.9950 },
  { epoch: 45, loss: 0.0355, accuracy: 0.9935, val_loss: 0.0295, val_accuracy: 0.9950 },
  { epoch: 46, loss: 0.0342, accuracy: 0.9940, val_loss: 0.0288, val_accuracy: 0.9960 },
  { epoch: 47, loss: 0.0330, accuracy: 0.9945, val_loss: 0.0280, val_accuracy: 0.9960 },
  { epoch: 48, loss: 0.0320, accuracy: 0.9950, val_loss: 0.0272, val_accuracy: 0.9960 },
  { epoch: 49, loss: 0.0310, accuracy: 0.9955, val_loss: 0.0265, val_accuracy: 0.9970 },
  { epoch: 50, loss: 0.0298, accuracy: 0.9960, val_loss: 0.0258, val_accuracy: 0.9970 }
];

// Architectural layer metrics directly from model.summary() in PDF
export const cnnLayers: CnnLayer[] = [
  {
    id: "conv2d",
    name: "conv2d (Conv2D)",
    type: "Conv2D",
    inputShape: "(None, 224, 224, 3)",
    outputShape: "(None, 222, 222, 32)",
    params: 896,
    description: "Applies 32 convolutional filters of size 3x3 with ReLU activation. This initial layer extracts elementary local patterns such as raw edge directions, contrast boundaries, and basic textures directly from the 3-channel (RGB equivalent) input scan.",
    extractedFeature: "Basic borders, rib edges, lung cavity outline features."
  },
  {
    id: "conv2d_1",
    name: "conv2d_1 (Conv2D)",
    type: "Conv2D",
    inputShape: "(None, 222, 222, 32)",
    outputShape: "(None, 220, 220, 64)",
    params: 18496,
    description: "Applies 64 filters of size 3x3 with ReLU activation. It combines the low-level edge inputs from the previous layer to formulate more complex shapes, including subpleural curves and bronchovascular branch shapes.",
    extractedFeature: "Vascular tree formations, fine parenchymal lines, pleural membrane contours."
  },
  {
    id: "max_pooling2d",
    name: "max_pooling2d (MaxPooling2D)",
    type: "MaxPooling2D",
    inputShape: "(None, 220, 220, 64)",
    outputShape: "(None, 110, 110, 64)",
    params: 0,
    description: "Downsamples the spatial dimensions by a factor of 2 (taking the maximum value in 2x2 blocks). This grants translational invariance and shrinks the spatial matrix, focusing the model's focus on the most dominant features.",
    extractedFeature: "Compressed high-contrast spatial features, discarding minor translation shifts."
  },
  {
    id: "dropout",
    name: "dropout (Dropout)",
    type: "Dropout",
    inputShape: "(None, 110, 110, 64)",
    outputShape: "(None, 110, 110, 64)",
    params: 0,
    description: "Randomly deactivates 25% of activations during training. This acts as a robust regularizer, preventing co-adaptation of features and forcing the network to develop redundant pathways for generalized feature detection.",
    extractedFeature: "Generalized, co-adaptation resistant feature maps."
  },
  {
    id: "conv2d_2",
    name: "conv2d_2 (Conv2D)",
    type: "Conv2D",
    inputShape: "(None, 110, 110, 64)",
    outputShape: "(None, 108, 108, 64)",
    params: 36928,
    description: "Applies 64 filters of size 3x3 with ReLU activation. This intermediate convolutional layer maps regional densities, highlighting abnormalities like early-stage ground-glass opacities (GGO).",
    extractedFeature: "Subtle lung density patches, hazy interstitial shadows."
  },
  {
    id: "max_pooling2d_1",
    name: "max_pooling2d_1 (MaxPooling2D)",
    type: "MaxPooling2D",
    inputShape: "(None, 108, 108, 64)",
    outputShape: "(None, 54, 54, 64)",
    params: 0,
    description: "Performs 2x2 max-pooling, reducing the height and width to 54 pixels. It compresses regional density information, turning local gradients into abstract shape indicators.",
    extractedFeature: "Consolidated spatial density matrices."
  },
  {
    id: "dropout_1",
    name: "dropout_1 (Dropout)",
    type: "Dropout",
    inputShape: "(None, 54, 54, 64)",
    outputShape: "(None, 54, 54, 64)",
    params: 0,
    description: "Regularizes the intermediate representations, discarding 25% of parameters randomly.",
    extractedFeature: "Robust intermediate structural maps."
  },
  {
    id: "conv2d_3",
    name: "conv2d_3 (Conv2D)",
    type: "Conv2D",
    inputShape: "(None, 54, 54, 64)",
    outputShape: "(None, 52, 52, 128)",
    params: 73856,
    description: "Applies 128 filters of size 3x3 with ReLU activation. This deeper layer processes broader, non-local lung patterns, mapping dense consolidations, pleural effusions, and complex air-space pathologies.",
    extractedFeature: "Consolidation block structures, major peripheral opacities."
  },
  {
    id: "max_pooling2d_2",
    name: "max_pooling2d_2 (MaxPooling2D)",
    type: "MaxPooling2D",
    inputShape: "(None, 52, 52, 128)",
    outputShape: "(None, 26, 26, 128)",
    params: 0,
    description: "Reduces resolution to 26x26. It abstracts features so that the exact pixel position of an infection patch does not prevent detection elsewhere.",
    extractedFeature: "Abstract pathological shape distributions."
  },
  {
    id: "dropout_2",
    name: "dropout_2 (Dropout)",
    type: "Dropout",
    inputShape: "(None, 26, 26, 128)",
    outputShape: "(None, 26, 26, 128)",
    params: 0,
    description: "Applies 25% dropout rate.",
    extractedFeature: "De-noised pathological features."
  },
  {
    id: "conv2d_4",
    name: "conv2d_4 (Conv2D)",
    type: "Conv2D",
    inputShape: "(None, 26, 26, 128)",
    outputShape: "(None, 24, 24, 128)",
    params: 147584,
    description: "Applies 128 filters of size 3x3 with ReLU. It models severe pulmonary involvement, distinguishing diffuse, multi-lobar opacities from normal clear parenchyma.",
    extractedFeature: "Multi-lobar infection involvement and pleural boundary changes."
  },
  {
    id: "max_pooling2d_3",
    name: "max_pooling2d_3 (MaxPooling2D)",
    type: "MaxPooling2D",
    inputShape: "(None, 24, 24, 128)",
    outputShape: "(None, 12, 12, 128)",
    params: 0,
    description: "Further downsamples feature representations to 12x12 grid elements.",
    extractedFeature: "Globalized representation of structural changes."
  },
  {
    id: "dropout_3",
    name: "dropout_3 (Dropout)",
    type: "Dropout",
    inputShape: "(None, 12, 12, 128)",
    outputShape: "(None, 12, 12, 128)",
    params: 0,
    description: "Applies 25% dropout to deepest convolutional block.",
    extractedFeature: "De-noised global pathological maps."
  },
  {
    id: "conv2d_5",
    name: "conv2d_5 (Conv2D)",
    type: "Conv2D",
    inputShape: "(None, 12, 12, 128)",
    outputShape: "(None, 10, 10, 128)",
    params: 147584,
    description: "The final 3x3 convolution layer with 128 filters. It integrates high-level conceptual features across the entire thoracic cavity, readying them for dense evaluation.",
    extractedFeature: "Comprehensive global feature score map."
  },
  {
    id: "max_pooling2d_4",
    name: "max_pooling2d_4 (MaxPooling2D)",
    type: "MaxPooling2D",
    inputShape: "(None, 10, 10, 128)",
    outputShape: "(None, 5, 5, 128)",
    params: 0,
    description: "Final pooling, yielding a highly compact 5x5 feature grid. Each grid coordinate represents active pathology over a wide section of the original scan.",
    extractedFeature: "Highly abstract 5x5 conceptual grid."
  },
  {
    id: "dropout_4",
    name: "dropout_4 (Dropout)",
    type: "Dropout",
    inputShape: "(None, 5, 5, 128)",
    outputShape: "(None, 5, 5, 128)",
    params: 0,
    description: "Applies 25% dropout prior to flattening.",
    extractedFeature: "Highly regularized compressed activations."
  },
  {
    id: "flatten",
    name: "flatten (Flatten)",
    type: "Flatten",
    inputShape: "(None, 5, 5, 128)",
    outputShape: "(None, 3200)",
    params: 0,
    description: "Reshapes the multidimensional 5x5x128 grid into a flat, 1-dimensional array of 3,200 feature scores. This linear array connects spatial convolutional filters directly to fully connected artificial neurons.",
    extractedFeature: "A single 3200-dimensional vector of abstract pathology features."
  },
  {
    id: "dense",
    name: "dense (Dense)",
    type: "Dense",
    inputShape: "(None, 3200)",
    outputShape: "(None, 64)",
    params: 204864,
    description: "Fully connected layer mapping the 3,200 features into 64 hidden neurons using ReLU. It performs high-level synthesis and non-linear classification, weight-summing all edge and texture features.",
    extractedFeature: "Unified feature combination representing anatomical abnormalities."
  },
  {
    id: "dropout_5",
    name: "dropout_5 (Dropout)",
    type: "Dropout",
    inputShape: "(None, 64)",
    outputShape: "(None, 64)",
    params: 0,
    description: "Applies a heavy 50% dropout rate during training. It shuts down half of the classification neurons randomly, which guarantees the final classification depends on a combination of features rather than any single cue.",
    extractedFeature: "Highly robust classification combinations."
  },
  {
    id: "dense_1",
    name: "dense_1 (Dense)",
    type: "Dense",
    inputShape: "(None, 64)",
    outputShape: "(None, 1)",
    params: 65,
    description: "The final prediction node with a Sigmoid activation function. It maps the 64 hidden representations down to a single output value between 0.0 and 1.0. A score of 0.0 perfectly indicates COVID-19 ('covid'), while 1.0 perfectly indicates clear healthy lungs ('normal').",
    extractedFeature: "Binary classification score."
  }
];
