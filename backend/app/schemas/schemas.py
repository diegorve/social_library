from pydantic import BaseModel
from datetime import datetime
from typing import List

class SaveLinkRequest(BaseModel):
    url: str
    platform: str
    title: str
    tags: List[str] = []
    saved_at: datetime
