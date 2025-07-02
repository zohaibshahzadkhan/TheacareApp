import { useEffect, useRef, useState } from "react";
import {
  CameraRefs,
  CameraStatus,
  CameraFeedProps,
  DetectionResults,
} from "@/types/camera";

import {
  FACE_DETECTION_SCRIPT_URL,
  FACE_DETECTION_OPTIONS,
} from "@/constants/faceDetection";
import {
  loadMediaPipeScript,
  validateFacePresence,
  validateLighting,
  drawFaceGuide,
} from "@/lib/utils";

export const useCamera = (config: CameraFeedProps["config"]) => {
  const [status, setStatus] = useState<CameraStatus>({
    message: "Initializing...",
    canCapture: false,
    capturedImage: null,
  });

  const refs: CameraRefs = {
    video: useRef<HTMLVideoElement>(null),
    canvas: useRef<HTMLCanvasElement>(null),
    overlay: useRef<HTMLCanvasElement>(null),
    stream: useRef<MediaStream | null>(null),
    faceDetection: useRef<any>(null),
    animationFrame: useRef<number>(),
  };

  const updateStatus = (
    message: string,
    canCapture: boolean,
    capturedImage: string | null = null
  ) => {
    setStatus((prev) => ({
      ...prev,
      message,
      canCapture,
      ...(capturedImage !== null && { capturedImage }),
    }));
  };

  useEffect(() => {
    let isMounted = true;

    const initializeCamera = async () => {
      try {
        await loadMediaPipeScript(FACE_DETECTION_SCRIPT_URL);
        if (!isMounted) return;

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });

        if (!isMounted) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }

        refs.stream.current = stream;

        if (refs.video.current) {
          refs.video.current.srcObject = stream;
          await new Promise((resolve) => {
            if (refs.video.current) {
              refs.video.current.onloadedmetadata = resolve;
            }
          });
        }

        setupFaceDetection();
      } catch (error) {
        updateStatus("Camera setup failed", false);
        console.error("Camera initialization error:", error);
      }
    };

    const setupFaceDetection = () => {
      if (!window.FaceDetection) return;

      refs.faceDetection.current = new window.FaceDetection({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
      });

      refs.faceDetection.current.setOptions(FACE_DETECTION_OPTIONS);
      refs.faceDetection.current.onResults(handleDetectionResults);
      processFrame();
    };

    const handleDetectionResults = (results: DetectionResults) => {
      if (
        !isMounted ||
        !refs.canvas.current ||
        !refs.video.current ||
        !refs.overlay.current
      ) {
        return;
      }

      const ctx = refs.canvas.current.getContext("2d");
      const overlayCtx = refs.overlay.current.getContext("2d");

      if (!ctx || !overlayCtx) return;

      renderCameraFrame(ctx);
      clearOverlay(overlayCtx);
      drawFaceGuide(overlayCtx);

      if (
        config.face_check_enabled &&
        !validateFacePresence(results, updateStatus)
      )
        return;
      if (
        config.lighting_check_enabled &&
        !validateLighting(ctx, refs.canvas, updateStatus)
      )
        return;

      updateStatus("Ready to capture!", true);
    };

    const renderCameraFrame = (ctx: CanvasRenderingContext2D) => {
      if (!refs.canvas.current || !refs.video.current) return;
      ctx.drawImage(
        refs.video.current,
        0,
        0,
        refs.canvas.current.width,
        refs.canvas.current.height
      );
    };

    const clearOverlay = (ctx: CanvasRenderingContext2D) => {
      if (!refs.overlay.current) return;
      ctx.clearRect(
        0,
        0,
        refs.overlay.current.width,
        refs.overlay.current.height
      );
    };

    const processFrame = () => {
      if (!isMounted || !refs.video.current || !refs.faceDetection.current)
        return;

      refs.faceDetection.current
        .send({ image: refs.video.current })
        .then(() => {
          if (isMounted) {
            refs.animationFrame.current = requestAnimationFrame(processFrame);
          }
        })
        .catch(console.error);
    };

    initializeCamera();

    return () => {
      isMounted = false;
      if (refs.animationFrame.current) {
        cancelAnimationFrame(refs.animationFrame.current);
      }
      if (refs.stream.current) {
        refs.stream.current.getTracks().forEach((t) => t.stop());
      }
      if (refs.faceDetection.current?.close) {
        refs.faceDetection.current.close();
      }
    };
  }, [config]);

  const capturePhoto = () => {
    if (!refs.canvas.current) return;
    const dataUrl = refs.canvas.current.toDataURL("image/png");
    updateStatus("Photo captured!", false, dataUrl);
  };

  return {
    status,
    refs,
    capturePhoto,
  };
};
