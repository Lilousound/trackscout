export default function Header() {
  return (
    <header className="text-center pt-16 pb-10 px-4">
      {/* Title */}
      <div className="relative inline-block group">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-[#E332F6] via-[#8267E8] to-[#61D1DD] text-transparent bg-clip-text">
          TrackScout
        </h1>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-white/40 via-white/10 to-transparent transition duration-500"></div>
      </div>

      {/* Tagline */}
      <p className="mt-4 text-lg md:text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">
        Search a track or artist. Instantly explore music that matches your
        vibe.
      </p>

      {/* Subtle extra line (micro-copy) */}
      <p className="mt-3 text-lg text-blue-300">Instant music discovery.</p>
    </header>
  )
}
