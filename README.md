# COVID-19 Chest CT Scan CNN Classifier & Interactive Diagnostic Sandbox

An interactive web application showcasing a deep **Convolutional Neural Network (CNN)** trained to classify **COVID-19 Positive** vs. **Normal/Healthy** Chest CT scans. 

This project bridges the gap between machine learning research (from a Jupyter `.ipynb` notebook) and an intuitive, clinical-grade demonstration platform for end-users and radiologists.

---

## 🚀 Key Features

- **Interactive Diagnostic Sandbox:** Select high-fidelity Patient CT scan presets or upload your own axial chest slices (`.png`, `.jpeg`, `.jpg`) to trace classification probabilities.
- **Explainable AI (Grad-CAM overlays):** Visualize simulated neural network focus regions using custom translucent heatmap targets directly overlaid on the scan images. Hover over activation hotspots to inspect local radiological features (e.g., ground-glass opacities, subpleural consolidations).
- **CNN Layer Inspector:** Click through the entire sequential Keras layer stack to inspect input/output tensor shapes, parameter counts, and the exact mathematical/functional role of each layer (from `Conv2D` feature extraction down to `Sigmoid` classification).
- **Training Performance Visualizers:** Explore accuracy and loss curves directly mapped from the model's 50-epoch training convergence history on Google Colab.
- **Multimodal Radiology Intelligence:** Integrated with **Gemini 3.5 Flash** server-side to generate detailed radiologist findings, clinical recommendations, and simulate heatmap coordinates for uploaded images. Falls back automatically to a high-fidelity simulator if API keys are not configured.

---

## 🧠 Model Architecture & Methodology

The model is built using the **Keras Sequential API** with a total of **630,273 trainable parameters**:

| Layer Index | Layer Name & Type | Input Shape | Output Shape | Parameters | Primary Function |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | `conv2d (Conv2D)` | `(224, 224, 3)` | `(222, 222, 32)` | `896` | Extracts raw edges and thoracic cavity outlines. |
| **2** | `conv2d_1 (Conv2D)` | `(222, 222, 32)` | `(220, 220, 64)` | `18,496` | Identifies pleural borders and vascular trees. |
| **3** | `max_pooling2d` | `(220, 220, 64)` | `(110, 110, 64)` | `0` | Spatial downsampling for translational invariance. |
| **4** | `dropout (Dropout)` | `(110, 110, 64)` | `(110, 110, 64)` | `0` | Regularizer (25% dropout) to prevent overfitting. |
| **5** | `conv2d_2 (Conv2D)` | `(110, 110, 64)` | `(108, 108, 64)` | `36,928` | Maps regional densities / early ground-glass opacities. |
| **...** | *Multiple Conv/Pool/Drop blocks* | ... | ... | ... | Deep feature abstraction. |
| **17** | `flatten (Flatten)` | `(5, 5, 128)` | `(3200)` | `0` | Unrolls 2D spatial feature grid to 1D vector. |
| **18** | `dense (Dense)` | `(3200)` | `(64)` | `204,864` | Synthesizes abstract features (ReLU activation). |
| **19** | `dropout_5 (Dropout)` | `(64)` | `(64)` | `0` | Strict regularizer (50% dropout) for generalization. |
| **20** | `dense_1 (Dense)` | `(64)` | `(1)` | `65` | Binary Sigmoid classifier (`Covid: 0, Normal: 1`). |

---

## 📈 Training Convergence (Colab Highlights)

- **Dataset Size:** 1,152 Chest CT Scan images (920 Training, 232 Validation).
- **Data Augmentation:** Implemented `ImageDataGenerator` with `rescale=1./255`, `shear_range=0.2`, `zoom_range=0.2`, and `horizontal_flip=True`.
- **Validation Accuracy:** Peaked at **99.70%** by Epoch 50, showing exceptional generalization capabilities with near-zero validation loss.
- **Optimizer:** `Adam(learning_rate=0.001)` paired with `binary_crossentropy` loss.

---

## 🛠️ Local Development & Quick Start

This project uses **React (Vite) with TypeScript** for the client and an **Express server** as the backend to handle secure API calls to Gemini.

### Prerequisites
- Node.js (v18+)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file at the root of the project:
```env
GEMINI_API_KEY="your_api_key_here" # Optional: Falls back to simulator if left empty
```

### 3. Start Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000`.

### 4. Build for Production
To build both client static assets and the server bundle:
```bash
npm run build
npm start
```

---

## 🌐 Deploying to GitHub Pages

Because GitHub Pages serves purely static content, we have built-in static fallback capability. Check the detailed step-by-step instructions inside **`GITHUB_INSTRUCTIONS.md`** to configure automated deployment via **GitHub Actions**.

---

## 📄 License
This project is licensed under the Apache-2.0 License. See the header declarations in the source files for details.
