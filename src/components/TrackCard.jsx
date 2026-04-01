function TrackCard({ track }) {
  console.log(track)
  const date = new Date(track.releaseDate)
  const year = date.getFullYear()

  const handlePlay = (previewUrl) => {
    const audio = new Audio(previewUrl)
    audio.play()
  }

  return (
    <div className="mt-4 border rounded border-blue-200 bg-blue-50 p-2.5 shadow-sm flex justify-evenly w-2/5">
      <div className="flex flex-col justify-between w-1/2">
        <h3 className="font-bold text-blue-800">{track.trackName}</h3>
        <p className="font-medium text-blue-900">{track.artistName}</p>
        <p className="text-sm text-blue-900">{year}</p>
      </div>
      <div className="w-1/2 flex flex-col items-center justify-around">
        <img
          src={track.artworkUrl100}
          alt="Track Artwork"
          width={200}
          height={200}
        />
        <img
          src="./play-button.png"
          alt="Play"
          width={60}
          onClick={() => handlePlay(track.previewUrl)}
        />
      </div>
    </div>
  )
}

export default TrackCard
