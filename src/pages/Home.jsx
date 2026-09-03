import React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import { Play, Sparkles, Music, ExternalLink } from "lucide-react";
import { loginUrl } from "../config/spotify";
import { setAccessToken, getUndergroundTracks, getUserPlaylists } from "../services/spotifyService";
import { MOCK_TRACKS } from "../data/mockData";

export function Home({ onSelectTrack }) {
  const [token, setToken] = useState(null);
  const [spotifyTracks, setSpotifyTracks] = useState([]);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hash = window.location.hash;
    let localToken = window.localStorage.getItem("spotify_token");

    if (!localToken && hash) {
      const tokenParam = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"));

      if (tokenParam) {
        localToken = tokenParam.split("=")[1];
        window.location.hash = "";
        window.localStorage.setItem("spotify_token", localToken);
      }
    }

    if (localToken) {
      setToken(localToken);
      setAccessToken(localToken);
      fetchSpotifyData();
    }
  }, []);

  const fetchSpotifyData = async () => {
    setLoading(true);
    try {
      const tracks = await getUndergroundTracks("indie alternative underground");
      setSpotifyTracks(tracks);

      const playlists = await getUserPlaylists();
      setUserPlaylists(playlists);
    } catch (err) {
      console.error("Erro ao carregar dados do Spotify:", err);
    } finally {
      setLoading(false);
    }
  };

  const logoutSpotify = () => {
    setToken(null);
    window.localStorage.removeItem("spotify_token");
    setSpotifyTracks([]);
    setUserPlaylists([]);
  };

  const displayTracks = spotifyTracks.length > 0 ? spotifyTracks : MOCK_TRACKS;

  return (
    <div className="p-5 pb-32 max-w-md mx-auto space-y-8">
      {/* Header */}
      <header className="pt-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
            RA<span className="text-brand-accent">W</span>
          </h1>
          <p className="text-xs text-brand-muted font-medium tracking-wide mt-0.5">
            Seu underground favorito.
          </p>
        </div>

        {!token ? (
          <a
            href={loginUrl}
            className="flex items-center gap-1.5 bg-[#1DB954] text-black text-xs font-bold px-3 py-2 rounded-full hover:scale-105 transition shadow-lg shadow-[#1DB954]/20"
          >
            <Music size={14} fill="black" />
            <span>Conectar Spotify</span>
          </a>
        ) : (
          <div className="flex flex-col items-end gap-1">
            <span className="text-[10px] font-mono text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-full border border-brand-accent/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
              Spotify Conectado
            </span>
            <button
              onClick={logoutSpotify}
              className="text-[10px] text-brand-muted hover:text-white underline"
            >
              Desconectar
            </button>
          </div>
        )}
      </header>

      <div className="relative rounded-2xl bg-gradient-to-br from-brand-card to-brand-surface p-5 border border-brand-border overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center gap-2 text-brand-accent text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles size={14} />
          <span>Antes do Hype</span>
        </div>
        <h2 className="text-xl font-bold text-white leading-tight">
          Descubra o que ainda não foi escutado pelo algoritmo tradicional.
        </h2>
      </div>

      {/* RAW Invisível (Músicas Underground do Spotify) */}
      <section className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h3 className="text-lg font-bold text-white tracking-tight">RAW Invisível</h3>
          <span className="text-xs text-brand-muted font-mono">0.01% OUVINTES</span>
        </div>

        {loading ? (
          <div className="text-xs text-brand-muted font-mono animate-pulse py-8 text-center">
            Filtrando acervo underground no Spotify...
          </div>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none -mx-5 px-5">
            {displayTracks.map((track) => (
              <div
                key={track.id}
                className="min-w-[200px] bg-brand-card/50 border border-brand-border rounded-xl p-3 flex flex-col justify-between group hover:border-brand-accent/50 transition cursor-pointer"
                onClick={() => onSelectTrack(track)}
              >
                <div className="relative mb-3">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-44 object-cover rounded-lg"
                  />
                  <button className="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-brand-accent text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <Play size={18} fill="black" className="ml-0.5" />
                  </button>
                  <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-brand-accent border border-white/10">
                    RAW {track.rawScore}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm truncate">{track.title}</h4>
                  <p className="text-xs text-brand-muted truncate">{track.artist}</p>
                  <div className="mt-2 flex justify-between items-center text-[10px] text-brand-muted border-t border-brand-border/50 pt-2">
                    <span>{track.genre || "Underground"}</span>
                    <span className="text-brand-accent font-mono">{track.popularity}% pop.</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Suas Playlists Importadas do Spotify */}
      {token && userPlaylists.length > 0 && (
        <section className="space-y-3 pt-2">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-white">Suas Playlists do Spotify</h3>
            <span className="text-[10px] text-brand-muted">Acesso direto sem refazer tudo</span>
          </div>

          <div className="space-y-2">
            {userPlaylists.slice(0, 4).map((playlist) => (
              <div
                key={playlist.id}
                className="flex items-center justify-between p-3 rounded-xl bg-brand-surface border border-brand-border/60 hover:border-brand-accent/40 transition"
              >
                <div className="flex items-center gap-3 truncate">
                  {playlist.images[0]?.url ? (
                    <img
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-brand-card flex items-center justify-center text-brand-muted">
                      <Music size={18} />
                    </div>
                  )}
                  <div className="truncate">
                    <h4 className="text-sm font-semibold text-white truncate">{playlist.name}</h4>
                    <p className="text-xs text-brand-muted">{playlist.tracks.total} faixas</p>
                  </div>
                </div>

                <a
                  href={playlist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-muted hover:text-brand-accent p-1"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}