import React, { useState, useEffect } from "react";
import { Search as SearchIcon, Play } from "lucide-react";
import { searchTracks } from "../services/spotifyService";

export function Search({ onSelectTrack }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = ["Indie Rock", "Shoegaze", "Post-Punk", "Ambient", "Dream Pop", "Ethereal"];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      searchTracks(query)
        .then((data) => setResults(data || []))
        .finally(() => setLoading(false));
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-4 pb-36 space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold font-title text-white">Buscar</h1>
      </header>

      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar músicas ou artistas..."
          className="w-full bg-[#141419] border border-[#1F1F28] focus:border-[#A78BFA] rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition"
        />
      </div>

      {loading ? (
        <div className="text-center py-10 text-xs text-gray-500">Buscando faixas...</div>
      ) : results.length > 0 ? (
        <div className="space-y-2">
          {results.map((track) => (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="flex items-center justify-between p-3 rounded-2xl bg-[#141419] border border-[#1F1F28] hover:border-[#A78BFA]/50 transition cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-white truncate">{track.title}</h4>
                  <p className="text-[10px] text-gray-400 truncate">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
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