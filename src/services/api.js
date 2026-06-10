const API_BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:3001/api' : '/api'

export async function searchTracks(query) {
  const res = await fetch(
    `${API_BASE_URL}/deezer?q=${encodeURIComponent(query)}`,
  )
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export async function getLyrics(artist, title) {
  const res = await fetch(
    `${API_BASE_URL}/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`,
  )
  if (!res.ok) throw new Error('Lyrics error')
  return res.json()
}
