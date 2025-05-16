const CLIENT_ID = process.env.REACT_APP_JAMENDO_CLIENT_ID; // Usa la variable de entorno

export async function searchJamendoTracks(query) {
  const url = `https://api.jamendo.com/v3.0/tracks/?client_id=${CLIENT_ID}&format=json&limit=20&namesearch=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results;
  }
  return [];
}