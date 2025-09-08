from fastapi import APIRouter, HTTPException
from passlib.context import CryptContext
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# simulação de "banco de dados" em memória
fake_users_db = {}

class User(BaseModel):
    username: str
    password: str

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/register")
def register(user: User):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Usuário já existe")
    fake_users_db[user.username] = hash_password(user.password)
    return {"msg": "Usuário registrado com sucesso"}

@router.post("/login")
def login(user: User):
    if user.username not in fake_users_db:
        raise HTTPException(status_code=400, detail="Usuário não encontrado")
    if not verify_password(user.password, fake_users_db[user.username]):
        raise HTTPException(status_code=400, detail="Senha incorreta")
    return {"msg": f"Bem-vindo, {user.username}!"}
