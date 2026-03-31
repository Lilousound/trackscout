import { useState } from 'react'
import { searchTracks } from './services/api'
import Header from './components/header'
import SearchBar from './components/SearchBar'
import TracksList from './components/TracksList'

function App() {
  const [query, setQuery] = useState('')
  const [tracks, setTracks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    const results = await searchTracks(query)
    setTracks(results)
    console.log(tracks)
  }

  return (
    <div>
      <Header />
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <TracksList tracks={tracks} />
    </div>
  )
}

export default App
