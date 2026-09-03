import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

export const setAccessToken = (token) => {
  spotify.setAccessToken(token);
};

export const getUndergroundTracks = async (query = "indie") => {
  try {
    const response = await spotify.searchTracks(query, { limit: 50 });
    const tracks = response.tracks.items;

    const undergroundTracks = tracks.filter((track) => track.popularity <= 30);

    return undergroundTracks.map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      cover: track.album.images[0]?.url,
      popularity: track.popularity,
      rawScore: 100 - track.popularity, // RAW Score Invertido
      uri: track.uri,
      duration: `${Math.floor(track.duration_ms / 60000)}:${Math.floor((track.duration_ms % 60000) / 1000).toString().padStart(2, '0')}`,
    }));
  } catch (error) {
    console.error("Erro ao buscar músicas no Spotify:", error);
    return [];
  }
};

export const getUserPlaylists = async () => {
  try {
    const playlists = await spotify.getUserPlaylists();
    return playlists.items;
  } catch (error) {
    console.error("Erro ao buscar playlists do usuário:", error);
    return [];
  }
};