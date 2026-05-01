from flask import Flask, send_from_directory
from pathlib import Path

app = Flask(__name__, static_folder='.')

@app.route('/')
def home():
    return send_from_directory(Path(__file__).parent, 'index.html')

if __name__ == '__main__':
    app.run(debug=True)