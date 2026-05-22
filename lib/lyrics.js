export async function getLyrics(artist, title) {
  const response = await fetch(
    `https://api.lyrics.ovh/v1/%7B${artist}%7D/%7B${title}%7D`,
  )

  if (!response.ok) {
    throw new Error('Lyrics API error')
  }

  return response.json()
}
