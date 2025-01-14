import eyed3

# Ruta del archivo MP3 que sabes que tiene portada
file_path = "G:/phon/cubone.mp3"

audio = eyed3.load(file_path)

# Verifica los marcos presentes en el archivo
print("Marcos en el archivo MP3:", audio.tag.frame_set.keys())

# Buscar la portada
cover_data = None
for tag in audio.tag.frame_set:
    frame = audio.tag.frame_set[tag]
    for item in frame:
        if isinstance(item, eyed3.id3.frames.ImageFrame):  # Verificar si el item es una imagen
            if item.mime_type == 'image/jpeg':  # Verificamos el tipo MIME (o usar otro tipo si es necesario)
                cover_data = item.image_data
                break
    if cover_data:
        break

if cover_data:
    print("Portada encontrada!")
else:
    print("No se encontró portada.")


