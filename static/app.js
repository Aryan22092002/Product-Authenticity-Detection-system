const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const snapshot = document.getElementById("snapshot");

const startBtn = document.getElementById("startBtn");
const captureBtn = document.getElementById("captureBtn");
const predictBtn = document.getElementById("predictBtn");

const predictionText = document.getElementById("predictionText");
const confidenceText = document.getElementById("confidenceText");

let capturedImageData;

startBtn.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    captureBtn.disabled = false;
  } catch {
    predictionText.innerText = "Camera access denied.";
  }
});

captureBtn.addEventListener("click", () => {
  if (!video.videoWidth || !video.videoHeight) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  capturedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  snapshot.src = canvas.toDataURL("image/jpeg", 0.9);
  snapshot.hidden = false;
  video.hidden = true;

  predictionText.innerText = "Image captured. Ready for analysis.";
  confidenceText.innerText = "";
  predictBtn.disabled = false;
});

function estimateAuthenticity(imageData) {
  const data = imageData.data;
  let brightnessSum = 0;
  let contrastSum = 0;

  for (let i = 0; i < data.length; i += 16) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    brightnessSum += lum;

    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    contrastSum += spread;
  }

  const samples = Math.max(1, data.length / 16);
  const avgBrightness = brightnessSum / samples;
  const avgContrast = contrastSum / samples;

  const normalized = Math.min(1, (avgBrightness / 255) * 0.5 + (avgContrast / 255) * 0.5);
  const confidence = Math.round((0.5 + normalized * 0.45) * 100);
  const label = confidence >= 65 ? "Likely Genuine" : "Likely Counterfeit";

  return { label, confidence };
}

predictBtn.addEventListener("click", () => {
  if (!capturedImageData) return;

  const result = estimateAuthenticity(capturedImageData);
  predictionText.innerText = result.label;
  confidenceText.innerText = `Confidence: ${result.confidence}% · Demo heuristic only. Replace with your trained model.`;
});
