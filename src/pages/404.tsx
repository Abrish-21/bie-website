// src/pages/404.tsx

import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/button';

export default function Custom404() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          <Link href="/" passHref>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3">
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Button>
          </Link>
          
          <div className="flex justify-center">
            <Button
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              className="px-8 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Looking for something specific?</h3>
          <p className="text-gray-600 mb-6">
            Try searching our articles or browse our latest content:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/posts" passHref>
              <Button variant="outline" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Browse All Posts
              </Button>
            </Link>
            
            <Link href="/business-pulse" passHref>
              <Button variant="outline" className="w-full">
                Business Pulse
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
