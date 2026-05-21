import { searchTracks } from '../lib/deezer.js'

export default async function handler(req, res) {
  const { q } = req.query

  try {
    const tracks = await searchTracks(q)
    res.status(200).json(tracks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
