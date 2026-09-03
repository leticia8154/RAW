import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

export const setAccessToken = (token) => {
  if (token) {
    spotify.setAccessToken(token);
  }
};

const ensureToken = () => {
  const token = localStorage.getItem("spotify_token");
  if (token) {
    spotify.setAccessToken(token);
    return token;
  }
  return null;
};

// Converte a popularidade em porcentagem de compatibilidade
const calculateRawScore = (popularity) => {
  const pop = typeof popularity === "number" && !isNaN(popularity) ? popularity : 20;
  const score = Math.max(70, Math.min(99, 100 - Math.floor(pop * 0.5)));
  return `${score}%`;
};

const formatTrack = (track) => {
  if (!track) return null;
  return {
    id: track.id,
    title: track.name,
    artist: track.artists ? track.artists.map((a) => a.name).join(", ") : "Artista",
    cover: track.album?.images?.[0]?.url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300",
    rawScore: calculateRawScore(track.popularity),
    audioUrl: track.preview_url || null,
    externalUrl: track.external_urls?.spotify,
  };
};

// 1. Home: Descobertas baseadas nos seus gostos (artistas variados e pouco conhecidos)
export const getUndergroundTracks = async () => {
  const token = ensureToken();
  if (!token) return [];

  try {
    const topArtistsRes = await spotify.getMyTopArtists({ limit: 5 });
    const primaryGenre = topArtistsRes.items?.[0]?.genres?.[0] || "indie";

    const searchRes = await spotify.searchTracks(`genre:"${primaryGenre}"`, { limit: 30 });
    const items = searchRes.tracks?.items || [];

    const uniqueTracks = [];
    const seenArtists = new Set();

    for (const item of items) {
      const mainArtistId = item.artists?.[0]?.id;
      if (mainArtistId && !seenArtists.has(mainArtistId)) {
        seenArtists.add(mainArtistId);
        uniqueTracks.push(formatTrack(item));
      }
      if (uniqueTracks.length >= 10) break;
    }

    return uniqueTracks.filter(Boolean);
  } catch (error) {
    console.error("Erro em getUndergroundTracks:", error);
    return [];
  }
};

// 2. Home: Artistas em Destaque (Foto, Nome e Gênero)
export const getFeaturedArtists = async () => {
  const token = ensureToken();
  if (!token) return [];

  try {
    const topArtistsRes = await spotify.getMyTopArtists({ limit: 3 });
    const userGenre = topArtistsRes.items?.[0]?.genres?.[0] || "indie";

    const searchRes = await spotify.searchArtists(`genre:"${userGenre}"`, { limit: 20 });
    const items = searchRes.artists?.items || [];

    return items
      .filter((artist) => artist.popularity < 65)
      .slice(0, 4)
      .map((artist) => ({
        id: artist.id,
        name: artist.name,
        genre: artist.genres?.[0] || "Indie",
        avatar: artist.images?.[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
      }));
  } catch (error) {
    console.error("Erro em getFeaturedArtists:", error);
    return [];
  }
};

// 3. Descobrir: Recomendações filtradas pelo slider de popularidade
export const getDiscoverRecommendations = async (maxPop = 30) => {
  const token = ensureToken();
  if (!token) return [];

  try {
    const topArtistsRes = await spotify.getMyTopArtists({ limit: 3 });
    const userGenre = topArtistsRes.items?.[0]?.genres?.[0] || "indie";

    const searchRes = await spotify.searchTracks(`genre:"${userGenre}"`, { limit: 50 });
    const items = searchRes.tracks?.items || [];

    return items
      .filter((t) => typeof t.popularity === "number" && t.popularity <= maxPop)
      .slice(0, 15)
      .map(formatTrack)
      .filter(Boolean);
  } catch (error) {
    console.error("Erro em getDiscoverRecommendations:", error);
    return [];
  }
};

// 4. Busca: Conectada diretamente à API do Spotify
export const searchTracks = async (query) => {
  if (!query || query.trim().length === 0) return [];
  const token = ensureToken();
  if (!token) return [];

  try {
    const response = await spotify.searchTracks(query, { limit: 20 });
    const items = response.tracks?.items || [];
    return items.map(formatTrack).filter(Boolean);
  } catch (error) {
    console.error("Erro na busca do Spotify:", error);
    return [];
  }
};

// 5. Coleção: Playlists reais do perfil conectado
export const getUserPlaylists = async () => {
  const token = ensureToken();
  if (!token) return [];

  try {
    const response = await spotify.getUserPlaylists({ limit: 50 });
    const items = response.items || [];
    return items.map((pl) => ({
      id: pl.id,
      name: pl.name,
      tracksCount: pl.tracks?.total || 0,
      cover: pl.images?.[0]?.url || null,
    }));
  } catch (error) {
    console.error("Erro em getUserPlaylists:", error);
    return [];
  }
};