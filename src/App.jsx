import { useState, useRef } from 'react'
import { searchTracks } from './services/api'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import TracksList from './components/TracksList'

function App() {
  const [query, setQuery] = useState('')
  const [tracks, setTracks] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)
  const audioRef = useRef(null)
  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSearch = async () => {
    const results = await searchTracks(query)
    setTracks(results)
    console.log(tracks)
  }

  const handlePlay = (trackId, previewUrl) => {
    if (trackId === currentTrackId && isPlaying) {
      // Pause
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    // Arrête l'ancien et lance le nouveau
    if (audioRef.current) {
      audioRef.current.pause()
    }

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
      />
    </div>
  )
}

export default App
