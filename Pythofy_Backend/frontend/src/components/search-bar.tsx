import { Search, Settings, User } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState } from 'react'

export function SearchBar({ searchTerm, setSearchTerm }) {

  return (
    <div className="flex items-center justify-between w-full px-4 py-2 bg-zinc-900">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar canciones, artistas o álbumes"
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        {
          /*
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          */
        }
        
      </div>
    </div>
  );
}
