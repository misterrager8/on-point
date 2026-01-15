import os

import dotenv

dotenv.load_dotenv()

PORT = os.getenv("port") or "7194"
SQLALCHEMY_DATABASE_URI = os.getenv("db")
SECRET_KEY = os.getenv("secret_key")
