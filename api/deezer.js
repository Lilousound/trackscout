// api/deezer.js est une route côté serveur qui agit comme un proxy entre le frontend et l'API Deezer.
import { searchTracks } from '../lib/deezer.js'

export default async function handler(req, res) {
  const { q } = req.query

  try {
    // 1. Récupère les tracks depuis /search
    const tracks = await searchTracks(q)

    // 2. Récupère les IDs d'albums uniques
    const albumIds = [...new Set(tracks.map((track) => track.album.id))]

    // 3. Pour chaque album, récupère release_date
    const albumsReleaseDates = {}
    for (const albumId of albumIds) {
      const albumResponse = await fetch(
        `https://api.deezer.com/album/${albumId}`,
      )
      const albumData = await albumResponse.json()
      albumsReleaseDates[albumId] = albumData.release_date
    }

    // 4. Ajoute release_date à chaque track
    const tracksWithReleaseDate = tracks.map((track) => ({
      ...track,
      album: {
        ...track.album,
        release_date: albumsReleaseDates[track.album.id],
      },
    }))

    // 5. Renvoie les tracks avec release_date
    res.status(200).json(tracksWithReleaseDate)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
