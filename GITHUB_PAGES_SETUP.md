# GitHub Pages Deployment Guide

Deploy your COVID-19 CT scan detector to GitHub Pages with browser-based inference using TensorFlow.js.

## 📋 Prerequisites

- Python 3.7+
- Your trained Keras model exported as `model.h5`
- Git repository access

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies

Convert your Keras model to TensorFlow.js format:

```bash
pip install tensorflowjs tensorflow
```

### Step 2: Export Your Model (from Jupyter Notebook)

If you haven't already, export your trained model:

```python
# In your Jupyter notebook, after training:
model.save("model.h5")
```

Place the `model.h5` file in your repository root directory.

### Step 3: Convert Model to TensorFlow.js Format

Run the conversion script from the repository root:

```bash
python convert_model_to_tfjs.py
```

**Expected Output:**
```
Loading Keras model from: model.h5
✓ Model loaded successfully
Converting to TensorFlow.js format...
✓ Model converted successfully to: docs/model_tfjs

Files created:
  - model.json
  - group1-shard1of1.bin
```

The converted model files will be in `docs/model_tfjs/`.

### Step 4: Verify File Structure

Ensure your repository structure matches:

```
repository-root/
├── docs/
│   ├── index.html                 (Web interface)
│   ├── .nojekyll                  (GitHub Pages config)
│   └── model_tfjs/
│       ├── model.json             (Model architecture)
│       └── group1-shard1of1.bin    (Model weights)
├── app.py
├── inference.py
├── requirements.txt
├── convert_model_to_tfjs.py       (Conversion script)
└── model.h5                        (Original Keras model - optional to keep)
```

### Step 5: Commit and Push

```bash
git add docs/model_tfjs/
git add docs/index.html
git add docs/.nojekyll
git add convert_model_to_tfjs.py
git add GITHUB_PAGES_SETUP.md
git commit -m "Deploy COVID-19 CT scan detector to GitHub Pages"
git push origin master
```

### Step 6: Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - Select **Deploy from a branch**
   - Branch: `master` (or your default branch)
   - Folder: `/docs`
4. Click **Save**

GitHub will deploy your site automatically. Wait 1-2 minutes for deployment.

## 🌐 Access Your Deployed Website

Your website will be live at:

```
https://Dedepya.github.io/A-Deep-CNN-based-Diagnostic-Model-for-detection-of-COVID-19-from-CT-Scan-Images/
```

## 🎯 Features

✅ **Browser-based inference** - No server required  
✅ **Privacy** - Images are processed locally, never sent to servers  
✅ **Real-time predictions** - Instant results using GPU acceleration  
✅ **Responsive design** - Works on desktop and mobile  
✅ **Easy to use** - Drag and drop interface  

## 🔧 Troubleshooting

### Model Not Loading
- Verify `docs/model_tfjs/model.json` exists
- Check browser console (F12) for error messages
- Ensure model.json references the correct `.bin` file

### Conversion Failed
- Ensure `model.h5` is in the repository root
- Verify TensorFlow version: `pip install --upgrade tensorflow`
- Check model compatibility: the script expects Keras/TensorFlow format

### GitHub Pages Not Updating
- Check "Build and deployment" settings point to `/docs` folder
- Wait 1-2 minutes for GitHub to rebuild
- Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)

## 📝 Customization

### Change Model Configuration

Edit `docs/index.html`:

```javascript
const IMG_SIZE = 224;           // Change if your model uses different size
const CLASS_NAMES = ["COVID-19", "Normal"];  // Update class names
const MODEL_URL = './model_tfjs/model.json'; // Model location
```

### Update UI Theme

Modify CSS in `docs/index.html`:
- Colors: `#667eea` (primary), `#764ba2` (secondary)
- Fonts: Currently uses 'Segoe UI'
- Layout: Adjust padding/margins as needed

## ⚠️ Important Notes

1. **Model Size**: Large models (>100MB) may take time to download. Consider model quantization for faster loading.

2. **Performance**: Browser inference is slower than GPU-accelerated servers. Typical analysis takes 2-5 seconds.

3. **Privacy**: The web version processes images locally and never sends them to external servers.

4. **Disclaimer**: This tool is for research and education only. Not for clinical diagnosis.

## 📚 Additional Resources

- [TensorFlow.js Documentation](https://www.tensorflow.org/js)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Converting Keras Models to TensorFlow.js](https://github.com/tensorflow/tfjs/tree/master/tfjs-converter)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review GitHub Pages logs
3. Check browser console (F12)
4. See the main README.md for additional context

---

**Deployment Status:** Ready for GitHub Pages 🚀
