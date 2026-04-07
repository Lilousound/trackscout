// src/services/api.js
const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3001/api/search' // En local : utilise ton serveur Node.js
    : 'https://api.deezer.com/search' // En production : appelle Deezer directement

export const searchTracks = async (query) => {
  try {
    const queryCleaned = encodeURIComponent(query)
    console.log('Recherche pour:', queryCleaned)

    // Appelle l'URL appropriée selon l'environnement
    const url =
      import.meta.env.MODE === 'development'
        ? `${API_BASE_URL}?query=${queryCleaned}`
        : `${API_BASE_URL}?q=${queryCleaned}`

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
