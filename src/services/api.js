// src/services/api.js
export const searchTracks = async (query) => {
  try {
    const queryCleaned = encodeURIComponent(query)
    console.log('Recherche pour:', queryCleaned)

    // Utilise une valeur par défaut si la variable n'est pas définie
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://api.deezer.com'

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
    return data.data || [] // Toujours renvoyer un tableau
  } catch (error) {
    console.error('Erreur dans searchTracks :', error)
    return [] // Renvoie un tableau vide en cas d'erreur
  }
}
