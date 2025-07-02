export type FaceDetectionConfig = {
  locateFile: (file: string) => string;
};

export type FaceDetectionOptions = {
  model: string;
  minDetectionConfidence: number;
};

export type Detection = {
  boundingBox: {
    xCenter: number;
    yCenter: number;
  };
  keypoints?: Array<{ x: number; y: number }>;
};

export type DetectionResults = {
  detections?: Detection[];
};

export type CameraFeedProps = {
  config: {
    face_check_enabled: boolean;
    lighting_check_enabled: boolean;
  };
};

export type CameraStatus = {
  message: string;
  canCapture: boolean;
  capturedImage: string | null;
};


export type CameraRefs = {
  video: React.RefObject<HTMLVideoElement | null>;
  canvas: React.RefObject<HTMLCanvasElement | null>;
  overlay: React.RefObject<HTMLCanvasElement | null>;
  stream: React.RefObject<MediaStream | null>;
  faceDetection: React.RefObject<any>;
  animationFrame: React.RefObject<number | undefined>;
};