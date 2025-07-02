"use client";

import CameraFeed from "@/components/CameraFeed";
import { useEffect, useState } from "react";
import { getConfig } from "@/lib/api";

export default function CameraPage() {
  const [config, setConfig] = useState<{
    face_check_enabled: boolean;
    lighting_check_enabled: boolean;
  } | null>(null);

  useEffect(() => {
    getConfig().then(setConfig);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        {config ? (
          <div className="w-full max-w-4xl">
            <CameraFeed config={config} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Loading camera configuration...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}