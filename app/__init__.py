from flask import Flask

app = Flask(__name__, static_url_path = '/static')
# app = Flask(__name__)

from app import views