import React, { useEffect, useState } from "react";
import { Play, Bell, ShieldAlert, Sparkles, CheckCircle2 } from "lucide-react";
import { loginUrl } from "../config/spotify";
import { setAccessToken, getUndergroundTracks } from "../services/spotifyService";
import { MOCK_TRACKS } from "../data/mockData";

export function Home({ onSelectTrack }) {
  const [token, setToken] = useState(null);
  const [spotifyTracks, setSpotifyTracks] = useState([]);

useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    let localToken = window.localStorage.getItem("spotify_token");

    if (code && !localToken) {
      window.localStorage.setItem("spotify_token", code);
      setToken(code);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (localToken) {
      setToken(localToken);
      setAccessToken(localToken);
      getUndergroundTracks().then((tracks) => tracks && setSpotifyTracks(tracks));
    }
  }, []);

  const displayTracks = spotifyTracks.length > 0 ? spotifyTracks : MOCK_TRACKS;

  return (
    <div className="p-4 pb-36 max-w-md mx-auto space-y-6">
      {/* Header com a logo RAW e Notificações */}
      <header className="flex justify-between items-center pt-2">
        <h1 className="text-2xl font-black font-title tracking-wider text-white">
          RAW<span className="text-raw-purple">.</span>
        </h1>
        <div className="flex items-center gap-3">
          {!token ? (
            <a href={loginUrl} className="bg-raw-purple text-black font-bold text-xs px-3 py-1.5 rounded-full">
              Conectar Spotify
            </a>
          ) : (
            <span className="text-[10px] text-raw-purple font-mono bg-raw-purple/10 px-2 py-1 rounded border border-raw-purple/20">
              Conectado
            </span>
          )}
          <button className="text-gray-400 hover:text-white">
            <Bell size={20} />
          </button>
        </div>
      </header>

      {/* Descobertas para você (Carrossel Horizontal) */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white">Descobertas para você</h2>
          <button className="text-xs text-raw-subtext">Ver todas</button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
          {displayTracks.slice(0, 3).map((track) => (
            <div 
              key={track.id}
              onClick={() => onSelectTrack(track)}
              className="w-40 shrink-0 cursor-pointer space-y-2 group"
            >
              <div className="relative aspect-square rounded-xl overflow-hidden bg-raw-card border border-raw-border">
                <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white truncate">{track.title}</h3>
                <p className="text-[10px] text-raw-subtext truncate">{track.artist}</p>
                <span className="inline-block mt-1 text-[9px] text-raw-purple bg-raw-purple/10 px-2 py-0.5 rounded-full border border-raw-purple/20">
                  {track.rawScore || 95}% compatibilidade
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
          <button className="text-xs text-raw-subtext">Ver todos</button>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[
            { name: "Óra", genre: "Alternativo" },
            { name: "Sala dos Ecos", genre: "Indie Rock" },
            { name: "Vértice", genre: "Eletrônica" },
            { name: "Luar", genre: "Dream Pop" }
          ].map((artist, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-1">
              <div className="w-14 h-14 rounded-full bg-raw-card border border-raw-border flex items-center justify-center font-bold text-raw-purple text-xs">
                {artist.name[0]}
              </div>
              <span className="text-[11px] font-medium text-white truncate w-full">{artist.name}</span>
              <span className="text-[9px] text-raw-subtext truncate w-full">{artist.genre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* RAW+ Proteja sua audição (O widget roxo do protótipo) */}
      <section className="bg-raw-card border border-raw-border rounded-2xl p-4 flex items-center justify-between">
        <div className="space-y-1">
          <span className="text-[10px] font-semibold text-raw-purple uppercase tracking-wider">
            RAW+ Proteja sua audição
          </span>
          <div className="text-xs text-raw-subtext">Exposição sonora</div>
          <div className="text-lg font-bold text-white">2h 15m</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 size={12} /> OK
            </span>
            <span className="text-[9px] text-raw-subtext block">Dentro do recomendado</span>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-raw-purple border-t-transparent flex items-center justify-center text-raw-purple">
            <ShieldAlert size={18} />
          </div>
        </div>
      </section>
    </div>
  );
}