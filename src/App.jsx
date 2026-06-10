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
  const audioRef = useRef(null)
  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSearch = async () => {
    const results = await searchTracks(query)
    setTracks(results)
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

  //MODAL LYRICS
  const [modalTrack, setModalTrack] = useState(null) // Track pour laquelle on affiche la modal
  const [modalLyrics, setModalLyrics] = useState('') // Paroles à afficher

  // Fonction pour ouvrir la modal
  const openModalWithLyrics = (track, lyrics) => {
    setModalTrack(track)
    setModalLyrics(lyrics)
  }

  // Fonction pour fermer la modal
  const closeModal = () => {
    setModalTrack(null)
    setModalLyrics('')
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
        openModalWithLyrics={openModalWithLyrics}
      />
      <LearnMore />
      <Footer />

      {/* Modal pour les paroles (au niveau racine) */}
      {modalTrack && (
        <>
          {/* Overlay sombre pour toute la page */}
          <div
            className="fixed inset-0 z-40 bg-black/70"
            onClick={closeModal}
          ></div>

          {/* Modal centrée */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="relative bg-blue-950/90 rounded-xl p-6 max-w-2xl w-full border border-white/20 shadow-lg">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-white/80 hover:text-white text-2xl"
              >
                &times;
              </button>
              <h3 className="text-white text-xl mb-4">{modalTrack.title}</h3>
              <div className="text-blue-100/90 text-sm overflow-y-auto max-h-96 pr-4">
                {modalLyrics
                  ? modalLyrics
                      .split('\n')
                      .map((line, index) => <p key={index}>{line}</p>)
                  : 'No lyrics available for this track'}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
