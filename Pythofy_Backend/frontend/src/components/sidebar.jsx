import { Home, Search, FolderPlus, Music, Download, List } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import React, { useRef, useState } from 'react'
import { useSongContext } from '@/components/providers/songcontext'

export function Sidebar({ className }) {
  const { songs, setSongs, folderPath, setFolderPath } = useSongContext();
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
      }
    } catch (error) {
      console.error("Error selecting folder:", error);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Dispara el clic en el input invisible
    }
  };

  return (
    <div className={cn("pb-12 w-60 min-h-screen bg-black fixed", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
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
        </div>
        <div className="px-3 py-2">
          <Heading className="mb-2 px-4">Carpetas</Heading>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" onClick={triggerFileInput}>
            <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFolderSelection}
                  style={{ display: 'none' }} // Lo ocultamos visualmente
                  onClick={(e) => e.stopPropagation()} // Previene la propagación del click al body
                  // Cast a cualquier HTMLInputElement que permita webkitdirectory
                  webkitdirectory = "true"
                />

              <FolderPlus className="mr-2 h-4 w-4" />
              Agregar Ruta
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Music className="mr-2 h-4 w-4" />
              Música
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Download className="mr-2 h-4 w-4" />
              Descargas
            </Button>
          </div>
        </div>
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
      </div>
    </div>
  )
}
