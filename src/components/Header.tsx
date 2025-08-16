import { Search, Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black">
              Business Info <span className="text-red-600">Ethiopia</span>
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <a href="#" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Business Pulse
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Insight Center
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Opportunity Hub
            </a>
            <a href="#" className="text-gray-900 hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Economy Explained
            </a>
            
          </nav>

          {/* Search and Actions */}
          <button className='px-6 py-2 bg-black rounded-md text-white'>
            Subscribe
          </button>
          
        </div>
      </div>
    </header>
  );
}