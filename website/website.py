import sqlite3
conn = sqlite3.connect("database.sqlite")
cursor = conn.cursor()
#cursor.execute("SELECT * FROM users")
users = cursor.fetchall()  
from flask import Flask
app = Flask(__name__)   

@app.route('/')
def home():
    return "Welcome to the website!"