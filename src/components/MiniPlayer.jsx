import React, { useState } from "react";
import { Play, Pause, ExternalLink } from "lucide-react";

export function MiniPlayer({ currentTrack, isPlaying, setIsPlaying }) {
  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-16 left-0 right-0 max-w-md mx-auto px-4 z-40">
      {/* Player Embed do Spotify para áudio real da faixa */}
      {currentTrack.id && (
        <iframe
          src={`https://open.spotify.com/embed/track/${currentTrack.id}?utm_source=generator&theme=0`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="rounded-2xl shadow-2xl border border-[#1F1F28]"
        ></iframe>
      )}
    </div>
  );
}