// ─── lyrics.ovh ──────────────────────────────────────────────────────────────
async function getLyricsFromOvh(artist, title) {
  const response = await fetch(
    `https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`,
  )
  if (!response.ok) throw new Error(`lyrics.ovh: ${response.status}`)
  const data = await response.json()
  if (!data.lyrics?.trim()) throw new Error('lyrics.ovh: empty lyrics')
  return data.lyrics
}

// ─── some-random-api ─────────────────────────────────────────────────────────
async function getLyricsFromSomeRandomApi(artist, title) {
  const query = encodeURIComponent(`${artist} ${title}`)
  const response = await fetch(
    `https://some-random-api.com/lyrics?title=${query}`,
  )
  if (!response.ok) throw new Error(`some-random-api: ${response.status}`)
  const data = await response.json()
  if (data.error) throw new Error(`some-random-api: ${data.error}`)
  if (!data.lyrics?.trim()) throw new Error('some-random-api: empty lyrics')
  return data.lyrics
}

// ─── firstSuccess : prend la première Promise qui réussit ────────────────────
function firstSuccess(promises) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0
    promises.forEach((promise) => {
      promise.then(resolve).catch(() => {
        rejectedCount++
        if (rejectedCount === promises.length) {
          reject(new Error('All APIs failed'))
        }
      })
    })
  })
}
// ─── lrclib  ─────────────────────────────────────────────────
async function getLyricsFromLrclib(artist, title) {
  const url =
    `https://lrclib.net/api/get` +
    `?artist_name=${encodeURIComponent(artist)}` +
    `&track_name=${encodeURIComponent(title)}`

  const response = await fetch(url)

  // 404 = pas trouvé, pas une erreur serveur
  if (response.status === 404) throw new Error('lrclib: track not found')
  if (!response.ok) throw new Error(`lrclib: ${response.status}`)

  const data = await response.json()

  // On préfère plainLyrics, syncedLyrics en fallback
  const lyrics = data.plainLyrics || data.syncedLyrics
  if (!lyrics?.trim()) throw new Error('lrclib: empty lyrics')

  return lyrics
}

// ─── Fonction principale ──────────────────────────────────────────────────────
export async function getLyrics(artist, title) {
  try {
    try {
      const lyrics = await getLyricsFromLrclib(artist, title)
      console.log('✅ Paroles via lrclib')
      return lyrics
    } catch (err) {
      console.warn(`⚠️ lrclib échoué : ${err.message}`)
    }

    const lyrics = await firstSuccess([
      getLyricsFromOvh(artist, title),
      getLyricsFromSomeRandomApi(artist, title),
    ])
    console.log('✅ Paroles via fallback')
    return lyrics
  } catch {
    return 'No lyrics available for this track'
  }
}
