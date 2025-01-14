import os
import json

DATA_FILE = "songs_data.json"

def load_songs():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as file:
            return json.load(file)
    return {"folder": "", "songs": []}

def save_songs(folder):
    if not os.path.exists(folder):
        return {"error": "Invalid folder path"}

    mp3_files = [f for f in os.listdir(folder) if f.endswith(".mp3")]
    data = {"folder": folder, "songs": mp3_files}
    with open(DATA_FILE, "w") as file:
        json.dump(data, file, indent=4)
    return {"message": "Songs saved successfully!", "songs": mp3_files}
