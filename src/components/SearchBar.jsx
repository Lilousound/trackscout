export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <div className="text-center mt-9">
      <input
        className="border rounded border-blue-600 p-2"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="border rounded border-blue-600 bg-blue-300 p-2 shadow-sm m-4"
        onClick={onSearch}
      >
        Rechercher
      </button>
    </div>
  )
}
