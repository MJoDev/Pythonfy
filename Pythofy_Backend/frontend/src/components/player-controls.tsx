import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat1, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import React, { useEffect, useRef, useState } from 'react'
import { useSongContext } from '@/components/providers/songcontext'

interface PlayerControlsProps {
  playerData: {
    currentSong: {
      title: string;
      artist: string;
      album: string;
      cover: string;
    };
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    volume: number;
  }
}

export function PlayerControls() {
  const { songs, currentSong, setCurrentSong, progress, setProgress, isPlaying, setIsPlaying, folderPath, shuffledSongs } = useSongContext();
  const [volume, setVolume] = useState(1);
  const [isShufflePressed, setIsShufflePressed] = useState(false);
  const [isRepeatPressed, setIsRepeatPressed] = useState(false);
  const [ valueNextSong, setValueNextSong ] = useState(1);
  const [ valuePreviousSong, setValuePreviousSong ] = useState(-1);
  const currentSongRef = useRef(currentSong);
  const shuffledSongsRef = useRef([]);
  const songsRef = useRef([]);
  const [isChangingSong, setIsChangingSong] = useState(false);

  useEffect(() => {
    currentSongRef.current = currentSong;
    shuffledSongsRef.current = shuffledSongs;
    songsRef.current = songs;
  }, [currentSong, shuffledSongs, songs]);

  const handlePause = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/pause`, { method: 'POST' });
    setIsPlaying(false);
  };

  const handleResume = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/resume`, { method: 'POST' });
    setIsPlaying(true);
  };

  useEffect(() => {
      
      const interval = setInterval(async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/progress`);
        const data = await response.json();
        setProgress((prevProgress) => ({
          currentTime: data.current_time,
          duration: data.duration,
        }));
        if (data.current_time >= data.duration) {
          console.log("SE ESTA EJECUTANDO ESTA MIERDAAAA");
    
          const songsToPlay = isShufflePressed ? shuffledSongsRef.current : songsRef.current;
    
          if (songsToPlay.length > 0) {
            ChangeSong(valueNextSong, songsToPlay);
          } else {
            console.log("No hay canciones disponibles en el Effect.");
          }
        }
        
        console.log(data.current_time)
      }, 1000);
      
      return () => clearInterval(interval);
    }, []);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = async (time) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/set-time`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ time: time }),
      });
      const data = await response.json();
  
      if (response.ok) {
        if (data.current_time !== undefined) {
          setProgress({ ...progress, currentTime: data.current_time });
        }
      } else {
        console.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to seek:", error);
    }
  };

  const handleVolumeChange = async (newVolume) => {
    setVolume(newVolume);
    console.log(newVolume)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/set-volume`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ volume: newVolume }),
      });
      const data = await response.json();
  
      if (response.ok) {
        if (data.volume !== undefined) {
          setProgress({ ...progress, volume: data.volume });
        }
      } else {
        console.error(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Failed to change volume:", error);
    }
  }

  const ChangeSong = async (valueChange, songsToPlay) => {
    if (isChangingSong) return; // Evitar ejecutar si ya se está cambiando la canción
  
    setIsChangingSong(true); // Establecer que se está cambiando la canción
    if (!songsToPlay || songsToPlay.length === 0) {
      console.log("No hay canciones disponibles.");
      return; // O cualquier otra acción que prefieras (ej. mostrar un mensaje al usuario)
    }
    const currentIndex = songsToPlay.findIndex(
      (song) => song.filename === currentSongRef.current.filename
    );
    let nextIndex = currentIndex + valueChange;
    
    // Ajustar el índice para que sea cíclico
    if (nextIndex >= songsToPlay.length) {
      nextIndex = 0; // Volver al inicio
    } else if (nextIndex < 0) {
      nextIndex = songsToPlay.length - 1; // Ir al final
    }
  
    const nextSong = songsToPlay[nextIndex];
    setCurrentSong(nextSong);
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/play`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_path: `${folderPath}/${nextSong.filename}` }),
    });
    const data = await response.json();
    if (data.duration) {
      setProgress({ currentTime: 0, duration: data.duration });
      setIsPlaying(true);
      setIsChangingSong(false); // Resetear estado una vez que la canción se cambió
    }
  };
  
  

  const handleShuffleClick = () => {
    // Cambiar el estado de apretado a su valor opuesto
    setIsShufflePressed((prev) => !prev);
    console.log("Shuffle clicked!");
  };

  const handleRepeatClick = () => {
    setIsRepeatPressed((prev) => {
      const newState = !prev;
      
      // Actualizar los valores de las canciones según el nuevo estado
      if (newState) {
        setValueNextSong(0);
        setValuePreviousSong(0);
      } else {
        setValueNextSong(1);
        setValuePreviousSong(-1);
      }
      
      return newState;
    });
  };
  

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentSong.cover ? (
            <img
            src={currentSong.cover}
            alt={`${currentSong} album cover`}
            className="h-14 w-14 rounded"
          />
          ) : (
            <img
            src="./placeholder.png"
            alt={`${currentSong} album cover`}
            className="h-14 w-14 rounded"
          />
          )}
          
          <div>
            <h3 className="font-medium">{currentSong.title}</h3>
            <p className="text-sm text-zinc-400">{currentSong.artist}</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="icon" className={`text-zinc-400 ${isShufflePressed ? "bg-zinc-600" : ""}`} onClick={handleShuffleClick}>
              <Shuffle className="h-5 w-5" />
            </Button>
            
            {
              isShufflePressed 
              ? <Button variant="ghost" size="icon" onClick={() => ChangeSong(valuePreviousSong, shuffledSongs)} className="text-zinc-400">
                  <SkipBack className="h-5 w-5" />
                </Button>
              : <Button variant="ghost" size="icon" onClick={() => ChangeSong(valuePreviousSong, songs)} className="text-zinc-400">
                  <SkipBack className="h-5 w-5" />
                </Button>
            }
            <Button size="icon" className="rounded-full bg-white text-black hover:bg-white/90 transition-opacity hover:opacity-50">
              {isPlaying ? <Pause className="h-6 w-6 " onClick={handlePause} /> : <Play onClick={handleResume} className="h-6 w-6" />}
            </Button>
            {
              isShufflePressed 
              ? <Button variant="ghost" size="icon" onClick={() => ChangeSong(valueNextSong, shuffledSongs)} className="text-zinc-400">
                  <SkipForward className="h-5 w-5" />
                </Button>
              : <Button variant="ghost" size="icon" onClick={() => ChangeSong(valueNextSong, songs)} className="text-zinc-400">
                  <SkipForward className="h-5 w-5" />
                </Button>
            }
            <Button variant="ghost" size="icon" className={`text-zinc-400 ${isRepeatPressed ? "bg-zinc-600" : ""}`} onClick={handleRepeatClick}>
              <Repeat1 className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-96">
            <span className="text-xs text-zinc-400">{formatTime(progress.currentTime)}</span>
            <Slider
                value={[Math.floor(progress.currentTime)]}
                max={Math.floor(progress.duration)}
                step={1}
                className="cursor-pointer"
                onValueChange={(value) => handleSeek(value[0])}
              />
            <span className="text-xs text-zinc-400">{formatTime(progress.duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-32">
          <Volume2 className="h-5 w-5" />
          <Slider
            value={[volume]}
            max={1}
            step={0.10}
            className="cursor-pointer"
            onValueChange={(value) => handleVolumeChange(value[0])}
          />
        </div>
      </div>
    </div>
  )
}

