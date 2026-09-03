import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

export const setAccessToken = (token) => {
  if (token) {
    spotify.setAccessToken(token);
  }
};

const getToken = () => {
  const token = localStorage.getItem("spotify_token");
  if (token) spotify.setAccessToken(token);
  return token;
};

// Calcula o RAW Score (quanto menor a popularidade comercial, maior a compatibilidade RAW)
const calculateRawScore = (popularity) => {
  const pop = typeof popularity === "number" && !isNaN(popularity) ? popularity : 15;
  const score = Math.max(70, Math.min(99, 100 - pop));
  return `${score}%`;
};

export const getUndergroundTracks = async () => {
  const token = getToken();
  if (!token) return null;

  try {
    // Busca lançamentos e indie underground
    const response = await spotify.searchTracks("tag:new", { limit: 12 });
    return response.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      cover: track.album.images[0]?.url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300",
      rawScore: calculateRawScore(track.popularity),
      audioUrl: track.preview_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    }));
  } catch (error) {
    console.error("Erro em getUndergroundTracks:", error);
    return null;
  }
};

export const getFeaturedArtists = async () => {
  const token = getToken();
  if (!token) return [];

  try {
    const response = await spotify.searchArtists("genre:indie", { limit: 6 });
    return response.artists.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      genre: artist.genres[0] || "Underground",
      avatar: artist.images[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
    }));
  } catch (error) {
    console.error("Erro em getFeaturedArtists:", error);
    return [];
  }
};

export const getDiscoverRecommendations = async (maxPop = 20) => {
  const token = getToken();
  if (!token) return [];

  try {
    const topArtists = await spotify.getMyTopArtists({ limit: 3 });
    const seedArtists = topArtists.items.length > 0 
      ? topArtists.items.map(a => a.id).slice(0, 2)
      : ["0Eme2R272EfFrA18L2P238"]; // Fallback para artista indie

    const response = await spotify.getRecommendations({
      seed_artists: seedArtists,
      max_popularity: maxPop,
      limit: 15
    });

    return response.tracks.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      cover: track.album.images[0]?.url,
      rawScore: calculateRawScore(track.popularity),
      audioUrl: track.preview_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    }));
  } catch (error) {
    console.error("Erro nas recomendações:", error);
    return [];
  }
};

export const searchTracks = async (query) => {
  if (!query || query.trim().length === 0) return [];
  const token = getToken();
  if (!token) return [];

  try {
    const response = await spotify.searchTracks(query, { limit: 15 });
    return response.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      cover: track.album.images[0]?.url,
      rawScore: calculateRawScore(track.popularity),
      audioUrl: track.preview_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    }));
  } catch (error) {
    console.error("Erro na busca:", error);
    return [];
  }
};

export const getUserPlaylists = async () => {
  const token = getToken();
  if (!token) return [];

  try {
    const response = await spotify.getUserPlaylists({ limit: 20 });
    return response.items.map((pl) => ({
      id: pl.id,
      name: pl.name,
      tracksCount: pl.tracks.total,
      cover: pl.images[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300",
    }));
  } catch (error) {
    console.error("Erro em getUserPlaylists:", error);
    return [];
  }
};