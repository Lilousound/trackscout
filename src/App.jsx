import { useState } from 'react'
import { searchTracks } from './services/api'
import Header from './components/Header'
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
    <div className="text-white min-h-screen w-full bg-gradient-to-bl from-blue-950 to-blue-800">
      <Header />
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <TracksList tracks={tracks} />
    </div>
  )
}

export default App
