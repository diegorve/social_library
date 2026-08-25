from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SaveLink(BaseModel):
    url: str

@app.get("/")
def home():
    return {"message": "API funcionando"}

@app.post("/save")
def save_url(data: SaveLink):
    print(data.url)

    return {
        "success": True,
        "url": data.url
    }