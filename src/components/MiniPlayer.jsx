import React from "react";
import { Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";

export function MiniPlayer({ currentTrack, isPlaying, setIsPlaying }) {
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 z-40">
      <div className="bg-brand-surface/90 backdrop-blur-md border border-brand-border p-2.5 rounded-2xl flex items-center justify-between shadow-2xl">
        <Link to="/player" className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="truncate">
            <h4 className="text-xs font-semibold text-white truncate">
              {currentTrack.title}
            </h4>
            <p className="text-[10px] text-brand-muted truncate">
              {currentTrack.artist}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono text-brand-accent font-bold block">
              {currentTrack.rawScore}
            </span>
          </div>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-brand-accent flex items-center justify-center text-black font-bold hover:scale-105 transition"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
          </button>
        </div>
      </div>
    </div>
  );
}