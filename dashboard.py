from flask import Blueprint, render_template, request,redirect, url_for, jsonify
from models import dashboard_models,items_models

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard')
def dashboard_():
    images = dashboard_models.get_image()
    return render_template('dashboard/dashboard.html',images = images)

@dashboard.route('/items/joki_game')
def joki():
    games_joki = items_models.get_game('joki')
    return render_template('dashboard/joki.html',games_joki = games_joki)

@dashboard.route('/items/topup')
def top_up():
    games_topup = items_models.get_game('topup')
    return render_template('dashboard/topup.html',games_topup = games_topup)

@dashboard.route('/testimoni_dashboard')
def testimoni_dashboard():
    return render_template('dashboard/testimoni_dashboard.html')

@dashboard.route('/setting')
def setting():
    return render_template('dashboard/setting.html')