const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getConfig() {
  const res = await fetch(`${API_BASE}/config`);
  return res.json();
}

export async function updateConfig(config: {
  face_check_enabled: boolean;
  lighting_check_enabled: boolean;
}) {
  const res = await fetch(`${API_BASE}/config`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(config),
  });
  return res.json();
}
