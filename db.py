from flask_mysqldb import MySQL
from config import Config

mysql = MySQL()

def init_db(app):
    app.config.from_object('config.Config')
    mysql.init_app(app)
