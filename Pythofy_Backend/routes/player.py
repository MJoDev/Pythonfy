from flask import Blueprint, request, jsonify
from utils import play_song, pause_song, resume_song, get_progress, set_time, set_volume
import os
from mutagen import File
from mutagen.id3 import ID3, APIC
from mutagen.flac import Picture
import base64
import eyed3
import sqlite3

player_bp = Blueprint("player", __name__)
SUPPORTED_AUDIO_FORMATS = ('.mp3', '.flac', '.wav', '.aac', '.ogg', '.m4a')
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

@player_bp.route("/set-time", methods=["POST"])
def time():
    return jsonify(set_time())

@player_bp.route("/set-volume", methods=["POST"])
def volume():
    return set_volume()

@player_bp.route('/select-folder', methods=['POST'])
def select_folder():
    data = request.get_json()
    folder_path = data.get('folder_path', '')

    if not folder_path:
        return jsonify({'error': 'No folder path provided'}), 400

    if not os.path.isdir(folder_path):
        return jsonify({'error': 'Invalid folder path'}), 400

    try:
        files = os.listdir(folder_path)
        audio_files = [file for file in files if file.lower().endswith(SUPPORTED_AUDIO_FORMATS)]

        files_info = []
        for audio_file in audio_files:
            file_path = os.path.join(folder_path, audio_file)
            try:
                audio = eyed3.load(file_path)
                metadata = {
                    'filename': audio_file,
                    'title': audio.tag.title if audio.tag and audio.tag.title else os.path.splitext(audio_file)[0],
                    'artist': audio.tag.artist if audio.tag and audio.tag.artist else 'Unknown Artist',
                    'album': audio.tag.album if audio.tag and audio.tag.album else 'Unknown Album',
                }

                # Extraer duración
                metadata['duration'] = round(audio.info.time_secs, 2) if audio.info else None

                # Buscar portada embebida
                cover_data = None
                if audio.tag:
                    for tag in audio.tag.frame_set:
                        frame = audio.tag.frame_set[tag]
                        for item in frame:
                            if isinstance(item, eyed3.id3.frames.ImageFrame):
                                if item.mime_type == 'image/jpeg':  # Verificar si es una imagen JPEG
                                    cover_data = item.image_data
                                    break
                        if cover_data:
                            break

                metadata['cover'] = f"data:image/jpeg;base64,{base64.b64encode(cover_data).decode('utf-8')}" if cover_data else None

                files_info.append(metadata)
            except Exception as e:
                files_info.append({'filename': audio_file, 'error': str(e)})

        # Guardar carpeta en la base de datos
        with sqlite3.connect("folders.db") as conn:
            conn.execute("INSERT OR IGNORE INTO folders (folder_path) VALUES (?)", (folder_path,))
            conn.commit()

        return jsonify({'files': files_info, 'folder': folder_path})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@player_bp.route('/folders', methods=['GET'])
def get_folders():
    try:
        with sqlite3.connect("folders.db") as conn:
            cursor = conn.execute("SELECT id, folder_path FROM folders")
            folders = [{"id": row[0], "path": row[1]} for row in cursor.fetchall()]
        return jsonify(folders)
    except Exception as e:
        return jsonify({'error': str(e)}), 500