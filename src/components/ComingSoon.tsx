import { Button } from "./ui/button";

interface ComingSoonProps {
  onBackToHome: () => void;
}

export function ComingSoon({ onBackToHome }: ComingSoonProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center bg-white text-black justify-center px-4">
    
      <div className="text-center max-w-2xl mx-auto">
        {/* Brand-accent decorative element */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#F59E0B' }}>
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-black">BIE</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl mb-4 font-extrabold text-gray-900">
          Coming Soon
        </h1>
        
        <h2 className="text-xl md:text-2xl mb-6 text-gray-700">
          Ethiopia News Publishing
        </h2>
        
        <p className="text-lg mb-8 leading-relaxed text-gray-600">
          We're working hard to bring you the latest news and stories from Ethiopia. 
          Our platform will feature comprehensive coverage of local events, politics, 
          culture, and community stories.
        </p>
        
        <div className="space-y-4">
          <p className="text-gray-500">
            Stay tuned for our official launch
          </p>
          
          <Button 
            onClick={onBackToHome}
            className="px-8 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#F59E0B', color: '#111827' }}
          >
            Back to Homepage
          </Button>
        </div>
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(245,158,11,0.15),transparent)]"></div>
      </div>
    </div>
  );
}


