import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

export const setAccessToken = (token) => {
  if (token) {
    spotify.setAccessToken(token);
  }
};

const getValidToken = () => {
  const token = localStorage.getItem("spotify_token");
  if (token) {
    spotify.setAccessToken(token);
    return token;
  }
  return null;
};

// Calcula a compatibilidade baseada no nível underground (quanto menos comercial, maior o RAW score)
const calculateRawScore = (popularity) => {
  const pop = typeof popularity === "number" && !isNaN(popularity) ? popularity : 20;
  const score = Math.max(75, Math.min(99, 100 - Math.floor(pop * 0.6)));
  return `${score}%`;
};

// Formata as faixas vindo do Spotify
const formatTrack = (track) => {
  return {
    id: track.id,
    uri: track.uri,
    title: track.name,
    artist: track.artists ? track.artists.map((a) => a.name).join(", ") : "Artista Desconhecido",
    cover: track.album?.images[0]?.url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300",
    rawScore: calculateRawScore(track.popularity),
    audioUrl: track.preview_url || null, // Se nulo, o player usará o Spotify Embed
    externalUrl: track.external_urls?.spotify,
  };
};

// 1. Home: Descobertas variadas baseadas no seu perfil + artistas undergrounds
export const getUndergroundTracks = async () => {
  const token = getValidToken();
  if (!token) return [];

  try {
    // Pega seus top artistas para usar como base de recomendação
    const topArtistsRes = await spotify.getMyTopArtists({ limit: 5 });
    const topArtists = topArtistsRes.items;

    let tracks = [];

    if (topArtists.length > 0) {
      // Busca músicas relacionadas aos gêneros dos seus artistas favoritos
      const genre = topArtists[0].genres[0] || "indie";
      const searchRes = await spotify.searchTracks(`genre:"${genre}"`, { limit: 20 });
      tracks = searchRes.tracks.items;
    } else {
      const searchRes = await spotify.searchTracks("tag:new indie", { limit: 20 });
      tracks = searchRes.tracks.items;
    }

    // Filtra e ordena para garantir diversidade de artistas
    const uniqueArtistsMap = new Map();
    tracks.forEach((t) => {
      const mainArtist = t.artists[0]?.id;
      if (mainArtist && !uniqueArtistsMap.has(mainArtist)) {
        uniqueArtistsMap.set(mainArtist, t);
      }
    });

    return Array.from(uniqueArtistsMap.values()).map(formatTrack);
  } catch (error) {
    console.error("Erro ao buscar Descobertas para você:", error);
    return [];
  }
};

// 2. Artistas em Destaque (Pouco conhecidos e compatíveis)
export const getFeaturedArtists = async () => {
  const token = getValidToken();
  if (!token) return [];

  try {
    const topArtistsRes = await spotify.getMyTopArtists({ limit: 3 });
    let seedGenre = "indie";

    if (topArtistsRes.items.length > 0 && topArtistsRes.items[0].genres.length > 0) {
      seedGenre = topArtistsRes.items[0].genres[0];
    }

    const res = await spotify.searchArtists(`genre:"${seedGenre}"`, { limit: 12 });
    // Pega artistas com popularidade menor que 50 (pouco conhecidos)
    const undergroundArtists = res.artists.items
      .filter((a) => a.popularity < 55)
      .slice(0, 6);

    return undergroundArtists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      genre: artist.genres[0] || "Underground",
      avatar: artist.images[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
    }));
  } catch (error) {
    console.error("Erro ao carregar artistas em destaque:", error);
    return [];
  }
};

// 3. Descobrir: Filtrado dinamicamente por popularidade máxima
export const getDiscoverRecommendations = async (maxPop = 30) => {
  const token = getValidToken();
  if (!token) return [];

  try {
    const topArtists = await spotify.getMyTopArtists({ limit: 3 });
    let query = "year:2023-2026 indie";

    if (topArtists.items.length > 0) {
      const genre = topArtists.items[0].genres[0] || "indie";
      query = `genre:"${genre}"`;
    }

    const res = await spotify.searchTracks(query, { limit: 50 });
    // Filtra estritamente pelo teto de popularidade
    const filtered = res.tracks.items.filter((t) => t.popularity <= maxPop);

    return filtered.slice(0, 15).map(formatTrack);
  } catch (error) {
    console.error("Erro na tela Descobrir:", error);
    return [];
  }
};

// 4. Busca em Tempo Real
export const searchTracks = async (query) => {
  if (!query || query.trim().length === 0) return [];
  const token = getValidToken();
  if (!token) return [];

  try {
    const response = await spotify.searchTracks(query, { limit: 20 });
    return response.tracks.items.map(formatTrack);
  } catch (error) {
    console.error("Erro ao realizar busca no Spotify:", error);
    return [];
  }
};

// 5. Playlists da sua biblioteca no Spotify
export const getUserPlaylists = async () => {
  const token = getValidToken();
  if (!token) return [];

  try {
    const response = await spotify.getUserPlaylists({ limit: 50 });
    return response.items.map((pl) => ({
      id: pl.id,
      name: pl.name,
      tracksCount: pl.tracks.total,
      cover: pl.images[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300",
    }));
  } catch (error) {
    console.error("Erro ao buscar Playlists:", error);
    return [];
  }
};