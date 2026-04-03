// src/services/api.js
export const searchTracks = async (query) => {
  try {
    const queryCleaned = encodeURIComponent(query)
    console.log('Front-end: Recherche pour:', queryCleaned)
    const response = await fetch(
      `http://localhost:3001/api/search?query=${queryCleaned}`,
    )
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Erreur : ${response.status} - ${errorText}`)
    }
    const data = await response.json()
    return data.data || [] // <-- Change ici : Deezer utilise `data.data`
  } catch (error) {
    console.error('Erreur dans searchTracks :', error)
    throw error
  }
}
