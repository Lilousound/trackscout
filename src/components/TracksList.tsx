import TrackCard from './TrackCard'
import type { DeezerTrack } from '../types/deezer'
interface TracksListProps {
  tracks: DeezerTrack[]
  onPlay: (trackId: number, previewUrl: string) => void
  currentTrackId: number | null
  isPlaying: boolean
  openModalWithLyrics: (track: DeezerTrack, lyrics: string) => void
}

function TracksList({
  tracks,
  onPlay,
  currentTrackId,
  isPlaying,
  openModalWithLyrics,
}: TracksListProps) {
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
