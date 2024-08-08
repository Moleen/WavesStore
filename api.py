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

@api.route('/api/items/add_new_game', methods=['POST'])
def save_game_edit():
    game_image = request.files['input_image_new_game']
    game_name = request.form.get('input_name_new_game')
    desc_name = request.form.get('new_game_desc_input')
    categories = request.form.get('categories')
    if not game_image:
        return jsonify({
            'result' : 'unsucces',
            'msg' : 'Masukkan gambar game'
            })
    elif not game_name:
        return jsonify({
            'result' : 'unsucces',
            'msg' : 'Masukkan nama game'
            })
    elif not desc_name:
        return jsonify({
            'result' : 'unsucces',
            'msg' : 'Masukkan deskripsi game'
            })
    try:
        extension = game_image.filename.split('.')[-1]
        upload_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
        gambar_name = f'game_{categories}-{upload_date}.{extension}'
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

@api.route('/api/items/get_game_data', methods=['POST'])
def get_game_data():
    id_game = request.form.get('id_game')
    data = items_models.get_game_by_id(id_game)
    return jsonify(data)

@api.route('/api/items/delete_game', methods=['POST'])
def delete_game():
    id_game = request.form.get('id_game')
    items_models.delete_game_by_id(id_game)
    return f'{id_game} deleted'