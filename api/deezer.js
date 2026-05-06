export default async function handler(req, res) {
  const { q } = req.query

  if (!q) {
    return res.status(400).json({ error: "Le paramètre 'q' est requis." })
  }

  try {
    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`,
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    console.error('Erreur dans /api/deezer:', error)
    res.status(500).json({ error: 'Erreur API Deezer' })
  }
}
