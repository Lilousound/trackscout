export default async function handler(req, res) {
  const { artist, title } = req.query

  // 🔴 Vérification obligatoire
  if (!artist || !title) {
    return res.status(400).json({
      error: 'artist et title sont requis',
    })
  }

  try {
    const response = await fetch(
      `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
    )

    const data = await response.json()

    // ⚠️ Si pas de paroles trouvées
    if (data.error) {
      return res.status(404).json({
        error: 'Paroles introuvables',
      })
    }

    return res.status(200).json({
      lyrics: data.lyrics,
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Erreur serveur',
      details: error.message,
    })
  }
}
