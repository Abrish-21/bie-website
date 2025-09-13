import { Linkedin, Send } from "lucide-react";
import Link from "next/link";

interface ComingSoonProps {
  onBackToHome: () => void;
}

export function ComingSoon({ onBackToHome }: ComingSoonProps) {
  return (
    <div className="relative text-black h-full flex flex-col items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 w-full h-full bg-white "></div>
      
      <div className="text-center max-w-2xl mx-auto p-8 z-10">
        <div className="mx-auto mb-6 w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center shadow-lg">
          <img 
            src="/logo/bie-logo.png" 
            alt="Business Info Ethiopia Logo" 
            className="w-20 h-auto"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 tracking-tight">
          We're Launching Soon
        </h1>
        
        <p className="text-md md:text-lg text-gray-600 mb-6">
          A new era of business intelligence in Ethiopia is on the horizon.
        </p>
        
        <div className=" border border-gray-700 rounded-lg p-6 text-left mb-8 shadow-md">
          <p className="text-sm text-gray-500 leading-relaxed">
            <strong>Business Info Ethiopia</strong> is building the nation’s premier platform for business news, in-depth insights, and crucial market intelligence. Our team is working diligently to bring you a modern, data-driven experience.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-600 mb-3">
            Stay connected and follow our journey:
          </p>
          <div className="flex justify-center items-center space-x-6">
            <Link href="https://www.linkedin.com/company/business-info-ethiopia/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300">
              <Linkedin className="w-5 h-5 mr-2" />
              <span className="font-medium text-sm">LinkedIn</span>
            </Link>
            <Link href="https://t.me/Businessinfoeth" target="_blank" rel="noopener noreferrer" className="flex items-center text-sky-400 hover:text-sky-300 transition-colors duration-300">
              <Send className="w-5 h-5 mr-2" />
              <span className="font-medium text-sm">Telegram</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}


