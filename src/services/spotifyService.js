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

// Formata o Score de Compatibilidade RAW baseado na Popularidade real da faixa
const getRawScore = (pop) => {
  const popularity = typeof pop === "number" && !isNaN(pop) ? pop : 20;
  const score = Math.max(65, Math.min(99, 100 - popularity));
  return `${score}%`;
};

// Formata objeto de faixa para o padrão do app
const formatTrack = (track) => {
  // Garante um preview de áudio audível
  const audio = track.preview_url || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  return {
    id: track.id,
    title: track.name,
    artist: track.artists.map((a) => a.name).join(", "),
    cover: track.album?.images[0]?.url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300",
    rawScore: getRawScore(track.popularity),
    audioUrl: audio,
  };
};

// 1. Busca faixas para a Home baseadas nos seus gêneros/artistas mais ouvidos
export const getUndergroundTracks = async () => {
  const token = getValidToken();
  if (!token) return [];

  try {
    const topArtists = await spotify.getMyTopArtists({ limit: 3 });
    let query = "genre:indie";
    if (topArtists.items.length > 0) {
      const artistName = topArtists.items[0].name;
      query = `artist:${artistName}`;
    }

    const response = await spotify.searchTracks(query, { limit: 10 });
    return response.tracks.items.map(formatTrack);
  } catch (error) {
    console.error("Erro ao buscar faixas underground:", error);
    return [];
  }
};

// 2. Busca Artistas em Destaque REAIS da sua conta Spotify
export const getFeaturedArtists = async () => {
  const token = getValidToken();
  if (!token) return [];

  try {
    const topArtists = await spotify.getMyTopArtists({ limit: 6 });
    if (topArtists.items.length > 0) {
      return topArtists.items.map((artist) => ({
        id: artist.id,
        name: artist.name,
        genre: artist.genres[0] || "Underground",
        avatar: artist.images[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
      }));
    }

    const searchResponse = await spotify.searchArtists("genre:indie", { limit: 6 });
    return searchResponse.artists.items.map((artist) => ({
      id: artist.id,
      name: artist.name,
      genre: artist.genres[0] || "Indie",
      avatar: artist.images[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
    }));
  } catch (error) {
    console.error("Erro ao buscar artistas em destaque:", error);
    return [];
  }
};

// 3. Recomendação dinamicamente alterada pelo Slider de Popularidade Máxima
export const getDiscoverRecommendations = async (maxPop = 20) => {
  const token = getValidToken();
  if (!token) return [];

  try {
    // Tenta recomendações personalizadas pelos seus seeds
    const topArtists = await spotify.getMyTopArtists({ limit: 2 });
    let seedArtists = topArtists.items.map((a) => a.id);

    if (seedArtists.length === 0) {
      // Fallback para IDs de sementes válidos
      seedArtists = ["0Eme2R272EfFrA18L2P238"];
    }

    const response = await spotify.getRecommendations({
      seed_artists: seedArtists.slice(0, 2),
      max_popularity: maxPop,
      limit: 15,
    });

    return response.tracks.map(formatTrack);
  } catch (error) {
    console.error("Erro nas recomendações:", error);
    // Se falhar getRecommendations, faz uma busca por popularidade
    try {
      const searchRes = await spotify.searchTracks("year:2023-2026 indie", { limit: 15 });
      return searchRes.tracks.items
        .filter((t) => t.popularity <= maxPop + 10)
        .map(formatTrack);
    } catch (e) {
      return [];
    }
  }
};

// 4. Busca por texto em tempo real no Spotify
export const searchTracks = async (query) => {
  if (!query || query.trim().length === 0) return [];
  const token = getValidToken();
  if (!token) return [];

  try {
    const response = await spotify.searchTracks(query, { limit: 12 });
    return response.tracks.items.map(formatTrack);
  } catch (error) {
    console.error("Erro na busca do Spotify:", error);
    return [];
  }
};

// 5. Playlists reais salvas na sua biblioteca
export const getUserPlaylists = async () => {
  const token = getValidToken();
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
    console.error("Erro ao buscar playlists do perfil:", error);
    return [];
  }
};