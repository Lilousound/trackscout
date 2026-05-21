import TrackCard from './TrackCard'

function TracksList({ tracks, onPlay, currentTrackId, isPlaying, lyrics }) {
  return (
    <div className="flex flex-col justify-center items-center mb-2">
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          onPlay={onPlay}
          currentTrackId={currentTrackId}
          isPlaying={isPlaying}
          lyrics={lyrics}
        />
      ))}
    </div>
  )
}

export default TracksList
