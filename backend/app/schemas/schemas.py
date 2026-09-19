from pydantic import BaseModel
from datetime import datetime

class SaveLinkRequest(BaseModel):
    url: str
    title: str
    platform: str
    saved_at: datetime
