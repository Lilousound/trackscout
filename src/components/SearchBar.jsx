import Button from './Button'

export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="text-center mt-10 px-4">
      <div className="flex justify-center items-center gap-3 max-w-xl mx-auto">
        <input
          className="flex-1 bg-white/5 border border-white/10 rounded-lg text-blue-100 px-4 py-2.5 shadow-lg backdrop-blur-sm
      placeholder:text-blue-300/50
      focus:outline-none focus:ring-2 focus:ring-[#8267E8]/50 focus:border-[#8267E8]/40
      transition duration-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song or artist…"
        />

        <Button onClick={onSearch}>Search</Button>
      </div>
    </div>
  )
}
