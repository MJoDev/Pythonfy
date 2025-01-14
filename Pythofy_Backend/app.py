import os
from flask import Flask, redirect
from routes import songs_bp, player_bp
import webview
import threading
from flask_cors import CORS

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


def start_flask():
    app.run(debug=False, use_reloader=False, port=5000)

if __name__ == "__main__":
    flask_thread = threading.Thread(target=start_flask)
    flask_thread.daemon = True
    flask_thread.start()

    webview.create_window("Offline Spotify", "http://localhost:5000", width=1200, height=800)
    webview.start()
