import { Heading } from "@/components/ui/heading"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { useSongContext } from '@/components/providers/songcontext';
import { Play } from "lucide-react";


export function LibraryTable() {
  const { songs, setCurrentSong, setProgress, setIsPlaying, folderPath } = useSongContext();

  const handlePlaySong = async (song) => {
    setCurrentSong(song);
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/play`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ song_path: `${folderPath}/${song}` }),
    });
    const data = await response.json();
    if (data.duration) {
      setProgress({ currentTime: 0, duration: data.duration });
      setIsPlaying(true);
    }
  };


  return (
    <div className="p-6">
      <Heading size="xl" className="mb-4">Tu Biblioteca</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead></TableHead>
            <TableHead>TÍTULO</TableHead>
            <TableHead>ARTISTA</TableHead>
            <TableHead>ÁLBUM</TableHead>
            <TableHead className="text-right">DURACIÓN</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell><button>
                <Play className="h-5 w-5 transition-opacity hover:opacity-50" onClick={() => handlePlaySong(song)}></Play>
                </button></TableCell>
              <TableCell className="flex items-center gap-3">
                <img
                  src="./placeholder.png"
                  alt={song}
                  className="h-10 w-10 rounded"
                />
                {song}
              </TableCell>
              <TableCell>Unknown Artist</TableCell>
              <TableCell>Unknown Album</TableCell>
              <TableCell className="text-right">Unknown duration</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
