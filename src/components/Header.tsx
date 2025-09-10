import { Search, Menu, User, Linkedin, Send } from 'lucide-react';
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
              <img
                src="/logo/bie-logo.png"
                alt="Business Info Ethiopia Logo"
                width="100"
                height="50"
              />
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <a href="/coming-soon" className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Business Pulse
            </a>
            <a href="/coming-soon" className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Insight Center
            </a>
            <a href="/coming-soon" className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Opportunity Hub
            </a>
            <a href="/coming-soon" className="text-white hover:text-red-600 px-3 py-2 text-sm font-medium transition-colors">
              Economy Explained
            </a>
          </nav>

          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="https://www.linkedin.com/company/businessinfoeth/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://t.me/Businessinfoeth" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-400 transition-colors">
              <Send className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
