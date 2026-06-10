export async function getLyrics(artist, title) {
  try {
    const response = await fetch(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
    )

    if (!response.ok) {
      // Si l'API retourne une erreur (404, 500, etc.)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    // Si l'API retourne { lyrics: "..." }
    return data.lyrics || 'No lyrics available for this track'
  } catch (err) {
    console.error('Error in getLyrics :', err)
    // Retourne un message par défaut en cas d'erreur
    return 'No lyrics available for this track'
  }
}
