import os
import numpy as np
from PIL import Image
import gradio as gr

from inference import load_model_from_path, preprocess_pil, predict_from_model, CLASS_NAMES

MODEL_PATH = os.environ.get("MODEL_PATH", "model.h5")

# Try loading model at startup; if not present we'll show a helpful message in the UI
try:
    model = load_model_from_path(MODEL_PATH)
    MODEL_LOADED = True
except Exception as e:
    model = None
    MODEL_LOADED = False
    load_error = str(e)


def predict(img: Image.Image):
    """Gradio prediction function. Returns a label -> probability mapping.
    If the model isn't available, returns an instructive message instead.
    """
    if not MODEL_LOADED:
        return {"error": f"Model not found or failed to load. Place your Keras model at '{MODEL_PATH}' (call model.save('model.h5') in your notebook) and restart. Error: {load_error}"}

    x = preprocess_pil(img)
    preds = predict_from_model(model, x)

    # Return as a dict so gr.Label shows probabilities
    return {name: float(score) for name, score in zip(CLASS_NAMES, preds)}


title = "CT Scan COVID-19 Detector (Gradio)"

description = (
    "Upload a CT scan image. The model will predict the probability for each class. "
    "Make sure you've exported your trained Keras model to `model.h5` and placed it in the repo root, or set the MODEL_PATH environment variable."
)

iface = gr.Interface(
    fn=predict,
    inputs=gr.Image(type="pil", label="Upload CT scan"),
    outputs=gr.Label(num_top_classes=3, label="Predictions"),
    title=title,
    description=description,
    allow_flagging="never",
)

if __name__ == "__main__":
    # Bind to 0.0.0.0 so hosting platforms can serve it
    iface.launch(server_name="0.0.0.0", server_port=int(os.environ.get("PORT", 7860)))
