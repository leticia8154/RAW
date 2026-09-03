import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Play } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { searchTracks } from "../services/spotifyService";

export function Search({ onSelectTrack }) {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["Indie Rock", "Shoegaze", "Post-Punk", "Ambient", "Dream Pop", "Ethereal"];

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      searchTracks(query).then((data) => {
        setResults(data || []);
        setLoading(false);
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-4 pb-36 space-y-6">
      <h1 className="text-2xl font-bold font-title text-white pt-2">Busca</h1>

      {/* Input de Busca Real */}
      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Artistas, faixas ou gêneros..."
          className="w-full bg-[#141419] border border-[#1F1F28] text-white pl-10 pr-4 py-3 rounded-2xl text-xs focus:outline-none focus:border-[#A78BFA]"
        />
      </div>

      {/* Resultados da API do Spotify */}
      {loading ? (
        <div className="text-center py-8 text-xs text-gray-500">Pesquisando no Spotify...</div>
      ) : results.length > 0 ? (
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resultados</h2>
          {results.map((track) => (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="flex items-center justify-between p-2.5 rounded-2xl bg-[#141419] border border-[#1F1F28] hover:border-[#A78BFA]/50 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-xl object-cover" />
                <div className="truncate max-w-[180px]">
                  <h4 className="text-xs font-semibold text-white truncate">{track.title}</h4>
                  <p className="text-[10px] text-gray-400 truncate">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#A78BFA] font-bold">{track.rawScore}</span>
                <button className="w-7 h-7 rounded-full bg-[#A78BFA]/10 text-[#A78BFA] flex items-center justify-center">
                  <Play size={12} fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Categorias</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setQuery(cat)}
                className="h-16 bg-[#141419] border border-[#1F1F28] rounded-2xl p-3 text-left hover:border-[#A78BFA]/50 transition flex items-center justify-between"
              >
                <span className="text-xs font-semibold text-white">{cat}</span>
                <span className="text-[10px] text-[#A78BFA] font-mono">RAW</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}