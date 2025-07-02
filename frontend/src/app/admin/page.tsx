"use client";

import { useEffect, useState } from "react";
import { getConfig, updateConfig } from "@/lib/api";
import ConfigCard from "@/components/admin/ConfigCard";
import AdminLayout from "@/components/admin/AdminLayout";

type ConfigType = {
  face_check_enabled: boolean;
  lighting_check_enabled: boolean;
};

export default function AdminPage() {
  const [config, setConfig] = useState<ConfigType | null>(null);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      const data = await getConfig();
      setConfig(data);
    }
    fetchConfig();
  }, []);

  const toggle = async (key: keyof ConfigType) => {
    if (!config) return;
    setLoadingKey(key);
    const newConfig = { ...config, [key]: !config[key] };
    await updateConfig(newConfig);
    setConfig(newConfig);
    setLoadingKey(null);
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading configuration...
      </div>
    );
  }

  return (
    <AdminLayout title="Admin Panel" subtitle="Manage your application settings">
      <ConfigCard
        title="Face Center Check"
        description="Automatically verify if faces are properly centered in the frame"
        isEnabled={config.face_check_enabled}
        isLoading={loadingKey === "face_check_enabled"}
        onToggle={() => toggle("face_check_enabled")}
      />
      <ConfigCard
        title="Lighting Check"
        description="Monitor and validate lighting conditions for optimal image quality"
        isEnabled={config.lighting_check_enabled}
        isLoading={loadingKey === "lighting_check_enabled"}
        onToggle={() => toggle("lighting_check_enabled")}
      />
    </AdminLayout>
  );
}