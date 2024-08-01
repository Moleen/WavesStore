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
        cursor.execute(insert_game, data_insert_game)

        mysql.connection.commit()
        cursor.close()
        print('success')
    except Exception as e:
        print(traceback.format_exc())
        print(f"Error in {__file__} - {e}")

def get_game(categories):
    cursor = mysql.connection.cursor()

    try:
        cursor.execute("""
                        SELECT g.id_game, g.id_image, g.game_name, g.deskripsi_game, i.image
                        FROM games g
                        LEFT JOIN images i ON g.id_image = i.id_image
                        WHERE g.categories = %s""", (categories,)
                        )
        data_game = cursor.fetchall()
        cursor.close()
        return [
                {
                    'id_game': row[0],
                    'id_image': row[1],
                    'game_name': row[2],
                    'deskripsi_name': row[3],
                    'image': row[4]
                }
                for row in data_game
                ]
        
    except:
        print("ERROR IN CODE")
        print("-------------------------------------")
        print(traceback.format_exc())
        print("-------------------------------------")
