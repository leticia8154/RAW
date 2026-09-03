export const clientId = "490018501b90452fa8b5802b78b7ed63";
export const redirectUri = "https://turbo-fishstick-7vw67qx554j9cp6wx-5176.app.github.dev/";

export const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private"
];

// Utilitários para gerar Code Verifier e Code Challenge
function generateRandomString(length) {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function redirectToSpotifyAuth() {
  const verifier = generateRandomString(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("code_verifier", verifier);

  const params = new URLSearchParams({
    client_id: clientId,
    response_type: "code",
    redirect_uri: redirectUri,
    scope: scopes.join(" "),
    code_challenge_method: "S256",
    code_challenge: challenge,
    show_dialog: "true"
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

export async function getAccessTokenWithCode(code) {
  const verifier = localStorage.getItem("code_verifier");

  const params = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    code_verifier: verifier,
  });

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });

  const data = await result.json();
  if (data.access_token) {
    localStorage.setItem("spotify_token", data.access_token);
    return data.access_token;
  }
  return null;
}