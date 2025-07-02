export {};

declare global {
  interface Window {
    FaceDetection?: {
      new (config: FaceDetectionConfig): {
        setOptions: (options: FaceDetectionOptions) => void;
        onResults: (callback: (results: DetectionResults) => void) => void;
        send: (data: { image: HTMLVideoElement }) => Promise<void>;
        close?: () => void;
      };
    };
  }
}
