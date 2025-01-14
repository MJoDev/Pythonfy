import Image from "next/image";
import { Sidebar } from "@/components/sidebar";
import { SearchBar} from "@/components/search-bar";
import { LibraryTable } from "@/components/library-table";
import { PlayerControls } from "@/components/player-controls";

export default function Home() {
  const playerData={
    currentSong: {
      title: "Entre Dos Tierras",
      artist: "Héroes del Silencio",
      album: "Senderos de Traición",
      cover: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VTIPbvPfepzWCrisy7d0HsdmZaPGHN.png"
    },
    isPlaying: true,
    currentTime: 134, 
    duration: 277,
    volume: 75
  };
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <SearchBar />
          <LibraryTable />
        </div>
      </div>
      <PlayerControls playerData={playerData} />
    </div>
  );
}
