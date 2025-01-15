import { Home, Search, FolderPlus, Music, Download, List } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import React, { useRef, useState, useEffect } from 'react'
import { useSongContext } from '@/components/providers/songcontext'

export function Sidebar({ className }) {
  const { songs, setSongs, folderPath, setFolderPath, setShuffledSongs, folders, setFolders } = useSongContext();
  const fileInputRef = useRef(null);

  const handleFolderSelection = async (event) => {
    const path = window.prompt('Enter the folder path:');
    if (!path) return;
    setFolderPath(path);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/select-folder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder_path: path }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setSongs(data.files);
        setShuffledSongs([...data.files].sort(() => Math.random() - 0.5));
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/folders`);
        const folderData = await response.json();
        setFolders(folderData);
      }
    } catch (error) {
      console.error("Error selecting folder:", error);
    }
  };

  const onFolderSelect = async (folderPath) => {
    try {
      setFolderPath(folderPath);
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/select-folder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder_path: folderPath }),
      });
  
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        setSongs(data.files);
        setShuffledSongs([...data.files].sort(() => Math.random() - 0.5));
      }
    } catch (error) {
      console.error("Error al seleccionar carpeta:", error);
    }
  };

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/folders`);
        const data = await response.json();
        setFolders(data);
      } catch (error) {
        console.error("Error fetching folders:", error);
      }
    };

    fetchFolders();
  }, []);


  

  return (
    <div className={cn("pb-12 w-60 min-h-screen bg-black fixed", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <img src='./pythofywhitelogo.png' alt='pythonfy logo' className='w-12 h-12 m-4'></img>
          {/* 
          <Heading className="mb-2 px-4">Menú</Heading>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Inicio
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Search className="mr-2 h-4 w-4" />
              Buscar
            </Button>
          </div>
          */}
          
        </div>
        <div className="px-3 py-2">
          <Heading className="mb-2 px-4">Carpetas</Heading>
          <div className="space-y-1">
            <Button key="Add" variant="ghost" className="w-full justify-start" onClick={handleFolderSelection}>
              <FolderPlus className="mr-2 h-4 w-4" />
              Agregar Ruta
            </Button>
            {folders.map((folder) => (
              <Button key={folder.path || folder.name} variant="ghost" className="w-full justify-start" onClick={() => onFolderSelect(folder.path)}>
                <Music className="mr-2 h-4 w-4" />
                {folder.path.split(/[\\/]/).pop()}
              </Button>
            ))}
          </div>
        </div>
        {/* 
        <div className="px-3 py-2">
          <Heading className="mb-2 px-4">Playlists</Heading>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <List className="mr-2 h-4 w-4" />
              Favoritos
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <List className="mr-2 h-4 w-4" />
              Rock Español
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <List className="mr-2 h-4 w-4" />
              Pop Latino
            </Button>
          </div>
          
        </div>
        */}
      </div>
    </div>
  )
}
