import React from 'react';
import { useRouter } from 'next/router';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Badge } from '../../components/ui/badge';
import { Clock, Calendar, TrendingUp } from 'lucide-react';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function BusinessPulsePage() {
  const router = useRouter();

  const newsFeedItems = [
    {
      slug: "ethiopian-airlines-q4-revenue",
      title: "Ethiopian Airlines Reports Record Q4 Revenue",
      excerpt: "National carrier posts $1.2B in quarterly revenue, driven by cargo and passenger recovery.",
      thumbnail: "https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      timestamp: "2 hours ago",
      isLive: false,
    },
    {
      slug: "manufacturing-pmi-18-month-high",
      title: "Manufacturing PMI Hits 18-Month High",
      excerpt: "Industrial activity accelerates with strong orders from textile and automotive sectors.",
      thumbnail: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
      timestamp: "4 hours ago",
      isLive: true,
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />

      <section className="relative overflow-hidden text-white" style={{ backgroundColor: '#3d3d3d' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Business Pulse</h1>
            <p className="text-xl text-gray-200 mb-8">
              Real-time news & updates to guide your daily decisions
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm text-gray-300 mb-8">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span>Updated every 15 minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-yellow-400" />
                <span>Tuesday, August 19, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span>Markets Open</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
          <div className="lg:col-span-7 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">Daily Business Pulse</h2>
              <div className="space-y-4">
                {newsFeedItems.map((item) => (
                  <div
                    key={item.slug}
                    className="flex items-start space-x-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() =>
                      router.push({
                        pathname: `/business-pulse/${item.slug}`,
                        query: {
                          title: item.title,
                          excerpt: item.excerpt,
                          thumbnail: item.thumbnail,
                          timestamp: item.timestamp,
                        },
                      })
                    }
                  >
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 mb-2 hover:text-yellow-600 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-2 leading-relaxed">{item.excerpt}</p>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="h-3 w-3" />
                        <span>{item.timestamp}</span>
                        {item.isLive && (
                          <Badge className="text-xs bg-red-600 text-white">LIVE</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
          <div className="lg:col-span-3">
            {/* Sidebar content here */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
