CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE camera_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  face_check_enabled BOOLEAN NOT NULL DEFAULT true,
  lighting_check_enabled BOOLEAN NOT NULL DEFAULT true
);

INSERT INTO camera_config (id, face_check_enabled, lighting_check_enabled)
VALUES (gen_random_uuid(), true, true);
