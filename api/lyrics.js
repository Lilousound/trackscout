import { getLyrics } from '../lib/lyrics.js'

export default async function handler(req, res) {
  const { artist, title } = req.query

  try {
    const data = await getLyrics(artist, title)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
