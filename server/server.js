import express from 'express'
import cors from 'cors'
import { searchTracks } from '../lib/deezer.js'
import { getLyrics } from '../lib/lyrics.js'

const app = express()
const PORT = 3001

// Middleware pour activer CORS
app.use(cors())

// Middleware pour parser les requêtes JSON
app.use(express.json())

// Route pour /api/deezer
app.get('/api/deezer', async (req, res) => {
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
})

// Route pour /api/lyrics
app.get('/api/lyrics', async (req, res) => {
  const { artist, title } = req.query

  try {
    const lyrics = await getLyrics(artist, title)
    res.json({ lyrics })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
