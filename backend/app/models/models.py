from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import DateTime

from sqlalchemy.sql import func

from app.database.database import Base


class SavedLink(Base):
    __tablename__ = "saved_links"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    url = Column(
        Text,
        nullable=False
    )

    platform = Column(
        Text,
        nullable=False
    )

    title = Column(
        Text,
        nullable=True
    )

    saved_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )