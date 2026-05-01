import sqlite3
conn = sqlite3.connect("database.sqlite")
cursor = conn.cursor()
#cursor.execute("SELECT game_id, COUNT(*) FROM Characters GROUP BY game_id;")
print(cursor.fetchall())

from flask import Flask, render_template
import os
print(os.path.abspath("database.sqlite"))


app=Flask(__name__)