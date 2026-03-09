# Product Authenticity Detection System (AuthentiLens)

This project gives you two things:

1. **Dataset generator** for training data (`genuine` vs `fake`) by fetching product images from multiple APIs.
2. **Classy camera-based front-end** that captures a product image and predicts authenticity with a demo heuristic.

## Dataset APIs Used
- **Openverse Images API**
- **Wikimedia Commons API**

## Structure
- `scripts/build_dataset.py` - downloads and labels dataset images.
- `data/raw/genuine` - authentic product images.
- `data/raw/fake` - counterfeit/fake product images.
- `data/metadata.jsonl` - source, query, and license metadata.
- `templates/index.html`, `static/styles.css`, `static/app.js` - front-end.
- `app.py` - simple static server.

## Build Dataset
```bash
python scripts/build_dataset.py --per-query 8
```

## Run Front-End
```bash
python app.py
```
Open: `http://localhost:8000/templates/index.html`

## Important
- The current authenticity prediction is a **demo heuristic** for UI behavior.
- For production use, replace it with your trained model (TensorFlow/PyTorch/ONNX inference).
- Verify API content licenses before commercial model training.
