function TrackCard({ track }) {
  console.log(track)
  const date = new Date(track.releaseDate)
  const year = date.getFullYear()

  const handlePlay = (previewUrl) => {
    const audio = new Audio(previewUrl)
    audio.play()
  }

  return (
    <div className="mt-6 border border-gray-700 rounded-lg bg-gray-800/50 p-3 shadow-lg backdrop-blur-sm w-2/5 transition-all duration-300 hover:shadow-blue-500/30 hover:scale-[1.01] flex justify-evenly w-2/5">
      {/* col gauche */}
      <div className="flex flex-col justify-between w-1/2 ml-2 mt-2">
        <div className="flex flex-col gap-2.5">
          <h3 className="font-bold text-blue-50 text-lg">{track.trackName}</h3>
          <p className="font-medium text-gray-200 italic">{track.artistName}</p>
        </div>

        <p className="text-sm text-gray-400">{year}</p>
      </div>

      {/* col droite */}
      <div className="w-1/2 flex flex-col items-center justify-around">
        <img
          src={track.artworkUrl100}
          alt="Track Artwork"
          className="w-40 h-40 rounded-md object-cover shadow-md "
        />

        <button
          onClick={() => handlePlay(track.previewUrl)}
          className="relative mt-5 p-2 rounded-full bg-blue-800/80 hover:bg-blue-800 transition-colors duration-200 shadow-md hover:shadow-blue-400/50"
        >
          <img
            src="./play-button.png"
            alt="Play"
            className="w-12 h-12 brightness-100"
          />
          {/* Effet de surbrillance au survol */}
          <div className="absolute inset-0 rounded-full opacity-0 hover:opacity-20 bg-white/30 transition-opacity duration-200"></div>
        </button>
      </div>
    </div>
  )
}

export default TrackCard
