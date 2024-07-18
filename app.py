from flask import Flask,render_template,request,jsonify, redirect,url_for
import dashboard
from db import init_db
import models


app = Flask(__name__)
init_db(app)

@app.route('/')
def home():
    user = models.get_users()
    return render_template('main/home.html',user=user)

@app.route('/joki/<game>')
def joki(game):
    return render_template('main/joki.html')

@app.route('/testimoni')
def testimoni():
    return render_template('main/testimoni.html')

app.register_blueprint(dashboard.dashboard)

if __name__ == '__main__':
    app.run(debug=True)