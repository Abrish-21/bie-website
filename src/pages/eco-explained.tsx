import React from 'react';


import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import { Play, Clock, Eye, BookOpen, TrendingUp } from 'lucide-react';


export default function EconomyExplainedPage() {
  const explainerArticles = [
    {
      title: "How Ethiopia's New Tax Policy Will Affect Small Businesses",
      excerpt: "Breaking down the complex changes in Ethiopia's taxation system and what they mean for SMEs across different sectors. We examine the implementation timeline, exemptions, and practical implications.",
      imageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Policy",
      readTime: "8 min read",
      publishDate: "2 hours ago",
      author: "Meron Assefa",
      views: 4500,
      isVideo: false,
      complexity: "Beginner"
    },
    {
      title: "Understanding Ethiopia's Currency Exchange Reforms",
      excerpt: "A comprehensive guide to the recent changes in foreign exchange regulations, their impact on imports/exports, and what businesses need to know about the new exchange rate mechanisms.",
      imageUrl: "https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3MlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjQ0NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Finance",
      readTime: "12 min read", 
      publishDate: "1 day ago",
      author: "Daniel Tadesse",
      views: 8200,
      isVideo: true,
      complexity: "Intermediate"
    },
    {
      title: "The Rise of Ethiopia's Manufacturing Sector",
      excerpt: "From textile to automotive assembly, explore how Ethiopia is positioning itself as East Africa's manufacturing hub. We analyze government incentives, foreign investment, and growth projections.",
      imageUrl: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Industry",
      readTime: "10 min read",
      publishDate: "2 days ago", 
      author: "Sara Bekele",
      views: 6800,
      isVideo: false,
      complexity: "Beginner"
    },
    {
      title: "Digital Banking Revolution in Ethiopia",
      excerpt: "How mobile money and digital banking services are transforming Ethiopia's financial landscape. Learn about the key players, regulatory challenges, and future outlook.",
      imageUrl: "https://images.unsplash.com/photo-1641989516513-f34dd4305204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZW50cmVwcmVuZXVyc3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Technology",
      readTime: "7 min read",
      publishDate: "3 days ago",
      author: "Kidist Alemayehu", 
      views: 5600,
      isVideo: true,
      complexity: "Intermediate"
    },
    {
      title: "Ethiopia's Coffee Economy: Beyond the Bean",
      excerpt: "Dive deep into the economics of Ethiopia's most famous export. From farmer cooperatives to international markets, understand the entire coffee value chain and its economic impact.",
      imageUrl: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Agriculture",
      readTime: "15 min read",
      publishDate: "4 days ago",
      author: "Robel Mekonnen",
      views: 9200,
      isVideo: false,
      complexity: "Advanced"
    },
    {
      title: "Inflation Explained: Why Prices Keep Rising",
      excerpt: "A simple breakdown of Ethiopia's inflation challenges, what drives price increases, and how monetary policy attempts to control them. No economics degree required.",
      imageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      category: "Economics",
      readTime: "6 min read",
      publishDate: "5 days ago",
      author: "Hanan Yusuf",
      views: 12400,
      isVideo: true,
      complexity: "Beginner"
    }
  ];

  const featuredExplainer = explainerArticles[0];
  const otherExplainers = explainerArticles.slice(1);

  const complexityColors = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800', 
    'Advanced': 'bg-red-100 text-red-800'
  };

  const categoryColors = {
    'Policy': 'bg-blue-600',
    'Finance': 'bg-green-600',
    'Industry': 'bg-purple-600',
    'Technology': 'bg-indigo-600',
    'Agriculture': 'bg-orange-600',
    'Economics': 'bg-red-600'
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <Header/>
      <section className=" text-white" style={{ backgroundColor: '#3d3d3d' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Economy Explained</h1>
            <p className="text-xl text-green-100 mb-8">
              Understand what's really happening — without the jargon
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Expert Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Real Examples</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>5-15 min reads</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Featured Explainer */}
        <section className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-[500px]">
              <ImageWithFallback
                src={featuredExplainer.imageUrl}
                alt={featuredExplainer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {featuredExplainer.isVideo && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-4xl">
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className={`${categoryColors[featuredExplainer.category as keyof typeof categoryColors]} text-white font-medium`}>
                      {featuredExplainer.category}
                    </Badge>
                    <Badge className={`${complexityColors[featuredExplainer.complexity as keyof typeof complexityColors]} font-medium`}>
                      {featuredExplainer.complexity}
                    </Badge>
                    {featuredExplainer.isVideo && (
                      <Badge className="bg-red-600 text-white font-medium">
                        Video Explainer
                      </Badge>
                    )}
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                    {featuredExplainer.title}
                  </h1>
                  
                  <p className="text-xl text-gray-200 mb-6 leading-relaxed">
                    {featuredExplainer.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-sm">
                      <span className="font-medium">{featuredExplainer.author}</span>
                      <span>{featuredExplainer.publishDate}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{featuredExplainer.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{featuredExplainer.views.toLocaleString()}</span>
                      </div>
                    </div>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      {featuredExplainer.isVideo ? 'Watch Now' : 'Read Article'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Options */}
        <section className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold text-gray-900">All Explainers</h2>
            <div className="flex flex-wrap items-center gap-2">
              <Button size="sm" variant="outline" className="text-gray-700">All Categories</Button>
              <Button size="sm" variant="outline" className="text-gray-700">Policy</Button>
              <Button size="sm" variant="outline" className="text-gray-700">Finance</Button>
              <Button size="sm" variant="outline" className="text-gray-700">Technology</Button>
              <Button size="sm" variant="outline" className="text-gray-700">Agriculture</Button>
            </div>
          </div>
        </section>

        {/* Explainer Articles Grid */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {otherExplainers.map((article, index) => (
              <article key={index} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {article.isVideo && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white bg-opacity-90 rounded-full p-3">
                        <Play className="h-8 w-8 text-gray-900" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={`${categoryColors[article.category as keyof typeof categoryColors]} text-white text-xs font-medium`}>
                        {article.category}
                      </Badge>
                      <Badge className={`${complexityColors[article.complexity as keyof typeof complexityColors]} text-xs font-medium`}>
                        {article.complexity}
                      </Badge>
                    </div>
                    
                    {article.isVideo && (
                      <Badge className="bg-red-600 text-white text-xs font-medium">
                        VIDEO
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium">{article.author}</span>
                      <span>{article.publishDate}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{article.views.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-green-600 hover:bg-green-700 group-hover:bg-green-700"
                  >
                    {article.isVideo ? 'Watch Explainer' : 'Read Article'}
                  </Button>
                </div>
              </article>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              Load More Explainers
            </Button>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Informed, Stay Ahead</h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Get our weekly "Economy Explained" digest delivered to your inbox. Complex topics made simple, with real examples from Ethiopian markets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-green-300 flex-1"
            />
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-green-200 mt-4">
            Join 25,000+ readers who trust our economic insights
          </p>
        </section>
      </div>
      <Footer/>
    </div>
  );
}