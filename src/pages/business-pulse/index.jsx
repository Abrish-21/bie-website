// src/pages/business-pulse/index.tsx

import React from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Card, CardContent } from '../../components/ui/card';
import { Calendar, Clock, TrendingUp, Briefcase, Mail, ExternalLink, Download } from 'lucide-react';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

// Helper function to generate a URL-friendly slug from a title
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};


export default function BusinessPulsePage() {
  // Featured Article with added slug and keyPoints for the detail page
  const featuredArticle = {
    title: "Morning Market Brief: Forex and Policy Shifts",
    summary: "Central Bank announces new foreign exchange regulations as Ethiopian Birr continues volatility. Key policy changes affecting import/export businesses take effect this week.",
    imageUrl: "https://images.unsplash.com/photo-1748439281934-2803c6a3ee36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydHMlMjBkYXNoYm9hcmR8ZW58MXx8fHwxNzU1NjQ2ODY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    timestamp: "8:45 AM",
    author: "Market Desk",
    isLive: true,
    slug: createSlug("Morning Market Brief: Forex and Policy Shifts"),
    keyPoints: "New forex regulations aim to stabilize the Ethiopian Birr.|Import/export businesses face updated policy landscape.|Central Bank intervention is expected to impact currency trading."
  };

  // News Feed Items with added slug, author, and keyPoints for the detail page
  const newsFeedItems = [
    {
      title: "Ethiopian Airlines Reports Record Q4 Revenue",
      excerpt: "National carrier posts $1.2B in quarterly revenue, driven by cargo and passenger recovery.",
      thumbnail: "https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwc2t5bGluZXxlbnwxfHx8fDE3NTU2NDY4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "2 hours ago",
      author: "Aviation Correspondent",
      isLive: false,
      slug: createSlug("Ethiopian Airlines Reports Record Q4 Revenue"),
      keyPoints: "Revenue of $1.2B marks a post-pandemic high.|Cargo division continues to outperform expectations.|Passenger numbers recovered to 85% of pre-2020 levels."
    },
    {
      title: "Manufacturing PMI Hits 18-Month High",
      excerpt: "Industrial activity accelerates with strong orders from textile and automotive sectors.",
      thumbnail: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "4 hours ago",
      author: "Economic Analyst",
      isLive: true,
      slug: createSlug("Manufacturing PMI Hits 18-Month High"),
      keyPoints: "PMI index rose to 58.2, indicating strong expansion.|Textile sector orders increased by 25% month-over-month.|Automotive parts manufacturing saw significant growth."
    },
    {
      title: "Coffee Export Prices Rise 15% This Month",
      excerpt: "Premium specialty coffee drives price surge as international demand strengthens.",
      thumbnail: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "6 hours ago",
      author: "Commodities Desk",
      isLive: false,
      slug: createSlug("Coffee Export Prices Rise 15% This Month"),
      keyPoints: "Global demand for Ethiopian Arabica is at a peak.|Favorable weather conditions led to a high-quality harvest.|New trade agreements have opened up additional markets."
    },
    {
      title: "Digital Banking Transactions Up 200%",
      excerpt: "Mobile money adoption accelerates across rural and urban markets nationwide.",
      thumbnail: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      timestamp: "8 hours ago",
      author: "FinTech Reporter",
      isLive: false,
      slug: createSlug("Digital Banking Transactions Up 200%"),
      keyPoints: "Mobile money accounts have surpassed 30 million nationwide.|Government initiatives for a cashless economy are showing results.|Partnerships between banks and telecom companies are key drivers."
    },
    {
      title: "Infrastructure Bond Oversubscribed by 300%",
      excerpt: "Government infrastructure bonds see massive investor interest amid economic optimism.",
      thumbnail: "https://images.unsplash.com/photo-1746037870491-b2e415517d0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxzdG9jayUyMG1hcmtldCUyMHRyYWRpbmclMjBmbG9vcnxlbnwxfHx8fDE3NTU2NDY4NzB8MA&lib=rb-4.1.0&q=80&w=1080",
      timestamp: "1 day ago",
      author: "Capital Markets",
      isLive: false,
      slug: createSlug("Infrastructure Bond Oversubscribed by 300%"),
      keyPoints: "The bond raised over $2 billion, exceeding the $500 million target.|Strong participation from both domestic and international investors.|Funds are earmarked for transportation and energy projects."
    }
  ];

  // B-Opportunities Carousel Items
  const opportunities = [
    {
      title: "Ethiopia Telecom Tender – August 2025",
      description: "Major telecommunications infrastructure upgrade project seeking international bidders.",
      sector: "Telecommunications",
      value: "$850M",
      deadline: "Sep 15, 2025",
      imageUrl: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isSponsored: false
    },
    {
      title: "Grand Ethiopian Renaissance Dam Phase II",
      description: "Equipment procurement and installation contracts for hydroelectric expansion.",
      sector: "Energy",
      value: "$1.2B",
      deadline: "Oct 1, 2025",
      imageUrl: "https://images.unsplash.com/photo-1741991110666-88115e724741?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwc2t5bGluZXxlbnwxfHx8fDE3NTU2NDY4Njd8MA&ixlib=rb-4.1.0&q=80&q=80&w=1080",
      isSponsored: true
    },
    {
      title: "Addis Ababa Light Rail Extension",
      description: "Public-private partnership opportunity for urban transport infrastructure.",
      sector: "Transportation",
      value: "$650M",
      deadline: "Aug 30, 2025",
      imageUrl: "https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMG5ld3MlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjQ0NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      isSponsored: false
    },
    {
      title: "Healthcare System Digitization",
      description: "Nationwide healthcare IT infrastructure and telemedicine platform development.",
      sector: "Healthcare",
      value: "$450M",
      deadline: "Sep 10, 2025",
      imageUrl: "https://images.unsplash.com/photo-1557804500-7a58fbcd4d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb25mZXJlbmNlfGVufDF8fHx8MTc1NTU2NTQ0NXww&lib=rb-4.1.0&q=80&w=1080",
      isSponsored: false
    }
  ];

  // B-Letters Recent Issues
  const recentIssues = [
    {
      title: "Ethiopia Weekly Brief – August 2025",
      description: "Key policy updates, market movements, and investment opportunities from the past week.",
      publishDate: "Aug 17, 2025",
      downloadCount: 12400
    },
    {
      title: "Mid-Year Economic Outlook",
      description: "Comprehensive analysis of H1 2025 performance across all major sectors.",
      publishDate: "Aug 10, 2025",
      downloadCount: 18600
    },
    {
      title: "Coffee Season Analysis",
      description: "In-depth look at the 2025 coffee harvest and export projections.",
      publishDate: "Aug 3, 2025",
      downloadCount: 9800
    }
  ];


  return (
    <div className="bg-white min-h-screen">
        <Header/>
      {/* Hero Area with consistent dark background */}
      <section 
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: '#3d3d3d' }}
      >
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
                <span>Friday, August 22, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span>Markets Open</span>
              </div>
            </div>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              Get Daily Pulse Updates
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content Layout: 70% Left Column, 30% Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
          
          {/* Left Column - Main Content (70%) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 1.1 Daily Business Pulse */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  <h2 className="text-3xl font-bold text-gray-900">Daily Business Pulse</h2>
                </div>
              </div>
              
              {/* Featured Article Card - FIXED */}
              <Link
                href={{
                  pathname: `/business-pulse/${featuredArticle.slug}`,
                  query: {
                    title: featuredArticle.title,
                    excerpt: featuredArticle.summary,
                    thumbnail: featuredArticle.imageUrl,
                    author: featuredArticle.author,
                    timestamp: featuredArticle.timestamp,
                    keyPoints: featuredArticle.keyPoints,
                    description: featuredArticle.summary // ADDED
                  }
                }}
                className="block cursor-pointer"
              >
                <Card className="mb-8 overflow-hidden shadow-xl border-0 group">
                  <div className="relative h-80">
                    <ImageWithFallback
                      src={featuredArticle.imageUrl}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    
                    {featuredArticle.isLive && (
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-red-600 text-white font-medium animate-pulse">
                          <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                          LIVE
                        </Badge>
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">{featuredArticle.title}</h3>
                      <p className="text-gray-200 mb-4 text-lg leading-relaxed">{featuredArticle.summary}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-medium">{featuredArticle.author}</span>
                        <span>{featuredArticle.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
              
              {/* News Feed */}
              <div className="space-y-4">
                {newsFeedItems.map((item, index) => (
                  <Link
                    key={index}
                    href={{
                      pathname: `/business-pulse/${item.slug}`,
                      query: {
                        title: item.title,
                        excerpt: item.excerpt,
                        thumbnail: item.thumbnail,
                        author: item.author,
                        timestamp: item.timestamp,
                        keyPoints: item.keyPoints,
                        description: item.excerpt // ADDED
                      }
                    }}
                    className="block"
                  >
                    <div className="flex items-start space-x-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {item.isLive && (
                          <div className="absolute top-1 right-1">
                            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                          </div>
                        )}
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
                            <Badge variant="secondary" className="text-xs">Breaking</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* 1.2 B-Opportunities */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">B-Opportunities</h2>
                  <p className="text-gray-600">Weekly curated deals, tenders, and investments</p>
                </div>
              </div>
              
              {/* Horizontal Carousel Container */}
              <div className="relative overflow-hidden">
                <div className="flex pb-4 w-max [animation:slide_40s_linear_infinite] hover:[animation-play-state:paused] space-x-6">
                  {/* Duplicate opportunities to create a seamless loop */}
                  {[...opportunities, ...opportunities].map((opportunity, index) => (
                    <Link
                      key={index}
                      href={{
                        pathname: `/business-pulse/${createSlug(opportunity.title)}`,
                        query: {
                          title: opportunity.title,
                          description: opportunity.description,
                          sector: opportunity.sector,
                          value: opportunity.value,
                          deadline: opportunity.deadline,
                          imageUrl: opportunity.imageUrl,
                        }
                      }}
                      className="flex-shrink-0 w-80 block"
                    >
                      <Card className="hover:shadow-lg transition-shadow border-0 shadow-md h-full">
                        <div className="relative h-40 overflow-hidden">
                          <ImageWithFallback
                            src={opportunity.imageUrl}
                            alt={opportunity.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          <div className="absolute top-3 left-3 right-3 flex justify-between">
                            <Badge className="bg-blue-600 text-white">{opportunity.sector}</Badge>
                            {opportunity.isSponsored && (
                              <Badge variant="secondary" className="text-xs">Sponsored</Badge>
                            )}
                          </div>
                          
                          <div className="absolute bottom-3 right-3 text-white">
                            <span className="text-xl font-bold">{opportunity.value}</span>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{opportunity.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{opportunity.description}</p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                            <span>Deadline: {opportunity.deadline}</span>
                          </div>
                          
                          <Button size="sm" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                            See Details <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar (30%) */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* 1.3 B-Letters Newsletter with consistent dark background */}
            <div 
              className="text-white rounded-xl overflow-hidden"
              style={{ backgroundColor: '#3d3d3d' }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 mr-3 text-yellow-400" />
                  <h3 className="text-xl font-bold">B-Letters</h3>
                </div>
                <p className="text-gray-300 mb-4 text-sm">
                  Must-read for executives and decision makers
                </p>
                
                {/* Two Column Design */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Newsletter Mockup */}
                  <div className="bg-white rounded-lg p-4">
                    <div className="bg-yellow-500 h-8 mb-3 rounded"></div>
                    <div className="space-y-2">
                      <div className="bg-gray-200 h-3 rounded"></div>
                      <div className="bg-gray-200 h-3 rounded w-3/4"></div>
                      <div className="bg-gray-200 h-3 rounded w-1/2"></div>
                    </div>
                    <div className="mt-3 text-xs text-gray-500 text-center">
                      Newsletter Preview
                    </div>
                  </div>
                  
                  {/* Signup Box */}
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Your name"
                      className="bg-gray-700 text-white border-gray-600 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="bg-gray-700 text-white border-gray-600 focus:ring-yellow-500 focus:border-yellow-500"
                    />
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                      Subscribe to B-Letters
                    </Button>
                  </div>
                </div>
                
                {/* Recent Issues */}
                <div className="mt-6 pt-6 border-t border-gray-600">
                  <h4 className="font-medium text-gray-200 mb-4">Recent Issues</h4>
                  <div className="space-y-3">
                    {recentIssues.map((issue, index) => (
                      <div key={index} className="group cursor-pointer">
                        <h5 className="font-medium mb-1 group-hover:text-yellow-400 transition-colors text-sm">
                          {issue.title}
                        </h5>
                        <p className="text-xs text-gray-400 mb-2">{issue.description}</p>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-yellow-400">{issue.publishDate}</span>
                          <div className="flex items-center space-x-1 text-gray-500">
                            <Download className="h-3 w-3" />
                            <span>{issue.downloadCount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Market Signals with yellow accent */}
            <div className="bg-yellow-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Market Signals</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">ETB/USD</span>
                  <div className="text-right">
                    <span className="font-bold">123.45</span>
                    <span className="text-green-600 text-sm ml-2">+0.8%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">CBE Interest Rate</span>
                  <div className="text-right">
                    <span className="font-bold">15.5%</span>
                    <span className="text-red-600 text-sm ml-2">+0.5%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Coffee (USD/ton)</span>
                  <div className="text-right">
                    <span className="font-bold">$4,280</span>
                    <span className="text-green-600 text-sm ml-2">+2.1%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Gold (ETB/oz)</span>
                  <div className="text-right">
                    <span className="font-bold">245,890</span>
                    <span className="text-green-600 text-sm ml-2">+1.3%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sponsored Box */}
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="text-xs text-gray-500 mb-3 text-center">SPONSORED</div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-black font-bold">AD</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-2">Ethiopia Investment Summit 2025</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Connect with 500+ investors and business leaders. September 15-17, Addis Ababa.
                </p>
                <Button size="sm" variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}