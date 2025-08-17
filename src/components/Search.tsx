export default function Search() {
    return (
      <div className="bg-black p-8">
        <div className="max-w-4xl mx-auto bg-black rounded-2xl p-8 shadow-2xl relative overflow-hidden">
          {/* Square grid pattern overlay on the right side */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, black 0%, black 50%, transparent 50%),
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 20px,
                  #333 20px,
                  #333 21px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 20px,
                  #333 20px,
                  #333 21px
                )
              `,
            }}
          />
  
          <div className="text-center space-y-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">LATEST UPDATES ON</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-orange-500 leading-tight">NATIONAL GLOBAL NEWS</h3>
            <p className="text-gray-300 text-lg font-medium tracking-wide max-w-2xl mx-auto">
              DELIVERING REAL-TIME UPDATES AND THE LATEST HEADLINES DAILY.
            </p>
  
            <div className="pt-4">
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Find the topic you want now!"
                  className="w-full bg-gray-800 border border-gray-700 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 rounded-full p-2 transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  