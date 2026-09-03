import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Play } from "lucide-react";
import { getDiscoverRecommendations } from "../services/spotifyService";
import { MOCK_TRACKS } from "../data/mockData";

export function Discover({ onSelectTrack }) {
  const [maxPopularity, setMaxPopularity] = useState(20);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getDiscoverRecommendations(maxPopularity).then((data) => {
      if (data && data.length > 0) {
        setTracks(data);
      } else {
        setTracks(MOCK_TRACKS);
      }
      setLoading(false);
    });
  }, [maxPopularity]);

  return (
    <div className="p-4 pb-36 space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold font-title text-white">Descobrir</h1>
        <p className="text-xs text-gray-400">Filtre o underground no seu nível de pureza.</p>
      </header>

      {/* Controle de Filtro de Popularidade */}
      <section className="bg-[#141419] border border-[#1F1F28] rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-semibold text-[#A78BFA] flex items-center gap-1.5">
            <SlidersHorizontal size={14} /> Popularidade Máxima
          </span>
          <span className="font-mono text-white bg-[#1F1F28] px-2.5 py-0.5 rounded-full text-[11px]">
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

      {/* Lista Recomendada do Seu Spotify */}
      <section className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-xs text-gray-500">Buscando algoritmos do seu Spotify...</div>
        ) : (
          tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#141419] border border-[#1F1F28] hover:border-[#A78BFA]/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h4 className="text-xs font-semibold text-white">{track.title}</h4>
                  <p className="text-[10px] text-gray-400">{track.artist}</p>
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
        )}
      </section>
    </div>
  );
}