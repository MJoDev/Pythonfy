import pygame
import time
import os
from flask import Flask, jsonify, request
import threading
# Variables globales
current_time = 0
song_duration = 0
is_playing = False
playlists = {}
current_song_path = None
# Actualiza el código de reproducción para iniciar el hilo
def play_song(song_path):
    global current_time, song_duration, is_playing, current_song_path
    if not song_path or not os.path.exists(song_path):
        return {"error": "File not found"}
    if current_song_path is None:
        current_song_path = os.path.dirname(song_path)  # Obtén la ruta de la carpeta
    pygame.mixer.init()
    pygame.mixer.music.load(song_path)
    pygame.mixer.music.play()
    song_duration = pygame.mixer.Sound(song_path).get_length()
    current_time = 0
    is_playing = True
    
    return {"message": "Playing song", "duration": song_duration}

def pause_song():
    global is_playing
    pygame.mixer.music.pause()
    is_playing = False
    return {"message": "Paused"}

def resume_song():
    global is_playing
    pygame.mixer.music.unpause()
    is_playing = True
    return {"message": "Resumed"}

def get_progress():
    global current_time, song_duration, is_playing
    if is_playing:
        current_time += 1  
    return {"current_time": current_time, "duration": song_duration}

def set_volume():
    # Obtener el valor del volumen desde la solicitud
    volume = request.json.get("volume", 1.0)  # Por defecto, volumen al 100%

    # Asegurarse de que el volumen esté entre 0.0 y 1.0
    if 0.0 <= volume <= 1.0:
        pygame.mixer.music.set_volume(volume)
        return jsonify({"message": "Volume set", "volume": volume}), 200
    else:
        return jsonify({"error": "Invalid volume. It must be between 0.0 and 1.0"}), 400

def set_time():
    global current_time, song_duration
    try:
        data = request.json
        print(f"Request data: {data}")  # Debugging

        new_time = data.get("time")
        if not isinstance(new_time, (int, float)) or new_time < 0 or new_time > song_duration:
            return jsonify({"error": "Invalid time value"}), 400

        pygame.mixer.music.stop()
        pygame.mixer.music.play(start=new_time)
        current_time = new_time
        print(f"Playback set to {new_time} seconds")  # Debugging

        # Asegúrate de que esto sea un diccionario simple
        response = {"message": f"Set playback time to {new_time} seconds", "current_time": current_time}
        print(f"Response to serialize: {response}")
        return response

    except Exception as e:
        print(f"Error in set_time: {e}")  # Debugging
        return jsonify({"error": str(e)}), 500

