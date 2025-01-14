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

const songs = [
  {
    id: 1,
    title: "Entre Dos Tierras",
    artist: "Héroes del Silencio",
    album: "Senderos de Traición",
    duration: "4:37",
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VTIPbvPfepzWCrisy7d0HsdmZaPGHN.png"
  },
  {
    id: 2,
    title: "La Flaca",
    artist: "Jarabe de Palo",
    album: "La Flaca",
    duration: "4:08",
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VTIPbvPfepzWCrisy7d0HsdmZaPGHN.png"
  },
  {
    id: 3,
    title: "The Line",
    artist: "Twenty One Pilots",
    album: "The Line",
    duration: "3:12",
    cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VTIPbvPfepzWCrisy7d0HsdmZaPGHN.png"
  },
]

export function LibraryTable() {
  return (
    <div className="p-6">
      <Heading size="xl" className="mb-4">Tu Biblioteca</Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>TÍTULO</TableHead>
            <TableHead>ARTISTA</TableHead>
            <TableHead>ÁLBUM</TableHead>
            <TableHead className="text-right">DURACIÓN</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {songs.map((song) => (
            <TableRow key={song.id}>
              <TableCell>{song.id}</TableCell>
              <TableCell className="flex items-center gap-3">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="h-10 w-10 rounded"
                />
                {song.title}
              </TableCell>
              <TableCell>{song.artist}</TableCell>
              <TableCell>{song.album}</TableCell>
              <TableCell className="text-right">{song.duration}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
