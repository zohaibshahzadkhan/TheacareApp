from pydantic import BaseModel

class Config(BaseModel):
    face_check_enabled: bool
    lighting_check_enabled: bool
