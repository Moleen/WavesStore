from flask import Blueprint, render_template, request,redirect, url_for, jsonify
from datetime import datetime
from models import dashboard_models,items_models
import os

api = Blueprint('api', __name__)

@api.route('/api/dashboard/add_image_slideshow', methods=['POST'])
def add_image_slideshow():
    if 'image' not in request.files:
        return "harap masukkan gambar"

    try:
        file = request.files['image']
        extension = file.filename.split('.')[-1]
        upload_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        gambar_name = f'slideshow-{upload_date}.{extension}'
        file.save(f'static/image/slideshow/{gambar_name}')
        dashboard_models.insert_image(gambar_name,upload_date)
        return jsonify({
            'status':'success',
        })
    except Exception as e:
        return jsonify({
            'result' : 'unsucces',
            'msg' : f'Masukkan gambar : {e}'
        }) 
    
@api.route('/api/dashboard/delete_image_slideshow', methods=['POST'])
def delete_image_slideshow():
    target = request.form.get('target')
    images = dashboard_models.get_image(target)
    dashboard_models.delete_image(target)
    print(images[0])
    os.remove(f'static/image/slideshow/{images[0]['image_name']}')
    return jsonify({
        'status':'success'
        })

@api.route('/api/items/save_game_edit', methods=['POST'])
def save_game_edit():
    game_image = request.files['image_game']
    game_name = request.form.get('name_game')
    desc_name = request.form.get('desc_game')
    categories = request.form.get('categories')
    if game_image and game_name and desc_name:
        # Mencoba menyimpan file gambar
        try:
            extension = game_image.filename.split('.')[-1]
            upload_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
            gambar_name = f'game_joki-{upload_date}.{extension}'
            game_image.save(f'static/image/game/{gambar_name}')
        except Exception as e:
            return f"{e}"
        
        # Menyimpan data ke database
        data_insert = {
            'image_name': gambar_name,
            'game_name': game_name,
            'desc_game': desc_name,
            'categories_game': categories,
        }
        items_models.insert_game(data_insert)
        return "success"
    else:
        return 'unsuccess'