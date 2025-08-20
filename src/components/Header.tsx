import { Search, Menu, User } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Header() {
  return (
    <header className="bg-black border-b border-gray-200 sticky top-0 z-50">
      

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
            <h1 className="text-2xl font-bold text-white">
              Business Info <span className="text-red-600">Ethiopia</span>
            </h1>

            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <a href="business-pulse" className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Business Pulse
            </a>
            <a href="/insight-center" className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Insight Center
            </a>
            <a href="/opportunities" className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Opportunity Hub
            </a>
            <a href="/eco-explained" className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Economy Explained
            </a>
            
          </nav>

          {/* Search and Actions */}
          <button className='px-6 py-2 bg-red-800 rounded-md text-white'>
            Subscribe
          </button>
          
        </div>
      </div>
    </header>
  );
}