import { Button } from "@/components/ui/button"
import { Search, Menu } from "lucide-react"

export default function Navbar() {
  return (
    <div className="w-full">
      {/* Main Navigation */}
      <nav className="bg-gray-900 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white"></div>
            <span className="text-xl font-bold">LET'S READ</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Business Pulse
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Insight Center
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Opportunity Hub
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Economy Explained
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              About Us
            </a>
          </div>

          {/* Subscribe Button */}
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md">Subscribe</Button>
        </div>
      </nav>

      {/* Secondary Header */}
      <div className="bg-gray-100 px-6 py-3 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Hamburger Menu */}
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="w-5 h-5" />
          </Button>

          {/* Newsletter Signup Text */}
          <div className="text-gray-700 text-sm">Sign Up for Our Paris Olympics Newsletter</div>

          {/* Search Icon */}
          <Button variant="ghost" size="sm" className="p-2">
            <Search className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
