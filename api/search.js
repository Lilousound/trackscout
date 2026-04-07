export default async function handler(req, res) {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({ error: "Le paramètre 'query' est requis." })
  }

  try {
    // Appelle l'API Deezer depuis le serveur (pas de blocage CORS)
    const deezerResponse = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`,
    )
    const data = await deezerResponse.json()

    // Enrichis les données si besoin (ex: ajouter release_date)
    const tracksWithAlbumDate = await Promise.all(
      data.data.map(async (track) => {
        if (track.album?.id) {
          const albumResponse = await fetch(
            `https://api.deezer.com/album/${track.album.id}`,
          )
          const albumData = await albumResponse.json()
          return {
            ...track,
            album: {
              ...track.album,
              release_date: albumData.release_date,
            },
          }
        }
        return track
      }),
    )

    res.status(200).json({ data: tracksWithAlbumDate })
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne', details: error.message })
  }
}
