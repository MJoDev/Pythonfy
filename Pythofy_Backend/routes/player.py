from flask import Blueprint, request, jsonify
from utils import play_song, pause_song, resume_song, get_progress
import os

player_bp = Blueprint("player", __name__)

@player_bp.route("/play", methods=["POST"])
def play():
    song_path = request.json.get("song_path")
    return jsonify(play_song(song_path))

@player_bp.route("/pause", methods=["POST"])
def pause():
    return jsonify(pause_song())

@player_bp.route("/resume", methods=["POST"])
def resume():
    return jsonify(resume_song())

@player_bp.route("/progress", methods=["GET"])
def progress():
    return jsonify(get_progress())

@player_bp.route('/select-folder', methods=['POST'])
def select_folder():
    data = request.get_json()
    folder_path = data.get('folder_path', '')

    if not folder_path:
        return jsonify({'error': 'No folder path provided'}), 400

    try:
        files = os.listdir(folder_path)
        # Filtrar solo archivos mp3 si es necesario
        mp3_files = [file for file in files if file.endswith('.mp3')]
        return jsonify({'files': mp3_files, 'folder': folder_path})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
