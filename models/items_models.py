from db import mysql
import uuid
from datetime import datetime
import traceback

def insert_game(data):
    id_image=uuid.uuid1()
    id_game=uuid.uuid4()
    upload_date = datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    cursor = mysql.connection.cursor()
    try:
        insert_image_game = "INSERT INTO images (id_image, image, date_upload, categories) VALUES (%s,%s, %s, %s)"
        data_insert_image_game = (id_image, data['image_name'], upload_date, 'items')
        cursor.execute(insert_image_game, data_insert_image_game)

        insert_game= "INSERT INTO games (id_game, id_image, game_name, deskripsi_game, categories) VALUES (%s,%s, %s, %s, %s)"
        data_insert_game = (id_game, id_image, data['game_name'], data['desc_game'], data['categories_game'])

        cursor.execute(insert_image_game, data_insert_image_game)
        cursor.execute(insert_game, data_insert_game)

        mysql.connection.commit()
        cursor.close()
        print('success')
    except Exception as e:
        print(traceback.format_exc())
        print(f"Error in {__file__} - {e}")
