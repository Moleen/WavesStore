from flask import Blueprint, render_template, request,redirect, url_for, jsonify
from models import dashboard_models

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard')
def dashboard_():
    images = dashboard_models.get_image()
    return render_template('dashboard/dashboard.html',images = images)

@dashboard.route('/items/joki_game')
def joki():
    return render_template('dashboard/joki.html')

@dashboard.route('/items/topup')
def top_up():
    return render_template('dashboard/topup.html')

@dashboard.route('/testimoni_dashboard')
def testimoni_dashboard():
    return render_template('dashboard/testimoni_dashboard.html')

@dashboard.route('/setting')
def setting():
    return render_template('dashboard/setting.html')