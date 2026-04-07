import express from 'express'
import cors from 'cors'

const app = express()
const port = 3001

app.use(cors())

app.get('/api/search', async (req, res) => {
  try {
    const { q } = req.query // Change "query" en "q"
    if (!q) {
      return res.status(400).json({ error: "Le paramètre 'q' est requis." })
    }

    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`,
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Erreur interne', details: error.message })
  }
})

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`)
})
