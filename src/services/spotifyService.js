import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

export const setAccessToken = (token) => {
  spotify.setAccessToken(token);
};

export const getUndergroundTracks = async () => {
  try {
    const response = await spotify.searchTracks("genre:indie", { limit: 10 });
    return response.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0]?.name || "Artista Independente",
      cover: track.album.images[0]?.url,
      rawScore: `${Math.min(99, 100 - track.popularity)}%`,
      audioUrl: track.preview_url
    }));
  } catch (error) {
    console.error("Erro na API do Spotify:", error);
    return null;
  }
};

export const searchTracks = async (query) => {
  if (!query) return [];
  try {
    const response = await spotify.searchTracks(query, { limit: 12 });
    return response.tracks.items.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0]?.name,
      cover: track.album.images[0]?.url,
      rawScore: `${Math.min(99, 100 - track.popularity)}%`,
      audioUrl: track.preview_url
    }));
  } catch (error) {
    console.error("Erro na busca:", error);
    return [];
  }
};

export const getUserPlaylists = async () => {
  try {
    const response = await spotify.getUserPlaylists();
    return response.items.map((pl) => ({
      id: pl.id,
      name: pl.name,
      tracksCount: pl.tracks.total,
      cover: pl.images[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300"
    }));
  } catch (error) {
    console.error("Erro ao buscar playlists:", error);
    return [];
  }
};