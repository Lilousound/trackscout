import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001

app.use(
  cors({
    origin: 'http://localhost:5173', // Remplace par l'URL de ton front-end
    methods: ['GET'], // Autorise uniquement les requêtes GET
  }),
)

// server/server.js
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query
    if (!query) {
      return res.status(400).json({ error: "Le paramètre 'query' est requis." })
    }

    // 1. Recherche les titres
    const searchResponse = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`,
    )
    const searchData = await searchResponse.json()

    // 2. Pour chaque titre, récupère les détails de l'album pour obtenir la date
    const tracksWithAlbumDate = await Promise.all(
      searchData.data.map(async (track) => {
        if (track.album && track.album.id) {
          const albumResponse = await fetch(
            `https://api.deezer.com/album/${track.album.id}`,
          )
          const albumData = await albumResponse.json()
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

    res.json({ data: tracksWithAlbumDate }) // Renvoie les données enrichies
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne', details: error.message })
  }
})

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`)
})
