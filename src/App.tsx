import { useState, useRef } from 'react'
import { searchTracks } from './services/api.js'
import type { DeezerTrack } from './types/deezer'

import Header from './components/Header.jsx'
import SearchBar from './components/SearchBar.jsx'
import TracksList from './components/TracksList.jsx'
import LearnMore from './components/LearnMore.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [query, setQuery] = useState('')
  const [tracks, setTracks] = useState<DeezerTrack[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrackId, setCurrentTrackId] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleSearch = async () => {
    const results = await searchTracks(query)
    setTracks(results)
  }

  const handlePlay = (trackId: number, previewUrl: string) => {
    // 1. Vérifie que previewUrl est valide
    if (!previewUrl) {
      console.error('URL de preview invalide ou manquante.')
      return
    }

    // 2. Si c'est le même track et qu'il est en lecture → pause
    if (trackId === currentTrackId && isPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    // 3. Arrête l'ancien track s'il existe
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0 // Réinitialise la position
    }

    // 4. Crée une nouvelle instance Audio et lance la lecture
    const audio = new Audio(previewUrl)
    audioRef.current = audio // Met à jour la ref

    audio
      .play()
      .then(() => {
        setCurrentTrackId(trackId)
        setIsPlaying(true)
      })
      .catch((error) => {
        console.error('Erreur de lecture :', error)
        setIsPlaying(false)
        audioRef.current = null // Nettoie la ref en cas d'erreur
      })

    // 5. Nettoyage automatique quand le track change
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }

  //MODAL LYRICS
  const [modalTrack, setModalTrack] = useState<DeezerTrack | null>(null) // Track pour laquelle on affiche la modal
  const [modalLyrics, setModalLyrics] = useState('') // Paroles à afficher

  // Fonction pour ouvrir la modal
  const openModalWithLyrics = (track: DeezerTrack, lyrics: string) => {
    setModalTrack(track)
    setModalLyrics(lyrics)
  }

  // Fonction pour fermer la modal
  const closeModal = () => {
    setModalTrack(null)
    setModalLyrics('')
  }

  return (
    <div className="text-white min-h-screen w-full bg-linear-to-bl from-blue-950 to-blue-800">
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
