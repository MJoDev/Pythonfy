import os
from flask import Flask, redirect
from routes import songs_bp, player_bp
import webview
import threading
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
app.register_blueprint(songs_bp)
app.register_blueprint(player_bp)

@app.route("/")
def index():
    return redirect("http://localhost:3000", code=302)

@app.errorhandler(404)
def not_found(e):
     return redirect("http://localhost:3000", code=302)

def init_db():
    with sqlite3.connect("folders.db") as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS folders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                folder_path TEXT NOT NULL UNIQUE
            )
        """)
        conn.commit()

init_db()


def start_flask():
    app.run(debug=False, use_reloader=False, port=5000)


if __name__ == "__main__":
    flask_thread = threading.Thread(target=start_flask)
    flask_thread.daemon = True
    flask_thread.start()

    webview.create_window("Pythonfy", "http://localhost:5000", width=1200, height=800)
    webview.start(debug=True)
