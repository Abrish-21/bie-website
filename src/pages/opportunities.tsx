import React from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import { Star, MapPin, Users, Lightbulb, Search, Play, Headphones, Calendar } from 'lucide-react';


export default  function OpportunityHubPage() {
  const featuredPitch = {
    title: "GreenTech Agriculture Solutions",
    founder: "Almaz Haile",
    sector: "AgriTech",
    fundingGoal: "$2.5M",
    raised: "$1.2M",
    description: "Revolutionary IoT-based irrigation system designed specifically for Ethiopian smallholder farmers to increase crop yields by 40% while reducing water usage.",
    imageUrl: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["AgriTech", "IoT", "Sustainability"],
    investors: 47,
    daysLeft: 23
  };

  const businessListings = [
    {
      name: "Ethiopian Coffee Cooperative",
      category: "Agriculture",
      location: "Sidama, Ethiopia",
      rating: 4.8,
      reviews: 124,
      description: "Premium coffee producer and exporter specializing in single-origin specialty coffee beans.",
      imageUrl: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      employees: "50-100"
    },
    {
      name: "Addis Tech Hub",
      category: "Technology",
      location: "Addis Ababa, Ethiopia", 
      rating: 4.6,
      reviews: 89,
      description: "Leading software development company providing digital solutions for Ethiopian businesses.",
      imageUrl: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      employees: "25-50"
    },
    {
      name: "Nile Logistics Solutions",
      category: "Logistics", 
      location: "Dire Dawa, Ethiopia",
      rating: 4.7,
      reviews: 156,
      description: "Comprehensive logistics and supply chain management services across East Africa.",
      imageUrl: "https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG5ld3MlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjQ0NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      verified: true,
      employees: "100-500"
    }
  ];

  const podcastEpisodes = [
    {
      title: "Building Ethiopia's Next Unicorn",
      guest: "Daniel Bekele, Serial Entrepreneur",
      duration: "45 min",
      publishDate: "Jan 15, 2025",
      description: "In-depth conversation about the challenges and opportunities in Ethiopia's startup ecosystem.",
      imageUrl: "https://images.unsplash.com/photo-1641989516513-f34dd4305204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZW50cmVwcmVuZXVyc3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      plays: 15200
    },
    {
      title: "Foreign Investment Trends in Ethiopia",
      guest: "Sarah Johnson, Investment Director",
      duration: "38 min", 
      publishDate: "Jan 8, 2025",
      description: "Analysis of recent FDI patterns and what international investors are looking for.",
      imageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      plays: 12800
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section with consistent dark background */}
      <Header/>
      <section 
        className="relative overflow-hidden text-white"
        style={{ backgroundColor: '#3d3d3d' }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Opportunity Hub</h1>
            <p className="text-xl text-gray-200 mb-8">
              Where bold ideas, startups, and businesses connect
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-300 mb-8">
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                <span>500+ Active Startups</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <span>10,000+ Business Directory</span>
              </div>
              <div className="flex items-center space-x-2">
                <Headphones className="h-5 w-5 text-yellow-400" />
                <span>Weekly Podcast</span>
              </div>
            </div>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              Explore Opportunities
            </Button>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 {/* Business Directory */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-yellow-600" />
              <h2 className="text-3xl font-bold text-gray-900">Business Directory</h2>
            </div>
          
          </div>
          
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search businesses, services, or locations..."
                className="pl-10 h-12 border-gray-300 focus:ring-yellow-500 focus:border-yellow-500"
              />
            </div>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black h-12 px-8">
              Search Directory
            </Button>
          </div>
          
          {/* Business Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessListings.map((business, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={business.imageUrl}
                    alt={business.name}
                    className="w-full h-full object-cover"
                  />
                  {business.verified && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-600 text-white">Verified</Badge>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{business.category}</Badge>
                    <div className="flex items-center space-x-1 text-sm">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{business.rating}</span>
                      <span className="text-gray-500">({business.reviews})</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{business.name}</h3>
                  <p className="text-gray-600 mb-3 text-sm">{business.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{business.location}</span>
                    <span className="ml-auto">{business.employees} employees</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black">
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
                      Connect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* BIE Podcast */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <Headphones className="h-8 w-8 text-yellow-600" />
              <h2 className="text-3xl font-bold text-gray-900">BIE Podcast</h2>
            </div>
            <Button variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
              All Episodes
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {podcastEpisodes.map((episode, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
                <div className="flex">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <ImageWithFallback
                      src={episode.imageUrl}
                      alt={episode.title}
                      className="w-full h-full object-cover rounded-l-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-white rounded-full p-3">
                        <Play className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-yellow-600 font-medium">New Episode</span>
                      <span className="text-sm text-gray-500">{episode.plays.toLocaleString()} plays</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {episode.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 mb-3">{episode.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium">{episode.guest}</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{episode.publishDate}</span>
                        </div>
                      </div>
                      <span>{episode.duration}</span>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Podcast Subscription CTA */}
          <div 
            className="mt-8 rounded-xl p-8 text-center text-white"
            style={{ backgroundColor: '#3d3d3d' }}
          >
            <h3 className="text-2xl font-bold mb-4">Never Miss an Episode</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to the BIE Podcast and get weekly insights from Ethiopia's top business leaders, entrepreneurs, and investors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Subscribe on Apple Podcasts
              </Button>
              <Button size="lg" variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/10">
                Listen on Spotify
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer/>
    </div>
  );
}