"""
convert_model_to_tfjs.py

Converts a Keras .h5 model to TensorFlow.js format for browser inference.
Run this script AFTER you have exported your model from your notebook.

Requirements:
    pip install tensorflowjs tensorflow

Usage:
    python convert_model_to_tfjs.py
    # Output will be in ./docs/model_tfjs/
"""

import os
import sys

try:
    import tensorflowjs as tfjs
    import tensorflow as tf
except ImportError:
    print("Error: tensorflowjs or tensorflow not installed.")
    print("Install with: pip install tensorflowjs tensorflow")
    sys.exit(1)

MODEL_PATH = "model.h5"
OUTPUT_DIR = "docs/model_tfjs"

def convert_model():
    """Convert Keras model to TensorFlow.js format."""
    
    if not os.path.exists(MODEL_PATH):
        print(f"Error: Model file '{MODEL_PATH}' not found.")
        print("Make sure you've exported your Keras model:")
        print("  model.save('model.h5')")
        return False
    
    print(f"Loading Keras model from: {MODEL_PATH}")
    try:
        model = tf.keras.models.load_model(MODEL_PATH)
        print("✓ Model loaded successfully")
    except Exception as e:
        print(f"✗ Failed to load model: {e}")
        return False
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print(f"Converting to TensorFlow.js format...")
    try:
        tfjs.converters.save_keras_model(model, OUTPUT_DIR)
        print(f"✓ Model converted successfully to: {OUTPUT_DIR}")
        print(f"\nFiles created:")
        for f in os.listdir(OUTPUT_DIR):
            print(f"  - {f}")
        return True
    except Exception as e:
        print(f"✗ Conversion failed: {e}")
        return False

if __name__ == "__main__":
    success = convert_model()
    sys.exit(0 if success else 1)
