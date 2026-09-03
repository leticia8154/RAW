import React, { useState } from "react";
import { Sparkles, SlidersHorizontal, Play } from "lucide-react";
import { MOCK_TRACKS } from "../data/mockData";

export function Discover({ onSelectTrack }) {
  const [maxPopularity, setMaxPopularity] = useState(20);

  const filteredTracks = MOCK_TRACKS.filter(
    (t) => (100 - parseInt(t.rawScore)) <= maxPopularity
  );

  return (
    <div className="p-4 pb-36 max-w-md mx-auto space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold font-title text-white">Descobrir</h1>
        <p className="text-xs text-raw-subtext">Filtre o underground no seu nível de pureza.</p>
      </header>

      {/* Controle de Filtro de Popularidade */}
      <section className="bg-raw-card border border-raw-border rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-raw-purple flex items-center gap-1">
            <SlidersHorizontal size={14} /> Popularidade Máxima
          </span>
          <span className="font-mono text-white bg-raw-border px-2 py-0.5 rounded">
            Até {maxPopularity}%
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="50"
          value={maxPopularity}
          onChange={(e) => setMaxPopularity(Number(e.target.value))}
          className="w-full accent-raw-purple bg-raw-border h-1.5 rounded-lg appearance-none cursor-pointer"
        />
      </section>

      {/* Músicas Filtradas */}
      <section className="space-y-3">
        {filteredTracks.map((track) => (
          <div
            key={track.id}
            onClick={() => onSelectTrack(track)}
            className="flex items-center justify-between p-3 rounded-xl bg-raw-card border border-raw-border hover:border-raw-purple/50 transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <h4 className="text-xs font-semibold text-white">{track.title}</h4>
                <p className="text-[10px] text-raw-subtext">{track.artist}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-raw-purple font-bold">{track.rawScore}</span>
              <button className="w-8 h-8 rounded-full bg-raw-purple/10 text-raw-purple flex items-center justify-center">
                <Play size={14} fill="currentColor" />
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}