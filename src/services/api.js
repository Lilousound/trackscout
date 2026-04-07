// src/services/api.js
export const searchTracks = async (query) => {
  try {
    const queryCleaned = encodeURIComponent(query)
    console.log('Recherche pour:', queryCleaned)

    const apiUrl = import.meta.env.VITE_API_BASE_URL
    let response

    if (apiUrl.includes('localhost')) {
      // Mode local : appelle ton serveur Node.js
      response = await fetch(`${apiUrl}/search?query=${queryCleaned}`)
    } else {
      // Mode production : appelle directement Deezer
      response = await fetch(`${apiUrl}/search?q=${queryCleaned}`)
    }

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur : ${response.status} - ${errorText}`)
    }

    const data = await response.json()

    // Normalise les données pour toujours renvoyer un tableau
    if (apiUrl.includes('localhost')) {
      // En local, ton serveur renvoie probablement { data: [...] }
      return data.data || []
    } else {
      // En production, Deezer renvoie { data: [...] }
      return data.data || []
    }
  } catch (error) {
    console.error('Erreur dans searchTracks :', error)
    return [] // Renvoie un tableau vide en cas d'erreur
  }
}
