import { Linkedin, Send, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="text-gray-800 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          {/* Logo and Copyright */}
          <div className="flex rounded-full flex-col items-center md:items-start">
           
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Business Info Ethiopia. All rights reserved.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <a href="mailto:info@yfpartnersltd.com" className="hover:text-gray-900 transition-colors">
                info@yfpartnersltd.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center  space-x-5">
            <Link href="https://www.linkedin.com/company/business-info-ethiopia/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-700 transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link href="https://t.me/Businessinfoeth" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-sky-500 transition-colors">
              <Send className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
