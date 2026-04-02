import Button from './Button'

export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="text-center mt-9">
      <input
        className="bg-gray-800/50 border rounded border-gray-700 text-blue-100 p-2 mr-4 w-64 shadow-lg backdrop-blur-sm w-2/5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type an artist or song name"
      />
      <Button onClick={onSearch}>Search</Button>
    </div>
  )
}
