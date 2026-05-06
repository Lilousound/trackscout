import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
const PORT = 3001

// Middleware pour activer CORS
app.use(cors())

// Middleware pour parser les requêtes JSON
app.use(express.json())

// Route pour /api/deezer
app.get('/api/deezer', async (req, res) => {
  const { q } = req.query

  if (!q) {
    return res.status(400).json({ error: "Le paramètre 'q' est requis." })
  }

  try {
    // 1. Appel initial à Deezer pour chercher les titres
    const searchResponse = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`,
    )
    const searchData = await searchResponse.json()

    // 2. Enrichissement des données avec release_date
    const tracksWithAlbumDate = await Promise.all(
      searchData.data.map(async (track) => {
        if (track.album?.id) {
          // Appel à /album/{id} pour récupérer release_date
          const albumResponse = await fetch(
            `https://api.deezer.com/album/${track.album.id}`,
          )
          const albumData = await albumResponse.json()

          // Fusion des données
          return {
            ...track,
            album: {
              ...track.album,
              release_date: albumData.release_date, // Ajoute la date de sortie
            },
          }
        }
        return track
      }),
    )

    // 3. Renvoie les données enrichies
    res.status(200).json({ data: tracksWithAlbumDate })
  } catch (error) {
    console.error('Erreur dans /api/deezer:', error)
    res.status(500).json({ error: 'Erreur API Deezer', details: error.message })
  }
})

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
