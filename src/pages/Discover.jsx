import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Play } from "lucide-react";
import { getDiscoverRecommendations } from "../services/spotifyService";

export function Discover({ onSelectTrack }) {
  const [maxPopularity, setMaxPopularity] = useState(30);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDiscoverRecommendations(maxPopularity).then((data) => {
      setTracks(data || []);
      setLoading(false);
    });
  }, [maxPopularity]);

  return (
    <div className="p-4 pb-36 space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold font-title text-white">Descobrir</h1>
        <p className="text-xs text-gray-400">Descubra faixas underground com base no seu gosto.</p>
      </header>

      {/* Slider de Popularidade */}
      <section className="bg-[#141419] border border-[#1F1F28] rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-[#A78BFA] flex items-center gap-1.5">
            <SlidersHorizontal size={14} /> Popularidade Máxima
          </span>
          <span className="font-mono text-white bg-[#1F1F28] px-2.5 py-0.5 rounded-full text-[11px] border border-[#A78BFA]/30">
            Até {maxPopularity}%
          </span>
        </div>
        <input
          type="range"
          min="5"
          max="50"
          value={maxPopularity}
          onChange={(e) => setMaxPopularity(Number(e.target.value))}
          className="w-full accent-[#A78BFA] bg-[#1F1F28] h-1.5 rounded-lg appearance-none cursor-pointer"
        />
      </section>

      {/* Lista Dinâmica */}
      <section className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-xs text-gray-500">Filtrando o catálogo do Spotify...</div>
        ) : tracks.length > 0 ? (
          tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#141419] border border-[#1F1F28] hover:border-[#A78BFA]/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-xl object-cover" />
                <div className="truncate max-w-[170px]">
                  <h4 className="text-xs font-semibold text-white truncate">{track.title}</h4>
                  <p className="text-[10px] text-gray-400 truncate">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#A78BFA] font-bold">{track.rawScore}</span>
                <button className="w-8 h-8 rounded-full bg-[#A78BFA]/10 text-[#A78BFA] flex items-center justify-center">
                  <Play size={14} fill="currentColor" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-xs text-gray-500">
            Aumente o nível de popularidade para ver mais resultados.
          </div>
        )}
      </section>
    </div>
  );
}