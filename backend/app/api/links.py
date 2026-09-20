from app.schemas.schemas import SaveLinkRequest
from app.database.database import get_db
from app.models.models import SavedLink

from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/save")
def save_url(
    data: SaveLinkRequest,
    db: Session = Depends(get_db)
):
    new_link = SavedLink(
        url=data.url,
        title=data.title,
        platform=data.platform,
        saved_at=data.saved_at
    )

    db.add(new_link)

    db.commit()

    db.refresh(new_link)

    return {
        "success": True,
        "id": new_link.id
    }

