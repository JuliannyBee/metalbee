from fastapi import FastAPI
from app import auth

app = FastAPI(title="MetalBee API")

app.include_router(auth.router)

@app.get("/")
def read_root():
    return {"message": "API funcionando!"}