export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="mt-16 border-t border-white/10 bg-gradient-to-b from-transparent to-white/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-blue-300/70">
        <p className="text-blue-200 font-medium">TrackScout</p>

        <p className="mt-1">Discover music faster.</p>
        <p className="mt-3 text-xs text-blue-400/50"></p>
        <p className="mt-3 text-xs text-blue-400/50">
          © {currentYear} TrackScout — Built for music discovery — Powered by
          music data APIs
        </p>
      </div>
    </footer>
  )
}
