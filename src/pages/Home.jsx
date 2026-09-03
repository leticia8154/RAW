import React, { useEffect, useState } from "react";
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
      const tracks = await getUndergroundTracks();
      if (tracks && tracks.length > 0) {
        setSpotifyTracks(tracks);
      }
      const playlists = await getUserPlaylists();
      if (playlists) {
        setUserPlaylists(playlists);
      }
    } catch (error) {
      console.error("Erro ao buscar dados do Spotify:", error);
    } finally {
      setLoading(false);
    }
  };

  const displayTracks = spotifyTracks.length > 0 ? spotifyTracks : MOCK_TRACKS;

  return (
    <div className="p-5 pb-32 max-w-md mx-auto space-y-6">
      {/* Header */}
      <header className="flex justify-between items-center py-2">
        <div>
          <h1 className="text-2xl font-black text-white tracking-wider">RAW</h1>
          <p className="text-xs text-brand-muted">Música sem filtro.</p>
        </div>

        {!token ? (
          <a
            href={loginUrl}
            className="bg-[#1DB954] text-black font-semibold text-xs px-3 py-2 rounded-full flex items-center gap-1.5 hover:bg-opacity-90 transition"
          >
            <Music size={14} /> Conectar Spotify
          </a>
        ) : (
          <span className="text-xs bg-brand-accent/20 text-brand-accent border border-brand-accent/30 px-3 py-1 rounded-full font-mono">
            Spotify Conectado
          </span>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-card to-brand-surface p-5 border border-brand-border space-y-3">
        <div className="flex items-center gap-2 text-brand-accent text-xs font-mono uppercase tracking-wider">
          <Sparkles size={14} /> Algoritmo RAW
        </div>
        <h2 className="text-lg font-bold text-white leading-snug">
          Descubra artistas com menos de 15% de popularidade.
        </h2>
        <p className="text-xs text-brand-muted">
          Filtramos o radar comercial para destacar talentos autênticos do underground.
        </p>
      </section>

      {/* Radar Underground */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-white tracking-wide">
            {token ? "Destaques Underground Reais" : "Radar Underground (Demonstração)"}
          </h3>
          <span className="text-xs text-brand-muted font-mono">RAW Score</span>
        </div>

        {loading ? (
          <div className="text-center py-8 text-xs text-brand-muted">Carregando do Spotify...</div>
        ) : (
          <div className="space-y-2">
            {displayTracks.map((track) => (
              <div
                key={track.id}
                onClick={() => onSelectTrack(track)}
                className="flex items-center justify-between p-3 rounded-xl bg-brand-card border border-brand-border/60 hover:border-brand-accent/50 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="text-sm font-medium text-white group-hover:text-brand-accent transition line-clamp-1">
                      {track.title}
                    </h4>
                    <p className="text-xs text-brand-muted line-clamp-1">{track.artist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-mono text-brand-accent font-bold block">
                      {track.rawScore}
                    </span>
                    <span className="text-[10px] text-brand-muted">Score</span>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-black transition">
                    <Play size={14} fill="currentColor" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}