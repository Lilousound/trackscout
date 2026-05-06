function TrackCard({ track, onPlay, currentTrackId, isPlaying }) {
  const year = track.album?.release_date
    ? track.album.release_date.split('-')[0]
    : 'Inconnu'

  // Fonction pour convertir les secondes en mm:ss
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = String(seconds % 60).padStart(2, '0') // Ajoute un 0 si < 10
    return `${mins}:${secs}`
  }
  return (
    <div className="mt-6 w-full max-w-2xl mx-auto border border-white/10 rounded-xl bg-white/5 p-4 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-[#8267E8]/30 hover:scale-[1.01] flex gap-4">
      {/* Colonne gauche */}
      <div className="flex flex-col justify-between w-1/2">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white text-xl leading-tight">
            {track.title}
          </h3>

          <p className="text-blue-200 text-xl">{track.artist.name}</p>

          <p className="text-blue-300/80 text-sm italic">{track.album.title}</p>
        </div>

        <p className="text-blue-300/80 text-sm">
          Duration: {formatDuration(track.duration)}
        </p>
      </div>

      {/* Colonne droite */}
      <div className="w-1/2 flex flex-col items-center justify-between">
        <img
          src={track.album.cover_big}
          alt="Track Artwork"
          className="w-36 h-36 rounded-lg object-cover shadow-md"
        />

        <button
          onClick={() => onPlay(track.id, track.preview)}
          className="relative mt-5 p-2 rounded-full bg-blue-950 hover:bg-blue-900 transition-colors duration-200 shadow-md hover:shadow-blue-800/50"
        >
          <img
            src={
              track.id === currentTrackId && isPlaying
                ? '/stop-button.png'
                : '/play-button.png'
            }
            alt={track.id === currentTrackId && isPlaying ? 'Stop' : 'Play'}
            className="w-12 h-12 brightness-100"
          />
          <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-5 bg-white transition duration-300"></div>{' '}
        </button>
      </div>
    </div>
  )
}

export default TrackCard
