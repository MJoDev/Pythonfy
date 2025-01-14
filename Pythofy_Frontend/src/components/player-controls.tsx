import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import React from 'react'

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

export function PlayerControls({ playerData }: PlayerControlsProps) {
  const { currentSong, isPlaying, currentTime, duration, volume } = playerData;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img
            src={currentSong.cover}
            alt={`${currentSong.title} album cover`}
            className="h-14 w-14 rounded"
          />
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
            <Button size="icon" className="rounded-full bg-white text-black hover:bg-white/90">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <SkipForward className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-zinc-400">
              <Repeat className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 w-96">
            <span className="text-xs text-zinc-400">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              className="cursor-pointer"
            />
            <span className="text-xs text-zinc-400">{formatTime(duration)}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-32">
          <Volume2 className="h-5 w-5" />
          <Slider
            value={[volume]}
            max={100}
            step={1}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

