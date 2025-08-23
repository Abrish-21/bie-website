// src/pages/opportunities/[slug].tsx

import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import { ArrowLeft, Star, MapPin, Users, Lightbulb, Headphones, Calendar, DollarSign, Tag, TrendingUp, CheckCircle, Package, Mail, Clock, User } from "lucide-react";
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";

// Helper function to generate a URL-friendly slug
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

interface BusinessOpportunity {
  type: 'business';
  slug: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  description: string;
  imageUrl: string;
  verified: boolean;
  employees: string;
  website?: string;
  contactEmail?: string;
  yearFounded?: number;
  sectorDescription?: string;
  keyProductsServices?: string[];
  teamSize?: string;
}

interface PitchOpportunity {
  type: 'pitch';
  slug: string;
  title: string;
  founder: string;
  sector: string;
  fundingGoal: string;
  raised: string;
  description: string;
  imageUrl: string;
  tags: string[];
  investors: number;
  daysLeft: number;
  businessModel?: string;
  marketSize?: string;
  traction?: string;
}

interface PodcastEpisodeOpportunity {
  type: 'podcast';
  slug: string;
  title: string;
  guest: string;
  duration: string;
  publishDate: string;
  description: string;
  imageUrl: string;
  plays: number;
  episodeUrl?: string;
  transcript?: string;
}

type Opportunity = BusinessOpportunity | PitchOpportunity | PodcastEpisodeOpportunity;

// Dummy data for all opportunities (combining all types)
const allOpportunities: Opportunity[] = [
  {
    type: 'business',
    slug: createSlug("Ethiopian Coffee Cooperative"),
    name: "Ethiopian Coffee Cooperative",
    category: "Agriculture",
    location: "Sidama, Ethiopia",
    rating: 4.8,
    reviews: 124,
    description: "Premium coffee producer and exporter specializing in single-origin specialty coffee beans. Dedicated to sustainable practices and empowering local farmers.",
    imageUrl: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    verified: true,
    employees: "50-100",
    website: "https://www.ethiopiancoffee.com",
    contactEmail: "info@ethiopiancoffee.com",
    yearFounded: 1995,
    sectorDescription: "Focuses on cultivation, processing, and fair-trade export of high-quality Arabica coffee beans, supporting over 2,000 local farmers.",
    keyProductsServices: ["Single-origin Yirgacheffe coffee", "Roasted coffee beans", "Green coffee bean export", "Coffee farm tours"],
    teamSize: "Large"
  },
  {
    type: 'business',
    slug: createSlug("Addis Tech Hub"),
    name: "Addis Tech Hub",
    category: "Technology",
    location: "Addis Ababa, Ethiopia",
    rating: 4.6,
    reviews: 89,
    description: "Leading software development company providing innovative digital solutions for Ethiopian businesses, from startups to large enterprises.",
    imageUrl: "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU1NjExMjc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    verified: true,
    employees: "25-50",
    website: "https://www.addistechhub.com",
    contactEmail: "contact@addistechhub.com",
    yearFounded: 2018,
    sectorDescription: "Specializes in developing custom software, mobile applications, web platforms, and providing IT consulting services.",
    keyProductsServices: ["Custom Software Development", "Mobile App Solutions", "Web Design & Development", "IT Consulting"],
    teamSize: "Medium"
  },
  {
    type: 'business',
    slug: createSlug("Nile Logistics Solutions"),
    name: "Nile Logistics Solutions",
    category: "Logistics",
    location: "Dire Dawa, Ethiopia",
    rating: 4.7,
    reviews: 156,
    description: "Comprehensive logistics and supply chain management services across East Africa, ensuring efficient and reliable cargo movement.",
    imageUrl: "https://images.unsplash.com/photo-1579532536935-619928decd08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxidXNpbmVzcyUyMG5ld3MlMjBhZnJpY2F8ZW58MXx8fHwxNzU1NjQ0NjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    verified: true,
    employees: "100-500",
    website: "https://www.nilelogistics.com",
    contactEmail: "sales@nilelogistics.com",
    yearFounded: 2005,
    sectorDescription: "Offers end-to-end logistics solutions including freight forwarding (air, sea, road), warehousing, distribution, and customs brokerage.",
    keyProductsServices: ["Air Freight", "Sea Freight", "Warehousing & Distribution", "Customs Clearance", "Road Transport"],
    teamSize: "Large"
  },
  {
    type: 'podcast',
    slug: createSlug("Building Ethiopia's Next Unicorn"),
    title: "Building Ethiopia's Next Unicorn",
    guest: "Daniel Bekele, Serial Entrepreneur",
    duration: "45 min",
    publishDate: "Jan 15, 2025",
    description: "In-depth conversation about the challenges and opportunities in Ethiopia's vibrant startup ecosystem, featuring insights from a seasoned entrepreneur.",
    imageUrl: "https://images.unsplash.com/photo-1641989516513-f34dd4305204?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwZW50cmVwcmVuZXVyc3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    plays: 15200,
    episodeUrl: "https://www.example.com/podcast/next-unicorn-episode",
    transcript: "Full transcript available on our website."
  },
  {
    type: 'podcast',
    slug: createSlug("Foreign Investment Trends in Ethiopia"),
    title: "Foreign Investment Trends in Ethiopia",
    guest: "Sarah Johnson, Investment Director",
    duration: "38 min",
    publishDate: "Jan 8, 2025",
    description: "An expert analysis of recent Foreign Direct Investment (FDI) patterns in Ethiopia and what international investors are actively seeking in the market.",
    imageUrl: "https://images.unsplash.com/photo-1744782211816-c5224434614f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBjaGFydCUyMGRhdGF8ZW58MXx8fHwxNzU1NjQ0NjI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    plays: 12800,
    episodeUrl: "https://www.example.com/podcast/fdi-trends-episode",
    transcript: "Full transcript available on our website."
  },
  {
    type: 'pitch',
    slug: createSlug("GreenTech Agriculture Solutions"),
    title: "GreenTech Agriculture Solutions",
    founder: "Almaz Haile",
    sector: "AgriTech",
    fundingGoal: "$2.5M",
    raised: "$1.2M",
    description: "Revolutionary IoT-based irrigation system designed specifically for Ethiopian smallholder farmers to increase crop yields by 40% while reducing water usage by up to 30%.",
    imageUrl: "https://images.unsplash.com/photo-1742996111692-2d924f12a058?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGJ1c2luZXNzJTIwbWVldGluZ3xlbnwxfHx8fDE3NTU2NDQ2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["AgriTech", "IoT", "Sustainability", "Climate-Smart"],
    investors: 47,
    daysLeft: 23,
    businessModel: "Hybrid model: SaaS subscription for software platform and one-time sale for hardware installation.",
    marketSize: "Estimated $500M market in East Africa for smart agriculture solutions.",
    traction: "Successfully completed pilot projects with 100 farmers, demonstrating average yield increase of 40% and 20% conversion rate from pilot to full adoption.",
  },
];


const OpportunityDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const opportunity = allOpportunities.find(o => o.slug === slug);

  if (router.isFallback || !opportunity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-gray-700 text-center text-lg">Loading opportunity or opportunity not found...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // --- Render content based on opportunity type ---

  // Business Detail Page
  if (opportunity.type === 'business') {
    const business = opportunity as BusinessOpportunity; // Type assertion for clarity
    return (
      <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8">
            <Link href="/opportunities" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Opportunity Hub</span>
            </Link>
          </div>

          <main className="max-w-4xl mx-auto space-y-10 bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                {business.name}
              </h1>
              <div className="flex flex-wrap items-center justify-center space-x-4 mb-6">
                <Badge className="bg-blue-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                  {business.category}
                </Badge>
                {business.verified && (
                  <Badge className="bg-green-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                    <CheckCircle className="h-4 w-4 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
                {business.description}
              </p>
            </div>

            <figure className="my-8 relative rounded-xl overflow-hidden shadow-md">
              <ImageWithFallback
                src={business.imageUrl}
                alt={business.name}
                className="w-full h-[350px] md:h-[450px] object-cover"
              />
              <figcaption className="sr-only">{business.name}</figcaption>
            </figure>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span>{business.location}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{business.employees} employees</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{business.rating} ({business.reviews} reviews)</span>
                </span>
                 {business.yearFounded && (
                  <span className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Founded: {business.yearFounded}</span>
                  </span>
                )}
              </div>
            </div>

            {business.sectorDescription && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Sector Overview</h2>
                <p className="text-base leading-relaxed text-gray-700">{business.sectorDescription}</p>
              </div>
            )}

            {business.keyProductsServices && business.keyProductsServices.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Products/Services</h2>
                <ul className="list-disc list-inside space-y-2 text-base leading-relaxed text-gray-700">
                  {business.keyProductsServices.map((service, i) => (
                    <li key={i}>{service}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              {business.website && (
                <a href={business.website} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Visit Website
                  </Button>
                </a>
              )}
              {business.contactEmail && (
                <a href={`mailto:${business.contactEmail}`}>
                  <Button size="lg" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    <Mail className="h-5 w-5 mr-2" /> Contact Business
                  </Button>
                </a>
              )}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  // Podcast Episode Detail Page
  if (opportunity.type === 'podcast') {
    const podcast = opportunity as PodcastEpisodeOpportunity; // Type assertion
    return (
      <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8">
            <Link href="/opportunities" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Opportunity Hub</span>
            </Link>
          </div>

          <main className="max-w-4xl mx-auto space-y-10 bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                {podcast.title}
              </h1>
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Badge className="bg-purple-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                  Podcast Episode
                </Badge>
              </div>
              <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
                {podcast.description}
              </p>
            </div>

            <figure className="my-8 relative rounded-xl overflow-hidden shadow-md">
              <ImageWithFallback
                src={podcast.imageUrl}
                alt={podcast.title}
                className="w-full h-[350px] md:h-[450px] object-cover"
              />
              <figcaption className="sr-only">{podcast.title}</figcaption>
            </figure>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center space-x-2 font-semibold text-gray-800">
                  <Headphones className="h-4 w-4 text-gray-500" />
                  <span>Guest: {podcast.guest}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>Duration: {podcast.duration}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>Published: {podcast.publishDate}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{podcast.plays.toLocaleString()} plays</span>
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              {podcast.episodeUrl && (
                <a href={podcast.episodeUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Listen to Episode
                  </Button>
                </a>
              )}
              {podcast.transcript && (
                <Button size="lg" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  Read Transcript
                </Button>
              )}
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  // Startup Pitch Detail Page
  if (opportunity.type === 'pitch') {
    const pitch = opportunity as PitchOpportunity; // Type assertion
    return (
      <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="mb-8">
            <Link href="/opportunities" className="inline-flex items-center text-yellow-600 hover:text-yellow-700 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Opportunity Hub</span>
            </Link>
          </div>

          <main className="max-w-4xl mx-auto space-y-10 bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center">
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                {pitch.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center space-x-4 mb-6">
                <Badge className="bg-orange-600 text-white text-base font-medium px-3 py-1.5 rounded-full">
                  Startup Pitch: {pitch.sector}
                </Badge>
                {pitch.tags.map((tag, i) => (
                    <Badge key={i} className="bg-gray-200 text-gray-800 text-base font-medium px-3 py-1.5 rounded-full">
                      <Tag className="h-4 w-4 mr-1 text-gray-600"/>{tag}
                    </Badge>
                ))}
              </div>
              <p className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed italic max-w-3xl mx-auto">
                {pitch.description}
              </p>
            </div>

            <figure className="my-8 relative rounded-xl overflow-hidden shadow-md">
              <ImageWithFallback
                src={pitch.imageUrl}
                alt={pitch.title}
                className="w-full h-[350px] md:h-[450px] object-cover"
              />
              <figcaption className="sr-only">{pitch.title}</figcaption>
            </figure>

            <div className="border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center space-x-2 font-semibold text-gray-800">
                  <User className="h-4 w-4 text-gray-500" />
                  <span>Founder: {pitch.founder}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span>Funding Goal: {pitch.fundingGoal}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  <span>Raised: {pitch.raised}</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>{pitch.investors} investors</span>
                </span>
                <span className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span>{pitch.daysLeft} days left</span>
                </span>
              </div>
            </div>

            {pitch.businessModel && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Business Model</h2>
                <p className="text-base leading-relaxed text-gray-700">{pitch.businessModel}</p>
              </div>
            )}
            {pitch.marketSize && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Size</h2>
                <p className="text-base leading-relaxed text-gray-700">{pitch.marketSize}</p>
              </div>
            )}
            {pitch.traction && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Traction & Milestones</h2>
                <p className="text-base leading-relaxed text-gray-700">{pitch.traction}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Invest Now
              </Button>
              <Button size="lg" variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50 font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                Learn More
              </Button>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  // Default fallback if type is unknown or not handled
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-gray-700 text-center text-lg">Unknown opportunity type.</p>
      </div>
      <Footer />
    </div>
  );
};

export default OpportunityDetailPage;
