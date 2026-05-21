export async function searchTracks(query) {
  const response = await fetch(
    `https://api.deezer.com/search?q=${encodeURIComponent(query)}`,
  )

  if (!response.ok) {
    throw new Error('Deezer API error')
  }

  const data = await response.json()

  return data.data // Deezer renvoie { data: [...] }
}
