import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Music } from "lucide-react";
import { searchTracks } from "../services/spotifyService";

export function Search({ onSelectTrack }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      searchTracks(query)
        .then((data) => setResults(data || []))
        .finally(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-4 pb-36 space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold font-title text-white">Buscar</h1>
      </header>

      {/* Input de Busca */}
      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar músicas ou artistas no Spotify..."
          className="w-full bg-[#141419] border border-[#1F1F28] focus:border-[#A78BFA] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition"
        />
      </div>

      {/* Resultados */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center py-10 text-xs text-gray-500">Buscando no Spotify...</div>
        ) : results.length > 0 ? (
          results.map((track) => (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#141419] border border-[#1F1F28] hover:border-[#A78BFA]/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={track.cover} alt={track.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate">{track.title}</h4>
                  <p className="text-[10px] text-gray-400 truncate">{track.artist}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#A78BFA] font-bold shrink-0">{track.rawScore}</span>
            </div>
          ))
        ) : query.trim() ? (
          <div className="text-center py-10 text-xs text-gray-500">Nenhum resultado encontrado.</div>
        ) : (
          <div className="text-center py-12 text-xs text-gray-500 flex flex-col items-center gap-2">
            <Music size={28} className="text-gray-600" />
            <span>Digite o nome de uma música ou artista para buscar.</span>
          </div>
        )}
      </div>
    </div>
  );
}