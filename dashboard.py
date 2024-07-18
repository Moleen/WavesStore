from flask import Blueprint, render_template, request,redirect, url_for, jsonify

dashboard = Blueprint('dashboard', __name__)

@dashboard.route('/dashboard')
def dashboard_():
    return render_template('dashboard/dashboard.html')
@dashboard.route('/items')
def items():
    return render_template('dashboard/items.html')
@dashboard.route('/testimoni_dashboard')
def testimoni_dashboard():
    return render_template('dashboard/testimoni_dashboard.html')
@dashboard.route('/setting')
def setting():
    return render_template('dashboard/setting.html')