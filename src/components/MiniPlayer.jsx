import React from "react";
import { Play, Pause } from "lucide-react";

export function MiniPlayer({ currentTrack, isPlaying, setIsPlaying }) {
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 z-40">
      <div className="bg-[#141419]/95 backdrop-blur-md border border-[#1F1F28] p-2.5 rounded-2xl flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-10 h-10 rounded-xl object-cover shrink-0"
          />
          <div className="truncate">
            <h4 className="text-xs font-semibold text-white truncate">{currentTrack.title}</h4>
            <p className="text-[10px] text-gray-400 truncate">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-[#A78BFA] font-bold">
            {currentTrack.rawScore || "92%"}
          </span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-[#A78BFA] text-black flex items-center justify-center font-bold hover:scale-105 transition"
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}