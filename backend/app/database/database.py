import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base

load_dotenv() # Carga las variables de entorno desde el archivo .env

if not os.getenv("DATABASE_URL"): # Verifica si la variable de entorno DATABASE_URL está configurada
    raise ValueError("DATABASE_URL is not set in the environment variables.") # Si no se cumple la ejecución, se lanza un error indicando que la variable de entorno DATABASE_URL no está configurada.

DATABASE_URL = (
    os.getenv("DATABASE_URL")
)

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()