export async function getLyrics(artist, title) {
  const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)

  if (!response.ok) {
    throw new Error('Lyrics API error')
  }

  return response.json()
}
