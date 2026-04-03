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

app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query
    if (!query) {
      return res.status(400).json({ error: "Le paramètre 'query' est requis." })
    }

    // Appel direct à Deezer (pas de token nécessaire)
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`,
    )
    const data = await response.json()
    res.json(data) // Renvoie les données brutes de Deezer
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne', details: error.message })
  }
})

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`)
})
