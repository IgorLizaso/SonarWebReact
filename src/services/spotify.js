const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

// Obtener token de acceso
export async function getAccessToken() {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });
  const data = await result.json();
  return data.access_token;
}

// Buscar canciones por término
export async function searchTracks(query, token) {
  const result = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: {
        Authorization: "Bearer " + token,
      },
    }
  );
  const data = await result.json();
  // Manejo seguro de la respuesta
  if (data.tracks && Array.isArray(data.tracks.items)) {
    return data.tracks.items;
  }
  return [];
}