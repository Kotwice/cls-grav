from flask import Flask
from app.src.postgres import DataBase

app = Flask(__name__, static_url_path = '/static')
database = DataBase()

from app import views
