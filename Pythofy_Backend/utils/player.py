import pygame
import time
import os

# Variables globales
current_time = 0
song_duration = 0
is_playing = False

def play_song(song_path):
    global current_time, song_duration, is_playing
    if not song_path or not os.path.exists(song_path):
        return {"error": "File not found"}

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
    global current_time, song_duration
    return {"current_time": current_time, "duration": song_duration}
