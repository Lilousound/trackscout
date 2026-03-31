function TracksList({ tracks }) {
  return (
    <div className="flex flex-col justify-center items-center mb-2">
      {tracks.map((track) => (
        <div
          key={track.trackId}
          className="mt-4 border rounded border-blue-200  bg-blue-50 w-80 p-2.5 shadow-sm"
        >
          <h3 className="font-semibold text-blue-800">{track.trackName}</h3>
          <p className="text-blue-900">{track.artistName}</p>
        </div>
      ))}
    </div>
  )
}

export default TracksList
