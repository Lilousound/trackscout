export const searchTracks = async (query) => {
  const queryCleaned = encodeURIComponent(query)
  const response = await fetch(
    `https://itunes.apple.com/search?term=${queryCleaned}&media=music`,
  )
  const data = await response.json()
  return data.results
}
