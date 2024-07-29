from flask import Flask,render_template,request,jsonify, redirect,url_for
import dashboard
import api
from db import init_db
from models import dashboard_models


app = Flask(__name__)
init_db(app)

@app.route('/')
def home():
    images = dashboard_models.get_image()
    return render_template('main/home.html',images=images)

@app.route('/joki/<game>')
def joki(game):
    return render_template('main/joki.html')

@app.route('/testimoni')
def testimoni():
    return render_template('main/testimoni.html')

app.register_blueprint(dashboard.dashboard)
app.register_blueprint(api.api)

if __name__ == '__main__':
    app.run(debug=True)