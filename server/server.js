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
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`,
    )
    const data = await response.json()
    res.status(200).json(data) // Renvoie les données brutes de Deezer
  } catch (error) {
    console.error('Erreur dans /api/deezer:', error)
    res.status(500).json({ error: 'Erreur API Deezer' })
  }
})

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
})
