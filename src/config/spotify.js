export const authEndpoint = "https://accounts.spotify.com/authorize";
export const clientId = "490018501b90452fa8b5802b78b7ed63";
export const redirectUri = "http://127.0.0.1:5173/";

export const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;