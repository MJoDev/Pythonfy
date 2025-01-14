import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import React, { useEffect } from 'react'
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
  const { currentSong, setCurrentSong, progress, setProgress, isPlaying, setIsPlaying } = useSongContext();

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
        console.log(data.current_time)
      }, 1000);
      
      return () => clearInterval(interval);
    }, []);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
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
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Shuffle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full bg-white text-black hover:bg-white/90 transition-opacity hover:opacity-50">
              {isPlaying ? <Pause className="h-6 w-6 " onClick={handlePause} /> : <Play onClick={handleResume} className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Repeat className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-96">
            <span className="text-xs text-zinc-400">{formatTime(progress.currentTime)}</span>
            <Slider
              value={[Math.floor(progress.currentTime)]}
              max={Math.floor(progress.duration)}
              step={1}
              className="cursor-pointer"
            />
            <span className="text-xs text-zinc-400">{formatTime(progress.duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-32">
          <Volume2 className="h-5 w-5" />
          <Slider
            value={[100]}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

