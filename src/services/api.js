const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3001/api/deezer' // En local : Node.js
    : '/api/deezer' // En production : Vercel

export const searchTracks = async (query) => {
  try {
    const queryCleaned = encodeURIComponent(query)
    console.log('Recherche pour:', queryCleaned)

    // Appelle l'URL appropriée selon l'environnement
    const url = `${API_BASE_URL}?q=${queryCleaned}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Erreur: ${response.status}`)
    }

    const data = await response.json()
    // En local, ton serveur renvoie { data: [...] }
    // En production, Deezer renvoie { data: [...] }
    return data.data || []
  } catch (error) {
    console.error('Erreur dans searchTracks:', error)
    return []
  }
}
