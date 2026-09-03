import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { searchTracks } from "../services/spotifyService";

export function Search({ onSelectTrack }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const genres = ["Indie", "Rock", "Rap", "Eletrônica", "Alternativo", "Post-Punk", "Ambient"];

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length > 2) {
      const data = await searchTracks(value);
      setResults(data);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="p-4 pb-36 space-y-6">
      <h1 className="text-2xl font-bold text-white pt-2">Busca</h1>

      <div className="relative">
        <SearchIcon className="absolute left-3.5 top-3.5 text-gray-400" size={18} />
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="O que você quer descobrir?"
          className="w-full bg-[#141419] border border-[#1F1F28] text-white pl-10 pr-4 py-3 rounded-xl text-xs focus:outline-none focus:border-[#A78BFA]"
        />
      </div>

      {results.length > 0 ? (
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Resultados</h2>
          {results.map((track) => (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[#141419] border border-[#1F1F28] cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 className="text-xs font-semibold text-white">{track.title}</h4>
                  <p className="text-[10px] text-gray-400">{track.artist}</p>
                </div>
              </div>
              <span className="text-xs font-mono text-[#A78BFA] font-bold">{track.rawScore}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Categorias Underground
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => {
                  setQuery(genre);
                  searchTracks(genre).then(setResults);
                }}
                className="h-16 bg-[#141419] border border-[#1F1F28] rounded-xl p-3 text-left hover:border-[#A78BFA]/50 transition"
              >
                <span className="text-xs font-semibold text-white">{genre}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}