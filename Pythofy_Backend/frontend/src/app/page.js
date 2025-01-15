"use client"
import React, { useEffect, useState } from 'react';
import { Sidebar } from "@/components/sidebar";
import { SearchBar} from "@/components/search-bar";
import { LibraryTable } from "@/components/library-table";
import { PlayerControls } from "@/components/player-controls";
import { useSongContext } from '@/components/providers/songcontext';

const FolderSelector = () => {
  const {songs} = useSongContext();
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredSongs = searchTerm
    ? songs.filter((song) =>
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.album.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : songs; // Si searchTerm está vacío, devolver todas las canciones
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
          <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-60">
              <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              <LibraryTable filteredSongs={filteredSongs}/>
            </div>
          </div>
          <PlayerControls />
    </div>
  );
};

export default FolderSelector;
