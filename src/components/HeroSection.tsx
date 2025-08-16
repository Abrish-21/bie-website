import { Button } from './ui/button';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-white py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

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