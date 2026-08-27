from fastapi import FastAPI
from fastapi import Depends

from sqlalchemy.orm import Session

from fastapi.middleware.cors import CORSMiddleware

from database import Base
from database import engine
from database import SessionLocal

from models import SavedLink

from schemas import SaveLinkRequest

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


@app.post("/save")
def save_url(
    data: SaveLinkRequest,
    db: Session = Depends(get_db)
):

    new_link = SavedLink(
        url=data.url
    )

    db.add(new_link)

    db.commit()

    db.refresh(new_link)

    return {
        "success": True,
        "id": new_link.id
    }