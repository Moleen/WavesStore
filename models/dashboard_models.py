from db import mysql
import uuid

def get_image(id_target=None):
    if id_target is not None:
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM images WHERE id_image = %s", (id_target,))
            images = cursor.fetchall()
            cursor.close()
            return [{'id_image': row[0], 'image_name': row[1],'date_upload': row[1]} for row in images]
        except:
            print("cant get users")
    else:
        try:
            cursor = mysql.connection.cursor()
            cursor.execute("SELECT * FROM images")
            images = cursor.fetchall()
            cursor.close()
            return [{'id_image': row[0], 'image_name': row[1],'date_upload': row[1]} for row in images]
        except:
            print("cant get users")

def delete_image(id_image):
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("DELETE FROM images WHERE id_image = %s", (id_image,))
        mysql.connection.commit()
        cursor.close()
        return 'success'
    except Exception as e:
        print("cant get users",e)

def insert_image(name,date):
    id_image=uuid.uuid1()
    try:
        cursor = mysql.connection.cursor()
        sql = "INSERT INTO images (id_image,image, date_upload) VALUES (%s,%s, %s)"
        data = (id_image,name, date)
        cursor.execute(sql, data)
        mysql.connection.commit()
        cursor.close()
        print('success')
    except Exception as e:
        print("cant get users:",e)