import TrackCard from './TrackCard'

function TracksList({
  tracks,
  onPlay,
  currentTrackId,
  isPlaying,
  openModalWithLyrics,
}) {
  // console.log(tracks[0]?.artist.name, tracks[0]?.title_short)
  return (
    <div className="flex flex-col justify-center items-center mb-2">
      {tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          onPlay={onPlay}
          currentTrackId={currentTrackId}
          isPlaying={isPlaying}
          openModalWithLyrics={openModalWithLyrics}
        />
      ))}
    </div>
  )
}

export default TracksList
