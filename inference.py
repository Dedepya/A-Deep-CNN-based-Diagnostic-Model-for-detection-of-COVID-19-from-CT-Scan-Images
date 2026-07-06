"""
inference.py

Small helpers for loading the Keras model and preprocessing images to match typical
CNN input expectations. Edit IMG_SIZE and CLASS_NAMES to match your original notebook.
"""

from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image

# Default image size — change to the size your model expects
IMG_SIZE = (224, 224)

# Default class names — change to match your model's training labels & order
CLASS_NAMES = ["COVID-19", "Normal"]


def load_model_from_path(path: str):
    """Load a Keras model from the given file path.

    Raises the same exceptions as tensorflow.keras.models.load_model so the caller
    can surface a helpful error message.
    """
    return load_model(path)


def preprocess_pil(img: Image.Image):
    """Convert a PIL image to a numpy batch suitable for model.predict.

    - Converts to RGB
    - Resizes to IMG_SIZE
    - Scales to [0, 1]
    - Adds batch axis
    """
    if img.mode != "RGB":
        img = img.convert("RGB")
    img = img.resize(IMG_SIZE)
    arr = np.asarray(img).astype("float32") / 255.0
    arr = np.expand_dims(arr, axis=0)
    return arr


def predict_from_model(model, preprocessed_batch: np.ndarray):
    """Run model.predict on a single preprocessed batch and return a 1-D array of scores.

    The function tries to handle both binary (single output) and multi-class outputs.
    It always returns a 1-D numpy array with length equal to len(CLASS_NAMES).
    """
    preds = model.predict(preprocessed_batch)
    preds = np.asarray(preds)

    # Flatten until 1D or 2D
    if preds.ndim == 2 and preds.shape[0] == 1:
        preds = preds[0]

    # Binary single-probability output -> convert to two-class [p, 1-p]
    if preds.ndim == 0 or (preds.ndim == 1 and preds.size == 1):
        p = float(preds.item())
        return np.array([p, 1.0 - p])

    # If multi-class matches CLASS_NAMES length, return as-is
    if preds.ndim == 1 and preds.size == len(CLASS_NAMES):
        return preds

    # Otherwise try softmax normalization of the first row
    if preds.ndim >= 1:
        row = preds.flatten()
        # If lengths differ, try to pad or trim to CLASS_NAMES length
        if row.size >= len(CLASS_NAMES):
            row = row[: len(CLASS_NAMES)]
        else:
            # pad with zeros
            padding = np.zeros(len(CLASS_NAMES) - row.size)
            row = np.concatenate([row, padding])
        # Normalize to sum=1 for probabilities
        s = float(np.sum(row))
        if s > 0:
            row = row / s
        return row

    # Fallback: return zeros
    return np.zeros(len(CLASS_NAMES))
