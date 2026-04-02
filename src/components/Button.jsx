function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#E332F6] via-[#8267E8] to-[#61D1DD] rounded group hover:from-[#E332F6] hover:via-[#61D1DD] hover:to-[#8267E8] shadow-md hover:shadow-[#8267E8]/50 "
    >
      {/* Texte du bouton */}
      <span className="relative z-10">{children}</span>

      {/* Effet "shiny" (lueur horizontale) */}
      <div className="absolute inset-0 rounded opacity-0 group-hover:opacity-30 bg-gradient-to-r from-white/50 via-white/20 to-transparent transition-opacity duration-500"></div>

      {/* Effet de bordure lumineuse au survol */}
      <div className="absolute inset-0 rounded border border-transparent group-hover:border-white/20 transition-all duration-300"></div>
    </button>
  )
}

export default Button
