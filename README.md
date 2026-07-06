CT Scan COVID-19 Detector — Gradio demo

This repository now contains a minimal Gradio demo that loads a Keras model and
runs inference on uploaded CT scan images.

Files added
- app.py          -> Gradio app entrypoint
- inference.py    -> Model loading & preprocessing helpers
- requirements.txt-> Python dependencies
- .gitignore      -> Ignore model files and checkpoints

Quick start (local)
1. Export your trained Keras model from your notebook:

    ```python
    model.save("model.h5")
    ```

2. Place `model.h5` in the repository root (next to `app.py`). By default the app
   looks for `model.h5` but you can set a different path with the MODEL_PATH
   environment variable.

3. Create a virtual environment and install deps:

    python -m venv venv
    source venv/bin/activate   # macOS / Linux
    venv\Scripts\activate    # Windows
    pip install -r requirements.txt

4. Run the app:

    python app.py

The Gradio UI will be available at http://localhost:7860

Deployment
- Hugging Face Spaces (Gradio): Create a new Space with Gradio, push these files,
  and either commit `model.h5` to the repo (not recommended if large/private) or
  modify `app.py` to download the model from a URL at startup.
- Render / Railway / other: these platforms can run the app similarly; ensure
  `MODEL_PATH` points to a file available at container startup.

Notes & next steps
- Edit `inference.py` to set the correct `IMG_SIZE` and `CLASS_NAMES` to match
  how the model was trained.
- If you prefer the demo to automatically download model weights at startup,
  tell me where you'd like to host them (Google Drive, S3, or a GitHub release)
  and I can add a small download step to `app.py`.

If you'd like, I can now:
- Add a small script to download weights from a URL at startup,
- Add a demo/test image and a sample Grad-CAM visualization,
- Or create a Hugging Face Space for you and push the working demo there.
