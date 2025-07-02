
"use client";

import { useCamera } from "@/hooks/useCamera";
import { CameraFeedProps } from "@/types/camera";

export default function CameraFeed({ config }: CameraFeedProps) {
  const { status, refs, capturePhoto } = useCamera(config);

  return (
    <div className="w-full bg-gray-900 p-4 flex justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden w-full max-w-3xl">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
          <h2 className="text-xl font-semibold text-white">Camera Preview</h2>
          <p className="text-blue-100 text-sm mt-1">Real-time face detection</p>
        </div>

        <div className="p-6 space-y-5">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-gray-600 mx-auto max-w-2xl">
            <video
              ref={refs.video}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              width={640}
              height={480}
              style={{ visibility: "hidden" }}
            />
            <canvas
              ref={refs.canvas}
              width={640}
              height={480}
              className="absolute inset-0 w-full h-full"
            />
            <canvas
              ref={refs.overlay}
              width={640}
              height={480}
              className="absolute inset-0 pointer-events-none w-full h-full"
            />
          </div>

          <div className="text-center py-3 px-5 bg-gray-700 rounded-lg border border-gray-600 max-w-2xl mx-auto">
            <p
              className={`text-base font-medium ${
                status.message === "Ready to capture!"
                  ? "text-green-400"
                  : status.message === "Initializing..."
                  ? "text-blue-400"
                  : "text-yellow-400"
              }`}
            >
              {status.message}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              disabled={!status.canCapture}
              onClick={capturePhoto}
              className={`px-6 py-2.5 rounded-full text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-opacity-60 flex items-center justify-center
                ${
                  status.canCapture
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg text-white cursor-pointer"
                    : "bg-gray-600 text-gray-300 cursor-not-allowed"
                }
              `}
              aria-disabled={!status.canCapture}
            >
              <svg
                className="w-4 h-4 mr-2 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Capture Photo
            </button>
          </div>

          {status.capturedImage && (
            <div className="mt-5 space-y-3 max-w-2xl mx-auto">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Captured Image</h3>
              
              </div>
              <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-600">
                <img
                  src={status.capturedImage}
                  alt="Captured Face"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-700 px-6 py-3 border-t border-gray-600">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>Active checks: {Object.values(config).filter(Boolean).length}/2</span>
            <span>Status: {status.canCapture ? "Ready" : "Waiting"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
