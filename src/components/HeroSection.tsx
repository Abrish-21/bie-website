import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-6">
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            WELCOME TO BUSINESS INFO ETHIOPIA
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 leading-tight">
            Business Info Ethiopia
            <br />
            <span className="text-gray-600">Real-Time Business Intelligence</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Stay ahead of Ethiopia's fast-changing economy with real-time news, curated opportunities, 
            deep insights, and clear explanations — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg rounded-full">
              Get Daily Pulse (Free)
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white px-8 py-3 text-lg rounded-full">
              <Play className="mr-2 h-5 w-5" />
              Explore Insights
            </Button>
          </div>
        </div>
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



        

        {/* Featured Story */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 lg:p-12 text-white">
              <div className="flex items-center text-sm mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full">FEATURED</span>
                <span className="ml-3">12 minutes ago</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                Ethiopia's Digital Banking Revolution: What Every Business Needs to Know
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                New regulations are reshaping how Ethiopian businesses handle digital payments. 
                Here's what you need to prepare for.
              </p>
              <Button variant="secondary" className="bg-white text-black hover:bg-gray-100">
                Read Full Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1726065235158-d9c3f817f331?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYmFua2luZyUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU1MzUzNjkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Ethiopia Digital Banking"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}