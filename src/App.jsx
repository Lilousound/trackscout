import { useState, useRef } from 'react'
import { searchTracks } from './services/api.js'

import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TracksList from './components/TracksList'
import LearnMore from './components/LearnMore'
import Footer from './components/Footer'

function App() {
  const [query, setQuery] = useState('')
  const [tracks, setTracks] = useState([])
  const [lyrics, setLyrics] = useState([])
  const audioRef = useRef(null)
  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSearch = async () => {
    const results = await searchTracks(query)
    setTracks(results)
    // console.log(results.map((track) => `${track.artist.name} - ${track.title}`)) // Affiche l'artiste et le titre de chaque résultat
    // const lyrics = await getLyrics(results[0].artist.name, results[0].title)
    // console.log(lyrics) // Affiche les paroles récupérées
    // setLyrics(lyrics)
  }

  const handlePlay = (trackId, previewUrl) => {
    if (trackId === currentTrackId && isPlaying) {
      // Si c'est le même track et qu'il est en lecture → pause
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    // Arrête l'ancien track s'il existe
    if (audioRef.current) {
      audioRef.current.pause()
    }

    // Lance le nouveau track
    const audio = new Audio(previewUrl)
    audio.play()
    audioRef.current = audio
    setCurrentTrackId(trackId)
    setIsPlaying(true)
  }

  return (
    <div className="text-white min-h-screen w-full bg-gradient-to-bl from-blue-950 to-blue-800">
      <Header />
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <TracksList
        tracks={tracks}
        onPlay={handlePlay}
        currentTrackId={currentTrackId}
        isPlaying={isPlaying}
        lyrics={lyrics}
      />
      <LearnMore />
      <Footer />
    </div>
  )
}

export default App
