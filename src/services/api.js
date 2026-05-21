const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:3001/api/deezer'
    : '/api/deezer'

export async function searchTracks(query) {
  const res = await fetch(`${API_BASE_URL}?q=${encodeURIComponent(query)}`)

  if (!res.ok) {
    throw new Error('API error')
  }

  return res.json()
}
