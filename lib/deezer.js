export async function searchTracks(query) {
  // Requête à l'API Deezer
  const response = await fetch(
    // Encode la query pour éviter les problèmes de caractères spéciaux
    `https://api.deezer.com/search?q=${encodeURIComponent(query)}`, // Utilise un proxy pour éviter les problèmes de CORS
  )

  if (!response.ok) {
    // Si la réponse n'est pas OK, on lance une erreur
    throw new Error('Deezer API error')
  }

  const data = await response.json() // Parse la réponse JSON

  return data.data // Deezer renvoie { data: [...] }
}
