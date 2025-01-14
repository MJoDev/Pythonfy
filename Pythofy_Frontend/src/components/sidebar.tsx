import { Home, Search, FolderPlus, Music, Download, List } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import React from 'react'
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 w-60 bg-black", className)}>
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
            <Button variant="ghost" className="w-full justify-start">
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
