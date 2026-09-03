import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";
import { redirectToSpotifyAuth } from "../config/spotify";
import { setAccessToken, getUndergroundTracks, getFeaturedArtists } from "../services/spotifyService";

export function Home({ onSelectTrack }) {
  const navigate = useNavigate();
  const [token] = useState(localStorage.getItem("spotify_token"));
  const [tracks, setTracks] = useState([]);
  const [featuredArtists, setFeaturedArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      setAccessToken(token);
      setLoading(true);

      Promise.all([getUndergroundTracks(), getFeaturedArtists()])
        .then(([tracksData, artistsData]) => {
          setTracks(tracksData || []);
          setFeaturedArtists(artistsData || []);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="p-4 pb-36 space-y-6">
      {/* Header */}
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

      {/* Descobertas para você */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white">Descobertas para você</h2>
          <button onClick={() => navigate("/discover")} className="text-xs text-gray-400 hover:text-[#A78BFA]">
            Ver todas
          </button>
        </div>

        {loading ? (
          <div className="text-xs text-gray-500 py-8 text-center">Buscando faixas no seu perfil Spotify...</div>
        ) : tracks.length > 0 ? (
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className="w-44 shrink-0 space-y-2 cursor-pointer group"
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#141419] border border-[#1F1F28] group-hover:border-[#A78BFA]/50 transition">
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xs font-semibold text-white truncate">{track.title}</h3>
                  <p className="text-[10px] text-gray-400 truncate">{track.artist}</p>
                  <span className="inline-block mt-1 text-[9px] text-[#A78BFA] bg-[#A78BFA]/10 px-2 py-0.5 rounded-full border border-[#A78BFA]/20 font-mono">
                    {track.rawScore} compatibilidade
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-xs text-gray-500 py-6 text-center">Conecte sua conta do Spotify para carregar recomendações.</div>
        )}
      </section>

      {/* Artistas em Destaque Restaurado */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-semibold text-white">Artistas em destaque</h2>
          <button onClick={() => navigate("/search")} className="text-xs text-gray-400 hover:text-[#A78BFA]">
            Ver todos
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {featuredArtists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => navigate(`/search?q=${encodeURIComponent(artist.name)}`)}
              className="flex flex-col items-center text-center space-y-1 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#141419] border border-[#1F1F28] group-hover:border-[#A78BFA] transition">
                <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-medium text-white truncate w-full group-hover:text-[#A78BFA] transition">
                {artist.name}
              </span>
              <span className="text-[9px] text-gray-400 truncate w-full">{artist.genre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Card RAW+ */}
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