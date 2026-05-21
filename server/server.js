import express from 'express'
import fetch from 'node-fetch'
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
    const tracks = await searchTracks(q)
    res.json(tracks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Route pour /api/lyrics
app.get('/api/lyrics', async (req, res) => {
  const { artist, title } = req.query

  try {
    const data = await getLyrics(artist, title)
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
