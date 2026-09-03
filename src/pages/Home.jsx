import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Logo } from "../components/Logo";
import { redirectToSpotifyAuth } from "../config/spotify";
import { setAccessToken, getUndergroundTracks } from "../services/spotifyService";
import { MOCK_TRACKS } from "../data/mockData";

export function Home({ onSelectTrack }) {
  const [token, setToken] = useState(null);
  const [tracks, setTracks] = useState(MOCK_TRACKS);

  useEffect(() => {
    const localToken = localStorage.getItem("spotify_token");
    if (localToken) {
      setToken(localToken);
      setAccessToken(localToken);
      getUndergroundTracks().then((data) => {
        if (data && data.length > 0) setTracks(data);
      });
    }
  }, []);

  return (
    <div className="p-4 pb-36 space-y-6">
      {/* Header Fiel com Logo e Notificação */}
      <header className="flex justify-between items-center pt-2">
        <Logo className="h-7" />
        <div className="flex items-center gap-3">
          {!token ? (
            <button
              onClick={redirectToSpotifyAuth}
              className="bg-[#A78BFA] text-black font-bold text-[10px] px-3 py-1.5 rounded-full uppercase tracking-wider hover:opacity-90 transition"
            >
              Conectar Spotify
            </button>
          ) : (
            <span className="text-[10px] text-[#A78BFA] font-mono bg-[#A78BFA]/10 px-2.5 py-1 rounded-full border border-[#A78BFA]/20">
              Conectado
            </span>
          )}
          <button className="text-gray-300 hover:text-white">
            <Bell size={22} />
          </button>
        </div>
      </header>

      {/* Descobertas para você - Carrossel Touch sem barra */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white">Descobertas para você</h2>
          <span className="text-xs text-gray-400 cursor-pointer">Ver todas</span>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {tracks.map((track) => (
            <div
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="w-44 shrink-0 space-y-2 cursor-pointer group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#141419] border border-[#1F1F28]">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-0.5">
                <h3 className="text-xs font-semibold text-white truncate">{track.title}</h3>
                <p className="text-[10px] text-gray-400 truncate">{track.artist}</p>
                <span className="inline-block mt-1 text-[9px] text-[#A78BFA] bg-[#A78BFA]/10 px-2 py-0.5 rounded-full border border-[#A78BFA]/20">
                  {track.rawScore} compatibilidade
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artistas em Destaque */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white">Artistas em destaque</h2>
          <span className="text-xs text-gray-400 cursor-pointer">Ver todos</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[
            { name: "Óra", genre: "Alternativo" },
            { name: "Sala dos Ecos", genre: "Indie Rock" },
            { name: "Vértice", genre: "Eletrônica" },
            { name: "Luar", genre: "Dream Pop" }
          ].map((artist, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-1">
              <div className="w-14 h-14 rounded-full bg-[#141419] border border-[#1F1F28] flex items-center justify-center font-bold text-[#A78BFA] text-sm">
                {artist.name[0]}
              </div>
              <span className="text-[11px] font-medium text-white truncate w-full">{artist.name}</span>
              <span className="text-[9px] text-gray-400 truncate w-full">{artist.genre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* RAW+ Proteja sua Audição */}
      <section className="bg-[#141419] border border-[#1F1F28] rounded-2xl p-4 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-[#A78BFA] uppercase tracking-wider block">
            RAW+ PROTEJA SUA AUDIÇÃO
          </span>
          <span className="text-xs text-gray-400 block">Exposição sonora</span>
          <span className="text-xl font-bold text-white block">2h 15m</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs font-semibold text-emerald-400 block">✓ OK</span>
            <span className="text-[9px] text-gray-400 block">Dentro do recomendado</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#A78BFA] border-t-transparent flex items-center justify-center text-[#A78BFA]">
            🛡️
          </div>
        </div>
      </section>
    </div>
  );
}