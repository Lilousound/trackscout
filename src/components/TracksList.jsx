import TrackCard from './TrackCard'

function TracksList({ tracks }) {
  return (
    <div className="flex flex-col justify-center items-center mb-2">
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  )
}

export default TracksList
