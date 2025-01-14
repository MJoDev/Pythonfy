from flask import Blueprint, request, jsonify
from utils import load_songs, save_songs, play_song


songs_bp = Blueprint("songs", __name__)

@songs_bp.route("/get-saved-songs", methods=["GET"])
def get_saved_songs():
    return jsonify(load_songs())

@songs_bp.route("/save-songs", methods=["POST"])
def save_songs_route():
    data = request.json
    folder = data.get("folder_path")
    if not folder:
        return jsonify({"error": "No folder path provided"}), 400
    saved_data = save_songs(folder)
    return jsonify(saved_data)
