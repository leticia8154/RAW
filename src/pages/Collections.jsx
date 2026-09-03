import React, { useEffect, useState } from "react";
import { ListMusic, Library, Music2 } from "lucide-react";
import { getUserPlaylists } from "../services/spotifyService";
import { loginUrl } from "../config/spotify";

export function Collections({ onSelectTrack }) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("spotify_token");

  useEffect(() => {
    if (token) {
      getUserPlaylists().then((data) => {
        setPlaylists(data || []);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="p-4 pb-36 space-y-6">
      <header className="pt-2">
        <h1 className="text-2xl font-bold font-title text-white">Coleções</h1>
        <p className="text-xs text-gray-400">Sua biblioteca e playlists salvas no Spotify.</p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#A78BFA] uppercase tracking-wider">
          <Library size={16} /> Playlists Sincronizadas
        </div>

        {loading ? (
          <div className="text-center py-10 text-xs text-gray-500">Carregando suas playlists...</div>
        ) : playlists.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {playlists.map((pl) => (
              <div
                key={pl.id}
                className="bg-[#141419] border border-[#1F1F28] p-3 rounded-2xl space-y-2 hover:border-[#A78BFA]/50 transition cursor-pointer"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-[#1F1F28] relative">
                  {pl.cover ? (
                    <img src={pl.cover} alt={pl.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600">
                      <Music2 size={24} />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white truncate">{pl.name}</h4>
                  <p className="text-[10px] text-gray-400">{pl.tracksCount} faixas</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#141419] border border-[#1F1F28] p-6 rounded-2xl text-center space-y-4">
            <ListMusic className="mx-auto text-gray-500" size={32} />
            <div className="space-y-1">
              <p className="text-xs text-gray-400">Spotify desconectado ou sem playlists.</p>
              <p className="text-[10px] text-gray-500">Autorize o acesso para sincronizar sua conta.</p>
            </div>
            <a
              href={loginUrl}
              className="inline-block bg-[#A78BFA] text-black font-bold text-xs px-4 py-2 rounded-full uppercase tracking-wider hover:opacity-90 transition"
            >
              Conectar Spotify
            </a>
          </div>
        )}
      </section>
    </div>
  );
}