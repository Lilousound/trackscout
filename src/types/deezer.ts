export interface DeezerArtist {
  id: number
  name: string
  link: string
  picture: string
  picture_small: string
  picture_medium: string
  picture_big: string
  picture_xl: string
  tracklist: string
  type: string
}

export interface DeezerAlbum {
  id: number
  title: string
  cover: string
  cover_small: string
  cover_medium: string
  cover_big: string
  cover_xl: string
  release_date?: string
  tracklist: string
  type: string
}

export interface DeezerTrack {
  id: number
  title: string
  duration: number
  preview: string
  artist: DeezerArtist
  album: DeezerAlbum
}

export interface LyricsResponse {
  lyrics: string
}
