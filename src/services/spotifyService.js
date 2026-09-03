import SpotifyWebApi from "spotify-web-api-js";
import { MOCK_TRACKS } from "../data/mockData";

const spotify = new SpotifyWebApi();

export const setAccessToken = (token) => {
  if (token) spotify.setAccessToken(token);
};

const getValidToken = () => {
  const token = localStorage.getItem("spotify_token");
  if (token) {
    spotify.setAccessToken(token);
    return token;
  }
  return null;
};

const calculateRawScore = (popularity) => {
  const pop = typeof popularity === "number" && !isNaN(popularity) ? popularity : 20;
  return `${Math.max(70, Math.min(99, 100 - Math.floor(pop * 0.5)))}%`;
};

const formatTrack = (track) => ({
  id: track.id,
  title: track.name,
  artist: track.artists ? track.artists.map((a) => a.name).join(", ") : "Artista Underground",
  cover: track.album?.images?.[0]?.url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300",
  rawScore: calculateRawScore(track.popularity),
});

// 1. Home: Descobertas
export const getUndergroundTracks = async () => {
  const token = getValidToken();
  if (!token) return MOCK_TRACKS;

  try {
    const res = await spotify.searchTracks("genre:indie", { limit: 12 });
    const items = res.tracks?.items || [];
    return items.length > 0 ? items.map(formatTrack) : MOCK_TRACKS;
  } catch {
    return MOCK_TRACKS;
  }
};

// 2. Home: Artistas em Destaque
export const getFeaturedArtists = async () => {
  const token = getValidToken();
  const fallback = [
    { id: "1", name: "Óra", genre: "Alternativo", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
    { id: "2", name: "Sala dos Ecos", genre: "Indie Rock", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
    { id: "3", name: "Vértice", genre: "Eletrônica", avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200" },
    { id: "4", name: "Luar", genre: "Dream Pop", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200" },
  ];

  if (!token) return fallback;

  try {
    const res = await spotify.searchArtists("genre:indie", { limit: 10 });
    const items = res.artists?.items || [];
    const filtered = items.filter((a) => a.popularity < 60).slice(0, 4);

    return filtered.length > 0
      ? filtered.map((a) => ({
          id: a.id,
          name: a.name,
          genre: a.genres?.[0] || "Underground",
          avatar: a.images?.[0]?.url || fallback[0].avatar,
        }))
      : fallback;
  } catch {
    return fallback;
  }
};

// 3. Descobrir: Filtrado por Popularidade
export const getDiscoverRecommendations = async (maxPop = 30) => {
  const token = getValidToken();

  if (!token) {
    return MOCK_TRACKS.filter((t) => (100 - parseInt(t.rawScore)) <= maxPop);
  }

  try {
    const res = await spotify.searchTracks("year:2023-2026 indie", { limit: 40 });
    const items = res.tracks?.items || [];
    const filtered = items.filter((t) => t.popularity <= maxPop).map(formatTrack);

    return filtered.length > 0 ? filtered : MOCK_TRACKS;
  } catch {
    return MOCK_TRACKS;
  }
};

// 4. Busca Funcional
export const searchTracks = async (query) => {
  if (!query || !query.trim()) return [];
  const token = getValidToken();

  if (!token) {
    return MOCK_TRACKS.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const res = await spotify.searchTracks(query, { limit: 15 });
    const items = res.tracks?.items || [];
    return items.map(formatTrack);
  } catch {
    return MOCK_TRACKS.filter(
      (t) =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.artist.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// 5. Coleções
export const getUserPlaylists = async () => {
  const token = getValidToken();
  const fallbackPlaylists = [
    { id: "pl1", name: "Indie Underground 2026", tracksCount: 24, cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300" },
    { id: "pl2", name: "RAW Discoveries", tracksCount: 18, cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300" },
  ];

  if (!token) return fallbackPlaylists;

  try {
    const res = await spotify.getUserPlaylists({ limit: 20 });
    const items = res.items || [];
    return items.length > 0
      ? items.map((pl) => ({
          id: pl.id,
          name: pl.name,
          tracksCount: pl.tracks?.total || 0,
          cover: pl.images?.[0]?.url || fallbackPlaylists[0].cover,
        }))
      : fallbackPlaylists;
  } catch {
    return fallbackPlaylists;
  }
};