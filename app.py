from flask import Flask,render_template,request,jsonify, redirect,url_for

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('main/home.html')

@app.route('/joki/<game>')
def joki(game):
    return render_template('main/joki.html')
@app.route('/testimoni')
def testimoni():
    return render_template('main/testimoni.html')

if __name__ == '__main__':
    app.run(debug=True)