// lib/lyrics.js

import Genius from 'genius-lyrics'

const geniusClient = new Genius.Client(process.env.GENIUS_ACCESS_TOKEN)

// ─── Nettoyage des paroles Genius ─────────────────────────────────────────────
function cleanGeniusLyrics(lyrics) {
  return (
    lyrics
      // Supprime tout ce qui précède le premier marqueur de section [Verse], [Chorus], etc.
      .replace(/^[\s\S]*?(?=\[)/, '')

      // Supprime les annotations "Read More" qui traînent parfois en fin de section
      .replace(/\d+ Contributors?.*?Read More\n?/gi, '')

      // Supprime les blocs "Translations" + liste de langues
      .replace(/Translations[\w\s,éàüöäçñ]+\n/gi, '')

      // Supprime les lignes "X Contributors"
      .replace(/\d+ Contributors?\n?/gi, '')

      // Supprime les lignes "NomDeLaChanson Lyrics"
      .replace(/.+Lyrics\n?/g, '')

      // Supprime les guillemets typographiques
      .replace(/[""]/g, '')

      // Nettoie les lignes vides multiples
      .replace(/\n{3,}/g, '\n\n')

      .trim()
  )
}

// ─── Genius ───────────────────────────────────────────────────────────────────
async function getLyricsFromGenius(artist, title) {
  const searches = await geniusClient.songs.search(`${artist} ${title}`)

  if (!searches || searches.length === 0) {
    throw new Error('Genius: no results found')
  }

  const firstSong = searches[0]
  const lyrics = await firstSong.lyrics()

  if (!lyrics?.trim()) throw new Error('Genius: empty lyrics')

  return cleanGeniusLyrics(lyrics)
}

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

// ─── Fonction principale ──────────────────────────────────────────────────────
export async function getLyrics(artist, title) {
  try {
    // Genius en premier : meilleur catalogue, paroles complètes
    try {
      const lyrics = await getLyricsFromGenius(artist, title)
      console.log('✅ Paroles via Genius')
      return lyrics
    } catch (err) {
      console.warn(`⚠️ Genius échoué : ${err.message}`)
    }

    // Fallback parallèle : ovh + some-random-api
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
