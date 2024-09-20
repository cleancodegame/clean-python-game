##Task 40
##task40.py

import sqlite3

def get_user(username):
    conn = sqlite3.connect('example.db')
    cursor = conn.cursor()

    ##replace complex
    query = f"SELECT * FROM users WHERE username = '{username}'"
    cursor.execute(query)
    ##with
    cursor.execute("SELECT * FROM users WHERE username = ?", (username,))
    ##end
    
    return cursor.fetchall()

get_user("admin'; DROP TABLE users; --")
