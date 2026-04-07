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
    <div className="mt-6 border border-gray-700 rounded-lg bg-gray-800/50 p-3 shadow-lg backdrop-blur-sm w-2/5 transition-all duration-300 hover:shadow-blue-500/30 hover:scale-[1.01] flex justify-evenly w-2/5">
      {/* Colonne gauche */}
      <div className="flex flex-col justify-between w-1/2 ml-2 mt-2">
        <div className="flex flex-col gap-2.5">
          <h3 className="font-bold text-blue-50 text-lg">{track.title}</h3>
          <p className="font-medium text-gray-200">{track.artist.name}</p>
          <p className="font-light text-gray-200 italic">
            Album: {track.album.title}
          </p>
          <p className="font-light text-gray-200 italic">
            Duration: {formatDuration(track.duration)}
          </p>
        </div>
        <p className="text-sm text-gray-400">{year}</p>
      </div>

      {/* Colonne droite */}
      <div className="w-1/2 flex flex-col items-center justify-around">
        <img
          src={track.album.cover_big}
          alt="Track Artwork"
          className="w-40 h-40 rounded-md object-cover shadow-md"
        />
        <button
          onClick={() => onPlay(track.id, track.preview)}
          className="relative mt-5 p-2 rounded-full bg-blue-800/80 hover:bg-blue-800 transition-colors duration-200 shadow-md hover:shadow-blue-400/50"
        >
          <img
            src={
              track.id === currentTrackId && isPlaying
                ? './stop-button.png'
                : './play-button.png'
            }
            alt={track.id === currentTrackId && isPlaying ? 'Stop' : 'Play'}
            className="w-12 h-12 brightness-100"
          />
          <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 bg-white/30 transition-opacity duration-200"></div>
        </button>
      </div>
    </div>
  )
}

export default TrackCard
