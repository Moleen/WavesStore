from db import mysql

def get_users():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        cursor.close()
        return users
    except:
        print("cant get users")
