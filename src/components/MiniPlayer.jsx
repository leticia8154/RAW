import { Play, Pause, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";

export function MiniPlayer({ currentTrack, isPlaying, setIsPlaying }) {
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 px-4 z-30 max-w-md mx-auto">
      <div className="bg-brand-card/95 backdrop-blur-md border border-brand-accent/30 rounded-xl p-2.5 flex items-center justify-between shadow-2xl">
        <Link to="/player" className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="truncate">
            <h4 className="text-sm font-semibold text-white truncate">{currentTrack.title}</h4>
            <p className="text-xs text-brand-muted truncate">{currentTrack.artist}</p>
          </div>
        </Link>
        
        <div className="flex items-center gap-3 pr-1">
          <span className="text-[10px] font-mono bg-brand-accent/10 text-brand-accent px-2 py-0.5 rounded border border-brand-accent/20">
            RAW {currentTrack.rawScore}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full bg-brand-accent text-black flex items-center justify-center hover:opacity-90 transition"
          >
            {isPlaying ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}