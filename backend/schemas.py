from pydantic import BaseModel


class SaveLinkRequest(BaseModel):
    url: str