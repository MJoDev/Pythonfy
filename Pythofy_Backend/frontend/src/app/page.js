"use client"
import React, { useEffect, useState } from 'react';
import { Sidebar } from "@/components/sidebar";
import { SearchBar} from "@/components/search-bar";
import { LibraryTable } from "@/components/library-table";
import { PlayerControls } from "@/components/player-controls";
import { useSongContext } from '@/components/providers/songcontext';

const FolderSelector = () => {

  
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <SearchBar />
              <LibraryTable/>
            </div>
          </div>
          <PlayerControls playerData={playerData} />
    </div>
  );
};

export default FolderSelector;
