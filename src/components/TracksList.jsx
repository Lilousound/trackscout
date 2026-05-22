import TrackCard from './TrackCard'
import { getLyrics } from '../../lib/lyrics.js'

function TracksList({ tracks, onPlay, currentTrackId, isPlaying }) {
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
          // lyrics={console.log(track.artist.name, track.title_short)}
        />
      ))}
    </div>
  )
}

export default TracksList
