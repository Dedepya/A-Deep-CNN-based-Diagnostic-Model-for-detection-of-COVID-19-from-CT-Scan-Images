# 🚀 Deployment Guide - COVID-19 CT Scan Detector

Get your COVID-19 detection web app live in minutes! Choose your preferred platform below.

---

## ⭐ **RECOMMENDED: Hugging Face Spaces (Easiest & Free)**

### Why Hugging Face Spaces?
✅ Completely free  
✅ Automatic HTTPS & domain  
✅ No configuration needed  
✅ Built-in GPU support  
✅ Perfect for Gradio apps  

### 📋 Step-by-Step:

1. **Sign Up**
   - Go to https://huggingface.co
   - Create a free account

2. **Create a Space**
   - Visit https://huggingface.co/spaces
   - Click "Create new Space"
   - Fill in:
     - **Space name**: `COVID-19-CT-Detector`
     - **License**: MIT
     - **Space SDK**: Gradio
     - **Visibility**: Public
   - Click "Create Space"

3. **Upload Your Files**
   - Clone the space to your computer:
   ```bash
   git clone https://huggingface.co/spaces/YOUR_USERNAME/COVID-19-CT-Detector
   cd COVID-19-CT-Detector
   ```

   - Copy these files from your repo:
   ```bash
   cp /path/to/your/repo/app.py .
   cp /path/to/your/repo/inference.py .
   cp /path/to/your/repo/requirements.txt .
   cp /path/to/your/repo/model.h5 .
   ```

   - Push to Hugging Face:
   ```bash
   git add .
   git commit -m "Add COVID-19 detection app"
   git push
   ```

4. **✅ Done!** 
   Your app is now live at:
   ```
   https://huggingface.co/spaces/YOUR_USERNAME/COVID-19-CT-Detector
   ```

---

## 🐳 **Alternative: Render.com (Docker Support)**

### Setup:

1. **Create Dockerfile**
   
   Create a file named `Dockerfile` in your repo root:
   ```dockerfile
   FROM python:3.9-slim
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   EXPOSE 7860
   CMD ["python", "app.py"]
   ```

2. **Deploy**
   - Go to https://render.com
   - Sign in with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Set:
     - **Start Command**: `python app.py`
     - **Instance Type**: Free (or paid for GPU)
   - Click "Deploy"

3. **✅ Live at:**
   ```
   https://your-app-name.onrender.com
   ```

---

## 🚂 **Alternative: Railway.app**

### Quick Deploy:

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub Repo"
3. Select your repository
4. Railway auto-detects Python & deploys!
5. Your app is at: `https://your-app-name.up.railway.app`

---

## 📦 **Handling Large Model Files**

If `model.h5` is > 100MB, GitHub won't accept it. Use one of these solutions:

### Option A: GitHub Releases (Recommended)
```bash
# Create a release
gh release create v1.0 model.h5
```

Then update `app.py` to auto-download:
```python
import os
import urllib.request

MODEL_PATH = "model.h5"
MODEL_URL = "https://github.com/YOUR_USERNAME/YOUR_REPO/releases/download/v1.0/model.h5"

if not os.path.exists(MODEL_PATH):
    print("Downloading model...")
    urllib.request.urlretrieve(MODEL_URL, MODEL_PATH)

model = keras.models.load_model(MODEL_PATH)
```

### Option B: Google Drive
```python
from google_drive_downloader import GoogleDriveDownloader as gdd

if not os.path.exists("model.h5"):
    gdd.download_file_from_google_drive(
        file_id="YOUR_FILE_ID",
        dest_path="model.h5"
    )
```

### Option C: Hugging Face Hub
```python
from huggingface_hub import hf_hub_download

model_path = hf_hub_download(
    repo_id="YOUR_USERNAME/COVID-19-Model",
    filename="model.h5"
)
model = keras.models.load_model(model_path)
```

---

## 📊 **GitHub Pages Landing Site**

Your landing page is ready at:
```
https://dedepya.github.io/A-Deep-CNN-based-Diagnostic-Model-for-detection-of-COVID-19-from-CT-Scan-Images/
```

**To enable:**
1. Go to your repo → **Settings** → **Pages**
2. Under "Source", select **main** branch → **/docs** folder
3. Click **Save**
4. Your site goes live in ~1 minute!

---

## 🎯 **Quick Comparison**

| Platform | Cost | GPU | Setup Time | Domain |
|----------|------|-----|-----------|--------|
| **Hugging Face Spaces** | Free | Optional | 5 min | `hf.co/spaces/...` |
| **Render** | Free/Paid | Premium | 10 min | `onrender.com` |
| **Railway** | Free/Paid | Premium | 5 min | `up.railway.app` |
| **GitHub Pages** | Free | ❌ | 2 min | `github.io/...` |

---

## ✅ **Verification Checklist**

After deployment, test:
- [ ] App loads without errors
- [ ] Can upload a CT scan image
- [ ] Model runs inference
- [ ] Results display correctly
- [ ] Response time is acceptable
- [ ] Mobile responsiveness works
- [ ] Disclaimer is visible

---

## 🆘 **Troubleshooting**

### App crashes on startup
- ✅ Check `requirements.txt` has all dependencies
- ✅ Verify `model.h5` path is correct
- ✅ Check deployment logs for errors

### Model not found
- ✅ Ensure model file exists in repo/space
- ✅ Use auto-download from GitHub Releases
- ✅ Check file permissions

### Slow predictions
- ✅ Upgrade to paid tier for GPU
- ✅ Optimize model (quantization, pruning)
- ✅ Use ONNX Runtime for faster inference

### Need more than 100MB storage?
- ✅ Use Hugging Face Spaces (more storage)
- ✅ Use Render/Railway (more generous limits)
- ✅ Host model separately, download at startup

---

## 📞 **Useful Resources**

- 📚 [Gradio Docs](https://www.gradio.app/guides)
- 🤗 [Hugging Face Spaces Guide](https://huggingface.co/docs/hub/spaces)
- 🐳 [Docker Docs](https://docs.docker.com)
- 🚀 [Render Docs](https://render.com/docs)
- 🚂 [Railway Docs](https://docs.railway.app)

---

## 🎉 **You're Done!**

Share your live app with the world! 

**Example links to share:**
- `https://huggingface.co/spaces/YOUR_USERNAME/COVID-19-CT-Detector`
- `https://your-app.onrender.com`
- `https://dedepya.github.io/A-Deep-CNN-based-Diagnostic-Model...`

Good luck! 🧬🚀