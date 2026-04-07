export default function LearnMore() {
  return (
    <div className="text-blue-100 w-3/4 mx-auto pt-12 grid md:grid-cols-2 gap-10">
      {/* WHAT IS */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">What is TrackScout?</h2>

        <ul className="space-y-3 text-sm leading-relaxed text-blue-200">
          <li>Discover music faster by searching any song or artist.</li>
          <li>Instantly explore related tracks tailored to your search.</li>
          <li>
            Access key details: title, artist, album, duration, and preview.
          </li>
          <li>
            Perfect for finding inspiration or building playlists effortlessly.
          </li>
        </ul>
      </div>

      {/* WHY */}
      <div className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/10">
        <h2 className="text-2xl font-semibold mb-4">Why TrackScout?</h2>

        <ul className="space-y-4 text-sm">
          <li>
            <span className="font-semibold text-white">Fast search</span>
            <p className="text-blue-200 text-xs">
              Find tracks and artists instantly
            </p>
          </li>

          <li>
            <span className="font-semibold text-white">Smart discovery</span>
            <p className="text-blue-200 text-xs">
              Relevant suggestions based on your search
            </p>
          </li>

          <li>
            <span className="font-semibold text-white">Quick previews</span>
            <p className="text-blue-200 text-xs">Listen before you commit</p>
          </li>

          <li>
            <span className="font-semibold text-white">Essential info</span>
            <p className="text-blue-200 text-xs">
              Only what matters, no clutter
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}
