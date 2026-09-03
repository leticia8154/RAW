import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

export const setAccessToken = (token) => {
  spotify.setAccessToken(token);
};

export const getUndergroundTracks = async () => {
  try {
    const response = await spotify.searchTracks("tag:new", { limit: 20 });
    // Filtra artistas com menos de 30% de popularidade (Underground)
    const underground = response.tracks.items.filter(
      (track) => track.artist_popularity === undefined || track.popularity < 30
    );

    return (underground.length > 0 ? underground : response.tracks.items).map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      cover: track.album.images[0]?.url || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300",
      rawScore: `${100 - track.popularity}%`,
      audioUrl: track.preview_url,
    }));
  } catch (error) {
    console.error("Erro na busca underground:", error);
    return null;
  }
};

export const getUserPlaylists = async () => {
  try {
    const response = await spotify.getUserPlaylists();
    return response.items.map((pl) => ({
      id: pl.id,
      name: pl.name,
      tracksCount: pl.tracks.total,
      cover: pl.images[0]?.url || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300",
    }));
  } catch (error) {
    console.error("Erro ao carregar playlists:", error);
    return [];
  }
};