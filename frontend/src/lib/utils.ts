import { DetectionResults } from "@/types/camera";

import {
  CENTER_THRESHOLD,
  ALIGNMENT_THRESHOLD,
  BRIGHTNESS_THRESHOLD,
} from "@/constants/faceDetection";

export const drawFaceGuide = (ctx: CanvasRenderingContext2D) => {
  const { width, height } = ctx.canvas;
  ctx.strokeStyle = "#00ff00aa";
  ctx.lineWidth = 4;
  ctx.fillStyle = "#00ff0033";

  const centerX = width / 2;
  const centerY = height / 2;
  const radiusX = width * 0.25;
  const radiusY = height * 0.4;

  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};

export const isFaceCentered = (boundingBox: {
  xCenter: number;
  yCenter: number;
}) => {
  return (
    Math.abs(boundingBox.xCenter - 0.5) < CENTER_THRESHOLD &&
    Math.abs(boundingBox.yCenter - 0.5) < CENTER_THRESHOLD
  );
};

export const isFacingFront = (keypoints?: Array<{ x: number; y: number }>) => {
  if (!keypoints || keypoints.length < 2) return true;
  const rightEye = keypoints[0];
  const leftEye = keypoints[1];
  if (!rightEye || !leftEye) return true;
  return Math.abs(rightEye.y - leftEye.y) < ALIGNMENT_THRESHOLD;
};

export const getAverageBrightness = (data: Uint8ClampedArray) => {
  let total = 0;
  for (let i = 0; i < data.length; i += 4) {
    total += (data[i] + data[i + 1] + data[i + 2]) / 3;
  }
  return total / (data.length / 4);
};

export const loadMediaPipeScript = async (url: string) => {
  if ((window as any).FaceDetection) return;

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load MediaPipe face_detection"));
    document.head.appendChild(script);
  });
};

export const validateFacePresence = (
  results: DetectionResults,
  updateStatus: (message: string, canCapture: boolean) => void
) => {
  if (!results.detections?.length) {
    updateStatus("No face detected", false);
    return false;
  }

  const detection = results.detections[0];
  const { boundingBox, keypoints } = detection;

  if (!isFaceCentered(boundingBox)) {
    updateStatus("Please center your face", false);
    return false;
  }

  if (!isFacingFront(keypoints)) {
    updateStatus("Please face the camera straight", false);
    return false;
  }

  return true;
};

export const validateLighting = (
  ctx: CanvasRenderingContext2D,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  updateStatus: (message: string, canCapture: boolean) => void
) => {
  if (!canvasRef.current) return false;

  const imageData = ctx.getImageData(
    0,
    0,
    canvasRef.current.width,
    canvasRef.current.height
  );

  if (getAverageBrightness(imageData.data) < BRIGHTNESS_THRESHOLD) {
    updateStatus("Lighting too dark", false);
    return false;
  }

  return true;
};
